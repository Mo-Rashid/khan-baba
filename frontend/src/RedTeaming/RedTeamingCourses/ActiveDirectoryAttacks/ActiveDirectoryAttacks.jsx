import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./ActiveDirectoryAttacks.css";

const STORAGE_KEY = "VulnXploit_active_directory_attacks_completed";

const chapters = [
  {
    id: "what-is-ad-attacks",
    title: "01 What are Active Directory Attacks?",
    content: (
      <>
        <h2>What are Active Directory Attacks?</h2>
        <p>
          Active Directory (AD) is the identity and access backbone of most
          Windows enterprise environments. Active Directory Attacks focus on
          abusing authentication protocols, trust relationships, misconfigurations,
          and identity weaknesses to gain elevated access, move laterally, and
          achieve domain dominance.
        </p>
        <p>
          Because AD controls authentication and authorization across the
          enterprise, successful attacks against it often represent the highest
          impact findings in Red Team and penetration testing engagements.
        </p>

        <h3>Why AD is a Primary Target</h3>
        <ul>
          <li>Centralized authentication and authorization</li>
          <li>Rich set of protocols and trust relationships</li>
          <li>Frequent misconfigurations and excessive privileges</li>
          <li>High value of domain administrator or equivalent access</li>
          <li>Long-lived credentials and legacy protocol support</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Active Directory remains one of the most critical and frequently
            attacked components in enterprise environments. Mastering its attack
            surface is essential for advanced Red Team operations.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is Active Directory a primary target in enterprise environments?",
      options: [
        "Because it only stores images",
        "Because it controls centralized authentication and authorization",
        "Because it has no users",
        "Because it only runs on Linux"
      ],
      correct: "Because it controls centralized authentication and authorization",
    },
  },
  {
    id: "ad-fundamentals",
    title: "02 AD Fundamentals & Architecture",
    content: (
      <>
        <h2>AD Fundamentals & Architecture</h2>
        <p>
          Effective AD attacks require a solid understanding of how Active
          Directory is structured and how identity information is stored and
          used.
        </p>

        <h3>Core Components</h3>
        <ul>
          <li>Domains, trees, and forests</li>
          <li>Domain Controllers and Global Catalog</li>
          <li>Organizational Units (OUs) and objects</li>
          <li>Users, groups, computers, and service accounts</li>
          <li>Group Policy Objects (GPOs)</li>
          <li>Trust relationships (parent-child, external, forest, realm)</li>
        </ul>

        <h3>Important Concepts</h3>
        <ul>
          <li>Security Identifiers (SIDs) and relative identifiers</li>
          <li>Access Control Lists (DACLs / SACLs)</li>
          <li>Privileged groups (Domain Admins, Enterprise Admins, etc.)</li>
          <li>Service Principal Names (SPNs)</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Strong architectural knowledge allows operators to map the
            environment accurately and identify high-value targets and trust
            paths.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What does SPN stand for in Active Directory?",
      options: [
        "Secure Private Network",
        "Service Principal Name",
        "System Process Number",
        "Security Policy Name"
      ],
      correct: "Service Principal Name",
    },
  },
  {
    id: "authentication-protocols",
    title: "03 Authentication Protocols",
    content: (
      <>
        <h2>Authentication Protocols</h2>
        <p>
          Active Directory relies primarily on Kerberos and NTLM for
          authentication. Understanding both protocols is fundamental to most
          AD attack techniques.
        </p>

        <h3>Kerberos</h3>
        <ul>
          <li>Ticket-Granting Ticket (TGT) and service tickets</li>
          <li>Key Distribution Center (KDC) role</li>
          <li>Service Principal Names (SPNs)</li>
          <li>Encryption types and key material</li>
          <li>Delegation (unconstrained, constrained, resource-based)</li>
        </ul>

        <h3>NTLM</h3>
        <ul>
          <li>Challenge-response authentication</li>
          <li>NTLM relay potential</li>
          <li>Legacy support and residual risk</li>
          <li>Relationship with Kerberos preference</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Most modern AD attacks abuse Kerberos or NTLM behavior. Deep
            protocol understanding is required to both execute and defend
            against these techniques.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which two main authentication protocols does Active Directory use?",
      options: [
        "HTTP and FTP",
        "Kerberos and NTLM",
        "SSH and Telnet",
        "SMTP and DNS"
      ],
      correct: "Kerberos and NTLM",
    },
  },
  {
    id: "enumeration",
    title: "04 Enumeration Techniques",
    content: (
      <>
        <h2>Enumeration Techniques</h2>
        <p>
          Thorough enumeration is the foundation of successful Active Directory
          attacks. Mapping users, groups, computers, trusts, and permissions
          reveals the attack paths that matter.
        </p>

        <h3>Key Enumeration Targets</h3>
        <ul>
          <li>Domain users, groups, and privileged accounts</li>
          <li>Computer objects and service accounts</li>
          <li>Group membership and nested groups</li>
          <li>Access control entries and dangerous permissions</li>
          <li>Trust relationships and domain/forest structure</li>
          <li>SPNs and Kerberoastable accounts</li>
          <li>GPOs and interesting policy settings</li>
        </ul>

        <h3>Approach</h3>
        <ul>
          <li>Start with authenticated enumeration whenever possible</li>
          <li>Map high-value groups and privileged paths</li>
          <li>Identify accounts with weak or interesting configurations</li>
          <li>Document relationships for later attack path analysis</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Enumeration quality directly determines attack success. Invest time
            in mapping the domain thoroughly before attempting exploitation.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the foundation of successful Active Directory attacks?",
      options: [
        "Only using random tools",
        "Thorough enumeration of the domain",
        "Only attacking the firewall",
        "Only changing wallpapers"
      ],
      correct: "Thorough enumeration of the domain",
    },
  },
  {
    id: "credential-access",
    title: "05 Credential Access Concepts",
    content: (
      <>
        <h2>Credential Access Concepts</h2>
        <p>
          Obtaining usable credentials is a central goal in Active Directory
          attacks. Credentials can come from memory, disk, network traffic, or
          configuration weaknesses.
        </p>

        <h3>Common Sources</h3>
        <ul>
          <li>LSASS memory and credential material</li>
          <li>NTDS.dit and domain database access (when privileged)</li>
          <li>Cached credentials and LSA secrets</li>
          <li>Service account passwords and Kerberoasting</li>
          <li>Cleartext or weakly protected passwords in scripts and GPOs</li>
          <li>Token and ticket material</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Credential access techniques must always stay within the Rules of
            Engagement. Focus on understanding sources and defensive controls
            rather than indiscriminate dumping.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common source of credentials in AD?",
      options: [
        "Only desktop wallpapers",
        "LSASS memory and Kerberoasting",
        "Only browser history",
        "Only printer queues"
      ],
      correct: "LSASS memory and Kerberoasting",
    },
  },
  {
    id: "kerberos-attacks",
    title: "06 Kerberos-Based Attacks",
    content: (
      <>
        <h2>Kerberos-Based Attacks</h2>
        <p>
          Kerberos provides a rich attack surface when misconfigurations or
          weak account settings exist.
        </p>

        <h3>Major Technique Categories</h3>
        <ul>
          <li>Kerberoasting (service ticket offline attacks)</li>
          <li>AS-REP Roasting</li>
          <li>Ticket abuse (Pass-the-Ticket concepts)</li>
          <li>Silver Ticket and Golden Ticket concepts</li>
          <li>Delegation abuse (unconstrained, constrained, RBCD)</li>
          <li>S4U and related impersonation flows</li>
        </ul>

        <h3>Key Enabling Conditions</h3>
        <ul>
          <li>Accounts with Service Principal Names</li>
          <li>Weak service account passwords</li>
          <li>Accounts without pre-authentication</li>
          <li>Overly permissive delegation settings</li>
          <li>Access to high-value ticket material</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Kerberos attacks are among the most powerful and commonly used
            techniques in AD environments. Understanding the protocol and the
            conditions that enable each attack is essential.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What does Kerberoasting target?",
      options: [
        "Only firewall rules",
        "Service tickets for offline password attacks",
        "Only website cookies",
        "Only DNS records"
      ],
      correct: "Service tickets for offline password attacks",
    },
  },
  {
    id: "ntlm-relay",
    title: "07 NTLM & Relay Attacks",
    content: (
      <>
        <h2>NTLM & Relay Attacks</h2>
        <p>
          NTLM remains supported in many environments for compatibility.
          Relay attacks and related techniques continue to be highly effective
          when signing and other protections are not enforced.
        </p>

        <h3>Core Concepts</h3>
        <ul>
          <li>NTLM authentication flow</li>
          <li>Relay of authentication to other services</li>
          <li>Impact of SMB signing, LDAP signing, and channel binding</li>
          <li>Cross-protocol relay opportunities</li>
          <li>Coercion techniques that generate authentication attempts</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            NTLM relay remains a high-impact technique in environments that have
            not fully enforced signing and modern protections. Always evaluate
            these controls during assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What makes NTLM relay attacks possible?",
      options: [
        "Strong encryption only",
        "Lack of SMB/LDAP signing and modern protections",
        "Using only HTTPS",
        "Disabling all users"
      ],
      correct: "Lack of SMB/LDAP signing and modern protections",
    },
  },
  {
    id: "trusts",
    title: "08 Trust Relationships",
    content: (
      <>
        <h2>Trust Relationships</h2>
        <p>
          Domain and forest trusts expand the attack surface and can allow
          compromise of one domain to affect others.
        </p>

        <h3>Trust Types & Implications</h3>
        <ul>
          <li>Parent-child and tree-root trusts</li>
          <li>External and forest trusts</li>
          <li>SID filtering and its security impact</li>
          <li>Trust direction and transitivity</li>
          <li>Selective authentication</li>
        </ul>

        <h3>Assessment Focus</h3>
        <ul>
          <li>Map all trusts in the environment</li>
          <li>Identify trusts that allow privilege flow</li>
          <li>Evaluate SID history and filtering status</li>
          <li>Test realistic cross-domain attack paths</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Trusts can turn a single domain compromise into a multi-domain or
            forest-wide issue. Always map and evaluate trust relationships.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What can domain/forest trusts allow an attacker to do?",
      options: [
        "Only change desktop icons",
        "Expand compromise across multiple domains",
        "Only print documents",
        "Only access local files"
      ],
      correct: "Expand compromise across multiple domains",
    },
  },
  {
    id: "privilege-escalation-ad",
    title: "09 Privilege Escalation in AD",
    content: (
      <>
        <h2>Privilege Escalation in Active Directory</h2>
        <p>
          Privilege escalation within AD often involves abusing permissions,
          group membership, or identity features rather than classic local
          exploits.
        </p>

        <h3>Common Paths</h3>
        <ul>
          <li>Dangerous ACLs on users, groups, or computers</li>
          <li>Ability to add members to privileged groups</li>
          <li>Control over GPOs or OUs</li>
          <li>Resource-Based Constrained Delegation opportunities</li>
          <li>Abuse of existing high privileges</li>
          <li>Shadow credentials and related certificate techniques</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            AD privilege escalation is frequently permission-driven. Systematic
            ACL and group analysis reveals the majority of practical paths.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a common way to escalate privileges in Active Directory?",
      options: [
        "Only changing screen resolution",
        "Abusing dangerous ACLs and group memberships",
        "Only installing new fonts",
        "Only using guest accounts"
      ],
      correct: "Abusing dangerous ACLs and group memberships",
    },
  },
  {
    id: "lateral-persistence",
    title: "10 Lateral Movement & Persistence",
    content: (
      <>
        <h2>Lateral Movement & Persistence</h2>
        <p>
          Once elevated access is obtained, operators typically expand control
          and establish durable access.
        </p>

        <h3>Lateral Movement Concepts</h3>
        <ul>
          <li>Use of obtained credentials and tickets</li>
          <li>Remote service execution and administration protocols</li>
          <li>Abuse of existing administrative access</li>
          <li>Pivoting through trusts</li>
        </ul>

        <h3>Persistence Concepts</h3>
        <ul>
          <li>Additional credential material</li>
          <li>Golden / Silver Ticket style persistence (when applicable)</li>
          <li>Account and group manipulation</li>
          <li>Certificate and PKI based persistence</li>
          <li>GPO or script-based mechanisms</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Lateral movement and persistence in AD environments rely heavily on
            identity material and existing administrative pathways.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What do lateral movement and persistence in AD mostly rely on?",
      options: [
        "Only physical access",
        "Identity material and administrative pathways",
        "Only USB devices",
        "Only public Wi-Fi"
      ],
      correct: "Identity material and administrative pathways",
    },
  },
  {
    id: "detection-hardening",
    title: "11 Detection & Hardening",
    content: (
      <>
        <h2>Detection & Hardening</h2>
        <p>
          Understanding detection opportunities and hardening measures improves
          both offensive tradecraft and the quality of recommendations delivered
          to clients.
        </p>

        <h3>Detection Opportunities</h3>
        <ul>
          <li>Unusual Kerberos ticket requests and anomalies</li>
          <li>Privileged group membership changes</li>
          <li>Suspicious authentication patterns</li>
          <li>ACL modifications on sensitive objects</li>
          <li>Use of known attack tooling behaviors</li>
        </ul>

        <h3>Hardening Priorities</h3>
        <ul>
          <li>Tiered administration and least privilege</li>
          <li>Protected Users and related security groups</li>
          <li>Disable or restrict NTLM where possible</li>
          <li>Enforce signing and channel binding</li>
          <li>Strong service account hygiene and gMSA usage</li>
          <li>Regular ACL and privileged access reviews</li>
          <li>Advanced audit policy and monitoring</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Effective AD defense centers on least privilege, strong
            authentication hygiene, and comprehensive monitoring of identity
            activity.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a key hardening measure for Active Directory?",
      options: [
        "Giving everyone Domain Admin",
        "Least privilege and strong authentication hygiene",
        "Disabling all logging",
        "Using only NTLM everywhere"
      ],
      correct: "Least privilege and strong authentication hygiene",
    },
  },
  {
    id: "methodology",
    title: "12 Methodology & Best Practices",
    content: (
      <>
        <h2>Methodology & Best Practices</h2>
        <p>
          Professional Active Directory assessments follow a structured and
          disciplined process.
        </p>

        <h3>Recommended Approach</h3>
        <ol>
          <li>Confirm scope and Rules of Engagement</li>
          <li>Perform thorough domain enumeration</li>
          <li>Map users, groups, trusts, and dangerous permissions</li>
          <li>Identify realistic attack paths</li>
          <li>Validate credential access and escalation opportunities</li>
          <li>Test lateral movement and persistence within bounds</li>
          <li>Document findings with clear impact and remediation</li>
          <li>Provide detection and hardening recommendations</li>
        </ol>

        <h3>Professional Guidelines</h3>
        <ul>
          <li>Prefer low-noise and controlled techniques</li>
          <li>Avoid unnecessary domain disruption</li>
          <li>Coordinate high-impact actions with the client</li>
          <li>Maintain detailed notes for reporting and Purple Team work</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Successful Active Directory attacks are driven by deep enumeration,
            protocol understanding, and careful path analysis.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should be the first step in a professional AD assessment?",
      options: [
        "Immediately dump all hashes",
        "Confirm scope and Rules of Engagement",
        "Disable all Domain Controllers",
        "Delete all user accounts"
      ],
      correct: "Confirm scope and Rules of Engagement",
    },
  },
];
const ActiveDirectoryAttacks = () => {
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
            <span className="gradient-text">Active Directory Attacks</span>
          </h1>
          <p className="article-date">Interactive Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/pZJ3A7aZyvICVcvdjZLJ/image.png"
          alt="Active Directory Attacks"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Active+Directory+Attacks";
          }}
        />
      </section>

      <section className="article-body">
        <div className="article-container">
          <aside className="article-sidebar">
            <h3>On this Article</h3>
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

export default ActiveDirectoryAttacks;