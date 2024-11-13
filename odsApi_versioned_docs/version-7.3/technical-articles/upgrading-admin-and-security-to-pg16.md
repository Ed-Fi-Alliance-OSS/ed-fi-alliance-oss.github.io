# Upgrading the Admin and Security Databases to PostgreSQL 16.x

PostgreSQL 16.x is minimum supported version for Ed-Fi ODS / API v7.3. There are
three available methods for updating instances of the Admin and Security
database running on earlier versions of PostgreSQL to 16.x:

* Restoring database backups to a PostgreSQL 16.x instance

* Using the [`pg_upgrade`](https://www.postgresql.org/docs/16/pgupgrade.html)
utility

* Using logical replication

This article provides a high-level overview of upgrading Admin and Security
databases instances to PostgreSQL 16.x using database backups.

:::info

The details for performing a database upgrade are deployment-specific, and this
 article describes the process when carried out on a single-server installation
using version-specific directory names. Detailed information on performing
version upgrades and additional upgrade methods are available in the official
PostgreSQL documentation for [Upgrading a PostgreSQL
Cluster](https://www.postgresql.org/docs/16/upgrading.html#UPGRADING).

:::

## Upgrading using backups

### Step 1. Create backups of the Admin and Security databases

Use the `pg_dump` utility from the currently installed version of PostgreSQL to
create backups of each database.

<details>
<summary>Windows examples</summary>

```none
C:\Program Files\PostgreSQL\<old_version>\bin\pg_dump.exe -U pgadmin -d EdFi_Admin -f EdFi_Admin_backup.sql
```

```none
C:\Program Files\PostgreSQL\<old_version>\bin\pg_dump.exe -U pgadmin -d EdFi_Security -f EdFi_Security_backup.sql
```

</details>

<details>
<summary>Linux examples</summary>

```none
/usr/pgsql-<old version>/bin/pg_dump -U pgadmin -d EdFi_Admin --create -f EdFi_Admin_backup.sql
```

```none
/usr/pgsql-<old version>/bin/pg_dump --create -U pgadmin -d EdFi_Security --create -f EdFi_Security_backup.sql
```

</details>

### Step 2. Stop the old PostgeSQL server instance

Stop the old PostgreSQL instance.

<details>
<summary>Windows examples</summary>

```none
C:\Program Files\PostgreSQL\<old_version>\bin\pg_ctl -D "C:\Program Files\PostgreSQL\<old_version>\data" stop
```

</details>

<details>
<summary>Linux examples</summary>

```none
/usr/pgsql-<old version>/bin/pg_ctl -D <old PGDATA directory> stop
```

</details>

### Step 3. Install Postgres 16.x

Install Version 16.x using the
PostgreSQL [installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

### Step 4. Start PostgreSQL 16.x

Start the new instance of PostgreSQL 16.x (if it is not already running.)

<details>
<summary>Windows examples</summary>

```none
C:\Program Files\PostgreSQL\16\bin\pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start
```

</details>

<details>
<summary>Linux examples</summary>

```none
/usr/pgsql-16/bin/pg_ctl -D <new PGDATA directory> start
```

</details>

### Step 5. Restore the database backups

Use `psql` to create empty EdFi_Admin and EdFi_Security databases on the new
PostgreSQL 16.x instance and then restore the backup files into them.

<details>
<summary>Windows examples</summary>

```none
C:\Program Files\PostgreSQL\16\bin\psql -U pgadmin -c 'create database EdFi_Admin;'
```

```none
C:\Program Files\PostgreSQL\16\bin\psql -U pgadmin -c 'create database EdFi_Security;'
```

```none
C:\Program Files\PostgreSQL\16\bin\psql -U pgadmin -d EdFi_Admin < EdFi_Admin_backup.sql
```

```none
C:\Program Files\PostgreSQL\16\bin\psql -U pgadmin -d EdFi_Security < EdFi_Security_backup.sql
```

</details>

<details>
<summary>Linux examples</summary>

```none
/usr/pgsql-16/bin/psql -U pgadmin -c 'create database EdFi_Security;'
```

```none
/usr/pgsql-16/bin/psql -U pgadmin -c 'create database EdFi_Admin;'
```

```none
/usr/pgsql-16/bin/psql -U pgadmin -d EdFi_Admin < EdFi_Admin_backup.sql
```

```none
/usr/pgsql-16/bin/psql -U pgadmin -d EdFi_Security < EdFi_Security_backup.sql
```

</details>
