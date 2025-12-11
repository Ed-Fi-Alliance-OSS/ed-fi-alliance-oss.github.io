---
sidebar_position: 3
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
| Staff | AcademicSubject | The academic subject(s) in which the staff is deemed to be "highly qualified". | Local |     |     |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. | Standard |     |     |     |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| StudentSectionAssociation | AttemptStatus | An indication of the student's completion status for the section. | Orthodox |     |     |     |
| StudentProgramAttendanceEvent <br /> StudentSchoolAttendanceEvent <br /> StudentSectionAttendanceEvent | AttendanceEventCategory | A code describing the attendance event, for example: ( Present, Unexcused absence, Excused absence, Tardy.) | Local |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| StudentMigrantEducationProgramAssociation | ContinuationOfServicesReason | The "continuation of services" provision found in Section 1304(e) of the statute provides that (1) a child who ceases to be a migratory child during a school term shall be eligible for services until the end of such term; (2) a child who is no longer a migratory child may continue to receive services for one additional school year, but only if comparable services are not available through other programs; and (3) secondary school students who were eligible for services in secondary school may continue to be served through credit accrual programs until graduation. Only students who received services at any time during their 36 month eligibility period may continue to receive services (not necessarily the same service). | Standard | Yes | Yes |     |
| EducationOrganization <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Section | CourseLevelCharacteristic | The type of specific program or designation with which the section is associated. This collection should only be populated if it differs from the course level characteristics identified at the course offering level. | Orthodox |     |     |     |
| Section | CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| StudentCTEProgramAssociation | CTEProgramService | Indicates the service being provided to the student by the CTE program. | Orthodox | Yes | Yes |     |
| StudentSpecialEducationProgramAssociation | Disability | A disability category that describes a individual's impairment. | Orthodox |     |     |     |
| StudentSpecialEducationProgramAssociation | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| StudentSpecialEducationProgramAssociation | DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     | Yes |     |
| StudentSectionAssociation | DualCreditInstitution | Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution. |     |     |     |     |
| StudentSectionAssociation | DualCreditType | For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program. |     |     |     |     |
| Section | EducationalEnvironment | The setting in which a student receives education and related services. | Standard |     | Yes |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| StudentSpecialEducationProgramEligibilityAssociation | EligibilityDelayReason | The reason why the eligibility determination was completed beyond the required timeframe. | Orthodox |     |     |     |
| StudentSpecialEducationProgramEligibilityAssociation | EligibilityEvaluationType | Indicates if this is an initial evaluation or a reevaluation. | Orthodox |     |     |     |
| StudentSpecialEducationProgramEligibilityAssociation | EvaluationDelayReason | Refers to the justification as to why the evaluation report was completed beyond the state-established timeframe. This descriptor field will have allowed reasons as descriptor values. | Orthodox |     |     |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| School <br /> Section | GradeLevel | The grade levels in which the section is offered or served at the school. | Orthodox |     |     |     |
| StudentHomelessProgramAssociation | HomelessPrimaryNighttimeResidence | The primary nighttime residence of the student at the time the student is identified as homeless. | Standard | Yes | Yes |     |
| StudentHomelessProgramAssociation | HomelessProgramService | Indicates the service being provided to the student by the homeless program. | Standard | Yes | Yes |     |
| StudentSpecialEducationProgramEligibilityAssociation | IDEAPart | Indicates if the evaluation is done under Part B IDEA or Part C IDEA. | Standard |     |     |     |
| EducationOrganization | Indicator | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. | Local |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| School | InternetAccess | The type of Internet access available. | Flexible |     |     |     |
| Section | Language | The primary language of instruction. If omitted, English is assumed. | Orthodox | Yes | Yes | Yes |
| StudentLanguageInstructionProgramAssociation | LanguageInstructionProgramService | Indicates the service being provided to the student by the language instruction program. | Standard | Yes | Yes |     |
| Staff | LevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| Section | MediumOfInstruction | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     |     |     |
| StudentMigrantEducationProgramAssociation | MigrantEducationProgramService | Indicates the service being provided to the student by the migrant education program. | Standard | Yes | Yes |     |
| StudentLanguageInstructionProgramAssociation | Monitored | Student is monitored on content achievement who are no longer receiving services. | Standard | Yes | Yes |     |
| StudentNeglectedOrDelinquentProgramAssociation | NeglectedOrDelinquentProgram | The type of program under ESEA Title I, Part D, Subpart 1 (state programs) or Subpart 2 (LEA). | Standard | Yes | Yes |     |
| StudentNeglectedOrDelinquentProgramAssociation | NeglectedOrDelinquentProgramService | Indicates the service being provided to the student by the neglected or delinquent program. | Standard | Yes | Yes |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| Staff <br /> Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| StudentLanguageInstructionProgramAssociation | Participation | Field indicating the participation in the yearly English language assessment. | Standard | Yes | Yes |     |
| GeneralStudentProgramAssociation | ParticipationStatus | The student's program participation status. | Standard |     | Yes |     |
| Section | PopulationServed | The type of students the section is offered and tailored to. | Orthodox |     |     |     |
| StudentLanguageInstructionProgramAssociation | Proficiency | The proficiency level for the yearly English language assessment. | Standard | Yes | Yes |     |
| Program | ProgramCharacteristic | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| Program | ProgramSponsor | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| Program | ProgramType | The type of program. | Flexible | Yes | Yes | Yes |
| StudentLanguageInstructionProgramAssociation | Progress | The yearly progress or growth from last year's assessment. | Standard | Yes | Yes |     |
| StudentNeglectedOrDelinquentProgramAssociation | ProgressLevel | The progress measured from pre- to post- test. |     |     |     |     |
| GeneralStudentProgramAssociation | ReasonExited | The reason the student left the program within a school or district. | Standard | Yes | Yes |     |
| Staff | RecognitionType | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| StudentSectionAssociation | RepeatIdentifier | An indication as to whether a student has previously taken a given course. | Flexible |     |     |     |
| School | SchoolCategory | The one or more categories of school. | Local |     | Yes |     |
| StudentSchoolFoodServiceProgramAssociation | SchoolFoodServiceProgramService | Indicates the service(s) being provided to the student by the school food service program. | Standard | Yes | Yes |     |
| School | SchoolType | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| StudentSection504ProgramAssociation | Section504Disability | Defines one or more disabilities student has that qualifies them for a Section 504 plan. |     |     |     |     |
| Section | SectionCharacteristic | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| Section | SectionType | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| StudentProgramAssociation | Service | Indicates the service being provided to the student by the program. | Local |     | Yes |     |
| Student | Sex | A person's sex at birth. | Standard |     |     |     |
| StudentSpecialEducationProgramAssociation | SpecialEducationExitReason | The reason why a person stops receiving special education services. | Standard |     |     |     |
| StudentSpecialEducationProgramAssociation | SpecialEducationProgramService | Indicates the service being provided to the student by the special education program. | Standard |     | Yes |     |
| StudentSpecialEducationProgramAssociation | SpecialEducationSetting | The major instructional setting (more than 50 percent of a student's special education program). | Standard | Yes | Yes |     |
| EducationOrganization <br /> Student | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| StudentCTEProgramAssociation | TechnicalSkillsAssessment | Results of technical skills assessment aligned with industry recognized standards. | Standard |     | Yes |     |
| StudentTitleIPartAProgramAssociation | TitleIPartAParticipant | An indication of the type of Title I program, if any, in which the student is participating and by which the student is served. | Standard | Yes | Yes | Yes |
| StudentTitleIPartAProgramAssociation | TitleIPartAProgramService | Indicates the service(s) being provided to the student by the Title I Part A program. | Standard | Yes | Yes |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
