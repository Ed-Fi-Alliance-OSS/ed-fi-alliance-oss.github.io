---
sidebar_position: 3
hide_table_of_contents: true
---

# Assessment Registration Domain - Entities, References, and Descriptors

## Assessment Registration Domain Entities

| Name | Description |
| --- | --- |
| AssessmentAdministration | The anticipated administration of an assessment under the purview of an EducationOrganization. |
| AssessmentAdministrationParticipation | Identifies the point of contact for the administration of an assessment under the purview of an EducationOrganization. |
| StudentAssessmentRegistration | Identifies an assessment registration that a student is expected to participate in including the testing organization, reporting organization and assessment delivery details. |
| AssessmentBatteryPart | The parts organized for administering an assessment which together provide a comprehensive assessment of the students. |
| StudentAssessmentRegistrationBatteryPartAssociation | The association to the part(s) of the assessment battery that the student is to be tested for this administration of the assessment. |
| StudentEducationOrganizationAssessmentAccommodation |  The accommodation(s) required or expected for administering assessments as determined by the education organization. |

## Extended References

| Name | Description |
| --- | --- |
| Assessment | This entity represents a tool, instrument, process, or exhibition composed of a systematic sampling of behavior for measuring a student's competence, knowledge, skills, or behavior. An assessment can be used to measure differences in individuals or groups and changes in performance from one occasion to the next. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| ObjectiveAssessment | This entity represents subtests that assess specific learning objectives. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentDemographic | The demographic information associated to a student. |

## Assessment Domain Descriptors

| Entity | Descriptor | Description |
| --- | --- | --- | --- | --- | --- | --- |
| StudentAssessmentRegistration <br /> StudentEducationOrganizationAssessmentAccommodation <br /> StudentAssessmentRegistrationBatteryPartAssociation | Accommodation | The special variation(s) to be used for the specific part of the assessment battery on how is presented, how it is administered, or how the test taker is allowed to respond.| Local |     | Yes |     |
| StudentAssessmentRegistration | GradeLevel | The grade level or primary instructional level at which the student is to be assessed. | Orthodox | Yes | Yes |     |
| StudentAssessmentRegistration | PlatformType | The environment or format in which the assessment is expected to be administered. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
