# Ed-Fi API v8 Documentation Plan

**Target path:** `odsApi_versioned_docs/version-8.0/`
**Based on:** 7.3 structure, adapted for DMS architecture
**Last updated:** 2026-06-30

---

## Writing Conventions

These rules apply to every page written for v8.0 docs.

- **Style baseline:** Match the equivalent 7.3 page for heading structure, prose
  tone, and content organization. Read the 7.3 source before writing each page.
- **File scope:** Only write to `odsApi_versioned_docs/version-8.0/`. Do not
  touch blogs, CSS, JSX, config files, or other versioned docs.
- **Lint after each page:** Run `npm run lint:folder odsApi_versioned_docs/version-8.0/<section>`
  immediately after writing each page. Do not batch across sections.
- **Page order:** Keep `sidebar_position` values consistent with 7.3 where possible.
- **Terminology:** Use "Ed-Fi API" or "the API" in prose. Only use "Data Management
  Service" or "DMS" when the technical distinction from the Configuration Service is
  necessary (e.g., environment variable names like `DMS_DATASTORE` are fine as-is).
- **SQL Server:** Treat SQL Server as a fully supported option alongside PostgreSQL in
  all pages. The only exception is What's New and Release Notes.
- **Features:** Features are always-on in v8 — no FeatureManagement config section.
  Do not document `composites`, `serializedData`, `oneRoster`, `identityManagement`,
  `uniqueIdValidation`, or `resourceLinks` (not implemented).
- **Stub files:** When a new page links to a page that does not yet exist in
  `version-8.0/`, create a stub at that path immediately and note which stubs were
  added. A stub contains only the page title and a `:::note This page is under
  development. :::` admonition.

---

## Scope Notes

### In scope for v8.0 docs

- Docker-based deployment (primary installation path)
- Configuration Service (replaces Admin API 2)
- Self-contained OpenIddict or Keycloak identity provider
- Multi-tenancy (built-in, via route qualifiers)
- School-year instance routing
- Profiles — readable and writable (new capability vs 7.3)
- Claim sets and roles/scopes
- MetaEd extensions — supported but different flow:
  1. Place Extension `APISchema.json` in the configured schema directory
  2. Author security setup (claim sets for extension resources)
  3. Run `dms-schema` CLI to provision/update database DDL
- `dms-schema` CLI — schema hash, DDL emit, DDL provision commands
- Change queries — fully supported; `/deletes` and `/keyChanges` work.
  Snapshot isolation planned for a future release.
- Breaking changes from ODS/API (case sensitivity, URL pattern, no `v3/` segment)
- Bulk Load Client utility — same codebase as ODS/API, updated for v8 URLs

### Out of scope for v8.0 docs (future releases)

- Kafka / streaming / CDC (not ready for v8.0 release)
- Mapping packs / AOT compilation
- Binary / non-Docker installation
- In-place schema migration / hot reload of schema
- Extension plugin model (dynamic plugin `.dll` drop-in, as in ODS/API)
- OneRoster feature (not available in v8)
- Sandbox Administration Portal (not available in v8)

---

## Proposed File Tree

```
odsApi_versioned_docs/version-8.0/
├── readme.md
│
├── whats-new/
│   ├── readme.mdx
│   ├── whats-new-in-this-release.md
│   └── release-notes.md                             (includes breaking changes)
│
├── getting-started/
│   ├── readme.md
│   ├── docker-deployment.md
│   ├── configure-data-store.md
│   └── getting-started-appendix.md
│
├── platform-dev-guide/
│   ├── readme.md
│   ├── overview.md
│   ├── fundamentals.md
│   ├── coding-patterns.md
│   │
│   ├── configuration/
│   │   ├── readme.md
│   │   ├── configuration-details.mdx
│   │   ├── api-client-and-data-store-configuration.md
│   │   ├── single-and-multi-tenant-configuration.md
│   │   ├── context-based-routing-for-year-specific-datastore.md
│   │   ├── identity-provider.md
│   │   └── logging-configuration.md
│   │
│   ├── deployment/
│   │   ├── readme.md
│   │   └── database-provisioning.md
│   │
│   ├── security/
│   │   ├── readme.md
│   │   ├── api-claim-sets-resources.md
│   │   ├── api-profiles.md
│   │   └── security-configuration-data-stores.md
│   │
│   ├── multi-tenancy/
│   │   ├── readme.md
│   │   └── school-year-routing.md
│   │
│   ├── extensibility/
│   │   ├── readme.md
│   │   └── extending-with-metaed.md
│   │
│   ├── features/
│   │   ├── readme.md
│   │   ├── changed-record-queries.md
│   │   ├── notifications-expiring-local-caches-remotely.md
│   │   ├── ownership-based-authorization.md
│   │   └── read-replicas.md
│   │
│   └── utilities/
│       ├── readme.md
│       ├── database-provisioning.md
│       ├── cms-hierarchy-tool.md
│       ├── smoke-test-utility.md
│       └── bulk-load-client-utility.md
│
├── client-developers-guide/
│   ├── readme.md
│   ├── introduction.md
│   ├── basics.md
│   ├── api-routes.md
│   ├── authentication.md
│   ├── authorization.md
│   ├── date-datetime-elements.md
│   ├── descriptor-references.md
│   ├── error-handling-best-practices.md
│   ├── error-response-knowledge-base.md
│   ├── improve-paging-performance-on-large-api-resources.md
│   ├── resource-dependency-order/
│   │   └── readme.mdx
│   ├── using-code-generation-to-create-an-sdk.md
│   ├── using-the-online-documentation.md
│   └── using-the-changed-record-queries.md
│
├── technical-articles/
│   ├── readme.mdx
│   ├── relational-data-model.md
│   ├── migrating-from-ods-api.md
│   ├── caching-strategy.md
│   ├── api-schema-structure.md
│   └── authorization-model.md
│
└── how-to-guides/
    ├── readme.mdx
    ├── how-to-configure-key-secret.md
    ├── how-to-configure-claim-sets.md
    ├── how-to-add-profiles.md
    ├── how-to-configure-multi-tenancy.md
    ├── how-to-configure-school-year-routing.md
    ├── how-to-extend-with-metaed.md
    └── how-to-provision-database.md
```

