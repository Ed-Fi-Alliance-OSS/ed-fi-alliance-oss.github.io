# Authentication

Authentication in the context of an Ed-Fi API is essentially the process of
credential exchange and verification to establish that a client is allowed to
access the platform. Authentication in an Ed-Fi API is handled using two-legged
[OAuth 2.0](https://tools.ietf.org/html/rfc6749) [Client Credentials Grant
Flow](https://tools.ietf.org/html/rfc6749#section-4.4).

Before accessing the resources in an Ed-Fi API platform, client applications
need to obtain an access token. This access token is validated on every call
made to the API as a representation of the client's application key and secret.
This document briefly outlines the steps involved.

:::info

Request tokens from the token URL your API host gives you. If you don't have
one, request the API's discovery document at your full base URL (including any
tenant and route qualifier segments) and use its `oauth` URL, typically
`{base}/oauth/token`. Some hosts also expose the Configuration Service's
`/connect/token` endpoint, which issues the tokens behind the scenes. The Ed-Fi
API accepts tokens from either endpoint.

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

POST to the token endpoint with the `grant_type` set to `client_credentials`
and the `client_id` and `client_secret` in the request body as
`application/x-www-form-urlencoded` parameters. This follows the [OAuth 2.0
Client Credentials Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.4).
The examples below use the Ed-Fi API's `/oauth/token` endpoint on a
deployment at `http://localhost:8080/api`; substitute your host's token URL.

For example, if the client key is `RvcohKz9zHI4` and the client secret is
`E1iEFusaNf81xzCxwHfbolkC`:

#### PowerShell Token Request

```powershell
$key = "RvcohKz9zHI4"
$secret = "E1iEFusaNf81xzCxwHfbolkC"
$token = Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/oauth/token" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    "grant_type"    = "client_credentials"
    "client_id"     = $key
    "client_secret" = $secret
  }
```

#### cURL Token Request

```bash
curl -X POST http://localhost:8080/api/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=RvcohKz9zHI4&client_secret=E1iEFusaNf81xzCxwHfbolkC"
```

You can send the key and secret as HTTP Basic credentials instead of body
parameters; both endpoints accept them. Don't send credentials both ways in one
request: the Ed-Fi API's `/oauth/token` rejects that with `400`
`invalid_request`, and `/connect/token` uses the Basic credentials. The Ed-Fi
API's `/oauth/token` also accepts the body parameters as JSON
(`application/json`).

#### cURL Token Request with HTTP Basic Credentials

```bash
curl -X POST http://localhost:8080/api/oauth/token \
  -u "RvcohKz9zHI4:E1iEFusaNf81xzCxwHfbolkC" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials"
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
obtained. The default lifetime is 1800 seconds (30 minutes), but hosts can
change it, so rely on `expires_in` rather than a fixed value. When the client
has been granted scopes, the response also includes a `scope` value.

:::warning

Reuse each access token until it expires. Hosts using the self-contained
identity provider limit how many active tokens a client can hold (15 by
default). Once a client reaches the limit, token requests fail with HTTP 429
until existing tokens expire or are revoked. See [Token Limits and
Revocation](#token-limits-and-revocation).

:::

Token request failures use the OAuth error format: read the `error` and
`error_description` fields at the root of the JSON response. A `401` response
from the Ed-Fi API's `/oauth/token` also carries a `WWW-Authenticate: Basic`
header.

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

## Token Limits and Revocation

Hosts that use the self-contained identity provider limit how many active
access tokens one client can hold: 15 by default, counting tokens that have
neither expired nor been revoked. Hosts can raise the limit or turn it off, and
it doesn't apply on hosts that use Keycloak, but a client can't tell which
applies, so design for the limit. See [Identity Provider
Configuration](../platform-dev-guide/configuration/identity-provider.md#access-token-management)
for the host side.

### Reuse Tokens Until They Expire

Request a token once, cache it, and send it with every request until it
expires. Use `expires_in` from the token response to decide when to request the
next one, and request a new one when the API answers `401`. Share one token
across the threads or workers of a process rather than requesting one per
request or per worker.

### Handle the 429 Response

When a client already holds its maximum number of active tokens, the token
endpoint answers `429 Too Many Requests` in the OAuth error format:

```text
HTTP/1.1 429 Too Many Requests
Content-Type: application/json; charset=utf-8

{
  "error": "temporarily_unavailable",
  "error_description": "Too many access tokens have been requested (limit is 15). Access tokens should be reused until they expire."
}
```

Request rate limiting also answers `429` with the same `error`, but its
`error_description` is "The number of allowed requests has been exceeded. Retry
the request later." Read `error_description` to tell the two apart.

A token-limit rejection means the client already holds all the tokens it is
allowed, and those tokens keep working:

- If the application still has one of them, keep using it.
- If the tokens are lost, for example after a crash loop or a restart that
  requested a new token each time, there is no way to get them back. Wait for
  them to expire (30 minutes by default) and retry with a backoff, not in a
  tight loop. Each rejected request still counts against rate limiting.
- Revoke any tokens the client still holds but no longer needs (see below).
- If this happens often, fix the client's token caching rather than asking the
  host to raise the limit.

### Revoke Tokens You No Longer Need

A revoked token stops counting toward the limit immediately. Revoke a token
when your application finishes a run or shuts down cleanly and won't use the
token again. Revocation frees a slot under the limit; it doesn't cut off
access, because the Ed-Fi API keeps accepting a revoked token until it expires.

Revocation uses the Configuration Service's `POST /connect/revoke` endpoint,
not the Ed-Fi API's base URL. Ask your host for the URL, or for the URL of the
identity provider's OpenID configuration document, which lists it as
`revocation_endpoint`. Authenticate with your own
client ID and secret, as HTTP Basic credentials or as `client_id` and
`client_secret` form fields (not both), and send the token in the `token`
field. The examples use a Configuration Service at `http://localhost:8081`.

#### PowerShell Revocation Request

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:8081/connect/revoke" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    "client_id"     = $key
    "client_secret" = $secret
    "token"         = $token.access_token
  }
```

#### cURL Revocation Request

```bash
curl -X POST http://localhost:8081/connect/revoke \
  -u "RvcohKz9zHI4:E1iEFusaNf81xzCxwHfbolkC" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=R3PLAC3_W1TH_ACC3SS_TOK3N"
```

A successful revocation returns `200 OK` with an empty body. The response is
`200` even when the token is unknown, already revoked, or belongs to another
client; a client can revoke only its own tokens. Wrong credentials get the
OAuth error `invalid_client`, with HTTP `401` and a `WWW-Authenticate` header
when they were sent as HTTP Basic, or `400` when they were sent as form fields.
On hosts that use Keycloak, the same endpoint forwards the revocation to
Keycloak.

The next section, [Authorization](./authorization.md), has more details about
using the access token.
