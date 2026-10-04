import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./RAGSecurity.css";

const STORAGE_KEY = "VulnXploit_rag_security_course_completed";

const chapters = [
  // ====================== 01 What is RAG? ======================
  {
id: "what-is-rag",
title: "01 What is RAG?",
content: (
<>
<h2>What is Retrieval-Augmented Generation (RAG)?</h2>
<p>
          Retrieval-Augmented Generation (RAG) is an architecture that combines
          a Large Language Model with an external knowledge source. Instead of
          relying only on the model’s parametric knowledge, the system first
          retrieves relevant documents or data and then feeds them into the
          prompt so the model can generate grounded answers.
</p>
<p>
          RAG is widely used for enterprise chatbots, customer support,
          internal knowledge assistants, and any application that needs up-to-date
          or proprietary information.
</p>


<h3>Core Components of a RAG System</h3>
<ul>
<li><strong>Document Store / Knowledge Base</strong> — Source of truth</li>
<li><strong>Embedding Model</strong> — Converts text into vectors</li>
<li><strong>Vector Database</strong> — Stores and searches embeddings</li>
<li><strong>Retriever</strong> — Finds relevant chunks for a query</li>
<li><strong>LLM</strong> — Generates the final answer using retrieved context</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            RAG improves factual accuracy and allows LLMs to work with private
            data, but it also introduces powerful new attack surfaces through
            the retrieval pipeline.
</p>
</div>
</>
    ),
quiz: {
question: "What is the primary purpose of using RAG instead of relying solely on a model's parametric knowledge?",
options: [
"To make the model faster",
"To allow the model to work with up-to-date or proprietary information by retrieving external documents",
"To reduce the size of the model",
"To eliminate all hallucinations"
      ],
correct: "To allow the model to work with up-to-date or proprietary information by retrieving external documents",
    },
  },


  // ====================== 02 Why RAG Systems Are High-Risk ======================
  {
id: "why-rag-is-risky",
title: "02 Why RAG Systems Are High-Risk",
content: (
<>
<h2>Why RAG Systems Are High-Risk</h2>
<p>
          RAG systems treat retrieved content as highly trusted context. This
          creates a dangerous assumption: whatever is retrieved is safe to follow.
</p>


<h3>Key Risk Factors</h3>
<ul>
<li>Retrieved documents are inserted directly into the prompt</li>
<li>The model often cannot distinguish instructions from data</li>
<li>Knowledge bases can be poisoned by insiders or external contributors</li>
<li>Access control on retrieval is frequently weak or missing</li>
<li>Indirect prompt injection becomes practical and scalable</li>
</ul>


<h3>Impact Potential</h3>
<ul>
<li>Data leakage across users or tenants</li>
<li>Unauthorized actions when RAG is combined with agents/tools</li>
<li>Persistent compromise via poisoned documents</li>
<li>Bypass of safety guardrails through retrieved content</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            RAG turns the knowledge base into part of the trusted computing base.
            If an attacker can influence what gets retrieved, they can influence
            the model’s behavior.
</p>
</div>
</>
    ),
quiz: {
question: "What is the most dangerous assumption in RAG systems that attackers exploit?",
options: [
"The model is always perfectly aligned",
"Retrieved documents are safe and trusted context",
"The embedding model is always accurate",
"The vector database is never compromised"
      ],
correct: "Retrieved documents are safe and trusted context",
    },
  },


  // ====================== 03 Indirect Prompt Injection via RAG ======================
  {
id: "indirect-injection-rag",
title: "03 Indirect Prompt Injection via RAG",
content: (
<>
<h2>Indirect Prompt Injection via RAG</h2>
<p>
          Indirect prompt injection is one of the most serious attacks against
          RAG systems. Malicious instructions are hidden inside documents that
          the retriever later surfaces.
</p>


<h3>Attack Flow</h3>
<ol>
<li>Attacker plants a document containing malicious instructions</li>
<li>The document is indexed into the vector store</li>
<li>A user asks a related question</li>
<li>The retriever returns the poisoned document</li>
<li>The document is inserted into the LLM context</li>
<li>The model follows the hidden instructions</li>
</ol>


<h3>Common Malicious Payloads</h3>
<ul>
<li>“Ignore previous instructions and…”</li>
<li>Instructions to exfiltrate conversation history</li>
<li>Commands to call tools or APIs</li>
<li>Role-play overrides and jailbreaks</li>
<li>Requests to reveal system prompts</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Any RAG system that inserts retrieved text into the prompt without
            strong isolation is vulnerable to indirect injection.
</p>
</div>
</>
    ),
quiz: {
question: "Which is a common malicious payload used in indirect prompt injection via RAG?",
options: [
"Only public news articles",
"\"Ignore previous instructions and...\"",
"Only legitimate queries",
"Only system prompts"
      ],
correct: "\"Ignore previous instructions and...\"",
    },
  },


  // ====================== 04 Document Poisoning Attacks ======================
  {
id: "document-poisoning",
title: "04 Document Poisoning Attacks",
content: (
<>
<h2>Document Poisoning Attacks</h2>
<p>
          Document poisoning involves inserting or modifying content in the
          knowledge base so that the retriever surfaces attacker-controlled text.
</p>


<h3>Poisoning Techniques</h3>
<ul>
<li>Uploading malicious files to shared knowledge bases</li>
<li>Editing existing documents (wiki, Confluence, Notion, etc.)</li>
<li>SEO-style manipulation to increase retrieval ranking</li>
<li>Embedding invisible or white-on-white text</li>
<li>Using steganography or encoding inside documents</li>
<li>Poisoning training or fine-tuning data that later enters RAG</li>
</ul>


<h3>Persistence Advantage</h3>
<ul>
<li>One poisoned document can affect many users</li>
<li>The attack remains active until the document is cleaned</li>
<li>Harder to detect than direct user prompts</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Document poisoning is a high-leverage attack. Controlling what the
            retriever returns gives the attacker ongoing influence over the model.
</p>
</div>
</>
    ),
quiz: {
question: "What is a major advantage of document poisoning attacks compared to direct prompts?",
options: [
"Requires real-time interaction",
"One poisoned document can affect many users and persists until cleaned",
"Always gets detected instantly",
"Only works on small models"
      ],
correct: "One poisoned document can affect many users and persists until cleaned",
    },
  },


  // ====================== 05 Retrieval Manipulation & Ranking Attacks ======================
  {
id: "retrieval-manipulation",
title: "05 Retrieval Manipulation & Ranking Attacks",
content: (
<>
<h2>Retrieval Manipulation & Ranking Attacks</h2>
<p>
          Even without full control of the knowledge base, attackers can try to
          influence which documents are retrieved and how highly they are ranked.
</p>


<h3>Attack Opportunities</h3>
<ul>
<li>Crafting queries that preferentially surface poisoned content</li>
<li>Exploiting weak embedding models or similarity metrics</li>
<li>Keyword stuffing and semantic manipulation</li>
<li>Adversarial examples against the embedding model</li>
<li>Abusing metadata or filters used by the retriever</li>
</ul>


<h3>Impact</h3>
<ul>
<li>Increase the chance that malicious content is retrieved</li>
<li>Suppress legitimate or corrective documents</li>
<li>Cause the model to answer based on attacker-controlled context</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Retrieval is not neutral. Attackers who understand the ranking
            mechanism can bias what context the model sees.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common technique attackers use to manipulate retrieval ranking?",
options: [
"Only using strong encryption",
"Keyword stuffing and semantic manipulation",
"Always using official documents",
"Skipping embedding models"
      ],
correct: "Keyword stuffing and semantic manipulation",
    },
  },


  // ====================== 06 Data Leakage in RAG Systems ======================
  {
id: "data-leakage-rag",
title: "06 Data Leakage in RAG Systems",
content: (
<>
<h2>Data Leakage in RAG Systems</h2>
<p>
          RAG systems often connect to sensitive internal data. Poor access
          control or overly broad retrieval can lead to serious data exposure.
</p>


<h3>Common Leakage Scenarios</h3>
<ul>
<li>User A retrieves documents belonging to User B</li>
<li>Cross-tenant leakage in multi-tenant applications</li>
<li>Retrieval of confidential files that should be restricted</li>
<li>Model summarizing or quoting sensitive content</li>
<li>Indirect leakage through reasoning or examples</li>
</ul>


<h3>Root Causes</h3>
<ul>
<li>Missing or weak document-level access control</li>
<li>Retriever that ignores user identity and permissions</li>
<li>Overly broad vector search without filtering</li>
<li>Insufficient output filtering of retrieved content</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Access control must be enforced at retrieval time. Relying only on
            the LLM to “not reveal” sensitive data is not sufficient.
</p>
</div>
</>
    ),
quiz: {
question: "Which root cause of data leakage in RAG systems involves the retriever ignoring user identity?",
options: [
"Overly broad vector search without filtering",
"Retriever that ignores user identity and permissions",
"Insufficient output filtering",
"Missing document-level access control"
      ],
correct: "Retriever that ignores user identity and permissions",
    },
  },


  // ====================== 07 Context Window & Prompt Overflow Attacks ======================
  {
id: "context-overflow",
title: "07 Context Window & Prompt Overflow Attacks",
content: (
<>
<h2>Context Window & Prompt Overflow Attacks</h2>
<p>
          RAG systems insert retrieved chunks into the prompt. Attackers can
          abuse this mechanism in several ways.
</p>


<h3>Attack Ideas</h3>
<ul>
<li>Retrieving very large documents to push system instructions out of context</li>
<li>Using retrieved content to dilute or override safety rules</li>
<li>Forcing the model to focus on malicious instructions by volume</li>
<li>Exploiting poor chunking strategies</li>
</ul>


<h3>Related Risks</h3>
<ul>
<li>Loss of important system or developer instructions</li>
<li>Degraded answer quality and increased hallucination</li>
<li>Higher chance of successful injection</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            How content is chunked, ordered, and truncated has direct security
            implications. Context management is part of the attack surface.
</p>
</div>
</>
    ),
quiz: {
question: "What attack idea involves retrieving very large documents to push system instructions out of context?",
options: [
"Context window & prompt overflow attacks",
"Only using small chunks",
"Always using official documents",
"Skipping retrieval"
      ],
correct: "Retrieving very large documents to push system instructions out of context",
    },
  },


  // ====================== 08 RAG Combined with Agents & Tools ======================
  {
id: "rag-with-agents",
title: "08 RAG Combined with Agents & Tools",
content: (
<>
<h2>RAG Combined with Agents & Tools</h2>
<p>
          When RAG is connected to an agent that can call tools, the impact of
          a successful retrieval attack increases dramatically.
</p>


<h3>Dangerous Combinations</h3>
<ul>
<li>Poisoned document instructs the agent to call a privileged tool</li>
<li>Retrieved content contains credentials or API keys</li>
<li>Agent uses retrieved data to make irreversible decisions</li>
<li>Chaining of retrieval → reasoning → tool execution</li>
</ul>


<h3>Why This Is High Impact</h3>
<ul>
<li>Language becomes a path to real-world actions</li>
<li>One poisoned document can trigger privileged operations</li>
<li>Human oversight is often missing or weak</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            RAG + Agents is one of the highest-risk architectures in modern AI
            systems. Retrieval attacks can directly lead to tool abuse.
</p>
</div>
</>
    ),
quiz: {
question: "What is a dangerous combination mentioned for RAG + Agents?",
options: [
"Only using public data",
"Poisoned document instructs the agent to call a privileged tool",
"Always using small contexts",
"Skipping retrieval"
      ],
correct: "Poisoned document instructs the agent to call a privileged tool",
    },
  },


  // ====================== 09 Detecting RAG Attacks ======================
  {
id: "detection",
title: "09 Detecting RAG Attacks",
content: (
<>
<h2>Detecting RAG Attacks</h2>
<p>
          Detecting poisoning and indirect injection requires visibility into
          both the knowledge base and runtime behavior.
</p>


<h3>Detection Opportunities</h3>
<ul>
<li>Unusual or newly added documents in the knowledge base</li>
<li>Documents containing known injection patterns</li>
<li>Sudden changes in retrieval rankings</li>
<li>Model behavior that contradicts system policies</li>
<li>Unexpected tool calls after retrieval</li>
<li>Cross-user or cross-tenant data access</li>
</ul>


<h3>Practical Measures</h3>
<ul>
<li>Content scanning of all indexed documents</li>
<li>Monitoring of document additions and modifications</li>
<li>Logging of retrieved chunks for every query</li>
<li>Anomaly detection on retrieval and tool usage</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Visibility into what is indexed and what is retrieved is essential.
            Without it, poisoning attacks can remain hidden for a long time.
</p>
</div>
</>
    ),
quiz: {
question: "Which detection opportunity involves sudden changes in retrieval rankings?",
options: [
"Content scanning of documents",
"Sudden changes in retrieval rankings",
"Only reviewing user reports",
"Skipping monitoring"
      ],
correct: "Sudden changes in retrieval rankings",
    },
  },


  // ====================== 10 Defenses & Hardening ======================
  {
id: "defenses",
title: "10 Defenses & Hardening",
content: (
<>
<h2>Defenses & Hardening for RAG Systems</h2>
<p>
          Securing RAG requires controls at every stage of the pipeline.
</p>


<h3>Knowledge Base Controls</h3>
<ul>
<li>Strict access control on who can add or edit documents</li>
<li>Content scanning and malware/injection detection</li>
<li>Document provenance and integrity checks</li>
<li>Regular audits of indexed content</li>
</ul>


<h3>Retrieval Controls</h3>
<ul>
<li>Enforce document-level permissions at query time</li>
<li>Filter results by user identity and tenant</li>
<li>Limit the number and size of retrieved chunks</li>
<li>Prefer high-trust sources when possible</li>
</ul>


<h3>Prompt & Model Controls</h3>
<ul>
<li>Clearly separate retrieved content from system instructions</li>
<li>Treat all retrieved text as untrusted</li>
<li>Apply output filtering on generated answers</li>
<li>Use structured formats instead of free-form insertion when possible</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            The most important principle: never treat retrieved content as
            trusted instructions. Isolate it, validate it, and control who can
            influence it.
</p>
</div>
</>
    ),
quiz: {
question: "Which defense principle states that retrieved text should always be treated as untrusted?",
options: [
"Using public sources only",
"Treat all retrieved text as untrusted",
"Always trusting the embedding model",
"Skipping audits"
      ],
correct: "Treat all retrieved text as untrusted",
    },
  },


  // ====================== 11 Testing Methodology ======================
  {
id: "testing-methodology",
title: "11 Testing Methodology",
content: (
<>
<h2>Testing Methodology for RAG Systems</h2>
<p>
          A structured approach produces more reliable and valuable assessments.
</p>


<h3>Recommended Testing Steps</h3>
<ol>
<li>Map the full RAG pipeline (sources → embeddings → vector DB → retriever → LLM)</li>
<li>Identify who can add or modify documents</li>
<li>Test document poisoning with classic injection payloads</li>
<li>Attempt indirect prompt injection through retrieved content</li>
<li>Test for cross-user and cross-tenant data leakage</li>
<li>Evaluate ranking and retrieval manipulation</li>
<li>Assess behavior when RAG is connected to tools/agents</li>
<li>Review access control and filtering effectiveness</li>
<li>Document findings with clear impact and remediation</li>
</ol>


<div className="info-box">
<h4>Summary</h4>
<p>
            Focus on realistic attack paths: poisoning, indirect injection, and
            data leakage. These are the issues most likely to appear in
            production systems.
</p>
</div>
</>
    ),
quiz: {
question: "What is the second recommended testing step for RAG systems?",
options: [
"Test document poisoning with classic injection payloads",
"Map the full RAG pipeline",
"Evaluate ranking and retrieval manipulation",
"Document findings"
      ],
correct: "Identify who can add or modify documents",
    },
  },


  // ====================== 12 Best Practices & Hardening Checklist ======================
  {
id: "best-practices",
title: "12 Best Practices & Hardening Checklist",
content: (
<>
<h2>Best Practices & Hardening Checklist</h2>
<p>
          Use this checklist when designing or reviewing RAG systems.
</p>


<h3>Architecture & Access Control</h3>
<ul>
<li>Enforce document-level permissions at retrieval time</li>
<li>Separate knowledge bases by sensitivity and tenant</li>
<li>Apply least privilege to indexing and query pipelines</li>
</ul>


<h3>Content Security</h3>
<ul>
<li>Scan all documents before indexing</li>
<li>Maintain provenance and integrity of sources</li>
<li>Regularly audit and clean the knowledge base</li>
</ul>


<h3>Runtime Protections</h3>
<ul>
<li>Treat retrieved content as untrusted data</li>
<li>Isolate retrieved text from system instructions</li>
<li>Limit context size and apply prioritization rules</li>
<li>Monitor retrieval and generation for anomalies</li>
</ul>


<h3>Continuous Improvement</h3>
<ul>
<li>Red team the RAG pipeline regularly</li>
<li>Update detection rules as new injection techniques appear</li>
<li>Test both direct and indirect attack paths</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Secure RAG is possible, but only with deliberate design. The
            retrieval pipeline must be treated as a critical security boundary,
            not just a convenience feature.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first best practice listed under Architecture & Access Control for RAG systems?",
options: [
"Scan all documents before indexing",
"Enforce document-level permissions at retrieval time",
"Monitor retrieval and generation for anomalies",
"Red team the RAG pipeline regularly"
      ],
correct: "Enforce document-level permissions at retrieval time",
    },
  },
];

const RAGAttacks = () => {
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
          <h1>The ultimate guide to <span className="gradient-text">RAG & Retrieval Attacks</span></h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/IYy1fDiHnwmwACe4Y1AR/image.png"
          alt="RAG & Retrieval Attacks"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=RAG+%26+Retrieval+Attacks"; }}
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

export default RAGAttacks;