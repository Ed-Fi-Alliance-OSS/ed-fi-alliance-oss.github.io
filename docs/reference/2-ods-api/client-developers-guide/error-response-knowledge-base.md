# Error Response Knowledge Base

The Ed-Fi ODS/API adheres to the REST principles when responding to HTTP
requests, including the use of standard status codes in HTTP responses.
Beginning with version 7.2, the ODS/API implements the [Problem Details RFC
9457](https://www.rfc-editor.org/rfc/rfc9457.html). This standardizes API error
responses and enables machine-readable error details within the HTTP response
content.

The following fields included in the API error response are noteworthy:

* `**type**`: This field uniquely identifies the error type as specified in
    RFC 9457. `type` is defined as a URI where each segment represents a level
    in the hierarchy into which the errors types are organized. For example,
    `urn:ed-fi:api:security:authorization:access-denied:resource` and
    `urn:ed-fi:api:security:authorization:access-denied:action` identify
    specific issue types within the context of an authorization error.

* `**detail**`: The `detail` field provides a user-friendly description of the
    encountered issue.

* **`validationErrors`**: In the case of bad request errors, the response
    includes a `validationErrors` extension member. This member contains JSON
    paths to each field with an error in the request JSON. All data validation
    errors are reported in a single response rather than progressively, reducing
    the number of attempts during data submission.

* **`errors`**: Sometimes, additional details are provided in the `errors`
    extension member. This allows for supplementary descriptions aimed at API
    client developers and API hosts to facilitate the identification and
    resolution of errors.

* **`correlationId`**: This field allows traceability of the specific
    occurrence of the error and connects error response to entries in the API
    errors logs.

:::tip

The `type`, `detail`, and `validationErrors` fields help end-users
resolve data submission problems and report the `correlationId` for issues
needing escalation. The `errors` field aids the API hosting provider or
development team in identifying the error’s root cause.

:::

This document aims to catalog most of the Ed-Fi ODS/API error responses,
supplemented with additional notes (where applicable) to provide source system
users and application developers with insights into how to handle each situation
effectively.

:::tip

Each example below provides a brief description of the problem, a sample HTTP
request, and a comment about how to resolve. Broadly speaking, there are three
possibilities for error resolution:

1. The problem may exist in application code → send to the application
   development team for resolution.
2. It could be on the hosting side → report to the hosting provider / IT
   Operations team for resolution.
3. Missing or invalid source system data → report to an appropriate application
   user to correct the data and resubmit.

:::

## 400 Bad Request

### urn:ed-fi:api:bad-request:data-validation-failed:key-change-not-supported

#### Identifying values for the resource cannot be changed

A PUT request can update natural key fields on specific resources. If the
resource does not permit changes to its key, the PUT request will fail. Natural
key fields are identified in OpenAPI metadata with

`x-Ed-Fi-isIdentity` [specification
extension](https://swagger.io/docs/specification/openapi-extensions/). PUT
actions that permit updating natural key fields are marked with
the `x-Ed-Fi-isUpdatable` specification extension.

##### Example

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/programs/092a2f5eaaa5491aa575ffdd5ec662ef
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
    "educationOrganizationReference": {
      "educationOrganizationId": 255901
    },
    "programName": "Bilingual Summer - Updated",
    "programTypeDescriptor": "uri://ed-fi.org/ProgramTypeDescriptor#Bilingual Summer",
    "programId": "2"
}
```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Identifying values for the Program item cannot be changed. Delete and recreate the item instead.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed:key-change-not-supported",
  "title": "Key Change Not Supported",
  "status": 400,
  "correlationId": "94bd4093-faab-4bba-8d02-4ddd5d1cd97f"
}
```

:::tip Problem is in the application code → send to application development
team for resolution.

* Review the Swagger UI documentation to find all Identity fields
* Review the Swagger UI documentation to verify if the resource supports
    changes identity fields
:::

#### Resource identifiers cannot be assigned by the client

A POST request should not contain an `id`  value. This value is auto-assigned by
the API application.

##### Example

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "id": "a49a738b92b74a94a91ac7fa3bb19b15",
  "codeValue": "Bereavement",
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor",
  "shortDescription": "Bereavement"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "The request data was constructed incorrectly.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "6ea8c4b1-3fa4-42d8-8a19-608866169237",
  "errors": [
    "Resource identifiers cannot be assigned by the client. The 'id' property should not be included in the request body."
  ]
}

```

:::tip

Problem is in the application code → send to application development
team for resolution.

* Remove the `id`  value from the payload when POSTing a request.
*

:::

#### Missing a Required Property

The data model for every endpoint includes one or more required property /
field.

##### Example: missing one required property, `codeValue`

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor",
  "shortDescription": "Bereavement"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "27c1a389-8714-423a-a049-a8d9aa7188a7",
  "validationErrors": {
    "$.codeValue": [
      "CodeValue is required."
    ]
  }
}

```

##### Example: missing two required properties, `codeValue`  and `shortDescription`

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "486c1ae7-5bd4-4f12-83cd-804b8e6f57d8",
  "validationErrors": {
    "$.codeValue": [
      "CodeValue is required."
    ],
    "$.shortDescription": [
      "ShortDescription is required."
    ]
  }
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Review the detailed error message, which includes the fields error applies
    to.
* Review the Swagger UI documentation to find required fields.
* Each data model is available in a collection at the bottom of the page, or
    you can expand the various HTTP requests and find the model embedded
    within it. Example:
    ![Data Model](/img/reference/ods-api/image2024-4-19_16-8-9.png)

:::

#### String Length Validation Error

The Ed-Fi Data Model prescribes a maximum string length in many cases. The
application code needs to truncate strings to fit, if they are larger than the
data model's allowed length.

##### Example: `codeValue` is longer than 50 characters

Http Request

```
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "codeValue": "Bereavementddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  "shortDescription": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "5922d868-ba68-472a-9317-d36d640ce362",
  "validationErrors": {
    "$.codeValue": [
      "CodeValue must be at most 50 characters in length."
    ]
  }
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Review the detailed error message, which includes the max length value and
    which field it applies to.
* For proactive analysis, review the Swagger UI documentation to find other
    maximum string lengths.
* Each data model is available in a collection at the bottom of the page, or
    you can expand the various HTTP requests and find the model embedded
    within it. Example:
    ![Data Model](/img/reference/ods-api/image2024-4-19_16-8-9.png)

:::

#### Non-Compliant JSON Body

What happens if the JSON body on a POST or PUT request is not valid? Generally,
you get a detailed message telling you exactly where to look for the error.

##### Example

An extra comma after the `schoolId` value. One trailing comma is
fine, but two is an error.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/academicWeeks
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "weekIdentifier": "one",
  "schoolReference": {
    "schoolId": 17012391,,
  },
  "beginDate": "2023-09-11",
  "endDate": "2023-09-11"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "9be25ce0-1333-4bee-b5b3-d98370441283",
  "validationErrors": {
    "$.schoolReference.schoolId": [
      "Invalid property identifier character: ,. Path 'schoolReference.schoolId', line 4, position 25."
    ],
    "$.schoolReference.schoolId.schoolReference": [
      "Invalid property identifier character: ,. Path 'schoolReference.schoolId', line 4, position 25."
    ]
  }
}

```

