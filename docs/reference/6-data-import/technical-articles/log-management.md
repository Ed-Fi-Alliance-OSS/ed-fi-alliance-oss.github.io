# Log Management

Under heavy usage, there are two log tables in Data Import 1.0 which can grow
quite large:

*   ApplicationLogs, which records a wide variety of activity as the system
    runs.
*   IngestionLogs, which records information about each input row being POSTed
    to the target ODS.

When these grow large enough, they may pose an obstacle in the system resources
used to store them.

## Limiting ApplicationLogs Entries

The ApplicationLogs table in particular grows the fastest, and thankfully an
administrator has control over just how much information goes into this table to
begin with. 

To limit the number of records written to ApplicationLogs, locate log4net.config
file. This file appears in **two** places: once within the web application
deployment folder, and once beside the TransformLoad executable. You'll want to
modify **both** files in the same way. Locate the files, and locate the
following section where we set the logging verbosity "level":

```xml
<root>
   <level value="INFO" />
   <appender-ref ref="console" />
   <appender-ref ref="db" />
</root>
```

To write far fewer records to the log, change "INFO" to "ERROR":

```xml
<root>
   <level value="ERROR" />
   <appender-ref ref="console" />
   <appender-ref ref="db" />
</root>
```

This way, errors will still be written to the log, but other less urgent
messages will not.

:::info note:
  Be sure to restart the web application in IIS after modifying this
  file, to be sure the changes take effect.
:::

## Periodic Log Maintenance

:::warning
  The SQL statements below will remove these log entries permanently
  from the Data Import application database.  If these are required for
  transaction history or archival purposes, please export the logs first to a text
  file or backup, compress and archive the database before issuing the TRUNCATE
  command.
:::

The system continues to function when these two log tables are emptied. The log
entries are useful from a troubleshooting point of view, but once old records
have served that purpose you can simply delete them. For maximum efficiency, you
can delete all records from both tables with the TRUNCATE T-SQL command:

**Erase All Log Records**

```sql
TRUNCATE TABLE [EdFi_DataImport].[dbo].[ApplicationLogs];
TRUNCATE TABLE [EdFi_DataImport].[dbo].[IngestionLogs];
```

:::info note:
  Your installed database name may differ from "EdFi\_DataImport", so be
  sure to review these statements before running them in your environment. The
  database administrator may prefer to accomplish similar with a normal DELETE
  statement, so long as they understand the consequences in SQL Server when
  choosing to TRUNCATE or DELETE records. DELETE would also allow the
  administrator to only delete records beyond a certain date in the past, wherease
  TRUNCATE always removes *all* records.
:::
