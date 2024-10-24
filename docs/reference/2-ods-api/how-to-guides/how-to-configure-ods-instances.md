# How To: Configure ODS Instances

The Ed-Fi ODS / API expects that the ODS connection strings are configured in
the EdFi\_Admin database. After deploying your ODS(s), configure connections in
the EdFi\_Admin database by running these queries.

:::info

You should replace the values for variables with values you desire.

:::

## Configure ODS Instances

```sql
DECLARE @OdsInstanceName nvarchar(100) = 'Test ODS'
DECLARE @OdsInstanceType nvarchar(100) = 'Test Type'
DECLARE @OdsInstanceConnectionString nvarchar(500) = 'server=(local);trusted_connection=True;database=EdFi_ODS;application name=EdFi.Ods.WebApi;Encrypt=False'

DECLARE @OdsInstanceId int

-- Ensure OdsInstance exists
SELECT @OdsInstanceId = OdsInstanceId FROM [dbo].[OdsInstances] WHERE [Name] = @OdsInstanceName and InstanceType = @OdsInstanceType

IF(@OdsInstanceId IS NULL)
BEGIN
    INSERT INTO [dbo].[OdsInstances] ([Name], InstanceType, ConnectionString)
    VALUES (@OdsInstanceName, @OdsInstanceType, @OdsInstanceConnectionString)
    SET @OdsInstanceId = SCOPE_IDENTITY()
END
ELSE
BEGIN
    UPDATE [dbo].[OdsInstances] SET ConnectionString = @OdsInstanceConnectionString WHERE OdsInstanceId = @OdsInstanceId
END


```

## Configure Context-Based Routing

If you desire the segmentation strategy to explicitly show in the API routes
(e.g. school year and district segments) or desire to use the same API
key/secrets across more than one ODS instance, you need to configure
ODSInstanceContext table.

```sql
DECLARE @ContextKey nvarchar(50) = 'SchoolYear'
DECLARE @ContextValue nvarchar(50) = '2023'
DECLARE @OdsInstanceId int = 1 -- Must be a valid OdsInstanceId in the OdsInstances Table

IF NOT EXISTS(SELECT 1 FROM [dbo].[OdsInstanceContexts] WHERE OdsInstance_OdsInstanceId = @OdsInstanceId AND ContextKey = @ContextKey AND ContextValue = @ContextValue)
BEGIN
    INSERT INTO [dbo].[OdsInstanceContexts] (OdsInstance_OdsInstanceId, ContextKey, ContextValue)
    VALUES (@OdsInstanceId, @ContextKey, @ContextValue)
END
```

:::note

ODS Instance creation script samples:

* **SQL Server Script:** [configure_ods_instances_sql.sql](https://edfi.atlassian.net/wiki/download/attachments/23301477/configure_ods_instances_sql.sql?version=1&modificationDate=1708470934587&cacheVersion=1&api=v2)
* **PostgreSQL Script:** [configure_ods_instances_postgres.sql](https://edfi.atlassian.net/wiki/download/attachments/23301477/configure_ods_instances_postgres.sql?version=1&modificationDate=1708470934590&cacheVersion=1&api=v2)

ODS Instance Context script samples:

* **SQL Server Script:** [configure_ods_instance_context_sql.sql](https://edfi.atlassian.net/wiki/download/attachments/23301477/configure_ods_instance_context_sql.sql?version=1&modificationDate=1708470934597&cacheVersion=1&api=v2)
* **PostgreSQL Script:** [configure_ods_instances_context_postgres.sql](https://edfi.atlassian.net/wiki/download/attachments/23301477/configure_ods_instances_context_postgres.sql?version=1&modificationDate=1708470934603&cacheVersion=1&api=v2)

:::
