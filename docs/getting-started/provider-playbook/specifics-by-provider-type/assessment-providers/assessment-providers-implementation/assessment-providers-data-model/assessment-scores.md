# Assessment Scores

:::info Key Concepts
The Scores element is used to capture student scores on an assessment. Most assessments will have several of these.
:::

If we look at the original sample score report, we will see that the assessment has some aggregate scores that encapsulate overall performance on the benchmark. There is an overall score and a percentile, which also has a z-score. The Assessment.Score element captures data on the scores that will be provided.

 ![screenshot scores](https://edfi.atlassian.net/wiki/download/thumbnails/22905192/scores.png?version=2&modificationDate=1561126783963&cacheVersion=1&api=v2&width=234&height=218)

Figure 1: scores on the sample score report_

In this fictitious assessment, the overall score is just a typical percentage of items correct, so we can capture that as follows:

```text
Score
    AssessmentReportingMethodType: Raw score
    MinimumScore: 0
    MaximumScore: 100
    ResultDatatypeType: Integer
```

 The percentile score is a bit different, and would be represented as follows:

```text
Score
    AssessmentReportingMethodType: Percentile
    MinimumScore: 1
    MaximumScore: 99
    ResultDatatypeType: Integer
```

There is a z-score (measures the percentile deviation from the mean) which we can capture as well\[1\]:

```text
Score
    AssessmentReportingMethodType: Z-score
    MinimumScore: -10[1]
    MaximumScore: 10
    ResultDatatypeType: Decimal
```

The full JSON data – presented within the Assessment entity – would look at follows:

```json
{
  "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
  "namespace": "http://mathwhale.com",
  "title": "Benchmark 3 – Math 3rd/Common Core - Operations and Algebraic Thinking A.A",
  "revisionDate": "2018-01-01",
  "scores": [
    {
      "assessmentReportingMethodType": "Raw score",
      "resultDatatypeType": "Integer",
      "minimumScore": "0",
      "maximumScore": "100"
    },
    {
      "assessmentReportingMethodType": "Percentile",
      "resultDatatypeType": "Integer",
      "minimumScore": "1",
      "maximumScore": "99"
    },
    {
      "assessmentReportingMethodType": "Z-score",
      "resultDatatypeType": "Decimal",
      "minimumScore": "-10",
      "maximumScore": "10"
    },
  ]
}
```

1. In full disclosure, the author here is not statistics-sophisticated enough to know if it is possible to have z-score beyond this limit, but it would certainly be rare indeed. Please feel free send in suggestions for better limits here.
