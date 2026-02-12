# How To: Configure Key / Secret

API keys and secrets can be administered by the Admin API or Sandbox Admin App, but some implementers may prefer to work directly with the data. The SQL queries on this page enable a database administrator to create keys and secrets. These queries run against the `EdFi_Admin` database.

Before you begin:

* Make sure you have configured ODS instance(s) before administering keys and secrets to connect to it. See [How To: Configure ODS Instances](./how-to-configure-ods-instances.md)

:::info
You should replace the values for variables with values you desire.
:::

```sql
DECLARE @VendorName nvarchar(150) = 'Local Test Vendor'
DECLARE @NamespacePrefix nvarchar (255) = 'uri://ed-fi.org'
DECLARE @UserFullName varchar(150) = 'Local Test User'
DECLARE @UserEmailAddress varchar(150) = 'localtest@ed-fi.org'
DECLARE @ApplicationName nvarchar(255) = 'Local Test Application'
DECLARE @ClaimSetName nvarchar(255) = 'SIS Vendor'
DECLARE @ApiClientName nvarchar(50) = 'Local Test Api Client'
DECLARE @EducationOrganizationId int = 255901 --Must be an ed-org in the ODS
DECLARE @Key nvarchar(50) = 'testkey'
DECLARE @Secret nvarchar(100) = 'testsecret'
DECLARE @OdsInstanceId int = 1 -- Must be a valid OdsInstanceId from the OdsInstances table

DECLARE @IsPopulatedSandbox bit = 1
-- For Non-Sandbox deployments
DECLARE @UseSandbox bit = 0
-- For Sandbox
--DECLARE @UseSandbox bit = 1

DECLARE @VendorId int
DECLARE @UserId int
DECLARE @ApplicationId int
DECLARE @ApplicationEducationOrganizationId int
DECLARE @ApiClientId int

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

-- Ensure ApiClientOdsInstanceExists
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

:::note
API client creation script samples:

* **SQL Server Script:** [SetupApiClient_SQLServer.sql](https://edfi.atlassian.net/wiki/download/attachments/23301501/SetupApiClient_SQLServer.sql?version=1&modificationDate=1708470934973&cacheVersion=1&api=v2)
* **PostgreSQL Script:** [SetupApiClient_PostgreSQL.sql](https://edfi.atlassian.net/wiki/download/attachments/23301501/SetupApiClient_PostgreSQL.sql?version=1&modificationDate=1708470934980&cacheVersion=1&api=v2)
:::
