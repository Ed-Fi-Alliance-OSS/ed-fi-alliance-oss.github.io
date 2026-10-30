---
sidebar_position: 4
---

# Package Releases

The Ed-Fi Alliance publishes a set of Docker images and NuGet packages with each
Ed-Fi API release. Docker images are the primary way to run Ed-Fi API v8; see
[Docker Deployment](./docker-deployment.md) for deployment instructions. The
NuGet packages below provide supporting artifacts, including API schema
packages, client SDKs, database provisioning tools, sample-data templates, and
plugin contract packages, published to the **Ed-Fi AzureFeed**.

## Ed-Fi API v8.1.0 Docker Images

| Image Tag | Purpose | Example |
| --- | --- | --- |
| 8.1.0 | Ed-Fi API container | [edfialliance/ed-fi-api:8.1.0](https://hub.docker.com/layers/edfialliance/ed-fi-api/8.1.0/) |
| 8.1 | Latest patch release of Ed-Fi API 8.1.x | [edfialliance/ed-fi-api:8.1](https://hub.docker.com/layers/edfialliance/ed-fi-api/8.1/) |
| 8.1.0 | Configuration Service container | [edfialliance/ed-fi-api-configuration-service:8.1.0](https://hub.docker.com/layers/edfialliance/ed-fi-api-configuration-service/8.1.0/) |
| 8.1 | Latest patch release of the Configuration Service 8.1.x | [edfialliance/ed-fi-api-configuration-service:8.1](https://hub.docker.com/layers/edfialliance/ed-fi-api-configuration-service/8.1/) |

## Ed-Fi API v8.1.0 Packages

| Package | Purpose | Location |
| --- | --- | --- |
| EdFi.Api | Core Ed-Fi API package | [EdFi.Api 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api/overview/8.1.0) |
| EdFi.Api.ConfigurationService | Configuration Service package | [EdFi.Api.ConfigurationService 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.ConfigurationService/overview/8.1.0) |
| EdFi.Api.SchemaTools | `api-schema-tools` CLI for database provisioning | [EdFi.Api.SchemaTools 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.SchemaTools/overview/8.1.0) |
| EdFi.Api.SecurityMetadataTools | `security-metadata-tools` CLI for converting ODS/API security metadata | [EdFi.Api.SecurityMetadataTools 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.SecurityMetadataTools/overview/8.1.0) |
| EdFi.Api.Sdk.Standard.5.2.0 | Core client SDK for Data Standard 5.2 | [EdFi.Api.Sdk.Standard.5.2.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Sdk.Standard.5.2.0/overview/8.1.0) |
| EdFi.Api.Sdk.Standard.6.1.0 | Core client SDK for Data Standard 6.1 | [EdFi.Api.Sdk.Standard.6.1.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Sdk.Standard.6.1.0/overview/8.1.0) |
| EdFi.Api.Minimal.Template.PostgreSql.5.2.0 | Minimal seed-data template (PostgreSQL), Data Standard 5.2 | [EdFi.Api.Minimal.Template.PostgreSql.5.2.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.PostgreSql.5.2.0/overview/8.1.0) |
| EdFi.Api.Minimal.Template.PostgreSql.6.1.0 | Minimal seed-data template (PostgreSQL), Data Standard 6.1 | [EdFi.Api.Minimal.Template.PostgreSql.6.1.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.PostgreSql.6.1.0/overview/8.1.0) |
| EdFi.Api.Populated.Template.PostgreSql.5.2.0 | Populated sample-data template (PostgreSQL), Data Standard 5.2 | [EdFi.Api.Populated.Template.PostgreSql.5.2.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.PostgreSql.5.2.0/overview/8.1.0) |
| EdFi.Api.Populated.Template.PostgreSql.6.1.0 | Populated sample-data template (PostgreSQL), Data Standard 6.1 | [EdFi.Api.Populated.Template.PostgreSql.6.1.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.PostgreSql.6.1.0/overview/8.1.0) |
| EdFi.Api.Minimal.Template.MsSql.5.2.0 | Minimal seed-data template (SQL Server), Data Standard 5.2 | [EdFi.Api.Minimal.Template.MsSql.5.2.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.MsSql.5.2.0/overview/8.1.0) |
| EdFi.Api.Minimal.Template.MsSql.6.1.0 | Minimal seed-data template (SQL Server), Data Standard 6.1 | [EdFi.Api.Minimal.Template.MsSql.6.1.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.MsSql.6.1.0/overview/8.1.0) |
| EdFi.Api.Populated.Template.MsSql.5.2.0 | Populated sample-data template (SQL Server), Data Standard 5.2 | [EdFi.Api.Populated.Template.MsSql.5.2.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.MsSql.5.2.0/overview/8.1.0) |
| EdFi.Api.Populated.Template.MsSql.6.1.0 | Populated sample-data template (SQL Server), Data Standard 6.1 | [EdFi.Api.Populated.Template.MsSql.6.1.0 8.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.MsSql.6.1.0/overview/8.1.0) |

## Ed-Fi API v8.1.0 Plugin Contract Packages

Plugins are built against these contract packages. Each contract has its own
version, which changes only when the contract changes. See
[Plugins](../platform-dev-guide/extensibility-customization/plugins.md) for
details.

| Package | Purpose | Location |
| --- | --- | --- |
| EdFi.Api.Plugins | Plugin contract for Ed-Fi API and Configuration Service plugins | [EdFi.Api.Plugins 1.1.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Plugins/overview/1.1.0) |
| EdFi.Api.CustomValidation | Contract for custom validator plugins | [EdFi.Api.CustomValidation 1.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.CustomValidation/overview/1.0.0) |
| EdFi.Api.Identity | Contract for identity system plugins used by the Identities API | [EdFi.Api.Identity 1.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Identity/overview/1.0.0) |
| EdFi.Api.Secrets | Contract for secrets plugins used to resolve connection string secrets | [EdFi.Api.Secrets 1.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Secrets/overview/1.0.0) |

## Ed-Fi API v8.1.0 Schema Packages

The API schema for each supported Data Standard is published as a separate
package. Each contains the core `ApiSchema.json` that the Ed-Fi API loads at
startup.

| Package | Data Standard | Location |
| --- | --- | --- |
| EdFi.DataStandard52.ApiSchema | 5.2.0 | [EdFi.DataStandard52.ApiSchema 1.0.335](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.DataStandard52.ApiSchema/overview/1.0.335) |
| EdFi.DataStandard61.ApiSchema | 6.1.0 | [EdFi.DataStandard61.ApiSchema 1.0.335](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.DataStandard61.ApiSchema/overview/1.0.335) |
