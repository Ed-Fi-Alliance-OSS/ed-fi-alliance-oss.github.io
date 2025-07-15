# Authentication

Authentication in the context of an Ed-Fi ODS / API is the process of credential exchange and verification to establish that a client is allowed to access the platform. Authentication in an Ed-Fi ODS / API is handled using two-legged [OAuth 2.0](https://tools.ietf.org/html/rfc6749) [Client Credentials Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.4).

Before accessing the resources in an Ed-Fi ODS / API platform, client applications need to obtain an access token from the API platform host. This access token is validated on every call made to the API as a representation of the client's application key and secret. This document briefly outlines the steps involved.

## Authentication Step-by-Step

The steps below walk you through the process that a client uses to supply credentials and receive a token. These steps are generally the same whether you use a command-line tool like cURL or whether you bake the steps into your client application. Most programming languages, including C# and Java, provide objects that handle these steps for you, but it's worth understanding what the steps are.

### Step 1. Obtain an Access Token

POST to the `/oauth/token` endpoint with an Authorization header of "Basic <base64 encoded client key : client secret>". The `grant_type` will be set to `client_credentials`. This follows the process described by the [Basic Authentication Scheme](https://tools.ietf.org/html/rfc2617#section-2).

**PowerShell Token Request:**
```powershell
Invoke-RestMethod -Method Post -Uri "https://api.ed-fi.org/v7.1/api/oauth/token" -Headers @{ "Authorization" = ("Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("RvcohKz9zHI4", "E1iEFusaNf81xzCxwHfbolkC" -join ":"))) ) } -Body @{ "grant_type" = "client_credentials"; }
```

**cURL Token Request:**
```bash
curl --user RvcohKz9zHI4:E1iEFusaNf81xzCxwHfbolkC https://api.ed-fi.org/v7.1/api/oauth/token --data 'grant_type=client_credentials'
```
*Note: curl --user option should base-64 encode the key and secret into the Authorization header.*

The above should return an access token. Example response:
```json
{
  "access_token": "940934d3a405492c99572db9329fc081",
  "expires_in": 1800,
  "token_type": "bearer"
}
```

In the OAuth2 Client Credentials Grant Flow, the host issues an access token and the amount of time in seconds until the token expires. The token will expire at the end of that allotted time and a new token will have to be obtained.

### Step 2. Use the Access Token

On subsequent API requests, include the access token in an HTTP Authorization header as "Bearer XYZ" where "XYZ" is the access token.

**API Call with Token (PowerShell):**
```powershell
Invoke-RestMethod -Method Get -Uri "https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/schools" -Headers @{ "Authorization" = "Bearer R3PLAC3_W1TH_ACC3SS_TOK3N" }
```

**API Call with Token (cURL):**
```bash
curl https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/schools -H "Authorization: Bearer R3PLAC3_W1TH_ACC3SS_TOK3N"
```

You can explore the whole API surface in this manner, but there are easier ways. See the section called [Using the Online Documentation](./using-the-online-documentation.md) for more information.

The next section, [Authorization](./authorization.md), has more details about using the access token.
