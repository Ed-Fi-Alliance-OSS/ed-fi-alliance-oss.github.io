# Authentication

Authentication for an Ed-Fi API is handled using two-legged [OAuth
2.0](https://tools.ietf.org/html/rfc6749) [Client Credentials Grant
Flow](https://tools.ietf.org/html/rfc6749#section-4.4).

Before accessing the resources in an Ed-Fi ODS / API platform, client
applications need to obtain an access token from the API platform host. This
access token is validated on every call made to the API as a representation of
the client's application key and secret. This document briefly outlines the
steps involved.

## Authentication Step-by-Step

The steps below walk you through the process that a client uses to supply
credentials and receive a token. These steps are generally the same whether you
use a command-line tool like cURL or whether you bake the steps into your client
application. Most programming languages, including C# and Java, provide objects
that handle these steps for you, but it's worth understanding what the steps
are.

:::info

Throughout this section, we will be using a command-line tool called cURL. It is
used to transfer information between systems using a variety of protocols
(including HTTP and HTTPS). For our purposes, it serves as a concise shorthand
for the HTTP information included to make the various calls to the Ed-Fi ODS /
API. Compiled executables for a variety of platforms can be downloaded from the
[cURL website](http://curl.haxx.se/dlwiz/?type=bin).

:::

### Step 1. Obtain an Access Token

Call the POST method on `/oauth/token` with an Authorization header of "Basic
< 64 base encoded client key : client secret>". The `Grant_type` will be set to
`client_credentials`. This follows the process described by the [Basic
Authentication Scheme](https://tools.ietf.org/html/rfc2617#section-2). For
Example, if the client id or key is RvcohKz9zHI4 and the client secret
is E1iEFusaNf81xzCxwHfbolkC, the value for the Authorization header would be
"Basic Base64EncodedKey:Secret"

```powershell title="PowerShell Token Request"
Invoke-RestMethod -Method Post -Uri "https://api.ed-fi.org/v5.2/api/oauth/token" -Headers @{ "Authorization" = ("Basic", [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("RvcohKz9zHI4", "E1iEFusaNf81xzCxwHfbolkC" -join ":"))) -join " ") } -Body @{ "grant_type" = "client_credentials"; }
```

```bash title="cURL Token Request"
curl --user RvcohKz9zHI4:E1iEFusaNf81xzCxwHfbolkC https://api.ed-fi.org/v5.2/api/oauth/token --data 'grant_type=client_credentials'
```

\*Note: curl --user option should base-64 encode the key and secret into the
Authorization header.

The above should return an access token.

The snippet below shows an example response with an access token. You will get a
different access token.

```json title="Access Token Response"
{
  "access_token": "940934d3a405492c99572db9329fc081",
  "expires_in": 1800,
  "token_type": "bearer"
}
```

In the OAuth2 Client Credentials Grant Flow, the host issues an access token and
the amount of time in seconds until the token expires. The token will expire at
the end of that allotted time and a new token will have to be obtained.

### Step 2. Use the Access Token

On subsequent API requests, include the access token in an HTTP Authorization
header as "Bearer XYZ" where "XYZ" is the access token.

The following example uses the Authorization token to retrieve the schools in
the sandbox ODS / API hosted by the Ed-Fi Alliance. Replace the `Bearer` value
with the access token returned in the previous step.

```powershell title="PowerShell API Call with Token"
Invoke-RestMethod -Method Get -Uri "https://api.ed-fi.org/v5.2/api/data/v3/ed-fi/schools" -Headers @{ "Authorization" = "Bearer R3PLAC3_W1TH_ACC3SS_TOK3N" }
```

```bash title="cURL API Call with Token"
curl https://api.ed-fi.org/v5.2/api/data/v3/ed-fi/schools -H "Authorization: Bearer R3PLAC3_W1TH_ACC3SS_TOK3N"
```

As another example, the following call retrieves the discipline incidents
recorded in the sandbox ODS / API. Don't forget to replace the `Bearer` value.

```powershell title="PowerShell API Call with Token"
Invoke-RestMethod -Method Get -Uri "https://api.ed-fi.org/v5.2/api/data/v3/ed-fi/disciplineIncidents " -Headers @{ "Authorization" = "Bearer R3PLAC3_W1TH_ACC3SS_TOK3N" }
```

```bash title="cURL API Call with Token"
curl https://api.ed-fi.org/v5.2/api/data/v3/ed-fi/disciplineIncidents -H "Authorization: Bearer R3PLAC3_W1TH_ACC3SS_TOK3N"
```

You can explore the whole API surface in this manner, but there are easier ways.
See the section called Online API Documentation and Sandbox for more
information.

The next section, Authorization, has more details about using the access token.
