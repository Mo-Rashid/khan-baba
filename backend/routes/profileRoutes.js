
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// GET: load current user's username
router.get("/username", async (req, res) => {
  try {
    const userId = req.user.sub;

    if (!mongoose.isValidObjectId(userId)) {
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
    console.error("Profile fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not fetch profile.",
    });
  }
});

// PUT: update only current user's username
router.put("/username", async (req, res) => {
  try {
    const userId = req.user.sub;
    const username = String(req.body.username || "")
      .trim()
      .toLowerCase();

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user identity.",
      });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Username must be 3–30 characters.",
      });
    }

    if (!/^[a-z0-9_.-]+$/.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Username contains invalid characters.",
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
      {
        new: true,
        runValidators: true,
      }
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

    console.error("Profile update error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not update username.",
    });
  }
});

module.exports = router;
