# Ed-Fi API v8 Documentation Plan

**Target path:** `odsApi_versioned_docs/version-8.0/`
**Based on:** 7.3 structure, adapted for DMS architecture
**Last updated:** 2026-06-25

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
- Change queries — document endpoints exist; note `/deletes` and `/keyChanges` are
  placeholder shims returning `[]` (not yet fully implemented)
- Breaking changes from ODS/API (case sensitivity, URL pattern, no `v3/` segment)

### Out of scope for v8.0 docs (future releases)

- Kafka / streaming / CDC (not ready for v8.0 release)
- Mapping packs / AOT compilation
- Binary / non-Docker installation
- In-place schema migration / hot reload of schema
- Extension plugin model (dynamic plugin `.dll` drop-in, as in ODS/API)
- Bulk Load Client utility (ODS/API-specific)
- OneRoster feature (not available in v8)

---

## Proposed File Tree

```
odsApi_versioned_docs/version-8.0/
├── readme.md                                        ✅ done
├── downloads.md
│
├── whats-new/
│   ├── readme.mdx
│   └── breaking-changes-from-ods-api.md
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
│   │
│   ├── configuration/
│   │   ├── readme.md
│   │   ├── configuration-details.mdx
│   │   ├── identity-provider.md
│   │   └── logging-configuration.md
│   │
│   ├── deployment/
│   │   ├── readme.md
│   │   ├── docker-deployment.md
│   │   └── database-provisioning.md
│   │
│   ├── security/
│   │   ├── readme.md
│   │   ├── claim-sets.md
│   │   ├── roles-and-scopes.md
│   │   └── profiles.md
│   │
│   ├── multi-tenancy/
│   │   ├── readme.md
│   │   ├── single-tenant.md
│   │   ├── multi-tenant-setup.md
│   │   └── school-year-routing.md
│   │
│   ├── extensibility/
│   │   ├── readme.md
│   │   └── extending-with-metaed.md
│   │
│   ├── features/
│   │   ├── readme.md
│   │   └── change-queries.md
│   │
│   └── utilities/
│       ├── readme.md
│       ├── dms-schema-cli.md
│       ├── cms-hierarchy.md
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
│   ├── descriptor-references.md
│   ├── error-handling-best-practices.md
│   ├── paging.md
│   └── using-the-online-documentation.md
│
├── how-to-guides/
│   ├── readme.mdx
│   ├── how-to-configure-key-secret.md
│   ├── how-to-configure-claim-sets.md
│   ├── how-to-add-profiles.md
│   ├── how-to-configure-multi-tenancy.md
│   ├── how-to-configure-school-year-routing.md
│   ├── how-to-extend-with-metaed.md
│   └── how-to-provision-database.md
│
└── technical-articles/
    ├── readme.mdx
    ├── relational-data-model.md
    ├── migrating-from-ods-api.md
    ├── caching-strategy.md
    ├── api-schema-structure.md
    └── authorization-model.md
```

---

## Section-by-Section Notes

### `readme.md` ✅
Already written. Landing page with upcoming-release warning, timeline, key highlights,
and source code link. Content drawn from `docs/reference/0-roadmap/api-faq.md`.

---

### `downloads.md`
List Docker Hub image tags for DMS and Configuration Service. Link to GitHub releases.
No binary installer. No NuGet packages (not user-facing).

---

### `whats-new/`

**`readme.mdx`** — High-level summary of what's new in v8: relational backend, Config
Service, built-in multi-tenancy, writable profiles, self-contained identity provider.
Audience: existing ODS/API users evaluating upgrade.

**`breaking-changes-from-ods-api.md`** — Migration-critical changes:
- Property names are **case-sensitive** in request bodies (ODS/API was case-insensitive)
- No `v3/` URL segment (URLs are now `/data/ed-fi/schools`, not `/data/v3/ed-fi/schools`)
- URL path for tenant/qualifier routing is prepended, not a query string
- Configuration Service (not Admin API 2) for managing vendors, applications, claim sets
- Claim set XML format differences (if any)
- No bulk load client utility in v8 — use Config Service + API for seeding

---

### `getting-started/`

**`readme.md`** — Overview of prerequisites (Docker, PowerShell 7+) and two paths:
(1) pre-built Docker images from Docker Hub, (2) local source build. Links to docker-compose
files in the DMS repo. Call out tested configurations.

**`docker-deployment.md`** — Step-by-step using `start-local-dms.ps1`:
1. Clone repo / pull images
2. Run `./start-local-dms.ps1 -EnableConfig` (flags for Keycloak, Kafka UI, etc.)
3. Access DMS at `http://localhost:8080`, Config Service at `http://localhost:8081`
Cover environment variable overrides for `AppSettings__Datastore`, etc.

**`configure-data-store.md`** — After startup, run `./configure-local-data-store.ps1` to
create the initial data store (tenant + route context + app credentials). Explain the
DMS-1153 requirement. Show how to get client key/secret.

