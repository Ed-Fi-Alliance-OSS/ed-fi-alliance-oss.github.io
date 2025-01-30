---
hide_table_of_contents: true
---

# v4 Student Program > StudentMigrantProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Migrant Education Program Association represents the migrant
educational program(s) that a student participates in or receives services from.
The association is an extension of the StudentProgramAssociation particular for
migrant programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student Migrant Education Program Association for an elementary
   school student.
2. Update the Priority for Services from FALSE to TRUE.

(Note: the Program's educationOrganizationId is the Local Education Agency ID)

| Resource                                   | Property Name                            | Is Collection | Data Type                                | Required / Optional | Scenario 1: POST              | Scenario 2: PUT                |
| ------------------------------------------ | ---------------------------------------- | ------------- | ---------------------------------------- | ------------------- | ----------------------------- | ----------------------------- |
| StudentMigrantEducationProgramAssociations | beginDate                                | FALSE         | date                                     | REQUIRED            | 8/23/[Current School Year]    | 8/23/[Current School Year]    |
| StudentMigrantEducationProgramAssociations | educationOrganizationReference           | FALSE         | educationOrganizationReference           | REQUIRED            |                               |                               |
| StudentMigrantEducationProgramAssociations | educationOrganizationId                  | FALSE         | integer                                  | REQUIRED            | 255901                        | 255901                        |
| StudentMigrantEducationProgramAssociations | programReference                         | FALSE         | programReference                         | REQUIRED            |                               |                               |
| programReference                           | programName                              | FALSE         | string                                   | REQUIRED            | Migrant Education             | Migrant Education             |
| programReference                           | programTypeDescriptor                    | FALSE         | programTypeDescriptor                    | REQUIRED            | Migrant Education             | Migrant Education             |
| programReference                           | educationOrganizationId                  | FALSE         | integer                                  | REQUIRED            | 255901                        | 255901                        |
| StudentMigrantEducationProgramAssociations | studentReference                         | FALSE         | studentReference                         | REQUIRED            |                               |                               |
| studentReference                           | studentUniqueId                          | FALSE         | string                                   | REQUIRED            | 111111                        | 111111                        |
| StudentMigrantEducationProgramAssociations | participationStatus                      | FALSE         | participationStatus[]                   | OPTIONAL            |                               |                               |
| participationStatus                       | participationStatusDescriptor            | FALSE         | participationStatus                       | OPTIONAL            |                               |                               |
| participationStatus                       | designatedBy                             | FALSE         | string                                   | OPTIONAL            |                               |                               |
| participationStatus                       | statusBeginDate                          | FALSE         | date                                     | OPTIONAL            |                               |                               |
| participationStatus                       | statusEndDate                            | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | endDate                                   | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | reasonExitedDescriptor                   | FALSE         | reasonExitedDescriptor                   | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | servedOutsideOfRegularSession            | FALSE         | boolean                                  | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | priorityForServices                      | FALSE         | boolean                                  | REQUIRED            | TRUE                          | FALSE                         |
| StudentMigrantEducationProgramAssociations | lastQualifyingMove                       | FALSE         | date                                     | REQUIRED            | 07/16/[Current School Year]   | 07/16/[Current School Year]   |
| StudentMigrantEducationProgramAssociations | continuationOfServicesReasonDescriptor   | FALSE         | continuationOfServicesReasonDescriptor   | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | usInitialEntry                           | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | usMostRecentEntry                        | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | usInitialSchoolEntry                     | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | qualifyingArrivalDate                    | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | stateResidencyDate                      | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | eligibilityExpirationDate                | FALSE         | date                                     | OPTIONAL            |                               |                               |
| StudentMigrantEducationProgramAssociations | migrantEducationProgramServices          | TRUE          | migrantEducationProgramService[]         | CONDITIONAL         |                               |                               |
| migrantEducationProgramServices            | migrantEducationProgramServiceDescriptor | FALSE         | migrantEducationProgramServiceDescriptor | CONDITIONAL         | Instructional Services        | Instructional Services        |
| migrantEducationProgramServices            | serviceBeginDate                         | FALSE         | date                                     | OPTIONAL            |                               |                               |
| migrantEducationProgramServices            | serviceEndDate                           | FALSE         | date                                     | OPTIONAL            |                               |                               |
| migrantEducationProgramServices            | primaryIndicator                         | FALSE         | boolean                                  | OPTIONAL            |                               |                               |
