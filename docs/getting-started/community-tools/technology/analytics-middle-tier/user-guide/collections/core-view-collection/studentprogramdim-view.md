# StudentProgramDim View

## Purpose

Attributes related to the programs a student is a member of. Part of the [Core
View Collection](./readme.md).

## SQL Object

`analytics.StudentProgramDim`

## Usage Notes

The Student Program Dimension provides a list of Programs each student is a
member of.  This information is joined by a beginning date and the education
organization Id it is related to.

## Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| BeginDate | date​ | StudentProgram.BeginDate |     |
| EducationOrganizationId | int | Program.EducationOrganizationId |     |
| ProgramName | string | Program.ProgramName |     |
| StudentUSI | int | Student.StudentUSI |     |
| StudentSchoolKey | string | Student.StudentUniqueId, StudentSchoolAssociation.SchoolId |     |
