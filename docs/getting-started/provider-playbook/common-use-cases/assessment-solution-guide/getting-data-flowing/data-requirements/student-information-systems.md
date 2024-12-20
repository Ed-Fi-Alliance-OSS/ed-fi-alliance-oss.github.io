# Student Information Systems

Data requirements for the Starter Kit are provided below.

* Elements listed as **optional** should be provided when available: while their
  absence will not cause issues with the starter kit visualizations, their
  presence will enhance the capabilities of the starter kit.
* Descriptors (values suffixed with "Descriptor" below) must be consistent with
  the standard values provided as part of [Ed-Fi Data Standard
  v3.2](https://edfi.atlassian.net/wiki/spaces/EFDS32/overview).
  * Links to specific sets are provided below in Ed-Fi XML format. See the
    section "Descriptors" to understand how these look in JSON format for
    transit.
  * Descriptor values marked as "deprecated" must not be used.
* A note on IDs (for entities like students, staff, parents, schools and the
  district itself): these must be the local district identifiers, which are the
  ones that typically appear by default in the SIS. They must not be state,
  federal, or other identifiers unless those are used by the district's SIS.

Note that the ODS database information (where the data lands in the Ed-Fi ODS
platform) is provided in the rightmost columns. This information can be very
helpful to you during development if you are using a local Ed-Fi ODS to test
against.

| API Resource | API Resouce Field | Required/Optional | Constraints | ODS Database Table | ODS Database Column |
| --- | --- | --- | --- | --- | --- |
| /schools |     |     |     |     |     |
| schools | SchoolId | Required |     | edfi.School | SchoolId |
| schools | nameOfInstitution | Required |     | edfi.School | SchoolName |
| /students |     |     | Must provide all currently enrolled students in the current school year |     |     |
| students | firstName | Required |     | edfi.Student | FirstName |
| students | lastSurname | Required |     | edfi.Student | LastSurname |
| students | middleName | Optional |     | edfi.Student | MiddleName |
| studentSchoolAssociations | SchoolId | Required |     | edfi.StudentSchoolAssociation | SchoolId |
| studentSchoolAssociations | studentUniqueId | Required | Must be the local SIS identifier (i.e., not the state or other ID) | edfi.StudentSchoolAssociation | StudentUniqueId |
| /calendarDates |     |     |     |     |     |
| calendarDates | date | Required |     | edfi.CalendarDateCalendarEvent | Date |
| /studentSectionAssociations |     |     |     |     |     |
| studentSectionAssociations | localCourseCode | Required |     | edfi.StudentSectionAssociation | LocalCourseCode |
| /course |     |     |     |     |     |
| courses | academicSubjectDescriptor | Required | Must be an Ed-Fi value as defined in [AcademicSubjectDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/AcademicSubjectDescriptor.xml) | edfi.Course | AcademicSubjectDescriptorId |
| /staffs |     |     |     |     |     |
| staffs | firstName | Required |     | edfi.Staff | FirstName |
| staffs | lastSurname | Required |     | edfi.Staff | MiddleName |
| staffs | middleName | Optional |     | edfi.Staff | LastSurname |
| /sections |     |     |     |     |     |
| sections | sectionName | Required |     | edfi.Section | SectionName |
| sections | sessionName | Required |     | edfi.Section | SessionName |
| sections | schoolId | Required |     | edfi.Section | SchoolId |
| sections | localCourseCode | Required |     | edfi.Section | LocalCourseCode |
| sections | schoolYear | Required |     | edfi.Section | SchoolYear |
| sections | sectionIdentifier | Required |     | edfi.Section | SectionIdentifier |
| /studentSchoolAssociations |     |     |     |     |     |
| studentSchoolAssociations | studentUniqueId | Required |     | StudentSchoolAssociation | StudentUniqueId |
| studentSchoolAssociations | schoolId | Required |     | edfi.StudentSchoolAssociation | SchoolId |
| /studentEducationOrganizationAssociations |     |     |     |     |     |
| studentEducationOrganizationAssociations | disabilities=>disabilityDescriptor | Required | Must be an Ed-Fi value as defined in [DisabilityDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/DisabilityDescriptor.xml) | edfi.StudentEducationOrganizationAssociationDisability | DisabilityDescriptorId |
| studentEducationOrganizationAssociations | races=>raceDescriptor | Required | Must be an Ed-Fi value as defined in [RaceDescriptor](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/RaceDescriptor.xml) | edfi.StudentEducationOrganizationAssociationRace | RaceDescriptorId |
| studentEducationOrganizationAssociations | studentCharacteristics=>studentCharacteristicDescriptor | Required | Must be an Ed-Fi value as defined in [StudentCharacteristic](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/StudentCharacteristicDescriptor.xml) | edfi.StudentEducationOrganizationAssociationStudentCharacteristic | StudentCharacteristicDescriptorId |
| /programs |     |     |     |     |     |
| programs | programName | Required |     | edfi.StudentProgramAssociation | ProgramName |
| /studentProgramAssociations |     |     |     |     |     |
| studentProgramAssociations | studentUniqueId | Required |     | edfi.StudentProgramAssociation | StudentUniqueId |
| studentProgramAssociations | SchoolId | Required |     | edfi.StudentProgramAssociation | SchoolId |
| /studentSectionAssociations |     |     |     |     |     |
| studentSectionAssociations | schoolId | Required |     | edfi.StudentSectionAssociation | SchoolId |
| studentSectionAssociations | localCourseCode | Required |     | edfi.StudentSectionAssociation | LocalCourseCode |
| studentSectionAssociations | schoolYear | Required |     | edfi.StudentSectionAssociation | SchoolYear |
| studentSectionAssociations | sectionIdentifier | Required |     | edfi.StudentSectionAssociation | SectionIdentifier |
| studentSectionAssociations | sessionName | Required |     | edfi.StudentSectionAssociation | SessionName |
