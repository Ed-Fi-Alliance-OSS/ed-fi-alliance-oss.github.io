---
hide_table_of_contents: true
---

# School Calendar Domain - Entities, References, and Descriptors

## School Calendar Domain Entities

| Name | Description |
| --- | --- |
| AcademicWeek | This entity represents the academic weeks for a school year, optionally captured to support analyses. |
| Calendar | A set of dates associated with an organization. |
| CalendarDate | The type of scheduled or unscheduled event for the day. |
| GradingPeriod | This descriptor defines the name of the period for which grades are reported. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## School Calendar Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Calendar | CalendarType | Indicates the type of Calendar. | Flexible |     |     |     |
| GradeLevel | Indicates the GradeLevel associated with the Calendar. | Orthodox |     |     |     |
| CalendarDate | CalendarEvent | The type of scheduled or unscheduled event for the day. | Flexible |     |     |     |
| GradingPeriod | GradingPeriod | The name of the period for which grades are reported. | Flexible |     |     |     |
| Session | Term | An descriptor value indicating the term (e.g., 'Semester', 'Quarter', etc.). | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/udm/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
