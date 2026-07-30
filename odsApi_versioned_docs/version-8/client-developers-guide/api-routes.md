---
sidebar_position: 3
---

# API Routes

Routes are names used to access API endpoints and are used in API URLs. This
section describes the patterns and conventions for route naming in the Ed-Fi
API.

## Route Patterns in Ed-Fi APIs

The Ed-Fi API uses the following route structure to support multiple Extensions
and to allow for multi-tenant and context-based deployments:

| Description | Ed-Fi API v8 Route |
| --- | --- |
| Base URI | `/{pathBase}`<sup>1</sup>`[/{tenantIdentifier}]`<sup>2</sup>`[/{context}]`<sup>3</sup>`/data`<br/><br/>**Examples:**<br/><br/>/api/data<br/>/api/2024/data<br/>/api/district1/data<br/>/api/district1/2024/data |
| Basic Relative URL Format | Data Management Resources:<br/>…/data/`{schema}`/`{resource}` |
| **Examples** | |
| Resources (Ed-Fi) | /api/data/ed-fi/schools |
| Descriptors (Ed-Fi) | /api/data/ed-fi/termDescriptors |
| Resources (Host Extensions)<sup>4</sup> | /api/data/TX/leavers |
| Resources (Domain Extensions)<sup>4</sup> | /api/data/talentMgmt/applicants |

:::note

1. `pathBase` is controlled by the `PATH_BASE` environment variable (default:
   `api`). All API paths are prefixed with this value.
2. `tenantIdentifier` is part of the route when the API is configured with
   [Multi-Tenant
   Configuration](../platform-dev-guide/configuration/single-and-multi-tenant-configuration.md).
3. `context` segment is part of the route when the API is configured to use
   [Context-Based Routing for Year-Specific Data
   Store](../platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore.md).
4. It is important to note the distinction between the **Extended Ed-Fi
   Resources** (which collect additional data for an existing Ed-Fi core
   resource using the `_ext` field in the JSON payload) and **Host & Domain
   Resources** (which create entirely new resource endpoints).

:::

### Example: Extended Ed-Fi Student Resource

Route: `/api/data/ed-fi/students`

Sample JSON payload for an extended Student resource:

```json
{
    "studentUniqueId": "397589871",
    "firstName" : "John",
    "lastSurname": "Ortiz",

[etc...]

    "_ext" : {
        "SomeState" : {
            "tribalAffiliation" : "Pascua Yaqui",
            [etc...]
        }
    }
}
```

### Example: TalentMgmt Applicant Resource

Route: `/api/data/talentMgmt/applicants`

Sample JSON payload for an Applicant in a "talentMgmt" extension:

```json
{
    "id": "string",
    "applicantIdentifier": "397589871",
    "educationOrganizationReference": {
      "educationOrganizationId": 255901
    },
    "addresses": [
      {
        [etc...]
      }
    ],
    [etc...]
}
```
