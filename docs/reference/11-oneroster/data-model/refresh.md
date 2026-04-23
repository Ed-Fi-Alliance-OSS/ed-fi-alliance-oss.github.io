# Refresh

The Ed-Fi OneRoster® service does not query the Ed-Fi ODS tables
directly. Each OneRoster endpoint reads from a derived `oneroster12`
object that is recomputed on a schedule from the underlying Ed-Fi
entities. This page documents the refresh mechanics on each database
engine, the default cadence, and the implications for consumers.

## What "refresh" means on each engine

| Engine | Derived object type | Refresh mechanism | Refresh unit |
| --- | --- | --- | --- |
| PostgreSQL | Materialized view | `REFRESH MATERIALIZED VIEW`, scheduled by [pg-boss](https://timgit.github.io/pg-boss/) | One refresh per endpoint |
| Microsoft SQL Server | Plain table | Refresh stored procedures, scheduled by SQL Server Agent | One procedure per endpoint, plus an `sp_refresh_all` that runs them in order |

The seven refreshed endpoints are `academicsessions`, `classes`,
`courses`, `demographics`, `enrollments`, `orgs`, and `users`.

Filtered endpoints (`/schools`, `/students`, `/teachers`, `/terms`,
`/gradingPeriods`) are served from the same refreshed objects. They
do not have separate refresh mechanics.

## Default cadence

The shipped default is every 15 minutes on both engines.

### PostgreSQL

The Node service starts its own pg-boss worker at application
startup. Scheduling is controlled by `PGBOSS_CRON` in the service
environment. The default is `*/15 * * * *` (every 15 minutes).

If `PGBOSS_CRON` is unset, pg-boss registers the refresh queues but
does not schedule them. The service will only refresh when a job is
enqueued externally.

pg-boss uses `CronService` (see `src/services/cronService.js`). It
creates one queue per endpoint:

- `oneroster-refresh-academicsessions`
- `oneroster-refresh-classes`
- `oneroster-refresh-courses`
- `oneroster-refresh-demographics`
- `oneroster-refresh-enrollments`
- `oneroster-refresh-orgs`
- `oneroster-refresh-users`

Each queue runs independently. A slow refresh on one endpoint does
not block the others.

### Microsoft SQL Server

Scheduling is handled by SQL Server Agent jobs installed by
`deploy-mssql.js`. The default cadence is also 15 minutes. The jobs
call the refresh stored procedures in the required order.

SQL Server Agent must be running for refreshes to fire. In the stock
Microsoft SQL Server in Docker image this is off by default; add
`MSSQL_AGENT_ENABLED=True` to the container environment to enable
it. See [Deploy on Microsoft SQL Server](../getting-started/deploy-mssql.md).

## Consumer-visible freshness

From a OneRoster client's perspective, the latency between an Ed-Fi
ODS change and that change being visible through the OneRoster
endpoint is:

```text
max age = write-commit latency in the ODS
        + time until next scheduled refresh
        + refresh duration for the affected endpoint
```

In a steady-state PostgreSQL deployment with the default 15-minute
schedule, max age is approximately 15 minutes plus the refresh time
for the slowest view the change touches. See
[Performance](../configuration/performance.md) for measured refresh
times on a reference dataset.

## Changing the cadence

### PostgreSQL

Change `PGBOSS_CRON` in the service environment to a different CRON
expression and restart the service. Common values:

| Use case | Expression | Notes |
| --- | --- | --- |
| Every 5 minutes | `*/5 * * * *` | Increases CPU on the ODS host; acceptable on dedicated database servers |
| Every hour on the hour | `0 * * * *` | Good fit for overnight-only change patterns |
| Manual only | _(unset)_ | Queues stay registered; no scheduled execution |

### Microsoft SQL Server

Edit the SQL Server Agent job schedule directly through SSMS or
`sp_update_schedule`. The default installation creates a single
15-minute schedule that all seven refresh jobs share.

## Forcing a refresh manually

### PostgreSQL

```sql
-- Refresh one endpoint
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.users;

-- Refresh all endpoints
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.academicsessions;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.classes;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.courses;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.demographics;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.enrollments;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.orgs;
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.users;
```

`REFRESH MATERIALIZED VIEW CONCURRENTLY` requires a unique index on
the view. The shipped SQL artifacts create the required indexes as
part of `00_setup.sql`.

### Microsoft SQL Server

```sql
-- Refresh one endpoint
EXEC oneroster12.sp_refresh_users;

-- Refresh all endpoints in dependency order
EXEC oneroster12.sp_refresh_all;
```

Both forms are safe to run while the service is handling requests.
Readers see the previous state until the refresh transaction commits.

## What refresh does not do

Refresh recomputes derived OneRoster objects from the current Ed-Fi
data. It does not:

- Propagate changes to an Ed-Fi client that is not subscribed to
  this service. OneRoster consumers must poll or be otherwise
  notified.
- Emit change events. The service is a pull-based API, not an event
  stream.
- Guarantee ordering between endpoints when refresh is forced. A
  consumer reading `/users` and `/enrollments` in quick succession
  may see a new student user before the matching enrollment row if
  the two views refresh at different times.

For the refresh cadence strategy that works in your environment, see
the cadence guidance above and [Performance](../configuration/performance.md)
for the measured refresh cost of each endpoint.
