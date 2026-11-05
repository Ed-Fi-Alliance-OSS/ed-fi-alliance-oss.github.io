---
title: '📢 Ed-Fi Admin App 4.1 and Admin API 2.4 Released'
authors: [hunter, campos]
tags: [release, admin-app, admin-api, ed-fi-api]
date: 2026-11-06
---

The Ed-Fi Alliance is pleased to announce the release of **Ed-Fi Admin App 4.1**
and **Ed-Fi ODS Admin API 2.4**, available on GitHub as of November 4, 2026.
These releases are designed to work together.
Admin API 2.4 adds new ways to manage API credentials, education organizations,
and data store (ODS database) instances. It also adds a new `v3` mode aligned
with the Ed-Fi Management API specification used by Ed-Fi API v8. Admin App 4.1
brings those capabilities to administrators in the user interface.

<!-- truncate -->

## Ed-Fi ODS Admin API 2.4

Admin API 2.4 builds on the foundation set in 2.3 and implements Ed-Fi Management
API specification versions 2.4.0 and 3.0.0. It supports three API modes:

- `v1`, for Ed-Fi ODS/API 6.x. This mode is still available but does not
  receive new features.
- `v2`, for Ed-Fi ODS/API 7.x. This mode is fully supported.
- `v3`, which matches the Ed-Fi API v8 Configuration Service.

An instance serves one mode at a time. Set `AppSettings:adminApiMode` to `v1`,
`v2` or `v3`; a request to a path that does not match the configured mode is
rejected with `400 Bad Request`. When the setting is absent the mode is `v2`.

### Key Features

- **New `v3` API mode**: The `v3` mode implements Management API 3.0.0, the same
  specification implemented by the Ed-Fi API v8 Configuration Service. Admin API
  continues to administer the Ed-Fi ODS / API; it does not manage an Ed-Fi API v8
  instance. In `v3`, ODS instances are called _data stores_, errors use the
  [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details format,
  `Location` headers carry an absolute URI, and claim sets use a simpler flat
  structure.
- **Data store (database instance) management**: Create a new ODS database from
  the **Minimal** or **Sample** template and delete it later, all through the
  API, without running provisioning scripts by hand. Requests run as background
  jobs, and each instance reports its status as it moves through creation or
  deletion (`/v2/odsInstances/manage` and `/v3/dataStores/manage`).
  Administrators who don't want this feature can turn it off with the
  `EnableDataStoreManagement` setting.
- **Education organization endpoints**: Admin API now keeps a regularly
  refreshed copy of the education organizations in each ODS instance and lists
  them by instance and by tenant. Administrators can also request an immediate
  refresh.
- **Job status endpoint**: A new `/jobs/{jobId}` endpoint reports the progress
  of background work, such as data store provisioning and education
  organization refreshes.
- **Finer-grained API client access (`v3`)**: An API client can now be limited
  to a subset of its application's education organizations. Applications can
  also be created without a default set of credentials. This builds on the
  support for multiple credentials per application added in 2.3.
- **Deployment discovery**: The information endpoint (`GET /`) now returns the
  application name, the version, the active Management API specification
  version, and links to the OpenAPI metadata and to a new anonymous `/tenancy`
  endpoint (`v2` and `v3`). `/tenancy` lists the configured tenants; an empty
  list means single-tenant mode. Both responses match the Ed-Fi API v8
  Configuration Service, and Admin App 4.1 uses them to check an
  environment's tenant mode.
- **Audit logging**: Admin API can record authentication events and API actions
  to an audit log table. Entries capture tenant context and the response status
  code, and a delete records the natural key of the object that was removed, so
  an audit trail remains interpretable after the row is gone. Audit logging is
  configurable and is available in the `v2` and `v3` modes.

### Enhancements

- **Safer handling of connection strings**: Data store derivative connection
  strings are now encrypted and are no longer returned in API responses. ODS
  instance connection strings that were stored unencrypted are encrypted the
  next time they are read.
- **Stronger validation**: `v3` now rejects duplicate vendors, applications,
  and API clients. Claim set names can no longer contain spaces. Data store
  names are limited to 46 characters.
- **More reliable application editing**: Editing an application now changes
  only the education organizations that differ. This fixes problems editing
  applications with zero or multiple API clients.
- **Faster synchronization**: ODS instances are processed in parallel, and the
  `MaxDegreeOfParallelism` setting controls how many run at once.
- **Reverse proxy support**: New settings for known proxies and networks make
  it easier to host Admin API behind a reverse proxy or load balancer.
- **OpenAPI specifications**: The OpenAPI description
  (`/swagger/{version}/swagger.json`) is now always available, even when the
  interactive Swagger UI is turned off, and it matches the published
  Management API specifications.
- **Installation fixes**: IIS installs now work when the server hosts more than
  one website.
- **Security updates**: The release fixes the issues found by code scanning,
  locks NuGet package versions, and moves the PostgreSQL Docker image to a
  Docker Hardened Image.

## Ed-Fi Admin App 4.1

Admin App 4.1 builds on the redesign delivered in 4.0. It works with Admin API
2.4 in all three modes and adds support for deployments that don't use Starting
Blocks. It also includes experimental support for Ed-Fi API v8 through the
Configuration Service; the goal is full parity in a future release.

### Key Features

- **Support for the Admin API `v3` mode**: Manage vendors, applications, API
  clients, claim sets (including import and export), profiles, data stores, and
  education organizations in environments that run Admin API in `v3` mode. In
  those environments, the user interface says _Data Stores_ instead of _ODS
  instances_.
- **Multiple credentials per application**: A new credentials page under each
  application lets you list, view, create, edit, reset, and delete its
  credential sets, which makes key rotation easier. New and reset secrets are
  delivered the same way as before, through Yopass or a one-time on-screen
  display. To keep an application usable, Admin App won't delete its last
  credential.
- **Data store management**: Create new ODS databases from the **Minimal** or
  **Sample** template and delete them, including in environments that don't
  use Starting Blocks. The data store list shows each one's status (for
  example, _Create: Pending_, _Available_, _Delete: Failed_) using
  color-coded labels, and shows the result of each create or delete job.
