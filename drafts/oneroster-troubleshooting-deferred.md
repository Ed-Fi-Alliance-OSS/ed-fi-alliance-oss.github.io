# OneRoster troubleshooting (deferred)

This file preserves a drafted `operations/troubleshooting.md` page
that was written for the Ed-Fi OneRoster® service and then deferred
before shipping. It lives here for future consideration. It is not
built or published (the `drafts/` folder is excluded from the
Docusaurus build).

## Why it was deferred

The symptoms below were synthesized from a read of the OneRoster
service codebase and the existing configuration pages, not from
real operator reports, support tickets, or post-mortems. Several
symptoms are plausible but unobserved in the field. Shipping the
page before real pilot feedback exists would put the docs in the
position of guessing at failure modes rather than documenting
them.

The intent is to bring this page back, with reviews from actual
operators, once the pilot generates real incident reports. At
that point:

- Confirm each symptom is a failure mode that has actually
  occurred on a pilot deployment.
- Drop any symptom that has not been observed.
- Add any symptom that has been observed and is missing.
- Re-validate every cross-reference anchor against the published
  configuration and data-model pages.
- Verify the `TRUST_PROXY` behavior in a real reverse-proxy setup
  before publishing the "401 behind a reverse proxy" symptom.

## Scope when the page was drafted

The draft groups failure modes into four categories:

- Authentication failures (401 patterns).
- Empty or missing endpoint responses (descriptor mapping gaps,
  Grand Bend dataset idiosyncrasies, refresh lag).
- Refresh stalls on both PostgreSQL and Microsoft SQL Server.
- Database connectivity (500s, TLS startup failures).

Confidence on each symptom varied. The `/demographics` scope,
descriptor-mapping-driven empties, PG `PGBOSS_CRON` behavior, PG
`REFRESH ... CONCURRENTLY` index requirement, and MSSQL Agent
disabled-in-Docker symptoms are backed by existing shipped source.
The "401 behind a reverse proxy", generic HTTP 500 on DB permissions,
and TLS startup failure symptoms were inferred rather than observed.

---

# Troubleshooting

The most common issues when running the Ed-Fi OneRoster® service
fall into four groups: authentication failures, empty or missing
endpoint responses, descriptor mapping gaps, and refresh stalls.
This page lists the symptoms, the usual cause, and the fix.

For startup configuration, see [Environment variables](../docs/reference/11-oneroster/configuration/environment-variables.md).
For authentication specifics, see [OAuth and JWT](../docs/reference/11-oneroster/configuration/oauth-and-jwt.md).
For how records are built from Ed-Fi sources, see [Data Model](../docs/reference/11-oneroster/data-model/readme.mdx).

## Authentication failures

### Symptom: every request returns HTTP 401

All requests to `/ims/oneroster/rostering/v1p2/*` return:

```json
{
  "imsx_codeMajor": "failure",
  "imsx_severity": "error",
  "imsx_description": "Authentication failed: Invalid or missing token."
}
```

The service never issues tokens. It only validates tokens presented
on inbound requests. A 401 always means the token could not be
validated against the configured issuer. Likely causes:

- No `Authorization: Bearer` header on the request.
- `iss` claim in the token does not match `OAUTH2_ISSUERBASEURL`.
- `aud` claim in the token does not match `OAUTH2_AUDIENCE`.
- `exp` claim is in the past.
- Token is signed with a different key than the configured issuer
  advertises on its JWKS endpoint.
- JWKS endpoint is unreachable from the OneRoster host. The service
  logs the network error at startup and on first validation.

