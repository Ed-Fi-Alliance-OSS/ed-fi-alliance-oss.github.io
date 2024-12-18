# Updating Admin App 2.2 for Ed-Fi ODS/API Cloud Deployment for Azure (Suite 3)

## Installation Instructions

Upgrading/ installing AdminApp 2.2.0 while resource group, ODS API and Admin app
older version already available and running on Azure.

:::info note:
  Please backup your ODS / API and related databases before running this
  update procedure.
:::

### Steps for upgrading

1. Stop existing ODS API and AdminApp services on azure resource group

2\. Connect to Azure SQL server from SSMS and run the following SQL commands to
delete records/ data to void the first-time setup from old AdminApp application.
Note: This step can be ignored if it is new installation.

**Void First-Time Setup** Expand source

```sql
DECLARE @ApplicationId INT;

SELECT @ApplicationId = ApplicationId FROM dbo.Applications WHERE ClaimSetName = 'Ed-Fi ODS Admin App'

DELETE FROM dbo.ClientAccessTokens WHERE EXISTS (

SELECT 1 FROM dbo.ApiClients

WHERE ClientAccessTokens.ApiClient_ApiClientId = ApiClients.ApiClientId

AND Application_ApplicationId = @ApplicationId

)

DELETE FROM dbo.ApiClients WHERE Application_ApplicationId = @ApplicationId

DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId = @ApplicationId

DELETE FROM dbo.ProfileApplications WHERE Application_ApplicationId = @ApplicationId

DELETE FROM dbo.Applications WHERE ApplicationId = @ApplicationId

DELETE FROM dbo.OdsInstances
```

3\. Deploy AdminApp 2.2.0 to an existing resource group using powershell script
from

[Ed-Fi-X-Ods-Deploy-Azure-Deployment-Scripts-1.0.zip](https://odsassets.blob.core.windows.net/public/adminapp/Release/DeploymentScripts/Ed-Fi-X-Ods-Deploy-Azure-Deployment-Scripts-1.0.zip)

Please follow the naming conventions
([https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-
practices/resource-naming](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming))
for AdminAppName

Make sure to create Admin App specific sql user before the deployment
(AdminAppSqlUserName, AdminAppSqlPassword). Please refer **Step 5 on****Steps**
**for new installation** section below.

**Deploy-EdFiOdsAdminApp** Expand source

```json
$params = @{

        ResourceGroupName = " Existing resource group name "

        AdminAppName = "AdminApp-Latest"

        AppInsightLocation = "South Central US"

        ProductionApiUrl = " Existing ODS API url "

        SQLServerHostname = " Existing SQL server url "

        SQLServerUserName = "sql administrator username"

        SQLServerPassword = ConvertTo-SecureString "sql administrator password"  -AsPlainText -Force

  AdminAppSqlUserName = "admin app sql username"

  AdminAppSqlPassword = ConvertTo-SecureString "admin app sql password" -AsPlainText -Force

    }

Upgrade-AdminApp> .\Deploy-EdFiOdsAdminApp.ps1 @params
```

**EncryptionKey:**

Base64-encoded 256 bit key appropriate for use with AES encryption. This is an

optional parameter.  If user wants to provide own value, then use following
script to generate:

**Generate AES Encryption Key** Expand source

```ps1
  $aes = [System.Security.Cryptography.Aes]::Create()
  $aes.KeySize = 256
  $aes.GenerateKey()
  $EncryptionKey = [System.Convert]::ToBase64String($aes.Key)
```

:::info note:
  If user is not providing Encryption key, then key will be generated
  during deployment.
:::

4. Once the application deployment done, user will be prompted to confirm
deleting and recreating Admin App specific database tables. If yes, then
deployment process will delete existing Admin App specific tables and re-create
them with latest table schemas on EdFi\_Admin database.

5\. Data validations and update:

:::info note:
  This step can be ignored if it is new installation
:::

1. We can persist existing vendor applications, key and secrets created. Need to
manually update OdsInstance\_OdsInstanceId column on dbo.Applications table to
have default Ods instance id. Since, latest AdminApp needs association between
dbo.Applications and dbo.OdsInstances tables to filter applications for selected
instance. On SharedInstance mode will be having only one OdsInstance
on dbo.OdsInstances table.

**Update Applications** Expand source

```sql
  DECLARE @odsinstanceid INT
  SELECT TOP 1 @odsinstanceid = OdsInstanceId FROM [dbo].[OdsInstances]
  Update [EdFi_Admin].[dbo].[Applications] set OdsInstance_OdsInstanceId = @odsinstanceid where OdsInstance_OdsInstanceId is null
```

2\. Vendor applications created using older AdminApp have prefixed with
“Production”. May need to manually remove that prefix.

### Steps for new installation

1.Please refer [Ed-Fi ODS/API Cloud Deployment for Azure (Suite
3)](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22487832))  for new
installation on Azure ( Note: New installation will create new resource group
and resources).

2\. Make sure to bypass Admin app installation by making $DoNotInstallAdminApp
flag to “$true” on \\Deploy-EdFiOds.ps1 file.

3\. If user is not installing Admin app as part this deployment, then will be
prompted to enter SQL credentials for Ed-Fi ODS Production API

 ![Credentials](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-5-14_17-23-45.png)

Please enter username: EdFiOdsProductionApi

Password can be any value user wants to use (Make sure to satisfy the sql login
password requirements. Provided username and password will be used in upcoming
step to create user login on SQL server)

4\.
:::info note:
  User can skip this step if already knows how to do and access the db
  server on local SSMS.Once the deployment completed, please white list your ip
  address on the AzureSql server by clicking the “Set server firewall” on
  EdFi\_Admin database on Azure resource group.
:::

![Firewall](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-5-14_17-35-54.png)

Once click on the “Set server firewall” will open up a page where user can add
their system IP address and save it.

This will enable access to that provided IP. Now user can open the Azure sql db
server on their local SSMS.

![Settings](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-5-14_17-38-15.png)

5. EdFiOdsProductionApi(as mentioned on step3) and EdFiOdsAdminApp users and
logins creation on databases.

We are creating EdFiOdsAdminApp user login as well in this step, so that these
credentials can be used during the AdminApp deployment.

:::info note:
  Please use individual query editor for different databases to exceute the
  queries.
:::

**Create EdFiOdsAdminApp user login** Expand source

```sql
--Create EdFiOdsAdminApp login
use [master]
IF NOT EXISTS(SELECT name FROM sys.sql_logins WHERE name='EdFiOdsAdminApp')
BEGIN
    CREATE LOGIN [EdFiOdsAdminApp] WITH PASSWORD = 'user provided password'
END;

--Create database user for EdFiOdsAdminApp login on EdFi_Admin database
use [EdFi_Admin]
IF DATABASE_PRINCIPAL_ID('EdFiOdsAdminApp') IS NULL
BEGIN
    CREATE USER [EdFiOdsAdminApp] FOR LOGIN [EdFiOdsAdminApp] WITH DEFAULT_SCHEMA=[dbo]
END
-- Assign roles to EdFiOdsAdminApp on EdFi_Admin database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_owner', 'EdFiOdsAdminApp'

--Create database user for EdFiOdsAdminApp login on EdFi_Ods_Production database
use [EdFi_Ods_Production]
IF DATABASE_PRINCIPAL_ID('EdFiOdsAdminApp') IS NULL
BEGIN
    CREATE USER [EdFiOdsAdminApp] FOR LOGIN [EdFiOdsAdminApp] WITH DEFAULT_SCHEMA=[dbo]
END
--Assign roles to EdFiOdsAdminApp on EdFi_Ods_Production database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsAdminApp'
IF DATABASE_PRINCIPAL_ID('db_executor') IS NULL
BEGIN
    CREATE ROLE [db_executor]
END
GRANT EXECUTE TO [db_executor]
EXEC sp_addrolemember 'db_executor', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_ddladmin', 'EdFiOdsAdminApp'
GRANT CREATE TABLE TO EdFiOdsAdminApp
GRANT CREATE SCHEMA TO EdFiOdsAdminApp
GRANT CREATE VIEW TO EdFiOdsAdminApp

--Create database user for EdFiOdsAdminApp login on EdFi_Security database
use [EdFi_Security]
IF DATABASE_PRINCIPAL_ID('EdFiOdsAdminApp') IS NULL
BEGIN
    CREATE USER [EdFiOdsAdminApp] FOR LOGIN [EdFiOdsAdminApp] WITH DEFAULT_SCHEMA=[dbo]
END
--Assign roles to EdFiOdsAdminApp on EdFi_Security database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsAdminApp'
EXEC sp_addrolemember 'db_owner', 'EdFiOdsAdminApp'

```

