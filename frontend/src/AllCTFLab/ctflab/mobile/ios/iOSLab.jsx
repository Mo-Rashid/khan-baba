import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./iOSLab.css";

const TOTAL_LABS = 5;

const API_BASE = import.meta.env.VITE_API_BASE

const LABS = [
  {
    id: 1,
    title: "Insecure Data Storage",
    type: "STORAGE",
    difficulty: "Beginner",
    points: 100,
    description:
      "The application stores sensitive data in plaintext using UserDefaults, Plist files, or unencrypted Keychain items.",
    objective: "Extract sensitive information stored insecurely on the iOS device.",
    hint: "Check UserDefaults, Library/Preferences, or Keychain items for passwords and tokens.",
    source: `UserDefaults.standard.set("SuperSecret123", forKey: "password")
UserDefaults.standard.set("sk_live_abc123", forKey: "api_key")

// Or unencrypted Keychain`,
    placeholder: "UserDefaults ",
  },
  {
    id: 2,
    title: "Jailbreak Detection Bypass",
    type: "JAILBREAK",
    difficulty: "Beginner",
    points: 150,
    description:
      "The app implements jailbreak detection that can be bypassed using Frida, tweaks, or binary patching.",
    objective: "Bypass the jailbreak detection mechanism.",
    hint: "Look for checks of Cydia, /Applications/Cydia.app, fork(), or sandbox violations.",
    source: `if (FileManager.default.fileExists(atPath: "/Applications/Cydia.app")) {
  exit(0) // Jailbreak detected
}`,
    placeholder: "Cydia .....",
  },
  {
    id: 3,
    title: "Insecure URL Scheme / Deep Link",
    type: "DEEPLINK",
    difficulty: "Intermediate",
    points: 200,
    description:
      "The application registers custom URL schemes and handles them without proper validation.",
    objective: "Abuse a custom URL scheme to perform unauthorized actions.",
    hint: "Look for CFBundleURLSchemes in Info.plist and missing input validation.",
    source: `// Info.plist
<key>CFBundleURLSchemes</key>
<array>
  <string>khansploit</string>
</array>

// No validation of parameters`,
    placeholder: "khansploit://",
  },
  {
    id: 4,
    title: "Hardcoded Secrets",
    type: "SECRETS",
    difficulty: "Intermediate",
    points: 250,
    description:
      "API keys, tokens, or encryption keys are hardcoded in the binary or Info.plist.",
    objective: "Extract hardcoded secrets from the IPA / binary.",
    hint: "Use strings, class-dump, or Hopper/Ghidra and search for API keys and secrets.",
    source: `let API_KEY = "AIzaSyD-HardcodediOSKey"
let SECRET  = "sk_live_51iOS..."`,
    placeholder: "API_KEY or hardcoded secret",
  },
  {
    id: 5,
    title: "Binary Protection Bypass",
    type: "BINARY",
    difficulty: "Advanced",
    points: 300,
    description:
      "The application uses anti-debugging, anti-tampering, or SSL pinning that can be bypassed.",
    objective: "Bypass binary protections such as anti-debug, SSL pinning or integrity checks.",
    hint: "Look for ptrace, sysctl, SSL pinning (TrustKit / custom NSURLSession), or checksum checks.",
    source: `// Anti-debug
ptrace(PT_DENY_ATTACH, 0, 0, 0);

// SSL Pinning
// Custom ServerTrust evaluation`,
    placeholder: "ptrace or SSL pinning or anti-debug",
  },
];

const iOSLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-ios-progress");
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
    localStorage.setItem("khansploit-ios-progress", JSON.stringify(completedLabs));
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
      setChallengeMessage("Enter your payload / technique.");
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
        `${API_BASE}/mobile/ios/${currentLab}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: input }),
        }
      );

      const data = await res.json();

      setRequestLog(data.request || `Payload: ${input}`);
      setResponseLog(data.response || "");

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
        setResult("Payload did not solve the challenge.");
        setChallengeMessage(data.message || "Try again with a different payload.");
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
    localStorage.removeItem("khansploit-ios-progress");
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


// ========================================
// EXPERIENCE / COMMUNITY REVIEWS
// ========================================

const LAB_KEY = "mobile-ios";

const [expName, setExpName] = useState("");
const [expMessage, setExpMessage] = useState("");

const [experiences, setExperiences] = useState([]);







  return (
    <div className="ios-lab-page">
      <Navbar />

      <section className="ios-hero">
        <div className="hero-badge">KHAN SPLOIT / MOBILE SECURITY</div>
        <h1>
          iOS
          <span>SECURITY LAB</span>
        </h1>
        <p>
          Master real-world iOS application vulnerabilities through progressive
          hands-on challenges covering storage, jailbreak, deep links, secrets & binary protections.
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
            <div className="sidebar-title">iOS CHALLENGES</div>
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
              <div className="start-icon">📱</div>
              <h3>Ready to Start?</h3>
              <p>
                This lab simulates real iOS application vulnerabilities
                found during professional mobile penetration tests.
              </p>
              <button className="start-button" onClick={startLab}>
                Start Lab <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">📱</span>
                  <div>
                    <h3>iOS Device Simulation</h3>
                    <span>Controlled training environment</span>
                  </div>
                </div>

                <div className="browser">
                  <div className="browser-top">
                    <div className="browser-dots"><i /><i /><i /></div>
                    <div className="browser-address">idevice / simulator</div>
                    <span>⟳</span>
                  </div>

                  <div className="browser-content">
                    <div className="target-brand">
                      iOS <span>LAB</span>
                    </div>
                    <h3>
                      {currentLab === 1 && "Insecure Storage Analyzer"}
                      {currentLab === 2 && "Jailbreak Detection Bypass"}
                      {currentLab === 3 && "URL Scheme / Deep Link Tester"}
                      {currentLab === 4 && "Secret Extractor"}
                      {currentLab === 5 && "Binary Protection Bypass"}
                    </h3>
                    <p>Enter your attack input or technique.</p>

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
                        <small>Result</small>
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
                      <h3>Command / Response</h3>
                      <span>Simulated analysis output</span>
                    </div>
                  </div>
                  <div className="rr-grid">
                    <div className="rr-box">
                      <div className="rr-label">COMMAND</div>
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
                    <strong>Vulnerable Code / Config</strong>
                  </div>
                  <span>{showSource ? "−" : "+"}</span>
                </button>
                {showSource && (
                  <div className="source-container">
                    <div className="source-toolbar">
                      <span>vulnerable.swift / Info.plist</span>
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

export default iOSLab;