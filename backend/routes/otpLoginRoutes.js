
const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
const User = require("../models/User");

const router = express.Router();

if (!process.env.RESEND_API_KEY || !process.env.JWT_SECRET) {
  throw new Error("Missing RESEND_API_KEY or JWT_SECRET");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "VulnXploit <onboarding@resend.dev>";

const OtpChallenge =
  mongoose.models.OtpChallenge ||
  mongoose.model(
    "OtpChallenge",
    new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
      },
      otpHash: { type: String, required: true },
      expiresAt: { type: Date, required: true, expires: 0 },
      attempts: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
    })
  );

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    const error = new Error("Enter a valid email address.");
    error.status = 400;
    throw error;
  }

  return email;
}

function hashOtp(code, userId) {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${userId}:${code}`)
    .digest("hex");
}

function safeCompare(expectedHash, actualHash) {
  const expected = Buffer.from(expectedHash, "hex");
  const actual = Buffer.from(actualHash, "hex");

  return (
    expected.length === actual.length &&
    crypto.timingSafeEqual(expected, actual)
  );
}

router.post("/request", requestLimiter, async (req, res) => {
  try {
    const username = normalizeUsername(req.body.username);
    const email = normalizeEmail(req.body.email);

    if (!username || username.length > 30) {
      return res.status(400).json({ message: "Enter a valid username." });
    }

    const user = await User.findOne({ username, email });

    if (!user) {
  return res.status(401).json({
    message: "Account could not be verified.",
  });
}

    const now = Date.now();
    const previous = await OtpChallenge.findOne({ userId: user._id });

    if (
      previous &&
      now - previous.createdAt.getTime() < 60_000
    ) {
      return res.status(429).json({
        message: "Wait 60 seconds before requesting another OTP.",
      });
    }

    const code = crypto.randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");

    await OtpChallenge.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          otpHash: hashOtp(code, user._id),
          expiresAt: new Date(now + 5 * 60_000),
          attempts: 0,
          createdAt: new Date(now),
        },
      },
      { upsert: true, new: true }
    );

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [user.email],
      subject: "Your VulnXploit login OTP",
      text: `Your OTP is ${code}. It expires in 5 minutes. Do not share it.`,
    });

    if (result.error) {
      await OtpChallenge.deleteOne({ userId: user._id });

      return res.status(502).json({
        message: "Email delivery failed. Check Resend configuration.",
      });
    }

    return res.json({ message: "OTP sent to your registered email." });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    console.error("OTP request failed:", error.message);
    return res.status(500).json({ message: "Could not send OTP." });
  }
});

router.post("/verify", verifyLimiter, async (req, res) => {
  try {
    const username = normalizeUsername(req.body.username);
    const email = normalizeEmail(req.body.email);
    const code = String(req.body.code || "").trim();

    if (!username || username.length > 30 || !/^\d{6}$/.test(code)) {
      return res.status(400).json({
        message: "Enter your username and 6-digit OTP.",
      });
    }

    const user = await User.findOne({ username, email });

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

    if (!safeCompare(challenge.otpHash, hashOtp(code, user._id))) {
      challenge.attempts += 1;
      await challenge.save();

      return res.status(401).json({ message: "Incorrect OTP." });
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
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    console.error("OTP verification failed:", error.message);
    return res.status(500).json({ message: "Could not verify OTP." });
  }
});

module.exports = router;
