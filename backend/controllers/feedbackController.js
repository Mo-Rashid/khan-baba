const Feedback = require("../models/Feedback");
const { VALID_SECTIONS } = require("../models/Feedback");

// Helper: format for frontend
function formatFeedback(doc) {
  return {
    id: doc._id,
    username: doc.username,
    stars: doc.rating,          // frontend uses "stars"
    text: doc.message,          // frontend uses "text"
    tags: doc.tags || [],
    time: new Date(doc.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    section: doc.section,
  };
}

// GET /api/feedback?section=xxx
exports.getFeedback = async (req, res) => {
  try {
    const { section } = req.query;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing section.",
      });
    }

    const feedbacks = await Feedback.find({
      section,
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    const totalReviews = feedbacks.length;
    const averageRating =
      totalReviews === 0
        ? "0.0"
        : (
            feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalReviews
          ).toFixed(1);

    return res.json({
      success: true,
      feedback: feedbacks.map(formatFeedback),
      totalReviews,
      averageRating,
    });
  } catch (err) {
    console.error("getFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load feedback.",
    });
  }
};

// POST /api/feedback  (auth required)
exports.createFeedback = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const username = req.user?.username || req.user?.name || "Anonymous";

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { section, rating, message, tags = [] } = req.body;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section.",
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5.",
      });
    }

    const trimmed = (message || "").trim();
    if (trimmed.length < 3 || trimmed.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 3 and 120 characters.",
      });
    }

    if (!Array.isArray(tags) || tags.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 tags allowed.",
      });
    }

    // Upsert: one feedback per user per section
    const feedback = await Feedback.findOneAndUpdate(
      { user: userId, section },
      {
        user: userId,
        username,
        section,
        rating,
        message: trimmed,
        tags: [...new Set(tags.map((t) => String(t).trim()).filter(Boolean))],
        status: "approved",
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback: formatFeedback(feedback),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You already submitted feedback for this section.",
      });
    }
    console.error("createFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to submit feedback.",
    });
  }
};

// DELETE /api/feedback/:id  (auth required – only own feedback)
exports.deleteFeedback = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const feedback = await Feedback.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found or you are not allowed to delete it.",
      });
    }

    return res.json({
      success: true,
      message: "Feedback deleted.",
    });
  } catch (err) {
    console.error("deleteFeedback error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete feedback.",
    });
  }
};