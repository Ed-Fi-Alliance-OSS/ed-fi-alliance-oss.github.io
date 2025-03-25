# Single and Multi-Tenant Configuration

In a single-tenant configuration, there is only one `EdFi_Admin` and
`EdFi_Security` used by the API. ODS instances, API clients, and their
associations are all managed within the `EdFi_Admin` databases. In a
multi-tenant configuration, each tenant has its own `EdFi_Admin` and
`EdFi_Security` databases and the API clients must include the well-known tenant
identifier in the base route of their API requests.

MultiTenancy can be enabled in the appsettings "Features" section, as follows:

```json
"ApiSettings": {
  ...
  "Features": [
    ...
    {
      "Name": "MultiTenancy",
      "IsEnabled": true
    }
  ],
}
```

## Connection Strings

The connection strings for the `EdFi_Admin` and `EdFi_Security` databases are
configured differently depending on whether the MultiTenancy feature is enabled
or disabled.

:::info

As an alternative to the _appsettings.json_ file, connection strings may be
stored in an external secure parameter store. For more information, see
[External Configuration of ODS Connection
Strings](./external-configuration-of-ods-connection-strings.md).

:::

### Single-Tenant Configuration

In a single-tenant configuration (the default), the connection strings are
located in the "ConnectionStrings" section, as follows:

```json
"ConnectionStrings": {
    "EdFi_Admin": "Server=(local); Database=EdFi_Admin; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
    "EdFi_Security": "Server=(local); Database=EdFi_Security; Trusted_Connection=True; Persist Security Info=True; Application Name=EdFi.Ods.WebApi;",
    "EdFi_Master": "Server=(local); Database=master; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;"
},
```

### Multi-Tenant Configuration

In a multi-tenant configuration, connection strings are organized under distinct
tenant entries in a "Tenants" section, as follows:

```json
"Tenants": {
    "Tenant1": {
      "ConnectionStrings": {
        "EdFi_Admin": "Server=(local); Database=EdFi_Admin_Tenant1; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
        "EdFi_Security": "Server=(local); Database=EdFi_Security_Tenant1; Trusted_Connection=True; Persist Security Info=True; Application Name=EdFi.Ods.WebApi;"
      }
    },
    "Tenant2": {
      "ConnectionStrings": {
        "EdFi_Admin": "Server=(local); Database=EdFi_Admin_Tenant2; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
        "EdFi_Security": "Server=(local); Database=EdFi_Security_Tenant2; Trusted_Connection=True; Persist Security Info=True; Application Name=EdFi.Ods.WebApi;"
      }
    }
  }
```

The connection strings for ODS databases are configured within the
tenant-specific Admin database. For example, in the configuration above ODS
connection strings specific to Tenant1 are configured in `EdFi_Admin_Tenant1`
database and ODS connection strings specific to Tenant2 are configured in
`EdFi_Admin_Tenant2` database.

## ODS Connection Strings

ODS instances, API clients, and their associations are all managed within the
Admin database(s) as described in [API Client and ODS Instance
Configuration](./api-client-and-ods-instance-configuration.md). ODS instances
can be configured by database administrators via SQL queries as outlined in the
article [How To: Configure ODS
Instances](../../how-to-guides/how-to-configure-ods-instances.md). API keys and
secrets can be administered via SQL queries as described in the article [How
To:Configure Key / Secret](../../how-to-guides/how-to-configure-key-secret.md).
