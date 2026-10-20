
const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

const FEEDBACK_API = API_BASE.endsWith("/api")
  ? `${API_BASE}/feedback`
  : `${API_BASE}/api/feedback`;

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

export async function createFeedback({
  username,
  section,
  rating,
  message,
  tags = [],
}) {
  const response = await fetch(FEEDBACK_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      section,
      rating,
      message,
      tags,
    }),
  });

  return parseResponse(response);
}

export async function deleteFeedback(feedbackId) {
  throw new Error(
    "Feedback deletion requires an authenticated owner."
  );
}
