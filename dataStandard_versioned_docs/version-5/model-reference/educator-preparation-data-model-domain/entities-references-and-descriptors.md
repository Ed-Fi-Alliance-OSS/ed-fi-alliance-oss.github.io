---
hide_table_of_contents: true
---

# Educator Preparation Data Model Domain - Entities, References, and Descriptors

:::warning
The Teacher Preparation Data Model has been renamed to the Educator
Preparation Data Model to better reflect the capability of the model to support
all types of educator preparation. Read more about the name change [We're
renaming TPDM, here's
why](https://edfi.atlassian.net/wiki/display/EPP/We%27re+renaming+TPDM%2C+here%27s+why)
:::

## TPDM Domain Entities

| Name | Description |
| --- | --- |
| Candidate | A candidate is both a person enrolled in a educator preparation program and a candidate to become an educator. |
| CandidateEducatorPreparationProgramAssociation | Information about the association between the Teacher Candidate and the Educator Preparation Program. |
| Credential - Extended | The legal document giving authorization to perform teaching assignment services. |
| EducatorPreparationProgram | The Educator Preparation Program is designed to prepare students to become licensed educators. |
| Evaluation | An evaluation instrument appled to evaluate an educator.  The evaluation could be internally developed, or could be an industry recognized instrument such as TTESS or Marzano. |
| EvaluationElement | The lowest-level Elements or criterion of performance being evaluated by rubric, quantitative measure, or aggregate survey response. |
| EvaluationElementRating | The lowest-level rating for an Evaluation Element for an individual educator. |
| EvaluationObjective | A subcomponent of an Evaluation, a specific educator Objective or domain of performance that is being evaluated. |
| EvaluationObjectiveRating | The rating for the component Evaluation Objective for an individual educator. |
| EvaluationRating | The summary weighting for the Evaluation instrument for an individual educator. |
| FinancialAid | This entity represents the financial aid a person is awarded. |
| PerformanceEvaluation | A performance evaluation of an educator, typically regularly scheduled and uniformly applied, composed of one or more Evaluations. |
| PerformanceEvaluationRating | The summary rating for a Performance Evaluation across all Evaluation instruments for an individual educator. |
| RubricDimension | The cells of a rubric, consisting of a qualitative decription, definition, or exemplar with the associated rubric rating and rating level. |
| School - Extended | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| SurveyResponse - Extended | Responses to a Survey for named or anonymous persons. |
| SurveyResponsePersonTargetAssociation | The association provides information about the survey being taken and who the survey is about. |
| SurveySectionResponsePersonTargetAssociation | This association provides information about the survey section and the person the survey section is about. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Person | This entity represents a human being. |
| PostSecondaryInstitution | An organization that provides educational programs for individuals who have completed or otherwise left educational programs in secondary school(s). |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentAcademicRecord | This educational entity represents the cumulative record of academic achievement for a student. |
| SurveySectionResponse | Optional information about the responses provided for a section of a survey. |

## TPDM Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| EducatorPreparationProgram | AccreditationStatus | Accreditation Status for a Teacher Preparation Provider. | Standard |     |     |     |
| FinancialAid | AidType | This descriptor defines the classification of financial aid awarded to a person for the academic term/year. | Orthodox |     |     |     |
| Credential | CertificationRoute | The process, program, or pathway used to obtain a certification. | Orthodox |     |     |     |
| PerformanceEvaluationRating | CoteachingStyleObserved | A type of co-teaching observed as part of the performance evaluation. | Standard |     |     |     |
| Credential | CredentialStatus | The current status of the credential. | Standard |     |     |     |
| Credential | EducatorRole | The role authorized by the Credential or Certification (e.g., Principal, Reading Specialist), typically associated with service and administrative certifications. | Standard |     |     |     |
| Candidate | EnglishLanguageExam | Indicates that a person passed, failed, or did not take an English Language assessment. | Standard |     |     |     |
| CandidateEducatorPreparationProgramAssociation | EPPProgramPathway | The description of the program pathway, for example: Residency, Internship, Traditional | Standard |     |     |     |
| EvaluationElementRating | EvaluationElementRatingLevel | Rating levels for Evaluation Elements. | Flexible |     |     |     |
| PerformanceEvaluation | EvaluationPeriod | The period for the evaluation. | Orthodox |     |     |     |
| Evaluation<br/><br/>EvaluationObjective<br/><br/>EvaluationElement<br/><br/>EvaluationRating<br/><br/>EvaluationObjectiveRating<br/><br/>EvaluationElementRating<br/><br/>PerformanceEvaluation<br/><br/>PerformanceEvaluationRating | EvaluationRatingLevel | Rating levels for Evaluations. | Flexible |     |     |     |
| EvaluationRating | EvaluationRatingStatus | Represents the status of a Evaluation Rating. | Standard |     |     |     |
| Evaluation<br/><br/>EvaluationObjective<br/><br/>EvaluationElement | EvaluationType | The type of the evaluation (e.g., observation, principal, peer, student survey, student growth). | Standard |     |     |     |
| Candidate | Gender | A person's gender. | Orthodox |     |     |     |
|     | ObjectiveRatingLevel | Rating levels for Evaluation Objectives. | Flexible |     |     |     |
| PerformanceEvaluationRating | PerformanceEvaluationRatingLevel | Rating levels for Performance Evaluations. | Flexible |     |     |     |
| PerformanceEvaluation | PerformanceEvaluationType | The type of performance evaluation conducted (e.g., walkthrough, summative). | Orthodox |     |     |     |
| RubricDimension | RubricRatingLevel | Rating levels for Rubric Dimensions. | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
