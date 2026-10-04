import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./MobileRedTeaming.css";

const STORAGE_KEY = "VulnXploit_mobile_red_teaming_course_completed";

const chapters = [
  // ====================== 01 What is Mobile Red Teaming? ======================
  {
id: "what-is-mobile-rt",
title: "01 What is Mobile Red Teaming?",
content: (
<>
<h2>What is Mobile Red Teaming?</h2>
<p>
          Mobile Red Teaming evaluates the security of mobile applications and
          the surrounding mobile ecosystem from an adversary’s perspective. It
          goes beyond basic vulnerability scanning to simulate realistic attacks
          against Android and iOS applications, device configurations, and
          backend services that support mobile clients.
</p>
<p>
          Modern mobile applications often handle sensitive data, authentication
          tokens, and business-critical functionality. Weaknesses in the app,
          its storage, network communication, or platform integration can lead
          to significant compromise.
</p>


<h3>Core Objectives</h3>
<ul>
<li>Identify vulnerabilities in Android and iOS applications</li>
<li>Assess local data storage and protection mechanisms</li>
<li>Evaluate authentication, authorization, and session handling</li>
<li>Test network communication and API security</li>
<li>Simulate realistic mobile threat scenarios</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Mobile Red Teaming combines application analysis, platform knowledge,
            and threat simulation to uncover risks that automated scanners often
            miss. Both Android and iOS must be assessed with platform-specific
            techniques.
</p>
</div>
</>
    ),
quiz: {
question: "What is the primary focus of Mobile Red Teaming?",
options: [
"Only basic vulnerability scanning of Android and iOS apps",
"Evaluating the security of mobile applications and the surrounding mobile ecosystem from an adversary’s perspective",
"Only testing desktop applications",
"Only doing static analysis"
      ],
correct: "Evaluating the security of mobile applications and the surrounding mobile ecosystem from an adversary’s perspective",
    },
  },


  // ====================== 02 Mobile Threat Landscape ======================
  {
id: "threat-landscape",
title: "02 Mobile Threat Landscape",
content: (
<>
<h2>Mobile Threat Landscape</h2>
<p>
          Understanding the current mobile threat landscape helps prioritize
          testing efforts and design realistic attack scenarios.
</p>


<h3>Common Threat Categories</h3>
<ul>
<li>Malicious or repackaged applications</li>
<li>Insecure data storage on the device</li>
<li>Weak or broken authentication and session management</li>
<li>Insecure network communication</li>
<li>Client-side logic and business logic flaws</li>
<li>Platform misuse and insecure inter-process communication</li>
<li>Supply-chain and third-party SDK risks</li>
</ul>


<h3>Attacker Motivations</h3>
<ul>
<li>Credential and session token theft</li>
<li>Sensitive data extraction</li>
<li>Account takeover and fraud</li>
<li>Access to backend systems via the mobile API</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Mobile threats frequently target data at rest, authentication
            mechanisms, and the trust relationship between the app and its
            backend. Design tests around these high-value targets.
</p>
</div>
</>
    ),
quiz: {
question: "Which of the following is a common mobile threat category?",
options: [
"Only testing iOS jailbreak detection",
"Insecure data storage on the device",
"Only Android permission model",
"Only static analysis"
      ],
correct: "Insecure data storage on the device",
    },
  },


  // ====================== 03 Android Attack Surface ======================
  {
id: "android-attack-surface",
title: "03 Android Attack Surface",
content: (
<>
<h2>Android Attack Surface</h2>
<p>
          Android’s open architecture and flexible security model create a rich
          attack surface that Red Teams must understand in depth.
</p>


<h3>Key Components</h3>
<ul>
<li>APK structure and application components (Activities, Services, Receivers, Providers)</li>
<li>Android permissions model and dangerous permissions</li>
<li>Inter-Process Communication (IPC) and Intent handling</li>
<li>WebView and JavaScript interfaces</li>
<li>Exported components and deep links</li>
<li>Root detection and emulator detection bypass considerations</li>
<li>Storage locations (internal, external, SharedPreferences, databases)</li>
</ul>


<h3>High-Value Testing Areas</h3>
<ul>
<li>Exported components without proper protection</li>
<li>Insecure Intent handling and parameter injection</li>
<li>Weak or missing certificate pinning</li>
<li>Local storage of sensitive data</li>
<li>Debuggable applications and backup exposure</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Android assessments require deep knowledge of the component model,
            IPC, and permission system. Many critical findings come from
            improperly protected exported components and insecure data storage.
</p>
</div>
</>
    ),
quiz: {
question: "Which Android component export risk is highlighted as high-value?",
options: [
"Only internal components",
"Exported components without proper protection",
"Only background processes",
"Only web views"
      ],
correct: "Exported components without proper protection",
    },
  },


  // ====================== 04 iOS Attack Surface ======================
  {
id: "ios-attack-surface",
title: "04 iOS Attack Surface",
content: (
<>
<h2>iOS Attack Surface</h2>
<p>
          iOS presents a more restricted environment than Android, but
          application-level weaknesses and platform misuse still provide
          meaningful attack opportunities.
</p>


<h3>Key Components</h3>
<ul>
<li>IPA structure and application sandbox</li>
<li>Keychain and data protection classes</li>
<li>URL schemes and Universal Links</li>
<li>App Transport Security (ATS)</li>
<li>Jailbreak detection and anti-tampering controls</li>
<li>Binary protection (encryption, code signing)</li>
<li>Extension and share sheet attack surface</li>
</ul>


<h3>High-Value Testing Areas</h3>
<ul>
<li>Insecure Keychain usage and accessibility attributes</li>
<li>Weak or missing certificate pinning</li>
<li>Sensitive data in logs, cache, or backups</li>
<li>URL scheme hijacking and deep link abuse</li>
<li>Runtime manipulation on jailbroken devices (when in scope)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            iOS testing focuses heavily on data protection, Keychain usage,
            network security, and the effectiveness of anti-tampering controls.
            Understanding the sandbox and data protection APIs is essential.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common iOS high-value testing area?",
options: [
"Only data protection classes",
"Insecure Keychain usage and accessibility attributes",
"Only jailbreak detection",
"Only binary protection"
      ],
correct: "Insecure Keychain usage and accessibility attributes",
    },
  },


  // ====================== 05 Application Analysis Fundamentals ======================
  {
id: "application-analysis",
title: "05 Application Analysis Fundamentals",
content: (
<>
<h2>Application Analysis Fundamentals</h2>
<p>
          Mobile application analysis typically combines static and dynamic
          techniques to build a complete understanding of the app’s behavior
          and security posture.
</p>


<h3>Analysis Goals</h3>
<ul>
<li>Map application functionality and entry points</li>
<li>Identify sensitive data handling</li>
<li>Locate authentication and authorization logic</li>
<li>Understand network communication patterns</li>
<li>Discover hidden or debug functionality</li>
</ul>


<h3>Typical Workflow</h3>
<ol>
<li>Obtain and prepare the application package (APK / IPA)</li>
<li>Perform static analysis of code and resources</li>
<li>Instrument and run the application for dynamic analysis</li>
<li>Intercept and analyze network traffic</li>
<li>Test identified attack surfaces systematically</li>
</ol>


<div className="info-box">
<h4>Summary</h4>
<p>
            Strong application analysis forms the foundation of effective Mobile
            Red Teaming. Combine static and dynamic techniques for the best
            coverage.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first step in the typical workflow for mobile application analysis?",
options: [
"Perform static analysis",
"Obtain and prepare the application package (APK / IPA)",
"Run the app immediately",
"Intercept network traffic"
      ],
correct: "Obtain and prepare the application package (APK / IPA)",
    },
  },


  // ====================== 06 Static Analysis ======================
  {
id: "static-analysis",
title: "06 Static Analysis",
content: (
<>
<h2>Static Analysis</h2>
<p>
          Static analysis examines the application without executing it. It is
          highly effective for discovering hardcoded secrets, insecure
          configurations, and logic flaws.
</p>


<h3>Common Focus Areas</h3>
<ul>
<li>Hardcoded credentials, API keys, and secrets</li>
<li>Insecure cryptographic implementations</li>
<li>Exported components and permission declarations</li>
<li>Debuggable flags and backup settings</li>
<li>Third-party SDK usage and known issues</li>
<li>Code patterns related to authentication and authorization</li>
</ul>


<h3>Practical Considerations</h3>
<ul>
<li>Decompilation and disassembly quality varies by platform and protections</li>
<li>Obfuscation increases analysis effort but does not eliminate risk</li>
<li>Always correlate static findings with dynamic validation</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Static analysis quickly surfaces many high-impact issues such as
            hardcoded secrets and insecure configurations. It should always be
            paired with runtime testing.
</p>
</div>
</>
    ),
quiz: {
question: "What is NOT a common focus area in static analysis?",
options: [
"Hardcoded credentials, API keys, and secrets",
"Insecure cryptographic implementations",
"Exported components and permission declarations",
"Running the application live"
      ],
correct: "Running the application live",
    },
  },


  // ====================== 07 Dynamic Analysis & Runtime Manipulation ======================
  {
id: "dynamic-analysis",
title: "07 Dynamic Analysis & Runtime Manipulation",
content: (
<>
<h2>Dynamic Analysis & Runtime Manipulation</h2>
<p>
          Dynamic analysis observes and interacts with the application while it
          is running. Runtime manipulation allows testers to bypass controls,
          inspect memory, and modify behavior.
</p>


<h3>Common Techniques</h3>
<ul>
<li>Instrumentation and method hooking</li>
<li>SSL/TLS pinning bypass</li>
<li>Root / jailbreak detection bypass</li>
<li>Runtime inspection of objects and memory</li>
<li>Function argument and return value modification</li>
<li>Frida, objection, and similar tooling (when authorized)</li>
</ul>


<h3>Goals</h3>
<ul>
<li>Validate static findings</li>
<li>Bypass client-side security controls for deeper testing</li>
<li>Observe real data flows and sensitive operations</li>
<li>Test business logic under manipulated conditions</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Dynamic analysis and controlled runtime manipulation reveal issues
            that static analysis alone cannot detect. Always operate within the
            agreed Rules of Engagement.
</p>
</div>
</>
    ),
quiz: {
question: "What is a key goal of dynamic analysis in mobile Red Teaming?",
options: [
"Only to make the app faster",
"Validate static findings and bypass client-side security controls",
"Only to encrypt the app",
"Only to test network traffic"
      ],
correct: "Validate static findings and bypass client-side security controls",
    },
  },


  // ====================== 08 Network Interception & Traffic Analysis ======================
  {
id: "network-interception",
title: "08 Network Interception & Traffic Analysis",
content: (
<>
<h2>Network Interception & Traffic Analysis</h2>
<p>
          Mobile applications communicate extensively with backend APIs.
          Intercepting and analyzing this traffic is essential for identifying
          insecure communication and API-level weaknesses.
</p>


<h3>Key Activities</h3>
<ul>
<li>Proxy setup and certificate installation</li>
<li>Bypassing certificate pinning when necessary and authorized</li>
<li>Inspecting request and response content</li>
<li>Identifying sensitive data in transit</li>
<li>Testing API authentication and authorization</li>
<li>Evaluating encryption and token handling</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Network analysis often uncovers critical issues in API security,
            token handling, and data exposure. It is a core part of every mobile
            assessment.
</p>
</div>
</>
    ),
quiz: {
question: "What is a key activity in network interception for mobile testing?",
options: [
"Only setting up proxy and certificate installation",
"Bypassing certificate pinning when necessary and authorized",
"Only testing iOS",
"Only static analysis"
      ],
correct: "Bypassing certificate pinning when necessary and authorized",
    },
  },


  // ====================== 09 Authentication & Session Management ======================
  {
id: "auth-session",
title: "09 Authentication & Session Management",
content: (
<>
<h2>Authentication & Session Management</h2>
<p>
          Authentication and session handling are frequent sources of high-impact
          findings in mobile applications.
</p>


<h3>Common Weaknesses</h3>
<ul>
<li>Insecure storage of tokens or credentials</li>
<li>Weak or predictable session identifiers</li>
<li>Missing or improper token expiration and revocation</li>
<li>Client-side only authentication or authorization checks</li>
<li>Insecure biometric or local authentication implementations</li>
<li>Improper handling of multi-factor authentication</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Treat authentication and session management as high-priority
            targets. Failures in these areas frequently lead to account takeover
            or unauthorized access.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common weakness in mobile authentication?",
options: [
"Strong session identifiers",
"Insecure storage of tokens or credentials",
"Always using biometric authentication",
"Proper token expiration"
      ],
correct: "Insecure storage of tokens or credentials",
    },
  },


  // ====================== 10 Data Storage & Local Security ======================
  {
id: "data-storage",
title: "10 Data Storage & Local Security",
content: (
<>
<h2>Data Storage & Local Security</h2>
<p>
          Sensitive data stored on the device is a primary target. Improper
          storage can lead to data exposure even without network access.
</p>


<h3>Android Considerations</h3>
<ul>
<li>SharedPreferences and world-readable files</li>
<li>SQLite databases and unencrypted storage</li>
<li>External storage usage</li>
<li>Logcat and backup exposure</li>
</ul>


<h3>iOS Considerations</h3>
<ul>
<li>Keychain accessibility attributes</li>
<li>Data Protection classes</li>
<li>Plist files, caches, and snapshots</li>
<li>Backup and iCloud inclusion</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Local data storage remains one of the most consistently vulnerable
            areas in mobile applications. Always examine how and where sensitive
            information is stored.
</p>
</div>
</>
    ),
quiz: {
question: "Which Android storage risk is explicitly mentioned?",
options: [
"Keychain accessibility attributes",
"SharedPreferences and world-readable files",
"URL schemes",
"App Transport Security"
      ],
correct: "SharedPreferences and world-readable files",
    },
  },


  // ====================== 11 Platform-Specific Considerations ======================
  {
id: "platform-exploitation",
title: "11 Platform-Specific Considerations",
content: (
<>
<h2>Platform-Specific Considerations</h2>
<p>
          Each platform has unique security features and common pitfalls that
          influence testing strategy and findings.
</p>


<h3>Android-Specific</h3>
<ul>
<li>Component export and permission protection levels</li>
<li>WebView JavaScript interface risks</li>
<li>Broadcast and Content Provider abuse</li>
<li>Custom permission and signature protection</li>
</ul>


<h3>iOS-Specific</h3>
<ul>
<li>Keychain and data protection API misuse</li>
<li>URL scheme and Universal Link handling</li>
<li>App Transport Security exceptions</li>
<li>Extension and inter-app communication risks</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Platform knowledge is essential. Generic web testing techniques alone
            are insufficient for thorough mobile application assessments.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common iOS-specific risk?",
options: [
"WebView JavaScript interface risks",
"URL scheme and Universal Link handling",
"Only component export",
"Only broadcast abuse"
      ],
correct: "URL scheme and Universal Link handling",
    },
  },


  // ====================== 12 Methodology & Best Practices ======================
  {
id: "methodology",
title: "12 Methodology & Best Practices",
content: (
<>
<h2>Methodology & Best Practices</h2>
<p>
          A structured methodology ensures consistent and comprehensive Mobile
          Red Team assessments.
</p>


<h3>Recommended Approach</h3>
<ol>
<li>Define scope (applications, platforms, backends, devices)</li>
<li>Obtain and prepare application packages</li>
<li>Perform static analysis</li>
<li>Set up controlled dynamic testing environment</li>
<li>Conduct runtime analysis and traffic interception</li>
<li>Test authentication, storage, and business logic</li>
<li>Validate findings and assess real-world impact</li>
<li>Document issues with clear reproduction steps and remediation guidance</li>
</ol>


<h3>Professional Guidelines</h3>
<ul>
<li>Respect platform and application integrity constraints</li>
<li>Operate only within authorized devices and accounts</li>
<li>Coordinate on any high-impact or destructive testing</li>
<li>Provide both technical findings and strategic recommendations</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Effective Mobile Red Teaming combines platform expertise, systematic
            analysis, and realistic threat simulation. Cover both Android and
            iOS thoroughly and always tie findings back to business risk.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first recommended step in the Mobile Red Teaming methodology?",
options: [
"Start dynamic analysis",
"Define scope (applications, platforms, backends, devices)",
"Perform static analysis",
"Deploy the app"
      ],
correct: "Define scope (applications, platforms, backends, devices)",
    },
  },
];

const MobileRedTeaming = () => {
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
          <Link to="/red-teaming" className="back-link">← Back to Red Teaming Courses</Link>
          <h1>The ultimate Red Team guide to <span className="gradient-text">Mobile Red Teaming</span></h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/EhtQWpYGl2JcvdRCPJtV/image.png"
          alt="Mobile Red Teaming"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Mobile+Red+Teaming"; }}
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
                  className={`${activeChapter.id === chapter.id ? "active" : ""} ${completedChapters.includes(chapter.id) ? "completed" : ""}`}
                  onClick={() => { setActiveChapter(chapter); setSelectedOption(""); }}
                >
                  {chapter.title}
                  {completedChapters.includes(chapter.id) && <span className="check-mark">✓</span>}
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
                      <input type="radio" name="quiz" value={opt} checked={selectedOption === opt} onChange={(e) => setSelectedOption(e.target.value)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <button className="quiz-submit" onClick={handleSubmit}>Submit Answer</button>
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

export default MobileRedTeaming;