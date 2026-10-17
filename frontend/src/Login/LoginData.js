
const API_BASE_URL = "/api";

export const API = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  OTP_REQUEST: `${API_BASE_URL}/auth/otp/request`,
  OTP_VERIFY: `${API_BASE_URL}/auth/otp/verify`,
};

export async function apiRequest(url, options = {}) {
  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to server. Please try again later."
    );
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Server returned an invalid response (HTTP ${response.status}). Check backend and Nginx configuration.`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
}
