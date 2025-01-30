---
hide_table_of_contents: true
---

# v4 Student Enrollment > Graduation Plan Scenarios

The Student Enrollment interchange describes student enrollments in schools and
in sections.

The Graduation Plan entity is a plan outlining the required credits, credits by
subject, credits by course, and other criteria required for graduation. A
graduation plan may be one or more standard plans defined by an education
organization and/or individual plans for some or all students.

## Prerequisites

* None

## Scenarios

1. Create a Graduation Plan with 28 required credits for Grand Bend High School.
2. Create a Graduation Plan with 26 required credits for Grand Bend High School.
3. Update the "Recommended" Graduation Plan with 30 required credits for Grand
   Bend High School.
4. Update the "Minimum" Graduation Plan with 24 required credits for Grand Bend
   High School.

| Resource                       | Property Name                     | Is Collection | Data Type                         | Required | Scenario 1: POST | Scenario 2: POST | Scenario 3: PUT | Scenario 4: PUT |
| ------------------------------ | --------------------------------- | ------------- | --------------------------------- | -------- | ---------------- | ---------------- | --------------- | --------------- |
| GraduationPlans                | educationOrganizationReference    | FALSE         | educationOrganizationReference    | REQUIRED |                  |                  |                 |                 |
| educationOrganizationReference | educationOrganizationId           | FALSE         | integer                           | REQUIRED | 255901001        | 255901001        | 255901001       | 255901001       |
| GraduationPlans                | graduationSchoolYearTypeReference | FALSE         | graduationSchoolYearTypeReference | REQUIRED |                  |                  |                 |                 |
| schoolYearTypeReference        | schoolYear                        | FALSE         | integer                           | REQUIRED | 2020             | 2020             | 2020            | 2020            |
| GraduationPlans                | totalRequiredCredits              | FALSE         | number                            | REQUIRED | 28               | 26               | 30              | 24              |
| GraduationPlans                | graduationPlanTypeDescriptor      | FALSE         | graduationPlanTypeDescriptor      | REQUIRED | Recommended      | Minimum          | Recommended     | Minimum         |
| GraduationPlans                | individualPlan                    | FALSE         | boolean                           | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | totalRequiredCreditConversion      | FALSE         | decimal                           | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | totalRequiredCreditTypeDescriptor  | FALSE         | totalRequiredCreditTypeDescriptor | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | creditsByCourses                  | TRUE          | graduationPlanCreditsByCourse[]   | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | courseSetName                     | FALSE         | string                            | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | credits                            | FALSE         | decimal                           | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | creditConversion                   | FALSE         | decimal                           | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | creditTypeDescriptor               | FALSE         | creditTypeDescriptor              | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | whenTakenGradeLevelDescriptor      | FALSE         | whenTakenGradeLevelDescriptor     | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | creditsBySubjects                 | TRUE          | graduationPlanCreditsBySubject[]  | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsBySubjects | academicSubjectDescriptor          | FALSE         | academicSubjectDescriptor         | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsBySubjects | credits                            | FALSE         | number                            | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsBySubjects | creditConversion                   | FALSE         | number                            | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsBySubjects | creditTypeDescriptor               | FALSE         | creditTypeDescriptor              | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsBySubjects | courses                            | TRUE          | graduationPlanCreditsByCourseCourse[] | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanCreditsByCourses | courseReference                    | FALSE         | nvarchar                          | OPTIONAL  |                  |                  |                 |                 |
| courseReference                | code                               | FALSE         | string                            | OPTIONAL  |                  |                  |                 |                 |
| courseReference                | educationOrganizationId            | FALSE         | string                            | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | requiredAssessments                | TRUE          | graduationPlanRequiredAssessment[] | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessments | assessmentReference              | FALSE         | assessmentReference               | OPTIONAL  |                  |                  |                 |                 |
| assessmentReference            | academicSubjectDescriptor          | FALSE         | academicSubjectDescriptor         | OPTIONAL  |                  |                  |                 |                 |
| assessmentReference            | assessedGradeLevelDescriptor       | FALSE         | assessedGradeLevelDescriptor      | OPTIONAL  |                  |                  |                 |                 |
| assessmentReference            | title                              | FALSE         | string                            | OPTIONAL  |                  |                  |                 |                 |
| assessmentReference            | version                            | FALSE         | integer                           | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessments | performanceLevels                | FALSE         | graduationPlanRequiredAssessmentAssessmentPerformanceLevel | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentPerformanceLevels | assessmentReportingMethodDescriptor | FALSE | assessmentReportingMethodDescriptor | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentPerformanceLevels | performanceLevelDescriptor | FALSE | performanceLevelDescriptor       | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentPerformanceLevels | maximumScore | FALSE | string | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentPerformanceLevels | minimumScore | FALSE | string | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentPerformanceLevels | resultDatatypeTypeDescriptor | FALSE | resultDatatypeTypeDescriptor | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessments | scores                          | TRUE          | graduationPlanRequiredAssessmentScore[] | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentScores | assessmentReportingMethodDescriptor | FALSE | assessmentReportingMethodDescriptor | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentScores | maximumScore | FALSE | string | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentScores | minimumScore | FALSE | string | OPTIONAL  |                  |                  |                 |                 |
| graduationPlanRequiredAssessmentScores | resultDatatypeTypeDescriptor | FALSE | resultDatatypeTypeDescriptor | OPTIONAL  |                  |                  |                 |                 |
| GraduationPlans                | creditsByCreditCategory           | TRUE          | creditsByCreditCategory[]        | OPTIONAL  |                  |                  |                 |                 |
| creditsByCreditCategory        | creditCategoryDescriptor           | FALSE         | creditCategoryDescriptor         | OPTIONAL  |                  |                  |                 |                 |
| creditsByCreditCategory        | credits                            | FALSE         | credits[]                        | OPTIONAL  |                  |                  |                 |                 |
| credits                        | creditConversion                   | FALSE         | decimal                           | OPTIONAL  |                  |                  |                 |                 |
| credits                        | creditTypeDescriptor               | FALSE         | creditTypeDescriptor              | OPTIONAL  |                  |                  |                 |                 |
| credits                        | credits                            | FALSE         | number                            | OPTIONAL  |                  |                  |                 |                 |
