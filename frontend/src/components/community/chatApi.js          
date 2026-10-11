
const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

const CHAT_BASE = API_BASE.endsWith("/api")
  ? `${API_BASE}/community/messages`
  : `${API_BASE}/api/community/messages`;

function getToken() {
  const keys = ["token", "authToken", "jwt", "accessToken"];

  for (const key of keys) {
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
    // Invalid local storage JSON
  }

  return null;
}

export function isChatLoggedIn() {
  return Boolean(getToken());
}

async function request(path = "", options = {}) {
  const token = getToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${CHAT_BASE}${path}`, {
    ...options,
    headers,
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
    return request();
  },

  send(message) {
    return request("", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
