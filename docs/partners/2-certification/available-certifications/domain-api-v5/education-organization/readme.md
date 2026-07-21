# Domain Certification API v5 - Education Organization

The Education Organization domain defines the organizational structure,
hierarchy, and associations of education organizations. `EducationOrganization`
is an abstract type with no CRUD endpoint of its own — it is inherited by
concrete entities such as `StateEducationAgency`, `EducationServiceCenter`,
`LocalEducationAgency`, and `School`. Because this domain largely _is_ the
reference data that other domains depend on, certifying against it means
successfully exercising CRUD operations across the concrete organization
types and their associations, rather than a single core resource.

The steps below are grouped into phases so that each phase only depends on
data created in an earlier phase — following them in order will satisfy
every dependency the entities in this domain require.

:::tip
See the Data Standard's [Education Organization Domain -
Overview](/reference/data-exchange/data-standard/5/model-reference/education-organization-domain/overview)
and [Education Organization Domain - Entities and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/education-organization-domain/entities-and-descriptors)
for the conceptual model behind these steps.
:::

## Dependency Order

| Phase | Entity / Descriptor | Resource Endpoint | Depends On |
| --- | --- | --- | --- |
| 1 | EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | None |
| 1 | LocalEducationAgencyCategoryDescriptor | `/localEducationAgencyCategoryDescriptors` | None |
| 1 | GradeLevelDescriptor | `/gradeLevelDescriptors` | None |
| 1 | NetworkPurposeDescriptor | `/networkPurposeDescriptors` | None |
| 1 | ProviderCategoryDescriptor, ProviderStatusDescriptor | `/providerCategoryDescriptors`, `/providerStatusDescriptors` | None |
| 1 | LicenseTypeDescriptor | `/licenseTypeDescriptors` | None |
| 2 | SchoolYearType | `/schoolYearTypes` | None |
| 3 | StateEducationAgency, EducationServiceCenter, LocalEducationAgency, School | `/stateEducationAgencies`, `/educationServiceCenters`, `/localEducationAgencies`, `/schools` | Phase 1 |
| 4 | EducationOrganizationNetwork, OrganizationDepartment | `/educationOrganizationNetworks`, `/organizationDepartments` | Phases 1, 3 |
| 4 | AccountabilityRating | `/accountabilityRatings` | Phases 2, 3 |
| 5 | EducationOrganizationNetworkAssociation, EducationOrganizationPeerAssociation, FeederSchoolAssociation | `/educationOrganizationNetworkAssociations`, `/educationOrganizationPeerAssociations`, `/feederSchoolAssociations` | Phases 3, 4 |
| 6 | CommunityOrganization, CommunityProvider, CommunityProviderLicense | `/communityOrganizations`, `/communityProviders`, `/communityProviderLicenses` | Phase 1 |
| 6 | PostSecondaryInstitution | `/postSecondaryInstitutions` | Phase 1 |

## Phase 1: Descriptors

Each descriptor resource shares the same required-field shape: `codeValue`,
`namespace`, and `shortDescription`. See the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md#step-1-gradeleveldescriptor) for an
example descriptor payload.

| Descriptor | Resource Endpoint | Used By |
| --- | --- | --- |
| EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | `categories[]` on every concrete organization entity in Phases 3, 4, and 6 |
| LocalEducationAgencyCategoryDescriptor | `/localEducationAgencyCategoryDescriptors` | `LocalEducationAgency.localEducationAgencyCategoryDescriptor` |
| GradeLevelDescriptor | `/gradeLevelDescriptors` | `School.gradeLevels` |
| NetworkPurposeDescriptor | `/networkPurposeDescriptors` | `EducationOrganizationNetwork.networkPurposeDescriptor` |
| ProviderCategoryDescriptor | `/providerCategoryDescriptors` | `CommunityProvider.providerCategoryDescriptor` |
| ProviderStatusDescriptor | `/providerStatusDescriptors` | `CommunityProvider.providerStatusDescriptor` |
| LicenseTypeDescriptor | `/licenseTypeDescriptors` | `CommunityProviderLicense.licenseTypeDescriptor` |