---

## Section-by-Section Notes

### `whats-new/`

**`readme.mdx`** — High-level summary of what's new in v8: relational backend, Config
Service, built-in multi-tenancy, writable profiles, self-contained identity provider.
Audience: existing ODS/API users evaluating upgrade.

**`whats-new-in-this-release.md`** — New features and improvements listed per Epic.

**`release-notes.md`** — Comprehensive release notes including breaking changes from
ODS/API (case sensitivity, URL pattern, token endpoint location, Config Service replacing
Admin API, deployment model, no in-place migration) and feature availability table.

---

### `getting-started/`

**`readme.md`** — Overview of prerequisites (Docker, PowerShell 7+) and the getting
started path. Links to docker-compose files in the DMS repo.

**`docker-deployment.md`** — Step-by-step using `start-local-dms.ps1`:
1. Clone repo / pull images
2. Run `./start-local-dms.ps1` (flags for Swagger UI, Keycloak, etc.)
3. Register a data store with `./configure-local-data-store.ps1`
4. Access Ed-Fi API at `http://localhost:8080`, Config Service at `http://localhost:8081`

**`configure-data-store.md`** — After startup, run `./configure-local-data-store.ps1` to
create the initial data store and client credentials. Show how to get client key/secret.

**`getting-started-appendix.md`** — Default ports, full `.env` variable reference,
Keycloak setup pointer.

---

### `platform-dev-guide/`

**`overview.md`** — Two-service architecture diagram (Ed-Fi API ↔ Config Service).

**`fundamentals.md`** — Core concepts: claim sets, OAuth2 client-credentials, JWT
validation, how the Ed-Fi API consults the Config Service for application context.

#### `configuration/`

Note: single/multi-tenant configuration and context-based routing live under
`configuration/` (matching 7.3 structure), not under `multi-tenancy/`. The
`multi-tenancy/` folder retains stub pages for sidebar navigation.

**`configuration-details.mdx`** — Full `appsettings.json` reference table. Show
environment variable override syntax (`AppSettings__Datastore=mssql`).

**`api-client-and-data-store-configuration.md`** — Vendor, application, API client,
and data store setup via the Configuration Service API.

**`single-and-multi-tenant-configuration.md`** — Single-tenant (default) and
multi-tenant setup. `MultiTenancy` setting, tenant header, per-tenant data stores.

**`context-based-routing-for-year-specific-datastore.md`** — `RouteQualifierSegments`
setting, year-specific and district-specific route patterns, multi-tenant combinations.

**`identity-provider.md`** — Compare OpenIddict (self-contained, default) vs Keycloak
(enterprise, external). Show config for each.

**`logging-configuration.md`** — Serilog configuration, `MaskRequestBodyInLogs` flag,
structured logging fields.

#### `deployment/`

**`database-provisioning.md`** — `dms-schema` CLI in depth:
- `dms-schema ddl emit` — generate DDL scripts
- `dms-schema ddl provision` — apply DDL to a target database
- `dms-schema hash` — compute schema fingerprint
- `DeployDatabaseOnStartup` flag for automatic provisioning on container start
- Idempotent behavior (safe to re-run)

#### `security/`

Files follow 7.3 naming: `api-claim-sets-resources.md`, `api-profiles.md`,
`security-configuration-data-stores.md`. The data stores page covers the `dmscs`
schema (replaces `EdFi_Admin` + `EdFi_Security`).

#### `multi-tenancy/`

Stub pages for sidebar navigation only. Full content is in `configuration/`.

#### `extensibility/`

**`readme.md`** — Overview of extension support in v8 vs ODS/API. Metadata-driven:
the Ed-Fi API reads `APISchema.json` files at startup, not compiled plugins.

