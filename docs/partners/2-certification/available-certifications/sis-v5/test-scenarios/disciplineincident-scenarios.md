---
hide_table_of_contents: true
---

# v5 Student Discipline > DisciplineIncident Scenarios

This interchange defines discipline incidents and discipline actions.

DisciplineIncident: This event entity represents an occurrence of an infraction
ranging from a minor behavioral problem that disrupts the orderly functioning of
a school or classroom (such as tardiness) to a criminal act that results in the
involvement of a law enforcement official (such as robbery). A single event
(e.g., a fight) is one incident regardless of how many perpetrators or victims
are involved. Discipline incidents are events classified as warranting
discipline action.

## Prerequisites

* Student
* Staff
* Enrollment

## Scenarios

1. Create a School Code of Conduct Discipline event for an elementary school
   student.
2. Create a State Offense Discipline event for a high school student.
3. Update the reporter name on the elementary school incident.
4. Update the incident location for the high school incident.

Additional Requirements for behavior requirements:

* A discipline incident Behavior may be recorded either at the Discipline
  Incident level or at the Student Discipline Incident Association level.

| Resource                    | Property Name                 | Is Collection | Data Type                     | Required | Scenario 1: POST                  | Scenario 2: POST                   | Scenario 3: PUT                   | Scenario 4: PUT                   |
| --------------------------- | ----------------------------- | ------------- | ----------------------------- | -------- | --------------------------------- | ---------------------------------- | --------------------------------- | --------------------------------- |
| DisciplineIncidents         | incidentDate                  | FALSE         | date                          | REQUIRED | 9/25/[Current School Year]        | 9/25/[Current School Year]         | 9/25/[Current School Year]        | 9/25/[Current School Year]        |
| DisciplineIncidents         | incidentIdentifier            | FALSE         | string                        | REQUIRED | ["1" if possible \| system value] | ["2" if possible  \| system value] | ["1" if possible \| system value] | ["2" if possible \| system value] |
| DisciplineIncidents         | schoolReference               | FALSE         | schoolReference               | REQUIRED |                                   |                                    |                                   |                                   |
| schoolReference             | schoolId                      | FALSE         | integer                       | REQUIRED | 255901107                         | 255901001                          | 255901107                         | 255901001                         |
| DisciplineIncidents         | behaviors                     | TRUE          | disciplineIncidentBehavior[]  | REQUIRED |                                   |                                    |                                   |                                   |
| disciplineIncidentBehaviors | behaviorDescriptor            | FALSE         | behaviorDescriptor            | REQUIRED | School Code of Conduct            | State Offense                      | School Code of Conduct            | State Offense                     |
| DisciplineIncidents         | incidentLocationDescriptor    | FALSE         | incidentLocationDescriptor    | REQUIRED | School bus                        | Library/media center               | School bus                        | **Classroom**                     |
| DisciplineIncidents         | reporterDescriptionDescriptor | FALSE         | reporterDescriptionDescriptor | REQUIRED | Staff                             | Staff                              | Staff                             | Staff                             |
| DisciplineIncidents         | reporterName                  | FALSE         | string                        | REQUIRED | Loyo, John                        | Smith, Jane                        | **Villa, Mark**                   | Smith, Jane                       |
