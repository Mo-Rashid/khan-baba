
const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

const CHAT_BASE = API_BASE.endsWith("/api")
  ? `${API_BASE}/chat`
  : `${API_BASE}/api/chat`;

function getToken() {
  const tokenKeys = [
    "token",
    "authToken",
    "jwt",
    "accessToken",
  ];

  for (const key of tokenKeys) {
    const token = localStorage.getItem(key);

    if (token && token !== "undefined" && token !== "null") {
      return token;
    }
  }

  // Alternative: token user/auth object mein stored ho
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user?.token) return user.token;

    const auth = JSON.parse(
      localStorage.getItem("auth") || "null"
    );

    if (auth?.token) return auth.token;
  } catch {
    // Invalid stored JSON ko ignore karo
  }

  return null;
}

export function isChatLoggedIn() {
  return Boolean(getToken());
}

async function request(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${CHAT_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Chat request failed (${response.status})`
    );
  }

  return data;
}

export const chatApi = {
  list() {
    return request("/messages");
  },

  send(message) {
    return request("/messages", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
