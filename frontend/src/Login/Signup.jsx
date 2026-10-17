import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { API, apiRequest } from "./LoginData";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const username = form.username.trim().toLowerCase();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim().toLowerCase();

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!firstName || !lastName) {
      setError("Please enter first name and last name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest(API.SIGNUP, {
        method: "POST",
        body: JSON.stringify({ username, firstName, lastName, email }),
      });

      setSuccess(data.message || "Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
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
          <div className="signup-icon"><FaShieldAlt /></div>
          <h1>Create Account</h1>
          <p className="signup-subtitle">Join the VulnXploit community</p>

          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <div className="signup-input">
              <FaUser />
              <input
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="name-row">
              <div>
                <label>First Name</label>
                <div className="signup-input">
                  <FaUser />
                  <input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Last Name</label>
                <div className="signup-input">
                  <FaUser />
                  <input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            <label>Email Address</label>
            <div className="signup-input">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="signup-footer">
            Already have an account? <Link to="/login">Sign In with OTP</Link>
          </p>
        </div>
      </main>
    </div>
  );
}