- **Synchronization with any Ed-Fi ODS/API 7.x deployment**: Synchronization
  of tenants, ODS instances, and education organizations is no longer limited
  to Starting Blocks environments. Admin App uses the Admin API refresh and job
  status endpoints and shows progress while a refresh runs.
- **Tenant-mode validation**: When you create or edit an environment, Admin App
  checks the tenant mode reported by the Management API and explains any
  mismatch.
- **Claim set drilldown**: The claim set detail view shows the full resource
  claim hierarchy, including resources that have no actions, which are shown
  as _Denied_.
- **More identity providers**: You can now sign in to Admin App with
  **Microsoft Entra ID** or **Google Workspace**, in addition to Keycloak.
  Sign-out uses standard OpenID Connect logout with whichever provider you
  signed in with. Admin App also accepts machine-to-machine tokens issued by
  Entra ID.
- **SQL Server support for background jobs**: Synchronization and other
  background jobs now run on SQL Server deployments as well as PostgreSQL.

### Enhancements

- **Audit logging**: Admin App now records write actions, sign-in attempts, and
  sign-outs in an `audit_log` database table. Audit logging is on by default
  and can be configured with environment variables.
- **Configurable session length**: The new `DB_TTL_IN_MINUTES` setting controls
  how long a sign-in session lasts. The default is still two hours.
- **Security hardening**: Session cookies now use `SameSite`, and requests that
  change data are checked to make sure they come from Admin App itself.
  Request bodies are filtered to the fields each endpoint expects, which blocks
  attempts to overwrite unrelated records. Users can no longer grant privileges
  they don't hold, whether by defining roles or assigning them. The release
  also fixes the issues found by code scanning.
- **Health checks**: The health endpoint now supports SQL Server and returns
  HTTP 503 when the application is unhealthy, so load balancers and monitoring
  tools can detect problems.
- **Data store and environment improvements**: Deleted data stores no longer
  appear in drop-down lists. Data store names are limited to 46 characters, to
  match Admin API. Discovery URLs with a trailing slash are accepted, and
  status polling retries instead of giving up when a job isn't visible yet.
  Creating a duplicate profile now shows a clear error message.
- **Docker improvements**: The Docker Compose setup fixes SQL Server paths,
  removes duplicate and unused variables from `.env.example`, and includes
  scripts to start a local Ed-Fi API v8 environment from published images. A
  new guide explains how to run the Docker Compose setup on an Ubuntu server
  reached by its public IP address.

## ⚠️ Breaking Changes and Upgrade Notes

### Admin API 2.4

