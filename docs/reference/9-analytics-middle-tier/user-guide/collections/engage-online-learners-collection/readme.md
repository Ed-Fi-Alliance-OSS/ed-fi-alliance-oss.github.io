# Engage Online Learners Collection

## Overview

The Engage Online Learners collection has been developed in support of the
[Student Engagement Starter Kit](https://edfi.atlassian.net/wiki/spaces/SKD/pages/26841349).
These queries use a set of extension tables in the ODS, representing Assignments
and students' Submissions as reported by a Learning Management System. For more
information on populating the data for these two entities, please see the [LMS
Toolkit](#).

## Data Model

This data model introduces a new Fact, the student assignment submission, and
one new dimension: the assignment itself. These views have key relationships
with several other dimensions provided in the [Core View
Collection](../core-view-collection/readme.md):

![Engage Online Learners Data Model](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Engage%20Collection%20Model.png)

<details>
<summary>Text description of the relationship diagram...</summary>

The view `engage_AssignmentSubmissionFact`  contains foreign keys to these
views: [StudentSchoolDim
View](../core-view-collection/studentschooldim-view.md), [SchoolDim
View](../core-view-collection/schooldim-view.md), [SectionDim
View](../core-view-collection/sectiondim-view.md), [DateDim
View](../core-view-collection/datedim-view.md),
and [engage_AssignmentDim
View](./engage_assignmentdim-view.md).

The view `engage_AssignmentDim` contains foreign keys to these views: [SchoolDim
View](../core-view-collection/schooldim-view.md), [SectionDim
View](../core-view-collection/sectiondim-view.md), [DateDim
View](../core-view-collection/datedim-view.md),
and [GradingPeriodDim
View](../core-view-collection/gradingperioddim-view/readme.md).

</details>

## Objects in this Collection

* [engage_AssignmentDim
    View](./engage_assignmentdim-view.md)
* [engage_AssignmentSubmissionFact
    View](./engage_assignmentsubmissionfact-view.md)

## Installation

Install using the option code "engage"

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe -c "..." -o engage
```

For more information, see the [AMT Deployment
Guide](../../../deployment-guide/readme.md).
