# v5 Student Enrollment > StudentSchoolAssociation Scenarios

The Student Enrollment interchange describes student enrollments in schools and
in sections.

This association represents the School in which a student is enrolled. The
semantics of enrollment may differ slightly by state. Non-enrollment
relationships between a student and an education organization may be described
using the StudentEducationOrganizationAssociation.

### Prerequisites

* Student
* EdOrg
* Graduation Plan (if applicable)

### Scenarios

1. Create a Student School Association (school enrollment) for a Student at
    Grand Bend Elementary School.
2. Create a Student School Association (school enrollment) for a Student at
    Grand Bend High School.
3. Update the entry date for the elementary student's StudentSchoolAssociation.
     Remove the exitWithdraw Date and exitWithdraw Descriptor.
4. Add a graduation plan reference to the High School student's
    StudentSchoolAssociation.
5. Update the exitWithdrawDate for the elementary school student.
6. Delete the StudentSchoolAssociation for the elementary school student.

Additional Requirements for StudentSchoolAssociation

* The studentEducationOrganizationAssociations record should remain after the
    student withdraws in Scenario 5.  The association should not be deleted if
    the student enrollment in the education organization changes, or at the end
    of a school year.  Rather, the association should be thought of as a core
    part of the student record, but scoped to the education organization.

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StudentSchoolAssociations | schoolReference | FALSE | schoolReference | REQUIRED |     |     |     |     |     |
| schoolReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 | 255901107 |
| StudentSchoolAssociations | studentReference | FALSE | studentReference | REQUIRED |     |     |     |     |     |
| studentReference | studentUniqueId | FALSE | string | REQUIRED | 111111 | 222222 | 111111 | 222222 | 111111 |
| StudentSchoolAssociations | graduationPlanReference | FALSE | graduationPlanReference | REQUIRED |     |     |     |     |     |
| graduationPlanReference | educationOrganizationId | FALSE | integer | REQUIRED |     |     |     | 255901001 |     |
| graduationPlanReference | graduationSchoolYear | FALSE | integer | REQUIRED |     |     |     | 2020 |     |
| graduationPlanReference | graduationPlanTypeDescriptor | FALSE | graduationPlanTypeDescriptor | REQUIRED |     |     |     | Recommended |     |
| StudentSchoolAssociations | entryDate | FALSE | date | REQUIRED | 08/31/<br/>[Current School Year] | 08/31/<br/>[Current School Year] | 09/01/<br/>[Current School Year] | 08/31/<br/>[Current School Year] | 08/31/<br/>[Current School Year] |
| StudentSchoolAssociations | entryGradeLevelDescriptor | FALSE | entryGradeLevelDescriptor | REQUIRED | First Grade | Ninth grade | First Grade | Ninth grade | First Grade |
| StudentSchoolAssociations | entryTypeDescriptor | FALSE | entryTypeDescriptor | REQUIRED | Next year school | Next year school | Next year school | Next year school | Next year school |
| StudentSchoolAssociations | exitWithdrawDate | FALSE | date | REQUIRED | 09/1/<br/>[Current School Year] |     |     |     | 11/1/<br/>[Current School Year] |
| StudentSchoolAssociations | exitWithdrawTypeDescriptor | FALSE | exitWithdrawTypeDescriptor | REQUIRED | Transferred |     |     |     | Transferred |
| StudentSchoolAssociations | repeatGradeIndicator | FALSE | boolean | REQUIRED | FALSE | FALSE | FALSE | FALSE | FALSE |
| StudentSchoolAssociations | residencyStatusDescriptor | FALSE | residencyStatusDescriptor | REQUIRED | Resident of admin unit and school area | Resident of admin unit and school area | Resident of admin unit and school area | Resident of admin unit and school area | Resident of admin unit and school area |
