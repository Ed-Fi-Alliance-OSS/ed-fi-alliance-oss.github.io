---
description: Describes the data elements provided by your product.
sidebar_position: 2
hide_table_of_contents: true
---

# Data Requirements

Data requirements for the Starter Kit are provided below.

* Elements listed as optional should be provided when available: while their
    absence will not cause issues with the starter kit visualizations, their
    presence will enhance the capabilities of the starter kit.
* Descriptors (values suffixed with "Descriptor" below) must be consistent
    with the standard values provided as part of the relevant [Ed-Fi Data Standard](/reference/data-exchange/data-standards).
  * Links to specific sets are provided below in Ed-Fi XML format. See the
        section "Descriptors" to understand how these look in JSON format for
        transit.
  * Descriptor values marked as "deprecated" must not be used.
* A note on IDs (for entities like students, staff, parents, schools and the
    district itself): these must be the local district identifiers, which are
    the ones that typically appear by default in the SIS. They must not be
    state, federal, or other identifiers unless those are used by the district's
    SIS.

Note that the ODS database information (where the data lands in the Ed-Fi ODS
platform) is provided in the rightmost columns. This information can be very
helpful to you during development if you are using a local Ed-Fi ODS to test
against.

| API Resource | API Resource Field | Required/Optional | Constraints | ODS Database Table | ODS Database Column |
| --- | --- | --- | --- | --- | --- |
| /students |     |     |     |     |     |
| students | studentUniqueId | Required | must be the local district ID | edfi.Student | StudentUniqueId |
| students | firstName | Required |     | edfi.Student | FirstName |
| students | middleName | Optional |     | edfi.Student | MiddleName |
| students | lastSurname | Required |     | edfi.Student | LastSurname |
| /schools |     |     |     |     |     |
| schools | schoolId | Required | must be the local district ID | edfi.School | SchoolId |
| schools | localEducationAgencyReference => localEducationAgencyId | Optional |     | edfi.School | LocalEducationAgencyId |
| schools | nameOfInstitution | Required |     | edfi.EducationOrganization | NameOfInstitution |
| /localEducationAgencies |     |     |     |     |     |
| localEducationAgencies | localEducationAgencyId | Required | must be the local  district ID | edfi.LocalEducationAgency | LocalEducationAgencyId |
| /studentSchoolAssociatons |     |     |     |     |     |
| studentSchoolAssociations | studentReference => studentUniqueId | Required |     | edfi.StudentSchoolAssociation | StudentUSI |
| studentSchoolAssociations | schoolReference => schoolId | Required |     | edfi.StudentSchoolAssociation | SchoolId |
| studentSchoolAssociations | exitWithdrawDate | Required |     | edfi.StudentSchoolAssociation | ExitWithdrawDate |
| studentSchoolAssociations | studentSchoolAssociation | Required |     | edfi.StudentSchoolAssociation | EntryDate |
| studentSchoolAssociations | entryGradeLevelDescriptor | Required | must be from standard [GradeLevel set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/GradeLevelDescriptor.xml) | edfi.StudentSchoolAssociation | EntryGradeLevelDescriptorId |
| /studentEducationOrganizationAssociations |     |     |     |     |     |
| studentEducationOrganizationAssociations | studentReference => studentUniqueId | Required |     | edfi.StudentEducationOrganizationAssociation | StudentUSI |
| studentEducationOrganizationAssociations | educationOrganizationReference => educationOrganizationId | Required | LocalEducationAgencyId from the edfi.LocalEducationAgency must match this  column, i.e., the demographics must be tied to the school district that represents the overall scope of the starter kit | edfi.StudentEducationOrganizationAssociation | EducationOrganizationId |
| studentEducationOrganizationAssociations | hispanicLatinoEthnicity | Optional |     | edfi.StudentEducationOrganizationAssociation | HispanicLatinoEthnicity |
| studentEducationOrganizationAssociations | limitedEnglishProficiencyDescriptor | Optional | must be from standard [LimitedEnglishProficiency set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/LimitedEnglishProficiencyDescriptor.xml) | edfi.StudentEducationOrganizationAssociation | LimitedEnglishProficiencyDescriptorId |
| studentEducationOrganizationAssociations | sexDescriptor | Required | must be from standard [Sex set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/SexDescriptor.xml) | edfi.StudentEducationOrganizationAssociation | SexDescriptorId |
| studentEducationOrganizationAssociations | races => raceDescriptor | Required | must be from standard [Race set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/RaceDescriptor.xml) | edfi.RaceDescriptor | RaceDescriptorId |
| /studentSectionAssociations |     |     |     |     |     |
| studentSectionAssociations | studentReference => studentUniqueId | Required | must be the local district ID | edfi.StudentSectionAssociation | StudentUSI |
| studentSectionAssociations | sectionReference => localCourseCode | Required |     | edfi.StudentSectionAssociation | LocalCourseCode |
| studentSectionAssociations | sectionReference => schoolId | Required | must be the local district ID | edfi.StudentSectionAssociation | SchoolId |
| studentSectionAssociations | sectionReference => schoolYear | Required |     | edfi.StudentSectionAssociation | SchoolYear |
| studentSectionAssociations | sectionReference => sectionIdentifier | Required |     | edfi.StudentSectionAssociation | SectionIdentifier |
| studentSectionAssociations | sectionReference => sessionName | Required |     | edfi.StudentSectionAssociation | SessionName |
| studentSectionAssociations | endDate | Optional |     | edfi.StudentSectionAssociation | EndDate |
| /studentSchoolAttendanceEvents |     |     |     |     |     |
| studentSchoolAttendanceEvents | studentReference => studentUniqueId | Required | must be the local district ID | edfi.StudentSchoolAttendanceEvent | StudentUSI |
| studentSchoolAttendanceEvents | schoolReference => schoolId | Required | must be the local district ID | edfi.StudentSchoolAttendanceEvent | SchoolId |
| studentSchoolAttendanceEvents | attendanceEventCategoryDescriptor | Required | must be from standard [AttendanceEventCategory set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/AttendanceEventCategoryDescriptor.xml) | edfi.StudentSchoolAttendanceEvent | AttendanceEventCategoryDescriptorId |
| studentSchoolAttendanceEvents | sessionReference => schoolYear | Required |     | edfi.StudentSchoolAttendanceEvent | SchoolYear |
| studentSchoolAttendanceEvents | eventDate | Required |     | edfi.StudentSchoolAttendanceEvent | EventDate |
| /parents |     |     |     |     |     |
| parents | parentUniqueId | Required | must be the local district ID | edfi.Parent | ParentUniqueId |
| parents | firstName | Required |     | edfi.Parent | FirstName |
| parents | lastSurname | Required |     | edfi.Parent | LastSurname |
| parents | addresses => addressTypeDescriptor | Optional | must be from standard [AddressType set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/AddressTypeDescriptor.xml) | edfi.ParentAddress | AddressTypeDescriptorId |
| parents | addresses => streetNumberName | Optional |     | edfi.ParentAddress | StreetNumberName |
| parents | addresses => apartmentRoomSuiteNumber | Optional |     | edfi.ParentAddress | ApartmentRoomSuiteNumber |
| parents | addresses => city | Optional |     | edfi.ParentAddress | City |
| parents | addresses => stateAbbreviationDescriptor | Optional | must be from standard [StateAbbreviation set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/StateAbbreviationDescriptor.xml) | edfi.ParentAddress | StateAbbreviationDescriptorId |
| parents | addresses => postalCode | Optional |     | edfi.ParentAddress | PostalCode |
| parents | telephones => telephoneNumberTypeDescriptor | Optional | must be from standard [TelephoneNumberType set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/TelephoneNumberTypeDescriptor.xml) | edfi.ParentTelephone | TelephoneNumberTypeDescriptorId |
| parents | telephones => telephoneNumber | Optional |     | edfi.ParentTelephone | TelephoneNumber |
| parents | electronicMails => electronicMailTypeDescriptor | Optional | must be from standard [ElectronicMailType set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/ElectronicMailTypeDescriptor.xml) | edfi.ParentElectronicMail | ElectronicMailTypeDescriptorId |
| parents | electronicMails => electronicMailAddress | Optional |     | edfi.ParentElectronicMail | ElectronicMailAddress |
| parents | electronicMails => primaryEmailAddressIndicator | Optional |     | edfi.ParentElectronicMail | PrimaryEmailAddressIndicator |
| /studentParentAssociations |     |     |     |     |     |
| studentParentAssociations | studentReference => studentUniqueId | Required | must be the local district ID | edfi.StudentParentAssociation | StudentUSI |
| studentParentAssociations | parentReference => parentUniqueId | Required | must be the local district ID | edfi.StudentParentAssociation | ParentUSI |
| studentParentAssociations | relationDescriptor | Required | must be from standard [Relation set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/RelationDescriptor.xml) | edfi.StudentParentAssociation | RelationDescriptorId |
| studentParentAssociations | primaryContactStatus | Optional |     | edfi.StudentParentAssociation | PrimaryContactStatus |
| studentParentAssociations | livesWith | Optional |     | edfi.StudentParentAssociation | LivesWith |
| studentParentAssociations | emergencyContactStatus | Optional |     | edfi.StudentParentAssociation | EmergencyContactStatus |
| studentParentAssociations | contactPriority | Optional |     | edfi.StudentParentAssociation | ContactPriority |
| studentParentAssociations | contactRestrictions | Optional |     | edfi.StudentParentAssociation | ContactRestrictions |
| /staffs |     |     |     |     |     |
| staffs | staffUniqueId |     | must be the local district ID | edfi.Staff | StaffUniqueId |
| staffs | electronicMails => electronicMailTypeDescriptor |     | must be from standard [ElectronicEmailType set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/ElectronicMailTypeDescriptor.xml) | edfi.StaffElectronicMail | ElectronicMailTypeDescriptorId |
| staffs | electronicMails => electronicMailAddress |     |     | edfi.StaffElectronicMail | ElectronicMailAddress |
| /staffEducationOrganizationAssignmentAssociations |     |     |     |     |     |
| staffEducationOrganizationAssignmentAssociations | staffReference => staffUniqueId | Required | must be the local district ID | edfi.StaffEducationOrganizationAssignmentAssociation | StaffUSI |
| staffEducationOrganizationAssignmentAssociations | staffClassificationDescriptor | Required | must be from standard [StaffClassification set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/StaffClassificationDescriptor.xml) | edfi.StaffEducationOrganizationAssignmentAssociation | StaffClassificationDescriptorId |
| staffEducationOrganizationAssignmentAssociations | educationOrganizationReference => educationOrganizationId | Required | must be the local district ID | edfi.StaffEducationOrganizationAssignmentAssociation | EducationOrganizationId |
| staffEducationOrganizationAssignmentAssociations | endDate | Optional |     | edfi.StaffEducationOrganizationAssignmentAssociation | EndDate |
| /staffSectionAssociations |     |     |     |     |     |
| staffSectionAssociations | staffReference => staffUniqueId | Required | must be the local district ID | edfi.StaffSectionAssociation | StaffUSI |
| staffSectionAssociations | sectionReference => localCourseCode | Required |     | edfi.StaffSectionAssociation | LocalCourseCode |
| staffSectionAssociations | sectionReference => schoolId | Required | must be the local district ID | edfi.StaffSectionAssociation | SchoolId |
| staffSectionAssociations | sectionReference => schoolYear | Required |     | edfi.StaffSectionAssociation | SchoolYear |
| staffSectionAssociations | sectionReference => sectionIdentifier | Required |     | edfi.StaffSectionAssociation | SectionIdentifier |
| staffSectionAssociations | sectionReference => sessionName | Required |     | edfi.StaffSectionAssociation | SessionName |
| staffSectionAssociations | endDate | Optional |     | edfi.StaffSectionAssociation | EndDate |
| /calendarDates |     |     |     |     |     |
| calendarDates | calendarReference =>  schoolId | Required | must be the local district ID | edfi.CalendarDateCalendarEvent | SchoolId |
| calendarDates | calendarReference =>  schoolYear | Required |     | edfi.CalendarDateCalendarEvent | SchoolYear |
| calendarDates | date | Required |     | edfi.CalendarDateCalendarEvent | Date |
| calendarDates | calendarEvents => calendarEventDescriptor | Required | must be from standard [CalendarEvent set](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v4.0.0/Descriptors/CalendarEventDescriptor.xml) | edfi.CalendarDateCalendarEvent | CalendarEventDescriptorId |
