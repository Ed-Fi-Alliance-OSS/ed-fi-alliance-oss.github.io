---
sidebar_position: 3
hide_table_of_contents: true
---

# Discipline Domain - Entities, References, and Descriptors

## Discipline Domain Entities

| Name | Description |
| --- | --- |
| DisciplineAction | This event entity represents actions taken by an education organization after a disruptive event that is recorded as a discipline incident. |
| DisciplineIncident | This event entity represents an occurrence of an infraction ranging from a minor behavioral problem that disrupts the orderly functioning of a school or classroom (such as tardiness) to a criminal act that results in the involvement of a law enforcement official (such as robbery). A single event (e.g., a fight) is one incident regardless of how many perpetrators or victims are involved. Discipline incidents are events classified as warranting discipline action. |
| StaffDisciplineIncidentAssociation | This association indicates those staff who were victims, perpetrators, witnesses, and reporters for a discipline incident. |
| StudentDisciplineIncidentAssociation | **Deprecated.** This association indicates those students who were victims, perpetrators, witnesses, and reporters for a discipline incident. |
| StudentDisciplineIncidentBehaviorAssociation | This association describes the behavior of students involved in a discipline incident. |
| StudentDisciplineIncidentNonOffenderAssociation | This association indicates those students who were involved and not perpetrators for a discipline incident. |

## Extended References

| Name | Description |
| --- | --- |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Discipline Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| DisciplineAction | Discipline | Type of action, such as removal from the classroom, used to discipline the student involved as a perpetrator in a discipline incident. | Local | Yes | Yes |     |
| DisciplineAction | DisciplineActionLengthDifferenceReason | Indicates the reason for the difference, if any, between the official and actual lengths of a student's disciplinary assignment. | Local |     | Yes |     |
| DisciplineIncident | IncidentLocation | Identifies where the DisciplineIncident occurred and whether or not it occurred on school, for example: On school, Administrative offices area, Cafeteria area, Classroom, Hallway or stairs... | Orthodox |     | Yes |     |
| DisciplineIncident | ReporterDescription | Information on the type of individual who reported the DisciplineIncident. When known and/or if useful, use a more specific option code (e.g., "Counselor" rather than "Professional Staff"); for example: Student, Parent/guardian, Law enforcement officer, Nonschool personnel, Representative of visiting school... | Local |     | Yes |     |
| DisciplineIncident | Behavior | Describes behavior by category and provides a detailed description. | Local |     | Yes |     |
| DisciplineIncident | Weapon | Identifies the type of weapon used during an incident. The Federal Gun-Free Schools Act requires states to report the number of students expelled for bringing firearms to school by type of firearm. | Local |     | Yes |     |
| DisciplineIncident | DisciplineIncidentParticipationCode | The role or type of participation of a student in a discipline incident; for example: Victim, Perpetrator, Witness, Reporter. | Local |     | Yes |     |
| StaffDisciplineIncidentAssociation | DisciplineIncidentParticipationCode | The role or type of participation of a student in a discipline incident (e.g., Victim, Perpetrator, Witness, Reporter). | Local |     | Yes |     |
| StudentDisciplineIncidentAssociation | StudentParticipationCode | The role or type of participation of a student in a discipline incident;  <br/>for example: Victim, Perpetrator, Witness, Reporter. | Local |     | Yes |     |
| StudentDisciplineIncidentAssociation | Behavior | Describes behavior by category and provides a detailed description. | Local |     | Yes |     |
| StudentDisciplineIncidentBehaviorAssociation | Behavior | Describes behavior by category. | Local |     | Yes |     |
| StudentDisciplineIncidentBehaviorAssociation | DisciplineIncidentParticipationCode | The role or type of participation of a student in a discipline incident. | Local |     | Yes |     |
| StudentDisciplineIncidentNonOffenderAssociation | DisciplineIncidentParticipationCode | The role or type of participation of a student in a discipline incident. | Local |     | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