##### Example: missing closing curly brace before `beginDate`

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/academicWeeks
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "weekIdentifier": "one",
  "schoolReference": {
    "schoolId": 17012391,

  "beginDate": "2023-09-11",
  "endDate": "2023-09-11"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "bab81165-44ca-4c42-af43-daf0109b9b5d",
  "validationErrors": {
    "$.schoolReference": [
      "Unexpected end when deserializing object. Path 'schoolReference', line 8, position 1."
    ]
  }
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Review the code for building the JSON payload.
* Ideally use an object serializer rather building JSON by hand.

:::

#### Integer Overflow

Most integers in an Ed-Fi API resource are Int32 (max value: 2,147,483,647),
though a few may be Int64 starting with ODS/API 7.0 (max
value:9,223,372,036,854,775,807).

##### Example

When `communityOrganizationId` is set to a too large value to hold
in `Int64` field

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/communityOrganizations
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
    "communityOrganizationId": 25590111111122222222222222222222222222222,
    "nameOfInstitution": "Communities in Schools",
    "shortNameOfInstitution": "CIS",
    "addresses": [],
    "categories": [
      {
        "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#Other"
      }
    ],
    "identificationCodes": [
      {
        "educationOrganizationIdentificationSystemDescriptor": "uri://ed-fi.org/EducationOrganizationIdentificationSystemDescriptor#SEA",
        "identificationCode": "19"
      }
    ]
  }

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "a0d880d3-8698-4f68-8a07-b5c8688ebc2e",
  "validationErrors": {
    "$.communityOrganizationId": [
      "Error converting value 25590111111122222222222222222222222222222 to type 'System.Int64'. Path 'communityOrganizationId', line 2, position 72."
    ]
  }
}

```

#### Excessive String Length

Many properties that take a string value have a maximum length associated with
them.

##### Example

`rating`  on `accountabilityRatings` has a max length of 35
characters.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/accountabilityRatings
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "schoolYearTypeReference": {
    "schoolYear": 2014
  },
  "ratingTitle": "0eo0nvikbcrieawaybmhipgao8sjnxgl",
  "rating": "This has more than 35 characters in it"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "d1f1a774-93f9-4c4a-80a8-d3cd3d950513",
  "validationErrors": {
    "$.rating": [
      "Rating must be between 1 and 35 characters in length."
    ]
  }
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Ensure that a non-empty payload is being transmitted.
* Ensure that all required properties are included in that payload.

:::

#### Empty Request Body

In the previous example, the request _does_ have a body, it just doesn't have
any properties in it. What happens if you don't send a body at all?

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/schools
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8



```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
    "detail": "The request could not be processed. See 'errors' for details.",
    "type": "urn:ed-fi:api:bad-request",
    "title": "Bad Request",
    "status": 400,
    "correlationId": "5eb5ee73-ca29-4af3-b6f9-67f81087128a",
    "errors": [
        "A non-empty request body is required."
    ]
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Ensure that a JSON payload is generated and attached to the POST or PUT
    command.

:::

#### Transmitting in the Wrong Character Encoding

The Ed-Fi ODS/API expects UTF-8 character encoding. In the following example,
the `content-type`  is set as UTF-16, but the content is actually in UTF-8.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/accountabilityRatings
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "schoolYearTypeReference": {
    "schoolYear": 2014
  },
  "ratingTitle": "0eo0nvikbcrieawaybmhipgao8sjnxgl",
  "rating": "This has more than 35 characters in it"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

 "detail": "The request could not be processed. See 'errors' for details.",
    "type": "urn:ed-fi:api:bad-request",
    "title": "Bad Request",
    "status": 400,
    "correlationId": "02951ccd-c52e-477b-8aa9-614c07dae495",
    "errors": [
        "Unexpected character encountered while parsing value: ൻ. Path '', line 0, position 0."
    ]
}
```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* Make sure the `content-type`  is UTF-8, not anything else.

:::

#### Potentially Dangerous Value

Un-escaped HTML will be rejected in the validation process, as a protection for
avoiding potential cross-site scripting attacks against other applications that
consume data from the Ed-Fi ODS/API.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/accountabilityRating
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "schoolYearTypeReference": {
    "schoolYear": 2014
  },
  "ratingTitle": "0eo0nvikbcrieawaybmhipgao8sjnxgl",
  "rating": "<script>alert('hello world!')</script>"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "0300251b-58ae-4974-9f13-37a1f76643af",
  "validationErrors": {
    "$.rating": [
      "Rating must be between 1 and 35 characters in length.",
      "Rating contains a value that could be dangerous for downstream systems using this data. Try to avoid the use of special symbols like '<', '>' or '&' without surrounding spaces."
    ]
  }
}

```

:::tip

Problem is in the application code → send to application development
team for resolution.

* Encode the < character as &lt;

```text
"rating": "&lt;script>alert('hi')&lt;/script>"
```

Also, it might be good to take this up with your internal security team, as
this may mean that a source system user is trying to perform a malicious
injection attack on your application.

:::

#### Leading or Trailing Whitespace in Natural Key String

Strings that compose the natural key on a resource cannot have a space in the
initial or last position of the string.

##### Example: `ratingTitle` contains leading and trailing white spaces

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/accountabilityRating
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "schoolYearTypeReference": {
    "schoolYear": 2014
  },
  "ratingTitle": " rating title ",
  "rating": "rating9"
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "b1aeec40-f708-4217-80f4-195b7507f049",
  "validationErrors": {
    "$.ratingTitle": [
      "RatingTitle cannot contain leading or trailing spaces."
    ]
  }
}

```

:::tip

Problem is in the client application code → send to application
development team for resolution.

* If the source system allows this, then strip spaces from the front or back
    of the string.

:::

#### No Item in Required Array

Some resources have required arrays / collections on them. The error message is
specific to the circumstance of an empty array in the JSON payload.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/bellSchedules
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "bellScheduleName": "one",
  "classPeriods": [],
  "schoolReference": {
    "schoolId": 255901
  }
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "c3f52d08-d84c-430a-8523-014a5a47c5d2",
  "validationErrors": {
    "$.classPeriods": [
      "BellScheduleClassPeriods must have at least one item."
    ]
  }
}
```

#### Missing a Required Property on an Item in a Collection

