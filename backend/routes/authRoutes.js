const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const username = String(req.body.username || "")
      .trim()
      .toLowerCase();

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    if (!/^[a-z0-9_.-]{3,30}$/.test(username)) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be 3–30 characters using letters, numbers, _, . or -.",
      });
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email is already registered.",
      });
    }

    const user = await User.create({
      username,
      email,
      isVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Account created. Login to verify your email OTP.",
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email is already registered.",
      });
    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not create account.",
    });
  }
});

module.exports = router;