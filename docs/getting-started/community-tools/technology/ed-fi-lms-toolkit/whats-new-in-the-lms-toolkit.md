# What's New in the LMS Toolkit

## Version 1.3

This release includes performance updates to the Instructure Canvas LMS connector, utilizing the GraphQL interface instead of the REST API interface as in prior versions.  In testing, we've seen a significant increase in performance where a test run that previously took 3 mins 24 seconds, now takes 47 seconds with the new interface.

There are no new bug or security fixes in this release.

## Version 1.2

This release includes two important new features:

* Full support for PostgreSQL 11+ for both the LMS Data Store Loader and the LMS Harmonizer
* LMSX Extension Plugin for the Ed-Fi ODS/API Suite 3, version 5.2 and version 5.3

In addition, the dependencies in the Python projects were brought up to date to help ensure that the tools remain easy to maintain as the ecosystem continues to evolve.

There are no new bug or security fixes in this release, which already includes the fixes mentioned below for version 1.1.1.

## Version 1.1.1

This patch release address a flaw in the Google Classroom Extractor, which sometimes would run into HTTP 503 errors when calling the Google API. These errors only occurred with in-active courses, so the extractor now any course with status other than ACTIVE. This also provides a significant performance boost to the extractor, when the account does contain inactive courses. See [LMS-414](https://tracker.ed-fi.org/browse/LMS-414) for more information.

In addition, a shared package called `edfi-sql-adapter` was accidentally released with a pre-release version. It has now been relabeled as `1.0.0` and the two projects that depend on it, the LMS Data Store Loader and the LMS Harmonizer, are updated to use that version of the package.

Packages published as 1.1.1:

* edfi-google-classroom-extractor
* edfi-lms-ds-loader
* edfi-lms-harmonizer
* edfi-sql-adapter

### Bug Fixes 1.1.1

* LMS-414: Fatal error when running Google Classroom extractor
* LMS-424: Publish release version of SQL Adapter

## Version 1.1.0

GitHub artifacts: [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/releases/tag/1.1.0](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/releases/tag/1.1.0)

### New Features

* LMS Harmonizer: matches Assignment data extracted from the LMS with students and sections from SIS data, storing the results into a new **LMSX** database schema (part of a future LMSX extension to the ODS/API).

### Enhancements

None

### Bug Fixes

None

## Canvas Extractor Version 1.0.1

There were no published changes to the other tools in this release.

### Bugs Fixed

* LMS-324: Canvas Assignments Submission File Has Incorrect Assignment Source System Identifier
* LMS-265: Not Getting any Assignment Submission Data or System Activity Data from LMS Toolkit Canvas Extractor

### Other Changes

* LMS-272: Potential Performance Enhancement for the Canvas Extractor (LMS Toolkit)

## Version 1.0.0

Initial release includes the following tools:

* Canvas Extractor
* Google Classroom Extractor
* Schoology Extractor
* LMS Data Store Loader

The three extractors fully support export of CSV files for the following [LMS Unifying Data Model](./lms-unifying-data-model/readme.md) resources:

* Core feature (always enabled):
  * Students
  * Sections
  * Section Associations
* Assignments feature (optional download):
  * Assignments
  * Assignment Submissions

They also have experimental support, to varying degrees, for the following resources:

* Activities
  * Section Activities (e.g. discussions)
  * System Activities (e.g. group discussions outside of a class, sign-in / sign-out)
* Attendance (Schoology only)
* Grades (Canvas only)

The LMS Data Store Loader supports loading all but the grade files into a SQL Server database.

For install and usage instructions, please see the [User Guide](./lms-toolkit-user-guide/readme.md).