Some resources have collections (arrays) of information, and the model for that
collection may include required fields. The error message will help guide you
not only to the field, but also which entry in the collection has the problem.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/assessments
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "assessmentIdentifier": "_01774fa3-06f1-47fe-8801-c8b1e65057f3_",
  "namespace": "uri://ed-fi.org/Assessment/Assessment.xml",
  "assessmentCategoryDescriptor": "uri://ed-fi.org/AssessmentCategoryDescriptor#Benchmark test",
  "assessmentTitle": "3rd Grade Reading 1st Six Weeks 2021-2022",
  "academicSubjects": [
    {
      "academicSubjectDescriptor": "uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts"
    }
  ],
  "identificationCodes": [
    {
      "assessmentIdentificationSystemDescriptor": "uri://ed-fi.org/AssessmentIdentificationSystemDescriptor#Test Contractor",
      "identificationCode":  "01774fa3-06f1-47fe-8801-c8b1e65057f3"
    }
  ],
  "scores": [
    {
      "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Percentile",
      "maximumScore": "99",
      "minimumScore": "1",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
    },
    {
      "maximumScore": "10",
      "minimumScore": "0",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
    }
  ],
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8


{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "f3caf6e9-a1dd-4441-bfca-c524079585dc",
  "validationErrors": {
    "$.scores[1].assessmentReportingMethodDescriptor": [
      "AssessmentReportingMethodDescriptor is required."
    ]
  }
}

```

:::tip

Problem is in the application code → send to application development
team for resolution.

* Review the model definition.
* The error message points to item `[1]` ;  in zero-based indexing, that is
    the second entry. Note that there is a "typo" with an underscore at the
    beginning of the `assessmentReportingMethodDescriptor`  key.

:::

#### Key Unification Error

Due to the [Key Structure in the Ed-Fi ODS /
API](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18811816), a
single resource may contain a certain property, and it may reference another
object that has that same property. Often, the two values should be the same for
consistency. We call this "key unification". The example below has some
interesting features:

* The school year and school Id at the root of the object should match those
    values found in the calendar reference (example of unification)
* There is also "class of" school year - naturally, this will be different,
    since it represents the expected graduation date of the student.
* Finally, there is a graduation plan that also has a school year. Typically
    one would expect that the graduation plan year would match the class of
    school year - but conceivably these may differ at times. A student might
    nominally be in a particular class, but planning on graduating early.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentSchoolAssociations
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "schoolYearTypeReference": {
     "schoolYear": 2023
   },
  "calendarReference": {
    "calendarCode": "2010605675",
    "schoolYear": 2022,
    "schoolId": 255901107
  },
  "classOfSchoolYearTypeReference": {
    "schoolYear": 2027
  },
  "schoolReference": {
    "schoolId": 338978318
  },
  "studentReference": {
    "studentUniqueId": "8y0mfuzfnffmdk00sgizqy5sj80kvanm"
  },
  "entryDate": "2023-03-18",
  "entryGradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#First grade",
  "graduationPlanReference": {
    "educationOrganizationId": 17012391,
    "graduationPlanTypeDescriptor": "uri://ed-fi.org/GraduationPlanTypeDescriptor#Standard",
    "graduationSchoolYear": 2020
  }
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "223140e5-0839-43c1-8813-c92a0d995abe",
  "validationErrors": {
    "$.schoolReference.schoolId": [
      "All values supplied for 'schoolId' must match. Review all references and align the following conflicting values: '338978318', '255901107'"
    ],
    "$.calendarReference.schoolId": [
      "All values supplied for 'schoolId' must match. Review all references and align the following conflicting values: '338978318', '255901107'"
    ],
    "$.calendarReference.schoolYear": [
      "All values supplied for 'schoolYear' must match. Review all references and align the following conflicting values: '2022', '2023'"
    ],
    "$.schoolYearTypeReference.schoolYear": [
      "All values supplied for 'schoolYear' must match. Review all references and align the following conflicting values: '2022', '2023'"
    ]
  }
}

```

:::tip

Problem may be in the application code → send to application
development team for resolution.

* Review the model definition.
* Ensure that the right values are being transmitted. However, this
    conceivably might be a source system problem that requires modification by an
    end user, if the source system itself allows for selecting a combination of
    values that are logically inconsistent in this way.

:::

#### Invalid Limit Count

Client applications issuing GET requests, with or without search terms, can
control how many records come back from a request - up to a maximum count. By
default that max count is 500.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentSchoolAssociations
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
    "message": "Limit must be omitted or set to a value between 1 and max value defined in configuration file (defaultPageSizeLimit)."
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
    "detail": "The limit parameter was incorrect.",
    "type": "urn:ed-fi:api:bad-request:parameter-validation-failed",
    "title": "Parameter Validation Failed",
    "status": 400,
    "correlationId": "0a13ceb8-e392-4318-8340-c60d015d25b5",
    "errors": [
        "Limit must be omitted or set to a value between 0 and 500."
    ]
}

```

:::tip

Problem is in the application code → send to application development
team for resolution.

* Change the limit to be no more than 500.
* Reach out to the hosting provider if 500 still generates this error, to
    find out what lower limit they have set.

:::

#### Descriptor Does Not Exist

This error occurs when the HTTP request _structure_ is good, but one or more
descriptor _value_ does not exist.

**Example:** bad descriptor _codeValue_

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentAcademicRecords/d074a26cec7449299f701ba54e0f0257
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
    "educationOrganizationReference": {
      "educationOrganizationId": 255901001
    },
    "schoolYearTypeReference": {
      "schoolYear": 2022
    },
    "studentReference": {
      "studentUniqueId": "604823"
    },
    "termDescriptor": "uri://ed-fi.org/TermDescriptor#Spring Semester Missing",
    "cumulativeEarnedCredits": 13.5,
    "academicHonors": [],
    "diplomas": [],
    "gradePointAverages": [
      {
        "gradePointAverageTypeDescriptor": "uri://ed-fi.org/GradePointAverageTypeDescriptor#Unweighted",
        "gradePointAverageValue": 3.8571,
        "isCumulative": true
      }
    ]
  }

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "f239fe05-d89c-4c2d-9bfd-a42a272e5f30",
  "validationErrors": {
    "$.termDescriptor": [
      "TermDescriptor value 'uri://ed-fi.org/TermDescriptor#Spring Semester Missing' does not exist."
    ]
  }
}

```

##### Example: bad namespace

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentAcademicRecords
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901001
  },
  "schoolYearTypeReference": {
    "schoolYear": 2022
  },
  "studentReference": {
    "studentUniqueId": "604874"
  },
  "termDescriptor": "uri://wrong.org/TermDescriptor#Fall Semester",
  "gradePointAverages": [
    {
      "gradePointAverageTypeDescriptor": "uri://ed-fi.org/GradePointAverageTypeDescriptor#Unweighted",
      "gradePointAverageValue": 4,
      "isCumulative": true
    }
  ]
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "ba257c38-333c-476b-b75c-c76e16db218f",
  "validationErrors": {
    "$.termDescriptor": [
      "TermDescriptor value 'uri://wrong.org/TermDescriptor/TermDescriptor#Spring Semester' does not exist."
    ]
  }
}

