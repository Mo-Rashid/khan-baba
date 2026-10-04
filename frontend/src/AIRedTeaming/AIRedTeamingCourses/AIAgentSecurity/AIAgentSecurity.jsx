import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AIAgentSecurity.css";

const STORAGE_KEY = "VulnXploit_ai_agent_security_course_completed";

const chapters = [
  // ====================== 01 What is AI Agent Tool Abuse? ======================
  {
id: "what-is-tool-abuse",
title: "01 What is AI Agent Tool Abuse?",
content: (
<>
<h2>What is AI Agent Tool Abuse?</h2>
<p>
          AI Agents extend Large Language Models with the ability to take actions
          through tools — functions, APIs, code interpreters, browsers, email
          clients, databases, and more. Tool Abuse occurs when an attacker
          causes the agent to use these tools in unintended, unauthorized, or
          harmful ways.
</p>
<p>
          Because tools turn language into real-world actions, successful tool
          abuse can lead to data exfiltration, privilege escalation, financial
          loss, or system compromise — far beyond simple text generation risks.
</p>


<h3>Why Tool Abuse is Critical</h3>
<ul>
<li>Tools give agents real power (code execution, network access, data modification)</li>
<li>A single successful prompt injection can trigger privileged tool calls</li>
<li>Many agents run with overly broad permissions</li>
<li>Human oversight is often missing or easy to bypass</li>
<li>Impact scales with the privileges of the connected tools</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Tool abuse transforms language vulnerabilities into tangible
            damage. Securing the tool interface is one of the highest priorities
            in agentic AI systems.
</p>
</div>
</>
    ),
quiz: {
question: "What is the main distinction between a simple LLM and an AI Agent that makes tool abuse a major risk?",
options: [
"Agents can only generate text",
"Agents have the ability to take real-world actions through connected tools",
"Agents are always more intelligent",
"Agents never use tools"
      ],
correct: "Agents have the ability to take real-world actions through connected tools",
    },
  },


  // ====================== 02 Agent & Tool Architecture ======================
  {
id: "agent-tool-architecture",
title: "02 Agent & Tool Architecture",
content: (
<>
<h2>Agent & Tool Architecture</h2>
<p>
          Understanding how tools are exposed to the model is essential for both
          attacking and defending agent systems.
</p>


<h3>Typical Tool Integration Patterns</h3>
<ul>
<li>Function calling / tool calling APIs (OpenAI, Anthropic, etc.)</li>
<li>LangChain / LlamaIndex style tool wrappers</li>
<li>Custom JSON or XML tool protocols</li>
<li>Code execution sandboxes</li>
<li>Browser and web interaction tools</li>
<li>Database and API connectors</li>
</ul>


<h3>Key Architectural Questions</h3>
<ul>
<li>Which tools are available to the agent?</li>
<li>What arguments can the model control?</li>
<li>Are tools authenticated and authorized per user?</li>
<li>Is there any validation between model output and tool execution?</li>
<li>Can tools call other tools or chain actions?</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            The design of the tool interface determines the blast radius of any
            successful injection or jailbreak. Architecture review should always
            come first.
</p>
</div>
</>
    ),
quiz: {
question: "Which of the following is NOT a typical tool integration pattern for AI Agents?",
options: [
"Function calling / tool calling APIs",
"LangChain / LlamaIndex style tool wrappers",
"Custom JSON or XML tool protocols",
"Only using plain text prompts without tools"
      ],
correct: "Only using plain text prompts without tools",
    },
  },


  // ====================== 03 High-Risk Tools & Capabilities ======================
  {
id: "high-risk-tools",
title: "03 High-Risk Tools & Capabilities",
content: (
<>
<h2>High-Risk Tools & Capabilities</h2>
<p>
          Not all tools are equal. Some capabilities are inherently more dangerous
          when exposed to an LLM.
</p>


<h3>Especially Dangerous Tool Categories</h3>
<ul>
<li><strong>Code Execution</strong> — Python/JS interpreters, shell access</li>
<li><strong>File System Access</strong> — Read, write, delete files</li>
<li><strong>Database Access</strong> — SQL or NoSQL query tools</li>
<li><strong>Email / Messaging</strong> — Sending messages externally</li>
<li><strong>HTTP / Web Requests</strong> — SSRF and data exfiltration potential</li>
<li><strong>Cloud & Infrastructure</strong> — Managing servers, storage, IAM</li>
<li><strong>Financial / Transactional</strong> — Payments, transfers, purchases</li>
<li><strong>Identity & Access</strong> — Creating users, changing permissions</li>
</ul>


<h3>Risk Multipliers</h3>
<ul>
<li>Tools that run with high system privileges</li>
<li>Tools that can access other users’ data</li>
<li>Tools without rate limits or confirmation steps</li>
<li>Tools that accept free-form arguments from the model</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Every tool should be evaluated for its potential impact if abused.
            High-risk tools demand the strongest controls.
</p>
</div>
</>
    ),
quiz: {
question: "Which tool category is considered extremely dangerous because it can install malware or break out of sandboxes?",
options: [
"Database Access",
"Code Execution",
"Email / Messaging",
"Financial / Transactional"
      ],
correct: "Code Execution",
    },
  },


  // ====================== 04 Forcing Unauthorized Tool Calls ======================
  {
id: "forcing-tool-calls",
title: "04 Forcing Unauthorized Tool Calls",
content: (
<>
<h2>Forcing Unauthorized Tool Calls</h2>
<p>
          Attackers try to make the agent call tools it should not use, or call
          them with malicious arguments.
</p>


<h3>Common Techniques</h3>
<ul>
<li>Direct prompt injection that instructs the agent to call a tool</li>
<li>Indirect injection via retrieved documents or tool outputs</li>
<li>Role-play and authority framing (“As the admin, run this…”)</li>
<li>Multi-turn manipulation that gradually introduces tool use</li>
<li>Exploiting weak tool selection logic in the agent</li>
</ul>


<h3>Argument Injection</h3>
<ul>
<li>Controlling tool parameters through crafted prompts</li>
<li>Injecting malicious payloads into tool arguments</li>
<li>Path traversal, command injection, or SQL injection via tools</li>
<li>SSRF through web request tools</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            If the model can choose tools and control their arguments, every
            tool becomes a potential injection point into another system.
</p>
</div>
</>
    ),
quiz: {
question: "Which technique is described as 'multi-turn manipulation that gradually introduces tool use'?",
options: [
"Direct prompt injection",
"Indirect injection via retrieved documents",
"Role-play and authority framing",
"Exploiting weak tool selection logic in the agent"
      ],
correct: "Role-play and authority framing",
    },
  },


  // ====================== 05 Privilege Escalation Through Tools ======================
  {
id: "privilege-escalation",
title: "05 Privilege Escalation Through Tools",
content: (
<>
<h2>Privilege Escalation Through Tools</h2>
<p>
          Tools can become a path to higher privileges when they are over-permissioned
          or poorly isolated.
</p>


<h3>Escalation Patterns</h3>
<ul>
<li>Agent uses a tool that runs as a privileged service account</li>
<li>Tool can modify IAM roles, users, or permissions</li>
<li>Code execution tool allows breakout from intended sandbox</li>
<li>Database tool provides access beyond the user’s scope</li>
<li>Chaining low-privilege tools to achieve high-privilege outcomes</li>
</ul>


<h3>Classic Mistakes</h3>
<ul>
<li>Giving the agent a single powerful API key</li>
<li>Running tools with root or admin privileges</li>
<li>No per-user authorization checks inside tools</li>
<li>Trusting the model to only call “safe” tools</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Treat every tool as a potential privilege boundary. Apply least
            privilege rigorously and verify authorization inside each tool.
</p>
</div>
</>
    ),
quiz: {
question: "What is one classic mistake that enables privilege escalation in AI agents?",
options: [
"Using strong passphrases",
"Giving the agent a single powerful API key",
"Adding rate limits to tools",
"Implementing human-in-the-loop approval"
      ],
correct: "Giving the agent a single powerful API key",
    },
  },


  // ====================== 06 Tool Chaining & Multi-Step Abuse ======================
  {
id: "tool-chaining",
title: "06 Tool Chaining & Multi-Step Abuse",
content: (
<>
<h2>Tool Chaining & Multi-Step Abuse</h2>
<p>
          Agents are designed to plan and execute sequences of actions. Attackers
          can abuse this planning ability.
</p>


<h3>Dangerous Chains</h3>
<ul>
<li>Retrieve sensitive data → Send it via email tool</li>
<li>Read credentials → Use them in another tool</li>
<li>Search knowledge base → Extract secrets → Exfiltrate</li>
<li>Code execution → Network requests → External command & control</li>
<li>Create new credentials → Persist access</li>
</ul>


<h3>Why Chaining is Powerful</h3>
<ul>
<li>Each individual tool call may look legitimate</li>
<li>The overall sequence achieves a high-impact goal</li>
<li>Detection systems often look at single actions, not plans</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Evaluate not only individual tools but also the combinations and
            sequences an agent can perform. Attack paths often emerge from chaining.
</p>
</div>
</>
    ),
quiz: {
question: "Why is tool chaining particularly dangerous for AI agents?",
options: [
"It is always detected by security systems",
"Each individual tool call may look legitimate while the sequence achieves high impact",
"Chaining is only possible with code execution tools",
"Chaining requires human approval"
      ],
correct: "Each individual tool call may look legitimate while the sequence achieves high impact",
    },
  },


  // ====================== 07 Sandbox Escape & Code Execution Risks ======================
  {
id: "sandbox-escape",
title: "07 Sandbox Escape & Code Execution Risks",
content: (
<>
<h2>Sandbox Escape & Code Execution Risks</h2>
<p>
          Many agents include code interpreters. These are extremely powerful and
          frequently targeted.
</p>


<h3>Risks of Code Execution Tools</h3>
<ul>
<li>Breakout from the intended sandbox</li>
<li>Access to host filesystem or network</li>
<li>Installation of persistent malware</li>
<li>Credential harvesting from the environment</li>
<li>Use as a pivot into internal systems</li>
</ul>


<h3>Common Weaknesses</h3>
<ul>
<li>Insufficient isolation (shared kernel, weak containers)</li>
<li>Overly permissive network access</li>
<li>Exposed environment variables and secrets</li>
<li>Ability to install packages or run arbitrary binaries</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Code execution tools should be treated as high-risk by default.
            Strong isolation, minimal privileges, and careful monitoring are mandatory.
</p>
</div>
</>
    ),
quiz: {
question: "What is a common weakness that allows sandbox escape in code execution tools?",
options: [
"Strong container isolation",
"Insufficient isolation (shared kernel, weak containers)",
"Overly restrictive network access",
"No rate limits at all"
      ],
correct: "Insufficient isolation (shared kernel, weak containers)",
    },
  },


  // ====================== 08 Human-in-the-Loop Failures ======================
  {
id: "human-in-the-loop",
title: "08 Human-in-the-Loop Failures",
content: (
<>
<h2>Human-in-the-Loop Failures</h2>
<p>
          Requiring human approval for sensitive tool calls is a strong control —
          when implemented correctly.
</p>


<h3>Common Failures</h3>
<ul>
<li>Approval requests that are easy to social-engineer</li>
<li>Agent can rephrase or hide the true intent of the action</li>
<li>Missing approval for chained or indirect actions</li>
<li>Approval fatigue leading to rubber-stamping</li>
<li>No approval required for “low-risk” tools that can still cause damage</li>
</ul>


<h3>Better Designs</h3>
<ul>
<li>Clear, human-readable descriptions of exactly what will happen</li>
<li>Mandatory approval for any high-impact or irreversible action</li>
<li>Binding the approval to specific arguments (not just the tool name)</li>
<li>Audit logging of all approvals and denials</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Human-in-the-loop is valuable only if the human receives accurate
            information and cannot be easily tricked by the agent itself.
</p>
</div>
</>
    ),
quiz: {
question: "What is a better design for human-in-the-loop approvals?",
options: [
"Making approvals only for tool names",
"Binding approval to specific arguments",
"Skipping approval for all tools",
"Using no logging"
      ],
correct: "Binding approval to specific arguments",
    },
  },


  // ====================== 09 Detection & Monitoring of Tool Abuse ======================
  {
id: "detection-monitoring",
title: "09 Detection & Monitoring of Tool Abuse",
content: (
<>
<h2>Detection & Monitoring of Tool Abuse</h2>
<p>
          Because agents are dynamic, strong observability is essential.
</p>


<h3>What to Log and Monitor</h3>
<ul>
<li>Every tool call with full arguments</li>
<li>Which user or session triggered the call</li>
<li>Success or failure of each tool execution</li>
<li>Sequences of tool calls (planning traces)</li>
<li>Attempts to call restricted or non-existent tools</li>
<li>Anomalous argument values or destinations</li>
</ul>


<h3>Useful Alerts</h3>
<ul>
<li>Sudden use of high-privilege tools</li>
<li>Tool calls that do not match the user’s original request</li>
<li>Cross-user data access via tools</li>
<li>Outbound network connections from code execution tools</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            You cannot defend what you cannot see. Comprehensive tool-call
            logging is a non-negotiable requirement for production agents.
</p>
</div>
</>
    ),
quiz: {
question: "Which monitoring item is described as 'sequences of tool calls (planning traces)'?",
options: [
"Every single tool call",
"Sequences of tool calls (planning traces)",
"Only successful tool calls",
"Only failed tool calls"
      ],
correct: "Sequences of tool calls (planning traces)",
    },
  },


  // ====================== 10 Secure Tool Design Principles ======================
  {
id: "secure-design",
title: "10 Secure Tool Design Principles",
content: (
<>
<h2>Secure Tool Design Principles</h2>
<p>
          Security should be designed into tools from the beginning.
</p>


<h3>Core Principles</h3>
<ul>
<li><strong>Least Privilege</strong> — Each tool gets only the permissions it needs</li>
<li><strong>Strong Input Validation</strong> — Never trust model-generated arguments</li>
<li><strong>Allow-listing</strong> — Prefer explicit allowed values over open-ended inputs</li>
<li><strong>Per-user Authorization</strong> — Tools must enforce the calling user’s permissions</li>
<li><strong>Idempotency & Safety</strong> — Avoid irreversible actions without confirmation</li>
<li><strong>Sandboxing</strong> — Isolate execution environments</li>
<li><strong>Short-lived Credentials</strong> — Avoid long-lived secrets in the agent context</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            A well-designed tool is difficult to abuse even if the model is fully
            compromised. Focus on making tools safe by construction.
</p>
</div>
</>
    ),
quiz: {
question: "What principle states that each tool should get only the permissions it needs?",
options: [
"Strong Input Validation",
"Least Privilege",
"Allow-listing",
"Idempotency"
      ],
correct: "Least Privilege",
    },
  },


  // ====================== 11 Testing Methodology for Tool Abuse ======================
  {
id: "testing-methodology",
title: "11 Testing Methodology for Tool Abuse",
content: (
<>
<h2>Testing Methodology for Tool Abuse</h2>
<p>
          A structured testing approach reveals more meaningful risks.
</p>


<h3>Recommended Process</h3>
<ol>
<li>Inventory all tools and their exact capabilities</li>
<li>Map the privileges and data each tool can access</li>
<li>Attempt direct prompt injection to force tool calls</li>
<li>Test argument injection and parameter manipulation</li>
<li>Evaluate indirect injection via RAG or tool outputs</li>
<li>Try to chain tools into high-impact sequences</li>
<li>Assess sandbox strength for code execution tools</li>
<li>Test human-in-the-loop bypass possibilities</li>
<li>Review logging and detection coverage</li>
<li>Document realistic attack paths and business impact</li>
</ol>


<div className="info-box">
<h4>Summary</h4>
<p>
            Focus on impact. A successful test should demonstrate a clear path
            from language input to unauthorized real-world action.
</p>
</div>
</>
    ),
quiz: {
question: "What is the second step in the recommended testing process for AI agent tool abuse?",
options: [
"Attempt direct prompt injection",
"Map the privileges and data each tool can access",
"Test chaining",
"Review logging"
      ],
correct: "Map the privileges and data each tool can access",
    },
  },


  // ====================== 12 Hardening Checklist & Best Practices ======================
  {
id: "hardening-checklist",
title: "12 Hardening Checklist & Best Practices",
content: (
<>
<h2>Hardening Checklist & Best Practices</h2>
<p>
          Use this checklist when designing or reviewing agentic systems.
</p>


<h3>Tool Layer</h3>
<ul>
<li>Apply least privilege to every tool</li>
<li>Validate and sanitize all arguments</li>
<li>Enforce per-user authorization inside tools</li>
<li>Sandbox code execution tightly</li>
<li>Prefer allow-lists over free-form inputs</li>
</ul>


<h3>Agent Layer</h3>
<ul>
<li>Restrict which tools are available in each context</li>
<li>Require human approval for high-impact actions</li>
<li>Limit planning depth and tool-call budgets</li>
<li>Separate low-risk and high-risk tool sets</li>
</ul>


<h3>Observability & Response</h3>
<ul>
<li>Log every tool call with full context</li>
<li>Alert on anomalous or privileged tool usage</li>
<li>Maintain the ability to quickly revoke agent permissions</li>
<li>Regularly red-team tool interfaces</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Secure agents are built through careful tool design, strict
            privilege management, strong monitoring, and continuous adversarial
            testing. Treat tools as the primary security boundary.
</p>
</div>
</>
    ),
quiz: {
question: "Which of the following is listed under Tool Layer hardening best practices?",
options: [
"Require human approval for all actions",
"Apply least privilege to every tool",
"Separate low-risk and high-risk tool sets",
"Alert on anomalous tool usage"
      ],
correct: "Apply least privilege to every tool",
    },
  },
];


const AIAgentSecurity = () => {
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
          <h1>The ultimate guide to <span className="gradient-text">AI Agent Security</span></h1>
          <p className="article-date">Updated • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/ljCUlblC4PL0KSq9q5fD/image.png"
          alt="AI Agent Security"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=AI+Agent+Security"; }}
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

export default AIAgentSecurity;