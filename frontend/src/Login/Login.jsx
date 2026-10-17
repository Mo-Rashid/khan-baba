
import { useEffect, useState } from "react";
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

  const [step, setStep] = useState("details");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setTimeout(() => {
      setResendTimer((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const requestOtp = async (event) => {
    event?.preventDefault();

    setError("");
    setMessage("");

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[a-z0-9_.-]{3,30}$/.test(cleanUsername)) {
      setError("Username must be 3–30 valid characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Enter a valid email address.");
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

      setUsername(cleanUsername);
      setEmail(cleanEmail);
      setOtp("");
      setStep("otp");
      setMessage(data.message || "OTP sent. Check your email.");
      setResendTimer(60);
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the complete 6-digit OTP.");
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

      if (!data.token) {
        throw new Error("Server did not return a login token.");
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    await requestOtp();
  };

  const changeDetails = () => {
    setStep("details");
    setOtp("");
    setError("");
    setMessage("");
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-card">
          <h2 className="login-brand">
            Vuln<span>Xploit</span>
          </h2>

          <div className="login-icon">
            <FaShieldAlt />
          </div>

          <h1>
            {step === "details" ? "Welcome Back" : "Enter OTP"}
          </h1>

          <p className="login-subtitle">
            {step === "details"
              ? "Login with your username and registered email"
              : `Enter the 6-digit code sent to ${email}`}
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

          {step === "details" && (
            <form onSubmit={requestOtp}>
              <label htmlFor="username">Username</label>

              <div className="login-input">
                <FaUser />
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  disabled={loading}
                  required
                />
              </div>

              <label htmlFor="email">Email Address</label>

              <div className="login-input">
                <FaEnvelope />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter registered email"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyOtp}>
              <label htmlFor="otp">6-digit OTP</label>

              <div className="login-input">
                <FaLock />
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  placeholder="Enter 6-digit OTP"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
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
                onClick={changeDetails}
                disabled={loading}
              >
                <FaArrowLeft /> Change details
              </button>
            </form>
          )}

          <p className="login-footer">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Create Account</Link>
          </p>

          <p className="login-security">
            Secure passwordless authentication
          </p>
        </div>
      </main>
    </div>
  );
}