```

:::tip

The problem could be in either the application code or in the source
system, depending on how descriptor values are mapped: most systems will have
a mapping from their own code set to Ed-Fi descriptors, but there may be
special cases where an application user is manually entering a value into the
source system user interface.

* Review how the descriptor value is created in the synchronization process
  * is it in code or in the user interface?
* Forward the problem to the appropriate group: application development
    team, or source system users.

:::

### urn:ed-fi:api:profile:invalid-profile-usage

#### Invalid Profile Usage

##### Example 1: PUT/POST request when read-only profile is in use

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/schools/310a0f89ada9413e9e9e46187bb1d10d
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/vnd.ed-fi.school.sample-profile-resource-readonly.readable+jso; charset=utf-8

{
        "localEducationAgencyReference": {
            "localEducationAgencyId": 255901
        },
        "schoolId": 255901044,
        "nameOfInstitution": "Grand Bend Middle School",
        "operationalStatusDescriptor": "uri://ed-fi.org/OperationalStatusDescriptor#Active",
        "shortNameOfInstitution": "GBMS",
        "webSite": "http://www.GBISD.edu/GBMS/",
        "charterStatusDescriptor": "uri://ed-fi.org/CharterStatusDescriptor#Not a Charter School",
        "schoolTypeDescriptor": "uri://ed-fi.org/SchoolTypeDescriptor#Regular",
        "educationOrganizationCategories": [
            {
                "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#School"
            }
        ],
        "gradeLevels": [
            {
                "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Sixth grade"
            },
            {
                "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Seventh grade"
            },
            {
                "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Eighth grade"
            }
        ]
    }

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
    "detail": "The request construction was invalid with respect to usage of a data policy.",
    "type": "urn:ed-fi:api:profile:invalid-profile-usage",
    "title": "Invalid Profile Usage",
    "status": 400,
    "correlationId": "54e1e704-72a4-4bcd-b455-9c483352a84b",
    "errors": [
        "A profile-based content type that is readable cannot be used with PUT requests."
    ]
}
```

### urn:ed-fi:api:profile:invalid-method-usage

#### Invalid Method Usage

Http Request

```text
POST http://localhost:8765/data/v3/ed-fi/schools
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/vnd.ed-fi.school.test-profile-resource-readonly.writable+json; charset=utf-8

{
    "localEducationAgencyReference": {
        "localEducationAgencyId": "255901"
    },
    "schoolId": "124548",
    "nameOfInstitution": "Grand Bend Elementary School",
    "educationOrganizationCategories": [
        {
            "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#School"
        }
    ],
    "gradeLevels": [
        {
            "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Eleventh grade"
        }
    ]
}

```

Http Response

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
    "detail": "The request construction was invalid with respect to usage of a data policy.",
    "type": "urn:ed-fi:api:profile:invalid-profile-usage",
    "title": "Invalid Profile Usage",
    "status": 400,
    "correlationId": "54e1e704-72a4-4bcd-b455-9c483352a84b",
    "errors": [
        "A profile-based content type that is readable cannot be used with PUT requests."
    ]
}
```

## 401 Unauthorized

### urn:ed-fi:api:security:authentication

#### Missing Authorization header

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
    "detail": "The caller could not be authenticated.",
    "type": "urn:ed-fi:api:security:authentication",
    "title": "Authentication Failed",
    "status": 401,
    "correlationId": "609a10fd900f",
    "errors": [
        "Authorization header is missing."
    ]
}

```

### Unsupported Authorization header scheme

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: basic am9obmRvZToxMjM=
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
    "detail": "The caller could not be authenticated.",
    "type": "urn:ed-fi:api:security:authentication",
    "title": "Authentication Failed",
    "status": 401,
    "correlationId": "2d324c48a6a6",
    "errors": [
        "Unknown Authorization header scheme."
    ]
}

```

#### Missing or blank token in the Authorization header

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
    "detail": "The caller could not be authenticated.",
    "type": "urn:ed-fi:api:security:authentication",
    "title": "Authentication Failed",
    "status": 401,
    "correlationId": "fac433711bda",
    "errors": [
        "Missing Authorization header bearer token value."
    ]
}

```

#### Expired or invalid token in the Authorization header

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 123
Content-Type: application/json

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
    "detail": "The caller could not be authenticated.",
    "type": "urn:ed-fi:api:security:authentication",
    "title": "Authentication Failed",
    "status": 401,
    "correlationId": "1745dc8cc91c",
    "errors": [
        "Invalid Authorization header."
    ]
}

```

:::tip

Problem is in the client application code → send to application development team
for resolution.

* Did the token time out? If so, re-authenticate with client credentials.
  * The token timeout period defaults to 30 minutes, but that value can be
    modified by the application host.
* Inspect the HTTP request to ensure it is well formatted. For more information
  on authentication and authorization in ODS/API 7.1, see
  [Authentication](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493699/Authentication)
  and
  [Authorization](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493701/Authorization).
  This guidance is generally correct for all supported versions of the ODS/API.

:::

## 403 Forbidden

### urn:ed-fi:api:security:data-policy:incorrect-usage

#### Data Policy Failure Due to Incorrect Usage

This occurs when a client attempts to use a profile-specific content type that
has not been assigned to it, or does not specify a
covering writable profile-specific content type when attempting to create or
modify a resource which requires one for updates.

Example: The caller is assigned a profile and requests a covered resource using
a different profile's content type.

Http Request

```text
GET http://localhost:8765/data/v3/ed-fi/students/82b0fb10c78e43a29ecd2d286ddc10c3
Accept: application/vnd.ed-fi.student.test-profile-studentonly2-resource-includeall.readable+json
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

```

Http Response

```text
{
    "detail": "A data policy failure was encountered. The request was not constructed correctly for the data policy that has been applied to this data for the caller.",
    "type": "urn:ed-fi:api:security:data-policy:incorrect-usage",
    "title": "Data Policy Failure Due to Incorrect Usage",
    "status": 403,
    "errors": [
        "Based on profile assignments, the following profile-specific content type is required when requesting this resource: 'application/vnd.ed-fi.student.test-profile-studentonly-resource-includeall.readable+json'"
    ]
}

```

### urn:ed-fi:api:security:authorization:namespace:access-denied:namespace-mismatch

#### Invalid Namespace Prefix

Most of these 403 message refer to the portion of the Ed-Fi ODS/API that uses
the client's relationship to an education organization as the basis for resource
authorization. There is another approach to securing access to resources, which
is particularly used with Assessments: namespace prefix. When an API client is
created, it is given access to one or more namespace prefixes. For resources
secured by namespace, the client credentials can only perform actions on objects
that match the assigned namespace prefix. In the following example, the
namespace summitted with resource is
"[uri://example.org/Assessment/Assessment.xml]", but the client credentials were
configured for "[uri://ed-fi.org]" prefix instead.

Http Request

```text
 POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/assessments
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "assessmentIdentifier": "_01774fa3-06f1-47fe-8801-c8b1e65057f3_",
  "namespace": "uri://example.org/Assessment/Assessment.xml",
  "assessmentCategoryDescriptor": "uri://ed-fi.org/AssessmentCategoryDescriptor#Benchmark test",
  "assessmentTitle": "3rd Grade Reading 1st Six Weeks 2021-2022",
  "academicSubjects": [
    {
      "academicSubjectDescriptor": "uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts"
    }
  ],
  "identificationCodes": [
    {
      "assessmentIdentificationSystemDescriptor": "uri://ed-fi.org/AssessmentIdentificationSystemDescriptor#Test Contractor",
      "identificationCode":  "01774fa3-06f1-47fe-8801-c8b1e65057f3"
    }
  ],
  "scores": [
    {
      "assessmentReportingMethodDescriptor": "uri://ed-fi.org/AssessmentReportingMethodDescriptor#Percentile",
      "maximumScore": "99",
      "minimumScore": "1",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer"
    }
  ]
}


