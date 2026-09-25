const express = require("express");

const router = express.Router();

/*
=========================================================
 VULNX2 ANDROID CTF
 Backend Flag Validation
=========================================================
*/

// Keep the challenge flag ONLY on backend
const VULNX2_FLAG = "FLAG{vulnx2_android_advanced_secret}";

/*
=========================================================
 POST /api/allctflab/mobile/vulnx2/submit
=========================================================
*/

router.post("/submit", async (req, res) => {
  try {
    const { flag } = req.body;

    // Basic validation
    if (!flag || typeof flag !== "string") {
      return res.status(400).json({
        success: false,
        message: "Flag is required.",
      });
    }

    const submittedFlag = flag.trim();

    // Prevent extremely large input
    if (submittedFlag.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Invalid flag format.",
      });
    }

    /*
    =====================================================
    FLAG CHECK
    =====================================================
    */

    if (submittedFlag !== VULNX2_FLAG) {
      return res.status(200).json({
        success: false,
        correct: false,
        message: "Incorrect flag. Continue analyzing the APK.",
      });
    }

    /*
    =====================================================
    SUCCESS
    =====================================================
    */

    return res.status(200).json({
      success: true,
      correct: true,
      completed: true,
      message: "VulnX2 challenge completed successfully!",
      points: 200,

      // Returned ONLY after successful validation
      flag: VULNX2_FLAG,
    });

  } catch (error) {
    console.error("VULNX2 FLAG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;