# Multi-Instance Connections

## Overview

Admin App supports administration of multiple ODS instances with a single
instance of the Admin App.

Admin App supports two roles for this, the Super-Administrator role that can
view and register all ODS / API instances and their functions, and the
Administrator role that is assigned to particular ODS / API instances and their
settings.

Note that the Admin App does not create multiple ODS / API instances. It
connects to pre-existing instances of the ODS / API, which must be deployed
prior to connection with the Admin App.

The ODS / API modes supported by multi-instance management within Admin App are:

1. [District-Specific ODS
   Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/pages/18350192/District-Specific+ODS+Configuration)
2. [Year-Specific ODS
   Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/pages/18350191/Year-Specific+ODS+Configuration)

## General Configuration

### General

When multi-instance mode is enabled, users can navigate to ODS Instances list by
clicking on “ODS Instances” from Home page.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-Home.JPG)

In the absence of any registered instance, the user will be directed to the
Register ODS Instance page.  Otherwise, the user will be presented with
available ODS instances.

## ODS Instances

### District-Specific Mode

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-InstancesList.JPG)

  Clicking on the District / EdOrg id link will take the user to an
  instance-specific ODS settings page.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/Multi-instance-ApplicationsPage.JPG)

### Year-Specific Mode

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-YS-InstancesList.JPG)

Clicking on the school year will take user to year-specific ODS instance
settings page.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-YS-Application.JPG)

## Registering New ODS Instance

### Checklist

 The following checklist and the details below ensure a successful ODS instance
 registration:

* Database should exist on the server.

          Given a District/EdOrg id or school year, the system will generate a valid instance name (Database name).

          Ex: District/EdOrg id provided by user = 255901

                EdFi\_Ods\_Production database name on web.config = EdFi\_{0}

                Then generated ODS instance name will be = EdFi\_Ods\_255901

                User has to make sure, the database (EdFi\_Ods\_255901) exists on the server.

* Generated ODS instance / database name length should be below 50 characters.

**District-Specific Mode**

* To register a district-specific ODS instance, the user needs to provide a
  valid ODS Instance District/EdOrg id and ODS Instance Description.

![District-Specific](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-RegiterNewInstance.JPG)

**Year-Specific Mode**

* To register a year-specific ODS instance, the user needs to provide a valid
  ODS Instance School Year and ODS Instance Description.

![Year-Specific](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-Registr-YS-Instance.JPG)

**Registering Many Instances in Bulk**

* To register many instances in bulk, the user can upload a list of
  district/education organization IDs or school years plus descriptions. The
  uploaded list must be a CSV file.

![Bulk Instances](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/SuperAdmin-YS-BulkRegistration.JPG)

Uploaded CSV files must have the header values NumericSuffix and Description in
the first row. See the listings below for example content.

**District-Specific sample CSV content** Expand source

```cs
NumericSuffix,Description
255901,Sampledistrict1
255902,Sampledistrict2
255903,Sampledistrict3
255904,Sampledistrict4
```

**Year-Specific sample CSV content** Expand source

```cs
NumericSuffix,Description
2019,Description1
2020,Description2
2021,Description3
```
