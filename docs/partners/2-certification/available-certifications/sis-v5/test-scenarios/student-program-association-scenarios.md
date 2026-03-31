---
hide_table_of_contents: true
---

# v5 StudentProgram > StudentProgramAssociation Scenarios

This interchange loads students' participation in programs.

The StudentProgramAssociation represents the Program(s) that a student
participates in or is served by.

## **Prerequisites**

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Gifted and Talented student program association for an elementary
   school student.
2. Create a Bilingual student program association for a high school student.
3. Update the beginDate for the elementary student.
4. Update the beginDate for the high school student.
5. Delete the program association for the elementary school student.

:::note

The Program's educationOrganizationId is the Local Education Agency ID

:::

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required | Scenario 1: POST             | Scenario 2: POST             | Scenario 3: PUT                   | Scenario 4: PUT                   |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | -------- | ---------------------------- | ---------------------------- | --------------------------------- | --------------------------------- |
| StudentProgramAssociations     | beginDate                      | FALSE         | date                           | REQUIRED | 8/23/\[Current School Year\] | 8/23/\[Current School Year\] | **09/30/\[Current School Year\]** | **10/20/\[Current School Year\]** |
| StudentProgramAssociations     | endDate                        | FALSE         | date                           | REQUIRED | 5/23/\[Current School Year\] | 5/23/\[Current School Year\] |                                   |                                   |
| StudentProgramAssociations     | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED |                              |                              |                                   |                                   |
| educationOrganizationReference | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901                       | 255901                       | 255901                            | 255901                            |
| StudentProgramAssociations     | programReference               | FALSE         | programReference               | REQUIRED |                              |                              |                                   |                                   |
| programReference               | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901                       | 255901                       | 255901                            | 255901                            |
| programReference               | programName                    | FALSE         | string                         | REQUIRED | Gifted and Talented          | Grand Bend Bilingual 101     | Gifted and Talented               | Grand Bend Bilingual 101          |
| programReference               | programTypeDescriptor          | FALSE         | programTypeDescriptor          | REQUIRED | Gifted and Talented          | Bilingual                    | Gifted and Talented               | Bilingual                         |
| StudentProgramAssociations     | studentReference               | FALSE         | studentReference               | REQUIRED |                              |                              |                                   |                                   |
| studentReference               | studentUniqueId                | FALSE         | string                         | REQUIRED | 111111                       | 222222                       | 111111                            | 222222                            |
