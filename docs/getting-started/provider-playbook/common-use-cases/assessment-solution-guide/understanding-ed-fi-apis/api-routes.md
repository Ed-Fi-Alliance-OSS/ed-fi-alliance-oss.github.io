# API Routes

Routes are names used to access API endpoints and are used in API URLs. This
section describes the patterns and conventions for route naming in the Ed-Fi ODS
/ API.

## Route Patterns in Ed-Fi APIs

The Ed-Fi ODS / API uses the following route structure to support multiple
Extensions and to provide support for API versioning:

| Description | ODS / API Route |
| --- | --- |
| Base URI | `/{api\_area}/{version}/{year}` **1**<br/><br/>**Examples:**  <br/>/data/v3  <br/>/composites/v1  <br/>/identity/v2 |
| Basic Relative URL Format | Data Management Resources:  <br/>`…/{org}/{resource}`<br/><br/>API Composites:  <br/>`.../{org}/{category}/{resource}` |
| **Examples** |     |
| Resources (Ed-Fi) | /data/v3/ed-fi/schools |
| Descriptors (Ed-Fi) | /data/v3/ed-fi/termDescriptors |
| Resources (Host Extensions) **2** | /data/v3/TX/leavers |
| Resources (Domain Extensions) **2** | /data/v3/talentMgmt/applicants |
| Composites (Ed-Fi) **3** | /composites/v1/ed-fi/assessment/studentAssessments |
| Composites (Host Organization) | /composites/v1/MI/enrollment/Schools |
| Composites Based on Domain or Host Extensions | Unsupported |
| Identity | /identity/v2/identities **4** |

:::note

**1** School Year is optional in the route.

**2** It is important to note the distinction between the **Extended Ed-Fi
Resources** (which collect additional data for an existing Ed-Fi core resource
using the \_ext field in the JSON payload) and **Host & Domain Resources**
(which create entirely new resource endpoints).

**3** Composites are treated as a reserved word.

**4** Endpoint for identity feature is clearly separated to allow separate
versioning for this feature and to support implementations that are not using
this optional feature.

:::

## Extensibility

The Ed-Fi API is extensible. Your application should not have to use
extensibility in most cases, but it is covered here in case you do encounter it.

There are 2 kinds of extensibility:

* An **existing API resource** can be extended to have additional elements. In
    this case, the extension elements (fields, etc.) are added to the API
    resource in an "\_ext" JSON Object.
* A **new API resource** can be added to the API. In this case, the extension
    element is signaled via a new route.

Examples of both are provided below.

### Example: Extended Ed-Fi School Resource (Route: /data/v3/ed-fi/schools)

```json title="Sample JSON Payload for extended Student"
{
    "studentUniqueId": "397589871",
    "firstName" : "John",
    "lastSurname:" "Ortiz",

[etc...]

    “_ext” : {
        “SomeState” : {
            “tribalAffiliation” : “Pascua Yaqui”,
            [etc...]
        }
    }
}
```

### Example: TalentMgmt Applicant Resource (Route: data/v3/talentMgmt/applicants)

```json title="Sample JSON Payload for Applicant"
{
    "id": "string",
    "applicantIdentifier": "397589871",
    "educationOrganizationReference": {
      "educationOrganizationId": 255901,
    },
    "addresses": [
      {
   [etc...]
      }
 [etc...]
}
```
