import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./XSSLab.css";

const TOTAL_LABS = 5;
const API_BASE = import.meta.env.VITE_API_BASE 
const LABS = [
  {
    id: 1,
    title: "Reflected XSS",
    type: "REFLECTED",
    difficulty: "Beginner",
    points: 100,
    description:
      "User-controlled search input is reflected into an HTML response without output encoding.",
    objective:
      "Make the vulnerable search result execute JavaScript in the browser.",
    hint: "The search result is rendered as HTML. Think about an HTML element with an event handler.",
    source: `function search() {
  const value = searchInput.value;
  result.innerHTML = "Search result: " + value;
}`,
    placeholder: "Search products... e.g. ",
  },
  {
    id: 2,
    title: "DOM Hash XSS",
    type: "DOM",
    difficulty: "Beginner",
    points: 150,
    description:
      "The application reads data from the URL fragment and inserts it into the DOM.",
    objective:
      "Control the page content through the URL hash and demonstrate JavaScript execution.",
    hint: "Look at the value after the # character in the browser URL.",
    source: `const hash = window.location.hash;
const value = decodeURIComponent(hash.substring(1));
output.innerHTML = "Message: " + value;`,
    placeholder: "Enter hash content... e.g. ",
  },
  {
    id: 3,
    title: "Stored XSS",
    type: "STORED",
    difficulty: "Intermediate",
    points: 200,
    description:
      "A comment is stored by the application and later rendered without HTML sanitization.",
    objective:
      "Store a payload that executes when any user views the comments page.",
    hint: "Submit a comment that contains HTML/JS. It will be shown to everyone.",
    source: `// Save comment
db.comments.push(req.body.comment);

// Render
comments.forEach(c => {
  container.innerHTML += "<div>" + c + "</div>";
});`,
    placeholder: "Write a comment... e.g. ",
  },
  {
    id: 4,
    title: "Blind XSS",
    type: "BLIND",
    difficulty: "Intermediate",
    points: 250,
    description:
      "Payload is stored and only executed in an internal admin panel that you cannot see.",
    objective:
      "Inject a payload that will fire when an admin views the feedback.",
    hint: "Use a payload that phones home or performs an action when executed in the admin context.",
    source: `// User submits feedback
saveFeedback(req.body.message);

// Admin panel (internal)
feedback.innerHTML = storedMessage;`,
    placeholder: "Feedback message with XSS payload",
  },
  {
    id: 5,
    title: "Filter Bypass XSS",
    type: "FILTER",
    difficulty: "Advanced",
    points: 300,
    description:
      "The application filters common XSS patterns (<script>, onerror, etc.) but the filter is incomplete.",
    objective:
      "Bypass the filter and still achieve JavaScript execution.",
    hint: "Try alternative tags (svg, details), different event handlers, or encoding tricks.",
    source: `function sanitize(input) {
  return input
    .replace(/<script/gi, "")
    .replace(/onerror/gi, "")
    .replace(/onload/gi, "");
}
result.innerHTML = sanitize(userInput);`,
    placeholder: "Try <svg>, <img>, or other bypass techniques",
  },
];

const XSSLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-xss-progress");
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
    localStorage.setItem("khansploit-xss-progress", JSON.stringify(completedLabs));
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
      setChallengeMessage("Enter your XSS payload.");
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
      const res = await fetch(`${API_BASE}/web/xss/${currentLab}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input }),
      });

      const data = await res.json();

      setRequestLog(data.request || `Payload: ${input.substring(0, 100)}`);
      setResponseLog(data.response || "");

      if (data.success) {
        setResult("XSS successfully triggered!");
        setFlag(data.flag);
        setShowFlag(true);
        setShowSuccess(true);
        setChallengeMessage(data.message || "Challenge solved successfully.");

        if (!completedLabs.includes(currentLab)) {
          setCompletedLabs((prev) => [...prev, currentLab]);
        }
      } else {
        setResult("Payload did not trigger XSS.");
        setChallengeMessage(data.message || "Try a different payload.");
      }
    } catch (err) {
      console.error(err);
      setChallengeMessage("Server error. Is backend running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeLab = () => submitToBackend();

  const nextLab = () => {
    if (currentLab < TOTAL_LABS) setCurrentLab(currentLab + 1);
  };

  const resetProgress = () => {
    localStorage.removeItem("khansploit-xss-progress");
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

  const LAB_KEY = "web-xss";
      
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
    <div className="xss-lab-page">
      <Navbar />

      <section className="xss-hero">
        <div className="hero-badge">VulnXploit / WEB CTF</div>
        <h1>
          XSS
          <span>PLAYGROUND</span>
        </h1>
        <p>
          Master Cross-Site Scripting through progressive hands-on challenges
          covering reflected, DOM, stored, blind and filter-bypass XSS.
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
            <div className="sidebar-title">XSS CHALLENGES</div>
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
                application designed for XSS training.
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
                      {currentLab === 1 && "Product Search"}
                      {currentLab === 2 && "DOM Message Board"}
                      {currentLab === 3 && "Comment Section"}
                      {currentLab === 4 && "Feedback Form"}
                      {currentLab === 5 && "Filtered Search"}
                    </h3>
                    <p>Enter your XSS payload below.</p>

                    <div className="target-form">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={lab.placeholder}
                        disabled={isSubmitting}
                      />
                      <button onClick={executeLab} disabled={isSubmitting}>
                        {isSubmitting ? "Checking..." : "Execute"}
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

export default XSSLab;