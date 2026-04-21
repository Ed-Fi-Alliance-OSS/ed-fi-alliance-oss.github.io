# Deploy on Microsoft SQL Server

This page walks through installing the Ed-Fi OneRoster service against an
Ed-Fi ODS that runs on Microsoft SQL Server. The MSSQL variant uses tables
and stored procedures in the `oneroster12` schema (rather than materialized
views) and relies on SQL Server Agent to drive scheduled refreshes.

## Prerequisites

- **SQL Server 2016 or later** — required for native JSON support used by
  the refresh procedures
- An Ed-Fi ODS database on SQL Server, reachable from where the OneRoster
  Node service will run
- A database account with permissions to create schemas, tables, stored
  procedures, and SQL Server Agent jobs (typically `db_owner` on the ODS)
- **SQL Server Agent must be running.** For SQL Server in Docker, enable
  the Agent by adding `MSSQL_AGENT_ENABLED=True` to the SQL Server
  container's environment
- Node.js 18 LTS or later (for running both the deployment script and the
  service)

## Step 1 — Deploy the SQL artifacts

The deployment is scripted in `standard/deploy-mssql.js`, a Node.js program
that connects to the target SQL Server, checks prerequisites, and applies
the SQL artifacts in phases:

1. **Foundation** — schema, OneRoster descriptors, descriptor mappings
2. **Core** — tables, indexes, and refresh stored procedures for each
   OneRoster entity
3. **Orchestration** — the master refresh procedure and the SQL Server
   Agent job that drives scheduled refreshes

From a clone of the OneRoster service repository:

```bash
git clone https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster.git
cd edfi-oneroster
npm install

# Default (Data Standard 5.0 – 5.2)
node standard/deploy-mssql.js

# Data Standard 4.0
node standard/deploy-mssql.js ds4
```

The script reads connection settings from `.env`; see [Environment
variables](../configuration/environment-variables.md).

If you prefer manual execution, apply the SQL files in this order:

```text
00_setup.sql
01_descriptors.sql
02_descriptorMappings.sql
academic_sessions.sql
orgs.sql
courses.sql
classes.sql
demographics.sql
users.sql
enrollments.sql
master_refresh.sql
sql_agent_job.sql
```

They live under `standard/{dataStandardVersion}/artifacts/mssql/core/`
(core scripts) and `mssql/orchestration/` (master refresh and the Agent
job).

## Step 2 — Populate the OneRoster tables

The deployment script creates the tables and procedures but does not run
the initial population. Execute the refresh procedures once, in order, to
seed data:

```sql
EXEC oneroster12.sp_refresh_orgs;
EXEC oneroster12.sp_refresh_academicsessions;
EXEC oneroster12.sp_refresh_courses;
EXEC oneroster12.sp_refresh_classes;
EXEC oneroster12.sp_refresh_demographics;
EXEC oneroster12.sp_refresh_users;
EXEC oneroster12.sp_refresh_enrollments;

-- Verify row counts
SELECT 'orgs' AS [Table], COUNT(*) FROM oneroster12.orgs
UNION ALL SELECT 'users', COUNT(*) FROM oneroster12.users
UNION ALL SELECT 'classes', COUNT(*) FROM oneroster12.classes;
```

After the initial run, the SQL Server Agent job takes over and refreshes
every 15 minutes.

## Step 3 — Configure the Node service

Copy `.env.example` to `.env` and set at least:

- `DB_TYPE=mssql`
- `MSSQL_SERVER`, `MSSQL_DATABASE`, `MSSQL_USER`, `MSSQL_PASSWORD`,
  `MSSQL_PORT`
- `MSSQL_ENCRYPT` and `MSSQL_TRUST_SERVER_CERTIFICATE` per your server's
  TLS setup
- `OAUTH2_AUDIENCE`, `OAUTH2_ISSUERBASEURL`, `OAUTH2_TOKENSIGNINGALG`
  (the server fails fast on startup if the first two are missing)
- `OAUTH2_PUBLIC_KEY_PEM` if you want PEM-based JWT verification;
  otherwise leave blank to use JWKS discovery
- `PORT`, `CORS_ORIGINS`, `TRUST_PROXY` as appropriate for your
  environment

See [OAuth and JWT](../configuration/oauth-and-jwt.md) and [Environment
variables](../configuration/environment-variables.md) for the full list.

## Step 4 — Install and run

```bash
cd edfi-oneroster
npm install
node server.js
```

Verify:

```bash
curl -i http://localhost:3000/health-check
curl -i http://localhost:3000/ims/oneroster/rostering/v1p2/orgs \
  -H "Authorization: Bearer <token>"
```

## Refresh behavior

A SQL Server Agent job named `OneRoster Data Refresh` runs the master
refresh procedure every 15 minutes. Common operations:

```sql
-- Refresh all tables immediately
EXEC oneroster12.sp_refresh_all;

-- Refresh a single table
EXEC oneroster12.sp_refresh_users;

-- Continue past errors
EXEC oneroster12.sp_refresh_all @SkipOnError = 1;

-- Ignore "recently completed" check
EXEC oneroster12.sp_refresh_all @ForceRefresh = 1;
```

Job management:

```sql
-- Start the refresh job manually
EXEC msdb.dbo.sp_start_job @job_name = 'OneRoster Data Refresh';

-- Temporarily disable scheduled refreshes
EXEC msdb.dbo.sp_update_job
  @job_name = 'OneRoster Data Refresh',
  @enabled  = 0;

-- Re-enable
EXEC msdb.dbo.sp_update_job
  @job_name = 'OneRoster Data Refresh',
  @enabled  = 1;
```

Status and history live in `oneroster12.refresh_history` and
`oneroster12.refresh_errors`:

```sql
-- Recent refreshes
SELECT * FROM oneroster12.refresh_history
ORDER BY refresh_start DESC;

-- Recent errors
SELECT * FROM oneroster12.refresh_errors
ORDER BY error_date DESC;
```

## Changing the refresh cadence

To change from 15-minute intervals, adjust the SQL Server Agent schedule:

```sql
-- Every 30 minutes
EXEC msdb.dbo.sp_update_schedule
  @name = 'OneRoster Refresh Schedule',
  @freq_subday_interval = 30;

-- Hourly
EXEC msdb.dbo.sp_update_schedule
  @name = 'OneRoster Refresh Schedule',
  @freq_subday_type     = 8,  -- 8 = Hours
  @freq_subday_interval = 1;
```

## Troubleshooting

| Symptom | First thing to check |
| --- | --- |
| Data not refreshing on schedule | SQL Server Agent is running; `enabled = 1` on the `OneRoster Data Refresh` job |
| `CREATE SCHEMA` or `CREATE PROCEDURE` fails during deployment | The deployment user has `db_owner` (or equivalent) on the target database |
| JSON-related errors during refresh | SQL Server is 2016 or later; run `SELECT @@VERSION` |
| Slow refresh | Review `sys.dm_db_index_usage_stats` for the `oneroster12` schema; consider updating statistics |

The MSSQL variant matches the PostgreSQL variant's output record-for-record
(verified by `tests/compare-api.js` and `tests/compare-database.js` in the
service repository), so differences in OneRoster response content between
engines point at an environmental issue rather than a mapping difference.
