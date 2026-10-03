import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./PrivilegeEscalation.css";

const chapters = [
  {
    id: "what-is-privesc",
    title: "01 What is Privilege Escalation?",
    content: (
      <>
        <h2>What is Privilege Escalation?</h2>
        <p>
          Privilege Escalation is the process of elevating access from a lower
          privileged context to a higher one. In Red Team engagements this
          usually means moving from a standard user to local administrator /
          SYSTEM on Windows, or from a regular user to root on Linux.
        </p>
        <p>
          Successful privilege escalation dramatically expands the operator’s
          capabilities: credential dumping, lateral movement, persistence,
          defense evasion, and full domain or infrastructure compromise become
          possible. Understanding both Windows and Linux escalation paths is
          essential for realistic assessments.
        </p>

        <h3>Why It Matters</h3>
        <ul>
          <li>Transforms limited footholds into high-impact access</li>
          <li>Reveals weak configuration and permission models</li>
          <li>Tests the effectiveness of least-privilege designs</li>
          <li>Provides critical data for Blue Team detection and hardening</li>
        </ul>

        <h3>Two Main Categories</h3>
        <ul>
          <li>
            <strong>Vertical</strong> — Lower privilege → Higher privilege (User
            → Admin/Root)
          </li>
          <li>
            <strong>Horizontal</strong> — Same privilege level but different
            user/context
          </li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Privilege Escalation is one of the most important post-exploitation
            phases. Master both Windows and Linux techniques to maximize the
            value of every engagement.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What is the main difference between Vertical and Horizontal Privilege Escalation?",
      options: [
        "Vertical escalation changes the user's privilege level, while horizontal escalation keeps the same privilege level but switches users/context",
        "Vertical escalation only works on Linux, horizontal only on Windows",
        "Horizontal escalation is always done using kernel exploits",
        "Vertical escalation requires no enumeration"
      ],
      correct:
        "Vertical escalation changes the user's privilege level, while horizontal escalation keeps the same privilege level but switches users/context",
    },
  },
  {
    id: "windows-fundamentals",
    title: "02 Windows Privilege Escalation Fundamentals",
    content: (
      <>
        <h2>Windows Privilege Escalation Fundamentals</h2>
        <p>
          Windows privilege escalation focuses on abusing misconfigurations,
          weak permissions, token privileges, services, scheduled tasks, and
          credential material to reach local Administrator or SYSTEM.
        </p>

        <h3>Core Concepts</h3>
        <ul>
          <li>Access Tokens and Privileges (SeDebugPrivilege, SeImpersonatePrivilege, etc.)</li>
          <li>Discretionary Access Control Lists (DACLs)</li>
          <li>Service Control Manager and service permissions</li>
          <li>Registry permissions and autorun locations</li>
          <li>UAC and integrity levels</li>
        </ul>

        <h3>Common High-Value Targets</h3>
        <ul>
          <li>Unquoted service paths</li>
          <li>Weak service binary or folder permissions</li>
          <li>AlwaysInstallElevated</li>
          <li>Stored credentials and credential manager</li>
          <li>Token impersonation opportunities</li>
          <li>Vulnerable drivers and kernel components</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Windows privesc is heavily configuration-driven. Systematic
            enumeration of services, permissions, tokens, and credentials is
            more reliable than relying solely on public exploits.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is NOT a core concept in Windows Privilege Escalation?",
      options: [
        "Access Tokens and Privileges",
        "Discretionary Access Control Lists (DACLs)",
        "Kernel version and patch level",
        "Service Control Manager and service permissions"
      ],
      correct: "Kernel version and patch level",
    },
  },
  {
    id: "linux-fundamentals",
    title: "03 Linux Privilege Escalation Fundamentals",
    content: (
      <>
        <h2>Linux Privilege Escalation Fundamentals</h2>
        <p>
          Linux privilege escalation commonly abuses SUID/SGID binaries, sudo
          misconfigurations, weak file permissions, capabilities, cron jobs,
          kernel vulnerabilities, and exposed credentials.
        </p>

        <h3>Core Concepts</h3>
        <ul>
          <li>SUID and SGID binaries</li>
          <li>sudoers rules and command restrictions</li>
          <li>File and directory permissions (especially world-writable)</li>
          <li>Linux capabilities (cap_setuid, cap_sys_admin, etc.)</li>
          <li>Cron, systemd timers, and other scheduled tasks</li>
          <li>Environment variables and PATH hijacking</li>
        </ul>

        <h3>High-Value Enumeration Areas</h3>
        <ul>
          <li>find / -perm -4000 and -2000</li>
          <li>sudo -l output analysis</li>
          <li>Writable scripts and configuration files</li>
          <li>Interesting binaries in PATH</li>
          <li>Kernel version and known vulnerabilities</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Linux privesc rewards thorough enumeration. Many successful paths
            come from misconfigured sudo, SUID binaries, or writable scripts
            rather than complex exploits.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the primary tool/command used to enumerate SUID/SGID binaries on Linux?",
      options: [
        "find / -perm -4000 -o -perm -2000",
        "sudo -l",
        "ls -la /etc/cron*",
        "getcap -r /"
      ],
      correct: "find / -perm -4000 -o -perm -2000",
    },
  },
  {
    id: "windows-misconfigs",
    title: "04 Windows Misconfigurations & Permissions",
    content: (
      <>
        <h2>Windows Misconfigurations & Weak Permissions</h2>
        <p>
          The majority of real-world Windows privilege escalation cases stem
          from permission and configuration weaknesses rather than zero-day
          exploits.
        </p>

        <h3>Classic Misconfigurations</h3>
        <ul>
          <li>Unquoted service paths with spaces</li>
          <li>Service binary or directory writable by low-privileged users</li>
          <li>Weak registry permissions on service keys</li>
          <li>AlwaysInstallElevated enabled</li>
          <li>Writable PATH directories</li>
          <li>Insecure scheduled tasks</li>
        </ul>

        <h3>Enumeration Focus</h3>
        <ul>
          <li>Service permissions (sc, accesschk, PowerUp)</li>
          <li>File and folder ACLs on interesting locations</li>
          <li>Autoruns and startup locations</li>
          <li>Installed software with weak permissions</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Systematic permission enumeration remains one of the highest-ROI
            activities during Windows privilege escalation assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which classic Windows misconfiguration is often caused by unquoted service paths?",
      options: [
        "Unquoted service paths with spaces",
        "AlwaysInstallElevated",
        "Writable PATH directories",
        "Insecure scheduled tasks"
      ],
      correct: "Unquoted service paths with spaces",
    },
  },
  {
    id: "linux-misconfigs",
    title: "05 Linux Misconfigurations & SUID/SGID",
    content: (
      <>
        <h2>Linux Misconfigurations & SUID/SGID</h2>
        <p>
          On Linux, SUID/SGID binaries, overly permissive sudo rules, and
          writable scripts are frequent sources of privilege escalation.
        </p>

        <h3>Key Areas</h3>
        <ul>
          <li>Custom or unusual SUID binaries</li>
          <li>Sudo rules allowing dangerous commands or wildcards</li>
          <li>World-writable scripts executed by higher privileges</li>
          <li>Writable cron jobs or systemd service files</li>
          <li>NFS shares with no_root_squash</li>
          <li>Docker or LXC socket access</li>
        </ul>

        <h3>Practical Approach</h3>
        <ul>
          <li>Enumerate all SUID/SGID binaries and research each one</li>
          <li>Carefully analyze sudo -l output for dangerous entries</li>
          <li>Search for writable files in common script and config locations</li>
          <li>Check for interesting capabilities with getcap</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Linux privilege escalation is often a game of careful enumeration
            and understanding of how binaries and scripts are executed with
            elevated rights.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What command is used to analyze dangerous sudo rules?",
      options: [
        "sudo -l",
        "find / -perm -4000",
        "ls -la /etc/sudoers",
        "getcap -r /"
      ],
      correct: "sudo -l",
    },
  },
  {
    id: "credential-hunting",
    title: "06 Credential Hunting & Token Abuse",
    content: (
      <>
        <h2>Credential Hunting & Token Abuse</h2>
        <p>
          Finding and abusing credentials or tokens is one of the cleanest
          privilege escalation paths on both Windows and Linux.
        </p>

        <h3>Windows Focus</h3>
        <ul>
          <li>LSASS memory and credential dumping (when in scope)</li>
          <li>Credential Manager and saved RDP/VPN credentials</li>
          <li>Registry and file-based credential stores</li>
          <li>Token impersonation (SeImpersonatePrivilege, Potato family)</li>
          <li>Kerberos tickets and unconstrained delegation scenarios</li>
        </ul>

        <h3>Linux Focus</h3>
        <ul>
          <li>SSH keys, password files, and configuration files</li>
          <li>History files and environment variables</li>
          <li>Application configuration and database credentials</li>
          <li>Cloud metadata and instance credentials (when applicable)</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Credential and token abuse frequently provides the quietest and
            most reliable path to higher privileges. Always prioritize thorough
            credential hunting.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which Windows technique is part of the 'Potato family'?",
      options: [
        "Token impersonation (SeImpersonatePrivilege)",
        "Credential Manager abuse",
        "Kerberos ticket theft",
        "LSASS memory dumping"
      ],
      correct: "Token impersonation (SeImpersonatePrivilege)",
    },
  },
  {
    id: "services-tasks",
    title: "07 Services, Scheduled Tasks & Cron",
    content: (
      <>
        <h2>Services, Scheduled Tasks & Cron</h2>
        <p>
          Services and scheduled tasks run with elevated privileges and are
          frequent targets for privilege escalation on both platforms.
        </p>

        <h3>Windows</h3>
        <ul>
          <li>Service binary and folder permissions</li>
          <li>Unquoted service paths</li>
          <li>Modifiable service configurations</li>
          <li>Scheduled tasks with weak ACLs or writable actions</li>
        </ul>

        <h3>Linux</h3>
        <ul>
          <li>Cron jobs running as root with writable scripts</li>
          <li>Systemd service files with weak permissions</li>
          <li>Timers and user cron entries</li>
          <li>Writable paths referenced by elevated tasks</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Any process or task that runs with higher privileges and can be
            influenced by a lower-privileged user is a potential escalation
            vector.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a classic Windows service misconfiguration?",
      options: [
        "Unquoted service paths with spaces",
        "No_root_squash on NFS shares",
        "Writable cron jobs",
        "Docker socket exposure"
      ],
      correct: "Unquoted service paths with spaces",
    },
  },
  {
    id: "path-hijacking",
    title: "08 Path Hijacking & DLL / Shared Object Issues",
    content: (
      <>
        <h2>Path Hijacking & DLL / Shared Object Issues</h2>
        <p>
          When elevated processes search for binaries or libraries in writable
          locations, attackers can intercept execution.
        </p>

        <h3>Windows Techniques</h3>
        <ul>
          <li>PATH hijacking</li>
          <li>DLL search order hijacking</li>
          <li>Writable directories in the DLL search path</li>
          <li>Side-loading opportunities</li>
        </ul>

        <h3>Linux Techniques</h3>
        <ul>
          <li>PATH hijacking in scripts or sudo rules</li>
          <li>LD_LIBRARY_PATH and LD_PRELOAD abuse (when permitted)</li>
          <li>Writable shared object locations</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Path and library hijacking remain effective when elevated processes
            make insecure assumptions about search order and permissions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most common Linux technique for DLL/shared object hijacking?",
      options: [
        "LD_LIBRARY_PATH and LD_PRELOAD abuse",
        "Unquoted service paths",
        "SeImpersonatePrivilege",
        "Writable cron jobs"
      ],
      correct: "LD_LIBRARY_PATH and LD_PRELOAD abuse",
    },
  },
  {
    id: "kernel-and-drivers",
    title: "09 Kernel & Driver Vectors",
    content: (
      <>
        <h2>Kernel & Driver Vectors</h2>
        <p>
          Kernel vulnerabilities and vulnerable drivers can provide powerful
          privilege escalation, but they carry higher risk and detection
          potential.
        </p>

        <h3>Considerations</h3>
        <ul>
          <li>Kernel version and patch level enumeration</li>
          <li>Known vulnerable drivers (especially on Windows)</li>
          <li>Stability and crash risk during testing</li>
          <li>Modern mitigations (KASLR, SMEP, SMAP, HVCI, etc.)</li>
          <li>Scope and Rules of Engagement restrictions</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Kernel and driver exploits should be treated as high-impact,
            higher-risk options. Prefer configuration-based techniques when
            possible, and always validate stability in a lab first.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which modern Windows mitigation is NOT listed in the kernel/drivers considerations?",
      options: [
        "KASLR",
        "SMEP",
        "SMAP",
        "HVCI"
      ],
      correct: "HVCI"
    },
  },
  {
    id: "containers-cloud",
    title: "10 Containers & Cloud Privilege Escalation",
    content: (
      <>
        <h2>Containers & Cloud Privilege Escalation</h2>
        <p>
          Modern environments often include containers and cloud instances.
          Privilege escalation in these contexts has unique characteristics.
        </p>

        <h3>Container Focus</h3>
        <ul>
          <li>Privileged containers and dangerous capabilities</li>
          <li>Docker socket or API exposure</li>
          <li>Host path mounts and breakout techniques</li>
          <li>Shared namespaces and weak isolation</li>
        </ul>

        <h3>Cloud Focus</h3>
        <ul>
          <li>Instance metadata services and IAM roles</li>
          <li>Overly permissive cloud permissions</li>
          <li>SSRF into metadata endpoints</li>
          <li>Service account and managed identity abuse</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Container and cloud privilege escalation often involves identity
            and configuration weaknesses rather than classic OS exploits.
            Always include these surfaces in modern assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which container technique is mentioned as a high-risk exposure?",
      options: [
        "Docker socket or API exposure",
        "SUID binaries",
        "Unquoted service paths",
        "SeImpersonatePrivilege"
      ],
      correct: "Docker socket or API exposure"
    },
  },
  {
    id: "detection-hardening",
    title: "11 Detection & Hardening Perspective",
    content: (
      <>
        <h2>Detection & Hardening Perspective</h2>
        <p>
          Understanding how privilege escalation is detected and prevented
          improves both offensive tradecraft and defensive recommendations.
        </p>

        <h3>Common Detection Opportunities</h3>
        <ul>
          <li>Unusual process creation and parent-child relationships</li>
          <li>Service and scheduled task modifications</li>
          <li>Suspicious use of privileged APIs and tokens</li>
          <li>Access to sensitive credential stores</li>
          <li>Kernel driver loading and exploitation attempts</li>
        </ul>

        <h3>Hardening Priorities</h3>
        <ul>
          <li>Enforce least privilege and remove unnecessary rights</li>
          <li>Audit and restrict service and task permissions</li>
          <li>Remove or tightly control SUID/SGID and sudo rules</li>
          <li>Apply application allow-listing and integrity controls</li>
          <li>Monitor for credential access and token abuse</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Every successful privilege escalation path discovered during an
            engagement should translate into concrete detection and remediation
            recommendations for the client.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which hardening priority focuses on removing unnecessary rights and enforcing least privilege?",
      options: [
        "Enforce least privilege and remove unnecessary rights",
        "Monitor for unusual process creation",
        "Audit scheduled tasks",
        "Check kernel drivers"
      ],
      correct: "Enforce least privilege and remove unnecessary rights"
    },
  },
  {
    id: "methodology",
    title: "12 Methodology & Best Practices",
    content: (
      <>
        <h2>Methodology & Best Practices</h2>
        <p>
          Effective privilege escalation follows a structured, repeatable
          process rather than random exploitation attempts.
        </p>

        <h3>Recommended Approach</h3>
        <ol>
          <li>Perform thorough local enumeration on both Windows and Linux</li>
          <li>Prioritize configuration and permission weaknesses first</li>
          <li>Hunt for credentials and tokens early</li>
          <li>Test service, task, and scheduled execution abuse</li>
          <li>Evaluate path and library hijacking opportunities</li>
          <li>Consider kernel/driver options only when justified and in scope</li>
          <li>Document every finding with clear reproduction steps</li>
          <li>Map findings to detection and remediation guidance</li>
        </ol>

        <h3>OPSEC & Professional Guidelines</h3>
        <ul>
          <li>Prefer reliable, low-noise techniques</li>
          <li>Avoid unnecessary system instability</li>
          <li>Stay strictly within the Rules of Engagement</li>
          <li>Maintain detailed notes for reporting and Purple Team work</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Successful privilege escalation is driven by systematic enumeration,
            prioritization of high-probability paths, and disciplined
            documentation. Master the fundamentals on both Windows and Linux.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first recommended step in the Privilege Escalation methodology?",
      options: [
        "Perform thorough local enumeration on both Windows and Linux",
        "Consider kernel/driver options only when justified",
        "Map findings to remediation guidance",
        "Avoid unnecessary system instability"
      ],
      correct: "Perform thorough local enumeration on both Windows and Linux"
    },
  },
];

const PrivilegeEscalation = () => {
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
            <span className="gradient-text">Privilege Escalation</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/dqnBqSxOXoqhQHZifCC0/image.png"
          alt="Privilege Escalation (Windows & Linux)"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Privilege+Escalation";
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

export default PrivilegeEscalation;