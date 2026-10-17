import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import API, { apiRequest } from "./LoginData";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("details"); // "details" | "otp"
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── Step 1: Request OTP ───────────────────────────────
  async function requestOtp(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      setError("Enter a valid username (min 3 characters).");
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await apiRequest(API.OTP_REQUEST, {
        method: "POST",
        body: JSON.stringify({
          username: cleanUsername,
          email: cleanEmail,
        }),
      });

      setStep("otp");
      setMessage(result.message || "OTP sent to your registered email.");
    } catch (err) {
      setError(err.message || "Unable to request OTP.");
    } finally {
      setLoading(false);
    }
  }

  // ─── Step 2: Verify OTP ────────────────────────────────
  async function verifyOtp(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const result = await apiRequest(API.OTP_VERIFY, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          code: otp,
        }),
      });

      if (!result.token) {
        throw new Error("Server did not return a token.");
      }

      localStorage.setItem("token", result.token);

      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    setStep("details");
    setOtp("");
    setError("");
    setMessage("");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          Vuln<span>Xploit</span>
        </div>

        <div className="login-symbol">
          {step === "details" ? <FaShieldAlt /> : <FaLock />}
        </div>

        <h1>{step === "details" ? "Welcome back" : "Enter OTP"}</h1>

        <p className="login-subtitle">
          {step === "details"
            ? "Login with your username and registered email"
            : `We sent a 6-digit code to ${email}`}
        </p>

        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="login-message" role="status">
            {message}
          </div>
        )}

        {/* ─── DETAILS STEP ─── */}
        {step === "details" && (
          <form onSubmit={requestOtp}>
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <FaUser />
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                minLength={3}
                maxLength={30}
                disabled={loading}
                required
              />
            </div>

            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* ─── OTP STEP ─── */}
        {step === "otp" && (
          <form onSubmit={verifyOtp}>
            <label htmlFor="otp">6-digit OTP</label>
            <div className="input-with-icon">
              <FaLock />
              <input
                id="otp"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                disabled={loading}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              className="secondary-button"
              disabled={loading}
              onClick={goBack}
            >
              <FaArrowLeft /> Change details
            </button>
          </form>
        )}

        <p className="login-footer">Secure passwordless authentication</p>
      </section>
    </main>
  );
}