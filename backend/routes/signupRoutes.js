// backend/routes/authRoutes.js  (ya jahan bhi aap routes rakhte ho)

const express = require("express");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
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

// ─────────────────────────────────────────────
// POST /api/auth/signup
// ─────────────────────────────────────────────
router.post("/signup", signupLimiter, async (req, res) => {
  try {
    const username = normalizeUsername(req.body.username);
    const email = normalizeEmail(req.body.email);
    const firstName = String(req.body.firstName || "").trim();
    const lastName = String(req.body.lastName || "").trim();

    // Validation
    if (!username || username.length < 3 || username.length > 30) {
      return res.status(400).json({
        message: "Username must be 3-30 characters.",
      });
    }

    if (!/^[a-z0-9_.-]+$/.test(username)) {
      return res.status(400).json({
        message: "Username can only contain letters, numbers, . _ -",
      });
    }

    if (!firstName || firstName.length > 50) {
      return res.status(400).json({ message: "First name is required." });
    }

    if (!lastName || lastName.length > 50) {
      return res.status(400).json({ message: "Last name is required." });
    }

    // Check if username or email already exists
    const existing = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existing) {
      if (existing.username === username) {
        return res.status(409).json({ message: "Username already taken." });
      }
      return res.status(409).json({ message: "Email already registered." });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      isVerified: true, // OTP login ke liye true rakh rahe hain
    });

    return res.status(201).json({
      message: "Account created successfully. You can now login with OTP.",
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }

    // Duplicate key error (extra safety)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists.",
      });
    }

    console.error("Signup failed:", error.message);
    return res.status(500).json({ message: "Could not create account." });
  }
});

module.exports = router;