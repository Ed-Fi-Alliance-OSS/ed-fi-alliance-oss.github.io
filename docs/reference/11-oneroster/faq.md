---
sidebar_position: 6
---

# Ed-Fi OneRoster® FAQ

This FAQ covers adoption-stage questions about the Ed-Fi OneRoster
service: when it fits, when the Ed-Fi ODS / API is a better choice,
how it relates to Assessment Registration, and what the current
release readiness looks like. For the technical introduction to the
service, its endpoints, and supported versions, see the [OneRoster
section overview](./readme.mdx).

## Why the OneRoster service exists

### Q: Why did the Ed-Fi Alliance and 1EdTech® build this together?

States and vendors needed a consistent way to read Ed-Fi roster data
without building custom pipelines for each integration. The
collaboration keeps two existing standards usable side by side: the
Ed-Fi Data Standard for the full data set, and OneRoster v1.2 for
the rostering subset that many vendors already support. Shipping a
reference implementation from the Ed-Fi Alliance reduces the number
of divergent CSV and custom-API pipelines that agencies have to
maintain.

## Who this is for

### Q: Who should consider using the Ed-Fi OneRoster service?

The service fits four audiences, each reading roster data from a
different angle. Each audience gets one sentence, then a pointer to
the part of the section that matters most for them.

_Vendor applications._ Use the service when your application already
consumes OneRoster v1.2 and you want a standards-compliant feed
from an Ed-Fi ODS instead of building and maintaining bespoke
integrations per district. Start at [Getting Started](./getting-started/readme.mdx)
to stand up a development deployment.

