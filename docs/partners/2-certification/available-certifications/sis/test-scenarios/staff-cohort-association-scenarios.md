# v5 StudentCohort > StaffCohortAssociation Scenarios

Cohorts are used to designate groups of students outside of class Student
Information Systems, enrollment lists, or extra curricular participation. The
Student Cohort Interchange describes student cohort information. It can be used
to exchange information regarding any named group of students, or cohort, for
tracking, analysis, or intervention.

StaffCohortAssociation: This association indicates the staff associated with a
cohort of students.

### Prerequisites

* Staff
* Cohort

### Scenarios

1. Create a staff cohort association for an elementary school staff member.
2. Create a staff cohort association for a high school staff member.
3. Add an End date for staff cohort association 1.
4. Add an End date for staff cohort association 2.
5. Delete the staff cohort association for the elementary school staff member.

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StaffCohortAssociations | cohortReference | FALSE | cohortReference | REQUIRED |     |     |     |     |
| cohortReference | educationOrganizationId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| cohortReference | cohortIdentifier | FALSE | string | REQUIRED | \["1" if possible<br/><br/>\| system value\] | \["2" if possible<br/><br/>\| system value\] | \["1" if possible<br/><br/>\| system value\] | \["2" if possible<br/><br/>\| system value\] |
| StaffCohortAssociations | beginDate | FALSE | date | REQUIRED | 9/14/<br/><br/>\[Current School Year\] | 9/14/<br/><br/>\[Current School Year\] | 9/14/<br/><br/>\[Current School Year\] | 9/14//<br/><br/>\[Current School Year\] |
| StaffCohortAssociations | endDate | FALSE | date | REQUIRED |     |     | 12/20/<br/><br/>\[Current School Year\] | 12/20/<br/><br/>\[Current School Year\] |
| StaffCohortAssociations | staffReference | FALSE | integer | REQUIRED |     |     |     |     |
| staffReference | staffUniqueId | FALSE | string | REQUIRED | \["207220"  if possible<br/><br/>\| system value\] | \["207269"  if possible<br/><br/>\| system value\] | \["207220"  if possible<br/><br/>\| system value\] | \["207269"  if possible<br/><br/>\| system value\] |
