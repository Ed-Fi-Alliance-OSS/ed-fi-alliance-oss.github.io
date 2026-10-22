---
sidebar_position: 1
sidebar_label: Ed-Fi API 8 Migration
---

# Migrating from the Ed-Fi ODS/API to Ed-Fi API v8

This section is for state education agency (SEA) technical leads and implementers who run their own Ed-Fi ODS/API and are planning the move to Ed-Fi API v8.

Each page takes one part of your current setup and shows what you did on the ODS/API, what you do on Ed-Fi API v8, and an example. Background detail stays in the [Ed-Fi API v8 reference](/reference/ed-fi-api/8/getting-started); these pages link to it rather than repeat it.

:::note[Earlier names]

During development, Ed-Fi API v8 was called the Data Management Service (DMS), and the Configuration Service was the DMS Configuration Service (CMS). You will still see those names in source code and older material.

:::

## Before you start

- **There is no in-place database migration.** The Ed-Fi API v8 database is structured differently from the ODS. Data is reloaded through the Ed-Fi API. See [No In-Place Database Migration](/reference/ed-fi-api/8/whats-new/release-notes#no-in-place-database-migration).
- **Plan to move to Data Standard 5.2 or later.** Ed-Fi API v8 can run Data Standard 4, but the Ed-Fi Alliance will not support it. Your SIS and assessment vendors need to support the new Data Standard version before your first school year on Ed-Fi API v8.
- **Deployment is Docker today.** PowerShell-based install scripts are planned for Ed-Fi API v8. See [Deployment](./deployment.md).
- **Move to the Admin API or Admin App v4 first** if you manage vendors, applications and claimsets any other way today. See [Admin Data and Credentials](./admin-data-and-credentials.md).
- **Check the feature list.** Some ODS/API features are not in Ed-Fi API v8.0. See [Feature Availability](/reference/ed-fi-api/8/whats-new/release-notes#feature-availability).

## Pages in this section

| Page | What changes |
| --- | --- |
| [Deployment](./deployment.md) | IIS, binary installer or source build → Docker Compose |
| [Admin Data and Credentials](./admin-data-and-credentials.md) | Admin API, Admin App or SQL into `EdFi_Admin` and `EdFi_Security` → Configuration Service or Admin App 4.1 |
| [Data Out](./data-out.md) | SQL against ODS tables → the API, Change Queries or rewritten SQL |
| [Extensions](./extensions.md) | Extension projects → MetaEd ApiSchema workflow |
| [Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md) | SQL scripts → XML seed data |
| [Data In](./data-in.md) | Direct SQL writes → the API |
| [API Differences for Client Applications](./api-differences-for-client-applications.md) | URL paths, token endpoint, case-sensitive property names |
| [School Years and Cutover](./school-years-and-cutover.md) | Running ODS/API and Ed-Fi API v8 side by side, or moving everything |
| [Ed-Fi Tools](./ed-fi-tools.md) | Which Ed-Fi tools work with Ed-Fi API v8 |
| [Still Being Figured Out](./still-being-figured-out.md) | Open questions where we want community input |

## Still being figured out

Parts of this migration are not settled yet. Each page marks them in a **Still being worked out** box, and the [Still Being Figured Out](./still-being-figured-out.md) page collects them in one place. If you have experience or opinions on any of them, tell us through the [Ed-Fi Community](/community).
