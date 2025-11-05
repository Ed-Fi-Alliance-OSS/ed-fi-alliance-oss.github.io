---
sidebar_position: 3
hide_table_of_contents: true
---

# Performance Evaluation Domain - Entities, References, and Descriptors

## Performance Evaluation Domain Entities

| Name | Description |
| --- | --- |
| Evaluation | An evaluation instrument applied to evaluate an educator.  The evaluation could be internally developed, or could be an industry recognized instrument such as TTESS or Marzano. |
| EvaluationElement | The lowest-level elements or criterion of performance being evaluated by rubric, quantitative measure, or aggregate survey response. |
| EvaluationElementRating | The lowest-level rating for an evaluation element for an individual educator.|
| EvaluationObjective | A sub-component of an evaluation, a specific educator objective or domain of performance that is being evaluated. |
| EvaluationObjectiveRating | The rating for the component evaluation objective for an individual educator. |
| EvaluationRating | The summary weighting for the evaluation instrument for an individual educator. |
| Goal | The goal for performance improvement assigned to an educator associated with an evaluation element. |
| PerformanceEvaluation | A performance evaluation of an educator, typically regularly scheduled and uniformly applied, composed of one or more evaluations. |
| PerformanceEvaluationRating | The summary rating for a performance evaluation across all evaluation instruments for an individual educator. |
| QuantitativeMeasure | A quantitative measure of the educator performance associated with an evaluation element. |
| QuantitativeMeasureScore | The score or value for a quantitative measure achieved by an individual educator. |
| RubricDimension | The cells of a rubric, consisting of a qualitative description, definition, or exemplar with the associated rubric rating and rating level. |
| SurveySectionAggregateResponse | The aggregate or average score across the surveying population for a survey section being used for performance evaluation. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Person | The person whose performance is being evaluated. |
| Section | The section associated with a classroom evaluation. |

## Path Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| PerformanceEvaluation | AcademicSubject | The description of the content or subject area of the performance evaluation. |     |     |     |     |
| PerformanceEvaluationRating | CoteachingStyleObserved | A type of co-teaching observed as part of the performance evaluation. | Standard |     |     |     |
| EvaluationElementRating | EvaluationElementRatingLevel | The rating level achieved based upon the rating or score. | Flexibile |     |     |     |
| PerformanceEvaluation | EvaluationPeriod | The period for the evaluation. |     |     |     |     |
| EvaluationRating | EvaluationRatingLevel | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| EvaluationRating | EvaluationRatingStatus | The status of the performance evaluation. | Standard |     |     |     |
| Evaluation <br /> EvaluationElement <br /> EvaluationObjective | EvaluationType | The type of the evaluation or evaluation objective. | Standard |     |     |     |
| Goal | GoalType | The type of the goal. |     |     |     |     |
| PerformanceEvaluation | GradeLevel | The grade levels involved with the performance evaluation. |     |     |     |     |
| EvaluationObjectiveRating | ObjectiveRatingLevel | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| PerformanceEvaluation | PerformanceEvaluationType | The type of performance evaluation conducted. | Orthodox |     |     |     |
| PerformanceEvaluationRating | PerformanceEvaluationRatingLevel | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| QuantitativeMeasure | QuantitativeMeasureDatatype | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. |     |     |     |     |
| QuantitativeMeasure | QuantitativeMeasureType | The type of the quantitative measure. |     |     |     |     |
| EvaluationElementRating <br /> EvaluationObjectiveRating <br /> EvaluationRating <br /> PerformanceEvaluationRating <br /> | ResultDatatypeType | The datatype of the rating result. |     |     |     |     |
| RubricDimension | RubricRatingLevel | The rating level achieved for the rubric dimension. | Flexible |     |     |     |
| PerformanceEvaluation | Term | The term for the session during the school year. |     |     |     |     |
