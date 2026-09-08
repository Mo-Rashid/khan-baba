// Saare flags sirf backend pe rahenge (frontend me kabhi nahi)
const FLAGS = {
  // ========== WEB ==========
  web: {
    xss: {
      1: "TVX{REFLECTED_XSS_01}",
      2: "TVX{DOM_HASH_XSS_02}",
      3: "TVX{STORED_XSS_03}",
      4: "TVX{BLIND_XSS_04}",
      5: "TVX{FILTER_BYPASS_05}",
    },
    sqli: {
      1: "TVX{SQLI_AUTH_BYPASS_01}",
      2: "TVX{SQLI_UNION_02}",
      3: "TVX{SQLI_ERROR_03}",
      4: "TVX{SQLI_BLIND_04}",
      5: "TVX{SQLI_FILTER_05}",
    },
    xxe: {
      1: "TVX{XXE_BASIC_01}",
      2: "TVX{XXE_FILE_02}",
      3: "TVX{XXE_SSRF_03}",
      4: "TVX{XXE_BLIND_04}",
      5: "TVX{XXE_FILTER_05}",
    },
    ssrf: {
      1: "TVX{SSRF_BASIC_01}",
      2: "TVX{SSRF_INTERNAL_02}",
      3: "TVX{SSRF_CLOUD_03}",
      4: "TVX{SSRF_PROTOCOL_04}",
      5: "TVX{SSRF_FILTER_05}",
    },
    idor: {
      1: "TVX{IDOR_BASIC_01}",
      2: "TVX{IDOR_HORIZONTAL_02}",
      3: "TVX{IDOR_VERTICAL_03}",
      4: "TVX{IDOR_API_04}",
      5: "TVX{IDOR_BLIND_05}",
    },
    csrf: {
      1: "TVX{CSRF_BASIC_01}",
      2: "TVX{CSRF_GET_02}",
      3: "TVX{CSRF_TOKEN_BYPASS_03}",
      4: "TVX{CSRF_JSON_04}",
      5: "TVX{CSRF_LOGIN_05}",
    },
    fileupload: {
      1: "TVX{FILE_UPLOAD_BASIC_01}",
      2: "TVX{FILE_UPLOAD_BLACKLIST_02}",
      3: "TVX{FILE_UPLOAD_MIME_03}",
      4: "TVX{FILE_UPLOAD_NULL_04}",
      5: "TVX{FILE_UPLOAD_ADVANCED_05}",
    },
  },

  // ========== CLOUD ==========
  cloud: {
    aws: {
      1: "TVX{AWS_S3_PUBLIC_01}",
      2: "TVX{AWS_IAM_PRIVESC_02}",
      3: "TVX{AWS_METADATA_SSRF_03}",
      4: "TVX{AWS_SG_OPEN_04}",
      5: "TVX{AWS_LAMBDA_SECRETS_05}",
    },
    azure: {
      1: "TVX{AZURE_BLOB_PUBLIC_01}",
      2: "TVX{AZURE_AAD_PRIVESC_02}",
      3: "TVX{AZURE_IMDS_03}",
      4: "TVX{AZURE_NSG_OPEN_04}",
      5: "TVX{AZURE_KEYVAULT_05}",
    },
    gcp: {
      1: "TVX{GCP_GCS_PUBLIC_01}",
      2: "TVX{GCP_IAM_PRIVESC_02}",
      3: "TVX{GCP_METADATA_03}",
      4: "TVX{GCP_FIREWALL_OPEN_04}",
      5: "TVX{GCP_SECRETMANAGER_05}",
    },
  },

  // ========== MOBILE ==========
  mobile: {
    android: {
      1: "TVX{ANDROID_STORAGE_01}",
      2: "TVX{ANDROID_EXPORTED_02}",
      3: "TVX{ANDROID_NETWORK_03}",
      4: "TVX{ANDROID_HARDCODED_04}",
      5: "TVX{ANDROID_DEEPLINK_05}",
    },
    ios: {
      1: "TVX{IOS_STORAGE_01}",
      2: "TVX{IOS_JAILBREAK_02}",
      3: "TVX{IOS_DEEPLINK_03}",
      4: "TVX{IOS_HARDCODED_04}",
      5: "TVX{IOS_BINARY_05}",
    },
    apk: {
      1: "TVX{APK_DECOMPILE_01}",
      2: "TVX{APK_SECRETS_02}",
      3: "TVX{APK_MANIFEST_03}",
      4: "TVX{APK_SIGNING_04}",
      5: "TVX{APK_ROOTBYPASS_05}",
    },
  },

  // ========== AI ==========
  ai: {
    "prompt-injection": {
      1: "TVX{PROMPT_INJECTION_BASIC_01}",
      2: "TVX{PROMPT_INJECTION_IGNORE_02}",
      3: "TVX{PROMPT_INJECTION_ROLEPLAY_03}",
      4: "TVX{PROMPT_INJECTION_ENCODING_04}",
      5: "TVX{PROMPT_INJECTION_ADVANCED_05}",
    },
    "llm-jailbreak": {
      1: "TVX{LLM_JAILBREAK_BASIC_01}",
      2: "TVX{LLM_JAILBREAK_POLICY_02}",
      3: "TVX{LLM_JAILBREAK_CHARACTER_03}",
      4: "TVX{LLM_JAILBREAK_MULTILAYER_04}",
      5: "TVX{LLM_JAILBREAK_MAXSEC_05}",
    },
    "rag-security": {
      1: "TVX{RAG_LEAKAGE_01}",
      2: "TVX{RAG_INDIRECT_INJECTION_02}",
      3: "TVX{RAG_POISONING_03}",
      4: "TVX{RAG_CONTEXT_EXTRACT_04}",
      5: "TVX{RAG_MULTIDOC_05}",
    },
    "customer-support": {
    1: "TVX{CS_BASIC_INJECTION_01}",
    2: "TVX{CS_IGNORE_INSTRUCTIONS_02}",
    3: "TVX{CS_ROLEPLAY_ADMIN_03}",
    4: "TVX{CS_DATA_EXTRACTION_04}",
    5: "TVX{CS_ADVANCED_JAILBREAK_05}",
  },

  "system-prompt-leak": {
  1: "TVX{SYSTEM_PROMPT_LEAK_01}",
  2: "TVX{SYSTEM_PROMPT_LEAK_02}",
  3: "TVX{SYSTEM_PROMPT_LEAK_03}",
  4: "TVX{SYSTEM_PROMPT_LEAK_04}",
  5: "TVX{SYSTEM_PROMPT_LEAK_05}",
},
  "indirect-injection": {
  1: "TVX{INDIRECT_INJECTION_01}",
  2: "TVX{INDIRECT_INJECTION_02}",
  3: "TVX{INDIRECT_INJECTION_03}",
  4: "TVX{INDIRECT_INJECTION_04}",
  5: "TVX{INDIRECT_INJECTION_05}",
},
"tool-abuse": {
  1: "TVX{TOOL_ABUSE_01}",
  2: "TVX{TOOL_ABUSE_02}",
  3: "TVX{TOOL_ABUSE_03}",
  4: "TVX{TOOL_ABUSE_04}",
  5: "TVX{TOOL_ABUSE_05}",
},
"multi-turn-jailbreak": {
  1: "TVX{MULTI_TURN_01}",
  2: "TVX{MULTI_TURN_02}",
  3: "TVX{MULTI_TURN_03}",
  4: "TVX{MULTI_TURN_04}",
  5: "TVX{MULTI_TURN_05}",
},
"guardrail-bypass": {
  1: "TVX{GUARDRAIL_BYPASS_01}",
  2: "TVX{GUARDRAIL_BYPASS_02}",
  3: "TVX{GUARDRAIL_BYPASS_03}",
  4: "TVX{GUARDRAIL_BYPASS_04}",
  5: "TVX{GUARDRAIL_BYPASS_05}",
},






  },

// ===== REDTEAM =======//

redteam: {
  "web-redteam": {
    1: "TVX{WEB_RECON_01}",
    2: "TVX{WEB_AUTH_BYPASS_02}",
    3: "TVX{WEB_IDOR_03}",
    4: "TVX{WEB_FILE_UPLOAD_04}",
    5: "TVX{WEB_RCE_SIM_05}",
  },
  "network-pentesting": {
    1: "TVX{NET_SCAN_01}",
    2: "TVX{NET_SERVICE_02}",
    3: "TVX{NET_SMB_03}",
    4: "TVX{NET_LATERAL_04}",
    5: "TVX{NET_PIVOT_05}",
  },
  "system-hacking": {
    1: "TVX{SYS_ENUM_01}",
    2: "TVX{SYS_WEAK_PASS_02}",
    3: "TVX{SYS_SUDO_03}",
    4: "TVX{SYS_CRON_04}",
    5: "TVX{SYS_ROOT_05}",
  },
  "social-engineering": {
    1: "TVX{SE_PHISH_01}",
    2: "TVX{SE_PRETEXT_02}",
    3: "TVX{SE_VISHING_03}",
    4: "TVX{SE_USB_04}",
    5: "TVX{SE_FULL_05}",
  },
  "reverse-engineering": {
    1: "TVX{RE_STRINGS_01}",
    2: "TVX{RE_STATIC_02}",
    3: "TVX{RE_LOGIC_03}",
    4: "TVX{RE_PACKER_04}",
    5: "TVX{RE_FULL_05}",
  },
}




};

function getFlag(category, lab, level) {
  try {
    return FLAGS[category][lab][level] || null;
  } catch {
    return null;
  }
}

module.exports = { FLAGS, getFlag }