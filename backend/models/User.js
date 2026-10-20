
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Existing account and authentication fields
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_.-]+$/,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // Profile information
    fullName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    headline: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    github: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    linkedin: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Professional", "Expert"],
      default: "Beginner",
    },

    // Store an image URL here, not a large base64 image.
    avatar: {
      type: String,
      default: "",
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
