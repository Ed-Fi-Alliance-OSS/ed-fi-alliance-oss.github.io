# Securing OAuth Client Secrets

A secure secret-storage strategy protects API clients if an identity-provider
database is exposed. This document describes how the Configuration Service
secures OAuth client secrets when it uses its self-contained identity provider,
and how secret handling differs when it uses Keycloak.

API clients use the client secrets that the Configuration Service issues to
authenticate to the Ed-Fi API.

## Overview

OAuth client secrets are credentials used by an API client to obtain a token.
The Configuration Service generates a secret when it creates an API client and
when its credentials are reset. The caller receives the generated secret in that
response and must store it securely.

Hashing is a one-way transformation of a secret into a verifier. With the
self-contained identity provider, the Configuration Service stores the verifier,
not the original secret. When a client requests a token, the Configuration
Service hashes the submitted secret with the saved salt and compares the result
with the stored verifier. A matching result authenticates the client; the
original secret is not recovered.

This design means that a reader of the Configuration Service's identity database
cannot directly retrieve clients' original secrets from the stored verifier.

## Default Hashing

When `AppSettings:IdentityProvider` is `self-contained`, the Configuration
Service uses PBKDF2 with HMAC-SHA-256 to hash client secrets by default. PBKDF2
deliberately performs repeated work, which makes guessing a secret from a stolen
verifier more expensive.

The Configuration Service uses the following values:

| Setting     | Value                                                              |
| ----------- | ------------------------------------------------------------------ |
| Algorithm   | PBKDF2-HMAC-SHA-256                                                |
| Iterations  | `IdentitySettings:ClientSecretHashingIterations`, default `210000` |
| Salt        | 16 cryptographically random bytes per secret                       |
| Derived key | 32 bytes                                                           |
| Comparison  | Constant-time comparison                                           |

Each client secret receives a new random salt. Consequently, two identical
secrets produce different stored values. The Configuration Service stores a
Base64 representation of the hash format: a version byte, the salt length, the
salt, and the derived key. The salt is not secret; the Configuration Service
needs it to verify a submitted secret. The iteration count is not stored.

On a token request, the Configuration Service reads the stored value, derives a
key from the submitted secret using the stored salt and the iteration count that
is configured now, and uses a constant-time comparison. A failed comparison does
not reveal the original secret or authenticate the client.

The Configuration Service returns a plaintext secret only when it creates or
resets credentials. It does not expose the stored plaintext later because the
self-contained identity provider does not retain one. If a secret is lost or
exposed, reset the credentials and replace the client's stored value.

The implementation is in
[`src/config/backend/EdFi.DmsConfigurationService.Backend.OpenIddict/Services/ClientSecretHasher.cs`](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/src/config/backend/EdFi.DmsConfigurationService.Backend.OpenIddict/Services/ClientSecretHasher.cs).

### Changing the Iteration Count

The iteration count is set by `IdentitySettings:ClientSecretHashingIterations`.
In the Docker Compose files that ship with the Ed-Fi API, set it with
`CONFIGURATION_SERVICE_IDENTITY_HASHING_ITERATIONS`, which also sets the count
the bootstrap script uses to hash its own client secrets. The value must be
greater than zero, or the Configuration Service doesn't start. See
[IdentitySettings](../platform-dev-guide/configuration/configuration-details.mdx#identitysettings).

:::warning

Changing the iteration count invalidates every existing client secret. Because
the count isn't stored with each hash, every secret hashed at the old count
fails verification at the new one. Choose the count before you create any
clients.

:::

If you change the count later, every client stops authenticating:

- API clients.
- The Configuration Service clients that `setup-openiddict.ps1 -InsertData`
  creates, such as the administrative `DmsConfigurationService` client, and any
  client registered through `/connect/register`.
- The client that the Ed-Fi API uses to read from the Configuration Service
  (`ConfigurationServiceSettings:ClientId`, `CMSReadOnlyAccess` by default).
  Until it's fixed, the Ed-Fi API can't load its configuration from the
  Configuration Service.

Restore administrative access first, because resetting an API client's
credentials requires an administrative token. The `reset-credential` endpoints
cover only API clients and applications. Rerunning `setup-openiddict.ps1` for
an existing client ID leaves that client's stored hash unchanged. To recover:

1. Create Configuration Service clients with new client IDs. New clients are
   hashed at the new count.
   - For administrative access, run `setup-openiddict.ps1 -InsertData` with a
     new `-NewClientId` and a new secret, or, when
     `IdentitySettings:AllowRegistration` is `true`, register a client through
     `/connect/register`.
   - For the Ed-Fi API, run `setup-openiddict.ps1 -InsertData` with a new
     `-NewClientId`, a new secret, and
     `-ClientScopeName "edfi_admin_api/readonly_access"`.

   Pass the secret with `-NewClientSecret`, or with
   `-NewClientSecretEnvironmentVariable` to name a variable that holds it.
   Without either, the script uses its built-in default secret, which is
   published in the Ed-Fi API repository.
1. Set `ConfigurationServiceSettings:ClientId` and
   `ConfigurationServiceSettings:ClientSecret` in the Ed-Fi API to the new
   read-only client, and restart the Ed-Fi API.
1. With the new administrative client, reset the credentials of each API client
   and give each client its new secret.

### Replacing the Hasher

A Configuration Service plugin can replace the default hasher, for example to
use a different algorithm or work factor, by registering an
`IClientSecretHasher` from the `EdFi.DmsConfigurationService.Secrets` package.
The replacement applies only to the self-contained identity provider. Secrets
already in the database were hashed by the default hasher, so a replacement must
still verify them, or every existing client must be issued a new secret. See the
[`EdFi.DmsConfigurationService.Secrets`
guide](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/src/config/contracts/EdFi.DmsConfigurationService.Secrets/README.md#replacing-the-client-secret-hasher)
for the contract and its rules.

## Keycloak

When `AppSettings:IdentityProvider` is `keycloak`, the Configuration Service
creates and resets clients through Keycloak. The Configuration Service supplies
the generated client secret to Keycloak, and Keycloak stores and verifies the
credential at its token endpoint. The Configuration Service's hasher and its
iteration setting do not apply to those Keycloak-managed clients.

Keycloak client secrets should not be treated as non-recoverable hashes. In
Keycloak's standard JPA storage model, a client's current secret is stored in
the `SECRET` field. A user or service account with `view-clients` access, or
fine-grained View access on the client, can retrieve its current secret through
the Keycloak administration interface or Admin REST API. Regenerating the
secret requires the stronger Configure permission. Users and service accounts
without the necessary client-management permissions cannot access it.

Therefore, Keycloak administrative access is secret-bearing access. Grant only
the minimum realm-management or fine-grained client permissions required, and
protect Keycloak's database and backups accordingly. Keycloak documents
client-secret retrieval and regeneration in its [Server Administration
Guide](https://www.keycloak.org/docs/latest/server_admin/) and [Admin REST
API](https://www.keycloak.org/docs-api/latest/rest-api/index.html).

## Development Environment

The Configuration Service's self-contained identity provider hashes client
secrets in every environment; it does not provide a plaintext-secret development
setting. Do not place client secrets in source-controlled configuration, logs,
or test artifacts. Use environment-specific credentials and reset a secret
immediately if it may have been exposed.
