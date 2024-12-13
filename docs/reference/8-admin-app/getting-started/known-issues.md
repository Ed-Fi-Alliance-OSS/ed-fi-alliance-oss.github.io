# Known Issues

Below are known issues with information or workarounds for the Admin App for Ed-Fi Technical Suite Two and Three as supported by active ODS / API releases. This page will be updated as issues are found and resolved.

**Can I use Admin App for my sandbox mode ODS / API instance?**

No, Admin App supports shared, year-specific and district-specific modes only.  Admin App does not support sandbox mode which is intended for development and the [Sandbox Administration Portal](https://edfi.atlassian.net/wiki/display/ODSAPIS3V520/Using+the+Sandbox+Administration+Portal) is the tool to use for sandbox modes.  Admin App cannot administer sandbox instances nor instances that started as sandboxes, then migrated to other modes.

**An error message when synching learning standards that reads “### learning standards may not have synchronized…”**

Ed-Fi is aware of an issue where all available standards from Academic Benchmarks may not fully load on the first try. If this occurs, you will get a similar error message to “### learning standards may not have synchronized…”. The technical issue is a sequencing of learning standards between parent and child related elements. We are working on a resolution to this issue for release in the fall. For the time being, to resolve this issue, repeat the loading of standards using Admin App until the error message goes away. While this is an edge case in our QA testing, we've found that 1–3 more tries typically resolves this issue when presented.

For any issues not identified here, as well as suggestions for improvements, please use the [Ed-Fi Tracker](https://tracker.ed-fi.org) to file an issue or bug report under the "EDFI" queue for development review and resolution.

  

**Rerun Admin App's First-Time Setup**

The steps below will reset Admin App as if it was a fresh install, and can be useful if the connection between Admin App and the ODS API becomes corrupted. This will keep any new Vendors, Applications, or Claim Sets you created with the Admin App

1.  Replace secret.json file with default content. This file exists in the root of the web site directory. Delete the secret.json and re-create it with the following content. **Note: this is only required for versions before Admin App 1.8**. For Admin App versions 1.8+ you can skip this step.
    
    ```
    {
      "AdminCredentials": {
        "Password": "",
        "UserName": "",
        "UseIntegratedSecurity": "false"
      },
      "StagingApiCredentials": {
        "Password": "",
        "UserName": ""
      },
      "HostName": ".\\",
      "ProductionApiCredentials": {
        "Password": "",
        "UserName": "EdFiOdsProductionApi"
      },
      "AdminAppCredentials": {
        "Password": "",
        "UserName": "EdFiOdsAdminApp"
      }
    }
    ```
    
2.  Create a new text file named `SetupRequired` and remove the file extension so it shows as “File” in file explorer. **Note: this is only required for versions before Admin App 2.0.1**. For Admin App versions 2.0+ you can skip this step.
3.  Connect to the EdFi\_Admin database on your SQL Server and remove old data created by the original run of setup. There might be a table in the sample below that doesn’t exist -- you can remove these lines if they show an error in SSMS. **Note: please use Admin App version appropriate script**  
    
    **Admin App 1.8**
    
    ```
    BEGIN TRAN    
    DECLARE @ApplicationId INT;
        SELECT @ApplicationId = ApplicationId FROM dbo.Applications WHERE ApplicationName = 'Ed-Fi ODS Admin App'    DELETE FROM dbo.ClientAccessTokens WHERE EXISTS (
            SELECT 1 FROM dbo.ApiClients
            WHERE ClientAccessTokens.ApiClient_ApiClientId = ApiClients.ApiClientId
              AND Application_ApplicationId = @ApplicationId
        )
    
        -- Depending on your ODS version, this table might not exist and can be safely removed from the query
        DELETE FROM dbo.ClientAuthorizationCodes WHERE EXISTS (
            SELECT 1 FROM dbo.ApiClients
            WHERE ClientAuthorizationCodes.ApiClient_ApiClientId = ApiClients.ApiClientId
              AND Application_ApplicationId = @ApplicationId
        )
    
        DELETE FROM dbo.ApiClients WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.ProfileApplications WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.Applications WHERE ApplicationId = @ApplicationId
        DELETE FROM dbo.OdsInstances
    
    ```
    
    **Admin App 2.0+**
    
    ```
    BEGIN TRAN   
    DECLARE @ApplicationId INT;
    DECLARE @InstanceId INT;
    SELECT @ApplicationId = ApplicationId FROM dbo.Applications WHERE ClaimSetName = 'Ed-Fi ODS Admin App'
    SELECT @InstanceId = OdsInstanceId FROM  dbo.OdsInstances WHERE Name ='EdFi ODS'  --default instance name may vary 
    DELETE FROM dbo.ClientAccessTokens WHERE EXISTS (
            SELECT 1 FROM dbo.ApiClients
            WHERE ClientAccessTokens.ApiClient_ApiClientId = ApiClients.ApiClientId
            AND Application_ApplicationId = @ApplicationId
    )  
        DELETE FROM dbo.ApiClients WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.ProfileApplications WHERE Application_ApplicationId = @ApplicationId
        DELETE FROM dbo.Applications WHERE ApplicationId = @ApplicationId   
        DELETE FROM adminapp.SecretConfigurations
    	DELETE FROM adminapp.OdsInstanceRegistrations
    	DELETE FROM adminapp.ApplicationConfigurations
    	UPDATE  dbo.Applications set OdsInstance_OdsInstanceId = null where OdsInstance_OdsInstanceId = @InstanceId
    DELETE FROM [EdFi_Admin].[dbo].[OdsInstances] where OdsInstanceId = @InstanceId
    COMMIT  TRAN
    
    ```
    
4.  Relaunch Admin App and you should see First Time Setup again.
    

## Contents