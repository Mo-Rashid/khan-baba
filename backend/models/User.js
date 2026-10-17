const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
    type: String,
    trim: true,
    default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);


