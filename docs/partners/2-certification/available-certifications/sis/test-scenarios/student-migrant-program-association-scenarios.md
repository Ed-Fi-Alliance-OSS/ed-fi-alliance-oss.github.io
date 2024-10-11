# v5 Student Program > StudentMigrantProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Migrant Education Program Association represents the migrant
educational program(s) that a student participates in or receives services from.
The association is an extension of the StudentProgramAssociation particular for
migrant programs.

### Prerequisites

- Ed-Org (pre-loaded)
- Program (pre-loaded)
- Student
- Student Enrollment

### Scenarios

1. Create a Student Migrant Education Program Association for an elementary
   school student.
2. Update the Priority for Services from FALSE to TRUE.

(Note: the Program's educationOrganizationId is the Local Education Agency ID)

| Resource                                   | Property Name                            | Is Collection | Data Type                                | Required / Optional | Scenario 1 <br/>POST                        | Scenario 2 <br/>PUT                         |
| ------------------------------------------ | ---------------------------------------- | ------------- | ---------------------------------------- | ------------------- | ------------------------------------------- | ------------------------------------------- |
| StudentMigrantEducationProgramAssociations | beginDate                                | FALSE         | date                                     | REQUIRED            | 8/23/<br/>`<br/>[Current School Year]<br/>` | 8/23/<br/>`<br/>[Current School Year]<br/>` |
| StudentMigrantEducationProgramAssociations | educationOrganizationReference           | FALSE         | educationOrganizationReference           | REQUIRED            |                                             |                                             |
| StudentMigrantEducationProgramAssociations | educationOrganizationId                  | FALSE         | integer                                  | REQUIRED            | 255901                                      | 255901                                      |
| StudentMigrantEducationProgramAssociations | programReference                         | FALSE         | programReference                         | REQUIRED            |                                             |                                             |
| programReference                           | programName                              | FALSE         | string                                   | REQUIRED            | Migrant Education                           | Migrant Education                           |
| programReference                           | programTypeDescriptor                    | FALSE         | programTypeDescriptor                    | REQUIRED            | Migrant Education                           | Migrant Education                           |
| programReference                           | educationOrganizationId                  | FALSE         | integer                                  | REQUIRED            | 255901                                      | 255901                                      |
| StudentMigrantEducationProgramAssociations | studentReference                         | FALSE         | studentReference                         | REQUIRED            |                                             |                                             |
| studentReference                           | studentUniqueId                          | FALSE         | string                                   | REQUIRED            | 111111                                      | 111111                                      |
| StudentMigrantEducationProgramAssociations | priorityForServices                      | FALSE         | boolean                                  | REQUIRED            | TRUE                                        | **FALSE**                                   |
| StudentMigrantEducationProgramAssociations | lastQualifyingMove                       | FALSE         | date                                     | REQUIRED            | 07/16/<br/><br/>[Current School Year]       | 07/16/<br/><br/>[Current School Year]       |
| StudentMigrantEducationProgramAssociations | migrantEducationProgramServices          | TRUE          | migrantEducationProgramService[]         | CONDITIONAL         |                                             |                                             |
| migrantEducationProgramServices            | migrantEducationProgramServiceDescriptor | FALSE         | migrantEducationProgramServiceDescriptor | CONDITIONAL         | Instructional Services                      | Instructional Services                      |