```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized. The 'Namespace' value of the data does not start with any of the caller's associated namespace prefixes ('uri://ed-fi.org', 'uri://gbisd.edu', 'uri://tpdm.ed-fi.org').",
  "type": "urn:ed-fi:api:security:authorization:namespace:access-denied:namespace-mismatch",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "07572303-6c72-4ab3-aa71-ab345d66b82b"
}

```

:::tip

Problem is in the client application code → send to application development team
for resolution.

* Is the correct namespace being transmitted? If that is correct, then it could
  be a credential access problem → send the client key to the hosting provider /
  IT operations:
* Using a tool like Admin API or Admin App, confirm that the key is configured
  for access to the intended namespace.
* Using
  [Tokeninfo](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Authorization#Authorization-tokeninfo)
  endpoint, confirm that the key is configured for access to the intended
  namespace.

:::

### urn:ed-fi:api:security:authorization

#### Student / Parent / Staff Relationship Does Not Exist

This frequently trips up folks new to working with the Ed-Fi API: once you
create a student, parent, or staff, most\* client credentials cannot immediately
access that record (\* depending on the claimset configured for those client
credentials). In order to access, there must be a relationship expressed as an
appropriate `studentSchoolAssociation` , `studentParentAssociation` , or
`staffSchoolAssociation`.

Http Request

```text
## HTTP Request 1
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/Students
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "studentUniqueId": "123456789",
  "firstName": "Amelia",
  "lastSurname": "Earhart",
  "BirthDate": "2010-01-13"
}

## HTTP Request 2
GET https://api-stage.ed-fi.org:443/v7.1/api/data/v3/ed-fi/students/e31429919e6546e8905635d7858f2e80
Authorization: Bearer fd964160527941a39875e821d2622088


```

Http Response

```text
## HTTP Response 1

HTTP 1.1 201 Created
location: https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/parents/3f375bc2ac5c4a709a168616afb4772e


## HTTP Response 2

HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized. Hint: You may need to create a corresponding 'StudentSchoolAssociation' item.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "821fe345-ecbf-465c-9831-972a50552d8b",
  "errors": [
    "No relationships have been established between the caller's education organization id claims (255901, 19255901) and the resource item's 'StudentUniqueId' value."
  ]
}

```

:::tip

Problem seems likely to be in the client application code → send to
application development team for resolution.

* Be sure to create an appropriate `StudentSchoolAssociation` ,
  `studentParentAssociation` , or `staffSchoolAssociation` record after creating
  the corresponding `Student` , `Parent`, or `Staff`  object. However, it is
  conceivable that there is a data problem in the source system, which caused a
  failure to create the correction Association. It may be necessary to look at
  earlier error logs to look for a different problem that needs to be resolved
  in the source system.

:::

#### Missing Student or Staff

Naturally, the person (student, staff) must exist for creation of another object
that relates to that person to succeed. This is a special case that results in
403. Most referential integrity errors receive a 409 response, not a 403
response.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/staffSectionAssociations
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "sectionReference": {
    "localCourseCode": "ALG-1",
    "schoolId": 255901001,
    "schoolYear": 2022,
    "sectionIdentifier": "25590100102Trad220ALG112011",
    "sessionName": "2021-2022 Fall Semester"
  },
  "staffReference": {
    "staffUniqueId": "207270__"
  },
  "beginDate": "2021-08-23",
  "classroomPositionDescriptor": "uri://ed-fi.org/ClassroomPositionDescriptor#Teacher of Record",
  "endDate": "2021-12-17"
}

```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized. Hint: You may need to create corresponding 'StaffEducationOrganizationEmploymentAssociation' or 'StaffEducationOrganizationAssignmentAssociation' items.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "ed590b7b-9059-47b0-a699-ea2ea7edfeaa",
  "errors": [
    "No relationships have been established between the caller's education organization id claims (255901, 19255901) and one or more of the following properties of the resource item: 'SchoolId', 'StaffUniqueId'."
  ]
}

```

:::tip

Problem seems likely to be in the application code → send to application
development team for resolution.

* Be sure to create an appropriate association record only _after_ creating
  the corresponding `Student` , `Parent`, or `Staff`  object.
* Interestingly, does not apply to `studentSchoolAssociations` - in that
  case, we simply have a normal 409 "invalid-reference" type of message.
* However, it is conceivable that there is a data problem in the source system,
  which caused a failure to create the correction Association. It may be necessary
  to look at earlier error logs to look for a different problem that needs to be
  resolved in the source system.

:::

#### Not Authorized for a School or Education Organization

This is similar to the student / parent / staff problem above. In this case, the
client credentials are not configured for access to a given School Id. This is a
security measure so that, for example, a source system that is only supposed to
access certain schools in a local education agency (say, all middle schools),
cannot gain access to other schools.

##### Example: cannot create a Class Period for a different school

Http Request

```text
POST https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/classPeriods
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8
{
  "schoolReference": {
    "schoolId": 55901001
  },
  "classPeriodName": "01 - Traditional",
  "meetingTimes": [
    {
      "endTime": "09:25:00",
      "startTime": "08:35:00"
    }
  ]
}

```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "e4b21549-28d9-4549-bc23-1d681b8ae2b9",
  "errors": [
    "No relationships have been established between the caller's education organization id claims (255901, 19255901) and the resource item's 'SchoolId' value."
  ]
}

```

##### Example

Cannot create an Education Organization Association when the
credentials are scoped to a particular school.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentEducationOrganizationAssociations
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8

{
  "studentReference": {
    "studentUniqueId": "604822",
  },
  "educationOrganizationReference": {
    "educationOrganizationId": 1
  }
}


```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized. Hint: You may need to create a corresponding 'StudentSchoolAssociation' item.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "0b5cdbcf-8e6d-4f5d-b0a2-e764da0d9ff6",
  "errors": [
    "No relationships have been established between the caller's education organization id claims (255901, 19255901) and one or more of the following properties of the resource item: 'EducationOrganizationId', 'StudentUniqueId'."
  ]
}

