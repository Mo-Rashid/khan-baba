const express = require("express");
const router = express.Router();

/*
=========================================================
 VULNAPKTOOL ANDROID CTF
 Backend Flag Validation
=========================================================
*/

const VULNAPKTOOL_FLAG = "TVX{m4n1f3st_m3t4_d4t4_fl4g}";

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

    if (submittedFlag !== VULNAPKTOOL_FLAG) {
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
      message: "VulnApktool challenge completed successfully!",
      points: 180,
      flag: VULNAPKTOOL_FLAG,
    });
  } catch (error) {
    console.error("VULNAPKTOOL FLAG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;