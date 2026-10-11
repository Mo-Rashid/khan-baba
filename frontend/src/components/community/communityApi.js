
const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

const COMMUNITY_BASE = API_BASE.endsWith("/api")
  ? `${API_BASE}/community`
  : `${API_BASE}/api/community`;

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

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.token) return user.token;
  } catch {
    // Ignore invalid local storage data.
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
      data.message || data.error || `Request failed (${response.status})`
    );
  }

  return data;
}

export const communityApi = {
  list(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/posts${query ? `?${query}` : ""}`);
  },

  get(id) {
    return request(`/posts/${encodeURIComponent(id)}`);
  },

  create(payload) {
    return request("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  reply(id, body) {
    return request(`/posts/${encodeURIComponent(id)}/replies`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
  },

  toggleLike(id) {
    return request(`/posts/${encodeURIComponent(id)}/like`, {
      method: "POST",
    });
  },

  markSolved(id, replyId) {
    return request(`/posts/${encodeURIComponent(id)}/solved`, {
      method: "PATCH",
      body: JSON.stringify({ replyId }),
    });
  },

  remove(id) {
    return request(`/posts/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  report(id, reason) {
    return request(`/posts/${encodeURIComponent(id)}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },
};

export function hasCommunityToken() {
  return Boolean(readToken());
}
