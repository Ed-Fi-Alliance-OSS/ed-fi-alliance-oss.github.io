# Ed-Fi Technology Suite Supported Versions

Version numbers are sometimes given like 1.2.x below. This indicates that the
software may receive bug and security fixes from time to time, and the latest
precise patch number will not be updated on this page. See
[Ed-Fi Software Versioning](/community/sdlc/code-contribution-guidelines/software-versioning)
and
[Ed-Fi Data Standard Versioning and Releases](../1-data-exchange/versioning-and-releases.md)
for more information on the versioning practices.

## Ed-Fi Data Standard

See [Ed-Fi Data Exchange Standards](../1-data-exchange/readme.md) for more information.

| Version                                          | Timeline                               | Ed-Fi API Software                                                          |
| ------------------------------------------------ | -------------------------------------- | ----------------------------------------------------------------------------|
| 3.3.1                                            | Active through 2024-2025 school year   | Ed-FI ODS/API 5.3                                                           |
| 4.0.0                                            | Active through 2025-2026 school year   | Ed-Fi ODS/API 6.2 and Ed-Fi ODS/API 7.x                                     |
| 5.0.0                                            | Active through 2027-2028 school year   | Ed-FI ODS/API 7.1                                                           |
| 5.1.0                                            | Active through 2027-2028 school year   | Ed-Fi ODS/API 7.2                                                           |
| 5.2.0                                            | Active through 2027-2028 school year   | Ed-Fi ODS/API 7.3                                                           |
| [6.0.0](/reference/data-exchange/data-standard/) | Active through 2029-2030 school year   | Ed-Fi ODS/API 7.3 and Ed-Fi Data Management Service 1.0 (Coming in Q1 2026) |

Development of extensions for the Ed-Fi Data Standard relies on
[MetaEd](../4-metaed/readme.md) version 4.x. As Visual Studio Code extension,
MetaEd will self-update to the latest version unless the user disables the
self-update feature.

## ODS/API Platform

The _Ed-Fi ODS/API Platform_ is the group of tools that work together to support
a production deployment of the Ed-Fi Resources API. The Platform includes:

* [Ed-Fi ODS/API](../ods-api-platform.mdx), the official Ed-Fi implementation of a REST API
  defined by the Ed-Fi Data Standard.
  * Also includes the _Ed-Fi ODS Sandbox Admin_ and _Ed-Fi Swagger UI_ web
    applications.
* [Ed-Fi ODS Admin API](../3-admin-api/readme.md), a REST interface for managing
  client credentials ("key and secret") and security configuration.
* [Ed-Fi ODS Admin App](../8-admin-app/readme.md), a web application for
  managing single instances of an Ed-Fi ODS/API.

### Ed-Fi ODS/API

| Version                         | Timeline                             | Data Standard(s)    |
| ------------------------------- | ------------------------------------ | ------------------- |
| [6.2.x](/reference/ods-api/6.2) | Active through 2025-2026 school year | 4.0.0               |
| 7.0.0                           | Replaced by 7.1                      | 4.0.0, 5.0.0        |
| [7.1.x](/reference/ods-api/7.1) | Active through 2025-2026 school year | 4.0.0, 5.0.0        |
| [7.2.x](/reference/ods-api/7.2) | ⚠️ inactive - upgrade to 7.3         | 4.0.0, 5.1.0        |
| [7.3.0](/reference/ods-api/)    | Active through 2025-2026 school year | 4.0.0, 5.2.0        |
| [7.3.1](/reference/ods-api/)    | Coming soon (November/December 2025) | 4.0.0, 5.2.0, 6.0.0 |

Out of Support: all releases prior to ODS/API 6.2.

### Ed-Fi ODS Admin API

:::tip

In addition to patch releases, minor releases with additional
backward-compatible functionality are made from time to time. The latest
minor.patch release is always the supported version. For example, if a bug is
found in version 2.1.0 and version 2.2.0 is already out, then the bug will be
fixed in 2.2.1 rather than creating a 2.1.1 release.

:::

With version 2.3 (October, 2025), ODS Admin API version 2 will consolidate
functionality from version 1, allowing the single application to support both
ODS/API 6.x and ODS/API 7.x.

