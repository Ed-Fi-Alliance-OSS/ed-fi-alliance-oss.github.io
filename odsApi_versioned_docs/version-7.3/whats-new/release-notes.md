---
description: Release notes for ODS/API v7.3
---

# Release Notes

This section provides a comprehensive list of the improvements, updates, fixes,
and changes in the Ed-Fi ODS / API for Suite 3 v7.3 release.

:::tip

The lists below include ticket numbers from Jira. The Jira project can only be
seen by the development team. However, anyone can look for that ticket number in
the Git commit history to find the changes for that specific update.

:::

## Ed-Fi ODS / API v7.3.1 - Release Notes

### Important Epics

* ODS-6652 - Align ODS /API to v6.0 Data Standard

### General Improvements & Enhancements

* ODS-4459 - Use .NET Feature Management library for API features
* ODS-5622 - Make the ODSStartup configurable
* ODS-5623 - Make the SwaggerStartup configurable
* ODS-6605 - Update Secret Hash Algorithm
* ODS-6610 - Update all workflow action dependencies to latest
* ODS-6623 - Replace use of nuget.exe with dotnet cli
* ODS-6639 - Sandbox Admin for Support Assigning Multiple EdOrgs and Namespaces to Vendor Applications
* ODS-6661 - Publish Multi-platform docker images (ARM Architecture Support)
* ODS-6662 - Add a configuration option to exclude Domains from the OpenAPI spec
* ODS-6696 - Add Application Name to Discovery API
* ODS-6699 - Add Domain Information Display to Swagger UI tag description
* ODS-6717 - Update dependencies

### Bug Fixes

* ODS-6612 - Initialization of Redis cache fails with more than 512k USI/UniqueID entries
* ODS-6723 - Error Response for Student Delete is reporting an abstract base entity
* ODS-6725 - Link field is not updated after reference update
* ODS-6741 - ASP.NET Core Runtime Upgrade for Security Patch (CVE-2025-55315)

## Ed-Fi ODS / API v7.3-patch2 - Release Notes

### Bug Fixes

* ODS-6663 - Fixed API rejection of EdOrgId values with leading zeros.

* ODS-6675 - Ensured cascading key changes update LastModifiedDate in dependent tables.

* ODS-6681 - Corrected stale data detection after key changes on resources.

* ODS-6682 - Resolved unresolvable links caused by key unification in resource child item references.

* ODS-6684 - Fixed ProblemDetails response construction failure in edge-case extension scenarios.

* ODS-6685 - Improved error messaging in GetPackedHash when input is not Base64 encoded.

* ODS-6697 - Added fallback option for whitespace validation in required string fields.

* ODS-6700 - Prevented exception logging when token authentication fails due to expiration.

## Ed-Fi ODS / API v7.3-patch1 - Release Notes

### General Improvements & Enhancements

* ODS-6632 - Handle deserialization failures gracefully for the Serialized Data feature

### Bug Fixes

* ODS-6602 - API only allows tenant1's profiles when different profiles are set up for different tenants

* ODS-6613 - Deserialization fails when a model extension introduces an entity extension after the resource has been created

## Ed-Fi ODS / API v7.3 - Release Notes

### Important Epics

* ODS-5815 - Extensible Authorization Filtering

* ODS-6412 - Align ODS /API to v5.2 Data Standard

* ODS-6513 - Improve data out performance

* ODS-6585 - Serialized Data Storage for Optimized API Request Processing

### General Improvements & Enhancements

* ODS-5665 - Add ability to query organizations by an identification code

* ODS-4799 - Introduce resource POST/Retry order in dependency endpoint

* ODS-4936 - Installer support and Integrated Security

* ODS-5419 - Add Discriminator to edfi.Descriptor

* ODS-6120 - External connection configuration via plugin

* ODS-6299 - Make PostgreSQL 16 the minimum supported version

* ODS-6326 - Cascaded keyChanges should bump the change version of references

* ODS-6362 - ODS/API Feature: Permissions API

