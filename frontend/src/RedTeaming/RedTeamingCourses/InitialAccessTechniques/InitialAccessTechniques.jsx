import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./InitialAccessTechniques.css";

const STORAGE_KEY = "VulnXploit_initial_access_techniques_course_completed";

const chapters = [
// ====================== 01 What is Initial Access? ======================
  {
id: "what-is-initial-access",
title: "01 What is Initial Access?",
content: (
<>
<h2>What is Initial Access?</h2>
<p>
          Initial Access is the critical phase where a Red Team first gains a
          foothold inside the target environment. Without successful initial
          access, the rest of the attack lifecycle cannot begin. This phase
          tests the organization’s external defenses, user awareness, and
          ability to detect early-stage intrusion attempts.
</p>
<p>
          In real-world breaches and professional Red Team engagements, the
          majority of successful intrusions still start with either phishing
          or the abuse of valid accounts. Understanding every major entry
          vector is essential for both attackers and defenders.
</p>


<h3>Why Initial Access Matters</h3>
<ul>
<li>It is the gateway to the entire kill chain</li>
<li>Tests email security, endpoint protection, and user awareness</li>
<li>Reveals how well the organization handles external threats</li>
<li>Often determines the overall success of the engagement</li>
<li>Provides the first opportunity for detection by the Blue Team</li>
</ul>


<h3>Main Categories of Initial Access</h3>
<ul>
<li>Phishing and social engineering</li>
<li>Valid accounts (stolen, sprayed, or purchased)</li>
<li>Exploitation of public-facing applications</li>
<li>External remote services (VPN, RDP, SSH)</li>
<li>Supply-chain and trusted relationship abuse</li>
<li>Physical access vectors (when in scope)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Initial Access = Getting the first foothold. Phishing and valid
            accounts remain the most reliable methods in real-world attacks
            and Red Team operations.
</p>
</div>
</>
    ),
quiz: {
question: "What is the main purpose of the Initial Access phase in a Red Team engagement?",
options: [
"Only to test internal network security",
"The critical phase where a Red Team first gains a foothold inside the target environment",
"Only for web application testing",
"Only for social engineering exercises"
      ],
correct: "The critical phase where a Red Team first gains a foothold inside the target environment",
    },
  },


// ====================== 02 Phishing Techniques ======================
  {
id: "phishing",
title: "02 Phishing Techniques",
content: (
<>
<h2>Phishing Techniques</h2>
<p>
          Phishing continues to be the number one initial access method used
          by real adversaries and professional Red Teams. Modern phishing is
          highly targeted, technically sophisticated, and designed to bypass
          both human intuition and technical controls.
</p>


<h3>Types of Phishing</h3>
<ul>
<li>
<strong>Spear Phishing</strong> — Targeted at specific individuals
            using personalized information
</li>
<li>
<strong>Whaling</strong> — Aimed at executives and high-value
            targets
</li>
<li>
<strong>Clone Phishing</strong> — Copying legitimate emails and
            weaponizing the reply or attachment
</li>
<li>
<strong>Callback Phishing</strong> — Victim is tricked into calling
            a malicious number
</li>
<li>
<strong>QR Code Phishing (Quishing)</strong> — Malicious QR codes
            that lead to credential harvesters or payloads
</li>
<li>
<strong>Vishing</strong> — Voice-based social engineering
</li>
</ul>


<h3>Common Payload Delivery Methods</h3>
<ul>
<li>Macro-enabled Office documents (Word, Excel)</li>
<li>HTML smuggling techniques</li>
<li>ISO / IMG / ZIP containers with LNK files</li>
<li>OneNote and Publisher files</li>
<li>PDF files with malicious URI actions</li>
<li>Credential harvesting pages (Evilginx, Modlishka, GoPhish)</li>
</ul>


<pre className="payload-box">
{`# Example PowerShell download cradle (inside macro)
powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Enc <BASE64_PAYLOAD>


# HTML Smuggling concept
# JavaScript builds a blob in the browser and forces download


# Popular phishing frameworks
GoPhish          → Campaign management and tracking
Evilginx2        → Advanced reverse-proxy phishing (MFA bypass)
Modlishka        → Reverse proxy phishing framework
King Phisher     → Flexible phishing campaign tool`}
</pre>


<h3>Phishing OPSEC Tips</h3>
<ul>
<li>Use realistic pretexts based on OSINT</li>
<li>Rotate domains and infrastructure frequently</li>
<li>Test payloads against common email filters first</li>
<li>Avoid burning high-value infrastructure early</li>
<li>Monitor campaign metrics and adapt quickly</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Modern phishing combines convincing social engineering with
            technical delivery methods that bypass email gateways and endpoint
            controls. Always prepare multiple payloads and pretexts.
</p>
</div>
</>
    ),
quiz: {
question: "Which of the following is NOT a common payload delivery method in phishing?",
options: [
"Macro-enabled Office documents",
"HTML smuggling techniques",
"QR Code Phishing (Quishing)",
"Exploiting SQL Injection in public web apps"
      ],
correct: "Exploiting SQL Injection in public web apps",
    },
  },


// ====================== 03 Valid Accounts ======================
  {
id: "valid-accounts",
title: "03 Valid Accounts",
content: (
<>
<h2>Valid Accounts Abuse</h2>
<p>
          Using legitimate credentials is one of the quietest and most effective
          initial access methods. No exploit is required — the attacker simply
          authenticates as a valid user. This technique is extremely difficult
          to detect when multi-factor authentication is weak or absent.
</p>


<h3>How Credentials Are Obtained</h3>
<ul>
<li>Password spraying against exposed services</li>
<li>Credential stuffing from previous data breaches</li>
<li>Purchased credentials from underground markets</li>
<li>Previous successful phishing campaigns</li>
<li>Information stealer malware logs (RedLine, Raccoon, etc.)</li>
<li>Public OSINT and password reuse patterns</li>
</ul>


<h3>Common High-Value Targets</h3>
<ul>
<li>VPN portals (GlobalProtect, AnyConnect, Pulse Secure, Fortinet)</li>
<li>Outlook Web Access (OWA) and Microsoft 365</li>
<li>Citrix, RDWeb, VMware Horizon</li>
<li>Cloud identity providers (Okta, Azure AD, Duo)</li>
<li>SSH and RDP services exposed to the internet</li>
</ul>


<pre className="payload-box">
{`# Password spraying examples
kerbrute passwordspray -d target.local users.txt 'Welcome2024!'
MSOLSpray.ps1 -UserList users.txt -Password Winter2024!
o365spray --validate --domain target.com
spraycharles -u users.txt -p passwords.txt -t https://vpn.target.com


# Credential stuffing (only in-scope accounts)
hydra -L users.txt -P passwords.txt -target.com http-post-form
"/login:username=^USER^&password=^PASS^:F=failed"`}
</pre>


<h3>MFA Considerations</h3>
<ul>
<li>Push notification fatigue attacks</li>
<li>Session token theft after authentication</li>
<li>Evilginx-style reverse proxy phishing</li>
<li>SIM swapping (advanced scenarios)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Valid account abuse is stealthy and highly effective. Always test
            password spraying and credential reuse against external-facing
            authentication portals.
</p>
</div>
</>
    ),
quiz: {
question: "What is the most effective way to obtain valid accounts for initial access testing?",
options: [
"Only using public Wi-Fi",
"Password spraying and credential stuffing from previous data breaches",
"Only phishing the IT department",
"Exploiting public FTP servers"
      ],
correct: "Password spraying and credential stuffing from previous data breaches",
    },
  },


// ====================== 04 Public-Facing Applications ======================
  {
id: "public-apps",
title: "04 Public-Facing Applications",
content: (
<>
<h2>Exploiting Public-Facing Applications</h2>
<p>
          Internet-facing web applications, APIs, and services remain a major
          initial access vector when they contain unpatched vulnerabilities,
          critical misconfigurations, or weak authentication.
</p>


<h3>High-Value Targets</h3>
<ul>
<li>Web applications and REST/GraphQL APIs</li>
<li>VPN concentrators and security gateways</li>
<li>Remote desktop and virtualization portals</li>
<li>File transfer and collaboration platforms</li>
<li>Outdated CMS platforms and frameworks</li>
<li>DevOps and CI/CD interfaces exposed online</li>
</ul>


<h3>Common Vulnerability Classes</h3>
<ul>
<li>Remote Code Execution (RCE)</li>
<li>SQL Injection leading to system command execution</li>
<li>Insecure deserialization</li>
<li>Authentication and access control bypass</li>
<li>Unrestricted file upload leading to webshell</li>
<li>SSRF chaining into internal networks</li>
</ul>


<pre className="payload-box">
{`# Recommended workflow
1. Enumerate all public assets (httpx, shodan, censys)
2. Fingerprint technologies (Wappalyzer, WhatWeb, nuclei)
3. Check for known CVEs (nuclei, searchsploit, NVD)
4. Perform manual testing for logic flaws and auth bypass
5. Exploit successful vulnerability → establish foothold
6. Deploy implant / C2 beacon immediately


# Useful commands
nuclei -u https://target.com -t cves/
httpx -l targets.txt -tech-detect -status-code -title`}
</pre>


<div className="info-box">
<h4>Summary</h4>
<p>
            Public-facing applications can provide direct code execution.
            Combine automated vulnerability scanning with deep manual testing
            for maximum coverage.
</p>
</div>
</>
    ),
quiz: {
question: "Which vulnerability class is NOT listed as a common initial access method in public-facing applications?",
options: [
"Remote Code Execution (RCE)",
"SQL Injection",
"Insecure deserialization",
"Using only default passwords on routers"
      ],
correct: "Using only default passwords on routers",
    },
  },


// ====================== 05 External Remote Services ======================
  {
id: "remote-services",
title: "05 External Remote Services",
content: (
<>
<h2>External Remote Services</h2>
<p>
          Services specifically designed for remote access are natural targets.
          When these services are exposed to the internet and weakly protected,
          they become reliable and often quiet entry points.
</p>


<h3>Common Remote Services</h3>
<ul>
<li>SSL VPN and IPSec VPN gateways</li>
<li>Remote Desktop Protocol (RDP)</li>
<li>Secure Shell (SSH)</li>
<li>Citrix Gateway / VDI portals</li>
<li>Cloud management consoles</li>
<li>Jump servers and bastion hosts</li>
</ul>


<h3>Attack Techniques</h3>
<ul>
<li>Password spraying and credential stuffing</li>
<li>Exploitation of known product vulnerabilities</li>
<li>MFA bypass techniques (fatigue, token theft)</li>
<li>Default or weak credentials</li>
<li>Session hijacking after successful login</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Remote services are high-value targets. Focus on authentication
            strength, MFA resilience, and known vulnerabilities in VPN and
            remote access products.
</p>
</div>
</>
    ),
quiz: {
question: "What makes external remote services (VPN, RDP, SSH, etc.) high-value initial access targets?",
options: [
"They are always the most difficult to exploit",
"Services specifically designed for remote access are natural targets. When these services are exposed to the internet and weakly protected, they become reliable and often quiet entry points.",
"They require no authentication",
"They are only used internally"
      ],
correct: "Services specifically designed for remote access are natural targets. When these services are exposed to the internet and weakly protected, they become reliable and often quiet entry points.",
    },
  },


// ====================== 06 Supply Chain & Trusted Relationships ======================
  {
id: "supply-chain",
title: "06 Supply Chain & Trusted Relationships",
content: (
<>
<h2>Supply Chain & Trusted Relationships</h2>
<p>
          Sometimes the easiest path into the target organization is through a
          trusted third party — a vendor, partner, managed service provider, or
          software supplier that already possesses legitimate access.
</p>


<h3>Common Supply-Chain Vectors</h3>
<ul>
<li>Compromised software updates and installers</li>
<li>Malicious or backdoored open-source dependencies</li>
<li>Partner network links and site-to-site VPNs</li>
<li>Shared cloud tenants or federated SSO trust</li>
<li>MSP / IT provider administrative access</li>
<li>Third-party integrations with excessive permissions</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Supply-chain and trusted relationship attacks are advanced but
            extremely powerful. Always map third-party connections and trust
            relationships during the reconnaissance phase.
</p>
</div>
</>
    ),
quiz: {
question: "What is the primary advantage of supply-chain attacks over direct targeting?",
options: [
"They are slower and require more time",
"Sometimes the easiest path into the target organization is through a trusted third party — a vendor, partner, managed service provider, or software supplier that already possesses legitimate access.",
"They always leave obvious traces",
"They cannot be combined with phishing"
      ],
correct: "Sometimes the easiest path into the target organization is through a trusted third party — a vendor, partner, managed service provider, or software supplier that already possesses legitimate access.",
    },
  },


// ====================== 07 Physical Access Vectors ======================
  {
id: "physical",
title: "07 Physical Access Vectors",
content: (
<>
<h2>Physical Access Vectors</h2>
<p>
          When physical access is explicitly included in the Rules of Engagement,
          it can provide some of the highest-impact initial access opportunities
          available to a Red Team.
</p>


<h3>Common Physical Techniques</h3>
<ul>
<li>USB drops (Rubber Ducky, Bash Bunny, malicious charging cables)</li>
<li>Tailgating and piggybacking into restricted areas</li>
<li>Badge cloning (HID Prox, iCLASS, etc.)</li>
<li>Evil maid attacks on unattended workstations and laptops</li>
<li>Implanting hardware keyloggers or network taps</li>
<li>Social engineering reception and security staff</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Physical access is high impact and high risk. Only perform these
            techniques when they are clearly authorized in the Rules of
            Engagement and proper safety procedures are in place.
</p>
</div>
</>
    ),
quiz: {
question: "Which physical technique is explicitly mentioned as requiring Rules of Engagement authorization?",
options: [
"Using public Wi-Fi to hack the target's Wi-Fi",
"When physical access is explicitly included in the Rules of Engagement",
"Only badge cloning",
"Only social engineering staff"
      ],
correct: "When physical access is explicitly included in the Rules of Engagement",
    },
  },


// ====================== 08 Methodology & Best Practices ======================
  {
id: "methodology",
title: "08 Methodology & Best Practices",
content: (
<>
<h2>Initial Access Methodology & Best Practices</h2>


<h3>Recommended Engagement Approach</h3>
<ol>
<li>Complete thorough reconnaissance and identify all possible entry points</li>
<li>Prioritize low-noise methods first (valid accounts, password spraying)</li>
<li>Prepare multiple phishing pretexts and payload types</li>
<li>Test public-facing applications for critical vulnerabilities</li>
<li>Document every attempt, success, and failure</li>
<li>Once a foothold is gained, immediately establish C2 and persistence</li>
<li>Maintain detailed notes for the final report and Purple Team sessions</li>
</ol>


<h3>OPSEC Guidelines</h3>
<ul>
<li>Use dedicated infrastructure for phishing and external scanning</li>
<li>Avoid burning high-value payloads and domains early</li>
<li>Rotate domains, email addresses, and payloads regularly</li>
<li>Monitor for detection signals and adapt quickly</li>
<li>Never mix personal and operational infrastructure</li>
</ul>


<h3>Success Metrics</h3>
<ul>
<li>Time to first foothold</li>
<li>Number of successful access methods</li>
<li>Detection rate by the Blue Team</li>
<li>Quality of documentation and lessons learned</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Successful initial access requires creativity, patience, strong
            OPSEC, and disciplined documentation. Master phishing, valid
            account abuse, and public application exploitation — these three
            vectors cover the majority of real-world and Red Team engagements.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first recommended step in the Initial Access methodology?",
options: [
"Deploy the final implant",
"Complete thorough reconnaissance and identify all possible entry points",
"Start password spraying immediately",
"Only write the report"
      ],
correct: "Complete thorough reconnaissance and identify all possible entry points",
    },
  },
];

