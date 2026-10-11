import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Feedback from "../components/Feedback/Feedback";
import "./AIRedTeaming.css";

export const aiRedTeamingCourses = [
  {
    id: "ai-red-teaming-fundamentals",
    title: "AI Red Teaming Fundamentals",
    description:
      "Learn the core concepts of AI Red Teaming, threat models for LLMs, safety alignment, and how to approach AI system assessments.",
       level: "Beginner",
  },
  {
    id: "prompt-injection",
    title: "Prompt Injection Attacks",
    description:
      "Master direct and indirect prompt injection techniques, system prompt extraction, and defense strategies against injection attacks.",
        level: "Intermediate",
  },
  {
    id: "jailbreaking-llms",
    title: "Jailbreaking LLMs",
    description:
      "Explore jailbreak techniques, role-playing attacks, multi-turn manipulation, and methods to bypass safety guardrails.",
        level: "Intermediate to Advanced",
  },
  {
    id: "llm-security",
    title: "LLM Security & Guardrails",
    description:
      "Understand LLM security risks, output filtering, alignment failures, and how to evaluate the effectiveness of safety controls.",
      level: "Intermediate",
  },
  {
    id: "rag-attacks",
    title: "RAG & Retrieval Attacks",
    description:
      "Learn how to attack Retrieval-Augmented Generation systems through document poisoning, indirect injection, and data leakage.",
     level: "Advanced",
  },
  {
    id: "ai-agents-tools",
    title: "AI Agents & Tool Abuse",
    description:
      "Assess risks in AI agents, tool calling, privilege escalation through tools, and securing agentic workflows.",
     level: "Advanced",
  },
  {
    id: "data-leakage-memorization",
    title: "Data Leakage & Memorization",
    description:
      "Test for sensitive data leakage, training data extraction, system prompt recovery, and privacy risks in LLMs.",
    image: "/images/courses/ai-data-leakage.png",
    level: "Intermediate to Advanced",
  },
  {
    id: "adversarial-ml",
    title: "Adversarial Machine Learning",
    description:
      "Explore adversarial inputs, evasion techniques, model extraction, and attacks against classifiers and safety filters.",
    level: "Advanced",
  },
  {
    id: "ai-risk-assessment",
    title: "AI Risk Assessment & Governance",
    description:
      "Build structured AI risk assessments, evaluate real-world impact, and create actionable recommendations for AI systems.",
     level: "Intermediate to Advanced",
  },
  {
    id: "ai-red-team-methodology",
    title: "AI Red Team Methodology",
    description:
      "Learn professional methodology for AI Red Teaming engagements, scoping, reporting, and continuous testing programs.",
    level: "Advanced",
  },
];

const AIRedTeaming = () => {
  return (
    <div className="airedteaming-page">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="ai-hero">
        <div className="ai-hero-left">
          <span className="ai-badge">AI SECURITY RESEARCHER</span>
          <h1 className="ai-title">
            AI <span className="gradient-text">Red Teaming</span>
          </h1>
          <p className="ai-subtitle">
            Prompt Injection • Jailbreak • LLM Security • AI Risk Assessment
          </p>
          <p className="ai-desc">
            Master offensive techniques against Large Language Models, AI agents,
            and generative AI systems. Learn prompt injection, jailbreaking,
            RAG attacks, data leakage, and professional AI risk assessment.
          </p>
        </div>

        <div className="ai-hero-right">
          <div className="ai-profile-wrapper">
            
            <img
              src="https://plain-apac-prod-public.komododecks.com/202610/03/INjFysz5pVXhM3VlY8fZ/image.png"
              alt="Mo Rashid"
              className="ai-profile-img"
              onError={(e) => {
                e.target.src = "https://plain-apac-prod-public.komododecks.com/202610/03/INjFysz5pVXhM3VlY8fZ/image.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section className="ai-section">
        <div className="section-header">
           <h2 className="section-title">AI Red Teaming Courses</h2>
        </div>

        <div className="courses-grid">
          {aiRedTeamingCourses.map((course) => (
            <Link
              to={`/ai-red-teaming/course/${course.id}`}
              className="course-card"
              key={course.id}
            >
              
<div className={`course-image ai-code-art ai-art-${course.id}`}>
  <span className="course-level">{course.level}</span>

  <div className="ai-art-grid" />

  <div className="ai-art-content">
    <span className="ai-art-label">VULNXploit / AI RED TEAMING</span>

    <div className="ai-art-symbol">{"</>"}</div>

    <span className="ai-art-title">{course.title}</span>

    <span className="ai-art-line">
      {">"} ai_security.test()
    </span>
  </div>
</div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span className="read-more">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Feedback section="ai-red-teaming" />
    </div>
  );
};

export default AIRedTeaming;