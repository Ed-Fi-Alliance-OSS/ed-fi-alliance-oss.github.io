---
hide_table_of_contents: true
---

# v5 Education Organization Calendar > Sessions Scenarios

The Education Organization Calendar interchange carries school calendar
information. It can be used to exchange school calendar data, including
instructional days, sessions, and grading periods.

The Session entity represents the prescribed span of time when an education
institution is open, instruction is provided and students are under the
direction and guidance of teachers and/or education institution administration.
A session may be interrupted by one or more vacations.

## Prerequisites

* School
* GradingPeriod

## Scenarios

1. Create a Fall Semester Session which references the first and second six
   week grading periods for Grand Bend Elementary School

2. Create a Fall Semester Session which references the first and second six
   week grading periods for Grand Bend High School

3. Update the End Date and totalInstructionalDays on the newly added Session
    for Grand Bend Elementary School

4. Update the End Date and totalInstructionalDays on the newly added Session
    for Grand Bend High School

| Resource                | Property Name           | Is Collection | Data Type                | Required | Scenario 1 POST                                                                                                       | Scenario 2 POST                   | Scenario 3 PUT                                 | Scenario 4 PUT                                 |
| ----------------------- | ----------------------- | ------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Sessions                | schoolReference         | FA:SE         | schoolReference          | REQUIRED |                                                                                                                       |                                   |                                                |                                                |
| schoolReference         | schoolId                | FALSE         | Integer                  | REQUIRED | 255901107                                                                                                             | 255901001                         | 255901107                                      | 255901001                                      |
| Sessions                | schoolYearTypeReference | FALSE         | schoolYearTypeReference  | REQUIRED |                                                                                                                       |                                   |                                                |                                                |
| schoolYearTypeReference | schoolYear              | FALSE         | Integer                  | REQUIRED | \[Current School Year\]                                                                                               | \[Current School Year\]           | \[Current School Year\]                        | \[Current School Year\]                        |
| Sessions                | termDescriptor          | FALSE         | termDescriptor           | REQUIRED | Fall Semester                                                                                                         | Fall Semester                     | Fall Semester                                  | Fall Semester                                  |
| Sessions                | sessionName             | FALSE         | string                   | REQUIRED | 2016-2017 Fall Semester                                                                                               | 2016-2017 Fall Semester           | 2016-2017 Fall Semester                        | 2016-2017 Fall Semester                        |
| Sessions                | beginDate               | FALSE         | date                     | REQUIRED | \[Current School Year\]-08-23                                                                                         | \[Current School Year\]-08-23     | \[Current School Year\]-08-23                  | \[Current School Year\]-08-23                  |
| Sessions                | endDate                 | FALSE         | date                     | REQUIRED | \[Current School Year\]-12-15                                                                                         | \[Current School Year\]-12-15     | \[Current School Year\]-12-16                  | \[Current School Year\]-12-16                  |
| Sessions                | totalInstructionalDays  | FALSE         | Integer                  | REQUIRED | \[System calculated value \| 88\]                                                                                     | \[System calculated value \| 88\] | \[Previous system calculated value + 1 \| 89\] | \[Previous system calculated value + 1 \| 89\] |
| Sessions                | gradingPeriods          | TRUE          | sessionGradingPeriod\[\] | REQUIRED | See GradingPeriodReference elements below - note there are 2 grading period references for the Fall Semester Session. |                                   |                                                |                                                |
| sessionGradingPeriods   | gradingPeriodReference  | FALSE         | gradingPeriodReference   | REQUIRED |                                                                                                                       |                                   |                                                |                                                |
| gradingPeriodReference  | schoolId                | FALSE         | integer                  | REQUIRED | 255901107                                                                                                             | 255901001                         | 255901107                                      | 255901001                                      |
| gradingPeriodReference  | gradingPeriodDescriptor | FALSE         | gradingPeriodDescriptor  | REQUIRED | First Six Weeks                                                                                                       | First Six Weeks                   | First Six Weeks                                | First Six Weeks                                |
| gradingPeriodReference  | periodSequence          | FALSE         | integer                  | REQUIRED | 1                                                                                                                     | 1                                 | 1                                              | 1                                              |
| gradingPeriodReference  | schoolYear              | FALSE         | Integer                  | REQUIRED | \[Current School Year\]                                                                                               | \[Current School Year\]           | \[Current School Year\]                        | \[Current School Year\]                        |
| gradingPeriodReference  | schoolId                | FALSE         | integer                  | REQUIRED | 255901107                                                                                                             | 255901001                         | 255901107                                      | 255901001                                      |
| gradingPeriodReference  | gradingPeriodDescriptor | FALSE         | gradingPeriodDescriptor  | REQUIRED | Second Six Weeks                                                                                                      | Second Six Weeks                  | Second Six Weeks                               | Second Six Weeks                               |
| gradingPeriodReference  | periodSequence          | FALSE         | integer                  | REQUIRED | 2                                                                                                                     | 2                                 | 2                                              | 2                                              |
| gradingPeriodReference  | schoolYear              | FALSE         | Integer                  | REQUIRED | \[Current School Year\]                                                                                               | \[Current School Year\]           | \[Current School Year\]                        | \[Current School Year\]                        |
