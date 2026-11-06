---
sidebar_position: 3
---

# Identity Provider Configuration

Ed-Fi API v8 supports two identity providers for OAuth 2.0 authentication:

- **Self-contained** (default) — uses [OpenIddict](https://openiddict.com/)
  embedded in the Configuration Service. No external dependency required.
- **Keycloak** — delegates authentication to an external Keycloak instance.
  Suitable for environments that require enterprise identity management or SSO.

The Configuration Service selects and hosts the identity provider. The Ed-Fi API
validates tokens by pointing its `JwtAuthentication` settings at the same
authority and metadata endpoints. Both services must be configured consistently.

## Self-Contained (OpenIddict)

The self-contained provider is the default and recommended option for most
deployments. OpenIddict runs inside the Configuration Service and manages client
credentials, token issuance, and OIDC metadata.

**Token endpoint:** `http://{config-service-host}:{port}/connect/token`

### Configuration Service settings

```json
"AppSettings": {
  "IdentityProvider": "self-contained"
},
"IdentitySettings": {
  "Authority": "http://ed-fi-api-config:8081",
  "EncryptionKey": "<encryption-key>"
}
```

`IdentitySettings:EncryptionKey` is the passphrase that protects the signing
key stored in the Configuration Service database. It must match the key used
when the signing key was created. The Configuration Service doesn't check its
length or format, but it can't issue tokens while the value is empty.

`IdentitySettings:Authority` is the issuer URL. The Configuration Service
builds every endpoint URL it advertises in its OIDC metadata from `Authority`
plus `AppSettings:PathBase`. Don't include the PathBase segment in
`Authority`; otherwise the advertised URLs contain it twice.

### Ed-Fi API settings

```json
"JwtAuthentication": {
  "Authority": "http://ed-fi-api-config:8081",
  "MetadataAddress": "http://ed-fi-api-config:8081/.well-known/openid-configuration",
  "RequireHttpsMetadata": false
}
```

`Authority` must equal the Configuration Service's `IdentitySettings:Authority`
exactly. `MetadataAddress` must be on the same origin as `Authority`, because
the advertised `jwks_uri` is built from `Authority` (see [Metadata and
Signing-Key Retrieval](#metadata-and-signing-key-retrieval)).

### Requested scopes

A token request can name scopes in its `scope` parameter. The self-contained
provider grants only scopes the client is registered with:

- With no `scope` (or an empty one), the token gets all of the client's
  registered scopes.
- If the client holds some of the requested scopes, the token gets only those.
- If the client holds none of them, the request fails with `400` and the OAuth
  error `invalid_scope`, and no token is issued.

The token response includes a `scope` member listing the granted scopes. If
no scopes are granted, the member is left out.

This also applies to the client credentials the Ed-Fi API itself uses to read
its configuration from the Configuration Service.
`ConfigurationServiceSettings:Scope` must name a scope that client holds, or
the Ed-Fi API can't get a token and can't read its configuration. See
[Configuration Details](./configuration-details.mdx).

### Clients that aren't API clients

A client that wasn't created as an API client through the Configuration
Service has no `dmscs.ApiClient` row. The self-contained provider accepts such a
client only if it's an administrative client:

- It holds the role named by `IdentitySettings:ConfigServiceRole`.
- It's registered with at least one scope, and every one of them is a
  Configuration Service admin scope.
- `IdentitySettings:ConfigServiceRole` and `IdentitySettings:ClientRole` are
  different roles. Names that differ only in case or width, such as
  `cms-client` and `CMS-Client`, count as the same, and then every client
  without an `ApiClient` row is refused, including the client the Ed-Fi API
  uses to read its configuration.

Clients registered through `/connect/register`, and the client the Docker
Compose scripts create for the Ed-Fi API, meet these conditions. Any other
client without an `ApiClient` row is refused at `/connect/token`,
`/connect/revoke` and `/connect/introspect` with `invalid_client`. Give it the
role and only admin scopes, or re-create it. With Keycloak, these rules don't
apply.

### Access token management

The self-contained provider stores every access token it issues. It limits how
many active tokens each client can hold, accepts revocation requests, and
deletes expired tokens in the background.

#### Token limits

`IdentitySettings:BearerTokenPerClientLimit` sets how many active access tokens
one client can hold; the default is `15`. An active token is one that has
neither expired nor been revoked. When a client already holds that many tokens,
its next token request is rejected with `429 Too Many Requests` (see [The 429
response](#the-429-response)).

The limit applies to every Ed-Fi API client. A client is exempt only when both
of the following are true:

- It has no `dmscs.ApiClient` row, so it was not created as an API client
  through the Configuration Service.
- It is registered with at least one scope, and every one of them is a
  Configuration Service admin scope: `edfi_admin_api/full_access`,
  `edfi_admin_api/readonly_access`, or
  `edfi_admin_api/authMetadata_readonly_access`. Only registered scopes count;
  the scopes a token request asks for don't select the exemption.

Clients registered through `/connect/register` meet both conditions,
because registration assigns `edfi_admin_api/full_access` and creates no
`ApiClient` row. The client the Ed-Fi API uses to read its own configuration is
exempt for the same reason. The Docker Compose scripts create it as
`CMSReadOnlyAccess`, with `edfi_admin_api/readonly_access` and no `ApiClient`
row.

A value below `1` (for example `-1`) turns the limit off for every client. In
Docker Compose, set `CONFIGURATION_SERVICE_IDENTITY_BEARER_TOKEN_PER_CLIENT_LIMIT`.

#### The 429 response

The Configuration Service's `/connect/token` and the Ed-Fi API's `/oauth/token`
both answer a token-limit rejection in the OAuth 2.0 error format, with `error`
set to `temporarily_unavailable` and an `error_description` that names the
limit. The Ed-Fi API rebuilds the message from the limit it reads in the
Configuration Service's answer and adds an `X-Correlation-ID` header:

```json
{
  "error": "temporarily_unavailable",
  "error_description": "Too many access tokens have been requested (limit is 15). Access tokens should be reused until they expire."
}
```

The [`/connect` rate limiter](#rate-limits-on-connect-endpoints) also answers
`429` with `temporarily_unavailable`, but its `error_description` is "The
number of allowed requests has been exceeded. Retry the request later." and it
sends a `Retry-After` header. A token-limit rejection sends no `Retry-After`
header, because the wait depends on when the client's tokens expire.

What a client should do about this response is covered in the [Client
Developers'
Guide](../../client-developers-guide/authentication.md#token-limits-and-revocation).
On the host side, a client that has lost track of its tokens, for example
after a crash loop that requested a new token on every start, has to wait for
them to expire. If that wait is a problem, resetting the client's credentials
revokes all of its tokens at once, but it also changes the client's secret.

#### Token revocation

`POST /connect/revoke` on the Configuration Service revokes a token. It is
advertised as `revocation_endpoint` in the OpenID configuration document. The
caller authenticates with its own `client_id` and `client_secret` and sends the
token in the `token` form field; [Token Revocation and
Introspection](#token-revocation-and-introspection) has the full contract.

A revoked token stops counting toward the limit immediately, and the
Configuration Service rejects it on its next request. The Ed-Fi API validates
tokens locally and keeps accepting a revoked token until it expires, so
revocation frees a limit slot but doesn't cut off access.

The Configuration Service also revokes all of a client's tokens on its own when
the client's credentials are reset (`PUT /v3/apiClients/{id}/reset-credential`),
when the client is deleted, and when an update sets its `isApproved` to
`false`.

#### Expired-token cleanup

The self-contained provider runs a background job that deletes expired access
tokens:

| Setting | Default | Docker Compose variable |
| --- | --- | --- |
| `IdentitySettings:TokenCleanup:Enabled` | `true` | `CONFIGURATION_SERVICE_IDENTITY_TOKEN_CLEANUP_ENABLED` |
| `IdentitySettings:TokenCleanup:IntervalMinutes` | `30` | `CONFIGURATION_SERVICE_IDENTITY_TOKEN_CLEANUP_INTERVAL_MINUTES` |

Leave cleanup on. Each token request counts the client's active tokens over the
token table, and expired tokens that haven't been deleted yet make that count
slower. Cleanup only removes tokens that have already stopped counting, so it
never changes a client's active-token count.

### Docker Compose

When using the provided startup scripts, pass no `-IdentityProvider` flag (or
pass `-IdentityProvider self-contained`) — self-contained is the default:

```powershell
./bootstrap-local-dms.ps1
```

The relevant `.env` variables:

```ini
CONFIGURATION_SERVICE_IDENTITY_PROVIDER=self-contained
SELF_CONTAINED_OAUTH_TOKEN_ENDPOINT=http://ed-fi-api-config:8081/connect/token
SELF_CONTAINED_DMS_JWT_AUTHORITY=http://ed-fi-api-config:8081
SELF_CONTAINED_DMS_JWT_METADATA_ADDRESS=http://ed-fi-api-config:8081/.well-known/openid-configuration
CONFIGURATION_SERVICE_IDENTITY_BEARER_TOKEN_PER_CLIENT_LIMIT=15
CONFIGURATION_SERVICE_IDENTITY_TOKEN_CLEANUP_ENABLED=true
CONFIGURATION_SERVICE_IDENTITY_TOKEN_CLEANUP_INTERVAL_MINUTES=30
```

:::note

`SELF_CONTAINED_OAUTH_TOKEN_ENDPOINT` is consumed by the Ed-Fi API **inside the
Docker network** to forward `/oauth/token` proxy requests. Use the container
hostname (`ed-fi-api-config`), not `localhost`.

:::

---

## Keycloak

Use Keycloak when your environment requires centralized identity management,
user federation, or single sign-on. Keycloak must be provisioned and configured
separately; the repository includes a local development Keycloak setup via
Docker Compose.

**Token endpoint:**
`http://{keycloak-host}:{port}/realms/edfi/protocol/openid-connect/token`

:::note

The [token limit](#token-limits) and [expired-token
cleanup](#expired-token-cleanup) apply only to the self-contained provider.
Keycloak manages its own tokens and sets their lifetimes in the realm's token
settings. Clients can still call the Configuration Service's
`POST /connect/revoke`; in Keycloak mode it forwards the request, with the
caller's credentials, to Keycloak's revocation endpoint
(`{keycloak}/realms/{realm}/protocol/openid-connect/revoke`). The Ed-Fi API and
the Configuration Service validate Keycloak tokens locally, so a revoked token
is still accepted until it expires. See [Token Revocation and
Introspection](#token-revocation-and-introspection) and the [Keycloak
documentation](https://www.keycloak.org/documentation).

:::

### Configuration Service settings

```json
"AppSettings": {
  "IdentityProvider": "keycloak"
},
"IdentitySettings": {
  "Authority": "http://dms-keycloak:8080/realms/edfi",
  "RequireHttpsMetadata": false
}
```

### Ed-Fi API settings

```json
"JwtAuthentication": {
  "Authority": "http://localhost:8045/realms/edfi",
  "MetadataAddress": "http://dms-keycloak:8080/realms/edfi/.well-known/openid-configuration",
  "RequireHttpsMetadata": false
}
```

`Authority` must exactly equal the `issuer` in Keycloak's metadata, which is
Keycloak's public URL (`http://localhost:8045/realms/edfi` locally).
`MetadataAddress` can use the internal Docker hostname.

If `Authority` doesn't match, the Ed-Fi API doesn't start. If it stops matching
later (for example after a Keycloak hostname change), every request gets `401`
until the metadata matches again, which is re-checked at most once per
`JwtAuthentication:RefreshIntervalMinutes`. Restart the Ed-Fi API to recover
immediately.

### Docker Compose

Pass `-IdentityProvider keycloak` to the startup script:

```powershell
./bootstrap-local-dms.ps1 -IdentityProvider keycloak
```

The relevant `.env` variables:

```ini
CONFIGURATION_SERVICE_IDENTITY_PROVIDER=keycloak
KEYCLOAK_OAUTH_TOKEN_ENDPOINT=http://dms-keycloak:8080/realms/edfi/protocol/openid-connect/token
KEYCLOAK_DMS_JWT_AUTHORITY=http://localhost:8045/realms/edfi
KEYCLOAK_DMS_JWT_METADATA_ADDRESS=http://dms-keycloak:8080/realms/edfi/.well-known/openid-configuration
KEYCLOAK_CONFIGURATION_SERVICE_IDENTITY_AUTHORITY=http://dms-keycloak:8080/realms/edfi
KEYCLOAK_PORT=8045
```

In Keycloak mode the two authorities differ. `KEYCLOAK_DMS_JWT_AUTHORITY` is
Keycloak's public issuer, which the Ed-Fi API requires to match exactly.
`KEYCLOAK_CONFIGURATION_SERVICE_IDENTITY_AUTHORITY` is the in-network URL the
Configuration Service calls. The startup scripts stop with an error if
`KEYCLOAK_CONFIGURATION_SERVICE_IDENTITY_AUTHORITY` is missing.

:::note

`KEYCLOAK_OAUTH_TOKEN_ENDPOINT` and
`KEYCLOAK_CONFIGURATION_SERVICE_IDENTITY_AUTHORITY` are used **inside the Docker
network**. Use the container hostname (`dms-keycloak:8080`), not
`localhost:8045`.

:::

See `eng/docker-compose/KEYCLOAK-SETUP.md` in the Ed-Fi API repository for
Keycloak realm and client configuration details.

---

## Metadata and Signing-Key Retrieval

`RequireHttpsMetadata` defaults to `true` in both services
(`JwtAuthentication:RequireHttpsMetadata` in the Ed-Fi API,
`IdentitySettings:RequireHttpsMetadata` in the Configuration Service). With
`true`, OIDC metadata and signing keys must be fetched over `https://`:

- The Ed-Fi API doesn't start when `JwtAuthentication:MetadataAddress` is an
  `http://` URL.
- In Keycloak mode, the Configuration Service fails its first authenticated
  request when Keycloak's metadata address is an `http://` URL. In
  self-contained mode the Configuration Service fetches no metadata, so the
  setting has no effect there.

The `http://` examples on this page include `"RequireHttpsMetadata": false`. Set
`false` only when the identity provider is reachable over a local or private
network, such as a container on the same Docker Compose network. The provided
Docker Compose files set it to `false` through `DMS_JWT_REQUIRE_HTTPS_METADATA`
and `CONFIGURATION_SERVICE_IDENTITY_REQUIRE_HTTPS`.

`JwtAuthentication:MetadataAddress` and the `jwks_uri` it advertises must be on
the same scheme, host, and port, and must not redirect; otherwise the Ed-Fi API
doesn't start.

---

## Token Revocation and Introspection

The Configuration Service provides two OAuth endpoints for managing tokens,
under either identity provider. In Keycloak mode, it forwards the request to
Keycloak with the caller's credentials.

- `POST /connect/revoke` revokes a token (RFC 7009).
- `POST /connect/introspect` reports whether a token is active (RFC 7662).

Both endpoints require the caller's own `client_id` and `client_secret` (HTTP
Basic or form fields, not both), with the token in the `token` form field. A
bearer token is not accepted as authentication. Failed authentication returns
the OAuth error `invalid_client`, with HTTP `401` and a `WWW-Authenticate`
header when the credentials were sent as HTTP Basic, or `400` when they were
sent as form fields.

A client can only revoke or inspect its own tokens:

- Revoking another client's token has no effect but still returns `200 OK`;
  check with `/connect/introspect` as the token's owner.
- Introspection describes a valid token only to the client it was issued to.
  Every other token (another client's, unknown, expired, or revoked) gets
  `200 OK` with `{"active": false}`.

## Rate Limits on `/connect` Endpoints

The Configuration Service rate limits `POST /connect/token`, `/connect/revoke`,
`/connect/register`, and `/connect/introspect` to slow down secret guessing.
No other endpoint is limited. Two budgets apply, and a request must fit both:

- **Per source address**, across all four endpoints.
- **Per source address and `client_id`**, for token, revocation, and
  authenticated introspection requests.

| Setting | Default | Docker Compose variable | Description |
| --- | --- | --- | --- |
| `ConnectRateLimit:Enabled` | `true` | `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_ENABLED` | `false` turns off all `/connect` rate limiting |
| `ConnectRateLimit:SourcePermitLimit` | `120` | `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_SOURCE_PERMIT_LIMIT` | Requests per source address in each window |
| `ConnectRateLimit:ClientPermitLimit` | `30` | `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_CLIENT_PERMIT_LIMIT` | Requests per source address and `client_id` in each window |
| `ConnectRateLimit:WindowSeconds` | `60` | `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_WINDOW_SECONDS` | Length of the fixed window, in seconds |
| `ConnectRateLimit:RequiredProxyAddress` | empty | Set by the `dms-cms-proxy.yml` Docker Compose overlay | When set and limiting is enabled, the Configuration Service reports a configuration error and answers every request with `500` unless `AppSettings:ReverseProxy:UseForwardedHeaders` is `true` and this address is listed in `AppSettings:ReverseProxy:KnownProxies`. Leave empty for direct deployments |

When limiting is enabled, the three limits must be greater than zero.
Otherwise the Configuration Service reports a configuration error and answers
every request with `500` until it is corrected.

A rejected request gets `429 Too Many Requests` with a `Retry-After` header.
Token, revocation, and introspection requests get the OAuth error
`temporarily_unavailable`.

Limits are counted per Configuration Service process, so with several replicas
a caller can make up to replicas × limit requests in each window.

:::warning

The Ed-Fi API's `/oauth/token` endpoint forwards token requests to the
Configuration Service. Unless the Configuration Service trusts the Ed-Fi API
as a proxy, every forwarded request shares the Ed-Fi API's source budget, and
one caller can block token requests for all clients. Turn on
`AppSettings:ReverseProxy:UseForwardedHeaders` in the Configuration Service and
list the Ed-Fi API's addresses in `AppSettings:ReverseProxy:KnownProxies` (see
[Configuration Details](./configuration-details.mdx)). Set
`ConnectRateLimit:RequiredProxyAddress` so a missing trust setting is reported
as a configuration error instead of going unnoticed. When the Docker Compose
launchers start the Ed-Fi API and Configuration Service together, they add the
`dms-cms-proxy.yml` overlay, which sets all three settings.

:::

---

## Switching Identity Providers

Switching from one provider to another after initial setup requires
re-provisioning the identity state:

1. Stop all services and remove volumes, passing your current identity provider
   so its named volume is included in the teardown. For example, when switching
   away from Keycloak: `./bootstrap-local-dms.ps1 -d -v -IdentityProvider
   keycloak`
2. Update the `.env` file with the new identity provider settings
3. Start fresh: `./bootstrap-local-dms.ps1 -IdentityProvider <provider>`

:::warning

Changing the identity provider without resetting volumes will leave stale
OpenIddict tables in the Configuration Service database, causing startup
failures.

:::