| Version | Timeline                             | Supports ODS/API |
| ------- | ------------------------------------ | ---------------- |
| 1.x.y   | Active through 2025-2026 school year | 5.x.y, 6.x.y     |
| 2.x.y   | Active through 2028-2029 school year | 6.x.y, 7.x.y     |

### Ed-Fi Admin App

The legacy ODS Admin App user interface supports ODS/API 5.x and 6.x. It is now
in "maintenance mode", meaning it will only receive critical updates. Formal
support [will end June 30, 2025](./notifications/admin-app-to-exchange.md).

Coming soon (October 2025), the new Ed-Fi Admin App user interface will support
ODS/API 6.x and ODS/API 7.x, and it will be extended to support the new Data
Management Service (DMS) in 2026. This application provides an all new front-end
application paired with the ODS Admin API on the backend.

| Version | Timeline                             | Supports ODS/API |
| ------- | ------------------------------------ | ---------------- |
| 3.3     | Maintenance mode until June 30, 2026 | 5.x.y, 6.x.y     |
| 4.x     | Coming October 2025                  | 6.x.y, 7.x.y     |

### Docker Deployments

The [sample Docker Compose scripts](../7-docker/readme.mdx) demonstrate how to
run these applications together, and provide a quick startup option for running
a local testing environment. Because these are demonstration scripts, not meant
for production, they are not always fully up-to-date with the latest software
versions.

| Version | Supports                                                            |
| ------- | ------------------------------------------------------------------- |
| 2.3.x   | ODS/API 6.2.x and Admin App 3.2.1                                   |
| 3.1.x   | ODS/API 7.x (latest minor/patch) and Admin API 2.1.x (latest patch) |

Out of Support: all releases prior to 2.3, including the "Docker 2.2.x" release
that supported ODS/API 5.4 and Admin App 3.2.

## Data Management Service

This is the future replacement for the Ed-Fi ODS/API. See
[Ed-Fi ODS/API and Data Management Service FAQ](./api-faq.md) for more
information.

| Version           | Timeline                                 | Data Standard(s) |
| ----------------- | ---------------------------------------- | ---------------- |
| Release Candidate | Summer 2025                              | 5.2.0            |
| 1.0               | Coming Q1 2026 for school year 2026-2027 | 6.0, others      |

## Tools

Additional applications formally maintained and supported by the Ed-Fi Alliance:

* [API Publisher](../5-api-publisher/readme.md) works with all supported
  versions of the Ed-Fi ODS/API
* [Data Import](../6-data-import/readme.md) works with all supported versions of
  the Ed-Fi ODS/API (supported through June 30, 2026)
* [Analytics Middle Tier](../9-analytics-middle-tier/readme.md) works with 5.x
and 6.x
  versions of the Ed-Fi ODS/API.

In all of these cases, only the latest version is formally supported.

## Out of Support

All versions of these applications are no longer supported.

| Product                             | Notice                                                                            | Ed-Fi Exchange                                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Analytics Middle Tier               | [Analytics Middle Tier Transitioning to Ed-Fi Exchange](./notifications/amt.md)   | (coming soon)                                                                                                             |
| Migration Utility Migration Utility | [End of Support Notice and Product Discontinuation](./notifications/migration.md) | [ODS Migration Utility](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22492292/Migration+Utility)                 |
| MappingEDU                          | [MappingEDU - Service EOL and Open Source Notice](./notifications/mappingedu.md)  | [MappingEDU](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22496563/MappingEDU)                                   |
| LMS Toolkit                         | not available                                                                     | [Ed-Fi LMS Toolkit](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498933/Ed-Fi+LMS+Toolkit)                     |
| Sample Data Generator               | not available                                                                     | [Ed-Fi Sample Data Generator](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22495849/Ed-Fi+Sample+Data+Generator) |
| Ed-Fi Technology Suite 2            | [End of Support Notice](./notifications/suite-two.md)                             | not applicable                                                                                                            |
| Ed-Fi ODS 1.x                       | not available                                                                     | not applicable                                                                                                            |
| Ed-Fi Dashboards                    | not available                                                                     | Not applicable                                                                                                             |
