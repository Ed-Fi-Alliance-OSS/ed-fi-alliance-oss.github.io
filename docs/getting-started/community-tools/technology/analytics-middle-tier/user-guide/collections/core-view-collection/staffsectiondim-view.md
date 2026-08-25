# StaffSectionDim View

## Purpose

Attributes related to a staff's leading a section. Part of the [Core View
Collection](./readme.md).

## SQL Object

`analytics.StaffSectionDim`

## Usage Notes

Instead of providing a view with one row per section (`SectionDim` ),
the `StaffSectionDim` provides one row _per staff and section_.

## Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StaffSectionKey | string​ | Staff.StaffUniqueId, StaffSectionAssociation.SchoolId, StaffSectionAssociation.LocalCourseCode,   <br/>StaffSectionAssociation.SchoolYear, StaffSectionAssociation.SectionIdentifier,  <br/>StaffSectionAssociation.SessionName | Primary Key |
| StaffUSI | int | Staff.StaffUSI |     |
| UserKey | string | Staff.StaffUniqueId |     |
| SchoolKey | string | StaffSectionAssociation.SchoolId |     |
| SectionKey | string | Section.SchoolId, Section.LocalCourseCode, Section.SchoolYear, Section.SectionIdentifier, Section.SessionName |     |
| PersonalTitlePrefix | string | Staff.PersonalTitlePrefix |     |
| FirstName | string | Staff.FirstName |     |
| MiddleName | string | Staff.MiddleName |     |
| LastSurname | string | Staff.LastName |     |
| ElectronicMailAddress | string | StaffElectronicMail.ElectronicMailAddress |     |
| SexType | string | Staff.SexDescriptorId | Short Description |
| BirthDate | datetime | Staff.BirthDate | YYYY-MM-DD |
| RaceType | string | StaffRace | Short Description |
| HispanicLatinoEthnicity | boolean | Staff.HispanicLatinoEthnicity |     |
| HighestCompletedLevelofEducation | string | Staff.HighestCompletedLevelOfEducationDescriptorId | Short Description |
| YearsOfPriorProfessionalExperience | decimal | Staff.YearsOfPriorProfessionalExperience |     |
| YearsOfPriorTeachingExperience | decimal | Staff.YearsOfPriorTeachingExperience |     |
| HighlyQualifiedTeacher | boolean | Staff.HighlyQualifiedTeacher |     |
