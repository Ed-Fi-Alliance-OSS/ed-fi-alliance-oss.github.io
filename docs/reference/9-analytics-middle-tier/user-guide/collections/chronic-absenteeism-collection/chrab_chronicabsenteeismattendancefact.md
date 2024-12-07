# chrab_ChronicAbsenteeismAttendanceFact

## Purpose

Used for looking at student's attendance per day using the common methods for
defining attendance.

## SQL Object Name

`analytics.chrab_ChronicAbsenteeismAttendanceFact`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| ​StudentSchoolKey | nvarchar​ | StudentSchoolAssociation | For linking to the `StudentSchoolDim` View. |
| StudentKey | nvarchar | StudentUniqueId | For linking to the `StudentSchoolDim` View. |
| SchoolKey | varchar | SchoolId | For linking to `SchoolDim` View. |
| DateKey | varchar | CalendarDateCalenderEvent | The attendance date (YYYYMMDD format) |
| ReportedAsPresentAtSchool | int | StudentSectionAttendanceEvent | True/False representation of the student's presence at school for the record's specific date |
| ReportedAsAbsentFromSchool | int | StudentSectionAttendanceEvent | True/False representation of the student's absence at school for the record's specific date |
| ReportedAsPresentAtHomeRoom | int | StudentSectionAttendanceEvent | True/False representation of the student's presence at their homeroom for the record's specific date |
| ReportedAsAbsentFromHomeRoom | int | StudentSectionAttendanceEvent | True/False representation of the student's absence at their homeroom for the record's specific date |
| ReportedAsIsPresentInAllSections | int | StudentSectionAttendanceEvent | True/False representation of the student's presence at all their classes for the record's specific date |
| ReportedAsAbsentFromAnySection | int | StudentSectionAttendanceEvent | True/False representation of the student's absence at all their classes for the record's specific date |
