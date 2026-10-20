const FEEDBACK_API =
  `${import.meta.env.VITE_API_URL || ""}/api/feedback`;

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken")
  );
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
}

export async function getFeedback(section) {
  const response = await fetch(
    `${FEEDBACK_API}?section=${encodeURIComponent(section)}`
  );
  return parseResponse(response);
}

export async function createFeedback({ section, rating, message, tags = [] }) {
  const token = getToken();
  if (!token) {
    throw new Error("Please log in before submitting feedback.");
  }

  const response = await fetch(FEEDBACK_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ section, rating, message, tags }),
  });

  return parseResponse(response);
}

export async function deleteFeedback(feedbackId) {
  const token = getToken();
  if (!token) {
    throw new Error("Please log in first.");
  }

  const response = await fetch(
    `${FEEDBACK_API}/${encodeURIComponent(feedbackId)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return parseResponse(response);
}