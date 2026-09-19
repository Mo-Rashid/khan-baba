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
    image: "/images/courses/eh-introduction.png",
    level: "Beginner",
  },
  {
    id: "linux-basics-for-hackers",
    title: "Linux Basics for Hackers",
    description:
      "Master essential Linux commands, file system navigation, permissions, scripting basics, and the terminal skills every ethical hacker needs.",
    image: "/images/courses/eh-linux.png",
    level: "Beginner",
  },
  {
    id: "networking-fundamentals",
    title: "Networking Fundamentals",
    description:
      "Learn TCP/IP, OSI model, ports, protocols, subnetting, and network architecture concepts critical for security assessments.",
    image: "/images/courses/eh-networking.png",
    level: "Beginner to Intermediate",
  },
  {
    id: "footprinting-and-reconnaissance",
    title: "Footprinting and Reconnaissance",
    description:
      "Explore passive and active information gathering techniques, OSINT tools, Google hacking, and target profiling methods.",
    image: "/images/courses/eh-footprinting.png",
    level: "Beginner to Intermediate",
  },
  {
    id: "scanning-techniques",
    title: "Scanning Techniques",
    description:
      "Understand network scanning, port scanning, vulnerability scanning, and how to identify live hosts and open services.",
    image: "/images/courses/eh-scanning.png",
    level: "Intermediate",
  },
  {
    id: "enumeration-techniques",
    title: "Enumeration Techniques",
    description:
      "Learn service enumeration, user and share discovery, SNMP, LDAP, NetBIOS, and extracting valuable target information.",
    image: "/images/courses/eh-enumeration.png",
    level: "Intermediate",
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    description:
      "Study human-based attack vectors, phishing, pretexting, baiting, and defense strategies against social engineering.",
    image: "/images/courses/eh-social-engineering.png",
    level: "Intermediate",
  },
  {
    id: "sniffing-and-spoofing",
    title: "Sniffing and Spoofing",
    description:
      "Understand packet sniffing, ARP spoofing, MAC spoofing, man-in-the-middle concepts, and network traffic analysis.",
    image: "/images/courses/eh-sniffing.png",
    level: "Intermediate",
  },
  {
    id: "session-hijacking",
    title: "Session Hijacking",
    description:
      "Learn session management flaws, cookie hijacking, TCP session hijacking, and methods to detect and prevent session attacks.",
    image: "/images/courses/eh-session-hijacking.png",
    level: "Intermediate to Advanced",
  },
  {
    id: "password-attacks",
    title: "Password Attacks",
    description:
      "Explore password cracking techniques, dictionary attacks, brute force, rainbow tables, and password security best practices.",
    image: "/images/courses/eh-password.png",
    level: "Intermediate",
  },
  {
    id: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    description:
      "Learn systematic vulnerability identification, scanning tools, risk rating, and reporting findings for authorized assessments.",
    image: "/images/courses/eh-vulnerability.png",
    level: "Intermediate to Advanced",
  },
  {
    id: "network-pentesting",
    title: "Network Penetration Testing",
    description:
      "Apply end-to-end network penetration testing methodology: recon, scanning, exploitation concepts, and professional reporting.",
    image: "/images/courses/eh-network-pentest.png",
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
              src="/images/logo.png"
              alt="Mo Rashid"
              className="bb-profile-img"
              onError={(e) => {
                e.target.src = "/images/EthicalHacking.png";
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
              <div className="course-image">
                <img
                  src={course.image}
                  alt={course.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x220/1a0b2e/a855f7?text=" +
                      encodeURIComponent(course.title);
                  }}
                />
                <span className="course-level">{course.level}</span>
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