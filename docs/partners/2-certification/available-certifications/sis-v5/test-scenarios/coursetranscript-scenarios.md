---
hide_table_of_contents: true
---

# v5 Student Transcript > CourseTranscript Scenarios

This interchange defines transcript information for a course and student
academic records for a given session. Course transcripts link to the student
academic record for the session in which the course was taken. Course Transcript
is the final record of a student's performance in their courses at the end of a
semester or school year.

## Prerequisites

* Course

* Student

* Enrollment

## Scenarios

1. Create a Course Transcript Record for Fall Semester of Current School Year for a student at Grand Bend High School.
2. Update the finalNumericGradeEarned on the high school Student's record.
3. Create a Course Transcript Record for Spring Semester from 5 years ago for the same student at Grand Bend High School. 

### Additional Requirements for Final Grades Earned

* If both numeric and letter grades are recorded by the SIS, both are REQUIRED
  for certification.
* If only the numeric grade or letter grade is recorded by the SIS, then only
  one SHALL be provided for certification.

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required | Scenario 1: POST        | Scenario 2 <br/>PUT     | Scenario 3: POST        |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | -------- | ----------------------- | ----------------------- | ----------------------- |
| CourseTranscripts              | courseReference                | FALSE         | courseReference                | REQUIRED |                         |                         |                         |
| courseReference                | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901001               | 255901001               | 255901001               |
| courseReference                | courseCode                     | FALSE         | string                         | REQUIRED | ALG-01                  | ALG-01                  | [System Value]          |
| CourseTranscripts              | studentAcademicRecordReference | FALSE         | studentAcademicRecordReference | REQUIRED |                         |                         |                         |
| studentAcademicRecordReference | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901001               | 255901001               | 255901001               |
| studentAcademicRecordReference | schoolYear                     | FALSE         | integer                        | REQUIRED | \[Current School Year\] | \[Current School Year\] | \[Five years prior to current school year\] |
| studentAcademicRecordReference | studentUniqueId                | FALSE         | string                         | REQUIRED | 222222                  | 222222                  | 222222                  |
| studentAcademicRecordReference | termDescriptor                 | FALSE         | string                         | REQUIRED | Fall Semester           | Fall Semester           | Spring Semester         |
| CourseTranscripts              | courseAttemptResultDescriptor  | FALSE         | courseAttemptResultDescriptor  | REQUIRED | Pass                    | Pass                    | Pass                    |
| CourseTranscripts              | attemptedCredits               | FALSE         | number                         | REQUIRED | 3                       | 3                       | 3                       |
| CourseTranscripts              | earnedCredits                  | FALSE         | number                         | REQUIRED | 3                       | 3                       | 3                       |
| CourseTranscripts              | finalLetterGradeEarned         | FALSE         | string                         | REQUIRED | A                       | A                       | A                       |
| CourseTranscripts              | finalNumericGradeEarned        | FALSE         | string                         | REQUIRED | 98                      | 100                     | 92                      |
