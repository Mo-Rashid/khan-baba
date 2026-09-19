import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./ReverseEngineeringLab.css";

const TOTAL_LABS = 5;
const API_BASE = import.meta.env.VITE_API_BASE ;

const LABS = [
  {
    id: 1,
    title: "Strings Analysis",
    type: "STRINGS",
    difficulty: "Beginner",
    points: 100,
    description:
      "Extract readable strings and hardcoded values from a binary sample.",
    objective:
      "Submit a strings / hardcoded finding from static string extraction.",
    hint: "Keywords: strings, ascii, hardcoded, password, flag.",
    source: `// strings binary | less
// Look for hardcoded secrets and readable markers`,
    placeholder: "Example: strings ",
  },
  {
    id: 2,
    title: "Static Analysis",
    type: "STATIC",
    difficulty: "Beginner",
    points: 150,
    description:
      "Analyze imports, functions, and structure without executing the sample.",
    objective: "Submit a static analysis finding (tools, imports, functions).",
    hint: "static, ghidra, ida, disassembl, import, function.",
    source: `// Open in Ghidra / IDA
// Review imports and interesting functions`,
    placeholder: "Example: static ",
  },
  {
    id: 3,
    title: "Logic Flaw",
    type: "LOGIC",
    difficulty: "Intermediate",
    points: 200,
    description:
      "Find a flawed check or bypassable logic path inside the program flow.",
    objective: "Submit a logic bug / bypass style answer.",
    hint: "logic, bypass, strcmp, check, branch, condition.",
    source: `// Flawed strcmp / conditional auth check
// Identify bypassable branch`,
    placeholder: "Example: logic bypass strcmp check",
  },
  {
    id: 4,
    title: "Packer Detection",
    type: "PACKER",
    difficulty: "Intermediate",
    points: 250,
    description:
      "Detect packing or obfuscation layers protecting the real payload.",
    objective: "Submit packer / obfuscation detection findings.",
    hint: "packer, upx, obfuscat, packed, unpack.",
    source: `// Detect UPX or other packers
// Plan unpack before deep analysis`,
    placeholder: "Example: upx packer unpack required",
  },
  {
    id: 5,
    title: "Full RE Summary",
    type: "FULL",
    difficulty: "Advanced",
    points: 300,
    description:
      "Combine strings, static review, and logic into a complete analysis answer.",
    objective:
      "Submit a full reverse engineering summary using completion keywords.",
    hint: "reverse, full, analysis, decompile, key, solved.",
    source: `// End-to-end RE writeup (training only)`,
    placeholder: "Example: full reverse analysis decompile key",
  },
];

const ReverseEngineeringLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-re-progress");
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

  const lab = useMemo(
    () => LABS.find((l) => l.id === currentLab),
    [currentLab]
  );
  const isCompleted = completedLabs.includes(currentLab);
  const completedCount = completedLabs.length;
  const progress = Math.round((completedCount / TOTAL_LABS) * 100);

  useEffect(() => {
    localStorage.setItem(
      "khansploit-re-progress",
      JSON.stringify(completedLabs)
    );
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
      setChallengeMessage("Enter your reverse engineering finding or technique.");
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
      const res = await fetch(
        `${API_BASE}/redteam/reverse-engineering/${currentLab}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: input }),
        }
      );

      const data = await res.json();

      setRequestLog(data.request || `Payload: ${input.substring(0, 100)}`);
      setResponseLog(data.response || JSON.stringify(data, null, 2));

      if (data.success) {
        setResult("Challenge solved successfully!");
        setFlag(data.flag);
        setShowFlag(true);
        setShowSuccess(true);
        setChallengeMessage(data.message || "Challenge solved successfully.");

        if (!completedLabs.includes(currentLab)) {
          setCompletedLabs((prev) => [...prev, currentLab]);
        }
      } else {
        setResult("Attempt failed.");
        setChallengeMessage(
          data.hint
            ? `${data.message || "Try again."} Hint: ${data.hint}`
            : data.message || "Try a different answer."
        );
      }
    } catch (err) {
      console.error(err);
      setChallengeMessage("Server error. Is backend running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextLab = () => {
    if (currentLab < TOTAL_LABS) setCurrentLab(currentLab + 1);
  };

  const resetProgress = () => {
    localStorage.removeItem("khansploit-re-progress");
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




  return (
    <div className="xss-lab-page">
      <Navbar />

      <section className="xss-hero">
        <div className="hero-badge">VulnXploit / RED TEAM</div>
        <h1>
          REVERSE
          <span>ENGINEERING</span>
        </h1>
        <p>
          Practice binary analysis skills: strings, static review, logic flaws,
          packers, and full RE writeups in a safe training lab.
        </p>

        <div className="hero-stats">
          <div>
            <strong>{completedCount}</strong>
            <span>SOLVED</span>
          </div>
          <div>
            <strong>{TOTAL_LABS}</strong>
            <span>CHALLENGES</span>
          </div>
          <div>
            <strong>{progress}%</strong>
            <span>PROGRESS</span>
          </div>
          <div>
            <strong>{formatTime(elapsed)}</strong>
            <span>TIME</span>
          </div>
        </div>

        <div className="main-progress">
          <div className="progress-label">
            <span>LAB PROGRESS</span>
            <strong>
              {completedCount}/{TOTAL_LABS}
            </strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="lab-layout">
        <aside className="lab-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">REVERSE ENGINEERING</div>
            {LABS.map((item) => {
              const completed = completedLabs.includes(item.id);
              const locked =
                item.id > 1 && !completedLabs.includes(item.id - 1);
              return (
                <button
                  key={item.id}
                  className={`lab-nav-item ${
                    currentLab === item.id ? "active" : ""
                  } ${completed ? "completed" : ""} ${locked ? "locked" : ""}`}
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
            <div className="status-row">
              <span>Difficulty</span>
              <strong>{lab.difficulty}</strong>
            </div>
            <div className="status-row">
              <span>Points</span>
              <strong>{lab.points} XP</strong>
            </div>
            <div className="status-row">
              <span>Type</span>
              <strong>{lab.type}</strong>
            </div>
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
                Binary reverse engineering training scenarios — analysis answers
                only, no malware execution required.
              </p>
              <button className="start-button" onClick={startLab}>
                Start Lab <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">🔬</span>
                  <div>
                    <h3>RE Workbench</h3>
                    <span>Controlled training environment</span>
                  </div>
                </div>

                <div className="browser">
                  <div className="browser-top">
                    <div className="browser-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="browser-address">
                      lab.re.khansploit.local
                    </div>
                    <span>⟳</span>
                  </div>

                  <div className="browser-content">
                    <div className="target-brand">
                      KHAN<span>RE</span>
                    </div>
                    <h3>
                      {currentLab === 1 && "Strings Console"}
                      {currentLab === 2 && "Static View"}
                      {currentLab === 3 && "Logic Graph"}
                      {currentLab === 4 && "Packer Check"}
                      {currentLab === 5 && "Full Analysis"}
                    </h3>
                    <p>Enter your RE finding or technique answer below.</p>

                    <div className="target-form">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={lab.placeholder}
                        disabled={isSubmitting}
                      />
                      <button onClick={submitToBackend} disabled={isSubmitting}>
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
                <button
                  className="collapsible-header"
                  onClick={() => setShowHint(!showHint)}
                >
                  <div>
                    <span className="card-icon">💡</span>
                    <strong>Need a Hint?</strong>
                  </div>
                  <span>{showHint ? "−" : "+"}</span>
                </button>
                {showHint && (
                  <div className="hint-content">
                    <div className="hint-warning">
                      ⚠ Using hints may reduce your challenge score.
                    </div>
                    <p>{lab.hint}</p>
                  </div>
                )}
              </div>

              <div className="ctf-card source-card">
                <button
                  className="collapsible-header"
                  onClick={() => setShowSource(!showSource)}
                >
                  <div>
                    <span className="card-icon">{"</>"}</span>
                    <strong>Reference Notes</strong>
                  </div>
                  <span>{showSource ? "−" : "+"}</span>
                </button>
                {showSource && (
                  <div className="source-container">
                    <div className="source-toolbar">
                      <span>notes.txt</span>
                      <button onClick={copySource}>
                        {copied ? "✓ Copied" : "Copy"}
                      </button>
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
            <p>
              You successfully solved <strong>{lab.title}</strong>.
            </p>
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
              <button
                className="close-modal"
                onClick={() => setShowSuccess(false)}
              >
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

export default ReverseEngineeringLab;