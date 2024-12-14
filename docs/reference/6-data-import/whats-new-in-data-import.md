# What's New in Data Import

This section provides an overview of what's new for Data Import releases:

# What's New in Data Import v2.3

The following improvements and fixes were made in Data Import v2.3:

*   [DI-1337](https://tracker.ed-fi.org/browse/DI-1337) - .NET 8 Update
*   [DI-1336](https://tracker.ed-fi.org/browse/DI-1336) - ODS/API 7.x compatibility
*   [DI-1358](https://tracker.ed-fi.org/browse/DI-1358) - ODS/API 7.x compatibility for data map templates
*   [DI-1366](https://tracker.ed-fi.org/browse/DI-1366) - Add fields into the ingestion log for both UI and Serilog ingestion logs
*   [DI-1353](https://tracker.ed-fi.org/browse/DI-1353) - DataImport v2.1 error saving DataMap with too many fields (field contrib)
*   [DI-1359](https://tracker.ed-fi.org/browse/DI-1359) - Fix .yml file to raise DataImport in Docker
*   [DI-1365](https://tracker.ed-fi.org/browse/DI-1365) - Refresh Button Feedback Enhancement (field contrib)
*   [DI-1369](https://tracker.ed-fi.org/browse/DI-1369) - UI Fix: The columns in 'Data Map' are not shown with the correct distribution, everything is together

# What's New in Data Import v2.2

The following improvements and fixes were made in Data Import v2.2:

*   [DI-1066](https://tracker.ed-fi.org/browse/DI-1066) - Error saving long Map form
*   [DI-1168](https://tracker.ed-fi.org/browse/DI-1168) - Uploading large CSV file into MAP, error 431 appears and browser is cleared
*   [DI-1319](https://tracker.ed-fi.org/browse/DI-1319) - Delete Support in Data Import. Please see [Bulk Delete using Data Import](../data-import/technical-articles/bulk-delete-using-data-import) for full documentation on this feature.
    *   [DI-1132](https://tracker.ed-fi.org/browse/DI-1132) - DELETE by id
    *   [DI-1318](https://tracker.ed-fi.org/browse/DI-1318) - DELETE by natural key

# What's New in Data Import v2.1

The following improvements and fixes were made in Data Import v2.1:

*   [DI-1008](https://tracker.ed-fi.org/browse/DI-1008) - Update DI versioning/release process to match Ed-Fi modern release practice
*   [DI-1176](https://tracker.ed-fi.org/browse/DI-1176) - RestSharp Vulnerability & and other high priority dependabot alerts
*   [DI-1180](https://tracker.ed-fi.org/browse/DI-1180) - Change PGBOUNCER\_LISTEN\_PORT variable in docker settings
*   [DI-1210](https://tracker.ed-fi.org/browse/DI-1210) - Remove duplicate column validation for manual uploads
*   [DI-1242](https://tracker.ed-fi.org/browse/DI-1242) - Move AllowUserRegistration to appsettings
*   [DI-124](https://tracker.ed-fi.org/browse/DI-1249)[9](https://tracker.ed-fi.org/browse/DI-1249) - Error log not displaying row number during transformload run on docker
*   [DI-126](https://tracker.ed-fi.org/browse/DI-1265)[5](https://tracker.ed-fi.org/browse/DI-1265) - Data Import v 1.3.2 does not log missing lookup failures
*   [DI-1277](https://tracker.ed-fi.org/browse/DI-1277) - Serilog for Ingestion Log
*   [DI-12](https://tracker.ed-fi.org/browse/DI-1282)[78](https://tracker.ed-fi.org/browse/DI-1278) - Implement ability for account lockout and reset
*   [DI-1281](https://tracker.ed-fi.org/browse/DI-1281) - Combine Data Import web package and installer
*   [DI-1249](https://tracker.ed-fi.org/browse/DI-1249) - Error log not displaying row number during transformload run on docker
*   [DI-1258](https://tracker.ed-fi.org/browse/DI-1258) - Update or Replace System.Data.SqlClient in Data Import
*   [DI-1292](https://tracker.ed-fi.org/browse/DI-1292) - 'Last Executed' row is not updated after to run the transform load

# What's New in Data Import v2.0

The following improvements and fixes were made in Data Import v2.0:

*   [DI-1169](https://tracker.ed-fi.org/browse/DI-1169) - Multi-threading support for Data Import
*   [DI-1230](https://edfi.atlassian.net/wiki/display/EDFITOOLS/What%27s+New) - Open sourcing of Data Import v2.0 with an Apache 2.0 license
*   [DI-1236](https://tracker.ed-fi.org/browse/DI-1236) - Implement SSO via OpenID Connect (OIDC) (an EdWire community contribution)
*   [DI-1238](https://tracker.ed-fi.org/browse/DI-1238) - Removing product improvement
*   [DI-1237](https://tracker.ed-fi.org/browse/DI-1237) - Improvements to Data Import documentation to its source repository
*   [DI-1244](https://tracker.ed-fi.org/browse/DI-1244) - Moving templates from the Template Sharing Service to an [Ed-Fi Exchange repository](https://github.com/Ed-Fi-Exchange-OSS/DataImport-Templates)
*   [DI-1201](https://tracker.ed-fi.org/browse/DI-1201) - Implement GitHub code linting for DataImport.Common

# What's New in Data Import v1.3.2

The following improvements and fixes were made in Data Import v1.3.2:

*   [EDFI-1708](https://tracker.ed-fi.org/browse/EDFI-1708) - Data Import not able to access the API - updating required packages for PowerShell pre-processing on TransformLoad command line service
*   [EDFI-1725](https://tracker.ed-fi.org/browse/EDFI-1725) - Data Import not honoring APPSETTINGS\_\_DATABASEENGINE variable - supporting SQL Server use cases within Docker context

# What's New in Data Import v1.3

The following improvements and fixes were made in Data Import v1.3, with major community contributions from [Instructure](https://www.instructure.com/)\*:

*   [DI-1039](https://tracker.ed-fi.org/browse/DI-1039) - \*Migration to .NET Core
*   [DI-1117](https://tracker.ed-fi.org/browse/DI-1117) - Configuring Data Import to run within Docker containers (taking advantage of the .NET Core migration work)
*   [DI-770](https://tracker.ed-fi.org/browse/DI-770) - Postgres support
*   [DI-1064](https://tracker.ed-fi.org/browse/DI-1064) - Support for external, administrator-defined preprocessors
*   [DI-1058](https://tracker.ed-fi.org/browse/DI-1058) - Ability to manually specific agent run order
*   Bug fixes and changes based on field reports.

# What's New in Data Import v1.2

The following improvements and fixes were made in Data Import v1.2, with major community contributions from [Instructure](https://www.instructure.com/)\*:

*   [DI-480](https://tracker.ed-fi.org/browse/DI-480) - \*Major enhancements to PowerShell pre-processing, including security-based sandboxing. For more information see [Integrated Custom File Processors](../data-import/technical-articles/preprocessing-csv-files/integrated-custom-file-processors).
*   [DI-929](https://tracker.ed-fi.org/browse/DI-929) - Ability to import Template Sharing templates across multiple versions of the ODS / API with same major version of Ed-Fi Data Suite (3.x for example). For more information see [Cross-Version Template Sharing](../data-import/technical-articles/data-import-article-archive/cross-version-template-sharing).
*   [DI-940](https://tracker.ed-fi.org/browse/DI-940) - Currency data handling from Swagger "numeric" type.
*   Bug fixes and changes based on field reports.

# What's New in Data Import v1.1.1

The following improvements and fixes were made in Data Import v1.1.1.

*   Bug fix for ODS / API Suite 2 (2.5, 2.5.1 and 2.6) compatibility

# What's New in Data Import v1.1.0

The following improvements and fixes were made in Data Import v1.1.0, with major community contributions from [Instructure](https://www.instructure.com/)\*:

*   \*Multi-connection support for multiple ODS / APIs within the same environment or multiple key/secret pairs on the same ODS / API
*   Update for optional "Supplemental Information" field in the Template Sharing Service
*   Optional port number for SFTP/FTPS connections
*   Bug fixes

# What's New in Data Import v1.0.2

The following improvements and fixes were made in Data Import v1.0.2.

*   Updates for compatibility with semantic versioning numbering starting with Ed-Fi ODS / API v5.0.0

# What's New in Data Import v1.0.1

The following improvements and fixes were made in Data Import v1.0.1.

*   Consolidation of Transform Load, File Transfer and File Cleanup service into one service for easier setup and maintenance
*   New Activity pane to show status of import jobs in the web application
*   PowerShell integration for row-level or file-level pre-processing (see [Integrated Custom Record Processing](../data-import/technical-articles/preprocessing-csv-files/integrated-custom-record-processing) and [Integrated Custom File Generation](../data-import/technical-articles/preprocessing-csv-files/integrated-custom-file-generation))
*   Ed-Fi Product Improvement (Google Analytics and Jira / Ed-Fi Tracker integration, see [\_Product Improvement](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24118943) for more information)
*   Enhancements to run in SaaS contexts and improvements for running on Azure
*   EDFI-183 - "Logs tabs with refresh"
*   [EDFI-184](https://tracker.ed-fi.org/browse/EDFI-184) - "Ability to add multiple users"
*   [EDFI-189](https://tracker.ed-fi.org/browse/EDFI-189) - "installation issues on Windows 2012"
*   [EDFI-198](https://tracker.ed-fi.org/browse/EDFI-198) - "ODS/API key/secret debugging"
*   [EDFI-207](https://tracker.ed-fi.org/browse/EDFI-207) - "PowerShell integration (representing multiple field requests)"
*   Other internal optimizations and performance enhancements

# What's New in Data Import v1.0

The following improvements and fixes were made in since Data Import 1.0 RC 3 release.

*   [EDFI-178](https://tracker.ed-fi.org/browse/EDFI-178) - "Configuration updated and files up to 200MB tested on Windows Server & IIS 10

*   [EDFI-174](https://tracker.ed-fi.org/browse/EDFI-174) - "URL handling improvements"
*   Template Sharing Service to allow sharing of metadata for ETL jobs (maps, bootstraps and lookups)
*   Enhancements to Data Import logging statements, including TransformLoad service
*   Other internal optimizations and performance enhancements

# What's New in Data Import v1.0 Release Candidate 3

The following improvements and fixes were made in since Data Import 1.0 RC 2 release.

*   [EDFI-157](https://tracker.ed-fi.org/browse/EDFI-157) - "FTPS issues and labels fixed"
*   [EDFI-172](https://tracker.ed-fi.org/browse/EDFI-172) - "Year-specific issues fixed"

# What's New in Data Import v1.0 Release Candidate 2

The following improvements and fixes were made in since Data Import 1.0 RC 1 release.

*   [EDFI-152](https://tracker.ed-fi.org/browse/EDFI-152) - FIXED - Error when trying to export template from data import tool
*   [EDFI-143](https://tracker.ed-fi.org/browse/EDFI-143) - FIXED - TransformLoad gets Exception when parsing NLog.config

# What's New in Data Import v1.0 Release Candidate 1

The following improvements and fixes were made in Data Import since the [Tech Congress 2019 Tech Preview](https://edfi.atlassian.net/wiki/display/ESIG/Data+Import+-+Technical+Congress+2019+Hands-On+Lab) release.

## New Features

*   Full support for both Ed-Fi ODS / API 2.5 and 3.1 (and later version numbers)
*   Data import capabilities, based on multiple implementor requests, including:

    *   Import capability for all Ed-Fi objects (previously only the Assessment domain was supported)

    *   Import capability for Ed-Fi Descriptors

*   User Interface for CSV to Ed-Fi data mapping function including:
    *   Support for multiple sub-objects
    *   Support for optional fields
    *   [EDFI-122](https://tracker.ed-fi.org/browse/EDFI-122) - "Data Mapper unable to determine fields"
    *   [EDFI-105](https://tracker.ed-fi.org/browse/EDFI-105) - "Issues With Data Import Data Map"
    *   [EDFI-89](https://tracker.ed-fi.org/browse/EDFI-89) - "Student assessment score result upload using GUI doesn't fully save JSON map"
*   Import and export of templates (CSV to Ed-Fi maps, lookups and bootstrap data)

*   Installation options, providing both EXE and ZIP installation options
    *   [EDFI-98](https://tracker.ed-fi.org/browse/EDFI-98) - "Provide documentation to install under IIS (not IIS Express)"

## Improvements

*   Performance improvements:

    *   [EDFI-120](https://tracker.ed-fi.org/browse/EDFI-120) - "Data Flow/Import Transform load application failed to process more than 6000 records in single file"
    *   [EDFI-123](https://tracker.ed-fi.org/browse/EDFI-123) - "Data Import Agent Manual Upload Fails can't access file used by other process"
    *   [EDFI-136](https://tracker.ed-fi.org/browse/EDFI-136) - "When Admin config is changed Bootstraps and Maps are removed"
    *   [EDFI-106](https://tracker.ed-fi.org/browse/EDFI-106) - "Data Import Exercise From Lab - Unhandled Exception - logging?"
    *   [EDFI-142](https://tracker.ed-fi.org/browse/EDFI-142) - "Does data import tool support jagged column result sets"

This page:

*   [What's New in Data Import v2.3](#whats-new-in-data-import-v23)
*   [What's New in Data Import v2.2](#whats-new-in-data-import-v22)
*   [What's New in Data Import v2.1](#whats-new-in-data-import-v21)
*   [What's New in Data Import v2.0](#whats-new-in-data-import-v20)
*   [What's New in Data Import v1.3.2](#whats-new-in-data-import-v132)
*   [What's New in Data Import v1.3](#whats-new-in-data-import-v13)
*   [What's New in Data Import v1.2](#whats-new-in-data-import-v12)
*   [What's New in Data Import v1.1.1](#whats-new-in-data-import-v111)
*   [What's New in Data Import v1.1.0](#whats-new-in-data-import-v110)
*   [What's New in Data Import v1.0.2](#whats-new-in-data-import-v102)
*   [What's New in Data Import v1.0.1](#whats-new-in-data-import-v101)
*   [What's New in Data Import v1.0](#whats-new-in-data-import-v10)
*   [What's New in Data Import v1.0 Release Candidate 3](#whats-new-in-data-import-v10-release-candidate-3)
*   [What's New in Data Import v1.0 Release Candidate 2](#whats-new-in-data-import-v10-release-candidate-2)
*   [What's New in Data Import v1.0 Release Candidate 1](#whats-new-in-data-import-v10-release-candidate-1)