_Fix:_ decode the token at [jwt.io](https://jwt.io) and compare the
`iss`, `aud`, and `exp` claims against the values in the service
`.env`. Confirm that `{OAUTH2_ISSUERBASEURL}/.well-known/jwks.json`
is reachable from the service host with `curl`.

See [OAuth and JWT, Claims inspected](../docs/reference/11-oneroster/configuration/oauth-and-jwt.md#claims-inspected).

### Symptom: 401 only on `/demographics`

Tokens for `/demographics` require the `roster-demographics.readonly`
or `roster.readonly` scope. `roster-core.readonly` is not sufficient.

_Fix:_ request the correct scope from the issuer. See
[OneRoster v1.2 scopes](../docs/reference/11-oneroster/configuration/oauth-and-jwt.md#oneroster-v12-scopes).

### Symptom: 401 behind a reverse proxy (IIS, NGINX, ARR)

A reverse proxy that strips or rewrites the `Authorization` header
will cause this. Confirm the proxy forwards the `Authorization`
header unchanged, and that `TRUST_PROXY` is set appropriately if the
service uses `X-Forwarded-*` headers for URL reconstruction.

See [CORS, rate limiting, and proxy](../docs/reference/11-oneroster/configuration/cors-rate-limit-proxy.md).

## Empty or missing endpoint responses

### Symptom: `/orgs` returns rows but `/schools` returns none

`/schools` is `/orgs` filtered to `type = 'school'`. An empty
`/schools` with a populated `/orgs` means there are no rows in the
`orgs` materialized view whose `type` resolves to `school`, which
means no rows in `edfi.school` joined to `edfi.educationOrganization`.

_Fix:_ confirm each `edfi.school.schoolId` has a matching
`edfi.educationOrganization.educationOrganizationId` row. See
[Schools without `educationOrganization` rows](../docs/reference/11-oneroster/data-model/organization-mapping.md#schools-without-educationorganization-rows).

### Symptom: `/terms` or `/gradingPeriods` is empty

The service emits terms and grading periods only from
`edfi.session` rows whose `TermDescriptor` is mapped to the
corresponding OneRoster value in `edfi.descriptormapping`. An
unmapped `TermDescriptor` drops the entire session (see
[Descriptor mappings, unmapped behavior](../docs/reference/11-oneroster/data-model/descriptor-mappings.md#behavior-for-unmapped-values)).

Additionally, the stock Ed-Fi Grand Bend reference dataset ships no
session rows with term-mapped descriptors. Out-of-the-box Grand Bend
will always return empty `/terms` and `/gradingPeriods`.

_Fix:_ verify `edfi.session` contains rows and that the
`TermDescriptor` values on those sessions have mapping rows in
`edfi.descriptormapping` with `mappednamespace =
'uri://1edtech.org/oneroster12/TermDescriptor'`. For Grand Bend
specifically, load the augmentation under
`tests/grand-bend-augmentation/` in the service repository. See
[Reproducing conformance on your own deployment](../docs/reference/11-oneroster/conformance.md#reproducing-conformance-on-your-own-deployment).

### Symptom: a principal or counselor is missing from `/users`

Staff members whose `StaffClassificationDescriptor` is not in the
shipped mapping are filtered out of `/users` if they also have no
section assignments. Twelve Ed-Fi-shipped staff classifications are
unmapped by default. See [Known unmapped Ed-Fi
StaffClassificationDescriptor values](../docs/reference/11-oneroster/data-model/descriptor-mappings.md#known-unmapped-ed-fi-staffclassificationdescriptor-values).

_Fix:_ add a mapping row for the local classification, pointing it
at the closest OneRoster `role` for your deployment (commonly
`teacher`, `aide`, or `siteAdministrator`). Then refresh the `users`
view. See [Extending a mapping](../docs/reference/11-oneroster/data-model/descriptor-mappings.md#extending-a-mapping).

### Symptom: a student is in `/users` but has no demographics

Demographics come from separate Ed-Fi tables and require mapped
descriptor values. Unmapped `SexDescriptor` leaves `sex` as `null`.
Unmapped `RaceDescriptor` drops the race value from the array. The
student is still returned by both `/users` and `/demographics`. See
[Descriptor mappings, unmapped behavior](../docs/reference/11-oneroster/data-model/descriptor-mappings.md#behavior-for-unmapped-values).

### Symptom: recent Ed-Fi changes do not appear

The service reads from derived `oneroster12` objects, not the Ed-Fi
tables directly. Changes become visible only after the corresponding
view refreshes. Default cadence is every 15 minutes.

_Fix:_ check the service logs for `[CronService]` entries confirming
the refresh queue is scheduled, or for errors from the refresh
procedure.

## Refresh stalls

### Symptom: PostgreSQL, views not refreshing

The Node service initializes pg-boss at startup. If `PGBOSS_CRON` is
unset, the queues exist but nothing is scheduled.

_Fix:_ set `PGBOSS_CRON` (default `*/15 * * * *`) in the service
environment and restart.

Confirm pg-boss connectivity. The service logs `[CronService] Error
starting CRON jobs` if pg-boss cannot connect to PostgreSQL with the
same credentials the service uses for data reads.

### Symptom: PostgreSQL, `REFRESH MATERIALIZED VIEW CONCURRENTLY` fails

`CONCURRENTLY` requires a unique index on the view. The shipped SQL
artifacts create the required indexes in `00_setup.sql`. If the
indexes are missing (for example, after a manual `DROP INDEX`),
`REFRESH` falls back to blocking mode or errors outright.

_Fix:_ redeploy the SQL artifacts, or recreate the unique indexes
manually.

### Symptom: Microsoft SQL Server, views not refreshing

SQL Server Agent must be running. In Microsoft SQL Server in Docker
the agent is off by default. The service reports no error in this
case because the refresh is scheduled outside the Node process.

_Fix:_ add `MSSQL_AGENT_ENABLED=True` to the container environment
and restart. Confirm agent status in SSMS or via `EXEC
msdb.dbo.sp_help_job`.

See [Deploy on Microsoft SQL Server](../docs/reference/11-oneroster/getting-started/deploy-mssql.md).

## Database connectivity

### Symptom: service starts but every request returns HTTP 500

The database pool is unreachable or the configured database user
cannot read the `oneroster12` schema. Node logs will show a
connection error or a permissions error on the first query.

_Fix:_ confirm the service's database credentials match the
credentials used to deploy the `oneroster12` schema, and that the
role has `USAGE` on the schema and `SELECT` on each view or table.
See [Environment variables, Database section](../docs/reference/11-oneroster/configuration/environment-variables.md#database).

### Symptom: service fails to start with TLS error

With `DB_SSL=true` and `DB_SSL_CA` pointing to a missing or empty
file, the service fails fast at startup.

_Fix:_ confirm the CA PEM path is correct and readable by the
service process.

## Getting more help

If the issue is not covered above and is not a configuration problem:

- Enable verbose logging via `NODE_ENV=dev` and retry. The failing
  SQL query or HTTP error detail will be logged.
- Check the [service repository
  issues](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/issues)
  for similar reports.
- File a new issue with the failing request, the service logs around
  the failure, and the Data Standard and database engine in use.
