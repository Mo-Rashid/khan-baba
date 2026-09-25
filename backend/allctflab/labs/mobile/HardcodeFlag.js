const express = require("express");
const router = express.Router();

/*
=========================================================
 HARDCODEFLAG ANDROID CTF
 Backend Flag Validation
=========================================================
*/

const HARDCODEFLAG_FLAG = "FLAG{j4dx_1s_y0ur_fr13nd}";

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

    if (submittedFlag !== HARDCODEFLAG_FLAG) {
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
      message: "HardcodeFlag challenge completed successfully!",
      points: 100,
      flag: HARDCODEFLAG_FLAG,
    });
  } catch (error) {
    console.error("HARDCODEFLAG FLAG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;