## Phase 2: SchoolYearType

`AccountabilityRating` requires a `SchoolYearType`, which has no dependencies
of its own.

Resource: `schoolYearTypes`

- `POST /schoolYearTypes`
- `GET /schoolYearTypes`
- `GET /schoolYearTypes/{id}`
- `PUT /schoolYearTypes/{id}`
- `DELETE /schoolYearTypes/{id}`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `schoolYear` | integer | Key for the school year. |
| `currentSchoolYear` | boolean | Indicates whether this is the current school year. |
| `schoolYearDescription` | string | The description for the school year type. |

### Example

```json
{
  "schoolYear": 2020,
  "currentSchoolYear": true,
  "schoolYearDescription": "2019-2020"
}
```

## Phase 3: Core Organization Types

`EducationOrganization` is abstract, so each concrete organization type below
is created directly against its own resource. None of the four are
schema-required to reference one another, but each supports optional
reference fields to model the natural SEA → ESC → LEA → School hierarchy
described in the Data Standard overview.

Each resource below supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

| Entity | Resource Endpoint | Optional Hierarchy Reference |
| --- | --- | --- |
| StateEducationAgency | `/stateEducationAgencies` | — (top of hierarchy) |
| EducationServiceCenter | `/educationServiceCenters` | `stateEducationAgencyReference` |
| LocalEducationAgency | `/localEducationAgencies` | `stateEducationAgencyReference`, `educationServiceCenterReference`, `parentLocalEducationAgencyReference` |
| School | `/schools` | `localEducationAgencyReference` |

### Required Fields

| Entity | Required Fields |
| --- | --- |
| StateEducationAgency | `stateEducationAgencyId`, `nameOfInstitution`, `categories[].educationOrganizationCategoryDescriptor` |
| EducationServiceCenter | `educationServiceCenterId`, `nameOfInstitution`, `categories[].educationOrganizationCategoryDescriptor` |
| LocalEducationAgency | `localEducationAgencyId`, `nameOfInstitution`, `localEducationAgencyCategoryDescriptor`, `categories[].educationOrganizationCategoryDescriptor` |
| School | `schoolId`, `nameOfInstitution`, `gradeLevels[].gradeLevelDescriptor`, `educationOrganizationCategories[].educationOrganizationCategoryDescriptor` |

All descriptor references above come from Phase 1.

### Example: StateEducationAgency

```json
{
  "stateEducationAgencyId": 255,
  "nameOfInstitution": "Texas Education Agency",
  "categories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#State Education Agency" }
  ]
}
```

### Example: LocalEducationAgency

```json
{
  "localEducationAgencyId": 255901,
  "nameOfInstitution": "Grand Bend School District",
  "localEducationAgencyCategoryDescriptor": "uri://ed-fi.org/LocalEducationAgencyCategoryDescriptor#Independent",
  "stateEducationAgencyReference": {
    "stateEducationAgencyId": 255
  },
  "categories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#Local Education Agency" }
  ]
}
```

### Example: School

```json
{
  "schoolId": 255901001,
  "nameOfInstitution": "Grand Bend High School",
  "localEducationAgencyReference": {
    "localEducationAgencyId": 255901
  },
  "gradeLevels": [
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Ninth grade" }
  ],
  "educationOrganizationCategories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#School" }
  ]
}
```

## Phase 4: Networks, Departments, and Ratings

These entities attach to the concrete organization types created in Phase 3.

### EducationOrganizationNetwork

Resource: `educationOrganizationNetworks`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `educationOrganizationNetworkId` | integer | The identifier assigned to the network. |
| `nameOfInstitution` | string | The name of the network. |
| `networkPurposeDescriptor` | string | Reference to a `NetworkPurposeDescriptor` created in Phase 1. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

### OrganizationDepartment

Resource: `organizationDepartments`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `organizationDepartmentId` | integer | The identifier assigned to the department. |
| `nameOfInstitution` | string | The name of the department. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

#### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `parentEducationOrganizationReference.educationOrganizationId` | integer | Reference to the organization (e.g., a `School` from Phase 3) the department belongs to. |

### AccountabilityRating

