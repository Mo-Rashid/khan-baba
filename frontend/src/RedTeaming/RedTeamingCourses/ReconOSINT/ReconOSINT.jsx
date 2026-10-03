import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./ReconOSINT.css";


const chapters = [
  // ====================== 01 What is Recon & OSINT? ======================
  {
id: "what-is-recon",
title: "01 What is Recon & OSINT?",
content: (
<>
<h2>What is Reconnaissance & OSINT?</h2>
<p>
          Reconnaissance is the foundation of every successful Red Team
          engagement, penetration test, and real-world cyber attack. It is the
          phase where you gather as much information as possible about the
          target before launching any active exploitation.
</p>
<p>
<strong>OSINT (Open Source Intelligence)</strong> is the process of
          collecting and analyzing publicly available information to build a
          detailed profile of the target organization, its people, technology,
          and attack surface.
</p>


<h3>Why Recon Matters</h3>
<ul>
<li>Identifies the true attack surface (often larger than expected)</li>
<li>Reveals forgotten assets, shadow IT, and misconfigurations</li>
<li>Provides valid usernames, emails, and technology stack clues</li>
<li>Reduces noise and increases the chance of successful initial access</li>
<li>Helps map the organization structure and high-value targets</li>
</ul>


<h3>Passive vs Active Reconnaissance</h3>
<p>
<strong>Passive Recon</strong> uses only public sources and does not
          directly interact with the target systems. It is stealthy and hard to
          detect.
</p>
<p>
<strong>Active Recon</strong> involves directly interacting with the
          target (port scanning, directory brute-forcing, service probing).
          It generates network traffic and can be logged or alerted.
</p>


<div className="info-box">
<h4>Summary</h4>
<p>
            Recon & OSINT = Collecting intelligence about the target before
            attacking. Start passive, stay quiet, and only move to active
            techniques when necessary and authorized.
</p>
</div>
</>
    ),
quiz: {
question: "What is the main purpose of reconnaissance and OSINT in Red Team operations?",
options: [
"To immediately start exploitation",
"The foundation of every successful Red Team engagement, penetration test, and real-world cyber attack. It is the phase where you gather as much information as possible about the target before launching any active exploitation.",
"Only for active scanning",
"Only for internal networks"
      ],
correct: "The foundation of every successful Red Team engagement, penetration test, and real-world cyber attack. It is the phase where you gather as much information as possible about the target before launching any active exploitation.",
    },
  },


  // ====================== 02 OSINT Frameworks ======================
  {
id: "osint-frameworks",
title: "02 OSINT Frameworks",
content: (
<>
<h2>OSINT Frameworks & Methodologies</h2>
<p>
          Professional operators follow structured frameworks so that recon
          is complete, repeatable, and does not miss critical information.
</p>


<h3>Popular OSINT Frameworks</h3>
<ul>
<li><strong>OSINT Framework</strong> (osintframework.com) — Visual collection of tools by category</li>
<li><strong>PTES</strong> — Penetration Testing Execution Standard (recon section)</li>
<li><strong>MITRE ATT&CK – Reconnaissance</strong> — Real adversary recon techniques</li>
<li><strong>Lockheed Martin Kill Chain</strong> — First phase is Reconnaissance</li>
</ul>


<h3>Recommended Recon Workflow</h3>
<ol>
<li>Define the target and scope clearly</li>
<li>Collect organizational information (name, subsidiaries, brands)</li>
<li>Discover domains, subdomains, and IP ranges</li>
<li>Enumerate people, emails, and roles</li>
<li>Identify technologies, cloud assets, and third-party services</li>
<li>Map exposed services and possible entry points</li>
<li>Document everything and prioritize high-value targets</li>
</ol>


<pre className="payload-box">
{`Recon Checklist:
✓ Company legal name + subsidiaries
✓ Primary and secondary domains
✓ Subdomain enumeration
✓ IP ranges and ASN
✓ Cloud assets (AWS, Azure, GCP)
✓ Employee emails and usernames
✓ Technology stack (Wappalyzer, BuiltWith)
✓ Public code repositories (GitHub)
✓ Leaked credentials (HaveIBeenPwned, DeHashed)
✓ Social media presence
✓ Job postings (tech stack clues)`}
</pre>


<div className="info-box">
<h4>Summary</h4>
<p>
            Use a structured framework. Random tool usage creates incomplete
            intelligence. Document every finding for the attack phase.
</p>
</div>
</>
    ),
quiz: {
question: "What is the first step in the recommended Reconnaissance workflow?",
options: [
"Start active scanning immediately",
"Define the target and scope clearly",
"Only use Google dorks",
"Begin subdomain enumeration"
      ],
correct: "Define the target and scope clearly",
    },
  },


  // ====================== 03 Domain & Subdomain Enum ======================
  {
id: "domain-subdomain",
title: "03 Domain & Subdomain Enum",
content: (
<>
<h2>Domain & Subdomain Enumeration</h2>
<p>
          Subdomains often host forgotten applications, staging environments,
          admin panels, and development systems that are less protected than
          the main website.
</p>


<h3>Passive Subdomain Discovery</h3>
<ul>
<li>Certificate Transparency logs (crt.sh)</li>
<li>DNS databases (SecurityTrails, VirusTotal, DNSDumpster)</li>
<li>Search engines and Google dorks</li>
<li>Public datasets and archives (Common Crawl, Wayback Machine)</li>
</ul>


<h3>Active Subdomain Discovery</h3>
<ul>
<li>Brute-forcing with wordlists (subfinder, amass, puredns)</li>
<li>Permutation and alteration techniques</li>
<li>DNS zone transfers (rare but valuable when allowed)</li>
</ul>


<pre className="payload-box">
{`# Subdomain enumeration tools
subfinder -d target.com -all -o subs.txt
amass enum -passive -d target.com -o amass.txt
assetfinder --subs-only target.com
findomain -t target.com


# Certificate Transparency
curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value' | sort -u


# Resolve and probe live hosts
cat subs.txt | httpx -silent -o live.txt
cat live.txt | aquatone -out aquatone_report`}
</pre>


<h3>What to Look For</h3>
<ul>
<li>dev., staging., test., uat., beta. subdomains</li>
<li>admin., portal., vpn., remote. entry points</li>
<li>api., graphql., swagger. endpoints</li>
<li>Old or forgotten applications still online</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Subdomain enumeration expands the attack surface dramatically.
            Always combine passive sources with careful active techniques.
</p>
</div>
</>
    ),
quiz: {
question: "Which subdomains are commonly identified during domain enumeration?",
options: [
"Only production domains",
"dev., staging., test., uat., beta. subdomains",
"Only main website",
"Only admin panels"
      ],
correct: "dev., staging., test., uat., beta. subdomains",
    },
  },


  // ====================== 04 People & Employee OSINT ======================
  {
id: "people-osint",
title: "04 People & Employee OSINT",
content: (
<>
<h2>People & Employee OSINT</h2>
<p>
          Humans are often the weakest link. Collecting information about
          employees helps with phishing, password spraying, and social
          engineering.
</p>


<h3>Key Information to Collect</h3>
<ul>
<li>Full names and job titles</li>
<li>Email address format (first.last@, flast@, etc.)</li>
<li>Phone numbers and social profiles</li>
<li>Technology skills and tools mentioned in profiles</li>
<li>Organizational hierarchy and reporting lines</li>
</ul>


<h3>Best Sources</h3>
<ul>
<li><strong>LinkedIn</strong> — Primary source for employee data</li>
<li>Company website / About / Team pages</li>
<li>Twitter / X, GitHub, personal blogs</li>
<li>Hunter.io, Apollo, RocketReach for email patterns</li>
<li>HaveIBeenPwned / DeHashed for leaked credentials</li>
</ul>


<pre className="payload-box">
{`# Email pattern discovery
# Common formats:
firstname.lastname@target.com
flast@target.com
firstlast@target.com
f.lastname@target.com


# Tools
theHarvester -d target.com -b all
hunter.io / apollo.io (web)
linkedin dorks + export tools
h8mail -t emails.txt -c config.ini`}
</pre>


<div className="info-box">
<h4>Summary</h4>
<p>
            Employee OSINT fuels phishing and credential attacks. Always
            stay within legal and ROE boundaries when collecting personal data.
</p>
</div>
</>
    ),
quiz: {
question: "Which source is recommended as the primary tool for employee OSINT?",
options: [
"Only company website",
"LinkedIn",
"Only password databases",
"Only public forums"
      ],
correct: "LinkedIn",
    },
  },


  // ====================== 05 Google Dorking ======================
  {
id: "google-dorking",
title: "05 Google Dorking",
content: (
<>
<h2>Google Dorking & Search Intelligence</h2>
<p>
          Google dorking uses advanced search operators to find sensitive
          information that was accidentally made public.
</p>


<h3>Essential Google Operators</h3>
<pre className="payload-box">
{`site:target.com
site:target.com filetype:pdf
site:target.com ext:env OR ext:sql OR ext:bak
site:target.com inurl:admin
site:target.com intitle:"index of"
site:target.com "password" OR "secret" OR "api_key"
site:github.com "target.com" password
site:pastebin.com "target.com"
"target.com" ext:xls OR ext:xlsx OR ext:csv`}
</pre>


<h3>High-Value Dork Examples</h3>
<ul>
<li>Exposed configuration files (.env, web.config, settings.py)</li>
<li>Database dumps and backup files</li>
<li>Internal documentation and employee handbooks</li>
<li>Login portals and admin interfaces</li>
<li>Publicly accessible cloud storage links</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Google dorking is one of the highest ROI recon techniques.
            Master the operators and always verify findings manually.
</p>
</div>
</>
    ),
quiz: {
question: "Which Google dork operator is used to find exposed configuration files?",
options: [
"site:target.com",
"site:target.com filetype:pdf",
"site:target.com ext:env OR ext:sql OR ext:bak",
"site:target.com inurl:admin"
      ],
correct: "site:target.com ext:env OR ext:sql OR ext:bak",
    },
  },


  // ====================== 06 Infrastructure Discovery ======================
  {
id: "infra-discovery",
title: "06 Infrastructure Discovery",
content: (
<>
<h2>Infrastructure & Technology Discovery</h2>
<p>
          Understanding the technology stack and infrastructure helps you
          choose the right exploits and attack paths.
</p>


<h3>What to Identify</h3>
<ul>
<li>Web servers, frameworks, and CMS (WordPress, Drupal, custom)</li>
<li>Cloud providers (AWS, Azure, GCP) and storage buckets</li>
<li>CDN and WAF presence (Cloudflare, Akamai, AWS WAF)</li>
<li>Email services and SPF/DKIM/DMARC records</li>
<li>VPN, remote access, and collaboration tools</li>
<li>Third-party SaaS integrations</li>
</ul>


<pre className="payload-box">
{`# Technology fingerprinting
whatweb https://target.com
wappalyzer (browser extension)
builtwith.com
retire.js (for vulnerable JS libraries)


# Cloud & ASN
amass intel -org "Target Company"
asnmap -d target.com
cloud_enum -k target


# DNS intelligence
dig target.com ANY
dnsrecon -d target.com
host -a target.com`}
</pre>


<div className="info-box">
<h4>Summary</h4>
<p>
            Infrastructure discovery turns raw domains into a clear map of
            technologies, cloud assets, and potential entry points.
</p>
</div>
</>
    ),
quiz: {
question: "Which technology fingerprinting tool is commonly used on websites?",
options: [
"Only nmap",
"whatweb",
"Only amass",
"Only feroxbuster"
      ],
correct: "whatweb",
    },
  },


  // ====================== 07 Active Reconnaissance ======================
  {
id: "active-recon",
title: "07 Active Reconnaissance",
content: (
<>
<h2>Active Reconnaissance</h2>
<p>
          Active recon directly interacts with the target. It is louder than
          passive recon and must be performed carefully within the Rules of
          Engagement.
</p>


<h3>Core Active Techniques</h3>
<ul>
<li>Port scanning (nmap, masscan, rustscan)</li>
<li>Service and version detection</li>
<li>Web directory and content discovery</li>
<li>Virtual host discovery</li>
<li>API endpoint enumeration</li>
<li>Screenshotting and visual recon</li>
</ul>


<pre className="payload-box">
{`# Fast port scanning
rustscan -a target.com -- -sV -sC
nmap -sV -sC -p- -T4 target.com -oA full_scan
masscan -p1-65535 --rate=2000 target.com


# Web content discovery
ffuf -u https://target.com/FUZZ -w wordlist.txt -mc 200,301,302,403
feroxbuster -u https://target.com -w wordlist.txt
gobuster dir -u https://target.com -w wordlist.txt


# Live host probing
cat subs.txt | httpx -title -tech-detect -status-code -o httpx.txt`}
</pre>


<h3>OPSEC Considerations</h3>
<ul>
<li>Use slow timing when stealth is required</li>
<li>Distribute scans across multiple source IPs if possible</li>
<li>Avoid aggressive scans against production during peak hours</li>
<li>Document every active action for the report</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Active recon confirms what is really alive and reachable.
            Balance thoroughness with stealth according to the engagement goals.
</p>
</div>
</>
    ),
quiz: {
question: "Which tool is used for fast port scanning in active reconnaissance?",
options: [
"ffuf",
"rustscan",
"feroxbuster",
"gobuster"
      ],
correct: "rustscan",
    },
  },


  // ====================== 08 Tools & Automation ======================
  {
id: "tools-stack",
title: "08 Tools & Automation",
content: (
<>
<h2>Essential Tools & Automation</h2>


<h3>Core Recon Toolkit</h3>
<pre className="payload-box">
{`Subdomain:     subfinder, amass, findomain, assetfinder
Resolution:    dnsx, puredns, massdns
HTTP Probing:  httpx, httprobe
Port Scanning: nmap, masscan, rustscan
Content Disc:  ffuf, feroxbuster, gobuster
Screenshots:   aquatone, gowitness, eyewitness
Cloud:         cloud_enum, S3Scanner, awsbucketdump
People/Email:  theHarvester, hunter, h8mail
Frameworks:    reconFTW, reNgine, SpiderFoot, Maltego`}
</pre>


<h3>Automation Tips</h3>
<ul>
<li>Chain tools with bash or Python pipelines</li>
<li>Use reconFTW or similar frameworks for full automation</li>
<li>Store results in structured format (JSON, CSV, Notion, BloodHound style)</li>
<li>Schedule continuous monitoring for new assets</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Tools change, methodology stays. Master a core set of tools and
            automate the repetitive parts of recon.
</p>
</div>
</>
    ),
quiz: {
question: "Which framework is recommended for full automation in recon?",
options: [
"Only reconFTW",
"reconFTW or similar frameworks for full automation",
"Only SpiderFoot",
"Only Maltego"
      ],
correct: "reconFTW or similar frameworks for full automation",
    },
  },


  // ====================== 09 OPSEC & Reporting ======================
  {
id: "opsec-reporting",
title: "09 OPSEC & Reporting",
content: (
<>
<h2>OPSEC & Reporting Recon Findings</h2>


<h3>Recon OPSEC Rules</h3>
<ul>
<li>Prefer passive sources first</li>
<li>Use VPNs / VPS / dedicated infrastructure for active scans</li>
<li>Never use personal accounts for OSINT</li>
<li>Rate-limit active techniques</li>
<li>Respect the Rules of Engagement at all times</li>
</ul>


<h3>How to Report Recon</h3>
<ul>
<li>List all discovered domains, subdomains, and IPs</li>
<li>Highlight high-value or unexpected assets</li>
<li>Document technology stack and interesting services</li>
<li>Include employee email patterns (if relevant)</li>
<li>Map findings to possible attack paths</li>
</ul>


<div className="info-box">
<h4>Summary</h4>
<p>
            Good recon is quiet, thorough, and well documented.
            The quality of your reconnaissance directly affects the success
            of the entire engagement.
</p>
</div>
</>
    ),
quiz: {
question: "What is the most important recon OPSEC rule?",
options: [
"Use personal accounts",
"Prefer passive sources first",
"Start with active scanning",
"Report everything immediately"
      ],
correct: "Prefer passive sources first",
    },
  },
];


const ReconOSINT = () => {
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
<Link to="/red-teaming" className="back-link">
            ← Back to Red Teaming Courses
</Link>
<h1>
            The ultimate Red Team guide to{" "}
<span className="gradient-text">Recon & OSINT</span>
</h1>
<p className="article-date">Interactive Deep Course • 2026</p>
</div>
</section>


<section className="article-banner">
<img
src="https://plain-apac-prod-public.komododecks.com/202610/03/0KhptUleuWeXYrGasvoW/image.png"
alt="Recon & OSINT Guide"
onError={(e) => {
e.target.src =
"https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Recon+%26+OSINT";
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


export default ReconOSINT;