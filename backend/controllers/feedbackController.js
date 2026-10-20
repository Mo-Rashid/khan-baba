const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");
const { VALID_SECTIONS } = require("../models/Feedback");

function formatFeedback(doc) {
  return {
    id: doc._id.toString(),
    username: doc.username,
    stars: doc.rating,
    text: doc.message,
    tags: doc.tags || [],
    time: new Date(doc.createdAt || Date.now()).toLocaleDateString("en-IN"),
    section: doc.section,
  };
}

// GET /api/feedback?section=bug-bounty
exports.getFeedback = async (req, res) => {
  try {
    const { section } = req.query;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "A valid feedback section is required.",
      });
    }

    const feedback = await Feedback.find({
      section,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    const totalReviews = feedback.length;
    const averageRating = totalReviews
      ? Number(
          (
            feedback.reduce((sum, item) => sum + item.rating, 0) /
            totalReviews
          ).toFixed(1)
        )
      : 0;

    return res.status(200).json({
      success: true,
      feedback: feedback.map(formatFeedback),
      totalReviews,
      averageRating,
    });
  } catch (err) {
    console.error("getFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load reviews.",
    });
  }
};

// POST /api/feedback
exports.createFeedback = async (req, res) => {
  try {
    const {
      username,
      section,
      rating,
      message,
      tags = [],
    } = req.body || {};

    const cleanUsername =
      typeof username === "string" ? username.trim() : "";
    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

    if (cleanUsername.length < 2 || cleanUsername.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 2 and 100 characters.",
      });
    }

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback section.",
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (cleanMessage.length < 3 || cleanMessage.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Review must be between 3 and 120 characters.",
      });
    }

    if (
      !Array.isArray(tags) ||
      tags.length > 5 ||
      !tags.every(
        (tag) =>
          typeof tag === "string" &&
          tag.trim().length > 0 &&
          tag.trim().length <= 50
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback tags.",
      });
    }

    const cleanTags = [...new Set(tags.map((tag) => tag.trim()))];

    const feedback = await Feedback.create({
      username: cleanUsername,
      section,
      rating,
      message: cleanMessage,
      tags: cleanTags,
      status: "approved",
    });

    return res.status(201).json({
      success: true,
      message: "Review saved successfully.",
      feedback: formatFeedback(feedback),
    });
  } catch (err) {
    console.error("createFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save review.",
    });
  }
};

// DELETE /api/feedback/:id — keep authentication enabled
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback ID.",
      });
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    // Only the original authenticated user or an admin can delete.
    const userId = req.user?.id || req.user?._id;
    const isAdmin =
      req.user?.role === "admin" ||
      req.user?.role === "Admin";

    if (!userId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this review.",
      });
    }

    if (
      !isAdmin &&
      (!feedback.user || feedback.user.toString() !== userId.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own review.",
      });
    }

    await Feedback.deleteOne({ _id: feedback._id });

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully.",
    });
  } catch (err) {
    console.error("deleteFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete feedback.",
    });
  }
};