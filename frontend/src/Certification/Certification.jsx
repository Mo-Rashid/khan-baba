import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar/Navbar";
import Feedback from "../components/Feedback/Feedback";
import "./Certification.css";

const Certification = () => {
  const [username, setUsername] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== Hacker Experiences States =====
  const [experiences, setExperiences] = useState([]);
  const [expUsername, setExpUsername] = useState("");
  const [expText, setExpText] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const demoCertificates = {
    "VULNX-AI-2024012072": true,
  };

  // Load saved experiences
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hackerExperiences")) || [];
    setExperiences(saved);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setShowCertificate(false);

    const cleanName = username.trim();
    const cleanSerial = serialNumber.trim().toUpperCase();

    if (!cleanName) {
      setError("Please enter your registered name.");
      return;
    }
    if (!cleanSerial) {
      setError("Please enter your certificate serial number.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!demoCertificates[cleanSerial]) {
        setError("Certificate not found. Please check your serial number.");
        return;
      }

      setUsername(cleanName);
      setSerialNumber(cleanSerial);
      setShowCertificate(true);
    } catch (err) {
      setError("Unable to verify certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeCertificate = () => {
    setShowCertificate(false);
  };

  const downloadCertificatePDF = async () => {
    const certificate = document.getElementById("certificate-preview");

    if (!certificate) {
      alert("Certificate preview not found.");
      return;
    }

    try {
      const downloadButton = document.querySelector(".certificate-download-button");

      if (downloadButton) {
        downloadButton.disabled = true;
        downloadButton.innerHTML = "Generating Certificate PDF...";
      }

      const images = certificate.querySelectorAll("img");

      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          });
        })
      );

      if (document.fonts) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const width = certificate.offsetWidth;
      const height = certificate.offsetHeight;

      if (!width || !height) {
        throw new Error("Certificate has invalid dimensions.");
      }

      const canvas = await html2canvas(certificate, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        width: width,
        height: height,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
      });

      if (!canvas) {
        throw new Error("Canvas generation failed.");
      }

      const imageData = canvas.toDataURL("image/png", 1.0);

      if (!imageData) {
        throw new Error("Unable to create certificate image.");
      }

      const pdfWidth = 250;
      const pdfHeight = 150;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
        compress: true,
      });

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

      const safeName =
        username.trim().replace(/[^a-zA-Z0-9-_]/g, "_") || "Participant";
      const safeSerial =
        serialNumber.trim().replace(/[^a-zA-Z0-9-_]/g, "_") || "Certificate";

      pdf.save(`VulnXploit_${safeName}_${safeSerial}.pdf`);

      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.innerHTML = `
          <span class="download-icon">↓</span>
          <span>Download Certificate PDF</span>
        `;
      }
    } catch (error) {
      console.error("Certificate PDF generation failed:", error);

      const downloadButton = document.querySelector(".certificate-download-button");

      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.innerHTML = `
          <span class="download-icon">↓</span>
          <span>Download Certificate PDF</span>
        `;
      }

      alert(
        "Unable to generate the certificate PDF.\n\nPlease open browser Console (F12) to see the exact error."
      );
    }
  };

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const publishExperience = () => {
    if (!expUsername.trim() || !expText.trim()) {
      alert("Please fill username and experience!");
      return;
    }

    const newExp = {
      id: Date.now(),
      username: expUsername.trim(),
      text: expText.trim(),
      tags: activeTags,
      time: "JUST NOW",
      stars: 5,
    };

    const updated = [newExp, ...experiences];
    setExperiences(updated);
    localStorage.setItem("hackerExperiences", JSON.stringify(updated));

    setExpUsername("");
    setExpText("");
    setActiveTags([]);
  };

  return (
    <div className="certification-page">
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section className="cert-hero">
        <div className="cert-hero-left">
          <span className="cert-badge">VULNXploit CERTIFICATION</span>
          <h1 className="cert-title">
            CERTIFICATIONS
            <br />
            <span className="gradient-text">THAT PROVE YOUR SKILLS</span>
          </h1>
          <p className="cert-subtitle">
            Workshops • Courses • Training • Cybersecurity • Technical Skills
          </p>
          <p className="cert-description">
            Earn verified certificates through practical workshops, cybersecurity
            courses, technical training, hackathons, seminars and hands-on learning programs.
          </p>
        </div>
        <div className="cert-hero-right">
          <div className="cert-logo-box">
            <div className="cert-glow"></div>
            <img src="/images/logo.png" alt="VulnXploit" className="cert-logo" />
          </div>
        </div>
      </section>

      {/* ==================== CERTIFICATION INFO ==================== */}
      <section className="cert-info-section">
        <div className="cert-info-container">
          <div className="cert-section-heading">
            <span>VULNXploit CREDENTIALS</span>
            <h2>
              Validate Your Skills.
              <strong> Showcase Your Expertise.</strong>
            </h2>
            <p>
              Build professional credibility through verified certifications earned from hands-on workshops, technical courses, cybersecurity training, hackathons and practical learning programs.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== VERIFICATION FORM ==================== */}
      <section className="certificate-verification-section">
        <div className="certificate-verification-container">
          <div className="certificate-workshop-info">
            <div className="workshop-content">
              <h1>
                AI Hacking <span> Workshop</span>
              </h1>
              <h2>
                Tula's
                <span> University</span>
              </h2>
              <img
                src="/images/ai-hacking-workshop.png"
                alt="AI Hacking Workshop"
                className="workshop-image"
                onError={(e) => {
                  e.currentTarget.src = "/images/tulas.png";
                }}
              />
              <div className="workshop-details"></div>
            </div>
          </div>

          <div className="certificate-form-card">
            <div className="certificate-form-header">
              <span>CERTIFICATE VERIFICATION</span>
              <h2>
                Verify Your
                <strong> Certificate</strong>
              </h2>
              <p>
                Enter your registered name and certificate serial number to verify your certification.
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <div className="certificate-input-group">
                <label htmlFor="certificate-name">YOUR NAME</label>
                <input
                  id="certificate-name"
                  type="text"
                  placeholder="Enter your registered name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

              <div className="certificate-input-group">
                <label htmlFor="certificate-serial">CERTIFICATE SERIAL NUMBER</label>
                <input
                  id="certificate-serial"
                  type="text"
                  placeholder="Example: VULNX-AI-CollageID"
                  value={serialNumber}
                  onChange={(e) => {
                    setSerialNumber(e.target.value.toUpperCase());
                    setError("");
                  }}
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              {error && <div className="certificate-error">{error}</div>}

              <button type="submit" className="certificate-verify-button" disabled={loading}>
                <span>{loading ? "Verifying..." : "Verify Certificate"}</span>
                {!loading && <span className="verify-arrow">→</span>}
              </button>
            </form>

            <div className="certificate-security-note">
              <span>✓</span>
              <p>Certificate verification is available for authorized workshop participants only.</p>
            </div>
          </div>
        </div>
      </section>





      {/* ==================== CERTIFICATE MODAL ==================== */}
      {showCertificate && (
        <div className="certificate-modal-overlay" onClick={closeCertificate}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="certificate-modal-close"
              onClick={closeCertificate}
            >
              ×
            </button>

            <div className="certificate-preview" id="certificate-preview">
              <div className="certificate-border">
                <div className="certificate-inner">
                  <div className="certificate-header">
                    <div className="certificate-number-box">
                      <span>CERTIFICATE NO.</span>
                      <strong>{serialNumber}</strong>
                    </div>
                    <div className="certificate-brand">
                      <img
                        src="/images/cert.png"
                        alt="The VulnXploit"
                        className="certificate-brand-logo"
                      />
                      <h4>The VulnXploit</h4>
                      <span>CYBER SECURITY PLATFORM</span>
                    </div>
                    <div className="certificate-community">
                      <img
                        src="/images/global.png"
                        alt="The VulnXploit"
                        className="certificate-brand-logo"
                      />
                      <strong>Global Ai</strong>
                      <span>COMMUNITY</span>
                    </div>
                  </div>

                  <div className="certificate-header-divider"></div>

                  <div className="certificate-workshop-label">
                    VULNXPLOIT AI HACKING WORKSHOP
                  </div>

                  <h1 className="certificate-main-title">CERTIFICATE</h1>
                  <div className="certificate-participation">OF PARTICIPATION</div>

                  <p className="certificate-presented">
                    This certificate is proudly presented to
                  </p>
                  <h2 className="certificate-user-name">{username}</h2>
                  <div className="certificate-header-divider"></div>

                  <p className="certificate-text">
                    for successfully participating in the
                  </p>
                  <p className="certificate-organized">
                    Organized by <strong>The VulnXploit</strong> in collaboration with{" "}
                    <strong>Tula's University</strong> through a{" "}
                    <strong>One-Day AI Hacking Workshop</strong> covering{" "}
                    <strong>
                      AI Security, LLM Security, Prompt Injection, and AI Red Teaming.
                    </strong>
                  </p>

                  <div className="certificate-skills">
                    <span>AI HACKING</span>
                    <span>AI SECURITY</span>
                    <span>PRACTICAL WORKSHOP</span>
                  </div>

                  <div className="certificate-footer">
                    <div className="certificate-footer-column">
                      <span className="footer-label">DATE OF ISSUE</span>
                      <strong className="footer-value">14 SEPTEMBER 2026</strong>
                    </div>
                    <div className="certificate-footer-column trainer-column">
                      <div className="signature">𝓜𝓸 𝓡𝓪𝓼𝓱𝓲𝓭</div>
                      <div className="signature-line"></div>
                      <span className="footer-label">
                        TRAINER / WORKSHOP INSTRUCTOR
                      </span>
                    </div>
                    <div className="certificate-verification-seal"></div>
                    <div className="certificate-footer-column issuer-column">
                      <span className="footer-label">ISSUED BY</span>
                      <strong className="footer-value">The VulnXploit</strong>
                    </div>
                  </div>

                  <div className="certificate-bottom-branding">
                    BUILDING A SAFER DIGITAL WORLD TOGETHER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Feedback section="certifications" />

    </div>
    
  );
};

export default Certification;