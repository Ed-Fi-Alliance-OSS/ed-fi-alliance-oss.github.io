# v5 Education Organization > Course Scenarios

This educational entity represents the organization of subject matter and
related learning experiences provided for the instruction of students on a
regular or systematic basis.

## Prerequisites

* None

## Scenarios

1. Create Algebra 1 course
2. Create Art 01 course
3. Update Algebra I to Algebra II
4. Changed Core Subject to Basic

| Resource                       | Property Name                        | Is Collection | Data Type                            | Required/Optional | Scenario 1: POST          | Scenario 2: POST     | Scenario 3: PUT | Scenario 4: PUT           |
| ------------------------------ | ------------------------------------ | ------------------ | ------------------------------------ | ------------------------ | ----------------------------- | ------------------------ | ------------------- | ----------------------------- |
| Courses                        | academicSubjectDescriptor            | FALSE              | academicSubjectDescriptor            | REQUIRED                 | Mathematics                   | Fine and Performing Arts | Mathematics         | Fine and Performing Arts      |
| Courses                        | courseCode                           | FALSE              | string                               | REQUIRED                 | [ALG 01 if possible \| system value]            | ART 01              | [ALG 01 if possible \| system value] | ART 01 |
| Courses                        | courseIdentificationCodes            | TRUE               | courseIdentificationCode             | REQUIRED                 |                               |                          |                     |                               |
| courseIdentificationCodes      | courseIdentificationSystemDescriptor | FALSE              | courseIdentificationSystemDescriptor | REQUIRED                 | State course code             | LEA course code          | State course code   | LEA course code               |
| courseIdentificationCodes      | identificationCode                   | FALSE              | string                               | REQUIRED                 | 03100500                      | ART 01                   | 03100500            | ART 01                        |
| Courses                        | levelCharacteristics                 | TRUE               | courseLevelCharacteristic[]          | REQUIRED                 |                               |                          |                     |                               |
| courseLevelCharacteristics     | courseLevelCharacteristicDescriptor  | FALSE              | courseLevelCharacteristicDescriptor  | REQUIRED                 | Core Subject                  | Core Subject             | Core Subject        | Basic                         |
| Courses                        | courseTitle                          | FALSE              | string                               | REQUIRED                 | Algebra I                     | Art, Grade 1             | Algebra II          | Art, Grade 1                  |
| Courses                        | educationOrganizationReference       | FALSE              | educationOrganizationReference       | REQUIRED                 |                               |                          |                     |                               |
| educationOrganizationReference | educationOrganizationId              | FALSE              | int                                  | REQUIRED                 | 255901                        | 255901                   | 255901              | 255901                        |
| Courses                        | numberOfParts                        | FALSE              | int                                  | REQUIRED                 | 1                             | 1                        | 1                   | 1                             |
| Courses                        | maxCompletionsForCredit              | FALSE              | int                                  | CONDITIONAL              | 3                             |                          | 3                   |                               |
