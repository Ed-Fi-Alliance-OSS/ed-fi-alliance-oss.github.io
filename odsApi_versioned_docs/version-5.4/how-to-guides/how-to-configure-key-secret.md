# How To: Configure Key / Secret

API keys and secrets can be administered by the Admin API or Sandbox Admin App,  
but some implementers may prefer to work directly with the data. The SQL queries  
on this page enable a database administrator to create keys and secrets. These  
queries run against the `EdFi_Admin` database.

:::info

You should replace the values for variables with values you desire.

:::

```
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
IF @VendorId IS NULL
BEGIN
    INSERT INTO [dbo].[Vendors] (VendorName) VALUES (@VendorName)
    SELECT @VendorId = SCOPE_IDENTITY()
END

-- Ensure User exists
SELECT @UserId = UserId FROM [dbo].[Users] WHERE Email = @UserEmailAddress
IF @UserId IS NULL
BEGIN
    INSERT INTO [dbo].[Users] (FullName, Email) VALUES (@UserFullName, @UserEmailAddress)
    SELECT @UserId = SCOPE_IDENTITY()
END

-- Ensure Application exists
SELECT @ApplicationId = ApplicationId FROM [dbo].[Applications] WHERE ApplicationName = @ApplicationName
IF @ApplicationId IS NULL
BEGIN
    INSERT INTO [dbo].[Applications] 
        (ApplicationName, VendorId, ClaimSetName, OdsInstanceIds, OperationalContextUri) 
    VALUES (@ApplicationName, @VendorId, @ClaimSetName, ','+CONVERT(nvarchar(10), @OdsInstanceId)+',', @NamespacePrefix)
    SELECT @ApplicationId = SCOPE_IDENTITY()
END
ELSE
BEGIN
    -- Update Existing Application
    UPDATE [dbo].[Applications]
    SET VendorId = @VendorId,
        ClaimSetName = @ClaimSetName,
        OdsInstanceIds = ','+CONVERT(nvarchar(10), @OdsInstanceId)+',',
        OperationalContextUri = @NamespacePrefix
    WHERE ApplicationId = @ApplicationId
END

-- Ensure ApplicationEdOrg exists
SELECT @ApplicationEducationOrganizationId = ApplicationEducationOrganizationId 
FROM [dbo].[ApplicationEducationOrganizations] 
WHERE ApplicationId = @ApplicationId AND EducationOrganizationId = @EducationOrganizationId
IF @ApplicationEducationOrganizationId IS NULL
BEGIN
    INSERT INTO [dbo].[ApplicationEducationOrganizations] 
        (ApplicationId, EducationOrganizationId) 
    VALUES (@ApplicationId, @EducationOrganizationId)
    SELECT @ApplicationEducationOrganizationId = SCOPE_IDENTITY()
END

-- Ensure API Client exists
SELECT @ApiClientId = ApiClientId FROM [dbo].[ApiClients] WHERE [Key] = @Key
IF @ApiClientId IS NULL
BEGIN
    INSERT INTO [dbo].[ApiClients] 
        ([Key], [Secret], [Name], IsHardcoded, ApplicationId, UserId) 
    VALUES (@Key, @Secret, @ApiClientName, 0, @ApplicationId, @UserId)
    SELECT @ApiClientId = SCOPE_IDENTITY()
END
ELSE
BEGIN
    -- Update Existing Api Client
    UPDATE [dbo].[ApiClients]
    SET Secret = @Secret,
        [Name] = @ApiClientName,
        UserId = @UserId,
        ApplicationId = @ApplicationId
    WHERE ApiClientId = @ApiClientId
END

-- Ensure Profile is created (if using sandbox)
IF @UseSandbox = 1
BEGIN
    IF NOT EXISTS (SELECT 1 FROM [dbo].[Profiles] WHERE ProfileName = @ApiClientName)
    BEGIN
        INSERT INTO [dbo].[Profiles] 
            (ProfileName, IsPopulated, OperationalContextUri) 
        VALUES (@ApiClientName, @IsPopulatedSandbox, @NamespacePrefix)
    END
END
```

## More Information

For additional information on `ApiClients` and keys / secrets refer to the [API](https://techdocs.ed-fi.org/display/ETKB/API+Authentication)  
[Authentication](https://techdocs.ed-fi.org/display/ETKB/API+Authentication)  
documentation.