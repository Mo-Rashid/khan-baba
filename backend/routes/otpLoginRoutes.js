
const express = require("express");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();

const requiredEnv = [
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_VERIFY_SERVICE_SID",
  "JWT_SECRET",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const verifyService = client.verify.v2.services(
  process.env.TWILIO_VERIFY_SERVICE_SID
);

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again later." },
});

function identify(value) {
  const input = String(value || "").trim();

  if (input.includes("@")) {
    const email = input.toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }
    return { type: "email", value: email };
  }

  // International phone format, e.g. +919876543210
  const phone = input.replace(/[\s()-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    throw new Error("Enter a valid email or phone number with country code.");
  }

  return { type: "phone", value: phone };
}

async function findExistingUser(identity) {
  if (identity.type === "email") {
    return User.findOne({
      email: identity.value,
    });
  }

  // Your User schema must have a phoneNumber field stored
  // in E.164 format, e.g. +919876543210.
  return User.findOne({
    phoneNumber: identity.value,
  });
}

router.post("/request", otpLimiter, async (req, res) => {
  try {
    const identity = identify(req.body.identifier);
    const user = await findExistingUser(identity);

    // Login must not create new accounts.
    if (!user) {
      return res.status(404).json({
        message: "Account not found. Check your registered details.",
      });
    }

    // Use the registered contact saved in the database.
    const destination =
      identity.type === "email" ? user.email : user.phoneNumber;

    if (!destination) {
      return res.status(400).json({
        message: "This account does not have that contact method registered.",
      });
    }

    const verification = await verifyService.verifications.create({
      to: destination,
      channel: identity.type === "email" ? "email" : "sms",
    });

    return res.json({
      message: "OTP request submitted.",
      channel: identity.type,
      status: verification.status,
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
    const identity = identify(req.body.identifier);
    const code = String(req.body.code || "").trim();

    if (!/^\d{4,10}$/.test(code)) {
      return res.status(400).json({ message: "Enter a valid OTP." });
    }

    const user = await findExistingUser(identity);

    if (!user) {
      return res.status(401).json({ message: "Invalid login or OTP." });
    }

    const destination =
      identity.type === "email" ? user.email : user.phoneNumber;

    const result = await verifyService.verificationChecks.create({
      to: destination,
      code,
    });

    if (result.status !== "approved") {
      return res.status(401).json({ message: "Incorrect or expired OTP." });
    }

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

    // Do not log OTPs or authentication secrets.
    console.error("OTP verification failed:", error.message);
    return res.status(401).json({
      message: "OTP verification failed or code expired.",
    });
  }
});

module.exports = router;
