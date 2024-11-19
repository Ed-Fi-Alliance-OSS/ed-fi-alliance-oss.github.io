---
hide_table_of_contents: true
---

# v5 Student Program > StudentNeglectedOrDeliquentProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Neglected or Delinquent Program Association represents the neglected
and delinquent program(s) that a student participates in or receives services
from. The association is an extension of the StudentProgramAssociation
particular for neglected and delinquent programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student Neglected or Delinquent Program Association for a high
   school student.
2. Update the Service descriptor from Mentoring Programs to Dropout Prevention
   Programs.

Note: the Program's educationOrganizationId is the Local Education Agency ID

| Resource                                        | Property Name                                 | Is Collection | Data Type                                     | Required | Scenario 1: POST                 | Scenario 2 PUT                   |
| ----------------------------------------------- | --------------------------------------------- | ------------- | --------------------------------------------- | -------- | -------------------------------- | -------------------------------- |
| StudentNeglectedOrDelinquentProgramAssociations | beginDate                                     | FALSE         | date                                          | REQUIRED | 8/23/\[Current School Year\]     | 8/23/\[Current School Year\]     |
| StudentNeglectedOrDelinquentProgramAssociations | educationOrganizationReference                | FALSE         | educationOrganizationReference                | REQUIRED |                                  |                                  |
| StudentNeglectedOrDelinquentProgramAssociations | educationOrganizationId                       | FALSE         | integer                                       | REQUIRED | 255901                           | 255901                           |
| StudentNeglectedOrDelinquentProgramAssociations | programReference                              | FALSE         | programReference                              | REQUIRED |                                  |                                  |
| programReference                                | programName                                   | FALSE         | string                                        | REQUIRED | Neglected and Delinquent Program | Neglected and Delinquent Program |
| programReference                                | programTypeDescriptor                         | FALSE         | programTypeDescriptor                         | REQUIRED | Neglected and Delinquent Program | Neglected and Delinquent Program |
| programReference                                | educationOrganizationId                       | FALSE         | integer                                       | REQUIRED | 255901                           | 255901                           |
| StudentNeglectedOrDelinquentProgramAssociations | studentReference                              | FALSE         | studentReference                              | REQUIRED |                                  |                                  |
| studentReference                                | studentUniqueId                               | FALSE         | string                                        | REQUIRED | 222222                           | 222222                           |
| StudentNeglectedOrDelinquentProgramAssociations | neglectedOrDelinquentProgramDescriptor        | FALSE         | neglectedOrDelinquentProgramDescriptor        | REQUIRED | Neglected Programs               | Neglected Programs               |
| StudentNeglectedOrDelinquentProgramAssociations | neglectedOrDelinquentProgramServices          | TRUE          | neglectedOrDelinquentProgramService[]         | REQUIRED |                                  |                                  |
| neglectedOrDelinquentProgramServices            | neglectedOrDelinquentProgramServiceDescriptor | FALSE         | neglectedOrDelinquentProgramServiceDescriptor | REQUIRED | Mentoring Programs               | **Dropout Prevention Programs**  |
| neglectedOrDelinquentProgramServices            | serviceBeginDate                              | FALSE         | date                                          | REQUIRED | 08/23/\[Current School Year\]    | 08/23/\[Current School Year\]    |
| neglectedOrDelinquentProgramServices            | primaryIndicator                              | FALSE         | boolean                                       | REQUIRED | TRUE                             | TRUE                             |
