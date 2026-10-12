# Ed-Fi ODS Admin API

## Welcome

---

The Ed-Fi ODS Admin API (Admin API) is an API-based administrative interface for the Ed-Fi ODS /
API Platform.  The Admin API is available for installation as standalone binaries, as well as for deployment using Docker or other container orchestration tools.

## What the Admin API Owns

---

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

See the [Getting Started 2.3 guide](./getting-started/admin-api-2.3-newer/readme.md)
for configuration details.

## What's New

---

The Ed-Fi ODS Admin API brings some exciting changes to version 2.3. Please see the items below for more details!

### Version 2.3 Combines ODS/API 6.x and 7.x line in one application

The Ed-Fi ODS Admin API version 2.3 introduces a new exciting change with ODS/API management. Admin API version 2.3 now supports managing _both_ ODS/API versions 6.x and versions 7.x of the product from a single Admin environment. For those users looking to maximize exposure to Ed-Fi's newest features while ensuring greatest forward compatibility with older ODS/API versions, The Ed-Fi Alliance strongly recommends users upgrade to Admin API 2.3.

Please follow the content below for new and legacy installation instructions.

### Multiple Client Credential Support for Vendor applications

Vendors now have the ability to create multiple sets of client credentials (Client ID and Secret), that can be scoped to a single application. This allows system administrators better control over which vendor applications have access to which tenant resources.

### Tenant Management Endpoints

Admin API version 2.3 begins laying the ground for ODS Instance management by exposing a set of endpoints to better manage Ed-Orgs and tenant resources. These endpoints can be used by other applications such as the Ed-Fi Admin App version 4 to perform system or team level operations while still respecting the tenant boundary.

### Other changes

- Reorganizing Admin API documentation hierarchy
- Better support for Docker running in ARM environments
- Please see our "What's new" page for additional details.

## Getting Started

---

### Admin API 2.x (version 2.3 and newer)

Admin API version 2.3 and later supports use of both ODS/API 6.x and 7.x applications. Please follow the [Getting Started 2.3 guide](./getting-started/admin-api-2.3-newer/readme.md) for more information on set up and configuration.

### Admin API 2.x (version 2.2 and earlier)

For Admin API versions 2.2 and earlier, users are required to match their version of Ed-Fi ODS/API with the Admin API version that supports that line. For additional instructions, please see our [Getting Started 2.x (2.2 and earlier)](./getting-started/admin-api-2.2-older/readme.md) page. NOTE: If you are on an Admin API 2.x version earlier than 2.3, the Ed-Fi Alliance **highly** recommends updating to take advantage of all the latest features.

### Admin API 1.x

For Admin API versions 1.4 and earlier users are required to match the proper Admin API version with their corresponding Ed-Fi ODS/API version. For Admin API 1.x, this requires matching an ODS version between ODS/API v5.4 and ODS/API v6.3. Note, if you are on ODS/API v6.x and can upgrade to Admin API 2.3, Ed-Fi **highly** recommends doing so to maintain forward compatibility with upcoming features. Please see our [Getting Started 1.x](./getting-started/admin-api-1.x/readme.md) page for more information.

The Admin API v2.x is available for
[Ed-Fi ODS / API v7.x](/reference/ed-fi-api) and Admin API
v1.x is available for [Ed-Fi ODS / API 6.x](/reference/ed-fi-api/6.2/).
