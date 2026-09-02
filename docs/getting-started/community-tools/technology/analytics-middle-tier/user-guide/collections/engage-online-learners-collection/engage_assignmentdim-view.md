# engage_AssignmentDim View

## Purpose

Describes Assignments created in a  Learning Management System (LMS)

## SQL Object Name

`analytics.engage_AssignmentDim`

## Usage Notes

None

## Data Definition and Sources

Depends on the `lmsx.Assignment`  table that is introduced by the LMSX extension
from the [LMS
Toolkit](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498933/Ed-Fi+LMS+Toolkit).
In theory this table can be populated directly through API calls, if the LMSX
extension is called. However, in most cases the data will be loaded using the
custom components in the LMS Toolkit. When using the Toolkit, recall the
workflow:

1. _Extractors_ pull data from a source system into CSV files.
2. The _Data Store Loader_ uploads those CSV files into tables in
    the `lms` schema
3. The _Harmonizer_ synchronizes those records with Sections and Students
    defined in the core Ed-Fi tables, resulting in records loaded
    into `lmsx.Assignment`  and `lmsx.AssignmentSubmission`.

In the table below, the immediate source is given, along with the source from
the LMS Toolkit table / CSV files. For more information on the upstream sources
from the LMS, please see the mapping notes documentation: [Schoology Mapping
Notes](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498957/Schoology+Mapping+Notes), [Google
Classroom Mapping
notes](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498959/Google+Classroom+Mapping+notes),
and [Canvas Mapping
Notes](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22498961/Canvas+Mapping+Notes).

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| AssignmentKey | varchar | lmsx.Assignment.AssignmentIdentifier<br/><br/>*   When using the LMS Toolkit, this value comes from `SourceSystemIdentifier` in `lmsx.Assignment`. | This is the natural key from the source system |
| SchoolKey | int | lmsx.Assignment.SchoolId<br/><br/>*   When using the LMS toolkit, this value is inferred from the relationship of the `SisSectionIdentifier` in the `lms.LMSSection`  table to `SectionIdentifier`  in the `edfi.Section` table. | Unique key for a school |
| SourceSystem | varchar | edfi.Descriptor.ShortDescription via<br/><br/>lmsx.SourceSystemDescriptor<br/><br/>*   When using the LMS toolkit, this value comes from the `SourceSystem`  column in `lms.Assignment` . | Name of the LMS source system |
| Title | varchar | lmsx.Assignment.Title<br/><br/>*   When using the LMS toolkit, comes from `Title`  in `lms.Assignment`. | Title of the assignment |
| Description | varchar | lmsx.Assignment.AssignmentDescription<br/><br/>*   When using the LMS toolkit, comes from `AssignmentDescription`  in `lms.Assignment`. | Long description of the assignment (not available in all systems) |
| StartDateKey | varchar | lmsx.Assignment.StartDateTime<br/><br/>*   When using the LMS toolkit, comes from `StartDateTime`  in `lms.Assignment`. | Start date of the assignment, formatted as a string for use with the [DateDim View](../core-view-collection/datedim-view.md) |
| EndDateKey | varchar | lmsx.Assignment.EndDateTime<br/><br/>*   When using the LMS toolkit, comes from `EndDateTime`  in `lms.Assignment`. | End date of the assignment, formatted as a string for use with the [DateDim View](../core-view-collection/datedim-view.md) |
| DueDateKey | varchar | lmsx.Assignment.DueDateTime<br/><br/>*   When using the LMS toolkit, comes from `DueDateTime`  in `lms.Assignment`. | Due date of the assignment, formatted as a string for use with the [DateDim View](../core-view-collection/datedim-view.md) |
| MaxPoints | int | lmsx.Assignment.MaxPoints<br/><br/>*   When using the LMS toolkit, comes from MaxPoints in `lms.Assignment`. | Maximum number of points available in the assignment |
| SectionKey | varchar | Concatenation of the components of the Section natural key, using the column from lmsx.Assignment:<br/><br/>_SchoolId<br/>_   LocalCourseCode<br/>_SchoolYear<br/>_   SectionIdentifier<br/>*   SessionName<br/><br/>  <br/><br/>→ when using the LMS toolkit, these values are inferred from the relationship of the SIS Section Identifier defined in the LMS's section to the SectionIdentifier defined in an Ed-Fi Section. | The unique key for a section, allowing for joins to the [SectionDim View](../core-view-collection/sectiondim-view.md) |
| GradingPeriodKey | varchar | Concatenation of components of the edfi.GradingPeriod entity:<br/><br/>_GradingPeriodDescriptorId<br/>_   SchoolId<br/>*   BeginDate<br/><br/>  <br/><br/>→ Inferred from the edfi.SessionGradingPeriod by looking for a related grading period whose begin and end dates encompass the due date of the assignment. | The unique key for a grading period, allowing for joins to the [GradingPeriodDim View](../core-view-collection/gradingperioddim-view/readme.md) |
