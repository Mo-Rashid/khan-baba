
import React, { useEffect, useState } from "react";
import { getFeedback, createFeedback } from "./feedbackApi";
import "./Feedback.css";
import { FEEDBACK_CONFIG } from "./feedbackConfig";

const Feedback = ({ section }) => {
  const config = FEEDBACK_CONFIG[section];

  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [activeTags, setActiveTags] = useState([]);

  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState("0.0");

  const loadFeedback = async () => {
    try {
      setLoading(true);

      const data = await getFeedback(section);

      if (data.success) {
        setFeedback(data.feedback || []);
        setTotalReviews(data.totalReviews || 0);
        setAverageRating(data.averageRating || "0.0");
      }
    } catch (error) {
      console.error("Feedback loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [section]);

  const toggleTag = (tag) => {
    setActiveTags((previous) => {
      if (previous.includes(tag)) {
        return previous.filter((item) => item !== tag);
      }

      if (previous.length >= 5) {
        return previous;
      }

      return [...previous, tag];
    });
  };

  const handleSubmit = async () => {
    const cleanUsername = username.trim();
    const cleanMessage = message.trim();

    if (cleanUsername.length < 2 || cleanUsername.length > 100) {
      alert("Username must be between 2 and 100 characters.");
      return;
    }

    if (cleanMessage.length < 3 || cleanMessage.length > 120) {
      alert("Review must be between 3 and 120 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await createFeedback({
        username: cleanUsername,
        section,
        rating,
        message: cleanMessage,
        tags: activeTags,
      });

      if (data.success) {
        setUsername("");
        setMessage("");
        setRating(5);
        setActiveTags([]);

        await loadFeedback();

        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Submit feedback error:", error);
      alert(error.message || "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!config) {
    return null;
  }

  return (
    <section className="feedback-section">
      <div className="feedback-container">

        {/* SECTION HEADER */}
        <div className="feedback-header">
          <div className="feedback-header-left">
            <div className="feedback-header-icon">💬</div>

            <div>
              <span className="feedback-eyebrow">
                COMMUNITY EXPERIENCE
              </span>

              <h2>{config.title}</h2>
              <p>{config.subtitle}</p>
            </div>
          </div>

          <div className="feedback-header-stats">
            <div className="feedback-stat">
              <strong>{totalReviews}</strong>
              <span>REVIEWS</span>
            </div>

            <div className="feedback-stat">
              <strong>★ {averageRating}</strong>
              <span>RATING</span>
            </div>
          </div>
        </div>

        {/* EXISTING FEEDBACK */}
        <div className="feedback-grid">
          {loading ? (
            <div className="feedback-empty">
              <div className="feedback-loader"></div>
              <p>Loading community feedback...</p>
            </div>
          ) : feedback.length === 0 ? (
            <div className="feedback-empty">
              <div className="feedback-empty-icon">💬</div>
              <h3>No feedback yet</h3>
              <p>Be the first student to share your experience.</p>
            </div>
          ) : (
            feedback.map((item) => (
              <article className="feedback-card" key={item.id}>
                <div className="feedback-card-top">
                  <div className="feedback-user">
                    <div className="feedback-avatar">
                      {item.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="feedback-user-details">
                      <strong>{item.username}</strong>
                      <span>COMMUNITY MEMBER</span>
                    </div>
                  </div>

                  <div className="feedback-quote">❝</div>
                </div>

                <div className="feedback-stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={index < item.stars ? "filled" : ""}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="feedback-message">{item.text}</p>

                {item.tags?.length > 0 && (
                  <div className="feedback-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className="feedback-card-footer">
                  <span>COMMUNITY REVIEW</span>
                  <time>{item.time}</time>
                </div>
              </article>
            ))
          )}
        </div>

        {/* SUBMIT REVIEW FORM */}
        <div className="feedback-form">
          <div className="feedback-form-header">
            <div className="feedback-form-icon">✦</div>

            <div>
              <span>COMMUNITY VOICE</span>
              <h3>Share Your Experience</h3>
              <p>
                Help future students understand what they can expect.
              </p>
            </div>
          </div>

          {/* USERNAME INPUT */}
          <div className="feedback-form-group">
            <label htmlFor="feedback-username">
              YOUR USERNAME
            </label>

            <input
              id="feedback-username"
              type="text"
              className="feedback-username-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              minLength={2}
              maxLength={100}
              autoComplete="nickname"
              required
              disabled={submitting}
            />
          </div>

          {/* STAR RATING */}
          <div className="feedback-form-group">
            <label>YOUR RATING</label>

            <div className="feedback-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={star <= rating ? "active" : ""}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} stars`}
                  disabled={submitting}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* REVIEW MESSAGE */}
          <div className="feedback-form-group">
            <label htmlFor="feedback-message">
              YOUR EXPERIENCE
            </label>

            <textarea
              id="feedback-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share what you learned, what you enjoyed, and your experience..."
              maxLength={120}
              required
              disabled={submitting}
            />

            <div className="feedback-character-count">
              {message.length}/120
            </div>
          </div>

          {/* QUICK TAGS */}
          <div className="feedback-form-group">
            <label>QUICK FEEDBACK</label>

            <div className="feedback-quick-tags">
              {config.tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={activeTags.includes(tag) ? "active" : ""}
                  onClick={() => toggleTag(tag)}
                  disabled={submitting}
                  aria-pressed={activeTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="button"
            className="feedback-submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="button-spinner"></span>
                SUBMITTING...
              </>
            ) : (
              <>✦ SUBMIT REVIEW →</>
            )}
          </button>

          <div className="feedback-form-footer">
            🔒 Your review will be shared with the VulnXploit community.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
