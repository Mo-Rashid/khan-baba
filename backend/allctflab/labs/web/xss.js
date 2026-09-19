const { getFlag } = require("../../utils/flags");
const { validateXSS } = require("../../utils/validators");

function submitXSS(level, payload) {
  const id = Number(level);
  const isCorrect = validateXSS(id, payload);

  const requests = {
    1: `GET /search?q=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local
Cookie: session=user_session`,
    2: `GET /#${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local`,
    3: `POST /comment HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded

comment=${encodeURIComponent(payload.substring(0, 80))}`,
    4: `POST /feedback HTTP/1.1
Host: training.VulnXploit.local
Content-Type: application/x-www-form-urlencoded

message=${encodeURIComponent(payload.substring(0, 80))}
# Blind XSS - payload stored, executed in admin panel`,
    5: `GET /search?q=${encodeURIComponent(payload.substring(0, 80))} HTTP/1.1
Host: training.VulnXploit.local
# Filter bypass challenge`,
  };

  const successResponses = {
    1: `HTTP/1.1 200 OK
Content-Type: text/html

<html>
<body>
  <div>Search result: ${payload.substring(0, 60)}...</div>
  <!-- XSS executed in browser -->
</body>
</html>`,
    2: `DOM updated from location.hash
Message: ${payload.substring(0, 60)}...
<script executed via innerHTML>`,
    3: `HTTP/1.1 200 OK
Comment stored and rendered:

<div class="comment">${payload.substring(0, 60)}...</div>
<!-- Stored XSS triggered for all visitors -->`,
    4: `HTTP/1.1 200 OK
{"status":"received"}

# Later in admin panel:
Admin viewed feedback → XSS fired
Session cookie stolen / action performed`,
    5: `HTTP/1.1 200 OK
Filter partially applied but payload still executed:

<svg/onload=...> or <img src=x onerror=...>
XSS successful despite filters.`,
  };

  const failResponses = {
    1: `HTTP/1.1 200 OK
Search result: (safe reflected text)
No script execution.`,
    2: `Hash content rendered safely / not executed.`,
    3: `HTTP/1.1 200 OK
Comment stored with encoding. No XSS.`,
    4: `HTTP/1.1 200 OK
{"status":"received"}
No admin interaction simulated.`,
    5: `HTTP/1.1 200 OK
Payload blocked by filter.`,
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not trigger XSS.",
      request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
      response: failResponses[id] || "No vulnerability triggered",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("web", "xss", id),
    request: requests[id] || `Payload: ${payload.substring(0, 100)}`,
    response: successResponses[id] || "XSS successfully executed",
  };
}

module.exports = { submitXSS };