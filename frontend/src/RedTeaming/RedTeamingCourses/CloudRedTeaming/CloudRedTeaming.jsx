import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "./CloudRedTeaming.css";

const chapters = [
  {
    id: "what-is-cloud-rt",
    title: "01 What is Cloud Red Teaming?",
    content: (
      <>
        <h2>What is Cloud Red Teaming?</h2>
        <p>
          Cloud Red Teaming focuses on assessing the security of cloud
          environments (primarily AWS, Azure, and GCP) from an adversary’s
          perspective. Unlike traditional infrastructure assessments, cloud
          engagements emphasize identity, misconfigurations, excessive
          permissions, and the unique attack surfaces created by managed
          services.
        </p>
        <p>
          Modern cloud breaches rarely start with classic network exploits.
          Instead they frequently abuse identity, overly permissive IAM roles,
          exposed metadata services, and insecure service configurations.
          Understanding these patterns is essential for realistic cloud
          assessments.
        </p>

        <h3>Key Differences from Traditional Red Teaming</h3>
        <ul>
          <li>Identity is the new perimeter</li>
          <li>Ephemeral resources and auto-scaling change persistence models</li>
          <li>Shared responsibility model shifts many controls to the customer</li>
          <li>APIs and control planes become primary attack surfaces</li>
          <li>Cross-account and federated trust create powerful pivot points</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Cloud Red Teaming prioritizes identity, configuration, and service
            abuse over classic network exploitation. Mastering IAM and the
            unique features of each major cloud provider is the foundation of
            effective assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is the primary focus of Cloud Red Teaming compared to traditional red teaming?",
      options: [
        "Classic network exploits and buffer overflows",
        "Identity, misconfigurations, excessive permissions, and managed service abuse",
        "Only physical security of data centers",
        "Only client-side web vulnerabilities"
      ],
      correct: "Identity, misconfigurations, excessive permissions, and managed service abuse",
    },
  },
  {
    id: "shared-responsibility",
    title: "02 Shared Responsibility Model",
    content: (
      <>
        <h2>Shared Responsibility Model</h2>
        <p>
          Every major cloud provider operates under a shared responsibility
          model. The provider secures the underlying infrastructure; the
          customer is responsible for securing what they build and configure
          on top of it.
        </p>

        <h3>Provider Responsibility</h3>
        <ul>
          <li>Physical security of data centers</li>
          <li>Hypervisor and host infrastructure</li>
          <li>Managed service availability and core platform security</li>
        </ul>

        <h3>Customer Responsibility</h3>
        <ul>
          <li>Identity and access management configuration</li>
          <li>Network security groups / firewall rules</li>
          <li>Data encryption and key management</li>
          <li>Application and operating system hardening</li>
          <li>Logging, monitoring, and incident response</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Most successful cloud attacks exploit customer-side
            misconfigurations rather than provider vulnerabilities. Focus
            assessments on identity, permissions, and service configurations.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Under the shared responsibility model, who is primarily responsible for IAM configuration?",
      options: [
        "Only the cloud provider",
        "The customer",
        "Only the government",
        "No one"
      ],
      correct: "The customer",
    },
  },
  {
    id: "iam-fundamentals",
    title: "03 Identity & Access Management Fundamentals",
    content: (
      <>
        <h2>Identity & Access Management Fundamentals</h2>
        <p>
          Identity is the primary attack surface in modern cloud environments.
          Understanding how identities, roles, policies, and trust
          relationships work is critical for both offense and defense.
        </p>

        <h3>Core Concepts Across Providers</h3>
        <ul>
          <li>Users, groups, roles, and service principals</li>
          <li>Policies (identity-based and resource-based)</li>
          <li>Trust relationships and assume-role patterns</li>
          <li>Temporary credentials and session tokens</li>
          <li>Federation (SAML, OIDC, external identity providers)</li>
        </ul>

        <h3>High-Value Targets</h3>
        <ul>
          <li>Overly permissive roles and policies</li>
          <li>Roles that can be assumed by untrusted principals</li>
          <li>Service accounts with excessive privileges</li>
          <li>Long-lived access keys and credentials</li>
          <li>Cross-account trust misconfigurations</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            IAM misconfigurations are the most common and impactful findings
            in cloud assessments. Treat identity as the primary attack surface.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is considered the primary attack surface in modern cloud environments?",
      options: [
        "Physical data center access",
        "Identity and Access Management (IAM)",
        "Only network firewalls",
        "Only operating system patches"
      ],
      correct: "Identity and Access Management (IAM)",
    },
  },
  {
    id: "aws-attack-surface",
    title: "04 AWS Attack Surface",
    content: (
      <>
        <h2>AWS Attack Surface</h2>
        <p>
          AWS remains the most widely assessed cloud platform. Its rich set of
          services and flexible IAM model create numerous opportunities for
          privilege escalation and lateral movement.
        </p>

        <h3>High-Value AWS Services & Concepts</h3>
        <ul>
          <li>IAM roles, policies, and permission boundaries</li>
          <li>EC2 instance profiles and metadata service (IMDSv1/v2)</li>
          <li>S3 bucket policies and ACLs</li>
          <li>Lambda execution roles and event sources</li>
          <li>STS AssumeRole and cross-account access</li>
          <li>Secrets Manager, Parameter Store, and KMS</li>
          <li>EKS, ECS, and container-related IAM</li>
        </ul>

        <h3>Common Assessment Focus Areas</h3>
        <ul>
          <li>Overly permissive IAM policies</li>
          <li>Public or misconfigured S3 buckets</li>
          <li>SSRF into instance metadata</li>
          <li>Role assumption chains leading to admin</li>
          <li>Exposed access keys in code or configuration</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            AWS assessments revolve around IAM, metadata, and service
            configuration. Systematic policy analysis and role chaining yield
            the highest impact findings.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Which AWS feature is commonly abused via SSRF to steal temporary credentials?",
      options: [
        "S3 static website hosting",
        "EC2 Instance Metadata Service (IMDS)",
        "CloudFront distributions",
        "Route 53 DNS only"
      ],
      correct: "EC2 Instance Metadata Service (IMDS)",
    },
  },
  {
    id: "azure-attack-surface",
    title: "05 Azure Attack Surface",
    content: (
      <>
        <h2>Azure Attack Surface</h2>
        <p>
          Azure’s identity model is tightly integrated with Microsoft Entra ID
          (formerly Azure AD). Many high-impact paths involve abusing
          directory roles, application permissions, and managed identities.
        </p>

        <h3>High-Value Azure Concepts</h3>
        <ul>
          <li>Entra ID users, groups, and directory roles</li>
          <li>Service principals and application registrations</li>
          <li>Managed identities (system and user assigned)</li>
          <li>Azure RBAC vs Entra ID roles</li>
          <li>Key Vault access policies and RBAC</li>
          <li>Virtual Machine metadata and managed identity tokens</li>
          <li>Conditional Access and privileged identity management</li>
        </ul>

        <h3>Common Focus Areas</h3>
        <ul>
          <li>Over-privileged service principals</li>
          <li>Application permission abuse</li>
          <li>Managed identity token theft</li>
          <li>Role assignments that enable privilege escalation</li>
          <li>Exposed credentials in App Settings or Key Vault</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Azure Red Teaming is heavily identity-centric. Understanding Entra
            ID, service principals, and managed identities is essential for
            effective assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "In Azure, what is a common high-impact target related to identity?",
      options: [
        "Only storage account keys",
        "Service principals, managed identities, and Entra ID roles",
        "Only virtual network peering",
        "Only public IP addresses"
      ],
      correct: "Service principals, managed identities, and Entra ID roles",
    },
  },
  {
    id: "gcp-attack-surface",
    title: "06 GCP Attack Surface",
    content: (
      <>
        <h2>GCP Attack Surface</h2>
        <p>
          Google Cloud Platform uses a resource hierarchy and IAM model that
          differs from AWS and Azure. Understanding projects, organizations,
          and service accounts is key.
        </p>

        <h3>High-Value GCP Concepts</h3>
        <ul>
          <li>Organizations, folders, and projects</li>
          <li>IAM roles and bindings at different hierarchy levels</li>
          <li>Service accounts and impersonation</li>
          <li>Workload Identity and federation</li>
          <li>Metadata server and service account tokens</li>
          <li>Cloud Storage, Compute Engine, and GKE IAM</li>
          <li>Secret Manager and KMS</li>
        </ul>

        <h3>Common Assessment Focus</h3>
        <ul>
          <li>Overly broad IAM bindings</li>
          <li>Service account key exposure</li>
          <li>Impersonation chains</li>
          <li>Public or weakly protected Cloud Storage buckets</li>
          <li>Metadata service abuse</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            GCP assessments focus on the resource hierarchy, service account
            impersonation, and IAM bindings. Privilege often flows through
            carefully constructed role chains.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "In GCP, what is a key privilege escalation technique involving service accounts?",
      options: [
        "Only changing project names",
        "Service account impersonation and overly broad IAM bindings",
        "Only using public IP addresses",
        "Only disabling logging"
      ],
      correct: "Service account impersonation and overly broad IAM bindings",
    },
  },
  {
    id: "metadata-ssrf",
    title: "07 Metadata Services & SSRF",
    content: (
      <>
        <h2>Metadata Services & SSRF</h2>
        <p>
          Cloud instance metadata services provide temporary credentials and
          instance information. When reachable via Server-Side Request Forgery
          (SSRF) or other means, they become a powerful initial access or
          privilege escalation vector.
        </p>

        <h3>Key Points Across Providers</h3>
        <ul>
          <li>AWS IMDS (v1 vs v2 differences)</li>
          <li>Azure Instance Metadata Service</li>
          <li>GCP Metadata Server</li>
          <li>Token and credential retrieval patterns</li>
          <li>Network controls and hop limits that mitigate abuse</li>
        </ul>

        <h3>Assessment Considerations</h3>
        <ul>
          <li>Identify applications that can make outbound requests</li>
          <li>Test for SSRF and metadata reachability</li>
          <li>Evaluate IMDSv2 enforcement and similar protections</li>
          <li>Understand the privileges attached to retrieved credentials</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Metadata service abuse remains one of the highest-impact techniques
            in cloud environments. Always evaluate reachability and the
            privileges of any credentials obtained.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why are cloud metadata services a high-value target?",
      options: [
        "They only contain public information",
        "They can provide temporary credentials with significant privileges when reachable via SSRF",
        "They are never accessible",
        "They only work on-premises"
      ],
      correct: "They can provide temporary credentials with significant privileges when reachable via SSRF",
    },
  },
  {
    id: "cloud-privesc",
    title: "08 Privilege Escalation in the Cloud",
    content: (
      <>
        <h2>Privilege Escalation in the Cloud</h2>
        <p>
          Cloud privilege escalation typically involves chaining IAM
          permissions, role assumptions, and service configurations rather
          than classic local exploits.
        </p>

        <h3>Common Patterns</h3>
        <ul>
          <li>Role / service principal assumption chains</li>
          <li>Policy modification or attachment rights</li>
          <li>Passing roles to services that can be influenced</li>
          <li>Abusing resource-based policies</li>
          <li>Exploiting overly permissive trust relationships</li>
          <li>Credential exposure leading to higher-privileged identities</li>
        </ul>

        <h3>Provider-Specific Notes</h3>
        <ul>
          <li>AWS: iam:PassRole, sts:AssumeRole, policy versioning</li>
          <li>Azure: Role assignment rights, application permissions</li>
          <li>GCP: iam.serviceAccountUser, impersonation, role bindings</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Cloud privilege escalation is primarily an identity and policy
            problem. Systematic analysis of who can assume what, and who can
            modify policies, reveals the majority of paths.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "How does privilege escalation usually work in cloud environments?",
      options: [
        "Mainly through classic local kernel exploits",
        "By chaining IAM permissions, role assumptions, and policy modification rights",
        "Only by physical access to servers",
        "Only through SQL injection"
      ],
      correct: "By chaining IAM permissions, role assumptions, and policy modification rights",
    },
  },
  {
    id: "persistence-lateral",
    title: "09 Persistence & Lateral Movement",
    content: (
      <>
        <h2>Persistence & Lateral Movement</h2>
        <p>
          Maintaining access and moving across cloud resources requires
          different techniques than traditional on-premises environments.
        </p>

        <h3>Persistence Techniques</h3>
        <ul>
          <li>Creation of new high-privileged identities or roles</li>
          <li>Backdooring existing trust relationships</li>
          <li>Deploying long-lived access keys or service account keys</li>
          <li>Abusing automation or CI/CD pipelines</li>
          <li>Federation and external identity provider manipulation</li>
        </ul>

        <h3>Lateral Movement</h3>
        <ul>
          <li>Assuming roles in other accounts or subscriptions</li>
          <li>Using compromised service credentials to access additional resources</li>
          <li>Pivoting through shared services (storage, databases, messaging)</li>
          <li>Cross-project or cross-subscription access</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Cloud persistence and lateral movement revolve around identity and
            trust. Focus on durable credentials, role assumptions, and
            automation pipelines.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is a common persistence technique in cloud environments?",
      options: [
        "Only installing rootkits on EC2 instances",
        "Creating new high-privileged identities, long-lived keys, or abusing CI/CD pipelines",
        "Only changing DNS records",
        "Only using XSS"
      ],
      correct: "Creating new high-privileged identities, long-lived keys, or abusing CI/CD pipelines",
    },
  },
  {
    id: "detection-hardening",
    title: "10 Detection & Hardening",
    content: (
      <>
        <h2>Detection & Hardening</h2>
        <p>
          Effective cloud defense relies on strong identity hygiene, logging,
          and continuous configuration monitoring.
        </p>

        <h3>Key Detection Opportunities</h3>
        <ul>
          <li>Unusual role assumptions and privilege escalations</li>
          <li>Creation of high-privileged identities or access keys</li>
          <li>Suspicious access to metadata services</li>
          <li>Changes to critical IAM policies and trust relationships</li>
          <li>Anomalous API activity and geographic patterns</li>
        </ul>

        <h3>Hardening Priorities</h3>
        <ul>
          <li>Enforce least privilege and regular access reviews</li>
          <li>Prefer short-lived credentials over long-lived keys</li>
          <li>Enable and monitor detailed audit logs</li>
          <li>Use permission boundaries and conditional access where available</li>
          <li>Protect metadata services (IMDSv2, etc.)</li>
          <li>Implement strong CI/CD and infrastructure-as-code controls</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Cloud hardening starts with identity. Continuous monitoring of IAM
            changes and API activity provides the strongest detection coverage.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What is one of the strongest detection opportunities in cloud environments?",
      options: [
        "Only monitoring CPU usage",
        "Monitoring unusual role assumptions, IAM policy changes, and metadata access",
        "Only checking disk space",
        "Only reviewing public website content"
      ],
      correct: "Monitoring unusual role assumptions, IAM policy changes, and metadata access",
    },
  },
  {
    id: "cross-cloud",
    title: "11 Cross-Cloud & Federation",
    content: (
      <>
        <h2>Cross-Cloud & Federation</h2>
        <p>
          Many organizations operate multi-cloud environments or federate
          identity across providers. These trust relationships create
          additional attack surface.
        </p>

        <h3>Common Scenarios</h3>
        <ul>
          <li>SAML / OIDC federation between identity providers</li>
          <li>Cross-account or cross-subscription roles</li>
          <li>Workload identity federation</li>
          <li>Third-party SaaS integrations with broad cloud permissions</li>
          <li>Shared services spanning multiple clouds</li>
        </ul>

        <h3>Assessment Focus</h3>
        <ul>
          <li>Map all external trust relationships</li>
          <li>Evaluate the privileges granted to federated identities</li>
          <li>Test for overly broad audience or subject claims</li>
          <li>Identify pivot opportunities between clouds</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Federation and multi-cloud trust can turn a single compromised
            identity into broad access. Always map and test these relationships.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "Why is federation a significant risk in multi-cloud environments?",
      options: [
        "It has no security impact",
        "A single compromised identity can gain broad access across clouds through trust relationships",
        "It only affects on-premises systems",
        "It only works with AWS"
      ],
      correct: "A single compromised identity can gain broad access across clouds through trust relationships",
    },
  },
  {
    id: "methodology",
    title: "12 Methodology & Best Practices",
    content: (
      <>
        <h2>Methodology & Best Practices</h2>
        <p>
          Effective Cloud Red Teaming follows a structured process that
          prioritizes identity and configuration analysis.
        </p>

        <h3>Recommended Approach</h3>
        <ol>
          <li>Map the cloud footprint and identity landscape</li>
          <li>Enumerate users, roles, service principals, and policies</li>
          <li>Identify high-value resources and trust relationships</li>
          <li>Test for privilege escalation and role chaining paths</li>
          <li>Evaluate metadata and SSRF exposure</li>
          <li>Assess persistence and lateral movement opportunities</li>
          <li>Document findings with clear impact and remediation guidance</li>
          <li>Provide detection recommendations alongside offensive findings</li>
        </ol>

        <h3>Professional Guidelines</h3>
        <ul>
          <li>Stay strictly within the agreed scope and Rules of Engagement</li>
          <li>Prefer non-destructive techniques when possible</li>
          <li>Coordinate closely with the client on high-impact actions</li>
          <li>Maintain detailed notes for reporting and Purple Team exercises</li>
        </ul>

        <div className="info-box">
          <h4>Summary</h4>
          <p>
            Successful Cloud Red Teaming is driven by deep identity analysis,
            systematic enumeration, and clear communication of risk. Master
            IAM across AWS, Azure, and GCP to deliver high-value assessments.
          </p>
        </div>
      </>
    ),
    quiz: {
      question: "What should be the primary focus when starting a Cloud Red Team assessment?",
      options: [
        "Immediately trying to exploit every public IP",
        "Mapping the cloud footprint and deeply analyzing the identity landscape",
        "Only testing the company website for XSS",
        "Ignoring IAM completely"
      ],
      correct: "Mapping the cloud footprint and deeply analyzing the identity landscape",
    },
  },
];

const CloudRedTeaming = () => {
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
            <span className="gradient-text">Cloud Red Teaming</span>
          </h1>
          <p className="article-date">Updated • 2026</p>
        </div>
      </section>

      <section className="article-banner">
        <img
          src="https://plain-apac-prod-public.komododecks.com/202610/03/smQfTpv5E5BCChJm5QyU/image.png"
          alt="Cloud Red Teaming"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x420/1a0b2e/ec4899?text=Cloud+Red+Teaming";
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

export default CloudRedTeaming;