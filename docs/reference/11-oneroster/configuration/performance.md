# Performance

This page summarizes measured performance for the Ed-Fi OneRoster®
service on a reference dataset. The numbers describe what the
service did on the test hardware described below. They are not a
capacity guarantee for production deployments.

The authoritative measurements and the test artifacts live in the
service repository at
[`tests/README.md`](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/tree/main/tests#performance-testing---initial-postgres-centric-implementation).
The summary here is kept short and cross-links back to the source
files.

## Reference dataset

| Entity | Count |
| --- | --- |
| Local Education Agencies | 1 |
| Schools | 6 |
| Staff | 500 |
| Students | 5,000 |
| Courses | 1,500 |
| School years | 1 |
| Total Ed-Fi records | ~160,000 across 23 Ed-Fi resources |
| Total JSON size | 62 MB |

The dataset models a small district. It is not representative of a
statewide deployment. Observed latency and throughput on a
statewide ODS will differ.

## Test environment

- Ed-Fi ODS / API 7.1 (Data Standard 5.0), running locally in Docker
- Lenovo laptop with Intel i5 2.6 GHz, 16 GB RAM, 500 GB SSD
- PostgreSQL 16
- OneRoster Node service running on the same host

## Materialized view refresh times

Times are averages across five runs of `REFRESH MATERIALIZED VIEW`
on the PostgreSQL implementation. See
[Refresh](../data-model/refresh.md) for the refresh mechanics.

| View | Create time | Refresh time | Observation |
| --- | --- | --- | --- |
| `academicsessions` | 0.089 s | 0.075 s | Simple joins |
| `orgs` | 0.081 s | 0.075 s | Small source set |
| `courses` | 0.107 s | 0.117 s | Straightforward derivation |
| `demographics` | 0.219 s | 0.169 s | Moderate complexity |
| `classes` | 0.341 s | 0.428 s | Moderate complexity |
| `enrollments` | 6.598 s | 6.814 s | Largest result set |
| `users` | 7.885 s | 8.025 s | Most-complex joins |

The `users` view joins across students, staff, contacts, and their
school and education-organization associations. The `enrollments`
view spans every staff-section and student-section association in
the ODS. Both grow with enrolled population. Plan the refresh budget
around these two.

SQL Server refresh times are not in the source data; the current
measurements are PostgreSQL-only.

## API latency and throughput

API latency was measured with [Vegeta](https://github.com/tsenart/vegeta)
at maximum in-flight concurrency (20 workers, no rate cap) for 60
seconds per endpoint. All responses were served successfully.

| Endpoint | Rate (req/sec) | Mean latency (ms) | Success rate |
| --- | --- | --- | --- |
| `/academicSessions` | 129 | 155 | 100% |
| `/academicSessions/{id}` | 193 | 103 | 100% |
| `/classes` | 55 | 142 | 100% |
| `/classes/{id}` | 246 | 81 | 100% |
| `/courses` | 91 | 199 | 100% |
| `/courses/{id}` | 167 | 120 | 100% |
| `/demographics` | 72 | 199 | 100% |
| `/demographics/{id}` | 245 | 82 | 100% |
| `/enrollments` | 64 | 185 | 100% |
| `/enrollments/{id}` | 179 | 112 | 100% |
| `/orgs` | 143 | 139 | 100% |
| `/orgs/{id}` | 134 | 150 | 100% |
| `/users` | 89 | 154 | 100% |
| `/users/{id}` | 217 | 92 | 100% |

Observations from the reference run:

- Every endpoint stayed under 200 ms mean latency.
- Single-record endpoints (`{id}` form) were faster than the
  corresponding collection endpoints, as expected.
- `/classes`, `/enrollments`, and `/demographics` collection
  endpoints were the three slowest endpoints by throughput. These
  are the endpoints that benefit most from client-side filtering
  using `filter` and `fields` query parameters rather than unscoped
  full-collection reads.

## Input files and reproducing the run

The Vegeta input files used for these measurements are in
`tests/vegeta-files/` in the service repository. Each file lists
the URLs for one endpoint and can be replayed against any deployment:

```bash
vegeta attack \
    -duration=60s \
    -targets=tests/vegeta-files/users.txt \
    -header 'authorization: Bearer <TOKEN>' \
    --rate 0 \
    -max-workers 20 \
  | tee results.bin \
  | vegeta report
```

Single-record (`{id}`) files are not shipped. Construct them from
the `sourcedId` values returned by the corresponding collection run.

## Operational guidance

The measurements above suggest the following operational defaults.
Adjust for your deployment size and usage pattern.

- Refresh cadence. The 15-minute default balances ODS load against
  consumer freshness expectations. Dropping below 5 minutes is
  possible on dedicated database hardware but increases ODS-side
  CPU.
- Client access pattern. Full-collection reads of `/enrollments`
  and `/users` are the most expensive. Where possible, consumers
  should read `/orgs` once, then read only the slices they need
  with `filter`. See [Query parameters](../data-model/endpoint-source-mapping.md#query-parameters).
- Scaling up. The reference run used a laptop-class environment.
  A statewide deployment should re-run the measurements on its
  target hardware and its actual data profile before committing
  to cadence or SLA.
