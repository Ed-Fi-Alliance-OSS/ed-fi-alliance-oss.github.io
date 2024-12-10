---
hide_table_of_contents: true
---

# Graduation Domain - Entities, References, and Descriptors

## Graduation Domain Entities

| Name | Description |
| --- | --- |
| GraduationPlan | This entity is a plan outlining the required credits, credits by subject, credits by course, and other criteria required for graduation. A graduation plan may be one or more standard plans defined by an education organization and/or individual plans for some or all students. |
| PostSecondaryEvent | This entity captures significant postsecondary events during a student's high school tenure (e.g., FAFSA application or college application, acceptance, and enrollment) or during a student's enrollment at a postsecondary institution. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| PostSecondaryInstitution | This entity represents an educational organization that provides programs for individuals who have completed or otherwise left educational programs in secondary school(s). |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentAcademicRecord | This educational entity represents the cumulative record of academic achievement for a student. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Graduation Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| GraduationPlan | AcademicSubject | The intended major subject area of the graduation requirement. | Local |     |     |     |
| AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local |     |     |     |
| CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| GraduationPlanType | The type of academic plan the student is following for graduation: for example, Minimum, Recommended, Distinguished, or Standard. | Local |     |     |     |
| PerformanceLevel | The performance level(s) defined for the assessment. | Local |     |     |     |
| ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     |     |
| WhenTakenGradeLevel | The grade level when the student is planned to take the course. | Orthodox |     |     |     |
| PostSecondaryEvent | PostSecondaryEventCategory | The PostSecondaryEvent that is logged (e.g., FAFSA application, college application, college acceptance). | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