```

:::tip

The problem could be in application → have the application development
team check first:

* Is the correct `schoolId`  being transmitted?
* Interestingly, _this also occurs if the school does not exist_. This is a
  precaution so that a malicious system cannot "fish" for the existence of
  otherwise legitimate `schoolId` 's that they should not be able to access. If
* That is correct, then it could be a credential access problem → send the
  client key to the hosting provider / IT operations:
  * Using a tool like Admin API or Admin App, confirm that the key is
    configured for access to the given school or education organization.
* Using
  [Tokeninfo](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Authorization#Authorization-tokeninfo)
  endpoint, confirm that the key is configured for access to the given
  school or education organization.

:::

### urn:ed-fi:api:security:authorization:access-denied:action

#### The Requested Action Is Not Permitted

Credentials to the Ed-Fi ODS/API are configured with [a claim set](#) that
defines what the credentials are allowed to do. The following error message
indicates that the API client has tried to take an action - in this case,
updating a Descriptor - that is not allowed under this claim set.

Http Request

```text
 PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors/3a62029e71374c7095d288a6cabae206
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "id": "3a62029e71374c7095d288a6cabae206",
  "codeValue": "Compensatory leave time",
  "description": "Compensatory leave time",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor",
  "shortDescription": "Compensatory leave time"
}



```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized.",
  "type": "urn:ed-fi:api:security:authorization:access-denied:action",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "88d2de05-e1e9-4106-8e72-675dd761a153",
  "errors": [
    "The API client's assigned claim set (currently 'SIS Vendor') must grant permission of the 'http://ed-fi.org/odsapi/actions/update'action on one of the following resource claims: http://ed-fi.org/ods/identity/claims/domains/systemDescriptors, http://ed-fi.org/ods/identity/claims/domains/AbsenceEventCategoryDescriptor"
  ]
}

```

:::tip

Problem may be in the client application code → send to application
development team for resolution.

* Should not be performing this action. On the other hand, if the
  application development team believes this ought to be a permitted action,
  then please contact the hosting provider (external) or IT operations (internal
  hosting) to discuss replacing the credentials with a new client id / secret
  pair that has greater latitude for action.

:::

### urn:ed-fi:api:security:authorization:access-denied:resource

#### Missing Claim

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/absenceEventCategoryDescriptors/3a62029e71374c7095d288a6cabae206
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-16

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "fundDimensionReference": {
    "code": "1",
    "fiscalYear": 4022
  },
  "accountIdentifier": "1-1-1000-000",
  "fiscalYear": 2022,
  "accountName": "TOTAL REVENUE FROM LOCAL SOURCES",
  "accountTypeDescriptor": "uri://ed-fi.org/AccountTypeDescriptor#Revenue"
}

```

Http Response

```text
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8

{
  "detail": "Access to the requested data could not be authorized.",
  "type": "urn:ed-fi:api:security:authorization:access-denied:resource",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "666a1cf2-40df-41cb-8c76-0c0c07d4810c",
  "errors": [
    "The API client's assigned claim set (currently 'SIS Vendor') must grant permission of the 'http://ed-fi.org/odsapi/actions/update'action on one of the following resource claims: http://ed-fi.org/ods/identity/claims/domains/systemDescriptors, http://ed-fi.org/ods/identity/claims/domains/AbsenceEventCategoryDescriptor"
  ]
}

```

:::tip

Problem may be in the client application code → send to application
development team for resolution.

* Should not be performing this action with this key/secret. On the other
  hand, if the application development team believes this ought to be a
  permitted action, then please contact the hosting provider (external) or IT
  operations (internal hosting) to discuss replacing the credentials with a new
  client id / secret pair that uses a different claimset.

:::

### urn:ed-fi:api:not-found

#### Resource Name Typo

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/academicWeek
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8

{
  "weekIdentifier": "one",
  "beginDate": "2023-09-11",
  "endDate": "2023-09-11",
}


```

Http Response

```text
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
    "detail": "The specified data could not be found.",
    "type": "urn:ed-fi:api:not-found",
    "title": "Not Found",
    "status": 404,
    "correlationId": "d1a92738-34e7-4650-8f79-7d3bc6492562"
}

```

:::tip

The problem is in the client application → send to the application
development team:

* Review the exact URL / route for accuracy.
  * In this case, "academicWeek" should be pluralized to "academicWeeks"
* If the host provides Swagger UI, use it to confirm the exact path on the
  URL.
* If everything looks correct, ask the hosting provider if they are running
  in an instance mode that introduces an additional segment into the URL,
  for example the school year or a district name.

:::

#### ID Does Not Exist

Example: resourceId submitted via PUT or DELETE requests doesn't exists.

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/academicWeek/not-valid-id
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8

{
  "weekIdentifier": "one",
  "beginDate": "2023-09-11",
  "endDate": "2023-09-11",
}

```

Http Response

```text
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
    "detail": "The specified item could not be found.",
    "type": "urn:ed-fi:api:not-found",
    "title": "Not Found",
    "status": 404,
    "correlationId": "8cdf37d9-f2cb-4104-8a5f-8cbaf96ca53f"
}

```

:::tip

The problem is in the client application → send to the application
development team:

* If the route is fully correct, and the ID is wrong, then may need to
  perform a GET request by natural key to lookup the correct ID before
  issuing a PUT or DELETE request.

:::

## 405 Method Not Allowed

### urn:ed-fi:api:method-not-allowed

#### POST Request with an ID in the URL

POST requests must _not_ have an Ed-Fi ID value in the URL. The request is
processed using "upsert" semantics where the natural key value from the request
body is used to locate and update the existing resource item if it exists;
otherwise, a new item is created.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentAcademicRecords/8cdf37d9-f2cb-4104-8a5f-8cbaf96ca53f
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901001
  },
  "schoolYearTypeReference": {
    "schoolYear": 2022
  },
  "studentReference": {
    "studentUniqueId": "604874"
  },
  "termDescriptor": "uri://ed-fi.org/TermDescriptor#Fall Semester",
  "gradePointAverages": [
    {
      "gradePointAverageTypeDescriptor": "uri://ed-fi.org/GradePointAverageTypeDescriptor#Unweighted",
      "gradePointAverageValue": 4,
      "isCumulative": true
    }
  ]
}
```

Http Response

```text
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json; charset=utf-8


{
   "detail": "The request construction was invalid.",
    "type": "urn:ed-fi:api:method-not-allowed",
    "title": "Method Not Allowed",
    "status": 405,
    "correlationId": "1fb5868c-f6d9-4fd5-afe6-f11549b0ef49",
    "errors": [
        "Resource items can only be updated using PUT. To \"upsert\" an item in the data collection using POST, remove the \"id\" from the route."
    ]
}
```

:::tip

The problem is in the client application → send to the application
development team:

* 405 errors are most likely issues that need to be resolved by changing
  client application code.

:::

#### DELETE or PUT Request without an ID in the URL

DELETE and PUT requests must have an Ed-Fi ID value in the URL to point to the
exact record to remove or modify.

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentAcademicRecords
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8

