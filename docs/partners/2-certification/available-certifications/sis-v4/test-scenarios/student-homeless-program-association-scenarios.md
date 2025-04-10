---
hide_table_of_contents: true
---

# v4 Student Program > StudentHomelessProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Homeless Program Association represents the homeless program(s) that
a student participates in or receives services from. The association is an
extension of the StudentProgramAssociation particular for Homeless programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student Homeless Program Association for an elementary school
   student.
2. Update the Primary Nighttime Residence from Shelters to Doubled-up.

(Note: the Program's educationOrganizationId is the Local Education Agency ID)

| Resource                           | Property Name                               | Is Collection | Data Type                                   | Required / Optional | Scenario 1: POST             | Scenario 2: PUT               |
| ---------------------------------- | ------------------------------------------- | ------------- | ------------------------------------------- | ------------------- | ---------------------------- | ------------------------------ |
| StudentHomelessProgramAssociations | beginDate                                   | FALSE         | date                                        | REQUIRED            | 8/23/[Current School Year] | 8/23/[Current School Year]     |
| StudentHomelessProgramAssociations | educationOrganizationReference              | FALSE         | educationOrganizationReference              | REQUIRED            |                              |                              |
| StudentHomelessProgramAssociations | educationOrganizationId                     | FALSE         | integer                                     | REQUIRED            | 255901                       | 255901                       |
| StudentHomelessProgramAssociations | programReference                            | FALSE         | programReference                            | REQUIRED            |                              |                              |
| programReference                   | programName                                 | FALSE         | string                                      | REQUIRED            | Homeless                     | Homeless                     |
| programReference                   | programTypeDescriptor                       | FALSE         | programTypeDescriptor                       | REQUIRED            | Homeless                     | Homeless                     |
| programReference                   | educationOrganizationId                     | FALSE         | integer                                     | REQUIRED            | 255901                       | 255901                       |
| StudentHomelessProgramAssociations | studentReference                            | FALSE         | studentReference                            | REQUIRED            |                              |                              |
| studentReference                   | studentUniqueId                             | FALSE         | string                                      | REQUIRED            | 111111                       | 111111                       |
| StudentHomelessProgramAssociations | endDate                                     | FALSE         | date                                        | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | participationStatus                         | FALSE         | participationStatus[]                       | OPTIONAL            |                              |                              |
| participationStatus                | participationStatusDescriptor               | FALSE         | participationStatus                         | OPTIONAL            |                              |                              |
| participationStatus                | designatedBy                                | FALSE         | string                                      | OPTIONAL            |                              |                              |
| participationStatus                | statusBeginDate                             | FALSE         | date                                        | OPTIONAL            |                              |                              |
| participationStatus                | statusEndDate                               | FALSE         | date                                        | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | reasonExitedDescriptor                      | FALSE         | reasonExitedDescriptor                      | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | servedOutsideOfRegularSession              | FALSE         | boolean                                     | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | homelessProgramServices                     | TRUE          | service[]                                   | OPTIONAL            |                              |                              |
| homelessProgramServices            | homelessProgramServiceDescriptor            | FALSE         | homelessProgramServiceDescriptor            | OPTIONAL            |                              |                              |
| homelessProgramServices            | serviceBeginDate                            | FALSE         | date                                        | OPTIONAL            |                              |                              |
| homelessProgramServices            | serviceEndDate                              | FALSE         | date                                        | OPTIONAL            |                              |                              |
| homelessProgramServices            | primaryIndicator                            | FALSE         | boolean                                     | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | homelessPrimaryNighttimeResidenceDescriptor | FALSE         | homelessPrimaryNighttimeResidenceDescriptor | REQUIRED            | Shelters                     | Doubled-up                    |
| StudentHomelessProgramAssociations | awaitingFosterCare                         | FALSE         | boolean                                     | OPTIONAL            |                              |                              |
| StudentHomelessProgramAssociations | homelessUnaccompaniedYouth                  | FALSE         | boolean                                     | REQUIRED            | TRUE                         | TRUE                         |
