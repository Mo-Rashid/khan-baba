import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";   // ← correct pathimport "./Dashboard.css";
import { dashboardCards } from "./dashboardData.js";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import {
  FaThLarge,
  FaBriefcase,
  FaBug,
  FaRobot,
  FaUserSecret,
  FaSignInAlt,
  FaShieldAlt,
  FaArrowRight,
  FaCircle,
} from "react-icons/fa";

/* ============ NAV CONFIG ============ */
const NAV_ITEMS = [
  { id: "Dashboard", label: "Dashboard", icon: <FaThLarge /> },
  { id: "Portfolio", label: "Portfolio", icon: <FaBriefcase /> },
  { id: "Bug Bounty", label: "Bug Bounty", icon: <FaShieldAlt /> },
  { id: "Red Teaming", label: "Red Teaming", icon: <FaBug /> },
  { id: "AI Red Teaming", label: "AI Red Teaming", icon: <FaRobot /> },
  { id: "Ethical Hacking", label: "Ethical Hacking", icon: <FaUserSecret /> },
  

  { id: "All-CTF-Lab", label: "All-CTF-Lab", icon: <FaUserSecret /> },
];

/* ============ SOCIAL CONFIG ============ */
const SOCIAL_LINKS = [

   {
  id: "youtube",
  label: "YOUTUBE",
  desc: "Cyber Security Tutorials",
  icon: "▶️",
  url: "https://www.youtube.com/@KhanSploit",
}, 
  {
    id: "linkedin",
    label: "LINKEDIN",
    desc: "Professional Network ",
    icon: "💼",
    url: "https://www.linkedin.com/in/khansploit/",
  },
  {
    id: "x",
    label: "X.COM",
    desc: "Security News & Research",
    icon: "✕",
    url: "https://x.com/rashid_mo62215",
  },
  {
    id: "medium",
    label: "MEDIUM",
    desc: "Research Articles & Blogs",
    icon: "M",
    url: "https://medium.com/@rashidsheikh8840",
  },
  {
    id: "github",
    label: "GITHUB",
    desc: "Open Source Projects",
    icon: "GH",
    url: "https://github.com/Mo-Rashid",
  },
];

