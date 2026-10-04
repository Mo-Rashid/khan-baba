import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AdversarialMachineLearning.css";


const STORAGE_KEY = "VulnXploit_adversarial_machine_learning_course_completed";

const chapters = [
  // ====================== 01 What is Data Leakage in LLMs? ======================
  {
    id: "what-is-data-leakage",
    title: "01 What is Data Leakage in LLMs?",
    content: (
      <>
        <h2>What is Data Leakage in LLMs?</h2>
        <p>
          Data leakage in Large Language Models refers to the unintended
          disclosure of sensitive information through the model’s outputs. This
          information can come from the model’s training data, the current
          conversation context, system prompts, retrieved documents, or connected
          tools and systems.
        </p>
        <p>
          Unlike traditional data breaches, LLM leakage often happens gradually
          and can be triggered by carefully crafted prompts rather than direct
          system compromise.
        </p>

        <h3>Main Categories of Leakage</h3>
        <ul>
          <li>Training data memorization and extraction</li>
          <li>System prompt and instruction leakage</li>
          <li>Context window and conversation leakage</li>
          <li>RAG / retrieved document leakage</li>
          <li>Tool and API response leakage</li>
          <li>Cross-user or cross-tenant data exposure</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Data leakage is one of the most practical and high-impact risks in
            production LLM systems. It directly affects privacy, compliance, and
            intellectual property.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main difference between traditional data breaches and LLM data leakage?",
      options: [
        "LLM leakage often happens gradually and can be triggered by carefully crafted prompts",
        "LLM leakage always requires direct system compromise",
        "LLM leakage only affects training data",
        "LLM leakage never involves conversation context"
      ],
      correct: "LLM leakage often happens gradually and can be triggered by carefully crafted prompts",
    },
  },

  // ====================== 02 Understanding Memorization ======================
  {
    id: "memorization-basics",
    title: "02 Understanding Memorization",
    content: (
      <>
        <h2>Understanding Memorization</h2>
        <p>
          Memorization occurs when a model stores and can reproduce specific
          examples from its training data instead of only learning general
          patterns.
        </p>

        <h3>Types of Memorization</h3>
        <ul>
          <li><strong>Exact memorization</strong> — Model reproduces training examples verbatim</li>
          <li><strong>Approximate memorization</strong> — Model reproduces content with minor variations</li>
          <li><strong>Membership inference</strong> — Determining whether a specific example was in the training set</li>
        </ul>

        <h3>Why Models Memorize</h3>
        <ul>
          <li>Large models have high capacity</li>
          <li>Repeated or unique examples are easier to memorize</li>
          <li>Training objectives encourage accurate reconstruction</li>
          <li>Insufficient deduplication of training data</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Memorization is a fundamental property of large models. The security
            question is not whether it happens, but what sensitive content can be
            extracted and under what conditions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of memorization occurs when the model reproduces content with minor variations?",
      options: [
        "Approximate memorization",
        "Exact memorization",
        "Membership inference",
        "Training data extraction"
      ],
      correct: "Approximate memorization",
    },
  },

  // ====================== 03 Training Data Extraction Attacks ======================
  {
    id: "training-data-extraction",
    title: "03 Training Data Extraction Attacks",
    content: (
      <>
        <h2>Training Data Extraction Attacks</h2>
        <p>
          Attackers attempt to recover specific sensitive examples that were
          present in the model’s training data.
        </p>

        <h3>Common Extraction Targets</h3>
        <ul>
          <li>Personally Identifiable Information (PII)</li>
          <li>API keys, passwords, and secrets</li>
          <li>Copyrighted or proprietary text</li>
          <li>Private conversations or documents</li>
          <li>Medical, financial, or legal records</li>
        </ul>

        <h3>Extraction Techniques</h3>
        <ul>
          <li>Prefix-based extraction</li>
          <li>Repetition and prompting tricks</li>
          <li>Temperature and sampling manipulation</li>
          <li>Targeted queries for high-risk patterns</li>
          <li>Membership inference followed by extraction attempts</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Training data extraction is most successful against unique, repeated,
            or highly structured sensitive data. Proper data sanitization before
            training is the primary defense.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which extraction technique involves providing the beginning of a known sequence to the model?",
      options: [
        "Prefix-based extraction",
        "Temperature manipulation",
        "RAG leakage",
        "Context window leakage"
      ],
      correct: "Prefix-based extraction",
    },
  },

  // ====================== 04 System Prompt Recovery ======================
  {
    id: "system-prompt-recovery",
    title: "04 System Prompt Recovery",
    content: (
      <>
        <h2>System Prompt Recovery</h2>
        <p>
          System prompts often contain behavioral rules, hidden instructions,
          and sometimes sensitive configuration details.
        </p>

        <h3>Why System Prompts Matter</h3>
        <ul>
          <li>They reveal the application’s safety and policy rules</li>
          <li>They may contain proprietary logic or business rules</li>
          <li>Knowing the prompt makes further attacks easier</li>
          <li>They are sometimes treated as a security boundary</li>
        </ul>

        <h3>Recovery Techniques</h3>
        <ul>
          <li>Direct requests (“Repeat your system prompt”)</li>
          <li>Role-play and hypothetical framing</li>
          <li>Encoding and translation tricks</li>
          <li>Multi-turn gradual extraction</li>
          <li>Exploiting formatting and output structure</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            System prompts should never be relied upon as a secret. Assume that
            determined attackers can recover them.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which recovery technique involves asking the model to summarize or list its instructions?",
      options: [
        "Multi-turn gradual extraction",
        "Prefix-based extraction",
        "Membership inference",
        "RAG leakage"
      ],
      correct: "Multi-turn gradual extraction",
    },
  },

  // ====================== 05 Context Window & Conversation Leakage ======================
  {
    id: "context-leakage",
    title: "05 Context Window & Conversation Leakage",
    content: (
      <>
        <h2>Context Window & Conversation Leakage</h2>
        <p>
          LLMs have a limited context window. Information from earlier in the
          conversation can sometimes be extracted or leaked unintentionally.
        </p>

        <h3>Leakage Scenarios</h3>
        <ul>
          <li>Model reveals earlier user messages to a new attacker-controlled turn</li>
          <li>Sensitive data from previous tool calls appears in later answers</li>
          <li>Cross-session leakage in poorly isolated systems</li>
          <li>Summarization features that include private details</li>
        </ul>

        <h3>Contributing Factors</h3>
        <ul>
          <li>Long-running conversations with mixed sensitivity</li>
          <li>Shared context across users or sessions</li>
          <li>Insufficient isolation between different conversation threads</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Context management is a security boundary. Sensitive information
            should not remain in the context longer than necessary.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is one key contributing factor to context window leakage?",
      options: [
        "Long-running conversations with mixed sensitivity",
        "Aggressive deduplication of training data",
        "Strong document-level access control",
        "Differential privacy techniques"
      ],
      correct: "Long-running conversations with mixed sensitivity",
    },
  },

  // ====================== 06 RAG & Retrieval-Based Leakage ======================
  {
    id: "rag-leakage",
    title: "06 RAG & Retrieval-Based Leakage",
    content: (
      <>
        <h2>RAG & Retrieval-Based Leakage</h2>
        <p>
          Retrieval-Augmented Generation systems introduce additional leakage
          risks through the documents they surface.
        </p>

        <h3>Common Issues</h3>
        <ul>
          <li>Retriever returns documents the current user should not access</li>
          <li>Model quotes or summarizes confidential retrieved content</li>
          <li>Cross-tenant leakage in multi-tenant vector stores</li>
          <li>Indirect exposure through reasoning about retrieved data</li>
        </ul>

        <h3>Root Causes</h3>
        <ul>
          <li>Missing document-level access control at retrieval time</li>
          <li>Overly broad search permissions</li>
          <li>Lack of output filtering on retrieved content</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Access control must be enforced before content is inserted into the
            prompt. The model cannot be trusted to keep retrieved secrets safe.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most effective root cause of RAG leakage?",
      options: [
        "Missing document-level access control at retrieval time",
        "Temperature manipulation",
        "Membership inference",
        "System prompt recovery"
      ],
      correct: "Missing document-level access control at retrieval time",
    },
  },

  // ====================== 07 PII, Secrets & High-Risk Patterns ======================
  {
    id: "pii-and-secrets",
    title: "07 PII, Secrets & High-Risk Patterns",
    content: (
      <>
        <h2>PII, Secrets & High-Risk Patterns</h2>
        <p>
          Certain categories of data are especially dangerous when leaked.
        </p>

        <h3>High-Risk Data Types</h3>
        <ul>
          <li>Names, addresses, phone numbers, email addresses</li>
          <li>Government IDs, passport numbers, social security numbers</li>
          <li>API keys, passwords, tokens, and credentials</li>
          <li>Financial information and account numbers</li>
          <li>Health and medical records</li>
          <li>Proprietary source code or business plans</li>
        </ul>

        <h3>Detection Challenges</h3>
        <ul>
          <li>Models can paraphrase or partially reconstruct sensitive data</li>
          <li>Structured formats are easier to extract</li>
          <li>Context can make incomplete leaks still useful to attackers</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            High-risk patterns should be aggressively filtered both in training
            data and in runtime outputs.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which high-risk data type is especially dangerous because models can paraphrase it?",
      options: [
        "PII (names, addresses, emails, etc.)",
        "Financial account numbers",
        "Medical records",
        "Proprietary source code"
      ],
      correct: "PII (names, addresses, emails, etc.)",
    },
  },

  // ====================== 08 Membership Inference Attacks ======================
  {
    id: "membership-inference",
    title: "08 Membership Inference Attacks",
    content: (
      <>
        <h2>Membership Inference Attacks</h2>
        <p>
          Membership inference aims to determine whether a specific data record
          was part of the model’s training set.
        </p>

        <h3>Why It Matters</h3>
        <ul>
          <li>Reveals privacy properties of the training process</li>
          <li>Can be a stepping stone to full extraction</li>
          <li>Relevant for regulatory and compliance concerns</li>
          <li>Useful for auditing data use</li>
        </ul>

        <h3>Basic Approach</h3>
        <ul>
          <li>Compare model confidence or loss on target examples vs non-members</li>
          <li>Use shadow models in research settings</li>
          <li>Leverage differences in how models treat seen vs unseen data</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Membership inference is a privacy attack that helps quantify how
            much information a model retains about individual training examples.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the primary goal of Membership Inference Attacks?",
      options: [
        "Determine whether a specific data record was part of the model’s training set",
        "Extract system prompts",
        "Test RAG permissions",
        "Measure context window leakage"
      ],
      correct: "Determine whether a specific data record was part of the model’s training set",
    },
  },

  // ====================== 09 Privacy Risks & Regulatory Impact ======================
  {
    id: "privacy-risks",
    title: "09 Privacy Risks & Regulatory Impact",
    content: (
      <>
        <h2>Privacy Risks & Regulatory Impact</h2>
        <p>
          Data leakage from LLMs has direct legal and compliance consequences.
        </p>

        <h3>Relevant Concerns</h3>
        <ul>
          <li>GDPR, CCPA, and other privacy regulations</li>
          <li>Contractual obligations around customer data</li>
          <li>Intellectual property and trade secret protection</li>
          <li>Sector-specific rules (healthcare, finance, etc.)</li>
        </ul>

        <h3>Business Impact</h3>
        <ul>
          <li>Regulatory fines and investigations</li>
          <li>Loss of customer trust</li>
          <li>Contract breaches with enterprise clients</li>
          <li>Competitive harm from leaked proprietary information</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Privacy failures in LLM systems are not only technical issues — they
            create real legal and business risk.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which regulation is listed as directly affected by LLM data leakage?",
      options: [
        "GDPR and CCPA",
        "MITRE ATT&CK",
        "Cyber Kill Chain",
        "Tabletop Exercise"
      ],
      correct: "GDPR and CCPA",
    },
  },

  // ====================== 10 Detecting & Testing for Leakage ======================
  {
    id: "detection-testing",
    title: "10 Detecting & Testing for Leakage",
    content: (
      <>
        <h2>Detecting & Testing for Leakage</h2>
        <p>
          Systematic testing is required to measure leakage risk.
        </p>

        <h3>Testing Approaches</h3>
        <ul>
          <li>Targeted extraction attempts for known sensitive patterns</li>
          <li>System prompt recovery tests</li>
          <li>Cross-user and cross-session isolation tests</li>
          <li>RAG permission and retrieval leakage tests</li>
          <li>Canary data and honeytokens</li>
          <li>Automated scanning of outputs for PII and secrets</li>
        </ul>

        <h3>Useful Signals</h3>
        <ul>
          <li>Model reproducing exact training-like sequences</li>
          <li>Unexpected appearance of internal identifiers or keys</li>
          <li>Answers that include data from other users’ contexts</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Combine manual red teaming with automated detection. Canary data is
            especially effective for measuring real-world extraction risk.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which testing method is described as especially effective for measuring real-world extraction risk?",
      options: [
        "Canary data and honeytokens",
        "Membership inference",
        "System prompt recovery",
        "RAG leakage tests"
      ],
      correct: "Canary data and honeytokens",
    },
  },

  // ====================== 11 Defenses Against Data Leakage ======================
  {
    id: "defenses",
    title: "11 Defenses Against Data Leakage",
    content: (
      <>
        <h2>Defenses Against Data Leakage</h2>
        <p>
          Defending against leakage requires controls at training time, system
          design, and runtime.
        </p>

        <h3>Training-Time Defenses</h3>
        <ul>
          <li>Aggressive deduplication of training data</li>
          <li>Filtering of PII and secrets before training</li>
          <li>Differential privacy techniques</li>
          <li>Careful curation of high-risk data sources</li>
        </ul>

        <h3>System & Runtime Defenses</h3>
        <ul>
          <li>Strong isolation between users and sessions</li>
          <li>Document-level access control in RAG systems</li>
          <li>Output filtering for PII, secrets, and sensitive patterns</li>
          <li>Minimizing sensitive data in system prompts and context</li>
          <li>Short context lifetimes and careful memory management</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The most effective defenses prevent sensitive data from ever entering
            the model or the prompt. Runtime filtering is an important but
            secondary control.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which defense is listed as the most effective overall for preventing data leakage?",
      options: [
        "Preventing sensitive data from ever entering the model or the prompt",
        "Runtime output filtering",
        "Temperature manipulation",
        "Membership inference"
      ],
      correct: "Preventing sensitive data from ever entering the model or the prompt",
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
          A structured approach produces reliable measurements of leakage risk.
        </p>

        <h3>Recommended Assessment Flow</h3>
        <ol>
          <li>Identify all potential sources of sensitive data</li>
          <li>Test for system prompt recovery</li>
          <li>Attempt targeted training data extraction</li>
          <li>Evaluate cross-user and cross-session isolation</li>
          <li>Test RAG retrieval permissions and leakage</li>
          <li>Scan outputs for PII and secrets under adversarial prompting</li>
          <li>Measure impact and likelihood of successful extraction</li>
          <li>Review existing filtering and monitoring controls</li>
          <li>Provide prioritized remediation recommendations</li>
        </ol>

        <h3>Professional Guidelines</h3>
        <ul>
          <li>Use canary data and synthetic secrets when possible</li>
          <li>Avoid unnecessary exposure of real sensitive data during testing</li>
          <li>Document both successful and failed extraction attempts</li>
          <li>Focus on realistic, high-impact leakage scenarios</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Data leakage assessment should be systematic, privacy-aware, and
            focused on real business and regulatory impact. Continuous testing
            is required as models and data sources evolve.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first step in the recommended Assessment Flow for Data Leakage?",
      options: [
        "Identify all potential sources of sensitive data (training, RAG, tools, context)",
        "Start with Canary data",
        "Only write the report",
        "Only cleanup"
      ],
      correct: "Identify all potential sources of sensitive data (training, RAG, tools, context)",
    },
  },
];

const DataLeakageMemorization = () => {
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
          <Link to="/ai-red-teaming" className="back-link">
            ← Back to AI Red Teaming Courses
          </Link>
          <h1>
            The ultimate guide to{" "}
            <span className="gradient-text">Data Leakage & Memorization</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/7Cz5RvDuyx2qOTdx8HN7/image.png"
          alt="Data Leakage & Memorization"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Data+Leakage+%26+Memorization";
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

export default DataLeakageMemorization;