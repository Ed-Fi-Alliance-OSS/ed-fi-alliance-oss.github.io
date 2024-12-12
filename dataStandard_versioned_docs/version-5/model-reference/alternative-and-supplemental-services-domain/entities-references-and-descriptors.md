---
hide_table_of_contents: true
---

# Alternative and Supplemental Services Domain - Entities, References, and Descriptors

## Entities, Extended References, and Descriptors

### Alternative and Supplemental Services Domain Entities

| Name | Description |
| --- | --- |
| GeneralStudentProgramAssociation | This association base class represents the basic relationship between students and programs. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| StaffProgramAssociation | This association indicates the Staff associated with a program. |
| StudentCTEProgramAssociation | This association represents the career and technical education (CTE) program that a student participates in. The association is an extension of the GeneralStudentProgramAssociation particular for CTE programs. |
| StudentHomelessProgramAssociation | This association represents the McKinney-Vento Homeless Program program(s) that a student participates in or from which the Student receives services. |
| StudentLanguageInstructionProgramAssociation | This association represents the Title III Language Instruction for Limited English Proficient and Immigrant Students program(s) that a student participates in or from which the Student receives services. |
| StudentMigrantEducationProgramAssociation | This association represents the migrant education program(s) that a student participates in or receives services from. The association is an extension of the GeneralStudentProgramAssociation with added elements particular to migrant education programs. |
| StudentNeglectedOrDelinquentProgramAssociation | This association represents the Title I Part D Neglected or Delinquent program(s) that a student participates in or from which the Student receives services. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentProgramAttendanceEvent | This event entity represents the recording of whether a student is in attendance to receive or participate in program services. |
| StudentSchoolFoodServiceProgramAssociation | This association represents the school food services program(s), such as the Free or Reduced Lunch Program, that a student participates in or from which the Student receives services. |
| StudentSpecialEducationProgramAssociation | This association represents the special education program(s) that a student participates in or receives services from. The association is an extension of the GeneralStudentProgramAssociation particular for special education programs. |
| StudentSpecialEducationProgramEligibilityAssociation | This association captures the details regarding the evaluation process for eligibility of students for special education services under IDEA Part C or Part B. The association is an extension of the GeneralStudentProgramAssociation particular for special education programs. |
| StudentTitleIPartAProgramAssociation | This association represents the Title I Part A program(s) that a student participates in or from which the Student receives services. The association is an extension of the GeneralStudentProgramAssociation particular for Title I Part A programs. |

### Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentSchoolAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a school day. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |
| StudentSectionAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a section. |

### Alternative and Supplemental Services Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| GeneralStudentProgramAssociation | ParticipationStatus | The student's program participation status. | Standard |     | Yes |     |
| ReasonExited | The reason the child left the Program within a school or district. | Standard | Yes | Yes |     |
| Program | ProgramCharacteristic | Reflects important characteristics of the Program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramSponsor | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| ProgramType | The type of program. | Flexible | Yes | Yes | Yes |
| StudentCTEProgramAssociation | CTEProgramService | Indicates the service being provided to the student by the CTE Program. | Orthodox | Yes | Yes |     |
| TechnicalSkillsAssessment | Results of technical skills assessment aligned with industry recognized standards. | Standard |     | Yes |     |
| StudentHomelessProgramAssociation | HomelessPrimaryNighttimeResidence | The primary nighttime residence of the student at the time the student is identified as homeless. | Standard | Yes | Yes |     |
| HomelessProgramService | Indicates the service being provided to the student by the Homeless Program. | Standard | Yes | Yes |     |
| StudentLanguageInstructionProgramAssociation | LanguageInstructionProgramService | Indicates the service being provided to the student by the Language Instruction Program. | Standard | Yes | Yes |     |
| Monitored | Student is monitored on content achievement who are no longer receiving services. | Standard | Yes | Yes |     |
| Participation | Field indicating the participation in the yearly English language assessment. | Standard | Yes | Yes |     |
| Proficiency | The proficiency level for the yearly English language assessment. | Standard | Yes | Yes |     |
| Progress | The yearly progress or growth from last year's assessment. | Standard | Yes | Yes |     |
| StudentMigrantEducationProgramAssociation | ContinuationOfServicesReason | The "continuation of services" provision found in Section 1304(e) of the statute provides that (1) a child who ceases to be a migratory child during a school term shall be eligible for services until the end of such term; (2) a child who is no longer a migratory child may continue to receive services for one additional school year, but only if comparable services are not available through other programs; and (3) secondary school students who were eligible for services in secondary school may continue to be served through credit accrual programs until graduation. Only students who received services at any time during their 36 month eligibility period may continue to receive services (not necessarily the same service). | Standard | Yes | Yes |     |
| MigrantEducationProgramService | Indicates the Service being provided to the student by the Migrant Education Program. | Standard | Yes | Yes |     |
| StudentNeglectedOrDelinquentProgramAssociation | ELAProgressLevel | The progress measured from pre- to post- test for ELA. | Standard | Yes | Yes |     |
| MathematicsProgressLevel | The progress measured from pre- to post-test for Mathematics. |     | Yes | Yes |     |
| NeglectedOrDelinquentProgram | The type of program under ESEA Title I, Part D, Subpart 1 (state programs) or Subpart 2 (LEA). | Standard | Yes | Yes |     |
| NeglectedOrDelinquentProgramService | Indicates the service being provided to the student by the Neglected or Delinquent Program. | Standard | Yes | Yes |     |
| StudentProgramAssociation | Service | Indicates the Service being provided to the student by the Program. | Local |     | Yes |     |
| StudentProgramAttendanceEvent | AttendanceEventCategory | A code describing the attendance event, for example: Present, Unexcused absence, Excused absence, Tardy. | Local | Yes | Yes |     |
| EducationalEnvironment | The setting in which a child receives education and related services. This attribute is only used if it differs from the EducationalEnvironment of the Section. This is only used in the AttendanceEvent if different from the associated Section. | Standard |     | Yes |     |
| StudentSchoolFoodServiceProgramAssociation | SchoolFoodServiceProgramService | Indicates the service being provided to the student by the School Food Service Program. | Standard | Yes | Yes |     |
| StudentSpecialEducationProgramAssociation | Disability | A disability category that describes a child's impairment. | Orthodox | Yes | Yes |     |
| DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     | Yes |     |
| DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     | Yes |     |
| SpecialEducationProgramService | Indicates the service being provided to the student by the Special Education Program. | Standard |     | Yes |     |
| SpecialEducationSetting | The major instructional setting (more than 50 percent of a student's special education program). | Standard | Yes | Yes |     |
| SpecialEducationExitReason | The reason why a person stops receiving special education services. | Standard |     |     |     |
| StudentSpecialEducationProgramEligibilityAssociation | EligibilityEvaluationType | Indicates if this is an initial evaluation or a reevaluation | Orthodox |     |     |     |
| EligibilityDelayReason | The reason why the eligibility determination was completed beyond the required timeframe | Orthodox |     |     |     |
| EvaluationDelayReason | Refers to the justification as to why the evaluation report was completed beyond the state-established timeframe | Orthodox |     |     |     |
| IDEAPart | Indicates if the evaluation is done under Part B IDEA or Part C IDEA | Standard |     |     |     |
| StudentTitleIPartAProgramAssociation | TitleIPartAParticipant | An indication of the type of Title I program, if any, in which the student is participating and by which the student is served: Public Targeted Assistance, Program, Public Schoolwide Program, Private School Students Participating, Local Neglected Program. | Standard | Yes | Yes | Yes |
| TitleIPartAProgramService | Indicates the service being provided to the student by the Title I Part A Program. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
