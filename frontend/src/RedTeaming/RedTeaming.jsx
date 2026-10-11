import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Feedback from "../components/Feedback/Feedback";
import "./RedTeaming.css";

export const redTeamingCourses = [
  {
    id: "red-team-fundamentals",
    title: "Red Team Fundamentals",
    description:
      "Learn red team concepts, objectives, rules of engagement, attack lifecycle, and professional adversary simulation methodology.",
     level: "Beginner",
  },

  {
    id: "recon-osint",
    title: "Recon & OSINT",
    description:
      "Master passive and active reconnaissance, OSINT frameworks, target profiling, and attack surface discovery.",
    level: "Beginner to Intermediate",
  },

  {
    id: "initial-access-techniques",
    title: "Initial Access Techniques",
    description:
      "Understand how red teams gain initial footholds through phishing simulations, exposed services, and entry vectors.",
     level: "Intermediate",
  },

  {
    id: "payload-development-fundamentals",
    title: "Payload Development Fundamentals",
    description:
      "Learn payload concepts, delivery methods, execution flow, and payload analysis for authorized security assessments.",
     level: "Intermediate to Advanced",
  },

  {
    id: "privilege-escalation",
    title: "Privilege Escalation (Windows & Linux)",
    description:
      "Explore Windows and Linux privilege escalation concepts, misconfigurations, permissions, and security controls.",
     level: "Intermediate to Advanced",
  },

  {
    id: "cloud-red-teaming",
    title: "Cloud Red Teaming",
    description:
      "Learn cloud security assessment concepts across AWS, Azure, and GCP environments with identity and access focus.",
     level: "Advanced",
  },

  {
    id: "external-network-pentest",
    title: "External Network Penetration Testing",
    description:
      "Assess internet-facing infrastructure, services, vulnerabilities, and external attack surfaces.",
     level: "Intermediate",
  },

  {
    id: "mobile-red-teaming",
    title: "Mobile Red Teaming",
    description:
      "Understand mobile application security testing, Android/iOS attack surfaces, and mobile threat simulation.",
      level: "Advanced",
  },

  {
    id: "wireless-network-attacks",
    title: "Wireless Network Attacks",
    description:
      "Learn wireless security fundamentals, WiFi assessment techniques, encryption weaknesses, and defense strategies.",
      level: "Intermediate",
  },

  {
    id: "active-directory-attacks",
    title: "Active Directory Attacks",
    description:
      "Master Active Directory security concepts including authentication, trust relationships, identity attacks, and enterprise security testing.",
     level: "Advanced",
  },
];
const RedTeaming = () => {
  return (
    <div className="redteaming-page">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="bb-hero">
        <div className="bb-hero-left">
          <span className="bb-badge">RED TEAM OPERATOR</span>
          <h1 className="bb-title">
            RED <span className="gradient-text">TEAMING</span>
          </h1>
          <p className="bb-subtitle">
            Red Teaming • Adversary Simulation • Real-World Attacks
          </p>
          <p className="bb-desc">
            Learn practical red team skills with structured courses covering
            recon, initial access, privilege escalation, Active Directory,
            C2, OPSEC, and professional reporting.
          </p>
        </div>

        <div className="bb-hero-right">
          <div className="bb-profile-wrapper">
            
            <img
              src="https://plain-apac-prod-public.komododecks.com/202610/03/INjFysz5pVXhM3VlY8fZ/image.png"
              alt="Mo Rashid"
              className="bb-profile-img"
              onError={(e) => {
                e.target.src = "https://plain-apac-prod-public.komododecks.com/202610/03/INjFysz5pVXhM3VlY8fZ/image.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section className="bb-section">
        <div className="section-header">
           <h2 className="section-title">Red Teaming Courses</h2>
        </div>

        <div className="courses-grid">
          {redTeamingCourses.map((course) => (
            <Link
              to={`/red-teaming/course/${course.id}`}
              className="course-card"
              key={course.id}
            >
              
<div className={`course-image rt-code-art rt-art-${course.id}`}>
  <span className="course-level">{course.level}</span>

  <div className="rt-art-grid" />

  <div className="rt-art-content">
    <span className="rt-art-label">VULNXploit / RED TEAMING</span>

    <div className="rt-art-symbol">{"</>"}</div>

    <span className="rt-art-title">{course.title}</span>

    <span className="rt-art-line">
      {">"} adversary.simulation()
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
      <Feedback section="red-teaming" />
    </div>
  );
};

export default RedTeaming;