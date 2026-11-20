# Ed-Fi API v8 Documentation Plan

**Target path:** `odsApi_versioned_docs/version-8/`. One folder covers the
whole v8 line; there is no separate folder for each minor release.
**Epic:** DMS-1629 (Ed-Fi API v8.1 documentation). 8.1 work merges to the
`ed-fi-api-v81` branch.
**Checked against:** DMS tag `v8.1.0`.
**Last updated:** 2026-11-06

## Status

- **v8.0:** Published.
- **v8.1:** Written and checked against the `v8.1.0` tag (DMS-1674). Three
  pages remain placeholders with an expected date of December 15, 2026: the
  DocumentCache, Event Streaming with Kafka, and the bulk load walkthrough.
  See [Remaining Work](#remaining-work).

---

## Writing Conventions

These rules apply to every page in `version-8/`.

- **Style baseline:** Match the equivalent 7.3 page for heading structure,
  tone and organization.
- **Terminology:** Say "Ed-Fi API" or "the API" in prose. Use "DMS" or "CMS"
  only for source-code names, configuration identifiers and repository
  artifacts. Environment variable names such as `DMS_DATASTORE` stay as they
  are.
- **Version wording:** Say "Ed-Fi API v8" for the whole line. Where behavior
  differs between v8 releases, say so inline in the sentence, as 7.3 does.
  Don't use version admonitions such as `:::info Added in v8.1`.
- **Database engines:** Treat SQL Server as fully supported alongside
  PostgreSQL. Use Tabs where the steps differ by engine.
- **Data Standard versions:** v8 supports Data Standard 5.2 and 6.1. List both
  wherever supported versions appear.
- **"Data store" and "database" aren't interchangeable.** A _data store_ is a
  database registered in the Configuration Service (the Management API v3
  term that replaced "ODS instance"). A _database_ is the physical PostgreSQL
  or SQL Server database. Use "data store" for registering, routing and
  assigning; use "database" for provisioning, schemas, backups, connectivity
  and the Configuration Service's own database.
- **Explain in the page.** Don't send readers to the DMS repository for
  warnings or guidance. Link to DMS source files only as references, such as
  sample plugins or implementer guides, and pin those links to the release
  tag, never `main`.
- **Verify against the release tag,** not `main`.
- **Lint:** `npm run lint:folder <path>` for `.md`; for `.mdx`, run
  `npx prettier --write <file>` and then `npx eslint <file>`. Never pass
  files to `npm run lint:fix`; it runs on the whole repo. Run `npm run build`
  before a PR; broken internal links fail it.
- **Placeholder pages:** A page that isn't written yet holds its title, a
  `:::note` with the expected date, and a short description of the feature.
  Put the date only on the placeholder, not on pages that link to it.

## Decisions

- Don't document upgrading from v8.0 or list 8.0 → 8.1 differences.
- Don't document custom validation as a general extension point. Mention
  `EdFi.Api.CustomValidation` only as the contract that UniqueId validation is
  built on.
- Leave out CMS background jobs (`GET /v3/jobs/{jobId}`, `JobSettings`) and
  the CMS identifier type change (DMS-1337).
- Treat the Management API 3.0.0 summary as the full list of v2 → v3
  changes.

---

## Scope

### v8.0 (published)

- Docker-based deployment
- Configuration Service, replacing the ODS Admin API
- Self-contained (OpenIddict) or Keycloak identity provider
- Multi-tenancy and context-based (school year) routing
- Readable and writable Profiles
- Claim sets, roles and scopes
- MetaEd extensions and `api-schema-tools` database provisioning
- Changed Record Queries
- Breaking changes from the ODS/API
- Bulk Load Client, Smoke Test Utility

### v8.1

- Partitioned cursor paging
- Change-query snapshots and read replicas
- Ownership-based and custom view-based authorization
- DocumentCache, and Kafka event streaming (CDC)
- Plugin model (`EdFi.Api.Plugins`): UniqueId validation, the Identities API,
  and secret managers for connection strings
- Token limits, revocation and introspection
- Correlation ID normalization and OTLP log export
- PostgreSQL 18, SQL Server 2025, and Data Standard 6.1 on both engines
- Security Metadata Tools

### Out of scope

- OneRoster (planned for 8.2)
- Cross-instance cache-refresh signaling
- Mapping packs and AOT compilation
- Binary (non-Docker) installation
- In-place schema migration and schema reload while running
- Sandbox Administration Portal and Admin App UI

---

## 8.1 Work

| Area | Ticket | Status |
| --- | --- | --- |
| Release notes and What's New | DMS-1621 | Done |
| Cursor paging, read replicas, change-query snapshots | DMS-1628 | Done |
| Ownership-based authorization | DMS-1630 | Done |
| Custom view-based authorization | DMS-1637 | Done |
| Security Metadata Tools | DMS-1617, DMS-1662 | Done |
| Getting Started | DMS-1645 | Done |
| Platform Developer's Guide | DMS-1663 | Done |
| Configuration Service token lifetime | DMS-1664 | Done |
| API Client Developers' Guide | DMS-1665 | Done |
| How-To Guides | — | Done |
| Technical Articles | DMS-1669 | Done |
| Plugins | DMS-1670 | Done |
| Secrets in connection strings | DMS-1671 | Done |
| Identities API and unique ID integration | DMS-1672 | Done |
| Access token management | DMS-1644 | Done |
| Correlation ID normalization | DMS-1540 | Done |
| DocumentCache and its admin CLI | DMS-1635 | Placeholder, due 2026-12-15 |
| Kafka event streaming (host page and walkthrough) | DMS-1636 | Placeholder, due 2026-12-15 |
| Bulk load walkthrough | To be filed | Placeholder, due 2026-12-15 |

## Remaining Work

1. **DocumentCache (DMS-1635):** `platform-dev-guide/features/document-cache.md`,
   a new `utilities/document-cache-admin-cli.md`, and the DocumentCache
   settings in Configuration Details.
2. **Kafka event streaming (DMS-1636):**
   `platform-dev-guide/features/event-streaming-kafka-cdc.md` and a new
   `how-to-guides/how-to-set-up-kafka-cdc-streaming.md`. Include the
   `documentCreatedAt` envelope field (DMS-1658) and the PowerShell 7.5
   requirement for the CDC scripts. Consumer guidance goes on the host page;
   there's no separate client guide page.
3. **Bulk load walkthrough:**
   `how-to-guides/how-to-load-the-ods-with-sample-xml-data-using-bulk-load-client-utility.md`.
4. When each page is written, remove its expected-date note.

### Backlog

Proposed in the 8.0 plan and not yet written:

- Migrating from the ODS/API (technical article)
- API schema structure (technical article)
- Authorization model overview (technical article)
- How-tos: configure a key and secret, add profiles, configure
  multi-tenancy, configure school-year routing, provision a database

---

## Source Material

Paths are relative to the root of the Ed-Fi-Alliance-OSS/Data-Management-Service
repository. Read them at the release tag.

| Topic | Source |
| --- | --- |
| Requirements | `docs/PRD-Ed-Fi-API-v8.0.md`, `docs/PRD-Ed-Fi-API-v8.1.md`, `docs/PRD-CS-v8.0.md`, `docs/PRD-CS-v8.1.md` |
| 8.1 changes | `docs/changelog/8.1.0.md` |
| Getting started | `docs/RUNNING-LOCALLY.md`, `docs/DOCKER.md`, `eng/docker-compose/` |
| Configuration reference | `docs/CONFIGURATION.md`, each service's `appsettings.json` |
| Operations and database versions | `docs/OPERATIONS.md` |
| Database provisioning and relational model | `docs/RELATIONAL-BACKEND.md` |
| Data Standard versions | `docs/DATA-STANDARD-VERSIONS.md`, `eng/DatabaseTemplates/` |
| Roles, scopes and claims | `docs/ROLES-SCOPES.md`, `docs/CLAIMS-LOADING-GUIDE.md` |
| Multi-tenancy and routing | `docs/MULTI-TENANCY-GETTING-STARTED.md`, `docs/SCHOOL_YEAR_INSTANCES.md` |
| Change queries and snapshots | `reference/design/backend-redesign/design-docs/change-queries.md` |
| Cursor paging | `docs/CURSOR-PAGING.md` |
| Authorization | `reference/design/backend-redesign/design-docs/auth.md` |
| Caching and DocumentCache | `docs/CACHING-STRATEGY.md`, `reference/document-cache-documentation/` |
| Kafka and CDC | `reference/cdc-documentation/`, `docs/CDC-QUALIFICATION.md` |
| Plugins | `src/plugins/EdFi.Api.Plugins/PLUGINS.md` |
| Identities API | `docs/IDENTITY-MANAGEMENT.md` |
| UniqueId validation | `docs/UNIQUEID-VALIDATION.md` |
| Secrets | `docs/SECRETS.md` |
| Logging | `docs/LOGGING.md` |
| Breaking changes from the ODS/API | `docs/DATA-STRICTNESS.md` |
