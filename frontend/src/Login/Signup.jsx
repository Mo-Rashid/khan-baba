import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import { API, apiRequest } from "./LoginData";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const username = form.username.trim().toLowerCase();
    const email = form.email.trim().toLowerCase();

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest(API.SIGNUP, {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-main">
        <div className="signup-card">
          <div className="signup-icon">
            <FaShieldAlt />
          </div>

          <h1>Create Account</h1>
          <p className="signup-subtitle">Join the VulnXploit community</p>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <div className="signup-input">
              <FaUser />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                disabled={loading}
                required
              />
            </div>

            <label>Email Address</label>
            <div className="signup-input">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            <label>Password</label>
            <div className="signup-input">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label>Confirm Password</label>
            <div className="signup-input">
              <FaLock />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((p) => !p)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="signup-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </main>
    </div>
  );
}