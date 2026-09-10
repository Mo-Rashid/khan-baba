const express = require("express");
const path = require("path");

const router = express.Router();

/*
=========================================================
VULNX2 — SINGLE APK CHALLENGE
=========================================================
*/

// Keep the real flag ONLY on backend.
const FLAG =
  process.env.VULNX2_FLAG ||
  "KHAN{vulnx2_android_secret}";


/*
=========================================================
DOWNLOAD APK
=========================================================
*/

router.get("/download", (req, res) => {
  const apkPath = path.join(
    __dirname,
    "files",
    "vulnX2.apk"
  );

  res.download(
    apkPath,
    "vulnX2.apk",
    (error) => {
      if (error) {
        console.error(
          "VulnX2 APK download error:",
          error
        );

        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Unable to download APK.",
          });
        }
      }
    }
  );
});


/*
=========================================================
FLAG SUBMISSION
=========================================================
*/

router.post("/submit", (req, res) => {

  try {

    const submittedFlag =
      String(req.body?.flag || "").trim();


    /*
    ---------------------------------------------
    Empty flag
    ---------------------------------------------
    */

    if (!submittedFlag) {
      return res.status(400).json({
        success: false,
        message: "Flag is required.",
      });
    }


    /*
    ---------------------------------------------
    Correct flag
    ---------------------------------------------
    */

    if (submittedFlag === FLAG) {

      return res.status(200).json({
        success: true,

        message:
          "VulnX2 Android challenge completed successfully!",

        flag: submittedFlag,

        points: 200,

        challenge: "VulnX2",
      });
    }


    /*
    ---------------------------------------------
    Incorrect flag
    ---------------------------------------------
    */

    return res.status(200).json({
      success: false,

      message:
        "Incorrect flag. Continue analyzing the APK.",
    });

  } catch (error) {

    console.error(
      "VulnX2 submission error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});


module.exports = router;