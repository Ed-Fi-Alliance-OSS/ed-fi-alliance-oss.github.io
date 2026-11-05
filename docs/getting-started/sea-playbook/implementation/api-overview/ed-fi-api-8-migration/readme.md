---
sidebar_position: 1
sidebar_label: Ed-Fi API 8 Migration
---

# Migrating from the Ed-Fi ODS/API to Ed-Fi API v8

This section is for state education agency (SEA) technical leads and implementers who run their own Ed-Fi ODS/API and are planning the move to Ed-Fi API v8.

These pages describe Ed-Fi API 8.1, the release intended for production use from the 2027–2028 school year. If you are piloting 8.0, plan to upgrade to 8.1 and expect to re-provision your databases when you do (see the [Ed-Fi ODS/API and Ed-Fi API v8 FAQ](/reference/roadmap/api-faq)).

Each page takes one part of your current setup and shows what you did on the ODS/API, what you do on Ed-Fi API v8, and an example. Background detail stays in the [Ed-Fi API v8 reference](/reference/ed-fi-api/8/getting-started); these pages link to it rather than repeat it.

:::note[Earlier names]

During development, Ed-Fi API v8 was called the Data Management Service (DMS), and the Configuration Service was the DMS Configuration Service (CMS). You will still see those names in source code and older material.

:::

## Before you start

- **There is no in-place database migration.** The Ed-Fi API v8 database is structured differently from the ODS. Data is reloaded through the Ed-Fi API. See [No In-Place Database Migration](/reference/ed-fi-api/8/whats-new/release-notes#no-in-place-database-migration).
- **Plan to move to Data Standard 5.2 or later.** Ed-Fi API v8 can run Data Standard 4, but the Ed-Fi Alliance will not support it. Your SIS and assessment vendors need to support the new Data Standard version before your first school year on Ed-Fi API v8.
- **Docker is the only supported deployment today.** PowerShell scripts that install Ed-Fi API v8 without Docker, on a server or virtual machine, are planned for 2027. See [Deployment](./deployment.md).
- **Any change to your extensions or Data Standard version needs a fresh database.** Adding, removing or changing an extension, or upgrading the Data Standard, means provisioning a new database and reloading data through the API. Plan these changes for the start of a school year. See [Plan for extension changes](./extensions.md#plan-for-extension-changes).
- **Move to the Admin API or Admin App v4 first** if you manage vendors, applications and claimsets any other way today. See [Admin Data and Credentials](./admin-data-and-credentials.md).
- **Check the feature list.** A few ODS/API features are not in Ed-Fi API v8: OneRoster is planned for 8.2, and the Sandbox Administration Portal is not coming back. See [Feature Availability](/reference/ed-fi-api/8/whats-new/release-notes#feature-availability).

## Migration steps

A typical migration runs in this order. Each step links to the page that covers it and names a typical owner. Adjust the owners to how your agency is organized.

1. **Assess.** Read "Before you start", choose your Data Standard version and first school year on Ed-Fi API v8, and tell your vendors. See [School Years and Cutover](./school-years-and-cutover.md). **Owner:** SEA project lead.
2. **Inventory.** List everything that reads from or writes to the ODS directly, your extensions, your custom claimsets, and the Ed-Fi tools you use. See [Data Out](./data-out.md), [Data In](./data-in.md), [Extensions](./extensions.md) and [Ed-Fi Tools](./ed-fi-tools.md). **Owner:** SEA technical lead, with the data and reporting teams.
3. **Move admin work to the Admin API or Admin App v4.** See [Admin Data and Credentials](./admin-data-and-credentials.md). **Owner:** Ed-Fi administrator (whoever manages vendors and credentials).
4. **Build the Ed-Fi API v8 environment.** Deploy it, rebuild your extensions and their claims, and load seed data. See [Deployment](./deployment.md), [Extensions](./extensions.md) and [Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md). **Owner:** SEA technical or infrastructure team.
5. **Rewrite what reads and writes the database directly.** See [Data Out](./data-out.md) and [Data In](./data-in.md). **Owner:** The teams that own each report, ETL job or integration.
6. **Test with vendors.** Give them new credentials and URLs, and have them check property-name casing. See [API Differences for Client Applications](./api-differences-for-client-applications.md). **Owner:** Vendor support or vendor liaison, with vendors.
7. **Cut over.** Go live with the new school year and, if you are moving everything, reload prior years. See [School Years and Cutover](./school-years-and-cutover.md). **Owner:** SEA project lead, with the technical team.
8. **Retire the ODS/API** once no school year you still need runs on it. **Owner:** SEA technical team.

## Pages in this section

| Page | What changes |
| --- | --- |
| [Deployment](./deployment.md) | IIS, binary installer or source build → Docker Compose |
| [Admin Data and Credentials](./admin-data-and-credentials.md) | Admin API, Admin App or SQL into `EdFi_Admin` and `EdFi_Security` → Configuration Service or Admin App 4.1 |
| [Extensions](./extensions.md) | Extension projects → MetaEd ApiSchema workflow |
| [Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md) | SQL scripts → XML seed data |
| [Data Out](./data-out.md) | SQL against ODS tables → the API, Change Queries or rewritten SQL |
| [Data In](./data-in.md) | Direct SQL writes → the API |
| [API Differences for Client Applications](./api-differences-for-client-applications.md) | URL paths, token endpoint, case-sensitive property names |
| [School Years and Cutover](./school-years-and-cutover.md) | Running ODS/API and Ed-Fi API v8 side by side, or moving everything |
| [Ed-Fi Tools](./ed-fi-tools.md) | Which Ed-Fi tools work with Ed-Fi API v8 |
| [Still Being Worked Out](./still-being-worked-out.md) | Open questions where we want community input |

## Still being worked out

Parts of this migration are not settled yet. Each page marks them in a **Still being worked out** box, and the [Still Being Worked Out](./still-being-worked-out.md) page collects them in one place. If you have experience or opinions on any of them, tell us through the [Ed-Fi Community](/community).
