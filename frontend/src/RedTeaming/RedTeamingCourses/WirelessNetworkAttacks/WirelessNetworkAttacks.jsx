import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./WirelessNetworkAttacks.css";


const chapters = [
  // ====================== 01 What are Wireless Network Attacks? ======================
  {
id: "what-is-wireless",
title: "01 What are Wireless Network Attacks?",
content: (
<>
<h2>What are Wireless Network Attacks?</h2>
<p>
          Wireless Network Attacks target Wi-Fi and related wireless
          technologies to gain unauthorized access, intercept traffic, or
          disrupt communications. Because wireless signals extend beyond
          physical boundaries, they create unique attack surfaces that
          traditional wired network controls cannot fully address.
</p>
<p>
          Red Team assessments of wireless environments focus on discovering
          networks, evaluating encryption and authentication strength, testing
          for misconfigurations, and demonstrating realistic attack paths that
          could lead to network access or credential compromise.
</p>


<h3>Primary Objectives</h3>
<ul>
<li>Identify all in-scope wireless networks and access points</li>
<li>Assess encryption, authentication, and configuration strength</li>
<li>Test for common weaknesses and misconfigurations</li>
<li>Evaluate detection and response capabilities</li>
<li>Provide practical hardening recommendations</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Wireless assessments require specialized knowledge of radio
            protocols, encryption standards, and authentication methods.
            Proper scoping and legal authorization are essential before any
            testing begins.
</p>
</div>
</>
    ),
quiz: {
question: "What makes wireless networks a unique attack surface compared to wired networks?",
options: [
"Wireless signals only work inside the building",
"They can extend beyond physical boundaries",
"Wireless networks are always more secure",
"They require physical access"
      ],
correct: "They can extend beyond physical boundaries",
    },
  },


  // ====================== 02 Wireless Security Fundamentals ======================
  {
id: "wireless-fundamentals",
title: "02 Wireless Security Fundamentals",
content: (
<>
<h2>Wireless Security Fundamentals</h2>
<p>
          Understanding the basic building blocks of Wi-Fi security is required
          before performing effective assessments.
</p>


<h3>Core Concepts</h3>
<ul>
<li>SSID, BSSID, and network discovery</li>
<li>Infrastructure vs ad-hoc modes</li>
<li>Channels, frequency bands (2.4 GHz / 5 GHz / 6 GHz)</li>
<li>Authentication vs encryption</li>
<li>Open, WEP, WPA, WPA2, and WPA3 security modes</li>
<li>Personal (PSK) vs Enterprise (802.1X) authentication</li>
</ul>


<h3>Key Security Building Blocks</h3>
<ul>
<li>Pre-Shared Key (PSK) authentication</li>
<li>802.1X / EAP methods</li>
<li>Four-way handshake</li>
<li>Management frame protection</li>
<li>Protected Management Frames (PMF)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Solid fundamentals enable accurate identification of weak
            configurations and realistic evaluation of attack feasibility.
</p>
</div>
</>
    ),
quiz: {
question: "What is the difference between Personal (PSK) and Enterprise (802.1X) authentication?",
options: [
"PSK is always used on enterprise networks",
"Enterprise uses 802.1X / EAP while PSK uses a shared key",
"Enterprise is weaker than PSK",
"Only PSK supports WPA3"
      ],
correct: "Enterprise uses 802.1X / EAP while PSK uses a shared key",
    },
  },


  // ====================== 03 Wireless Reconnaissance & Discovery ======================
  {
id: "reconnaissance",
title: "03 Wireless Reconnaissance & Discovery",
content: (
<>
<h2>Wireless Reconnaissance & Discovery</h2>
<p>
          The first phase of any wireless assessment is discovering networks,
          access points, and clients within the authorized scope.
</p>


<h3>Discovery Activities</h3>
<ul>
<li>Passive and active network scanning</li>
<li>Identification of SSIDs and hidden networks</li>
<li>Mapping of access points and their capabilities</li>
<li>Client device discovery and association patterns</li>
<li>Channel usage and signal strength analysis</li>
</ul>


<h3>Important Considerations</h3>
<ul>
<li>Stay strictly within geographic and technical scope</li>
<li>Respect legal restrictions on radio transmission</li>
<li>Document all discovered networks and devices</li>
<li>Note security modes and configuration details</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Thorough discovery provides the foundation for the rest of the
            assessment. Accurate inventory of networks and their security
            posture drives prioritization.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first phase of any wireless assessment?",
options: [
"Testing encryption weaknesses",
"Wireless reconnaissance and discovery",
"Performing PSK attacks",
"Reviewing hardening recommendations"
      ],
correct: "Wireless reconnaissance and discovery",
    },
  },


  // ====================== 04 Encryption & Authentication Weaknesses ======================
  {
id: "encryption-weaknesses",
title: "04 Encryption & Authentication Weaknesses",
content: (
<>
<h2>Encryption & Authentication Weaknesses</h2>
<p>
          Many wireless attacks succeed because of weak or outdated encryption
          and authentication mechanisms.
</p>


<h3>Legacy and Weak Configurations</h3>
<ul>
<li>Open (unencrypted) networks</li>
<li>WEP (completely broken and should never be used)</li>
<li>WPA with weak PSK or TKIP</li>
<li>WPA2-PSK with weak or guessable passphrases</li>
<li>Missing or weak Enterprise authentication</li>
</ul>


<h3>Modern Considerations</h3>
<ul>
<li>WPA3 improvements and remaining limitations</li>
<li>Transition mode risks (WPA2/WPA3 mixed)</li>
<li>PMF (Protected Management Frames) enforcement</li>
<li>Weak EAP method selection in Enterprise environments</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Encryption and authentication strength remain the most important
            factors in wireless security. Legacy protocols and weak passphrases
            continue to appear in real-world assessments.
</p>
</div>
</>
    ),
quiz: {
question: "Which wireless security protocol is completely broken and should never be used?",
options: [
"WPA3",
"WEP",
"WPA2",
"Enterprise (802.1X)"
      ],
correct: "WEP",
    },
  },


  // ====================== 05 PSK & Handshake Attacks ======================
  {
id: "psk-attacks",
title: "05 PSK & Handshake Attacks",
content: (
<>
<h2>PSK & Handshake Attacks</h2>
<p>
          Pre-Shared Key networks are common in smaller environments and guest
          networks. Understanding how handshakes work and where weaknesses
          exist is essential.
</p>


<h3>Key Concepts</h3>
<ul>
<li>Four-way handshake capture</li>
<li>Offline dictionary and brute-force attacks against weak PSKs</li>
<li>PMKID-based attacks</li>
<li>Impact of passphrase complexity and length</li>
<li>Client probing and preferred network lists</li>
</ul>


<h3>Assessment Focus</h3>
<ul>
<li>Identify networks using PSK authentication</li>
<li>Evaluate passphrase strength policies</li>
<li>Test for capture opportunities within scope</li>
<li>Assess the realistic feasibility of offline attacks</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            PSK networks are only as strong as their passphrases. Weak or
            reused passphrases remain one of the most common findings in
            wireless assessments.
</p>
</div>
</>
    ),
quiz: {
question: "What is captured during a PSK handshake attack?",
options: [
"The full WPA3 handshake",
"The four-way handshake",
"Only the RADIUS server",
"The client certificate"
      ],
correct: "The four-way handshake",
    },
  },


  // ====================== 06 Enterprise (802.1X) Attacks ======================
  {
id: "enterprise-attacks",
title: "06 Enterprise (802.1X) Attacks",
content: (
<>
<h2>Enterprise (802.1X) Attacks</h2>
<p>
          Enterprise wireless deployments using 802.1X / EAP are generally
          stronger than PSK, but misconfigurations and weak EAP methods can
          still create significant risk.
</p>


<h3>Common Issues</h3>
<ul>
<li>Weak or legacy EAP methods</li>
<li>Missing certificate validation on clients</li>
<li>Improper RADIUS configuration</li>
<li>Overly permissive network access after authentication</li>
<li>Lack of certificate pinning or proper trust stores</li>
</ul>


<h3>Assessment Activities</h3>
<ul>
<li>Identify EAP methods in use</li>
<li>Evaluate client certificate validation behavior</li>
<li>Test for evil-twin and credential harvesting potential (within scope)</li>
<li>Review network segmentation after successful authentication</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Enterprise wireless security depends heavily on correct EAP method
            selection and strict client-side certificate validation. These areas
            deserve careful attention during assessments.
</p>
</div>
</>
    ),
quiz: {
question: "Which common issue in Enterprise wireless is highlighted as risky?",
options: [
"Using WPA3-PSK",
"Missing certificate validation on clients",
"Using strong EAP methods",
"Proper RADIUS configuration"
      ],
correct: "Missing certificate validation on clients",
    },
  },


  // ====================== 07 Evil Twin & Rogue Access Points ======================
  {
id: "evil-twin-rogue",
title: "07 Evil Twin & Rogue Access Points",
content: (
<>
<h2>Evil Twin & Rogue Access Points</h2>
<p>
          Rogue and evil-twin access points attempt to impersonate legitimate
          networks in order to capture credentials or intercept traffic.
</p>


<h3>Attack Concepts</h3>
<ul>
<li>Creation of look-alike SSIDs</li>
<li>Karma / probe-response attacks</li>
<li>Captive portal credential harvesting</li>
<li>Man-in-the-middle opportunities</li>
<li>Detection challenges for end users</li>
</ul>


<h3>Defensive Considerations</h3>
<ul>
<li>Wireless intrusion detection / prevention systems</li>
<li>Client-side validation of network authenticity</li>
<li>Certificate-based authentication</li>
<li>User awareness and reporting processes</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Evil-twin style attacks remain effective against users and networks
            that lack strong authentication and client validation. Testing these
            scenarios (when authorized) reveals important detection gaps.
</p>
</div>
</>
    ),
quiz: {
question: "What is a key defensive consideration against evil twin attacks?",
options: [
"Client-side validation of network authenticity",
"Using open networks only",
"Never using WPA3",
"Skipping segmentation"
      ],
correct: "Client-side validation of network authenticity",
    },
  },


  // ====================== 08 Client-Side & Management Frame Attacks ======================
  {
id: "client-attacks",
title: "08 Client-Side & Management Frame Attacks",
content: (
<>
<h2>Client-Side & Management Frame Attacks</h2>
<p>
          Wireless clients and management frames present additional attack
          surfaces beyond the access point itself.
</p>


<h3>Relevant Techniques</h3>
<ul>
<li>Deauthentication and disassociation attacks</li>
<li>Client probing behavior and preferred network lists</li>
<li>Management frame spoofing</li>
<li>Attacks against unprotected management frames</li>
<li>Impact of missing PMF (Protected Management Frames)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Clients often trust networks too readily and management frames have
            historically lacked protection. Modern standards improve this, but
            many environments still lack full enforcement.
</p>
</div>
</>
    ),
quiz: {
question: "What attack is possible when Protected Management Frames (PMF) are missing?",
options: [
"Client probing only",
"Management frame spoofing",
"Only deauthentication",
"Only segmentation testing"
      ],
correct: "Management frame spoofing",
    },
  },


  // ====================== 09 Segmentation & Guest Network Isolation ======================
  {
id: "segmentation-isolation",
title: "09 Segmentation & Guest Network Isolation",
content: (
<>
<h2>Segmentation & Guest Network Isolation</h2>
<p>
          Even when authentication is strong, poor network segmentation can
          allow an attacker who gains wireless access to reach sensitive
          internal resources.
</p>


<h3>Assessment Focus</h3>
<ul>
<li>Guest network isolation effectiveness</li>
<li>VLAN and firewall restrictions</li>
<li>Access to internal services from wireless segments</li>
<li>Ability to reach management interfaces</li>
<li>Lateral movement potential after wireless access</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Wireless access should not automatically equal internal network
            access. Strong segmentation and isolation are critical compensating
            controls.
</p>
</div>
</>
    ),
quiz: {
question: "What is a key compensating control against lateral movement after wireless access?",
options: [
"Using open networks",
"Strong segmentation and isolation",
"Skipping authentication",
"Using legacy WEP"
      ],
correct: "Strong segmentation and isolation",
    },
  },


  // ====================== 10 Detection & Monitoring ======================
  {
id: "detection-monitoring",
title: "10 Detection & Monitoring",
content: (
<>
<h2>Detection & Monitoring</h2>
<p>
          Many wireless attacks generate detectable signals. Understanding what
          can be detected helps both offensive testing and defensive
          recommendations.
</p>


<h3>Detection Opportunities</h3>
<ul>
<li>Rogue access point detection</li>
<li>Deauthentication flood detection</li>
<li>Unusual client behavior or probe patterns</li>
<li>Evil-twin and spoofing indicators</li>
<li>Wireless intrusion detection systems (WIDS/WIPS)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Effective wireless defense includes continuous monitoring and the
            ability to detect common attack patterns. Test detection capability
            as part of the assessment when possible.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common detection opportunity in wireless assessments?",
options: [
"Only using WPA3",
"Rogue access point detection",
"Always using open networks",
"Skipping monitoring"
      ],
correct: "Rogue access point detection",
    },
  },


  // ====================== 11 Hardening & Best Practices ======================
  {
id: "hardening",
title: "11 Hardening & Best Practices",
content: (
<>
<h2>Hardening & Best Practices</h2>
<p>
          Strong wireless security is achieved through a combination of modern
          protocols, correct configuration, and supporting controls.
</p>


<h3>Key Recommendations</h3>
<ul>
<li>Use WPA3 where supported; avoid legacy protocols</li>
<li>Enforce strong passphrases or Enterprise authentication</li>
<li>Enable Protected Management Frames</li>
<li>Implement proper client certificate validation</li>
<li>Segment wireless networks from sensitive internal resources</li>
<li>Deploy wireless intrusion detection where appropriate</li>
<li>Regularly review and update wireless configurations</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Most wireless risk can be significantly reduced through modern
            protocol use, strong authentication, and proper network
            segmentation.
</p>
</div>
</>
    ),
quiz: {
question: "What is a recommended hardening step for wireless networks?",
options: [
"Using WEP only",
"Using WPA3 where supported; avoid legacy protocols",
"Using open networks",
"Skipping segmentation"
      ],
correct: "Using WPA3 where supported; avoid legacy protocols",
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
          A structured approach ensures thorough and professional wireless
          assessments.
</p>


<h3>Recommended Workflow</h3>
<ol>
<li>Confirm legal authorization and precise scope</li>
<li>Perform passive and active discovery</li>
<li>Inventory networks, security modes, and clients</li>
<li>Evaluate encryption and authentication strength</li>
<li>Test for common weaknesses within authorized boundaries</li>
<li>Assess segmentation and post-access reachability</li>
<li>Evaluate detection capabilities when in scope</li>
<li>Document findings with clear risk and remediation guidance</li>
</ol>


<h3>Professional Guidelines</h3>
<ul>
<li>Never test networks outside the agreed scope</li>
<li>Minimize disruption to legitimate users</li>
<li>Coordinate high-impact tests with the client</li>
<li>Respect local radio regulations</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Successful wireless assessments combine technical knowledge,
            disciplined methodology, and strict adherence to scope and legal
            requirements. Focus on realistic risk and practical hardening
            advice.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first recommended step in the wireless assessment methodology?",
options: [
"Test for weaknesses",
"Confirm legal authorization and precise scope",
"Start with detection monitoring",
"Perform hardening recommendations"
      ],
correct: "Confirm legal authorization and precise scope",
    },
  },
];


const WirelessNetworkAttacks = () => {
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
<span className="gradient-text">Wireless Network Attacks</span>
</h1>
<p className="article-date">Interactive Deep Course • 2026</p>
</div>
</section>


<section className="article-banner">
<img
src="https://plain-apac-prod-public.komododecks.com/202610/03/bZ1cv3KbnERSesiLZrWK/image.png"
alt="Wireless Network Attacks"
onError={(e) => {
e.target.src =
"https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Wireless+Network+Attacks";
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


export default WirelessNetworkAttacks;