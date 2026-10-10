
const API_BASE = (import.meta.env.VITE_API_URL || "")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const COMMUNITY_BASE = `${API_BASE}/api/community`;

function readToken() {
  const keys = ["token", "authToken", "jwt", "accessToken"];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (value && value !== "undefined" && value !== "null") {
      return value;
    }
  }

  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (auth?.token) return auth.token;

    const userData = JSON.parse(localStorage.getItem("user") || "null");
    if (userData?.token) return userData.token;
  } catch {
    // Ignore invalid localStorage JSON.
  }

  return null;
}

async function request(path, options = {}) {
  const token = readToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${COMMUNITY_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
}

export const communityApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/posts${query ? `?${query}` : ""}`);
  },

  get: (id) =>
    request(`/posts/${encodeURIComponent(id)}`),

  create: (payload) =>
    request("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  reply: (id, body) =>
    request(`/posts/${encodeURIComponent(id)}/replies`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),

  toggleLike: (id) =>
    request(`/posts/${encodeURIComponent(id)}/like`, {
      method: "POST",
    }),

  markSolved: (id, replyId) =>
    request(`/posts/${encodeURIComponent(id)}/solved`, {
      method: "PATCH",
      body: JSON.stringify({ replyId }),
    }),

  remove: (id) =>
    request(`/posts/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),

  report: (id, reason) =>
    request(`/posts/${encodeURIComponent(id)}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),
};

export function hasCommunityToken() {
  return Boolean(readToken());
}
