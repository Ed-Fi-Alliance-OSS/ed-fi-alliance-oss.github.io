# Core View Collection

## Overview

The Analytics Middle Tier basic deployment loads a set of dimensional views that
are common to many different use cases. These are called the "core collection"
views. While most of these dimensional views have been created initially to
support the [Early Warning
System](../early-warning-system-collection/readme.md) use case, they
can be useful for custom fact views that address different questions.

## Design Notes

Where it makes sense, a `LastModifiedDate` column exists so that ETL tools can
perform partial data loads (e.g., to import all records modified since the last
import date and time). Because a view frequently combines data from multiple
tables that each have their own `LastModifiedDate`, the view selects the most
recent of all available datetime stamps to display as its own.

Primary key fields on each table are sometimes surrogate keys — combining each
natural key field into a single string — or they are the integer identifiers
from a table, where such exist. Whenever a source table has a `UniqueId` key
column, that column is used as the primary key field, for example,
`Student.StudentUniqueId` becomes `StudentKey`. The more generic
name `Key` helps data analysts more quickly understand the model.

## Core Collection Diagram

![Core View Collection ERD](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Core%20View%20Collection%20ERD.png)

## Views in This Collection

* [ContactPersonDim View](./contactpersondim-view.md)
* [DateDim View](./datedim-view.md)
* [GradingPeriodDim View](./gradingperioddim-view/readme.md)
* [LocalEducationAgencyDim
    View](./localeducationagencydim-view.md)
* [SchoolDim View](./schooldim-view.md)
* [StudentSchoolDim View](./studentschooldim-view.md)
* [StudentSectionDim View](./studentsectiondim-view.md)
* [StudentLocalEducationAgencyDim
    View](./studentlocaleducationagencydim-view.md)
* [DemographicDim View](./demographicdim-view.md)
* [StudentSchoolDemographicsBridge
    View](./studentschooldemographicsbridge-view.md)
* [StudentLocalEducationAgencyDemographicsBridge
    View](./studentlocaleducationagencydemographicsbridge-view.md)
* [StudentProgramDim View](./studentprogramdim-view.md)
* [StaffSectionDim View](./staffsectiondim-view.md)
* [SectionDim View](./sectiondim-view.md)
* [AcademicTimePeriodDim View -
    Experimental](./academictimeperioddim-view-experimental.md)
* [StudentInternetAccessDim View -
    Experimental](./studentinternetaccessdim-view-experimental.md)

## Installation

Every installation will include these views.

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe -c "..."
```

For more information, see the [AMT Deployment
Guide](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Deployment+Guide).

## Configuration

For configuration information, see [Descriptor Mapping](../../../deployment-guide/descriptor-mapping.md).

:::warning

Also see [AMT Collections](../readme.md) for a list of the
optional view collections.

:::
