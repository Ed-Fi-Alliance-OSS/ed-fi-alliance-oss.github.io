---
description: Detailed description of new features in ODS/API v7.3.
sidebar_position: 1
---

# What's New In This Release

This section provides an overview of the new features in Ed-Fi ODS / API v7.3.1,
targeted for deployment starting in the 2026–2027 school year. A comprehensive
list of all changes can be found in the [Release Notes](./release-notes.md)
section.

Details about each change are outlined below.

## Improvements & Enhancements

This section highlights the new features and improvements introduced in Ed-Fi
ODS / API Platform v7.3.1 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v7.3.1 adds [Ed-Fi Data Standard
v5.6](/reference/data-exchange/data-standard/) implementation, which introduced
breaking changes to the core data model for domains commonly used by student
information systems and assessment systems. Refer to [What's New in Data
Standard v5](/reference/data-exchange/data-standard/whats-new/) for
details. Additionally, Ed-Fi ODS / API v7.3 continues to support implementations
of Ed-Fi Data Standard v5.2 and v4.0.

### Domain Metadata in OpenAPI Specification

Ed-Fi ODS / API v7.3.1 introduces [Ed-Fi
Domains](/reference/data-exchange/udm/getting-started/ed-fi-domains) metadata
for resources and descriptors in the OpenAPI specification. The
`x-Ed-Fi-domains` fields have been added to the OpenAPI specification to make it
easier to identify which Ed-Fi Data Standard domain each resource or descriptor
belongs to. The Swagger UI application now includes a configuration option to
enable or disable the display of domain information.

With the inclusion of EPDM, Data Standard v6.0 significantly increases the
number of resources. To improve readability, the API includes a configuration
setting that allows implementers to exclude unused domains from the OpenAPI
spec.

See [Configuration
Details](./../platform-dev-guide/configuration/configuration-details) page for
more information on these new settings.

### MetaEd IDE v4.6

Implementing extensions in Ed-Fi ODS / API v7.3.1 requires implementers to
update to [MetaEd IDE v4.6](/reference/metaed). Refer to [MetaEd 4.6 What's
New](/reference/metaed/releases/4.6.0) for details on latest updates and
improvements.

### Configuration Updates

There are updates to the configuration settings in this release and the previous
v7.3.0 release. New entries are marked with 🆕 icon in the [Configuration
Details](./../platform-dev-guide/configuration/configuration-details) page.

## Improvements & Enhancements - Previous v7.x

Refer to [What's New in Previous v7.x
Releases](./whats-new-in-prev-v7x-releases.md) for details on the features added
in previous v7.x releases of the Ed-Fi ODS / API.
