import React, {
  useEffect,
  useState,
} from "react";

import "./Feedback.css";


import {  FEEDBACK_CONFIG,} from "./feedbackConfig";


const Feedback = ({
  section,
}) => {
  const config =
    FEEDBACK_CONFIG[section];

  const [feedback, setFeedback] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [activeTags, setActiveTags] =
    useState([]);

  const [totalReviews, setTotalReviews] =
    useState(0);

  const [averageRating, setAverageRating] =
    useState("0.0");


  /*
  |--------------------------------------------------------------------------
  | Load feedback
  |--------------------------------------------------------------------------
  */

  const loadFeedback = async () => {
    try {
      setLoading(true);

      const data =
        await getFeedback(section);

      if (data.success) {
        setFeedback(
          data.feedback || []
        );

        setTotalReviews(
          data.totalReviews || 0
        );

        setAverageRating(
          data.averageRating || "0.0"
        );
      }
    } catch (error) {
      console.error(
        "Feedback loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Load when section changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadFeedback();
  }, [section]);


  /*
  |--------------------------------------------------------------------------
  | Toggle quick tag
  |--------------------------------------------------------------------------
  */

  const toggleTag = (tag) => {
    setActiveTags((previous) => {
      if (previous.includes(tag)) {
        return previous.filter(
          (item) => item !== tag
        );
      }

      if (previous.length >= 5) {
        return previous;
      }

      return [
        ...previous,
        tag,
      ];
    });
  };


  /*
  |--------------------------------------------------------------------------
  | Submit feedback
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login before submitting feedback."
      );

      return;
    }

    if (!message.trim()) {
      alert(
        "Please write your feedback."
      );

      return;
    }

    try {
      setSubmitting(true);

      const data =
        await createFeedback({
          section,
          rating,
          message: message.trim(),
          tags: activeTags,
        });

      if (data.success) {
        setMessage("");

        setRating(5);

        setActiveTags([]);

        await loadFeedback();

        alert(
          "Feedback submitted successfully! 🎉"
        );
      }
    } catch (error) {
      console.error(
        "Submit feedback error:",
        error
      );

      alert(
        error.message ||
          "Unable to submit feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Invalid section
  |--------------------------------------------------------------------------
  */

  if (!config) {
    return null;
  }


  return (
    <section className="feedback-section">

      <div className="feedback-container">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="feedback-header">

          <div className="feedback-header-left">

            <div className="feedback-header-icon">
              💬
            </div>

            <div>

              <span className="feedback-eyebrow">
                COMMUNITY EXPERIENCE
              </span>

              <h2>
                {config.title}
              </h2>

              <p>
                {config.subtitle}
              </p>

            </div>

          </div>


          <div className="feedback-header-stats">

            <div className="feedback-stat">
              <strong>
                {totalReviews}
              </strong>

              <span>
                REVIEWS
              </span>
            </div>


            <div className="feedback-stat">
              <strong>
                ★ {averageRating}
              </strong>

              <span>
                RATING
              </span>
            </div>

          </div>

        </div>


        {/* ==================================================
            FEEDBACK GRID
        ================================================== */}

        <div className="feedback-grid">

          {loading ? (

            <div className="feedback-empty">
              <div className="feedback-loader"></div>

              <p>
                Loading community feedback...
              </p>
            </div>

          ) : feedback.length === 0 ? (

            <div className="feedback-empty">

              <div className="feedback-empty-icon">
                💬
              </div>

              <h3>
                No feedback yet
              </h3>

              <p>
                Be the first student to
                share your experience.
              </p>

            </div>

          ) : (

            feedback.map((item) => (

              <article
                className="feedback-card"
                key={item.id}
              >

                {/* USER */}

                <div className="feedback-card-top">

                  <div className="feedback-user">

                    <div className="feedback-avatar">
                      {item.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="feedback-user-details">

                      <strong>
                        {item.username}
                      </strong>

                      <span>
                        ✓ VERIFIED USER
                      </span>

                    </div>

                  </div>


                  <div className="feedback-quote">
                    ❝
                  </div>

                </div>


                {/* STARS */}

                <div className="feedback-stars">

                  {Array.from(
                    { length: 5 },
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index <
                          item.stars
                            ? "filled"
                            : ""
                        }
                      >
                        ★
                      </span>
                    )
                  )}

                </div>


                {/* MESSAGE */}

                <p className="feedback-message">
                  {item.text}
                </p>


                {/* TAGS */}

                {item.tags?.length > 0 && (

                  <div className="feedback-tags">

                    {item.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                        >
                          {tag}
                        </span>
                      )
                    )}

                  </div>

                )}


                {/* FOOTER */}

                <div className="feedback-card-footer">

                  <span>
                    STUDENT
                  </span>

                  <time>
                    {item.time}
                  </time>

                </div>

              </article>

            ))

          )}

        </div>


        {/* ==================================================
            SUBMIT FORM
        ================================================== */}

        <div className="feedback-form">

          <div className="feedback-form-header">

            <div className="feedback-form-icon">
              ✦
            </div>

            <div>

              <span>
                COMMUNITY VOICE
              </span>

              <h3>
                Share Your Experience
              </h3>

              <p>
                Help future students understand
                what they can expect.
              </p>

            </div>

          </div>


          {/* RATING */}

          <div className="feedback-form-group">

            <label>
              YOUR RATING
            </label>

            <div className="feedback-rating">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    type="button"
                    key={star}
                    className={
                      star <= rating
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setRating(star)
                    }
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>

                )
              )}

            </div>

          </div>


          {/* MESSAGE */}

          <div className="feedback-form-group">

            <label>
              YOUR EXPERIENCE
            </label>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              placeholder="Share what you learned, what you enjoyed, and your experience..."
              maxLength={120}
            />

            <div className="feedback-character-count">
              {message.length}/120
            </div>

          </div>


          {/* TAGS */}

          <div className="feedback-form-group">

            <label>
              QUICK FEEDBACK
            </label>

            <div className="feedback-quick-tags">

              {config.tags.map(
                (tag) => (

                  <button
                    type="button"
                    key={tag}
                    className={
                      activeTags.includes(
                        tag
                      )
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      toggleTag(tag)
                    }
                  >
                    {tag}
                  </button>

                )
              )}

            </div>

          </div>


          {/* SUBMIT */}

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
              <>
                ✦ SUBMIT FEEDBACK →
              </>
            )}

          </button>


          <div className="feedback-form-footer">
            🔒 Login required • Your feedback is
            linked to your account
          </div>

        </div>

      </div>

    </section>
  );
};

export default Feedback;