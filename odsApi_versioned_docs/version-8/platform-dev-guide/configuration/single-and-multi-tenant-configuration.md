---
sidebar_position: 5
---

# Single and Multi-Tenant Configuration

In a single-tenant configuration (the default), all API clients operate within
a single tenant context. Data stores, vendors, claim sets, and API clients are
all configured without a tenant scope. Multiple data stores can still be used
within a single-tenant deployment — for example, to serve different school years
or districts via [context-based routing](./context-based-routing-for-year-specific-datastore.md)
— but they all belong to the same shared tenant context.

In a multi-tenant configuration, each tenant has its own vendors, applications,
API clients, and data stores (claim sets work differently; see [What Belongs to
a Tenant](#what-belongs-to-a-tenant)). The tenant identifier is embedded
in the API request URL for Ed-Fi API calls, and tenant-scoped Configuration
Service API calls include a `Tenant` header to identify the target tenant.

Multi-tenancy is controlled by the `AppSettings:MultiTenancy` setting (default:
`false`) and must be set consistently in both the Ed-Fi API and Configuration
Service. In the provided Docker Compose files, set it with the
`DMS_MULTI_TENANCY` environment variable for the Ed-Fi API and
`CONFIGURATION_SERVICE_MULTI_TENANCY` for the Configuration Service.

## Single-Tenant Configuration

In single-tenant mode, no tenant prefix is added to URL paths:

```json
{
  "AppSettings": {
    "MultiTenancy": false
  }
}
```

API request paths follow the standard pattern:

```text
GET http://localhost:8080/api/data/ed-fi/schools
```

Data stores, vendors, and API clients are all configured through the
Configuration Service API without a tenant scope.

## Multi-Tenant Configuration

To enable multi-tenancy, set `AppSettings:MultiTenancy` to `true` in both
services:

```json
{
  "AppSettings": {
    "MultiTenancy": true
  }
}
```

The tenant identifier appears as a path segment immediately after the path base
for Ed-Fi API requests:

```text
GET http://localhost:8080/api/{tenantId}/data/ed-fi/schools
```

For Configuration Service API calls, the tenant identifier is passed as a
`Tenant` HTTP header:

```text
GET http://localhost:8081/config/v3/vendors
Tenant: tenant1
```

A missing or empty `Tenant` header, or the name of a tenant that doesn't exist,
returns `400 Bad Request`.

Tenants are created and managed through the Configuration Service API
(`/v3/tenants`). Tenant names can contain only ASCII letters and digits,
hyphens, and underscores, up to 256 characters, so they can be used in URL paths
without encoding.

### What Belongs to a Tenant

Vendors, applications and their API clients, data stores with their contexts
and derivatives, ownership tokens, and profiles each belong to one tenant, and
each tenant sees only its own. Vendor company names, profile names, and data
store names need only be unique within a tenant, so different tenants can use
the same names.

Claim sets work differently:

- System-reserved claim sets are shared by every tenant.
- A claim set that a tenant creates is listed and managed only in that tenant,
  but claim set names are unique across all tenants. A name that another tenant
  already uses is rejected with `400`, even though it isn't listed.

### Requests That Don't Need a Tenant Header

These Configuration Service paths don't need a `Tenant` header:

- `GET /`, `GET /health`, `GET /tenancy`, `GET /metadata/specifications`,
  and `GET /openapi/v1.json`
- `/connect/*` (token and other identity endpoints) and `/.well-known/*`
- `/v3/tenants`, which still requires authentication

`GET /tenancy` lists tenant names without authentication
(`{ "tenants": [ ... ] }`). The list is empty when multi-tenancy is disabled or
no tenants exist yet:

```text
GET http://localhost:8081/config/tenancy
```

:::warning

The `Tenant` header selects which tenant's configuration a request works on.
It's a routing mechanism, not a security boundary. Configuration Service
access tokens carry no tenant claim, so any Configuration Service client with
the required scope can send any tenant name and administer that tenant's
vendors, applications, API clients, claim sets, and data store connection
strings. Treat every Configuration Service credential as a platform-wide
administrative credential. If you need a hard boundary between tenants, run a
separate Configuration Service deployment, with its own database and
credentials, for each boundary.

This applies only to the Configuration Service. The Ed-Fi API enforces claim
set, education organization, namespace, and data store authorization for each
vendor API client.

:::

## Data Store Connection Strings

See [API Client and Data Store
Configuration](./api-client-and-data-store-configuration.md) for how data store
connection strings are stored and managed.
