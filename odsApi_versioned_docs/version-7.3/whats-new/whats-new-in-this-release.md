---
description: Detailed description of new features in ODS/API v7.3.
sidebar_position: 1
---

# What's New In This Release

This section provides an overview of the new features in v7.3 of the Ed-Fi ODS /
API, targeted for deployment starting in the 2025–2026 school year. A
comprehensive list of all changes can be found in the [Release
Notes](./release-notes.md) section.

Detail about each change follows.

## Improvements & Enhancements

This section briefly describes the new features and enhancements built into the
Ed-Fi ODS / API Platform v7.3 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v7.3 adds [Ed-Fi Data Standard
v5.2](https://edfi.atlassian.net/wiki/spaces/EFDS5/overview) implementation, with
no breaking changes from the previous Data Standard v5.x. Refer to [What's New
in Data Standard
v5](https://edfi.atlassian.net/wiki/spaces/EFDS5/pages/26706990/What%27s+New) for
details. Additionally, Ed-Fi ODS/API v7.3 continues to support Data Standard
v4.0 implementation.

### Partitioned Cursor-Based Paging

Ed-Fi ODS/API v7.3 introduces partitioned cursor-based paging to significantly
reduce query overhead when paging through large datasets. This approach provides
an alternative to traditional offset-based pagination. It uses lightweight,
sequential page tokens while retaining parallel processing capabilities through
the partitions endpoint. For instructions on using this feature, refer to
[Improve Paging Performance with Partitioned Cursor
Paging](./../client-developers-guide/improve-paging-performance-cursor-paging.md).
To learn more about the design and the performance improvements it offers, refer
to [Cursor Paging for Improved Data Out
Performance](./../technical-articles/cursor-paging-implementation-for-improved-data-out-performance.md)

### Search by Identification Code

This release introduces the ability to query resources by identification codes,
enabling just-in-time lookups instead of requiring maintenance of a local
mapping of identification codes used within the ecosystem. This enhancement
simplifies API integration for clients rostered with identification codes that
differ from identifiers used by the API host.

### Token Info and Permissions

Ed-Fi ODS/API v7.3 enhances the /oauth/token_info endpoint to include
resource-level permissions, along with namespace prefixes, associated education
organizations, and profiles assigned to a token. Refer to [Token
Info](./../client-developers-guide/authorization.md/#token-info) for details.

### Extensible Authorization Filtering

Ed-Fi ODS/API v7.3 introduces powerful and flexible mechanism to define
authorization strategies without requiring code changes. This feature allows
implementers to create database views tailored to specific authorization needs,
such as restricting access by student program enrollment or grade level.
Granular security setup can be achieved simply by creating a custom database
view and configuring the necessary metadata without requiring recompilation or
API process restart. This enhancement streamlines the implementation of nuanced
security strategies, enabling greater control and adaptability for diverse use
cases. Refer to articles on [Authorizing Requests Using Custom Database
Views](./../technical-articles/authorizing-requests-using-custom-database-views.md)
and [How To: Use Custom View-Based
Authorization](./../how-to-guides/how-to-use-custom-view-based-authorization.md)
for details.

### MetaEd IDE v4.5

Implementing extensions in Ed-Fi ODS / API v7.3 requires implementers to update
to [MetaEd IDE v4.5](/reference/metaed). Refer to [MetaEd 4.5 What's
New](/reference/metaed/releases/4.4.0) for details on latest updates and
improvements.

## Improvements & Enhancements - Previous v7.x

Refer to [What's New in Previous v7.x
Releases](./whats-new-in-prev-v7x-releases.md) for details on the features added
in previous v7.x releases of the Ed-Fi ODS / API.
