---
sidebar_position: 4
---

# Package Releases

The Ed-Fi Alliance publishes a set of Docker images and NuGet packages with each
Ed-Fi API release. Docker images are the primary way to run Ed-Fi API v8; see
[Docker Deployment](./docker-deployment.md) for deployment instructions. The
NuGet packages below provide supporting artifacts, including client SDKs,
database provisioning tools, and sample-data templates, published to the
**Ed-Fi AzureFeed**.

## Ed-Fi API v8.0.0 Docker Images

| Image Tag | Purpose | Example |
| --- | --- | --- |
| 8.0.0 | Ed-Fi API container | [edfialliance/ed-fi-api:8.0.0](https://hub.docker.com/layers/edfialliance/ed-fi-api/8.0.0/) |
| 8.0 | Latest patch release of Ed-Fi API 8.0.x | [edfialliance/ed-fi-api:8.0](https://hub.docker.com/layers/edfialliance/ed-fi-api/8.0/) |
| 8.0.0 | Configuration Service container | [edfialliance/ed-fi-api-configuration-service:8.0.0](https://hub.docker.com/layers/edfialliance/ed-fi-api-configuration-service/8.0.0/) |
| 8.0 | Latest patch release of the Configuration Service 8.0.x | [edfialliance/ed-fi-api-configuration-service:8.0](https://hub.docker.com/layers/edfialliance/ed-fi-api-configuration-service/8.0/) |

## Ed-Fi API v8.0.0 Packages

| Package | Purpose | Location |
| --- | --- | --- |
| EdFi.Api | Core Ed-Fi API package | [EdFi.Api 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api/overview/8.0.0) |
| EdFi.Api.ConfigurationService | Configuration Service package | [EdFi.Api.ConfigurationService 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.ConfigurationService/overview/8.0.0) |
| EdFi.Api.SchemaTools | `api-schema-tools` CLI for database provisioning | [EdFi.Api.SchemaTools 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.SchemaTools/overview/8.0.0) |
| EdFi.Api.Sdk.Standard.5.2.0 | Core client SDK for Data Standard 5.2 | [EdFi.Api.Sdk.Standard.5.2.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Sdk.Standard.5.2.0/overview/8.0.0) |
| EdFi.Api.Sdk.Standard.6.1.0 | Core client SDK for Data Standard 6.1 | [EdFi.Api.Sdk.Standard.6.1.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Sdk.Standard.6.1.0/overview/8.0.0) |
| EdFi.Api.Minimal.Template.PostgreSql.5.2.0 | Minimal seed-data template (PostgreSQL), Data Standard 5.2 | [EdFi.Api.Minimal.Template.PostgreSql.5.2.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.PostgreSql.5.2.0/overview/8.0.0) |
| EdFi.Api.Minimal.Template.PostgreSql.6.1.0 | Minimal seed-data template (PostgreSQL), Data Standard 6.1 | [EdFi.Api.Minimal.Template.PostgreSql.6.1.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Minimal.Template.PostgreSql.6.1.0/overview/8.0.0) |
| EdFi.Api.Populated.Template.PostgreSql.5.2.0 | Populated sample-data template (PostgreSQL), Data Standard 5.2 | [EdFi.Api.Populated.Template.PostgreSql.5.2.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.PostgreSql.5.2.0/overview/8.0.0) |
| EdFi.Api.Populated.Template.PostgreSql.6.1.0 | Populated sample-data template (PostgreSQL), Data Standard 6.1 | [EdFi.Api.Populated.Template.PostgreSql.6.1.0 8.0.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Api.Populated.Template.PostgreSql.6.1.0/overview/8.0.0) |
