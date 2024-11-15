---
hide_table_of_contents: true
---

# v5 StudentGrade > Grade Scenarios

The Student Grade interchange defines grades for a grading period or group of
grading periods. Grades are defined for groups of grading periods in the case
where the grade is cumulative over a semester or academic year (also referred to
as "final grades").

Grade: This educational entity represents an overall score or assessment tied to
a course over a period of time (i.e., the grading period).  Student grades are
usually a compilation of marks and other scores.

## Prerequisites

* Student
* Student Enrollment
* Section
* StudentSectionAssociation
* GradingPeriod

## Scenarios

1. Create a Grade for the First Six Weeks Grading Period for an elementary
   school student.
2. Create a Grade for the First Six Weeks Grading Period for a high school
   student.
3. Update the Numeric Grade Earned and/or Letter Grade Earned for Grading
   Period.
4. Update the Numeric Grade Earned and/or Letter Grade Earned for Grading
   Period.
5. Delete the grade for the elementary school student for the First Six Weeks
   Grading Period.

### Additional Requirements for Grades Earned

* If both numeric and letter grades are recorded by the SIS, both are REQUIRED
  for certification.
* If only the numeric grade or letter grade is recorded by the SIS, then only
  one SHALL be provided for certification.

| Resource                           | Property Name                      | Is Collection | Data Type                          | Required | Scenario 1 POST                                  | Scenario 2 POST                         | Scenario 3 PUT                                    | Scenario 4 PUT                          |
| ---------------------------------- | ---------------------------------- | ------------- | ---------------------------------- | -------- | ------------------------------------------------ | --------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| Grades                             | gradeTypeDescriptor                | FALSE         | gradeTypeDescriptor                | REQUIRED | Grading Period                                   | Grading Period                          | Grading Period                                    | Grading Period                          |
| Grades                             | letterGradeEarned                  | FALSE         | string                             | REQUIRED | B                                                | A                                       | A                                                 | B                                       |
| Grades                             | numericGradeEarned                 | FALSE         | string                             | REQUIRED | 80                                               | 94                                      | 91                                                | 89                                      |
| Grades                             | gradingPeriodReference             | FALSE         | gradingPeriodReference             | REQUIRED |                                                  |                                         |                                                   |                                         |
| gradingPeriodReference             | schoolId                           | FALSE         | integer                            | REQUIRED | 255901107                                        | 255901001                               | 255901107                                         | 255901001                               |
| gradingPeriodReference             | gradingPeriodDescriptor            | FALSE         | gradingPeriodDescriptor            | REQUIRED | First Six Weeks                                  | First Six Weeks                         | First Six Weeks                                   | First Six Weeks                         |
| gradingPeriodReference             | periodSequence                     | FALSE         | integer                            | REQUIRED | 1                                                | 1                                       | 1                                                 | 1                                       |
| gradingPeriodReference             | schoolYear                         | FALSE         | integer                            | REQUIRED | [Current School Year]                            | [Current School Year]                   | [Current School Year]                             | [Current School Year]                   |
| Grades                             | StudentSectionAssociationReference | FALSE         | studentSectionAssociationReference | REQUIRED |                                                  |                                         |                                                   |                                         |
| studentSectionAssociationReference | beginDate                          | FALSE         | date                               | REQUIRED | 8/23/[Current School Year]                       | 8/23/[Current School Year]              | 8/23/[Current School Year]                        | 8/23/<br/>[Current School Year]         |
| studentSectionAssociationReference | localCourseCode                    | FALSE         | string                             | REQUIRED | \["ELA-01" if possible \| system value\]         | \["ALG-2" if possible \| system value\] | \["ELA-01" if possible<br/><br/>\| system value\] | \["ALG-2" if possible \| system value\] |
| studentSectionAssociationReference | schoolId                           | FALSE         | integer                            | REQUIRED | 255901107                                        | 255901001                               | 255901107                                         | 255901001                               |
| studentSectionAssociationReference | schoolYear                         | FALSE         | integer                            | REQUIRED | [Current School Year]                            | [Current School Year]                   | [Current School Year]                             | [Current School Year]                   |
| studentSectionAssociationReference | studentUniqueId                    | FALSE         | string                             | REQUIRED | 111111                                           | 222222                                  | 111111                                            | 222222                                  |
| studentSectionAssociationReference | sessionName                        | FALSE         | string                             | REQUIRED | 2016-2017 Fall Semester                          | 2016-2017 Fall Semester                 | 2016-2017 Fall Semester                           | 2016-2017 Fall Semester                 |
| studentSectionAssociationReference | sectionIdentifier                  | FALSE         | string                             | REQUIRED | \["ELA012017RM555" if possible \| system value\] | ALG12017RM901                           | \["ELA012017RM555" if possible \| system value\]  | ALG12017RM901                           |