{
  "id": "d074a26cec7449299f701ba54e0f0257",
  "educationOrganizationReference": {
    "educationOrganizationId": 255901001
  },
  "schoolYearTypeReference": {
    "schoolYear": 2022
  },
  "studentReference": {
    "studentUniqueId": "604874"
  },
  "termDescriptor": "uri://ed-fi.org/TermDescriptor#Fall Semester",
  "gradePointAverages": [
    {
      "gradePointAverageTypeDescriptor": "uri://ed-fi.org/GradePointAverageTypeDescriptor#Unweighted",
      "gradePointAverageValue": 4,
      "isCumulative": true
    }
  ]
}

```

Http Response

```text
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json; charset=utf-8

{
  "detail": "The request construction was invalid.",
  "type": "urn:ed-fi:api:method-not-allowed",
  "title": "Method Not Allowed",
  "status": 405,
  "correlationId": "8cdf37d9-f2cb-4104-8a5f-8cbaf96ca53f",
  "errors": [
    "Resource collections cannot be replaced. To \"upsert\" an item in the collection, use POST. To update a specific item, use PUT and include the \"id\" in the route."
  ]
}

```

Http Request

```text
DELETE https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/studentAcademicRecords
Authorization: Bearer fd964160527941a39875e821d2622088

```

Http Response

```text
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json; charset=utf-8

{
  "detail": "The request construction was invalid.",
  "type": "urn:ed-fi:api:method-not-allowed",
  "title": "Method Not Allowed",
  "status": 405,
  "correlationId": "19c8946457e7",
  "errors": [
    "Resource collections cannot be deleted. To delete a specific item, use DELETE and include the \"id\" in the route."
  ]
}
```

:::tip

The problem is in the application code → send to application development
team for resolution.

* The Ed-Fi `id`  value can be found either:
  * In the `location` header returned from a POST request, or
  * By doing a GET request and pulling the `id`  from the response
* Append the `id`  value at the end of the URL. In this case, the URL should
  be
  [https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/studentAcademicRecords/](https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/studentAcademicRecords/)d074a26cec7449299f701ba54e0f0257

:::

#### PATCH Requests

The ODS API doesn't support PATCH requests; to update data, use PUT requests
instead.

Http Request

```text
PATCH https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/students/1765c75f180a4981b7a2a47974ba14d9
Authorization: Bearer fd964160527941a39875e821d2622088
Content-Type: application/json; charset=utf-8
{
 "studentUniqueId": "604821",
    "birthDate": "2014-11-13",
    "firstName": "John",
    "lastSurname": "Doe"
}

```

Http Response

```text
HTTP/1.1 405 Method Not Allowed
Content-Type: application/json; charset=utf-8

{
    "detail": "The request construction was invalid.",
    "type": "urn:ed-fi:api:method-not-allowed",
    "title": "Method Not Allowed",
    "status": 405,
    "correlationId": "3f95df18-185c-4872-b412-b19021bef5d0",
    "errors": [
        "The endpoint of the request does not support the 'PATCH' method."
    ]
}

```

## 409 Conflict

### urn:ed-fi:api:data-conflict:dependent-item-exists

#### Dependent Item Exists

When resource A depends on resource B, you cannot delete an instance of resource
B without first deleting all resource A instances that depend on that
to-be-deleted instance of B. Translation: cannot delete a parent record when
there are still existing child records.

Http Request

```text
DELETE https://api.ed-fi.org:443/v6.1/api/data/v3/ed-fi/students/3d3ad42503b443489471b74c05067628
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json


```

Http Response

```text
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8

{
  "detail": "The requested action cannot be performed because this item is referenced by an existing 'StudentSectionAttendanceEvent' item.",
  "type": "urn:ed-fi:api:data-conflict:dependent-item-exists",
  "title": "Dependent Item Exists",
  "status": 409,
  "correlationId": "2823d18c-7cff-452f-83d7-8d7e2cac700c"
}

```

:::tip

Problem might be in the client application code → send to application
development team for resolution.

* Be sure to delete data following the required [Resource Dependency
    Order](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18810137/Resource+Dependency+Order) in
    reverse order (delete children first).
* This specific case may have arisen because a Student Unique ID changed. This
    value is a natural key that is cannot be updated via a PUT request
    (see [Cascading Key Updates on ODS / API
    Resources](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18812127)
    for those natural keys that _can be_ updated via a PUT request). Because of
    this, the student record needs to be delete

:::

### urn:ed-fi:api:data-conflict:unresolved-reference

#### Unresolved Reference

The ODS/API application enforces referential integrity: whenever a property is
named \_\_\_Reference, the key values in that reference must match the
identifying values of an existing object in the database.

##### Example

In this example we have two references that could cause the POST
(or a similar PUT request) to be rejected: the school, and the school year.
School year is unusual in the ODS/API in that it comes preconfigured. By
default, the Ed-Fi ODS/API recognizes school years 1991-2050. Each
implementation can change that list through the `edfi.SchoolYearType`  table.
There is a `schoolYearTypes`  resource in the API; however, not all credentials
are able to access it.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/calendars
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "schoolReference": {
    "schoolId": 255901107
  },
  "schoolYearTypeReference": {
    "schoolYear": 4022
  },
  "calendarCode": "2010605675",
  "calendarTypeDescriptor": "uri://ed-fi.org/CalendarTypeDescriptor#Student Specific"
}


```

Http Response

```text
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8

{
  "detail": "The referenced 'SchoolYearType' item does not exist.",
  "type": "urn:ed-fi:api:data-conflict:unresolved-reference",
  "title": "Unresolved Reference",
  "status": 409,
  "correlationId": "ff1caa62-923a-4536-9998-cd38528c63a2"
}

```

##### Example

This `chartOfAccounts` is referencing a `fundDimension` that does
not exist yet.

Http Request

```text
POST https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/chartOfAccounts
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "fundDimensionReference": {
    "code": "1_",
    "fiscalYear": 2022
  },
  "sourceDimensionReference": {
    "code": "1000",
    "fiscalYear": 2022
  },
  "accountIdentifier": "1-1-1000-000",
  "fiscalYear": 2022,
  "accountName": "TOTAL REVENUE FROM LOCAL SOURCES",
  "accountTypeDescriptor": "uri://ed-fi.org/AccountTypeDescriptor#Revenue",
  "reportingTags": [
    {
      "reportingTagDescriptor": "uri://ed-fi.org/ReportingTagDescriptor#LEA",
      "tagValue": "$308,136,446"
    }
  ]
}

```

Http Response

```text
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8

{
  "detail": "The referenced 'FundDimension' item does not exist.",
  "type": "urn:ed-fi:api:data-conflict:unresolved-reference",
  "title": "Unresolved Reference",
  "status": 409,
  "correlationId": "7d82b925-ff8f-48e6-a84e-9559e14b5921"
}

```

##### Example

Referenced Student doesn't exist while creating a primary relationship
used for authorization. This is a special case that results in 409. Most
referential integrity errors receive a 409 response, not a 403 response.

Http Request

