
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const otpLoginRoutes = require("./routes/otpLoginRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const chatRoutes = require("./routes/chatRoutes");

const labRoutes = require("./allctflab/routes/labRoutes");
const mobileRouter = require("./allctflab/labs/mobile/android");

const app = express();

// ======================================================
// CONFIGURATION
// ======================================================

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// Trust one reverse proxy, such as Nginx.
// Keep the backend inaccessible directly from untrusted networks.
app.set("trust proxy", 1);

// ======================================================
// RESEND EMAIL CONFIGURATION
// ======================================================

let resend = null;

if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
  console.log("Resend API: Configured");
} else {
  console.error("Resend API: Missing RESEND_API_KEY");
}

// ======================================================
// DATABASE CONNECTION
// ======================================================

connectDB();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================================
// EMAIL FUNCTION
// Existing auth routes can use global.sendEmail()
// ======================================================

global.sendEmail = async function (to, subject, htmlContent) {
  try {
    if (!resend) {
      return {
        success: false,
        error: "Email service is not configured",
      };
    }

    if (!to || typeof to !== "string") {
      return {
        success: false,
        error: "Recipient email is required",
      };
    }

    // RESEND_FROM_EMAIL should be an email address only,
    // for example: onboarding@resend.dev
    const result = await resend.emails.send({
      from: `KHAN SPLOIT <${RESEND_FROM_EMAIL}>`,
      to: [to],
      subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error("Resend email error:", result.error);

      return {
        success: false,
        error: "Email could not be sent",
      };
    }

    console.log("Email sent successfully");

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Email sending failed:", error.message);

    return {
      success: false,
      error: "Email sending failed",
    };
  }
};
app.use("/api/auth", authRoutes);

// OTP routes already hain:================
// API ROUTES
// ======================================================

// Email OTP login
app.use("/api/auth/otp", otpLoginRoutes);



// Feedback
app.use("/api/feedback", feedbackRoutes);

// Labs
app.use("/api/labs/mobile", mobileRouter);
app.use("/api/labs", labRoutes);

// Chat
app.use("/api/chat", chatRoutes);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KHAN SPLOIT Backend is running",
    emailService: resend ? "Configured" : "Not configured",
  });
});

// ======================================================
// EMAIL SERVICE STATUS
// Do not expose API keys or other secrets here.
// ======================================================

app.get("/api/email/status", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Resend",
    configured: Boolean(RESEND_API_KEY),
    from: RESEND_FROM_EMAIL,
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================================
// START SERVER
// ======================================================

const server = app.listen(PORT, () => {
  console.log("======================================");
  console.log("KHAN SPLOIT BACKEND");
  console.log("======================================");
  console.log(`Port: ${PORT}`);
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Resend: ${resend ? "Configured" : "Missing"}`);
  console.log("Backend ready");
  console.log("======================================");
});

// ======================================================
// PROCESS ERROR HANDLERS
// ======================================================

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  server.close(() => {
    process.exit(1);
  });
});
