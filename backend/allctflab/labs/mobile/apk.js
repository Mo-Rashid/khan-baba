const { getFlag } = require("../../utils/flags");
const { validateAPK } = require("../../utils/validators");

function submitAPK(level, payload) {
  const id = Number(level);
  const isCorrect = validateAPK(id, payload);

  const requests = {
    1: `jadx -d output VulnXploit.apk
# or
apktool d VulnXploit.apk -o output`,
    2: `grep -r "AIza\\|sk_live\\|api_key\\|secret\\|password" output/`,
    3: `cat output/AndroidManifest.xml | grep -E "debuggable|allowBackup|exported|cleartext"`,
    4: `apksigner verify --print-certs VulnXploit.apk
keytool -printcert -jarfile VulnXploit.apk`,
    5: `# Searching for root detection
grep -r "su\\|magisk\\|RootBeer\\|SafetyNet" output/`,
  };

  const successResponses = {
    1: `INFO  - Loading ...
INFO  - Processing ...
INFO  - Decompiling...

Output saved to: ./output
Sources and resources successfully extracted.`,
    2: `Found matches:

resources/res/values/strings.xml
  API_KEY = "AIzaSyD-HardcodedKeyFromAPK"

sources/com/VulnXploit/app/Config.java
  public static final String SECRET = "sk_live_51ABCXYZ...";

Hardcoded secrets extracted.`,
    3: `<application
  android:debuggable="true"
  android:allowBackup="true"
  android:usesCleartextTraffic="true">

  <activity
    android:name=".AdminActivity"
    android:exported="true" />

Insecure configurations found.`,
    4: `Signer #1 certificate DN: CN=Android Debug, O=Android, C=US
Signature algorithm: SHA1withRSA (weak)
Certificate not for production use (debug certificate).

APK is signed with a debug certificate.`,
    5: `Root detection found:
- File exists: /system/xbin/su
- Package: com.topjohnwu.magisk
- RootBeer library detected
- SafetyNet / Play Integrity check

Bypass successful using Frida / MagiskHide / smali patch.`,
  };

  const failResponses = {
    1: "Tool not recognized or decompilation failed",
    2: "No matching secrets found",
    3: "No critical flags matched",
    4: "Could not extract certificate information",
    5: "No root detection logic matched",
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not solve the challenge.",
      request: requests[id] || `Payload: ${payload}`,
      response: failResponses[id] || "Access denied",
    };
  }

  const flag = getFlag("mobile", "apk", id);

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag,
    request: requests[id] || `Payload: ${payload}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitAPK };