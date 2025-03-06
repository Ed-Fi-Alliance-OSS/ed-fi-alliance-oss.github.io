---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Academic Record Domain - Entities, References, and Descriptors

## Student Academic Record Domain Entities

| Name | Description |
| --- | --- |
| CompetencyObjective | This entity holds additional competencies for student achievement that are not associated with specific learning objectives (e.g., paying attention in class). |
| CourseTranscript | This entity is the final record of a student's performance in their courses at the end of a semester or school year. |
| Grade | This educational entity represents an overall score or assessment tied to a course over a period of time (i.e., the grading period). Student grades are usually a compilation of marks and other scores. |
| GradebookEntry | This entity represents an assignment, homework, or classroom assessment to be recorded in a gradebook. |
| ReportCard | This educational entity represents the collection of student grades for courses taken during a grading period. |
| StudentAcademicRecord | This educational entity represents the cumulative record of academic achievement for a student. |
| StudentCompetencyObjective | This entity represents the competency assessed or evaluated for the student against a specific learning objective. |
| StudentGradebookEntry | This entity holds a student's grade or competency level for a gradebook entry. |
| StudentLearningObjective | Deprecated. Users of this element are advised to use Grade.LearningStandardGrade instead. Expect removal of this element in a future release. |

## Extended References

| Name | Description |
| --- | --- |
| Course | This educational entity represents the organization of subject matter and related learning experiences provided for the instruction of students on a regular or systematic basis. |
| CourseOffering | This entity represents an entry in the course catalog of available courses offered by the school during a session. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| GradingPeriod | This descriptor defines the name of the period for which grades are reported. |
| LearningObjective | Deprecated. Users of this element are advised to use LearningStandard instead. Expect removal of this element in a future release. |
| LearningStandard | This entity is a sub-element of a learning objective consisting of a precise statement of the expectation of a student's proficiency. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |

## Student Academic Record Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| CompetencyObjective | ObjectiveGradeLevel | The grade level for which the CompetencyObjective is targeted. | Orthodox |     |     |     |
| CourseTranscript | AdditionalCreditType | The type of credits or units of value awarded for the completion of a course. | Orthodox |     |     |     |
| CourseAttemptResult | The result from the student's attempt to take the course, for example: Pass, Fail, Incomplete, Withdrawn. | Standard |     |     |     |
| CourseRepeatCode | Indicates that an academic course has been repeated by a student and how that repeat is to be computed in the student's academic grade average. | Orthodox |     |     |     |
| CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| MethodCreditEarned | The method the credits were earned (e.g., Classroom, Examination, Transfer). | Orthodox |     |     |     |
| WhenTakenGradeLevel | Student's grade level at time of course. | Orthodox |     |     |     |
| Grade | GradeType | The type of grade reported (e.g., Exam, Final, Grading Period). | Orthodox |     |     |     |
| PerformanceBaseConversion | A performance level that describes the student proficiency. | Orthodox |     |     |     |
| GradebookEntry | GradebookEntryType | The type of the GradebookEntry; for example, homework, assignment, quiz, unit test, oral presentation, etc. | Orthodox |     |     |     |
| ReportCard | GradePointAverageWeightSystem | The system used for calculating the Grade Point Average. | Orthodox |     |     |     |
| StudentAcademicRecord | AcademicHonorCategory | A designation of the type of academic distinctions earned by or awarded to the student. | Orthodox |     |     |     |
| AchievementCategory | The category of achievement attributed to the learner. | Local |     |     |     |
| CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| DiplomaLevel | The level of diploma/credential that is awarded to a student in recognition of his/her completion of the curricular requirements. Minimum high school program, Recommended high school program, Distinguished Achievement Program. | Local |     |     |     |
| DiplomaType | The type of diploma/credential that is awarded to a student in recognition of his/her completion of the curricular requirements. | Local |     |     |     |
| GradePointAverageWeightSystem | The system used for calculating the Grade Point Average. | Local |     |     |     |
| RecognitionType | The nature of recognition given to the learner for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| Term | The term for the session during the school year. | Flexible |     |     |     |
| StudentCompetencyObjective | CompetencyLevel | The competency level assessed for the student for the referenced competency objective. | Flexible |     |     |     |
| StudentGradebookEntry | CompetencyLevel | The CompetencyLevel assessed for the student for the referenced LearningObjective. | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