Resource: `accountabilityRatings`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `ratingTitle` | string | The title of the accountability rating. |
| `rating` | string | The rating value assigned. |
| `educationOrganizationReference.educationOrganizationId` | integer | Reference to a concrete organization (e.g., a `School` or `LocalEducationAgency`) from Phase 3. |
| `schoolYearTypeReference.schoolYear` | integer | Reference to the `SchoolYearType` created in Phase 2. |

Each resource in this phase supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Example: AccountabilityRating

```json
{
  "ratingTitle": "State Accountability Rating",
  "rating": "B",
  "educationOrganizationReference": {
    "educationOrganizationId": 255901001
  },
  "schoolYearTypeReference": {
    "schoolYear": 2020
  }
}
```

## Phase 5: Organization Associations

These association resources link two organizations created in Phase 3 (and,
for networks, Phase 4). None require descriptors of their own.

| Entity | Resource Endpoint | Required Fields |
| --- | --- | --- |
| EducationOrganizationNetworkAssociation | `/educationOrganizationNetworkAssociations` | `memberEducationOrganizationReference`, `educationOrganizationNetworkReference` |
| EducationOrganizationPeerAssociation | `/educationOrganizationPeerAssociations` | `educationOrganizationReference`, `peerEducationOrganizationReference` |
| FeederSchoolAssociation | `/feederSchoolAssociations` | `beginDate`, `feederSchoolReference`, `schoolReference` |

Each resource above supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Example: FeederSchoolAssociation

```json
{
  "beginDate": "2020-07-01",
  "feederSchoolReference": {
    "schoolId": 255901002
  },
  "schoolReference": {
    "schoolId": 255901001
  }
}
```

## Phase 6: Community and Post-Secondary Entities

These entities form independent sub-trees that reuse the descriptors from
Phase 1 but do not depend on the SEA/ESC/LEA/School hierarchy from Phase 3.

### CommunityOrganization

Resource: `communityOrganizations`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `communityOrganizationId` | integer | The identifier assigned to the community organization. |
| `nameOfInstitution` | string | The name of the community organization. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

### CommunityProvider

Resource: `communityProviders`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `communityProviderId` | integer | The identifier assigned to the community provider. |
| `nameOfInstitution` | string | The name of the community provider. |
| `providerCategoryDescriptor` | string | Reference to a `ProviderCategoryDescriptor` created in Phase 1. |
| `providerStatusDescriptor` | string | Reference to a `ProviderStatusDescriptor` created in Phase 1. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

### CommunityProviderLicense

Resource: `communityProviderLicenses`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `licenseIdentifier` | string | The unique identifier issued by the licensing organization. |
| `licensingOrganization` | string | The organization issuing the license. |
| `licenseTypeDescriptor` | string | Reference to a `LicenseTypeDescriptor` created in Phase 1. |
| `licenseEffectiveDate` | string (date) | The date on which the license becomes effective. |
| `communityProviderReference.communityProviderId` | integer | Reference to the `CommunityProvider` created above. |

### PostSecondaryInstitution

Resource: `postSecondaryInstitutions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `postSecondaryInstitutionId` | integer | The identifier assigned to the post-secondary institution. |
| `nameOfInstitution` | string | The name of the institution. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

Each resource in this phase supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Example: CommunityProvider

```json
{
  "communityProviderId": 1001,
  "nameOfInstitution": "Grand Bend Community Learning Center",
  "providerCategoryDescriptor": "uri://ed-fi.org/ProviderCategoryDescriptor#Licensed Center",
  "providerStatusDescriptor": "uri://ed-fi.org/ProviderStatusDescriptor#Active",
  "categories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#Community Provider" }
  ]
}
```

### Example: CommunityProviderLicense

```json
{
  "licenseIdentifier": "CP-1001-2020",
  "licensingOrganization": "State Department of Family Services",
  "licenseTypeDescriptor": "uri://ed-fi.org/LicenseTypeDescriptor#Child Care Center",
  "licenseEffectiveDate": "2020-07-01",
  "communityProviderReference": {
    "communityProviderId": 1001
  }
}
```
