# Resetting Admin App Configuration

## Issues

The application deployed and First-Time setup was successful, however you are
unable to proceed further with the Admin App settings page or you get an error
message saying that the key and secret can not be used in that state.

## Cause

Admin App secret configuration and/or Azure SQL configuration values became
corrupted for whatever reason.

## Steps for Recovering the Application

### 1) Clear Configuration Parameters & Force Admin App's First-Time Setup

On this step, we need to clear all the data records created during first time
setup.

1. Please make sure to stop ODS API and Admin App websites under IIS or within
   the Azure portal App Service.

            Ex (in Azure):  `EdFiOdsApiWebSite-{environment}-{resourceGroupid}`

            `EdFiOdsAdminAppWebSite-{environment}-{resourceGroupid}`

      2. Connect to SQL Server on SSMS or use Azure Query Editor

      3. Select the EdFi\_Admin database.

      4. Execute the following sql commands for clearing all the data records
      created during first time setup process.

#### SQL

```sql
BEGIN TRAN DECLARE @ApplicationId INT;

SELECT @ApplicationId = ApplicationId FROM dbo.Applications WHERE ClaimSetName =
'Ed-Fi ODS Admin App'

DELETE FROM dbo.ClientAccessTokens WHERE EXISTS ( SELECT 1 FROM dbo.ApiClients
        WHERE ClientAccessTokens.ApiClient_ApiClientId = ApiClients.ApiClientId
        AND Application_ApplicationId = @ApplicationId )

    DELETE FROM dbo.ApiClients WHERE Application_ApplicationId = @ApplicationId
    DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId = @ApplicationId
    DELETE FROM dbo.ProfileApplications WHERE Application_ApplicationId = @ApplicationId
    DELETE FROM dbo.Applications WHERE ApplicationId = @ApplicationId
    DELETE FROM dbo.OdsInstances
    DELETE FROM adminapp.SecretConfigurations
COMMIT  TRAN
```

     5. Once the SQL commands executed successfully. Please start the ODS API and Admin App websites under IIS or within the Azure portal App Service.

### 2) Update the Admin App Configuration Parameters

There is a table in the EdFi\_Admin database
called adminapp.AzureSqlConfigurations. This table holds the encrypted
configuration parameters used by the admin app.

The format of this string is JSON and specifies a few key: value pairs.

Here is a template of how it looks:

```json
{"AdminCredentials":{"Password":"\[dbpassword\]","UserName":"\[dbuser\]"},"HostName":"\[the
SQL Server:
sql.somthing.com\]","ProductionApiCredentials":{"Password":"\[SecurePassword\]","UserName":"EdFiOdsProductionApi"},"AdminAppCredentials":{"Password":"\[SecurePassword\]","UserName":"EdFiOdsAdminApp"}}
```

The following JSON code block explains the parameters required and their
intention:

<!-- markdownlint-disable-next-line MD024 -->
#### SQL

```json
{
 //These are the credentials used to access the EdFi_Admin database.
 "AdminCredentials": { "Password":[dbpassword], "UserName":[dbuser] },
 // This is the address of the MsSQL server. This can be a DNS or an IP Address.
   "HostName":"[the SQL Server: sql.something.com]",
 // These are the credentials that will be stored encrypted that the Admin App will use to connect to the Ed-Fi ODS API "ProductionApiCredentials":\
 {
 "Password":"[SecurePassword]", "UserName":"EdFiOdsProductionApi" },
 "AdminAppCredentials":\{ "Password":"[SecurePassword]",
 "UserName":"EdFiOdsAdminApp" }
 }
 ```

Modify the SQL statement below by providing the User Name and Password for the
required fields marked with square brackets "\[...\]"

Following the steps above open SSMS or Azure Query Editor and execute the
following statement against the EdFi\_Admin database.

<!-- markdownlint-disable-next-line MD024 -->
#### SQL

```sql
BEGIN TRAN UPDATE adminapp.AzureSqlConfigurations set
field='{"AdminCredentials":{"Password":"PW Specified in Deployment
Script","UserName":"SERVER Master
UN"},"HostName":"","ProductionApiCredentials":{"Password":"Enter
PW","UserName":"EdFiOdsProductionApi"},"AdminAppCredentials":{"Password":"","UserName":"EdFiOdsAdminApp"}}'
WHERE Id=1; COMMIT  TRAN
```

### 3) Update Admin App web site on IIS or Azure

:::info note:
That older versions of Admin app need the presence of
`SetupRequired` file. This indicates to the first time setup process that it has
not run. If the file not present, this means that the first-time setup was
completed. Recreating the file will enforce the First time setup process to run
again.
:::

To create this file just create text file with the name `SetupRequired` and set
the content of it to: Placeholder file to let the AdminApp know additional setup
of the system is required.

On IIS or Azure, proceed to restart the application. Once the restart has
finished use your web browser and navigate to the Admin App URL. You should be
able to continue the First Time Setup within Admin App.

Deployed pages and resources can be accessed on Azure portal.

[https://www.gslab.com/blogs/kudu-azure-web-app](https://www.gslab.com/blogs/kudu-azure-web-app)

#### References

If you have any questions on how to connect to the EdFi-Admin database please
refer to this articles below:

[https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-portal](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-portal)

[https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-ssms](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-ssms)
