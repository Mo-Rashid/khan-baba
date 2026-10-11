
const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

function readToken() {
  for (const key of ["token", "authToken", "jwt", "accessToken"]) {
    const value = localStorage.getItem(key);

    if (value && value !== "undefined" && value !== "null") {
      return value;
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

async function request(path, options = {}) {
  const token = readToken();

  const response = await fetch(`${API_BASE}/chat${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
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

export function isChatLoggedIn() {
  return Boolean(readToken());
}
