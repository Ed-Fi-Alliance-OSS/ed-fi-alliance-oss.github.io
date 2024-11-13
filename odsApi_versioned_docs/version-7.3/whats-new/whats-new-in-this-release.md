---
description: Detailed description of new features in ODS/API v7.3.
---

# What's New In This Release

This section provides an overview of the new features in v7.3 of the Ed-Fi ODS /
API, targeted for deployment starting in the 2024–2025 school year. A
comprehensive list of all changes can be found in the [Release
Notes](./release-notes.md) section.

Detail about each change follows.

## Improvements & Enhancements

This section briefly describes the new features and enhancements built into the
Ed-Fi ODS / API Platform v7.3 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v7.3 adds support for [Ed-Fi Data Standard
v5.1](https://edfi.atlassian.net/wiki/spaces/EFDS5/overview) implementation, with
no breaking changes from the previous Data Standard v5.0. Refer to [What's New
in Data Standard
v5](https://edfi.atlassian.net/wiki/spaces/EFDS5/pages/26706990/What%27s+New) for
details. Additionally, Ed-Fi ODS/API v7.3 continues to support Data Standard
v4.0 implementation.

### Enhanced API Error Handling

The Ed-Fi ODS/API adheres to REST principles when responding to HTTP requests,
including the use of standard status codes in HTTP responses. Starting from
version 7.3, the ODS/API implements the [Problem Details RFC
9457](https://www.rfc-editor.org/rfc/rfc9457.html). This improvement ensures
that error messages are both machine-readable and user-friendly, providing clear
and actionable information to developers and users. Key benefits include:

* Standardization: Aligns with RFC 9457 for consistent machine-readable error
  responses across the API.
* Improved User Experience: User-friendly messages help quickly understand and
  address data submission issues.
* Enhanced Traceability: Comprehensive error details and correlation IDs
  facilitate easier troubleshooting.
* Efficient Data Submission: Reporting all validation errors in a single
  response reduces the number of submission attempts.

Overall, this feature significantly enhances the clarity, usability, and
traceability of API error responses, benefiting both developers and users. For
details and examples of the new error response format, please refer to [Error
Response Knowledge
Base](../client-developers-guide/error-response-knowledge-base.md).  

### MetaEd IDE v4.4

Implementing extensions in Ed-Fi ODS / API v7.3 requires implementers to update
to [MetaEd IDE
v4.4](https://edfi.atlassian.net/wiki/display/METAED20/MetaEd+Home). Refer to
[MetaEd 4.4 What's
New](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23711107/What%27s+New)
for details on latest updates and improvements.

## Improvements & Enhancements - Previous v7.x

Refer to [What's New in Previous v7.x
Releases](./whats-new-in-prev-v7x-releases.md) for details on the
features added in v7.0 of the Ed-Fi ODS / API.
