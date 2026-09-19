import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./ToolAbuseLab.css";



const API_BASE = import.meta.env.VITE_API_URL || "/api";

const challenges = [
  {
    id: 1,
    title: "Force File Read",
    type: "FILE TOOL",
    difficulty: "Easy",
    points: 100,
  },
  {
    id: 2,
    title: "Unauthorized Tool",
    type: "TOOL CALL",
    difficulty: "Easy",
    points: 150,
  },
  {
    id: 3,
    title: "Parameter Injection",
    type: "PARAM INJECT",
    difficulty: "Medium",
    points: 200,
  },
  {
    id: 4,
    title: "Tool Chaining",
    type: "CHAINING",
    difficulty: "Medium",
    points: 250,
  },
  {
    id: 5,
    title: "Privilege Escalation",
    type: "PRIVESC",
    difficulty: "Hard",
    points: 300,
  },
];

export default function ToolAbuseLab() {
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("groq_api_key") || ""
  );
  const [apiConnected, setApiConnected] = useState(
    !!localStorage.getItem("groq_api_key")
  );
  const [activeChallenge, setActiveChallenge] = useState(1);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I am a tool-enabled assistant. I can use tools like read_file, search, and calculator. How can I help?",
    },
  ]);
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [capturedFlag, setCapturedFlag] = useState(null);

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("ta_lab_reviews");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    const key = `level_${activeChallenge}`;
    setReviewSubmitted(!!reviews[key]);
    setReviewText(reviews[key]?.text || "");
  }, [activeChallenge, reviews]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  const handleApiSubmit = () => {
    const cleanKey = apiKey.trim();
    if (!cleanKey) {
      alert("Please enter your Groq API key.");
      return;
    }
    if (!cleanKey.startsWith("gsk_")) {
      alert("Invalid Groq API key format.");
      return;
    }
    localStorage.setItem("groq_api_key", cleanKey);
    setApiKey(cleanKey);
    setApiConnected(true);
  };

  const removeApiKey = () => {
    localStorage.removeItem("groq_api_key");
    setApiKey("");
    setApiConnected(false);
  };

  const sendPrompt = async () => {
    const cleanPayload = payload.trim();
    if (!cleanPayload) return;

    if (!apiKey) {
      alert("Please connect your Groq API key first.");
      return;
    }

    if (!started) setStarted(true);

    setMessages((prev) => [...prev, { role: "user", text: cleanPayload }]);
    setPayload("");
    setLoading(true);
    setCapturedFlag(null);

    try {
      const response = await fetch(
        `${API_BASE}/labs/ai/tool-abuse/${activeChallenge}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: cleanPayload,
            apiKey: apiKey,
          }),
        }
      );

      const data = await response.json();

      const botText =
        data.response || data.message || "No response received from the AI.";

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botText,
          success: data.success === true,
        },
      ]);

      if (data.success === true) {
        setSolved((prev) =>
          prev.includes(activeChallenge)
            ? prev
            : [...prev, activeChallenge]
        );

        if (data.flag) {
          setCapturedFlag(data.flag);
        }
      }
    } catch (error) {
      console.error("Tool Abuse API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Backend connection failed. Make sure your Node.js server is running on port 5000.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  };

  const changeChallenge = (id) => {
    if (id > 1 && !solved.includes(id - 1)) return;

    setActiveChallenge(id);
    setCapturedFlag(null);
    setReviewSubmitted(false);

    setMessages([
      {
        role: "bot",
        text: `Challenge ${id}: ${challenges[id - 1].title}. Try to abuse the available tools to extract the secret.`,
      },
    ]);
  };

  const submitReview = () => {
    const text = reviewText.trim();
    if (!text) {
      alert("Please write your experience before submitting.");
      return;
    }

    const key = `level_${activeChallenge}`;
    const newReviews = {
      ...reviews,
      [key]: {
        level: activeChallenge,
        title: challenges[activeChallenge - 1].title,
        text: text,
        date: new Date().toLocaleString(),
      },
    };

    setReviews(newReviews);
    localStorage.setItem("ta_lab_reviews", JSON.stringify(newReviews));
    setReviewSubmitted(true);
  };

  const resetProgress = () => {
    setSolved([]);
    setActiveChallenge(1);
    setSeconds(0);
    setStarted(false);
    setCapturedFlag(null);
    setReviewText("");
    setReviewSubmitted(false);
    setMessages([
      {
        role: "bot",
        text: "Hello! I am a tool-enabled assistant. I can use tools like read_file, search, and calculator. How can I help?",
      },
    ]);
    setPayload("");
  };

  const LAB_KEY = "ai-tool-abuse";
  
  // Experience form state
  const [expName, setExpName] = useState("");
  const [expMessage, setExpMessage] = useState("");
  
  // Android lab ke reviews only
  const [experiences, setExperiences] = useState([]);
  
  

  if (!apiConnected) {
    return (
      <div className="customer-page">
        <Navbar />
        <main className="api-page">
          <div className="api-card">
            <div className="api-icon">🔑</div>
            <div className="api-kicker">TOOL ABUSE LAB</div>
            <h1>Enter Your Groq API Key</h1>
            <p>
              Connect your own Groq API key to interact with the live AI model
              inside this controlled security training environment.
            </p>
            <div className="api-help">
              Get your API key from{" "}
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noreferrer"
              >
                console.groq.com
              </a>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxx"
              className="api-input"
            />
            <button className="primary-btn" onClick={handleApiSubmit}>
              Save & Continue
              <span>→</span>
            </button>
            <div className="api-note">
              🔒 Your API key is stored only in this browser using localStorage.
            </div>
          </div>
        </main>
      </div>
    );
  }

  const current = challenges[activeChallenge - 1];
  const progress = Math.round((solved.length / challenges.length) * 100);
  const isCurrentSolved = solved.includes(activeChallenge);

  return (
    <div className="customer-page">
      <Navbar />

      <main className="customer-container">
        <section className="customer-hero">
          <div className="hero-kicker">AI SECURITY / TOOL ABUSE</div>
          <h1>
            TOOL ABUSE
            <span> LAB</span>
          </h1>
          <p>
            Abuse AI tool calling features — force unauthorized tools, inject
            parameters, chain tools, and escalate privileges.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <strong>{solved.length}</strong>
              <span>SOLVED</span>
            </div>
            <div className="stat-card">
              <strong>{challenges.length}</strong>
              <span>CHALLENGES</span>
            </div>
            <div className="stat-card">
              <strong>{progress}%</strong>
              <span>PROGRESS</span>
            </div>
            <div className="stat-card time-card">
              <strong>{formatTime(seconds)}</strong>
              <span>SESSION TIME</span>
            </div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-header">
              <span>LAB PROGRESS</span>
              <strong>
                {solved.length}/{challenges.length}
              </strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="lab-layout">
          <aside className="lab-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">
                TOOL ABUSE
                <span>CHALLENGES</span>
              </div>

              <div className="challenge-list">
                {challenges.map((challenge) => {
                  const isLocked =
                    challenge.id > 1 && !solved.includes(challenge.id - 1);
                  const isSolved = solved.includes(challenge.id);
                  const isActive = activeChallenge === challenge.id;

                  return (
                    <button
                      key={challenge.id}
                      className={`challenge-item ${
                        isActive ? "active" : ""
                      } ${isSolved ? "solved" : ""}`}
                      onClick={() => !isLocked && changeChallenge(challenge.id)}
                    >
                      <div className="challenge-number">
                        {String(challenge.id).padStart(2, "0")}
                      </div>
                      <div className="challenge-info">
                        <strong>{challenge.title}</strong>
                        <small>{challenge.type}</small>
                      </div>
                      <div className="challenge-status">
                        {isSolved ? "✓" : isLocked ? "🔒" : ""}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-card status-card">
              <div className="sidebar-title">LAB STATUS</div>
              <div className="status-row">
                <span>Difficulty</span>
                <strong>{current.difficulty}</strong>
              </div>
              <div className="status-row">
                <span>Points</span>
                <strong>{current.points} XP</strong>
              </div>
              <div className="status-row">
                <span>Type</span>
                <strong>{current.type}</strong>
              </div>
            </div>

            <div className="sidebar-card api-status-card">
              <div className="sidebar-title">API STATUS</div>
              <div className="connection-status">
                <span className="online-dot" />
                Connected
              </div>
              <button className="disconnect-btn" onClick={removeApiKey}>
                Disconnect API
              </button>
            </div>

            <button className="reset-btn" onClick={resetProgress}>
              ↻ Reset Progress
            </button>
          </aside>

          <div className="lab-content">
            <div className="content-heading">
              <div>
                <div className="content-kicker">
                  CHALLENGE {String(activeChallenge).padStart(2, "0")} /{" "}
                  {current.type}
                </div>
                <h2>{current.title}</h2>
                <p>
                  Abuse the assistant&apos;s tools to extract the hidden training
                  secret.
                </p>
              </div>

              <div className="reward-card">
                <span>REWARD</span>
                <strong>+{current.points}</strong>
                <small>XP</small>
              </div>
            </div>

            <div className="mission-card">
              <div className="mission-header">
                <div className="mission-icon">🎯</div>
                <div>
                  <h3>Mission Objective</h3>
                  <span>What you need to accomplish</span>
                </div>
              </div>
              <div className="mission-body">
                <strong>Your Mission</strong>
                <p>
                  Force tool calls, inject parameters, chain tools, or escalate
                  privileges to capture the secret flag.
                </p>
              </div>
            </div>

            <div className="chat-card">
              <div className="chat-header">
                <div className="chat-title-icon">🛠️</div>
                <div>
                  <h3>Tool-Enabled Assistant</h3>
                  <span>Controlled tool abuse training environment</span>
                </div>
                <div className="live-indicator">
                  <span />
                  LIVE
                </div>
              </div>

              <div className="browser-window">
                <div className="browser-bar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="browser-url">tools.vulnxploit-ai.local</div>
                  <div className="browser-refresh">↻</div>
                </div>

                <div className="chat-screen">
                  <div className="chat-brand">VulnXploit AI</div>
                  <h3>Tool Assistant</h3>
                  <p className="chat-description">
                    Interact with the tool-enabled assistant and try to abuse its
                    tools.
                  </p>

                  <div className="conversation">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message-row ${
                          message.role === "user" ? "user-row" : "bot-row"
                        }`}
                      >
                        <div
                          className={`message ${
                            message.role === "user"
                              ? "user-message"
                              : "bot-message"
                          } ${message.success ? "success-message" : ""} ${
                            message.error ? "error-message" : ""
                          }`}
                        >
                          <div className="message-label">
                            {message.role === "user" ? "YOU" : "ASSISTANT"}
                          </div>
                          <div className="message-text">{message.text}</div>
                        </div>
                      </div>
                    ))}

                    {loading && (
                      <div className="message-row bot-row">
                        <div className="message bot-message">
                          <div className="message-label">ASSISTANT</div>
                          <div className="typing">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="chat-input-area">
                    <textarea
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Try to abuse tools... e.g. read_file('secret.txt')"
                      disabled={loading}
                    />
                    <button
                      onClick={sendPrompt}
                      disabled={loading || !payload.trim()}
                    >
                      {loading ? "Sending..." : "Send Prompt"}
                      {!loading && <span>→</span>}
                    </button>
                  </div>

                  <div className="input-hint">
                    Press Enter to send • Shift + Enter for new line
                  </div>
                </div>
              </div>
            </div>

            {capturedFlag && (
  <div className="flag-modal-overlay">
    <div className="flag-modal">
      <button
        className="flag-modal-close"
        onClick={() => setCapturedFlag(null)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="flag-modal-icon">🤖</div>

      <div className="flag-modal-title">
        FLAG CAPTURED
      </div>

      <div className="flag-modal-subtitle">
        Challenge completed successfully!
      </div>

      <div className="flag-value-box">
        <code>{capturedFlag}</code>
      </div>

      <button
        className="flag-modal-ok"
        onClick={() => setCapturedFlag(null)}
      >
        Continue
      </button>
    </div>
  </div>
)}
          </div>
        </section>
        <Feedback section="all-ctf-lab" />
      </main>



    </div>
  );
}