---
hide_table_of_contents: true
---

# v5 StudentProgram > StudentSpecialEducationProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Special Education Program Association represents the special
education program(s) that a student participates in or receives services from.
The association is an extension of the StudentProgramAssociation particular for
special education programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

### Scenarios

1. Create a Student Special Education Program Association for an elementary
   school student.
2. Create a Student Special Education Program Association for a high school
   student.
3. Update the "ideaEligibility" to FALSE for Student Special Education Program
   Association 1.
4. Update the "ideaEligibility" to FALSE for Student Special Education Program
   Association 2.

:::note

The Program's educationOrganizationId is the Local Education Agency ID.

:::

| Resource                                   | Property Name                     | Is Collection | Data Type                         | Required | Scenario 1: POST                            | Scenario 2: POST                              | Scenario 3: PUT                             | Scenario 4: PUT                               |
| ------------------------------------------ | --------------------------------- | ------------- | --------------------------------- | -------- | ------------------------------------------- | --------------------------------------------- | ------------------------------------------- | --------------------------------------------- |
| StudentSpecialEducationProgramAssociations | beginDate                         | FALSE         | date                              | REQUIRED | 8/23/\[Current School Year\]                | 8/23/\[Current School Year\]                  | 8/23/\[Current School Year\]                | 8/23/\[Current School Year\]                  |
| StudentSpecialEducationProgramAssociations | educationOrganizationReference    | FALSE         | educationOrganizationReference    | REQUIRED |                                             |                                               |                                             |                                               |
| StudentSpecialEducationProgramAssociations | educationOrganizationId           | FALSE         | integer                           | REQUIRED | 255901                                      | 255901                                        | 255901                                      | 255901                                        |
| StudentSpecialEducationProgramAssociations | programReference                  | FALSE         | programReference                  | REQUIRED |                                             |                                               |                                             |                                               |
| programReference                           | programName                       | FALSE         | string                            | REQUIRED | Special Education                           | Special Education                             | Special Education                           | Special Education                             |
| programReference                           | programTypeDescriptor             | FALSE         | programTypeDescriptor             | REQUIRED | Special Education                           | Special Education                             | Special Education                           | Special Education                             |
| programReference                           | educationOrganizationId           | FALSE         | integer                           | REQUIRED | 255901                                      | 255901                                        | 255901                                      | 255901                                        |
| StudentSpecialEducationProgramAssociations | specialEducationSettingDescriptor | FALSE         | specialEducationSettingDescriptor | REQUIRED | Inside regular class 80% or more of the day | Inside regular class less than 40% of the day | Inside regular class 80% or more of the day | Inside regular class less than 40% of the day |
| StudentSpecialEducationProgramAssociations | studentReference                  | FALSE         | studentReference                  | REQUIRED |                                             |                                               |                                             |                                               |
| studentReference                           | studentUniqueId                   | FALSE         | string                            | REQUIRED | 111111                                      | 222222                                        | 111111                                      | 222222                                        |
| StudentSpecialEducationProgramAssociations | ideaEligibility                   | FALSE         | boolean                           | REQUIRED | TRUE                                        | TRUE                                          | **FALSE**                                   | **FALSE**                                     |
