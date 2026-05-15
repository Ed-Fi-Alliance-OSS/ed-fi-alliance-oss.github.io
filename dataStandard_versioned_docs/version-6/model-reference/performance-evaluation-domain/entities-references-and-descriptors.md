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

## Performance Evaluation Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | PerformanceEvaluation | The description of the content or subject area of the performance evaluation. | Local | Yes | Yes |     |
| CoteachingStyleObserved | PerformanceEvaluationRating | A type of co-teaching observed as part of the performance evaluation. | Standard |     |     |     |
| EvaluationElementRatingLevel | EvaluationElementRating | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| EvaluationPeriod | PerformanceEvaluation | The period for the evaluation. | Orthodox |     |     |     |
| EvaluationRatingLevel | EvaluationRating | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| EvaluationRatingStatus | EvaluationRating | The status of the performance evaluation. | Standard |     |     |     |
| EvaluationType | Evaluation <br /> EvaluationElement <br /> EvaluationObjective | The type of the evaluation or evaluation objective. | Standard |     |     |     |
| GoalType | Goal | The type of the goal. |     |     |     |     |
| GradeLevel | PerformanceEvaluation | The grade levels involved with the performance evaluation. | Orthodox | Yes | Yes |     |
| ObjectiveRatingLevel | EvaluationObjectiveRating | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| PerformanceEvaluationType | PerformanceEvaluation | The type of performance evaluation conducted. | Orthodox |     |     |     |
| PerformanceEvaluationRatingLevel | PerformanceEvaluationRating | The rating level achieved based upon the rating or score. | Flexible |     |     |     |
| QuantitativeMeasureDatatype | QuantitativeMeasure | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. |     |     |     |     |
| QuantitativeMeasureType | QuantitativeMeasure | The type of the quantitative measure. |     |     |     |     |
| ResultDatatypeType | EvaluationElementRating <br /> EvaluationObjectiveRating <br /> EvaluationRating <br /> PerformanceEvaluationRating | The datatype of the rating result. | Orthodox |     |     | Yes |
| RubricRatingLevel | RubricDimension | The rating level achieved for the rubric dimension. | Flexible |     |     |     |
| Term | PerformanceEvaluation | The term for the session during the school year. | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
