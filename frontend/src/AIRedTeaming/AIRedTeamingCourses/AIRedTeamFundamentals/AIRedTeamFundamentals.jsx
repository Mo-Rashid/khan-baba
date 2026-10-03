import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AIRedTeamFundamentals.css";

const chapters = [
  // ====================== 01 What is AI Agent Security? ======================
  {
    id: "what-is-ai-agent-security",
    title: "01 What is AI Agent Security?",
    content: (
      <>
        <h2>What is AI Agent Security?</h2>
        <p>
          AI Agents are systems that use Large Language Models (LLMs) combined
          with tools, memory, and planning capabilities to autonomously perform
          tasks. Unlike simple chatbots, agents can take actions — calling APIs,
          browsing the web, executing code, sending emails, or controlling
          systems.
        </p>
        <p>
          This ability to act makes agents significantly more powerful, but also
          creates a much larger and more dangerous attack surface. AI Agent
          Security focuses on identifying and mitigating risks that arise when
          language models are given the ability to interact with the real world.
        </p>

        <h3>Why Agent Security is Critical</h3>
        <ul>
          <li>Agents can perform real actions with real consequences</li>
          <li>A single successful prompt injection can lead to tool abuse</li>
          <li>Agents often have access to sensitive data and privileged APIs</li>
          <li>Autonomy increases the blast radius of any compromise</li>
          <li>Traditional application security controls are often insufficient</li>
        </ul>

        <h3>Core Security Goals</h3>
        <ul>
          <li>Prevent unauthorized tool use</li>
          <li>Stop privilege escalation through agents</li>
          <li>Protect against indirect prompt injection</li>
          <li>Ensure proper human oversight for high-risk actions</li>
          <li>Maintain strong isolation between agents and critical systems</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            AI Agent Security is about controlling what an agent is allowed to
            do, what data it can access, and how it can be manipulated. Because
            agents act, the impact of a successful attack is much higher than
            with regular LLMs.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is Agent Security considered significantly more critical than traditional LLM security?",
      options: [
        "Agents can perform real actions with real consequences and have access to privileged APIs",
        "Agents are easier to attack than LLMs",
        "Agents never use tools",
        "Agent security only affects RAG"
      ],
      correct: "Agents can perform real actions with real consequences and have access to privileged APIs",
    },
  },

  // ====================== 02 AI Agent Architecture ======================
  {
    id: "agent-architecture",
    title: "02 AI Agent Architecture",
    content: (
      <>
        <h2>AI Agent Architecture</h2>
        <p>
          Understanding how agents are built is essential before you can attack
          or secure them effectively.
        </p>

        <h3>Common Agent Components</h3>
        <ul>
          <li><strong>Planner / Reasoner</strong> — Decides what steps to take</li>
          <li><strong>Memory</strong> — Short-term and long-term context storage</li>
          <li><strong>Tool Interface</strong> — Functions the agent can call</li>
          <li><strong>Executor</strong> — Actually runs the chosen tools</li>
          <li><strong>Observer / Critic</strong> — Evaluates results and decides next steps</li>
          <li><strong>Guardrails</strong> — Safety and permission checks</li>
        </ul>

        <h3>Popular Agent Frameworks</h3>
        <ul>
          <li>LangChain / LangGraph</li>
          <li>LlamaIndex Workflows</li>
          <li>AutoGen / AG2</li>
          <li>CrewAI</li>
          <li>OpenAI Assistants API & Swarm</li>
          <li>Semantic Kernel</li>
          <li>Custom agent loops</li>
        </ul>

        <h3>Key Architectural Risks</h3>
        <ul>
          <li>Over-privileged tools</li>
          <li>Lack of isolation between tools</li>
          <li>Untrusted memory or retrieved content</li>
          <li>Missing human-in-the-loop controls</li>
          <li>Weak authentication between agent components</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Most agent vulnerabilities come from how the components are wired
            together and what permissions each part has. Architecture review is
            one of the highest-value activities in agent security assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which agent component is responsible for actually executing the chosen tools?",
      options: [
        "Executor",
        "Planner / Reasoner",
        "Observer / Critic",
        "Guardrails"
      ],
      correct: "Executor",
    },
  },

  // ====================== 03 Threat Modeling AI Agents ======================
  {
    id: "threat-model",
    title: "03 Threat Modeling AI Agents",
    content: (
      <>
        <h2>Threat Modeling AI Agents</h2>
        <p>
          A solid threat model is the foundation of any serious AI Agent
          security assessment.
        </p>

        <h3>Primary Threat Actors</h3>
        <ul>
          <li>External attackers via user input</li>
          <li>Malicious content in retrieved documents or websites</li>
          <li>Compromised tools or third-party plugins</li>
          <li>Insider threats with access to agent configuration</li>
          <li>Supply-chain attacks on agent frameworks</li>
        </ul>

        <h3>High-Value Assets</h3>
        <ul>
          <li>Credentials and API keys used by tools</li>
          <li>Access to internal systems and databases</li>
          <li>User data and conversation history</li>
          <li>Ability to send emails, messages, or money</li>
          <li>Code execution environments</li>
        </ul>

        <h3>Common Attack Goals</h3>
        <ul>
          <li>Force the agent to call dangerous tools</li>
          <li>Exfiltrate sensitive data</li>
          <li>Escalate privileges inside the environment</li>
          <li>Persist malicious instructions in memory</li>
          <li>Pivot from the agent into other systems</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always start by mapping what the agent can do and what an attacker
            would want to achieve. This guides which tests matter most.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which is listed as a high-value asset in AI Agent threat modeling?",
      options: [
        "Ability to send emails, messages, or money",
        "Short-term conversation memory",
        "Direct user input only",
        "Traditional chatbots"
      ],
      correct: "Ability to send emails, messages, or money",
    },
  },

  // ====================== 04 Prompt Injection in Agents ======================
  {
    id: "prompt-injection-agents",
    title: "04 Prompt Injection in Agents",
    content: (
      <>
        <h2>Prompt Injection in Agents</h2>
        <p>
          Prompt injection becomes significantly more dangerous when the model
          has tools. A successful injection can cause the agent to take real
          actions.
        </p>

        <h3>Direct Prompt Injection</h3>
        <ul>
          <li>User directly overrides system instructions</li>
          <li>Forces the agent to ignore safety rules</li>
          <li>Tricks the agent into calling restricted tools</li>
        </ul>

        <h3>Indirect Prompt Injection</h3>
        <ul>
          <li>Malicious instructions hidden in documents, emails, or websites</li>
          <li>Retrieved content that contains “ignore previous instructions”</li>
          <li>Poisoned knowledge bases or vector stores</li>
          <li>Malicious tool responses that influence future decisions</li>
        </ul>

        <h3>Why Agents Are Especially Vulnerable</h3>
        <ul>
          <li>Agents treat tool outputs and retrieved data as trusted context</li>
          <li>Long-running memory can store malicious instructions</li>
          <li>Multi-step reasoning makes injection effects persistent</li>
          <li>Tool calling creates a direct path from language to action</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            In agents, prompt injection is no longer just about generating bad
            text — it can lead to unauthorized actions. Indirect injection is
            currently one of the most serious risks.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of prompt injection involves malicious instructions hidden in retrieved documents or websites?",
      options: [
        "Indirect Prompt Injection",
        "Direct Prompt Injection",
        "Memory poisoning",
        "Tool abuse"
      ],
      correct: "Indirect Prompt Injection",
    },
  },

  // ====================== 05 Tool Calling & Privilege Abuse ======================
  {
    id: "tool-abuse",
    title: "05 Tool Calling & Privilege Abuse",
    content: (
      <>
        <h2>Tool Calling & Privilege Abuse</h2>
        <p>
          Tools are the primary way agents interact with the outside world.
          Poorly designed tool interfaces are a major source of risk.
        </p>

        <h3>Common Dangerous Tools</h3>
        <ul>
          <li>Code execution / interpreter tools</li>
          <li>File system access</li>
          <li>Database query tools</li>
          <li>Email / messaging sending</li>
          <li>Web browsing and HTTP request tools</li>
          <li>Cloud and infrastructure management tools</li>
          <li>Payment or financial action tools</li>
        </ul>

        <h3>Abuse Scenarios</h3>
        <ul>
          <li>Agent is tricked into calling a high-privilege tool</li>
          <li>Tool arguments are manipulated via injection</li>
          <li>Agent chains multiple tools to escalate impact</li>
          <li>Lack of argument validation allows injection into tools</li>
          <li>Overly broad tool permissions</li>
        </ul>

        <h3>Security Controls for Tools</h3>
        <ul>
          <li>Least-privilege tool design</li>
          <li>Strict input validation and allow-listing</li>
          <li>Human approval for sensitive actions</li>
          <li>Rate limiting and monitoring of tool usage</li>
          <li>Separation of high-risk and low-risk tools</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Every tool an agent can call should be treated as a potential
            attack surface. Minimize permissions and require confirmation for
            anything that can cause real damage.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which security control requires human approval for sensitive actions?",
      options: [
        "Human approval for sensitive actions",
        "Temperature manipulation",
        "RAG isolation",
        "Membership inference"
      ],
      correct: "Human approval for sensitive actions",
    },
  },

  // ====================== 06 Memory & State Attacks ======================
  {
    id: "memory-attacks",
    title: "06 Memory & State Attacks",
    content: (
      <>
        <h2>Memory & State Attacks</h2>
        <p>
          Agents often maintain memory across turns or sessions. This memory
          can become a persistent attack vector.
        </p>

        <h3>Types of Memory</h3>
        <ul>
          <li>Short-term conversation memory</li>
          <li>Long-term vector / summary memory</li>
          <li>Entity memory and user profiles</li>
          <li>Scratchpads and intermediate reasoning</li>
        </ul>

        <h3>Attack Opportunities</h3>
        <ul>
          <li>Injecting malicious instructions into long-term memory</li>
          <li>Poisoning summaries that influence future decisions</li>
          <li>Cross-user memory leakage</li>
          <li>Persisting jailbreaks or role overrides</li>
          <li>Manipulating agent personality or goals over time</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Memory turns a one-time injection into a persistent compromise.
            Always treat agent memory as untrusted and apply strong isolation
            and validation.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of memory is described as turning a one-time injection into a persistent compromise?",
      options: [
        "Long-term vector / summary memory",
        "Short-term conversation memory",
        "Tool arguments",
        "Direct user input"
      ],
      correct: "Long-term vector / summary memory",
    },
  },

  // ====================== 07 RAG Inside Agents ======================
  {
    id: "rag-in-agents",
    title: "07 RAG Inside Agents",
    content: (
      <>
        <h2>RAG Inside Agents</h2>
        <p>
          Many agents use Retrieval-Augmented Generation to fetch external
          knowledge. This creates a powerful indirect prompt injection channel.
        </p>

        <h3>Risks Specific to Agents</h3>
        <ul>
          <li>Retrieved documents containing malicious instructions</li>
          <li>Agent treats retrieved content as high-authority</li>
          <li>Poisoned knowledge bases affecting many users</li>
          <li>Retrieval of sensitive documents the user should not access</li>
          <li>Chaining retrieval + tool use for greater impact</li>
        </ul>

        <h3>Defensive Measures</h3>
        <ul>
          <li>Treat all retrieved content as untrusted</li>
          <li>Separate system instructions from retrieved data clearly</li>
          <li>Apply content filtering on retrieved documents</li>
          <li>Limit which collections an agent can search</li>
          <li>Monitor for suspicious retrieval patterns</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            RAG is one of the most common ways indirect prompt injection
            enters agent systems. Never trust retrieved content as safe
            instructions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which defensive measure requires separating system instructions from retrieved data clearly?",
      options: [
        "Separate system instructions from retrieved data clearly",
        "Use temperature manipulation",
        "Implement membership inference",
        "Only use short-term memory"
      ],
      correct: "Separate system instructions from retrieved data clearly",
    },
  },

  // ====================== 08 Multi-Agent Systems Risks ======================
  {
    id: "multi-agent-systems",
    title: "08 Multi-Agent Systems Risks",
    content: (
      <>
        <h2>Multi-Agent Systems Risks</h2>
        <p>
          Systems with multiple cooperating agents introduce additional
          complexity and new attack surfaces.
        </p>

        <h3>New Risk Categories</h3>
        <ul>
          <li>Malicious agent impersonation</li>
          <li>Inter-agent prompt injection</li>
          <li>Privilege escalation via agent communication</li>
          <li>Collusion between compromised agents</li>
          <li>Lack of authentication between agents</li>
          <li>Shared memory or tool access across agents</li>
        </ul>

        <h3>Design Recommendations</h3>
        <ul>
          <li>Strong identity and authentication between agents</li>
          <li>Least privilege per agent role</li>
          <li>Clear communication protocols and validation</li>
          <li>Monitoring of inter-agent messages</li>
          <li>Isolation of high-privilege agents</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Multi-agent architectures multiply both capability and risk.
            Treat every agent as a potential attack surface and apply zero-trust
            principles between them.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which new risk category in multi-agent systems involves collusion between compromised agents?",
      options: [
        "Collusion between compromised agents",
        "Direct prompt injection",
        "Tool abuse",
        "Human-in-the-loop bypass"
      ],
      correct: "Collusion between compromised agents",
    },
  },

  // ====================== 09 Human-in-the-Loop & Approval Flows ======================
  {
    id: "human-in-the-loop",
    title: "09 Human-in-the-Loop & Approval Flows",
    content: (
      <>
        <h2>Human-in-the-Loop & Approval Flows</h2>
        <p>
          For high-risk actions, requiring human approval is one of the most
          effective controls available.
        </p>

        <h3>When Human Approval is Essential</h3>
        <ul>
          <li>Sending emails or messages externally</li>
          <li>Executing code or system commands</li>
          <li>Financial transactions or purchases</li>
          <li>Deleting or modifying critical data</li>
          <li>Changing permissions or access controls</li>
          <li>Any irreversible or high-impact action</li>
        </ul>

        <h3>Common Weaknesses</h3>
        <ul>
          <li>Approval requests that are easy to social-engineer</li>
          <li>Agents that can bypass approval under certain conditions</li>
          <li>Unclear or overly complex approval interfaces</li>
          <li>Missing approval for chained or indirect actions</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Human-in-the-loop controls significantly reduce risk, but only if
            they are correctly designed and cannot be easily bypassed by the
            agent itself.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which high-risk action requires human approval in most AI Agent systems?",
      options: [
        "Any irreversible or high-impact action",
        "Simple code execution",
        "Short conversation memory",
        "Direct user input"
      ],
      correct: "Any irreversible or high-impact action",
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
          Because agents are dynamic, strong logging and monitoring are
          essential for detecting abuse.
        </p>

        <h3>What to Monitor</h3>
        <ul>
          <li>Tool calls and their arguments</li>
          <li>Unusual sequences of tool usage</li>
          <li>Attempts to access restricted tools</li>
          <li>Changes in agent memory or goals</li>
          <li>High-volume or anomalous retrievals</li>
          <li>Failed or blocked actions</li>
        </ul>

        <h3>Useful Signals</h3>
        <ul>
          <li>Sudden increase in privileged tool usage</li>
          <li>Tool calls that don’t match the user’s original request</li>
          <li>Repeated injection-style language in context</li>
          <li>Cross-user data access patterns</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Comprehensive logging of agent decisions and tool usage is critical.
            Without visibility, successful attacks can go unnoticed for a long
            time.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which monitoring signal indicates a potential prompt injection attempt?",
      options: [
        "Repeated injection-style language in context",
        "Sudden increase in privileged tool usage",
        "Normal conversation flow",
        "Short-term memory only"
      ],
      correct: "Repeated injection-style language in context",
    },
  },

  // ====================== 11 Hardening AI Agents ======================
  {
    id: "hardening",
    title: "11 Hardening AI Agents",
    content: (
      <>
        <h2>Hardening AI Agents</h2>
        <p>
          Securing agents requires layered controls across architecture,
          tools, memory, and runtime behavior.
        </p>

        <h3>Key Hardening Measures</h3>
        <ul>
          <li>Apply least privilege to every tool</li>
          <li>Require human approval for sensitive actions</li>
          <li>Treat all external content as untrusted</li>
          <li>Isolate agent execution environments</li>
          <li>Validate and sanitize tool arguments</li>
          <li>Limit memory scope and lifetime</li>
          <li>Implement strong authentication between components</li>
          <li>Continuously test with adversarial prompts</li>
        </ul>

        <h3>Architectural Best Practices</h3>
        <ul>
          <li>Separate planning from execution</li>
          <li>Use capability-based tool access</li>
          <li>Prefer short-lived credentials</li>
          <li>Design for easy revocation of agent permissions</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            There is no single control that makes agents safe. Defense in depth
            — combining architecture, permissions, validation, and monitoring —
            is required.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which architectural best practice requires separating planning from execution?",
      options: [
        "Separate planning from execution",
        "Temperature manipulation",
        "RAG filtering only",
        "Memory poisoning defense"
      ],
      correct: "Separate planning from execution",
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
          A structured approach produces more reliable and valuable AI Agent
          security assessments.
        </p>

        <h3>Recommended Assessment Flow</h3>
        <ol>
          <li>Map the full agent architecture and tool set</li>
          <li>Identify high-privilege tools and data access</li>
          <li>Test direct and indirect prompt injection</li>
          <li>Attempt to force unauthorized tool use</li>
          <li>Evaluate memory and state persistence risks</li>
          <li>Test RAG and retrieval channels</li>
          <li>Review human-in-the-loop effectiveness</li>
          <li>Assess monitoring and detection capabilities</li>
          <li>Document findings with clear impact and remediation</li>
        </ol>

        <h3>Professional Guidelines</h3>
        <ul>
          <li>Always operate within authorized scope</li>
          <li>Avoid causing real damage during testing</li>
          <li>Coordinate closely with the development team</li>
          <li>Focus on realistic attack paths and business impact</li>
          <li>Provide both tactical fixes and strategic recommendations</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Effective AI Agent security work combines deep technical testing
            with clear communication of risk. As agents become more capable,
            continuous assessment will be essential.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first step in the recommended Assessment Flow for AI Agent Security?",
      options: [
        "Map the full agent architecture and tool set",
        "Only write the report",
        "Start with RAG testing",
        "Only cleanup"
      ],
      correct: "Map the full agent architecture and tool set",
    },
  },
];

const AIAgentSecurity = () => {
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
            <span className="gradient-text">AI Agent Security</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/ljCUlblC4PL0KSq9q5fD/image.png"
          alt="AI Agent Security"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=AI+Agent+Security";
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

export default AIAgentSecurity;