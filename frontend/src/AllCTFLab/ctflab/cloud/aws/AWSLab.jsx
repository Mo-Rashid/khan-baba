import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
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
      <Feedback section="all-ctf-lab" />


    </div>
  );
};

export default AWSLab;