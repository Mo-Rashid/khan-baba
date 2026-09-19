const FEEDBACK_API =
  import.meta.env.VITE_FEEDBACK_API || "/api/feedback";

// GET ALL FEEDBACK FOR A SECTION
export const getFeedback = async (section) => {
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
};

// CREATE FEEDBACK
export const createFeedback = async ({
  section,
  rating,
  message,
  tags,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Please login before submitting feedback."
    );
  }

  const response = await fetch(FEEDBACK_API, {
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
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to submit feedback"
    );
  }

  return data;
};

// DELETE FEEDBACK
export const deleteFeedback = async (feedbackId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first.");
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
      data.message || "Unable to delete feedback"
    );
  }

  return data;
};