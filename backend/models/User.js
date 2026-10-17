
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Optional for legacy email/password accounts.
    username: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_.-]+$/,
    },

    firstName: {
      type: String,
      trim: true,
      default: "",
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    // Optional for phone-only OTP accounts.
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    // Legacy password accounts keep their hashed password.
    password: {
      type: String,
      select: false,
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: undefined,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Only index values that actually exist.
// Check existing MongoDB indexes before deploying.
userSchema.index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: { username: { $type: "string" } },
  }
);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  }
);

userSchema.index(
  { phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: { phoneNumber: { $type: "string" } },
  }
);

module.exports = mongoose.model("User", userSchema);