/* ============ 3D TILT WRAPPER ============ */
const Tilt3D = ({ children, max = 12 }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(
      2
    )}deg) rotateY(${ry.toFixed(2)}deg) translateZ(8px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      className="tilt3d"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

/* ============ MAIN DASHBOARD ============ */
const Dashboard = () => {
  const navigate = useNavigate(); // ✅ correct place
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const selectMenu = (id) => setActiveMenu(id);

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dashboard-container">
      {/* ============ NAVBAR ============ */}
      <header className="navbar">
        <div className="logo-area">
          <div className="logo-wrapper">
            <img src="/images/logo.png" alt="KHAN SPLOIT" className="logo" />
          </div>
          <div className="logo-content">
            <h1 className="logo-title">KHAN SPLOIT</h1>
            <p className="logo-sub">CYBER SECURITY PLATFORM</p>
          </div>
        </div>

        <nav aria-label="Primary navigation">
          <ul className="menu">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.id}
                role="button"
                tabIndex={0}
                aria-current={activeMenu === item.id ? "page" : undefined}
                className={activeMenu === item.id ? "active" : ""}
                onClick={() => {
                  selectMenu(item.id);
                  switch (item.id) {
                    case "Dashboard":
                      navigate("/");
                      break;
                    case "Portfolio":
                      navigate("/portfolio");
                      break;
                    case "Bug Bounty":
                      navigate("/bug-bounty");
                      break;
                    case "Red Teaming":
                      navigate("/red-teaming");
                      break;
                    case "AI Red Teaming":
                      navigate("/ai-red-teaming");
                      break;
                    case "Ethical Hacking":
                      navigate("/ethical-hacking");
                      break;
                    default:
                      break;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectMenu(item.id);
                  }
                }}
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          <FaSignInAlt />
          Login
        </button>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="dashboard">
        {/* Left Side */}
        <div className="hero-left">
          <span className="hero-badge">CYBER SECURITY PLATFORM</span>
          <h1 className="hero-title">
            LEARNING <span className="extrude-text">KHAN SPLOIT</span>   PLATFORM
          </h1>
          <p className="hero-description">
            Red Teaming <span> • </span> Penetration Testing <span> • </span> AI Security <span> • </span> Ethical
            Hacking <span> • </span> Bug Bounty <span> • </span> Application
            Security
          </p>
        </div>

        
            <img
              src="/images/logo.png"
              alt="KHAN SPLOIT"
              className="hero-logo"
            />

      </section>

      <h2 className="section-title">WELCOME TO KHAN SPLOIT</h2>

      {/* ============ FEATURE CARDS ============ */}
      <section className="feature-grid" id="portfolio">
        
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Tilt3D key={card.id} max={14}>
              <div
                className="feature-card"
                onClick={() => navigate(card.path)} // ✅ fixed
                style={{ cursor: "pointer" }}
              >
                <div className="feature-icon icon-pop">
                  <Icon />
                </div>
                <div className="feature-content">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
                <div className="feature-arrow">
                  <FaArrowRight />
                </div>
              </div>
            </Tilt3D>
          );
        })}
      </section>

      {/* ============ SOCIAL LINKS ============ */}
      <h2 className="section-title">CONNECT WITH ME</h2>
      <section className="social-section">
        
        <div className="social-grid">
          {SOCIAL_LINKS.map((link) => (
            <Tilt3D key={link.id} max={10}>
              <div className="social-card">
                <div className="social-left">
                  <div className="social-icon icon-pop">{link.icon}</div>
                  <div>
                    <h3>{link.label}</h3>
                    <p>{link.desc}</p>
                  </div>
                </div>
                <button type="button" onClick={() => openExternal(link.url)}>
                  Visit
                </button>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* ============ CYBER SECURITY SERVICES ============ */}
      <h2 className="section-title">
            CYBER SECURITY SERVICES
        </h2>

<section className="security-section" id="services">

    <div className="section-header">

        

       

    </div>

    <div className="security-grid">

        {[
            {
                icon:"🌐",
                title:"WEB APPLICATION SECURITY",
                desc:" Vulnerability Assessment"
            },
            {
                icon:"📱",
                title:"ANDROID & IOS SECURITY",
                desc:"Android, iOS Testing & Runtime Security"
            },
            {
                icon:"🔌",
                title:"API SECURITY",
                desc:"REST, GraphQL, OAuth & Authentication & JWT  Security Testing "
            },
            {
                icon:"☁️",
                title:"CLOUD SECURITY",
                desc:"AWS, Azure, GCP Infrastructure Security Assessment"
            },
            {
                icon:"🛡️",
                title:"NETWORK SECURITY",
                desc:"Firewall, IDS, VPN &  Network Protection"
            },
            {
                icon:"🎯",
                title:"VAPT",
                desc:"Application Testing & Penetration Security Assessment"
            },
            {
                icon:"🐞",
                title:"BUG BOUNTY",
                desc:"Responsible Disclosure & Vulnerability Research Program"
            },
            {
                icon:"🎭",
                title:"RED TEAMING",
                desc:"Attack Simulation & Adversary Emulation Operations"
            },
            {
                icon:"🤖",
                title:"AI SECURITY",
                desc:"LLM Security, Prompt Testing & AI Risk Analysis"
            },
            {
                icon:"🔍",
                title:"SOC ANALYST",
                desc:"Threat Monitoring, SIEM & Incident Response Operations"
            },
            {
                icon:"🦠",
                title:"MALWARE ANALYSIS",
                desc:"Static, Dynamic & Reverse Engineering "
            },
            {
                icon:"🔬",
                title:"DIGITAL FORENSICS",
                desc:"Evidence Collection & Digital  Investigation"
            },
            {
                icon:"🎣",
                title:"SOCIAL ENGINEERING",
                desc:"Phishing Assessment & Human Security "
            },
            {
                icon:"⚡",
                title:"DEVSECOPS",
                desc:"CI/CD Security, SAST & Docker Container Protection"
            },
            {
                icon:"📊",
                title:"THREAT INTELLIGENCE",
                desc:" MITRE ATT&CK & Threat Hunting"
            }
           

        ].map((item,index)=>(

            <Tilt3D key={index} max={12}>

                <div className="security-card">

                    <div className="security-icon">

                        {item.icon}

                    </div>

                    <div className="security-content">

                        <h3>{item.title}</h3>

                        <p>{item.desc}</p>

                    </div>

                </div>

            </Tilt3D>

        ))}

    </div>

</section>

         {/* ============ APPLICATION FEATURES ============ */}

         <h2 className="section-title">    POWERFUL PLATFORM FEATURES  </h2>

<section className="news-section" id="platform-features">

 
  <div className="news-grid">

    {[
      {
        icon: "🤖",
        title: "AI SOC ASSISTANT",
        desc: "AI-powered cybersecurity assistant for threat detection, AppSec guidance and incident response.",
      },
      {
        icon: "📱",
        title: "APK SECURITY ANALYZER",
        desc: "Perform static and dynamic Android application security analysis with detailed findings.",
      },
      {
        icon: "🐞",
        title: "BUG BOUNTY WORKSPACE",
        desc: "Manage targets, organize vulnerabilities and track responsible disclosure reports.",
      },
      {
        icon: "🛡️",
        title: "RED TEAM TOOLKIT",
        desc: "Reconnaissance, exploitation, payload generation and penetration testing utilities.",
      },
      {
        icon: "🌐",
        title: "WEB SECURITY SCANNER",
        desc: "Discover OWASP vulnerabilities, misconfigurations and application security ",
      },
      {
        icon: "📊",
        title: "SECURITY REPORTS",
        desc: "Generate professional vulnerability reports in PDF, DOCX and executive formats.",
      },
    ].map((feature, index) => (

      <Tilt3D key={index} max={10}>

        <div className="news-card">

          <div className="news-header">

            <span className="news-icon">
              {feature.icon}
            </span>

            <h3>{feature.title}</h3>

          </div>

          <p>{feature.desc}</p>

        </div>

      </Tilt3D>

    ))}

  </div>

</section>

      

      {/* ============ PLATFORM TIMELINE ============ */}

      <h2 className="section-title">        PLATFORM ACTIVITY    </h2>

<section className="activity-section" id="timeline">

   

    <div className="timeline">

        {[
            {
                icon:"🤖",
                title:"AI SOC Assistant",
                desc:"AI engine analyzed logs and generated automated security insights.",
                date:"Today"
            },
            {
                icon:"🐞",
                title:"Bug Bounty Dashboard",
                desc:"New vulnerability report submitted and severity classified automatically.",
                date:"2 Hours Ago"
            },
            {
                icon:"📱",
                title:"APK Security Analysis",
                desc:"Static analysis completed with exported components and API discovery.",
                date:"Yesterday"
            },
            {
                icon:"🌐",
                title:"Web Application Scan",
                desc:"OWASP vulnerability scan finished successfully with detailed report.",
                date:"Yesterday"
            },
            {
                icon:"🎯",
                title:"Red Team Assessment",
                desc:"Reconnaissance and attack surface mapping completed successfully.",
                date:"2 Days Ago"
            },
            {
                icon:"📊",
                title:"Security Report",
                desc:"Professional PDF report generated with executive summary and findings.",
                date:"3 Days Ago"
            }

        ].map((item,index)=>(

            <Tilt3D key={index} max={8}>

                <div className="timeline-card">

                    <div className="timeline-dot">

                        {item.icon}

                    </div>

                    <div className="timeline-content">

                        <div className="timeline-header">

                            <h3>{item.title}</h3>

                            <span>{item.date}</span>

                        </div>

                        <p>{item.desc}</p>

                    </div>

                </div>

            </Tilt3D>

        ))}

    </div>

</section>

{/* ============ CONTACT / REPORT SUBMISSION ============ */}

<section className="contact-section" id="contact">

    <div className="contact-header">

        <h2 className="section-title">
            CONTACT & REPORT SUBMISSION
        </h2>

        <p className="section-subtitle">
            Share your message, project requirements or security report.
        </p>

    </div>

    <div className="contact-card">

        <form className="contact-form">

            <div className="input-group">

                <label>Username</label>

                <input
                    type="text"
                    placeholder="Enter your username"
                />

            </div>

            <div className="input-group">

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                />

            </div>

            <div className="input-group">

                <label>Description</label>

                <textarea
                    rows="6"
                    placeholder="Write your message, security report or project details..."
                ></textarea>

            </div>

            <button type="submit" className="submit-btn">

                Submit Report

            </button>

        </form>

    </div>

</section>







      {/* ============ FOOTER ============ */}
      {/* ========================= FOOTER ========================= */}

<footer className="footer">

    <div className="footer-container">

        {/* LEFT */}

        <div className="footer-brand">

            <h2 className="extrude-text-sm">
                KHAN SPLOIT
            </h2>

            <p className="footer-desc">
                AI Powered Cyber Security Platform for
                Penetration Testing, Application Security,
                Bug Bounty, Red Teaming and AI Security.
            </p>

            <div className="footer-social">

                <a href="https://www.youtube.com/@KhanSploit" target="_blank">
                    YouTube
                </a>

                <a href="#">
                    GitHub
                </a>

                <a href="#">
                    LinkedIn
                </a>

                <a href="#">
                    Medium
                </a>

                <a href="#">
                    X
                </a>

            </div>

        </div>

        {/* PLATFORM */}

        <div className="footer-column">

            <h3>Platform</h3>

            <a href="#dashboard">Dashboard</a>

            <a href="#portfolio">Portfolio</a>

            <a href="#services">Services</a>

            <a href="#platform-features">Features</a>

            <a href="#contact">Contact</a>

        </div>

        {/* SECURITY */}

        <div className="footer-column">

            <h3>Cyber Security</h3>

            <a href="#">Web Security</a>

            <a href="#">Mobile Security</a>

            <a href="#">API Security</a>

            <a href="#">Cloud Security</a>

            <a href="#">Bug Bounty</a>

            <a href="#">Red Teaming</a>

        </div>

        {/* AI */}

        <div className="footer-column">

            <h3>AI Platform</h3>

            <a href="#">AI SOC</a>

            <a href="#">AI AppSec</a>

            <a href="#">AI Bug Bounty</a>

            <a href="#">AI Red Team</a>

            <a href="#">AI Report Writer</a>

        </div>

        {/* CONTACT */}

        <div className="footer-column">

            <h3>Contact</h3>

            <p>📧 support@khansploit.com</p>

            <p>🌍 India</p>

            <p>🕒 24×7 AI Assistant</p>

            <button className="footer-btn">

                Contact Now

            </button>

        </div>

    </div>

    <hr />

    <div className="footer-bottom">

        <p>

            © 2026 KHAN SPLOIT • All Rights Reserved

        </p>

        <div className="footer-bottom-links">

            <a href="#">Privacy Policy</a>

            <a href="#">Terms</a>

            <a href="#">Cookies</a>

            <a href="#">Documentation</a>

        </div>

    </div>

</footer>
    </div>
  );
};

export default Dashboard;