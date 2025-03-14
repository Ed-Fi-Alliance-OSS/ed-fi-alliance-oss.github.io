---
sidebar_position: 4
---

# Advisory: Potential for Broken Authorization When Using Admin App or Admin API

4 Nov 2023

## Vulnerability

The Ed-Fi ODS Admin App ("Admin App") provides a graphical user interface for
managing the application credentials ("keys and secrets") used by third party
applications to authenticate themselves with an Ed-Fi ODS/API. These credentials
are also used to authorize the authenticated application to access student data
at one or more educational organizations. A sample screenshot from Admin App,
below, shows an application being configured for access to the (fictional) Local
Education Agency known as Grand Bend ISD.

![screenshot 1](https://edfidocs.blob.core.windows.net/$web/img/reference/advisories/advisory-broken-auth1.webp)

Once this configuration has been saved, it is possible to augment or change the
assigned Education Organization for a key, as shown below:

![screenshot 2](https://edfidocs.blob.core.windows.net/$web/img/reference/advisories/advisory-broken-auth2.webp)

When the user saves the change depicted above, the user expects that the given
client key will provide access to student information at Another Grand Bend
ISD *instead of*student information at Grand Bend ISD. The application does
create the link to the new Education Organization, but it also leaves a hidden
link to the old one.

**Implication: a correctly written client application could unwittingly access
or modify student data at the wrong Education Organization.**

This same flaw exists within the Ed-Fi ODs Admin API ("Admin API") application,
which is a REST API service that provides the same functionality as Admin App,
but for use by scripts and other applications instead of human operators.

## Affected Software Versions

All versions of Admin App dating to its initial release in 2016, and all
versions of Admin API dating to its initial release in 2022.

### Do I need to update my software?

If your Ed-Fi implementation: (a) uses Admin App or Admin API to manage
application credentials, and (b) contains data for more than one Local Education
Agency, Post-Secondary Institution, or School, then we recommend updating your
software to avoid this flaw.

## Mitigation

1. Check to see if any records have been misconfigured:

   ```sql
   select * from dbo.ApplicationEducationOrganizations where  Application_ApplicationId is null;
   ```

2. If the above query returns any records, then they should be deleted.

   ```sql
   delete from dbo.ApplicationEducationOrganizations where Application_ApplicationId is null;
   ```

3. Optionally, modify the database schema to prevent this:

   :::warning

   This will cause un-patched versions of Admin App and Admin API to throw an error if a user tries to modify an Education Organization assignment.

   :::

   ```sql title="MSSQL"
   DROP INDEX [dbo].[ApplicationEducationOrganizations].[IX_Application_ApplicationId];
   GO

   DELETE FROM [dbo].[ApplicationEducationOrganizations] WHERE Application_ApplicationId IS NULL;

   ALTER TABLE [dbo].[ApplicationEducationOrganizations] ALTER COLUMN Application_ApplicationId INT NOT NULL;
   GO

   CREATE NONCLUSTERED INDEX [IX_Application_ApplicationId] ON [dbo].[ApplicationEducationOrganizations]
   ([Application_ApplicationId] ASC) WITH (
      PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF,
      ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
   GO
   ```

   ```sql title="PostgreSQL"
   DROP INDEX dbo.IX_Application_ApplicationId;

   DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId IS NULL;

   ALTER TABLE dbo.ApplicationEducationOrganizations ALTER COLUMN Application_ApplicationId SET NOT NULL;

   CREATE INDEX IX_Application_ApplicationId ON dbo.ApplicationEducationOrganizations
   (
       Application_ApplicationId
   );
   ```

## Software Updates

### Binary Release

Download the appropriate update file:

* [Admin App
  v3.1.2](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.ODS.AdminApp.Web/overview/3.1.2)
  (for use with ODS/API 3.x through 6.x)

  ⚠️ Users of older versions of Admin App will need to upgrade to this latest version.  ODS/API 2.x is no longer supported.

* [Admin API
  v1.3.1](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.ODS.AdminApi/overview/1.3.1)
  (for use with ODS/API 3.x through 6.x
* [Admin API
  v2.0.1](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.ODS.AdminApi/overview/2.0.1)
  (for use with ODS/API 7.0)

Update procedure:

1. The downloaded file is a NuGet package with file extension `.nupkg`. It can
   be opened with compression utilities like WinZip or 7Zip; it may be helpful
   to rename the file so that it has extension `.zip`  instead of `.nupkg`.
2. Copy this file to the webserver where the program is deployed.
3. Create a backup of the existing application files.
4. Delete the original application files (not the backup), except for `appsettings.json`.
5. Open the zip file and click into the AdminApp / AdminApi folder.
6. Copy all of these files into the existing application directory.
7. Test the web application.

### Docker

Update your container-based deployments to use the following images, as appropriate:

* edfialliance/ods-admin-app:v3, or v3.1, or v3.1.2 (all aliases)
* edfialliance/ods-admin-app-mssql:v3, or v3.1, or v3.1.2 (all aliases)
* edfialliance/ods-admin-api:v1, or v1.3, or v1.3.1
* edfialliance/ods-admin-api:v2, or v2.0, or v2.0.1

### Source Code

Download the patched source code from the following tags:

* [Admin App v3.1.2](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp/tree/v3.1.2)
* [Admin API v1.3.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminAPI/tree/v1.3.1)
* [Admin API v2.0.1](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-2.0/tree/v2.0.1)
