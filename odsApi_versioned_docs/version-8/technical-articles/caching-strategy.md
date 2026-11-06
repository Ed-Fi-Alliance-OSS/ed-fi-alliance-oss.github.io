# Caching Strategy

The Ed-Fi API keeps much of what it reads from the Configuration Service and the
database in memory, so that most requests don't wait for another service. This
article describes each cache, how long a change takes to reach the Ed-Fi API,
and what to restart to apply a change sooner.

To see how long a particular change takes, go to [How Long a Change
Takes](#how-long-a-change-takes).

## How the Caches Work

The caches are held in the memory of each Ed-Fi API process. There is no Redis
or other shared cache.

This has three consequences:

- Each Ed-Fi API instance has its own copy of every cache and refreshes it on
  its own schedule. Two instances can briefly answer the same request
  differently after a change.
- Most cache entries are empty until the first request that needs them, which
  then waits while the Ed-Fi API fetches the value. Later requests use the
  cached value until it expires. A few are loaded at startup; see [Warming Up
  an Instance](#warming-up-an-instance).
- Restarting an instance empties its caches.

When several requests need the same missing or expired entry at once, most
caches share one fetch instead of each calling the Configuration Service or the
database.

A failed fetch is never cached. The next request that needs the value tries
again. (A schema check that finds a mismatch is different; see [Schema
Fingerprint](#schema-fingerprint-and-resource-key-validation).)

## Summary

| Cache | Default lifetime | Setting | Per tenant | How it's refreshed |
| --- | --- | --- | --- | --- |
| [API client details](#api-client-details) | 10 minutes | `CacheSettings:ApplicationContextCacheExpirationSeconds` | Yes (one entry for each client) | Expiry or restart |
| [Claim sets](#claim-sets) | 10 minutes | `CacheSettings:ClaimSetsCacheExpirationSeconds` | Yes | Expiry, `reload-claimsets` or restart |
| [Profiles](#profiles) | 30 minutes | `CacheSettings:ProfileCacheExpirationSeconds` | Yes | Expiry or restart |
| [Compiled JSON schemas](#compiled-json-schemas) | No expiry | — | No | Restart |
| [Configuration Service token](#configuration-service-token) | 25 minutes | `CacheSettings:TokenCacheExpirationSeconds` | No | Expiry or restart |
| [Data stores](#data-stores) | 10 minutes | `CacheSettings:DataStoreCacheExpirationSeconds`, `CacheSettings:DataStoreCacheRefreshEnabled` | Yes | Expiry, a request for an unknown data store, or restart |
| [Database connection pools](#database-connection-pools) | While the data store is configured | — | One for each connection string | Data store refresh or restart |
| [OIDC metadata and signing keys](#oidc-metadata-and-signing-keys) | 24 hours | `JwtAuthentication:AutomaticRefreshIntervalHours` | No | Expiry, issuer mismatch or restart |
| [Validated tokens](#oidc-metadata-and-signing-keys) | 5 minutes, or less if the token expires sooner | `JwtAuthentication:ValidatedTokenCacheEntryMaxLifetimeSeconds` | No | Expiry or restart |
| [Schema fingerprint](#schema-fingerprint-and-resource-key-validation) | Process lifetime (primary); 10 minutes (read replicas and snapshots) | `CacheSettings:DerivativeValidationCacheExpirationSeconds` | One for each connection string | Restart (primary); expiry (read replicas and snapshots) |
| [Identities API tenant list](#identities-api-tenant-list) | 60 seconds, fixed | — | No | Expiry, an unknown tenant, or restart |

The Configuration Service has caches of its own, described in [Configuration
Service Caches](#configuration-service-caches).

## How Long a Change Takes

With the default settings, a change reaches each Ed-Fi API instance within the
following times:

| Change | Reaches each instance within | To apply it sooner |
| --- | --- | --- |
| Claim set or its authorization rules | 10 minutes | Call `reload-claimsets` on each instance, or restart them |
| An API client's data store assignments, claim set, education organizations or namespace prefixes | The client's next token (at most the token lifetime) | The client requests a new token |
| An API client's ownership tokens, or a deleted API client | 10 minutes | Restart the instances |
| A profile, or the profiles assigned to an application | 30 minutes; up to an hour for a new profile | Restart the instances |
| A data store's settings or connection string | 10 minutes | Restart the instances |
| A rotated secret in a connection string | 15 minutes (5 in the Configuration Service, then 10) | Restart the Configuration Service, then the Ed-Fi API instances |
| A new tenant, for the Identities API | 60 seconds | — |
| A new signing key at the identity provider | About 24 hours, not guaranteed | Restart the instances |
| A new Data Standard version or extension | Only after a restart | Provision a new database, then restart |
| A database provisioned or repaired after the Ed-Fi API's check failed | Only after a restart | Restart the instances |

These are upper limits for a change that succeeds. See [Cache Lifetimes and
Removing Access](#cache-lifetimes-and-removing-access) for what they don't
cover.

## Ed-Fi API Caches

### API Client Details

**Holds:** the calling API client's application and its ownership tokens
(`CreatorOwnershipTokenId` and `OwnershipTokenIds`), known internally as the
_application context_. The Ed-Fi API needs it to read, create or update
resources, including change queries with `minChangeVersion`, for
`/oauth/token_info`, for a `DELETE`, `/deletes` or `/keyChanges` request that
uses ownership-based authorization, and for every [Identities
API](./identities-api.md) request.
There is one entry for each client in each tenant.

The client's data store assignments, claim set, education organizations and
namespace prefixes don't come from this cache. They're in the client's access
token, so a change to any of them takes effect when the client gets a new token.
Restarting the Ed-Fi API doesn't apply it sooner.

**Lifetime:** `CacheSettings:ApplicationContextCacheExpirationSeconds`, `600`
(10 minutes) by default. It must be greater than `0`, or the Ed-Fi API doesn't
start.

**Refresh:** the entry is fetched again after it expires. There is no endpoint
to reload it, so a change to a client's ownership tokens reaches an instance
within 10 minutes or when the instance restarts.

**Failure:** if the Configuration Service can't be reached while the entry isn't
cached, a request that needs the entry fails with `503` and the problem type
`urn:ed-fi:api:service-unavailable`. Requests that don't need it, such as most
`DELETE`, `/deletes` and `/keyChanges` requests, aren't affected. A client that
the Configuration Service doesn't know, for example one that was deleted, gets
`401`.

### Claim Sets

**Holds:** the claim sets and their authorization rules, one entry for each
tenant. The Ed-Fi API loads them at startup; if that fails, it logs the error
and still starts.

**Lifetime:** `CacheSettings:ClaimSetsCacheExpirationSeconds`, `600` (10
minutes) by default.

**Refresh:** the entry is fetched again after it expires. To apply a change
sooner, call `POST /management/reload-claimsets`
(`/management/{tenant}/reload-claimsets` with multi-tenancy) or restart the
instance. The endpoint reloads only the instance that serves the request. It's
off by default; see [How to Configure Claim
Sets](../how-to-guides/how-to-configure-claim-sets.md) for how to turn it on.

**Failure:** if the Configuration Service can't return the claim sets, the
request fails with `500` and nothing is cached. The next request tries again.

### Profiles

**Holds:** for each tenant, the profile definitions, the profiles assigned to
each application, and the OpenAPI specification filtered for each profile. An
application with no profiles is cached as well.

**Lifetime:** `CacheSettings:ProfileCacheExpirationSeconds`, `1800` (30 minutes)
by default.

**Refresh:** expiry or restart. A changed profile, or a change to an
application's profiles, can take up to 30 minutes to reach an instance. A new
profile can take up to an hour: the profile definitions and each
application's assignments expire separately, so an assignment refreshed before
the definitions can leave out the new profile for another 30 minutes.

**Failure:** if the Configuration Service can't return profile data, the
request fails with `503` and the problem type
`urn:ed-fi:api:service-unavailable`, which a client can retry. The Ed-Fi API
doesn't fall back to an expired value.

### Compiled JSON Schemas

**Holds:** the compiled JSON schema that validates the body of each `POST` and
`PUT`, for every resource.

**Lifetime:** the life of the process. The Ed-Fi API loads the API schema and
compiles these schemas once, at startup, and doesn't reload the schema while it
runs. A schema change, such as a new extension, needs a newly provisioned
database and a restart. See [Database
Provisioning](../platform-dev-guide/utilities/database-provisioning.md#upgrading-the-schema).

### Configuration Service Token

**Holds:** the access token that the Ed-Fi API uses to call the Configuration
Service. Each instance has one token for all tenants.

**Lifetime:** `CacheSettings:TokenCacheExpirationSeconds`, `1500` (25 minutes)
by default. The Ed-Fi API doesn't read the token's own expiry, so keep this
value shorter than the lifetime of the tokens that the identity provider issues.
Otherwise the cached token can stop working while it's still cached, and calls
to the Configuration Service fail until the entry expires or the instance
restarts.

### Data Stores

**Holds:** each tenant's data stores, with their decrypted connection strings
and route context values.

**Lifetime:** `CacheSettings:DataStoreCacheExpirationSeconds`, `600` (10
minutes) by default, while `CacheSettings:DataStoreCacheRefreshEnabled` is
`true` (the default).

**Refresh:** the first request after the entry expires reloads that tenant's
data stores; other requests for the tenant wait for it. A request that matches
no cached data store, such as one for a new route context value, reloads its
tenant's data stores at once, whatever the settings.

With `DataStoreCacheRefreshEnabled` set to `false`, or the expiration set to `0`
or less, the data stores aren't reloaded on a schedule. Only a request that
matches no cached data store, or a restart, reloads them.

**Failure:** if a reload fails, the Ed-Fi API logs a warning and keeps using the
data stores it has.

A connection string that comes from a secret store is also cached by the
Configuration Service. See [Secrets](#secrets).

### Database Connection Pools

The Ed-Fi API keeps one connection pool for each connection string. A pool has
no time limit. When a data store reload no longer includes a connection string,
the Ed-Fi API closes that pool once the requests using it finish.

### OIDC Metadata and Signing Keys

**Holds:** the identity provider's OpenID Connect metadata and the signing keys
that the Ed-Fi API uses to validate access tokens.

**Lifetime:** the Ed-Fi API fetches them at startup and again every
`JwtAuthentication:AutomaticRefreshIntervalHours` (24 hours by default). It
fetches them sooner only when the issuer in the metadata doesn't match
`JwtAuthentication:Authority`, and at most once every
`JwtAuthentication:RefreshIntervalMinutes` (60 minutes by default).

A new signing key doesn't trigger a refresh. Before the identity provider starts
signing tokens with a new key, restart the Ed-Fi API instances. The automatic
refresh runs in the background after the interval has passed, so waiting about
24 hours usually picks up the key but doesn't guarantee it. Until the Ed-Fi API
has the key, tokens signed with it get `401`.

The Ed-Fi API also remembers each access token it has validated, for up to
`JwtAuthentication:ValidatedTokenCacheEntryMaxLifetimeSeconds` (300 seconds by
default) and never past the token's expiry.

### Schema Fingerprint and Resource Key Validation

**Holds:** whether a data store's database was provisioned for the schema that
the Ed-Fi API loaded, and whether its resource keys match. See [Schema
Fingerprint
Validation](../platform-dev-guide/utilities/database-provisioning.md#schema-fingerprint-validation).

**Lifetime:** at startup, the Ed-Fi API checks the database of every data store
it knows about. A data store added later is checked the first time a request
uses it. For a primary database, the Ed-Fi API keeps the result for the life of
the process. A failed check is kept too: every request to that data store gets
`503` until you fix the database and restart the Ed-Fi API. Other data stores
keep working. A temporary error, such as a lost connection, isn't kept.

For read replicas and snapshot databases, the result expires after
`CacheSettings:DerivativeValidationCacheExpirationSeconds`, `600` (10 minutes)
by default, because these databases can be replaced. A request that finds the
database unusable drops the result at once, so the next request checks again.
For the accepted values, see [Configuration
Details](../platform-dev-guide/configuration/configuration-details.mdx#optional-settings).
See also [Read Replicas](../platform-dev-guide/features/read-replicas.md).

### Identities API Tenant List

**Holds:** the list of tenants, on a multi-tenant host, so the [Identities
API](./identities-api.md) can check the tenant in the URL.

**Lifetime:** a fixed 60 seconds. A request for a tenant that isn't in the list
reloads it, at most once every 5 seconds.

**Failure:** while the list is less than 60 seconds old, the Ed-Fi API keeps
using it. After that, a failed reload answers `503` with the problem type
`urn:ed-fi:api:service-unavailable`.

## Configuration Service Caches

### Secrets

When a connection string comes from a secret store, the Configuration Service
caches the secret's value for `SecretsSettings:CacheExpirationSeconds` (300
seconds by default). The Ed-Fi API then caches the connection string with its
[data stores](#data-stores), so a rotated secret can take both lifetimes to
reach the Ed-Fi API. See [Secrets in Connection
Strings](../platform-dev-guide/configuration/secrets-in-connection-strings.mdx).

### Configuration Service Signing Keys

This section applies only when the Configuration Service is its own identity
provider (`AppSettings:IdentityProvider` set to `self-contained`). With
Keycloak, these settings have no effect.

The Configuration Service keeps a snapshot of its token signing keys in memory.
It loads the snapshot in the background when it starts, and reloads it on a
schedule. If a load fails, it keeps the current snapshot and tries again,
waiting a little longer after each failure, up to about a minute. The
Configuration Service starts even if the first load fails.

A request with a token signed by a key that isn't in the snapshot causes a
reload, but no sooner than the cooldown after the last load.

If the snapshot is older than the maximum staleness, the Configuration Service
stops trusting it. Until a load succeeds:

- Every request that needs a bearer token, and the signing-key (JWKS) endpoint,
  get `503 Service Unavailable` with a `Retry-After` header.
- Introspection reports every token as inactive.
- Issuing and revoking tokens still work.

The Ed-Fi API's own calls to the Configuration Service fail during that time
too. At first, only Ed-Fi API requests that need a value it hasn't cached, such
as any request from a client it hasn't seen recently, fail with `503`. Once the
Ed-Fi API's cached [claim sets](#claim-sets) expire, within 10 minutes, every
resource request fails with `500` until the Configuration Service loads its
signing keys again.

| Setting | Default | What it does |
| --- | --- | --- |
| `IdentitySettings:SigningKeyRefreshIntervalSeconds` | `300` | Time between scheduled reloads. Each wait varies by up to 10 percent. |
| `IdentitySettings:SigningKeyMaxStalenessSeconds` | `3600` | Age at which the snapshot is no longer trusted. |
| `IdentitySettings:SigningKeyUnknownKeyRefreshCooldownSeconds` | `30` | Minimum time between the end of a load and a reload caused by an unknown key. |
| `IdentitySettings:SigningKeyLoadTimeoutSeconds` | `10` | Time after which a load is cancelled and counted as failed. |

For the accepted values, see [Configuration
Details](../platform-dev-guide/configuration/configuration-details.mdx#identitysettings).

## DocumentCache

The [DocumentCache](../platform-dev-guide/features/document-cache.md) is
different from the caches above. It stores ready-made JSON for resources in the
`dms.DocumentCache` table of each data store's database, so every Ed-Fi API
instance that uses the database shares it, and a restart doesn't clear it.

## Operating the Caches

### Running Several Instances

Behind a load balancer, each instance refreshes its caches on its own schedule.
After a change, some requests can be answered from the old value and some from
the new one until every instance has refreshed. `reload-claimsets` affects only
the instance that receives the call, so call it on each instance, or restart
them all.

The request rate limit (`RateLimit` settings) isn't a cache, but it's kept the
same way: each instance counts its own requests, so the overall limit grows
with the number of instances.

### Warming Up an Instance

At startup, the Ed-Fi API loads the API schema, the data stores and the claim
sets, checks the database of each data store, and fetches the OIDC metadata.
Everything else is cached when it's first needed, so the first requests after a
restart can be slower. Sending a few representative requests before you add an
instance to the load balancer warms it.

### What a Restart Clears

Restarting an Ed-Fi API instance clears every Ed-Fi API cache, but not the
DocumentCache, and reloads the API schema. Restarting the Configuration Service
clears its secret cache and reloads its signing keys.

### Cache Lifetimes and Removing Access

A cache lifetime is how long an entry is normally kept, not a deadline for a
change to take effect. An entry fetched just before a change keeps the old value
for its whole lifetime, and if a refresh fails, the old value can stay in use
longer.

Tokens that were already issued are a separate matter. The Ed-Fi API validates
each access token itself and never checks whether it was revoked, so a token
keeps working until it expires, even after a restart. To cut off a client, see
[Removing a Client's
Access](../platform-dev-guide/configuration/identity-provider.md#removing-a-clients-access).
