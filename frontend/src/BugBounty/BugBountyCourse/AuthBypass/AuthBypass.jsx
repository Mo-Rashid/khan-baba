import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./AuthBypass.css";

const STORAGE_KEY = "VulnXploit_auth_bypass_course_completed";

const chapters = [
  {
    id: "what-is-auth-bypass",
    title: "01 What is Auth Bypass?",
    content: (
      <>
        <h2>What is Authentication Bypass?</h2>
        <p>
          Authentication Bypass is a vulnerability that allows an attacker to
          access protected resources or accounts without providing valid
          credentials. The application fails to properly verify the user’s
          identity before granting access.
        </p>
        <p>
          It is one of the most critical findings in bug bounty programs because
          it can lead to full account takeover, access to admin panels, or
          exposure of sensitive data without needing passwords or tokens.
        </p>
        <h3>How Authentication Bypass Works</h3>
        <ol>
          <li>Application has a login or access-control check.</li>
          <li>The check is incomplete, flawed, or can be skipped.</li>
          <li>Attacker manipulates requests, parameters, or flow.</li>
          <li>Server grants access without proper verification.</li>
          <li>Attacker reaches protected pages or other users’ accounts.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Auth Bypass = Gaining access to protected resources without valid
            authentication by abusing flaws in the login or session logic.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What does Authentication Bypass allow an attacker to do?",
      options: [
        "Only change website colors",
        "Access protected resources without valid credentials",
        "Only perform XSS attacks",
        "Only slow down the server"
      ],
      correct: "Access protected resources without valid credentials",
    },
  },
  {
    id: "types",
    title: "02 Types of Auth Bypass",
    content: (
      <>
        <h2>Types of Authentication Bypass</h2>
        <h3>1. Default / Weak Credentials</h3>
        <p>
          Using common default usernames and passwords (admin/admin, root/root).
        </p>
        <h3>2. SQL Injection Login Bypass</h3>
        <p>
          Injecting SQL into login forms to bypass password checks.
        </p>
        <h3>3. Parameter Manipulation</h3>
        <p>
          Changing role, isAdmin, user_id, or authenticated flags in requests.
        </p>
        <h3>4. Forced Browsing / Direct Object Access</h3>
        <p>
          Accessing admin or protected URLs directly without logging in.
        </p>
        <h3>5. Session / Token Flaws</h3>
        <p>
          Predictable sessions, missing invalidation, token leakage, or reuse.
        </p>
        <h3>6. OAuth / SSO Misconfiguration</h3>
        <p>
          Abusing redirect_uri, state, or token endpoints to take over accounts.
        </p>
        <h3>7. Password Reset / Account Recovery Flaws</h3>
        <p>
          Predictable tokens, host header injection, or account enumeration in reset flows.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main types: weak credentials, SQLi login bypass, parameter
            tampering, forced browsing, session flaws, OAuth issues, and
            password-reset abuse.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a type of Authentication Bypass?",
      options: [
        "Only CSS Injection",
        "SQL Injection Login Bypass",
        "Only Clickjacking",
        "Only File Upload"
      ],
      correct: "SQL Injection Login Bypass",
    },
  },
  {
    id: "default-creds",
    title: "03 Default & Weak Credentials",
    content: (
      <>
        <h2>Default & Weak Credentials</h2>
        <p>
          Many applications, admin panels, and devices ship with default
          credentials that are never changed.
        </p>
        <h3>Common Defaults</h3>
        <pre className="payload-box">
{`admin : admin
admin : password
admin : 123456
root  : root
root  : toor
test  : test
user  : user
guest : guest
administrator : administrator`}
        </pre>
        <h3>Where to Test</h3>
        <ul>
          <li>Admin login pages (/admin, /administrator, /manage)</li>
          <li>CMS panels (WordPress, Joomla, Drupal)</li>
          <li>Router / IoT / appliance interfaces</li>
          <li>Staging and development environments</li>
          <li>API basic-auth endpoints</li>
        </ul>
        <h3>Tips</h3>
        <ul>
          <li>Try common username/password lists.</li>
          <li>Check for account lockout and rate limiting.</li>
          <li>Look for “Forgot password” that reveals valid usernames.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always test default and weak credentials on login and admin
            interfaces. Many real-world systems still use them.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common default credential?",
      options: [
        "admin : admin",
        "user : complexPassword123",
        "root : randomlongstring",
        "guest : NoPasswordAllowed"
      ],
      correct: "admin : admin",
    },
  },
  {
    id: "sqli-login",
    title: "04 SQLi Login Bypass",
    content: (
      <>
        <h2>SQL Injection Authentication Bypass</h2>
        <p>
          When login queries are built with string concatenation, an attacker
          can inject SQL to make the password check always true.
        </p>
        <h3>Classic Payloads</h3>
        <pre className="payload-box">
{`Username: admin'--
Password: anything

Username: admin' OR '1'='1
Password: admin' OR '1'='1

Username: ' OR 1=1--
Password: ' OR 1=1--

Username: admin'/*
Password: */OR/1=1#`}
        </pre>
        <h3>Typical Vulnerable Query</h3>
        <pre className="payload-box">
{`SELECT * FROM users
WHERE username = '$user' AND password = '$pass'`}
        </pre>
        <h3>After Injection</h3>
        <pre className="payload-box">
{`SELECT * FROM users
WHERE username = 'admin'--' AND password = '...'

→ Password condition is commented out`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            SQLi login bypass is still common. Always test login fields with
            classic OR and comment payloads.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What does the payload admin'-- usually do in a vulnerable login?",
      options: [
        "Creates a new admin account",
        "Comments out the rest of the SQL query (including password check)",
        "Encrypts the password",
        "Only causes a syntax error"
      ],
      correct: "Comments out the rest of the SQL query (including password check)",
    },
  },
  {
    id: "parameter-tampering",
    title: "05 Parameter Tampering",
    content: (
      <>
        <h2>Parameter Tampering for Auth Bypass</h2>
        <p>
          Applications sometimes trust client-supplied flags that indicate
          authentication or role status.
        </p>
        <h3>Common Parameters</h3>
        <pre className="payload-box">
{`isAdmin=true
role=admin
authenticated=1
logged_in=true
user_type=administrator
access_level=9
is_verified=1
auth=true`}
        </pre>
        <h3>Where They Appear</h3>
        <ul>
          <li>Hidden form fields</li>
          <li>JSON body of login or profile update</li>
          <li>Cookies</li>
          <li>JWT claims (if not properly verified)</li>
          <li>URL query parameters</li>
        </ul>
        <h3>Testing</h3>
        <ol>
          <li>Log in as a normal user and capture requests.</li>
          <li>Look for role/auth related parameters.</li>
          <li>Change them to admin/true/1 and replay.</li>
          <li>Try accessing admin endpoints with the modified values.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Never trust client-side role or auth flags. Always verify privileges
            on the server using the real session identity.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which parameter is commonly tampered for privilege escalation?",
      options: [
        "isAdmin=true",
        "color=blue",
        "lang=en",
        "theme=dark"
      ],
      correct: "isAdmin=true",
    },
  },
  {
    id: "forced-browsing",
    title: "06 Forced Browsing",
    content: (
      <>
        <h2>Forced Browsing / Direct Access</h2>
        <p>
          Forced browsing means accessing protected pages by guessing or
          discovering their URLs without authenticating.
        </p>
        <h3>Common Paths</h3>
        <pre className="payload-box">
{`/admin
/administrator
/admin/dashboard
/manage
/panel
/backend
/console
/api/admin
/admin.php
/wp-admin
/user/1
/account/settings
/internal`}
        </pre>
        <h3>Techniques</h3>
        <ul>
          <li>Directory and path brute-forcing (ffuf, dirsearch, gobuster)</li>
          <li>Checking robots.txt, sitemap.xml, JS files for hidden paths</li>
          <li>Using Burp content discovery</li>
          <li>Testing after logout whether pages still respond</li>
        </ul>
        <h3>Impact</h3>
        <p>
          Direct access to admin panels, user data, debug endpoints, or
          configuration pages without any login.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always try direct access to admin and sensitive paths both
            authenticated and unauthenticated.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is Forced Browsing?",
      options: [
        "Attacking with SQL Injection",
        "Accessing protected pages by guessing URLs without login",
        "Only testing XSS",
        "Changing website theme"
      ],
      correct: "Accessing protected pages by guessing URLs without login",
    },
  },
  {
    id: "session-flaws",
    title: "07 Session & Token Flaws",
    content: (
      <>
        <h2>Session & Token Based Auth Bypass</h2>
        <h3>Common Issues</h3>
        <ul>
          <li>Predictable session IDs</li>
          <li>Session fixation</li>
          <li>Sessions not invalidated on logout or password change</li>
          <li>JWT with alg=none or weak secret</li>
          <li>Token leakage in URL, logs, or Referer</li>
          <li>Missing secure / HttpOnly flags on cookies</li>
          <li>Long-lived tokens that cannot be revoked</li>
        </ul>
        <h3>JWT Attacks (Quick)</h3>
        <pre className="payload-box">
{`// alg: none
{"alg":"none","typ":"JWT"}

// Change role claim
{"user":"victim","role":"admin"}

// Crack weak secret with hashcat / jwt_tool`}
        </pre>
        <h3>Testing Tips</h3>
        <ul>
          <li>Copy session cookie to another browser after logout.</li>
          <li>Decode and tamper JWT claims (use jwt.io carefully).</li>
          <li>Check whether password change invalidates old sessions.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Weak session management and JWT misconfigurations are frequent
            sources of authentication bypass and account takeover.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What does setting JWT alg to 'none' attempt to do?",
      options: [
        "Encrypt the token stronger",
        "Skip signature verification",
        "Make the token expire faster",
        "Only change the token color"
      ],
      correct: "Skip signature verification",
    },
  },
  {
    id: "oauth-sso",
    title: "08 OAuth & SSO Bypass",
    content: (
      <>
        <h2>OAuth & SSO Authentication Bypass</h2>
        <p>
          Misconfigured OAuth/OpenID Connect flows can allow account takeover
          or login as another user.
        </p>
        <h3>Common OAuth Issues</h3>
        <ul>
          <li>Insecure redirect_uri (open redirect → token theft)</li>
          <li>Missing or weak state parameter (CSRF on login)</li>
          <li>Token leakage via Referer or browser history</li>
          <li>Account linking without proper verification</li>
          <li>Accepting tokens from wrong issuer or audience</li>
        </ul>
        <h3>Example Attack Ideas</h3>
        <pre className="payload-box">
{`// Steal code/token via open redirect
redirect_uri=https://evil.com

// Pre-account takeover via email linking
// Login with Google using victim email if linking is weak`}
        </pre>
        <h3>Testing</h3>
        <ol>
          <li>Map the full OAuth flow and all redirect_uri values.</li>
          <li>Test redirect_uri with your own domain.</li>
          <li>Remove or reuse state parameter.</li>
          <li>Try linking a social account to an existing victim account.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            OAuth bugs often lead to high-impact account takeover. Focus on
            redirect_uri, state, and account linking logic.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which OAuth parameter is commonly abused for token theft?",
      options: [
        "redirect_uri",
        "color_scheme",
        "font_size",
        "theme_mode"
      ],
      correct: "redirect_uri",
    },
  },
  {
    id: "password-reset",
    title: "09 Password Reset Flaws",
    content: (
      <>
        <h2>Password Reset & Account Recovery Flaws</h2>
        <p>
          Password reset flows are complex and frequently contain logic or
          token handling bugs that allow takeover.
        </p>
        <h3>Common Vulnerabilities</h3>
        <ul>
          <li>Predictable reset tokens</li>
          <li>Token not tied to the user / reusable tokens</li>
          <li>Host header injection → reset link points to attacker server</li>
          <li>Parameter pollution (email=victim&email=attacker)</li>
          <li>Token leakage in response body or URL</li>
          <li>Ability to change email then reset without verification</li>
          <li>No rate limiting on token generation</li>
        </ul>
        <h3>Host Header Injection Example</h3>
        <pre className="payload-box">
{`POST /reset-password
Host: evil.com
email=victim@company.com

→ Reset link: https://evil.com/reset?token=...
→ Attacker receives the token`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always deeply test password-reset and account-recovery flows.
            They are a classic path to full account takeover.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What can Host Header Injection cause in password reset?",
      options: [
        "Faster password reset",
        "Reset link points to attacker’s server",
        "Only changes email template color",
        "Disables the reset feature"
      ],
      correct: "Reset link points to attacker’s server",
    },
  },
  {
    id: "hunting",
    title: "10 Hunting Methodology",
    content: (
      <>
        <h2>Authentication Bypass Hunting Methodology</h2>
        <h3>Step-by-Step</h3>
        <ol>
          <li><strong>Map all auth entry points</strong> – Login, register, OAuth, SSO, API keys, password reset.</li>
          <li><strong>Test default credentials</strong> on admin and login pages.</li>
          <li><strong>Test SQLi</strong> on every login field.</li>
          <li><strong>Tamper parameters</strong> – role, isAdmin, user_id, flags.</li>
          <li><strong>Forced browsing</strong> – admin paths, API endpoints without cookies.</li>
          <li><strong>Session tests</strong> – fixation, reuse after logout, JWT tampering.</li>
          <li><strong>OAuth / SSO</strong> – redirect_uri, state, account linking.</li>
          <li><strong>Password reset</strong> – tokens, host header, parameter pollution.</li>
          <li><strong>Document impact</strong> – which accounts or panels were accessed.</li>
        </ol>
        <h3>Useful Tools</h3>
        <ul>
          <li>Burp Suite (Repeater, Intruder, Autorize)</li>
          <li>jwt_tool, hashcat (for JWT secrets)</li>
          <li>ffuf / dirsearch for path discovery</li>
          <li>Browser + multiple accounts for comparison</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Systematically cover credentials, injection, parameters, sessions,
            OAuth, and reset flows for every authentication surface.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should be the first step in Auth Bypass hunting?",
      options: [
        "Only run Nmap",
        "Map all authentication entry points",
        "Only test XSS",
        "Only change website colors"
      ],
      correct: "Map all authentication entry points",
    },
  },
  {
    id: "payloads",
    title: "11 Useful Payloads & Checklist",
    content: (
      <>
        <h2>Useful Payloads & Quick Checklist</h2>
        <h3>SQLi Login</h3>
        <pre className="payload-box">
{`admin'--
' OR 1=1--
' OR '1'='1
admin' OR '1'='1'--`}
        </pre>
        <h3>Parameter Values</h3>
        <pre className="payload-box">
{`isAdmin=true
role=admin
authenticated=1
user_id=1
access_level=9`}
        </pre>
        <h3>Common Admin Paths</h3>
        <pre className="payload-box">
{`/admin
/administrator
/admin/dashboard
/manage
/panel
/backend
/api/admin`}
        </pre>
        <h3>Quick Checklist</h3>
        <ul>
          <li>☐ Default credentials</li>
          <li>☐ SQLi on login</li>
          <li>☐ Role / auth parameter tampering</li>
          <li>☐ Direct access to admin URLs</li>
          <li>☐ Session reuse after logout</li>
          <li>☐ JWT alg:none / claim tampering</li>
          <li>☐ OAuth redirect_uri & state</li>
          <li>☐ Password reset token & Host header</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Keep this checklist and payload set ready for every target that has
            a login or protected area.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of these is useful for SQLi login bypass?",
      options: [
        "admin'--",
        "color=red",
        "font=large",
        "theme=dark"
      ],
      correct: "admin'--",
    },
  },
  {
    id: "prevention",
    title: "12 Prevention",
    content: (
      <>
        <h2>How to Prevent Authentication Bypass</h2>
        <ul>
          <li><strong>Use strong, unique credentials</strong> and enforce password policies. Change all defaults.</li>
          <li>Use parameterized queries – never concatenate user input into SQL login queries.</li>
          <li>Never trust client-supplied role or auth flags. Derive privileges only from server-side session.</li>
          <li>Protect all sensitive paths with proper authentication middleware.</li>
          <li>Use secure, random session IDs; invalidate on logout and password change.</li>
          <li>For JWT: enforce algorithm, verify signature, validate claims (exp, aud, iss).</li>
          <li>Harden OAuth: strict redirect_uri allow-list, mandatory state, careful account linking.</li>
          <li>Secure password reset: long random tokens, single-use, tied to user, no Host header trust.</li>
          <li>Implement rate limiting and account lockout carefully (avoid user enumeration).</li>
          <li>Log and monitor failed logins and privilege escalations.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Strong server-side verification of identity and privileges on every
            request is the foundation of preventing authentication bypass.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important principle to prevent Auth Bypass?",
      options: [
        "Trust all client-side flags",
        "Strong server-side verification of identity and privileges",
        "Only use GET requests",
        "Disable all logging"
      ],
      correct: "Strong server-side verification of identity and privileges",
    },
  },
];

const AuthBypass = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChapters, setCompletedChapters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedChapters));
  }, [completedChapters]);

  const completedCount = completedChapters.length;
  const totalChapters = chapters.length;
  const progress = Math.round((completedCount / totalChapters) * 100);

  const handleSubmit = () => {
    if (!activeChapter.quiz) return;
    if (selectedOption === activeChapter.quiz.correct) {
      setShowCongrats(true);
      if (!completedChapters.includes(activeChapter.id)) {
        setCompletedChapters([...completedChapters, activeChapter.id]);
      }
    } else {
      alert("❌ Wrong answer. Try again!");
    }
  };

  const closeCongrats = () => {
    setShowCongrats(false);
    setSelectedOption("");
  };

  return (
    <div className="article-page">
      <Navbar />
      <section className="article-header">
        <div className="article-header-content">
          <Link to="/bug-bounty" className="back-link">
            ← Back to Bug Bounty Courses
          </Link>
          <h1>
            The ultimate Bug Bounty guide to{" "}
            <span className="gradient-text">Auth Bypass</span>
          </h1>
          <p className="article-date">Interactive Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/f7XsxRyan8LAb2CNqv7Z/image.png"
          alt="Auth Bypass Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=Auth+Bypass";
          }}
        />
      </section>

      <section className="article-body">
        <div className="article-container">
          <aside className="article-sidebar">
            <h3>On this Article</h3>
            <ul>
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className={`${activeChapter.id === chapter.id ? "active" : ""} ${
                    completedChapters.includes(chapter.id) ? "completed" : ""
                  }`}
                  onClick={() => {
                    setActiveChapter(chapter);
                    setSelectedOption("");
                  }}
                >
                  {chapter.title}
                  {completedChapters.includes(chapter.id) && (
                    <span className="check-mark">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="article-content">
            {activeChapter.content}

            {/* ===== QUESTION BOX ===== */}
            {activeChapter.quiz && (
              <div className="quiz-box">
                <h3>Quick Check</h3>
                <p className="quiz-question">{activeChapter.quiz.question}</p>

                <div className="quiz-options">
                  {activeChapter.quiz.options.map((opt) => (
                    <label key={opt} className="quiz-option">
                      <input
                        type="radio"
                        name="quiz"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>

                <button className="quiz-submit" onClick={handleSubmit}>
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS POPUP ===== */}
      {showCongrats && (
        <div className="congrats-overlay">
          <div className="congrats-modal">
            <div className="congrats-icon">🎉</div>
            <h2>Congratulations!</h2>
            <p>You completed this step successfully.</p>
            <button onClick={closeCongrats}>Continue Learning</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthBypass;