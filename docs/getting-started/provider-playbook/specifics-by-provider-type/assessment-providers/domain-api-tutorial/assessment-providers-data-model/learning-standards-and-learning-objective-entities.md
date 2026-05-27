# Learning Standards and Learning Objective Entities

## Domain Entities and an Important Recommendation

Academic learning standards, such as those published by state departments of education, are a powerful organizing force to measure curricular progress. In the Ed-Fi Data Model, there are two entities that capture this information.

* **LearningStandards** capture the formal expression of a learning standard as published by a standards body or technology provider
* **LearningObjectives** capture groupings of standards into larger standards

**Pro Tip:** Wherever possible, we recommend using the LearningStandards entity and not the LearningObjective entity. The LearningObjective entity is provided mostly for backwards compatibility. It has been useful in some modeling situations, but mostly it has emerged as a duplicate of the LearningStandard entity.

Before we drill down on these entities, it is helpful to understand what is and is not covered in this part of the model.

## Academic Standards in Ed-Fi

In the Ed-Fi Model, it is probably as important to understand what the data model does **not** capture as what it does.

The Ed-Fi elements that capture curricular alignment exist primarily so that student assessment and other curricular results can be indexed to important curricular goals. The domain entities, however, are not intended to provide all data associated with management and maintenance of academic standards by an agency (or other standards body) over time.

As such, the Ed-Fi Data Model is not optimized to capture these kinds of data:

* The history of academic standards at use in an agency (e.g. concepts like which year they were in effect, if they are expired, if they were versioned or "replaced" by a new standard, etc.)
* The packaging or organization of standards into standards documents
* A full "cross-walk" model that relates standards published by one organization to other standards published by another organization
* Relationships between specific academic standards (such as equivalency, relates to, "is part of", etc.)1

## Using LearningStandards in the Assessment API

Generally, most APIs are pre-configured with learning standards data published by the state education agency or other academic standards bodies important to an education agency. This data is often put there through some other process. So in most cases, the only work to be done is to reference the standards at play.

To return to the sample data report, we saw in previous sections that the sample was organized into a number of ObjectiveAssessments, and that each ObjectiveAssessment corresponds to a learning standard.

![MathWhale objective assessment](https://edfi.atlassian.net/wiki/download/thumbnails/22905208/mathwhale-objassessment.png?version=2&modificationDate=1561126822437&cacheVersion=1&api=v2&width=746&height=291)

_Figure 1: the learning standards (surrounded in a red box)._

To complete our mapping, we need to add the reference from each ObjectiveAssessment to the LearningStandard.

Note that in this case, we are not writing/creating LearningStandards; we are just referencing existing ones. The LearningStandard entity has a field called LearningStandardId that is the natural key for the entity, and is the field we need to use to refer to the LearningStandard. That reference will look like this:

```json
"learningStandardReference": {
    "learningStandardId": "string"
}
```

The actual value for the LearningStandard field will be defined by the API implementation, so you need to work with the API host to ensure that the references you write will refer to existing entities. If not, the transaction may fail.

In most cases, these references will be a GUID that is used by many in the ecosystem to uniquely identify the learning standard, and will be a long alphanumeric string that has a format and looks like this: "a69323d4-0995-42fd-9410-93fd817b14ab"

The final ObjectiveAssessment entity will look something like this, with the LearningStandard reference for this Objective Assessment in place:

```json
{
    "assessmentReference": {
      "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
      "namespace": "http://mathwhale.com",
      }
    },
    "identificationCode": "3.0A.A",
    "learningStandards": [
        {
            "learningStandardReference": {
                "learningStandardId": "a69323d4-0995-42fd-9410-93fd817b14ab"
            }
        }
    ]
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

If an API host is using other identifiers for LearningStandardId, such as the strings above that appear in the actual sample score report (e.g. "3.0A.A.1") it is a good idea to work with the API host to establish where those identifiers come from and how both you and they can establish a stable relationship to a common source for curricular alignment information.

1. The LearningStandards API resource does have two references on it that capture a couple of relationships between standards. Those are ParentLearningStandard and PrerequisiteLearningStandard. However, these stop well short of being a full reflection of the possible relationships at use in the K12 ecosystem.