const InitialAccessTechniques = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChapters, setCompletedChapters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedChapters));
  }, [completedChapters]);

  const completedCount = completedChapters.length;
  const totalChapters = chapters.length;
  const progress = Math.round((completedCount / totalChapters) * 100);

  // ✅ YE FUNCTIONS ZAROORI HAIN — mat hatao
  const handleSubmit = () => {
    if (!activeChapter.quiz) return;
    if (selectedOption === activeChapter.quiz.correct) {
      setShowCongrats(true);
      if (!completedChapters.includes(activeChapter.id)) {
        setCompletedChapters([...completedChapters, activeChapter.id]);
      }
    } else {
      alert("❌ Wrong answer. Try again!");
    }
  };

  const closeCongrats = () => {
    setShowCongrats(false);
    setSelectedOption("");
  };

  return (
    <div className="article-page">
      <Navbar />

      <section className="article-header">
        <div className="article-header-content">
          <Link to="/red-teaming" className="back-link">
            ← Back to Red Teaming Courses
          </Link>
          <h1>
            The ultimate Red Team guide to{" "}
            <span className="gradient-text">Initial Access Techniques</span>
          </h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/8YyafxXg3dGjjADQBdo5/image.png"
          alt="Initial Access Techniques"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Initial+Access+Techniques";
          }}
        />
      </section>

      <section className="article-body">
        <div className="article-container">
          <aside className="article-sidebar">
            <h3>Course Content</h3>
            <ul>
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className={`${activeChapter.id === chapter.id ? "active" : ""} ${
                    completedChapters.includes(chapter.id) ? "completed" : ""
                  }`}
                  onClick={() => {
                    setActiveChapter(chapter);
                    setSelectedOption("");
                  }}
                >
                  {chapter.title}
                  {completedChapters.includes(chapter.id) && (
                    <span className="check-mark">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="article-content">
            {activeChapter.content}

            {activeChapter.quiz && (
              <div className="quiz-box">
                <h3>Quick Check</h3>
                <p className="quiz-question">{activeChapter.quiz.question}</p>
                <div className="quiz-options">
                  {activeChapter.quiz.options.map((opt) => (
                    <label key={opt} className="quiz-option">
                      <input
                        type="radio"
                        name="quiz"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <button className="quiz-submit" onClick={handleSubmit}>
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {showCongrats && (
        <div className="congrats-overlay">
          <div className="congrats-modal">
            <div className="congrats-icon">🎉</div>
            <h2>Congratulations!</h2>
            <p>You completed this step successfully.</p>
            <button onClick={closeCongrats}>Continue Learning</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default InitialAccessTechniques;