const { getFlag } = require("../../utils/flags");
const { validateGCP } = require("../../utils/validators");

function submitGCP(level, payload) {
  const id = Number(level);
  const isCorrect = validateGCP(id, payload);

  const requests = {
    1: `gsutil ls gs://VulnXploit-company-data
GET https://storage.googleapis.com/VulnXploit-company-data`,
    2: `gcloud projects get-iam-policy PROJECT_ID
gcloud iam service-accounts add-iam-policy-binding ...`,
    3: `GET http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
Metadata-Flavor: Google`,
    4: `gcloud compute firewall-rules list`,
    5: `gcloud secrets versions access latest --secret=prod-db-password`,
  };

  const successResponses = {
    1: `200 OK

credentials.csv
database-backup.sql
employee-data.csv
secrets/
flag.txt`,
    2: `Role binding updated.
roles/iam.serviceAccountUser granted to lowpriv@VulnXploit.lab

Privilege escalation path available.`,
    3: `HTTP/1.1 200 OK

{
  "access_token": "ya29.c.b0Aaekm1J...",
  "expires_in": 3599,
  "token_type": "Bearer"
}`,
    4: `NAME: allow-ssh-public
DIRECTION: INGRESS
SOURCE_RANGES: 0.0.0.0/0
ALLOW: tcp:22

Risk: Critical – SSH exposed to the internet.`,
    5: `{
  "name": "projects/.../secrets/prod-db-password/versions/1",
  "payload": {
    "data": "UHI2ZF9TM2NyM3RfR0NQXzIwMjYh"
  }
}

Decoded: Pr0d_S3cr3t_GCP_2026!`,
  };

  const failResponses = {
    1: "403 Forbidden\nAccessDenied",
    2: "PERMISSION_DENIED",
    3: "404 Not Found",
    4: "No critical findings",
    5: "PERMISSION_DENIED: Caller does not have secretaccessor permission",
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
    flag: getFlag("cloud", "gcp", id),
    request: requests[id] || `Input: ${payload}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitGCP };