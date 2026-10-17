
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function sendOtp(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,30}$/.test(cleanUsername)) {
      setError("Username must be 3–30 characters (letters, numbers, underscores).");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/otp/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: cleanUsername,
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not send OTP.");
      }

      setUsername(cleanUsername);
      setEmail(cleanEmail);
      setOtpSent(true);
      setMessage("OTP sent. Check your registered email.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/otp/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            code: code.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }

      if (!data.token || !data.user) {
        throw new Error("Server did not return a valid login session.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function changeDetails() {
    setOtpSent(false);
    setCode("");
    setError("");
    setMessage("");
  }

  return (
    <main className="otp-login-page">
      <section className="otp-login-card">
        <div className="otp-login-brand">VulnXploit</div>

        <h1>{otpSent ? "Verify Your Email" : "Welcome Back"}</h1>

        <p className="otp-login-subtitle">
          {otpSent
            ? "Enter the 6-digit code sent to your email."
            : "Login securely using your username and registered email."}
        </p>

        {!otpSent ? (
          <form onSubmit={sendOtp}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={30}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              required
            />

            <button type="submit" disabled={busy}>
              {busy ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="otp-destination">
              Username: {username}
              <br />
              Email: {email}
            </div>

            <label htmlFor="otp-code">6-Digit OTP</label>
            <input
              id="otp-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter OTP"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
              required
            />

            <button type="submit" disabled={busy}>
              {busy ? "Verifying..." : "Verify OTP & Login"}
            </button>

            <button
              type="button"
              className="otp-secondary-button"
              onClick={changeDetails}
              disabled={busy}
            >
              Go Back
            </button>
          </form>
        )}

        {error && <p className="otp-error" role="alert">{error}</p>}
        {message && <p className="otp-success" role="status">{message}</p>}
      </section>
    </main>
  );
}
