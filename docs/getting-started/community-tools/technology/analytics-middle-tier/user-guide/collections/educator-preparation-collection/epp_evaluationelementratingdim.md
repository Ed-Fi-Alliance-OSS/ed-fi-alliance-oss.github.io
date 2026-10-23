# EPP_EvaluationElementRatingDim

## Purpose

Used to look up performance results for a candidate

## SQL Object Name

`analytics.EPP_EvaluationElementRatingDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| CandidateKey | nvarchar | Candidate | The unique key that describes a candidate |
| EvaluationDate | date | EvaluationElementRatingResult | The date the evaluation was given |
| PerformanceEvaluationTitle | nvarchar | EvaluationElementRatingResult | The title evaluation the candidate was given |
| EvaluationObjectiveTitle | nvarchar | EvaluationObjective | The title of the objective the candidate is being rated on |
| EvaluationElementTitle | nvarchar | EvaluationElementRatingResult | The title of the sub objective the candidate is being rated on |
| RatingResultTitle | nvarchar | EvaluationElementRatingResult | An identifier for the rating result of the evaluation |
| Rating | decimal (6,3) | EvaluationElementRatingResult | The numeric rating value for the evaluation given to a candidate |
