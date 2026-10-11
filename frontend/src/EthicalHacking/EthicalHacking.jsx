import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Feedback from "../components/Feedback/Feedback";
import "./EthicalHacking.css";

export const ethicalHackingCourses = [
  {
    id: "introduction-to-ethical-hacking",
    title: "Introduction to Ethical Hacking",
    description:
      "Understand ethical hacking fundamentals, types of hackers, hacking phases, legal frameworks, and the role of ethical hackers in cybersecurity.",
    
    level: "Beginner",
  },
  {
    id: "linux-basics-for-hackers",
    title: "Linux Basics for Hackers",
    description:
      "Master essential Linux commands, file system navigation, permissions, scripting basics, and the terminal skills every ethical hacker needs.",
   
    level: "Beginner",
  },
  {
    id: "networking-fundamentals",
    title: "Networking Fundamentals",
    description:
      "Learn TCP/IP, OSI model, ports, protocols, subnetting, and network architecture concepts critical for security assessments.",
    
    level: "Beginner to Intermediate",
  },
  {
    id: "footprinting-and-reconnaissance",
    title: "Footprinting and Reconnaissance",
    description:
      "Explore passive and active information gathering techniques, OSINT tools, Google hacking, and target profiling methods.",
    
    level: "Beginner to Intermediate",
  },
  {
    id: "scanning-techniques",
    title: "Scanning Techniques",
    description:
      "Understand network scanning, port scanning, vulnerability scanning, and how to identify live hosts and open services.",
    
    level: "Intermediate",
  },
  {
    id: "enumeration-techniques",
    title: "Enumeration Techniques",
    description:
      "Learn service enumeration, user and share discovery, SNMP, LDAP, NetBIOS, and extracting valuable target information.",
    
    level: "Intermediate",
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    description:
      "Study human-based attack vectors, phishing, pretexting, baiting, and defense strategies against social engineering.",
   
    level: "Intermediate",
  },
  {
    id: "sniffing-and-spoofing",
    title: "Sniffing and Spoofing",
    description:
      "Understand packet sniffing, ARP spoofing, MAC spoofing, man-in-the-middle concepts, and network traffic analysis.",
   
    level: "Intermediate",
  },
  {
    id: "session-hijacking",
    title: "Session Hijacking",
    description:
      "Learn session management flaws, cookie hijacking, TCP session hijacking, and methods to detect and prevent session attacks.",
   
    level: "Intermediate to Advanced",
  },
  {
    id: "password-attacks",
    title: "Password Attacks",
    description:
      "Explore password cracking techniques, dictionary attacks, brute force, rainbow tables, and password security best practices.",
    
    level: "Intermediate",
  },
  {
    id: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    description:
      "Learn systematic vulnerability identification, scanning tools, risk rating, and reporting findings for authorized assessments.",

    level: "Intermediate to Advanced",
  },
  {
    id: "network-pentesting",
    title: "Network Penetration Testing",
    description:
      "Apply end-to-end network penetration testing methodology: recon, scanning, exploitation concepts, and professional reporting.",
    
    level: "Advanced",
  },
];

const EthicalHacking = () => {
  return (
    <div className="ethicalhacking-page">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="bb-hero">
        <div className="bb-hero-left">
          <span className="bb-badge">ETHICAL HACKER</span>
          <h1 className="bb-title">
            ETHICAL <span className="gradient-text">HACKING</span>
          </h1>
          <p className="bb-subtitle">
            Ethical Hacking • Penetration Testing • Cybersecurity Fundamentals
          </p>
          <p className="bb-desc">
            Master practical ethical hacking skills with structured courses covering
            Linux, networking, reconnaissance, scanning, enumeration, social
            engineering, and network penetration testing.
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
            <h2 className="section-title">Ethical Hacking Courses</h2>
        </div>

        <div className="courses-grid">
          {ethicalHackingCourses.map((course) => (
            <Link
              to={`/ethical-hacking/course/${course.id}`}
              className="course-card"
              key={course.id}
            >
              
<div className={`course-image eh-code-art eh-art-${course.id}`}>
  <span className="course-level">{course.level}</span>

  <div className="eh-art-grid" />

  <div className="eh-art-content">
    <span className="eh-art-label">VULNXploit / ETHICAL HACKING</span>

    <div className="eh-art-symbol">{"</>"}</div>

    <span className="eh-art-title">{course.title}</span>

    <span className="eh-art-line">
      {">"} security.assessment()
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
      <Feedback section="ethical-hacking" />
    </div>
  );
};

export default EthicalHacking;