_State and regional education agencies._ Use the service to offer
vendors a single, predictable rostering endpoint backed by the data
already in your Ed-Fi ODS, reducing the fragmentation of per-vendor
roster pipelines across your districts. Start at [How the service
fits with the Ed-Fi ODS / API](./readme.mdx#how-the-service-fits-with-the-ed-fi-ods--api-and-data-standard).

_Managed service providers._ Use the service to offer a coordinated
OneRoster-on-Ed-Fi deployment as a managed service to the agencies
and districts you support, standardizing the integration surface
you carry across customers. Start at [Deploy on PostgreSQL](./getting-started/deploy-postgres.md)
or the Microsoft SQL Server equivalent, then review [Configuration](./configuration/readme.mdx).

_School districts._ The service is typically operated by the
district's SEA or an MSP, not the district itself. If your district
runs its own Ed-Fi ODS, the guidance above for SEAs applies; most
districts will interact with this work through their existing
vendor and agency relationships.

See [Who might not need it](#q-who-might-not-need-it) for the cases
where the service is not the right fit.

### Q: Who might not need it?

The service is not the right fit if you:

- Need historical reporting, longitudinal analytics, or outcome data.
  Neither the OneRoster service nor the Ed-Fi ODS / API itself is the
  right source for that work; the ODS is operational storage, and
  analytics belong in a downstream data warehouse or reporting
  pipeline sourced from the ODS.
- Depend on custom filtering or business logic beyond the OneRoster
  v1.2 query model (`limit`, `offset`, `sort`, `orderBy`, `filter`,
  `fields`).
- Already have a stable rostering pipeline that meets your vendors'
  needs.
- Do not run an Ed-Fi ODS. The service reads directly from the ODS
  database; it is not a standalone store.

## OneRoster vs. Ed-Fi ODS / API: when to use which

### Q: When should I use the Ed-Fi OneRoster service?

Use the OneRoster service when the question a vendor needs answered
is "who is rostered where, right now." It is the right fit when:

- A vendor application already expects OneRoster v1.2.
- The use case is full-roster reads or operational rostering (who
  teaches which class at which school).
- You want to reduce the number of Ed-Fi API endpoints a vendor has
  to combine to build a roster.

### Q: When should I use the Ed-Fi ODS / API instead?

Use the ODS / API when you need:

- Program, assessment, or outcome data beyond what OneRoster
  rostering covers.
- State-specific workflows or custom business logic on incoming data.
- To write data into the system. The OneRoster service is read-only.

For longitudinal reporting and analytics, neither the OneRoster
service nor the Ed-Fi ODS / API is the right source. That work
belongs in a downstream data warehouse or reporting pipeline sourced
from the ODS.

### Q: What does the OneRoster service not do?

The service is read-only and refreshes on a schedule. It does not
deliver real-time updates, and it is not a source for longitudinal
reporting or analytics. That work belongs in a downstream data
warehouse or reporting pipeline sourced from the Ed-Fi ODS.

## Relationship to Assessment Registration

### Q: Does the OneRoster service replace Ed-Fi Assessment Registration?

No. The two address different problems.

- Ed-Fi Assessment Registration identifies which students take which
  assessments, including accommodations and administration details.
- The OneRoster service provides general roster data for
  instructional use.

Keeping the two separate is the current Ed-Fi Alliance
recommendation.

### Q: Can the OneRoster service be used by assessment vendors?

In some cases, yes. The service can feed an assessment vendor the
instructional roster (classes, enrollments, teachers of record)
while assessment eligibility, accommodations, and administration
data are handled through Assessment Registration or another
workflow. It does not cover end-to-end assessment workflows on its
own.

## Specification alignment and extensions

### Q: Is the service aligned with the OneRoster specification?

Yes. The service implements OneRoster v1.2 Rostering and exposes the
standard endpoints (`/orgs`, `/users`, `/classes`, `/enrollments`,
and the related filtered views for `/schools`, `/students`,
`/teachers`, `/terms`, and `/gradingPeriods`). It identifies itself
as OneRoster v1.2 and does not add an Ed-Fi-specific version label.

### Q: What about extensions and additional fields?

The service preserves Ed-Fi natural keys in each record's `metadata`
field so that records can be traced back to the ODS. Beyond that,
OneRoster v1.2 metadata extensions are supported as the
specification allows.

## Performance, scale, and operations

### Q: Is the service suitable for statewide use?

Yes, for read-heavy rostering traffic. The service is backed by
pre-built views or tables in the ODS (materialized views on
PostgreSQL, tables populated by stored procedures on Microsoft SQL
Server) that refresh on a schedule, independent of ODS / API
traffic. It supports full-roster reads with pagination as described
in [Query
parameters](./data-model/endpoint-source-mapping.md#query-parameters).
It is not designed for real-time updates or event streaming.

### Q: Does the service support multi-tenancy?

Yes, in two forms, which can be combined:

- _Multi-tenant mode._ Multiple Ed-Fi tenants, each with its own
  `EdFi_Admin` database. Each OneRoster request carries a tenant
  identifier in both the URL and the JWT, and the service routes to
  the tenant's admin database before resolving the ODS.
- _Multi-instance within a tenant._ A single `EdFi_Admin` that hosts
  multiple ODS instances (for example, one per school year). The JWT
  carries the list of ODS instances the caller is authorized for, and
  the service selects among them by matching the URL's context
  segment (typically school year).

See [Connection and
tenancy](./configuration/environment-variables.md#connection-and-tenancy)
for how to enable each mode and [JWT claims used for ODS
resolution](./configuration/oauth-and-jwt.md#jwt-claims-used-for-ods-resolution)
for the claims the authorization server must populate.

## Adoption and next steps

### Q: Is the service production-ready?

Yes. The service is released independently of the Ed-Fi ODS / API
and supports Data Standard 4.0 and 5.0 through 5.2 from a single
code base. Pair it with Ed-Fi ODS / API 7.3.2 or later, which ships
the `FeatureManagement:OneRoster` setting and the claim-set entries
that authorize OneRoster clients. See [OAuth and
JWT](./configuration/oauth-and-jwt.md) for the wiring details.

### Q: What should I do next?

- _States:_ Identify vendor integrations that could move from a
  custom roster pipeline to the OneRoster feed, and decide which
  ODS / API version to pair the service with.
- _Vendors:_ Confirm the OneRoster client supports v1.2, then test
  against a development deployment using the [Getting
  Started](./getting-started/readme.mdx) guides.
- _Implementers:_ Review the [Data Model](./data-model/readme.mdx)
  section, especially [descriptor
  mappings](./data-model/descriptor-mappings.md), to decide whether
  the shipped mappings cover your environment or need extension.
