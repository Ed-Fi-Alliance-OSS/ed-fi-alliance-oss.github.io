# Ed-Fi Admin API

## Welcome

---

The Ed-Fi ODS Admin API (Admin API) is an API-based administrative interface for the Ed-Fi ODS /
API Platform.  The Admin API is available for installation as standalone binaries, as well as for deployment using Docker or other container orchestration tools.

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

Admin API version 2.3 and later supports use of both ODS/API 6.x and 7.x applications. To get started, follow the gettings started guide provided here.

### Admin API 2.x (version 2.2 and earlier)

For Admin API versions 2.2 and earlier, users are required to match their version of Ed-Fi ODS/API with the Admin API version that supports that line. For additional instructions, please see out getting started page. NOTE: If you are on an Admin API 2.x version earlier than 2.3, the Ed-Fi Alliance **highly** recommends updating to take advantage of all the latest features.

### Admin API 1.x

For Admin API versions 1.4 and earlier users are required to match the proper Admin API version with their corresponding Ed-Fi ODS/API version. For Admin API 1.x, this requires matching an ODS version between ODS/API v5.4 and ODS/API v6.3. Note, if you are on ODS/API v6.x and can upgrade to Admin API 2.3, Ed-Fi **highly** recommends doing so to maintain forward compatibility with upcoming features.

The Admin API v2.x is available for
[Ed-Fi ODS / API v7.x](/reference/ods-api) and Admin API
v1.x is available for [Ed-Fi ODS / API 6.x](/reference/ods-api/6.2/).

## Documentation

Documentation for the Ed-Fi Admin API is viewable online:

- [What's New](./whats-new.md)
- [Getting Started](./getting-started.md)
- [Securing Admin API](./securing-admin-api.md)
- [Version 1.x](./admin-api-1.x/readme.md)
- [Version 2.x](./admin-api-2.x/readme.md)

## Installation

Please see more information on the instruction pages depending on which version
of the ODS / API in use.  Both Docker and Windows installation modes are
supported, alongside ODS / API supported deployment modes.

- [Admin API v2.x for ODS / API  7.x](./admin-api-2.x/installation-for-odsapi-7x/readme.md)
- [Admin API v1.x for ODS / API 6.x](./admin-api-1.x/installation-for-odsapi-5x-6x/readme.md)

## Resources
