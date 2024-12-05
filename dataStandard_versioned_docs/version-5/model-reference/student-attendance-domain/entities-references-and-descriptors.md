---
hide_table_of_contents: true
---

# Student Attendance Domain - Entities, References, and Descriptors

## Student Attendance Domain Entities

| Name | Description |
| --- | --- |
| SectionAttendanceTakenEvent | Captures attendance taken event for given section. |
| StudentProgramAttendanceEvent | This event entity represents the recording of whether a student is in attendance to receive or participate in program services. |
| StudentSchoolAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a school day. |
| StudentSectionAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a section. |

## Extended References

| Name | Description |
| --- | --- |
| ClassPeriod | This entity represents the designation of a regularly scheduled series of class meetings at designated times and days of the week. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/><br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |

## Student Attendance Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StudentProgramAttendanceEvent | AttendanceEventCategory | A code describing the attendance event, for example: Present, Unexcused absence, Excused absence, Tardy. | Local |     |     |     |
| EducationalEnvironment | The setting in which a child receives education and related services. This attribute is only used if it differs from the EducationalEnvironment of the Section. This is only used in the AttendanceEvent if different from the associated Section. | Orthodox |     |     |     |
| StudentSchoolAttendanceEvent | AttendanceEventCategory | A code describing the attendance event, for example: Present, Unexcused absence, Excused absence, Tardy. | Local |     |     |     |
| EducationalEnvironment | The setting in which a child receives education and related services. This attribute is only used if it differs from the EducationalEnvironment of the Section. This is only used in the AttendanceEvent if different from the associated Section. | Orthodox |     |     |     |
| StudentSectionAttendanceEvent | AttendanceEventCategory | A code describing the attendance event, for example: Present, Unexcused absence, Excused absence, Tardy. | Local |     |     |     |
| EducationalEnvironment | The setting in which a child receives education and related services. This attribute is only used if it differs from the EducationalEnvironment of the Section. This is only used in the AttendanceEvent if different from the associated Section. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/udm/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
