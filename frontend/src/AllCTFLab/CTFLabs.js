export const ctfCategories = [
  { id: "web", label: "WEB-CTF-LABS" },
  { id: "ai", label: "AI-CTF-LABS" },
  { id: "mobile", label: "MOBILE-CTF-LABS" },
  { id: "cloud", label: "CLOUD-CTF-LABS" },
  { id: "redteam", label: "REDTEAM-CTF-LABS" },
];

export const allCTFLabs = [
  // WEB
  
  {
    id: "web-xss-lab",
    title: "XSS Playground",
    description: "Practice reflected, stored and DOM-based XSS in realistic apps.",
    category: "web",
    level: "Beginner",
    image: "/images/labs/web-xss.png",

    path: "/ctf-lab/web-xss-lab"
},
  {
    id: "web-sqli-lab",

    title: "SQL Injection Lab",

    description: "Classic and blind SQL injection challenges with real databases.",

    category: "web",

    level: "Intermediate",

    image: "/images/labs/web-sqli.png",

    path: "/ctf-lab/web-sqli-lab"
},
  {
    id: "web-ssrf-lab",

    title: "SSRF & Cloud Metadata",

    description: "Server-Side Request Forgery leading to cloud metadata abuse.",

    category: "web",

    level: "Advanced",

    image: "/images/labs/web-ssrf.png",

    path: "/ctf-lab/web-ssrf-lab"
},
  {
    id: "web-csrf-lab",

    title: "CSRF Attack Lab",

    description: "Learn Cross-Site Request Forgery attacks with vulnerable web applications.",

    category: "web",

    level: "Intermediate",

    image: "/images/labs/web-csrf.png",

    path: "/ctf-lab/web-csrf-lab"
},


{
    id: "web-xxe-lab",

    title: "XXE Injection Lab",

    description: "Exploit XML External Entity vulnerabilities and access sensitive data.",

    category: "web",

    level: "Advanced",

    image: "/images/labs/web-xxe.png",

    path: "/ctf-lab/web-xxe-lab"
},


{
    id: "web-idor-lab",

    title: "IDOR Access Control Lab",

    description: "Practice insecure direct object reference and authorization bypass techniques.",

    category: "web",

    level: "Intermediate",

    image: "/images/labs/web-idor.png",

    path: "/ctf-lab/web-idor-lab"
},


{
    id: "web-file-upload-lab",

    title: "File Upload Vulnerability",

    description: "Learn secure file upload testing and bypass insecure validation.",

    category: "web",

    level: "Advanced",

    image: "/images/labs/web-file-upload.png",

    path: "/ctf-lab/web-file-upload-lab"
},











 // AI SECURITY LABS

{
  id: "prompt-injection-lab",
  title: "Prompt Injection Lab",
  description:
  "Analyze an AI assistant, test prompt manipulation techniques, identify instruction weaknesses, and discover the hidden flag.",
  category: "ai",
  level: "Intermediate",
  image: "/images/labs/prompt-injection.png",
  path: "/ctf-lab/prompt-injection-lab",
},

{
  id: "llm-jailbreak-lab",
  title: "LLM Jailbreak Lab",
  description:
   "Interact with a controlled LLM environment, explore safety-boundary weaknesses, and discover the hidden flag.",
  category: "ai",
  level: "Advanced",
  image: "/images/labs/llm-jailbreak.png",
  path: "/ctf-lab/llm-jailbreak-lab",
},

{
  id: "rag-security-lab",
  title: "RAG Security Lab",
  description:
    "Analyze a RAG-based AI application, investigate document-retrieval weaknesses, and discover the hidden flag.",

  category: "ai",
  level: "Advanced",
  image: "/images/labs/rag-security.png",
  path: "/ctf-lab/rag-security-lab",
},

{
    id: "customer-support-ai-lab",
    title: "Customer Support AI Lab",
    description:
      "Analyze an AI customer-support application and identify weaknesses in its instruction handling.",
    category: "ai",
    level: "Intermediate",
    image: "/images/labs/customer-support-ai.png",
    path: "/ctf-lab/customer-support-ai-lab",
  },

  {
    id: "system-prompt-leak",
    title: "System Prompt Leak",
    description:
      "Analyze how hidden system instructions can be exposed through unsafe instruction handling.",
    category: "ai",
    level: "Intermediate",
    image: "/images/labs/system-prompt-leak.png",
    path: "/ctf-lab/system-prompt-leak",
  },

  {
    id: "indirect-injection",
    title: "Indirect Injection",
    description:
      "Investigate malicious instructions embedded inside external content processed by an AI application.",
    category: "ai",
    level: "Intermediate",
    image: "/images/labs/indirect-injection.png",
    path: "/ctf-lab/indirect-injection",
  },

  {
    id: "tool-abuse",
    title: "Tool Abuse",
    description:
      "Analyze an AI application's tool-calling workflow and identify authorization weaknesses.",
    category: "ai",
    level: "Advanced",
    image: "/images/labs/tool-abuse.png",
    path: "/ctf-lab/tool-abuse",
  },

  {
    id: "multi-turn-jailbreak",
    title: "Multi-Turn Jailbreak",
    description:
      "Analyze how multiple conversation turns can gradually influence an AI application's behavior.",
    category: "ai",
    level: "Advanced",
    image: "/images/labs/multi-turn-jailbreak.png",
    path: "/ctf-lab/multi-turn-jailbreak",
  },

  {
    id: "guardrail-bypass",
    title: "Guardrail Bypass",
    description:
      "Evaluate weaknesses in AI safety controls and understand how applications should enforce guardrails.",
    category: "ai",
    level: "Advanced",
    image: "/images/labs/guardrail-bypass.png",
    path: "/ctf-lab/guardrail-bypass",
  },

 


  // MOBILE
{
  id: "mobile-android-lab",
  title: "Android Application Security Lab",
  description:
    "Analyze an intentionally vulnerable Android application, inspect the APK, identify security weaknesses, and discover the hidden flag.",
  category: "mobile",
  level: "Intermediate",
  image: "/images/labs/mobile-android.png",
  path: "/ctf-lab/mobile-android-lab",
},

{
  id: "mobile-ios-lab",
  title: "iOS Application Security Lab",
  description:
    "Analyze an intentionally vulnerable iOS application and discover the hidden flag.",
  category: "mobile",
  level: "Advanced",
  image: "/images/labs/mobile-ios.png",
  path: "/ctf-lab/mobile-ios-lab",
},

{
  id: "mobile-apk-analysis",
  title: "APK Analysis Lab",
  description:
    "Download an intentionally vulnerable APK, perform static analysis, and discover the hidden flag.",
  category: "mobile",
  level: "Intermediate",
  image: "/images/labs/mobile-apk.png",
  path: "/ctf-lab/mobile-apk-analysis",
},
{
  id: "mobile-hardcode-flag",
  title: "Hardcode Flag Lab",
  description:
    "Analyze an intentionally vulnerable Android application and discover the hardcoded flag.",
  category: "mobile",
  level: "Beginner",
  image: "/images/labs/mobile-hardcode.png",
  path: "/ctf-lab/mobile-hardcode-flag",
},

{
  id: "mobile-vuln-apktool",
  title: "Vuln Apktool Lab",
  description:
    "Decompile an intentionally vulnerable APK using Apktool, analyze the application files, and discover the hidden flag.",
  category: "mobile",
  level: "Intermediate",
  image: "/images/labs/mobile-apktool.png",
  path: "/ctf-lab/mobile-vuln-apktool",
},

{
  id: "mobile-vulnx",
  title: "VulnX Mobile Lab",
  description:
    "Analyze an intentionally vulnerable Android application and identify the security weakness to discover the hidden flag.",
  category: "mobile",
  level: "Intermediate",
  image: "/images/labs/mobile-vulnx.png",
  path: "/ctf-lab/mobile-vulnx",
},

{
  id: "mobile-vulnx2",
  title: "VulnX2 Mobile Lab",
  description:
    "Complete an advanced Android security challenge by analyzing the vulnerable application and discovering the hidden flag.",
  category: "mobile",
  level: "Advanced",
  image: "/images/labs/mobile-vulnx2.png",
  path: "/ctf-lab/mobile-vulnx2",
},
  // CLOUD
  // CLOUD

{
  id: "cloud-aws-lab",
  title: "AWS Cloud Security Lab",
  description:
    "Learn AWS security fundamentals through simulated cloud environments, IAM configuration, S3 security, and secure cloud practices.",
  category: "cloud",
  level: "Easy",
  image: "/images/labs/cloud-aws.png",
  path: "/cloud/aws",
},

{
  id: "cloud-azure-lab",
  title: "Azure Attack Path Lab",
  description:
    "Practice service principal abuse, RBAC misconfigurations, and simulated Azure AD privilege escalation.",
  category: "cloud",
  level: "Advanced",
  image: "/images/labs/cloud-azure.png",
  path: "/cloud/azure",
},

{
  id: "cloud-gcp-lab",
  title: "Google Cloud Security Lab",
  description:
    "Practice IAM misconfigurations, service-account abuse, storage exposure, and cloud privilege escalation.",
  category: "cloud",
  level: "Advanced",
  image: "/images/labs/cloud-gcp.png",
  path: "/cloud/google",
},

  // =========================
  // RED TEAM - SYSTEM HACKING
  // =========================

{
    id: "redteam-system-hacking",
    title: "System Hacking Lab",
    description:
      "Explore a controlled system environment and discover the hidden flag.",
    category: "redteam",
    level: "Intermediate",
    image: "/images/labs/system-hacking.png",
    path: "/ctf-lab/redteam-system-hacking",
  },

  {
    id: "redteam-reverse-engineering",
    title: "Reverse Engineering Lab",
    description:
      "Analyze a controlled application and discover the hidden flag.",
    category: "redteam",
    level: "Advanced",
    image: "/images/labs/reverse-engineering.png",
    path: "/ctf-lab/redteam-reverse-engineering",
  },

  {
    id: "redteam-network-pentesting",
    title: "Network Pentesting Lab",
    description:
      "Assess a controlled network environment and identify security weaknesses.",
    category: "redteam",
    level: "Advanced",
    image: "/images/labs/network-pentesting.png",
    path: "/ctf-lab/redteam-network-pentesting",
  },

  {
    id: "redteam-web",
    title: "Web Red Team Lab",
    description:
      "Analyze a controlled web application and discover the hidden flag.",
    category: "redteam",
    level: "Advanced",
    image: "/images/labs/web-redteam.png",
    path: "/ctf-lab/redteam-web",
  },

  {
    id: "redteam-social-engineering",
    title: "Social Engineering Lab",
    description:
      "Analyze a controlled social-engineering scenario and discover the hidden flag.",
    category: "redteam",
    level: "Intermediate",
    image: "/images/labs/social-engineering.png",
    path: "/ctf-lab/redteam-social-engineering",
  },


];






