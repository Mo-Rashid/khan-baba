import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AIRiskAssessment.css";


const STORAGE_KEY = "VulnXploit_ai_risk_assessment_course_completed";

const chapters = [
  // ====================== 01 What is AI Risk Assessment? ======================
  {
    id: "what-is-ai-risk",
    title: "01 What is AI Risk Assessment?",
    content: (
      <>
        <h2>What is AI Risk Assessment?</h2>
        <p>
          AI Risk Assessment is the structured process of identifying,
          analyzing, evaluating, and prioritizing risks that arise from the
          development, deployment, and operation of artificial intelligence
          systems — especially Large Language Models and agentic applications.
        </p>
        <p>
          Unlike traditional IT risk assessments, AI risk assessment must account
          for probabilistic behavior, alignment failures, data leakage,
          adversarial manipulation, and the unique ways language models can cause
          harm.
        </p>

        <h3>Core Objectives</h3>
        <ul>
          <li>Identify realistic AI-specific threats and vulnerabilities</li>
          <li>Estimate likelihood and business impact</li>
          <li>Prioritize risks for remediation</li>
          <li>Support governance, compliance, and decision-making</li>
          <li>Create actionable recommendations for engineering and leadership</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            AI Risk Assessment turns technical findings from Red Teaming into
            clear business risk language that organizations can act on.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main difference between traditional IT risk assessments and AI risk assessment?",
      options: [
        "AI risk assessment must account for probabilistic behavior, alignment failures, data leakage, and adversarial manipulation",
        "AI risk assessment only focuses on security",
        "Traditional IT risk assessments are always more important",
        "AI risk assessment never involves business impact"
      ],
      correct: "AI risk assessment must account for probabilistic behavior, alignment failures, data leakage, and adversarial manipulation",
    },
  },

  // ====================== 02 AI Risk Landscape ======================
  {
    id: "risk-landscape",
    title: "02 AI Risk Landscape",
    content: (
      <>
        <h2>AI Risk Landscape</h2>
        <p>
          Modern AI systems introduce both familiar and entirely new categories
          of risk.
        </p>

        <h3>Major Risk Categories</h3>
        <ul>
          <li><strong>Security risks</strong> — Prompt injection, jailbreaks, tool abuse, data leakage</li>
          <li><strong>Safety risks</strong> — Harmful content generation, over-refusal, unsafe advice</li>
          <li><strong>Privacy risks</strong> — Memorization, PII leakage, membership inference</li>
          <li><strong>Operational risks</strong> — Hallucinations, unreliable outputs, cascading failures</li>
          <li><strong>Legal & compliance risks</strong> — Regulatory violations, IP issues, liability</li>
          <li><strong>Reputational risks</strong> — Public incidents, loss of trust</li>
          <li><strong>Ethical & societal risks</strong> — Bias, discrimination, misuse</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            A complete AI risk assessment must cover security, safety, privacy,
            operational reliability, and broader organizational impact.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which risk category is listed as involving harmful content generation, over-refusal, and unsafe advice?",
      options: [
        "Safety risks",
        "Security risks",
        "Operational risks",
        "Reputational risks"
      ],
      correct: "Safety risks",
    },
  },

  // ====================== 03 AI Threat Modeling ======================
  {
    id: "threat-modeling",
    title: "03 AI Threat Modeling",
    content: (
      <>
        <h2>AI Threat Modeling</h2>
        <p>
          Threat modeling for AI systems requires adapting classical methods to
          the unique properties of language models and agents.
        </p>

        <h3>Key Questions</h3>
        <ul>
          <li>What are the assets (data, model, tools, reputation)?</li>
          <li>Who are the threat actors and what are their goals?</li>
          <li>How can untrusted input influence the system?</li>
          <li>What actions can the AI take in the real world?</li>
          <li>Where do trust boundaries exist (or fail to exist)?</li>
        </ul>

        <h3>Useful Frameworks</h3>
        <ul>
          <li>Adapted STRIDE for AI systems</li>
          <li>MITRE ATLAS (Adversarial Threat Landscape for AI Systems)</li>
          <li>OWASP Top 10 for LLM Applications</li>
          <li>Custom AI-specific threat models</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Good threat modeling is the foundation of effective risk assessment.
            It ensures you focus on realistic and high-impact scenarios.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which framework is listed as 'Adversarial Threat Landscape for AI Systems'?",
      options: [
        "MITRE ATLAS",
        "STRIDE",
        "OWASP Top 10",
        "AI RMF"
      ],
      correct: "MITRE ATLAS",
    },
  },

  // ====================== 04 Risk Identification Techniques ======================
  {
    id: "risk-identification",
    title: "04 Risk Identification Techniques",
    content: (
      <>
        <h2>Risk Identification Techniques</h2>
        <p>
          Risks are identified through a combination of technical testing,
          architecture review, and process analysis.
        </p>

        <h3>Primary Sources of Risk Information</h3>
        <ul>
          <li>AI Red Team and penetration test findings</li>
          <li>Architecture and data-flow reviews</li>
          <li>Threat modeling workshops</li>
          <li>Incident history and near-misses</li>
          <li>Vendor and supply-chain assessments</li>
          <li>Regulatory and compliance requirements</li>
        </ul>

        <h3>Practical Techniques</h3>
        <ul>
          <li>Systematic testing of injection, jailbreak, and leakage paths</li>
          <li>Review of tool permissions and agent capabilities</li>
          <li>Analysis of training data and fine-tuning practices</li>
          <li>Evaluation of monitoring and incident response readiness</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Risk identification should be continuous and multi-source. Technical
            testing alone is not enough — process and design issues matter equally.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which source of risk information includes both AI Red Team findings and regulatory requirements?",
      options: [
        "AI Red Team and penetration test findings + Regulatory and compliance requirements",
        "Only threat modeling workshops",
        "Only architecture reviews",
        "Only incident history"
      ],
      correct: "AI Red Team and penetration test findings + Regulatory and compliance requirements",
    },
  },

  // ====================== 05 Assessing Likelihood & Impact ======================
  {
    id: "likelihood-impact",
    title: "05 Assessing Likelihood & Impact",
    content: (
      <>
        <h2>Assessing Likelihood & Impact</h2>
        <p>
          Once risks are identified, they must be evaluated in terms of how
          likely they are to occur and how severe the consequences would be.
        </p>

        <h3>Likelihood Factors</h3>
        <ul>
          <li>Ease of exploitation</li>
          <li>Required attacker skill and resources</li>
          <li>Exposure of the system (public vs internal)</li>
          <li>Existence of known working techniques</li>
          <li>Strength of existing controls</li>
        </ul>

        <h3>Impact Dimensions</h3>
        <ul>
          <li>Confidentiality (data leakage, IP loss)</li>
          <li>Integrity (unauthorized actions, corrupted outputs)</li>
          <li>Availability (DoS via over-refusal or resource abuse)</li>
          <li>Safety (real-world harm from model advice or actions)</li>
          <li>Financial, legal, and reputational damage</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Clear likelihood and impact ratings allow organizations to prioritize
            remediation and allocate resources effectively.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which impact dimension is described as 'real-world harm from model advice or actions'?",
      options: [
        "Safety",
        "Confidentiality",
        "Availability",
        "Integrity"
      ],
      correct: "Safety",
    },
  },

  // ====================== 06 Risk Scoring & Prioritization ======================
  {
    id: "risk-scoring",
    title: "06 Risk Scoring & Prioritization",
    content: (
      <>
        <h2>Risk Scoring & Prioritization</h2>
        <p>
          A consistent scoring method helps compare risks and decide what to fix
          first.
        </p>

        <h3>Common Approaches</h3>
        <ul>
          <li>Qualitative scales (Critical / High / Medium / Low)</li>
          <li>Semi-quantitative matrices (Likelihood × Impact)</li>
          <li>Custom AI risk scoring models</li>
          <li>Mapping to business risk categories</li>
        </ul>

        <h3>Prioritization Principles</h3>
        <ul>
          <li>Address high-likelihood, high-impact risks first</li>
          <li>Consider ease of remediation and residual risk</li>
          <li>Account for compensating controls already in place</li>
          <li>Align with regulatory and contractual deadlines</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Prioritization turns a long list of findings into a clear, actionable
            roadmap for reducing AI risk.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which prioritization principle is listed as 'Consider ease of remediation and residual risk'?",
      options: [
        "Consider ease of remediation and residual risk",
        "Only address high-impact risks",
        "Always map to business risk categories",
        "Focus only on qualitative scales"
      ],
      correct: "Consider ease of remediation and residual risk",
    },
  },

  // ====================== 07 AI Governance Frameworks ======================
  {
    id: "governance-frameworks",
    title: "07 AI Governance Frameworks",
    content: (
      <>
        <h2>AI Governance Frameworks</h2>
        <p>
          Governance provides the policies, roles, and processes that keep AI
          risk management sustainable over time.
        </p>

        <h3>Key Governance Elements</h3>
        <ul>
          <li>Clear ownership of AI systems and risks</li>
          <li>Policies for development, deployment, and monitoring</li>
          <li>Approval gates for high-risk use cases</li>
          <li>Incident response and escalation procedures</li>
          <li>Regular review and audit cycles</li>
        </ul>

        <h3>Relevant Frameworks & Standards</h3>
        <ul>
          <li>NIST AI Risk Management Framework (AI RMF)</li>
          <li>ISO/IEC standards related to AI</li>
          <li>EU AI Act risk categories and obligations</li>
          <li>Internal corporate AI governance policies</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Technical controls are necessary but not sufficient. Strong
            governance ensures that risk management continues after the initial
            assessment.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which framework is listed as 'NIST AI Risk Management Framework (AI RMF)'?",
      options: [
        "NIST AI Risk Management Framework (AI RMF)",
        "STRIDE",
        "MITRE ATLAS",
        "OWASP Top 10"
      ],
      correct: "NIST AI Risk Management Framework (AI RMF)",
    },
  },

  // ====================== 08 Documentation & Risk Reporting ======================
  {
    id: "documentation-reporting",
    title: "08 Documentation & Risk Reporting",
    content: (
      <>
        <h2>Documentation & Risk Reporting</h2>
        <p>
          The value of a risk assessment is largely determined by how clearly
          the results are communicated.
        </p>

        <h3>Effective Risk Reports Include</h3>
        <ul>
          <li>Executive summary with key risks and recommendations</li>
          <li>Detailed findings with evidence and reproduction steps</li>
          <li>Likelihood and impact ratings with justification</li>
          <li>Clear, prioritized remediation advice</li>
          <li>Residual risk after proposed fixes</li>
          <li>Strategic recommendations for governance and process</li>
        </ul>

        <h3>Audience Considerations</h3>
        <ul>
          <li>Technical teams need precise, actionable details</li>
          <li>Leadership needs business impact and prioritization</li>
          <li>Compliance teams need mapping to regulatory requirements</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Good reporting bridges the gap between Red Team findings and
            organizational decision-making.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which audience for risk reports needs mapping to regulatory requirements?",
      options: [
        "Compliance teams",
        "Executive leadership",
        "Engineering teams",
        "Auditors only"
      ],
      correct: "Compliance teams",
    },
  },

  // ====================== 09 Continuous Risk Assessment ======================
  {
    id: "continuous-assessment",
    title: "09 Continuous Risk Assessment",
    content: (
      <>
        <h2>Continuous Risk Assessment</h2>
        <p>
          AI systems change frequently — new models, new tools, new data sources,
          and new attack techniques. Risk assessment must be continuous rather
          than a one-time exercise.
        </p>

        <h3>Triggers for Re-Assessment</h3>
        <ul>
          <li>Major model or system updates</li>
          <li>Addition of new tools or data sources</li>
          <li>Significant changes in usage patterns</li>
          <li>New public attack techniques or incidents</li>
          <li>Regulatory or contractual changes</li>
        </ul>

        <h3>Practical Approaches</h3>
        <ul>
          <li>Scheduled periodic Red Team exercises</li>
          <li>Automated regression testing of known attacks</li>
          <li>Integration of risk checks into development pipelines</li>
          <li>Ongoing monitoring and incident feedback loops</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Treat AI risk assessment as a living process. Static assessments
            quickly become outdated.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which trigger for re-assessment is described as 'New public attack techniques or incidents'?",
      options: [
        "New public attack techniques or incidents",
        "Only major model updates",
        "Only addition of new tools",
        "Only regulatory changes"
      ],
      correct: "New public attack techniques or incidents",
    },
  },

  // ====================== 10 Communicating Risk to Stakeholders ======================
  {
    id: "stakeholder-communication",
    title: "10 Communicating Risk to Stakeholders",
    content: (
      <>
        <h2>Communicating Risk to Stakeholders</h2>
        <p>
          Different stakeholders need different views of the same underlying
          risks.
        </p>

        <h3>Communication Principles</h3>
        <ul>
          <li>Use clear, non-alarmist language</li>
          <li>Connect technical issues to business outcomes</li>
          <li>Provide realistic remediation options and timelines</li>
          <li>Distinguish between theoretical and demonstrated risks</li>
          <li>Highlight both strengths and weaknesses</li>
        </ul>

        <h3>Common Stakeholder Groups</h3>
        <ul>
          <li>Engineering and product teams</li>
          <li>Security and risk management</li>
          <li>Legal and compliance</li>
          <li>Executive leadership</li>
          <li>External auditors and regulators</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Effective communication ensures that risk findings lead to real
            decisions and resource allocation rather than being ignored.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which stakeholder group is described as needing 'mapping to regulatory requirements'?",
      options: [
        "External auditors and regulators",
        "Engineering and product teams",
        "Executive leadership",
        "Security and risk management"
      ],
      correct: "External auditors and regulators",
    },
  },

  // ====================== 11 Building an AI Risk Management Program ======================
  {
    id: "building-program",
    title: "11 Building an AI Risk Management Program",
    content: (
      <>
        <h2>Building an AI Risk Management Program</h2>
        <p>
          Mature organizations move from ad-hoc assessments to a structured
          program.
        </p>

        <h3>Program Components</h3>
        <ul>
          <li>Defined risk appetite and policy</li>
          <li>Inventory of AI systems and use cases</li>
          <li>Standardized assessment methodology</li>
          <li>Regular Red Teaming and testing cadence</li>
          <li>Clear ownership and escalation paths</li>
          <li>Metrics and reporting to leadership</li>
          <li>Integration with broader GRC processes</li>
        </ul>

        <h3>Success Factors</h3>
        <ul>
          <li>Executive support and clear accountability</li>
          <li>Collaboration between security, AI, and product teams</li>
          <li>Balance between innovation speed and risk control</li>
          <li>Continuous improvement based on incidents and new research</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            A sustainable AI risk management program turns individual
            assessments into ongoing organizational capability.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which success factor is described as 'Balance between innovation speed and risk control'?",
      options: [
        "Balance between innovation speed and risk control",
        "Only executive support",
        "Only integration with GRC",
        "Only defined risk appetite"
      ],
      correct: "Balance between innovation speed and risk control",
    },
  },

  // ====================== 12 Practical Methodology & Checklist ======================
  {
    id: "methodology",
    title: "12 Practical Methodology & Checklist",
    content: (
      <>
        <h2>Practical Methodology & Checklist</h2>
        <p>
          Use this structured approach when performing an AI risk assessment.
        </p>

        <h3>Assessment Workflow</h3>
        <ol>
          <li>Define scope and business context</li>
          <li>Build or update the threat model</li>
          <li>Gather technical findings from Red Teaming and reviews</li>
          <li>Identify and describe risks clearly</li>
          <li>Assess likelihood and impact</li>
          <li>Score and prioritize risks</li>
          <li>Develop practical remediation recommendations</li>
          <li>Document residual risk and ownership</li>
          <li>Present findings to relevant stakeholders</li>
          <li>Establish follow-up and continuous monitoring</li>
        </ol>

        <h3>Quality Checklist</h3>
        <ul>
          <li>Are risks tied to realistic attack scenarios?</li>
          <li>Is business impact clearly explained?</li>
          <li>Are recommendations actionable and prioritized?</li>
          <li>Is residual risk acknowledged?</li>
          <li>Is there a plan for continuous assessment?</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Strong AI risk assessment combines technical depth with clear
            communication and governance. The goal is not just to find problems,
            but to enable better decisions about AI risk.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the second step in the recommended Assessment Workflow for AI Risk Assessment?",
      options: [
        "Build or update the threat model",
        "Define scope and business context",
        "Only present findings",
        "Only establish follow-up"
      ],
      correct: "Build or update the threat model",
    },
  },
];

const AIRiskAssessment = () => {
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
          <Link to="/ai-red-teaming" className="back-link">← Back to AI Red Teaming Courses</Link>
          <h1>The ultimate guide to <span className="gradient-text">AI Risk Assessment & Governance</span></h1>
          <p className="article-date">Updated • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/YrhL7562nwhdyH1zFiby/image.png"
          alt="AI Risk Assessment & Governance"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=AI+Risk+Assessment+%26+Governance"; }}
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

export default AIRiskAssessment;