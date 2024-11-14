# Ed-Fi Technology Suite Supported Versions

Version numbers are sometimes given like 1.2.x below. This indicates that the
software may receive bug and security fixes from time to time, and the latest
precise patch number will not be updated on this page. See
[Ed-Fi Software Versioning](/community/sdlc/code-contribution-guidelines/software-versioning)
and
[Ed-Fi Data Standard Versioning and Releases](/docs/reference/1-data-exchange/versioning-and-releases.md)
for more information on the versioning practices.

## Data Standard

See [Ed-Fi Data Standard](./data-exchange/data-standard) for more information.

| Version | Timeline                               | Ed-Fi API Software                      |
| ------- | -------------------------------------- | --------------------------------------- |
| 3.3.1   | Active through 2024-2025 school year   | Ed-FI ODS/API 5.3                       |
| 4.0.0   | Active through 2025-2026 school year   | Ed-Fi ODS/API 6.2 and Ed-Fi ODS/API 7.2 |
| 5.0.0   | Active through 2027-2028 school year   | Ed-FI ODS/API 7.1                       |
| 5.1.0   | Active through 2027-2028 school year   | Ed-Fi ODS/API 7.2                       |
| 5.2.0   | Coming soon (November 2024)            | Ed-Fi ODS/API 7.3                       |
| 6.0.0   | Coming 2025, for 2026-2027 school year | Ed-Fi Data Management Service 1.0       |

Development of extensions for the Ed-Fi Data Standard relies on
[MetaEd](./metaed/) version 4.x. As Visual Studio Code extension, MetaEd will
self-update to the latest version unless the user disables the self-update
feature.

## ODS/API Platform

The _Ed-Fi ODS/API Platform_ is the group of tools that work together to support
a production deployment of the Ed-Fi Resources API. The Platform includes:

* [Ed-Fi ODS/API](./ods-api), the official Ed-Fi implementation of a REST API
  defined by the Ed-Fi Data Standard.
  * Also includes the _Ed-Fi ODS Sandbox Admin_ and _Ed-Fi Swagger UI_ web
    applications.
* [Ed-Fi ODS Admin API](./admin-api), a REST interface for managing client
  credentials ("key and secret") and security configuration.
* [Ed-Fi ODS Admin App](./admin-app), a web application for managing single
  instances of an Ed-Fi ODS/API.

### Ed-Fi ODS/API

| Version                         | Timeline                             | Data Standard(s) |
| ------------------------------- | ------------------------------------ | ---------------- |
| [5.4.x](/reference/ods-api/5.4) | Active through 2024-2025 school year | 3.3.1            |
| [6.2.x](/reference/ods-api/6.2) | Active through 2025-2026 school year | 4.0.0            |
| 7.0.0                           | Replaced by 7.1                      | 4.0.0, 5.0.0     |
| 7.1.x                           | Active through 2027-2028 school year | 4.0.0, 5.0.0     |
| [7.2.x](/reference/ods-api/7.2) | Active through 2027-2028 school year | 4.0.0, 5.1.0     |
| 7.3.0                           | Coming soon (November/December 2024) | 4.0.0, 5.2.0     |

### Ed-Fi ODS Admin API

:::tip

In addition to patch releases, minor releases with additional
backward-compatible functionality are made from time to time. The latest
minor.patch release is always the supported version. For example, if a bug is
found in version 2.1.0 and version 2.2.0 is already out, then the bug will be
fixed in 2.2.1 rather than creating a 2.1.1 release.

:::

| Version | Timeline                             | Supports ODS/API |
| ------- | ------------------------------------ | ---------------- |
| 2.x.y   | Active through 2027-2028 school year | 7.x.y            |
| 1.x.y   | Active through 2025-2026 school year | 5.x.y, 6.x.y     |

### Ed-Fi ODS Admin App

:::note

The Admin App user interface is now in "maintenance mode", meaning it will only
receive critical updates. Formal support
[will end June 30, 2025](./notifications/admin-app-to-exchange.md).

:::

| Version | Timeline                             | Supports ODS/API |
| ------- | ------------------------------------ | ---------------- |
| 3.3     | Maintenance mode until June 30, 2025 | 5.x.y, 6.x.y     |

### Docker Deployments

The [sample Docker Compose scripts](./docker/) demonstrate how to run these
applications together, and provide a quick startup option for running a local
testing environment. Because these are demonstration scripts, not meant for
production, they are not always fully up-to-date with the latest software
versions.

| Version | Supports                                                            |
| ------- | ------------------------------------------------------------------- |
| 3.1.x   | ODS/API 7.x (latest minor/patch) and Admin API 2.1.x (latest patch) |
| 2.3.x   | ODS/API 6.2.x and Admin App 3.2.1                                   |
| 2.2.x   | ODS/APi 5.4.x and Admin App 3.2.1                                   |

## Data Management Service Platform

This is the future replacement for the Ed-Fi ODS/API. See
[Ed-Fi ODS/API and Data Management Service FAQ](./api-faq.md) for more
information.

| Version           | Timeline                                          | Data Standard(s) |
| ----------------- | ------------------------------------------------- | ---------------- |
| Release Candidate | Coming spring 2025                                | 5.2.0            |
| 1.0               | Coming fall/winter 2025 for school year 2026-2027 | 6.0, others      |

## Tools

Additional applications formally maintained and supported by the Ed-Fi Alliance:

* [API Publisher](./api-publisher) works with all supported versions of the
  Ed-Fi ODS/API
* [Data Import](./data-import/) works with all supported versions of the Ed-Fi
  ODS/API
* [Analytics Middle Tier](./analytics-middle-tier) works with 5.x and 6.x
  versions of the Ed-Fi ODS/API.

In all of these cases, only the latest version is formally supported.

## Out of Support

All versions of these applications are no longer supported.

| Product                             | Notice                                                                            | Ed-Fi Exchange                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Migration Utility Migration Utility | [End of Support Notice and Product Discontinuation](./notifications/migration.md) | [ODS Migration Utility](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22492292/Migration+Utility)                 |
| MappingEDU                          | [MappingEDU - Service EOL and Open Source Notice](./notifications/mappingedu.md)  | [MappingEDU](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22496563/MappingEDU)                                   |
| LMS Toolkit                         |                                                                                   | [Ed-Fi LMS Toolkit](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498933/Ed-Fi+LMS+Toolkit)                     |
| Sample Data Generator               |                                                                                   | [Ed-Fi Sample Data Generator](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22495849/Ed-Fi+Sample+Data+Generator) |
| Ed-Fi Dashboards 3.x                |                                                                                   | Not available                                                                                                             |

### Technical Suite Two (Out of Support)

[Ed-Fi Technical Suite 2 - End of Support Notice](./notifications/suite-two.md)

* Ed-Fi ODS/API Platform version 2.x
* Admin App version 1.x
* Data Import version 1.x
* MappingEDU
* Ed-Fi Dashboards 2.x
* Ed-Fi Validation Tool
* MetaEd IDE 2.x
* Analytics Middle Tier 2.x
* Sample Data Generator

### Technical Suite One (Out of Support)

* Ed-Fi ODS 1.x
* Ed-Fi Dashboards 1.x
