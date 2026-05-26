# StudentSectionDim View

## Purpose

Attributes related to a student's enrollment in a section. Part of the [Core
View Collection](./readme.md).

## SQL Object

`analytics.StudentSectionDim`

## Usage Notes

Instead of providing a view with one row per section (`SectionDim` ),
the `StudentSectionDim` provides one row _per student and section_. This design
makes it possible to link a grade fact with the `StudentSectionDim` in
the [Early Warning System Collection](../early-warning-system-collection/readme.md).

## Data Sources

### Data Standard 2.2

![StudentSectionDim (DS2.2)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentSectionDim%20(DS2.2).png)

### Data Standard 3+

![StudentSectionDim (DS3)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentSectionDim%20(DS3).png)

## Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| ​StudentSectionKey | string​ | `{StudentKey}-{SectionKey}`​ | Primary Key |
| StudentKey | int | StudentSectionAssociation​.StudentUniqueId |     |
| SectionKey | string | StudentSectionAssociation​ -Concatenation of all elements of the Section natural key |     |
| LocalCourseCode | string | StudentSectionAssociation​..LocalCourseCode |     |
| Subject | string | AcademicSubjectType.CodeValue (DS 2.2)<br/><br/>Descriptor.CodeValue (DS 3+) |     |
| CourseTitle | string | Course.CourseTitle |     |
| TeacherName | string | `{Staff.FIrstName} {Staff.LastName}` via StaffSectionAssociation | Comma-delimited list of all staff associated with the section |
| StudentSectionStartDateKey | string | StudentSectionAssociation.BeginDate | YYYY-MM-DD |
| StudentSectionEndDateKey | string | StudentSectionAssociation.EndDate | YYYY-MM-DD |
| SchoolKey | int | StudentSectionAssociation.SchoolId |     |
| SchoolYear | string | StudentSectionAssociation.SchoolYear |     |
| LastModifiedDate | datetime | Most recent LastModifiedDate value from StudentSectionAssociation, Course, CourseOffering, AcademicSubjectType |     |
