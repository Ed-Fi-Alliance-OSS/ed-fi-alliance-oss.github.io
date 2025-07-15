# External Configuration of ODS Connection Strings

While the primary source for .NET configuration information is the appsettings.json file in the EdFi.Ods.WebApi project, the .NET configuration architecture is highly extensible through the
addition of custom configuration sources. This article provides an example of how
to use additional .NET configuration sources for externalizing the
configuration of the ODS connection strings used by the Ed-Fi ODS API, including the use of
AWS Systems Manager Parameter Store.

## Connection String Overrides

While the EdFi_Admin database holds information about the available ODS
instances and their connection strings, the Ed-Fi ODS/API also supports overriding the
ODS connection strings for the ODS instances through configuration. Examples of
the applicable configuration formats are shown below (represented here in JSON
format).

### Single-Tenant Configuration

In a single-tenant configuration, the overrides for ODS connection strings can
be defined in the "OdsInstances" section of the configuration, keyed by the
OdsInstanceId (as defined in the EdFi_Admin database). Note that in the example
below, it shows an explicit database segmentation approach based on school year
provided by the API client in the base route of the API.

```json
"OdsInstances": {
  "3": {
    "ConnectionString": "Server=(local); Database=EdFi_Ods_2022; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
    "ContextValueByKey": {
      "schoolYearFromRoute": "2022"
    },
    "ConnectionStringByDerivativeType": {
      "Snapshot": "Server=(local); Database=EdFi_Ods_2022_Snapshot; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;"
    }
  },
  "4": {
    "ConnectionString": "Server=(local); Database=EdFi_Ods_2023; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
    "ContextValueByKey": {
      "schoolYearFromRoute": "2023"
    }
  }
}
```

### Multi-Tenant Configuration

In a multi-tenant configuration, the overrides for ODS connection strings are
defined in an "OdsInstances" section under the "Tenants" section of the
configuration, keyed by tenant-specific OdsInstanceId (as defined in the tenant's
EdFi_Admin database), as follows:

```json
"Tenants": {
  "Tenant1": {
    "ConnectionStrings": {
      "EdFi_Admin": "Server=(local); Database=EdFi_Admin_Tenant1; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
      "EdFi_Security": "Server=(local); Database=EdFi_Security_Tenant1; Encrypt=False; Trusted_Connection=True; Persist Security Info=True; Application Name=EdFi.Ods.WebApi;"
    },
    "OdsInstances": {
      "3": {
        "ConnectionString": "Server=(local); Database=EdFi_Ods_Tenant1_2022; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
        "ContextValueByKey": {
          "schoolYearFromRoute": "2022"
        },
        "ConnectionStringByDerivativeType": {
          "Snapshot": "Server=(local); Database=EdFi_Ods_Tenant1_2022_Snapshot; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;"
        }
      },
      "4": {
        "ConnectionString": "Server=(local); Database=EdFi_Ods_Tenant1_2023; Encrypt=False; Trusted_Connection=True; Application Name=EdFi.Ods.WebApi;",
        "ContextValueByKey": {
          "schoolYearFromRoute": "2023"
        }
      }
    }
  },
  "Tenant2": {
    ...
  }
}
```

## Examples

There are a variety of external configuration providers available and the
concepts and approach should be similar to the examples below. Primarily you must
understand the structure of the configuration values expected by the API (as
documented above), and how to correctly represent these values with the external
configuration source of your choosing so that they integrate correctly into the
logical configuration hierarchy.

### JSON Configuration Files

To add JSON files to the API configuration, include the file alongside the
existing appsettings.json file (ensuring that it is copied to the output directory on build), and modify
the host configuration in the Program.cs file of the EdFi.Ods.WebApi project as follows:

```csharp
var hostBuilder = Host.CreateDefaultBuilder(args)
    .ConfigureLogging(ConfigureLogging)
    .UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureAppConfiguration(c =>
    {
        c.AddJsonFile("appsettings_tenants.json", optional: false, reloadOnChange: true);
    })
    .ConfigureWebHostDefaults(...)
    ...
```

### AWS Systems Manager Parameter Store

To add AWS configuration support to the API, first add the [Amazon.Extensions.Configuration.SystemsManager](https://www.nuget.org/packages/Amazon.Extensions.Configuration.SystemsManager) nuget package to the EdFi.Ods.WebApi project. Then modify the host configuration in the Program.cs file to register this as an additional configuration source (with a 10 minute
refresh period in this example):

```csharp
var hostBuilder = Host.CreateDefaultBuilder(args)
    .ConfigureLogging(ConfigureLogging)
    .UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureAppConfiguration(c =>
    {
        c.AddSystemsManager("/appsettings/tenantsSection", TimeSpan.FromMinutes(10));
    })
    .ConfigureWebHostDefaults(...)
    ...
```

Finally, you'll need to create and maintain the necessary configuration entries
in the AWS Systems Manager Parameter Store. The image below shows the
configuration of secure connection strings for tenant-specific EdFi_Admin, EdFi_Security
and EdFi_ODS databases in a multi-tenant configuration. Note the use of the same
prefix on the individual item names as the first argument passed to the `AddSystemsManager` call in the code sample above.

![AWS Systems Manager](https://edfi.atlassian.net/wiki/download/attachments/25493645/image-2023-11-30_15-1-26.png?version=1&modificationDate=1701378086900&cacheVersion=1&api=v2)

:::info
In order for this code to work, you must perform some initialization of the AWS
SDK so that it has the necessary information to authenticate with your AWS
account. That information is outside the scope of this documentation.
:::


