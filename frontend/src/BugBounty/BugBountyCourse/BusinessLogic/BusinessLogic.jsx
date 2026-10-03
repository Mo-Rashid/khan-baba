import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./BusinessLogic.css";

const chapters = [
  {
    id: "what-is-business-logic",
    title: "01 What is Business Logic Flaw?",
    content: (
      <>
        <h2>What is a Business Logic Flaw?</h2>
        <p>
          A Business Logic Flaw is a vulnerability that arises from mistakes in
          the design or implementation of an application’s workflow and rules.
          Unlike injection bugs, the application may work “as coded” but not
          “as intended,” allowing attackers to abuse legitimate features in
          unexpected ways.
        </p>
        <p>
          These flaws are highly valuable in bug bounty programs because they
          often lead to financial loss, privilege escalation, or unauthorized
          access without needing classic technical exploits.
        </p>
        <h3>How Business Logic Flaws Work</h3>
        <ol>
          <li>Application implements a multi-step process or business rule.</li>
          <li>Assumptions are made about user behavior or request order.</li>
          <li>Attacker skips steps, changes parameters, or replays actions.</li>
          <li>Server does not enforce the intended rules strictly.</li>
          <li>Attacker gains free items, higher privileges, or bypasses limits.</li>
        </ol>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Business Logic Flaw = Abusing the intended workflow or rules of the
            application in ways the developers did not anticipate.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What makes a Business Logic Flaw different from classic technical bugs like SQLi?",
      options: [
        "It always requires complex exploits",
        "The application works as coded but not as intended",
        "It only affects frontend code",
        "It can only be found by scanners"
      ],
      correct: "The application works as coded but not as intended",
    },
  },
  {
    id: "why-important",
    title: "02 Why Logic Flaws Matter",
    content: (
      <>
        <h2>Why Business Logic Flaws Matter</h2>
        <h3>High Business Impact</h3>
        <ul>
          <li>Free or discounted purchases</li>
          <li>Bypass of payment or subscription checks</li>
          <li>Privilege escalation to admin or premium features</li>
          <li>Account takeover through workflow abuse</li>
          <li>Inventory or rate-limit manipulation</li>
          <li>Fraud and financial loss for the company</li>
        </ul>
        <h3>Hard to Detect Automatically</h3>
        <p>
          Scanners rarely find logic flaws. They require understanding the
          application’s purpose and testing how features can be combined or
          abused. This makes them excellent targets for manual bug bounty
          hunters.
        </p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Logic flaws often equal direct money or privilege impact and are
            usually missed by automated tools.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why are Business Logic Flaws especially valuable in bug bounty?",
      options: [
        "They are easy to find with automated scanners",
        "They usually have low impact",
        "They often cause direct financial or privilege impact and are missed by tools",
        "They only exist in old applications"
      ],
      correct: "They often cause direct financial or privilege impact and are missed by tools",
    },
  },
  {
    id: "common-types",
    title: "03 Common Types of Logic Flaws",
    content: (
      <>
        <h2>Common Types of Business Logic Flaws</h2>
        <h3>1. Price / Payment Manipulation</h3>
        <p>Changing price, quantity, currency, or coupon values in requests.</p>
        <h3>2. Workflow Bypass</h3>
        <p>Skipping steps in multi-step processes (checkout, verification, onboarding).</p>
        <h3>3. Race Conditions</h3>
        <p>Sending parallel requests to exploit timing (double spend, extra credits).</p>
        <h3>4. Privilege / Feature Abuse</h3>
        <p>Accessing premium features or admin actions without proper checks.</p>
        <h3>5. Limit / Rate Bypass</h3>
        <p>Ignoring usage limits, invite quotas, or trial restrictions.</p>
        <h3>6. Negative Values & Overflow</h3>
        <p>Using negative quantities or extreme values to gain credits or free items.</p>
        <h3>7. Coupon / Referral Abuse</h3>
        <p>Reusing coupons, stacking discounts, or self-referral loops.</p>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Main categories: payment manipulation, workflow bypass, race
            conditions, privilege abuse, limit bypass, and coupon/referral abuse.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which of the following is a common category of Business Logic Flaw?",
      options: [
        "Only XSS and CSRF",
        "Price manipulation, workflow bypass, and race conditions",
        "Only SQL Injection",
        "Only misconfigured CORS"
      ],
      correct: "Price manipulation, workflow bypass, and race conditions",
    },
  },
  {
    id: "price-manipulation",
    title: "04 Price & Payment Manipulation",
    content: (
      <>
        <h2>Price & Payment Manipulation</h2>
        <p>
          Attackers modify price-related parameters that the server trusts
          without re-validating against the real product price.
        </p>
        <h3>Common Parameters to Test</h3>
        <pre className="payload-box">
{`price
amount
quantity
total
discount
currency
coupon
tax
shipping`}
        </pre>
        <h3>Example Attacks</h3>
        <pre className="payload-box">
{`// Change price to 0 or 0.01
{"product_id": 55, "price": 0.01}

// Negative quantity
{"product_id": 55, "quantity": -1}

// Change currency to a weaker one or unexpected code
{"currency": "XYZ"}

// Apply expired or other user’s coupon
{"coupon": "ADMIN100"}`}
        </pre>
        <h3>Testing Tips</h3>
        <ul>
          <li>Intercept checkout requests and modify every numeric field.</li>
          <li>Try zero, negative, and very large values.</li>
          <li>Replay payment confirmation steps out of order.</li>
          <li>Test whether the server recalculates totals server-side.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Never trust client-side prices. Always recalculate totals and
            validate coupons and quantities on the server.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the core problem in price manipulation attacks?",
      options: [
        "The server uses HTTPS",
        "The server trusts client-supplied price/quantity values without recalculating",
        "The frontend is slow",
        "Only GET requests are used"
      ],
      correct: "The server trusts client-supplied price/quantity values without recalculating",
    },
  },
  {
    id: "workflow-bypass",
    title: "05 Workflow Bypass",
    content: (
      <>
        <h2>Workflow Bypass</h2>
        <p>
          Many applications assume users will follow steps in order (cart →
          address → payment → confirm). Attackers jump directly to later steps
          or skip verification.
        </p>
        <h3>Classic Examples</h3>
        <ul>
          <li>Skip email/phone verification and reach the dashboard.</li>
          <li>Go directly to the “order confirmed” endpoint without paying.</li>
          <li>Skip KYC or identity checks.</li>
          <li>Access premium features before subscription is active.</li>
          <li>Complete password reset without valid token steps.</li>
        </ul>
        <h3>How to Test</h3>
        <ol>
          <li>Map the full intended flow and note every request.</li>
          <li>Try accessing later endpoints without completing earlier ones.</li>
          <li>Replay completion requests with old or missing tokens.</li>
          <li>Remove or alter step indicators (flags, status parameters).</li>
        </ol>
        <pre className="payload-box">
{`// Example: skip payment
POST /checkout/confirm
{"order_id": "12345"}   ← without completing /checkout/pay`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Always enforce step order and state on the server. Client-side
            navigation is not security.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the main idea behind workflow bypass testing?",
      options: [
        "Only testing the first step",
        "Trying to reach later steps without completing earlier required steps",
        "Only changing the User-Agent",
        "Using only GET requests"
      ],
      correct: "Trying to reach later steps without completing earlier required steps",
    },
  },
  {
    id: "race-conditions",
    title: "06 Race Conditions",
    content: (
      <>
        <h2>Race Conditions in Business Logic</h2>
        <p>
          Race conditions occur when parallel requests exploit a window where
          the application has not yet updated shared state (balance, stock,
          limit counters).
        </p>
        <h3>Common Targets</h3>
        <ul>
          <li>Redeem coupon / gift card multiple times</li>
          <li>Transfer money or credits twice</li>
          <li>Apply the same discount more than once</li>
          <li>Exceed invite or free-trial limits</li>
          <li>Purchase limited stock items multiple times</li>
        </ul>
        <h3>How to Test</h3>
        <pre className="payload-box">
{`1. Capture the sensitive request (e.g. redeem coupon)
2. Send 10–50 parallel requests (Burp Intruder / Turbo Intruder)
3. Check whether the action succeeded more times than allowed`}
        </pre>
        <h3>Tools</h3>
        <ul>
          <li>Burp Intruder (null payloads + concurrent requests)</li>
          <li>Turbo Intruder</li>
          <li>Custom scripts with threading/async</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Race conditions are powerful against limits and balances. Use
            parallel requests and verify final state carefully.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How do you typically test for race conditions in business logic?",
      options: [
        "Send only one request slowly",
        "Send many parallel requests of the same action",
        "Only change the HTTP method",
        "Only test with a single account"
      ],
      correct: "Send many parallel requests of the same action",
    },
  },
  {
    id: "privilege-abuse",
    title: "07 Privilege & Feature Abuse",
    content: (
      <>
        <h2>Privilege & Feature Abuse</h2>
        <p>
          Logic flaws can allow lower-privileged users to perform higher-privileged
          actions by manipulating roles, flags, or feature parameters.
        </p>
        <h3>Examples</h3>
        <pre className="payload-box">
{`// Change role in profile update
{"role": "admin", "isPremium": true}

// Access premium API without subscription
GET /api/premium/report

// Invite yourself as workspace admin
POST /api/workspace/addMember
{"email": "you@evil.com", "role": "owner"}`}
        </pre>
        <h3>Testing Ideas</h3>
        <ul>
          <li>Look for role, plan, isAdmin, isPremium parameters.</li>
          <li>Try upgrading your own account via mass-assignment style changes.</li>
          <li>Access other tenants’ or organizations’ resources.</li>
          <li>Test whether feature flags can be forced client-side.</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Never trust client-supplied role or plan values. Enforce privileges
            strictly on the server for every sensitive action.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a typical privilege abuse technique?",
      options: [
        "Only using strong passwords",
        "Sending role or isPremium parameters controlled by the client",
        "Only testing logout functionality",
        "Disabling JavaScript"
      ],
      correct: "Sending role or isPremium parameters controlled by the client",
    },
  },
  {
    id: "limit-bypass",
    title: "08 Limit & Rate Bypass",
    content: (
      <>
        <h2>Limit & Rate Limit Bypass</h2>
        <p>
          Applications often enforce limits (free tier quotas, invites per day,
          messages, API calls). Logic flaws can allow exceeding those limits.
        </p>
        <h3>Common Bypasses</h3>
        <ul>
          <li>Changing account ID or workspace ID in the request</li>
          <li>Using different IP / User-Agent / headers (weak rate limits)</li>
          <li>Creating multiple accounts to multiply quotas</li>
          <li>Race conditions on the counter update</li>
          <li>Resetting counters by manipulating dates or status</li>
        </ul>
        <h3>Example</h3>
        <pre className="payload-box">
{`// Free plan allows 5 invites
POST /api/invite  (send 5 times)
// Then change a parameter or race to send more

// Or switch to another org_id you control
{"org_id": "other-org", "email": "victim@x.com"}`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Test every numeric or quota limit. Try parallel requests, parameter
            changes, and multi-account strategies.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which technique is commonly used to bypass usage limits?",
      options: [
        "Only using one account carefully",
        "Race conditions, parameter changes, or multi-account strategies",
        "Only testing with HTTPS",
        "Disabling cookies"
      ],
      correct: "Race conditions, parameter changes, or multi-account strategies",
    },
  },
  {
    id: "coupon-referral",
    title: "09 Coupon & Referral Abuse",
    content: (
      <>
        <h2>Coupon, Discount & Referral Abuse</h2>
        <h3>Coupon Attacks</h3>
        <ul>
          <li>Reuse a single-use coupon multiple times</li>
          <li>Apply multiple coupons that should not stack</li>
          <li>Use another user’s personal coupon</li>
          <li>Apply expired or not-yet-valid coupons</li>
          <li>Manipulate discount percentage or fixed amount</li>
        </ul>
        <h3>Referral / Invite Abuse</h3>
        <ul>
          <li>Self-referral (same person both sides)</li>
          <li>Create many accounts to farm referral bonuses</li>
          <li>Change referral code after signup</li>
          <li>Race condition on bonus credit</li>
        </ul>
        <h3>Example Payloads</h3>
        <pre className="payload-box">
{`{"coupon": "SAVE50", "discount": 100}
{"referral_code": "YOUR_OWN_CODE"}
// Replay redeem request many times in parallel`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Coupons and referrals are frequent logic-flaw targets. Test reuse,
            stacking, self-referral, and race conditions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a common coupon/referral abuse?",
      options: [
        "Using the coupon only once as intended",
        "Reusing single-use coupons or self-referral loops",
        "Only testing expired coupons",
        "Never changing the referral code"
      ],
      correct: "Reusing single-use coupons or self-referral loops",
    },
  },
  {
    id: "hunting-methodology",
    title: "10 Hunting Methodology",
    content: (
      <>
        <h2>Business Logic Hunting Methodology</h2>
        <h3>Step-by-Step Approach</h3>
        <ol>
          <li><strong>Understand the business</strong> – What is the app for? What has value?</li>
          <li><strong>Map all workflows</strong> – Registration, checkout, invites, upgrades, transfers.</li>
          <li><strong>Identify trust boundaries</strong> – Where does the server trust the client?</li>
          <li><strong>Test parameter manipulation</strong> – Prices, quantities, roles, flags, IDs.</li>
          <li><strong>Test step skipping</strong> – Jump to later endpoints.</li>
          <li><strong>Test race conditions</strong> – Parallel requests on limits and balances.</li>
          <li><strong>Test multi-account scenarios</strong> – Referrals, sharing, org invites.</li>
          <li><strong>Think like an attacker</strong> – “How can I get something for free or more privileges?”</li>
        </ol>
        <h3>Useful Mindset Questions</h3>
        <ul>
          <li>What if I send this request twice?</li>
          <li>What if I change this number to 0 or -1?</li>
          <li>What if I skip this step?</li>
          <li>What if I use another user’s ID here?</li>
          <li>What if I do this from two accounts at once?</li>
        </ul>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Logic hunting is about understanding the application’s purpose and
            creatively breaking its assumptions.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important first step when hunting business logic flaws?",
      options: [
        "Immediately start sending random payloads",
        "Understand the business and map the workflows",
        "Only look for SQLi",
        "Ignore multi-step processes"
      ],
      correct: "Understand the business and map the workflows",
    },
  },
  {
    id: "examples",
    title: "11 Real-World Examples",
    content: (
      <>
        <h2>Real-World Business Logic Examples</h2>
        <h3>1. Free Purchase</h3>
        <pre className="payload-box">
{`POST /cart/checkout
{"items": [{"id": 1, "price": 0}]}
→ Order placed for free`}
        </pre>
        <h3>2. Skip Payment</h3>
        <pre className="payload-box">
{`// Complete order without calling payment gateway
POST /orders/123/complete`}
        </pre>
        <h3>3. Double Credit Race</h3>
        <pre className="payload-box">
{`// Redeem gift card 20 times in parallel
→ Balance increases 20×`}
        </pre>
        <h3>4. Self-Referral Bonus</h3>
        <pre className="payload-box">
{`Account A invites Account B (same person)
Both receive signup bonus`}
        </pre>
        <h3>5. Negative Quantity</h3>
        <pre className="payload-box">
{`{"product_id": 10, "quantity": -5}
→ Account credited instead of charged`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Real bugs often look simple: change a number, skip a step, or send
            parallel requests. Impact is usually direct and high.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What do many real-world business logic bugs have in common?",
      options: [
        "They require advanced zero-days",
        "They often look simple (change a number, skip a step, race condition) but have high impact",
        "They only work on mobile apps",
        "They are always found by scanners"
      ],
      correct: "They often look simple (change a number, skip a step, race condition) but have high impact",
    },
  },
  {
    id: "prevention",
    title: "12 Prevention",
    content: (
      <>
        <h2>How to Prevent Business Logic Flaws</h2>
        <ul>
          <li><strong>Never trust the client</strong> – Recalculate prices, totals, and discounts server-side.</li>
          <li>Enforce workflow state machines on the server (step order, required previous states).</li>
          <li>Use atomic operations and proper locking for balances, stock, and counters.</li>
          <li>Validate every parameter against allowed ranges and business rules.</li>
          <li>Implement strong authorization for every privileged action.</li>
          <li>Design coupons and referrals with clear one-time and ownership rules.</li>
          <li>Add monitoring and alerts for unusual financial or privilege events.</li>
          <li>Perform manual threat modeling and abuse-case testing before release.</li>
          <li>Review multi-step and multi-user features carefully in code review.</li>
        </ul>
        <h3>Secure Pattern Example</h3>
        <pre className="payload-box">
{`// Pseudocode – server recalculates everything
product = db.get(product_id)
total = product.price * quantity
if coupon:
    total = apply_coupon(coupon, total, user)  // server-side rules
if user.balance < total:
    reject
charge(user, total)
create_order(...)`}
        </pre>
        <div className="info-box">
          <h4>Summary</h4>
          <p>
            The core defense is: enforce all business rules on the server,
            never trust client-supplied prices, roles, or step completion.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the most important principle to prevent business logic flaws?",
      options: [
        "Trust all client-side values",
        "Enforce every business rule and recalculate critical values on the server",
        "Only use client-side validation",
        "Disable all logging"
      ],
      correct: "Enforce every business rule and recalculate critical values on the server",
    },
  },
];

const BusinessLogic = () => {
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
            <span className="gradient-text">Business Logic</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/OoPSZSDlvGyeb2ixCrkS/image.png"
          alt="Business Logic Guide"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/a855f7?text=Business+Logic";
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

export default BusinessLogic;