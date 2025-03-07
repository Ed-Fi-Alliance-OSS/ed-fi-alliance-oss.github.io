---
description: Describes the data elements provided by your product.
sidebar_position: 2
hide_table_of_contents: true
---

# Data Requirements

Data requirements for the Dashboard are provided below.

* Elements listed as **optional** should be provided when available: while their
    absence will not cause issues with the Dashboard visualizations, their
    presence will enhance the capabilities of the Dashboard.
* Descriptors (values suffixed with "Descriptor" below) must be consistent with
    the standard values provided as part of [Ed-Fi Data
    Standard](/reference/data-exchange/data-standards)
  * Links to specific sets are provided below in Ed-Fi XML format; (see the
        section "Descriptors" to understand how these look in JSON format for
        transit).
  * Descriptor values marked as "deprecated" must not be used
* Note on IDs (for entities like students, staff, parents, schools and the
    district itself): these must be the local district identifiers, which are
    the ones that typically appear by default in the SIS. They must not be
    state, federal or others identifiers (if those are different).

Note that the ODS database information (where the data lands in the Ed-Fi ODS
platform) is provided to the right, as this information can be very helpful to
you as you develop, if you are using a local Ed-Fi ODS to test against.

## Helpful Links

* [Ed-Fi Data Handbook
    (v.3.2.0)](https://schema.ed-fi.org/datahandbook-v320/index.html#/)
    Corresponds to ODS/API v.5.2.x and provides easy lookup of elements plus
    data definitions.
* [API Reference for ODS
    v.5.2](https://api.ed-fi.org/v5.2/docs/swagger/index.html)

| API Resource | API Resource Field | Required /<br/><br/>Optional | Constraints | ODS Database Table | ODS Database Column |
| --- | --- | --- | --- | --- | --- |
| /calendarDates |     |     |     |     |     |
| calendarDates | date | Required |     | edfi.CalendarDateCalendarEvent | Date |
| /cohorts |     |     |     |     |     |
| cohorts | cohortDescription | Optional |     | edfi.Cohort | CohortDescription |
| courses | academicSubjectDescriptor | Optional | Must be an Ed-Fi value as defined in [AcademicSubjectDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/AcademicSubjectDescriptor.xml) | edfi.Course | AcademicSubjectDescriptorId |
| courses | courseTitle | Optional |     | edfi.Course | CourseTitle |
| /disciplineIncident |     |     |     |     |     |
| disciplineIncident | incidentIdentifier | Required |     | edfi.DisciplineIncident | IncidentIdentifier |
| disciplineIncident | schoolReference.schoolId | Required |     | edfi.DisciplineIncident | SchoolId |
| /studentDisciplineIncidentAssociation |     |     |     |     |     |
| studentDisciplineIncidentAssociation | disciplineIncidentReference.incidentIdentifier | Required |     | edfi.StudentDisciplineIncidentAssociation | IncidentIdentifier |
| studentDisciplineIncidentAssociation | disciplineIncidentReference.schoolId | Required |     | edfi.StudentDisciplineIncidentAssociation | SchoolId |
| studentDisciplineIncidentAssociation | disciplineIncidentReference.studentReference.<br/><br/>studentUniqueId | Required |     | edfi.StudentDisciplineIncidentAssociation | StudentUSI |
| /disciplineActions |     |     |     |     |     |
| disciplineActions | disciplines.disciplineDescriptor | Required | Must be an Ed-Fi value as defined in [DisciplineDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/DisciplineDescriptor.xml) | edfi.DisciplineAction | Discipline |
| disciplineActions | studentDisciplineIncidentAssociations.<br/><br/>studentDisciplineIncidentAssociationReference.<br/><br/>studentUniqueId | Required |     | edfi.DisciplineAction | StudentUSI |
| disciplineActions | studentDisciplineIncidentAssociations.<br/><br/>studentDisciplineIncidentAssociationReference.<br/><br/>incidentIdentifier | Required |     | edfi.DisciplineAction | IncidentIdentifier |
| disciplineActions | studentDisciplineIncidentAssociations.<br/><br/>studentDisciplineIncidentAssociationReference.<br/><br/>schoolId | Required |     | edfi.DisciplineAction | SchoolId |
| disciplineActions | disciplineActionIdentifier | Required |     | edfi.DisciplineAction | DisciplineActionIdentifier |
| disciplineActions | disciplineDate | Required |     | edfi.DisciplineAction | DisciplineDate |
| disciplineActions | staffs.staffUniqueId | Required |     | edfi.DisciplineActionStaff | StaffUSI |
| /feederSchoolAssociations |     |     |     |     |     |
| feederSchoolAssociations | feederSchoolReference.SchoolId | Required |     | edfi.FeederSchoolAssociation | FeederSchoolId |
| feederSchoolAssociations | schoolReference.SchoolId | Required |     | edfi.FeederSchoolAssociation | SchoolId |
| /grades |     |     |     |     |     |
| grades | numericGradeEarned | Required |     | edfi.Grade | NumericGradeEarned |
| /parents |     |     |     |     |     |
| parents | addresses.postalCode | Required |     | edfi.ParentAddress | PostalCode |
| /programs |     |     |     |     |     |
| programs | educationOrganizationReference.<br/><br/>educationOrganizationId | Required |     | edfi.Program | EducationOrganizationId |
| programs | programName | Required |     | edfi.Program | ProgramName |
| programs | programTypeDescriptor | Required | Must be an Ed-Fi value as defined in [ProgramTypeDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/ProgramTypeDescriptor.xml) | edfi.ProgramTypeDescriptor | CodeValue |
| /schools |     |     |     |     |     |
| schools | schoolId | Required |     | edfi.School | SchoolId |
| schools | nameOfInstitution | Required |     | edfi.School | SchoolName |
| /studentEducationOrganizationAssociations |     |     |     |     |     |
| studentEducationOrganizationAssociations | races.raceDescriptor | Required | Must be an Ed-Fi value as defined in [RaceDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/RaceDescriptor.xml) | edfi.StudentEducationOrganizationAssociationRace | RaceDescriptorID |
| studentEducationOrganizationAssociations | sexDescriptor | Optional | Must be an Ed-Fi value as defined in [SexDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/SexDescriptor.xml) | edfi.Student | SexType |
| /studentSchoolFoodServiceProgramAssociations |     |     |     |     |     |
| studentSchoolFoodServiceProgramAssociations | schoolFoodServiceProgramServices.<br/><br/>schoolFoodServiceProgramServiceDescriptor | Required | Must be an Ed-Fi value as defined in [SchoolFoodServiceProgramServiceDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/SchoolFoodServiceProgramServiceDescriptor.xml) | edfi.StudentSchoolFoodServiceProgramAssociation | SchoolFoodServiceProgramService |
| /sections |     |     |     |     |     |
| sections | courseOfferingReference.localCourseCode | Required |     | edfi.Section | LocalCourseCode |
| sections | courseOfferingReference.schoolyear | Required |     | edfi.Section | SchoolYear |
| sections | sectionName | Optional |     | edfi.Section | SectionName |
| sections | courseOfferingReference.sessionName | Required |     | edfi.Section | SessionName |
| /students |     |     |     |     |     |
| students | birthData.birthDate | Optional |     | edfi.Student | BirthDate |
| students | firstName | Required |     | edfi.Student | FirstName |
| students | lastSurname | Required |     | edfi.Student | LastSurname |
| students | middleName | Optional |     | edfi.Student | MiddleName |
| students | studentUniqueId | Required | Must be the local SIS identifier (i.e., not the state or other ID) | edfi.Student | StudentUniqueId |
| /studentProgramAssociations |     |     |     |     |     |
| studentProgramAssociations | beginDate | Required |     | StudentProgramAssociation | BeginDate |
| /studentSchoolAssociations |     |     |     |     |     |
| studentSchoolAssociations | entryGradeLevelDescriptor | Optional | Must be an Ed-Fi value as defined in [GradeLevelDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/GradeLevelDescriptor.xml) | edfi.StudentSchoolAssociation | EntryGradeLevelDescriptorId |
| studentSchoolAssociations | schoolId | Required |     | edfi.StudentSchoolAssociation | SchoolId |
| studentSchoolAssociations | studentUniqueId | Required |     | edfi.StudentSchoolAssociation | StudentUniqueId |
| /studentSectionAssociations |     |     |     |     |     |
| studentSectionAssociations | beginDate | Required |     | edfi.StudentSectionAssociation | BeginDate |
| studentSectionAssociations | endDate | Required |     | edfi.StudentSectionAssociation | EndDate |
| studentSectionAssociations | localCourseCode | Required |     | edfi.StudentSectionAssociation | LocalCourseCode |
| studentSectionAssociations | sectionReference.sectionIdentifier | Required |     | edfi.StudentSectionAssociation | SectionIdentifier |
| studentSectionAssociations | sectionReference.courseOffering.sessionName | Required |     | edfi.StudentSectionAssociation | SessionName |
