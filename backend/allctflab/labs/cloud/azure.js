const { getFlag } = require("../../utils/flags");
const { validateAzure } = require("../../utils/validators");

function submitAzure(level, payload) {
  const id = Number(level);
  const isCorrect = validateAzure(id, payload);

  const requests = {
    1: `az storage blob list --account-name VulnXploit --container-name company-data --auth-mode login
# or public URL
https://VulnXploit.blob.core.windows.net/company-data/`,
    2: `az role assignment list
az ad app permission add ...`,
    3: `GET http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/
Metadata: true`,
    4: `az network nsg rule list --nsg-name web-nsg`,
    5: `az keyvault secret show --vault-name VulnXploit-kv --name prod-db-password`,
  };

  const successResponses = {
    1: `Name                 Blob Type    Length
-------------------  -----------  --------
credentials.csv      BlockBlob    2048
database-backup.sql  BlockBlob    1048576
secrets/flag.txt     BlockBlob    64

Public blob container successfully accessed.`,
    2: `Role assignment updated.
Privileged Role Administrator / Application Administrator granted.

Privilege escalation path available.`,
    3: `HTTP/1.1 200 OK

{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs...",
  "expires_in": "3599",
  "token_type": "Bearer"
}

Managed Identity token extracted from IMDS.`,
    4: `Name: AllowSSH
Direction: Inbound
Source: Internet / 0.0.0.0/0
Destination Port: 22

Risk: Critical – SSH exposed to the internet.`,
    5: `{
  "value": "Pr0d_S3cr3t_Azure_2026!",
  "id": "https://VulnXploit-kv.vault.azure.net/secrets/prod-db-password/..."
}

Key Vault secret extracted using Function App identity.`,
  };

  const failResponses = {
    1: "AuthorizationFailure / Public access not permitted",
    2: "Authorization failed",
    3: "404 Not Found / Metadata header missing",
    4: "No critical NSG rules matched",
    5: "Forbidden – Caller is not authorized",
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
    flag: getFlag("cloud", "azure", id),
    request: requests[id] || `Input: ${payload}`,
    response: successResponses[id] || "Vulnerability successfully exploited",
  };
}

module.exports = { submitAzure };