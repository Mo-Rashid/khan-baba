// ============================================================
// validators.js
// KhanSploit CTF Lab Validators
// ============================================================

// ------------------------------------------------------------
// Common helper
// ------------------------------------------------------------

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}


// ============================================================
// WEB
// ============================================================

function validateXSS(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("<script") ||
        p.includes("javascript:") ||
        p.includes("onerror")
      );

    case 2:
      return (
        p.includes("onerror") ||
        p.includes("onload") ||
        p.includes("<img")
      );

    case 3:
      return (
        p.includes("svg") ||
        p.includes("iframe") ||
        p.includes("javascript:")
      );

    case 4:
      return (
        p.includes("document.cookie") ||
        p.includes("localstorage") ||
        p.includes("sessionstorage")
      );

    case 5:
      return (
        p.includes("script") ||
        p.includes("event handler") ||
        p.includes("dom")
      );

    default:
      return false;
  }
}


function validateSQLi(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("' or '1'='1") ||
        p.includes("' or 1=1") ||
        p.includes("or 1=1")
      );

    case 2:
      return (
        p.includes("union select") ||
        p.includes("union all select")
      );

    case 3:
      return (
        p.includes("order by") ||
        p.includes("group by") ||
        p.includes("having")
      );

    case 4:
      return (
        p.includes("information_schema") ||
        p.includes("database()") ||
        p.includes("version()")
      );

    case 5:
      return (
        p.includes("sleep(") ||
        p.includes("benchmark(") ||
        p.includes("waitfor delay")
      );

    default:
      return false;
  }
}


function validateXXE(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("<!doctype") ||
        p.includes("<!entity")
      );

    case 2:
      return (
        p.includes("system") ||
        p.includes("file://")
      );

    case 3:
      return (
        p.includes("entity") ||
        p.includes("external")
      );

    case 4:
      return (
        p.includes("/etc/passwd") ||
        p.includes("file://")
      );

    case 5:
      return (
        p.includes("xxe") ||
        p.includes("external entity")
      );

    default:
      return false;
  }
}


function validateSSRF(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("localhost") ||
        p.includes("127.0.0.1")
      );

    case 2:
      return (
        p.includes("169.254.169.254") ||
        p.includes("metadata")
      );

    case 3:
      return (
        p.includes("internal") ||
        p.includes("10.") ||
        p.includes("192.168.")
      );

    case 4:
      return (
        p.includes("172.16.") ||
        p.includes("172.17.") ||
        p.includes("172.18.")
      );

    case 5:
      return (
        p.includes("cloud metadata") ||
        p.includes("169.254.169.254")
      );

    default:
      return false;
  }
}


function validateIDOR(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("id=") ||
        p.includes("user_id")
      );

    case 2:
      return (
        p.includes("change id") ||
        p.includes("another user")
      );

    case 3:
      return (
        p.includes("unauthorized") ||
        p.includes("access another")
      );

    case 4:
      return (
        p.includes("horizontal") ||
        p.includes("vertical")
      );

    case 5:
      return (
        p.includes("idor") ||
        p.includes("access control")
      );

    default:
      return false;
  }
}


function validateCSRF(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("csrf") ||
        p.includes("cross-site request")
      );

    case 2:
      return (
        p.includes("forged request") ||
        p.includes("csrf token")
      );

    case 3:
      return (
        p.includes("same-origin") ||
        p.includes("samesite")
      );

    case 4:
      return (
        p.includes("referer") ||
        p.includes("origin")
      );

    case 5:
      return (
        p.includes("csrf") ||
        p.includes("anti-csrf")
      );

    default:
      return false;
  }
}


function validateFileUpload(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes(".php") ||
        p.includes(".jsp") ||
        p.includes(".asp")
      );

    case 2:
      return (
        p.includes("double extension") ||
        p.includes(".php.jpg") ||
        p.includes(".jpg.php")
      );

    case 3:
      return (
        p.includes("mime") ||
        p.includes("content-type")
      );

    case 4:
      return (
        p.includes("magic bytes") ||
        p.includes("extension")
      );

    case 5:
      return (
        p.includes("upload bypass") ||
        p.includes("web shell")
      );

    default:
      return false;
  }
}


// ============================================================
// CLOUD
// ============================================================

function validateAWS(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return p.includes("s3") || p.includes("bucket");

    case 2:
      return (
        p.includes("iam") ||
        p.includes("access key")
      );

    case 3:
      return (
        p.includes("metadata") ||
        p.includes("169.254.169.254")
      );

    case 4:
      return (
        p.includes("ports") ||
        p.includes("169.254.169.254")
      );

    case 5:
      return (
        p.includes("access key") ||
        p.includes("secret key")
      );

    default:
      return false;
  }
}


function validateAzure(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return p.includes("blob") || p.includes("storage");

    case 2:
      return p.includes("sas token") || p.includes("sas");

    case 3:
      return p.includes("managed identity");

    case 4:
      return p.includes("azure ad") || p.includes("entra");

    case 5:
      return p.includes("privilege escalation");

    default:
      return false;
  }
}


function validateGCP(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return p.includes("gcs") || p.includes("bucket");

    case 2:
      return p.includes("service account");

    case 3:
      return p.includes("iam");

    case 4:
      return p.includes("metadata");

    case 5:
      return p.includes("privilege escalation");

    default:
      return false;
  }
}


// ============================================================
// MOBILE
// ============================================================

function validateAndroid(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("exported") ||
        p.includes("activity")
      );

    case 2:
      return (
        p.includes("debuggable") ||
        p.includes("allowbackup")
      );

    case 3:
      return (
        p.includes("cleartext") ||
        p.includes("network security")
      );

    case 4:
      return (
        p.includes("ssl pinning") ||
        p.includes("certificate")
      );

    case 5:
      return (
        p.includes("root") ||
        p.includes("magisk") ||
        p.includes("bypass")
      );

    default:
      return false;
  }
}


function validateiOS(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return p.includes("plist") || p.includes("info.plist");

    case 2:
      return p.includes("keychain");

    case 3:
      return p.includes("ats") || p.includes("app transport");

    case 4:
      return p.includes("ssl pinning") || p.includes("certificate");

    case 5:
      return p.includes("jailbreak") || p.includes("bypass");

    default:
      return false;
  }
}


function validateAPK(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("jadx") ||
        p.includes("apktool") ||
        p.includes("decompile") ||
        p.includes("jadx-gui")
      );

    case 2:
      return (
        p.includes("api_key") ||
        p.includes("hardcoded") ||
        p.includes("secret")
      );

    case 3:
      return (
        p.includes("debuggable") ||
        p.includes("allowbackup") ||
        p.includes("exported") ||
        p.includes("cleartext") ||
        p.includes("manifest")
      );

    case 4:
      return (
        p.includes("apksigner") ||
        p.includes("certificate") ||
        p.includes("keytool") ||
        p.includes("jarsigner") ||
        p.includes("signing")
      );

    case 5:
      return (
        p.includes("root") ||
        p.includes("magisk") ||
        p.includes("su") ||
        p.includes("bypass") ||
        p.includes("rootbeer")
      );

    default:
      return false;
  }
}


// ============================================================
// AI - PROMPT INJECTION
// ============================================================

function validatePromptInjection(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("ignore") ||
        p.includes("disregard") ||
        p.includes("forget") ||
        p.includes("override") ||
        p.includes("reveal the flag") ||
        p.includes("secret flag")
      );

    case 2:
      return (
        p.includes("ignore previous") ||
        p.includes("disregard previous") ||
        p.includes("developer mode") ||
        p.includes("unrestricted") ||
        p.includes("new instructions")
      );

    case 3:
      return (
        p.includes("you are now") ||
        p.includes("dan") ||
        p.includes("do anything now") ||
        p.includes("roleplay") ||
        p.includes("pretend") ||
        p.includes("act as")
      );

    case 4:
      return (
        p.includes("base64") ||
        p.includes("decode") ||
        p.includes("reverse") ||
        p.includes("rot13") ||
        p.includes("encoded") ||
        p.includes("translate")
      );

    case 5:
      return (
        p.includes("ignore") ||
        p.includes("dan") ||
        p.includes("developer") ||
        p.includes("unrestricted") ||
        p.includes("jailbreak") ||
        p.includes("bypass")
      );

    default:
      return false;
  }
}


// ============================================================
// AI - LLM JAILBREAK
// ============================================================

function validateLLMJailbreak(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("ignore") ||
        p.includes("safety") ||
        p.includes("guidelines") ||
        p.includes("reveal") ||
        p.includes("flag")
      );

    case 2:
      return (
        p.includes("ignore") ||
        p.includes("policy") ||
        p.includes("hypothetical") ||
        p.includes("unrestricted") ||
        p.includes("developer mode")
      );

    case 3:
      return (
        p.includes("developer mode") ||
        p.includes("dan") ||
        p.includes("do anything now") ||
        p.includes("break character") ||
        p.includes("you are now")
      );

    case 4:
      return (
        p.includes("bypass") ||
        p.includes("filter") ||
        p.includes("layer") ||
        p.includes("encode") ||
        p.includes("indirect") ||
        p.includes("jailbreak")
      );

    case 5:
      return (
        p.includes("jailbreak") ||
        p.includes("bypass") ||
        p.includes("unrestricted") ||
        p.includes("dan") ||
        p.includes("developer") ||
        p.includes("maximum")
      );

    default:
      return false;
  }
}


