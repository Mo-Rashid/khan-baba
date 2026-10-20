const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

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

// GET /api/profile
router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity. Please login again.",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      profile: profileResponse(user),
    });
  } catch (error) {
    console.error("GET profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch profile.",
    });
  }
});

// PUT /api/profile
router.put("/", async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity. Please login again.",
      });
    }

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body.",
      });
    }

    const allowedFields = [
      "fullName",
      "username",
      "headline",
      "location",
      "bio",
      "website",
      "github",
      "linkedin",
      "skills",
      "certifications",
      "experience",
      "avatar",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    // Username
    if (updates.username !== undefined) {
      if (typeof updates.username !== "string") {
        return res.status(400).json({
          success: false,
          message: "Username must be text.",
        });
      }

      updates.username = updates.username.trim().replace(/^@/, "").toLowerCase();

      if (!/^[a-z0-9_.-]{3,30}$/.test(updates.username)) {
        return res.status(400).json({
          success: false,
          message:
            "Username must be 3–30 characters using letters, numbers, dots, underscores or hyphens.",
        });
      }

      const existingUser = await User.findOne({
        username: updates.username,
        _id: { $ne: userId },
      }).select("_id");

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken.",
        });
      }
    }

    // Text limits (avatar NOT limited to 1000)
    const limits = {
      fullName: 100,
      headline: 120,
      location: 100,
      bio: 1000,
      website: 300,
      github: 300,
      linkedin: 300,
    };

    for (const [field, maxLength] of Object.entries(limits)) {
      if (updates[field] === undefined) continue;

      if (typeof updates[field] !== "string") {
        return res.status(400).json({
          success: false,
          message: `${field} must be text.`,
        });
      }

      updates[field] = updates[field].trim();

      if (updates[field].length > maxLength) {
        return res.status(400).json({
          success: false,
          message: `${field} is too long. Maximum ${maxLength} characters.`,
        });
      }
    }

    // Optional HTTP URLs only for links
    for (const field of ["website", "github", "linkedin"]) {
      if (!updates[field]) continue;
      if (!isHttpUrl(updates[field])) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a valid HTTP or HTTPS URL.`,
        });
      }
    }

    // Avatar: empty, data URL, or http URL
    if (updates.avatar !== undefined) {
      if (typeof updates.avatar !== "string") {
        return res.status(400).json({
          success: false,
          message: "avatar must be text.",
        });
      }
      if (updates.avatar.length > 2_500_000) {
        return res.status(400).json({
          success: false,
          message: "Avatar is too large. Use an image under 1.5 MB.",
        });
      }
    }

    for (const field of ["skills", "certifications"]) {
      if (updates[field] === undefined) continue;

      const list = updates[field];
      if (
        !Array.isArray(list) ||
        list.length > 50 ||
        !list.every(
          (item) =>
            typeof item === "string" &&
            item.trim().length > 0 &&
            item.trim().length <= 100
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} must contain up to 50 valid text items.`,
        });
      }

      updates[field] = [...new Set(list.map((item) => item.trim()))];
    }

    const allowedExperience = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Professional",
      "Expert",
    ];

    if (
      updates.experience !== undefined &&
      !allowedExperience.includes(updates.experience)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience level.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully.",
      profile: profileResponse(user),
    });
  } catch (error) {
    console.error("PUT profile error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username is already in use.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Could not save profile to the database.",
    });
  }
});

module.exports = router;