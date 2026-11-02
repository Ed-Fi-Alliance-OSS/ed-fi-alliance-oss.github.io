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
| Base URI | `[/{pathBase}]`<sup>1</sup>`[/{tenant}]`<sup>2</sup>`[/{qualifier}…]`<sup>3</sup>`/data`<br/><br/>**Examples** (with `pathBase` set to `api`):<br/><br/>/api/data (no tenant or qualifiers)<br/>/api/2024/data (qualifier: school year)<br/>/api/district1/data (tenant: `district1`)<br/>/api/district1/2024/data (tenant, then school year qualifier) |
| Basic Relative URL Format | Data Management Resources:<br/>…/data/`{schema}`/`{resource}` |
| **Examples** | |
| Resources (Ed-Fi) | /api/data/ed-fi/schools |
| Descriptors (Ed-Fi) | /api/data/ed-fi/termDescriptors |
| Resources (Host Extensions)<sup>4</sup> | /api/data/sample/busRoutes |
| Resources (Domain Extensions)<sup>4</sup> | /api/data/talentMgmt/applicants |

:::note

1. `pathBase` is an optional prefix set by the API host. It is empty by
   default; the examples on this page assume a host that sets it to `api`.
2. `tenant` is part of the route when the API is configured with [Multi-Tenant
   Configuration](../platform-dev-guide/configuration/single-and-multi-tenant-configuration.md).
   It always comes before any route qualifiers.
3. Hosts can define one or more route qualifier segments (for example, a
   district ID followed by a school year), which appear in the configured order.
   See [Context-Based Routing for Year-Specific Data
   Store](../platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore.md).
   A tenant and a qualifier look alike in a URL, since each is a plain path
   segment, so ask your host which segments its routes use.
4. It is important to note the distinction between the **Extended Ed-Fi
   Resources** (which collect additional data for an existing Ed-Fi core
   resource using the `_ext` field in the JSON payload) and **Host & Domain
   Resources** (which create entirely new resource endpoints).

:::

## Other Routes

The API serves these routes under the same
`[/{pathBase}][/{tenant}][/{qualifier}…]` prefix as the `/data` routes. To get
their exact URLs, request the discovery document (`/`) at your full prefix,
including your tenant and route qualifier segments; its `urls` object lists
them. If you request it at the bare root of a multi-tenant or qualified host,
the URLs contain `{tenant}` and qualifier placeholders instead.

| Route | Purpose |
| --- | --- |
| `/` | Discovery document: API version, data models, and `urls` |
| `/metadata` | Metadata root |
| `/metadata/dependencies` | [Resource dependency order](./resource-dependency-order/readme.mdx) |
| `/metadata/specifications` | List of OpenAPI specification documents |
| `/oauth/token` | Token endpoint (see [Authentication](./authentication.md)) |
| `/oauth/token_info` | Token information (see [Authorization](./authorization.md#token-info)) |
| `/changeQueries/v1/availableChangeVersions` | Available change versions (see [Using the Changed Record Queries](./using-the-changed-record-queries.md)) |
| `/data/{schema}/{resource}/deletes` | Deleted items for a resource |
| `/data/{schema}/{resource}/keyChanges` | Natural key changes for a resource |

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
        "sample" : {
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
