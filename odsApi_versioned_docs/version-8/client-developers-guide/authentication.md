# Authentication

Authentication in the context of an Ed-Fi API is essentially the process of
credential exchange and verification to establish that a client is allowed to
access the platform. Authentication in an Ed-Fi API is handled using two-legged
[OAuth 2.0](https://tools.ietf.org/html/rfc6749) [Client Credentials Grant
Flow](https://tools.ietf.org/html/rfc6749#section-4.4).

Before accessing the resources in an Ed-Fi API platform, client applications
need to obtain an access token from the Configuration Service. This access
token is validated on every call made to the API as a representation of the
client's application key and secret. This document briefly outlines the steps
involved.

:::info

In Ed-Fi API v8, OAuth tokens are issued by the **Configuration Service**
(default port 8081) at its `/connect/token` endpoint. For compatibility, the
Ed-Fi API also exposes an `/oauth/token` endpoint that forwards token requests
to the Configuration Service, so existing clients calling `/oauth/token`
continue to work. New clients should call the Configuration Service's
`/connect/token` endpoint directly.

:::

## Authentication Step-by-Step

The steps below walk you through the process that a client uses to supply
credentials and receive a token. These steps are generally the same whether you
use a command-line tool like cURL or whether you bake the steps into your client
application. Most programming languages, including C# and Java, provide objects
that handle these steps for you, but it's worth understanding what the steps
are.

:::info

Throughout this section, we will be using a command-line tool called cURL. It
is used to transfer information between systems using a variety of protocols
(including HTTP and HTTPS). For our purposes, it serves as a concise shorthand
for the HTTP information included to make the various calls to the Ed-Fi API.
Compiled executables for a variety of platforms can be downloaded from the
[cURL website](https://curl.se/download.html).

:::

### Step 1. Obtain an Access Token

POST to the Configuration Service's `/connect/token` endpoint with the
`grant_type` set to `client_credentials` and the `client_id` and
`client_secret` in the request body as `application/x-www-form-urlencoded`
parameters. This follows the [OAuth 2.0 Client Credentials Grant
Flow](https://tools.ietf.org/html/rfc6749#section-4.4).

For example, if the client key is `RvcohKz9zHI4` and the client secret is
`E1iEFusaNf81xzCxwHfbolkC`:

#### PowerShell Token Request

```powershell
$key = "RvcohKz9zHI4"
$secret = "E1iEFusaNf81xzCxwHfbolkC"
$token = Invoke-RestMethod -Method Post -Uri "http://localhost:8081/connect/token" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    "grant_type"    = "client_credentials"
    "client_id"     = $key
    "client_secret" = $secret
  }
```

#### cURL Token Request

```bash
curl -X POST http://localhost:8081/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=RvcohKz9zHI4&client_secret=E1iEFusaNf81xzCxwHfbolkC"
```

The above should return an access token.

The snippet below shows an example response with an access token. You will get
a different access token.

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSdmNvaEt6OXpISTQiLCJqdGkiOiJhMWIyYzNkNC01ZTZmLTc4OTAiLCJzY29wZSI6IkVkLUZpIFNhbmRib3giLCJpYXQiOjE3MTc1MDAwMDAsImV4cCI6MTcxNzUwMTgwMH0.PZ3m9M8qG0m6X8m2Vx0oJt7t3nZ9c1kq2Yb4wE6rT8s",
    "expires_in": 1800,
    "token_type": "Bearer"
}
```

In the OAuth2 Client Credentials Grant Flow, the host issues an access token
and the amount of time in seconds until the token expires. The token will
expire at the end of that allotted time and a new token will have to be
obtained.

### Step 2. Use the Access Token

On subsequent API requests, include the access token in an HTTP Authorization
header as "Bearer XYZ" where "XYZ" is the access token.

The following example uses the Authorization token to retrieve schools from the
Ed-Fi API. Replace the `Bearer` value with the access token returned in the
previous step.

#### API Call with Token with PowerShell

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/data/ed-fi/schools" `
  -Headers @{ "Authorization" = "Bearer $($token.access_token)" }
```

#### API Call with Token with cURL

```bash
curl http://localhost:8080/api/data/ed-fi/schools -H "Authorization: Bearer R3PLAC3_W1TH_ACC3SS_TOK3N"
```

As another example, the following call retrieves discipline incidents. Don't
forget to replace the `Bearer` value.

#### Another API Call with Token with PowerShell

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/data/ed-fi/disciplineIncidents" `
  -Headers @{ "Authorization" = "Bearer $($token.access_token)" }
```

#### Another API Call with Token with cURL

```bash
curl http://localhost:8080/api/data/ed-fi/disciplineIncidents -H "Authorization: Bearer R3PLAC3_W1TH_ACC3SS_TOK3N"
```

You can explore the whole API surface in this manner, but there are easier
ways. See the section called [Using the Online
Documentation](./using-the-online-documentation.md) for more information.

The next section, [Authorization](./authorization.md), has more details about
using the access token.
