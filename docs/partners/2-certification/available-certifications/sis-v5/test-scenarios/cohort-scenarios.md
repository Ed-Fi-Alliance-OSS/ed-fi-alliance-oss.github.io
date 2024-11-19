---
hide_table_of_contents: true
---

# v5 StudentCohort > Cohort Scenarios

Cohorts are used to designate groups of students outside of class Student
Information Systems, enrollment lists, or extra curricular participation. The
Student Cohort Interchange describes student cohort information. It can be used
to exchange information regarding any named group of students, or cohort, for
tracking, analysis, or intervention.

Cohort: This entity represents any type of list of designated students for
tracking, analysis or intervention.

## Prerequisites

* None

## Scenarios

1. Create Cohort 1.
2. Create Cohort 2.
3. Update Cohort type for Cohort 1.
4. Update Cohort type for Cohort 2.

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required | Scenario 1: POST                    | Scenario 2: POST                    | Scenario 3: PUT                     | Scenario 4: PUT                     |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | -------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| Cohorts                        | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED |                                     |                                     |                                     |                                     |
| educationOrganizationReference | educationOrganizationId        | FALSE         | integer                        | REQUIRED | 255901107                           | 255901001                           | 255901107                           | 255901001                           |
| Cohorts                        | cohortIdentifier               | FALSE         | string                         | REQUIRED | \["1" if possible \| system value\] | \["2" if possible \| system value\] | \["1" if possible \| system value\] | \["2" if possible \| system value\] |
| Cohorts                        | cohortTypeDescriptor           | FALSE         | cohortTypeDescriptor           | REQUIRED | Study Hall                          | Study Hall                          | Field Trip                          | Extracurricular Activity            |
| Cohorts                        | cohortDescription              | FALSE         | cohortDescription              | REQUIRED | Cohort 1 Description                | Cohort 2 Description                | Cohort 1 Description                | Cohort 2 Description                |
| Cohorts                        | cohortScopeDescriptor          | FALSE         | cohortScopeDescriptor          | REQUIRED | District                            | District                            | District                            | District                            |
