---
hide_table_of_contents: true
---

# v4 Student Program > StudentTitleIPartAProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

This association represents the Title I Part A program(s) that a student
participates in or from which the Student receives services. The association is
an extension of the StudentProgramAssociation specific to Title I Part A
programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student Title I Part A Program Association for an elementary school
   student.
2. Create a Student Title I Part A Program Association for a high school
   student.
3. Update "titleIPartAParticipantType" for first association.
4. Update "titleIPartAParticipantType" for second association.

:::note

The Program's educationOrganizationId is the Local Education Agency ID.

:::

| Resource                              | Property Name                    | Is Collection | Data Type                        | Required / Optional | Scenario 1: POST                   | Scenario 2: POST             | Scenario 3: PUT               | Scenario 4: PUT              |
| ------------------------------------- | -------------------------------- | ------------- | -------------------------------- | ------------------- | ---------------------------------- | ---------------------------- | ----------------------------- | ---------------------------- |
| StudentTitleIPartAProgramAssociations | beginDate                        | FALSE         | date                             | REQUIRED            | 8/23/[Current School Year]       | 8/23/[Current School Year] | 8/23/[Current School Year]  | 8/23/[Current School Year] |
| StudentTitleIPartAProgramAssociations | educationOrganizationReference   | FALSE         | educationOrganizationReference   | REQUIRED            |                                    |                              |                               |                              |
| educationOrganizationReference        | educationOrganizationId          | FALSE         | integer                          | REQUIRED            | 255901                             | 255901                       | 255901                        | 255901                       |
| StudentTitleIPartAProgramAssociations | programReference                 | FALSE         | programReference                 | REQUIRED            |                                    |                              |                               |                              |
| programReference                      | programName                      | FALSE         | string                           | REQUIRED            | Title I Part A                     | Title I Part A               | Title I Part A                | Title I Part A               |
| programReference                      | educationOrganizationId          | FALSE         | integer                          | REQUIRED            | 255901                             | 255901                       | 255901                        | 255901                       |
| programReference                      | programTypeDescriptor            | FALSE         | programTypeDescriptor            | REQUIRED            | Title I Part A                     | Title I Part A               | Title I Part A                | Title I Part A               |
| StudentTitleIPartAProgramAssociations | reasonExitedDescriptor           | FALSE         | reasonExitedDescriptor           | OPTIONAL            |                                    |                              |                               |                              |
| StudentTitleIPartAProgramAssociations | studentReference                 | FALSE         | studentReference                 | REQUIRED            |                                    |                              |                               |                              |
| studentReference                      | studentUniqueId                  | FALSE         | string                           | REQUIRED            | 111111                             | 222222                       | 111111                        | 222222                       |
| StudentTitleIPartAProgramAssociations | titleIPartAParticipantDescriptor | FALSE         | titleIPartAParticipantDescriptor | REQUIRED            | Public Targeted Assistance Program | Public Schoolwide Program    | Public Schoolwide Program     | Was not served               |
| StudentTitleIPartAProgramAssociations | participationStatus              | FALSE         | participationStatus[]            | OPTIONAL            |                                    |                              |                               |                              |
| participationStatus                  | participationStatusDescriptor     | FALSE         | participationStatus              | OPTIONAL            |                                    |                              |                               |                              |
| participationStatus                  | designatedBy                     | FALSE         | string                           | OPTIONAL            |                                    |                              |                               |                              |
| participationStatus                  | statusBeginDate                  | FALSE         | date                             | OPTIONAL            |                                    |                              |                               |                              |
| participationStatus                  | statusEndDate                    | FALSE         | date                             | OPTIONAL            |                                    |                              |                               |                              |
| StudentTitleIPartAProgramAssociations | endDate                          | FALSE         | date                             | OPTIONAL            |                                    |                              |                               |                              |
| StudentTitleIPartAProgramAssociations | servedOutsideOfRegularSession    | FALSE         | boolean                          | OPTIONAL            |                                    |                              |                               |                              |
| StudentTitleIPartAProgramAssociations | studentTitleIPartAProgramAssociationServices | TRUE | studentTitleIPartAProgramAssociationServices[] | OPTIONAL |                                    |                              |                               |                              |
| studentTitleIPartAProgramAssociationServices | primaryIndicator              | FALSE         | boolean                          | OPTIONAL            |                                    |                              |                               |                              |
| studentTitleIPartAProgramAssociationServices | serviceDescriptor             | FALSE         | serviceDescriptor                | OPTIONAL            |                                    |                              |                               |                              |
| studentTitleIPartAProgramAssociationServices | serviceBeginDate             | FALSE         | date                             | OPTIONAL            |                                    |                              |                               |                              |
| studentTitleIPartAProgramAssociationServices | serviceEndDate               | FALSE         | date                             | OPTIONAL            |                                    |                              |                               |                              |
