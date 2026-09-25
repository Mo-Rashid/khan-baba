const express = require("express");
const router = express.Router();

/*
=========================================================
 VULNX ANDROID CTF
 Backend Flag Validation
=========================================================
*/

// Keep the challenge flag ONLY on backend
const VULNX_FLAG = "FLAG{h4rdc0d3d_s3cr3t_1n_j4v4}";

/*
=========================================================
 POST /api/allctflab/mobile/vulnx/submit
=========================================================
*/

router.post("/submit", async (req, res) => {
  try {
    const { flag } = req.body;

    if (!flag || typeof flag !== "string") {
      return res.status(400).json({
        success: false,
        message: "Flag is required.",
      });
    }

    const submittedFlag = flag.trim();

    if (submittedFlag.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Invalid flag format.",
      });
    }

    if (submittedFlag !== VULNX_FLAG) {
      return res.status(200).json({
        success: false,
        correct: false,
        message: "Incorrect flag. Continue analyzing the APK.",
      });
    }

    return res.status(200).json({
      success: true,
      correct: true,
      completed: true,
      message: "VulnX challenge completed successfully!",
      points: 150,
      flag: VULNX_FLAG,
    });
  } catch (error) {
    console.error("VULNX FLAG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;