- **Database migration required before upgrading**: Admin API 2.4 adds the
  `ApiClients.InheritsApplicationEducationOrganizations` column to the
  `EdFi_Admin` database (migration `00010`). Fresh installs and new Docker
  volumes get it automatically, but existing databases, including existing
  Docker volumes, do not. Apply `00010` to every `EdFi_Admin` database (in
  multi-tenant installs, each tenant's database) _before_ deploying the new
  version. Until the column exists, every API client and application endpoint
  fails. See the
  [migration guide](https://github.com/Ed-Fi-Alliance-OSS/ODS-Admin-API/blob/v2.4.0/docs/migration-guide.md).
- **.NET 10 required**: Admin API 2.4 runs on
  [.NET 10](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). IIS
  installations need the .NET 10 Hosting Bundle. .NET 8 is no longer supported.
- **Keycloak authentication removed**: Admin API now uses only its built-in
  client credentials flow (`/connect/register` and `/connect/token`). The
  Keycloak Docker Compose files, the `env-idp.example` templates and the
  related installer options have been removed. There is no in-place upgrade
  path; deployments using an external identity provider must move to the
  built-in authentication first.
- **Endpoint renames**: `apiclients` is now `apiClients` in both `v2` and `v3`.
  In `v3`, `odsInstances` is `dataStores`, and instance-management routes moved
  to `/v3/dataStores/manage` and `/v2/odsInstances/manage`.
- **Removed endpoints and fields**: `/dataStores/edOrgs` and
  `/odsInstances/edOrgs` are removed in both `v2` and `v3`, as are the
  deprecated education organization list endpoints. The `UseSandbox` and
  `SandboxType` fields are gone from the API clients resource, and `key` is now
  `clientId`.
- **Error payloads changed in `v3`**: Clients that parse the previous error
  shape must handle RFC 9457 Problem Details, served as
  `application/problem+json` with `errors`, `validationErrors` and
  `correlationId` extension members. The problem type URN namespace changed
  from `urn:ed-fi:admin-api:` to `urn:ed-fi:management-api:`. The `v1` and `v2`
  error middleware is unchanged.
- **Changed status codes (`v2` and `v3`)**: A request that refers to a record
  that doesn't exist, or that uses a duplicate API client name, now returns
  `409 Conflict` instead of `400 Bad Request`. In `v2`, resetting an
  application's credentials returns `409` when the application has no API
  clients.
- **Application changes in `v3`**: `PUT /v3/applications/{id}` no longer
  accepts `enabled` or `dataStoreIds`; set these on each API client instead.
  Resetting credentials at the application level returns `409` unless the
  application has exactly one API client; use
  `PUT /v3/apiClients/{id}/reset-credential` instead.
- **Unrecognized fields are rejected**: `PUT /v3/applications/{id}` returns
  `400 Bad Request` for an unmapped property instead of ignoring it.
- **Connection strings are no longer returned**: Data store derivative
  connection strings are encrypted at rest and omitted from API responses. Read
  them from configuration instead.
- **Claim set names in `v3`**: Claim set names that contain spaces are rejected,
  both on claim set requests and in an application's `claimSetName`. `v1` and
  `v2` are unchanged. Rename these claim sets before you move to `v3`.
- **Data store names are capped at 46 characters** when creating a data store or
  ODS instance, in both `v2` and `v3`, so that the generated database name fits
  the 63-character portable limit. Existing records are not re-validated.

### Admin App 4.1

- **Requires Admin API 2.4**: Admin App 4.1 requires ODS Admin API 2.4 or later
  in every environment it manages.
- **Secrets must be supplied**: The production image no longer includes sample
  secrets. Admin App won't start until you set `DB_SECRET_VALUE`,
  `DB_ENCRYPTION_SECRET_VALUE`, and the new `SESSION_SECRET_VALUE` (and,
  optionally, `SAMPLE_OIDC_CONFIG`). Placeholder and known sample values are
  rejected.
- **Rotate secrets if you used the published defaults**: Earlier images
  included a publicly known encryption key and sample passwords. If your
  deployment ever ran with those values, follow the
  [secret rotation guide](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/blob/v4.1.0/docs/secret-rotation.md).
- **Node.js 24 required**: Admin App now requires Node.js 24 or later.
- **Account Management link**: The link now appears only when
  `VITE_IDP_ACCOUNT_URL` is set. It no longer defaults to a Keycloak address.

### Known Issues

- **Windows IIS installs**: The automated and semi-automated installation
  scripts don't yet set the newly required `SESSION_SECRET_VALUE`. Use the
  manual installation steps for 4.1 until the scripts are updated.
- **Upgrading from Admin App 4.0**: Upgrading an existing 4.0 installation in
  place isn't supported yet, so install 4.1 as a new deployment. Work is under
  way on an upgrade path for existing 4.0 installations, including known
  problems on Docker and PostgreSQL.

## 🛠️ Try It Out

### Ed-Fi ODS Admin API 2.4

Download the release from
[ODS Admin API v2.4.0 on GitHub](https://github.com/Ed-Fi-Alliance-OSS/ODS-Admin-API/releases/tag/v2.4.0).
See [What's New in Admin API](/reference/admin-api/whats-new) and the
[Admin API Getting Started guide](/reference/admin-api/getting-started/admin-api-2.4/)
for installation instructions. If you're upgrading from 2.3, read the
[migration guide](https://github.com/Ed-Fi-Alliance-OSS/ODS-Admin-API/blob/v2.4.0/docs/migration-guide.md)
first.

### Ed-Fi Admin App 4.1

Download the release from
[Admin App v4.1.0 on GitHub](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases/tag/v4.1.0).
See the [Admin App Getting Started guide](/reference/admin-app/getting-started/)
for installation instructions and the [User's Guide](/reference/admin-app/user-guide/).

## 📣 Share Your Feedback

We'd love to hear about your experience with these releases. Report bugs,
suggest improvements, or tell us what you'd like to see next. Join the
conversation in the Ed-Fi Slack workspace or visit the
[Ed-Fi Community Hub](https://community.ed-fi.org/).

## 📅 Next

For details on what's coming, visit the
[Ed-Fi Technology Roadmap](https://github.com/orgs/Ed-Fi-Alliance-OSS/projects/1/views/2).
