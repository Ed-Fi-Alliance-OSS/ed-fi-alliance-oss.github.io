---
description: Detailed description of new features in ODS/API v7.3.
sidebar_position: 1
---

# What's New In This Release

This section provides an overview of the new features in Ed-Fi ODS / API v7.3.2,
targeted for deployment beginning with the 2026–2027 school year. A
comprehensive list of all changes is available in the [Release
Notes](./release-notes.md) section.

Details about each change are outlined below.

## Improvements & Enhancements

This section highlights the new features and improvements introduced in Ed-Fi
ODS / API Platform v7.3.2 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v7.3.2 adds [Ed-Fi Data Standard
v6.1](/reference/data-exchange/data-standard/) implementation, with no breaking
changes from the previous Data Standard v6.0. For more information, refer to
[What's New in Data Standard
v6](/reference/data-exchange/data-standard/whats-new/). Additionally, Ed-Fi ODS
/ API v7.3.2 continues to support implementations of Ed-Fi Data Standard v5.2
and v4.0.

### Ed-Fi OneRoster API Integration

Ed-Fi ODS / API v7.3.2 introduces the Ed-Fi OneRoster API, a new optional
platform feature that exposes rostering data from the ODS using the 1EdTech
OneRoster® 1.2 specification. This enables API Hosts to support common rostering
use cases—such as LMS provisioning and instructional tool onboarding—without
introducing new data pipelines or duplicating security infrastructure.

The OneRoster API is deployed as a separate service that reads from database
tables and views on the Ed-Fi ODS, ensuring data consistency while remaining
operationally independent from the core ODS / API. Supported resources include
organizations, schools, academic sessions, courses, classes, users (students and
teachers), enrollments, and demographics.

API clients use the same OAuth 2.0 key and secret to access both the ODS / API
and the OneRoster API service. Authorization is enforced through the existing
Ed-Fi claims-based access control model, requiring no separate credential
management.

Refer to [OneRoster API](./../platform-dev-guide/features/oneroster.md) for a
platform feature overview and design details. For a step-by-step configuration
walkthrough, refer to [How To: Enable OneRoster with the Ed-Fi ODS /
API](./../how-to-guides/how-to-oneroster-with-the-ed-fi-ods-api.md).

### MetaEd IDE v4.7

Implementing extensions in Ed-Fi ODS / API v7.3.2 requires implementers to
update to [MetaEd IDE v4.7](/reference/metaed). Refer to [MetaEd 4.7 What's
New](/reference/metaed/releases/4.7.0) for details on latest updates and
improvements.

### Configuration Updates

There are updates to the configuration settings in this release and the previous
v7.3.0 release. New entries are marked with 🆕 icon in the [Configuration
Details](/reference/ods-api/platform-dev-guide/configuration/configuration-details) page.

## Improvements & Enhancements - Previous v7.x

Refer to [What's New in Previous v7.x
Releases](./whats-new-in-prev-v7x-releases.md) for details on the features added
in previous v7.x releases. Refer to [Downloads](./../downloads) for the previous
v7.3.0 release tags and binaries.
