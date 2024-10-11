# v5 Education Organization Calendar > Grading Periods Scenarios

The Education Organization Calendar interchange carries school calendar
information. It can be used to exchange school calendar data,
including instructional days, sessions, and grading periods.

This entity represents the time span for which grades are reported.

## Prerequisites

* None

## Scenarios

1. Create a "First Six Weeks" Grading Period for Grand Bend Elementary School
2. Create a "Second Six Weeks" Grading Period for Grand Bend Elementary School
3. Create a "First Six Weeks" Grading Period for Grand Bend High School
4. Create a "Second Six Weeks" Grading Period for Grand Bend High School
5. Update the endDate and totalInstructionalDays on the newly added Grading
   Period for Grand Bend Elementary School
6. Update the endDate and totalInstructionalDays on the newly added Grading
   Period for Grand Bend High School

| **Resource**            | **Property Name**       | **Is Collection** | **Data Type**           | **Required / Optional** | **Scenario 1: POST**         | Scenario 2: POST             | **Scenario 3 <br/>POST**         | **Scenario 4 <br/>POST**         | **Scenario 5 <br/>PUT**                  | **Scenario 6 <br/>PUT**                  |
| ----------------------- | ----------------------- | ----------------- | ----------------------- | ----------------------- | -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- | ---------------------------------------- | ---------------------------------------- | ----------------------------- | --- | ---------------------------------------------- | --- | ---------------------------------------------- | --- |
| GradingPeriods          | schoolReference         | FALSE             | schoolReference         | REQUIRED                |                                  |                                  |                                  |                                  |                                          |                                          |
| schoolReference         | schoolId                | FALSE             | integer                 | REQUIRED                | 255901107                        | 255901107                        | 255901001                        | 255901001                        | 255901107                                | 255901001                                |
| GradingPeriods          | schoolYearTypeReference | FALSE             | schoolYearTypeReference | REQUIRED                |                                  |                                  |                                  |                                  |                                          |                                          |
| schoolYearTypeReference | schoolYear              | FALSE             | integer                 | REQUIRED                | [current school year]            | [current school year]            | [current school year]            | [current school year]            | [current school year]                    | [current school year]                    |
| GradingPeriods          | beginDate               | FALSE             | date                    | REQUIRED                | 08/23/<br/>[Current School Year] | 10/06/<br/>[Current School Year] | 08/23/<br/>[Current School Year] | 10/06/<br/>[Current School Year] | 08/23/<br/>[Current School Year]         | 08/23/<br/>[Current School Year]         |
| GradingPeriods          | gradingPeriodDescriptor | FALSE             | gradingPeriodDescriptor | REQUIRED                | First Six Weeks                  | Second Six Weeks                 | First Six Weeks                  | Second Six Weeks                 | First Six Weeks                          | First Six Weeks                          |
| GradingPeriods          | endDate                 | FALSE             | date                    | REQUIRED                | 10/04/<br/>[Current School Year] | 12/15/<br/>[Current School Year] | 10/04/<br/>[Current School Year] | 12/15/<br/>[Current School Year] | **10/05/**<br/>**[Current School Year]** | **10/05/**<br/>**[Current School Year]** |
| GradingPeriods          | totalInstructionalDays  | FALSE             | Integer                 | REQUIRED                | [System calculated value<br/>    | 29]                              | [System calculated value<br/>    | 30]                              | [System calculated value<br/>            | 29]                                      | [System calculated value<br/> | 30] | [Previous system<br/>calculated value + 1<br/> | 30] | [Previous system<br/>calculated value + 1<br/> | 30] |
| GradingPeriods          | periodSequence          | FALSE             | Integer                 | REQUIRED                | 1                                | 2                                | 1                                | 2                                | 1                                        | 1                                        |
