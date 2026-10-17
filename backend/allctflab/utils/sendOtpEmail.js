
const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing from backend/.env");
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOtpEmail(to, otp) {
  if (!to || !otp) {
    throw new Error("Recipient email and OTP are required.");
  }

  const { data, error } = await resend.emails.send({
    from: "VulnXploit <onboarding@resend.dev>",
    to: [to],
    subject: "Your VulnXploit Login OTP",
    text: `Your login OTP is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:24px">
        <h2>VulnXploit Login</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:8px">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
        <p>If you did not request this code, ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend email failed:", error.message);
    throw new Error("Could not send OTP email.");
  }

  return data;
}

module.exports = sendOtpEmail;
