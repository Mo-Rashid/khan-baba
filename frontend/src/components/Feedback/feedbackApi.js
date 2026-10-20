
const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

const FEEDBACK_API = API_BASE.endsWith("/api")
  ? `${API_BASE}/feedback`
  : `${API_BASE}/api/feedback`;

function getToken() {
  for (const key of ["token", "authToken", "accessToken", "jwt"]) {
    const token = localStorage.getItem(key);

    if (token && token !== "undefined" && token !== "null") {
      return token;
    }
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.token) return user.token;

    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (auth?.token) return auth.token;
  } catch {
    // Ignore invalid localStorage JSON.
  }

  return null;
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

export async function createFeedback({
  section,
  rating,
  message,
  tags = [],
}) {
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return parseResponse(response);
}
