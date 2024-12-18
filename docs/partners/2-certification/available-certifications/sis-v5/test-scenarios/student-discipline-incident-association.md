---
hide_table_of_contents: true
---

# v5 Student Discipline > StudentDisciplineIncidentBehaviorAssociation Scenarios

This interchange defines discipline incidents and discipline actions.

This association indicates those students who were victims, perpetrators,
witnesses, and reporters for a discipline incident.

## Prerequisites

* DisciplineIncident
* Student
* Enrollment

## Scenarios

1. Create a StudentDisciplineIncidentBehaviorAssociation an elementary school student.
2. Create a StudentDisciplineIncidentBehaviorAssociation a high school student.
3. Delete the StudentDisciplineIncidentBehaviorAssociation for the elementary school student.

Additional Requirements for behavior requirements:

* A discipline incident Behavior may be recorded either at the Discipline
  Incident level or at the Student Discipline Incident Association level.

| Resource                                      | Property Name                      | Is Collection | Data Type                                        | Required | Scenario 1 POST                            | Scenario 2 POST                            |
| --------------------------------------------- | ---------------------------------- | ------------- | ------------------------------------------------ | -------- | ------------------------------------------ | ------------------------------------------ |
| StudentDisciplineIncidentBehaviorAssociations         | disciplineIncidentReference        | FALSE         | disciplineIncidentReference                      | REQUIRED |                                            |                                            |
| disciplineIncidentReference                   | incidentIdentifier                 | FALSE         | string                                           | REQUIRED | \["1" if possible \| system value\] | \["2" if possible \| system value\] |
| disciplineIncidentReference                   | schoolId                           | FALSE         | integer                                          | REQUIRED | 255901107                                  | 255901001                                  |
| s         | behaviors                          | TRUE          | studentDisciplineIncidentAssociationBehavior\[\] | REQUIRED |                                            |                                            |
| studentDisciplineIncidentAssociationBehaviors | behaviorDescriptor                 | FALSE         | behaviorDescriptor                               | REQUIRED | School Code of Conduct                     | State Offense                              |
| StudentDisciplineIncidentBehaviorAssociations | behaviorDetailedDescription        | FALSE         | string                                           | OPTIONAL |                                            |                                            |
| StudentDisciplineIncidentBehaviorAssociations         | studentParticipationCodeDescriptor | FALSE         | string                                           | REQUIRED | Perpetrator                                | Perpetrator                                |
| StudentDisciplineIncidentBehaviorAssociations         | studentReference                   | FALSE         | studentReference                                 | REQUIRED |                                            |                                            |
| studentReference                              | studentUniqueId                    | FALSE         | string                                           | REQUIRED | 111111                                     | 222222                                     |
