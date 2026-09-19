import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./AndroidLab.css";

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
      "The application stores sensitive data (credentials, tokens, PII) in plaintext SharedPreferences or world-readable files.",
    objective:
      "Extract sensitive information stored insecurely on the device.",
    hint: "Check SharedPreferences XML files or databases under /data/data/<package>/shared_prefs/",
    source: `SharedPreferences prefs = getSharedPreferences("user_data", MODE_PRIVATE);
prefs.edit()
  .putString("password", "SuperSecret123")
  .putString("api_key", "sk_live_abc123")
  .apply();`,
    placeholder: "shared_prefs ",
  },
  {
    id: 2,
    title: "Exported Components",
    type: "COMPONENT",
    difficulty: "Beginner",
    points: 150,
    description:
      "An Activity, Service, BroadcastReceiver or ContentProvider is exported without proper permission checks.",
    objective:
      "Trigger an exported component to access protected functionality or data.",
    hint: "Look for android:exported=\"true\" in AndroidManifest.xml without permission protection.",
    source: `<activity
  android:name=".AdminActivity"
  android:exported="true" />

<!-- No permission attribute -->`,
    placeholder: "exported activity or content provider",
  },
  {
    id: 3,
    title: "Insecure Communication",
    type: "NETWORK",
    difficulty: "Intermediate",
    points: 200,
    description:
      "The app communicates over cleartext HTTP or accepts any SSL certificate (trust-all).",
    objective:
      "Intercept or abuse the insecure network communication to steal data or perform MitM.",
    hint: "Look for http:// URLs or TrustManager that accepts all certificates.",
    source: `// Cleartext traffic enabled
android:usesCleartextTraffic="true"

// Or custom TrustManager that trusts everything
TrustManager[] trustAllCerts = ...`,
    placeholder: "http:// or ",
  },
  {
    id: 4,
    title: "Hardcoded Secrets",
    type: "SECRETS",
    difficulty: "Intermediate",
    points: 250,
    description:
      "API keys, tokens, or encryption keys are hardcoded in the source code or resources.",
    objective:
      "Extract hardcoded secrets from the APK (strings, smali, resources).",
    hint: "Decompile the APK and search for API keys, AWS keys, or JWT secrets in strings.xml or code.",
    source: `String API_KEY = "AIzaSyD-HardcodedKey123456";
String SECRET = "sk_live_51Hq...";`,
    placeholder: "try.... ",
  },
  {
    id: 5,
    title: "Deep Link / Intent Abuse",
    type: "DEEPLINK",
    difficulty: "Advanced",
    points: 300,
    description:
      "The application handles deep links or custom URL schemes without proper validation, leading to unauthorized actions.",
    objective:
      "Abuse a deep link or intent to perform privileged actions or steal data.",
    hint: "Look for intent-filters with scheme/host and missing input validation.",
    source: `<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <data android:scheme="khansploit" android:host="reset" />
</intent-filter>

// No validation of parameters`,
    placeholder: "khansploit:// ",
  },
];

const AndroidLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-android-progress");
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
  const [flag, setFlag] = useState(""); // backend se aayega
  const [labStarted, setLabStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lab = useMemo(() => LABS.find((l) => l.id === currentLab), [currentLab]);
  const isCompleted = completedLabs.includes(currentLab);
  const completedCount = completedLabs.length;
  const progress = Math.round((completedCount / TOTAL_LABS) * 100);

  useEffect(() => {
    localStorage.setItem("khansploit-android-progress", JSON.stringify(completedLabs));
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

  // ========== BACKEND CONNECT ==========
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
        `${API_BASE}/mobile/android/${currentLab}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // agar login token hai:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const executeLab = () => {
    submitToBackend();
  };

  const nextLab = () => {
    if (currentLab < TOTAL_LABS) setCurrentLab(currentLab + 1);
  };

  const resetProgress = () => {
    localStorage.removeItem("khansploit-android-progress");
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

const LAB_KEY = "mobile-android";

// Experience form state
const [expName, setExpName] = useState("");
const [expMessage, setExpMessage] = useState("");

// Android lab ke reviews only
const [experiences, setExperiences] = useState([]);




  return (
    <div className="android-lab-page">
      <Navbar />

      <section className="android-hero">
        <div className="hero-badge">VulnXploit / MOBILE SECURITY</div>
        <h1>
          ANDROID
          <span>SECURITY LAB</span>
        </h1>
        <p>
          Master real-world Android application vulnerabilities through progressive
          hands-on challenges covering storage, components, network, secrets & deep links.
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
            <div className="sidebar-title">ANDROID CHALLENGES</div>
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
                This lab simulates real Android application vulnerabilities
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
                    <h3>Android Device Simulation</h3>
                    <span>Controlled training environment</span>
                  </div>
                </div>

                <div className="browser">
                  <div className="browser-top">
                    <div className="browser-dots"><i /><i /><i /></div>
                    <div className="browser-address">adb / emulator</div>
                    <span>⟳</span>
                  </div>

                  <div className="browser-content">
                    <div className="target-brand">
                      ANDROID <span>LAB</span>
                    </div>
                    <h3>
                      {currentLab === 1 && "Insecure Storage Analyzer"}
                      {currentLab === 2 && "Exported Component Tester"}
                      {currentLab === 3 && "Network Traffic Inspector"}
                      {currentLab === 4 && "APK Secret Extractor"}
                      {currentLab === 5 && "Deep Link Abuser"}
                    </h3>
                    <p>Enter your attack input or adb technique.</p>

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
                      <span>Simulated adb & analysis output</span>
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
                      <span>vulnerable.java / AndroidManifest.xml</span>
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

export default AndroidLab;