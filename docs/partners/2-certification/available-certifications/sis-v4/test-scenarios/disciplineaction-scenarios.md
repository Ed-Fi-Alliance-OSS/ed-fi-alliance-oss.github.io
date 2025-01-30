---
hide_table_of_contents: true
---

# v4 Student Discipline > DisciplineAction Scenarios

This interchange defines discipline incidents and discipline actions.

DisciplineAction: This event entity represents actions taken by an education
organization after a disruptive event that is recorded as a
discipline incident..

## Prerequisites

* Student
* Staff
* Enrollment
* Discipline Incident

## Scenarios

1. Create a Discipline Action for an elementary school student's discipline
   incident.
2. Create a Discipline Action for a high school student's discipline incident.
3. Modify the elementary student's Action from "Out of School Suspension" to "In
   School Suspension".
4. Modify the high school student's Action from "In School Suspension" to
   "Community Service".
5. Delete the Discipline Action for the elementary school student.

| Resource                                              | Property Name                                 | Is Collection | Data Type                                     | Required | Scenario 1: POST                  | Scenario 2: POST                  | Scenario 3: PUT                   | Scenario 4: PUT                   |
| ----------------------------------------------------- | --------------------------------------------- | ------------- | --------------------------------------------- | -------- | --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| DisciplineActions                                     | disciplineActionIdentifier                    | FALSE         | nvarchar                                      | REQUIRED | 11                                | 22                                | 11                                | 22                                |
| DisciplineActions                                     | disciplines                                   | TRUE          | disciplineActionDiscipline[]                  | REQUIRED |                                   |                                   |                                   |                                   |
| disciplineActionDisciplines                           | disciplineDescriptor                          | FALSE         | disciplineDescriptor                          | REQUIRED | Out of School Suspension          | In School Suspension              | In School Suspension              | Community Service                 |
| DisciplineActions                                     | disciplineDate                                | FALSE         | date                                          | REQUIRED | 9/30/<br/>[Current School Year]   | 9/30/<br/>[Current School Year]   | 9/30/<br/>[Current School Year]   | 9/30/<br/>[Current School Year]   |
| DisciplineActions                                     | studentReference                              | FALSE         | integer                                       | REQUIRED |                                   |                                   |                                   |                                   |
| studentReference                                      | studentUniqueId                               | FALSE         | string                                        | REQUIRED | 111111                            | 222222                            | 111111                            | 222222                            |
| DisciplineActions                                     | actualDisciplineActionLength                  | FALSE         | number                                        | REQUIRED | 2                                 | 5                                 | 2                                 | 5                                 |
| DisciplineActions                                     | assignmentSchoolReference                     | FALSE         | schoolReference                                | OPTIONAL |                                   |                                   |                                   |                                   |
| assignmentSchoolReference                             | schoolId                                      | FALSE         | integer                                       | OPTIONAL |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | disciplineActionLength                        | FALSE         | number                                        | OPTIONAL |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | disciplineActionLengthDifferenceReasonDescriptor | FALSE      | disciplineActionLengthDifferenceReasonDescriptor | OPTIONAL |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | relatedToZeroTolerancePolicy                  | FALSE         | boolean                                       | OPTIONAL |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | studentDisciplineIncidentAssociations         | TRUE          | studentDisciplineIncidentAssociation[]        | REQUIRED |                                   |                                   |                                   |                                   |
| disciplineActionStudentDisciplineIncidentAssociations | studentDisciplineIncidentAssociationReference | FALSE         | studentDisciplineIncidentAssociationReference | REQUIRED |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | responsibilitySchoolReference                 | FALSE         | responsibilitySchoolReference                 | REQUIRED |                                   |                                   |                                   |                                   |
| responsibilityschoolReference                         | schoolId                                      | FALSE         | integer                                       | REQUIRED | 255901107                         | 255901001                         | 255901107                         | 255901001                         |
| DisciplineActions                                     | staffs                                        | TRUE          | disciplineActionStaff[]                       | OPTIONAL |                                   |                                   |                                   |                                   |
| disciplineActionStaffs                                | staffReference                                 | FALSE         | integer                                       | OPTIONAL |                                   |                                   |                                   |                                   |
| staffReference                                        | staffUniqueId                                 | FALSE         | string                                        | OPTIONAL |                                   |                                   |                                   |                                   |
| DisciplineActions                                     | iepPlacementMeetingIndicator                  | TRUE          | boolean                                       | REQUIRED | TRUE                              |                                   | TRUE                              |                                   |
