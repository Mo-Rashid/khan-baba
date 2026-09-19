import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./CustomerSupportLab.css";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const challenges = [
  {
    id: 1,
    title: "Basic Prompt Injection",
    type: "PROMPT INJECTION",
    difficulty: "Easy",
    points: 100,
  },
  {
    id: 2,
    title: "Instruction Override",
    type: "INSTRUCTION OVERRIDE",
    difficulty: "Easy",
    points: 150,
  },
  {
    id: 3,
    title: "Role Manipulation",
    type: "ROLE PLAY",
    difficulty: "Medium",
    points: 200,
  },
  {
    id: 4,
    title: "Data Exposure",
    type: "DATA EXPOSURE",
    difficulty: "Medium",
    points: 250,
  },
  {
    id: 5,
    title: "Advanced Jailbreak",
    type: "JAILBREAK",
    difficulty: "Hard",
    points: 300,
  },
];

export default function CustomerSupportLab() {
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
      text: "Hello! Welcome to VulnXploit Customer Support. How can I help you today?",
    },
  ]);
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [capturedFlag, setCapturedFlag] = useState(null);

  // ========== REVIEW / COMMENT STATES ==========
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("cs_lab_reviews");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // TIMER
  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  // Load review status when challenge changes
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

  // SAVE API KEY
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

  // REMOVE API KEY
  const removeApiKey = () => {
    localStorage.removeItem("groq_api_key");
    setApiKey("");
    setApiConnected(false);
  };

  // SEND PROMPT
  const sendPrompt = async () => {
    const cleanPayload = payload.trim();
    if (!cleanPayload) return;

    if (!apiKey) {
      alert("Please connect your Groq API key first.");
      return;
    }

    if (!started) setStarted(true);

    const userMessage = { role: "user", text: cleanPayload };
    setMessages((prev) => [...prev, userMessage]);
    setPayload("");
    setLoading(true);
    setCapturedFlag(null);

    try {
      const response = await fetch(
        `${API_BASE}/labs/ai/customer-support/${activeChallenge}/submit`,
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
      console.error("Customer Support API Error:", error);
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

  // ENTER KEY
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  };

  // CHANGE CHALLENGE
  const changeChallenge = (id) => {
    if (id > 1 && !solved.includes(id - 1)) return;

    setActiveChallenge(id);
    setCapturedFlag(null);
    setReviewSubmitted(false);

    setMessages([
      {
        role: "bot",
        text: `Challenge ${id}: ${challenges[id - 1].title}. Your objective is to test the AI support system.`,
      },
    ]);
  };

  // ========== SUBMIT REVIEW ==========
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
    localStorage.setItem("cs_lab_reviews", JSON.stringify(newReviews));
    setReviewSubmitted(true);
  };

  // RESET LAB
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
        text: "Hello! Welcome to VulnXploit Customer Support. How can I help you today?",
      },
    ]);
    setPayload("");
  };

  const LAB_KEY = "ai-customer-support";
    
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
  

  // API KEY SCREEN
  if (!apiConnected) {
    return (
      <div className="customer-page">
        <Navbar />
        <main className="api-page">
          <div className="api-card">
            <div className="api-icon">🔑</div>
            <div className="api-kicker">VulnXploit AI LAB</div>
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
        {/* HERO */}
        <section className="customer-hero">
          <div className="hero-kicker">AI SECURITY / CUSTOMER SUPPORT</div>
          <h1>
            CUSTOMER SUPPORT
            <span> AI LAB</span>
          </h1>
          <p>
            Analyze and test a real-world style AI customer support system
            against instruction-level security weaknesses.
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

        {/* MAIN GRID */}
        <section className="lab-layout">
          {/* LEFT SIDEBAR */}
          <aside className="lab-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">
                CUSTOMER SUPPORT
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

          {/* CONTENT */}
          <div className="lab-content">
            <div className="content-heading">
              <div>
                <div className="content-kicker">
                  CHALLENGE {String(activeChallenge).padStart(2, "0")} /{" "}
                  {current.type}
                </div>
                <h2>{current.title}</h2>
                <p>
                  Test whether user-controlled instructions can influence
                  protected customer support behavior.
                </p>
              </div>

              <div className="reward-card">
                <span>REWARD</span>
                <strong>+{current.points}</strong>
                <small>XP</small>
              </div>
            </div>

            {/* MISSION */}
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
                  Test the customer support AI and determine whether its
                  protected instructions can be influenced by user input.
                </p>
              </div>
            </div>

            {/* CHAT */}
            <div className="chat-card">
              <div className="chat-header">
                <div className="chat-title-icon">💬</div>
                <div>
                  <h3>Customer Support AI</h3>
                  <span>Controlled security training environment</span>
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
                  <div className="browser-url">chat.vulnxploit-ai.local</div>
                  <div className="browser-refresh">↻</div>
                </div>

                <div className="chat-screen">
                  <div className="chat-brand">VulnXploit AI</div>
                  <h3>Customer Support Assistant</h3>
                  <p className="chat-description">
                    Interact with the support assistant and test its
                    instruction handling.
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
                            {message.role === "user" ? "YOU" : "SUPPORT BOT"}
                          </div>
                          <div className="message-text">{message.text}</div>
                        </div>
                      </div>
                    ))}

                    {loading && (
                      <div className="message-row bot-row">
                        <div className="message bot-message">
                          <div className="message-label">SUPPORT BOT</div>
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
                      placeholder="Enter your prompt or security test..."
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

            {/* ================= REVIEW / COMMENT SECTION ================= */}
            
          </div>
        </section>

        <Feedback section="all-ctf-lab" />
      </main>





    </div>
  );
}