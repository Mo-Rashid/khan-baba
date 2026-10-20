const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const getUserId = (req) => {
  const id = req.user?.sub;
  return mongoose.isValidObjectId(id) ? id : null;
};

const profileResponse = (user) => ({
  fullName: user.fullName || "",
  username: user.username || "",
  email: user.email || "",
  headline: user.headline || "",
  location: user.location || "",
  bio: user.bio || "",
  website: user.website || "",
  github: user.github || "",
  linkedin: user.linkedin || "",
  skills: user.skills || [],
  certifications: user.certifications || [],
  experience: user.experience || "Beginner",
  avatar: user.avatar || "",
});

function isHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// ═══════════════════════════════════════════
// PUBLIC: create profile + account (NO login page)
// POST /api/profile/register
// ═══════════════════════════════════════════
router.post("/register", async (req, res) => {
  try {
    const username = String(req.body.username || "")
      .trim()
      .replace(/^@/, "")
      .toLowerCase();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const fullName = String(req.body.fullName || "").trim();

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }
    if (!/^[a-z0-9_.-]{3,30}$/.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Invalid username (3–30 chars, a-z 0-9 . _ -).",
      });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required.",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashed,
      fullName,
      headline: String(req.body.headline || "").trim(),
      location: String(req.body.location || "").trim(),
      bio: String(req.body.bio || "").trim(),
      website: String(req.body.website || "").trim(),
      github: String(req.body.github || "").trim(),
      linkedin: String(req.body.linkedin || "").trim(),
      skills: Array.isArray(req.body.skills) ? req.body.skills : [],
      certifications: Array.isArray(req.body.certifications)
        ? req.body.certifications
        : [],
      experience: req.body.experience || "Beginner",
      avatar: String(req.body.avatar || ""),
      isVerified: true,
    });

    const token = jwt.sign(
      { sub: String(user._id) },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Profile created and saved to database.",
      token,
      profile: profileResponse(user),
    });
  } catch (error) {
    console.error("Profile register error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Could not create profile.",
    });
  }
});

// ═══════════════════════════════════════════
// Protected routes (token required)
// ═══════════════════════════════════════════
router.use(authMiddleware);

// GET /api/profile  — yahan se tumhara pehle wala GET code
// PUT /api/profile  — yahan se tumhara pehle wala PUT code

// ... baaki GET aur PUT waisa hi paste karo jo tumhare paas hai ...

module.exports = router;