---
sidebar_position: 1
---

# What is the Ed-Fi OneRoster© Service

The Ed-Fi OneRoster© service is a Node.js application that serves a
[1EdTech OneRoster© v1.2
Rostering](https://www.imsglobal.org/spec/oneroster/v1p2) API from data in an
Ed-Fi ODS. It complements the Ed-Fi ODS / API, which remains the system of
record and continues to serve the full Ed-Fi Data Standard resource set.

Use the OneRoster© service when a vendor application expects a OneRoster©
v1.2 feed and the source of truth for rostering data lives in an Ed-Fi ODS.

## How it fits with the ODS / API

The service does not replace the Ed-Fi ODS / API. It sits alongside it:

- The ODS / API continues to write and read Ed-Fi resources against the ODS
  database.
- The OneRoster© service reads from the same ODS database through a separate
  `oneroster12` schema. On PostgreSQL this schema holds materialized views;
  on Microsoft SQL Server it holds tables populated by stored procedures.
- OAuth 2.0 tokens for OneRoster© clients are issued by the Ed-Fi ODS / API
  or by an external identity provider configured to match. See
  [OAuth and JWT](./configuration/oauth-and-jwt.md) for the specifics.

Refresh of the derived OneRoster© views runs on a schedule, independent of
ODS / API traffic. The default cadence is every 15 minutes.

## Supported OneRoster© v1.2 endpoints

All endpoints are versioned under `/ims/oneroster/rostering/v1p2/` and
require an OAuth 2.0 bearer token with a OneRoster© scope. See [OAuth and
JWT](./configuration/oauth-and-jwt.md) for the scope model.

| Endpoint | Ed-Fi source entities |
| --- | --- |
| `GET /academicSessions`, `GET /academicSessions/{id}` | `sessions`, `schools`, `schoolCalendars` |
| `GET /classes`, `GET /classes/{id}` | `sections`, `courseOfferings`, `schools` |
| `GET /courses`, `GET /courses/{id}` | `courses`, `courseOfferings`, `schools` |
| `GET /demographics`, `GET /demographics/{id}` | `students`, `studentEducationOrganizationAssociations` |
| `GET /enrollments`, `GET /enrollments/{id}` | `staffSectionAssociations`, `studentSectionAssociations`, `sections` |
| `GET /orgs`, `GET /orgs/{id}` | `schools`, `localEducationAgencies`, `stateEducationAgencies` |
| `GET /users`, `GET /users/{id}` | `staffs`, `students`, `contacts` and their school / EdOrg associations |
| `GET /schools`, `GET /schools/{id}` | subset of `orgs` |
| `GET /students`, `GET /students/{id}` | subset of `users` |
| `GET /teachers`, `GET /teachers/{id}` | subset of `users` |
| `GET /gradingPeriods`, `GET /gradingPeriods/{id}` | subset of `academicSessions` |
| `GET /terms`, `GET /terms/{id}` | subset of `academicSessions` |

See [Endpoint to Ed-Fi source mapping](./data-model/endpoint-source-mapping.md)
for field-level detail.

All endpoints accept the OneRoster© v1.2 query parameters `limit` (default
100), `offset` (default 0), `sort`, `orderBy`, `filter`, and `fields`.

:::info

The following OneRoster© v1.2 features are _not_ implemented in the current
release:

- Nested convenience endpoints such as `/classes/{id}/students`. These are
  not required for OneRoster© certification.
- The `X-Total-Count` response header and pagination `Link` header.
- Multi-tenant deployments.

:::

## How the service relates to the Ed-Fi Data Standard

OneRoster© v1.2 defines a smaller, rostering-focused set of entities than the
Ed-Fi Data Standard. The service bridges the two in three ways:

- OneRoster© `org.type` is derived from Ed-Fi entity tables (school, LEA,
  SEA), not from `EducationOrganizationCategoryDescriptor`. See [Org and
  agency mapping](./data-model/org-and-agency-mapping.md).
- A small set of Ed-Fi descriptors is mapped to OneRoster© enumerations
  through rows in `edfi.descriptormapping` that are seeded during
  deployment. See [Descriptor mappings](./data-model/descriptor-mappings.md).
- OneRoster© school-year academic sessions are synthesized from Ed-Fi
  calendar events.

Clients receive OneRoster©-spec-compliant JSON. The Ed-Fi natural keys are
preserved in each record's `metadata` field so that records can be traced
back to the ODS without joining on the hashed `sourcedId`.

## Integration with the Ed-Fi ODS / API

The Ed-Fi ODS / API (version 7.3 and later) exposes feature-management
settings and claim-set entries that govern how OneRoster© clients are issued
tokens and which scopes they may request. For the ODS / API-side
configuration, see the [Features
reference](/reference/ods-api/platform-dev-guide/features/) in the ODS / API
v7.3 platform developer guide. The OneRoster© entry on that page documents
the `FeatureManagement:OneRoster` setting and the related claim-set wiring.
