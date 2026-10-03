import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./RedTeamFundamentals.css";

const chapters = [
  // ====================== 01 What is Red Teaming? ======================
  {
    id: "what-is-red-teaming",
    title: "01 What is Red Teaming?",
    content: (
      <>
        <h2>What is Red Teaming?</h2>
        <p>
          Red Teaming is a full-scope, adversary-emulation security exercise
          designed to test an organization's detection and response capabilities
          against realistic threat actors. Unlike traditional penetration testing,
          Red Team operations focus on achieving specific business objectives
          while remaining undetected for as long as possible.
        </p>
        <p>
          A mature Red Team does not simply look for vulnerabilities — it thinks,
          plans, and operates like a real adversary. The goal is to answer one
          critical question: <strong>"Can our organization detect and stop a
          determined attacker who is actively trying to achieve a business impact?"</strong>
        </p>

        <h3>Core Goals of a Red Team Engagement</h3>
        <ul>
          <li>Emulate real threat actors (APT groups, ransomware crews, nation-state adversaries)</li>
          <li>Test people, processes, and technology together as a holistic system</li>
          <li>Measure detection and response maturity of the Blue Team / SOC</li>
          <li>Identify gaps in security controls, monitoring, and incident response</li>
          <li>Provide actionable, prioritized recommendations to improve overall security posture</li>
          <li>Validate whether existing investments in security tools are delivering value</li>
        </ul>

        <h3>Red Team vs Penetration Testing</h3>
        <p>
          A penetration test is usually time-boxed and vulnerability-focused —
          the goal is to find as many security issues as possible within a
          fixed scope and timeframe. A Red Team engagement is objective-based,
          stealth-focused, and emulates a real adversary’s full attack lifecycle
          from reconnaissance to impact.
        </p>
        <p>
          Penetration tests answer: <em>“What vulnerabilities exist?”</em><br />
          Red Team exercises answer: <em>“Can we detect and stop a real attacker?”</em>
        </p>

        <h3>Key Characteristics of Professional Red Teaming</h3>
        <ul>
          <li><strong>Objective-driven</strong> — Clear goals such as data exfiltration or domain dominance</li>
          <li><strong>Stealth-first</strong> — Minimize detection and maximize dwell time</li>
          <li><strong>Adversary emulation</strong> — Map TTPs to real threat groups using MITRE ATT&CK</li>
          <li><strong>Full kill-chain coverage</strong> — From recon to actions on objectives</li>
          <li><strong>OPSEC disciplined</strong> — Protect infrastructure, operators, and techniques</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Red Teaming = Realistic adversary simulation focused on stealth,
            objectives, and testing the entire security program — not just
            finding vulnerabilities. It measures how well the organization
            can detect, respond to, and recover from a determined attacker.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the primary difference between a Red Team engagement and a traditional Penetration Test?",
      options: [
        "Red Team focuses on achieving business objectives while staying undetected as long as possible",
        "Red Team only looks for vulnerabilities",
        "Penetration Test is always longer",
        "Red Team never uses MITRE ATT&CK"
      ],
      correct: "Red Team focuses on achieving business objectives while staying undetected as long as possible",
    },
  },

  // ====================== 02 Engagement Types & Scope ======================
  {
    id: "engagement-types",
    title: "02 Engagement Types & Scope",
    content: (
      <>
        <h2>Types of Red Team Engagements</h2>
        <h3>1. Full-Scope Red Team</h3>
        <p>
          No restrictions — can include social engineering, physical access,
          supply-chain attacks, and full adversarial simulation. Tests every
          layer of defense.
        </p>
        <h3>2. Assumed Breach</h3>
        <p>
          Starts with the assumption that an attacker already has a foothold
          (e.g., low-privilege user or initial beacon). Focuses entirely on
          post-exploitation, lateral movement, and objective achievement.
        </p>
        <h3>3. Objective-Based Red Team</h3>
        <p>
          Specific, predefined goals such as "exfiltrate the customer database,"
          "achieve Domain Admin," or "deploy ransomware simulation payload."
        </p>
        <h3>4. Purple Team Exercise</h3>
        <p>
          Collaborative sessions where Red and Blue work together in real-time
          to improve detection coverage for specific TTPs.
        </p>
        <h3>5. Tabletop Exercise (TTX)</h3>
        <p>
          Discussion-based exercises without live exploitation. Used to test
          decision-making, communication, and incident response plans.
        </p>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Choose the engagement type based on organizational maturity and
            what specific capabilities need to be tested.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which engagement type is collaborative and focuses on improving detection in real-time?",
      options: [
        "Purple Team Exercise",
        "Assumed Breach",
        "Tabletop Exercise (TTX)",
        "Full-Scope Red Team"
      ],
      correct: "Purple Team Exercise",
    },
  },

  // ====================== 03 Rules of Engagement ======================
  {
    id: "rules-of-engagement",
    title: "03 Rules of Engagement (ROE)",
    content: (
      <>
        <h2>Rules of Engagement (ROE)</h2>
        <p>
          The ROE is the single most important document in any Red Team
          operation. It defines legal boundaries, protects both the client and
          the Red Team, and prevents catastrophic misunderstandings.
        </p>

        <h3>Essential ROE Components</h3>
        <ul>
          <li><strong>Scope</strong> — In-scope and out-of-scope systems, users, locations, and applications</li>
          <li><strong>Authorized techniques</strong> — What attack methods are explicitly allowed or prohibited</li>
          <li><strong>Social engineering rules</strong> — Phishing allowed? Physical access? USB drops?</li>
          <li><strong>Working hours</strong> — Testing windows and blackout periods</li>
          <li><strong>Emergency contacts</strong> — Who to call if something goes wrong</li>
          <li><strong>Deconfliction process</strong> — How to avoid Blue Team accidentally blocking Red Team</li>
          <li><strong>Data handling</strong> — How sensitive data is stored, transferred, and destroyed</li>
          <li><strong>Get-Out-of-Jail-Free letter</strong> — Legal authorization document</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Never start a single action without a signed ROE and proper legal
            authorization. The ROE protects everyone.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the single most important document in any Red Team operation?",
      options: [
        "Rules of Engagement (ROE)",
        "Rules of Engagement (ROE) is optional",
        "Only the SOW",
        "Only the MITRE ATT&CK"
      ],
      correct: "Rules of Engagement (ROE)",
    },
  },

  // ====================== 04 Attack Frameworks ======================
  {
    id: "attack-frameworks",
    title: "04 Attack Frameworks & Lifecycles",
    content: (
      <>
        <h2>Attack Frameworks & Lifecycle Models</h2>
        <h3>Lockheed Martin Cyber Kill Chain</h3>
        <ol>
          <li>Reconnaissance — Target identification and intelligence gathering</li>
          <li>Weaponization — Creating the exploit or delivery mechanism</li>
          <li>Delivery — Sending the weapon (phishing, USB, web exploit)</li>
          <li>Exploitation — Triggering the vulnerability</li>
          <li>Installation — Establishing persistence</li>
          <li>Command & Control (C2) — Remote access to the target</li>
          <li>Actions on Objectives — Achieving the final goal</li>
        </ol>

        <h3>MITRE ATT&CK Framework</h3>
        <p>The industry-standard knowledge base of adversary tactics and techniques based on real-world observations.</p>

        <h3>Unified Kill Chain</h3>
        <p>A modern, comprehensive model that combines and extends the Cyber Kill Chain and MITRE ATT&CK.</p>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Every professional Red Team maps their TTPs to MITRE ATT&CK. This
            enables clear communication with Blue Teams and measurable detection improvement.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which framework is the industry-standard knowledge base of adversary tactics and techniques?",
      options: [
        "MITRE ATT&CK",
        "Cyber Kill Chain only",
        "Purple Team only",
        "Tabletop Exercise"
      ],
      correct: "MITRE ATT&CK",
    },
  },

  // ====================== 05 Reconnaissance & OSINT ======================
  {
    id: "reconnaissance",
    title: "05 Reconnaissance & OSINT",
    content: (
      <>
        <h2>Reconnaissance & OSINT</h2>
        <p>Reconnaissance is the foundation of every successful Red Team engagement.</p>

        <h3>Passive Reconnaissance (OSINT)</h3>
        <ul>
          <li>Google dorking and advanced search operators</li>
          <li>DNS enumeration</li>
          <li>Certificate transparency logs</li>
          <li>Shodan, Censys, ZoomEye</li>
          <li>Social media and job postings</li>
          <li>GitHub and pastebin</li>
          <li>LinkedIn</li>
        </ul>

        <h3>Active Reconnaissance</h3>
        <ul>
          <li>Port scanning (nmap, masscan)</li>
          <li>Service fingerprinting</li>
          <li>Web application mapping</li>
          <li>Email harvesting</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Start with passive recon to avoid detection. Move to active recon only when necessary.</p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the recommended first step in reconnaissance to avoid detection?",
      options: [
        "Passive Reconnaissance (OSINT)",
        "Active port scanning",
        "Shodan directly",
        "LinkedIn scraping"
      ],
      correct: "Passive Reconnaissance (OSINT)",
    },
  },

  // ====================== 06 Initial Access Techniques ======================
  {
    id: "initial-access",
    title: "06 Initial Access Techniques",
    content: (
      <>
        <h2>Initial Access Techniques</h2>
        <p>Initial access is the first step into the target environment.</p>

        <h3>Common Initial Access Vectors</h3>
        <ul>
          <li><strong>Phishing</strong></li>
          <li><strong>Password attacks</strong> (spraying, stuffing)</li>
          <li><strong>Exploiting public-facing applications</strong></li>
          <li><strong>Valid accounts</strong></li>
          <li><strong>Supply-chain attacks</strong></li>
          <li><strong>Physical access</strong> (if in scope)</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Phishing and valid account abuse remain the two most reliable initial access methods.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which initial access vector is described as remaining the two most reliable methods in real-world breaches?",
      options: [
        "Phishing and valid account abuse",
        "Kernel exploits",
        "Docker socket exposure",
        "SUID binaries"
      ],
      correct: "Phishing and valid account abuse",
    },
  },

  // ====================== 07 Execution & Persistence ======================
  {
    id: "execution-persistence",
    title: "07 Execution & Persistence",
    content: (
      <>
        <h2>Execution & Persistence</h2>
        <h3>Execution Techniques</h3>
        <ul>
          <li>PowerShell, CMD, WSL</li>
          <li>Living-off-the-Land binaries (LOLBins)</li>
          <li>Scheduled tasks and cron jobs</li>
          <li>WMI</li>
          <li>Service creation and DLL sideloading</li>
        </ul>

        <h3>Persistence Mechanisms</h3>
        <div className="payload-box">
          <pre>{`Windows Persistence:
• Registry Run keys
• Startup folder
• Scheduled tasks
• WMI Event Subscription
• Service persistence
• DLL search-order hijacking

Linux Persistence:
• Cron jobs
• SSH authorized_keys
• systemd service units
• LD_PRELOAD`}</pre>
        </div>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Establish multiple persistence mechanisms at different privilege levels.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which persistence mechanism is part of the Windows 'DLL search-order hijacking' family?",
      options: [
        "DLL search-order hijacking",
        "SeImpersonatePrivilege",
        "SUID binary",
        "Docker socket"
      ],
      correct: "DLL search-order hijacking",
    },
  },

  // ====================== 08 Privilege Escalation ======================
  {
    id: "privilege-escalation",
    title: "08 Privilege Escalation",
    content: (
      <>
        <h2>Privilege Escalation</h2>
        <p>Privilege escalation moves from lower-privileged to higher-privileged access.</p>

        <h3>Windows Privilege Escalation Vectors</h3>
        <ul>
          <li>Token impersonation and theft</li>
          <li>UAC bypass techniques</li>
          <li>Service misconfigurations</li>
          <li>Vulnerable drivers (BYOVD)</li>
          <li>DLL hijacking</li>
          <li>AlwaysInstallElevated</li>
          <li>Stored credentials</li>
        </ul>

        <h3>Linux Privilege Escalation Vectors</h3>
        <ul>
          <li>SUID/SGID binary exploitation</li>
          <li>Sudo misconfigurations</li>
          <li>Weak file permissions</li>
          <li>Kernel exploits</li>
          <li>Cron job exploitation</li>
          <li>Capabilities abuse</li>
          <li>Container escape</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Privilege escalation is the critical bridge between initial access and achieving objectives.</p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first recommended step in the Privilege Escalation methodology?",
      options: [
        "Perform thorough local enumeration on both Windows and Linux",
        "Consider kernel/driver options only",
        "Start with Purple Team",
        "Only write the report"
      ],
      correct: "Perform thorough local enumeration on both Windows and Linux",
    },
  },

  // ====================== 09 Credential Access ======================
  {
    id: "credential-access",
    title: "09 Credential Access & Dumping",
    content: (
      <>
        <h2>Credential Access & Dumping</h2>
        <p>Credentials are the most valuable asset in almost every environment.</p>

        <h3>Windows Credential Access</h3>
        <ul>
          <li>LSASS dumping (Mimikatz, comsvcs.dll)</li>
          <li>SAM hive extraction</li>
          <li>DPAPI abuse</li>
          <li>Kerberoasting</li>
          <li>AS-REP Roasting</li>
          <li>DCSync</li>
        </ul>

        <h3>Linux Credential Access</h3>
        <ul>
          <li>/etc/shadow</li>
          <li>~/.ssh/ authorized_keys</li>
          <li>Shell history</li>
          <li>Keyrings and secrets</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Credential access opens every door. Protect your own credentials with the same rigor.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which Windows technique uses Mimikatz for LSASS dumping?",
      options: [
        "LSASS dumping",
        "SUID binary",
        "Docker socket",
        "Sudo -l"
      ],
      correct: "LSASS dumping",
    },
  },

  // ====================== 10 Lateral Movement ======================
  {
    id: "lateral-movement",
    title: "10 Lateral Movement",
    content: (
      <>
        <h2>Lateral Movement</h2>
        <p>Lateral movement turns a single foothold into widespread network access.</p>

        <h3>Common Lateral Movement Techniques</h3>
        <ul>
          <li>Pass-the-Hash (PtH)</li>
          <li>Pass-the-Ticket (PtT)</li>
          <li>Over-Pass-the-Hash</li>
          <li>WMI/WinRM</li>
          <li>SMB/PsExec</li>
          <li>RDP hijacking</li>
          <li>SSH pivoting</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Lateral movement is where most Red Team operations succeed or fail. Map your route carefully.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which technique uses NTLM hash to authenticate without the plaintext password?",
      options: [
        "Pass-the-Hash (PtH)",
        "SUID binary",
        "Docker socket",
        "SeImpersonatePrivilege"
      ],
      correct: "Pass-the-Hash (PtH)",
    },
  },

  // ====================== 11 Command & Control ======================
  {
    id: "c2-infrastructure",
    title: "11 Command & Control (C2)",
    content: (
      <>
        <h2>Command & Control (C2) Infrastructure</h2>
        <p>C2 is the lifeline of the Red Team operation.</p>

        <h3>C2 Architecture Components</h3>
        <ul>
          <li>Team Server (Cobalt Strike, Sliver, Mythic)</li>
          <li>Redirectors (Nginx, Apache)</li>
          <li>Domain fronting</li>
          <li>Malleable profiles</li>
        </ul>

        <h3>C2 Communication Patterns</h3>
        <div className="payload-box">
          <pre>{`Common C2 Protocols:
• HTTPS (most common)
• DNS tunneling
• ICMP tunneling
• WebSocket
• SMB named pipes

Popular C2 Frameworks:
• Cobalt Strike
• Sliver
• Mythic
• Havoc
• Nighthawk`}</pre>
        </div>

        <div className="info-box">
          <h4>Summary</h4>
          <p>C2 design is one of the highest-skill areas in Red Teaming. A compromised C2 infrastructure can end the entire operation.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which C2 framework is described as open-source and modern?",
      options: [
        "Sliver",
        "Mimikatz",
        "Rubeus",
        "PowerUp"
      ],
      correct: "Sliver",
    },
  },

  // ====================== 12 Defense Evasion ======================
  {
    id: "defense-evasion",
    title: "12 Defense Evasion & OPSEC",
    content: (
      <>
        <h2>Defense Evasion & Operational Security</h2>
        <h3>Defense Evasion Techniques</h3>
        <ul>
          <li>Living-off-the-Land (LOLBins)</li>
          <li>Process injection</li>
          <li>API unhooking</li>
          <li>Indirect syscalls</li>
          <li>Obfuscation</li>
          <li>Timestomping</li>
          <li>Log clearing</li>
        </ul>

        <h3>OPSEC Principles</h3>
        <div className="payload-box">
          <pre>{`Red Team OPSEC Guidelines:
1. Minimize footprint
2. Use encryption everywhere
3. Compartmentalize access
4. Rotate infrastructure
5. No personal information
6. Think like Blue Team
7. Clean up responsibly
8. Document everything`}</pre>
        </div>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Good OPSEC and defense evasion are what separate professional Red Teams from noisy attackers.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which OPSEC principle is described as 'if it would alert you, it will alert them'?",
      options: [
        "Think like Blue Team",
        "Use encryption everywhere",
        "Rotate infrastructure",
        "Minimize footprint"
      ],
      correct: "Think like Blue Team",
    },
  },

  // ====================== 13 Collection & Exfiltration ======================
  {
    id: "collection-exfil",
    title: "13 Collection & Exfiltration",
    content: (
      <>
        <h2>Collection & Exfiltration</h2>
        <h3>Data Collection</h3>
        <ul>
          <li>Sensitive document discovery</li>
          <li>Email and chat data</li>
          <li>Source code repositories</li>
          <li>Cloud storage enumeration</li>
          <li>Clipboard and screenshot capture</li>
        </ul>

        <h3>Exfiltration Techniques</h3>
        <div className="payload-box">
          <pre>{`Exfiltration Channels:
• HTTPS over C2
• DNS tunneling
• Cloud storage APIs
• Email (SMTP)
• FTP/SFTP
• Physical (USB)
• Steganography

Anti-Forensics:
• Encrypt data
• Dead-drop resolvers
• Chunk data
• Mimic normal traffic
• Exfil during business hours`}</pre>
        </div>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Collection and exfiltration should be slow, encrypted, and deliberate.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which exfiltration channel is described as the most common because it blends with web traffic?",
      options: [
        "HTTPS over C2",
        "DNS tunneling",
        "Physical USB",
        "Steganography"
      ],
      correct: "HTTPS over C2",
    },
  },

  // ====================== 14 Reporting & Purple Team ======================
  {
    id: "reporting",
    title: "14 Reporting & Purple Team",
    content: (
      <>
        <h2>Reporting, Debrief & Purple Team</h2>
        <h3>Anatomy of a Strong Red Team Report</h3>
        <ul>
          <li>Executive summary</li>
          <li>Engagement objectives</li>
          <li>Attack path narrative</li>
          <li>MITRE ATT&CK mapping</li>
          <li>Detection gaps</li>
          <li>Technical findings</li>
          <li>Prioritized recommendations</li>
          <li>IOCs</li>
        </ul>

        <h3>Purple Team Integration</h3>
        <div className="payload-box">
          <pre>{`Purple Team Workflow:
1. Red Team executes technique
2. Blue Team monitors detection
3. Document and refine
4. Create new detection rule if missed
5. Re-test until reliably detected`}</pre>
        </div>

        <div className="info-box">
          <h4>Summary</h4>
          <p>A good report tells a compelling story. Purple Team follow-up transforms discovery into lasting security improvement.</p>
        </div>
      </>
    ),
    quiz: {
      question: "Which workflow step happens after Blue Team misses the detection?",
      options: [
        "Create new detection rule",
        "Start the engagement",
        "Write the report",
        "Only cleanup"
      ],
      correct: "Create new detection rule",
    },
  },

  // ====================== 15 Tools & Final Methodology ======================
  {
    id: "tools-methodology",
    title: "15 Tools & Final Methodology",
    content: (
      <>
        <h2>Essential Tools & Recommended Methodology</h2>
        <h3>Essential Red Team Tools</h3>
        <div className="payload-box">
          <pre>{`C2 Frameworks:    Cobalt Strike, Sliver, Mythic, Havoc
Recon:            Amass, Subfinder, theHarvester
Initial Access:   Evilginx, GoPhish, Modlishka
Post-Exploit:     Mimikatz, Rubeus, SharpCollection
Lateral:          CrackMapExec, Impacket, PsExec
Credential:       SharpDPAPI, DonPAPI
Evasion:          NimPlant, ScareCrow`}</pre>
        </div>

        <h3>Recommended Engagement Methodology</h3>
        <ol>
          <li>Scoping — Define ROE, objectives</li>
          <li>Threat intelligence — Select adversary to emulate</li>
          <li>Infrastructure setup — Deploy C2, redirectors</li>
          <li>Passive reconnaissance</li>
          <li>Active reconnaissance</li>
          <li>Initial access</li>
          <li>Establish C2 & persistence</li>
          <li>Privilege escalation</li>
          <li>Credential access</li>
          <li>Lateral movement</li>
          <li>Collection & exfiltration</li>
          <li>Cleanup</li>
          <li>Reporting & debrief</li>
          <li>Purple team follow-up</li>
        </ol>

        <div className="info-box">
          <h4>Summary</h4>
          <p>Master the methodology first. Tools change every year, but tradecraft, OPSEC, and adversarial thinking stay valuable forever.</p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first recommended step in the Red Team Engagement Methodology?",
      options: [
        "Scoping — Define ROE, objectives, and boundaries",
        "Start with C2 infrastructure",
        "Only write the report",
        "Only cleanup"
      ],
      correct: "Scoping — Define ROE, objectives, and boundaries",
    },
  },
];

const RedTeamFundamentals = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);

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
    setShowCongats(false);
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
            <span className="gradient-text">Red Team Fundamentals</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/HDOlk1tb2LpPqhq0sKzo/image.png"
          alt="Red Team Fundamentals Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Red+Team+Fundamentals";
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

export default RedTeamFundamentals;