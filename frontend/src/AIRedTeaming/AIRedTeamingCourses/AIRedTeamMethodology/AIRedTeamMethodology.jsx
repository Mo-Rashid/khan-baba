import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AIRedTeamMethodology.css";


const chapters = [
  // ====================== 01 What is AI Red Team Methodology? ======================
  {
id: "what-is-methodology",
title: "01 What is AI Red Team Methodology?",
content: (
<>
<h2>What is AI Red Team Methodology?</h2>
<p>
          AI Red Team Methodology is the structured, repeatable process used to
          plan, execute, and report offensive security assessments against AI
          systems — including Large Language Models, agents, RAG pipelines, and
          safety controls.
</p>
<p>
          A strong methodology ensures that assessments are thorough, ethical,
          consistent, and valuable to the organization being tested.
</p>


<h3>Why Methodology Matters</h3>
<ul>
<li>Prevents ad-hoc and incomplete testing</li>
<li>Ensures coverage of critical AI-specific risks</li>
<li>Produces comparable and actionable results</li>
<li>Supports professional reporting and governance</li>
<li>Enables continuous improvement of both offense and defense</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Methodology turns individual techniques into a professional service.
            It is what separates skilled practitioners from random prompt
            experiments.
</p>
</div>
</>
    ),
quiz: {
question: "What is the primary benefit of following a structured AI Red Team Methodology?",
options: [
"To make the engagement shorter",
"A structured, repeatable process that ensures thorough, ethical, and consistent assessments",
"Only to save time",
"To avoid any planning"
      ],
correct: "A structured, repeatable process that ensures thorough, ethical, and consistent assessments",
    },
  },


  // ====================== 02 AI Red Team Engagement Lifecycle ======================
  {
id: "engagement-lifecycle",
title: "02 AI Red Team Engagement Lifecycle",
content: (
<>
<h2>AI Red Team Engagement Lifecycle</h2>
<p>
          A complete AI Red Team engagement follows a clear lifecycle from
          scoping to continuous improvement.
</p>


<h3>Main Phases</h3>
<ol>
<li>Scoping & Rules of Engagement</li>
<li>Threat Modeling & Reconnaissance</li>
<li>Test Planning & Scenario Design</li>
<li>Execution (Attack Simulation)</li>
<li>Impact Analysis & Validation</li>
<li>Reporting & Recommendations</li>
<li>Remediation Support & Retesting</li>
<li>Continuous Testing Program Design</li>
</ol>


<div className="info-box">
<h4>Summary</h4>
<p>
            Treating AI Red Teaming as a full lifecycle (not just “try some
            prompts”) produces far higher value for clients and organizations.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first phase in the standard AI Red Team Engagement Lifecycle?",
options: [
"Continuous Testing Program Design",
"Scoping & Rules of Engagement",
"Impact Analysis & Validation",
"Reporting & Recommendations"
      ],
correct: "Scoping & Rules of Engagement",
    },
  },


  // ====================== 03 Scoping AI Red Team Engagements ======================
  {
id: "scoping",
title: "03 Scoping AI Red Team Engagements",
content: (
<>
<h2>Scoping AI Red Team Engagements</h2>
<p>
          Clear scoping is the foundation of a successful and safe engagement.
</p>


<h3>Key Scoping Questions</h3>
<ul>
<li>Which models, applications, and agents are in scope?</li>
<li>Are tools, RAG systems, and external data sources included?</li>
<li>What environments (production, staging, dedicated lab)?</li>
<li>Are social engineering or multi-turn user simulation allowed?</li>
<li>What is explicitly out of scope?</li>
<li>What are the success criteria and primary risk concerns?</li>
</ul>


<h3>Deliverables of the Scoping Phase</h3>
<ul>
<li>Written Rules of Engagement</li>
<li>Asset and system inventory</li>
<li>Approved testing windows and contacts</li>
<li>Risk acceptance and escalation paths</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Never begin technical testing without clear, written scope and Rules
            of Engagement. This protects both the tester and the client.
</p>
</div>
</>
    ),
quiz: {
question: "Which of the following is NOT a key scoping question?",
options: [
"Which models, applications, and agents are in scope?",
"Are tools, RAG systems, and external data sources included?",
"What is the primary goal of the assessment?",
"Does the model support voice input?"
      ],
correct: "Does the model support voice input?",
    },
  },


  // ====================== 04 Rules of Engagement (RoE) ======================
  {
id: "rules-of-engagement",
title: "04 Rules of Engagement (RoE)",
content: (
<>
<h2>Rules of Engagement (RoE)</h2>
<p>
          The Rules of Engagement define the boundaries, permissions, and
          constraints of the assessment.
</p>


<h3>Essential RoE Elements</h3>
<ul>
<li>Authorized targets and techniques</li>
<li>Prohibited actions (e.g., destructive testing, real data exfiltration)</li>
<li>Testing schedule and blackout periods</li>
<li>Emergency contacts and stop conditions</li>
<li>Handling of sensitive findings</li>
<li>Data retention and destruction requirements</li>
<li>Communication and reporting cadence</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Strong RoE documents prevent misunderstandings and ensure the
            engagement remains professional and controlled.
</p>
</div>
</>
    ),
quiz: {
question: "What is one essential element that must be included in a Rules of Engagement document?",
options: [
"Only the tester's name",
"Testing schedule and blackout periods",
"Only the report format",
"Only the budget"
      ],
correct: "Testing schedule and blackout periods",
    },
  },


  // ====================== 05 Threat Modeling for AI Systems ======================
  {
id: "threat-modeling-phase",
title: "05 Threat Modeling for AI Systems",
content: (
<>
<h2>Threat Modeling for AI Systems</h2>
<p>
          Before attacking, the team must understand how the system can fail and
          what an adversary would want to achieve.
</p>


<h3>Threat Modeling Activities</h3>
<ul>
<li>Map data flows, trust boundaries, and components</li>
<li>Identify high-value assets (data, tools, model, reputation)</li>
<li>Define relevant threat actors and motivations</li>
<li>List realistic attack paths (injection → tool abuse, etc.)</li>
<li>Prioritize scenarios by impact and feasibility</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Threat modeling ensures testing effort is focused on the most
            important and realistic risks rather than random techniques.
</p>
</div>
</>
    ),
quiz: {
question: "Which activity is NOT part of threat modeling for AI systems?",
options: [
"Map data flows, trust boundaries, and components",
"Identify high-value assets",
"Only run automated scanners",
"Prioritize scenarios by impact and feasibility"
      ],
correct: "Only run automated scanners",
    },
  },


  // ====================== 06 Test Planning & Scenario Design ======================
  {
id: "test-planning",
title: "06 Test Planning & Scenario Design",
content: (
<>
<h2>Test Planning & Scenario Design</h2>
<p>
          Effective testing is planned, not improvised.
</p>


<h3>Planning Activities</h3>
<ul>
<li>Select techniques mapped to the threat model</li>
<li>Design specific attack scenarios and success criteria</li>
<li>Prepare test accounts, canary data, and tooling</li>
<li>Define evidence collection standards</li>
<li>Allocate time across different risk areas</li>
</ul>


<h3>Scenario Examples</h3>
<ul>
<li>Direct and indirect prompt injection paths</li>
<li>Jailbreak reliability against safety controls</li>
<li>Data leakage and system prompt recovery</li>
<li>Tool abuse and privilege escalation</li>
<li>RAG poisoning and cross-user leakage</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Good planning produces broader coverage and higher-quality findings
            than unstructured testing.
</p>
</div>
</>
    ),
quiz: {
question: "Which scenario is commonly used in AI Red Team test planning?",
options: [
"Only testing static website vulnerabilities",
"Direct and indirect prompt injection paths",
"Only physical security testing",
"Only printing the report"
      ],
correct: "Direct and indirect prompt injection paths",
    },
  },


  // ====================== 07 Execution Phase ======================
  {
id: "execution",
title: "07 Execution Phase",
content: (
<>
<h2>Execution Phase</h2>
<p>
          This is where technical attacks are performed within the agreed scope.
</p>


<h3>Execution Best Practices</h3>
<ul>
<li>Start with reconnaissance and low-impact tests</li>
<li>Progress systematically through planned scenarios</li>
<li>Document every attempt (success and failure)</li>
<li>Capture clear evidence (prompts, responses, screenshots, logs)</li>
<li>Escalate carefully and communicate high-impact findings early</li>
<li>Stay strictly within Rules of Engagement</li>
</ul>


<h3>Evidence Standards</h3>
<ul>
<li>Reproducible steps</li>
<li>Timestamps and environment details</li>
<li>Impact demonstration (not just theoretical)</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Disciplined execution and strong evidence collection make findings
            credible and actionable.
</p>
</div>
</>
    ),
quiz: {
question: "What is the recommended first step in the Execution Phase?",
options: [
"Start with high-impact tests",
"Start with reconnaissance and low-impact tests",
"Immediately escalate to leadership",
"Skip documentation"
      ],
correct: "Start with reconnaissance and low-impact tests",
    },
  },


  // ====================== 08 Impact Analysis & Validation ======================
  {
id: "impact-analysis",
title: "08 Impact Analysis & Validation",
content: (
<>
<h2>Impact Analysis & Validation</h2>
<p>
          Not every successful technique is equally important. Impact analysis
          determines real business risk.
</p>


<h3>Key Questions</h3>
<ul>
<li>What could an attacker actually achieve?</li>
<li>How reliable and repeatable is the attack?</li>
<li>What data or actions are exposed?</li>
<li>Are there compensating controls that reduce impact?</li>
<li>What is the realistic likelihood in production?</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Always validate and contextualize findings. A clever trick with no
            real impact should not be rated the same as a high-severity risk.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first key question in Impact Analysis & Validation?",
options: [
"How reliable is the attack?",
"What could an attacker actually achieve?",
"What is the report format?",
"What tools were used?"
      ],
correct: "What could an attacker actually achieve?",
    },
  },


  // ====================== 09 Professional Reporting ======================
  {
id: "reporting",
title: "09 Professional Reporting",
content: (
<>
<h2>Professional Reporting</h2>
<p>
          The report is the primary deliverable of an AI Red Team engagement.
</p>


<h3>Recommended Report Structure</h3>
<ul>
<li>Executive Summary</li>
<li>Scope and Methodology</li>
<li>Key Findings (prioritized)</li>
<li>Detailed Technical Findings with evidence</li>
<li>Risk ratings and business impact</li>
<li>Remediation recommendations</li>
<li>Strategic / governance recommendations</li>
<li>Appendices (timelines, full evidence, etc.)</li>
</ul>


<h3>Quality Criteria</h3>
<ul>
<li>Clear, jargon-free language for executives</li>
<li>Precise technical detail for engineers</li>
<li>Actionable and prioritized advice</li>
<li>Honest assessment of residual risk</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Excellent reporting turns technical work into organizational
            decisions and real risk reduction.
</p>
</div>
</>
    ),
quiz: {
question: "Which element is included in the recommended report structure?",
options: [
"Only the tester's name",
"Strategic / governance recommendations",
"Only screenshots",
"Only tool versions"
      ],
correct: "Strategic / governance recommendations",
    },
  },


  // ====================== 10 Remediation Support & Retesting ======================
  {
id: "remediation-support",
title: "10 Remediation Support & Retesting",
content: (
<>
<h2>Remediation Support & Retesting</h2>
<p>
          The engagement does not end when the report is delivered.
</p>


<h3>Post-Report Activities</h3>
<ul>
<li>Clarify findings and answer technical questions</li>
<li>Help prioritize fixes based on risk</li>
<li>Advise on realistic remediation approaches</li>
<li>Perform retesting of fixed issues</li>
<li>Update risk ratings after remediation</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Supporting remediation and verifying fixes significantly increases
            the value of the assessment.
</p>
</div>
</>
    ),
quiz: {
question: "What is one post-report activity included in Remediation Support?",
options: [
"Only printing the report",
"Perform retesting of fixed issues",
"Only collecting screenshots",
"Skipping all follow-up"
      ],
correct: "Perform retesting of fixed issues",
    },
  },


  // ====================== 11 Building a Continuous AI Red Team Program ======================
  {
id: "continuous-program",
title: "11 Building a Continuous AI Red Team Program",
content: (
<>
<h2>Building a Continuous AI Red Team Program</h2>
<p>
          Mature organizations move from one-off assessments to continuous
          testing.
</p>


<h3>Program Elements</h3>
<ul>
<li>Regular scheduled AI Red Team exercises</li>
<li>Automated regression testing of known attacks</li>
<li>Integration with model and application release cycles</li>
<li>Internal skill development and lab environments</li>
<li>Metrics and reporting to leadership</li>
<li>Feedback loops into development and governance</li>
</ul>


<h3>Benefits</h3>
<ul>
<li>Faster detection of new risks</li>
<li>Stronger institutional knowledge</li>
<li>Better alignment between security and AI teams</li>
<li>Continuous improvement of both offense and defense</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Continuous programs turn AI Red Teaming from a periodic project into
            an ongoing organizational capability.
</p>
</div>
</>
    ),
quiz: {
question: "What is one benefit of building a Continuous AI Red Team Program?",
options: [
"Only one-time reporting",
"Faster detection of new risks",
"Skipping all testing",
"Only using manual methods"
      ],
correct: "Faster detection of new risks",
    },
  },


  // ====================== 12 Best Practices & Professional Standards ======================
  {
id: "best-practices",
title: "12 Best Practices & Professional Standards",
content: (
<>
<h2>Best Practices & Professional Standards</h2>
<p>
          High-quality AI Red Teaming follows clear professional standards.
</p>


<h3>Core Best Practices</h3>
<ul>
<li>Always operate within written scope and RoE</li>
<li>Prioritize realistic impact over clever tricks</li>
<li>Document thoroughly and collect strong evidence</li>
<li>Communicate early on critical findings</li>
<li>Provide practical, prioritized remediation advice</li>
<li>Respect privacy and avoid unnecessary harm</li>
<li>Continuously update techniques as the field evolves</li>
</ul>


<h3>Professional Mindset</h3>
<ul>
<li>Curiosity balanced with discipline</li>
<li>Focus on helping the organization improve</li>
<li>Clear and honest communication</li>
<li>Commitment to ethical and legal boundaries</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Professional AI Red Teaming is defined by methodology, impact focus,
            clear communication, and ethical conduct. Mastering the process is
            as important as mastering individual techniques.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first core best practice listed?",
options: [
"Respect privacy",
"Always operate within written scope and RoE",
"Prioritize clever tricks",
"Skip documentation"
      ],
correct: "Always operate within written scope and RoE",
    },
  },
];


const AIRedTeamMethodology = () => {
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
<Link to="/ai-red-teaming" className="back-link">
            ← Back to AI Red Teaming Courses
</Link>
<h1>
            The ultimate guide to{" "}
<span className="gradient-text">AI Red Team Methodology</span>
</h1>
<p className="article-date">Interactive Deep Course • 2026</p>
</div>
</section>


<section className="article-banner">
<img
src="https://plain-apac-prod-public.komododecks.com/202610/03/5m5cXJ6DX9RDGib2GQ9N/image.png"
alt="AI Red Team Methodology"
onError={(e) => {
e.target.src =
"https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=AI+Red+Team+Methodology";
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


export default AIRedTeamMethodology;