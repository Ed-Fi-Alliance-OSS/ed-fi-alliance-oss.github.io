---
title: Current School Year Configuration
---

# Current School Year Configuration

The current school year is configured in the ODS in SchoolYearType Table. 

During a fresh database deployment or the initialize development environment (i.e., `initdev`) process, the current school year is set by default with the Ed-Fi-ODS\Artifacts\MsSql\Data\Ods\1040-Set-Default-SchoolYear.sql script. The script is run after all database structure scripts have completed (along with other data scripts).

The default is usually adequate, since a new ODS / API would typically be deployed for a new school year. In a shared-instance ODS, however, the current school year configuration needs to be updated as part of an annual rollover process. This can easily be done by executing the SetCurrentSchoolYear stored procedure as in the following example:

```
EXEC [edfi].[SetCurrentSchoolYear] @schoolYear = 2020
```

