import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaShieldAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar/Navbar";

import { API, apiRequest } from "./LoginData";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = form.email.trim().toLowerCase();

    if (!email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest(API.LOGIN, {
        method: "POST",

        body: JSON.stringify({
          email,
          password: form.password,
        }),
      });

      /* =================================================
         SAVE TOKEN
      ================================================= */

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      /* =================================================
         SAVE USER
      ================================================= */

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      /* =================================================
         REDIRECT
      ================================================= */

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message || "Unable to login"
      );

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="login-page">

      {/* =================================================
          TOP NAVBAR
      ================================================= */}

      <div className="login-navbar">
        <Navbar />
      </div>


      {/* =================================================
          LOGIN AREA
      ================================================= */}

      <main className="login-main">

        <div className="auth-card">

          {/* =================================================
              SECURITY ICON
          ================================================= */}

          <div className="auth-icon">
            <FaShieldAlt />
          </div>


          {/* =================================================
              TITLE
          ================================================= */}

          <h1>
            Welcome Back
          </h1>

          <p className="auth-subtitle">
            Login to your The VulnXploit account
          </p>


          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* ================= EMAIL ================= */}

            <label htmlFor="email">
              Email Address
            </label>

            <div className="auth-input">

              <FaEnvelope />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
                required
              />

            </div>


            {/* ================= PASSWORD ================= */}

            <label htmlFor="password">
              Password
            </label>

            <div className="auth-input">

              <FaLock />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >

              {loading ? (
                <span>
                  Logging in...
                </span>
              ) : (
                <>
                  <FaSignInAlt />

                  <span>
                    Login
                  </span>
                </>
              )}

            </button>

          </form>


          {/* =================================================
              SIGNUP
          ================================================= */}

          <p className="auth-footer">

            Don't have an account?{" "}

            <Link to="/signup">
              Create Account
            </Link>

          </p>

        </div>

      </main>

    </div>
  );
};

export default Login;