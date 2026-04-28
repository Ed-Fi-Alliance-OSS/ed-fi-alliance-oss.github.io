---
sidebar_position: 3
hide_table_of_contents: true
---

# Survey Domain - Entities, References, and Descriptors

## Survey Domain Entities

| Name | Description |
| --- | --- |
| Survey | A survey to identified or anonymous respondents. |
| SurveySection | The section of questions for the survey. |
| SurveyQuestion | The questions for the survey. |
| SurveyResponse | Responses to a Survey for named or anonymous persons. |
| SurveySectionResponse | Optional information about the responses provided for a section of a survey. |
| SurveyQuestionResponse | The response to a survey question. |
| SurveyCourseAssociation | The course associated with the survey. |
| SurveySectionAssociation | The section associated with the survey. |
| SurveyProgramAssociation | The program associated with the survey. |
| SurveyResponseEducationOrganizationTargetAssociation | This association provides information about the survey being taken and the education organization the survey is about. |
| SurveyResponseStaffTargetAssociation | The association provides information about the survey being taken and who the survey is about. |
| SurveySectionResponseEducationOrganizationTargetAssociation | This association provides information about the survey section and the Education Organization the survey section is about. |
| SurveySectionResponseStaffTargetAssociation | This association provides information about the survey section and the staff the survey section is about. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An ""employee"" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A ""contractor"" or ""consultant"" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A ""volunteer"" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Contact | This entity represents a parent or guardian of a student, such as mother, father, or caretaker. |
| Course | This educational entity represents the organization of subject matter and related learning experiences provided for the instruction of students on a regular or systematic basis. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |

## Survey Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | Course <br /> Staff | The intended major subject/s area of the course, or academic subject(s) in which the staff is deemed to be "highly qualified". | Local |     |     |     |
| AchievementCategory | Staff | The category of achievement attributed to the individual. | Local |     |     |     |
| AddressCharacteristic | Contact <br /> EducationOrganization | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | Contact <br /> EducationOrganization | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| CareerPathway | Course | Indicates the career cluster or pathway the course is associated with as part of a CTE curriculum. | Flexible |     |     |     |
| CompetencyLevel | Course | The competency levels defined to rate the student for the course. | Flexible |     |     |     |
| Country | Contact <br /> EducationOrganization <br /> Staff <br /> Student | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| CourseDefinedBy | Course | Specifies whether the course was defined by the SEA, LEA, School, or national organization. | Orthodox |     |     |     |
| CourseGPAApplicability | Course | An indicator of whether or not the course being described is included in the computation of the student's grade point average, and if so, if it is weighted differently from regular courses. | Orthodox |     |     |     |
| CourseIdentificationSystem | Course | A system that is used to identify the organization of subject matter and related learning experiences provided for the instruction of students. | Orthodox |     |     |     |
| CourseLevelCharacteristic | Course <br /> Section | The type of specific program or designation with which the course is associated (e.g., AP, IB, Dual Credit, CTE), or the type of specific program or designation with which the section is associated. | Orthodox |     |     |     |
| CreditType | Course <br /> Section | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| EducationalEnvironment | Section | The setting in which a student receives education and related services. | Standard |     | Yes |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| ElectronicMailType | Contact | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| GradeLevel | Course <br /> Section | The grade levels in which the course or section is offered. | Orthodox | Yes | Yes |     |
| IdentificationDocumentUse | Staff <br /> Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Indicator | EducationOrganization | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. | Local |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| Language | Contact <br /> Section | The primary language of instruction, or a specification of which written or spoken communication is being used. | Orthodox | Yes | Yes | Yes |
| LanguageUse | Contact | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LevelOfEducation | Contact <br /> Staff | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| Locale | Contact <br /> EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| MediumOfInstruction | Section | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     | Yes |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| OtherNameType | Contact <br /> Staff <br /> Student | The types of alternate names for an individual. | Orthodox |     |     |     |
| PersonalInformationVerification | Staff <br /> Student | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PopulationServed | Section | The type of students the section is offered and tailored to. | Orthodox |     |     |     |
| ProgramCharacteristic | Program | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramSponsor | Program | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| ProgramType | Program | The type of program. | Flexible | Yes | Yes | Yes |
| QuestionForm | Survey | The form or type of question. | Local |     |     |     |
| RecognitionType | Staff | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| SectionCharacteristic | Section | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| SectionType | Section | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| Sex | Contact <br /> Student | A person's birth sex. | Standard |     |     |     |
| StateAbbreviation | Contact <br /> EducationOrganization <br /> Student | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| SurveyCategory | Survey | The category or type of survey. | Local |     |     |     |
| SurveyLevel | SurveyResponse | Provides information about the respondents of a survey and how they can be grouped together. | Local |     |     |     |
| TelephoneNumberType | Contact | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Term | Session | A descriptor value to indicate the term that the session is associated with. | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
