# Ed-Fi Technology Suite Supported Versions

_Last updated:_ 2026-11-06

This page is the authoritative source for the support status of Ed-Fi Alliance
products and versions. Other pages link here rather than restating support
windows.

## Currently Supported

As of the last updated date, these products and versions are fully supported:

- [Ed-Fi Data Standard](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/releases) 5.2 and 6.1
- [Ed-Fi ODS/API](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/releases) 7.3
- [Ed-Fi API](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/releases) 8.1
- [Ed-Fi ODS Admin API](https://github.com/Ed-Fi-Alliance-OSS/ODS-Admin-API/releases) 2.4
- [Ed-Fi Admin App](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases) 4.1
- [API Publisher](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher/releases) 1.4
- [MetaEd IDE](https://github.com/Ed-Fi-Alliance-OSS/vscode-metaed-ide/releases) 4.9

The Data Standard does not typically have patch releases, only `major.minor`
releases. For the other applications, the latest patch release is always the
supported version. The list above includes the `major.minor` version; the Ed-Fi
Alliance maintains support for the most recent patch release number. The links
above go to the release page for each source code repository, where you can find
the latest available patch release. Version numbers given like 1.2.x in the
tables below follow the same rule. See
[Software Versioning](/community/sdlc/code-contribution-guidelines/software-versioning)
and
[Ed-Fi Data Standard Versioning and Releases](../1-data-exchange/versioning-and-releases.md)
for more information on the versioning practices.

Every other version listed below is in maintenance mode, out of support, or not
yet released.

To choose between the Ed-Fi ODS/API and Ed-Fi API v8 for a new implementation,
see [Should a new Ed-Fi implementation use ODS/API 7.x or Ed-Fi API
v8?](./api-faq.md#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8).

## Status Definitions

Each table below has a _Status_ column. It uses the support levels defined in
[Support Notifications](./notifications/readme.mdx):

- _Fully supported_: receives new features and compatibility updates and testing
  with related software, in addition to bug and security fixes and framework /
  dependency updates.
- _Maintenance mode_: receives framework / dependency updates and critical bug /
  security fixes only. No new features, and may be incompatible with newer
  versions of other software.
- _Out of support_: no further updates or enhancements. See [What changes when a
  product or version of a product is
  out-of-support?](./notifications/readme.mdx#what-changes-when-a-product-or-version-of-a-product-is-out-of-support)
- _Upcoming_: announced, but not yet released.

## Ed-Fi Data Standard

See [Ed-Fi Data Exchange Standards](../1-data-exchange/readme.md) for more information.

| Version                                          | Status          | Timeline                                      | Ed-Fi API Software                                                             |
| ------------------------------------------------ | --------------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| 3.3.1                                            | Out of support  | Support ended after the 2024-2025 school year | Ed-Fi ODS/API 5.3 and 5.4                                                      |
| 4.0.0                                            | Out of support  | Support ended after the 2025-2026 school year | Ed-Fi ODS/API 6.2 and 7.x                                                      |
| [5.2](/reference/data-exchange/data-standard/5/) | Fully supported | Active through 2027-2028 school year          | Ed-Fi ODS/API 7.3 and Ed-Fi API 8.1                                            |
| [6.1](/reference/data-exchange/data-standard)    | Fully supported | Active through 2029-2030 school year          | Ed-Fi ODS/API 7.3.2 and Ed-Fi API 8.1                                          |

Earlier 5.x and 6.x releases are out of support: 5.0 (Ed-Fi ODS/API 7.1), 5.1
(Ed-Fi ODS/API 7.2), and 6.0 (Ed-Fi ODS/API 7.3.1). Upgrade to 5.2 or 6.1.

Development of extensions for the Ed-Fi Data Standard relies on
[MetaEd](../8-metaed/readme.md) version 4.x. As Visual Studio Code extension,
MetaEd will self-update to the latest version unless the user disables the
self-update feature.

## ODS/API Platform

The _Ed-Fi ODS/API Platform_ is the group of tools that work together to support
a production deployment of the Ed-Fi Resources API. The Platform includes:

- [Ed-Fi ODS/API](../2-ods-api-platform/readme.mdx), the official Ed-Fi implementation of a REST API
  defined by the Ed-Fi Data Standard.
  - Also includes the _Ed-Fi ODS Sandbox Admin_ and _Ed-Fi Swagger UI_ web
    applications.
- [Ed-Fi ODS Admin API](../4-admin-api/readme.md), a REST interface for managing
  client credentials ("key and secret") and security configuration.
- [Ed-Fi Admin App](../5-admin-app/readme.md), a web application for education
  organizations that manage multiple instances of the Ed-Fi ODS/API or Ed-Fi API
  across tenants and environments. The legacy [Ed-Fi ODS Admin
  App](/getting-started/community-tools/technology/ods-admin-app) 3.x has moved to
  Ed-Fi Community Tools.

### Ed-Fi ODS/API

:::tip

The Ed-Fi ODS/API application is being phased out with 2028-2029 as the final planned year of support. It will be replaced by the [Ed-Fi API](#ed-fi-api). New implementations should plan on Ed-Fi API v8; see [Should a new Ed-Fi implementation use ODS/API 7.x or Ed-Fi API v8?](./api-faq.md#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8).

:::

| Version                                         | Status          | Timeline                                      | Data Standard(s)           |
| ----------------------------------------------- | --------------- | --------------------------------------------- | -------------------------- |
| [6.2.x](/reference/ed-fi-api/6.2)               | Out of support  | Support ended after the 2025-2026 school year | 4.0.0                      |
| 7.0.0                                           | Out of support  | Replaced by 7.1                               | 4.0.0, 5.0.0               |
| [7.1.x](/reference/ed-fi-api/7.1)               | Out of support  | Support ended after the 2025-2026 school year | 4.0.0, 5.0.0               |
| [7.2.x](/reference/ed-fi-api/7.2)               | Out of support  | Replaced by 7.3; upgrade to 7.3               | 4.0.0, 5.1.0               |
| [7.3.x](/reference/ed-fi-api/) (current: 7.3.2) | Fully supported | Active through 2028-2029 school year          | 4.0.0, 5.2.0, 6.0.0, 6.1.0 |

Out of support: all releases prior to ODS/API 7.3.

### Ed-Fi ODS Admin API

:::tip

In addition to patch releases, minor releases with additional
backward-compatible functionality are made from time to time. The latest
minor.patch release is always the supported version. For example, if a bug is
found in version 2.1.0 and version 2.2.0 is already out, then the bug will be
fixed in 2.2.1 rather than creating a 2.1.1 release.

:::

ODS Admin API version 2.3 consolidates functionality from version 1, allowing
the single application to support both ODS/API 6.x and ODS/API 7.x. The Admin API
2.x line is supported through the 2028-2029 school year; within it, only the
latest minor release is supported.

| Version       | Status          | Timeline                                      | Supports API |
| ------------- | --------------- | --------------------------------------------- | ------------ |
| 1.x.y         | Out of support  | Support ended after the 2025-2026 school year | 5.x.y, 6.x.y |
| 2.0.0 - 2.2.x | Out of support  | Replaced by 2.3; upgrade to the latest 2.x    | 7.x.y        |
| 2.3.x         | Out of support  | Replaced by 2.4; upgrade to the latest 2.x    | 6.x.y, 7.x.y |
| 2.4           | Fully supported | Released early November 2026                  | 6.x.y, 7.x.y |
| 2.5           | Upcoming        | Releasing in December 2026                    | 6.x.y, 7.x.y |

### Ed-Fi Admin App

The legacy ODS Admin App user interface (version 3.3) supports ODS/API 5.x and
6.x. It was in maintenance mode until June 30, 2026, when formal support ended,
and it has moved to Ed-Fi Community Tools.
See [Admin App Transitioning to Ed-Fi Community
Tools](./notifications/admin-app-to-community-tools.md).

The new Ed-Fi Admin App user interface (version 4.0) was released in December
2025. This application provides an all new front-end application paired with the
ODS Admin API on the backend. It supports ODS/API 6.x and ODS/API 7.x. Admin
App 4.1, released in early November 2026, adds support for Ed-Fi API v8.x. Admin
App 4.2 is scheduled for release in December 2026.

| Version | Status          | Timeline                                     | Supports API                    |
| ------- | --------------- | -------------------------------------------- | ------------------------------- |
| 3.3     | Out of support  | Maintenance mode ended June 30, 2026         | 5.x.y, 6.x.y                    |
| 4.0     | Out of support  | Replaced by 4.1; upgrade to 4.1              | 6.x.y, 7.x.y                    |
| 4.1     | Fully supported | Released early November 2026                 | 6.x.y, 7.x.y, and Ed-Fi API 8.x |
| 4.2     | Upcoming        | Releasing in December 2026                   | 6.x.y, 7.x.y, and Ed-Fi API 8.x |

### Docker Deployments

:::warning

The Ed-Fi ODS/API Docker deployments are no longer maintained as part of the
Ed-Fi Alliance Technology Suite and are moving to [Ed-Fi Community
Tools](/getting-started/community-tools). The Ed-Fi Alliance may still update
them from time to time, but does not commit to supporting them or to releasing
them alongside new ODS/API versions. See [Docker Deployments Transitioning to
Ed-Fi Community Tools](./notifications/docker.md).

:::

The [sample Docker Compose scripts](../7-docker/readme.mdx) demonstrate how to
run these applications together, and provide a quick startup option for running
a local testing environment. They are demonstrations, not production
components. Docker release numbers track which components are in the kit, not
the versions of those components.

| Version | Status         | Deploys                           |
| ------- | -------------- | --------------------------------- |
| 2.3.x   | Out of support | ODS/API 6.2.x and Admin App 3.2.1 |
| 3.2.x   | Out of support | ODS/API 7.3 and Admin API 2.2     |

Earlier releases include Docker 3.0.x and 3.1.x, the Docker 2.2.x release that
deployed ODS/API 6.0 and Admin App 3.0, and the Docker 2.1.x releases that
deployed ODS/API 5.3 and 5.4.

## Ed-Fi API

Ed-Fi API v8 is the long-term replacement for the Ed-Fi ODS/API. Ed-Fi API 8.1
is the recommended release for all new implementations, including pilots.
Teams running 8.0 should upgrade to 8.1. See [Should a new
Ed-Fi implementation use ODS/API 7.x or Ed-Fi API v8?](./api-faq.md#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8) and the [Ed-Fi
ODS/API and Ed-Fi API v8 FAQ](./api-faq.md) for more information.

| Version                       | Status          | Timeline                                               | Data Standard(s) |
| ----------------------------- | --------------- | ------------------------------------------------------ | ---------------- |
| 8.0                           | Out of support  | Replaced by 8.1; upgrade to 8.1                        | 5.2.0, 6.1.0     |
| [8.1](/reference/ed-fi-api/8) | Fully supported | Released November 2026. Target school year: 2027-2028  | 5.2.0, 6.1.0     |

## Tools

Additional applications formally maintained and supported by the Ed-Fi Alliance:

- [API Publisher](../6-api-publisher/readme.md) works with all supported
  versions of the Ed-Fi ODS/API and with Ed-Fi API v8.1

Only the latest version is formally supported.

## Out of Support

All versions of these applications are no longer supported.

| Product                  | Notice                                                                            | Ed-Fi Community Tools                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Data Import              | [Transitioning to Ed-Fi Community Tools](./notifications/data-import.md)          | [Data Import](/getting-started/community-tools/technology/data-import)                                                    |
| Docker Deployments       | [Transitioning to Ed-Fi Community Tools](./notifications/docker.md)               | (coming soon)                                                                                                             |
| Analytics Middle Tier    | [Transitioning to Ed-Fi Community Tools](./notifications/amt.md)                  | (coming soon)                                                                                                             |
| Migration Utility        | [End of Support Notice and Product Discontinuation](./notifications/migration.md) | [ODS Migration Utility](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22492292/Migration+Utility)                 |
| MappingEDU               | [MappingEDU - Service EOL and Open Source Notice](./notifications/mappingedu.md)  | [MappingEDU](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22496563/MappingEDU)                                   |
| LMS Toolkit              | not available                                                                     | [Ed-Fi LMS Toolkit](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498933/Ed-Fi+LMS+Toolkit)                     |
| Sample Data Generator    | not available                                                                     | [Ed-Fi Sample Data Generator](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22495849/Ed-Fi+Sample+Data+Generator) |
| Ed-Fi Technology Suite 2 | [End of Support Notice](./notifications/suite-two.md)                             | not applicable                                                                                                            |
| Ed-Fi ODS 1.x            | not available                                                                     | not applicable                                                                                                            |
| Ed-Fi Dashboards         | not available                                                                     | Not applicable                                                                                                            |
