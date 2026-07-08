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
  "EncryptionKey": "<32-character-ASCII-key>"
}
```

### Ed-Fi API settings

```json
"JwtAuthentication": {
  "Authority": "http://ed-fi-api-config:8081",
  "MetadataAddress": "http://ed-fi-api-config:8081/.well-known/openid-configuration"
}
```

### Docker Compose

When using the provided startup scripts, pass no `-IdentityProvider` flag (or
pass `-IdentityProvider self-contained`) — self-contained is the default:

```powershell
./start-local-dms.ps1
```

The relevant `.env` variables:

```ini
DMS_CONFIG_IDENTITY_PROVIDER=self-contained
SELF_CONTAINED_OAUTH_TOKEN_ENDPOINT=http://localhost:8081/connect/token
SELF_CONTAINED_DMS_JWT_AUTHORITY=http://ed-fi-api-config:8081
SELF_CONTAINED_DMS_JWT_METADATA_ADDRESS=http://ed-fi-api-config:8081/.well-known/openid-configuration
```

---

## Keycloak

Use Keycloak when your environment requires centralized identity management,
user federation, or single sign-on. Keycloak must be provisioned and configured
separately; the repository includes a local development Keycloak setup via
Docker Compose.

**Token endpoint:**
`http://{keycloak-host}:{port}/realms/edfi/protocol/openid-connect/token`

### Configuration Service settings

```json
"AppSettings": {
  "IdentityProvider": "keycloak"
},
"IdentitySettings": {
  "Authority": "http://dms-keycloak:8080/realms/edfi"
}
```

### Ed-Fi API settings

```json
"JwtAuthentication": {
  "Authority": "http://dms-keycloak:8080/realms/edfi",
  "MetadataAddress": "http://dms-keycloak:8080/realms/edfi/.well-known/openid-configuration"
}
```

### Docker Compose

Pass `-IdentityProvider keycloak` to the startup script:

```powershell
./start-local-dms.ps1 -IdentityProvider keycloak
```

The relevant `.env` variables:

```ini
DMS_CONFIG_IDENTITY_PROVIDER=keycloak
KEYCLOAK_OAUTH_TOKEN_ENDPOINT=http://localhost:8045/realms/edfi/protocol/openid-connect/token
KEYCLOAK_DMS_JWT_AUTHORITY=http://dms-keycloak:8080/realms/edfi
KEYCLOAK_DMS_JWT_METADATA_ADDRESS=http://dms-keycloak:8080/realms/edfi/.well-known/openid-configuration
KEYCLOAK_PORT=8045
```

See `eng/docker-compose/KEYCLOAK-SETUP.md` in the Ed-Fi API repository for
Keycloak realm and client configuration details.

---

## Switching Identity Providers

Switching from one provider to another after initial setup requires
re-provisioning the identity state:

1. Stop all services and remove volumes: `./start-local-dms.ps1 -d -v`
2. Update the `.env` file with the new identity provider settings
3. Start fresh: `./start-local-dms.ps1 -IdentityProvider <provider>`
4. Re-run `./configure-local-data-store.ps1` to create client credentials

:::warning

Changing the identity provider without resetting volumes will leave stale
OpenIddict tables in the Configuration Service database, causing startup
failures.

:::
