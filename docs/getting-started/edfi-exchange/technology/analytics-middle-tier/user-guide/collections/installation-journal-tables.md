# Installation Journal Tables

In addition to the views and configuration tables for each of the [AMT
Collections](./readme.md), the Analytics Middle Tier installs the
following objects into the database. Deletion of these tables or records therein
will cause failures when running the Analytics Middle Tier deployment utility on
that database in the future.

## Schema Version Table

### Purpose

Tracks which scripts have been installed by the Analytics Middle Tier
application, so that the application can be re-run to install new scripts as
needed. Completely managed by the application.

### SQL Object

`dbo.AnalyticsMiddleTierSchemaVersion`

### Data Definition

| Column | Data Type |
| --- | --- |
| Id  | int identity​ |
| ScriptName | nvarchar(255) |
| Applied | datetime |

## Index Journal Table

### Purpose

Tracks installation of custom indexes on tables in the `edfi` schema. Managed
via the AnalyticsMiddleTier application.

### SQL Object

`analytics_config.IndexJournal`

### Data Definition

| Column | Data Type |
| --- | --- |
| FullyQualifiedIndexName | nvarchar(400)​ |
