import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { bugBountyCourses } from "./bugBountyData";
import Feedback from "../components/Feedback/Feedback";
import "./BugBounty.css";

const BugBounty = () => {
  
  return (
    <div className="bugbounty-page">
      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO SECTION (same style as Portfolio) ===== */}
      <section className="bb-hero">
        <div className="bb-hero-left">
          <span className="bb-badge">BUG BOUNTY COURSES</span>
          <h1 className="bb-title">
            BUG <span className="gradient-text">BOUNTY - LEARNING</span>
          </h1>
          <p className="bb-subtitle">
            Bug Bounty Courses • Application Security • Real-World Exploitation
          </p>
          <p className="bb-desc">
            Learn practical bug bounty skills with structured courses on the most
            common and high-impact vulnerabilities.
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

      {/* ===== COURSES SECTION ===== */}
      <section className="bb-section">
        <div className="section-header">
           <h2 className="section-title">Bug Bounty Courses</h2>
        </div>

        <div className="courses-grid">
          {bugBountyCourses.map((course) => (
            <Link
              to={`/bug-bounty/course/${course.id}`}
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
                      course.title.replace(/\s/g, "+");
                  }}
                />
                <span className="course-level">{course.level}</span>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span className="read-more">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Feedback section="bug-bounty" />
    </div>
  );
};

export default BugBounty;