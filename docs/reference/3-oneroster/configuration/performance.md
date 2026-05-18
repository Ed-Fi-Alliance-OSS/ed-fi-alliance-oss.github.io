# Performance

This page summarizes the tuning decisions that most affect the
Ed-Fi OneRoster® service's response times and ODS load. Measured
latency and throughput numbers, the reference dataset, and the
Vegeta input files used to reproduce a run are maintained with the
service code at
[`tests/README.md`](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/tree/main/tests#performance-testing---initial-postgres-centric-implementation).
They rot quickly as the service, the ODS schema, and the Data
Standard evolve, so this page intentionally does not restate them.

## What tends to dominate response time

Two endpoints do most of the work at refresh time and at read time:

- `/enrollments` spans every staff-section and student-section
  association in the ODS and grows with enrolled population.
- `/users` joins across students, staff, contacts, and their school
  and education-organization associations.

Plan refresh budgets and collection-read SLAs around these two. The
remaining endpoints are comparatively cheap.

## Operational guidance

- **Refresh cadence.** The 15-minute default
  ([`PGBOSS_CRON`](./environment-variables.md) on PostgreSQL, SQL
  Server Agent on SQL Server) balances ODS load against consumer
  freshness expectations. Dropping below 5 minutes is possible on
  dedicated database hardware but increases ODS-side CPU.
- **Client access pattern.** Full-collection reads of `/enrollments`
  and `/users` are the most expensive. Where possible, consumers
  should read `/orgs` once, then request only the slices they need
  via `filter` and `fields`. See [Query
  parameters](../data-model/endpoint-source-mapping.md#query-parameters).
- **Sizing.** Published numbers are from a laptop-class reference
  run. A statewide deployment should re-measure on its target
  hardware and data profile before committing to cadence or an SLA.
