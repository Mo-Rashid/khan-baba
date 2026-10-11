
const express = require("express");
const mongoose = require("mongoose");

const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/chat/messages
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
    console.error("Chat read error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not load messages.",
    });
  }
});

// POST /api/chat/messages
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

    const user = req.user || {};
    const rawUserId = user._id || user.id || user.userId;

    if (!rawUserId) {
      return res.status(401).json({
        success: false,
        message: "Please sign in again to send messages.",
      });
    }

    const senderId = String(rawUserId);

    let senderName = [
      user.firstName,
      user.lastName,
    ]
      .filter((part) => typeof part === "string" && part.trim())
      .join(" ")
      .trim();

    if (
      !senderName &&
      mongoose.Types.ObjectId.isValid(senderId)
    ) {
      const dbUser = await User.findById(senderId)
        .select("firstName lastName name username email")
        .lean();

      if (dbUser) {
        senderName = [
          dbUser.firstName,
          dbUser.lastName,
        ]
          .filter((part) => typeof part === "string" && part.trim())
          .join(" ")
          .trim();

        senderName =
          senderName ||
          dbUser.name ||
          dbUser.username ||
          dbUser.email ||
          "";
      }
    }

    senderName = String(
      senderName ||
      user.name ||
      user.username ||
      user.email ||
      "Community User"
    ).trim().slice(0, 80);

    const savedMessage = await ChatMessage.create({
      senderId,
      senderName,
      message,
    });

    return res.status(201).json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    console.error("Chat send error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not send message.",
    });
  }
});

module.exports = router;
