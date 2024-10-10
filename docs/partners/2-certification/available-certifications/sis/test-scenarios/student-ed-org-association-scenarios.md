# v5 Student Enrollment > StudentEdOrgAssociation Scenarios

The Student Enrollment interchange describes student enrollments in schools and
in sections.

This association represents student information that is specific to a student's
relationship with an EducationOrganization. Enrollment relationship semantics
are covered
by [https://edfi.atlassian.net/wiki/spaces/EDFI/pages/22450000](https://edfi.atlassian.net/wiki/spaces/EDFI/pages/22450000).

## Prerequisites

* Student

## Scenarios

1. Create a Student EdOrg Association for an elementary Student at Grand Bend
    School District.\*
2. Create a Student EdOrg Association for a high school Student at Grand Bend
    School District.\*
3. Update the Phone number on the first Student.
4. Update the Address on the second Student.

### Additional Requirements

* For these scenarios SIS system MUST demonstrate that it can provide 3
    student identifiers: a SIS/district ID, a state ID, and a local ID (also
    known as a "student number", which students typically memorize and use for
    local operations). In terms of studentIdentificationSystemDescriptors, these
    are the "District", "State" and "Local" values in the default Ed-Fi
    descriptor values, respectively.
* The SIS MUST include at least these three values in the
    StudentIdentificationCodes array and
    the studentIdentificationSystemDescriptors MUST be labeled as "District",
    "State" and "Local" per the definitions above.
* If the SIS only has a subset of these values, values can be repeated as
    needed. For example, the SIS might use the SIS/district ID as the local ID
    (student number); in this case, that ID would be repeated in the array as
    both the "District" and "Local" values.

| **Resource** | **Property Name** | **Is Collection** | **Data Type** | **Required / Optional** | **Scenario 1  <br/>POST** | **Scenario 2  <br/>POST** | Scenario 3  <br/>POST/PUT | Scenario 4 POST/PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StudentEducationOrganizationAssociations | educationOrganizationReference | FALSE | educationOrganizationReference | REQUIRED |     |     |     |     |
| educationOrganizationReference | educationOrganizationId | FALSE | integer | REQUIRED | 255901 | 255901 | 255901 | 255901 |
| StudentEducationOrganizationAssociations | studentReference | FALSE | studentReference | REQUIRED |     |     |     |     |
| studentReference | studentUniqueId | FALSE | string | REQUIRED | 111111 | 222222 | 111111 | 222222 |
| StudentEducationOrganizationAssociations | limitedEnglishProficiencyDescriptor | FALSE | limitedEnglishProficiencyDescriptor | REQUIRED | NotLimited | NotLimited | NotLimited | NotLimited |
| StudentEducationOrganizationAssociations | studentCharacteristics | TRUE | studentCharacteristics\[\] | REQUIRED |     |     |     |     |
| studentEducationOrganizationAssociationStudentCharacteristics | studentCharacteristicDescriptor | FALSE | studentCharacteristicDescriptor | REQUIRED | Immigrant | Economic Disadvantaged | Immigrant | Economic Disadvantaged |
| studentEducationOrganizationAssociations | StudentIdentificationCodes | TRUE | studentIdentificationCodes \[ \] | REQUIRED |     |     |     |     |
| studentEducationOrganizationAssociationsStudentIdentificationCodes | assigningOrganizationIdentificationCode | FALSE | string | REQUIRED | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) |
| studentEducationOrganizationAssociationsStudentIdentificationCodes | identificationCode | FALSE | string | REQUIRED | \[system values\] | \[system values\] | \[system values\] | \[system values\] |
| studentEducationOrganizationAssociationsStudentIdentificationCodes | studentIdentificationSystemDescriptor | FALSE | studentIdentificationSystemDescriptor | REQUIRED | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) | State, District, and Local (CONDITIONAL) |
| studentEducationOrganizationAssociations | sexDescriptor | FALSE | sexDescriptor | REQUIRED | Male | Female | Male | Female |
| studentEducationOrganizationAssociationsAddresses | addresses | TRUE | addresses\[\] | REQUIRED |     |     |     |     |
| studentEducationOrganizationAssociationsAddresses | addressTypeDescriptor | FALSE | addressTypeDescriptor | CONDITIONAL | Home | Home | Home | Home |
| studentEducationOrganizationAssociationsAddresses | city | FALSE | string | REQUIRED | Grand Bend | Grand Bend | Grand Bend | Grand Bend |
| studentEducationOrganizationAssociationsAddresses | postalCode | FALSE | string | REQUIRED | 78834 | 78834 | 78834 | 78834 |
| studentEducationOrganizationAssociationsAddresses | stateAbbreviationDescriptor | FALSE | stateAbbreviationDescriptor | REQUIRED | TX  | TX  | TX  | TX  |
| studentEducationOrganizationAssociationsAddresses | streetNumberName | FALSE | string | REQUIRED | 654 Mission Hills | 123 Cedar Street | 654 Mission Hills | **123 Cedar Circle** |
| StudstudentEducationOrganizationAssociations | telephones | TRUE | studentTelephone\[\] | REQUIRED |     |     |     |     |
| studentEducationOrganizationAssociationsTelephones | telephoneNumber | FALSE | string | REQUIRED | 111-222-3333 |     | **111-222-4444** |     |
| studentEducationOrganizationAssociationsTelephones | telephoneNumberTypeDescriptor | FALSE | telephoneNumberTypeDescriptor | REQUIRED | Home |     | Home |     |
| studentEducationOrganizationAssociations | electronicMails | TRUE | ElectronicMail\[\] | REQUIRED |     |     |     |     |
| studentEducationOrganizationAssociationsElectronicMails | electronicMailAddress | FALSE | string | REQUIRED | [Austin@edficert.org](mailto:Austin@edficert.org) | [Madison@edficert.org](mailto:Madison@edficert.org) | [Austin@edficert.org](mailto:Austin@edficert.org) | [Madison@edficert.org](mailto:Madison@edficert.org) |
| studentEducationOrganizationAssociationsElectronicMails | electronicMailTypeDescriptor | FALSE | electronicMailTypeDescriptor | REQUIRED | Other | Other | Other | Other |
| studentEducationOrganizationAssociations | hispanicLatinoEthnicity | FALSE | boolean | REQUIRED | FALSE | FALSE | FALSE | FALSE |
| studentEducationOrganizationAssociationsRaces | raceDescriptor | FALSE | raceDescriptor | REQUIRED | Black - African American | White | Black - African American | White |
| studentEducationOrganizationAssociationsStudentLanguages | languageDescriptor | FALSE | languageDescriptor | REQUIRED | spa |     | spa |     |
| studentEducationOrganizationAssociationsLanguageUses | languageUseDescriptor | FALSE | languageUseDescriptor | REQUIRED | Home language |     | Home language |     |
