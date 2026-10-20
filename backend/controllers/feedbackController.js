
exports.createFeedback = async (req, res) => {
  try {
    const {
      username,
      section,
      rating,
      message,
      tags = [],
    } = req.body;

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

    const feedback = await Feedback.create({
      username: cleanUsername,
      section,
      rating,
      message: cleanMessage,
      tags: [...new Set(tags.map((tag) => tag.trim()))],
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
