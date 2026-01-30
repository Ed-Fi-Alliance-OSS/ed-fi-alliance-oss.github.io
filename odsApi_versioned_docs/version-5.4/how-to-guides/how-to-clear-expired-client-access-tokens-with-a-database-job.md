# How To: Clear expired client access tokens with a database job

Currently, the API handles clearing expired client access tokens with a
background task that runs on a configurable interval. This approach was chosen
for "out of the box" experience to ensure a seamless experience from the get-go,
owing to its simplicity and adaptability across various deployment environments.
However, in this default implementation, when multiple instances of the API are
operational, each instance triggers the background task, leading to redundant
executions of the cleanup process. To prevent this, one option is to disable the
'DeleteExpiredTokens' background task on all instances of the API server except
for one. Alternatively, you could entirely switch to an external process. A
solution of this nature is detailed in this article. It demonstrates how to
configure a scheduled job running on the database server that hosts the
Ed-Fi-Admin database.

## Implementation Steps

1. Disable API background task
2. Verify that the database server job agent is enabled and running
3. Create scheduled job which consists of:
    1. Job - to encapsulate all job steps
    2. Job Step - to execute the command(s)
    3. Schedule - to schedule when the job and all of its steps will be
        executed

## Disable API background task

```json
"ScheduledJobs": [
      {
        "Name": "DeleteExpiredTokens",
        "IsEnabled": false,
        "CronExpression": "0 0/30 * 1/1 * ? *"
      }
    ]
```

## Create Scheduled Job

Modify and execute the SQL Server or PostgreSQL script below in order to create
the scheduled job within your database server.

### SQL Server

For Ed-Fi implementations running SQL, SQL Server Agent needs to be configured.

<details>
<summary><strong>SQL Server Sample Code</strong></summary>

```sql
USE [msdb]
GO

-- Delete the existing job if it exists
DECLARE @jobName NVARCHAR(128) = N'Ed-Fi Admin Job - Delete Expired Tokens';
DECLARE @jobId UNIQUEIDENTIFIER;

SELECT @jobId = job_id FROM msdb.dbo.sysjobs WHERE name = @jobName
IF (@jobId IS NOT NULL)
BEGIN
    EXEC msdb.dbo.sp_delete_job @job_id = @jobId, @delete_unused_schedule = 1
END

-- Create a new job category if it doesn't already exist
DECLARE @categoryName NVARCHAR(128) = N'[Ed-Fi Admin (LOCAL)]';

IF NOT EXISTS (SELECT name FROM msdb.dbo.syscategories WHERE name = @categoryName AND category_class = 1)
BEGIN
    EXEC msdb.dbo.sp_add_category @class = N'JOB', @type = N'LOCAL', @name = @categoryName
END

-- Set variables for the job
DECLARE @jobDescription NVARCHAR(512) = N'Deletes expired client access tokens from the Ed-Fi Admin database';
DECLARE @loginName NVARCHAR(128) = N'SET_LOGIN_NAME'; -- Replace with appropriate login name
DECLARE @databaseName NVARCHAR(128) = N'EdFi_Admin';
DECLARE @serverName NVARCHAR(128) = N'(local)';
DECLARE @minuteInterval INT = 30;

-- Create the job
EXEC msdb.dbo.sp_add_job 
    @job_name = @jobName,
    @enabled = 1,
    @description = @jobDescription,
    @category_name = @categoryName,
    @owner_login_name = @loginName;

-- Create the job step
EXEC msdb.dbo.sp_add_jobstep 
    @job_name = @jobName,
    @step_name = N'Delete Expired Tokens Step',
    @subsystem = N'TSQL',
    @command = N'DELETE FROM ClientAccessTokens WHERE Expiration < GETUTCDATE()',
    @database_name = @databaseName;

-- Create the job schedule
EXEC msdb.dbo.sp_add_jobschedule 
    @job_name = @jobName, 
    @name = N'Delete Expired Tokens Schedule',
    @enabled = 1,
    @freq_type = 4, -- Daily
    @freq_interval = 1,
    @freq_subday_type = 4, -- Minutes
    @freq_subday_interval = @minuteInterval,
    @active_start_date = 20230101,
    @active_end_date = 99991231;

-- Add the server
EXEC msdb.dbo.sp_add_jobserver 
    @job_name = @jobName, 
    @server_name = @serverName;

GO
```

</details>

### PostgreSQL

For Ed-Fi implementations running PostgreSQL, pgAgent needs to be configured.

<details>
<summary><strong>PostgreSQL Sample Code</strong></summary>

```sql
-- Delete Expired Tokens Job
DO $$
DECLARE
    jid integer;
    scid integer;
    job_name text = 'Ed-Fi Admin Job - Delete Expired Tokens';
    step_name text = 'Delete Expired Tokens Step';
    db_name text = 'EdFi_Admin';
BEGIN
    -- Delete the job if it exists
    DELETE FROM pgagent.pga_job WHERE jobname = job_name;
    
    -- Create a new job
    INSERT INTO pgagent.pga_job(
        jobjclid, jobname, jobdesc, jobhostagent, jobenabled
    ) VALUES (
        1::integer, job_name, 'Deletes expired client access tokens from the Ed-Fi Admin database', '', true
    ) RETURNING jobid INTO jid;
    
    -- Create a job step
    INSERT INTO pgagent.pga_jobstep (
        jstjobid, jstname, jstenabled, jstkind,
        jstconnstr, jstdbname, jstonerror,
        jstcode, jstdesc
    ) VALUES (
        jid, step_name, true, 's'::character(1),
        ''::text, db_name, 'f'::character(1),
        'DELETE FROM dbo.ClientAccessTokens WHERE expiration < now()',
        'Removes expired tokens from the ClientAccessTokens table'
    );
    
    -- Create a schedule to run every 30 minutes
    INSERT INTO pgagent.pga_schedule(
        jscjobid, jscname, jscdesc, jscenabled,
        jscstart, jscend,
        jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths
    ) VALUES (
        jid, 'Every 30 Minutes', 'Runs every 30 minutes', true,
        '2023-01-01 00:00:00'::timestamp with time zone, '2099-12-31 23:59:59'::timestamp with time zone,
        '{t,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,t,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f}'::bool[],
        '{t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t}'::bool[],
        '{t,t,t,t,t,t,t}'::bool[],
        '{t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t}'::bool[],
        '{t,t,t,t,t,t,t,t,t,t,t,t}'::bool[]
    );
END
$$;

## See Also

* [How To: Configure Key / Secret](./how-to-configure-key-secret.md)
