import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./VulnX2.css";

/*
=========================================================
VULNX2 — SINGLE ANDROID APK SECURITY LAB
=========================================================
*/

const API_BASE = import.meta.env.VITE_API_BASE;

/*
=========================================================
SINGLE LAB
=========================================================
*/

const LAB = {
  id: 1,
  title: "VulnX2",
  type: "ADVANCED HARDCODE",
  difficulty: "Intermediate",
  points: 200,
  description:
    "Analyze the VulnX2 Android APK and identify the hidden advanced hardcoded security challenge flag.",
  objective:
    "Download the provided APK, perform authorized local Android security analysis, locate the advanced hardcoded challenge flag, and submit it for verification.",
  hint: "Start with static APK analysis. Inspect AndroidManifest.xml, resources, strings, assets, smali code and look for obfuscated or split hardcoded secrets.",
  apkName: "app.debug.apk",
};

/*
=========================================================
COMPONENT
=========================================================
*/

const VulnX2 = () => {
  const [labStarted, setLabStarted] = useState(false);
  const [apkDownloaded, setApkDownloaded] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [challengeMessage, setChallengeMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [flag, setFlag] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [completed, setCompleted] = useState(() => {
    try {
      return (
        localStorage.getItem("VulnXploit-vulnx2-progress") === "completed"
      );
    } catch {
      return false;
    }
  });

  const LAB_KEY = "vulnX2";
  const [expName, setExpName] = useState("");
  const [expMessage, setExpMessage] = useState("");
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "VulnXploit-vulnx2-progress",
        completed ? "completed" : "incomplete"
      );
    } catch {}
  }, [completed]);

  useEffect(() => {
    if (!labStarted || completed) return;

    const timer = setInterval(() => {
      setElapsed((time) => time + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [labStarted, completed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startLab = () => {
    setLabStarted(true);
    setChallengeMessage("");
    setResult("");
    setInput("");
    setFlag("");
    setShowFlag(false);
    setShowHint(false);
  };

  const downloadAPK = () => {
    setChallengeMessage("");

    const downloadURL = "/images/apk/app-debug.apk";
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = LAB.apkName;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setApkDownloaded(true);
  };

  // =========================================================
  // FLAG SUBMISSION → BACKEND VALIDATION
  // =========================================================
  const submitToBackend = async () => {
    const submittedFlag = input.trim();

    if (!submittedFlag) {
      setChallengeMessage("Enter the flag you discovered from the APK.");
      return;
    }

    setIsSubmitting(true);
    setChallengeMessage("");
    setResult("");
    setFlag("");
    setShowFlag(false);

    try {
      const res = await fetch(`${API_BASE}/mobile/vulnx2/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flag: submittedFlag }),
      });

      const data = await res.json();

      if (data.success && data.correct) {
        // Correct flag → open success popup
        setResult(data.message || "Challenge solved successfully!");
        setFlag(data.flag || submittedFlag);
        setShowFlag(true);
        setShowSuccess(true);
        setCompleted(true);
        setChallengeMessage(data.message || "VulnX2 challenge completed successfully.");
      } else {
        // Wrong flag
        setResult("Flag validation failed.");
        setChallengeMessage(
          data.message || "Incorrect flag. Continue analyzing the APK."
        );
      }
    } catch (err) {
      console.error("VulnX2 submit error:", err);
      setResult("Error connecting to server.");
      setChallengeMessage("Could not reach the validation server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProgress = () => {
    try {
      localStorage.removeItem("VulnXploit-vulnx2-progress");
    } catch {}

    setCompleted(false);
    setLabStarted(false);
    setApkDownloaded(false);
    setInput("");
    setResult("");
    setChallengeMessage("");
    setShowHint(false);
    setShowSuccess(false);
    setShowFlag(false);
    setFlag("");
    setElapsed(0);
  };

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

    setExperiences((previous) => [entry, ...previous].slice(0, 100));
    setExpName("");
    setExpMessage("");
  };

  const visibleExperiences = experiences.filter(
    (experience) => experience.lab === LAB_KEY
  );

  return (
    <div className="apk-lab-page">
      <Navbar />

      <section className="apk-hero">
        <div className="hero-badge">VulnXploit / MOBILE SECURITY</div>

        <h1>
          VULN
          <span>X2</span>
        </h1>

        <p>
          Analyze the VulnX2 Android APK through a hands-on mobile security
          challenge and discover the hidden advanced flag.
        </p>

        <div className="hero-stats">
          <div>
            <strong>{completed ? 1 : 0}</strong>
            <span>SOLVED</span>
          </div>
          <div>
            <strong>1</strong>
            <span>CHALLENGE</span>
          </div>
          <div>
            <strong>{completed ? 100 : 0}%</strong>
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
            <strong>{completed ? "1/1" : "0/1"}</strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: completed ? "100%" : "0%" }}
            />
          </div>
        </div>
      </section>

      <main className="lab-layout">
        <aside className="lab-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">APK ANALYSIS CHALLENGE</div>
            <button
              className={`lab-nav-item active ${completed ? "completed" : ""}`}
            >
              <div className="nav-number">{completed ? "✓" : "01"}</div>
              <div className="nav-info">
                <strong>{LAB.title}</strong>
                <span>{LAB.type}</span>
              </div>
            </button>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">LAB STATUS</div>
            <div className="status-row">
              <span>Difficulty</span>
              <strong>{LAB.difficulty}</strong>
            </div>
            <div className="status-row">
              <span>Points</span>
              <strong>{LAB.points} XP</strong>
            </div>
            <div className="status-row">
              <span>Type</span>
              <strong>{LAB.type}</strong>
            </div>
            <div className="status-row">
              <span>Status</span>
              <strong>{completed ? "COMPLETED" : "ACTIVE"}</strong>
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
                LEVEL 01 / {LAB.type}
              </div>
              <h2>{LAB.title}</h2>
              <p>{LAB.description}</p>
            </div>

            <div className="challenge-points">
              <span>REWARD</span>
              <strong>+{LAB.points}</strong>
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
              <p>{LAB.objective}</p>
            </div>
          </div>

          {!labStarted && !completed ? (
            <div className="start-card">
              <div className="start-icon">📱</div>
              <h3>Ready to Start?</h3>
              <p>
                This challenge contains one advanced Android hardcoded-secret
                security layer. Start the lab to access the APK download and
                flag submission environment.
              </p>
              <button className="start-button" onClick={startLab}>
                Start Lab
                <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">📦</span>
                  <div>
                    <h3>Download Challenge APK</h3>
                    <span>VulnX2 Android Application</span>
                  </div>
                </div>

                <div className="objective-content">
                  <strong>Challenge APK</strong>
                  <p>
                    Download the APK below and analyze it locally using static
                    analysis and your authorized Android security testing tools.
                  </p>

                  <div className="vuln-apk-info">
                    <div className="vuln-apk-info-item">
                      <span>FILE</span>
                      <strong>{LAB.apkName}</strong>
                    </div>
                    <div className="vuln-apk-info-item">
                      <span>TYPE</span>
                      <strong>Android APK</strong>
                    </div>
                    <div className="vuln-apk-info-item">
                      <span>STATUS</span>
                      <strong>
                        {apkDownloaded ? "DOWNLOADED" : "READY"}
                      </strong>
                    </div>
                  </div>

                  <div className="vuln-apk-download-wrap">
                    <button className="start-button" onClick={downloadAPK}>
                      ⬇ Download APK
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">🔍</span>
                  <div>
                    <h3>APK Analysis</h3>
                    <span>Static analysis based local analysis</span>
                  </div>
                </div>

                <div className="objective-content">
                  <strong>Analyze the Application</strong>
                  <p>
                    Once the APK has been downloaded, analyze the application
                    locally. Decode the APK and inspect AndroidManifest.xml,
                    resources, strings and smali code to locate the challenge
                    flag.
                  </p>
                  <p>
                    Use your normal authorized Android security research
                    workflow to investigate the challenge.
                  </p>
                </div>
              </div>

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
                    <p>{LAB.hint}</p>
                  </div>
                )}
              </div>

              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">🚩</span>
                  <div>
                    <h3>Flag Submission</h3>
                    <span>Submit your discovered flag</span>
                  </div>
                </div>

                <div className="objective-content">
                  <strong>Found the Flag?</strong>
                  <p>
                    Enter the flag discovered during your VulnX2 APK analysis.
                    The flag will be validated against the correct value.
                  </p>

                  <div className="target-form">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="FLAG{...}"
                      disabled={isSubmitting || completed}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitToBackend();
                      }}
                    />
                    <button
                      onClick={submitToBackend}
                      disabled={isSubmitting || completed}
                    >
                      {isSubmitting ? "Checking..." : "Submit"}
                    </button>
                  </div>

                  {result && (
                    <div className="target-result">
                      <small>Result</small>
                      <div>{result}</div>
                    </div>
                  )}

                  {challengeMessage && (
                    <div className="challenge-message">
                      <span>!</span>
                      {challengeMessage}
                    </div>
                  )}
                </div>
              </div>

              {showFlag && flag && (
                <div className="flag-reveal">
                  <span>🚩 FLAG CAPTURED</span>
                  <code>{flag}</code>
                </div>
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
              You successfully solved
              <strong> {LAB.title}</strong>.
            </p>

            <div className="earned-box">
              <span>REWARD</span>
              <strong>+{LAB.points} XP</strong>
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
            </div>
          </div>
        </div>
      )}
      <Feedback section="all-ctf-lab" />
    </div>
  );
};

export default VulnX2;