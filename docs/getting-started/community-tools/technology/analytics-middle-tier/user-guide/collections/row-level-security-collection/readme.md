# Row-Level Security Collection

## Overview

This collection provides views to support both the Static and Dynamic row-level
user security models described in [Patterns for Row-Level User Security](../../../user-guide/patterns-for-row-level-user-security.md).

## Views in this Collection

* [rls\_UserStudentDataAuthorization
    View](./rls_userstudentdataauthorization-view.md)
* [rls\_UserAuthorization View](./rls_userauthorization-view.md)
* [rls\_UserDim View](./rls_userdim-view.md)
* [rls\_StudentDataAuthorization View](./rls_studentdataauthorization-view.md)
* [rls\_InsertStaffClassificationDescriptorScope Stored
    Procedure](./rls_insertstaffclassificationdescriptorscope-stored-procedure.md)
* [rls\_RemoveStaffClassificationDescriptorScope Stored
    Procedure](./rls_removestaffclassificationdescriptorscope-stored-procedure.md)
* [rls\_ViewStaffClassificationDescriptorScope
    View](./rls_viewstaffclassificationdescriptorscope-view.md)

## Installation

Install using the option code "RLS"

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe -c "..." -o RLS
```

For more information, see the [AMT Deployment
Guide](../../../deployment-guide/readme.mdx).

## Configuration

The ODS does not provide a means for explicit mapping between a staff person or
job title and the types of scope envisioned in this proposal. Implementers will
therefore need to map staff to scopes, preferably through job title /
classification. The [Descriptor
Mapping](../../../deployment-guide/descriptor-mapping.md)
tables support this through mapping of Staff Classification descriptor values to
the following Descriptor Constants:

* AuthorizationScope.District
* AuthorizationScope.School
* AuthorizationScope.Section

As described in [Analytics Middle Tier Deployment
Guide](../../../deployment-guide/readme.mdx), a set of stored
procedures are available to aid in maintaining the mapping of classifications to
scopes. Those using the RLS collection will need to identify the staff
classifications that should be mapped to each of these three scopes and insert
rows into the `analytics_config.DescriptorMap`  table accordingly (possibly
using the `analytics_config.rls_InsertStaffClassificationDescriptorScope` stored
procedure). For example, the following query lists the staff classifications in
the default Ed-Fi template:

```sql
select
 Descriptor.CodeValue
from
 edfi.StaffClassificationDescriptor
inner join
 edfi.Descriptor on
 StaffClassificationDescriptor.StaffClassificationDescriptorId = Descriptor.DescriptorId
```

Then for each staff classification, decide what scope, if any, to provide. The
following table lists potential scope mappings - please analyze carefully before
applying in your situation.

| Classification | Scope |
| --- | --- |
| ​Instructional Aide | ​none |
| School Administrator | AuthorizationScope.School |
| Librarians/Media Specialists | none |
| Substitute Teacher | AuthorizationScope.Section |
| Counselor | none |
| Principal | AuthorizationScope.School |
| Teacher | AuthorizationScope.Section |
| Assistant Principal | AuthorizationScope.School |
| Operational Support | none |
| Superintendent | AuthorizationScope.District |
| Instructional Coordinator | AuthorizationScope.School |
| School Leader | AuthorizationScope.School |
| Assistant Superintendent | AuthorizationScope.District |
| Other | none |
| Support Services Staff | none |
| LEA Specialist | AuthorizationScope.District |
| State Administrator | none (system is not designed for state use) |
| LEA Administrator | AuthorizationScope.District |
| School Specialist | AuthorizationScope.School |
| LEA System Administrator | none |

And each of these can be setup with a SQL stored procedure call like the
following:

```sql
-- SQL Server
exec analytics_config.rls_InsertStaffClassificationDescriptorScope 'School Specialist', null, 'AuthorizationScope.School';
-- or
exec analytics_config.rls_InsertStaffClassificationDescriptorScope @StaffDescriptor = 'School Specialist', @Scope = 'AuthorizationScope.School';

-- PostgreSQL
call analytics_config.rls_InsertStaffClassificationDescriptorScope ('School Specialist', null, 'AuthorizationScope.School');
-- or
call analytics_config.rls_InsertStaffClassificationDescriptorScope (StaffDescriptor := 'School Specialist', Scope := 'AuthorizationScope.School');
```

:::warning

The Row-Level Security collection requires an end date to be published on
employment records to accurately reflect what staff are allowed to see. A
missing end date can cause a security risk in Shared Instances. Any staff
members missing employment dates may be able to inappropriately continue seeing
student data if they move to another district in the same shared instance.

:::
