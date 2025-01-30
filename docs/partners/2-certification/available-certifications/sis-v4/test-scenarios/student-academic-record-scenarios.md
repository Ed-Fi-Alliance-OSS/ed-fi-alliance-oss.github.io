---
hide_table_of_contents: true
---

# v4 Student Transcript > StudentAcademicRecord Scenarios

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
| StudentAcademicRecords         | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901107                        | 255901001                          | 255901001                                     |
| StudentAcademicRecords         | schoolYearTypeReference        | FALSE         | schoolYearTypeReference        | REQUIRED |                                  |                                    |                                               |
| StudentAcademicRecords         | schoolYear                     | FALSE         | integer                        | REQUIRED | [School year five years ago]     | [School year five years ago]      | [Current School Year]                       |
| StudentAcademicRecords         | studentReference               | FALSE         | studentReference               | REQUIRED |                                  |                                    |                                               |
| StudentAcademicRecords         | studentUniqueId                | FALSE         | string                         | REQUIRED | 111111                           | 222222                             | 222222                                        |
| StudentAcademicRecords         | termDescriptor                 | FALSE         | string                         | REQUIRED | Fall Semester                    | Fall Semester                      | Fall Semester                                 |
| StudentAcademicRecords         | cumulativeAttemptedCredits     | FALSE         | decimal                        | REQUIRED | [System calculated value | 0]   | [System calculated value | 40]          | [Previous system calculated value + 3 | 43] |
| StudentAcademicRecords         | cumulativeEarnedCredits        | FALSE         | decimal                        | REQUIRED | [System calculated value | 0]   | [System calculated value | 38]          | [Previous system calculated value + 3 | 41] |
| StudentAcademicRecords         | cumulativeGradePointAverage    | FALSE         | decimal                        | REQUIRED |                                  | [System calculated value | 3.0]   | [System calculated value | 3.0]            |
| StudentAcademicRecords         | sessionAttemptedCredits        | FALSE         | decimal                        | REQUIRED |                                  | [System calculated value | 3]     | [Previous system calculated value + 3 | 6]  |
| StudentAcademicRecords         | sessionEarnedCredits           | FALSE         | decimal                        | REQUIRED |                                  | [System calculated value | 3]     | [Previous system calculated value + 3 | 6]  |
| graduationPlans                | educationOrganizationId        | FALSE         | integer                        | REQUIRED |                                  | 255901001                          |                                               |
| graduationPlans                | graduationSchoolYear           | FALSE         | integer                        | REQUIRED |                                  | [Current or future school year]   |                                               |
| graduationPlans                | graduationPlanTypeDescriptor   | FALSE         | graduationPlanTypeDescriptor   | REQUIRED |                                  | Recommended                        |                                               |
| StudentAcademicRecords         | sessionEarnedCreditTypeDescriptor | FALSE      | sessionEarnedCreditTypeDescriptor | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | sessionGradePointAverage       | FALSE         | decimal                        | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | sessionGradePointsEarned       | FALSE         | decimal                        | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | reportCards                    | TRUE          | studentAcademicRecordReportCard[] | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | gradingPeriodSchoolId          | FALSE         | integer                        | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | gradingPeriodSchoolYear        | FALSE         | integer                        | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | gradingPeriodSequence          | FALSE         | integer                        | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | studentUniqueId                | FALSE         | string                         | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | gradingPeriodDescriptor        | FALSE         | gradingPeriodDescriptor        | OPTIONAL |                                  |                                    |                                               |
| reportCardReference            | educationOrganizationId        | FALSE         | integer                        | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | academicHonors                 | TRUE          | studentAcademicRecordAcademicHonor[] | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | academicHonorCategoryDescriptor | FALSE     | academicHonorCategoryDescriptor | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | achievementCategoryDescriptor | FALSE      | achievementCategoryDescriptor  | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | achievementCategorySystem     | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | achievementTitle              | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | criteria                      | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | criteriaURL                   | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | evidenceStatement             | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | honorAwardDate                | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | honorAwardExpiresDate         | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | honorDescription              | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | imageURL                      | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | issuerName                    | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordAcademicHonors | issuerOriginURL               | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | classRanking                   | FALSE         | studentAcademicRecordClassRanking | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordClassRankings | classRank                     | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordClassRankings | totalNumberInClass            | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordClassRankings | classRankingDate              | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordClassRankings | percentageRanking              | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | diplomas                       | TRUE          | studentAcademicRecordDiploma[] | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | achievementCategoryDescriptor   | FALSE      | achievementCategoryDescriptor  | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | diplomaAwardDate               | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | diplomaTypeDescriptor          | FALSE      | diplomaTypeDescriptor          | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | achievementCategorySystem      | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | achievementTitle               | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | criteria                       | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | criteriaURL                    | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | cteCompleter                  | FALSE         | boolean                        | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | diplomaAwardExpiresDate        | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | diplomaDescription             | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | diplomaLevelDescriptor         | FALSE      | diplomaLevelDescriptor         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | evidenceStatement              | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | imageURL                       | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | issuerName                     | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordDiplomas  | issuerOriginURL                | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | recognitions                   | TRUE          | studentAcademicRecordRecognition[] | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | achievementCategoryDescriptor  | FALSE      | achievementCategoryDescriptor  | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | recognitionTypeDescriptor      | FALSE      | recognitionTypeDescriptor      | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | achievementCategorySystem      | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | achievementTitle               | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | criteria                       | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | criteriaURL                    | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | evidenceStatement              | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | imageURL                       | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | issuerName                     | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | issuerOriginURL                | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | recognitionAwardDate           | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | recognitionAwardExpiresDate    | FALSE      | date                           | OPTIONAL |                                  |                                    |                                               |
| studentAcademicRecordRecognitions | recognitionDescription          | FALSE      | string                         | OPTIONAL |                                  |                                    |                                               |
| StudentAcademicRecords         | gradePointAverages             | TRUE          | gradePointAverages[]           | OPTIONAL |                                  |                                    |                                               |
| gradePointAverages             | gradePointAverageTypeDescriptor | FALSE         | gradePointAverageTypeDescriptor | OPTIONAL |                                  |                                    |                                               |
| gradePointAverages             | gradePointAverageValue         | FALSE         | decimal                        | OPTIONAL |                                  |                                    |                                               |
| gradePointAverages             | isCumulative                   | FALSE         | boolean                        | OPTIONAL |                                  |                                    |                                               |
| gradePointAverages             | maxGradePointAverageValue      | FALSE         | decimal                        | OPTIONAL |                                  |                                    |                                               |
