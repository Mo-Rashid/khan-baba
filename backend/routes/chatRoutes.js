
const express = require("express");
const mongoose = require("mongoose");

const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/chat/messages
// Community messages read karna
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
// Sirf authenticated user message bhej sakta hai
router.post("/messages", authMiddleware, async (req, res) => {
  try {
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

    // JWT middleware se authenticated user ID
    const userId =
      req.user?.sub ||
      req.user?.userId ||
      req.user?.id ||
      req.user?._id;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(String(userId))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid user token. Please sign in again.",
      });
    }

    // Database se actual username fetch karo
    const user = await User.findById(userId)
      .select("username")
      .lean();

    if (!user || !user.username) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please check your profile.",
      });
    }

    // Username + message MongoDB mein save karo
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
