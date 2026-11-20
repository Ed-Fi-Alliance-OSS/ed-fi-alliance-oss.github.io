# Ed-Fi ODS Admin API

## Welcome

---

The Ed-Fi ODS Admin API (Admin API) is an API-based administrative interface for the Ed-Fi ODS /
API Platform.  The Admin API is available for installation as standalone binaries, as well as for deployment using Docker or other container orchestration tools.

## What the Admin API Owns

The Admin API is a separate application from the Ed-Fi ODS/API. It reads and
writes the ODS/API's `EdFi_Admin` and `EdFi_Security` databases, but its own
setup is independent:

- **Its connection strings and settings live in its own configuration**, not in
  the `EdFi_Admin` database. For IIS installs, that is the Admin API's
  `appsettings.json` (`ConnectionStrings` for `EdFi_Admin` and `EdFi_Security`,
  plus authentication and encryption settings). For Docker, it is the
  environment variables and settings template. In multi-tenant mode, each
  tenant's connection strings are listed in the same configuration.
- **It has its own clients and tokens.** Callers register an Admin API client
  through the Admin API's `/connect/register` endpoint and get tokens from its
  `/connect/token` endpoint. These registrations are stored in the `adminapi`
  schema of `EdFi_Admin`. The Admin API does not need ODS/API client credentials; an Admin API
  client and an ODS/API key and secret are separate things.
- **It manages ODS/API data for the ODS/API to use.** Vendors, applications,
  ODS/API key and secret pairs, claim sets, and ODS instance records created
  through the Admin API are what the ODS/API reads at run time. ODS instance
  connection strings are encrypted with the Admin API `EncryptionKey`, which
  must match the ODS/API `OdsConnectionStringEncryptionKey` setting.

See the [Getting Started 2.4 guide](./getting-started/admin-api-2.4/readme.md)
for configuration details.

## What's New

---

The Ed-Fi ODS Admin API brings some exciting changes to version 2.4. Please see the items below for more details!

### New `v3` API mode

Admin API 2.4 adds a `v3` mode alongside the existing `v1` and `v2` modes. It
implements the Management API v3 specification, which is aligned with the Ed-Fi
API v8 platform: ODS instances are called _data stores_, claim set payloads are
simpler, and errors use the standard Problem Details format.

### Data Store (ODS Instance) Management

Create and delete ODS databases from a template directly through the API.
Provisioning runs in the background, and a new job status endpoint reports
its progress.

### Education Organization Endpoints

View the education organizations in each ODS instance, kept up to date
automatically or refreshed on demand.

### Other changes

- Finer-grained API client access, building on the multiple credentials per
  application support added in 2.3
- Audit logging of authentication events and administrative actions
- Upgraded to .NET 10
- Please see our [What's New](./whats-new.md) page for additional details,
  including breaking changes to review before upgrading.

## Getting Started

---

### Admin API 2.x (version 2.4 and newer)

Admin API version 2.4 and later supports use of both ODS/API 6.x and 7.x applications. Please follow the [Getting Started 2.4 guide](./getting-started/admin-api-2.4/readme.md) for more information on set up and configuration.

### Admin API 2.x (version 2.3)

Admin API version 2.3 also supports both ODS/API 6.x and 7.x applications. Please follow the [Getting Started 2.3 guide](./getting-started/admin-api-2.3/readme.md) for more information on set up and configuration.

### Admin API 2.x (version 2.2 and earlier)

For Admin API versions 2.2 and earlier, users are required to match their version of Ed-Fi ODS/API with the Admin API version that supports that line. For additional instructions, please see our [Getting Started 2.x (2.2 and earlier)](./getting-started/admin-api-2.2/readme.md) page. NOTE: If you are on an Admin API 2.x version earlier than 2.4, the Ed-Fi Alliance **highly** recommends updating to Admin API 2.4 to take advantage of all the latest features.

### Admin API 1.x

For Admin API versions 1.4 and earlier users are required to match the proper Admin API version with their corresponding Ed-Fi ODS/API version. For Admin API 1.x, this requires matching an ODS version between ODS/API v5.4 and ODS/API v6.3. Note, if you are on ODS/API v6.x and can upgrade to Admin API 2.4, Ed-Fi **highly** recommends doing so to maintain forward compatibility with upcoming features. Please see our [Getting Started 1.x](./getting-started/admin-api-1.x/readme.md) page for more information.

The Admin API v2.x is available for
[Ed-Fi ODS / API v7.x](/reference/ed-fi-api) and Admin API
v1.x is available for [Ed-Fi ODS / API 6.x](/reference/ed-fi-api/6.2/).
