const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true, trim: true, minlength: 2, maxlength: 3000 },
  isAccepted: { type: Boolean, default: false },
}, { timestamps: true });

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true, trim: true, maxlength: 500 },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 8, maxlength: 120 },
  description: { type: String, required: true, trim: true, minlength: 15, maxlength: 5000 },
  category: {
    type: String,
    enum: ["Web Security", "Bug Bounty", "AI Security", "Mobile Security", "DevOps", "General"],
    default: "General",
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  replies: { type: [replySchema], default: [] },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isSolved: { type: Boolean, default: false },
  reports: { type: [reportSchema], default: [] },
}, { timestamps: true });

postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model("CommunityPost", postSchema);
