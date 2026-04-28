---
sidebar_position: 3
hide_table_of_contents: true
---

# Assessment Domain - Entities, References, and Descriptors

## Assessment Domain Entities

| Name | Description |
| --- | --- |
| Assessment | This entity represents a tool, instrument, process, or exhibition composed of a systematic sampling of behavior for measuring a student's competence, knowledge, skills, or behavior. An assessment can be used to measure differences in individuals or groups and changes in performance from one occasion to the next. |
| AssessmentItem | This entity represents one of many single measures that make up an assessment. |
| AssessmentScoreRangeLearningStandard | Score ranges of an assessment associated with one or more learning standards. |
| LearningObjective | **Deprecated**. Users of this element are advised to use LearningStandard instead. Expect removal of this element in a future release. |
| LearningStandard | A statement that describes a specific competency or academic standard. |
| LearningStandardEquivalenceAssociation | Indicates a directional association of equivalence from a source to a target learning standard. |
| ObjectiveAssessment | This entity represents subtests that assess specific learning objectives. |
| StudentAssessment | This entity represents the analysis or scoring of a student's response on an assessment. The analysis results in a value that represents a student's performance on a set of items on a test. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Assessment Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | Assessment <br /> LearningStandard <br /> ObjectiveAssessment | The description of the content or subject area (e.g., arts, mathematics, reading, stenography, a foreign language, or composite if multi-subject) of an assessment, learning standard, or objective assessment. | Local | Yes | Yes |     |
| Accommodation | StudentAssessment | The specific type of special variation used in how an examination is presented, how it is administered, or how the test taker is allowed to respond. This generally refers to changes that do not substantially alter what the examination measures. The proper use of accommodations does not substantially change academic level or performance criteria. | Local |     | Yes |     |
| AdministrationEnvironment | StudentAssessment | The environment in which the test was administered. | Orthodox |     |     |     |
| AssessmentCategory | Assessment | The category of an assessment based on format and content. | Orthodox | Yes | Yes |     |
| AssessmentIdentificationSystem | Assessment | A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to an assessment. | Orthodox |     |     |     |
| AssessmentItemCategory | AssessmentItem | Category or type of the assessment item. | Orthodox |     | Yes |     |
| AssessmentItemResult | StudentAssessment | The assessment item responded to by the student. | Orthodox |     | Yes |     |
| AssessmentPeriod | Assessment <br /> StudentAssessment | The period of time in which an assessment is supposed to be administered (e.g., Beginning of Year, Middle of Year, End of Year). | Local |     | Yes |     |
| AssessmentReportingMethod | AssessmentScoreRangeLearningStandard | The assessment reporting method defined (e.g., scale score, RIT scale score) associated with the referenced learning standard(s). | Local |     | Yes | Yes |
| Country | Student | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| CourseLevelCharacteristic | Section | The type of specific program or designation with which the section is associated. This collection should only be populated if it differs from the course level characteristics identified at the course offering level. | Orthodox |     |     |     |
| CreditType | Section | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| EducationalEnvironment | Section | The setting in which a student receives education and related services. | Orthodox |     |     |     |
| EducationOrganizationAssociationType | StudentAssessmentEducationOrganizationAssociation | The type of association being represented. |     |     |     |     |
| EventCircumstance | StudentAssessment | An unusual event occurred during the administration of the assessment. This could include fire alarm, student became ill, etc. | Flexible |     |     |     |
| GradeLevel | Assessment <br /> LearningStandard <br /> Section <br /> StudentAssessment | The grade level(s) for which an assessment is designed, for the specific learning standard, the grade levels in which the section is offered, or the grade level for which the assessment form was evaluated for the student on this administration. | Orthodox |     |     |     |
| IdentificationDocumentUse | Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Language | Assessment <br /> Section <br /> StudentAssessment | The primary language of instruction, indication of the languages in which the assessment is designed, or language in which an assessment is written and/or administered. | Orthodox | Yes | Yes | Yes |
| LearningStandardCategory | LearningStandard | An additional classification of the type of a specific learning standard. | Orthodox |     |     |     |
| LearningStandardEquivalenceStrength | LearningStandardEquivalenceAssociation | A measure that indicates the strength or quality of the equivalence relationship. | Orthodox |     |     |     |
| LearningStandardScope | LearningStandard | Signals the scope of usage the standard. Does not necessarily relate the standard to the governing body. | Orthodox |     |     |     |
| MediumOfInstruction | Section | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     |     |     |
| OtherNameType | Student | The types of alternate names for an individual. | Orthodox |     |     |     |
| PerformanceLevel | Assessment <br /> ObjectiveAssessment <br /> StudentAssessment | A specification of which performance level value describes the student proficiency. The performance level(s) achieved for the student assessment, or the performance level(s) defined for the assessment. | Local |     |     |     |
| PersonalInformationVerification | Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| PlatformType | Assessment <br /> StudentAssessment | The platforms with which the assessment may be delivered, or the platform with which the assessment was delivered to the student during the assessment session. | Orthodox |     |     |     |
| PopulationServed | Section | The type of students the section is offered and tailored to. | Orthodox |     |     |     |
| ProgramCharacteristic | Program | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramSponsor | Program | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| ProgramType | Program | The type of program. | Flexible | Yes | Yes | Yes |
| PublicationStatus | Assessment <br /> LearningStandard | The publication status of the document (i.e., Adopted, Draft, Published, Deprecated, Unknown). | Orthodox |     |     |     |
| ReasonNotTested | StudentAssessment | The primary reason student is not tested. | Flexible | Yes |     |     |
| ResponseIndicator | StudentAssessment | Indicator of the response. |     |     |     |     |
| ResultDatatypeType | Assessment <br /> ObjectiveAssessment <br /> StudentAssessment | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     | Yes |
| RetestIndicator | StudentAssessment | Indicator if the test was a retake. | Flexible |     |     |     |
| SectionCharacteristic | Section | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| SectionType | Section | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| Sex | Student | A person's sex at birth. | Standard |     |     |     |
| StateAbbreviation | Student | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
