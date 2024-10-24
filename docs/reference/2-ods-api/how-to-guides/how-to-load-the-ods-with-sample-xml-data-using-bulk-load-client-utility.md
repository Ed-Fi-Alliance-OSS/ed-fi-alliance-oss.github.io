# How To: Load the ODS with Sample XML Data using Bulk Load Client Utility

:::info

This article uses the core sample data released with [Ed-Fi Data Standard
v5.1](https://edfi.atlassian.net/wiki/display/EFDS5/). If you have an extension
that extends core entities with additional required fields, the core sample data
may fail to fulfill those additional requirements and fail to load.

:::

This article describes the steps needed to populate an Ed-Fi ODS with sample XML
data, using the [Ed-Fi Bulk Load
Client](../platform-dev-guide/utilities/bulk-load-client-utility.md)
utility.

The steps can be summarized as:

* [How To: Load the ODS with Sample XML Data using Bulk Load Client Utility](#how-to-load-the-ods-with-sample-xml-data-using-bulk-load-client-utility)
  * [Step 1. Install the Ed-Fi Bulk Load Client](#step-1-install-theed-fibulk-load-client)
  * [Step 2. Download Scripts and Sample Data](#step-2-download-scripts-and-sample-data)
  * [Step 3. Create an Empty Sandbox](#step-3-create-an-empty-sandbox)
  * [Step 4. Create API Client for Empty Sandbox](#step-4-create-api-client-for-empty-sandbox)
  * [Step 5. Run the Bootstrap Script to Load Descriptors, Standards and Education Organizations](#step-5-run-the-bootstrap-script-toload-descriptors-standards-and-education-organizations)
  * [Step 6. Update Claim Set to Load Sample Data](#step-6-update-claim-set-to-load-sample-data)
  * [Step 7. Run the Sample Data Script to Load Sample Data](#step-7-run-the-sample-data-script-toload-sample-data)

Detail on each step follows.

## Step 1. Install the Ed-Fi Bulk Load Client

* Ensure that you have an instance of the **Ed-Fi ODS / API running locally**
    that has been set up following the [Getting Started - Source Code
    Installation](../getting-started/source-code-installation/readme.md).
* Ensure .NET 8.0 SDK is installed.

* Add Ed-Fi package source by running the following  command in PowerShell:

    ```powershell
    if (-not [Net.ServicePointManager]::SecurityProtocol.HasFlag([Net.SecurityProtocolType]::Tls12)) {
       [Net.ServicePointManager]::SecurityProtocol += [Net.SecurityProtocolType]::Tls12
    }
    if(-not (Get-PackageSource -ProviderName NuGet | Where-Object -Property Name -eq "Ed-FiAzureArtifacts")){
        Write-Host "Registering Ed-Fi Package Source..."
        Register-PackageSource -Name Ed-FiAzureArtifacts `
            -Location "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json" `
            -ProviderName NuGet
        Write-Host "Ed-Fi package source configured"
    }
    ```

* Install the Ed-Fi Bulk Load Client from a PowerShell prompt using the
    following command:

    **Install the Ed-Fi Bulk Load Client**

    ```bash
    c:\>mkdir `{YourInstallFolder}`
    c:\> dotnet tool install EdFi.Suite3.BulkLoadClient.Console --version 7.2.413 --tool-path `{YourInstallFolder}`
    You can invoke the tool using the following command: EdFi.BulkLoadClient.Console
    Tool 'edfi.suite3.bulkloadclient.console' (version '7.2.413') was successfully installed.
    ```

* You can verify that the **EdFi.BulkLoadClient.Console.exe**  is available by
    browsing to this location
    **`{YourInstallFolder}`\\EdFi.BulkLoadClient.Console.exe**

## Step 2. Download Scripts and Sample Data

* **Download and Extract** **Ed-Fi-SampleDataLoad.zip** to a local folder. We
    recommend **C:\\Ed-Fi-SampleDataLoad**.
    Ed-Fi-SampleDataLoad.zip contains all the scripts and directory structure
    used in this how-to article.

* **Download the Sample XML** to **Ed-Fi-SampleDataLoad\\Sample XML**

* **Download the Descriptors** to **Ed-Fi-SampleDataLoad\\Bootstrap**

* **Move** the following files from **Ed-Fi-SampleDataLoad\\Sample XML** to
    **Ed-Fi-SampleDataLoad\\Bootstrap**

  * **Standards.xml**

  * **EducationOrganization.xml**

  * **IndicatorDescriptor.xml**
  * **IndicatorGroupDescriptor.xml**
  * **IndicatorLevelDescriptor.xml**
  * **ProgramCharacteristicDescriptor.xml**

:::info

The Bootstrap folder is used to load the necessary Descriptors and Education
Organization used by the ODS / API. Since they require a special claimset
(enabled in Step 4, below) they must be loaded separately from the other sample
files.

:::

## Step 3. Create an Empty Sandbox

* **Open a PowerShell session.**
* **Navigate** to \\Ed-Fi-ODS-Implementation\\ directory
* **Execute .\\Initialize-PowershellForDevelopment.ps1** and then
    **Reset-EmptySandboxDatabase**.

    The script will create **EdFi\_Ods\_Sandbox\_Empty** Database.

## Step 4. Create API Client for Empty Sandbox

* **Execute CreateApiClientforEmptySandbox.sql** against the EdFi\_Admin
    database. This will create claims needed to
    access **EdFi\_Ods\_Sandbox\_Empty** ODS.

  :::note

    <details>
    <summary>SQL Server</summary>

    **CreateApiClienforEmptySandbox.sql**

    ```sql
    DECLARE @VendorName nvarchar(150) = 'Empty Test Vendor'
    DECLARE @NamespacePrefix nvarchar (255) = 'uri://ed-fi.org'
    DECLARE @NamespacePrefixEdu nvarchar (255) = 'uri://gbisd.edu'
    DECLARE @UserFullName varchar(150) = 'Empty Test User'
    DECLARE @UserEmailAddress varchar(150) = 'emptytest@ed-fi.org'
    DECLARE @ApplicationName nvarchar(255) = 'Default Sandbox Application Empty'
    DECLARE @ClaimSetName nvarchar(255) = 'Bootstrap Descriptors and EdOrgs'
    DECLARE @ApiClientName nvarchar(50) = 'Empty Demonstration Sandbox'
    DECLARE @EducationOrganizationId int = 255901 --Must be an ed-org in the ODS
    DECLARE @Key nvarchar(50) = 'empty'
    DECLARE @Secret nvarchar(100) = 'emptySecret'
    DECLARE @OdsInstanceName nvarchar(100) = 'Test ODS'
    DECLARE @OdsInstanceType nvarchar(100) = 'Test Type'
    DECLARE @OdsInstanceConnectionString nvarchar(500) = 'server=(local);trusted_connection=True;database=EdFi_Ods_Sandbox_Empty;application name=EdFi.Ods.WebApi;Encrypt=False'

    DECLARE @IsPopulatedSandbox bit = 0
    -- For Non-Sandbox deployments
    DECLARE @UseSandbox bit = 0
    -- For Sandbox
    --DECLARE @UseSandbox bit = 1

    DECLARE @VendorId int
    DECLARE @UserId int
    DECLARE @ApplicationId int
    DECLARE @ApplicationEducationOrganizationId int
    DECLARE @ApiClientId int
    DECLARE @OdsInstanceId int

    -- Clear @IsPopulatedSandbox if not using sandbox
    IF (@UseSandbox = 0)
        SET @IsPopulatedSandbox = 0

    -- Ensure Vendor exists
    SELECT @VendorId = VendorId FROM [dbo].[Vendors] WHERE VendorName = @VendorName

    IF(@VendorId IS NULL)
    BEGIN
        INSERT INTO [dbo].[Vendors] (VendorName)
        VALUES (@VendorName)

        SET @VendorId = SCOPE_IDENTITY()
    END

    -- Ensure correct namespace prefixes are set up
    DELETE FROM [dbo].[VendorNamespacePrefixes] WHERE Vendor_VendorId = @VendorId
    INSERT INTO [dbo].[VendorNamespacePrefixes] (Vendor_VendorId, NamespacePrefix)
    VALUES (@VendorId, @NamespacePrefix)
    INSERT INTO [dbo].[VendorNamespacePrefixes] (Vendor_VendorId, NamespacePrefix)
    VALUES (@VendorId, @NamespacePrefixEdu)
    -- Ensure User exists for test Vendor
    SELECT @UserId = UserId FROM [dbo].[Users] WHERE FullName = @UserFullName AND Vendor_VendorId = @VendorId

    IF(@UserId IS NULL)
    BEGIN
        INSERT INTO [dbo].[Users] (Email, FullName, Vendor_VendorId)
        VALUES (@UserEmailAddress, @UserFullName, @VendorId)

        SET @UserId = SCOPE_IDENTITY()
    END
    ELSE
    BEGIN
        UPDATE [dbo].[Users] SET Email = @UserEmailAddress WHERE UserId = @UserId
    END

    -- Ensure Application exists
    SELECT @ApplicationId = ApplicationId FROM [dbo].[Applications] WHERE ApplicationName = @ApplicationName AND Vendor_VendorId = @VendorId

    IF (@ApplicationId IS NULL)
    BEGIN
        INSERT INTO [dbo].[Applications] (ApplicationName, Vendor_VendorId, ClaimSetName)
        VALUES (@ApplicationName, @VendorId, @ClaimSetName)

        SET @ApplicationId = SCOPE_IDENTITY()
    END
    ELSE
    BEGIN
        UPDATE [dbo].[Applications] SET ClaimSetName = @ClaimSetName WHERE ApplicationId = @ApplicationId
    END

    -- Ensure ApiClient exists
    SELECT @ApiClientId = ApiClientId FROM [dbo].[ApiClients] WHERE Application_ApplicationId = @ApplicationId AND [Name] = @ApiClientName

    IF(@ApiClientId IS NULL)
    BEGIN
        INSERT INTO [dbo].[ApiClients] ([Key], [Secret], [Name], IsApproved, UseSandbox, SandboxType, Application_ApplicationId, User_UserId, SecretIsHashed)
        VALUES (@Key, @Secret, @ApiClientName, 1, @UseSandbox, @IsPopulatedSandbox, @ApplicationId, @UserId, 0)

        SET @ApiClientId = SCOPE_IDENTITY()
    END
    ELSE
    BEGIN
        UPDATE [dbo].[ApiClients] SET [Key] = @Key, [Secret] = @Secret, UseSandbox = @UseSandbox, SandboxType = @IsPopulatedSandbox, User_UserId = @UserId, SecretIsHashed = 0 WHERE ApiClientId = @ApiClientId
    END

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

    -- Ensure ApiClientOdsInstance exists
    IF NOT EXISTS (SELECT 1 FROM [dbo].[ApiClientOdsInstances] WHERE ApiClient_ApiClientId = @ApiClientId AND OdsInstance_OdsInstanceId = @OdsInstanceId)
    BEGIN
        INSERT INTO [dbo].[ApiClientOdsInstances] (ApiClient_ApiClientId, OdsInstance_OdsInstanceId)
        VALUES (@ApiClientId, @OdsInstanceId)
    END

    IF (@EducationOrganizationId IS NOT NULL)
    BEGIN
        -- Clear all education organization links for the selected application
        DELETE acaeo
        FROM dbo.ApiClientApplicationEducationOrganizations acaeo
        INNER JOIN dbo.ApplicationEducationOrganizations aeo
        ON acaeo.ApplicationEducationOrganization_ApplicationEducationOrganizationId = aeo.ApplicationEducationOrganizationId
        WHERE aeo.Application_ApplicationId = @ApplicationId
        DELETE FROM [dbo].[ApplicationEducationOrganizations] WHERE Application_ApplicationId = @ApplicationId

        -- Ensure correct education organizations are set up
        INSERT INTO [dbo].[ApplicationEducationOrganizations] (EducationOrganizationId, Application_ApplicationId)
        VALUES (@EducationOrganizationId, @ApplicationId)
        SELECT @ApplicationEducationOrganizationId = SCOPE_IDENTITY()

        INSERT INTO [dbo].[ApiClientApplicationEducationOrganizations] (ApplicationEducationOrganization_ApplicationEducationOrganizationId, ApiClient_ApiClientId)
        VALUES (@ApplicationEducationOrganizationId, @ApiClientId)
    END
    ```

    </details>

    <details>
    <summary>PostgreSQL</summary>

    **CreateApiClienforEmptySandbox.sql**

    ```sql
    DO $$
    DECLARE

    vendor_name varchar(150) := 'Empty Test Vendor';
    namespace_prefix varchar(255) = 'uri://ed-fi.org';
    namespace_prefix_edu varchar(255) = 'uri://gbisd.edu';
    user_full_name varchar(150) = 'Local Test User';
    user_email_address varchar(150) = 'emptytest@ed-fi.org';
    application_name varchar(255) = 'Default Sandbox Application Empty';
    claimset_name varchar(255) = 'Bootstrap Descriptors and EdOrgs';
    api_client_name varchar(50) = 'Empty Demonstration Sandbox';
    education_organization_id int = 255901; --Must be an ed-org in the ODS
    client_key varchar(50) = 'Empty';
    client_secret varchar(100) = 'emptySecret';
    ods_instance_name varchar(100) = 'Test ODS';
    ods_instance_type varchar(100) = 'Test Type';
    ods_instance_connection_string varchar(255) = 'host=localhost;port=5432;username=postgres;database=EdFi_Ods_Sandbox_Empty;pooling=true;minimum pool size=10;maximum pool size=50;Application Name=EdFi.Ods.WebApi';

    is_populated_sandbox INT = 0;
    -- For Non-Sandbox deployments
    use_sandbox boolean = False;
    -- For Sandbox
    --use_sandbox boolean = True;

    vendor_id int;
    user_id int;
    application_id int;
    application_education_organization_id int;
    api_client_id int;
    ods_instance_id int;

    BEGIN
    -- Clear is_populated_sandbox if not using sandbox
    IF NOT use_sandbox
    THEN
        SELECT 0 INTO is_populated_sandbox;
    END IF;

    -- Ensure Vendor exists
    SELECT VendorId INTO vendor_id FROM dbo.Vendors WHERE VendorName = vendor_name;

    IF(vendor_id IS NULL)
    THEN
        INSERT INTO dbo.Vendors (VendorName)
        VALUES (vendor_name);

        SELECT LASTVAL() INTO vendor_id;
    END IF;

    -- Ensure correct namespace prefixes are set up
    DELETE FROM dbo.VendorNamespacePrefixes WHERE Vendor_VendorId = vendor_id;
    INSERT INTO dbo.VendorNamespacePrefixes (Vendor_VendorId, NamespacePrefix)
    VALUES (vendor_id, namespace_prefix);
    INSERT INTO dbo.VendorNamespacePrefixes (Vendor_VendorId, NamespacePrefix)
    VALUES (vendor_id, namespace_prefix_edu);

    -- Ensure User exists for test Vendor
    SELECT UserId INTO user_id FROM dbo.Users WHERE FullName = user_full_name AND Vendor_VendorId = vendor_id;


    IF(user_id IS NULL)
    THEN
        INSERT INTO dbo.Users (Email, FullName, Vendor_VendorId)
        VALUES (user_email_address, user_full_name, vendor_id);

        SELECT LASTVAL() INTO user_id;
    ELSE
     UPDATE dbo.Users SET Email = user_email_address WHERE UserId = user_id;
    END IF;

    -- Ensure Application exists
    SELECT ApplicationId INTO application_id FROM dbo.Applications WHERE ApplicationName = application_name AND Vendor_VendorId = vendor_id;

    IF (application_id IS NULL)
    THEN
        INSERT INTO dbo.Applications (ApplicationName, Vendor_VendorId, ClaimSetName)
        VALUES (application_name, vendor_id, claimset_name);

     SELECT LASTVAL() INTO application_id;
    ELSE
     UPDATE dbo.Applications SET ClaimSetName = claimset_name WHERE ApplicationId = application_id;
    END IF;

    -- Ensure ApiClient exists
    SELECT  ApiClientId INTO api_client_id FROM dbo.ApiClients WHERE Application_ApplicationId = application_id AND Name = api_client_name;

    IF(api_client_id IS NULL)
    THEN
        INSERT INTO dbo.ApiClients (Key, Secret, Name, IsApproved, UseSandbox, SandboxType, Application_ApplicationId, User_UserId, SecretIsHashed)
        VALUES (client_key, client_secret, api_client_name, TRUE, use_sandbox, is_populated_sandbox, application_id, user_id, FALSE);

     SELECT  LASTVAL() INTO api_client_id;
    ELSE
     UPDATE dbo.ApiClients SET Key = client_key, Secret = client_secret, UseSandbox = use_sandbox, SandboxType = is_populated_sandbox, User_UserId = user_id, SecretIsHashed = FALSE WHERE ApiClientId = api_client_id;
    END IF;

    -- Ensure OdsInstance exists
    SELECT OdsInstanceId INTO ods_instance_id FROM dbo.OdsInstances WHERE Name = ods_instance_name AND InstanceType = ods_instance_type;

    IF(ods_instance_id IS NULL)
    THEN
        INSERT INTO dbo.OdsInstances (Name, InstanceType, ConnectionString)
        VALUES (ods_instance_name, ods_instance_type, ods_instance_connection_string);

        SELECT LASTVAL() INTO ods_instance_id;
    ELSE
        UPDATE dbo.OdsInstances SET ConnectionString = ods_instance_connection_string WHERE OdsInstanceId = ods_instance_id;
    END IF;

    -- Ensure ApiClientOdsInstance exists
    INSERT INTO dbo.ApiClientOdsInstances (ApiClient_ApiClientId, OdsInstance_OdsInstanceId)
    SELECT api_client_id, ods_instance_id
    WHERE NOT EXISTS (SELECT * FROM dbo.ApiClientOdsInstances WHERE ApiClient_ApiClientId = api_client_id AND OdsInstance_OdsInstanceId = ods_instance_id);

    IF (education_organization_id IS NOT NULL)
    THEN
     -- Clear all education organization links for the selected application
     DELETE
     FROM dbo.ApiClientApplicationEducationOrganizations WHERE
     ApplicationEdOrg_ApplicationEdOrgId IN ( SELECT ApplicationEducationOrganizationId
                FROM dbo.ApplicationEducationOrganizations
                WHERE Application_ApplicationId = application_id);
     DELETE FROM dbo.ApplicationEducationOrganizations WHERE Application_ApplicationId = application_id;

     -- Ensure correct education organizations are set up
        INSERT INTO dbo.ApplicationEducationOrganizations (EducationOrganizationId, Application_ApplicationId)
        VALUES (education_organization_id, application_id);
     SELECT  LASTVAL() INTO application_education_organization_id;

        INSERT INTO dbo.ApiClientApplicationEducationOrganizations (Applicationedorg_Applicationedorgid, ApiClient_ApiClientId)
        VALUES (application_education_organization_id, api_client_id);
    END IF;
    END $$;
    ```

    </details>

  :::

## Step 5. Run the Bootstrap Script to Load Descriptors, Standards and Education Organizations

* Open a PowerShell session.
* Navigate to **Ed-Fi-SampleDataLoad** directory (e.g.,
    C:\\Ed-Fi-SampleDataLoad).
* Open the **LoadBootstrapData****.ps1 file** in notepad or Windows PowerShell
    ISE and update the $apiLoaderExe variable Value  where
    **EdFi.BulkLoadClient.Console** is installed in **Step 1.**
* Example $apiLoaderExe=
    "**`{YourInstallFolderFullPath}`\\EdFi.BulkLoadClient.Console.exe**"
* For Postgres Only, Please update Key & Secret    "-k", "**E**mpty",  "-s",
    "empty**S**ecret"
* Save and Execute **LoadBootstrapData.ps1**.

    The script will run the Bulk Load Client loading data from the Bootstrap
    folder to the Empty Sandbox Database.

## Step 6. Update Claim Set to Load Sample Data

* **Execute EnableSandboxClaimset.sql** against the EdFi\_Admin database. This
    will change the claim set for the empty sandbox database you created in Step
    4 to the **Ed-Fi Sandbox** claimset.

    :::note

    <details>
    <summary>SQL Server</summary>

    **EnableSandboxClaimset.sql**

    ```sql
    UPDATE [dbo].[Applications]
    SET [ClaimSetName] = 'Ed-Fi Sandbox'
    WHERE [ApplicationName] = 'Default Sandbox Application Empty'
    GO
    ```

    </details>

    <details>
    <summary>PostgreSQL</summary>

    **EnableSandboxClaimset.sql**

    ```sql
    UPDATE dbo.Applications SET ClaimSetName = 'Ed-Fi Sandbox' WHERE ApplicationName = 'Default Sandbox Application Empty';
    ```

    </details>

    :::

## Step 7. Run the Sample Data Script to Load Sample Data

* Restart the instance of the Ed-Fi ODS / API running locally again to refresh
    the claims.
* Open a PowerShell session.
* Navigate to **Ed-Fi-SampleDataLoad** directory (e.g.,
    C:\\Ed-Fi-SampleDataLoad).
* Open the **LoadSampleData.ps1 file** in notepad or Windows PowerShell ISE
    and update the $apiLoaderExe variable Value  where
    **EdFi.BulkLoadClient.Console** is installed in **Step 1.**
* Example $apiLoaderExe=
    "**`{YourInstallFolderFullPath}`\\EdFi.BulkLoadClient.Console.exe**"
* For Postgres Only, Please update Key & Secret    "-k", "**E**mpty",  "-s",
    "empty**S**ecret"
* Save and Execute **LoadSampleData.ps1**.

    The script will run the Bulk Load Client to load data from the Sample XML
    folder to the Empty Sandbox Database.

:::note

The following link contains the scripts and directory setup used in
this how-to article.
[Ed-Fi-SampleDataLoad.zip](https://edfi.atlassian.net/wiki/download/attachments/23301422/Ed-Fi-SampleDataLoad.zip?version=1&modificationDate=1708470932880&cacheVersion=1&api=v2)

The following GitHub links contain the sample XML files and the as-shipped
Ed-Fi Descriptor XML. [Sample
XML](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v5.1.0/Samples/Sample%20XML)
[Descriptors](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v5.1.0/Descriptors)

:::
