# Performance Levels

:::info
The PerformanceLevel element is used to capture information on the various thresholds or "levels" of student knowledge or skills, to which the student results will be assigned.
:::

It is common in assessments for providers or others to set standard thresholds for student achievement. There are endless possibilities, including:

* pass/fail
* mastery/some mastery/no mastery
* A/B/C/D/F
* made progress/did not make progress
* poor/good/excellent
* above grade level/on grade level/below grade level
* 3rd grade equivalent/4th grade equivalent

And on and on. Clearly, there is no end to the possible permutations. The Ed-Fi assessment model captures this info through the concept of "performance levels", which are modeled in the API as arrays of PerformanceLevel objects.

To return to the last section where we were modeling an Objective Assessment, note that the score report has a set of standardized values it communicates for mastery on each of the items.

![performance levels](https://edfi.atlassian.net/wiki/download/thumbnails/22905196/mathwhale-performancelevels.png?version=2&modificationDate=1561126804640&cacheVersion=1&api=v2&width=737&height=419)

_Figure 1: the sample report has 3 performance levels denoted by "M", "S" or "N" which identify the level of mastery on each sub-element of the assessment._

To capture this metadata about the assessment, we use the PerformanceLevel object. In the Objective Assessment, that object appears as an array of three objects and looks like this:

```json
{
    "assessmentReference": {
      "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
      "namespace": "http://mathwhale.com",
      }
    },
    "identificationCode": "3.0A.A",
 "performanceLevels" : [
        {
            "assessmentReportingMethodType": "Mastery level",
            "performanceLevelDescriptor": "uri://mathwhale.com/PerformanceLevel/Mastery"
        },
        {
            "assessmentReportingMethodType": "Mastery level",
            "performanceLevelDescriptor": "uri://mathwhale.com/PerformanceLevel/Some mastery"
        },
        {
            "assessmentReportingMethodType": "Mastery level",
            "performanceLevelDescriptor": "uri://mathwhale.com/PerformanceLevel/No mastery"
        },
 ]
  }
```

Note that the PerformanceLevels here are scoped within the namespace "mathwhale.com" indicating that these are Math Whale defined definitions. This seems appropriate, as they are the ones defining and sending the values. However, there may be cases in which the API defines the values to use.  We will cover these cases in a later section: [Enumerations (Descriptors)](../../../../../provider-playbook/implementation/ed-fi-api-fundamentals/enumerations-descriptors.md).
