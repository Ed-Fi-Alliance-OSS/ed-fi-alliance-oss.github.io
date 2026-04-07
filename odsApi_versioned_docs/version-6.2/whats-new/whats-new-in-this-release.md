---
description: Detailed description of new features in ODS/API v6.2.
sidebar_position: 1
---

# What's New In This Release

This section provides an overview of the new features in v6.2 of the Ed-Fi ODS /
API, targeted for deployment starting in the 2024–2025 school year. A
comprehensive list of all changes can be found in the [Release
Notes](./release-notes.md) section.

Detail about each change follows.

## Improvements & Enhancements

This section briefly describes the new features and enhancements built into the
Ed-Fi ODS / API Platform v6.2 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v6.2 adds support for [Ed-Fi Data Standard
v4](/reference/data-exchange/data-standard/4/) implementation, with
no breaking changes from the previous Data Standard v3.3. Refer to [What's New
in Data Standard
v4](/reference/data-exchange/data-standard/4/whats-new/whats-new-v40) for
details. Additionally, Ed-Fi ODS/API v6.2 continues to support Data Standard
v4.0 implementation.

### Enhanced API Error Handling

The Ed-Fi ODS/API adheres to REST principles when responding to HTTP requests,
including the use of standard status codes in HTTP responses. Starting from
version 6.2, the ODS/API implements the [Problem Details RFC
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
traceability of API error responses, benefiting both developers and users.

### MetaEd IDE v4.4

Implementing extensions in Ed-Fi ODS / API v6.2 requires implementers to update
to [MetaEd IDE
v4.4](/reference/metaed/). Refer to
[MetaEd 4.4](/reference/metaed/releases/4.4.0)
for details on latest updates and improvements.
