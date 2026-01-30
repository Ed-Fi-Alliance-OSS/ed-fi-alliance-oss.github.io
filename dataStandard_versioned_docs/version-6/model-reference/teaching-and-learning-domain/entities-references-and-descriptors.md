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
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffProgramAssociation | This association indicates the Staff associated with a program. |
| StaffSchoolAssociation | This association indicates the School(s) to which a staff member provides instructional services. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Teaching and Learning Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StudentAcademicRecord | AcademicHonorCategory | A designation of the type of academic distinctions earned by or awarded to the individual. | Orthodox |     |     |     |
| Course <br /> CourseTranscript <br /> LearningStandard <br /> Staff <br /> StaffSchoolAssociation | AcademicSubject | The intended major subject/s area of the course, or the subject area for the course transcript credits awarded in the course transcript. Subject area for the learning standard, or the academic subject(s) in which the staff is deemed to be "highly qualified". The academic subjects the individual is eligible to teach. | Local | Yes | Yes |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. | Standard |     |     |     |
| Staff | AchievementCategory | The category of achievement attributed to the individual. | Local |     |     |     |
| CourseTranscript | AdditionalCreditType | The type of credits or units of value awarded for the completion of a course. | Orthodox |     |     |     |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| StudentSectionAssociation | AttemptStatus | An indication of the student's completion status for the section. | Orthodox |     |     |     |
| Course | CareerPathway | Indicates the career cluster or pathway the course is associated with as part of a CTE curriculum. | Flexible |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| StaffSectionAssociation | ClassroomPosition | The type of position the staff member holds in the specific class/section. | Orthodox |     |     |     |
| Course | CompetencyLevel | The competency levels defined to rate the student for the course. | Flexible |     |     |     |
| EducationOrganization <br /> Staff <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| CourseTranscript | CourseAttemptResult | The result from the student's attempt to take the course. | Standard |     |     |     |
| Course | CourseDefinedBy | Specifies whether the course was defined by the SEA, LEA, School, or national organization. | Orthodox |     |     |     |
| Course | CourseGPAApplicability | An indicator of whether or not the course being described is included in the computation of the student's grade point average, and if so, if it is weighted differently from regular courses. | Orthodox |     |     |     |
| Course <br /> CourseTranscript | CourseIdentificationSystem | A system that is used to identify the organization of subject matter and related learning experiences provided for the instruction of students. | Orthodox |     |     |     |
| Course <br /> CourseOffering <br /> Section | CourseLevelCharacteristic | The type of specific program or designation with which the course is associated (e.g., AP, IB, Dual Credit, CTE), or the type of specific program or designation with which the section is associated. | Orthodox |     |     |     |
| CourseTranscript | CourseRepeatCode | Indicates that an academic course has been repeated by a student and how that repeat is to be computed in the student's academic grade average. | Orthodox |     |     |     |
| CourseTranscript | CreditCategory | A categorization for the course transcript credits awarded in the course transcript. | Flexible |     |     |     |
| Course <br /> CourseTranscript <br /> Section <br /> StudentAcademicRecord | CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| CourseOffering | CurriculumUsed | The type of curriculum used in an early learning classroom or group. | Orthodox |     |     |     |
| StudentAcademicRecord | DiplomaLevel | The level of diploma/credential that is awarded to a student in recognition of completion of the curricular requirements. | Local |     |     |     |
| StudentAcademicRecord | DiplomaType | The type of diploma/credential that is awarded to a student in recognition of his/her completion of the curricular requirements. | Local |     |     |     |
| StudentSectionAssociation | DualCreditInstitution | Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution. |     |     |     |     |
| StudentSectionAssociation | DualCreditType | For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program. |     |     |     |     |
| Section | EducationalEnvironment | The setting in which a student receives education and related services. | Orthodox |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| StudentSchoolAssociation | EducationPlan | The type of education plan(s) the student is following, if appropriate. | Local |     | Yes |     |
| StudentSchoolAssociation | EnrollmentType | The type of enrollment reflected by the StudentSchoolAssociation. |     |     |     |     |
| StudentSchoolAssociation | EntryGradeLevelReason | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. | Local |     |     |     |
| StudentSchoolAssociation | EntryType | The process by which a student enters a school during a given academic session. | Local |     | Yes |     |
| StudentSchoolAssociation | ExitWithdrawType | The circumstances under which the student exited from membership in an educational institution. | Local |     | Yes |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| StaffSchoolAssociation <br /> StudentSchoolAssociation <br /> Course <br /> CourseOffering <br /> CourseTranscript <br /> LearningStandard <br /> Section | GradeLevel | The grade levels the individual is eligible to teach. <br /> The grade level or primary instructional level at which a student enters and receives services in a school or an educational institution during a given academic session. <br /> The grade levels in which the course or section is offered. <br /> Student's grade level at time of course. <br /> The grade levels for the specific learning standard. | Orthodox |     |     |     |     |
| StudentAcademicRecord | GradePointAverageType | The system used for calculating the grade point average for an individual. | Standard |     |     |     |
| Staff <br /> Student | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| EducationOrganization | Indicator | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. | Local |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| School | InternetAccess | The type of Internet access available. | Flexible |     |     |     |
| Section | Language | The primary language of instruction. If omitted, English is assumed. | Orthodox | Yes | Yes | Yes |
| LearningStandard | LearningStandardCategory | An additional classification of the type of a specific learning standard. | Orthodox |     |     |     |
| LearningStandard | LearningStandardScope | Signals the scope of usage the standard. Does not necessarily relate the standard to the governing body. | Orthodox |     |     |     |
| Staff | LevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| Section | MediumOfInstruction | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     |     |     |
| CourseTranscript | MethodCreditEarned | The method the credits were earned. | Orthodox |     |     |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| Staff <br /> Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| Staff <br /> Student | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Section | PopulationServed | The type of students the section is offered and tailored to. | Orthodox |     |     |     |
| StaffSchoolAssociation | ProgramAssignment | The name of the program for which the individual is assigned. | Orthodox |     |     |     |
| Program | ProgramCharacteristic | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramEvaluation | ProgramEvaluationPeriod | The name of the period for the program evaluation. |     |     |     |     |
| ProgramEvaluation | ProgramEvaluationType | The type of program evaluation conducted. |     |     |     |     |
| Program | ProgramSponsor | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| Program | ProgramType | The type of program. | Flexible | Yes | Yes | Yes |
| LearningStandard | PublicationStatus | The publication status of the document (i.e., Adopted, Draft, Published, Deprecated, Unknown). | Orthodox |     |     |     |
| EvaluationRubricDimension <br /> ProgramEvaluationElement <br /> ProgramEvaluationObjective <br /> StudentProgramEvaluation <br /> StudentEvaluationObjective | RatingLevel | The rating level achieved for the evaluation rubric dimension. <br /> The title for a level of rating or evaluation band (e.g., Excellent, Acceptable, Needs Improvement, Unacceptable). <br /> The rating level achieved based upon the rating or score for the evaluation element or objective. |     |     |     |     |
| Staff <br /> StudentAcademicRecord | RecognitionType | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| StudentSectionAssociation | RepeatIdentifier | An indication as to whether a student has previously taken a given course. | Orthodox |     |     |     |
| StudentSchoolAssociation | ResidencyStatus | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. | Local |     | Yes |     |
| School | SchoolCategory | The one or more categories of school. | Local |     | Yes |     |
| StudentSchoolAssociation | SchoolChoiceBasis | The legal basis for the school choice enrollment according to local, state or federal policy or regulation. (The descriptor provides the list of available bases specific to the state). |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| Section | SectionCharacteristic | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| Section | SectionType | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| StudentProgramAssociation | Service | Indicates the service being provided to the student by the program. | Local |     | Yes |     |
| Student | Sex | A person's sex at birth. | Standard |     |     |     |
| EducationOrganization <br /> Student | StateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. | Standard |     | Yes |     |
| Session <br /> StudentAcademicRecord | Term | A descriptor value to indicate the term that the session is associated with. | Flexible |     |     |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