**`getting-started-appendix.md`** — Connection string patterns for PostgreSQL and SQL
Server, TLS notes, common startup errors.

---

### `platform-dev-guide/`

**`overview.md`** — Two-service architecture diagram (DMS ↔ Config Service). Describe:
- DMS: handles Ed-Fi REST API (resources, descriptors, discovery, OAuth token)
- Config Service: handles management API (vendors, applications, claim sets, data stores)
- Identity flow: client gets token from DMS `/connect/token`, uses it against DMS API
- Config Service manages what scopes/claim sets each client has

**`fundamentals.md`** — Core concepts: claim-sets, OAuth2 client-credentials, JWT
validation, how DMS consults Config Service for application context.

#### `configuration/`

**`configuration-details.mdx`** — Full `appsettings.json` reference table (all
`AppSettings.*`, `DatabaseOptions.*`, `RateLimit.*`, `Cors.*`, `JwtAuthentication.*`).
Show environment variable override syntax (`AppSettings__Datastore=mssql`).

**`identity-provider.md`** — Compare OpenIddict (self-contained, default, no external
dependency) vs Keycloak (enterprise, external). Show config for each.

**`logging-configuration.md`** — Serilog configuration, `MaskRequestBodyInLogs` flag,
structured logging fields.

#### `deployment/`

**`database-provisioning.md`** — Cover `dms-schema` CLI in depth:
- `dms-schema ddl emit` — generate DDL scripts
- `dms-schema ddl provision` — apply DDL to a target database
- `dms-schema hash` — compute schema fingerprint
- `DeployDatabaseOnStartup` flag for automatic provisioning on container start
- Idempotent behavior (safe to re-run)

#### `security/`

**`claim-sets.md`** — How claim sets work in v8 (backward-compatible with ODS/API
claim set semantics). How to manage via Config Service API vs Admin App UI.

**`roles-and-scopes.md`** — `dms-client` vs `cms-client` roles, `edfi_admin_api/full_access`
and `edfi_admin_api/readonly_access` scopes. How scopes map to Config Service permissions.

**`profiles.md`** — Profiles support both readable (filter response fields) and
writable (filter accepted input fields) configurations — this was also supported
in ODS/API, not new in v8. How to define profiles in XML and upload to
Config Service. How hidden data is preserved on PUT (not silently deleted).

#### `multi-tenancy/`

**`readme.md`** — Overview: tenant isolation (Config data) vs instance routing (data stores).
`AppSettings__MultiTenancy=true` flag.

**`single-tenant.md`** — Default configuration. Single data store, no tenant header.

**`multi-tenant-setup.md`** — Enable multi-tenancy, set `Tenant` header in Config Service
calls, create per-tenant data stores, configure route contexts.

**`school-year-routing.md`** — `RouteQualifierSegments: schoolYear` pattern.
URL: `/{schoolYear}/data/ed-fi/schools`. Matches `SCHOOL_YEAR_INSTANCES.md` in source repo.

#### `extensibility/`

**`readme.md`** — Overview of extension support in v8 vs ODS/API. The approach is
metadata-driven: DMS reads `APISchema.json` files at startup, not compiled plugins.

**`extending-with-metaed.md`** — Step-by-step:
1. Author extension data model in MetaEd
2. MetaEd generates extension `APISchema.json`
3. Place `APISchema.json` in the directory pointed to by `AppSettings__ApiSchemaPath`
   (or alongside the bundled schema if `UseApiSchemaPath=false`)
4. Author security setup: create claim set entries for extension resources via Config
   Service (same claim set authoring flow as core resources)
5. Run `dms-schema ddl provision` to add extension tables to the database
6. Restart DMS (schema is loaded at startup, not hot-reloaded)

Contrast with ODS/API plugin model: no `.dll` drop-in, no Visual Studio project
templates needed. The API schema drives everything.

#### `features/`

**`change-queries.md`** — Document `availableChangeVersions` endpoint. Note that `/deletes`
and `/keyChanges` endpoints exist in the API but return empty results in v8.0; full
implementation is planned for a future release.

#### `utilities/`

**`readme.md`** — Overview table of all utilities with brief purpose and audience.

**`dms-schema-cli.md`** — Full command reference for the `dms-schema` tool. Cover
installation (shipped as part of DMS release), all subcommands, common workflows
(fresh provision, update after extension, hash validation).

**`cms-hierarchy.md`** — The CmsHierarchy tool is a build-time CLI utility for
working with authorization claim hierarchies. It has two commands:
- `ParseXml` — converts ODS/API XML security metadata files into DMS JSON claim
  hierarchy format (useful when migrating ODS/API security configuration to v8)
- `Transform` — merges ClaimSet JSON definition files into the base
  `AuthorizationHierarchy.json`, producing the combined hierarchy consumed by the
  Config Service for authorization decisions

Source: `C:\Sources\RepoOss\Data-Management-Service\eng\CmsHierarchy`

