
const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");

const User = require("../models/User");

const router = express.Router();

// ======================================================
// ENVIRONMENT CONFIGURATION
// ======================================================

const requiredEnv = ["RESEND_API_KEY", "JWT_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "VulnXploit <onboarding@resend.dev>";

// ======================================================
// OTP DATABASE MODEL
// ======================================================

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OtpChallenge =
  mongoose.models.OtpChallenge ||
  mongoose.model("OtpChallenge", otpSchema);

// ======================================================
// RATE LIMITERS
// ======================================================

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many OTP requests. Try again later.",
  },
});

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many verification attempts. Try again later.",
  },
});

// ======================================================
// HELPERS
// ======================================================

function getEmail(body) {
  const email = String(
    body.email || body.identifier || ""
  )
    .trim()
    .toLowerCase();

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

function hashOtp(otp, userId) {
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${userId}:${otp}`)
    .digest("hex");
}

function safeCompareOtp(expectedHash, suppliedHash) {
  const expected = Buffer.from(expectedHash, "hex");
  const supplied = Buffer.from(suppliedHash, "hex");

  return (
    expected.length === supplied.length &&
    crypto.timingSafeEqual(expected, supplied)
  );
}

// ======================================================
// REQUEST OTP
// POST /api/auth/otp/request
// Body: { "email": "registered@example.com" }
// ======================================================

router.post("/request", requestLimiter, async (req, res) => {
  let userId;

  try {
    const email = getEmail(req.body);

    // Only an existing account can request a login OTP.
    const user = await User.findOne({ email });

    if (!user || !user.email) {
      return res.status(400).json({
        message: "Account details could not be verified.",
      });
    }

    userId = user._id;

    const now = Date.now();

    const previous = await OtpChallenge.findOne({ userId });

    if (
      previous &&
      previous.createdAt &&
      now - previous.createdAt.getTime() < 60_000
    ) {
      return res.status(429).json({
        message: "Please wait 60 seconds before requesting another OTP.",
      });
    }

    // Generate a cryptographically secure six-digit OTP.
    const otp = crypto
      .randomInt(0, 1_000_000)
      .toString()
      .padStart(6, "0");

    // Store only the OTP hash, never the plain OTP.
    await OtpChallenge.findOneAndUpdate(
      { userId },
      {
        $set: {
          otpHash: hashOtp(otp, userId),
          expiresAt: new Date(now + 5 * 60_000),
          attempts: 0,
          createdAt: new Date(now),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // Send OTP using Resend.
    const result = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [user.email],
      subject: "Your VulnXploit login OTP",
      text:
        `Your login OTP is ${otp}.\n\n` +
        "It expires in 5 minutes. Do not share this code with anyone.",
    });

    // Resend can return an API error without throwing an exception.
    if (result.error) {
      console.error("Resend error:", result.error);

      await OtpChallenge.deleteOne({ userId });

      return res.status(502).json({
        message: "Email delivery failed. Check Resend configuration.",
      });
    }

    return res.status(200).json({
      message: "OTP sent to your registered email.",
      channel: "email",
    });
  } catch (error) {
    if (userId) {
      await OtpChallenge.deleteOne({ userId }).catch(() => {});
    }

    if (error.status === 400) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("OTP request failed:", error.message);

    return res.status(500).json({
      message: "Could not send OTP. Check server configuration.",
    });
  }
});

// ======================================================
// VERIFY OTP
// POST /api/auth/otp/verify
// Body: { "email": "registered@example.com", "code": "123456" }
// ======================================================

router.post("/verify", verifyLimiter, async (req, res) => {
  try {
    const email = getEmail(req.body);
    const code = String(req.body.code || "").trim();

    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        message: "Enter the 6-digit OTP.",
      });
    }

    // Re-fetch the registered user from the database.
    const user = await User.findOne({ email });

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

    const suppliedHash = hashOtp(code, user._id);

    if (!safeCompareOtp(challenge.otpHash, suppliedHash)) {
      challenge.attempts += 1;
      await challenge.save();

      return res.status(401).json({
        message: "Incorrect or expired OTP.",
      });
    }

    // OTP is single-use.
    await OtpChallenge.deleteOne({ _id: challenge._id });

    const token = jwt.sign(
      { sub: String(user._id) },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
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
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("OTP verification failed:", error.message);

    return res.status(500).json({
      message: "Could not verify OTP. Try again.",
    });
  }
});

module.exports = router;
