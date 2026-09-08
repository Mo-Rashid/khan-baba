import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaBriefcase,
  FaShieldAlt,
  FaBug,
  FaRobot,
  FaUserSecret,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

const NAV_ITEMS = [
  {
    id: "Dashboard",
    label: "Dashboard",
    path: "/",
    icon: <FaThLarge />,
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    path: "/portfolio",
    icon: <FaBriefcase />,
  },
  {
    id: "Bug Bounty",
    label: "Bug Bounty",
    path: "/bug-bounty",
    icon: <FaShieldAlt />,
  },
  {
    id: "Red Teaming",
    label: "Red Teaming",
    path: "/red-teaming",
    icon: <FaBug />,
  },
  {
    id: "AI Red Teaming",
    label: "AI Red Teaming",
    path: "/ai-red-teaming",
    icon: <FaRobot />,
  },
  {
    id: "Ethical Hacking",
    label: "Ethical Hacking",
    path: "/ethical-hacking",
    icon: <FaUserSecret />,
  },
  {
    id: "All-CTF-Lab",
    label: "All-CTF-Lab",
    path: "/all-ctf-lab",
    icon: <FaUserSecret />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    logout();

    // Logout ke baad Dashboard
    navigate("/", { replace: true });
  };

  return (
    <header className="navbar">

      {/* ================= LOGO ================= */}
      <div
        className="logo-area"
        onClick={() => navigate("/")}
      >
        <div className="logo-wrapper">
          <img
            src="/images/logo.png"
            alt="The VulnXploit"
            className="logo"
          />
        </div>

        <div className="logo-content">
          <h1 className="logo-title">
            The VulnXploit
          </h1>

          <p className="logo-sub">
            CYBER SECURITY PLATFORM
          </p>
        </div>
      </div>


      {/* ================= MENU ================= */}
      <nav>
        <ul className="menu">

          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={
                isActive(item.path)
                  ? "active"
                  : ""
              }
              onClick={() => navigate(item.path)}
            >
              {item.icon}

              <span>
                {item.label}
              </span>
            </li>
          ))}

        </ul>
      </nav>


      {/* ================= AUTH ================= */}
      <div className="navbar-auth">

        {isAuthenticated ? (

          /* ================= LOGGED IN ================= */
          <div className="logged-user">

            <div className="user-info">
              <FaUserCircle className="user-icon" />

              <span className="user-name">
                {user?.name ||
                  user?.username ||
                  user?.email ||
                  "User"}
              </span>
            </div>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />

              <span>
                Logout
              </span>
            </button>

          </div>

        ) : (

          /* ================= LOGGED OUT ================= */
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            <FaSignInAlt />

            <span>
              Login
            </span>
          </button>

        )}

      </div>

    </header>
  );
};

export default Navbar;