**`extending-with-metaed.md`** — Step-by-step extension authoring:
1. Author extension data model in MetaEd
2. MetaEd generates extension `APISchema.json`
3. Place `APISchema.json` in the directory pointed to by `AppSettings__ApiSchemaPath`
4. Author security setup via Config Service
5. Run `dms-schema ddl provision` to add extension tables to the database
6. Restart the Ed-Fi API (schema is loaded at startup, not hot-reloaded)

#### `features/`

**`changed-record-queries.md`** — Change version tracking, tombstone tables,
snapshot isolation (planned for future release), current limitations.

**`notifications-expiring-local-caches-remotely.md`** — Verify v8 applicability
before porting from 7.3.

**`ownership-based-authorization.md`** — Port from 7.3 with v8 terminology updates.

**`read-replicas.md`** — `DataStoreDerivative` with `DerivativeType = 'ReadReplica'`.

#### `utilities/`

**`database-provisioning.md`** — Full command reference for the `dms-schema` tool.
Cover installation, all subcommands, common workflows.

**`cms-hierarchy-tool.md`** — The CmsHierarchy tool: `ParseXml` and `Transform`
commands, input/output formats, typical workflow when adding extension claim sets.
Note: as of DMS-777 this workflow may change in a future release.

**`smoke-test-utility.md`** — Same codebase as ODS/API. Note v8-specific differences
(base URL, token endpoint). Link to 7.3 smoke test docs for full background.

**`bulk-load-client-utility.md`** — Same codebase as ODS/API. Note v8-specific
differences (URL pattern, auth endpoint). Link to 7.3 docs for full background.

---

### `client-developers-guide/`

Follows 7.3 structure. Key v8 differences:

- `api-routes.md`: no `v3/` segment; `/{pathBase}/data/{schema}/{resource}` pattern;
  composites and identity rows removed.
- `authentication.md`: token endpoint is `POST /connect/token` on the **Configuration
  Service** (port 8081). Credentials in request body (`client_id`/`client_secret`),
  not Basic auth header.
- `using-the-sandbox-administration-portal.md`: drop entirely (no sandbox in v8).
- `improve-paging-performance-on-large-api-resources.md`: cursor paging page
  omitted (not implemented in v8).

---

### `technical-articles/`

**`relational-data-model.md`** — Tables-per-resource model. Core tables, per-resource
structure, FK integrity. Audience: DBAs and advanced implementers.

**`migrating-from-ods-api.md`** — Primary migration guide: case sensitivity audit,
URL pattern changes, Admin API 2 → Config Service, data migration strategy (no
in-place migration; re-load via API), extension flow changes, feature gaps.

**`caching-strategy.md`** — In-memory, per-instance caches. TTLs for data stores,
claim sets, profiles. No distributed cache. Eventual consistency window.

**`api-schema-structure.md`** — What `APISchema.json` is, how the Ed-Fi API uses it,
how extensions add to it.

**`authorization-model.md`** — Relationship-based authorization. Claim sets, ownership
tokens, educational organization hierarchy.

---

### `how-to-guides/`

Adapt from 7.3. New guides:

**`how-to-configure-multi-tenancy.md`** — Enable flag, create tenant, create data
store, configure route context, test with a request.

**`how-to-configure-school-year-routing.md`** — Set `RouteQualifierSegments`, create
school-year-specific data stores, test routing.

**`how-to-extend-with-metaed.md`** — Extension flow end-to-end in tutorial style.

**`how-to-provision-database.md`** — Using `dms-schema ddl provision` for fresh
install and for updating after adding extensions.

Carry over from 7.3 (with updates):
- `how-to-configure-key-secret.md` — via Config Service API now, not Admin App
- `how-to-configure-claim-sets.md` — via Config Service API
- `how-to-add-profiles.md` — upload profile XML to Config Service

---

## Source Material

All source docs are in the DMS repo at `C:\Sources\RepoOss\Data-Management-Service\docs\`:

| Plan section | Primary source file(s) |
|---|---|
| Getting started | `GETTING_STARTED.md`, `RUNNING-LOCALLY.md`, `DOCKER.md` |
| Configuration reference | `CONFIGURATION.md` |
| Identity provider | `CONFIGURATION.md` (IdentityProvider section) |
| Logging | `LOGGING.md` |
| Database provisioning | `eng/docker-compose/provision-relational-e2e-database.ps1` |
| Roles & scopes | `ROLES-SCOPES.md` |
| Multi-tenancy | `MULTI-TENANCY-GETTING-STARTED.md`, `DATABASE-SEGMENTATION-STRATEGY.md` |
| School year routing | `SCHOOL_YEAR_INSTANCES.md` |
| Profiles | `reference/design/backend-redesign/design-docs/profiles.md` |
| Change queries | `reference/design/backend-redesign/design-docs/change-queries.md` |
| Relational model | `RELATIONAL-BACKEND.md` |
| Caching | `CACHING-STRATEGY.md` |
| API schema | `API-SCHEMA-DOCUMENTATION.md` |
| Authorization | `reference/design/backend-redesign/design-docs/auth.md` |
| Breaking changes | `DATA-STRICTNESS.md` |
