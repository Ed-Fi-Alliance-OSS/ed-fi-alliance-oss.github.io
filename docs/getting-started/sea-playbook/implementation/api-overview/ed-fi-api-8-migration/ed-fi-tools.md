---
sidebar_position: 10
---

# Ed-Fi Tools

Which Ed-Fi tools you can keep using with Ed-Fi API v8, and what replaces the ones you can't. For support dates, see [Supported Versions](/reference/roadmap/supported-versions).

| Tool | With Ed-Fi API v8 | What to do |
| --- | --- | --- |
| [Admin App](/reference/admin-app) | Works from version 4.1 | Move to Admin App v4 before you migrate if you use an earlier Admin App, and use 4.1 or later with Ed-Fi API v8. |
| [Admin API](/reference/admin-api) | Replaced by the Configuration Service | Update scripts and tools to the Configuration Service `/v3` routes. See [Admin Data and Credentials](./admin-data-and-credentials.md). |
| [API Publisher](/reference/api-publisher) | Works | Use it to copy data between data stores on the same Data Standard version. |
| [Bulk Load Client](/reference/ed-fi-api/8/platform-dev-guide/utilities/bulk-load-client-utility) | Works | Set the token URL with `--oauthurl`. See [Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md). |
| [Data Import](/getting-started/community-tools/technology/data-import) | Out of support; not tested with Ed-Fi API v8 | Find an alternative import tool, or convert files to Ed-Fi XML and use the Bulk Load Client. |
| Analytics Middle Tier | Does not work; out of support ([notice](/reference/roadmap/notifications/amt)) | Move the reports built on it. See below. |
| Sandbox Administration Portal | Not available in Ed-Fi API v8.0 | Create test credentials through the Configuration Service. |
| OneRoster | Not available in Ed-Fi API v8.0 | Keep OneRoster on the ODS/API for now. |
| Swagger UI | Available | Start with `-EnableSwaggerUI`. |

## Moving off Analytics Middle Tier

Analytics Middle Tier (AMT) provided database views over the ODS tables for reporting. Those views depend on the ODS table structure, which Ed-Fi API v8 does not have.

Before, reports queried AMT views in the ODS database. Now, choose one of the routes on [Data Out](./data-out.md):

- Read through the API or Change Queries into a reporting database or warehouse that you own, and rebuild the reports there.
- Rewrite the report queries against the Ed-Fi API v8 tables.

The first route is the one the Ed-Fi Alliance encourages, and it also takes reporting load off the transactional database.

## Moving off Data Import

Data Import mapped district files (often CSV) to the Ed-Fi API. It is out of support and has not been tested with Ed-Fi API v8. Before, a district uploaded a file and Data Import posted it to the API. Now:

- Use another import tool that writes to the Ed-Fi API, or
- Convert the files to Ed-Fi XML interchange format and load them with the Bulk Load Client.

:::info[Still being worked out]

- **A replacement for Analytics Middle Tier.** There is no direct replacement yet.
- **Data Import with Ed-Fi API v8.** The Ed-Fi Alliance may test it. Until then, plan for an alternative.

:::
