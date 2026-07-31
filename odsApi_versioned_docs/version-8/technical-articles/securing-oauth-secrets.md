# Securing CMS OAuth Secrets

A secure secret-storage strategy protects API clients if an identity-provider
database is exposed. This document describes how CMS secures OAuth client
secrets when it uses its self-contained identity provider and how secret
handling differs when CMS uses Keycloak.

CMS-issued OAuth secrets are used to authenticate API clients to DMS.

## Overview

OAuth client secrets are credentials used by an API client to obtain a token.
CMS generates a secret when it creates an API client and when its credentials
are reset. The caller receives the generated secret in that response and must
store it securely.

Hashing is a one-way transformation of a secret into a verifier. CMS stores the
verifier, not the original secret, for self-contained identity. When a client
requests a token, CMS hashes the submitted secret with the saved salt and
compares the result with the stored verifier. A matching result authenticates
the client; the original secret is not recovered.

This design means that a reader of the CMS identity database cannot directly
retrieve clients' original secrets from the stored verifier.

## Default Hashing

When `AppSettings:IdentityProvider` is `self-contained`, CMS uses PBKDF2 with
HMAC-SHA-256 to hash client secrets. PBKDF2 deliberately performs repeated
work, which makes guessing a secret from a stolen verifier more expensive.

CMS uses the following values:

| Setting | Value |
| --- | --- |
| Algorithm | PBKDF2-HMAC-SHA-256 |
| Iterations | 210,000 fixed in the client-secret hasher |
| Salt | 16 cryptographically random bytes per secret |
| Derived key | 32 bytes |
| Comparison | Constant-time comparison |

Each client secret receives a new random salt. Consequently, two identical
secrets produce different stored values. CMS stores a Base64 representation of
the hash format: a version byte, the salt length, the salt, and the derived
key. The salt is not secret; CMS needs it to verify a submitted secret.

On a token request, CMS reads the stored value, derives a key from the submitted
secret using the stored salt and the 210,000-iteration count, and uses a
constant-time comparison. A failed comparison does not reveal the original
secret or authenticate the client.

CMS returns a plaintext secret only when it creates or resets credentials. It
does not expose the stored plaintext later because self-contained identity does
not retain one. If a secret is lost or exposed, reset the credentials and
replace the client's stored value.

The implementation is in
[`src/config/backend/EdFi.DmsConfigurationService.Backend.OpenIddict/Services/ClientSecretHasher.cs`](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/config/backend/EdFi.DmsConfigurationService.Backend.OpenIddict/Services/ClientSecretHasher.cs).

## Keycloak

When `AppSettings:IdentityProvider` is `keycloak`, CMS creates and resets
clients through Keycloak. CMS supplies the generated client secret to Keycloak,
and Keycloak stores and verifies the credential at its token endpoint. CMS's
PBKDF2-HMAC-SHA-256 hasher and its iteration setting do not apply to those
Keycloak-managed clients.

Keycloak client secrets should not be treated as non-recoverable CMS hashes. In
Keycloak's standard JPA storage model, a client's current secret is stored in
the `SECRET` field. An administrator or service account with permission to
manage the client can retrieve its current secret or regenerate it through the
Keycloak administration interface or Admin REST API. Users and service accounts
without the necessary client-management permissions cannot access it.

Therefore, Keycloak administrative access is secret-bearing access. Grant only
the minimum realm-management or fine-grained client permissions required, and
protect Keycloak's database and backups accordingly. Keycloak documents
client-secret retrieval and regeneration in its [Server Administration
Guide](https://www.keycloak.org/docs/latest/server_admin/) and [Admin REST
API](https://www.keycloak.org/docs-api/latest/rest-api/index.html).

## Development Environment

CMS's self-contained identity provider hashes client secrets in every
environment; it does not provide a plaintext-secret development setting. Do
not place client secrets in source-controlled configuration, logs, or test
artifacts. Use environment-specific credentials and reset a secret immediately
if it may have been exposed.
