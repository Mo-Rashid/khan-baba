import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { API, apiRequest } from "./LoginData";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState("details"); // details | otp
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const startResendTimer = () => {
    setResendTimer(60);
    const id = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const requestOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setMessage("");

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      setError("Enter a valid username.");
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest(API.OTP_REQUEST, {
        method: "POST",
        body: JSON.stringify({
          username: cleanUsername,
          email: cleanEmail,
        }),
      });
      setStep("otp");
      setMessage(data.message || "OTP sent to your email.");
      startResendTimer();
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest(API.OTP_VERIFY, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          code: otp,
        }),
      });

      if (!data.token) throw new Error("No token received.");

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    await requestOtp();
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-card">
          <div className="login-icon">
            <FaShieldAlt />
          </div>

          <h1>{step === "details" ? "Welcome Back" : "Enter OTP"}</h1>
          <p className="login-subtitle">
            {step === "details"
              ? "Login with your username and email"
              : `We sent a code to ${email}`}
          </p>

          {error && <div className="login-error">{error}</div>}
          {message && <div className="login-message">{message}</div>}

          {/* ── STEP 1: Username + Email ── */}
          {step === "details" && (
            <form onSubmit={requestOtp}>
              <label>Username</label>
              <div className="login-input">
                <FaUser />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  disabled={loading}
                  required
                />
              </div>

              <label>Email Address</label>
              <div className="login-input">
                <FaEnvelope />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                />
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "otp" && (
            <form onSubmit={verifyOtp}>
              <label>6-digit OTP</label>
              <div className="login-input">
                <FaLock />
                <input
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit OTP"
                  inputMode="numeric"
                  maxLength={6}
                  disabled={loading}
                  required
                />
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                className="resend-button"
                onClick={resendOtp}
                disabled={loading || resendTimer > 0}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>

              <button
                type="button"
                className="back-button"
                onClick={() => {
                  setStep("details");
                  setOtp("");
                  setError("");
                  setMessage("");
                }}
                disabled={loading}
              >
                <FaArrowLeft /> Change details
              </button>
            </form>
          )}

          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}