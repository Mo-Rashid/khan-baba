
const express = require("express");
const mongoose = require("mongoose");

const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/chat/messages
// Fetch the latest 100 messages.
router.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
    });
  } catch (error) {
    console.error("Chat read error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not load messages.",
    });
  }
});

// POST /api/chat/messages
// Only authenticated users can send messages.
router.post("/messages", authMiddleware, async (req, res) => {
  try {
    // Validate message
    const message =
      typeof req.body?.message === "string"
        ? req.body.message.trim()
        : "";

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message must be 2000 characters or fewer.",
      });
    }

    // Get authenticated user ID from middleware
    const authUser = req.user || {};

    const rawUserId =
      authUser._id ||
      authUser.id ||
      authUser.userId;

    if (
      !rawUserId ||
      !mongoose.Types.ObjectId.isValid(String(rawUserId))
    ) {
      return res.status(401).json({
        success: false,
        message: "Please sign in again to send messages.",
      });
    }

    // Fetch username from MongoDB
    const user = await User.findById(rawUserId)
      .select("username")
      .lean();

    if (!user || !user.username) {
      return res.status(401).json({
        success: false,
        message: "User account not found. Please sign in again.",
      });
    }

    // Save message using username only
    const savedMessage = await ChatMessage.create({
      senderId: String(user._id),
      senderName: user.username,
      message,
    });

    return res.status(201).json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    console.error("Chat send error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not send message.",
    });
  }
});

module.exports = router;
