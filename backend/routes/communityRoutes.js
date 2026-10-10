const express = require("express");
const controller = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateCreatePost, validateReply } = require("../middleware/communityValidation");

const router = express.Router();

// Public read routes. Optional auth is not needed to browse the feed.
router.get("/posts", controller.listPosts);
router.get("/posts/:id", controller.getPost);

// Protected write routes: authMiddleware must set req.user from the verified JWT.
router.post("/posts", authMiddleware, validateCreatePost, controller.createPost);
router.post("/posts/:id/replies", authMiddleware, validateReply, controller.addReply);
router.post("/posts/:id/like", authMiddleware, controller.toggleLike);
router.patch("/posts/:id/solved", authMiddleware, controller.markSolved);
router.delete("/posts/:id", authMiddleware, controller.deletePost);
router.post("/posts/:id/report", authMiddleware, controller.reportPost);

module.exports = router;
