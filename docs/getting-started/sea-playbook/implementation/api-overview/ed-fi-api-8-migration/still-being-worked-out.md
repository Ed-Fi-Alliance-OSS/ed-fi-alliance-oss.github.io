---
sidebar_position: 11
---

# Still Being Worked Out

Parts of the move from the ODS/API to Ed-Fi API v8 are not settled. This page lists them in one place. If your state has experience, a workaround or a strong view on any of them, tell us through the [Ed-Fi Community](/community). Your input shapes what we publish next.

## Deployment

- **PowerShell deployment without Docker.** A PowerShell deployment script is planned for 2027, for states that cannot run containers. ([Deployment](./deployment.md))
- **Taking new releases.** How a state pulls a new Ed-Fi API release into its clone, and whether to keep all local changes inside the state's own `eng/` folder. ([Deployment](./deployment.md))
- **File formats across releases.** Whether a new release could change the format of the files a state keeps (claims JSON, ApiSchema output). ([Deployment](./deployment.md))

## Admin data and credentials

- **Carrying keys and secrets across.** There is no supported way yet to keep vendors' existing keys and secrets. Plan for new credentials. ([Admin Data and Credentials](./admin-data-and-credentials.md))
- **Scripts to migrate `EdFi_Admin` and `EdFi_Security`.** Planned for a later date. ([Admin Data and Credentials](./admin-data-and-credentials.md))
- **Ownership of reloaded data.** How to give vendors ownership of records reloaded through the API. ([Admin Data and Credentials](./admin-data-and-credentials.md))

## Extensions and seed data

- **Loading extension claims in production.** A recommended production setup for states with extensions. ([Extensions](./extensions.md))
- **Extension build errors.** Some extensions that build in MetaEd have failed at startup. ([Extensions](./extensions.md))
- **Converting SQL seed scripts to XML or JSON.** No conversion tool yet. ([Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md))
- **Rollover on a running production system.** Tested steps not yet published. ([Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md))

## Data

- **Relational data model documentation.** The reference page is still being written. ([Data Out](./data-out.md))
- **Creating and refreshing snapshots.** Recommended steps for the snapshot databases that 8.1 serves. ([Data Out](./data-out.md))
- **Files from districts without an Ed-Fi SIS.** A recommended replacement for loading these files with SQL or SSIS. ([Data In](./data-in.md))
- **Patterns for direct writes.** Recommended replacements for each common way states write directly to the ODS. ([Data In](./data-in.md))
- **Rewriting identity and validation code as plugins.** Checking that the 8.1 plugins cover what states' ODS/API customizations do. ([Data In](./data-in.md))

## Cutover

- **Vendor test environments.** A recommended approach for vendors to test before cutover. ([API Differences for Client Applications](./api-differences-for-client-applications.md))
- **Reconciliation tooling.** No Ed-Fi tool yet for comparing an ODS/API year with an Ed-Fi API v8 data store. ([School Years and Cutover](./school-years-and-cutover.md))
- **Rollback after writes.** How to handle data written to Ed-Fi API v8 before a rollback. ([School Years and Cutover](./school-years-and-cutover.md))

## Tools

- **A replacement for Analytics Middle Tier.** ([Ed-Fi Tools](./ed-fi-tools.md))
- **Data Import with Ed-Fi API v8.** Not tested yet. ([Ed-Fi Tools](./ed-fi-tools.md))
- **Features not in Ed-Fi API v8.** OneRoster is planned for 8.2. The Sandbox Administration Portal is not planned. See [Feature Availability](/reference/ed-fi-api/8/whats-new/release-notes#feature-availability).
