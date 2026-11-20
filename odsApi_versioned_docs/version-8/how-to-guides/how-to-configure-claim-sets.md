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
- **SeedLoader** - Provides Create and Update permissions for loading seed and
  sample data, such as descriptors, education organizations, and students.
- **SISVendor** - Provides CRUD permissions on the most common resources
  representing staff and student school and classroom data. Typically used by
  an implementer with a multi-tenant LEA deployment.

API clients can be assigned one of the built-in claim sets, or new claim sets
can be created to suit specific needs.

:::info

The Ed-Fi API caches claim sets, so a change made in the Configuration Service
can take up to 10 minutes to apply
(`CacheSettings:ClaimSetsCacheExpirationSeconds`, default `600`). To apply it
sooner, do one of the following:

- Restart the Ed-Fi API.
- Call the Ed-Fi API's `POST /management/reload-claimsets` endpoint
  (`/management/{tenant}/reload-claimsets` with multi-tenancy). The endpoint is
  off by default. To turn it on, set `AppSettings:ManagementEndpoints:Enabled`
  to `true` and `AppSettings:ManagementEndpoints:RequiredRole` to a role. The
  caller's token must carry that role. See [Optional
  Settings](../platform-dev-guide/configuration/configuration-details.mdx#optional-settings).

See [Caching Strategy](../technical-articles/caching-strategy.md) for details.

:::

## Choosing an Approach

The `POST /v3/claimSets/import` endpoint documented on this page is the right
choice when you need to create or modify a custom claim set without touching the
underlying claims taxonomy. To change one resource claim on an existing custom
claim set, without re-importing the whole claim set, use the
`/v3/claimSets/{claimSetId}/resourceClaimActions` endpoints instead; see
[Managing a Claim Set's Resource
Claims](../platform-dev-guide/security/api-claim-sets-resources.md#managing-a-claim-sets-resource-claims).
For a full comparison of available mechanisms for
updating security metadata and when to use each, see [Choosing an
Approach](./how-to-create-and-manage-api-security-metadata.mdx#choosing-an-approach)
in How To: Create and Manage API Security Metadata.

## Add a Resource and Action to a Claim Set

You can create new claim sets and define the resource actions granted to them
using the `POST /v3/claimSets/import` endpoint. The import matches claim sets by
name:

- If no claim set has the name, the import creates one.
- If a claim set that isn't system-reserved already has the name, the import
  replaces all of its grants with the ones in the request.
- Importing a built-in claim set, such as `SISVendor`, returns
  `400 Bad Request`, because built-in claim sets are system-reserved. To start
  from one, copy it first (see below).

:::info

Replace the values for `claimSetName`, `claimName`, `parentClaimName`, and the
`actions` list with values appropriate for your deployment. Claim URIs for
individual resources follow the pattern
`http://ed-fi.org/identity/claims/ed-fi/{resourceName}`. Domain-level URIs
follow the pattern `http://ed-fi.org/identity/claims/domains/{domainName}`.

:::

The `POST /v3/claimSets/import` and `POST /v3/claimSets/copy` endpoints require a
Configuration Service token for a client with the `edfi_admin_api/full_access`
scope. Obtain one and store the response:

```powershell
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("<config-admin-key>:<config-admin-secret>"))
$token = Invoke-RestMethod -Method Post -Uri "http://localhost:8081/connect/token" `
  -Headers @{ "Authorization" = "Basic $auth" } `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    "grant_type" = "client_credentials"
    "scope"      = "edfi_admin_api/full_access"
  }
```

```powershell
$body = @'
{
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
}
'@

Invoke-RestMethod -Method Post -Uri "http://localhost:8081/v3/claimSets/import" `
  -Headers @{ Authorization = "Bearer $($token.access_token)" } `
  -ContentType "application/json" `
  -Body $body
```

A successful import returns `201 Created` with the claim set's URL in the
`Location` header and a body like this:

```json
{
  "id": 14,
  "warnings": []
}
```

Check `warnings` after every import. A resource claim that isn't in the claims
taxonomy doesn't fail the import: it is skipped and listed in `warnings`. A
`parentClaimName` that doesn't match the taxonomy is also reported there.

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

```powershell
$body = @'
{
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
}
'@

Invoke-RestMethod -Method Post -Uri "http://localhost:8081/v3/claimSets/import" `
  -Headers @{ Authorization = "Bearer $($token.access_token)" } `
  -ContentType "application/json" `
  -Body $body
```

The override applies only to the specified claim set; all other claim sets
continue using the default authorization strategy for this resource.

Overrides must name built-in authorization strategies; any other name returns
`400 Bad Request`. To use a custom view-based authorization strategy, add it to
the claims document instead; see [How To: Use Custom View-Based
Authorization](./how-to-use-custom-view-based-authorization.mdx).
