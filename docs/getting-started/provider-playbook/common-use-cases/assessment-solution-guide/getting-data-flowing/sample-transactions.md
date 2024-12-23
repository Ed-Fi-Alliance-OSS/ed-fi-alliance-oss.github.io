# Sample Transactions

## Example: Creating a Student

Putting the pieces in the above sections together, we can look at the contents
of a sample transaction.

Below is an example of a transaction made by a Student Information System to
create a student.

```none title="Request"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/students"
accept: application/json
Content-Type: application/json
authorization: Bearer 20ea10c525354cdaa32aacfb71bc2ff8
{
    "studentUniqueId": "6048999",
    "birthDate": "2009-07-22",
    "firstName": "Julie",
    "lastSurname": "Martinez",
    "middleName": "Macon"
}
```

In this example, you can see that this is a POST operation, so is creating a new
Student API resource.  There is an authorization token in the HTTP header
("Bearer 20ea10c525354cdaa32aacfb71bc2ff8"), and then the actual contents of the
new Student record, in JSON format.

:::info

You can paste this JSON into the API Swagger interface for the /student API
resource and run it – see the section [Online API Documentation and Sandbox -
Assessment-VDG](./online-api-documentation-and-sandbox.md) and follow the
instructions to authorize and try it out.

:::

A response from the API sent back would look as follows:

```none title="Response"
201
access-control-allow-origin: *
access-control-expose-headers: *
connection: keep-alive
content-length: 0
date: Wed07 Apr 2021 17:21:27 GMT
etag: "5249220147305124204"
location: https://api.ed-fi.org:443/data/v3/ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66
```

This is an empty response with only HTTP headers and no body message (a few
headers have been removed to allow us to focus on the ones most important to our
discussion).

* The 201 code indicates that the request was successful and the API resource
    was created.
* The location field returns the resource ID for the new entity – in this case:
    918bb778138b4ab2a44e599fbcbf7f66. A GET request to
    /ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66 would return the entity
    that was just created.
* Other elements —  such as an [ETag](https://en.wikipedia.org/wiki/HTTP_ETag)
    and timestamp — are also provided. Generally these are not needed by most
    applications.

## Example: Creating an Assessment

An assessment provider system wanting to transmit assessment data would first
POST to the **assessments** API resource.

Note that the **assessment** API resource does not represent the student
results: it is just the template for the overall assessment results that will be
sent subsequently.

```none title="Request - Creating an Assessment"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/assessments"
accept: application/json
Content-Type: application/json
authorization: Bearer 10ea10c425353cdaa32aacfb71bc2ef6
{
    "assessmentIdentifier": "19bcfe00-9c75-4d4f-ac2c-706e7379070f",
    "namespace": "uri://assessmentprovider.com",
    "assessmentCategoryDescriptor": "uri://ed-fi.org/AssessmentCategoryDescriptor#Benchmark test",
    "assessmentTitle": "3rd Grade Reading 2nd Six Weeks 2021-2022",
    "assessmentVersion": 2019,
    "maxRawScore": 10,
    "revisionDate": "2019-10-24",
    "academicSubjects": [
        {
            "academicSubjectDescriptor": "uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts"
        }
    ],
    "assessedGradeLevels": [
        {
            "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Third grade"
        }
    ],
    "languages": [
        {
            "languageDescriptor": "uri://ed-fi.org/LanguageDescriptor#eng"
        }
    ],
    "performanceLevels": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Met Standard",
            "maximumScore": "10",
            "minimumScore": "7",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        },
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Unsatisfactory",
            "maximumScore": "6",
            "minimumScore": "0",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        }
    ],
    "scores": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "maximumScore": "10",
            "minimumScore": "0",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        }
    ]
}
```

This example of a POST showcases a few more advanced elements of a Ed-Fi
transaction.

* In this example, you can see an example of how Ed-Fi handles controlled
    vocabularies via the string
    "[uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw] score". These are
    called "descriptors" in Ed-Fi, and you can read more about them in the
    upcoming section [Descriptors](../understanding-ed-fi-apis/descriptors.md).
* Also present here is an example of date formatting - read more on that in the
    section [Date and DateTime
    Formats](../understanding-ed-fi-apis/date-and-datetime-formats.md).

Note also that to POST this successfully, the namespace value here
("uri://assessmentprovider.com") must match the namespace assigned to the API
client making the POST (see [Authorization - Authorization via Relationship to a
Namespace](./authorization.md) for more information).

## Creating an Objective Assessment

Once there is an **assessment** defined, the next common practice is to define
the component score parts of the assessment.

In the Ed-Fi model, assessments are divided into sub-parts called
**ObjectiveAssesssments**. These are not the literal sections of the assessments
(e.g., question 1-6, questions 7-12, etc.), but refer to the sub-scores or
objectives assessed as part of the overall assessment.

It is also via **ObjectiveAssesssments** that connections are made to formal
**LearningStandards**, such as the state-sponsored standards reflecting
expectations of student content mastery by grade level.

```none title="Request - Creating an Objective Assessment"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/objectiveAssessments"
accept: application/json
Content-Type: application/json
authorization: Bearer 10ea10c425353cdaa32aacfb71bc2ef6
{
    "assessmentReference": {
        "assessmentIdentifier": "19bcfe00-9c75-4d4f-ac2c-706e7379070f",
        "namespace": "uri://assessmentprovider.com"
    },
    "identificationCode": "GB-CCSS.ELA-LITERACY.RL.3.1",
    "academicSubjectDescriptor": "uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts",
    "maxRawScore": 10,
    "percentOfAssessment": 1.0,
    "learningStandards": [
        {
            "learningStandardReference": {
                "learningStandardId": "CCSS.ELA-LITERACY.RL.3.1"
            }
        }
    ],
    "performanceLevels": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Met Standard",
            "maximumScore": "10",
            "minimumScore": "7",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        },
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Unsatisfactory",
            "maximumScore": "6",
            "minimumScore": "0",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        }
    ],
    "scores": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "maximumScore": "10",
            "minimumScore": "0",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
        }
    ]
}
```

In this example, you can see **references** to other API resources: notably to
an assessment via **assessmentReference**. This assessment resource must exist
in the API or the transaction will be rejected by the API. You will also note
that the reference is made via the natural key to the resource and not the REST
id — you can read about this in the upcoming section [API Resource
Keys](../understanding-ed-fi-apis/api-resource-keys.md).

## Example: Creating an Student Assessment Result

To complete the example, a system wanting to transmit assessment data would POST
to **studentAssessments** API resource.

In this resource we find the actual **scores** and **performanceLevels**, tied
to both the overall **assessment** as well as to **objectiveAssesssments**. And
from **objectiveAssessment**, the results tie back to the state-endorsed
standards (see example above).

```none title="Request - Creating an Student Assessment Result"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/studentAssessments"
accept: application/json
Content-Type: application/json
authorization: Bearer 10ea10c425353cdaa32aacfb71bc2ef6
{
    "studentAssessmentIdentifier": "string",
    "assessmentReference": {
        "assessmentIdentifier": "19bcfe00-9c75-4d4f-ac2c-706e7379070f",
        "namespace": "uri://assessmentprovider.com"
    },
    "schoolYearTypeReference": {
        "schoolYear": 2021
    },
    "studentReference": {
        "studentUniqueId": "6048999"
    },
    "administrationDate": "2021-05-12T17:27:08.943Z",
    "administrationEndDate": "2021-05-12T17:27:08.943Z",
    "performanceLevels": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Met Standard",
            "performanceLevelMet": true
        }
    ],
    "scoreResults": [
        {
            "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
            "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer",
            "result": "8"
        }
    ],
    "studentObjectiveAssessments": [
        {
            "objectiveAssessmentReference": {
                "assessmentIdentifier": "19bcfe00-9c75-4d4f-ac2c-706e7379070f",
                "identificationCode": "GB-CCSS.ELA-LITERACY.RL.3.1",
                "namespace": "uri://assessmentprovider.com"
            },
            "performanceLevels": [
                {
                    "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Raw score",
                    "performanceLevelDescriptor": "uri://ed-fi.org/PerformanceLevelDescriptor#Met Standard",
                    "performanceLevelMet": true
                }
            ]
        }
    ]
}

```
