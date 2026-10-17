import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, apiRequest } from "./LoginData";
import "./Login.css";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest(API.SIGNUP, {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
        }),
      });

      setMessage(data.message || "Account created successfully.");

      // Move to login after a short readable success state.
      window.setTimeout(() => {
        navigate("/login", {
          state: {
            username: username.trim(),
            email: email.trim(),
          },
        });
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="retro-page">
      <div className="retro-scanlines" aria-hidden="true" />

      <section className="retro-form signup-form">
        <p className="retro-kicker">VULNX PLOIT // NEW USER</p>

        <h1 className="retro-title">Register</h1>

        <p className="retro-subtitle">CREATE YOUR ACCOUNT</p>

        <form onSubmit={handleSignup}>
          <div className="retro-field">
            <label htmlFor="signup-username">User Name</label>
            <input
              id="signup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_.-]{3,30}"
              title="Use 3–30 letters, numbers, underscores, dots or hyphens."
              required
              placeholder="Choose a username"
            />
            <small>Your username on the site.</small>
          </div>

          <div className="retro-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={254}
              required
              placeholder="you@example.com"
            />
            <small>Use an email address you can access.</small>
          </div>

          {error && <p className="retro-alert error">{error}</p>}
          {message && <p className="retro-alert success">{message}</p>}

          <div className="retro-actions">
            <Link className="retro-link" to="/login">
              Already registered?
            </Link>

            <button
              className="retro-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "CREATING..." : "SUBMIT"}
            </button>
          </div>
        </form>

        <p className="retro-footer">NEW ACCOUNT // VULNX PLOIT</p>
      </section>
    </main>
  );
}