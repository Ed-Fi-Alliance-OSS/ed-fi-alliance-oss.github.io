---
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

| Entity | Descriptor | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Assessment | AcademicSubject | The description of the content or subject area (e.g., arts, mathematics, reading, stenography, or a foreign language) of an assessment. | Local | Yes | Yes |     |
| AssessedGradeLevel | The grade level(s) for which an assessment is designed. The semantics of null is assumed to mean that the assessment is not associated with any grade level. | Orthodox | Yes | Yes |     |
| AssessmentCategory | The category of an assessment based on format and content. For example: Achievement test, Advanced placement test, Alternate assessment/grade-level standards, Attitudinal test, Cognitive and perceptual skills test... | Orthodox | Yes | Yes |     |
| AssessmentIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to an assessment. | Orthodox |     |     |     |
| AssessmentPeriod | The period of time in which an assessment is supposed to be administered (e.g., Beginning of Year, Middle of Year, End of Year). | Local |     | Yes |     |
| AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local |     | Yes | Yes |
| Language | An indication of the languages in which the assessment is designed. | Orthodox | Yes | Yes | Yes |
| PerformanceLevel | The performance level(s) defined for the assessment. | Local | Yes | Yes |     |
| PlatformType | The platforms with which the assessment may be delivered. | Orthodox |     |     |     |
| PublicationStatus | The publication status of the document (i.e., Adopted, Draft, Published, Deprecated, Unknown). | Orthodox |     |     |     |
| ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     | Yes |
| AssessmentItem | AssessmentItemCategory | Category or type of the AssessmentItem. For example: Multiple choice, Analytic, Prose... | Orthodox |     | Yes |     |
| AssessmentScoreRangeLearningStandard | AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local |     |     |     |
| LearningStandard | AcademicSubject | Subject area for the LearningStandard. | Local | Yes | Yes |     |
| GradeLevel | The grade levels for the specific learning standard. | Orthodox | Yes | Yes |     |
| LearningStandardCategory | An additional classification of the type of a specific learning standard. | Orthodox |     |     |     |
| LearningStandardScope | Signals the scope of usage the standard. Does not necessarily relate the standard to the governing body. | Orthodox |     |     |     |
| PublicationStatus | The publication status of the document (i.e., Adopted, Draft, Published, Deprecated, Unknown). | Orthodox |     |     |     |
| LearningStandardEquivalenceAssociation | LearningStandardEquivalenceStrength | A measure that indicates the strength or quality of the equivalence relationship. | Orthodox |     |     |     |
| ObjectiveAssessment | AcademicSubject | The subject area of the objective assessment. | Local | Yes | Yes |     |
| AssessmentReportingMethod | The method that the instructor of the class uses to report the performance and achievement of all students. It may be a qualitative method such as individualized teacher comments or a quantitative method such as a letter or numerical grade. In some cases, more than one type of reporting method may be used. | Local |     | Yes | Yes |
| PerformanceLevel | The performance level(s) defined for the assessment. | Local | Yes | Yes |     |
| ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     | Yes |
| StudentAssessment | Accommodation | The specific type of special variation used in how an examination is presented, how it is administered, or how the test taker is allowed to respond. This generally refers to changes that do not substantially alter what the examination measures. The proper use of accommodations does not substantially change academic level or performance criteria. For example: Braille, Enlarged monitor view, Extra time ,Large Print, Setting, Oral Administration... | Local |     | Yes |     |
| AdministrationEnvironment | The environment in which the test was administered. | Orthodox |     |     |     |
| AdministrationLanguage | The language in which an assessment is written and/or administered. | Orthodox |     |     |     |
| AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local |     | Yes | Yes |
| EventCircumstance | An unusual event occurred during the administration of the assessment. This could include fire alarm, student became ill, etc. | Flexible |     |     |     |
| PerformanceLevel | A specification of which performance level value describes the student proficiency. | Local | Yes | Yes |     |
| PlatformType | The platform with which the assessment was delivered to the student during the assessment session. | Orthodox |     |     |     |
| ReasonNotTested | The primary reason student is not tested. For example: Absent, Refusal by parent, Refusal by student, Medical waiver, Illness, Disruptive behavior, LEP Exempt... | Flexible | Yes |     |     |
| ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     | Yes |
| RetestIndicator | Indicator if the test was retaken. For example: Primary administration, First retest, Second retest... | Flexible |     |     |     |
| WhenAssessedGradeLevel | The grade level of a student when assessed. | Orthodox |     | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
