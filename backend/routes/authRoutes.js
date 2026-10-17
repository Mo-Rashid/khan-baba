
const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* =========================================
   HELPERS
========================================= */

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
  };
}

/* =========================================
   SIGNUP — USERNAME + EMAIL ONLY
   POST /api/auth/signup
========================================= */

router.post("/signup", async (req, res) => {
  try {
    const username = normalizeUsername(req.body?.username);
    const email = normalizeEmail(req.body?.email);

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required.",
      });
    }

    // Validate username
    if (!/^[a-z0-9_.-]{3,30}$/.test(username)) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be 3–30 characters and contain only letters, numbers, dots, underscores or hyphens.",
      });
    }

    // Validate email
    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Check username and email uniqueness
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Create an unverified account.
    // Login is completed later through email OTP.
    const user = await User.create({
      username,
      email,
      isVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please login and verify your email OTP.",
      user: publicUser(user),
    });
  } catch (error) {
    // Handle duplicate-key errors caused by concurrent requests
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        success: false,
        message:
          field === "username"
            ? "Username is already taken."
            : "Email is already registered.",
      });
    }

    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account. Please try again.",
    });
  }
});

/* =========================================
   EXPORT
========================================= */

module.exports = router;
