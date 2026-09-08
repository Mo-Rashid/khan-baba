import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { allCTFLabs, ctfCategories } from "./CTFLabs";
import "./AllCTFLab.css";

const AllCTFLab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("labs");

  // Mock solved data (later connect with localStorage / backend)
  const solvedLabs = {
    "web-xss-lab": true,
    "web-sqli-lab": true,
    "ai-prompt-injection": true,
    "mobile-android-re": true,
    "cloud-aws-privesc": false,
    "redteam-ad-lab": false,
  };

  const totalLabs = allCTFLabs.length;
  const solvedCount = Object.values(solvedLabs).filter(Boolean).length;
  const overallPercent = Math.round((solvedCount / totalLabs) * 100) || 0;

  const categoryProgress = ctfCategories.map((cat) => {
    const labsInCat = allCTFLabs.filter((l) => l.category === cat.id);
    const solvedInCat = labsInCat.filter((l) => solvedLabs[l.id]).length;
    const percent = labsInCat.length
      ? Math.round((solvedInCat / labsInCat.length) * 100)
      : 0;
    return { ...cat, total: labsInCat.length, solved: solvedInCat, percent };
  });

  const filteredLabs = useMemo(() => {
    return allCTFLabs.filter((lab) => {
      const matchesSearch =
        lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || lab.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const groupedLabs = useMemo(() => {
    const groups = {};
    ctfCategories.forEach((cat) => {
      groups[cat.id] = filteredLabs.filter((lab) => lab.category === cat.id);
    });
    return groups;
  }, [filteredLabs]);

  return (
    <div className="ctflab-page">
      <Navbar />

      {/* ===================== HERO SECTION ===================== */}
      <section className="bb-hero">
        {/* LEFT */}
        <div className="bb-hero-left">
          <span className="bb-badge">ALL CTF LAB</span>
          <h1 className="bb-title">
            ALL <span className="gradient-text">CTF LAB</span>
          </h1>
          <p className="bb-subtitle">
            Capture The Flag • Hands-on Challenges • Real Skills
          </p>
          <p className="bb-desc">
            Practice and master cybersecurity skills through structured CTF
            challenges covering Web, AI, Mobile, Cloud and Red Team labs.
            Track your progress and level up step by step.
          </p>
        </div>

        <div className="bb-hero-right">
          <div className="bb-profile-wrapper">
            
            <img
              src="/images/logo.png"
              alt="Mo Rashid"
              className="bb-profile-img"
              onError={(e) => {
                e.target.src =
                  "/images/bug-bounty.png";
              }}
            />
          </div>
        </div>


       
      </section>

      {/* ===================== SEARCH + FILTER ===================== */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search labs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <div className="category-pills">
            <button
              className={`pill ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {ctfCategories.map((cat) => (
              <button
                key={cat.id}
                className={`pill ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== LABS ===================== */}
      <section className="bb-section">
        {activeTab === "labs" ? (
          <>
            {activeCategory === "all" ? (
              ctfCategories.map((cat) => {
                const labs = groupedLabs[cat.id];
                if (labs.length === 0) return null;

                return (
                  <div key={cat.id} className="category-section">
                    <div className="section-header">
                    <h2 className="category-title">{cat.label}</h2>
                    </div>
                    
                    <div className="courses-grid">
                      {labs.map((lab) => (
                        <Link
                          to={`/ctf-lab/${lab.id}`}
                          className="course-card"
                          key={lab.id}
                        >
                          <div className="course-image">
                            <img
                              src={lab.image}
                              alt={lab.title}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/400x220/1a0b2e/a855f7?text=" +
                                  encodeURIComponent(lab.title);
                              }}
                            />
                            <span className="course-level">{lab.level}</span>
                            
                          </div>
                          <div className="course-content">
                            <h3>{lab.title}</h3>
                            <p>{lab.description}</p>
                            <span className="read-more">
                              {solvedLabs[lab.id] ? "Review Lab →" : "Start Lab →"}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="courses-grid">
                {filteredLabs.map((lab) => (
                  <Link
                    to={`/ctf-lab/${lab.id}`}
                    className="course-card"
                    key={lab.id}
                  >
                    <div className="course-image">
                      <img
                        src={lab.image}
                        alt={lab.title}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x220/1a0b2e/a855f7?text=" +
                            encodeURIComponent(lab.title);
                        }}
                      />
                      <span className="course-level">{lab.level}</span>
                      {solvedLabs[lab.id] && (
                        <span className="solved-badge">✓ Solved</span>
                      )}
                    </div>
                    <div className="course-content">
                      <h3>{lab.title}</h3>
                      <p>{lab.description}</p>
                      <span className="read-more">
                        {solvedLabs[lab.id] ? "Review Lab →" : "Start Lab →"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredLabs.length === 0 && (
              <div className="empty-state">
                <p>No labs found matching your search / filter.</p>
              </div>
            )}
          </>
        ) : (
          <div className="dashboard-placeholder">
            <h2>All Working Dashboard</h2>
            <p>Coming soon — detailed progress, ranking & history.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllCTFLab;