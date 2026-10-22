---
sidebar_position: 9
---

# School Years and Cutover

## Timeline

- Ed-Fi API v8.0 targets the 2027–2028 school year.
- The ODS/API is supported through the 2028–2029 school year.
- The Ed-Fi Alliance plans to fully replace the ODS/API with Ed-Fi API v8 by the 2029–2030 school year.

See [Supported Versions](/reference/roadmap/supported-versions) and the [Ed-Fi ODS/API and Ed-Fi API v8 FAQ](/reference/roadmap/api-faq).

## Data Standard version

Ed-Fi API v8 supports Data Standard 5.2 and 6.1. It can technically run Data Standard 4, but the Ed-Fi Alliance will not support that. Plan to move to 5.2 or later as part of the migration. Check [Supported Versions](/reference/roadmap/supported-versions) for how long each Data Standard version is supported before you choose.

Your SIS and assessment vendors must support the Data Standard version you choose before your first school year on Ed-Fi API v8. Give them at least a year's notice.

## The main decision: what happens to prior years

Most states run at least two school years at once. When your first school year goes live on Ed-Fi API v8, you choose between:

| Option | What it means | When it fits |
| --- | --- | --- |
| **Run side by side** | The new school year runs on Ed-Fi API v8. Prior years stay on the ODS/API until they are no longer needed. | Prior years are on Data Standard 4, or you want the least risk at cutover |
| **Move everything** | Prior years are reloaded into Ed-Fi API v8 too, and the ODS/API is retired. | Prior years are already on the same Data Standard version as your Ed-Fi API v8 |

Before, moving a year meant copying or restoring an ODS database. Now there is no in-place migration: a prior year has to be reloaded through the API. [API Publisher](/reference/api-publisher) works with both the ODS/API and Ed-Fi API v8, so it can copy a year from one to the other, but only when both use the same Data Standard version.

If a prior year is on Data Standard 4, keep it on the ODS/API. Converting prior-year data to a new Data Standard version is not covered by this guide.

## Example: year-specific routes

Before, on the ODS/API with context-based routing:

```text
https://api.your-state.gov/2026/data/v3/ed-fi/schools
```

Now, on Ed-Fi API v8 with route qualifiers:

```text
https://api.your-state.gov/api/2027/data/ed-fi/schools
```

See [Context-Based Routing for Year-Specific Data Store](/reference/ed-fi-api/8/platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore).

## Planning the cutover

- **Timing.** Go live at the start of a school year, outside your collection and reporting windows. Many states freeze API changes months before the school year so vendors can prepare; work back from that date.
- **Vendors.** Each vendor needs the new URLs, new credentials and support for your Data Standard version before go-live. See [API Differences for Client Applications](./api-differences-for-client-applications.md).
- **Downstream systems.** Anything that reads ODS data must be switched over and fully reloaded. See [Data Out](./data-out.md).
- **Reconciliation.** For any year you move, compare record counts by resource between the ODS/API and Ed-Fi API v8 before you switch clients over.
- **Rollback.** Keep the ODS/API running, with vendors' existing credentials still active, until the new year is stable. Rolling back means pointing clients back at the ODS/API.

:::info[Still being worked out]

- **Reconciliation tooling.** There is no Ed-Fi tool yet for comparing an ODS/API year with an Ed-Fi API v8 data store.
- **Rollback after writes.** If vendors have already written to Ed-Fi API v8 when you roll back, those writes are not on the ODS/API. We do not yet have a recommended way to handle this.

:::