```text
POST https://api.ed-fi.org:443/v7.2/api/data/v3/ed-fi/StudentSchoolAssociations
Authorization: bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json

{
  "classOfSchoolYearTypeReference": {
    "schoolYear": 2027
  },
  "schoolReference": {
    "schoolId": 255901001
  },
  "studentReference": {
    "studentUniqueId": "i don't exist"
  },
  "entryDate": "1903-03-18",
  "entryGradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#First grade",
  "entryTypeDescriptor": "uri://ed-fi.org/EntryTypeDescriptor#Next year school",
  "residencyStatusDescriptor": "uri://ed-fi.org/ResidencyStatusDescriptor#Resident of admin unit and school area"
}

```

Http Response

```text
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8

{
  "detail": "The referenced 'Student' item does not exist.",
  "type": "urn:ed-fi:api:data-conflict:unresolved-reference",
  "title": "Unresolved Reference",
  "status": 409,
  "correlationId": "a4a6874f-19ad-4afc-9bf0-745bc3d06866"
}

```

:::tip

Problem might be in the client application code → send to application
development team for resolution.

* Be sure to submit data following the required [Resource Dependency
    Order](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18810137/Resource+Dependency+Order).
* For school year: if the year is correct, and still getting the error,
    check with the API hosting provider to find out what school years are allowed.
* Alternately, the code might be correct, and there could be an "upstream"
    problem → send for application user review.
* Was there an error when synchronizing the upstream resource, such that it
    did not save correctly? In the above example, look to see if there was an
    error when creating the `fundDimension`. If so, might need to correct
    something on one or more Student records in order to complete the Student
    synchronization and then re-try the `chartOfAccounts`  synchronization.

:::

### urn:ed-fi:api:data-conflict:non-unique-identity

#### Identifying Values Are Not Unique

A PUT request can be used to update a natural key field on selected resources.
However, API will error if a resource is being updated with a key that is
already in use by another resource. ODS / API enforces uniqueness of natural
keys of the resources.

##### Example

In this example we are updating the key fields of a classperiods
resource with PUT operation. The key being updated is already assigned to
another resource the ODS.

Http Request

```text
PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/classPeriods/d327e6013bff4c7783ecdbbb420b23bb
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
Content-Type: application/json; charset=utf-8

{
    "schoolReference": {
      "schoolId": 255901044
    },
    "classPeriodName": "01 - Traditional",
    "meetingTimes": [
      {
        "endTime": "09:05:00",
        "startTime": "08:15:00"
      }
    ]
  }

```

Http Response

```text
HTTP/1.1 409 Conflict
Content-Type: application/json; charset=utf-8

{
  "detail": "The identifying value(s) of the item are the same as another item that already exists."
  "type": "urn:ed-fi:api:data-conflict:non-unique-identity",
  "title": "Identifying Values Are Not Unique",
  "status": 409,
  "errors": [
    "A primary key conflict occurred when attempting to create or update a record in the 'ClassPeriod' table. The duplicate key is (ClassPeriodName, SchoolId) = (01 - Traditional, 255901044)."
  ],
  "correlationId": "20fbdf7b-661b-4d3d-8950-bd82efe3da4c"
}

```

## 412 Precondition Failed

### urn:ed-fi:api:optimistic-lock-failed

The only occurs when opting into the eTag feature. First, the API client must
have retrieved a record by ID or by any query. The response body will contain an
`_etag`  property. That `_etag`  value can then be used in a `If-Match`  header
on a PUT request. If a different API client updates the resource before your
client can do so, the `_etag` value will have changed and the `If-Match`  fails,
resulting in Status Code 412.

Http Request

```text
## HTTP Request - GET an academicWeek
GET https://api.ed-fi.org/v6.1/api/data/v3/ed-fi/academicWeeks
Authorization: Bearer 6f5bb488a65948b5b847b561b23e


## HTTP Request - PUT request, assuming another client came in between and
# already updated the object, causing an _etag mismatch. Notice the extra
# If-Match header

PUT https://api.ed-fi.org/v7.2/api/data/v3/ed-fi/academicWeeks/cc91fb951b0c4cb7ae0ed56ac0691fb6
Authorization: Bearer 6f5bb488a65948b5b847b561b23e
If-Match: 5250093105232954695

{
   "id": "cc91fb951b0c4cb7ae0ed56ac0691fb6",
    "schoolReference": {
      "schoolId": 255901001
    },
    "weekIdentifier": "identifier-one",
    "beginDate": "2023-09-11",
    "endDate": "2023-09-11",
    "totalInstructionalDays": 5,
 }

```

Http Response

```text
HTTP/1.1 200 OK Content-Type: application/json; charset=utf-8
Content-Type: application/json; charset=utf-8

[
  {
    "id": "cc91fb951b0c4cb7ae0ed56ac0691fb6",
    "schoolReference": {
      "schoolId": 255901001,
      "link": {
        "rel": "School",
        "href": "/ed-fi/schools/83178b254fc943d8a4a90043fbcfc127"
      }
    },
    "weekIdentifier": "identifier-one",
    "beginDate": "2023-09-11",
    "endDate": "2023-09-11",
    "totalInstructionalDays": 0,
    "_etag": "5250093105232954695",
    "_lastModifiedDate": "2024-01-13T02:11:20.5566791Z"
  }
]

## HTTP Response 2

HTTP/1.1 412 Precondition Failed Content-Type: application/json; charset=utf-8
{
  "detail": "The item has been modified by another user.",
  "type": "urn:ed-fi:api:optimistic-lock-failed",
  "title": "Optimistic Lock Failed",
  "status": 412,
  "correlationId": "8b7835b3-f340-4dc8-9cff-e354d2a6f472"
}

```

:::tip

Problem might be in the application code → send to application
development team for resolution. One possible workflow for correcting the
issue:

* Retrieve the object again.
* Update only the fields that should be the "exclusive" domain of your API
    client.
* Re-submit the PUT request.

:::

## 415 Unsupported Media Type

This occurs when the `content-type` header is missing or is not
"application/json".

Http Request

```text
POST https://api.ed-fi.org:443/v5.3/api/data/v3/ed-fi/absenceEventCategoryDescriptors
Authorization: bearer 6f5bb488a65948b5b847b561b23e

{
  "description": "Bereavement",
  "namespace": "uri://ed-fi.org/AbsenceEventCategoryDescriptor"
}

```

Http Response

```text
HTTP/1.1 415 Unsupported Media Type
Content-Type: application/json; charset=utf-8

{
  "detail": "The request construction was invalid.",
  "type": "urn:ed-fi:api:unsupported-media-type",
  "title": "Unsupported Media Type",
  "status": 415,
  "correlationId": "488de6e3-04e6-4ac5-86a4-6eeb409e4e2b",
  "errors": [
    "The value specified in the 'Content-Type' header is not supported by this host."
  ]
}

```

:::tip

Problem is in the application code → send to application development
team for resolution.

* Be sure to provide the header `Content-Type: application/json`.
* The `charset`  is optional and assumed to be UTF-8 when omitted.

:::

## 500 Internal Server Error

This is a catch-all for various errors that can occur on the server. Review this
section for possible reasons for the error.
