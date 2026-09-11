import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import "./AWSLab.css";

const TOTAL_LABS = 5;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/labs";

const LABS = [
  {
    id: 1,
    title: "Public S3 Bucket",
    type: "S3 MISCONFIG",
    difficulty: "Beginner",
    points: 100,
    description:
      "An S3 bucket is publicly accessible due to a misconfigured bucket policy allowing Principal: '*'.",
    objective:
      "Access the public bucket and retrieve sensitive objects without authentication.",
    hint: "Use the bucket name with --no-sign-request or visit the public S3 URL.",
    source: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::khansploit-company-data",
        "arn:aws:s3:::khansploit-company-data/*"
      ]
    }
  ]
}`,
    placeholder: "s3://khansploit-company",
  },
  {
    id: 2,
    title: "IAM Privilege Escalation",
    type: "IAM",
    difficulty: "Beginner",
    points: 150,
    description:
      "A low-privilege IAM user can escalate to full administrator by abusing dangerous IAM permissions.",
    objective:
      "Escalate privileges using iam:CreateAccessKey, iam:AttachUserPolicy or similar.",
    hint: "Common escalation paths: CreateAccessKey on another user, AttachUserPolicy, PutUserPolicy, CreatePolicyVersion.",
    source: `{
  "Effect": "Allow",
  "Action": [
    "iam:CreateAccessKey",
    "iam:AttachUserPolicy",
    "iam:PutUserPolicy",
    "iam:ListUsers"
  ],
  "Resource": "*"
}`,
    placeholder: "iam:CreateAccess",
  },
  {
    id: 3,
    title: "EC2 Metadata SSRF (IMDSv1)",
    type: "METADATA",
    difficulty: "Intermediate",
    points: 200,
    description:
      "An application is vulnerable to SSRF and the instance is using IMDSv1 (no session token required).",
    objective:
      "Reach the EC2 Instance Metadata Service and extract temporary IAM credentials.",
    hint: "Target http://169.254.169.254/latest/meta-data/iam/security-credentials/",
    source: `// Vulnerable code
const response = await fetch(userProvidedUrl);

// Instance Metadata Service v1 is enabled
// No hop limit restriction`,
    placeholder: "http://",
  },
  {
    id: 4,
    title: "Overly Permissive Security Group",
    type: "NETWORK",
    difficulty: "Intermediate",
    points: 250,
    description:
      "A Security Group allows unrestricted inbound traffic (0.0.0.0/0) on sensitive ports.",
    objective:
      "Identify the dangerous Security Group rule and demonstrate the exposure.",
    hint: "Look for 0.0.0.0/0 on ports 22 (SSH), 3389 (RDP), 3306 (MySQL), 5432 (PostgreSQL).",
    source: `Security Group: sg-0a1b2c3d4e5f
Inbound Rules:
┌────────────┬──────┬─────────────┐
│ Protocol   │ Port │ Source      │
├────────────┼──────┼─────────────┤
│ TCP        │ 22   │ 0.0.0.0/0   │  ← Critical
│ TCP        │ 3306 │ 0.0.0.0/0   │  ← Critical
└────────────┴──────┴─────────────┘`,
    placeholder: "0.0.0.0/0 or port 22",
  },
  {
    id: 5,
    title: "Lambda + Secrets Manager",
    type: "SERVERLESS",
    difficulty: "Advanced",
    points: 300,
    description:
      "A Lambda function has an overly permissive execution role that can read secrets from Secrets Manager.",
    objective:
      "Abuse the Lambda role to extract sensitive secrets from AWS Secrets Manager.",
    hint: "The role has secretsmanager:GetSecretValue on Resource: '*'. Invoke or inspect the function.",
    source: `{
  "Effect": "Allow",
  "Action": [
    "secretsmanager:GetSecretValue",
    "secretsmanager:ListSecrets",
    "ssm:GetParameter",
    "ssm:GetParametersByPath"
  ],
  "Resource": "*"
}`,
    placeholder: "secrets.......",
  },
];

