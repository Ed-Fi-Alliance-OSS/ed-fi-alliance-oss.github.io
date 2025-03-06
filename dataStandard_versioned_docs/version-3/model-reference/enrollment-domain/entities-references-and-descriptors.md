---
sidebar_position: 3
hide_table_of_contents: true
---

# Enrollment Domain - Entities, References, and Descriptors

## Enrollment Domain Entities

| Name | Description |
| --- | --- |
| StudentEducationOrganizationResponsibilityAssociation | This association indicates any relationship between a student and an education organization other than how the state views enrollment. Enrollment relationship semantics are covered by StudentSchoolAssociation. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| GraduationPlan | This entity is a plan outlining the required credits, credits by subject, credits by course, and other criteria required for graduation. A graduation plan may be one or more standard plans defined by an education organization and/or individual plans for some or all students. |
| LocalEducationAgency | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Enrollment Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StudentEducationOrganizationResponsibilityAssociation | Responsibility | Indications of an education organization's responsibility for a student, such as accountability, attendance, funding, etc. | Local |     | Yes |     |
| StudentSchoolAssociation | EducationPlan | The type of education plan(s) the student is following, if appropriate. | Local |     | Yes |     |
| EntryGradeLevel | The grade level or primary instructional level at which a student enters and receives services in a school or an educational institution during a given academic session. | Orthodox | Yes | Yes |     |
| EntryGradeLevelReason | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. | Local |     |     |     |
| EntryType | The process by which a student enters a school during a given academic session. | Local |     | Yes |     |
| ExitWithdrawType | The circumstances under which the student exited from membership in an educational institution. | Local |     | Yes |     |
| GraduationPlanType | The type of academic plan the student is following for graduation: for example, Minimum, Recommended, Distinguished, or Standard. | Local |     |     |     |
| ResidencyStatus | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. | Local |     | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
