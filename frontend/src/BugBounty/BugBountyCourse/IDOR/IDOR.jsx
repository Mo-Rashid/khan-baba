import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./IDOR.css";

const chapters = [
  {
    id: "what-is-idor",
    title: "01 What is IDOR?",
    content: (
      <>
        <h2>What is IDOR (Insecure Direct Object Reference)?</h2>
        <p>
          IDOR (Insecure Direct Object Reference) is a vulnerability that occurs
          when an application provides direct access to objects based on
          user-supplied input without proper authorization checks. An attacker
          can modify the reference (ID, filename, key, etc.) to access data or
          perform actions belonging to other users.
        </p>
        <p>
          It is one of the most common and high-impact findings in bug bounty
          programs because it often leads to unauthorized access to sensitive
          data, account takeover, or privilege escalation.
        </p>
        <h3>How IDOR Works</h3>
        <ol>
          <li>Application uses a reference (user ID, document ID, order ID, etc.) in a request.</li>
          <li>The server retrieves the object using that reference.</li>
          <li>No (or weak) authorization check verifies that the current user owns or may access that object.</li>
          <li>Attacker changes the reference to another user’s object.</li>
          <li>Server returns or modifies the other user’s data.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            IDOR = Accessing or modifying other users’ objects by changing
            IDs/references without proper authorization checks.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main cause of IDOR?",
      options: [
        "Missing rate limiting",
        "Missing authorization check on object references",
        "Using HTTP instead of HTTPS",
        "Weak password policy"
      ],
      correct: "Missing authorization check on object references",
    },
  },
  {
    id: "types",
    title: "02 Types of IDOR",
    content: (
      <>
        <h2>Types of IDOR</h2>
        <h3>1. Horizontal IDOR</h3>
        <p>
          Accessing another user’s data at the same privilege level
          (e.g., user A views user B’s profile or orders).
        </p>
        <h3>2. Vertical IDOR</h3>
        <p>
          Accessing higher-privilege functionality or data
          (e.g., normal user accesses admin endpoints or admin-only objects).
        </p>
        <h3>3. Blind IDOR</h3>
        <p>
          The response does not directly show the data, but the action still
          succeeds (e.g., changing another user’s email, deleting their resource).
        </p>
        <h3>4. Parameter-based IDOR</h3>
        <p>
          ID is passed in URL, body, headers, or cookies and can be manipulated.
        </p>
        <h3>5. Path / Filename IDOR</h3>
        <p>
          Direct access to files or resources via predictable paths or names.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main types: Horizontal, Vertical, Blind, Parameter-based, and
            Path/Filename IDOR.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of IDOR allows access to another user’s data at the same privilege level?",
      options: [
        "Vertical IDOR",
        "Horizontal IDOR",
        "Only Blind IDOR",
        "Only Path IDOR"
      ],
      correct: "Horizontal IDOR",
    },
  },
  {
    id: "attack-surface",
    title: "03 IDOR Attack Surface",
    content: (
      <>
        <h2>IDOR Attack Surface</h2>
        <p>
          IDOR can appear anywhere an object is referenced by an identifier.
        </p>
        <h3>Common Locations</h3>
        <ul>
          <li>URL path: <code>/api/users/123</code>, <code>/orders/456</code></li>
          <li>Query parameters: <code>?user_id=123</code>, <code>?doc=789</code></li>
          <li>POST / PUT / PATCH body: <code>{`{"id": 123}`}</code></li>
          <li>Headers: custom headers carrying IDs</li>
          <li>Cookies: session or preference cookies with IDs</li>
          <li>Hidden form fields</li>
          <li>GraphQL arguments and mutations</li>
          <li>File download / export endpoints</li>
          <li>WebSocket messages</li>
        </ul>
        <h3>Common Object Types</h3>
        <ul>
          <li>User profiles, emails, phone numbers</li>
          <li>Orders, invoices, tickets</li>
          <li>Documents, photos, private files</li>
          <li>Messages, chats, notifications</li>
          <li>API keys, tokens, settings</li>
          <li>Admin or internal resources</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Test every parameter that looks like an ID, UUID, filename, or
            object reference across all HTTP methods and formats.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Where can IDOR parameters commonly appear?",
      options: [
        "Only in CSS files",
        "URL, body, headers, cookies, GraphQL",
        "Only in images",
        "Only in JavaScript comments"
      ],
      correct: "URL, body, headers, cookies, GraphQL",
    },
  },
  {
    id: "hunting-methodology",
    title: "04 IDOR Hunting Methodology",
    content: (
      <>
        <h2>IDOR Hunting Methodology</h2>
        <h3>Step-by-Step Approach</h3>
        <ol>
          <li><strong>Create two accounts</strong> – User A and User B (and ideally an admin).</li>
          <li><strong>Map all object references</strong> – Note every ID, UUID, filename in requests.</li>
          <li><strong>Perform actions as User A</strong> – View/edit profile, orders, files, etc.</li>
          <li><strong>Replay requests as User B</strong> – Change only the object ID to User A’s ID.</li>
          <li><strong>Observe the response</strong> – Data leak, successful modification, or deletion?</li>
          <li><strong>Test different methods</strong> – GET, POST, PUT, PATCH, DELETE.</li>
          <li><strong>Test encodings & formats</strong> – Numeric, UUID, hashed, Base64, JSON, GraphQL.</li>
          <li><strong>Document impact</strong> – What data or actions were accessible?</li>
        </ol>
        <h3>Useful Tips</h3>
        <ul>
          <li>Use Burp Suite match/replace or Autorize extension.</li>
          <li>Compare responses between authorized and unauthorized users.</li>
          <li>Check both “read” and “write” operations.</li>
          <li>Test sequential and predictable IDs first, then UUIDs.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always use at least two accounts. Replace object IDs and check
            whether authorization is enforced on every sensitive endpoint.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important first step for testing IDOR?",
      options: [
        "Only run Nmap",
        "Create two different accounts",
        "Only test XSS",
        "Only change website colors"
      ],
      correct: "Create two different accounts",
    },
  },
  {
    id: "horizontal",
    title: "05 Horizontal IDOR",
    content: (
      <>
        <h2>Horizontal IDOR</h2>
        <p>
          Horizontal IDOR allows a user to access another user’s resources at
          the same privilege level.
        </p>
        <h3>Classic Example</h3>
        <pre className="payload-box">
{`GET /api/user/profile?id=1001   ← Your profile
GET /api/user/profile?id=1002   ← Another user’s profile (IDOR)`}
        </pre>
        <h3>Other Common Cases</h3>
        <ul>
          <li>Viewing another user’s orders: <code>/orders/555</code></li>
          <li>Downloading another user’s invoice or document</li>
          <li>Reading another user’s private messages</li>
          <li>Accessing another user’s uploaded files</li>
        </ul>
        <h3>Testing Steps</h3>
        <ol>
          <li>Log in as User A and capture a request containing an object ID.</li>
          <li>Log in as User B (or use User B’s session).</li>
          <li>Replay the request with User A’s object ID.</li>
          <li>If data is returned → Horizontal IDOR confirmed.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Horizontal IDOR = same role, different user’s data. Very common on
            profile, order, and document endpoints.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Horizontal IDOR allows access to:",
      options: [
        "Only admin panels",
        "Another user’s data at the same privilege level",
        "Only server logs",
        "Only CSS files"
      ],
      correct: "Another user’s data at the same privilege level",
    },
  },
  {
    id: "vertical",
    title: "06 Vertical IDOR",
    content: (
      <>
        <h2>Vertical IDOR</h2>
        <p>
          Vertical IDOR occurs when a lower-privileged user can access
          higher-privileged objects or functions by changing references.
        </p>
        <h3>Examples</h3>
        <pre className="payload-box">
{`GET /api/admin/users/1          ← Admin-only endpoint
GET /api/admin/settings
POST /api/admin/deleteUser
{"user_id": 5}`}
        </pre>
        <h3>Common Scenarios</h3>
        <ul>
          <li>Normal user accessing admin panel endpoints</li>
          <li>User changing role or permission fields in a request</li>
          <li>Accessing internal or staff-only resources via ID</li>
          <li>Modifying another user’s role to “admin”</li>
        </ul>
        <h3>Testing Tips</h3>
        <ul>
          <li>Capture admin requests (if you have an admin account) and replay with a normal user session.</li>
          <li>Try incrementing or guessing admin resource IDs.</li>
          <li>Look for hidden parameters like <code>role</code>, <code>isAdmin</code>, <code>privilege</code>.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Vertical IDOR = lower privilege accessing higher privilege objects
            or actions. Often leads to privilege escalation.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Vertical IDOR can lead to:",
      options: [
        "Only color change",
        "Privilege escalation",
        "Only slow loading",
        "Only image replacement"
      ],
      correct: "Privilege escalation",
    },
  },
  {
    id: "blind-idor",
    title: "07 Blind IDOR",
    content: (
      <>
        <h2>Blind IDOR</h2>
        <p>
          In Blind IDOR the response does not show the sensitive data, but the
          unauthorized action still succeeds.
        </p>
        <h3>Examples</h3>
        <ul>
          <li>Changing another user’s email or password (no data returned)</li>
          <li>Deleting another user’s account or resource</li>
          <li>Updating another user’s settings</li>
          <li>Adding yourself to another user’s private group</li>
        </ul>
        <h3>How to Detect</h3>
        <ol>
          <li>Perform a state-changing action on your own object and note the request.</li>
          <li>Change the object ID to another user’s ID.</li>
          <li>Send the request.</li>
          <li>Log in as the other user (or check via another channel) to see if the change applied.</li>
        </ol>
        <h3>Example Request</h3>
        <pre className="payload-box">
{`PUT /api/user/email
{
  "user_id": 1002,
  "email": "attacker@evil.com"
}

→ Response: 200 OK (no data)
→ Victim’s email is now changed (Blind IDOR)`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Blind IDOR is dangerous because the impact is real even when the
            response looks normal. Always verify side effects.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "In Blind IDOR, what usually happens?",
      options: [
        "Data is clearly shown in response",
        "Action succeeds but response does not show the data",
        "Only images are affected",
        "Only CSS breaks"
      ],
      correct: "Action succeeds but response does not show the data",
    },
  },
  {
    id: "uuid-hashed",
    title: "08 UUID & Hashed IDs",
    content: (
      <>
        <h2>UUID, Hashed & Complex IDs</h2>
        <p>
          Many applications use UUIDs or hashed IDs thinking they are safe.
          Predictability is reduced, but authorization must still be checked.
        </p>
        <h3>Still Test These</h3>
        <ul>
          <li>UUIDs collected from your own account (replace with another user’s UUID)</li>
          <li>Hashed IDs (MD5/SHA of sequential numbers – sometimes reversible)</li>
          <li>Encoded IDs (Base64, Hex)</li>
          <li>Composite keys</li>
        </ul>
        <h3>Techniques</h3>
        <pre className="payload-box">
{`1. Create two accounts and collect their UUIDs
2. Replace UUID in request:
   /api/documents/550e8400-e29b-41d4-a716-446655440000
3. If access is granted → IDOR (even with UUID)

4. For hashed IDs, try hashing sequential numbers:
   md5(1), md5(2), ...`}
        </pre>
        <h3>Important Note</h3>
        <p>
          “Hard to guess” does not equal “secure”. Authorization checks are
          mandatory regardless of ID format.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            UUIDs and hashes reduce guessing but do not prevent IDOR. Always
            test authorization with known IDs from another account.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Do UUIDs alone prevent IDOR?",
      options: [
        "Yes, UUIDs are 100% safe",
        "No, authorization checks are still required",
        "Only on mobile apps",
        "Only with HTTPS"
      ],
      correct: "No, authorization checks are still required",
    },
  },
  {
    id: "advanced",
    title: "09 Advanced IDOR Techniques",
    content: (
      <>
        <h2>Advanced IDOR Techniques</h2>
        <h3>1. Method Tampering</h3>
        <pre className="payload-box">
{`GET /api/user/123     → 403 Forbidden
PUT /api/user/123     → 200 OK (IDOR)
DELETE /api/user/123  → 200 OK`}
        </pre>
        <h3>2. Parameter Pollution</h3>
        <pre className="payload-box">
{`?user_id=1001&user_id=1002
?user_id[]=1001&user_id[]=1002`}
        </pre>
        <h3>3. Content-Type / Format Switching</h3>
        <pre className="payload-box">
{`JSON body → XML body
Form data → JSON
GraphQL query with different id argument`}
        </pre>
        <h3>4. Secondary Parameters</h3>
        <p>
          Sometimes the main ID is protected, but a secondary parameter
          (account_id, org_id, team_id) is not.
        </p>
        <h3>5. Batch / Bulk Endpoints</h3>
        <pre className="payload-box">
{`POST /api/users/batch
{"ids": [1001, 1002, 1003]}`}
        </pre>
        <h3>6. GraphQL IDOR</h3>
        <pre className="payload-box">
{`query {
  user(id: "1002") {
    email
    phone
  }
}`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Try different HTTP methods, formats, pollution, secondary IDs,
            batch endpoints, and GraphQL when simple ID changes fail.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which advanced technique can bypass simple IDOR protections?",
      options: [
        "Only changing website color",
        "HTTP method tampering and parameter pollution",
        "Only using GET requests",
        "Only testing images"
      ],
      correct: "HTTP method tampering and parameter pollution",
    },
  },
  {
    id: "examples",
    title: "10 Real-World Examples",
    content: (
      <>
        <h2>Real-World IDOR Examples</h2>
        <h3>1. Profile Data Leak</h3>
        <pre className="payload-box">
{`GET /api/v1/users/1001/profile
→ Change to /api/v1/users/1002/profile
→ Full PII of another user`}
        </pre>
        <h3>2. Password Reset / Email Change</h3>
        <pre className="payload-box">
{`POST /api/reset-password
{"user_id": 1002, "new_password": "Hacked123!"}`}
        </pre>
        <h3>3. Invoice / Document Download</h3>
        <pre className="payload-box">
{`GET /download?invoice_id=INV-2024-8891
→ Change invoice_id to another user’s invoice`}
        </pre>
        <h3>4. Private Message Access</h3>
        <pre className="payload-box">
{`GET /api/messages/thread/445566
→ Read another user’s private conversation`}
        </pre>
        <h3>5. Organization / Multi-Tenant IDOR</h3>
        <pre className="payload-box">
{`GET /api/org/55/members
→ Access another organization’s member list`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            IDOR commonly affects profiles, documents, messages, billing, and
            multi-tenant resources. Always test cross-account access.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of these is a common real-world IDOR impact?",
      options: [
        "Only changing button color",
        "Accessing another user’s private data or documents",
        "Only slowing the website",
        "Only breaking CSS"
      ],
      correct: "Accessing another user’s private data or documents",
    },
  },
  {
    id: "tools",
    title: "11 Tools & Automation",
    content: (
      <>
        <h2>Tools for IDOR Testing</h2>
        <h3>Burp Suite</h3>
        <ul>
          <li><strong>Autorize</strong> – Automatically repeats requests with another user’s session</li>
          <li><strong>AuthMatrix</strong> – Matrix-based authorization testing</li>
          <li><strong>Match & Replace</strong> – Swap IDs on the fly</li>
          <li><strong>Repeater + Comparer</strong> – Manual comparison of responses</li>
        </ul>
        <h3>Other Tools</h3>
        <ul>
          <li>Auth Analyzer (Burp extension)</li>
          <li>Custom scripts (Python + requests) for bulk ID testing</li>
          <li>GraphQL specific tools for query IDOR</li>
        </ul>
        <h3>Manual Workflow</h3>
        <pre className="payload-box">
{`1. Log in as User A → Browse app → Save all requests
2. Log in as User B → Import User A requests
3. Replace session cookie / token with User B’s
4. Replace object IDs with User A’s IDs
5. Send and compare responses`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Autorize and AuthMatrix save a lot of time. Combine them with
            careful manual testing of state-changing operations.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which Burp extension is very useful for IDOR testing?",
      options: [
        "Only Proxy",
        "Autorize",
        "Only Decoder",
        "Only Comparer"
      ],
      correct: "Autorize",
    },
  },
  {
    id: "prevention",
    title: "12 IDOR Prevention",
    content: (
      <>
        <h2>How to Prevent IDOR</h2>
        <ul>
          <li><strong>Enforce authorization on every request</strong> – Never trust the client-supplied ID alone.</li>
          <li>Use access control checks: “Does current user own this object?”</li>
          <li>Prefer indirect references (mapping) instead of direct database IDs when possible.</li>
          <li>Implement centralized authorization middleware / policies.</li>
          <li>Use random, unpredictable IDs (UUIDs) as an extra layer – but still check ownership.</li>
          <li>Log and monitor unusual access patterns across object IDs.</li>
          <li>Apply the principle of least privilege.</li>
          <li>Test all endpoints (including mobile/API and GraphQL) for authorization flaws.</li>
          <li>Avoid exposing sequential IDs in URLs when not necessary.</li>
        </ul>
        <h3>Secure Pattern Example</h3>
        <pre className="payload-box">
{`// Pseudocode
object = db.get(object_id)
if object.owner_id != current_user.id:
    return 403 Forbidden
return object`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The only reliable fix is server-side authorization on every object
            access. Unpredictable IDs help but are not enough by themselves.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most reliable way to prevent IDOR?",
      options: [
        "Only using UUIDs",
        "Server-side authorization check on every object access",
        "Only hiding IDs in frontend",
        "Only using HTTPS"
      ],
      correct: "Server-side authorization check on every object access",
    },
  },
];

const IDOR = () => {
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
            The ultimate Bug Bounty guide to{" "}
            <span className="gradient-text">IDOR</span>
          </h1>
          <p className="article-date">Interactive Course • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/xcXx2yoiDKhOUdPvmijF/image.png"
          alt="IDOR Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=IDOR";
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

export default IDOR;