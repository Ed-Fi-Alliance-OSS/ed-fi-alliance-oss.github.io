# OAuth and JWT

The OneRoster® service requires every request to
`/ims/oneroster/rostering/v1p2/*` to present a valid OAuth 2.0 bearer
token. The service does not issue tokens. It validates tokens issued
by an external OAuth 2.0 authorization server, typically the Ed-Fi
ODS / API's built-in OAuth endpoints.

For the variable list, see [Environment
variables](./environment-variables.md).

## Token validation modes

The service supports two verification modes and picks between them at
startup based on whether `OAUTH2_PUBLIC_KEY_PEM` is set.

### JWKS mode (default)

If `OAUTH2_PUBLIC_KEY_PEM` is empty, the service uses
[`express-oauth2-jwt-bearer`](https://www.npmjs.com/package/express-oauth2-jwt-bearer)
to fetch the authorization server's JWKS from
`{OAUTH2_ISSUERBASEURL}/.well-known/jwks.json` and verify JWTs against
it.

Required variables:

- `OAUTH2_ISSUERBASEURL`. Base URL of the authorization server (for
  example, your Ed-Fi ODS / API's OAuth endpoint).
- `OAUTH2_AUDIENCE`. The expected `aud` claim.
- `OAUTH2_TOKENSIGNINGALG`. Typically `RS256`.

The JWKS is fetched and cached automatically. No additional
configuration is required for key rotation beyond what the
authorization server already supports.

### PEM mode

If `OAUTH2_PUBLIC_KEY_PEM` is set, the service uses the
[`jose`](https://github.com/panva/jose) library to verify JWT
signatures against the PEM-encoded public key directly. JWKS discovery
is not attempted.

Required variables (same as JWKS mode), plus:

- `OAUTH2_PUBLIC_KEY_PEM`. The PEM public key on a single line, with
  `\n` between lines and including the `-----BEGIN/END PUBLIC KEY-----`
  markers.

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

If both modes appear configured (`OAUTH2_PUBLIC_KEY_PEM` is set), PEM
mode wins and JWKS is not consulted.

:::

## Claims inspected

For every request to `/ims/oneroster/rostering/v1p2/*` the service
validates:

| Claim | Source |
| --- | --- |
| Signature | JWKS key or `OAUTH2_PUBLIC_KEY_PEM` |
| `iss` | Must match `OAUTH2_ISSUERBASEURL` |
| `aud` | Must match `OAUTH2_AUDIENCE` |
| `exp` | Must not be in the past |

Tokens that fail any check return HTTP 401 with an IMS-formatted
error:

```json
{
  "imsx_codeMajor": "failure",
  "imsx_severity": "error",
  "imsx_description": "Authentication failed: Invalid or missing token."
}
```

## JWT claims used for ODS resolution

In addition to the standard OAuth claims above, the service reads
Ed-Fi-specific claims from the token payload to determine which ODS
database to query for the request. These claims are issued by the
Ed-Fi ODS / API as part of its OneRoster token endpoint.

| Claim | Type | Purpose |
| --- | --- | --- |
| `odsInstanceId` | integer | Identifies the authorized ODS instance for the caller. The service uses this ID to look up the ODS connection string in `EdFi_Admin.OdsInstances`. Required on all data-plane requests; missing values return HTTP 403. |
| `odsInstances` | JSON string | Optional. When the caller is authorized for multiple ODS instances (for example, different school years in a single-tenant-with-context deployment), carries the full list. Shape: `{"OdsInstances":[{"OdsInstanceId":1,"OdsInstanceContext":{"ContextKey":"schoolYearFromRoute","ContextValue":"2026"}}, ...]}`. |
| `tenantId` | string | Required when the service is running with `MULTITENANCY_ENABLED=true`. Must match the `:tenantId` segment in the request URL (case-insensitive). A mismatch returns HTTP 401; an unknown tenant returns HTTP 404. |

The service also reads the alternate spellings `ods_instance_id` and
`OdsInstanceId` for `odsInstanceId`, for compatibility with
non-Ed-Fi issuers.

### How routing is resolved

The service supports four flows, chosen by whether multi-tenancy and
ODS context routing are enabled. ODS context routing is configured
via [`ODS_CONTEXT_ROUTE_TEMPLATE`](./environment-variables.md#ods-context-routing-optional).

| Flow | `MULTITENANCY_ENABLED` | `ODS_CONTEXT_ROUTE_TEMPLATE` | Route shape | ODS chosen by |
| --- | --- | --- | --- | --- |
| Single-tenant | `false` | _(empty)_ | `/ims/oneroster/...` | `odsInstanceId` from JWT |
| Single-tenant with context | `false` | set | `/{contextValue}/ims/oneroster/...` | Entry in `odsInstances` whose `OdsInstanceContext` matches the route's context parameter and value |
| Multi-tenant | `true` | _(empty)_ | `/{tenantId}/ims/oneroster/...` | `odsInstanceId` from JWT, against the tenant's admin DB |
| Multi-tenant with context | `true` | set | `/{tenantId}/{contextValue}/ims/oneroster/...` | Matching `odsInstances` entry, against the tenant's admin DB |

In all four flows:

- The ODS connection string is read from `EdFi_Admin.OdsInstances` by
  ID and decrypted with
  [`ODS_CONNECTION_STRING_ENCRYPTION_KEY`](./environment-variables.md#admin-database-single-tenant-default).
- In multi-tenant mode, the admin database is selected from
  [`TENANTS_CONNECTION_CONFIG`](./environment-variables.md#multi-tenant-mode)
  by `tenantId`. In single-tenant mode, the admin database is the one
  named in `CONNECTION_CONFIG`.

### Example token payloads

**Single-tenant, single ODS:**

```json
{
  "iss": "https://api.example.org/oauth",
  "aud": "https://oneroster.example.org",
  "scope": "roster-core.readonly",
  "odsInstanceId": 1
}
```

**Single-tenant with context (school year routing):**

```json
{
  "iss": "https://api.example.org/oauth",
  "aud": "https://oneroster.example.org",
  "scope": "roster-core.readonly",
  "odsInstances": "{\"OdsInstances\":[{\"OdsInstanceId\":1,\"OdsInstanceContext\":{\"ContextKey\":\"schoolYearFromRoute\",\"ContextValue\":\"2026\"}},{\"OdsInstanceId\":2,\"OdsInstanceContext\":{\"ContextKey\":\"schoolYearFromRoute\",\"ContextValue\":\"2027\"}}]}"
}
```

**Multi-tenant:**

```json
{
  "iss": "https://api.example.org/oauth",
  "aud": "https://oneroster.example.org",
  "scope": "roster-core.readonly",
  "tenantId": "Tenant1",
  "odsInstanceId": 1
}
```

## OneRoster v1.2 scopes

Tokens must present at least one of the following scopes (space- or
comma-separated in the `scope` claim, per OAuth 2.0 conventions):

| Scope | Grants read access to |
| --- | --- |
| `roster-core.readonly` | `academicSessions`, `classes`, `courses`, `enrollments`, `orgs`, `schools`, `terms`, `gradingPeriods`, and the non-demographic fields of `users`, `students`, and `teachers` |
| `roster-demographics.readonly` | The `/demographics` endpoint |
| `roster.readonly` | All of the above. Equivalent to both `roster-core.readonly` and `roster-demographics.readonly`. |

These are the standard OneRoster v1.2 rostering scopes defined in the
[1EdTech® OneRoster v1.2 REST
specification](https://www.imsglobal.org/sites/default/files/spec/oneroster/v1p2/rostering-restbinding/OneRosterv1p2RosteringService_RESTBindv1p0.html#OpenAPI_Security).

Vendor applications should request the minimum scope their use case
requires. `roster-core.readonly` is the correct default unless the app
needs to read `/demographics`.

## Integration with the Ed-Fi ODS / API

Version 7.3 of the Ed-Fi ODS / API includes a
`FeatureManagement:OneRoster` setting and supporting claim-set
configuration that enable the ODS / API's built-in OAuth endpoint to
issue tokens bearing the OneRoster scopes above. The ODS / API's
token endpoint becomes the `OAUTH2_ISSUERBASEURL` the OneRoster
service points at. The Ed-Fi Web API signs the JWTs and populates the
Ed-Fi-specific claims (`odsInstanceId`, `odsInstances`, and `tenantId`
when applicable); the OneRoster service validates them via JWKS and
uses them to resolve the correct ODS.

The ODS API's `ApiSettings:OdsConnectionStringEncryptionKey` is the
same key the OneRoster service expects as
[`ODS_CONNECTION_STRING_ENCRYPTION_KEY`](./environment-variables.md#admin-database-single-tenant-default).
The two must match; otherwise the service cannot decrypt the ODS
connection strings it reads from `EdFi_Admin.OdsInstances`.

For the ODS / API-side configuration (enabling the feature, creating
OneRoster claim-set entries, issuing keys and secrets to vendor
apps), see the [Features
reference](/reference/ods-api/platform-dev-guide/features/) in the
ODS / API v7.3 platform developer guide.

## Issuing tokens outside of the ODS / API

The OneRoster service only validates JWTs. It will accept tokens from
any OAuth 2.0 authorization server that:

1. Signs with `OAUTH2_TOKENSIGNINGALG` (default `RS256`).
2. Places `{OAUTH2_ISSUERBASEURL}` in the `iss` claim.
3. Places `{OAUTH2_AUDIENCE}` in the `aud` claim.
4. Includes one of the three OneRoster v1.2 scopes.
5. Includes `odsInstanceId` (or `odsInstances` for context-routed
   deployments) identifying the ODS instance the caller is authorized
   for, plus `tenantId` in multi-tenant mode. See [JWT claims used for
   ODS resolution](#jwt-claims-used-for-ods-resolution) above.

This enables bridging to Auth0, Keycloak, Azure AD, or any other
OIDC-compatible identity provider for deployments that prefer a
dedicated identity provider for OneRoster clients, provided the issuer
can be configured to emit the Ed-Fi-specific claims.

## Quick verification

Once the service is running and an issuer is configured, obtain a
token from the issuer and call the service:

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

A 401 response with `"imsx_description": "Authentication failed"` on a
valid-looking request usually indicates an `iss` or `aud` mismatch or
a missing OneRoster scope. Check the decoded token at
[jwt.io](https://jwt.io) against the values in `.env`.
