---
sidebar_position: 3
hide_table_of_contents: true
---

# Path Domain - Entities, References, and Descriptors

## Path Domain Entities

| Name | Description |
| --- | --- |
| Path | A scheme for achieving milestones organized by phases for students to follow and be tracked against. |
| PathMilestone | A significant event or achievement as part of a path of study. |
| PathPhase | A stage in the process of a student achieving milestones. |
| StudentPath | The entity representing the association or assignment of the student to the path of study being pursued. |
| StudentPathMilestoneStatus | The status of the student's achievement of the path milestone. |
| StudentPathPhaseStatus | The status of the student's association with the path's phase. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| GraduationPlan | This entity is a plan outlining the required credits, credits by subject, credits by course, and other criteria required for graduation. A graduation plan may be one or more standard plans defined by an education organization and/or individual plans for some or all students. |
| Student |  This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Path Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StudentPathMilestoneStatus | PathMilestoneStatus | The student's status associated with the path milestone. |     |     |     |     |
| PathMilestone | PathMilestoneType | The type of milestone defined for the student's path of study. |     |     |     |     |
| StudentPathPhaseStatus | PathPhaseStatus | An event recognizing the change in status for the path phase. |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
