
import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";

const STORAGE_KEY = "vulnxploit_user_profile";

const emptyProfile = {
  fullName: "",
  username: "",
  headline: "",
  email: "",
  location: "",
  bio: "",
  website: "",
  github: "",
  linkedin: "",
  skills: [],
  certifications: [],
  experience: "Beginner",
  avatar: "",
};

const skillOptions = [
  "Web Security",
  "Bug Bounty",
  "Penetration Testing",
  "Red Teaming",
  "AI Security",
  "AI Engineering",
  "Application Development",
  "Network Security",
  "Mobile Security",
  "Mobile App Development",
  "Cloud Security",
  "Reverse Engineering",
  "Python",
  "Linux",
];

export default function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(emptyProfile);
  const [certInput, setCertInput] = useState("");
  const [notice, setNotice] = useState("");
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        const restored = { ...emptyProfile, ...parsed };

        setProfile(restored);
        setDraft(restored);
      }
    } catch {
      setNotice("Unable to load the saved profile.");
    } finally {
      setLoaded(true);
    }
  }, []);

  const updateField = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const startEditing = () => {
    setDraft({ ...profile });
    setEditing(true);
    setNotice("");
  };

  const saveProfile = (event) => {
    event.preventDefault();

    const clean = {
      ...draft,
      fullName: draft.fullName.trim(),
      username: draft.username.trim().replace(/^@/, ""),
      email: draft.email.trim(),
      headline: draft.headline.trim(),
      bio: draft.bio.trim(),
      website: draft.website.trim(),
      github: draft.github.trim(),
      linkedin: draft.linkedin.trim(),
      skills: [...new Set(draft.skills)],
      certifications: draft.certifications
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (!clean.fullName || !clean.username) {
      setNotice("Full name and username are required.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      setProfile(clean);
      setDraft(clean);
      setEditing(false);
      setNotice("Profile saved successfully.");
    } catch {
      setNotice("Could not save. The profile image may be too large.");
    }
  };

  const cancelEditing = () => {
    setDraft({ ...profile });
    setEditing(false);
    setNotice("");
  };

  const toggleSkill = (skill) => {
    setDraft((previous) => ({
      ...previous,
      skills: previous.skills.includes(skill)
        ? previous.skills.filter((item) => item !== skill)
        : [...previous.skills, skill],
    }));
  };

  const addCertification = () => {
    const value = certInput.trim();

    if (
      value &&
      !draft.certifications.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      updateField("certifications", [...draft.certifications, value]);
      setCertInput("");
    }
  };

  const uploadAvatar = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setNotice("Choose a PNG, JPG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setNotice("Please choose an image smaller than 1.5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("avatar", String(reader.result || ""));
      setNotice("Image selected. Save your profile to apply it.");
    };

    reader.onerror = () => setNotice("Unable to read this image.");
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => updateField("avatar", "");

  const copyProfile = async () => {
    const shareText = [
      `${profile.fullName} (@${profile.username})`,
      profile.headline,
      profile.bio,
      profile.skills.join(", "),
      profile.github,
      profile.linkedin,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(shareText);
      setNotice("Profile details copied.");
    } catch {
      setNotice("Clipboard access unavailable in this browser.");
    }
  };

  if (!loaded) {
    return <div className="vp-loading">Initializing profile...</div>;
  }

  const isCreated = Boolean(profile.fullName && profile.username);
  const shown = editing ? draft : profile;
  const initials =
    shown.fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "VX";

  const completionFields = [
    shown.fullName,
    shown.username,
    shown.headline,
    shown.bio,
    shown.location,
    shown.avatar,
    shown.github,
    shown.linkedin,
    shown.website,
    shown.skills.length > 0,
  ];

  const completion = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  );

  return (
    <main className="vp-page">
      <header className="vp-topbar">
        <div className="vp-brand">
          <span className="vp-brand-mark">V</span>
          <span>Vuln<span>X</span>ploit</span>
        </div>

        <div className="vp-top-label">
          <span className="vp-live-dot" />
          USER PROFILE / {editing ? "EDIT MODE" : "PROFILE CONSOLE"}
        </div>
      </header>

      <section className="vp-heading">
        <div>
          <p className="vp-eyebrow">IDENTITY MANAGEMENT</p>
          <h1>{isCreated ? "Your Profile" : "Create Your Profile"}</h1>
          <p className="vp-muted">
            Build your cybersecurity identity. Showcase your skills, projects
            and professional journey.
          </p>
        </div>

        {!editing && (
          <button className="vp-button vp-primary" onClick={startEditing}>
            {isCreated ? "✎ Edit Profile" : "+ Create Profile"}
          </button>
        )}
      </section>

      {notice && (
        <div className="vp-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}

      {editing ? (
        <form className="vp-editor" onSubmit={saveProfile}>
          <section className="vp-card vp-editor-hero">
            <div className="vp-avatar vp-avatar-large">
              {shown.avatar ? (
                <img src={shown.avatar} alt="Profile preview" />
              ) : (
                initials
              )}
            </div>

            <div className="vp-avatar-actions">
              <h2>Profile picture</h2>
              <p className="vp-muted">PNG, JPG or WebP · Max 1.5 MB</p>
              <div className="vp-inline-actions">
                <button
                  type="button"
                  className="vp-button vp-primary"
                  onClick={() => fileRef.current?.click()}
                >
                  Upload image
                </button>
                {shown.avatar && (
                  <button
                    type="button"
                    className="vp-button vp-ghost"
                    onClick={removeAvatar}
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                hidden
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={uploadAvatar}
              />
            </div>
          </section>

          <section className="vp-card">
            <div className="vp-section-title">
              <span className="vp-section-icon">01</span>
              <div>
                <h2>Personal identity</h2>
                <p>Tell the community who you are.</p>
              </div>
            </div>

            <div className="vp-form-grid">
              <label className="vp-field">
                Full name *
                <input
                  required
                  maxLength={80}
                  value={shown.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="vp-field">
                Username *
                <div className="vp-input-prefix">
                  <span>@</span>
                  <input
                    required
                    maxLength={30}
                    pattern="[A-Za-z0-9_.-]+"
                    title="Use letters, numbers, dots, underscores or hyphens."
                    value={shown.username}
                    onChange={(e) =>
                      updateField("username", e.target.value.replace(/^@/, ""))
                    }
                    placeholder="your_handle"
                  />
                </div>
              </label>

              <label className="vp-field vp-field-full">
                Professional headline
                <input
                  maxLength={120}
                  value={shown.headline}
                  onChange={(e) => updateField("headline", e.target.value)}
                  placeholder="e.g. Cybersecurity Researcher | Application Security"
                />
              </label>

              <label className="vp-field">
                Email
                <input
                  type="email"
                  maxLength={254}
                  value={shown.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label className="vp-field">
                Location
                <input
                  maxLength={100}
                  value={shown.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="City, Country"
                />
              </label>

              <label className="vp-field vp-field-full">
                About me
                <textarea
                  rows={5}
                  maxLength={1000}
                  value={shown.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="Share your interests, experience and goals..."
                />
                <span className="vp-counter">{shown.bio.length}/1000</span>
              </label>

              <label className="vp-field">
                Experience level
                <select
                  value={shown.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </select>
              </label>
            </div>
          </section>

          <section className="vp-card">
            <div className="vp-section-title">
              <span className="vp-section-icon">02</span>
              <div>
                <h2>Security skillset</h2>
                <p>Select the areas you work or learn in.</p>
              </div>
            </div>

            <div className="vp-skill-picker">
              {skillOptions.map((skill) => {
                const selected = shown.skills.includes(skill);

                return (
                  <button
                    type="button"
                    key={skill}
                    aria-pressed={selected}
                    className={`vp-skill-option ${selected ? "selected" : ""}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <span>{selected ? "✓" : "+"}</span> {skill}
                  </button>
                );
              })}
            </div>
            <p className="vp-muted vp-small">
              {shown.skills.length} skills selected
            </p>
          </section>

          <section className="vp-card">
            <div className="vp-section-title">
              <span className="vp-section-icon">03</span>
              <div>
                <h2>Professional links</h2>
                <p>Connect your public work and online presence.</p>
              </div>
            </div>

            <div className="vp-form-grid">
              <label className="vp-field">
                Personal website
                <input
                  type="url"
                  maxLength={500}
                  value={shown.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </label>

              <label className="vp-field">
                GitHub profile
                <input
                  type="url"
                  maxLength={500}
                  value={shown.github}
                  onChange={(e) => updateField("github", e.target.value)}
                  placeholder="https://github.com/username"
                />
              </label>

              <label className="vp-field vp-field-full">
                LinkedIn profile
                <input
                  type="url"
                  maxLength={500}
                  value={shown.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </label>
            </div>
          </section>

          <section className="vp-card">
            <div className="vp-section-title">
              <span className="vp-section-icon">04</span>
              <div>
                <h2>Certifications</h2>
                <p>Add certifications you have actually earned.</p>
              </div>
            </div>

            <div className="vp-cert-input">
              <input
                value={certInput}
                maxLength={100}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCertification();
                  }
                }}
                placeholder="e.g. Certification Name"
              />
              <button
                type="button"
                className="vp-button vp-ghost"
                onClick={addCertification}
              >
                Add
              </button>
            </div>

            <div className="vp-chip-list">
              {shown.certifications.map((cert) => (
                <span className="vp-cert-chip" key={cert}>
                  ◈ {cert}
                  <button
                    type="button"
                    aria-label={`Remove ${cert}`}
                    onClick={() =>
                      updateField(
                        "certifications",
                        shown.certifications.filter((item) => item !== cert)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          <div className="vp-form-actions">
            <button
              type="button"
              className="vp-button vp-ghost"
              onClick={cancelEditing}
            >
              Cancel
            </button>
            <button type="submit" className="vp-button vp-primary">
              Save Profile →
            </button>
          </div>
        </form>
      ) : isCreated ? (
        <>
          <section className="vp-card vp-profile-hero">
            <div className="vp-profile-main">
              <div className="vp-avatar">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.fullName} />
                ) : (
                  initials
                )}
              </div>

              <div className="vp-profile-info">
                <span className="vp-profile-label">
                  <span className="vp-live-dot" /> COMMUNITY PROFILE
                </span>
                <h2>{profile.fullName}</h2>
                <p className="vp-handle">@{profile.username}</p>
                <p className="vp-headline">
                  {profile.headline || "Cybersecurity enthusiast"}
                </p>
                <div className="vp-meta">
                  {profile.location && <span>⌖ {profile.location}</span>}
                  <span>◈ {profile.experience}</span>
                </div>
              </div>
            </div>

            <div className="vp-profile-actions">
              <button
                className="vp-button vp-primary"
                onClick={startEditing}
              >
                ✎ Edit Profile
              </button>
              <button className="vp-button vp-ghost" onClick={copyProfile}>
                ↗ Copy Details
              </button>
            </div>
          </section>

          <section className="vp-progress-grid">
            <div className="vp-card vp-progress-card">
              <span className="vp-muted">PROFILE COMPLETION</span>
              <strong>{completion}%</strong>
              <div
                className="vp-progress-track"
                role="progressbar"
                aria-valuenow={completion}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="vp-card vp-stat-card">
              <span className="vp-stat-icon">⌘</span>
              <div>
                <strong>{profile.skills.length}</strong>
                <p>Skills added</p>
              </div>
            </div>

            <div className="vp-card vp-stat-card">
              <span className="vp-stat-icon">◇</span>
              <div>
                <strong>{profile.certifications.length}</strong>
                <p>Certifications listed</p>
              </div>
            </div>
          </section>

          <section className="vp-content-grid">
            <div className="vp-card">
              <div className="vp-card-heading">
                <h2><span>01</span> About me</h2>
                <button className="vp-text-button" onClick={startEditing}>
                  Edit
                </button>
              </div>
              <p className="vp-bio">
                {profile.bio || "Add your bio to introduce yourself to the community."}
              </p>
            </div>

            <div className="vp-card">
              <div className="vp-card-heading">
                <h2><span>02</span> Technical skills</h2>
                <button className="vp-text-button" onClick={startEditing}>
                  Edit
                </button>
              </div>
              <div className="vp-chip-list">
                {profile.skills.length ? (
                  profile.skills.map((skill) => (
                    <span className="vp-skill-chip" key={skill}>{skill}</span>
                  ))
                ) : (
                  <p className="vp-muted">No skills added yet.</p>
                )}
              </div>
            </div>

            <div className="vp-card">
              <div className="vp-card-heading">
                <h2><span>03</span> Certifications</h2>
                <button className="vp-text-button" onClick={startEditing}>
                  Edit
                </button>
              </div>
              {profile.certifications.length ? (
                <ul className="vp-cert-list">
                  {profile.certifications.map((cert) => (
                    <li key={cert}><span>◇</span>{cert}</li>
                  ))}
                </ul>
              ) : (
                <p className="vp-muted">Your earned certifications will appear here.</p>
              )}
            </div>

            <div className="vp-card">
              <div className="vp-card-heading">
                <h2><span>04</span> Find me online</h2>
              </div>
              <div className="vp-link-list">
                {[
                  ["Website", profile.website],
                  ["GitHub", profile.github],
                  ["LinkedIn", profile.linkedin],
                ].filter(([, url]) => url).map(([label, url]) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vp-external-link"
                  >
                    <span>{label}</span><span>↗</span>
                  </a>
                ))}
                {!profile.website && !profile.github && !profile.linkedin && (
                  <p className="vp-muted">Add your professional links.</p>
                )}
              </div>
            </div>
          </section>

          <p className="vp-footer">
            <span>VULNXploit //</span> HACK ETHICALLY · LEARN CONTINUOUSLY · BUILD SECURELY
          </p>
        </>
      ) : (
        <section className="vp-empty vp-card">
          <div className="vp-empty-icon">{"{ VX }"}</div>
          <p className="vp-eyebrow">YOUR DIGITAL IDENTITY STARTS HERE</p>
          <h2>Build your cybersecurity profile.</h2>
          <p className="vp-muted">
            Introduce yourself, showcase your technical skills, list earned
            certifications and link your projects.
          </p>
          <button className="vp-button vp-primary" onClick={startEditing}>
            Create My Profile →
          </button>
          <div className="vp-empty-features">
            <span>◈ Technical skills</span>
            <span>⌘ Professional links</span>
            <span>◇ Certifications</span>
          </div>
        </section>
      )}
    </main>
  );
}
