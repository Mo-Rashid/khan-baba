import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";


import "./XXELab.css";

const TOTAL_LABS = 5;
const API_BASE = import.meta.env.VITE_API_BASE 
const LABS = [
  {
    id: 1,
    title: "Basic XXE",
    type: "BASIC",
    difficulty: "Beginner",
    points: 100,
    description:
      "The application parses user-supplied XML and resolves external entities.",
    objective:
      "Inject an XXE payload that resolves an external entity.",
    hint: "Use a DOCTYPE with an ENTITY that points to a system resource.",
    source: `const parser = new DOMParser();
// or libxml / similar — external entities enabled
parser.parseFromString(userXml, "text/xml");`,
    placeholder: "<!DOCTYPE ... [<!ENTITY xxe SYSTEM \"...\">]>",
  },
  {
    id: 2,
    title: "XXE File Disclosure",
    type: "FILE READ",
    difficulty: "Beginner",
    points: 150,
    description:
      "XXE can be used to read local files from the server.",
    objective:
      "Read a sensitive file (e.g. /etc/passwd or application config) via XXE.",
    hint: "Use file:// protocol in the SYSTEM identifier.",
    source: `<!ENTITY xxe SYSTEM "file:///etc/passwd">`,
    placeholder: "file:///etc/passwd or similar",
  },
  {
    id: 3,
    title: "XXE to SSRF",
    type: "SSRF",
    difficulty: "Intermediate",
    points: 200,
    description:
      "XXE can force the server to make HTTP requests to internal services.",
    objective:
      "Use XXE to reach an internal URL or cloud metadata endpoint.",
    hint: "Point the entity to http://127.0.0.1 or http://169.254.169.254",
    source: `<!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">`,
    placeholder: "http://127.0.0.1 or metadata URL",
  },
  {
    id: 4,
    title: "Blind XXE",
    type: "BLIND",
    difficulty: "Intermediate",
    points: 250,
    description:
      "The application parses XML but does not return the entity value in the response.",
    objective:
      "Confirm blind XXE via out-of-band interaction or error-based technique.",
    hint: "Use an external DTD or parameter entity that phones home.",
    source: `// Response does not reflect entity content
// OOB or error-based needed`,
    placeholder: "Blind XXE / OOB payload",
  },
  {
    id: 5,
    title: "XXE Filter Bypass",
    type: "FILTER",
    difficulty: "Advanced",
    points: 300,
    description:
      "A filter blocks common XXE patterns but can still be bypassed.",
    objective:
      "Bypass the filter and still achieve XXE.",
    hint: "Try alternative encodings, parameter entities, or different protocols (php://, expect://).",
    source: `// Blocks: SYSTEM, file://
// Incomplete filter`,
    placeholder: "Bypass technique or php:// filter",
  },
];

const XXELab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-xxe-progress");
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
    localStorage.setItem("khansploit-xxe-progress", JSON.stringify(completedLabs));
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
      setChallengeMessage("Enter your XXE payload.");
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
      const res = await fetch(`${API_BASE}/web/xxe/${currentLab}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input }),
      });

      const data = await res.json();
      setRequestLog(data.request || `Payload: ${input.substring(0, 100)}`);
      setResponseLog(data.response || "");

      if (data.success) {
        setResult("XXE successfully triggered!");
        setFlag(data.flag);
        setShowFlag(true);
        setShowSuccess(true);
        setChallengeMessage(data.message || "Challenge solved successfully.");
        if (!completedLabs.includes(currentLab)) {
          setCompletedLabs((prev) => [...prev, currentLab]);
        }
      } else {
        setResult("Payload did not trigger XXE.");
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
  const nextLab = () => currentLab < TOTAL_LABS && setCurrentLab(currentLab + 1);

  const resetProgress = () => {
    localStorage.removeItem("khansploit-xxe-progress");
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

  const LAB_KEY = "web-xxe";
      
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
    <div className="xxe-lab-page">
      <Navbar />
      <section className="xxe-hero">
        <div className="hero-badge">VulnXploit / WEB CTF</div>
        <h1>XXE<span>PLAYGROUND</span></h1>
        <p>
          Master XML External Entity attacks through progressive hands-on challenges
          covering basic XXE, file read, SSRF, blind and filter bypass.
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
            <div className="sidebar-title">XXE CHALLENGES</div>
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
                  <div className="nav-number">{completed ? "✓" : String(item.id).padStart(2, "0")}</div>
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
          <button className="reset-progress" onClick={resetProgress}>↻ Reset Progress</button>
        </aside>

        <section className="challenge-area">
          <div className="challenge-top">
            <div>
              <div className="challenge-category">LEVEL {String(lab.id).padStart(2, "0")} / {lab.type}</div>
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
              <p>This challenge contains an intentionally vulnerable XML parser for training.</p>
              <button className="start-button" onClick={startLab}>Start Lab <span>→</span></button>
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
                    <div className="target-brand">KHAN<span>SECURE</span></div>
                    <h3>
                      {currentLab === 1 && "XML Upload"}
                      {currentLab === 2 && "XML File Parser"}
                      {currentLab === 3 && "XML Import"}
                      {currentLab === 4 && "Blind XXE Endpoint"}
                      {currentLab === 5 && "Filtered XML Parser"}
                    </h3>
                    <p>Paste your XXE payload below.</p>
                    <div className="target-form vertical">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={lab.placeholder}
                        rows={8}
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          minHeight: "160px",
                          padding: "12px",
                          borderRadius: "10px",
                          border: "1px solid #d8d2dd",
                          fontFamily: "ui-monospace, monospace",
                          fontSize: "13px",
                          resize: "vertical",
                        }}
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

export default XXELab;