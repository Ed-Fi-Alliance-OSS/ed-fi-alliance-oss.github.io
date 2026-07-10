# How To: Configure Claim Sets

The Ed-Fi API claim sets are stored and managed by the Configuration Service.
Out of the box, the Ed-Fi API ships with the following built-in claim sets:

- **ABConnect** - Provides CRUD permissions on a minimum set of learning
  standard resources and a select number of Descriptors for learning standard
  synchronization.
- **AssessmentRead** - Provides Read-only permissions on a limited set of
  resources used for Assessment data.
- **AssessmentVendor** - Provides CRUD permissions on a set of resources used
  for all Assessment data.
- **BootstrapDescriptorsandEdOrgs** - Provides Create-only permissions for
  Descriptor and Education Organization data, intended for loading setup data
  by Administration Level users.
- **DistrictHostedSISVendor** - Same as SISVendor, but also includes
  Create/Update access to the School resource and Update access to the Local
  Education Agency resource. Commonly used for a single LEA implementation.
- **EdFiAPIPublisherReader** - Provides read-only access for data replication
  via the Ed-Fi API Publisher tool.
- **EdFiAPIPublisherWriter** - Provides write access for data replication via
  the Ed-Fi API Publisher tool.
- **EdFiODSAdminApp** - Provides permissions for administrative tooling.
- **EdFiSandbox** - For Administration Level users. Allows the highest level of
  access with CRUD permissions on all resources. Not intended for Vendor access
  (API hosts can use it for setup, e.g., loading bootstrap data like education
  organizations and local descriptors).
- **EducationPreparationProgram** - Provides CRUD permissions on resources from
  the Education Preparation Domain and any TPDM extensions.
- **FinanceVendor** - Provides CRUD permissions on a set of resources used for
  financial (Finance domain) data.
- **RosterVendor** - Provides Read-only permissions on a set of resources used
  for rostering Student and Staff Section data.
- **SISVendor** - Provides CRUD permissions on the most common resources
  representing staff and student school and classroom data. Typically used by
  an implementer with a multi-tenant LEA deployment.

API clients can be assigned one of the built-in claim sets, or new claim sets
can be created to suit specific needs.

:::info

Claim set and security configuration changes made in the Configuration Service
are reflected in the Ed-Fi API after the next cache refresh cycle. See
[Caching Strategy](../technical-articles/caching-strategy.md) for TTL details
and how to force an immediate reload.

:::

## Choosing an Approach

The `POST /v3/claimSets/import` endpoint documented on this page is the right
choice when you need to create or modify a custom claim set without touching the
underlying claims taxonomy. For a full comparison of available mechanisms for
updating security metadata and when to use each, see [Choosing an
Approach](./how-to-create-and-manage-api-security-metadata.mdx#choosing-an-approach)
in How To: Create and Manage API Security Metadata.

## Add a Resource and Action to a Claim Set

You can create new claim sets and define the resource actions granted to them
using the `POST /v3/claimSets/import` endpoint.

:::info

Replace the values for `claimSetName`, `claimName`, `parentClaimName`, and the
`actions` list with values appropriate for your deployment. Claim URIs for
individual resources follow the pattern
`http://ed-fi.org/identity/claims/ed-fi/{resourceName}`. Domain-level URIs
follow the pattern `http://ed-fi.org/identity/claims/domains/{domainName}`.

:::

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "claimSetName": "CustomVendor",
    "resourceClaims": [
      {
        "name": "systemDescriptors",
        "claimName": "http://ed-fi.org/identity/claims/domains/systemDescriptors",
        "actions": [
          { "name": "Read", "enabled": true }
        ]
      },
      {
        "name": "academicSubjectDescriptor",
        "claimName": "http://ed-fi.org/identity/claims/ed-fi/academicSubjectDescriptor",
        "parentClaimName": "http://ed-fi.org/identity/claims/domains/systemDescriptors",
        "actions": [
          { "name": "Create", "enabled": true },
          { "name": "Read", "enabled": true }
        ]
      }
    ]
  }' \
  http://localhost:8081/v3/claimSets/import
```

The response includes the new claim set ID in the `Location` response header.
To start from an existing claim set as a template, use
`POST /v3/claimSets/copy` with the `originalId` of the claim set to copy and
the `claimSetName` for the new one.

## Define Claim Set Specific Authorization Strategy Overrides for a Resource Action

The Ed-Fi API ships pre-configured with default authorization strategies for
all core resources. You can optionally define claim-set-specific authorization
strategy overrides to use a different authorization strategy for a certain
resource action. The following example shows how to set up authorization
strategy overrides as part of a claim set import.

:::info

Replace the values for `claimSetName`, `claimName`, `parentClaimName`,
`actionName`, and `authorizationStrategies` with values appropriate for your
deployment.

:::

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "claimSetName": "CustomVendor",
    "resourceClaims": [
      {
        "name": "studentEducationOrganizationResponsibilityAssociation",
        "claimName": "http://ed-fi.org/identity/claims/ed-fi/studentEducationOrganizationResponsibilityAssociation",
        "parentClaimName": "http://ed-fi.org/identity/claims/domains/relationshipBasedData",
        "actions": [
          { "name": "Create", "enabled": true },
          { "name": "Read", "enabled": true }
        ],
        "authorizationStrategyOverrides": [
          {
            "actionName": "Create",
            "authorizationStrategies": [
              { "name": "RelationshipsWithStudentsOnly" }
            ]
          }
        ]
      }
    ]
  }' \
  http://localhost:8081/v3/claimSets/import
```

The override applies only to the specified claim set; all other claim sets
continue using the default authorization strategy for this resource.
