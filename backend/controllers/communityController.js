const mongoose = require("mongoose");
const CommunityPost = require("../models/CommunityPost");

function userId(req) {
  return req.user?.id || req.user?._id || req.user?.userId;
}
function validId(id) { return mongoose.Types.ObjectId.isValid(id); }

function withOwner(post, currentId) {
  const item = post.toObject ? post.toObject() : post;
  item.currentUserIsOwner = Boolean(currentId && String(item.author?._id || item.author) === String(currentId));
  return item;
}
const authorPopulate = { path: "author", select: "firstName lastName" };
const replyPopulate = { path: "replies.author", select: "firstName lastName" };

exports.listPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const search = String(req.query.search || "").trim().slice(0, 100);
    if (search) filter.$or = [
      { title: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } },
      { description: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } },
    ];
    const posts = await CommunityPost.find(filter)
      .sort({ createdAt: -1 }).limit(60)
      .populate(authorPopulate).populate(replyPopulate).lean();
    const currentId = userId(req);
    return res.json({ success: true, posts: posts.map((p) => ({ ...p, currentUserIsOwner: Boolean(currentId && String(p.author?._id) === String(currentId)) })) });
  } catch (error) {
    console.error("COMMUNITY LIST:", error);
    return res.status(500).json({ success: false, message: "Could not load community posts." });
  }
};

exports.getPost = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const post = await CommunityPost.findById(req.params.id).populate(authorPopulate).populate(replyPopulate);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    return res.json({ success: true, post: withOwner(post, userId(req)) });
  } catch (error) {
    console.error("COMMUNITY GET:", error);
    return res.status(500).json({ success: false, message: "Could not load post." });
  }
};

exports.createPost = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in to post." });
    const post = await CommunityPost.create({ ...req.validatedPost, author: authorId });
    await post.populate(authorPopulate);
    return res.status(201).json({ success: true, post: withOwner(post, authorId) });
  } catch (error) {
    console.error("COMMUNITY CREATE:", error);
    return res.status(500).json({ success: false, message: "Could not publish your post." });
  }
};

exports.addReply = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in to reply." });
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    post.replies.push({ author: authorId, body: req.validatedReply });
    await post.save();
    await post.populate(authorPopulate);
    await post.populate(replyPopulate);
    return res.status(201).json({ success: true, post: withOwner(post, authorId) });
  } catch (error) {
    console.error("COMMUNITY REPLY:", error);
    return res.status(500).json({ success: false, message: "Could not add reply." });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in to like posts." });
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    const index = post.likes.findIndex((id) => String(id) === String(authorId));
    if (index >= 0) post.likes.splice(index, 1); else post.likes.push(authorId);
    await post.save();
    return res.json({ success: true, likes: post.likes.length, liked: index < 0 });
  } catch (error) {
    console.error("COMMUNITY LIKE:", error);
    return res.status(500).json({ success: false, message: "Could not update like." });
  }
};

exports.markSolved = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in." });
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    if (String(post.author) !== String(authorId)) return res.status(403).json({ success: false, message: "Only the post owner can mark a solution." });
    const replyId = String(req.body.replyId || "");
    const reply = post.replies.id(replyId);
    if (!reply) return res.status(404).json({ success: false, message: "Reply not found." });
    post.replies.forEach((item) => { item.isAccepted = String(item._id) === replyId; });
    post.isSolved = true;
    await post.save();
    return res.json({ success: true, message: "Solution marked." });
  } catch (error) {
    console.error("COMMUNITY SOLVE:", error);
    return res.status(500).json({ success: false, message: "Could not mark solution." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in." });
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    if (String(post.author) !== String(authorId)) return res.status(403).json({ success: false, message: "Only the post owner can delete this post." });
    await post.deleteOne();
    return res.json({ success: true, message: "Post deleted." });
  } catch (error) {
    console.error("COMMUNITY DELETE:", error);
    return res.status(500).json({ success: false, message: "Could not delete post." });
  }
};

exports.reportPost = async (req, res) => {
  try {
    const authorId = userId(req);
    if (!authorId) return res.status(401).json({ success: false, message: "Please log in." });
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid post ID." });
    const reason = String(req.body.reason || "").trim().slice(0, 500);
    if (reason.length < 3) return res.status(400).json({ success: false, message: "Please provide a report reason." });
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    if (String(post.author) === String(authorId)) return res.status(400).json({ success: false, message: "You cannot report your own post." });
    if (post.reports.some((item) => String(item.reporter) === String(authorId))) return res.status(409).json({ success: false, message: "You already reported this post." });
    post.reports.push({ reporter: authorId, reason });
    await post.save();
    return res.status(201).json({ success: true, message: "Report submitted." });
  } catch (error) {
    console.error("COMMUNITY REPORT:", error);
    return res.status(500).json({ success: false, message: "Could not submit report." });
  }
};