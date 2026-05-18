# Organization Mapping

The OneRoster® v1.2 `/orgs` endpoint exposes schools, districts, and state
agencies from an Ed-Fi ODS, keeping the parent / child hierarchy intact.
This page documents how OneRoster org records are derived, how the `type`
field is assigned, and how custom or non-standard Ed-Fi education
organizations are treated.

The derivation is defined in `orgs.sql` under
`standard/{dataStandardVersion}/artifacts/pgsql/core/` (materialized view)
or the equivalent `mssql/core/` script (refresh procedure).

## Source entities and `type` derivation

OneRoster `org.type` is derived from the Ed-Fi entity table that each row
comes from. No descriptor value participates in the decision.

| OneRoster `type` | Ed-Fi source table | OneRoster `identifier` | `sourcedId` input |
| --- | --- | --- | --- |
| `school` | `edfi.school` joined to `edfi.educationOrganization` on `schoolId` | `schoolId` | `md5(schoolId)` |
| `district` | `edfi.localEducationAgency` joined on `localEducationAgencyId` | `localEducationAgencyId` | `md5(localEducationAgencyId)` |
| `state` | `edfi.stateEducationAgency` joined on `stateEducationAgencyId` | `stateEducationAgencyId` | `md5(stateEducationAgencyId)` |

The OneRoster v1.2 `OrgType` enumeration also defines `local` and
`national`. Neither value is emitted by the service. Every row produced by
`orgs.sql` is one of `school`, `district`, or `state`.

Each row also includes:

- `status = 'active'` (hardcoded)
- `name` from `educationOrganization.nameOfInstitution`
- `dateLastModified` from `educationOrganization.lastModifiedDate`
- `metadata.edfi.resource` set to `schools`, `localEducationAgencies`, or
  `stateEducationAgencies`, with the Ed-Fi natural key echoed back

## Custom `EducationOrganizationCategoryDescriptor` values

:::info

**Custom `EducationOrganizationCategoryDescriptor` values have no effect on
OneRoster `org.type`.** The view keys off which Ed-Fi entity table the row
lives in (`edfi.school`, `edfi.localEducationAgency`, or
`edfi.stateEducationAgency`). It does not read
`edfi.descriptor` for `EducationOrganizationCategory`.

:::

Implications:

- An `edfi.school` row is always emitted as OneRoster `type = 'school'`,
  regardless of the `EducationOrganizationCategoryDescriptor` assigned to
  it.
- Deployments with custom school or LEA categories (for example, charter
  school networks) do not need to add any descriptor mapping to have those
  organizations appear correctly in `/orgs`.
- There is no supported way, in the current release, to project Ed-Fi rows
  into OneRoster `type = 'local'` or `type = 'national'`. Teams that
  require those values should raise an issue against the OneRoster
  service.

## Parent / children composition

OneRoster `parent` and `children` are assembled from the Ed-Fi ODS
`educationOrganization` hierarchy.

### Schools

Each school's `parent` is its LEA when
`edfi.school.localEducationAgencyId` is populated:

```json
{
  "parent": {
    "href": "/orgs/<md5(localEducationAgencyId)>",
    "sourcedId": "<md5(localEducationAgencyId)>",
    "type": "org"
  },
  "children": null
}
```

A school with no `localEducationAgencyId` is emitted with `parent = null`.
Schools always emit `children = null`.

### LEAs (districts)

Each LEA's `parent` is its SEA when
`edfi.localEducationAgency.stateEducationAgencyId` is populated.
`children` is a JSON array of every `edfi.school` row whose
`localEducationAgencyId` matches this LEA:

```json
{
  "parent": {
    "href": "/orgs/<md5(stateEducationAgencyId)>",
    "sourcedId": "<md5(stateEducationAgencyId)>",
    "type": "org"
  },
  "children": [
    { "href": "/orgs/<md5(schoolId1)>", "sourcedId": "...", "type": "org" },
    { "href": "/orgs/<md5(schoolId2)>", "sourcedId": "...", "type": "org" }
  ]
}
```

An LEA with no `stateEducationAgencyId` is emitted with `parent = null`.

### SEAs (states)

SEAs never have a parent. `parent` is always `null`. `children` is a JSON
array of every LEA whose `stateEducationAgencyId` matches this SEA.
Schools do not appear directly in an SEA's `children`. They are reached
transitively through the SEA's LEAs.

## Other Ed-Fi education organization types

`orgs.sql` reads only from `edfi.school`, `edfi.localEducationAgency`, and
`edfi.stateEducationAgency`. Other Ed-Fi education organization subtypes
(for example `educationServiceCenter`, `organizationDepartment`,
`postSecondaryInstitution`, `communityOrganization`, `communityProvider`)
have rows in `edfi.educationOrganization` but no row in the three tables
above, so they are not emitted to OneRoster `/orgs`.

If an implementation needs to expose an intermediate unit as a OneRoster
organization, a workable approach is to record it as an Ed-Fi
`localEducationAgency` (setting `stateEducationAgencyId` as appropriate)
and associate its schools through `edfi.school.localEducationAgencyId`.
This uses only the supported mapping and keeps the hierarchy intact.

## Schools without `educationOrganization` rows

`orgs.sql` uses an inner join between `edfi.school` and
`edfi.educationOrganization`. A school that exists in `edfi.school` but
has no matching row in `edfi.educationOrganization` will not appear in
`/orgs`. This is uncommon in a healthy ODS but can arise from partial
imports. If schools are missing from OneRoster output, confirm that
`edfi.educationOrganization` contains a row for each `schoolId`.

## Authorization scope

`orgs.sql` indexes the materialized view by `educationOrganizationId` so
that row-level authorization in the service can filter on the Ed-Fi
EdOrg. See [OAuth and JWT](../configuration/oauth-and-jwt.md) for the
scope model that governs which org rows a given token is allowed to read.
