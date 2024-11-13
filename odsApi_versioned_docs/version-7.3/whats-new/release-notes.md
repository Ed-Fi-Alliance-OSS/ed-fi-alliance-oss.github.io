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

## Ed-Fi ODS / API v7.3 - Release Notes

### Important Epics

* ODS-6312 - Align ODS /API to v5.1 Data Standard
* ODS-3117 - Improve the ODS / API error handling
* ODS-6105 - Update to .net version 8

### General Improvements & Enhancements

* ODS-4131 - Support filtering of derived resources using properties inherited
  from base type
* ODS-4271 - Need to validate authorization views earlier in the authorization
  process.
* ODS-4389 - Remove the need to run hangfire to generate sandboxes
* ODS-4830 - Add Secret Support to the Load Tools
* ODS-5443 - Client Side Bulk Loader in a Container
* ODS-5484 - Composites API responses don't format dates and ids correctly
* ODS-5771 - Move the Sandbox Admin interfaces to a different project
* ODS-5980 - Refactor Standard and Extension version optional parameters
* ODS-6054 - Docker File Permissions
* ODS-6061 - Investigate best practices to improve Docker Images security
* ODS-6067 - Should invalid profile be a fatal error?
* ODS-6082 - Add PostmanTest coverage for role named program in
  programEvaluation domain
* ODS-6090 - Ability to expire various caches in API via message passing
* ODS-6100 - Sandbox Admin needs a way to create vendors, applications and
  sandboxes
* ODS-6119 - Switch Web-Gateway base image to unprivileged nginx image
* ODS-6126 - Use GitHub Action from Docker Scout to analyze docker images
* ODS-6129 - Improve Identities Service Extensibility
* ODS-6182 - Detect Profile scenarios where resources (or any of its children)
  cannot be created due to excluded required members
* ODS-6192 - GenerateSecurityGraphs update connection parameters
* ODS-6246 - Update dependencies
* ODS-6295 - Sandbox Admin - UI Design Changes
* ODS-6301 - Separate valid from invalid Profiles in test Profiles.xml
* ODS-6319 - Modify retry policy for deadlocks to wrap just the NHibernate
  persistence operations
* ODS-6325 - Include datatype informed min-max for decimal types in swagger
  metadata
* ODS-6335 - Add a published security policy
* ODS-6340 - Expand the extension version ValidateSet rule
* ODS-6349 - Profiles expiration doesn't clear mapping contracts
* ODS-6351 - Descriptor OpenAPI spec doesn't reflect natural key
* ODS-6357 - Replace Student Transportation Example
* ODS-6361 - Support for embedded objects on extension aggregates that are
  derived from abstract bases in core
* ODS-6372 - Update npgsql package

### Bug Fixes

* ODS-3401 - Cycles in claims taxonomy (security metadata for resource claims)
  causes requests to hang
* ODS-3674 - Descriptor Endpoints Don't Support GetByExample for Namespace
* ODS-3861 - Parameter limit for API client associated with lots of nationwide
  districts/schools
* ODS-5936 - API Publisher sometimes converts dates to timestamps
* ODS-6070 - Swagger error when using hyphen in tenant identifier
* ODS-6117 - API deserialization of long values differs from integer values when
  a decimal value is supplied.
* ODS-6125 - ConnectionString length in OdsInstanceDerivatives is not consistent
  with OdsInstances
* ODS-6138 - single-tenant - SQLServer is failing to execute
  single-tenant-env-up.ps1
* ODS-6140 - ExtensionVersion parameter causing build failure
* ODS-6181 - Plugin folder is removed if a plugin package cannot be downloaded
* ODS-6187 - Upgrade Microsoft.Data.SqlClient dependency
* ODS-6189 - Possible bug with 64 bit Education Organization ID look up
* ODS-6252 - Workflow dispatch is failing with unable to find workflow error
* ODS-6276 - 64 bit Education Organization ID Authorization Error Response Bug
* ODS-6282 - Redis misconfiguration should log clear message
* ODS-6296 - XSD endpoint errors when extension feature is turned off
* ODS-6318 - Issue with routing around the identities hooks - v7
* ODS-6320 - Sandbox Admin - Can't create Applications that reference the
  default Vendor
* ODS-6322 - 'ODS Selection' Dropdown on Swagger page could be confusing in 7.x
* ODS-6323 - Minimum String Length enforced for optional data elements
* ODS-6333 - StaffSectionAssociations KeyChanges return empty
* ODS-6127 - “Ed-Fi API Publisher - Writer” claim set doesn't support TPDM
  extension

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
