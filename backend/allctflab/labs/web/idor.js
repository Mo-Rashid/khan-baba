const { getFlag } = require("../../utils/flags");
const { validateIDOR } = require("../../utils/validators");

function submitIDOR(level, payload) {
  const id = Number(level);
  const isCorrect = validateIDOR(id, payload);

  const requests = {
    1: `GET /api/user?id=${payload.substring(0, 40)} HTTP/1.1
Host: training.VulnXploit.local
Cookie: session=user_2`,
    2: `GET /api/orders/${payload.substring(0, 40)} HTTP/1.1
Host: training.VulnXploit.local`,
    3: `GET /api/admin/users/${payload.substring(0, 40)} HTTP/1.1
Host: training.VulnXploit.local`,
    4: `GET /api/v2/profile?user_id=${payload.substring(0, 40)} HTTP/1.1
Host: training.VulnXploit.local`,
    5: `GET /api/docs/${payload.substring(0, 40)} HTTP/1.1
Host: training.VulnXploit.local`,
  };

  const successResponses = {
    1: `HTTP/1.1 200 OK
{"id":1,"email":"admin@VulnXploit.lab","role":"admin"}
IDOR — another user's data accessed.`,
    2: `HTTP/1.1 200 OK
Horizontal IDOR — another user's order retrieved.`,
    3: `HTTP/1.1 200 OK
Vertical IDOR — admin resource accessed.`,
    4: `HTTP/1.1 200 OK
API IDOR — unauthorized profile data.`,
    5: `HTTP/1.1 200 OK
Blind IDOR confirmed — resource exists / accessible.`,
  };

  const failResponses = {
    1: `HTTP/1.1 403 Forbidden\nAccess denied`,
    2: `HTTP/1.1 404 Not Found`,
    3: `HTTP/1.1 403 Forbidden`,
    4: `HTTP/1.1 401 Unauthorized`,
    5: `HTTP/1.1 404 Not Found`,
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not trigger IDOR.",
      request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
      response: failResponses[id] || "No vulnerability triggered",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("web", "idor", id),
    request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
    response: successResponses[id] || "IDOR successful",
  };
}

module.exports = { submitIDOR };