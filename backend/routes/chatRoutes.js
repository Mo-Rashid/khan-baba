const express = require("express");
const mongoose = require("mongoose");
const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Read recent messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json({
      success: true,
      messages: messages.reverse(),
    });
  } catch (error) {
    console.error("Chat read error:", error);
    res.status(500).json({
      success: false,
      message: "Could not load messages.",
    });
  }
});

// Send a message: login required
router.post("/messages", authMiddleware, async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();

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
    const senderId = String(
      user._id || user.id || user.userId || ""
    );

    if (!senderId) {
      return res.status(401).json({
        success: false,
        message: "Please sign in again to send messages.",
      });
    }

    let senderName = [
      user.firstName,
      user.lastName
    ].filter(Boolean).join(" ").trim();

    if (!senderName) {
      const userId = user._id || user.id || user.userId;

      if (mongoose.Types.ObjectId.isValid(userId)) {
        const dbUser = await User.findById(userId)
          .select("firstName lastName")
          .lean();

        if (dbUser) {
          senderName = [
            dbUser.firstName,
            dbUser.lastName
          ].filter(Boolean).join(" ").trim();
        }
      }
    }

    senderName = (senderName || user.username || "Community User")
      .trim()
      .slice(0, 80);

    const savedMessage = await ChatMessage.create({
      senderId,
      senderName,
      message,
    });

    res.status(201).json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    console.error("Chat send error:", error);
    res.status(500).json({
      success: false,
      message: "Could not send message.",
    });
  }
});

module.exports = router;