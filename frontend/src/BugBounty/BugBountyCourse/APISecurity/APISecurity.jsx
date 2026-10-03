import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./APISecurity.css";

const chapters = [
  // ====================== 1. What is API Security ======================
  {
    id: "what-is-api-security",
    title: "1. What is API Security?",
    content: (
      <>
        <h2>What is API Security?</h2>
        <p>
          API Security refers to the practices and technologies used to protect
          Application Programming Interfaces from attacks, abuse, and unauthorized access.
          In today’s digital world, APIs have become the backbone of modern applications.
          Whether it is a mobile app, single page application, microservices architecture,
          or third-party integrations — everything communicates through APIs.
        </p>
        <p>
          Because APIs directly expose business logic and sensitive data, they have become
          one of the most attractive targets for attackers. A single vulnerable API endpoint
          can lead to massive data breaches, account takeovers, and financial loss.
        </p>

        <h3>Why API Security is More Important Than Ever</h3>
        <ul>
          <li>Modern applications are API-driven (mobile + web + cloud)</li>
          <li>APIs often handle authentication, payments, and personal data</li>
          <li>Many organizations expose APIs publicly without proper protection</li>
          <li>Traditional web vulnerabilities (XSS, CSRF) are not enough to protect APIs</li>
          <li>Attackers can completely bypass the user interface and attack APIs directly</li>
        </ul>

        <h3>Difference Between Web Security and API Security</h3>
        <p>
          Web security mostly focuses on the browser and user interface.
          API security focuses on the actual data exchange layer.
        </p>
        <ul>
          <li><strong>Web Security:</strong> XSS, CSRF, Clickjacking, UI redirection</li>
          <li><strong>API Security:</strong> Broken Authorization, Authentication flaws, Data Exposure, Rate Limiting, Mass Assignment, Injection</li>
        </ul>

        <h3>Common Types of APIs</h3>
        <ul>
          <li><strong>REST APIs</strong> – Most widely used. Uses standard HTTP methods.</li>
          <li><strong>GraphQL APIs</strong> – Client can request exactly the data it needs.</li>
          <li><strong>SOAP APIs</strong> – Older enterprise-level XML based APIs.</li>
          <li><strong>gRPC</strong> – High performance APIs used in microservices.</li>
        </ul>

        <h3>Real World Impact</h3>
        <p>
          Many big companies have suffered breaches because of API vulnerabilities.
          Broken Object Level Authorization (BOLA) and Broken Authentication are
          among the most common causes of large-scale data leaks.
        </p>

        <div className="info-box">
          <h4>Key Takeaway</h4>
          <p>
            APIs should always be treated as public attack surfaces.
            Never trust the client. Always enforce authentication, authorization,
            and validation on the server side.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why are APIs considered a major attack surface?",
      options: [
        "Because they only work on mobile apps",
        "Because they expose business logic and sensitive data",
        "Because they cannot be monitored",
        "Because they only support GET requests"
      ],
      correct: "Because they expose business logic and sensitive data",
    },
  },

  // ====================== 2. BOLA / IDOR ======================
  {
    id: "bola",
    title: "2. BOLA / IDOR",
    content: (
      <>
        <h2>Broken Object Level Authorization (BOLA / IDOR)</h2>
        <p>
          Broken Object Level Authorization (BOLA), also known as Insecure Direct Object Reference (IDOR),
          is the number one vulnerability in the OWASP API Security Top 10.
          It occurs when an API does not properly verify whether the currently authenticated user
          has permission to access a specific object.
        </p>

        <h3>How BOLA Works</h3>
        <p>
          Most APIs use IDs to identify resources (user ID, order ID, document ID, etc.).
          If the API only checks whether the user is logged in, but does not check whether
          the user owns that particular resource, then BOLA exists.
        </p>

        <h3>Simple Example</h3>
        <pre className="payload-box">
{`# User A requests his own order
GET /api/v1/orders/501
Authorization: Bearer <token_of_user_A>

# Attacker changes the ID
GET /api/v1/orders/502
Authorization: Bearer <token_of_user_A>

# If the API returns order 502 data, it is BOLA`}
        </pre>

        <h3>Common Vulnerable Endpoints</h3>
        <ul>
          <li>/api/user/{"{id}"}/profile</li>
          <li>/api/orders/{"{id}"}</li>
          <li>/api/messages/{"{id}"}</li>
          <li>/api/documents/{"{id}"}</li>
          <li>/api/invoices/{"{id}"}</li>
          <li>/api/tickets/{"{id}"}</li>
        </ul>

        <h3>Impact of BOLA</h3>
        <ul>
          <li>Access other users’ personal information</li>
          <li>View other users’ orders, messages, files</li>
          <li>Modify or delete other users’ data</li>
          <li>Horizontal privilege escalation</li>
          <li>In severe cases, full account takeover</li>
        </ul>

        <h3>How to Test for BOLA</h3>
        <ol>
          <li>Create two different accounts (Attacker and Victim)</li>
          <li>Login with Victim account and capture API requests</li>
          <li>Replace the token with Attacker’s token</li>
          <li>Keep the Victim’s object ID</li>
          <li>Check if the API still returns the data</li>
          <li>Repeat for POST, PUT, DELETE methods as well</li>
        </ol>

        <h3>Advanced Tips</h3>
        <ul>
          <li>Test numeric IDs, UUIDs, and hashed IDs</li>
          <li>Try IDOR in both URL parameters and JSON body</li>
          <li>Test nested objects (example: /api/user/123/orders/456)</li>
          <li>Use Burp extension “Autorize” for automated testing</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            BOLA is extremely common and high impact.
            Always test every object ID by changing it to another user’s ID
            while using your own authentication token.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the root cause of BOLA / IDOR?",
      options: [
        "Missing rate limiting",
        "Missing authorization check on object IDs",
        "Using HTTP instead of HTTPS",
        "Weak password policy"
      ],
      correct: "Missing authorization check on object IDs",
    },
  },

  // ====================== 3. Broken Authentication ======================
  {
    id: "broken-auth",
    title: "3. Broken Authentication",
    content: (
      <>
        <h2>Broken Authentication</h2>
        <p>
          Broken Authentication occurs when the mechanisms that verify user identity
          are implemented incorrectly. This can allow attackers to compromise accounts,
          bypass login, or steal sessions.
        </p>

        <h3>Common Broken Authentication Issues</h3>
        <ul>
          <li>Weak JWT implementation</li>
          <li>Accepting JWT with algorithm “none”</li>
          <li>Weak or guessable JWT secret keys</li>
          <li>Password reset tokens that do not expire</li>
          <li>OTP / 2FA bypass vulnerabilities</li>
          <li>No rate limiting on login endpoints</li>
          <li>Session tokens present in URL</li>
          <li>Long lived tokens without revocation support</li>
        </ul>

        <h3>JWT Related Attacks</h3>
        <pre className="payload-box">
{`// 1. Algorithm None Attack
Header: { "alg": "none", "typ": "JWT" }

// 2. Weak Secret
// Attackers use tools like hashcat or jwt_tool to brute force secrets

// 3. Kid Header Injection
Header: { "alg": "HS256", "kid": "../../../etc/passwd" }`}
        </pre>

        <h3>Password Reset Issues</h3>
        <ul>
          <li>Token does not expire</li>
          <li>Token is reusable multiple times</li>
          <li>Token is predictable or short</li>
          <li>Token is leaked in response or logs</li>
        </ul>

        <h3>How to Test</h3>
        <ul>
          <li>Decode JWT tokens using jwt.io</li>
          <li>Try changing algorithm to “none”</li>
          <li>Brute force weak secrets</li>
          <li>Test password reset flow thoroughly</li>
          <li>Test OTP brute force</li>
          <li>Check if tokens work after logout</li>
        </ul>

        <div className="info-box">
          <h4>Impact</h4>
          <p>
            Broken Authentication usually leads to Account Takeover,
            which is one of the highest severity findings in bug bounty programs.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common Broken Authentication issue?",
      options: [
        "Using HTTPS everywhere",
        "Accepting JWT with alg: none",
        "Strong password policy",
        "Using HttpOnly cookies"
      ],
      correct: "Accepting JWT with alg: none",
    },
  },

  // ====================== 4. Excessive Data Exposure ======================
  {
    id: "excessive-data",
    title: "4. Excessive Data Exposure",
    content: (
      <>
        <h2>Excessive Data Exposure</h2>
        <p>
          Excessive Data Exposure happens when an API returns more information
          than what the client actually needs. Developers often return complete
          database objects and rely on the frontend to hide sensitive fields.
          Attackers can directly call the API and extract the extra data.
        </p>

        <h3>Example of Excessive Data Exposure</h3>
        <pre className="payload-box">
{`GET /api/v1/user/profile

Response:
{
  "id": 1092,
  "name": "Amit Sharma",
  "email": "amit@example.com",
  "phone": "9876543210",
  "password_hash": "$2a$10$N9qo8uLOickgx2ZMRZoMye...",
  "ssn": "123-45-6789",
  "internal_role": "premium",
  "last_login_ip": "103.45.67.89",
  "account_balance": 45000
}`}
        </pre>

        <h3>Why This Vulnerability Exists</h3>
        <ul>
          <li>Backend returns full objects without filtering</li>
          <li>Frontend is used to hide sensitive fields</li>
          <li>GraphQL queries are not properly restricted</li>
          <li>Developers prioritize speed over security</li>
        </ul>

        <h3>Impact</h3>
        <ul>
          <li>Leakage of PII (Personally Identifiable Information)</li>
          <li>Exposure of password hashes and tokens</li>
          <li>Helps attackers in further attacks (BOLA, privilege escalation)</li>
          <li>Regulatory and compliance issues</li>
        </ul>

        <h3>How to Test</h3>
        <ul>
          <li>Compare API response with what is shown in the user interface</li>
          <li>Look for extra fields in JSON responses</li>
          <li>Test mobile API endpoints (often return more data)</li>
          <li>In GraphQL, try deep and nested queries</li>
        </ul>

        <div className="info-box">
          <h4>Best Practice</h4>
          <p>
            Always filter response data on the backend.
            Return only those fields that are required by the client.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main issue in Excessive Data Exposure?",
      options: [
        "API is very slow",
        "API returns more data than needed",
        "API only supports GET method",
        "API has no authentication"
      ],
      correct: "API returns more data than needed",
    },
  },

  // ====================== 5. Rate Limiting ======================
  {
    id: "rate-limiting",
    title: "5. Rate Limiting Issues",
    content: (
      <>
        <h2>Lack of Resources & Rate Limiting</h2>
        <p>
          Rate limiting is a critical security control that restricts how many
          requests a client can make in a given time period. When APIs lack
          proper rate limiting, attackers can abuse them in multiple ways.
        </p>

        <h3>Attacks Possible Without Rate Limiting</h3>
        <ul>
          <li>Brute force attacks on login and OTP</li>
          <li>Credential stuffing</li>
          <li>Password reset token flooding</li>
          <li>Carding and payment abuse</li>
          <li>Large scale data scraping</li>
          <li>Denial of Service (DoS)</li>
        </ul>

        <h3>How to Test Rate Limiting</h3>
        <ul>
          <li>Send a large number of requests in short time (using Burp Intruder or custom scripts)</li>
          <li>Observe if the API starts returning 429 status code</li>
          <li>Test login, OTP verification, password reset, and other sensitive endpoints</li>
          <li>Check if rate limiting is based on IP, user account, or both</li>
        </ul>

        <h3>Good Rate Limiting Practices</h3>
        <ul>
          <li>Different limits for different endpoints</li>
          <li>Progressive delays after failed attempts</li>
          <li>Account lockout mechanisms</li>
          <li>CAPTCHA on sensitive actions</li>
          <li>Monitoring and alerting on unusual traffic</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always implement strong rate limiting on authentication related
            and business critical endpoints.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a major risk when rate limiting is missing on login API?",
      options: [
        "Better performance",
        "Brute force and credential stuffing attacks",
        "Improved user experience",
        "Automatic data encryption"
      ],
      correct: "Brute force and credential stuffing attacks",
    },
  },

  // ====================== 6. Mass Assignment ======================
  {
    id: "mass-assignment",
    title: "6. Mass Assignment",
    content: (
      <>
        <h2>Mass Assignment</h2>
        <p>
          Mass Assignment vulnerability occurs when an application automatically
          assigns client-supplied data to internal code variables or database objects
          without properly filtering which fields are allowed to be updated.
        </p>

        <h3>Example of Mass Assignment</h3>
        <pre className="payload-box">
{`// Normal Request
PUT /api/user/update
{
  "name": "Rohit",
  "email": "rohit@example.com"
}

// Malicious Request
PUT /api/user/update
{
  "name": "Rohit",
  "email": "rohit@example.com",
  "role": "admin",
  "isEmailVerified": true,
  "accountBalance": 1000000
}`}
        </pre>

        <h3>Impact</h3>
        <ul>
          <li>Privilege escalation (normal user to admin)</li>
          <li>Bypassing verification checks</li>
          <li>Modifying protected fields such as role, permissions, balance</li>
        </ul>

        <h3>How to Test</h3>
        <ul>
          <li>Add extra parameters in the request body</li>
          <li>Try updating fields like role, admin, isVerified, permissions</li>
          <li>Test both JSON and form-data formats</li>
          <li>Try different HTTP methods (POST, PUT, PATCH)</li>
        </ul>

        <div className="info-box">
          <h4>Prevention</h4>
          <p>
            Use allow-lists (whitelists) for fields that are allowed to be updated.
            Never bind the entire request body directly to the database model.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the biggest risk of Mass Assignment vulnerability?",
      options: [
        "API becomes slow",
        "Privilege escalation by modifying protected fields",
        "Only XSS is possible",
        "It only affects GraphQL"
      ],
      correct: "Privilege escalation by modifying protected fields",
    },
  },

  // ====================== 7. Security Misconfiguration ======================
  {
    id: "misconfiguration",
    title: "7. Security Misconfiguration",
    content: (
      <>
        <h2>Security Misconfiguration</h2>
        <p>
          Security Misconfiguration is one of the most commonly found issues
          in API environments. It happens when security settings are not properly
          defined or default configurations are left unchanged.
        </p>

        <h3>Common Examples</h3>
        <ul>
          <li>Unnecessary HTTP methods enabled (TRACE, OPTIONS, DELETE)</li>
          <li>Detailed error messages and stack traces exposed</li>
          <li>CORS misconfiguration</li>
          <li>Default credentials still active</li>
          <li>Debug and admin endpoints publicly accessible</li>
          <li>Missing security headers</li>
        </ul>

        <h3>Dangerous CORS Configuration</h3>
        <pre className="payload-box">
{`Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

# This combination is extremely dangerous`}
        </pre>

        <h3>How to Test</h3>
        <ul>
          <li>Send OPTIONS request to check allowed methods</li>
          <li>Trigger errors and observe the response body</li>
          <li>Test CORS by changing Origin header</li>
          <li>Look for common debug paths (/swagger, /debug, /admin, /graphiql)</li>
        </ul>

        <div className="info-box">
          <h4>Key Point</h4>
          <p>
            Always harden API configurations before moving to production.
            Remove debug features and restrict CORS properly.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which CORS configuration is considered dangerous?",
      options: [
        "Allow-Origin set to a trusted domain",
        "Allow-Origin: * with Allow-Credentials: true",
        "Only GET and POST methods allowed",
        "Using HTTPS only"
      ],
      correct: "Allow-Origin: * with Allow-Credentials: true",
    },
  },

  // ====================== 8. Injection ======================
  {
    id: "injection",
    title: "8. Injection in APIs",
    content: (
      <>
        <h2>Injection Attacks in APIs</h2>
        <p>
          Injection vulnerabilities occur when untrusted data is sent to an interpreter
          as part of a command or query. APIs are also vulnerable to different types
          of injection attacks.
        </p>

        <h3>Types of Injection in APIs</h3>
        <ul>
          <li>SQL Injection</li>
          <li>NoSQL Injection</li>
          <li>Command Injection</li>
          <li>LDAP Injection</li>
          <li>Header Injection</li>
          <li>Server Side Template Injection</li>
        </ul>

        <h3>NoSQL Injection Example</h3>
        <pre className="payload-box">
{`POST /api/login
Content-Type: application/json

{
  "username": {"$ne": null},
  "password": {"$ne": null}
}`}
        </pre>

        <h3>SQL Injection Example</h3>
        <pre className="payload-box">
{`GET /api/products?category=electronics' OR '1'='1`}
        </pre>

        <div className="info-box">
          <h4>Prevention</h4>
          <p>
            Always use parameterized queries or ORM frameworks.
            Validate and sanitize every user input before processing.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of injection is common in MongoDB based APIs?",
      options: [
        "XSS",
        "NoSQL Injection",
        "Clickjacking",
        "CSRF"
      ],
      correct: "NoSQL Injection",
    },
  },

  // ====================== 9. How to Test APIs ======================
  {
    id: "testing",
    title: "9. How to Test APIs",
    content: (
      <>
        <h2>How to Test APIs – Complete Methodology</h2>
        <p>
          A structured testing approach helps in finding high impact API vulnerabilities
          consistently.
        </p>

        <h3>Step by Step Process</h3>
        <ol>
          <li>Collect all API endpoints (Burp Suite, Browser DevTools, Mobile traffic, JS analysis)</li>
          <li>Understand authentication mechanism (JWT, Session, API Keys)</li>
          <li>Create two test accounts for authorization testing</li>
          <li>Test BOLA/IDOR on every resource ID</li>
          <li>Test authentication related flaws deeply</li>
          <li>Look for Excessive Data Exposure</li>
          <li>Test Rate Limiting on sensitive endpoints</li>
          <li>Attempt Mass Assignment on update endpoints</li>
          <li>Check HTTP methods and CORS policies</li>
          <li>Test for Injection vulnerabilities</li>
        </ol>

        <h3>Recommended Tools</h3>
        <ul>
          <li>Burp Suite Professional</li>
          <li>Postman / Insomnia</li>
          <li>ffuf and Arjun for parameter discovery</li>
          <li>jwt_tool for JWT testing</li>
          <li>Autorize Burp extension for BOLA testing</li>
        </ul>

        <div className="info-box">
          <h4>Pro Tip</h4>
          <p>
            Always test APIs both in authenticated and unauthenticated state.
            Many serious issues appear only when authorization is missing.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which vulnerability should you test on every object ID?",
      options: [
        "Only XSS",
        "BOLA / IDOR",
        "Only Rate Limiting",
        "Only CORS"
      ],
      correct: "BOLA / IDOR",
    },
  },

  // ====================== 10. Best Practices ======================
  {
    id: "best-practices",
    title: "10. Best Practices",
    content: (
      <>
        <h2>API Security Best Practices</h2>
        <p>
          Following strong security practices can significantly reduce the risk
          of API related breaches.
        </p>

        <h3>Essential Best Practices</h3>
        <ul>
          <li>Enforce proper authorization on every endpoint (especially object level)</li>
          <li>Implement strong authentication (secure JWT handling, OAuth, MFA)</li>
          <li>Return only the required data in responses</li>
          <li>Apply strict rate limiting</li>
          <li>Use allow-lists for mass assignment protection</li>
          <li>Validate and sanitize all inputs</li>
          <li>Configure CORS very carefully</li>
          <li>Force HTTPS across all endpoints</li>
          <li>Implement proper logging and monitoring</li>
          <li>Remove debug and admin endpoints from production</li>
          <li>Keep all libraries and dependencies updated</li>
          <li>Perform regular security assessments</li>
        </ul>

        <div className="info-box">
          <h4>Final Advice</h4>
          <p>
            Treat every API as a public endpoint.
            Never trust any data coming from the client.
            Always enforce security controls on the server side.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important principle in API Security?",
      options: [
        "Trust the frontend completely",
        "Enforce security on the server side",
        "Only use GET requests",
        "Disable all logging"
      ],
      correct: "Enforce security on the server side",
    },
  },
];

const APISecurity = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);

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
            The Ultimate Guide to{" "}
            <span className="gradient-text">API Security</span>
          </h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/hPSeChyOesXZ7lQ5bXYs/image.png"
          alt="API Security Course"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x400/1a0b2e/a855f7?text=API+Security";
          }}
        />
      </section>

      <section className="article-body">
        <div className="article-container">
          <aside className="article-sidebar">
            <h3>Course Content</h3>
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

export default APISecurity;