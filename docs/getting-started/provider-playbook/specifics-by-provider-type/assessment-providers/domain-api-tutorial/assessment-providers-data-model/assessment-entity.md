# Assessment Entity

:::info Key Concepts

* The assessment entity captures two main kinds of information: general information about the assessment itself and metadata on what values to expect in the student results. These latter data points frame what to expect.
* The assessment domain focuses on capture and interpretation of student results, and not portability of assessments or question banks, "click stream" information from test sessions, etc.

:::

The Assessment entity is the record of an assessment instrument: a benchmark, test, quiz or other evaluation of student learning or competencies. As such, it does not contain any student result, but it does provide information on what to expect to find in student results (StudentAssessments). A few of the most common elements on Assessment are below:

| Element | Definition |
| --- | --- |
| title | title or name of the assessment |
| version | version identifier for the assessment |
| revisionDate | date of most recent revision |
| performanceLevels | a collection of the possible overall summative indicators of the student's performance on the assessment - e.g. "passed", "met expectations", "at grade level", etc. |
| scores | a collection of scores to be expected from the assessment |

Note that we did not include the key fields in this list (for info on that, please refer to the previous section). There are a number of other elements on the entity - these are just the most commonly used. As you will note, there are two kinds of metadata:

1. Information about the assessment in general
2. Metadata that frames what data to expect in the StudentAssessment results: the PerformanceLevels and Score elements above

Subsequent sections will look in more detail at the PerformanceLevel and Score elements. For now, note that these define what kinds of results to expect in the student data.

The data elements in #2 can be used to help define how a result is analyzed or presented to a user. For example, if an assessment has 4 PerformanceLevels, software code might create a graph with 4 columns to show the distribution of a classroom of students across those 4 levels. Likewise, the Score element can contain boundary information (e.g. min, max) that can be used to further understand or display results.

```json
{
    "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
    "namespace": "http://mathwhale.com",
    "title": "Benchmark 3 – Math 3rd/Common Core - Operations and Algebraic Thinking A.A",
    "version": 2142,
    "revisionDate": "2018-01-01",
    "performanceLevels": [...],
    "scores": [...]
}
```

## What is Not Covered by the Assessment Entity

As we learned earlier, the assessment domain model is not optimized for solving issues like portability of assessment items, scoring algorithms, "click stream" data of a student's test session and so on, so the Assessment entity is not intended to solve the problem of portability of tests between systems.

However, the domain does attempt to capture data that might be useful in the interpretation of student results.
