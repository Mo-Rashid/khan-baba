const API_BASE_URL = "/api";

export const API = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  OTP_REQUEST: `${API_BASE_URL}/auth/otp/request`,
  OTP_VERIFY: `${API_BASE_URL}/auth/otp/verify`,
};

export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response.");
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}

export default API;