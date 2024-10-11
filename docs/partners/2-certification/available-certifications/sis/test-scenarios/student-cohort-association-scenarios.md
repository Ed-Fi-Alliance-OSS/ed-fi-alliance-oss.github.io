# v5 StudentCohort > StudentCohortAssociation Scenarios

Cohorts are used to designate groups of students outside of class Student
Information Systems, enrollment lists, or extra curricular participation. The
Student Cohort Interchange describes student cohort information. It can be used
to exchange information regarding any named group of students, or cohort, for
tracking, analysis, or intervention.

StudentCohortAssociation: This association represents the cohort(s) for which a
student is designated.

### Prerequisites

- Cohort
- Student

### Scenarios

1. Create a student cohort association for an elementary school student.
2. Create a student cohort association for a high school student.
3. Add an end date to the student cohort association for an elementary student.

| Resource                  | Property Name           | Is Collection | Data Type        | Required / Optional | Scenario 1 <br/>POST                         | Scenario 2 <br/>POST                         | Scenario 3 <br/>PUT                            |
| ------------------------- | ----------------------- | ------------- | ---------------- | ------------------- | -------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| StudentCohortAssociations | cohortReference         | FALSE         | cohortReference  | REQUIRED            |                                              |                                              |                                                |
| cohortReference           | educationOrganizationId | FALSE         | integer          | REQUIRED            | 255901107                                    | 255901001                                    | 255901107                                      |
| cohortReference           | cohortIdentifier        | FALSE         | string           | REQUIRED            | \["1" if possible<br/><br/>\| system value\] | \["2" if possible<br/><br/>\| system value\] | \["1" if possible<br/><br/>\| system value\]   |
| StudentCohortAssociations | studentReference        | FALSE         | studentReference | REQUIRED            |                                              |                                              |                                                |
| studentReference          | studentUniqueId         | FALSE         | string           | REQUIRED            | 111111                                       | 222222                                       | 111111                                         |
| StudentCohortAssociations | beginDate               | FALSE         | date             | REQUIRED            | 9/14/<br/><br/>\[Current School Year\]       | 9/14/<br/><br/>\[Current School Year\]       | 9/14/<br/><br/>\[Current School Year\]         |
| StudentCohortAssociations | endDate                 | FALSE         | date             | REQUIRED            |                                              |                                              | **9/21/**<br/><br/>**\[Current School Year\]** |
