# Advisory: String Validation Divergence

Jun 24, 2024

## Issue

Ed-Fi ODS/API 7.1 rejects empty strings (`""`) for optional fields that are
defined with minimum lengths of '1' in the Ed-Fi Unifying Data Model (UDM). This
could impact vendor implementations that do not differentiate between an empty
string and a null value, especially since previous versions of the ODS/API did
not enforce minimum string length. This issue is particularly significant in the
ODS/API 7.x implementation of Data Standard 4.0, considering these validations
were not enforced in the ODS/API 6.x implementation of Data Standard 4.0.

## Background

The Ed-Fi Unifying Data Model (UDM) defines minimum and maximum length for
string data types
([example](https://schema.ed-fi.org/datahandbook-v400/index.html#/LocalCourseCode69))
and minimum and maximum values for integer
([example](https://schema.ed-fi.org/datahandbook-v400/index.html#/LocalFiscalYear3225))
and decimal datatypes. In ODS / API implementations prior to v7.x, these
validations were not enforced.  Recognizing this as a longstanding gap in the
ODS/API implementation, a decision was made to address it in ODS/API version
7.x. Given the potential impact of rectifying this bug, it was communicated as a
breaking change in the release notes to ensure stakeholders were adequately
prepared for the transition.

## Affected Versions

 Affected ODS/API versions:

* 7.1

## Patch Releases

To minimize the impact on integrations, Ed-Fi released patch to the ODS/API v7.1
that allow empty strings for optional fields.

### Nuget Packages

* [7.1 Binary
  Releases](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Binary+Releases)
  (Updated packages are marked with patch update date `06/2024`)

### Source code releases

* [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.1-patch2)
* [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.1-patch2)

## Code Changes

GitHub pull requests:

* [Ed-Fi-Extensions
  #107](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Extensions/pull/107)
* [Ed-Fi ODS #616](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/pull/616)
* [Ed-Fi ODS #617](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/pull/617)
* [Ed-Fi-ODS #726](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/pull/726)
* [Ed-Fi-ODS-Implementation
  #563](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/563)
* [Ed-Fi-ODS-Implementation
  #564](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/564)
* [Ed-Fi-ODS-Implementation
  #566](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/566)
* [Ed-Fi-ODS-Implementation
  #668](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/678)
* [Ed-FI-ODS-Implementation
  #680](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/680)
