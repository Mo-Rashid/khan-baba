
const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
const User = require("../models/User");

const router = express.Router();

const requiredEnv = ["RESEND_API_KEY", "JWT_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 0 },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const OtpChallenge =
  mongoose.models.OtpChallenge ||
  mongoose.model("OtpChallenge", otpSchema);

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again later." },
});

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function identify(value) {
  const input = String(value || "").trim();

  if (input.includes("@")) {
    const email = input.toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    return { type: "email", value: email };
  }

  const phone = input.replace(/[\s()-]/g, "");

  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    throw new Error(
      "Enter a valid email or phone number with country code."
    );
  }

  return { type: "phone", value: phone };
}

async function findExistingUser(identity, firstName, lastName) {
  const contactQuery =
    identity.type === "email"
      ? { email: identity.value }
      : { phoneNumber: identity.value };

  const user = await User.findOne(contactQuery);

  if (!user) return null;

  if (
    normalizeName(user.firstName) !== normalizeName(firstName) ||
    normalizeName(user.lastName) !== normalizeName(lastName)
  ) {
    return null;
  }

  return user;
}

function hashOtp(otp, userId) {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${userId}:${otp}`)
    .digest("hex");
}

router.post("/request", otpLimiter, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const identity = identify(req.body.identifier);

    if (!firstName?.trim() || !lastName?.trim()) {
      return res.status(400).json({
        message: "Enter your registered first and last name.",
      });
    }

    const user = await findExistingUser(
      identity,
      firstName,
      lastName
    );

    if (!user || !user.email) {
      return res.status(400).json({
        message: "Account details could not be verified.",
      });
    }

    const now = Date.now();
    const previous = await OtpChallenge.findOne({
      userId: user._id,
    });

    if (previous && now - previous.createdAt.getTime() < 60_000) {
      return res.status(429).json({
        message: "Please wait 60 seconds before requesting another OTP.",
      });
    }

    const otp = crypto.randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");

    await OtpChallenge.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          otpHash: hashOtp(otp, user._id),
          expiresAt: new Date(now + 5 * 60_000),
          attempts: 0,
          createdAt: new Date(now),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ||
          "VulnXploit <onboarding@resend.dev>",
        to: [user.email],
        subject: "Your VulnXploit login OTP",
        text: `Your login OTP is ${otp}. It expires in 5 minutes. Do not share it.`,
      });
    } catch (emailError) {
      await OtpChallenge.deleteOne({ userId: user._id });
      throw emailError;
    }

    return res.json({
      message: "OTP sent to your registered email.",
      channel: "email",
    });
  } catch (error) {
    if (error.message.startsWith("Enter a valid")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("OTP request failed:", error.message);

    return res.status(500).json({
      message: "Could not send OTP. Check server configuration.",
    });
  }
});

router.post("/verify", otpLimiter, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const identity = identify(req.body.identifier);
    const code = String(req.body.code || "").trim();

    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        message: "Enter the 6-digit OTP.",
      });
    }

    const user = await findExistingUser(
      identity,
      firstName,
      lastName
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid login details or OTP.",
      });
    }

    const challenge = await OtpChallenge.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });

    if (!challenge) {
      return res.status(401).json({
        message: "OTP expired or not requested. Request a new OTP.",
      });
    }

    if (challenge.attempts >= 5) {
      await OtpChallenge.deleteOne({ _id: challenge._id });

      return res.status(429).json({
        message: "Too many incorrect attempts. Request a new OTP.",
      });
    }

    const expected = Buffer.from(challenge.otpHash, "hex");
    const supplied = Buffer.from(hashOtp(code, user._id), "hex");

    if (
      expected.length !== supplied.length ||
      !crypto.timingSafeEqual(expected, supplied)
    ) {
      challenge.attempts += 1;
      await challenge.save();

      return res.status(401).json({
        message: "Incorrect or expired OTP.",
      });
    }

    await OtpChallenge.deleteOne({ _id: challenge._id });

    const token = jwt.sign(
      { sub: String(user._id) },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.message.startsWith("Enter a valid")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("OTP verification failed:", error.message);

    return res.status(500).json({
      message: "Could not verify OTP. Try again.",
    });
  }
});

module.exports = router;
