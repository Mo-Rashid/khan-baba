const { getFlag } = require("../../utils/flags");
const { validateSQLi } = require("../../utils/validators");

function submitSQLi(level, payload) {
  const id = Number(level);
  const isCorrect = validateSQLi(id, payload);

  const requests = {
    1: `POST /login HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded

username=${encodeURIComponent(payload.substring(0, 60))}&password=x`,
    2: `GET /products?id=${encodeURIComponent(payload.substring(0, 60))} HTTP/1.1
Host: training.VulnXploit.local`,
    3: `GET /user?id=${encodeURIComponent(payload.substring(0, 60))} HTTP/1.1
Host: training.VulnXploit.local`,
    4: `GET /search?q=${encodeURIComponent(payload.substring(0, 60))} HTTP/1.1
Host: training.VulnXploit.local
# Blind / time-based SQLi`,
    5: `GET /items?filter=${encodeURIComponent(payload.substring(0, 60))} HTTP/1.1
Host: training.VulnXploit.local
# Filtered SQLi bypass`,
  };

  const successResponses = {
    1: `HTTP/1.1 200 OK
Set-Cookie: session=admin_session

{
  "status": "success",
  "message": "Logged in as admin",
  "role": "administrator"
}`,
    2: `HTTP/1.1 200 OK

id | name     | price
1  | ProductA | 10
2  | ProductB | 20
...
users table columns leaked via UNION`,
    3: `HTTP/1.1 500 Internal Server Error

You have an error in your SQL syntax near '...'
at line 1

# Error-based extraction possible`,
    4: `HTTP/1.1 200 OK
(Response delayed ~5s)

Blind SQLi confirmed — boolean/time-based condition true.`,
    5: `HTTP/1.1 200 OK

Filter bypassed. UNION/SELECT executed.
Sensitive data returned.`,
  };

  const failResponses = {
    1: `HTTP/1.1 401 Unauthorized
{"error": "Invalid credentials"}`,
    2: `HTTP/1.1 200 OK
No results / Invalid id`,
    3: `HTTP/1.1 200 OK
User not found`,
    4: `HTTP/1.1 200 OK
(Normal response time)`,
    5: `HTTP/1.1 403 Forbidden
Blocked by WAF / filter`,
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not trigger SQL injection.",
      request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
      response: failResponses[id] || "No vulnerability triggered",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("web", "sqli", id),
    request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
    response: successResponses[id] || "SQL injection successful",
  };
}

module.exports = { submitSQLi };