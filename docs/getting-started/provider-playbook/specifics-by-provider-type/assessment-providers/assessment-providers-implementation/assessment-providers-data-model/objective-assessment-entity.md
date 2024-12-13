# Objective Assessment Entity

:::info Key Concepts
The ObjectiveAssessment entity is used to capture the concept of sub-assessments or sub-test that are testing more specific student skills or capabilities.
:::

In the Ed-Fi model, ObjectiveAssessments represent sub-scores, "strands" or other aggregate (but non-summative) units within an overall assessment. These are usually not item-level scores, but reflect values that are calculated or derive from a set of item-level responses.

To return to the original sample score report, we can see that the assessment results contain several such sub-scores:

![MathWhale Objective Assessment](https://edfi.atlassian.net/wiki/download/thumbnails/22905200/mathwhale-objassessment.png?version=2&modificationDate=1561126701003&cacheVersion=1&api=v2&width=746&height=291)

_Figure 1: Objective Assessments in the sample score report (denoted by the red rectangle)._

In this case, the assessment is breaking down the report to have a sub-score for each learning standard, denoted by the references "3.0A.A", "3.0A.A.1" etc.

As the ObjectiveAssessment is just metadata, it does not contain the scores themselves - these will be captured in the StudentObjectiveAssessment object in the StudentAssessment API resource.

The JSON for the ObjectiveAssessment might look like this:

```json
{
    "assessmentReference": {
      "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
      "namespace": "http://mathwhale.com",
      }
    },
    "identificationCode": "3.0A.A"
  }
```

In this case, the only required fields are the identity of the entity itself, which is composed of a reference to the Assessment and a IdentificationCode. For the code, we use the value that appears in the report, though if that value is not unique we might select another value (like a system surrogate key).

While this entity is "complete" in the sense that the API will accept it as is, we are not actually done yet. Move onto the next section, [Performance Levels](../assessment-providers-data-model/performance-levels.md), to complete this JSON.
