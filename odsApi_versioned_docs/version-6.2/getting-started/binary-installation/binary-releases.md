---
sidebar_position: 5
---

# Binary Releases

The Ed-Fi Alliance publishes a set of .NET binaries and databases with each ODS
/ API release. These binaries can be used to deploy a non-extended version of
the Ed-Fi ODS / API that has the as-shipped database model. The binaries are
useful for system integrators and others wanting to deploy a
"core-data-model-only" ODS / API quickly and easily. See [Getting Started -](./readme.md)
[Binary Installation](./readme.md) for details.

The following binaries are published to the **Ed-Fi AzureFeed**. We recommend
you to stay current with the latest patch update that has been promoted
to [release](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=feed&feed=EdFi%40Release).
The "Patch Updates" column here will be tagged with latest patch date when there
is a patch release:

| Binary                                           | Purpose                                                                                     | Location                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Patch Updates |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| EdFi.Ods.SwaggerUI | Binary for ODS / API Swagger Online documentation | [EdFi.Suite3.Ods.SwaggerUI 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.SwaggerUI/overview/6.2.2456) |     |
| EdFi.ODS.AdminApp.Web | Binary for Admin App | [EdFi.Suite3.ODS.AdminApp.Web 3.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.ODS.AdminApp.Web/overview/3.0.0) |     |
| EdFi.Ods.SandboxAdmin | Binary for Sandbox Admin App | [EdFi.Suite3.Ods.SandboxAdmin 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.SandboxAdmin/overview/6.2.2456) |     |
| EdFi.Ods.WebApi | Binary for ODS REST APIs | [EdFi.Suite3.Ods.WebApi 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi/overview/6.2.2456) |     |
| EdFi.OdsApi.Sdk | Binary for ODS / API SDK | [EdFi.Suite3.OdsApi.Sdk 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.OdsApi.Sdk/overview/6.2.2456) |     |
| EdFi.RestApi.Databases | Binary for ODS / API database scripts | [EdFi.Suite3.RestApi.Databases 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.RestApi.Databases/overview/6.2.2456) |     |
| EdFi.Ods.Populated.Template | SQL Server Populated Template database backup | [EdFi.Suite3.Ods.Populated.Template 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Populated.Template/overview/6.2.828) |     |
| EdFi.Ods.Populated.Template.TPDM.Core | SQL Server Populated Template database backup with TPDM core sample data | [EdFi.Suite3.Ods.Populated.Template.TPDM.Core 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Populated.Template.TPDM.Core/overview/6.2.672) |     |
| EdFi.Ods.Minimal.Template | SQL Server Minimal Template database backup (contains ed-fi core descriptors) | [EdFi.Suite3.Ods.Minimal.Template 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Minimal.Template/overview/6.2.860) |     |
| EdFi.Ods.Minimal.Template.TPDM.Core | SQL Server Minimal Template database backup (contains ed-fi core and TPDM core descriptors) | [EdFi.Suite3.Ods.Minimal.Template.TPDM.Core 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Minimal.Template.TPDM.Core/overview/6.2.678) |     |
| EdFi.Ods.Populated.Template.PostgreSQL | PostgreSQL Populated Template database backup | [EdFi.Suite3.Ods.Populated.Template.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Populated.Template.PostgreSQL/overview/6.2.828) |     |
| EdFi.Ods.Populated.Template.TPDM.Core.PostgreSQL | PostgreSQL Populated Template database backup with TPDM core sample data | [EdFi.Suite3.Ods.Populated.Template.TPDM.Core.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Populated.Template.TPDM.Core.PostgreSQL/overview/6.2.669) |     |
| EdFi.Ods.Minimal.Template.PostgreSQL | PostgreSQL Minimal Template database backup (contains ed-fi core descriptors) | [EdFi.Suite3.Ods.Minimal.Template.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Minimal.Template.PostgreSQL/overview/6.2.860) |     |
| EdFi.Ods.Minimal.Template.TPDM.Core.PostgreSQL | PostgreSQL Minimal Template database backup (contains ed-fi core and TPDM core descriptors) | [EdFi.Suite3.Ods.Minimal.Template.TPDM.Core.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.Minimal.Template.TPDM.Core.PostgreSQL/overview/6.2.683) |     |
| EdFi.Database.Admin | Admin database backup | [EdFi.Database.Admin 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Database.Admin/overview/6.2.469) |     |
| EdFi.Database.Admin.PostgreSQL | Admin database backup | [EdFi.Database.Admin.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Database.Admin.PostgreSQL/overview/6.2.469) |     |
| EdFi.Database.Security | Security database backup | [EdFi.Database.Security 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Database.Security/overview/6.2.502) |     |
| EdFi.Database.Security.PostgreSQL | Security database backup | [EdFi.Database.Security.PostgreSQL 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Database.Security.PostgreSQL/overview/6.2.502) |     |
| EdFi.Ods.CodeGen.Console | Binary for Code Generation | [EdFi.Suite3.Ods.CodeGen 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.CodeGen/overview/6.2.2656) |     |
| EdFi.Ods.Extensions.TPDM.Core | TPDM Core Extension Plugin | [EdFi.Suite3.Ods.Extensions.TPDM.Core.1.1.0 6.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.CodeGen/overview/6.2.2656) |     |