const mongoose = require("mongoose");

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
  "general",
  "labs",
  "platform",
];

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
      enum: VALID_SECTIONS,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer from 1 to 5.",
      },
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: 50,
        },
      ],
      default: [],
      validate: [
        {
          validator: (tags) => tags.length <= 5,
          message: "You can select a maximum of 5 tags.",
        },
        {
          validator: (tags) => new Set(tags).size === tags.length,
          message: "Duplicate tags are not allowed.",
        },
      ],
    },
    status: {
      type: String,
      enum: ["approved", "pending", "hidden"],
      default: "approved",
      index: true,
    },
  },
  { timestamps: true }
);

// One feedback per user for each section
feedbackSchema.index({ user: 1, section: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
module.exports.VALID_SECTIONS = VALID_SECTIONS;