# Multi-tenant Configuration for Admin API 2.x

Multi-tenancy can be enabled in the appsettings file by updating `MultiTenancy`
flag to true.

```json
"AppSettings": {
   "MultiTenancy": true
}
```

## Connection Strings

The connection strings for the `EdFi_Admin` and `EdFi_Security` databases are
configured differently depending on whether the MultiTenancy feature is enabled
or disabled.

### Single-Tenant Configuration (the default)

In a single-tenant configuration, there is only one `EdFi_Admin` and
`EdFi_Security` used by Admin API.

The connection strings are in the "ConnectionStrings" section, as follows:

```json
{
  "ConnectionStrings": {
    "EdFi_Admin": "Server=(local); Database=EdFi_Admin; Integrated Security=True; Application Name=AdminApi;",
    "EdFi_Security": "Server=(local); Database=EdFi_Security; Integrated Security=True; Application Name=AdminApi;"
  }
}
```

### Multi-Tenant Configuration

In a multi-tenant configuration, each tenant has its own `EdFi_Admin` and
`EdFi_Security` databases. The connection strings are organized under distinct
tenant entries in a `Tenants` section, as follows:

```json
{
  "ConnectionStrings": { },
  "Tenants": {
    "Tenant1": {
      "ConnectionStrings": {
        "EdFi_Admin": "Server=(local); Database=EdFi_Admin_Tenant1; Integrated Security=True; Application Name=AdminApi;",
        "EdFi_Security": "Server=(local); Database=EdFi_Security_Tenant1; Integrated Security=True; Application Name=AdminApi;"
      }
    },
    "Tenant2": {
      "ConnectionStrings": {
        "EdFi_Admin": "Server=(local); Database=EdFi_Admin_Tenant2; Integrated Security=True; Application Name=AdminApi;",
        "EdFi_Security": "Server=(local); Database=EdFi_Security_Tenant2; Integrated Security=True; Application Name=AdminApi;"
      }
    }
  }
}
```

## Request Header and Database Routing

When using the multi-tenant mode, Admin API clients must use an HTTP request
header to carry the well-known tenant identifiers. For example, the following
request will retrieve all of the vendors listed in the `EdFi_Admin_Tenant2`
database specified in the JSON snippet above. Any vendors defined in database
`EdFi_Admin_Tenant1` are ignored, because Admin API will only connect to the
specific tenant database.

```http
GET /v2/vendors
Tenant: Tenant2
Authorization: bearer ....
```

### Implications for Client Credentials and Authorization

Admin API does not formally distinguish client credentials by tenant. The
application is intended for system administrators who have access to all
tenants. However, there is no separate database covering all tenants.

When creating client credentials using `POST /connect/register`, the user still
needs to specify a tenant. Authentication using `POST /connect/token` must be
performed with the same tenant, but subsequent HTTP requests using the generated
token can access any tenant. The tenant header _is not an authorization
mechanism_. It is only a _database routing_ mechanism.

:::warning

We recommend always using the first tenant for client credential creation and
token generation. Be careful not to drop this tenant database!

If the tenant database is lost for some reason, then the created credentials
will no longer exist. In that case, you can temporarily update the `appsettings`
by setting `Authentication.AllowRegistration` to true and then register a new
client.

:::

### Swagger Configuration

The requests from Swagger UI don’t automatically include tenant identifier
in the headers. So, if user enables Swagger UI and MultiTenancy,
then `DefaultTenant` should be configured as follows in the appSettings file:

```json
{
  "SwaggerSettings": {
    "EnableSwagger": true,
    "DefaultTenant": "Tenant1"
  }
}
```

In this example, all requests from Swagger UI will be using "Tenant1" as the
`tenant` HTTP header.
