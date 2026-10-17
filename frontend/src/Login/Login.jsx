import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import { API, apiRequest } from "./LoginData";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(""); // username YA email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!login.trim() || !password) {
      setError("Enter username/email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest(API.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          login: login.trim().toLowerCase(),
          password,
        }),
      });

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-card">
          <div className="login-icon">
            <FaShieldAlt />
          </div>

          <h1>Welcome Back</h1>
          <p className="login-subtitle">Login with username or email</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Username or Email</label>
            <div className="login-input">
              <FaUser />
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Username or email"
                autoComplete="username"
                disabled={loading}
                required
              />
            </div>

            <label>Password</label>
            <div className="login-input">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
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

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-footer">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}