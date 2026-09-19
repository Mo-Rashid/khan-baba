const { getFlag } = require("../../utils/flags");
const { validateCSRF } = require("../../utils/validators");

function submitCSRF(level, payload) {
  const id = Number(level);
  const isCorrect = validateCSRF(id, payload);

  const requests = {
    1: `POST /change-email HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded
Cookie: session=victim_session
Origin: http://attacker.com

email=hacker@evil.com`,
    2: `GET /delete-account HTTP/1.1
Host: training.VulnXploit.local
Cookie: session=victim_session
Referer: http://attacker.com`,
    3: `POST /update-profile HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded
Cookie: session=victim_session

csrf_token=&email=hacker@evil.com`,
    4: `POST /api/update HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/json
Origin: http://attacker.com

{"email":"hacker@evil.com"}`,
    5: `POST /login HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded
Cookie: session=victim_session

username=attacker&password=attacker123`,
  };

  const successResponses = {
    1: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "success",
  "message": "Email changed to hacker@evil.com"
}`,
    2: `HTTP/1.1 200 OK
{
  "status": "account_deleted",
  "message": "Account successfully deleted"
}`,
    3: `HTTP/1.1 200 OK
{
  "status": "success",
  "message": "Profile updated (token bypassed)"
}`,
    4: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *

{
  "status": "updated",
  "email": "hacker@evil.com"
}`,
    5: `HTTP/1.1 302 Found
Location: /dashboard
Set-Cookie: session=attacker_session

Login successful`,
  };

  const failResponses = {
    1: `HTTP/1.1 403 Forbidden
{"error": "Invalid request"}`,
    2: `HTTP/1.1 400 Bad Request`,
    3: `HTTP/1.1 403 Forbidden
{"error": "Invalid CSRF token"}`,
    4: `HTTP/1.1 403 Forbidden`,
    5: `HTTP/1.1 401 Unauthorized`,
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not solve the challenge.",
      request: requests[id] || `Payload: ${payload.substring(0, 120)}`,
      response: failResponses[id] || "Access denied",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("web", "csrf", id),
    request: requests[id] || `Payload: ${payload.substring(0, 120)}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitCSRF };