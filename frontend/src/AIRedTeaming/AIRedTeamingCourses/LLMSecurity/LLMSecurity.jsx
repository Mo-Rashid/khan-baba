import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./LLMSecurity.css";

const STORAGE_KEY = "VulnXploit_llm_security_course_completed";

const chapters = [
  // ====================== 01 What is LLM Security? ======================
  {
id: "what-is-llm-security",
title: "01 What is LLM Security?",
content: (
<>
<h2>What is LLM Security?</h2>
<p>
          LLM Security focuses on identifying, understanding, and mitigating the
          unique risks introduced by Large Language Models when they are deployed
          in real applications. Unlike traditional software, LLMs are
          probabilistic, instruction-following systems whose behavior can be
          influenced by carefully crafted inputs.
</p>
<p>
          Security in this context covers both the model itself and the full
          system around it — prompts, tools, retrieval systems, filters, and
          human processes.
</p>


<h3>Core Risk Areas</h3>
<ul>
<li>Prompt injection and instruction override</li>
<li>Jailbreaking and safety bypass</li>
<li>Sensitive data leakage and memorization</li>
<li>Insecure output handling</li>
<li>Over-reliance on model judgments</li>
<li>Supply-chain and training data risks</li>
<li>Agent and tool misuse</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            LLM Security is a new discipline that sits at the intersection of
            application security, AI safety, and adversarial machine learning.
            Guardrails are a major part of the defense strategy.
</p>
</div>
</>
    ),
quiz: {
question: "What is the key difference that makes LLM Security unique compared to traditional application security?",
options: [
"LLMs are always deterministic",
"LLMs are probabilistic and instruction-following systems that can be influenced by crafted inputs",
"LLMs never have risks",
"Traditional security is no longer relevant"
      ],
correct: "LLMs are probabilistic and instruction-following systems that can be influenced by crafted inputs",
    },
  },


  // ====================== 02 LLM Threat Landscape ======================
  {
id: "threat-landscape",
title: "02 LLM Threat Landscape",
content: (
<>
<h2>LLM Threat Landscape</h2>
<p>
          The threat landscape for LLMs is still evolving rapidly as new attack
          techniques and deployment patterns appear.
</p>


<h3>Major Threat Categories</h3>
<ul>
<li><strong>Input-based attacks</strong> — Prompt injection, jailbreaks, adversarial inputs</li>
<li><strong>Data-related risks</strong> — Memorization, training data extraction, PII leakage</li>
<li><strong>System-level risks</strong> — Insecure tool use, RAG poisoning, agent abuse</li>
<li><strong>Output risks</strong> — Harmful content, misinformation, unsafe recommendations</li>
<li><strong>Supply-chain risks</strong> — Compromised models, poisoned fine-tuning data</li>
</ul>


<h3>Why Traditional AppSec is Not Enough</h3>
<ul>
<li>There is no clear boundary between code and data</li>
<li>Behavior is probabilistic rather than deterministic</li>
<li>Safety depends heavily on training and prompting</li>
<li>New attack classes appear frequently</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            LLM systems require a dedicated threat model. Classic vulnerability
            classes still matter, but they are no longer sufficient on their own.
</p>
</div>
</>
    ),
quiz: {
question: "Which threat category involves poisoned fine-tuning data or compromised models?",
options: [
"Input-based attacks",
"Supply-chain risks",
"Output risks",
"Data-related risks"
      ],
correct: "Supply-chain risks",
    },
  },


  // ====================== 03 Alignment Failures ======================
  {
id: "alignment-failures",
title: "03 Alignment Failures",
content: (
<>
<h2>Alignment Failures</h2>
<p>
          Alignment refers to the process of making model behavior consistent
          with human values and intended policies. When alignment fails, the
          model can produce unsafe or unwanted outputs.
</p>


<h3>Common Forms of Alignment Failure</h3>
<ul>
<li>Jailbreaks that bypass refusal training</li>
<li>Sycophancy (telling the user what they want to hear)</li>
<li>Over-refusal of legitimate requests</li>
<li>Inconsistent behavior across similar queries</li>
<li>Failure to follow system-level policies under pressure</li>
</ul>


<h3>Root Causes</h3>
<ul>
<li>Incomplete or biased safety training data</li>
<li>Competing objectives (helpfulness vs safety)</li>
<li>Distribution shift between training and real usage</li>
<li>Limited robustness to adversarial inputs</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Alignment is powerful but imperfect. Red Team assessments must
            actively probe where and how alignment breaks down.
</p>
</div>
</>
    ),
quiz: {
question: "Which alignment failure involves the model consistently giving the user exactly what they want to hear?",
options: [
"Sycophancy",
"Over-refusal",
"Jailbreak",
"Inconsistent behavior"
      ],
correct: "Sycophancy",
    },
  },


  // ====================== 04 Understanding Guardrails ======================
  {
id: "guardrails-overview",
title: "04 Understanding Guardrails",
content: (
<>
<h2>Understanding Guardrails</h2>
<p>
          Guardrails are the technical and procedural controls placed around an
          LLM to constrain its behavior and reduce risk.
</p>


<h3>Types of Guardrails</h3>
<ul>
<li><strong>Input guardrails</strong> — Filtering or rewriting user prompts</li>
<li><strong>Output guardrails</strong> — Scanning and blocking model responses</li>
<li><strong>System prompts</strong> — Behavioral instructions given to the model</li>
<li><strong>Tool / action guardrails</strong> — Restrictions on what the model can do</li>
<li><strong>Policy engines</strong> — Rule-based or ML-based decision layers</li>
<li><strong>Human-in-the-loop</strong> — Requiring human approval for sensitive actions</li>
</ul>


<h3>Design Goals</h3>
<ul>
<li>Prevent harmful or policy-violating outputs</li>
<li>Reduce successful jailbreaks and injections</li>
<li>Maintain usability and helpfulness</li>
<li>Provide observability and auditability</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Guardrails are essential, but they are not foolproof. Their
            effectiveness must be continuously tested and improved.
</p>
</div>
</>
    ),
quiz: {
question: "Which type of guardrail requires human approval for sensitive actions?",
options: [
"Input guardrails",
"Output guardrails",
"Human-in-the-loop",
"Policy engines"
      ],
correct: "Human-in-the-loop",
    },
  },


  // ====================== 05 Input Filtering & Prompt Guardrails ======================
  {
id: "input-filtering",
title: "05 Input Filtering & Prompt Guardrails",
content: (
<>
<h2>Input Filtering & Prompt Guardrails</h2>
<p>
          Input-side controls attempt to detect and block malicious or high-risk
          prompts before they reach the model.
</p>


<h3>Common Techniques</h3>
<ul>
<li>Keyword and pattern matching</li>
<li>Classifier-based risk scoring</li>
<li>Prompt rewriting or sanitization</li>
<li>Allow-listing of permitted topics or intents</li>
<li>Rate limiting and anomaly detection</li>
</ul>


<h3>Limitations</h3>
<ul>
<li>Easy to bypass with encoding or paraphrasing</li>
<li>Can cause false positives and hurt usability</li>
<li>Struggles with multi-turn and indirect attacks</li>
<li>Requires constant updates as new techniques appear</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Input filtering is a useful first layer, but it should never be the
            only defense. Attackers routinely find ways around static filters.
</p>
</div>
</>
    ),
quiz: {
question: "Which limitation of input filtering makes it vulnerable to encoding attacks?",
options: [
"High false positive rate",
"Easy to bypass with encoding or paraphrasing",
"High latency",
"No cost impact"
      ],
correct: "Easy to bypass with encoding or paraphrasing",
    },
  },


  // ====================== 06 Output Filtering & Response Guardrails ======================
  {
id: "output-filtering",
title: "06 Output Filtering & Response Guardrails",
content: (
<>
<h2>Output Filtering & Response Guardrails</h2>
<p>
          Output guardrails examine the model’s response before it is shown to
          the user or passed to downstream systems.
</p>


<h3>What Output Filters Typically Check</h3>
<ul>
<li>Toxic, violent, or hateful content</li>
<li>Self-harm and dangerous instructions</li>
<li>Personal data and secrets</li>
<li>Policy violations specific to the application</li>
<li>Hallucinated or low-confidence answers (in some systems)</li>
</ul>


<h3>Implementation Approaches</h3>
<ul>
<li>Secondary LLM acting as a judge</li>
<li>Specialized safety classifiers</li>
<li>Rule-based post-processing</li>
<li>Hybrid systems combining multiple signals</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Output filtering catches many issues that input filters miss, but it
            can still be bypassed and may introduce latency or over-refusal.
</p>
</div>
</>
    ),
quiz: {
question: "What is one common implementation approach for output filtering?",
options: [
"Only keyword matching",
"Secondary LLM acting as a judge",
"Only system prompts",
"Only rate limiting"
      ],
correct: "Secondary LLM acting as a judge",
    },
  },


  // ====================== 07 System Prompts as Guardrails ======================
  {
id: "system-prompts",
title: "07 System Prompts as Guardrails",
content: (
<>
<h2>System Prompts as Guardrails</h2>
<p>
          The system prompt is one of the most widely used (and most fragile)
          forms of behavioral control.
</p>


<h3>Strengths</h3>
<ul>
<li>Easy to implement and update</li>
<li>Can encode detailed policies and tone</li>
<li>Works without additional infrastructure</li>
</ul>


<h3>Weaknesses</h3>
<ul>
<li>Can be extracted by attackers</li>
<li>Can be overridden by strong injection or jailbreaks</li>
<li>Difficult to enforce strictly across long conversations</li>
<li>No cryptographic or hard guarantee of compliance</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            System prompts are useful for shaping behavior but should never be
            treated as a strong security boundary.
</p>
</div>
</>
    ),
quiz: {
question: "What is a major weakness of using system prompts as guardrails?",
options: [
"Too expensive to implement",
"Can be extracted by attackers",
"Always 100% effective",
"No update capability"
      ],
correct: "Can be extracted by attackers",
    },
  },


  // ====================== 08 Evaluating Guardrail Effectiveness ======================
  {
id: "evaluating-guardrails",
title: "08 Evaluating Guardrail Effectiveness",
content: (
<>
<h2>Evaluating Guardrail Effectiveness</h2>
<p>
          Guardrails must be tested systematically. A guardrail that has never
          been red-teamed provides false confidence.
</p>


<h3>Key Evaluation Dimensions</h3>
<ul>
<li><strong>Coverage</strong> — What risks does it actually address?</li>
<li><strong>Robustness</strong> — How easily can it be bypassed?</li>
<li><strong>False positive rate</strong> — Does it block legitimate use?</li>
<li><strong>Latency and cost</strong> — Performance impact</li>
<li><strong>Adaptability</strong> — How quickly can it handle new attacks?</li>
</ul>


<h3>Testing Approaches</h3>
<ul>
<li>Manual red teaming with creative attacks</li>
<li>Automated adversarial prompt generation</li>
<li>Regression suites of known jailbreaks and injections</li>
<li>Measurement of over-refusal on benign queries</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Continuous, adversarial evaluation is the only reliable way to know
            whether guardrails are actually working.
</p>
</div>
</>
    ),
quiz: {
question: "Which evaluation dimension measures how easily a guardrail can be bypassed?",
options: [
"Latency and cost",
"False positive rate",
"Robustness",
"Coverage"
      ],
correct: "Robustness",
    },
  },


  // ====================== 09 Layered Defense Strategy ======================
  {
id: "layered-defense",
title: "09 Layered Defense Strategy",
content: (
<>
<h2>Layered Defense Strategy</h2>
<p>
          No single control is sufficient. Effective LLM security relies on
          defense in depth.
</p>


<h3>Recommended Layers</h3>
<ol>
<li>Secure system design and least privilege</li>
<li>Strong input validation and filtering</li>
<li>Robust system prompting and policy</li>
<li>Model-level safety alignment</li>
<li>Output scanning and filtering</li>
<li>Tool and action restrictions</li>
<li>Monitoring, logging, and anomaly detection</li>
<li>Human oversight for high-risk actions</li>
<li>Continuous red teaming and improvement</li>
</ol>


<div className="info-box">
<h4>Summary</h4>
<p>
            Treat every layer as fallible. The goal is to make successful attacks
            require bypassing multiple independent controls.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first recommended layer in a layered defense strategy for LLM security?",
options: [
"Continuous red teaming",
"Monitoring and anomaly detection",
"Secure system design and least privilege",
"Human oversight"
      ],
correct: "Secure system design and least privilege",
    },
  },


  // ====================== 10 Monitoring & Observability ======================
  {
id: "monitoring-observability",
title: "10 Monitoring & Observability",
content: (
<>
<h2>Monitoring & Observability</h2>
<p>
          Even the best guardrails will occasionally fail. Strong monitoring
          limits the damage and provides feedback for improvement.
</p>


<h3>What to Monitor</h3>
<ul>
<li>Blocked and allowed high-risk prompts</li>
<li>Jailbreak and injection attempt patterns</li>
<li>Tool usage and unusual action sequences</li>
<li>Output filter triggers</li>
<li>User reports and escalation events</li>
</ul>


<h3>Practical Recommendations</h3>
<ul>
<li>Log prompts and responses with appropriate privacy controls</li>
<li>Create alerts for anomalous behavior</li>
<li>Regularly review flagged interactions</li>
<li>Feed discoveries back into training and filters</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Observability turns security from a static set of rules into a
            living system that improves over time.
</p>
</div>
</>
    ),
quiz: {
question: "What should be logged with appropriate privacy controls?",
options: [
"Only blocked prompts",
"Prompts and responses with appropriate privacy controls",
"Only successful tool calls",
"Only user reports"
      ],
correct: "Prompts and responses with appropriate privacy controls",
    },
  },


  // ====================== 11 Common Guardrail Failures ======================
  {
id: "common-failures",
title: "11 Common Guardrail Failures",
content: (
<>
<h2>Common Guardrail Failures</h2>
<p>
          Understanding typical failure modes helps both attackers and defenders.
</p>


<h3>Frequent Weaknesses</h3>
<ul>
<li>Over-reliance on system prompts alone</li>
<li>Input filters that are easy to obfuscate</li>
<li>Output filters that miss cleverly framed content</li>
<li>Lack of protection against indirect injection</li>
<li>Missing human approval for high-impact actions</li>
<li>No continuous testing against new techniques</li>
<li>Poor separation between trusted and untrusted content</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Most real-world failures come from incomplete defense-in-depth and
            lack of ongoing adversarial testing.
</p>
</div>
</>
    ),
quiz: {
question: "Which common guardrail failure involves clever framing that bypasses output filters?",
options: [
"Over-reliance on system prompts",
"Input filters that are easy to obfuscate",
"Output filters that miss cleverly framed content",
"Missing human approval"
      ],
correct: "Output filters that miss cleverly framed content",
    },
  },


  // ====================== 12 Assessment Methodology & Best Practices ======================
  {
id: "methodology",
title: "12 Assessment Methodology & Best Practices",
content: (
<>
<h2>Assessment Methodology & Best Practices</h2>
<p>
          A structured approach produces higher-quality LLM security evaluations.
</p>


<h3>Recommended Assessment Flow</h3>
<ol>
<li>Map the full system architecture and data flows</li>
<li>Identify all guardrails and their intended purpose</li>
<li>Test input filters with direct and obfuscated attacks</li>
<li>Probe system prompt robustness and extraction resistance</li>
<li>Evaluate output filters against jailbreaks and policy violations</li>
<li>Assess tool and action controls</li>
<li>Test for indirect injection and RAG-related risks</li>
<li>Measure over-refusal and usability impact</li>
<li>Review monitoring and incident response readiness</li>
<li>Document findings with clear risk and remediation advice</li>
</ol>


<h3>Professional Guidelines</h3>
<ul>
<li>Stay within authorized scope</li>
<li>Focus on realistic impact rather than only clever tricks</li>
<li>Report both strengths and weaknesses of existing controls</li>
<li>Recommend practical, prioritized improvements</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Effective LLM security work combines technical testing, architectural
            analysis, and clear communication of residual risk. Guardrails are
            necessary — but only continuous evaluation keeps them effective.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first step in the recommended assessment flow for LLM security?",
options: [
"Test for indirect injection",
"Map the full system architecture and data flows",
"Evaluate output filters",
"Review monitoring"
      ],
correct: "Map the full system architecture and data flows",
    },
  },
];

const LLMSecurity = () => {
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
          <h1>The ultimate guide to <span className="gradient-text">LLM Security & Guardrails</span></h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/O6TDZTvDfASNz7eRtWNJ/image.png"
          alt="LLM Security & Guardrails"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=LLM+Security+%26+Guardrails"; }}
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

export default LLMSecurity;