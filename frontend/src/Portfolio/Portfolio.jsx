import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Portfolio.css";

import { 
  domains, 
  tools, 
  resources, 
  bugBountyPlatforms, 
  appDevelopment, 
  programmingLanguages,
  projects,
  educationExperience,
  certifications
} from "./portfolioData";

const Portfolio = () => {
  return (
    <div className="portfolio-page">
      {/* ===== NAVBAR ===== */}
      <Navbar />


            {/* ===== HERO SECTION ===== */}
      <section className="port-hero">
        <div className="port-hero-left">
          <span className="port-badge">CYBER SECURITY RESEARCHER</span>
          <h1 className="port-title">
            MO <span className="gradient-text">RASHID</span>
          </h1>
          <p className="port-subtitle">
            Ethical Hacking • Bug Bounty • Application Security • Cloud Security • AI Red Teaming • Secure Development
          </p>
          <p className="port-desc">
            Building secure systems and breaking insecure ones.  
            Passionate about real-world offensive security and research.
          </p>
        </div>

        <div className="port-hero-right">
          <div className="profile-wrapper">
            <div className="profile-glow"></div>
            <img
              src="/images/rashid.png"
              alt="Mo Rashid"
              className="profile-img"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/370x370/1a0b2e/a855f7?text=Mo+Rashid";
              }}
            />
          </div>
        </div>
      </section>




      {/* ===== EDUCATION & EXPERIENCE ===== */}

<section className="port-section">
  <div className="section-header">
   

    <h2 className="section-title">
      Education & Experience
    </h2>
  </div>

  <div className="domain-grid">
    {educationExperience.map((item) => (
      <div className="domain-card" key={item.id}>
        <span className="domain-icon">
          {item.icon}
        </span>

        <h3>{item.title}</h3>

        <h4>{item.organization}</h4>

        <p>{item.description}</p>

        <small>{item.duration}</small>
      </div>
    ))}
  </div>
</section>



{/* ===== CERTIFICATIONS & ACHIEVEMENTS ===== */}

<section className="port-section">
  <div className="section-header">
  

    <h2 className="section-title">
      Certifications & Achievements
    </h2>
  </div>

  <div className="domain-grid">
    {certifications.map((item) => (
      <div className="domain-card" key={item.id}>
        <span className="domain-icon">
          {item.icon}
        </span>

        <h3>{item.title}</h3>

        <h4>{item.organization}</h4>

        <p>{item.description}</p>

        <small>{item.year}</small>
      </div>
    ))}
  </div>
</section>




      {/* ===== CYBER SECURITY DOMAIN ===== */}
      <section className="port-section">
        <div className="section-header">
          <h2 className="section-title">Areas of Expertise</h2>
        </div>

        <div className="domain-grid">
          {domains.map((item, index) => (
            <div className="domain-card" key={index}>
              <span className="domain-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CYBER SECURITY TOOLS ===== */}
      <section className="port-section tools-section">
        <div className="section-header">
           <h2 className="section-title">Security Toolkit</h2>
        </div>

        <div className="domain-grid">
          {tools.map((item, index) => (
            <div className="domain-card" key={index}>
              <span className="domain-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ===== CYBER SECURITY RESOURCES ===== */}
<section className="port-section">
  <div className="section-header">
    <h2 className="section-title">Learning & Research Resources</h2>
  </div>

  <div className="domain-grid">
    {resources.map((item, index) => (
      <div className="domain-card" key={index}>
        <span className="domain-icon">{item.icon}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>

{/* ===== BUG BOUNTY PLATFORMS ===== */}
<section className="port-section tools-section">
  <div className="section-header">
    <h2 className="section-title">Bug Bounty Experience</h2>
  </div>

  <div className="domain-grid">
    {bugBountyPlatforms.map((item, index) => (
      <div className="domain-card" key={index}>
        <span className="domain-icon">{item.icon}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>

{/* ===== APPLICATION DEVELOPMENT ===== */}
<section className="port-section">
  <div className="section-header">
    <h2 className="section-title">Secure Software Development</h2>
  </div>

  <div className="domain-grid">
    {appDevelopment.map((item, index) => (
      <div className="domain-card" key={index}>
        <span className="domain-icon">{item.icon}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>

{/* ===== PROGRAMMING LANGUAGES ===== */}
<section className="port-section tools-section">
  <div className="section-header">
    <h2 className="section-title">Programming Expertise</h2>
  </div>

  <div className="domain-grid">
    {programmingLanguages.map((item, index) => (
      <div className="domain-card" key={index}>
        <span className="domain-icon">{item.icon}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>

{/* ===== PROJECTS ===== */}

<section className="port-section tools-section">
  <div className="section-header">
    
    <h2 className="section-title">
      Security Projects
    </h2>
  </div>

  <div className="domain-grid">
    {projects.map((item) => (
      <div className="domain-card" key={item.id}>
        <span className="domain-icon">
          {item.icon}
        </span>

        <h3>{item.title}</h3>

        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>


{/* ===== PROFESSIONAL FOOTER ===== */}

<footer className="footer">

  <div className="footer-container">

    <div className="footer-brand">

      

      <h2>The VulnXploit</h2>

      <p>
        Cyber Security Researcher • Application Security Engineer •
        AI Security • Bug Bounty Hunter
      </p>

    </div>

    <div className="footer-links">

      <div className="footer-column">

        <h3>Navigation</h3>

        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>

      </div>

      <div className="footer-column">

        <h3>Professional</h3>

        <a href="https://github.com/Mo-Rashid">GitHub</a>
        <a href="https://www.linkedin.com/in/khansploit/">LinkedIn</a>
        <a href="https://medium.com/@rashidsheikh8840">Medium</a>
        <a href="https://www.youtube.com/@KhanSploit">YouTube</a>
        <a href="https://x.com/rashid_mo62215">X</a>


      </div>

      <div className="footer-column">

        <h3>Contact</h3>

        <p>📧 cybersecurity075@email.com</p>
        <p>🌍 India</p>
        <p>Utrakhand Dehradun</p>

      </div>

    </div>

  </div>



</footer>












    </div>
  );
};

export default Portfolio;