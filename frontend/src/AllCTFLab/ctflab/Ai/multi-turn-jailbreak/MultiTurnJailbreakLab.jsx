import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Feedback from "../../../../components/Feedback/Feedback";
import "./MultiTurnJailbreakLab.css";



const challenges = [
  { id: 1, title: "Two-Turn Extraction", type: "BASIC", difficulty: "Easy", points: 100 },
  { id: 2, title: "Character Building", type: "ROLEPLAY", difficulty: "Easy", points: 150 },
  { id: 3, title: "Hypothetical Framing", type: "HYPOTHETICAL", difficulty: "Medium", points: 200 },
  { id: 4, title: "Policy Erosion", type: "GRADUAL", difficulty: "Medium", points: 250 },
  { id: 5, title: "Full Multi-Turn Bypass", type: "ADVANCED", difficulty: "Hard", points: 300 },
];

export default function MultiTurnJailbreakLab() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("groq_api_key") || "");
  const [apiConnected, setApiConnected] = useState(!!localStorage.getItem("groq_api_key"));
  const [activeChallenge, setActiveChallenge] = useState(1);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I am a careful assistant. Let's talk step by step." },
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
      return JSON.parse(localStorage.getItem("mt_lab_reviews") || "{}");
    } catch {
      return {};
    }
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setSeconds((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [started]);

  useEffect(() => {
    const key = `level_${activeChallenge}`;
    setReviewSubmitted(!!reviews[key]);
    setReviewText(reviews[key]?.text || "");
  }, [activeChallenge, reviews]);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const handleApiSubmit = () => {
    const key = apiKey.trim();
    if (!key) return alert("Please enter your Groq API key.");
    if (!key.startsWith("gsk_")) return alert("Invalid Groq API key format.");
    localStorage.setItem("groq_api_key", key);
    setApiKey(key);
    setApiConnected(true);
  };

  const removeApiKey = () => {
    localStorage.removeItem("groq_api_key");
    setApiKey("");
    setApiConnected(false);
  };

  // Build history for backend (user + assistant only)
  const buildHistory = () => {
    return messages
      .filter((m) => m.role === "user" || m.role === "bot")
      .map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }));
  };

  const API_BASE = import.meta.env.VITE_API_URL || "/api";

