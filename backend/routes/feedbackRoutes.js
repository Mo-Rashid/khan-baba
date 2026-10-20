
const express = require("express");
const router = express.Router();

const {
  getFeedback,
  createFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getFeedback);

// Public review submission.
router.post("/", createFeedback);

// Deletion remains protected.
router.delete("/:id", authMiddleware, deleteFeedback);

module.exports = router;
