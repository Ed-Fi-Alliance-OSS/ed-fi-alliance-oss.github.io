---
sidebar_position: 3
hide_table_of_contents: true
---

# Teaching and Learning Domain - Entities, References, and Descriptors

## Teaching and Learning Model Entities

| Name | Description |
| --- | --- |
| Course | This educational entity represents the organization of subject matter and related learning experiences provided for the instruction of students on a regular or systematic basis. |
| CourseOffering | This entity represents an entry in the course catalog of available courses offered by the school during a session. |
| Location | This entity represents the physical space where students gather for a particular class/section. The Location may be an indoor or outdoor area designated for the purpose of meeting the educational needs of students. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| StaffSectionAssociation | This association indicates the class sections to which a staff member is assigned. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |

## Extended References

| Name | Description |
| --- | --- |
| ClassPeriod | This entity represents the designation of a regularly scheduled series of class meetings at designated times and days of the week. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| LearningStandard | This entity is a sub-element of a learning objective consisting of a precise statement of the expectation of a student's proficiency. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4. An in-kind service provider  <br/>5. An independent contractor or businessperson working at a school site. |
| StaffProgramAssociation | This association indicates the Staff associated with a program. |
| StaffSchoolAssociation | This association indicates the School(s) to which a staff member provides instructional services. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Teaching and Learning Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Course | AcademicSubject | The intended major subject area of the course. | Local |     |     |     |
| CareerPathway | Indicates the career cluster or pathway the course is associated with as part of a CTE curriculum. | Flexible |     |     |     |
| CompetencyLevel | The competency levels defined to rate the student for the course. | Flexible |     |     |     |
| CourseDefinedBy | Specifies whether the course was defined by the SEA, LEA, School, or national organization. | Orthodox |     |     |     |
| CourseGPAApplicability | An indicator of whether or not the course being described is included in the computation of the student's Grade Point Average, and if so, if it is weighted differently from regular courses. | Orthodox |     |     |     |
| CourseIdentificationSystem | A system that is used to identify the organization of subject matter and related learning experiences provided for the instruction of students. | Orthodox |     |     |     |
| CourseLevelCharacteristic | The type of specific program or designation with which the course is associated (e.g., AP, IB, Dual Credit, CTE). | Orthodox |     |     |     |
| CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| OfferedGradeLevel | The grade levels in which the course is offered. | Orthodox |     |     |     |
| CourseOffering | CourseLevelCharacteristic | The type of specific program or designation with which the course offering is associated (e.g., AP, IB, Dual Credit, CTE). This collection should only be populated if it differs from the Course Level Characteristics identified at the Course level. | Orthodox |     |     |     |
| CurriculumUsed | The type of curriculum used in an early learning classroom or group. | Orthodox |     |     |     |
| OfferedGradeLevel | The grade levels in which the course is offered. This collection should only be populated if it differs from the Offered Grade Levels identified at the Course level. | Orthodox |     |     |     |
| Section | CourseLevelCharacteristic | The type of specific program or designation with which the section is associated (e.g., AP, IB, Dual Credit, CTE). This collection should only be populated if it differs from the Course Level Characteristics identified at the Course Offering level. | Orthodox |     |     |     |
| CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| EducationalEnvironment | The setting in which a child receives education and related services; for example: Center-based instruction, Home based instruction, Hospital class, Mainstream, Residential care and treatment facility... | Orthodox |     |     |     |
| InstructionLanguage | The primary language of instruction, if omitted English is assumed. | Orthodox |     |     |     |
| OfferedGradeLevel | The grade levels in which the section is offered. This collection should only be populated if it differs from the Offered Grade Levels identified at the Course Offering level. | Orthodox |     |     |     |
| MediumOfInstruction | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters; for example: Technology-based instruction in classroom, Correspondence instruction, Face-to-face instruction, Virtual/On-line Distance learning, Center-based instruction... | Orthodox |     |     |     |
| PopulationServed | The type of students the Section is offered and tailored to; for example: Bilingual students, Remedial education students, Gifted and talented students, Career and Technical Education students, Special education students... | Orthodox |     |     |     |
| SectionCharacteristic | Reflects important characteristics of the Section, such as whether or not attendance is taken and the Section is graded. | Local |     |     |     |
| StaffSectionAssociation | ClassroomPosition | The type of position the Staff member holds in the specific class/section; for example: Teacher of Record, Assistant Teacher, Support Teacher, Substitute Teacher... | Orthodox |     |     |     |
| StudentSectionAssociation | AttemptStatus | An indication of the student's completion status for the section. | Orthodox |     |     |     |
| RepeatIdentifier | An indication as to whether a student has previously taken a given course. Repeated, counted in grade point average, Repeated, not counted in grade point average, Not repeated, Other. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
