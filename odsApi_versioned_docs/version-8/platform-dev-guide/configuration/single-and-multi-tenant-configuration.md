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

In a multi-tenant configuration, each tenant has its own isolated set of data
stores, vendors, claim sets, and API clients. The tenant identifier is embedded
in the API request URL for Ed-Fi API calls, and all Configuration Service API
calls include a `Tenant` header to identify the target tenant.

Multi-tenancy is controlled by the `AppSettings:MultiTenancy` setting (default:
`false`) and must be set consistently in both the Ed-Fi API and Configuration
Service.

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

Tenants are created and managed through the Configuration Service API. All
resources (vendors, applications, API clients, data stores, claim sets) are
scoped to the tenant specified in the `Tenant` header.

## Data Store Connection Strings

Data store connection strings for both single-tenant and multi-tenant
deployments are managed through the Configuration Service API. Connection
strings are stored encrypted at rest (AES) in the Configuration Service
database. In multi-tenant mode, each data store is associated with a specific
tenant.

See [API Client and Data Store
Configuration](./api-client-and-data-store-configuration.md) for the full data
model and configuration details.