* ODS-6418 - Enforce token limits on API clients

* ODS-6448 - I would like to disable a key/secret without deleting it.

* ODS-6482 - Eliminate unnecessary database roundtrip for ChangeVersion after
  all upserts

* ODS-6492 - Update RestSharp package

* ODS-6502 - Update security metadata for StudentContactAssociation \(and
  StudentParentAssociation\) to eliminate unnecessary join

* ODS-6508 - Add support for applying criteria using inherited properties on
  derived resources

* ODS-6512 - Modify batched page queries in NHibernate to use AggregateId
  instead of Id for page-level inclusion criteria

* ODS-6517 - Update Ownership-based dynamic NHibernate mapping to correctly
  suppress column usage in updates

* ODS-6543 - Update security metadata for StudentContactAssociation \(and
  StudentParentAssociation\) to eliminate unnecessary join - ReadChanges

* ODS-6546 - Perform joins to authorization views on base tables rather than
  derived tables to take advantage of indexes

* ODS-6547 - Fix the XML-based security metadata export scripts for PostgreSQL

* ODS-6548 - Remove clustered indexes from authorization views for SQL Server

* ODS-6552 - Change database PowerShell Installer to pack dbDeploy .nupkg
  instead of executable

* ODS-6465 - Allow non-default POSTGRES_USER in pgsql images

### Bug Fixes

* ODS-6380 - POST to a Descriptor is allowing empty spaces in the required
  fields

* ODS-6410 - Swagger UI is not updating Token URL

* ODS-6420 - Edge case: strange error result trying to delete an
  EducationOrganizationCategoryDescriptor

* ODS-6440 - Sandbox Admin's "Change Secret" button fails after EFCore upgrade

* ODS-6454 - Timeout connecting to EdFi\_Security Database after EFCore upgrade

* ODS-6463 - Discriminator values in the populated template

* ODS-6480- Schrödinger’s studentContactAssociation

* ODS-6498 - X-Forwarded headers don't work in SwaggerUI

* ODS-6518 - 0002-ResourceClaimMetadata.xml is using the old Identity API
  ClaimName

* ODS-6540 - Fix \`TreatErrorsAsWarning\` typo

### Ed-Fi ODS / API v7.x - Breaking Changes

Apart from the breaking changes introduced by the data standard, there are some
breaking changes in the API behavior introduced at the API tech stack

#### Change Query Snapshots

Endpoint `ChangeQueries/v1/snapshots`: the snapshots Endpoint was removed. API
now allows single snapshot configuration and clients can indicate the intent to
use the snapshot with the HTTP header 'Use-Snapshot' instead of previously used
'Snapshot-Identifier' HTTP Header. See [Using the Changed Record
Queries](../client-developers-guide/using-the-changed-record-queries.md) for
details.

#### Validation

Throughout the API surface:

* Required fields whose default values have domain meaning should be now be
  explicitly supplied. Earlier versions of the API assigned default values to
  non nullable required fields when not supplied by the API client.
* API now applies min/max validations when specified in the model.
* ODS / API 7.x Fixed enforcement of required embedded objects in resources.
* ODS / API 7.x now results in error response (instead of ignoring) when primary
  key value changes are submitted for resource that doesn't allow key updates.

#### Routes

Throughout the API surface: ODS / API 7.x allows simplified uniform routes.
Depending on the configuration of the deployed ODS, SchoolYear segment may not
be present or in case when additional segments are present, they appear at the
beginning of all routes allowing easy configuration for API clients. See [API
Routes](../client-developers-guide/api-routes.md) for details.

#### Error Responses

Throughout the API surface: Starting with version 7.3, ODS/API updated its error
responses to implement [Problem Details RFC
9457](https://www.rfc-editor.org/rfc/rfc9457.html), providing both
machine-readable and user-friendly responses. This change may require
modifications to API Client applications. See [Error Response Knowledge
Base](../client-developers-guide/error-response-knowledge-base.md) for details.