**Create EdFiOdsProductionApi user login** Expand source

```sql
--For creating EdFiOdsProductionApi login
use [master]
IF NOT EXISTS(SELECT name FROM sys.sql_logins WHERE name='EdFiOdsProductionApi')
BEGIN
CREATE LOGIN [EdFiOdsProductionApi] WITH PASSWORD = 'user provided password'
END;

--Create database user for EdFiOdsProductionApi login on EdFi_Admin database
use [EdFi_Admin]
IF DATABASE_PRINCIPAL_ID('EdFiOdsProductionApi') IS NULL
BEGIN
    CREATE USER [EdFiOdsProductionApi] FOR LOGIN [EdFiOdsProductionApi] WITH DEFAULT_SCHEMA=[dbo]
END
-- Assign roles to EdFiOdsProductionApi on EdFi_Admin database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsProductionApi'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsProductionApi'
IF DATABASE_PRINCIPAL_ID('db_executor') IS NULL
BEGIN
    CREATE ROLE [db_executor]
END
GRANT EXECUTE TO [db_executor]
EXEC sp_addrolemember 'db_executor', 'EdFiOdsProductionApi'

--Create database user for EdFiOdsProductionApi login on EdFi_Ods_Production database
use [EdFi_Ods_Production]
IF DATABASE_PRINCIPAL_ID('EdFiOdsProductionApi') IS NULL
BEGIN
    CREATE USER [EdFiOdsProductionApi] FOR LOGIN [EdFiOdsProductionApi] WITH DEFAULT_SCHEMA=[dbo]
END
--Assign roles to EdFiOdsProductionApi on EdFi_Ods_Production database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsProductionApi'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsProductionApi'
IF DATABASE_PRINCIPAL_ID('db_executor') IS NULL
BEGIN
    CREATE ROLE [db_executor]
END
GRANT EXECUTE TO [db_executor]
EXEC sp_addrolemember 'db_executor', 'EdFiOdsProductionApi'

--Create database user for EdFiOdsProductionApi login on EdFi_Security database
use [EdFi_Security]
IF DATABASE_PRINCIPAL_ID('EdFiOdsProductionApi') IS NULL
BEGIN
    CREATE USER [EdFiOdsProductionApi] FOR LOGIN [EdFiOdsProductionApi] WITH DEFAULT_SCHEMA=[dbo]
END
--Assign roles to EdFiOdsAdminApp on EdFi_Security database
EXEC sp_addrolemember 'db_datareader', 'EdFiOdsProductionApi'
EXEC sp_addrolemember 'db_datawriter', 'EdFiOdsProductionApi'

```

6\. Once EdFiOdsProductionApi user login creation done, now user should be able
to launch the ODS API website successful on Azure.

![Launcher exe](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-5-14_17-49-15.png)

7. Please use above mentioned Admin app upgrade steps for installing Admin App
2.2.0.

8\. Please refere Admin App new features in Admin App
2.2.0 [here](https://edfi.atlassian.net/wiki/display/ADMIN/Next+Steps).

:::info note:
  The following is a ZIP package containing PowerShell scripts for the
  installation of the Admin App 2.2 update**:**
  [Ed-Fi-X-Ods-Deploy-Azure-Deployment-Scripts-1.0.zip](https://odsassets.blob.core.windows.net/public/adminapp/Release/DeploymentScripts/Ed-Fi-X-Ods-Deploy-Azure-Deployment-Scripts-1.0.zip)
:::
