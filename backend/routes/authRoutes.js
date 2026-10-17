const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

function createToken(userId) {
  return jwt.sign({ sub: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// ── SIGNUP ──────────────────────────────────
router.post("/signup", signupLimiter, async (req, res) => {
  try {
    const username = String(req.body.username || "").trim().toLowerCase();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const confirmPassword = String(req.body.confirmPassword || "");

    if (!username || username.length < 3 || username.length > 30) {
      return res.status(400).json({ message: "Username must be 3–30 characters." });
    }
    if (!/^[a-z0-9_.-]+$/.test(username)) {
      return res.status(400).json({ message: "Invalid username format." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      if (existing.username === username) {
        return res.status(409).json({ message: "Username already taken." });
      }
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username or email already exists." });
    }
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Could not create account." });
  }
});

// ── LOGIN (username YA email + password) ────
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const login = String(
      req.body.login || req.body.username || req.body.email || ""
    )
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");

    if (!login || !password) {
      return res.status(400).json({
        message: "Username/email and password are required.",
      });
    }

    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken(user._id);

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
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Could not login." });
  }
});

module.exports = router;