Cover: the two commands and their flags (`--command`, `--input`, `--output`,
`--outputFormat`, `--skipAuths`), input file formats (XML for ParseXml, JSON for
Transform), typical workflow when adding extension claim sets, and the base hierarchy
file (`ClaimSetFiles/AuthorizationHierarchy.json`).

Note: as of DMS-777 the ClaimSet JSON files this tool produces are being superseded by
runtime claims loading with embedded resources. Document current usage but flag that
this workflow may change in a future release.

**`smoke-test-utility.md`** — Same codebase as ODS/API. Runs a suite of basic API
calls against a running DMS instance to verify core endpoints are responding correctly.
Note any v8-specific invocation differences (base URL, token endpoint). Link to the
7.3 smoke test docs for full background; document only the delta.

**`bulk-load-client-utility.md`** — Same codebase as ODS/API. Loads Ed-Fi XML data
files into DMS via the REST API. Note any v8-specific differences (URL pattern, auth
endpoint). Link to the 7.3 bulk load docs for full background; document only the delta.

---

### `client-developers-guide/`

Largely parallel to 7.3. Update these specifics for v8:

**`api-routes.md`** — No `v3/` segment. Pattern is `/data/{project}/{resource}` (e.g.,
`/data/ed-fi/schools`). With route qualifiers: `/{qualifier}/data/{project}/{resource}`.

**`authentication.md`** — Token endpoint is `POST /connect/token` on DMS (not a separate
auth server unless Keycloak is used). Client credentials flow only. Show curl example.

**`paging.md`** — Combine 7.3's two paging docs. Cover offset paging and cursor paging.
Note cursor paging is the recommended approach for large datasets.

**`using-the-online-documentation.md`** — Swagger UI at `/swagger`. OpenAPI spec at
`/openapi/{version}.json`. No Sandbox Administration Portal in v8.

Drop from 7.3:
- `using-the-sandbox-administration-portal.md` (no sandbox admin portal)
- `using-code-generation-to-create-an-sdk.md` (SDK generation via Swagger still works,
  but this is lower priority for v8.0)

---

### `how-to-guides/`

Adapt from 7.3. New guides:

**`how-to-configure-multi-tenancy.md`** — Enable flag, create tenant, create data store,
configure route context, test with a request.

**`how-to-configure-school-year-routing.md`** — Set `RouteQualifierSegments`, create
school-year-specific data stores, test routing.

**`how-to-extend-with-metaed.md`** — Walk through the extension flow end-to-end (mirrors
`extending-with-metaed.md` in platform guide but in tutorial style).

**`how-to-provision-database.md`** — Using `dms-schema ddl provision` for fresh install
and for updating after adding extensions.

Carry over from 7.3 (with updates):
- `how-to-configure-key-secret.md` — via Config Service API now, not Admin App
- `how-to-configure-claim-sets.md` — via Config Service API
- `how-to-add-profiles.md` — upload profile XML to Config Service

---

### `technical-articles/`

**`relational-data-model.md`** — Tables-per-resource model. Core tables (`dms.Document`,
`dms.ReferentialIdentity`, `dms.Descriptor`). Per-resource root and child tables.
FK referential integrity and cascade behavior. Schema fingerprint (`dms.EffectiveSchema`).
Audience: DBAs and advanced implementers.

**`migrating-from-ods-api.md`** — The primary migration guide. Cover:
- Case sensitivity breaking change (how to audit existing client code)
- URL pattern changes
- Admin API 2 → Config Service (API surface comparison)
- Claim set format differences (if any)
- Data migration strategy (no in-place migration; re-load via API or bulk import)
- Extensions: MetaEd flow changes
- What features are not available in v8.0 yet (Kafka, change queries, etc.)

**`caching-strategy.md`** — In-memory, per-instance caches. TTLs for data stores, claim
sets, profiles. No distributed cache. Eventual consistency window.

**`api-schema-structure.md`** — What `APISchema.json` is, how DMS uses it, how extensions
add to it. Audience: advanced users customizing or debugging schema loading.

**`authorization-model.md`** — Relationship-based authorization enforced at SQL layer.
Claim sets, ownership tokens, educational organization hierarchy.

---

## Suggested Writing Order

1. **Getting Started** (`getting-started/`) — highest reader value; lets anyone try v8
2. **Breaking Changes** (`whats-new/breaking-changes-from-ods-api.md`) — critical for
   anyone coming from 7.x
3. **Platform Guide: Configuration** (`platform-dev-guide/configuration/`) — reference
   table; unblocks everyone configuring deployments
4. **Platform Guide: Security + Multi-tenancy** — needed for real deployments
5. **Platform Guide: Extensibility** (`extending-with-metaed.md`) — key differentiator
   from the existing DMS readme; not documented elsewhere yet
6. **Client Developers' Guide** — adapt from 7.3, update for v8 specifics
7. **How-To Guides** — fill in with concrete task walkthroughs
8. **Technical Articles** — migration guide + relational model

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
