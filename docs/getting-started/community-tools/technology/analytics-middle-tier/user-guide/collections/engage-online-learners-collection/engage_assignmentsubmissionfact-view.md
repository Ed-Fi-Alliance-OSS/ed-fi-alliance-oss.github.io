# engage_AssignmentSubmissionFact View

## Purpose

Describes a student's Submission for an Assignment created in a  Learning
Management System (LMS)

## SQL Object Name

`analytics.engage_AssignmentSubmissionFact`

## Usage Notes

None

## Data Definition and Sources

Depends on the `lmsx.Assignment` and `lmsx.AssignmentSubmission` tables that are
introduced by the LMSX extension from the [LMS
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
| AssignmentSubmissionKey | varchar | lmx.AssignmentSubmission.AssignmentSubmissionIdentifier<br/><br/>  <br/><br/>→ When using the LMS Toolkit, this value comes from `SourceSystemIdentifier` in `lms.AssignmentSubmission`. | This is the natural key from the source system |
| AssignmentKey | varchar | lmsx.Assignment.AssignmentIdentifier<br/><br/>  <br/><br/>→ This is the Assignment's natural key from the source system. When using the LMS Toolkit, this value comes from `SourceSystemIdentifier` in `lms.Assignment`. | Unique key for the related assignment (see [engage\_AssignmentDim View](./engage_assignmentdim-view.md)) |
| SchoolKey | int | lmsx.Assignment.SchoolId<br/><br/>  <br/><br/>→ When using the LMS Toolkit, this value is inferred from the relationship of the `SisSectionIdentifier` in the `lms.LMSSection`  table to `SectionIdentifier`  in the `edfi.Section` table. | Unique key for the related school |
| StudentSchoolKey | varchar | Concatenation of edfi.Student.UniqueId and SchoolId from `lmsx.Assignment`.<br/><br/>*   See notes above and below for LMS Toolkit sources | Unique key for a student-in-a-school |
| StudentKey | varchar | edfi.Student.UniqueId<br/><br/>*   When using the LMS Toolkit, this value originally comes from the `SISUserIdentifier`  value in `lms.AssingnmentSubmission`. | Unique key for a student |
| SubmissionDateKey | varchar | lmsx.AssignmentSubmission.SubmissionDateTime formatted as YYYYMMDD<br/><br/>_When using the LMS Toolkit, this value comes from `SubmissionDateTime`  in `lms.AssignmentSubmission`.<br/>_   If the assignment is Past Due, then this value will be `null`. | Date key for joining to the [DateDim View](../core-view-collection/datedim-view.md). |
| EarnedPoints | int | lmsx.AssignmentSubmission.EarnedPoints<br/><br/>_When using the LMS Toolkit, this value comes from `EarnedPOints`  in `lms.AssignmentSubmission`.<br/>_   If the assignment is Past Due, then this value will be `null`. | Number of points earned by the student on the submission |
| NumericGrade | int | lmsx.AssignmentSubmission.EarnedPoints / lmsx.Assignment.MaxPoints<br/><br/>_When using the LMS Toolkit, see description above for `EarnedPoints`. The MaxPoints value comes from `lms.Assignment`.<br/>_   If the assignment is Past Due, then this value will be `null`. | The numeric percentage grade |
| LetterGrade | varchar | lmsx.AssignmentSubmission.LetterGrade<br/><br/>_When using the LMS Toolkit, this value comes from `LetterGrade`  in `lms.AssignmentSubmission`.<br/>_   If the assignment is Past Due, then this value will be `null`. | The letter grade given on the submission |
| IsPastDue | bool | 1 if the lmsx.SubmissionStatusDescriptor maps to descriptor constant "SubmissionStatus.IsPastDue", else 0.<br/><br/>*   When using the LMS Toolkit, this value is inferred from the `SubmissionStatus`  in `lms.AssignmentSubmission`. | Boolean indicating if the submission is past due (missing) |
| SubmittedLate | bool | 1 if the lmsx.SubmissionStatusDescriptor maps to descriptor constant "SubmissionStatus.SubmittedLate", else 0.<br/><br/>*   When using the LMS Toolkit, this value is inferred from the `SubmissionStatus`  in `lms.AssignmentSubmission`. | Boolean indicating if the submission was turned in after the due date |
| SubmittedOnTime | bool | 1 if the lmsx.SubmissionStatusDescriptor maps to descriptor constant "SubmissionStatus.SubmittedOnTime", else 0.<br/><br/>*   When using the LMS Toolkit, this value is inferred from the `SubmissionStatus`  in `lms.AssignmentSubmission`. | Boolean indicating if the submission was turned in before the due date |
| LastModifiedDate | datetime | lmsx.AssignmentSubmission.LastModifiedDate<br/><br/>*   When using the LMS Toolkit, this value comes from `LastModifiedDate`  in `lms.AssignmentSubmission`. | The last modified date for the submission |
