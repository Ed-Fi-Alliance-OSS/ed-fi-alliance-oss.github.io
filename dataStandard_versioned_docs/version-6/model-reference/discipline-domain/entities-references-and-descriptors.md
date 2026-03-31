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
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffDisciplineIncidentAssociation | This association indicates those staff who were victims, perpetrators, witnesses, and reporters for a discipline incident. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentDisciplineIncidentBehaviorAssociation | This association describes the behavior of students involved in a discipline incident. |
| StudentDisciplineIncidentNonOffenderAssociation | This association indicates those students who were involved and not perpetrators for a discipline incident. |

## Extended References

| Name | Description |
| --- | --- |
| Credential | The legal document giving authorization to perform teaching assignment services. |
| EducationOrganization | Provide user information to lookup and link to an existing educational organization record in the receiving system. |
| EducatorPreparationProgram | The educator preparation program(s) completed by the teacher. |
| LocalEducationAgency | LEA of which the School is an organizational component. |
| OpenStaffPosition | Reference to the open staff position filled by the staff. |
| Person | Relates the student to a generic person. |
| PostSecondaryInstitution | The postsecondary institution or university associated as an organization component for the school, if applicable. |

## Discipline Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Staff | AcademicSubject | The academic subject(s) in which the staff is deemed to be "highly qualified". | Local | Yes | Yes |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. |     |     |     |     |
| Staff | AchievementCategory | The category of achievement attributed to the individual. | Local |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. |     |     |     |     |
| StudentDisciplineIncidentBehaviorAssociation | Behavior | Describes behavior by category. | Local |     | Yes |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. |     |     |     |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. |     |     |     |     |
| Staff <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| DisciplineAction | Discipline | Type of action, such as removal from the classroom, used to discipline the student involved as a perpetrator in a discipline incident. |     |     |     |     |
| DisciplineAction | DisciplineActionLengthDifferenceReason | Indicates the reason for the difference, if any, between the official and actual lengths of a student's disciplinary assignment. |     |     |     |     |
| StaffDisciplineIncidentAssociation <br /> StudentDisciplineIncidentBehaviorAssociation <br /> StudentDisciplineIncidentNonOffenderAssociation | DisciplineIncidentParticipationCode | The role or type of participation of a student in a discipline incident. |     |     |     |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| School | GradeLevel | The grade levels served at the school. |     |     |     |     |
| Staff <br /> Student | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| DisciplineIncident | IncidentLocation | Identifies where the discipline incident occurred and whether or not it occurred on school. |     |     |     |     |
| School | InternetAccess | The type of Internet access available. |     |     |     |     |
| Staff | LevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). |     |     |     |     |
| Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| Staff <br /> Student | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Staff | RecognitionType | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| DisciplineIncident | ReporterDescription | Information on the type of individual who reported the discipline incident. When known and/or if useful, use a more specific option code (e.g., ""Counselor"" rather than ""Professional Staff""). |     |     |     |     |
| School | SchoolCategory | The one or more categories of school. |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. |     |     |     |     |
| Student | Sex | A person's sex at birth. | Standard |     |     |     |
| Student | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. |     |     |     |     |
| DisciplineIncident <br /> StudentDisciplineIncidentBehaviorAssociation | Weapon | Identifies the type of weapon used during an incident. The Federal Gun-Free Schools Act requires states to report the number of students expelled for bringing firearms to school by type of firearm.  |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
