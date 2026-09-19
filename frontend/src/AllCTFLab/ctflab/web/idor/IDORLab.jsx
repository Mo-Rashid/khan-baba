import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./IDORLab.css";

const TOTAL_LABS = 5;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/labs";

const LABS = [
  {
    id: 1,
    title: "Basic IDOR",
    type: "BASIC",
    difficulty: "Beginner",
    points: 100,
    description:
      "The API returns user data based on an ID parameter without checking ownership.",
    objective:
      "Access another user's profile by changing the id parameter.",
    hint: "Try id=1, id=2, or sequential IDs while authenticated as a normal user.",
    source: `app.get("/api/user", (req, res) => {
  // No ownership check
  const user = db.findUser(req.query.id);
  res.json(user);
});`,
    placeholder: "id=",
  },
  {
    id: 2,
    title: "Horizontal IDOR",
    type: "HORIZONTAL",
    difficulty: "Beginner",
    points: 150,
    description:
      "Users can access other users' resources at the same privilege level (e.g. orders, documents).",
    objective:
      "View or modify another user's order / resource by changing the object ID.",
    hint: "Change the order ID or document ID in the URL while staying as a normal user.",
    source: `app.get("/api/orders/:id", (req, res) => {
  // Missing: order.userId === req.user.id
  res.json(getOrder(req.params.id));
});`,
    placeholder: "orders",
  },
  {
    id: 3,
    title: "Vertical IDOR",
    type: "VERTICAL",
    difficulty: "Intermediate",
    points: 200,
    description:
      "A low-privilege user can access admin-only endpoints or resources by manipulating IDs.",
    objective:
      "Access an admin resource or perform an admin action via IDOR.",
    hint: "Try admin user IDs, role parameters, or /admin/ paths with different IDs.",
    source: `app.get("/api/admin/users/:id", (req, res) => {
  // No role check
  res.json(getUser(req.params.id));
});`,
    placeholder: "admin or role=",
  },
  {
    id: 4,
    title: "API IDOR",
    type: "API",
    difficulty: "Intermediate",
    points: 250,
    description:
      "A modern API (REST/GraphQL-style) exposes object references without authorization checks.",
    objective:
      "Access another user's data through the API by changing user_id / uuid parameters.",
    hint: "Look for user_id, account_id, or UUID parameters in API requests.",
    source: `// GET /api/v2/profile?user_id=...
// No authorization on user_id`,
    placeholder: "user_id=",
  },
  {
    id: 5,
    title: "Blind IDOR",
    type: "BLIND",
    difficulty: "Advanced",
    points: 300,
    description:
      "The application does not return the full object, but responses still leak whether a resource exists or is accessible.",
    objective:
      "Confirm access to unauthorized resources using status codes, timing, or subtle differences.",
    hint: "Compare responses for different IDs — 200 vs 403 vs 404, or content-length differences.",
    source: `// Returns 200 even for other users' resources
// or different error messages`,
    placeholder: "id= or ",
  },
];

const IDORLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-idor-progress");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [requestLog, setRequestLog] = useState("");
  const [responseLog, setResponseLog] = useState("");
  const [challengeMessage, setChallengeMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [flag, setFlag] = useState("");
  const [labStarted, setLabStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lab = useMemo(() => LABS.find((l) => l.id === currentLab), [currentLab]);
  const isCompleted = completedLabs.includes(currentLab);
  const completedCount = completedLabs.length;
  const progress = Math.round((completedCount / TOTAL_LABS) * 100);

  useEffect(() => {
    localStorage.setItem("khansploit-idor-progress", JSON.stringify(completedLabs));
  }, [completedLabs]);

  useEffect(() => {
    if (!labStarted || isCompleted) return;
    const timer = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [labStarted, isCompleted]);

  useEffect(() => {
    setInput("");
    setResult("");
    setRequestLog("");
    setResponseLog("");
    setChallengeMessage("");
    setShowHint(false);
    setShowSource(false);
    setShowFlag(false);
    setFlag("");
    setLabStarted(completedLabs.includes(currentLab));
  }, [currentLab]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  const startLab = () => {
    setLabStarted(true);
    setChallengeMessage("");
    setResult("");
    setRequestLog("");
    setResponseLog("");
    setFlag("");
  };

  const submitToBackend = async () => {
    if (!input.trim()) {
      setChallengeMessage("Enter an ID or parameter to test for IDOR.");
      return;
    }

    setIsSubmitting(true);
    setChallengeMessage("");
    setResult("");
    setRequestLog("");
    setResponseLog("");
    setFlag("");
    setShowFlag(false);

    try {
      const res = await fetch(`${API_BASE}/web/idor/${currentLab}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input }),
      });

      const data = await res.json();
      setRequestLog(data.request || `Payload: ${input.substring(0, 100)}`);
      setResponseLog(data.response || "");

      if (data.success) {
        setResult("IDOR successfully exploited!");
        setFlag(data.flag);
        setShowFlag(true);
        setShowSuccess(true);
        setChallengeMessage(data.message || "Challenge solved successfully.");
        if (!completedLabs.includes(currentLab)) {
          setCompletedLabs((prev) => [...prev, currentLab]);
        }
      } else {
        setResult("Payload did not trigger IDOR.");
        setChallengeMessage(data.message || "Try a different ID or parameter.");
      }
    } catch (err) {
      console.error(err);
      setChallengeMessage("Server error. Is backend running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeLab = () => submitToBackend();
  const nextLab = () => currentLab < TOTAL_LABS && setCurrentLab(currentLab + 1);

  const resetProgress = () => {
    localStorage.removeItem("khansploit-idor-progress");
    setCompletedLabs([]);
    setCurrentLab(1);
    setInput("");
    setResult("");
    setRequestLog("");
    setResponseLog("");
    setChallengeMessage("");
    setShowSuccess(false);
    setShowFlag(false);
    setFlag("");
    setLabStarted(false);
    setElapsed(0);
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(lab.source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const LAB_KEY = "web-idor";
      
      const [expName, setExpName] = useState("");
      const [expMessage, setExpMessage] = useState("");
      
      const [experiences, setExperiences] = useState([]);
      
      
      // ========================================
      // SUBMIT EXPERIENCE
      // ========================================
      
      const submitExperience = () => {
        const name = expName.trim();
        const message = expMessage.trim();
      
        if (!name) {
          alert("Please enter your name.");
          return;
        }
      
        if (!message) {
          alert("Please write a short message.");
          return;
        }
      
        if (message.length > 50) {
          alert("Message max 50 characters.");
          return;
        }
      
        const entry = {
          id: Date.now(),
          name: name.slice(0, 24),
          message: message.slice(0, 50),
          lab: LAB_KEY,
          date: "Just now",
        };
      
        // New review sabse upar
        setExperiences((prev) => [
          entry,
          ...prev,
        ].slice(0, 100));
      
        // Form clear
        setExpName("");
        setExpMessage("");
      };
      
      
      // ========================================
      // ONLY iOS REVIEWS
      // ========================================
      
      const visibleExperiences = experiences.filter(
        (e) => e.lab === LAB_KEY
      );

  return (
    <div className="idor-lab-page">
      <Navbar />

      <section className="idor-hero">
        <div className="hero-badge">VulnXploit / WEB CTF</div>
        <h1>
          IDOR
          <span>PLAYGROUND</span>
        </h1>
        <p>
          Master Insecure Direct Object Reference through progressive hands-on challenges
          covering basic, horizontal, vertical, API and blind IDOR.
        </p>

        <div className="hero-stats">
          <div><strong>{completedCount}</strong><span>SOLVED</span></div>
          <div><strong>{TOTAL_LABS}</strong><span>CHALLENGES</span></div>
          <div><strong>{progress}%</strong><span>PROGRESS</span></div>
          <div><strong>{formatTime(elapsed)}</strong><span>TIME</span></div>
        </div>

        <div className="main-progress">
          <div className="progress-label">
            <span>LAB PROGRESS</span>
            <strong>{completedCount}/{TOTAL_LABS}</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="lab-layout">
        <aside className="lab-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">IDOR CHALLENGES</div>
            {LABS.map((item) => {
              const completed = completedLabs.includes(item.id);
              const locked = item.id > 1 && !completedLabs.includes(item.id - 1);
              return (
                <button
                  key={item.id}
                  className={`lab-nav-item ${currentLab === item.id ? "active" : ""} ${completed ? "completed" : ""} ${locked ? "locked" : ""}`}
                  disabled={locked}
                  onClick={() => setCurrentLab(item.id)}
                >
                  <div className="nav-number">
                    {completed ? "✓" : String(item.id).padStart(2, "0")}
                  </div>
                  <div className="nav-info">
                    <strong>{item.title}</strong>
                    <span>{item.type}</span>
                  </div>
                  {locked && <span className="lock-icon">🔒</span>}
                </button>
              );
            })}
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">LAB STATUS</div>
            <div className="status-row"><span>Difficulty</span><strong>{lab.difficulty}</strong></div>
            <div className="status-row"><span>Points</span><strong>{lab.points} XP</strong></div>
            <div className="status-row"><span>Type</span><strong>{lab.type}</strong></div>
          </div>

          <button className="reset-progress" onClick={resetProgress}>
            ↻ Reset Progress
          </button>
        </aside>

        <section className="challenge-area">
          <div className="challenge-top">
            <div>
              <div className="challenge-category">
                LEVEL {String(lab.id).padStart(2, "0")} / {lab.type}
              </div>
              <h2>{lab.title}</h2>
              <p>{lab.description}</p>
            </div>
            <div className="challenge-points">
              <span>REWARD</span>
              <strong>+{lab.points}</strong>
              <small>XP</small>
            </div>
          </div>

          <div className="ctf-card objective-card">
            <div className="card-title">
              <span className="card-icon">🎯</span>
              <div>
                <h3>Mission Objective</h3>
                <span>What you need to accomplish</span>
              </div>
            </div>
            <div className="objective-content">
              <strong>Your Mission</strong>
              <p>{lab.objective}</p>
            </div>
          </div>

          {!labStarted && !isCompleted ? (
            <div className="start-card">
              <div className="start-icon">⚡</div>
              <h3>Ready to Start?</h3>
              <p>
                This challenge contains an intentionally vulnerable
                API designed for IDOR training.
              </p>
              <button className="start-button" onClick={startLab}>
                Start Lab <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">🌐</span>
                  <div>
                    <h3>Vulnerable Application</h3>
                    <span>Controlled training environment</span>
                  </div>
                </div>

                <div className="browser">
                  <div className="browser-top">
                    <div className="browser-dots"><i /><i /><i /></div>
                    <div className="browser-address">training.khansploit.local</div>
                    <span>⟳</span>
                  </div>

                  <div className="browser-content">
                    <div className="target-brand">
                      KHAN<span>SECURE</span>
                    </div>
                    <h3>
                      {currentLab === 1 && "User Profile API"}
                      {currentLab === 2 && "Orders API"}
                      {currentLab === 3 && "Admin Users API"}
                      {currentLab === 4 && "Profile v2 API"}
                      {currentLab === 5 && "Documents API"}
                    </h3>
                    <p>Enter an ID or parameter to test for IDOR.</p>

                    <div className="target-form">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={lab.placeholder}
                        disabled={isSubmitting}
                      />
                      <button onClick={executeLab} disabled={isSubmitting}>
                        {isSubmitting ? "Checking..." : "Request"}
                      </button>
                    </div>

                    {result && (
                      <div className="target-result">
                        <small>Application Output</small>
                        <div>{result}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {(requestLog || responseLog) && (
                <div className="ctf-card request-response-card">
                  <div className="card-title">
                    <span className="card-icon">📡</span>
                    <div>
                      <h3>Request / Response</h3>
                      <span>Raw HTTP simulation</span>
                    </div>
                  </div>
                  <div className="rr-grid">
                    <div className="rr-box">
                      <div className="rr-label">REQUEST</div>
                      <pre>{requestLog}</pre>
                    </div>
                    <div className="rr-box">
                      <div className="rr-label">RESPONSE</div>
                      <pre>{responseLog}</pre>
                    </div>
                  </div>
                </div>
              )}

              {challengeMessage && (
                <div className="challenge-message">
                  <span>!</span>
                  {challengeMessage}
                </div>
              )}

              <div className="ctf-card hint-card">
                <button className="collapsible-header" onClick={() => setShowHint(!showHint)}>
                  <div>
                    <span className="card-icon">💡</span>
                    <strong>Need a Hint?</strong>
                  </div>
                  <span>{showHint ? "−" : "+"}</span>
                </button>
                {showHint && (
                  <div className="hint-content">
                    <div className="hint-warning">⚠ Using hints may reduce your challenge score.</div>
                    <p>{lab.hint}</p>
                  </div>
                )}
              </div>

              <div className="ctf-card source-card">
                <button className="collapsible-header" onClick={() => setShowSource(!showSource)}>
                  <div>
                    <span className="card-icon">{"</>"}</span>
                    <strong>Vulnerable Source Code</strong>
                  </div>
                  <span>{showSource ? "−" : "+"}</span>
                </button>
                {showSource && (
                  <div className="source-container">
                    <div className="source-toolbar">
                      <span>vulnerable.js</span>
                      <button onClick={copySource}>{copied ? "✓ Copied" : "Copy"}</button>
                    </div>
                    <pre>{lab.source}</pre>
                  </div>
                )}
              </div>

              {showFlag && flag && (
                <div className="flag-reveal">
                  <span>🚩 FLAG CAPTURED</span>
                  <code>{flag}</code>
                </div>
              )}

              {isCompleted && currentLab < TOTAL_LABS && (
                <button className="next-button" onClick={nextLab}>
                  Continue to Level {currentLab + 1} <span>→</span>
                </button>
              )}
            </>
          )}
        </section>
      </main>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-glow">✓</div>
            <div className="success-label">CHALLENGE COMPLETED</div>
            <h2>Excellent Work!</h2>
            <p>You successfully solved <strong>{lab.title}</strong>.</p>
            <div className="earned-box">
              <span>REWARD</span>
              <strong>+{lab.points} XP</strong>
            </div>
            {flag && (
              <div className="modal-flag">
                <span>CAPTURED FLAG</span>
                <code>{flag}</code>
              </div>
            )}
            <div className="modal-actions">
              <button className="close-modal" onClick={() => setShowSuccess(false)}>
                Continue Exploring
              </button>
              {currentLab < TOTAL_LABS && (
                <button
                  className="modal-next"
                  onClick={() => {
                    setShowSuccess(false);
                    nextLab();
                  }}
                >
                  Next Challenge →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Feedback section="all-ctf-lab" />


    </div>
  );
};

export default IDORLab;