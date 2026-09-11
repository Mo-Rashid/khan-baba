import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./EnumerationTechniques.css";

/* =========================================================
   VulnXploit — Enumeration Techniques
   Chapters + Quiz + Progress + Congrats
========================================================= */

const STORAGE_KEY = "khansploit_enumeration_course_completed";

const chapters = [
  // ====================== 01 ======================
  {
    id: "what-is-enumeration",
    title: "01 What is Enumeration?",
    content: (
      <>
        <h2>What is Enumeration?</h2>
        <p>
          Enumeration is the process of extracting more detailed information
          from systems and services that have already been discovered during
          scanning. It moves beyond “what is open” to “what can we learn about
          users, shares, services, and configurations.”
        </p>
        <p>
          In professional ethical hacking and authorized penetration testing,
          enumeration is performed only against approved targets and strictly
          within the rules of engagement. The goal is not to “break in,” but to
          build an accurate picture of the environment so risk can be explained
          clearly to the client.
        </p>
        <p>
          Enumeration sits between discovery and deeper testing. After
          reconnaissance and scanning identify live hosts and services,
          enumeration asks more precise questions: Which accounts might exist?
          Which resources are shared? What configuration details are exposed by
          design or by mistake?
        </p>
        <h3>Primary Goals</h3>
        <ul>
          <li>Gather detailed service and system information</li>
          <li>Identify users, groups, and shares where relevant and authorized</li>
          <li>Understand service configurations at a high level</li>
          <li>Support prioritization of later testing activities</li>
          <li>Remain strictly inside the approved scope</li>
          <li>Produce evidence that strengthens professional reporting</li>
        </ul>
        <h3>Relationship to Other Phases</h3>
        <ul>
          <li>Follows reconnaissance and scanning</li>
          <li>Feeds into vulnerability analysis and controlled testing</li>
          <li>Produces information that improves report quality</li>
          <li>Helps avoid blind testing and unnecessary noise</li>
        </ul>
        <h3>Why Enumeration Matters</h3>
        <ul>
          <li>It turns surface discoveries into actionable understanding</li>
          <li>It highlights exposure that pure port lists do not show</li>
          <li>It supports realistic prioritization of effort</li>
          <li>It helps clients understand identity and data exposure risk</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Enumeration deepens understanding of discovered systems. It must
            always be authorized, controlled, carefully documented, and tied to
            clear security outcomes rather than raw data collection.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Where does enumeration typically sit in a professional testing methodology?",
      options: [
        "Before any reconnaissance is performed",
        "After scanning, to extract richer detail from discovered services",
        "Only after full exploitation is complete",
        "Only during final report writing",
      ],
      correct:
        "After scanning, to extract richer detail from discovered services",
    },
  },

  // ====================== 02 ======================
  {
    id: "enumeration-vs-scanning",
    title: "02 Enumeration vs Scanning",
    content: (
      <>
        <h2>Enumeration vs Scanning</h2>
        <p>
          Scanning and enumeration are closely related but serve different
          purposes. Understanding the distinction improves methodology,
          communication with clients, and reporting clarity.
        </p>
        <p>
          Scanning is primarily about reachability and surface identification.
          Enumeration is about depth: learning more from services that are
          already known to be present and in scope.
        </p>
        <h3>Scanning Focus</h3>
        <ul>
          <li>Discover live hosts</li>
          <li>Identify open, closed, or filtered ports</li>
          <li>Obtain basic service banners or version hints</li>
          <li>Build an initial map of the network surface</li>
        </ul>
        <h3>Enumeration Focus</h3>
        <ul>
          <li>Extract richer details from identified services</li>
          <li>Learn about users, shares, directories, or configurations</li>
          <li>Build a clearer picture of how systems are set up</li>
          <li>Support later vulnerability and exposure analysis</li>
        </ul>
        <h3>Practical Difference</h3>
        <ul>
          <li>Scanning answers “what is reachable?”</li>
          <li>Enumeration answers “what can we learn from what is reachable?”</li>
          <li>Both must stay within scope and authorization</li>
          <li>Both should be documented with enough context for the report</li>
        </ul>
        <h3>Common Confusion</h3>
        <p>
          Teams sometimes label all active discovery as “scanning.” In reports,
          separating scan results from enumeration findings makes it easier for
          readers to see what was merely open versus what information was
          actually exposed.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Scanning finds the doors. Enumeration tries to learn more about what
            is behind those doors — always with permission and with a purpose.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Which statement best describes the practical difference between scanning and enumeration?",
      options: [
        "Scanning always requires credentials; enumeration never does",
        "Scanning asks what is reachable; enumeration asks what can be learned from reachable services",
        "Enumeration only happens on web applications",
        "Scanning and enumeration are identical activities",
      ],
      correct:
        "Scanning asks what is reachable; enumeration asks what can be learned from reachable services",
    },
  },

  // ====================== 03 ======================
  {
    id: "common-targets",
    title: "03 Common Enumeration Targets",
    content: (
      <>
        <h2>Common Enumeration Targets</h2>
        <p>
          Enumeration efforts usually focus on services and protocols that can
          reveal useful structural information about the environment. Targets
          are chosen from scan results and constrained by the rules of
          engagement.
        </p>
        <p>
          Not every open port deserves the same depth of attention. Professionals
          prioritize services that historically expose identity data, shared
          resources, configuration details, or management interfaces.
        </p>
        <h3>Frequently Examined Areas</h3>
        <ul>
          <li>User and account related information</li>
          <li>Network shares and accessible resources</li>
          <li>Directory and naming services</li>
          <li>Service configuration details</li>
          <li>System and software information exposed by services</li>
          <li>Remote management and administration interfaces</li>
        </ul>
        <h3>Examples of Service Categories</h3>
        <ul>
          <li>Windows-related services (where in scope)</li>
          <li>Directory services</li>
          <li>File sharing services</li>
          <li>Remote management interfaces</li>
          <li>Network management protocols</li>
          <li>Application-specific APIs and admin panels (authorized only)</li>
        </ul>
        <h3>Prioritization Tips</h3>
        <ul>
          <li>Start with services that expose identity or data structure</li>
          <li>Prefer high-confidence, low-noise techniques</li>
          <li>Re-check scope before touching sensitive systems</li>
          <li>Record why a target was selected</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Enumeration targets are driven by what was discovered during scanning
            and by what the rules of engagement allow. Focus beats volume.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should primarily drive the choice of enumeration targets?",
      options: [
        "Random selection of any IP on the internet",
        "Scan results combined with rules of engagement and authorization",
        "Only the newest tools available",
        "Social media mentions of the company",
      ],
      correct:
        "Scan results combined with rules of engagement and authorization",
    },
  },

  // ====================== 04 ======================
  {
    id: "user-and-group-info",
    title: "04 User & Group Information",
    content: (
      <>
        <h2>User & Group Information</h2>
        <p>
          In many environments, services can reveal information about user
          accounts, groups, or naming conventions. This information can support
          understanding of the identity landscape when collection is authorized.
        </p>
        <p>
          Identity data is sensitive. Even a username list can assist further
          attacks if it leaves the authorized testing context. Treat it as
          confidential client information.
        </p>
        <h3>What Analysts May Look For</h3>
        <ul>
          <li>Valid usernames or account naming patterns</li>
          <li>Group membership clues</li>
          <li>Service or machine account indicators</li>
          <li>Publicly exposed identity-related details</li>
          <li>Consistency of naming conventions across systems</li>
        </ul>
        <h3>Professional Considerations</h3>
        <ul>
          <li>Only collect what is authorized</li>
          <li>Handle identity data carefully and confidentially</li>
          <li>Do not assume every discovered name is an active account</li>
          <li>Document sources and confidence levels</li>
          <li>Avoid unnecessary bulk extraction of personal data</li>
        </ul>
        <h3>Reporting Notes</h3>
        <ul>
          <li>Explain why the exposure matters</li>
          <li>Separate confirmed accounts from guessed patterns</li>
          <li>Recommend least-privilege and reduced exposure where relevant</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Identity-related information is sensitive. Collect it only within
            scope and treat it with appropriate care in notes and reports.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Why must identity-related enumeration findings be handled carefully?",
      options: [
        "Because usernames are never useful",
        "Because identity data is sensitive and may assist further abuse if mishandled",
        "Because reports should never mention accounts",
        "Because enumeration is illegal even when authorized",
      ],
      correct:
        "Because identity data is sensitive and may assist further abuse if mishandled",
    },
  },

  // ====================== 05 ======================
  {
    id: "shares-and-resources",
    title: "05 Shares & Network Resources",
    content: (
      <>
        <h2>Shares & Network Resources</h2>
        <p>
          File shares and shared resources can reveal how data is organized and
          whether access controls appear appropriately restricted. In authorized
          assessments, the focus is exposure and control quality — not browsing
          private content without need.
        </p>
        <h3>High-Level Goals</h3>
        <ul>
          <li>Identify accessible shares or resources</li>
          <li>Understand naming and organizational patterns</li>
          <li>Note any resources that appear overly permissive</li>
          <li>Support later risk discussion around data exposure</li>
        </ul>
        <h3>Important Boundaries</h3>
        <ul>
          <li>Do not access content beyond what is authorized</li>
          <li>Respect sensitivity of any discovered data</li>
          <li>Report potential exposure issues clearly and responsibly</li>
          <li>Minimize handling of regulated or personal information</li>
        </ul>
        <h3>Risk Angle</h3>
        <ul>
          <li>Open shares may expose business documents or credentials</li>
          <li>Overly broad permissions increase insider and external risk</li>
          <li>Findings should connect to business impact when possible</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Share and resource enumeration helps map data exposure risk. Stay
            inside authorization and prioritize responsible handling of findings.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What is an important boundary when enumerating shares and network resources?",
      options: [
        "Always download every file for completeness",
        "Do not access content beyond what is authorized",
        "Ignore permissions entirely",
        "Only test shares on production payment systems without approval",
      ],
      correct: "Do not access content beyond what is authorized",
    },
  },

  // ====================== 06 ======================
  {
    id: "directory-services",
    title: "06 Directory Services Concepts",
    content: (
      <>
        <h2>Directory Services Concepts</h2>
        <p>
          Directory services store and organize information about users, systems,
          and resources. They are central to many enterprise environments and
          often become high-value information sources during authorized testing.
        </p>
        <h3>Why Directory Services Matter</h3>
        <ul>
          <li>They often contain identity and structure information</li>
          <li>Misconfigurations can lead to excessive information exposure</li>
          <li>Understanding directory structure supports realistic assessment</li>
          <li>They influence authentication and authorization design</li>
        </ul>
        <h3>High-Level Focus Areas</h3>
        <ul>
          <li>What information is publicly or broadly readable</li>
          <li>How naming and organization are structured</li>
          <li>Whether sensitive attributes appear exposed</li>
          <li>Alignment with least-privilege principles</li>
        </ul>
        <h3>Professional Caution</h3>
        <ul>
          <li>Directory data can be extensive — collect only what is needed</li>
          <li>Confirm scope for directory-related testing</li>
          <li>Protect exports and notes containing identity data</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Directory services are high-value information sources. Enumeration
            here must be careful, authorized, and focused on security-relevant
            exposure.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Why are directory services often considered high-value during authorized enumeration?",
      options: [
        "Because they never contain sensitive data",
        "Because they often store identity and structural information about the environment",
        "Because they replace the need for scanning",
        "Because they are always internet-facing",
      ],
      correct:
        "Because they often store identity and structural information about the environment",
    },
  },

  // ====================== 07 ======================
  {
    id: "service-specific",
    title: "07 Service-Specific Enumeration Concepts",
    content: (
      <>
        <h2>Service-Specific Enumeration Concepts</h2>
        <p>
          Different services expose different kinds of information. Effective
          enumeration adapts to the service type while remaining within scope
          and minimizing unnecessary impact.
        </p>
        <h3>General Approach</h3>
        <ul>
          <li>Identify the service and its expected behavior</li>
          <li>Determine what information it legitimately exposes</li>
          <li>Look for excessive or unexpected detail</li>
          <li>Record findings with context and evidence</li>
          <li>Stop or escalate if unexpected sensitive exposure occurs</li>
        </ul>
        <h3>Examples of Service Categories</h3>
        <ul>
          <li>Remote access and management services</li>
          <li>File and print services</li>
          <li>Directory and authentication related services</li>
          <li>Network management and monitoring services</li>
          <li>Application-specific interfaces</li>
        </ul>
        <h3>Quality Over Noise</h3>
        <ul>
          <li>Prefer techniques that yield clear, reportable evidence</li>
          <li>Avoid flooding services with aggressive queries</li>
          <li>Note version and configuration clues when available</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Service-specific enumeration requires understanding what normal
            behavior looks like so that unusual exposure can be recognized and
            reported responsibly.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What is a key part of a professional service-specific enumeration approach?",
      options: [
        "Run every tool at maximum aggression by default",
        "Identify the service, expected behavior, and any excessive exposure within scope",
        "Ignore documentation of findings",
        "Enumerate only systems outside the contract",
      ],
      correct:
        "Identify the service, expected behavior, and any excessive exposure within scope",
    },
  },

  // ====================== 08 ======================
  {
    id: "information-value",
    title: "08 Evaluating Information Value",
    content: (
      <>
        <h2>Evaluating Information Value</h2>
        <p>
          Not every piece of enumerated data is equally useful. Professionals
          evaluate findings based on relevance, sensitivity, confidence, and
          potential impact.
        </p>
        <h3>Questions to Ask</h3>
        <ul>
          <li>Does this information expand the attack surface understanding?</li>
          <li>Is the data sensitive or regulated?</li>
          <li>Does it reveal weak access control or misconfiguration?</li>
          <li>Can it support realistic risk discussion with the client?</li>
          <li>Is the confidence level high enough to report?</li>
        </ul>
        <h3>Avoid Common Mistakes</h3>
        <ul>
          <li>Collecting large volumes of low-value data</li>
          <li>Treating every discovery as critical</li>
          <li>Failing to connect findings to business impact</li>
          <li>Reporting assumptions as confirmed facts</li>
        </ul>
        <h3>Prioritization Mindset</h3>
        <ul>
          <li>Prefer findings that change risk decisions</li>
          <li>Group related observations for clearer narrative</li>
          <li>Drop noise that does not help the client act</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            High-quality enumeration prioritizes meaningful information over
            raw quantity. Value and context matter more than volume.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What should professionals prioritize when evaluating enumerated information?",
      options: [
        "Maximum volume of collected data",
        "Relevance, sensitivity, confidence, and potential impact",
        "Only screenshots without explanation",
        "Findings with no connection to risk",
      ],
      correct: "Relevance, sensitivity, confidence, and potential impact",
    },
  },

  // ====================== 09 ======================
  {
    id: "documentation",
    title: "09 Documentation & Evidence",
    content: (
      <>
        <h2>Documentation & Evidence</h2>
        <p>
          Enumeration findings must be recorded clearly so they can support
          later analysis and professional reporting. Weak notes create weak
          reports.
        </p>
        <h3>What to Capture</h3>
        <ul>
          <li>Target and service involved</li>
          <li>Method used (at a high level)</li>
          <li>Information obtained</li>
          <li>Timestamp and conditions</li>
          <li>Confidence level and supporting evidence</li>
        </ul>
        <h3>Good Practices</h3>
        <ul>
          <li>Separate facts from assumptions</li>
          <li>Store sensitive data securely</li>
          <li>Prepare notes so they transfer cleanly into the report</li>
          <li>Record both positive findings and relevant negative results</li>
          <li>Keep evidence retrievable for quality review</li>
        </ul>
        <h3>Evidence Hygiene</h3>
        <ul>
          <li>Minimize copies of sensitive extracts</li>
          <li>Label confidence: confirmed vs suspected</li>
          <li>Link each major claim to an artifact when possible</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Clear documentation turns enumeration activity into usable
            professional output. Evidence quality affects report credibility.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Which practice improves the quality of enumeration documentation?",
      options: [
        "Mixing assumptions and facts without labels",
        "Separating facts from assumptions and recording confidence levels",
        "Deleting notes after each day",
        "Only saving tool default output with no context",
      ],
      correct:
        "Separating facts from assumptions and recording confidence levels",
    },
  },

  // ====================== 10 ======================
  {
    id: "risk-and-impact",
    title: "10 Risk & Impact Perspective",
    content: (
      <>
        <h2>Risk & Impact Perspective</h2>
        <p>
          Enumeration findings should be interpreted through a risk lens. The
          goal is not simply to list information, but to explain why it matters
          to the business.
        </p>
        <h3>Risk-Oriented Thinking</h3>
        <ul>
          <li>What could an attacker do with this information?</li>
          <li>Does it reduce the effort required for further attacks?</li>
          <li>Does it expose sensitive or regulated data?</li>
          <li>Does it indicate weak segmentation or access control?</li>
        </ul>
        <h3>Reporting Implications</h3>
        <ul>
          <li>Connect technical findings to potential business impact</li>
          <li>Prioritize issues that enable meaningful risk reduction</li>
          <li>Avoid inflating severity without justification</li>
          <li>Offer practical remediation direction when appropriate</li>
        </ul>
        <h3>Balanced Severity</h3>
        <ul>
          <li>Not every exposed detail is critical</li>
          <li>Context (exposure path, data type, controls) changes severity</li>
          <li>Honest prioritization builds client trust</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Risk-aware interpretation makes enumeration findings useful to
            decision makers, not just technically interesting.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What is the main goal of applying a risk lens to enumeration findings?",
      options: [
        "To list every technical detail without prioritization",
        "To explain why findings matter and support better security decisions",
        "To guarantee exploitation of every host",
        "To avoid writing remediation guidance",
      ],
      correct:
        "To explain why findings matter and support better security decisions",
    },
  },

  // ====================== 11 ======================
  {
    id: "legal-ethical",
    title: "11 Legal & Ethical Boundaries",
    content: (
      <>
        <h2>Legal & Ethical Boundaries</h2>
        <p>
          Enumeration involves direct interaction with systems and can expose
          sensitive information. Authorization and professional ethics are
          mandatory — not optional extras.
        </p>
        <h3>Key Requirements</h3>
        <ul>
          <li>Written authorization covering the targets and activities</li>
          <li>Clear scope and rules of engagement</li>
          <li>Respect for data sensitivity and privacy</li>
          <li>No expansion beyond approved systems or techniques</li>
        </ul>
        <h3>Professional Conduct</h3>
        <ul>
          <li>
            Stop if unexpected impact or sensitive exposure occurs and escalate
            appropriately
          </li>
          <li>Protect all discovered data</li>
          <li>Report findings honestly and responsibly</li>
          <li>Never use enumerated information for unauthorized purposes</li>
        </ul>
        <h3>Trust and Reputation</h3>
        <ul>
          <li>Clients trust testers with sensitive environments</li>
          <li>Ethical failures damage careers and organizations</li>
          <li>Good judgment is part of technical excellence</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Enumeration without authorization is not ethical hacking. Legal
            permission and careful handling of data define professional practice.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "What is required before performing enumeration in a professional engagement?",
      options: [
        "Only verbal permission from a random employee",
        "Written authorization, clear scope, and rules of engagement",
        "No permission if the goal is learning",
        "Public blog posts about the target",
      ],
      correct: "Written authorization, clear scope, and rules of engagement",
    },
  },

  // ====================== 12 ======================
  {
    id: "best-practices",
    title: "12 Best Practices & Mindset",
    content: (
      <>
        <h2>Best Practices & Mindset</h2>
        <p>
          Effective enumeration is focused, careful, and oriented toward
          meaningful security outcomes rather than maximum noise.
        </p>
        <h3>Recommended Practices</h3>
        <ul>
          <li>Confirm scope before deeper interaction</li>
          <li>Prioritize high-value services and information</li>
          <li>Document findings with context and evidence</li>
          <li>Evaluate sensitivity and potential impact</li>
          <li>Communicate significant discoveries early when appropriate</li>
          <li>Keep notes organized for reporting</li>
        </ul>
        <h3>Professional Mindset</h3>
        <ul>
          <li>Curiosity with restraint</li>
          <li>Accuracy over volume</li>
          <li>Risk awareness over pure technical discovery</li>
          <li>Client trust and data protection first</li>
        </ul>
        <h3>Course Takeaway Checklist</h3>
        <ul>
          <li>Know how enumeration differs from scanning</li>
          <li>Choose targets from authorized scan results</li>
          <li>Handle identity and share data carefully</li>
          <li>Document facts, confidence, and impact</li>
          <li>Stay inside legal and ethical boundaries</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Strong enumeration improves the quality of the entire assessment.
            Stay authorized, stay focused, and turn information into clear,
            actionable insight.
          </p>
        </div>
      </>
    ),
    quiz: {
      question:
        "Which mindset best matches professional enumeration practice?",
      options: [
        "Collect everything possible without prioritization",
        "Curiosity with restraint, accuracy over volume, and risk awareness",
        "Ignore scope if findings look interesting",
        "Prefer noise over clear evidence",
      ],
      correct:
        "Curiosity with restraint, accuracy over volume, and risk awareness",
    },
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const EnumerationTechniques = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizError, setQuizError] = useState("");
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

  const handleChapterSelect = (chapter) => {
    setActiveChapter(chapter);
    setSelectedOption("");
    setQuizError("");
  };

  const handleSubmit = () => {
    if (!activeChapter.quiz) return;
    if (!selectedOption) {
      setQuizError("Please select an option first.");
      return;
    }
    if (selectedOption === activeChapter.quiz.correct) {
      setQuizError("");
      setShowCongrats(true);
      if (!completedChapters.includes(activeChapter.id)) {
        setCompletedChapters([...completedChapters, activeChapter.id]);
      }
    } else {
      setQuizError("Wrong answer. Re-read the section and try again.");
    }
  };

  const closeCongrats = () => {
    setShowCongrats(false);
    setSelectedOption("");
    setQuizError("");
  };

  const goNextChapter = () => {
    const idx = chapters.findIndex((c) => c.id === activeChapter.id);
    closeCongrats();
    if (idx >= 0 && idx < chapters.length - 1) {
      handleChapterSelect(chapters[idx + 1]);
    }
  };

  const isLastChapter =
    chapters[chapters.length - 1]?.id === activeChapter.id;

  return (
    <div className="article-page">
      <Navbar />

     <section className="article-header">
             <div className="article-header-content">
               <Link to="/ethical-hacking" className="back-link">
                 ← Back to Ethical Hacking Courses
               </Link>
               <h1>
                 The ultimate guide to{" "}
                 <span className="gradient-text">Footprinting & Reconnaissance</span>
               </h1>
               <p className="article-date">Updated • 2026</p>
               <p className="article-date" style={{ marginTop: 8 }}>
                 Progress: {completedCount}/{totalChapters} chapters · {progress}%
               </p>
             </div>
           </section>

      <section className="article-banner">
        <img
          src="/images/courses/eh-enumeration.png"
          alt="Enumeration Techniques"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=Enumeration+Techniques";
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
                  className={`${
                    activeChapter.id === chapter.id ? "active" : ""
                  } ${
                    completedChapters.includes(chapter.id) ? "completed" : ""
                  }`}
                  onClick={() => handleChapterSelect(chapter)}
                >
                  <span className="chapter-title-text">{chapter.title}</span>
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
                  {activeChapter.quiz.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`quiz-option ${
                        selectedOption === opt ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                          setQuizError("");
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>

                {quizError && <p className="quiz-error">{quizError}</p>}

                <button className="quiz-submit" onClick={handleSubmit}>
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {showCongrats && (
        <div className="congrats-overlay" onClick={closeCongrats}>
          <div
            className="congrats-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="congrats-icon">🎉</div>
            <h2>Congratulations!</h2>
            <p>
              You completed <strong>{activeChapter.title}</strong> successfully.
            </p>
            <p className="congrats-progress">
              Progress: {completedCount}/{totalChapters}
            </p>
            <div className="congrats-actions">
              <button className="congrats-btn secondary" onClick={closeCongrats}>
                Continue Reading
              </button>
              {!isLastChapter && (
                <button className="congrats-btn primary" onClick={goNextChapter}>
                  Next Chapter →
                </button>
              )}
              {isLastChapter && completedCount >= totalChapters && (
                <button className="congrats-btn primary" onClick={closeCongrats}>
                  Course Complete ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnumerationTechniques;