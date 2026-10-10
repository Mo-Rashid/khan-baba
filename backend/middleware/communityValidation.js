const ALLOWED_CATEGORIES = ["Web Security", "Bug Bounty", "AI Security", "Mobile Security", "DevOps", "General"];

function validateCreatePost(req, res, next) {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
  const category = typeof req.body.category === "string" ? req.body.category : "General";

  if (title.length < 8 || title.length > 120) {
    return res.status(400).json({ success: false, message: "Title must be 8–120 characters." });
  }
  if (description.length < 15 || description.length > 5000) {
    return res.status(400).json({ success: false, message: "Description must be 15–5000 characters." });
  }
  if (!ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({ success: false, message: "Invalid category." });
  }

  req.validatedPost = { title, description, category };
  next();
}

function validateReply(req, res, next) {
  const body = typeof req.body.body === "string" ? req.body.body.trim() : "";
  if (body.length < 2 || body.length > 3000) {
    return res.status(400).json({ success: false, message: "Reply must be 2–3000 characters." });
  }
  req.validatedReply = body;
  next();
}

module.exports = { validateCreatePost, validateReply };
