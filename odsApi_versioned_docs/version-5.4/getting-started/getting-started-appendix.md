---
title: Getting Started - Appendix
sidebar_position: 3
---

# Getting Started - Appendix

## Ed-Fi ODS / API Database Overview

The Ed-Fi ODS / API uses several databases for various aspects of the application and to store data for each sandbox. The table below summarizes the databases with a brief statement of the creation method and purpose.

| Database | Method | Purpose |
|---------|---------|---------|
| EdFi_Ods_Empty | SQL Scripts | An empty database used for code generation when building the solution. |
| EdFi_Ods_Minimal_Template | SQL Scripts | A template database used to create empty sandboxes. |
| EdFi_Ods_Populated_Template | SQL Backup | A template database populated with sample data used to create sample data sandboxes. |
| EdFi_Admin | SQL Scripts | A database containing administration configuration information specific to the ODS / API. |
| EdFi_Security | SQL Scripts | A database containing security configuration information. |

In addition to these databases, copies of either the minimal or populated template databases are made for each sandbox in the environment.

## Ed-Fi ODS / API Features 

The Ed-Fi ODS / API comes with a set of configurable features that can be enabled or disabled using configuration settings in deployed API. See the [Configuration Details](../platform-dev-guide/configuration/configuration-details.mdx) section for more details on these settings.

| Feature | Is Enabled by Default | Description |
|---------|---------|---------|
| changeQueries | true | The [Changed Record Queries](../platform-dev-guide/features/changed-record-queries.md) feature can be enabled or disabled via configuration. Database configuration remains a separate step, see [Using the Changed Record Queries](../client-developers-guide/using-the-changed-record-queries.md). |
| openApiMetadata | true | The metadata API endpoint used by Swagger UI can be enabled or disabled via configuration. It is recommend for Production deployments to disable this. |
| composites | true | The [Composites](../platform-dev-guide/extensibility-customization/api-composite-resources.md) API endpoints can be enabled or disabled via configuration. This includes the default Enrollments composite and any custom composites that have been added to the platform. |
| profiles | true | The [Profiles](../platform-dev-guide/security/api-profiles.md) feature can be enabled or disabled via configuration. |
| identityManagement | false | Enables the [Identity API](../technical-articles/identities-api.md) endpoints. |
| extensions | true | Enables the API endpoints created for all [Extensions](../platform-dev-guide/extensibility-customization/extending-the-ods-api-data-model.md). Installations can be extended by modifying source code; see [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transportation-example.md). |
| tokenInfo | true | Enables oauth [token_info](https://tools.ietf.org/html/rfc7662#section-2) introspective endpoint which provides the additional security configuration information for the token. |

## Ed-Fi ODS / API Cloud Binary Features 

The Ed-Fi ODS / API cloud binary release focuses on the district use cases and comes with a limited set of features but enables these features for both SQL Server and PostgreSQL.

| Feature | Is Enabled by Default | Description |
|---------|---------|---------|
| changeQueries | true | The [Changed Record Queries](../platform-dev-guide/features/changed-record-queries.md) feature can be enabled or disabled via configuration. Database configuration remains a separate step, see [Using the Changed Record Queries](../client-developers-guide/using-the-changed-record-queries.md). |
| openApiMetadata | true | The metadata API endpoint used by Swagger UI can be enabled or disabled via configuration. It is recommend for Production deployments to disable this. |
| composites | true | The [Composites](../platform-dev-guide/extensibility-customization/api-composite-resources.md) API endpoints can be enabled or disabled via configuration. In the cloud binary release, this affects only the built-in Enrollments composite. |
| extensions | true | Enables the API endpoints created for selected Ed-Fi backed domain extensions (e.g., TPDM). An installation that doesn't desire these extensions can disable this feature in production. |
| tokenInfo | true | Enables oauth [token_info](https://tools.ietf.org/html/rfc7662#section-2) introspective endpoint which provides the additional security configuration information for the token. |
