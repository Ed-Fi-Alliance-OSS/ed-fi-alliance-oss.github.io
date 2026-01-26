---
title: Instance-Year-Specific ODS Configuration
---

# Instance-Year-Specific ODS Configuration

:::warning
This feature is experimental (and community contributed)
:::

SaaS providers that offer managed Ed-Fi ODS / API may find it useful to partition by customers using an ****Instance Identifier** and the **School Year**; this way each Instance/Year combination gets a separate database providing the following benefits:

### **Isolation**

Data is isolated by Instance and by Year so the data will not leak between multiple Instances nor Years. API security and client access setup is isolated by Instance. 

### **Data archival**

This strategy allows archival/deletion of the data for a customer (single or multiple Years) when they no longer require access to it.

### **Scaling**

When combined with multi-server deployment (one server per Instance), each set of databases can be scaled (CPU/RAM/etc.) individually.

## Configuration

![Instance-Year-Specific Configuration Diagram](https://edfi.atlassian.net/wiki/plugins/servlet/confluence/placeholder/unknown-macro?name=drawio&locale=en_US&version=2)

## Routing

When enabled, the base URI follows /{api_area}/{version}/**{instance}/{year}** pattern. 'Instance' must match the regex **`^[A-Za-z0-9-]+$`** (i.e. alphanumerics and dashes, a GUID for example). See [API Routes](https://edfi.atlassian.net/wiki/display/ODSAPIS3V53/API+Routes) for details.

## How to enable

The ODS / API can be configured for instance-year-specific configuration through the following steps:

* Update ApiSettings:Mode key in the appsettings.json of the EdFi.Ods.WebApi project to: `"Mode": "InstanceYearSpecific"`

* Within `EdFi_Ods` connection string, add the `{0}` template string to the database name which will be replaced at runtime with the appropriate Instance and Year, for example:

```
server=(local);trusted_connection=True;database=EdFi_{0};Application Name=EdFi.Ods.WebApi
```

Assuming that Instance = my-instance and Year = 2021 in the request URL, database name will get translated to EdFi_Ods_my-instance_2021 at runtime.

* Within `EdFi_Admin` connection string, add the `{0}` template string to the database name, for example:

```
server=(local);trusted_connection=True;database=EdFi_{0};Application Name=EdFi.Ods.WebApi
```

Assuming that Instance = my-instance and Year = 2021 in the request URL, database name will get translated to EdFi_Admin_my-instance at runtime. Notice that the Admin DB is not partitioned by Year.

* Within `EdFi_Security` connection string, add the `{0}` template string to the database name, for example:

```
server=(local);trusted_connection=True;database=EdFi_{0};Application Name=EdFi.Ods.WebApi
```

Assuming that Instance = my-instance and Year = 2021 in the request URL, database name will get translated to EdFi_Security_my-instance at runtime. Notice that the Security DB is not partitioned by Year.

## Limitations

* There is no database deployment support for this strategy yet. So initdev will not create databases with the corresponding database names.
* Since only the database name is interpolated in the connection strings, the databases must reside in the same server.
* SwaggerUI is not available yet for this strategy. See [ODS-4978](https://tracker.ed-fi.org/browse/ODS-4978) for details.

See the [Extensibility & Customization](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774339/Platform+Dev+Guide+-+Extensibility+Customization) section for information on using Instance-Year-Specific configuration as a facet of a partitioning strategy.

