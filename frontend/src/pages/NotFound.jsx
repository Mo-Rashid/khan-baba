
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 | Page Not Found — VulnXploit";
  }, []);

  return (
    <main className="vx-404">
      <div className="vx-404-grid" />

      <div className="vx-404-card">
        <div className="vx-404-badge">
          <span className="vx-status-dot" />
          SYSTEM MESSAGE // 404 ERROR
        </div>

        <div className="vx-404-emoji" aria-hidden="true">
          🕵️‍♂️
        </div>

        <div className="vx-404-number">
          4<span>0</span>4
        </div>

        <h1>
          Oops! <span>Page Not Found</span> 🔍
        </h1>

        <p className="vx-404-description">
          Looks like you've entered an unknown territory.
          This page may have been moved, deleted, or never existed.
        </p>

        <div className="vx-404-terminal">
          <p>
            <span className="vx-terminal-symbol">➜</span>{" "}
            <span className="vx-terminal-command">vulnxploit</span>{" "}
            locate --page
          </p>
          <p className="vx-terminal-error">
            ✖ Error: Requested resource could not be found.
          </p>
          <p className="vx-terminal-hint">
            💡 Hint: Check the URL or return to a safe location.
          </p>
        </div>

        <div className="vx-404-actions">
          <Link to="/" className="vx-btn vx-btn-primary">
            🏠 Back to Home
          </Link>

          <button
            type="button"
            className="vx-btn vx-btn-secondary"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
          >
            ↩️ Go Back
          </button>
        </div>

        <div className="vx-404-footer">
          <span>🛡️ Stay Secure</span>
          <span className="vx-footer-divider">•</span>
          <span>⚡ Keep Exploring</span>
          <span className="vx-footer-divider">•</span>
          <span>💜 VulnXploit</span>
        </div>
      </div>

      <div className="vx-404-decoration vx-decoration-one">
        {"{ }"}
      </div>
      <div className="vx-404-decoration vx-decoration-two">
        {"</>"}
      </div>
    </main>
  );
}
