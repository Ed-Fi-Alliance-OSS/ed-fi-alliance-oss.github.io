# v5 Student Program > StudentSchoolFoodServicesProgramAssociation Scenarios

This entity represents an individual for whom instruction, services, and/or care
are provided in an early childhood, elementary, or secondary educational program
under the jurisdiction of a school, education agency or other institution or
program. A student is a person who has been enrolled in a school or other
educational institution.

### Prerequisites

- Student
- EdOrg
- Program

### Scenarios

1. Create a Student School Food Services Program Association with Reduced Price
   Lunch for an Elementary School Student
2. Update the schoolFoodServiceProgramServiceDescriptor to Free Lunch

| Resource                                                                  | Property Name                             | Is Collection | Data Type                                 | Required / Optional | Scenario 1 <br/>POST | Scenario 2 <br/>PUT |
| ------------------------------------------------------------------------- | ----------------------------------------- | ------------- | ----------------------------------------- | ------------------- | -------------------- | ------------------- |
| studentSchoolFoodServiceProgramAssociations                               | beginDate                                 | FALSE         | date                                      | REQUIRED            | Current Date         | Current Date        |
| studentSchoolFoodServiceProgramAssociations                               | EducationOrganizationReference            | FALSE         | EducationOrganizationReference            | REQUIRED            |                      |                     |
| studentSchoolFoodServiceProgramAssociationsEducationOrganizationReference | educationOrganizationId                   | FALSE         | integer                                   | REQUIRED            | 255901107            | 255901107           |
| studentSchoolFoodServiceProgramAssociations                               | ProgramReference                          | FALSE         | ProgramReference                          | REQUIRED            |                      |                     |
| studentSchoolFoodServiceProgramAssociationsProgramReference               | educationOrganizationId                   | FALSE         | integer                                   | REQUIRED            | 255901               | 255901              |
| studentSchoolFoodServiceProgramAssociationsProgramReference               | programName                               | FALSE         | string                                    | REQUIRED            | School Food Service  | School Food Service |
| studentSchoolFoodServiceProgramAssociationsProgramReference               | programTypeDescriptor                     | FALSE         | programTypeDescriptor                     | REQUIRED            | Other                | Other               |
| studentSchoolFoodServiceProgramAssociations                               | schoolFoodServiceProgramServices          | TRUE          | schoolFoodServiceProgramServices \[ \]    | REQUIRED            |                      |                     |
| schoolFoodServiceProgramServices                                          | schoolFoodServiceProgramServiceDescriptor | FALSE         | schoolFoodServiceProgramServiceDescriptor | REQUIRED            | Reduced Price Lunch  | **Free Lunch**      |
| studentSchoolFoodServiceProgramAssociations                               | StudentReference                          | FALSE         | StudentReference                          |                     |                      |                     |
| StudentReference                                                          | studentUniqueId                           | FALSE         | integer                                   | REQUIRED            | 111111               | 111111              |
