const { getFlag } = require("../../utils/flags");
const { validateiOS } = require("../../utils/validators");

function submitiOS(level, payload) {
  const id = Number(level);
  const isCorrect = validateiOS(id, payload);

  const requests = {
    1: `# On jailbroken device
find /var/mobile/Containers/Data/Application/ -name "*.plist"
defaults read <bundleid>
security dump-keychain`,
    2: `# Common checks
ls /Applications/Cydia.app
frida -U -f com.VulnXploit.app -l bypass.js`,
    3: `xcrun simctl openurl booted "VulnXploit://reset?user=admin&token=evil"`,
    4: `strings Payload/VulnXploit.app/VulnXploit | grep -i "api\\|key\\|secret\\|password"
class-dump -H ...`,
    5: `# Anti-debug / SSL Pinning checks
frida -U -f com.VulnXploit.app -l ssl-bypass.js`,
  };

  const successResponses = {
    1: `UserDefaults / Preferences content:

password = SuperSecret123
api_key  = sk_live_abc123xyz
token    = eyJhbGciOiJIUzI1NiIs...

Sensitive data extracted.`,
    2: `Jailbreak detection found:
- Cydia.app exists
- fork() check
- Sandbox violation

Bypass successful with Frida / tweak / binary patch.
App now runs on jailbroken device.`,
    3: `URL Scheme handled:
Scheme: VulnXploit
Action: reset
Params: user=admin&token=evil

Privileged action executed without authentication.`,
    4: `Found in binary / Info.plist:

API_KEY = "AIzaSyD-HardcodediOSKey"
SECRET  = "sk_live_51iOSXYZ..."
JWT_SECRET = "ios_super_secret_key"

Hardcoded secrets extracted.`,
    5: `Protections found:
- ptrace(PT_DENY_ATTACH)
- Custom SSL Pinning (TrustKit / NSURLSession)
- Integrity / checksum checks

Bypass successful with Frida / Objection / binary patch.
Traffic can now be intercepted.`,
  };

  const failResponses = {
    1: "Permission denied or data not found",
    2: "Detection still active",
    3: "No handler found for the URL",
    4: "No secrets matched",
    5: "Protections still active",
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not solve the challenge.",
      request: requests[id] || `Payload: ${payload}`,
      response: failResponses[id] || "Access denied",
    };
  }

  const flag = getFlag("mobile", "ios", id);

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag,
    request: requests[id] || `Payload: ${payload}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitiOS };