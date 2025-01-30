---
hide_table_of_contents: true
---

# v4 Student Program > StudentCTEProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student CTE Program Association represents the career and technical
education program(s) that a student participates in or receives services from.
The association is an extension of the StudentProgramAssociation particular for
CTE programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student CTE Program Association for a high school student.
2. Modify the Program's Primary Indicator

:::note

The Program's educationOrganizationId is the Local Education Agency ID

:::

| Resource                      | Property Name                       | Is Collection | Data Type                           | Required / Optional | Scenario 1: POST               | Scenario 2: PUT                 |
| ----------------------------- | ----------------------------------- | ------------- | ----------------------------------- | ------------------- | ------------------------------ | ------------------------------ |
| StudentCTEProgramAssociations | beginDate                           | FALSE         | date                                | REQUIRED            | 8/23/[Current School Year]     | 8/23/[Current School Year]     |
| StudentCTEProgramAssociations | educationOrganizationReference      | FALSE         | educationOrganizationReference      | REQUIRED            |                                |                                |
| StudentCTEProgramAssociations | educationOrganizationId             | FALSE         | integer                             | REQUIRED            | 255901                         | 255901                         |
| StudentCTEProgramAssociations | programReference                    | FALSE         | programReference                    | REQUIRED            |                                |                                |
| programReference              | programName                         | FALSE         | string                              | REQUIRED            | Career and Technical Education | Career and Technical Education |
| programReference              | programTypeDescriptor               | FALSE         | programTypeDescriptor               | REQUIRED            | Career and Technical Education | Career and Technical Education |
| programReference              | educationOrganizationId             | FALSE         | integer                             | REQUIRED            | 255901                         | 255901                         |
| StudentCTEProgramAssociations | studentReference                    | FALSE         | studentReference                    | REQUIRED            |                                |                                |
| studentReference              | studentUniqueId                     | FALSE         | string                              | REQUIRED            | 222222                         | 222222                         |
| StudentCTEProgramAssociations | participationStatus                 | FALSE         | participationStatus[]               | OPTIONAL            |                                |                                |
| participationStatus           | participationStatusDescriptor       | FALSE         | participationStatus                 | OPTIONAL            |                                |                                |
| participationStatus           | designatedBy                        | FALSE         | string                              | OPTIONAL            |                                |                                |
| participationStatus           | statusBeginDate                     | FALSE         | date                                | OPTIONAL            |                                |                                |
| participationStatus           | statusEndDate                       | FALSE         | date                                | OPTIONAL            |                                |                                |
| StudentCTEProgramAssociations | cteProgram                          | TRUE          | cteProgram[]                        | OPTIONAL            |                                |                                |
| ctePrograms                  | careerPathwayDescriptor             | FALSE         | careerPathwayDescriptor             | OPTIONAL            |                                |                                |
| ctePrograms                  | cipCode                             | FALSE         | string                              | OPTIONAL            |                                |                                |
| ctePrograms                  | primaryCTEProgramIndicator          | FALSE         | boolean                             | OPTIONAL            |                                |                                |
| ctePrograms                  | cteProgramCompletionIndicator       | FALSE         | boolean                             | OPTIONAL            |                                |                                |
| StudentCTEProgramAssociations | endDate                             | FALSE         | date                                | OPTIONAL            |                                | 10/02/[Current School Year]    |
| StudentCTEProgramAssociations | reasonExitedDescriptor              | FALSE         | reasonExitedDescriptor              | OPTIONAL            |                                |                                |
| StudentCTEProgramAssociations | servedOutsideOfRegularSession      | FALSE         | boolean                             | OPTIONAL            |                                |                                |
| StudentCTEProgramAssociations | services                            | TRUE          | service[]                           | OPTIONAL            |                                |                                |
| services                      | serviceDescriptor                   | FALSE         | serviceDescriptor                   | OPTIONAL            |                                |                                |
| services                      | serviceBeginDate                    | FALSE         | date                                | OPTIONAL            |                                |                                |
| services                      | serviceEndDate                      | FALSE         | date                                | OPTIONAL            |                                |                                |
| services                      | primaryIndicator                    | FALSE         | boolean                             | OPTIONAL            |                                |                                |
| StudentCTEProgramAssociations | nonTraditionalGenderStatus          | FALSE         | boolean                             | REQUIRED            | TRUE                           | TRUE                           |
| StudentCTEProgramAssociations | privateCTEProgram                   | FALSE         | boolean                             | REQUIRED            | FALSE                          | FALSE                          |
| StudentCTEProgramAssociations | technicalSkillsAssessmentDescriptor  | FALSE         | technicalSkillsAssessmentDescriptor | REQUIRED            | Passed                         | Passed                         |
| StudentCTEProgramAssociations | cteProgramServices                  | TRUE          | cteProgramService[]                | REQUIRED            |                                |                                |
| cteProgramServices            | cteProgramServiceDescriptor         | FALSE         | cteProgramServiceDescriptor         | REQUIRED            | Information Technology         | Information Technology         |
| cteProgramServices            | cipCode                             | FALSE         | string                              | REQUIRED            | 11.0103                        | 11.0103                        |
| cteProgramServices            | serviceBeginDate                    | FALSE         | date                                | OPTIONAL            | 8/23/[Current School Year]     | 8/23/[Current School Year]     |
| cteProgramServices            | serviceEndDate                      | FALSE         | date                                | OPTIONAL            | 10/02/[Current School Year]    | 10/02/[Current School Year]    |
| cteProgramServices            | primaryIndicator                    | FALSE         | boolean                             | REQUIRED            | TRUE                           | TRUE                           |
