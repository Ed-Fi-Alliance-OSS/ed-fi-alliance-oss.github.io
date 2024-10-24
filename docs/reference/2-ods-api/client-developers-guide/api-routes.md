# API Routes

Routes are names used to access API endpoints and are used in API URLs. This
section describes the patterns and conventions for route naming in the Ed-Fi ODS
/ API.

## Route Patterns in Ed-Fi APIs

The Ed-Fi ODS / API uses the following route structure to support multiple
Extensions and to provide support for API versioning:

| Description | ODS / API Route |
| --- | --- |
| Base URI | `{tenantIdentifier}`**1**`/{context}`**2**`/{api_area}`**3**`/{version}`<br/><br/>**Examples:**<br/><br/>/data/v3  <br/>/2023/data/v3   <br/>/2023/data/v3/grandbend  <br/>/data/v3/grandbend  <br/>/composites/v1  <br/>/identity/v2 |
| Basic Relative URL Format | Data Management Resources:  <br/>…/`{schema}`/`{resource}`<br/><br/>API Composites:  <br/>.../`{org}`/`{category}`/`{resource}` |
| **Examples** |     |
| Resources (Ed-Fi) | /data/v3/ed-fi/schools |
| Descriptors (Ed-Fi) | /data/v3/ed-fi/termDescriptors |
| Resources (Host Extensions)**3** | /data/v3/TX/leavers |
| Resources (Domain Extensions)**3** | /data/v3/talentMgmt/applicants |
| Composites (Ed-Fi)**4** | /composites/v1/ed-fi/assessment/studentAssessments |
| Composites (Host Organization) | /composites/v1/MI/enrollment/Schools |
| Composites Based on Domain or Host Extensions | Unsupported |
| Identity | /identity/v2/identities**3** |

Notes:

1 - tenantIdentifier is part of the route when API is configured with [Multi
Tenant
Configuration](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Single+and+Multi-Tenant+Configuration#SingleandMultiTenantConfiguration-multiTenantSetting).
2 - context segment is part of the route when API is configured to use
[Context-Based Routing for Year-Specific
ODS](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Context-Based+Routing+for+Year-Specific+ODS)
3 - It is important to note the distinction between the **Extended Ed-Fi
Resources** (which collect additional data for an existing Ed-Fi core resource
using the \_ext field in the JSON payload) and **Host & Domain
Resources** (which create entirely new resource endpoints).
4 - Composites are treated as a reserved word.
5 - Endpoint for identity feature is clearly separated to allow separate
versioning for this feature and to support implementations that are not using
this optional feature.

### Example: Extended Ed-Fi Student Resource (Route: /data/v3/ed-fi/students)

Sample JSON Payload for extended Student

```json
{
    "studentUniqueId": "397589871",
    "firstName" : "John",
    "lastSurname:" "Ortiz",

[etc...]

    "_ext" : {
        "SomeState" : {
            "tribalAffiliation" : "Pascua Yaqui",
            [etc...]
        }
    }
}
```

### Example: TalentMgmt Applicant Resource (Route: /data/v3/talentMgmt/applicants)

Sample JSON Payload for Applicant

```json
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
    ],
    [etc...]
}
```
