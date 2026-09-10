const express = require("express");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Hardcode Flag
|--------------------------------------------------------------------------
| Change this flag to whatever flag is actually hidden inside your APK.
|--------------------------------------------------------------------------
*/

const FLAG =
  process.env.HARDCODE_FLAG ||
  "KHAN{hardcode_android_secret}";


/*
|--------------------------------------------------------------------------
| SUBMIT FLAG
|--------------------------------------------------------------------------
| Frontend sends:
| {
|   "flag": "KHAN{....}"
| }
|--------------------------------------------------------------------------
*/

router.post("/submit", (req, res) => {
  try {
    const submittedFlag = String(
      req.body?.flag || ""
    ).trim();

    // Empty flag
    if (!submittedFlag) {
      return res.status(400).json({
        success: false,
        message: "Please enter a flag."
      });
    }


    // Flag match
    if (submittedFlag === FLAG) {
      return res.status(200).json({
        success: true,
        message:
          "Hardcode Flag challenge completed successfully!",
        flag: submittedFlag,
        points: 150,
        challenge: "Hardcode Flag"
      });
    }


    // Wrong flag
    return res.status(200).json({
      success: false,
      message:
        "Incorrect flag. Continue analyzing the APK."
    });

  } catch (error) {

    console.error(
      "Hardcode Flag submission error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
});


module.exports = router;