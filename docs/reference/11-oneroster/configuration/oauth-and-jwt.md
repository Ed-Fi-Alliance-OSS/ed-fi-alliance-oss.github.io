# OAuth and JWT

The OneRoster service requires every request to
`/ims/oneroster/rostering/v1p2/*` to present a valid OAuth 2.0 bearer
token. The service does not issue tokens itself — it validates tokens
issued by an external OAuth 2.0 authorization server, typically the Ed-Fi
ODS/API's built-in OAuth endpoints.

This page covers:

- How the service locates and validates JWTs (JWKS vs PEM modes)
- What claims it inspects (`iss`, `aud`, scope)
- The three OneRoster 1.2 scopes it recognizes
- How OneRoster clients are wired on the Ed-Fi ODS/API side

For the variable list, see [Environment
variables](./environment-variables.md).

## Token validation modes

The service supports two verification modes and picks between them at
startup based on whether `OAUTH2_PUBLIC_KEY_PEM` is set.

### JWKS mode (default)

If `OAUTH2_PUBLIC_KEY_PEM` is empty, the service uses
[`express-oauth2-jwt-bearer`](https://www.npmjs.com/package/express-oauth2-jwt-bearer)
to fetch the authorization server's JWKS from
`{OAUTH2_ISSUERBASEURL}/.well-known/jwks.json` and verify JWTs against it.

Required variables:

- `OAUTH2_ISSUERBASEURL` — base URL of the authorization server (for
  example, your Ed-Fi ODS/API's OAuth endpoint)
- `OAUTH2_AUDIENCE` — the expected `aud` claim
- `OAUTH2_TOKENSIGNINGALG` — typically `RS256`

The JWKS is fetched and cached automatically; no additional configuration
is required for key rotation beyond what the authorization server already
supports.

### PEM mode

If `OAUTH2_PUBLIC_KEY_PEM` is set, the service uses the
[`jose`](https://github.com/panva/jose) library to verify JWT signatures
against the PEM-encoded public key directly. JWKS discovery is not
attempted.

Required variables (same as JWKS mode), plus:

- `OAUTH2_PUBLIC_KEY_PEM` — the PEM public key, on a single line, with
  `\n` between lines and including the `-----BEGIN/END PUBLIC KEY-----`
  markers

Example:

```env
OAUTH2_PUBLIC_KEY_PEM=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...\n-----END PUBLIC KEY-----
```

PEM mode is useful when:

- The authorization server does not expose a JWKS endpoint
- You want a static, air-gapped key bundle distributed with the
  deployment
- You are bridging to a non-Ed-Fi IdP that publishes PEM-formatted keys

The public key is imported on first use and cached for subsequent
verifications.

:::note

If both modes appear configured (`OAUTH2_PUBLIC_KEY_PEM` set), PEM mode
wins and JWKS is not consulted.

:::

## Claims inspected

For every request to `/ims/oneroster/rostering/v1p2/*` the service
validates:

| Claim | Source |
|---|---|
| Signature | JWKS key or `OAUTH2_PUBLIC_KEY_PEM` |
| `iss` | Must match `OAUTH2_ISSUERBASEURL` |
| `aud` | Must match `OAUTH2_AUDIENCE` |
| `exp` | Must not be in the past |

Tokens that fail any check return HTTP 401 with an IMS-formatted error:

```json
{
  "imsx_codeMajor": "failure",
  "imsx_severity": "error",
  "imsx_description": "Authentication failed: Invalid or missing token."
}
```

## OneRoster 1.2 scopes

Tokens must present at least one of the following scopes (space- or
comma-separated in the `scope` claim, per OAuth 2.0 conventions):

| Scope | Grants read access to |
|---|---|
| `roster-core.readonly` | `academicSessions`, `classes`, `courses`, `enrollments`, `orgs`, `schools`, `terms`, `gradingPeriods`, and the non-demographic fields of `users`, `students`, and `teachers` |
| `roster-demographics.readonly` | The `/demographics` endpoint |
| `roster.readonly` | All of the above — equivalent to both `roster-core.readonly` and `roster-demographics.readonly` |

These are the standard OneRoster 1.2 rostering scopes defined in the
[1EdTech OneRoster 1.2 REST
specification](https://www.imsglobal.org/sites/default/files/spec/oneroster/v1p2/rostering-restbinding/OneRosterv1p2RosteringService_RESTBindv1p0.html#OpenAPI_Security).

Vendor applications should request the minimum scope their use case
requires — `roster-core.readonly` is the correct default unless the app
needs to read `/demographics`.

## Integration with the Ed-Fi ODS/API

Version 7.3 of the Ed-Fi ODS/API includes a `FeatureManagement:OneRoster`
setting and supporting claim-set configuration that together enable the
ODS/API's built-in OAuth endpoint to issue tokens bearing the OneRoster
scopes above. The ODS/API's token endpoint becomes the
`OAUTH2_ISSUERBASEURL` the OneRoster service points at; the Ed-Fi Web API
signs the JWTs, and the OneRoster service validates them via JWKS.

For the ODS/API-side configuration (enabling the feature, creating
OneRoster claim-set entries, issuing keys and secrets to vendor apps), see
the ODS/API 7.3 platform developer guide's [Features
reference](/reference/ods-api/platform-dev-guide/features/).

:::note

**Open question — claim-set wiring.** Whether the OneRoster scopes are
granted automatically to claim sets when
`FeatureManagement:OneRoster = true`, or whether an operator must
manually edit `ClaimSet` / `ResourceClaim` rows, is defined on the
ODS/API side and should be cross-referenced with the ODS/API 7.3
integration how-to. This page will be updated to include a direct pointer
once that documentation is live.

:::

## Issuing tokens outside of the ODS/API

The OneRoster service only validates JWTs — it will accept tokens from
any OAuth 2.0 authorization server that:

1. Signs with `OAUTH2_TOKENSIGNINGALG` (default `RS256`),
2. Places `{OAUTH2_ISSUERBASEURL}` in the `iss` claim,
3. Places `{OAUTH2_AUDIENCE}` in the `aud` claim, and
4. Includes one of the three OneRoster 1.2 scopes.

This makes it straightforward to bridge to Auth0, Keycloak, Azure AD, or
any other OIDC-compatible IdP for deployments that prefer a dedicated
identity provider for OneRoster clients.

## Quick verification

Once the service is running and an issuer is configured, obtain a token
from the issuer and call the service:

```bash
# Replace <issuer-token-endpoint>, <client_id>, <client_secret>
curl -X POST <issuer-token-endpoint> \
  -d "grant_type=client_credentials" \
  -d "client_id=<client_id>" \
  -d "client_secret=<client_secret>" \
  -d "scope=roster-core.readonly" \
  -d "audience=<OAUTH2_AUDIENCE>"

# Then:
curl -i http://localhost:3000/ims/oneroster/rostering/v1p2/orgs \
  -H "Authorization: Bearer <access_token>"
```

401 responses with an `imsx_description` of "Authentication failed" on
valid-looking requests usually indicate an `iss` / `aud` mismatch or a
missing OneRoster scope; check the decoded token at
[jwt.io](https://jwt.io) against the values in `.env`.
