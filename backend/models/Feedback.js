const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    section: {
      type: String,
      required: true,
      enum: [
        "bug-bounty",
        "ai-red-teaming",
        "red-teaming",
        "ethical-hacking",
        "all-ctf-lab",
        "certifications",
        "portfolio",
        "courses",
        "workshops",
      ],
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["approved", "pending", "hidden"],
      default: "approved",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// One feedback per user for each section
feedbackSchema.index(
  { user: 1, section: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);