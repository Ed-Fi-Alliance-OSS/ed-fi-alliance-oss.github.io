---
hide_table_of_contents: true
---

# v5 Student Transcript > StudentAcademicRecord Scenarios

This interchange defines transcript information for a course and student
academic records for a given session. Course transcripts link to the student
academic record for the session in which the course was taken.

The Student Academic Record represents the cumulative record of academic
 achievement for a student.

## Prerequisites

* Student

* Enrollment

## Scenarios

1. Create a StudentAcademic Record for Fall Semester of School Year from five years
   ago for a student at Grand Bend Elementary School.
2. Create a StudentAcademic Record for Fall Semester of School Year from five years
   ago for a student at Grand Bend High School. This should be a course that appears on the student's graduation transcript. Add a graduation plan reference to the High School student's StudentSchoolAssociation.
3. Update the cumulativeAttemptedCredits, cumulativeEarnedCredits, sessionEarnedCredits
   and sessionAttemptedCredits on the high school Student's record.

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required | Scenario 1: POST                 | Scenario 2: POST                   | Scenario 3: PUT                               |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | -------- | -------------------------------- | ---------------------------------- | --------------------------------------------- |
| StudentAcademicRecords         | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED |                                  |                                    |                                               |
| educationOrganizationReference | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901107                        | 255901001                          | 255901001                                     |
| StudentAcademicRecords         | schoolYearTypeReference        | FALSE         | schoolYearTypeReference        | REQUIRED |                                  |                                    |                                               |
| schoolYearTypeReference        | schoolYear                     | FALSE         | integer                        | REQUIRED | \[Current School Year\]          | \[Current School Year\]            | \[Current School Year\]                       |
| StudentAcademicRecords         | studentReference               | FALSE         | studentReference               | REQUIRED |                                  |                                    |                                               |
| studentReference               | studentUniqueId                | FALSE         | string                         | REQUIRED | 111111                           | 222222                             | 222222                                        |
| StudentAcademicRecords         | termDescriptor                 | FALSE         | string                         | REQUIRED | Fall Semester                    | Fall Semester                      | Fall Semester                                 |
| StudentAcademicRecords         | cumulativeAttemptedCredits     | FALSE         | decimal                        | REQUIRED | \[System calculated value \| 0\] | \[System calculated value \| 40\]  | \[Previous systemcalculated value + 3 \| 43\] |
| StudentAcademicRecords         | cumulativeEarnedCredits        | FALSE         | decimal                        | REQUIRED | \[System calculated value \| 0\] | \[System calculated value \| 38\]  | \[Previous systemcalculated value + 3 \| 41\] |
| StudentAcademicRecords         | cumulativeGradePointAverage    | FALSE         | decimal                        | REQUIRED |                                  | \[System calculated value \| 3.0\] | \[System calculated value \| 3.0\]            |
| StudentAcademicRecords         | sessionAttemptedCredits        | FALSE         | decimal                        | REQUIRED |                                  | \[System calculated value \| 3\]   | \[Previous systemcalculated value + 3 \| 6\]  |
| StudentAcademicRecords         | sessionEarnedCredits           | FALSE         | decimal                        | REQUIRED |                                  | \[System calculated value \| 3\]   | \[Previous systemcalculated value + 3 \| 6\]  |
| graduationPlan        | educationOrganizationId        | FALSE         | integer                        | REQUIRED |                                  | 255901001                          |                                               |
| graduationPlan        | graduationSchoolYear           | FALSE         | integer                        | REQUIRED |                                  | \[Current of future school year\]  |                                               |
| graduationPlan       | graduationPlanTypeDescriptor   | FALSE         | graduationPlanTypeDescriptor   | REQUIRED |                                  | Recommended                        |                                               |