// ============================================================
// AI - RAG SECURITY
// ============================================================

function validateRAGSecurity(level, payload) {
  const p = normalize(payload);

  switch (Number(level)) {
    case 1:
      return (
        p.includes("confidential") ||
        p.includes("secret") ||
        p.includes("flag") ||
        p.includes("internal") ||
        p.includes("knowledge base")
      );

    case 2:
      return (
        p.includes("summarize") ||
        p.includes("internal") ||
        p.includes("security") ||
        p.includes("document") ||
        p.includes("secret")
      );

    case 3:
      return (
        p.includes("follow") ||
        p.includes("instruction") ||
        p.includes("policy") ||
        p.includes("special") ||
        p.includes("document")
      );

    case 4:
      return (
        p.includes("repeat") ||
        p.includes("context") ||
        p.includes("previous") ||
        p.includes("document") ||
        p.includes("dump")
      );

    case 5:
      return (
        p.includes("reconstruct") ||
        p.includes("all documents") ||
        p.includes("correlate") ||
        p.includes("secret") ||
        p.includes("flag") ||
        p.includes("complete")
      );

    default:
      return false;
  }
}


// ============================================================
// AI - CUSTOMER SUPPORT
// IMPORTANT: This must be OUTSIDE validateLab()
// ============================================================
function validateCustomerSupport(level, payload, modelResponse = "") {
  const p = normalize(payload);
  const r = normalize(modelResponse);

  // Agar response me flag aa gaya hai to seedha success
  if (r.includes("khansploit{") || r.includes("secret_flag:")) {
    return true;
  }

  switch (Number(level)) {
    case 1:
      return (
        (p.includes("ignore") ||
          p.includes("reveal") ||
          p.includes("flag") ||
          p.includes("secret")) &&
        (r.includes("flag") || r.includes("khansploit") || r.includes("secret"))
      );

    case 2:
      return (
        (p.includes("ignore previous") ||
          p.includes("disregard") ||
          p.includes("new instructions") ||
          p.includes("override")) &&
        (r.includes("flag") || r.includes("khansploit") || r.length > 60)
      );

    case 3:
      return (
        (p.includes("you are now") ||
          p.includes("act as") ||
          p.includes("admin") ||
          p.includes("role")) &&
        (r.includes("admin") || r.includes("flag") || r.includes("access") || r.includes("khansploit"))
      );

    case 4:
      return (
        (p.includes("internal") ||
          p.includes("document") ||
          p.includes("data") ||
          p.includes("confidential") ||
          p.includes("secret")) &&
        (r.includes("flag") || r.includes("internal") || r.includes("khansploit"))
      );

    case 5:
      return (
        (p.includes("jailbreak") ||
          p.includes("unrestricted") ||
          p.includes("dan") ||
          p.includes("developer") ||
          p.includes("bypass")) &&
        (r.includes("flag") || r.includes("khansploit") || r.length > 80)
      );

    default:
      return false;
  }
}
// ============================================================
// MAIN VALIDATOR
// ============================================================

function validateLab(category, lab, level, payload) {
  const map = {
    web: {
      xss: validateXSS,
      sqli: validateSQLi,
      xxe: validateXXE,
      ssrf: validateSSRF,
      idor: validateIDOR,
      csrf: validateCSRF,
      fileupload: validateFileUpload,
    },

    cloud: {
      aws: validateAWS,
      azure: validateAzure,
      gcp: validateGCP,
    },

    mobile: {
      android: validateAndroid,
      ios: validateiOS,
      apk: validateAPK,
    },

    ai: {
      "prompt-injection": validatePromptInjection,
      "llm-jailbreak": validateLLMJailbreak,
      "rag-security": validateRAGSecurity,
      "customer-support": validateCustomerSupport,
    },
  };

  const fn = map[category]?.[lab];

  if (!fn) {
    return false;
  }

  return fn(level, payload);
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  normalize,

  // Main validator
  validateLab,

  // Web
  validateXSS,
  validateSQLi,
  validateXXE,
  validateSSRF,
  validateIDOR,
  validateCSRF,
  validateFileUpload,

  // Cloud
  validateAWS,
  validateAzure,
  validateGCP,

  // Mobile
  validateAndroid,
  validateiOS,
  validateAPK,

  // AI
  validatePromptInjection,
  validateLLMJailbreak,
  validateRAGSecurity,
  validateCustomerSupport,
};