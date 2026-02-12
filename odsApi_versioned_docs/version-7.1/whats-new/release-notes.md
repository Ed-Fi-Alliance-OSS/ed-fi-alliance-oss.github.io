---
description: Release notes for ODS/API v7.1
---

# Release Notes

This section provides a comprehensive list of the improvements, updates, fixes,
and changes in the Ed-Fi ODS / API for Suite 3 v7.1 release, with links to the relevant issue in the Ed-Fi Tracker.

## Important Epics

* [[ODS-6007](https://tracker.ed-fi.org/browse/ODS-6007)] - Align ODS /API to v5.0 Data Standard
* [[ODS-6015](https://tracker.ed-fi.org/browse/ODS-6015)] - Redesign external cache access
* [[ODS-6096](https://tracker.ed-fi.org/browse/ODS-6096)] - Support Open API Spec 3

## General Improvements & Enhancements

* [[ODS-1540](https://tracker.ed-fi.org/browse/ODS-1540)] - Support better vendor self-service for sandbox refresh in the Sandbox Admin Tool
* [[ODS-1462](https://tracker.ed-fi.org/browse/ODS-1462)] - Use semantic model to derive entity specifications
* [[ODS-4380](https://tracker.ed-fi.org/browse/ODS-4380)] - Move resource claims for non-EdOrg type resources in sample extensions out from under the educationOrganizations resource claim
* [[ODS-5342](https://tracker.ed-fi.org/browse/ODS-5342)] - Optimize authorization to avoid redundant database roundtrips during updates
* [[ODS-5418](https://tracker.ed-fi.org/browse/ODS-5418)] - Refine Descriptor resources request/response bodies and behavior
* [[ODS-5633](https://tracker.ed-fi.org/browse/ODS-5633)] - Align Composites Profile Test Suite with current Postman Test Guidelines
* [[ODS-5857](https://tracker.ed-fi.org/browse/ODS-5857)] - Build for Codegen and extension packages
* [[ODS-5868](https://tracker.ed-fi.org/browse/ODS-5868)] - Add EF Core DbContexts and supporting code to EdFi.Security.DataAccess
* [[ODS-5869](https://tracker.ed-fi.org/browse/ODS-5869)] - Update EdFi.Security.DataAccess to use the new EF 6 core DbContexts
* [[ODS-5870](https://tracker.ed-fi.org/browse/ODS-5870)] - Add EF Core DbContexts and supporting code to EdFi.Admin.DataAccess
* [[ODS-5871](https://tracker.ed-fi.org/browse/ODS-5871)] - Update EdFi.Admin.DataAccess to use the new EF 6 Core DbContexts
* [[ODS-5890](https://tracker.ed-fi.org/browse/ODS-5890)] - Remove IncludePlugins parameter and implementation
* [[ODS-5909](https://tracker.ed-fi.org/browse/ODS-5909)] - Moving StudentProgramAssociationTests to Postman Tests
* [[ODS-5910](https://tracker.ed-fi.org/browse/ODS-5910)] - Moving EducationStandardSpecificationTests to Unit Tests
* [[ODS-5914](https://tracker.ed-fi.org/browse/ODS-5914)] - Refactor XsdMetadata endpoints for route changes
* [[ODS-5920](https://tracker.ed-fi.org/browse/ODS-5920)] - Finalize approach for handling both Parent and Contact in Integration Tests
* [[ODS-5931](https://tracker.ed-fi.org/browse/ODS-5931)] - Add branch name to dispatched actions
* [[ODS-5942](https://tracker.ed-fi.org/browse/ODS-5942)] - Optimize StudentContactAssociation resource authorization for read/update/delete actions
* [[ODS-5951](https://tracker.ed-fi.org/browse/ODS-5951)] - Remove both github actions triggers triggered-from-datastandard-repo triggered-from-tpdmartifacts-repo
* [[ODS-5953](https://tracker.ed-fi.org/browse/ODS-5953)] - Eliminate chances of intermittent Postman test failures due to random EdOrgId generation technique
* [[ODS-5956](https://tracker.ed-fi.org/browse/ODS-5956)] - Allow null on InstanceType column
* [[ODS-5958](https://tracker.ed-fi.org/browse/ODS-5958)] - Improve error message when page size exceeds its limit
* [[ODS-5961](https://tracker.ed-fi.org/browse/ODS-5961)] - Move Powershell Octopus multi tenant deployment Step into Implementation repo
* [[ODS-5967](https://tracker.ed-fi.org/browse/ODS-5967)] - OdsInstanceContext and OdsInstanceDerivative tables do not follow pluralization conventions as the rest of the tables
* [[ODS-5968](https://tracker.ed-fi.org/browse/ODS-5968)] - Missing Interfaces for OdsInstanceContext and OdsInstanceDerivative in the Admin library
* [[ODS-5975](https://tracker.ed-fi.org/browse/ODS-5975)] - Pass Standard And Extension version parameter to Docker images
* [[ODS-5983](https://tracker.ed-fi.org/browse/ODS-5983)] - Update base image minor versions
* [[ODS-5985](https://tracker.ed-fi.org/browse/ODS-5985)] - Correlation IDs in the API error messages
* [[ODS-5987](https://tracker.ed-fi.org/browse/ODS-5987)] - Relationship Authorization for StudentAssessment based on ReportingSchool
* [[ODS-5991](https://tracker.ed-fi.org/browse/ODS-5991)] - Error message improvement for unsupplied required fields with meaningful default values
* [[ODS-5992](https://tracker.ed-fi.org/browse/ODS-5992)] - Github build warnings
* [[ODS-5939](https://tracker.ed-fi.org/browse/ODS-5939)] - Clean up unused data in EdFi_Security
* [[ODS-5993](https://tracker.ed-fi.org/browse/ODS-5993)] - Security Visualization Tool - Update required after Clean up unused data in EdFi_Security
* [[ODS-6001](https://tracker.ed-fi.org/browse/ODS-6001)] - Remove default values in ARG params included in Docker files
* [[ODS-6008](https://tracker.ed-fi.org/browse/ODS-6008)] - EdFi v7 DbDeploy parameter inconsistency
* [[ODS-6026](https://tracker.ed-fi.org/browse/ODS-6026)] - Convert NHibernate StudentProgramAssociation lifecycle tests to Postman
* [[ODS-6028](https://tracker.ed-fi.org/browse/ODS-6028)] - The connectionstring column in odsinstances table is too short
* [[ODS-6031](https://tracker.ed-fi.org/browse/ODS-6031)] - API error response for missing references related to authorization
* [[ODS-6040](https://tracker.ed-fi.org/browse/ODS-6040)] - Declarative Security Policy Script Update for - Clean up unused data in EdFi_Security
* [[ODS-6043](https://tracker.ed-fi.org/browse/ODS-6043)] - Implementation Trigger builds from the ODS repo
* [[ODS-6046](https://tracker.ed-fi.org/browse/ODS-6046)] - Default Postgres SQL Database passwords used in the GitHub builds
* [[ODS-6050](https://tracker.ed-fi.org/browse/ODS-6050)] - Deserialization Error Handling
* [[ODS-6055](https://tracker.ed-fi.org/browse/ODS-6055)] - Align the swagger description for descriptor PUT
* [[ODS-6057](https://tracker.ed-fi.org/browse/ODS-6057)] - Prevent security misconfiguration of relationship-based authorization from authorizing requests without any filtering
* [[ODS-6058](https://tracker.ed-fi.org/browse/ODS-6058)] - Enforcement of uniqueness in extension collections
* [[ODS-6063](https://tracker.ed-fi.org/browse/ODS-6063)] - Unclear error response when required references are not fully formed
* [[ODS-6064](https://tracker.ed-fi.org/browse/ODS-6064)] - Custom authorization context data for role named program in programEvaluation domain
* [[ODS-6073](https://tracker.ed-fi.org/browse/ODS-6073)] - Identity implementation challenge due to circular references
* [[ODS-6074](https://tracker.ed-fi.org/browse/ODS-6074)] - Fix Build warnings
* [[ODS-6099](https://tracker.ed-fi.org/browse/ODS-6099)] - Update alpine and postgres hash in Docker
* [[ODS-6112](https://tracker.ed-fi.org/browse/ODS-6112)] - Switch docker compose sample to use latest image
* [[ODS-6018](https://tracker.ed-fi.org/browse/ODS-6018)] - Enforcement of uniqueness in collections

## Bug Fixes

* [[ODS-4833](https://tracker.ed-fi.org/browse/ODS-4833)] - Code Gen Fails For Core Extension of Collection with Merge Statements
* [[ODS-5656](https://tracker.ed-fi.org/browse/ODS-5656)] - Postgres-database-management.psm1 doesn't work in PowerShell 7.3
* [[ODS-5753](https://tracker.ed-fi.org/browse/ODS-5753)] - Clean up message for PostgreSQL unique key constraint violations
* [[ODS-5845](https://tracker.ed-fi.org/browse/ODS-5845)] - Unable to post resources on fresh 6.1 sandbox install. Incorrect syntax near ')'
* [[ODS-5904](https://tracker.ed-fi.org/browse/ODS-5904)] - ODS/API case sensitive match on studentUniqueId
* [[ODS-5906](https://tracker.ed-fi.org/browse/ODS-5906)] - Extending DomainEntity with association with key unification results in compilation errors
* [[ODS-5927](https://tracker.ed-fi.org/browse/ODS-5927)] - Database template builds should error on XML validation failures
* [[ODS-5988](https://tracker.ed-fi.org/browse/ODS-5988)] - Remove the mapping between Application and ODSInstance
* [[ODS-6030](https://tracker.ed-fi.org/browse/ODS-6030)] - Remove USI reference shown during student deletion
* [[ODS-6032](https://tracker.ed-fi.org/browse/ODS-6032)] - Swagger UI: Doesn't work for context based routing
* [[ODS-6033](https://tracker.ed-fi.org/browse/ODS-6033)] - Swagger UI: Section pages load wrong metadata
* [[ODS-6039](https://tracker.ed-fi.org/browse/ODS-6039)] - Descriptors in key not compared using case-insensitive comparison in PUT requests
* [[ODS-6065](https://tracker.ed-fi.org/browse/ODS-6065)] - ApplicationId in ApplicationEducationOrganization table shouldn't be nullable
* [[ODS-6066](https://tracker.ed-fi.org/browse/ODS-6066)] - ClaimSets table should have a unique constraint on ClaimSetName
* [[ODS-6104](https://tracker.ed-fi.org/browse/ODS-6104)] - Security migration/upgrade not working

## Ed-Fi ODS / API v7.x - Breaking Changes 

Apart from the breaking changes introduced by the data standard, there are some
breaking changes in the API behavior introduced at the API tech stack

| Change | Description | Related Tickets |
|--------|-------------|----------------|
| Change query snapshots Endpoint ChangeQueries/v1/snapshots | The snapshots Endpoint was removed. API now allows single snapshot configuration and clients can indicate the intent to use the snapshot with the HTTP header 'Use-Snapshot' instead of previously used 'Snapshot-Identifier' HTTP Header. See [Using the Changed Record Queries](../client-developers-guide/using-the-changed-record-queries.md) for details | ODS-5804 - Data cannot be retrieved due to an unexpected error. |
| Validation - Throughout the API surface | Required fields whose default values have domain meaning should be now be explicitly supplied. Earlier versions of the API assigned default values to non nullable required fields when not supplied by the API client. | ODS-5865 - Data cannot be retrieved due to an unexpected error. |
| Validation - Throughout the API surface | API now applies min/max validations when specified in the model. | ODS-5755, ODS-5626, ODS-5574 - Data cannot be retrieved due to an unexpected error. |
| Routes - Throughout the API surface | ODS / API 7.x allows simplified uniform routes. Depending on the configuration of the deployed ODS, SchoolYear segment may not be present or in case when additional segments are present, they appear at the beginning of all routes allowing easy configuration for API clients. See [API Routes](../client-developers-guide/api-routes.md) for details. | ODS-5713 - Data cannot be retrieved due to an unexpected error. |
| Validation - Throughout the API surface | ODS / API 7.x Fixed enforcement of required embedded objects in resources | ODS-5725 - Data cannot be retrieved due to an unexpected error. |
| Validation - Throughout the API surface | ODS / API 7.x now results in error response (instead of ignoring) when primary key value changes are submitted for resource that doesn't allow key updates | ODS-5831 - Data cannot be retrieved due to an unexpected error. |

You can also view release information in Ed-Fi Tracker [here](https://tracker.ed-fi.org/projects/ODS/versions/15609).


