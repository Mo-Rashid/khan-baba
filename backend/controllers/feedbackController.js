const Feedback = require("../models/Feedback");
const User = require("../models/User");

const VALID_SECTIONS = [
  "bug-bounty",
  "ai-red-teaming",
  "red-teaming",
  "ethical-hacking",
  "all-ctf-lab",
  "certifications",
  "portfolio",
  "courses",
  "workshops",
];

/*
|--------------------------------------------------------------------------
| GET FEEDBACK
|--------------------------------------------------------------------------
| GET /api/feedback?section=bug-bounty
|--------------------------------------------------------------------------
*/

const getFeedback = async (req, res) => {
  try {
    const { section } = req.query;

    if (!section) {
      return res.status(400).json({
        success: false,
        message: "Feedback section is required",
      });
    }

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback section",
      });
    }

    const feedback = await Feedback.find({
      section,
      status: "approved",
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    const totalReviews = feedback.length;

    const totalRating = feedback.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      totalReviews > 0
        ? (totalRating / totalReviews).toFixed(1)
        : "0.0";

    const formattedFeedback = feedback.map((item) => ({
      id: item._id.toString(),
      username: item.username,
      stars: item.rating,
      text: item.message,
      tags: item.tags || [],
      time: formatTime(item.createdAt),
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      success: true,
      section,
      totalReviews,
      averageRating,
      feedback: formattedFeedback,
    });
  } catch (error) {
    console.error("GET FEEDBACK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load feedback",
    });
  }
};


/*
|--------------------------------------------------------------------------
| CREATE FEEDBACK
|--------------------------------------------------------------------------
| POST /api/feedback
|--------------------------------------------------------------------------
*/

const createFeedback = async (req, res) => {
  try {
    const {
      section,
      rating,
      message,
      tags,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validate section
    |--------------------------------------------------------------------------
    */

    if (!section) {
      return res.status(400).json({
        success: false,
        message: "Feedback section is required",
      });
    }

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback section",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate message
    |--------------------------------------------------------------------------
    */

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required",
      });
    }

    const cleanMessage = message.trim();

    if (cleanMessage.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Feedback is too short",
      });
    }

    if (cleanMessage.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Feedback must be 120 characters or less",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate rating
    |--------------------------------------------------------------------------
    */

    const numericRating = Number(rating || 5);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Find authenticated user
    |--------------------------------------------------------------------------
    */

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check duplicate feedback
    |--------------------------------------------------------------------------
    */

    const existingFeedback =
      await Feedback.findOne({
        user: user._id,
        section,
      });

    if (existingFeedback) {
      return res.status(409).json({
        success: false,
        message:
          "You have already submitted feedback for this section.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Clean tags
    |--------------------------------------------------------------------------
    */

    const cleanTags = Array.isArray(tags)
      ? tags
          .filter(
            (tag) =>
              typeof tag === "string"
          )
          .map((tag) => tag.trim())
          .filter(Boolean)
          .slice(0, 5)
      : [];

    /*
    |--------------------------------------------------------------------------
    | Get username from database
    |--------------------------------------------------------------------------
    */

    const username =
      `${user.firstName || ""} ${
        user.lastName || ""
      }`.trim() ||
      user.email.split("@")[0];

    /*
    |--------------------------------------------------------------------------
    | Create feedback
    |--------------------------------------------------------------------------
    */

    const newFeedback =
      await Feedback.create({
        user: user._id,
        username,
        section,
        rating: numericRating,
        message: cleanMessage,
        tags: cleanTags,
        status: "approved",
      });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",

      feedback: {
        id: newFeedback._id.toString(),
        username: newFeedback.username,
        stars: newFeedback.rating,
        text: newFeedback.message,
        tags: newFeedback.tags,
        time: "Just now",
        createdAt: newFeedback.createdAt,
      },
    });
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | MongoDB duplicate key
    |--------------------------------------------------------------------------
    */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "You have already submitted feedback for this section.",
      });
    }

    console.error(
      "CREATE FEEDBACK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit feedback",
    });
  }
};


/*
|--------------------------------------------------------------------------
| DELETE OWN FEEDBACK
|--------------------------------------------------------------------------
| DELETE /api/feedback/:id
|--------------------------------------------------------------------------
*/

const deleteFeedback = async (req, res) => {
  try {
    const feedback =
      await Feedback.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    await feedback.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE FEEDBACK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete feedback",
    });
  }
};


/*
|--------------------------------------------------------------------------
| Time formatter
|--------------------------------------------------------------------------
*/

function formatTime(date) {
  const now = Date.now();
  const created = new Date(date).getTime();

  const seconds = Math.floor(
    (now - created) / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 30) {
    return `${days}d ago`;
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


module.exports = {
  getFeedback,
  createFeedback,
  deleteFeedback,
};