const { getFlag } = require("../../utils/flags");
const { validateSSRF } = require("../../utils/validators");

function submitSSRF(level, payload) {
  const id = Number(level);
  const isCorrect = validateSSRF(id, payload);

  const requests = {
    1: `GET /fetch?url=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local`,
    2: `GET /proxy?url=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local`,
    3: `GET /preview?url=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local`,
    4: `GET /load?url=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local`,
    5: `GET /fetch?url=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local
# Filter bypass`,
  };

  const successResponses = {
    1: `HTTP/1.1 200 OK
Fetched internal resource (127.0.0.1 / localhost).`,
    2: `HTTP/1.1 200 OK
Internal network host reached (192.168.x / 10.x).`,
    3: `HTTP/1.1 200 OK
Cloud metadata retrieved (169.254.169.254).`,
    4: `HTTP/1.1 200 OK
Dangerous protocol used (file:// / gopher://).`,
    5: `HTTP/1.1 200 OK
Filter bypassed. SSRF still successful.`,
  };

  const failResponses = {
    1: `HTTP/1.1 403 Forbidden\nBlocked host`,
    2: `HTTP/1.1 403 Forbidden`,
    3: `HTTP/1.1 404 Not Found`,
    4: `HTTP/1.1 400 Bad Request\nProtocol not allowed`,
    5: `HTTP/1.1 403 Forbidden\nWAF blocked`,
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not trigger SSRF.",
      request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
      response: failResponses[id] || "No vulnerability triggered",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("web", "ssrf", id),
    request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
    response: successResponses[id] || "SSRF successful",
  };
}

module.exports = { submitSSRF };