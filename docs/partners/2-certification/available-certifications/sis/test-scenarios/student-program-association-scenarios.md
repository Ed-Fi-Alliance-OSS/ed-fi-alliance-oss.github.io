# v5 StudentProgram > StudentProgramAssociation Scenarios

This interchange loads students' participation in programs.

The StudentProgramAssociation represents the Program(s) that a student
participates in or is served by.

### **Prerequisites**

- Ed-Org (pre-loaded)
- Program (pre-loaded)
- Student
- Student Enrollment

### Scenarios

1. Create a Gifted and Talented student program association for an elementary
   school student.
2. Create a Bilingual student program association for a high school student.
3. Update the beginDate for the elementary student.
4. Update the beginDate for the high school student.
5. Delete the program association for the elementary school student.

(Note: the Program's educationOrganizationId is the Local Education Agency ID)

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required / Optional | Scenario 1 <br/>POST                        | Scenario 2 <br/>POST                        | Scenario 3 <br/>PUT                                  | Scenario 4 <br/>PUT                                  |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | ------------------- | ------------------------------------------- | ------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| StudentProgramAssociations     | beginDate                      | FALSE         | date                           | REQUIRED            | 8/23/<br/>`<br/>[Current School Year]<br/>` | 8/23/<br/>`<br/>[Current School Year]<br/>` | **09/30/**<br/>`<br/>**[Current School Year]**<br/>` | **10/20/**<br/>`<br/>**[Current School Year]**<br/>` |
| StudentProgramAssociations     | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED            |                                             |                                             |                                                      |                                                      |
| educationOrganizationReference | educationOrganizationId        | FALSE         | integer                        | REQUIRED            | 255901                                      | 255901                                      | 255901                                               | 255901                                               |
| StudentProgramAssociations     | programReference               | FALSE         | programReference               | REQUIRED            |                                             |                                             |                                                      |                                                      |
| programReference               | educationOrganizationId        | FALSE         | integer                        | REQUIRED            | 255901                                      | 255901                                      | 255901                                               | 255901                                               |
| programReference               | programName                    | FALSE         | string                         | REQUIRED            | Gifted and Talented                         | Grand Bend Bilingual 101                    | Gifted and Talented                                  | Grand Bend Bilingual 101                             |
| programReference               | programTypeDescriptor          | FALSE         | programTypeDescriptor          | REQUIRED            | Gifted and Talented                         | Bilingual                                   | Gifted and Talented                                  | Bilingual                                            |
| StudentProgramAssociations     | studentReference               | FALSE         | studentReference               | REQUIRED            |                                             |                                             |                                                      |                                                      |
| studentReference               | studentUniqueId                | FALSE         | string                         | REQUIRED            | 111111                                      | 222222                                      | 111111                                               | 222222                                               |
