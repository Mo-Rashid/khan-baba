require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const labRoutes = require("./allctflab/routes/labRoutes");
const { Resend } = require("resend");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// CONFIG
// ======================================================

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const RESEND_API_KEY = process.env.RESEND_API_KEY;


const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";



// ======================================================
// RESEND mobile 
// ======================================================
let resend = null;

if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
  console.log("📧 Resend API: Configured ✅");
} else {
  console.log("📧 Resend API: Missing ❌");
}

// ======================================================
// DATABASE
// ======================================================

connectDB();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.json({limit: "1mb", }));
app.use(express.urlencoded({ extended: true }));


// ====================== ROUTES (middleware ke baad) ======================
const mobileRouter = require("./allctflab/labs/mobile/android");
app.use("/api/labs/mobile", mobileRouter);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/labs", labRoutes);

// ======================================================
// EMAIL FUNCTION
// ======================================================
// Existing authRoutes can continue using global.sendEmail
// ======================================================

global.sendEmail = async function (to, subject, htmlContent) {
  try {
    if (!resend) {
      console.error("❌ RESEND_API_KEY is missing");
      return {
        success: false,
        error: "Email service is not configured",
      };
    }

    if (!to) {
      return {
        success: false,
        error: "Recipient email is required",
      };
    }

    const result = await resend.emails.send({
      from: `KHAN SPLOIT <${RESEND_FROM_EMAIL}>`,
      to: [to],
      subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error("❌ Resend API Error:", result.error);

      return {
        success: false,
        error: result.error,
      };
    }

    console.log(
      `✅ Email sent successfully to ${to}`
    );

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error(
      "❌ Email sending failed:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

// ======================================================
// ROUTES
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/labs", labRoutes);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KHAN SPLOIT Backend is running",
    server: `http://localhost:${PORT}`,
    frontend: FRONTEND_URL,
    emailService: resend ? "Resend configured" : "Resend missing",
  });
});

// ======================================================
// EMAIL SERVICE STATUS
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
// 404
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
  console.error("❌ SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================================
// START SERVER
// ======================================================

const server = app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("🚀 KHAN SPLOIT BACKEND");
  console.log("======================================");
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🌐 Frontend: ${FRONTEND_URL}`);
  console.log(
    `📧 Resend: ${
      RESEND_API_KEY
        ? "Configured ✅"
        : "Missing ❌"
    }`
  );
  console.log(
    `📨 From: ${RESEND_FROM_EMAIL}`
  );
  console.log("======================================");
  console.log("🔥 Backend ready");
  console.log("======================================");
});

// ======================================================
// PROCESS ERROR HANDLERS
// ======================================================

process.on("unhandledRejection", (error) => {
  console.error(
    "❌ Unhandled Promise Rejection:",
    error
  );
});

process.on("uncaughtException", (error) => {
  console.error(
    "❌ Uncaught Exception:",
    error
  );

  server.close(() => {
    process.exit(1);
  });
});