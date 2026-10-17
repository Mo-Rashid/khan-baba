
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");

  async function requestOtp(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!identifier.trim()) {
      setError("Enter your email or phone number.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/otp/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: identifier.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not request OTP.");
      }

      setChannel(data.channel);
      setOtpSent(true);
      setMessage(
        data.channel === "email"
          ? "Check your registered email for the OTP."
          : "Check your registered phone for the SMS OTP."
      );
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

    if (!/^\d{4,10}$/.test(code.trim())) {
      setError("Enter the OTP you received.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/otp/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: identifier.trim(),
            code: code.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }

      // Update these to match your existing AuthContext
      // if your application stores authentication differently.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function changeIdentifier() {
    setOtpSent(false);
    setCode("");
    setError("");
    setMessage("");
  }

  return (
    <main className="otp-login-page">
      <section className="otp-login-card">
        <div className="otp-login-brand">VulnXploit</div>
        <h1>Welcome back</h1>
        <p className="otp-login-subtitle">
          Sign in securely with your registered email or phone.
        </p>

        {!otpSent ? (
          <form onSubmit={requestOtp}>
            <label htmlFor="identifier">Email or phone number</label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              placeholder="Email or +919876543210"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <button type="submit" disabled={busy}>
              {busy ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="otp-destination">
              OTP requested via{" "}
              <strong>
                {channel === "email" ? "Email" : "SMS"}
              </strong>
              <br />
              <span>{identifier}</span>
            </div>

            <label htmlFor="otp-code">Verification code</label>
            <input
              id="otp-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter OTP"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              required
            />

            <button type="submit" disabled={busy}>
              {busy ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              className="otp-secondary-button"
              onClick={changeIdentifier}
              disabled={busy}
            >
              Change email or phone
            </button>
          </form>
        )}

        {error && <p className="otp-error" role="alert">{error}</p>}
        {message && <p className="otp-success" role="status">{message}</p>}
      </section>
    </main>
  );
}
