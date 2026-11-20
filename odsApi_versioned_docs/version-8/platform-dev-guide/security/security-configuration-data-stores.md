# Security Configuration Data Stores

Security and client configuration for the Ed-Fi API is stored in the
Configuration Service database (`dmscs` schema). This single database replaces
the separate `EdFi_Admin` and `EdFi_Security` databases used in prior versions.
The schema is divided into two logical groups: client configuration entities
(authentication and data access) and authorization entities (claim sets, resource
claims, and authorization strategies).

## Client Configuration

The client configuration entities manage vendors, applications, API clients, and
the data stores they can access.

- **Vendors.** Each education software vendor is represented in the database and
  serves as a container for applications and namespace prefixes.
- **Vendor Namespace Prefixes.** Vendors are assigned zero or more namespace
  prefixes (URI format, up to 255 characters each). For resources secured by
  namespace, the client can only perform actions on objects matching an
  assigned prefix.
- **Applications.** A list of applications belonging to vendors. Each
  application is assigned a claim set name and may be associated with one or
  more education organizations. Applications are also linked to profiles that
  constrain API responses.
- **Application Education Organizations.** Associates applications with the
  education organization IDs they are authorized to access.
- **API Clients.** Each API client belongs to an application and carries a
  `ClientId` and `ClientUuid` used for OAuth token issuance. An application can
  have zero, one, or many API clients. Each API client is linked to zero or more
  data stores. An API client either uses all of its application's education
  organizations (the default) or a narrowed list of its own.
- **API Client Education Organizations.** Stores each API client's education
  organization IDs (`ApiClientEducationOrganization`). Each ID must be one of
  the application's education organizations, and removing an education
  organization from the application also removes it from every client. See
  [API Client and Data Store
  Configuration](../configuration/api-client-and-data-store-configuration.md).
- **Data Stores.** Database connections used to serve Ed-Fi resource data.
  Connection strings are stored encrypted at rest (AES). Each data store may
  have contextual name/value pairs (`DataStoreContext`) for route-based
  selection, and derivative connections (`DataStoreDerivative`) for read
  replicas or snapshots.
- **Profiles.** Data policies (expressed as XML definitions) that constrain
  which resource properties are readable or writable for assigned applications.
  See [API Profiles](./api-profiles.md) for details.
- **Tenants.** In multi-tenant deployments, a `TenantId` column scopes vendors,
  data stores, profiles, claim sets, and related security metadata to a tenant.
  Claim set names must still be unique across all tenants, and system-reserved
  claim sets are shared by every tenant. See [Single and Multi-Tenant
  Configuration](../configuration/single-and-multi-tenant-configuration.md).

Ownership tokens and their assignments to API clients are also stored in this
database. See [Ownership-Based Authorization: Technical
Details](./ownership-based-authorization.md#technical-details) for those
tables.

The following ERD shows the structure of the client configuration entities:

```mermaid
erDiagram
    Tenant ||--o{ Vendor : scopes
    Tenant ||--o{ DataStore : scopes
    Tenant ||--o{ Profile : scopes
    Vendor ||--o{ VendorNamespacePrefix : has
    Vendor ||--o{ Application : has
    Application ||--o{ ApplicationEducationOrganization : has
    Application ||--o{ ApplicationProfile : has
    Application ||--o{ ApiClient : has
    ApiClient ||--o{ ApiClientEducationOrganization : has
    ApplicationEducationOrganization ||--o{ ApiClientEducationOrganization : limits
    ApiClient ||--o{ ApiClientDataStore : has
    DataStore ||--o{ ApiClientDataStore : has
    DataStore ||--o{ DataStoreContext : has
    DataStore ||--o{ DataStoreDerivative : has
    Profile ||--o{ ApplicationProfile : has
```

## Authorization Configuration

The authorization entities define what resources API clients can access and
under what conditions.

- **Claim Sets.** A named collection of resource claims and authorization rules
  for a type of API client (e.g., a SIS vendor). Each application references a
  claim set by name. System-reserved claim sets (`IsSystemReserved = true`)
  cannot be modified through the Configuration Service API.
- **Resource Claims.** Each API resource exposed by the Ed-Fi API has a
  corresponding resource claim entry (`ResourceName`, `ClaimName`). Resource
  claims are organized into a hierarchy to allow high-level grouping (e.g., all
  descriptors under a single parent claim).
- **Authorization Strategies.** Named strategies (e.g.,
  `RelationshipsWithEdOrgsAndPeople`, `NamespaceBased`) that define the logic
  applied after the basic resource/action check. See [API Claim Sets &
  Resources](./api-claim-sets-resources.md#authorization-strategies) for
  descriptions of each strategy.
- **Claims Hierarchy.** The complete resource claim hierarchy — including
  resource-to-claim-set assignments, action permissions (Create, Read, Update,
  Delete, ReadChanges), and authorization strategy overrides — is stored as a
  single JSON document in the `ClaimsHierarchy` table (a `JSONB` column on
  PostgreSQL and an `NVARCHAR(MAX)` column on SQL Server). This replaces the
  normalized per-row approach used in prior versions and allows the full
  security metadata to be read and applied in a single query.

The following ERD shows the structure of the authorization configuration
entities:

```mermaid
erDiagram
    ClaimSet {
        int Id PK
        varchar ClaimSetName
        boolean IsSystemReserved
    }
    ResourceClaim {
        int Id PK
        varchar ResourceName
        varchar ClaimName
    }
    AuthorizationStrategy {
        int Id PK
        varchar AuthorizationStrategyName
        varchar DisplayName
    }
    ClaimsHierarchy {
        bigint Id PK
        jsonb Hierarchy
    }
```

:::info

The `ClaimsHierarchy.Hierarchy` document encodes the full claims taxonomy:
resource claim parentage, claim set assignments, action permissions, and
authorization strategy overrides. This claims taxonomy is managed through the
Configuration Service API and is cached by the Ed-Fi API for the duration
configured in `CacheSettings:ClaimSetsCacheExpirationSeconds` (in seconds),
which defaults to 600 seconds (10 minutes).

:::
