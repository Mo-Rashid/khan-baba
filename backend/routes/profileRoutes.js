
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

const profileFields = [
  "fullName",
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

const profileResponse = (user) => ({
  fullName: user.fullName || "",
  username: user.username,
  email: user.email,
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

const getAuthenticatedUserId = (req) => {
  const userId = req.user?.sub;

  return mongoose.isValidObjectId(userId) ? userId : null;
};

// GET /api/profile
// Load the complete profile of the logged-in user.
router.get("/", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity.",
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
    console.error("Profile fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not fetch profile.",
    });
  }
});

// PUT /api/profile
// Update profile fields for the authenticated user.
router.put("/", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity.",
      });
    }

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body.",
      });
    }

    const updates = {};

    for (const field of profileFields) {
      if (Object.hasOwn(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.hasOwn(req.body, "username")) {
      const username = String(req.body.username || "")
        .trim()
        .toLowerCase();

      if (
        username.length < 3 ||
        username.length > 30 ||
        !/^[a-z0-9_.-]+$/.test(username)
      ) {
        return res.status(400).json({
          success: false,
          message: "Username must be 3–30 characters and use only letters, numbers, _, . or -.",
        });
      }

      const duplicate = await User.findOne({
        username,
        _id: { $ne: userId },
      }).select("_id");

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken.",
        });
      }

      updates.username = username;
    }

    const stringLimits = {
      fullName: 100,
      headline: 120,
      location: 100,
      bio: 1000,
      website: 300,
      github: 300,
      linkedin: 300,
      avatar: 1000,
    };

    for (const [field, maxLength] of Object.entries(stringLimits)) {
      if (updates[field] !== undefined) {
        if (typeof updates[field] !== "string") {
          return res.status(400).json({
            success: false,
            message: `${field} must be a string.`,
          });
        }

        updates[field] = updates[field].trim();

        if (updates[field].length > maxLength) {
          return res.status(400).json({
            success: false,
            message: `${field} exceeds the maximum length.`,
          });
        }
      }
    }

    for (const field of ["website", "github", "linkedin", "avatar"]) {
      if (updates[field]) {
        try {
          const url = new URL(updates[field]);

          if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Unsupported protocol");
          }
        } catch {
          return res.status(400).json({
            success: false,
            message: `${field} must be a valid HTTP or HTTPS URL.`,
          });
        }
      }
    }

    for (const field of ["skills", "certifications"]) {
      if (updates[field] !== undefined) {
        if (
          !Array.isArray(updates[field]) ||
          updates[field].length > 50 ||
          !updates[field].every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.trim().length <= 100
          )
        ) {
          return res.status(400).json({
            success: false,
            message: `${field} must be a list of up to 50 valid strings.`,
          });
        }

        updates[field] = [
          ...new Set(updates[field].map((item) => item.trim())),
        ];
      }
    }

    if (
      updates.experience !== undefined &&
      !["Beginner", "Intermediate", "Professional", "Expert"].includes(
        updates.experience
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience level.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
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
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email is already in use.",
      });
    }

    console.error("Profile update error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not update profile.",
    });
  }
});

// Existing endpoint preserved.
// GET /api/profile/username
router.get("/username", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity.",
      });
    }

    const user = await User.findById(userId).select("username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      username: user.username,
    });
  } catch (error) {
    console.error("Username fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not fetch username.",
    });
  }
});

// Existing endpoint preserved.
// PUT /api/profile/username
router.put("/username", async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity.",
      });
    }

    const username = String(req.body?.username || "")
      .trim()
      .toLowerCase();

    if (
      username.length < 3 ||
      username.length > 30 ||
      !/^[a-z0-9_.-]+$/.test(username)
    ) {
      return res.status(400).json({
        success: false,
        message: "Username must be 3–30 characters and use only letters, numbers, _, . or -.",
      });
    }

    const duplicate = await User.findOne({
      username,
      _id: { $ne: userId },
    }).select("_id");

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username } },
      { new: true, runValidators: true }
    ).select("username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Username saved successfully.",
      username: user.username,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    console.error("Username update error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not update username.",
    });
  }
});

module.exports = router;
