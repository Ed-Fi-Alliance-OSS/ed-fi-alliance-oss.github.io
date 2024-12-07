# Assessment Collection

## Introduction

The assessment collection was built help answer the question:

> Are students improving in _\[content area e.g. reading, math, science\]_ over
> time _\[timeframe e.g. within a school year, over three years, over last
> year\]_?  

The views are intended to simplify presenting interoperable multiple measures
assessment data.  The views also provide reference to the associated learning
standards, scoring, and performance levels.  These metrics can be viewed across
summative, interim, or other benchmark assessments.

## Views in this Collection

* [AssessmentFact](./asmt_assessmentfact.md)
* [StudentAssessmentFact](./asmt_studentassessmentfact.md)

The assessment collection comprises two Fact tables focused on assessments.

The first fact table is called
[AssessmentFact](./asmt_assessmentfact.md) and
this view combines the granularity of the assessment found in the assessment and
objective assessment table as well as the assessment's association with learning
standards.  Finally,
the [AssessmentFact](./asmt_assessmentfact.md) table
has denormalized summary information related to descriptions and reporting
methods.

The second fact table is
called [StudentAssessmentFact](./asmt_studentassessmentfact.md) and
this fact table summarizes the students' results of each assessment.  The fact
table consolidates each student's reporting results and associates that
information in a similar structure
as [AssessmentFact](./asmt_assessmentfact.md).  

![Assessment Collection](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Assessment%20Collection.png)

## Installation

Install using the option code "ASMT"

`.\EdFi.AnalyticsMiddleTier.Console.exe` `-c` `"..."` `-o` `ASMT`

For more information, see the [AMT Deployment
Guide](../../../deployment-guide/readme.mdx).

## Example Queries

```sql title="Scale Scores for 6th Grade Assessments"
select
     asmt_StudentAssessmentFact.AssessmentKey,
     asmt_StudentAssessmentFact.StudentSchoolKey,
     asmt_StudentAssessmentFact.ResultDataType,
     asmt_StudentAssessmentFact.StudentScore,
     asmt_StudentAssessmentFact.PerformanceResult
from
     analytics.asmt_StudentAssessmentFact
WHERE
     ReportingMethod = 'Scale Score'
AND AssessedGradeLevel = 'Sixth grade'
```

```sql title="List of Overall Assessments"
select
     asmt_AssessmentFact.Title,
     asmt_AssessmentFact.[Version],
     asmt_AssessmentFact.AcademicSubject,
     asmt_AssessmentFact.Category
from
     analytics.asmt_AssessmentFact
where
     asmt_AssessmentFact.ParentObjectiveAssessmentKey is null
```
