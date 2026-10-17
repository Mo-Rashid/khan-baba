import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    const timer = window.setTimeout(
      () => setResendTimer((value) => value - 1),
      1000
    );

    return () => window.clearTimeout(timer);
  }, [resendTimer]);

  async function requestOtp(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest(API.OTP_REQUEST, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
        }),
      });

      setStep("otp");
      setMessage(data.message || "OTP sent. Check your email.");
      setResendTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest(API.OTP_VERIFY, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          code: otp.trim(),
        }),
      });

      if (!data.token) {
        throw new Error("Login succeeded without a token.");
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    if (resendTimer > 0 || loading) return;

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest(API.OTP_REQUEST, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
        }),
      });

      setMessage(data.message || "A new OTP has been sent.");
      setResendTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="retro-page">
      <div className="retro-scanlines" aria-hidden="true" />

      <section className="retro-form login-form">
        <p className="retro-kicker">VULNX PLOIT // AUTH SYSTEM</p>

        <h1 className="retro-title">
          {step === "details" ? "Log in" : "Verify OTP"}
        </h1>

        <p className="retro-subtitle">
          {step === "details"
            ? "ENTER YOUR ACCOUNT DETAILS"
            : "CHECK YOUR EMAIL FOR THE CODE"}
        </p>

        {step === "details" ? (
          <form onSubmit={requestOtp}>
            <div className="retro-field">
              <label htmlFor="login-username">User Name</label>
              <input
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                minLength={3}
                maxLength={30}
                required
                placeholder="Enter username"
              />
            </div>

            <div className="retro-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
              <small>OTP will be sent to this registered email.</small>
            </div>

            {error && <p className="retro-alert error">{error}</p>}
            {message && <p className="retro-alert success">{message}</p>}

            <div className="retro-actions">
              <Link className="retro-link" to="/signup">
                Create an account
              </Link>

              <button className="retro-button" disabled={loading} type="submit">
                {loading ? "SENDING..." : "SEND OTP"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <p className="retro-description">
              OTP requested for <strong>{email}</strong>
            </p>

            <div className="retro-field">
              <label htmlFor="login-otp">6-Digit OTP</label>
              <input
                id="login-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                required
                placeholder="000000"
              />
              <small>OTP expires according to server policy.</small>
            </div>

            {error && <p className="retro-alert error">{error}</p>}
            {message && <p className="retro-alert success">{message}</p>}

            <div className="retro-actions otp-actions">
              <button
                className="retro-text-button"
                type="button"
                onClick={() => {
                  setStep("details");
                  setOtp("");
                  setError("");
                  setMessage("");
                }}
              >
                ← BACK
              </button>

              <button
                className="retro-button"
                disabled={loading || otp.length !== 6}
                type="submit"
              >
                {loading ? "VERIFYING..." : "VERIFY OTP"}
              </button>
            </div>

            <button
              className="retro-resend"
              type="button"
              onClick={resendOtp}
              disabled={loading || resendTimer > 0}
            >
              {resendTimer > 0
                ? `RESEND OTP IN ${resendTimer}s`
                : "RESEND OTP"}
            </button>
          </form>
        )}

        <p className="retro-footer">SECURE ACCESS // VULNX PLOIT</p>
      </section>
    </main>
  );
}