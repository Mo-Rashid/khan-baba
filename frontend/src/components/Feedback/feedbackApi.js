const FEEDBACK_API =
  import.meta.env.VITE_FEEDBACK_API || "/api/feedback";

/* =========================================
   GET FEEDBACK
========================================= */

export const getFeedback = async (section) => {
  try {
    const response = await fetch(
      `${FEEDBACK_API}?section=${encodeURIComponent(section)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load feedback"
      );
    }

    return data;
  } catch (error) {
    console.error("GET FEEDBACK ERROR:", error);
    throw error;
  }
};


/* =========================================
   CREATE FEEDBACK
========================================= */

export const createFeedback = async ({
  section,
  rating,
  message,
  tags,
}) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Please login before submitting feedback."
      );
    }

    const response = await fetch(
      FEEDBACK_API,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          section,
          rating,
          message,
          tags,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to submit feedback"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "CREATE FEEDBACK ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================
   DELETE FEEDBACK
========================================= */

export const deleteFeedback = async (
  feedbackId
) => {
  try {
    const token =
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Please login first."
      );
    }

    const response = await fetch(
      `${FEEDBACK_API}/${feedbackId}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to delete feedback"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "DELETE FEEDBACK ERROR:",
      error
    );

    throw error;
  }
};