const sendPrompt = async () => {
  const text = payload.trim();

  if (!text || !apiKey) return;

  if (!started) {
    setStarted(true);
  }

  const history = buildHistory();

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  setPayload("");
  setLoading(true);
  setCapturedFlag(null);

  try {
    const res = await fetch(
      `${API_BASE}/labs/ai/multi-turn-jailbreak/${activeChallenge}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: text,
          apiKey: apiKey.trim(),
          history,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || `Request failed with status ${res.status}`
      );
    }

    const botText =
      data.response ||
      data.message ||
      "No response.";

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
    console.error("Multi-Turn Jailbreak API Error:", error);

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text:
          error instanceof Error
            ? `Backend error: ${error.message}`
            : "Backend connection failed.",
        error: true,
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
        text: `Challenge ${id}: ${challenges[id - 1].title}. Build the conversation over multiple turns.`,
      },
    ]);
  };

  const submitReview = () => {
    const text = reviewText.trim();
    if (!text) return alert("Please write your experience.");
    const key = `level_${activeChallenge}`;
    const next = {
      ...reviews,
      [key]: {
        level: activeChallenge,
        title: challenges[activeChallenge - 1].title,
        text,
        date: new Date().toLocaleString(),
      },
    };
    setReviews(next);
    localStorage.setItem("mt_lab_reviews", JSON.stringify(next));
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
      { role: "bot", text: "Hello! I am a careful assistant. Let's talk step by step." },
    ]);
    setPayload("");
  };


    // ========================================
  // EXPERIENCE / COMMUNITY REVIEWS
  // ========================================

  const LAB_KEY = "multi-turn-jailbreak";
  
  const [expName, setExpName] = useState("");
  const [expMessage, setExpMessage] = useState("");
  


  



  if (!apiConnected) {
    return (
      <div className="customer-page">
        <Navbar />
        <main className="api-page">
          <div className="api-card">
            <div className="api-icon">🔑</div>
            <div className="api-kicker">MULTI-TURN JAILBREAK LAB</div>
            <h1>Enter Your Groq API Key</h1>
            <p>Connect your Groq API key to start the multi-turn jailbreak lab.</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxx"
              className="api-input"
            />
            <button className="primary-btn" onClick={handleApiSubmit}>
              Save & Continue →
            </button>
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
          <div className="hero-kicker">AI SECURITY / MULTI-TURN JAILBREAK</div>
          <h1>
            MULTI-TURN
            <span> JAILBREAK LAB</span>
          </h1>
          <p>
            Bypass protections gradually across multiple conversation turns —
            not with a single message.
          </p>
          <div className="stats-grid">
            <div className="stat-card"><strong>{solved.length}</strong><span>SOLVED</span></div>
            <div className="stat-card"><strong>{challenges.length}</strong><span>CHALLENGES</span></div>
            <div className="stat-card"><strong>{progress}%</strong><span>PROGRESS</span></div>
            <div className="stat-card time-card"><strong>{formatTime(seconds)}</strong><span>SESSION TIME</span></div>
          </div>
          <div className="progress-wrapper">
            <div className="progress-header">
              <span>LAB PROGRESS</span>
              <strong>{solved.length}/{challenges.length}</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="lab-layout">
          <aside className="lab-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">MULTI-TURN JAILBREAK<span>CHALLENGES</span></div>
              <div className="challenge-list">
                {challenges.map((c) => {
                  const locked = c.id > 1 && !solved.includes(c.id - 1);
                  const isSolved = solved.includes(c.id);
                  const active = activeChallenge === c.id;
                  return (
                    <button
                      key={c.id}
                      className={`challenge-item ${active ? "active" : ""} ${isSolved ? "solved" : ""}`}
                      onClick={() => !locked && changeChallenge(c.id)}
                    >
                      <div className="challenge-number">{String(c.id).padStart(2, "0")}</div>
                      <div className="challenge-info">
                        <strong>{c.title}</strong>
                        <small>{c.type}</small>
                      </div>
                      <div className="challenge-status">{isSolved ? "✓" : locked ? "🔒" : ""}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-card status-card">
              <div className="sidebar-title">LAB STATUS</div>
              <div className="status-row"><span>Difficulty</span><strong>{current.difficulty}</strong></div>
              <div className="status-row"><span>Points</span><strong>{current.points} XP</strong></div>
              <div className="status-row"><span>Type</span><strong>{current.type}</strong></div>
            </div>

            <div className="sidebar-card api-status-card">
              <div className="sidebar-title">API STATUS</div>
              <div className="connection-status"><span className="online-dot" /> Connected</div>
              <button className="disconnect-btn" onClick={removeApiKey}>Disconnect API</button>
            </div>

            <button className="reset-btn" onClick={resetProgress}>↻ Reset Progress</button>
          </aside>

          <div className="lab-content">
            <div className="content-heading">
              <div>
                <div className="content-kicker">
                  CHALLENGE {String(activeChallenge).padStart(2, "0")} / {current.type}
                </div>
                <h2>{current.title}</h2>
                <p>Build context over multiple messages, then extract the secret.</p>
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
                  Use multiple conversation turns to gradually jailbreak the model
                  and capture the hidden flag.
                </p>
              </div>
            </div>

            <div className="chat-card">
              <div className="chat-header">
                <div className="chat-title-icon">🔁</div>
                <div>
                  <h3>Multi-Turn Assistant</h3>
                  <span>Conversation history is sent to the backend</span>
                </div>
                <div className="live-indicator"><span /> LIVE</div>
              </div>


              <div className="browser-window">
                <div className="browser-bar">
                  <div className="browser-dots"><span /><span /><span /></div>
                  <div className="browser-url">multi-turn.VulnXploit.local</div>
                </div>

                <div className="chat-screen">
                  <div className="conversation">
                    {messages.map((m, i) => (
                      <div key={i} className={`message-row ${m.role === "user" ? "user-row" : "bot-row"}`}>
                        <div
                          className={`message ${
                            m.role === "user" ? "user-message" : "bot-message"
                          } ${m.success ? "success-message" : ""} ${m.error ? "error-message" : ""}`}
                        >
                          <div className="message-label">
                            {m.role === "user" ? "YOU" : "ASSISTANT"}
                          </div>
                          <div className="message-text">{m.text}</div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="message-row bot-row">
                        <div className="message bot-message">
                          <div className="message-label">ASSISTANT</div>
                          <div className="typing"><span /><span /><span /></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="chat-input-area">
                    <textarea
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Continue the conversation..."
                      disabled={loading}
                    />
                    <button onClick={sendPrompt} disabled={loading || !payload.trim()}>
                      {loading ? "Sending..." : "Send Prompt"} {!loading && <span>→</span>}
                    </button>
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