const AWSLab = () => {
  const [currentLab, setCurrentLab] = useState(1);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const saved = localStorage.getItem("khansploit-aws-progress");
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
    localStorage.setItem("khansploit-aws-progress", JSON.stringify(completedLabs));
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
      setChallengeMessage("Enter your attack input or AWS CLI technique.");
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
      const res = await fetch(`${API_BASE}/cloud/aws/${currentLab}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input }),
      });

      const data = await res.json();

      setRequestLog(data.request || `Input: ${input}`);
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
        setChallengeMessage(data.message || "Try again.");
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
    localStorage.removeItem("khansploit-aws-progress");
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

const LAB_KEY = "cloud-aws";

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
    <div className="aws-lab-page">
      <Navbar />

      <section className="aws-hero">
        <div className="hero-badge">VulnXploit / CLOUD SECURITY</div>
        <h1>
          AWS
          <span>SECURITY LAB</span>
        </h1>
        <p>
          Master real-world AWS misconfigurations through progressive
          hands-on challenges covering S3, IAM, Metadata, Networking & Serverless.
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
            <div className="sidebar-title">AWS CHALLENGES</div>
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
              <div className="start-icon">☁️</div>
              <h3>Ready to Start?</h3>
              <p>
                This lab simulates real AWS misconfigurations used in
                professional cloud penetration tests.
              </p>
              <button className="start-button" onClick={startLab}>
                Start Lab <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="ctf-card">
                <div className="card-title">
                  <span className="card-icon">☁️</span>
                  <div>
                    <h3>AWS Console Simulation</h3>
                    <span>Controlled training environment</span>
                  </div>
                </div>

                <div className="browser">
                  <div className="browser-top">
                    <div className="browser-dots"><i /><i /><i /></div>
                    <div className="browser-address">console.aws.amazon.com</div>
                    <span>⟳</span>
                  </div>

                  <div className="browser-content">
                    <div className="target-brand">
                      AWS <span>CLOUD</span>
                    </div>
                    <h3>
                      {currentLab === 1 && "S3 Bucket Explorer"}
                      {currentLab === 2 && "IAM Privilege Escalation"}
                      {currentLab === 3 && "EC2 Metadata Service"}
                      {currentLab === 4 && "Security Group Analyzer"}
                      {currentLab === 5 && "Lambda & Secrets Manager"}
                    </h3>
                    <p>Enter your attack input or AWS CLI technique.</p>

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
                      <span>Simulated AWS CLI & HTTP</span>
                    </div>
                  </div>
                  <div className="rr-grid">
                    <div className="rr-box">
                      <div className="rr-label">REQUEST / COMMAND</div>
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
                    <strong>Vulnerable Configuration</strong>
                  </div>
                  <span>{showSource ? "−" : "+"}</span>
                </button>
                {showSource && (
                  <div className="source-container">
                    <div className="source-toolbar">
                      <span>aws-config.json</span>
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



      {/* =========================================================
    EXPERIENCE / COMMUNITY REVIEW
========================================================= */}

<section className="exp-section">

  {/* =======================================================
      COMMUNITY HEADER
  ======================================================= */}

  <div className="exp-community-head">

    <div className="exp-community-title">

      <div className="exp-community-icon">
        💬
      </div>

      <div>
        <span className="exp-kicker">
          COMMUNITY FEEDBACK
        </span>

        <h3>
          Hacker Experiences
        </h3>

        <p>
          See what other researchers think about this lab.
        </p>
      </div>

    </div>


    {/* SMALL STATS */}

    <div className="exp-stats">

      <div className="exp-stat">
        <strong>
          {visibleExperiences.length}
        </strong>

        <span>
          Reviews
        </span>
      </div>

      <div className="exp-stat-line" />

      <div className="exp-stat">
        <strong>
          ★
        </strong>

        <span>
          Community
        </span>
      </div>

    </div>

  </div>


  {/* =======================================================
      COMMUNITY REVIEWS
  ======================================================= */}

  <div className="exp-ticker-wrap">

    {visibleExperiences.length > 0 ? (

      <div className="exp-ticker">

        <div className="exp-ticker-track">

          {[...visibleExperiences, ...visibleExperiences].map(
            (item, i) => (

              <article
                className="exp-card"
                key={`${item.id}-${i}`}
              >

                {/* CARD TOP */}

                <div className="exp-card-top">

                  <div className="exp-user">

                    {/* Avatar */}

                    <div className="exp-avatar">

                      {item.name
                        ?.charAt(0)
                        ?.toUpperCase() || "H"}

                    </div>


                    <div className="exp-user-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ✓ Lab Completed
                      </span>

                    </div>

                  </div>


                  <div className="exp-quote">
                    “
                  </div>

                </div>


                {/* STARS */}

                <div className="exp-stars">
                  ★★★★★
                </div>


                {/* MESSAGE */}

                <div className="exp-card-msg">
                  {item.message}
                </div>


                {/* FOOTER */}

                <div className="exp-card-footer">

                  <span>
                    🛡️ Security Researcher
                  </span>

                  <span>
                    {item.date || "Just now"}
                  </span>

                </div>

              </article>

            )
          )}

        </div>

      </div>

    ) : (

      /* EMPTY */

      <div className="exp-empty">

        <div className="exp-empty-icon">
          💬
        </div>

        <strong>
          No experiences yet
        </strong>

        <span>
          Be the first hacker to share your experience.
        </span>

      </div>

    )}

  </div>


  {/* =======================================================
      EXPERIENCE FORM
  ======================================================= */}

  <div className="exp-form-card">

    {/* TOP GLOW */}

    <div className="exp-form-glow" />


    {/* HEADER */}

    <div className="exp-form-title">

      <div className="exp-form-icon">
        ✦
      </div>

      <div>

        <span className="exp-form-kicker">
          LAB COMPLETED?
        </span>

        <strong>
          Share Your Experience
        </strong>

        <p>
          Help other hackers know what to expect.
        </p>

      </div>

    </div>


    {/* FORM */}

    <div className="exp-form-fields">

      {/* USERNAME */}

      <div className="exp-field">

        <label>
          Hacker Username
        </label>

        <div className="exp-input-wrap">

          <span className="exp-input-prefix">
            @
          </span>

          <input
            className="exp-input name"
            type="text"
            placeholder="your username"
            maxLength={24}
            value={expName}
            onChange={(e) =>
              setExpName(
                e.target.value.slice(0, 24)
              )
            }
          />

        </div>

      </div>


      {/* MESSAGE */}

      <div className="exp-field">

        <div className="exp-message-label">

          <label>
            Your Experience
          </label>

          <span>
            {expMessage.length}/50
          </span>

        </div>


        <div className="exp-msg-box">

          <textarea
            className="exp-input msg"
            placeholder="Tell hackers what you learned..."
            maxLength={50}
            rows={3}
            value={expMessage}
            onChange={(e) =>
              setExpMessage(
                e.target.value.slice(0, 50)
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                if (
                  expName.trim() &&
                  expMessage.trim()
                ) {
                  submitExperience();
                }

              }

            }}
          />

          <span className="exp-msg-icon">
            ✎
          </span>

        </div>

      </div>


      {/* QUICK REVIEWS */}

      <div className="exp-quick">

        <span>
          Quick review:
        </span>

        <button
          type="button"
          onClick={() =>
            setExpMessage(
              "Great lab! Learned something new."
            )
          }
        >
          🔥 Great Lab
        </button>

        <button
          type="button"
          onClick={() =>
            setExpMessage(
              "Challenging but really enjoyable!"
            )
          }
        >
          🧠 Challenging
        </button>

        <button
          type="button"
          onClick={() =>
            setExpMessage(
              "Perfect lab for beginners!"
            )
          }
        >
          🚀 Beginner Friendly
        </button>

      </div>


      {/* POST BUTTON */}

      <button
        className="exp-submit"
        type="button"
        onClick={submitExperience}
        disabled={
          !expName.trim() ||
          !expMessage.trim()
        }
      >

        <span className="exp-submit-icon">
          ✦
        </span>

        <span>
          Publish Experience
        </span>

        <span className="exp-submit-arrow">
          →
        </span>

      </button>

    </div>


    {/* FOOTER */}

    <div className="exp-form-footer">

      <span>
        🔒 Community feedback
      </span>

      <span>
        •
      </span>

      <span>
        Max 50 characters
      </span>

    </div>

  </div>

</section>

    </div>
  );
};

export default AWSLab;