# How To: Configure Claim Sets

The API claim sets for the Ed-Fi ODS / API are stored in a database, and can be managed by the [/wiki/spaces/ADMIN/pages/25238340](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340) UI, which is part of the Admin App.

For those wishing to setup Claim Sets directly in the database, the SQL queries on this page enable a database administrator to edit information about security configurations. Execute the queries against the `EdFi_Security` database.

## Define Default Authorization Strategies for a Resource Action
The Ed-Fi ODS / API comes pre-configured with default authorization strategies for all the Ed-Fi core resources. The following script can guide you to setup new defaults if you choose to change the out-of-the-box settings.

You should replace the values for `@actionName`, `@authorizationStrategyName`, and `@resourceName` with values you desire. In addition, if adding Upsert, Manage, or Maintain actions, then the core actions (such as Create) that comprise that composite action should also be added.

```sql
USE EdFi_Security
GO
 
DECLARE @actionName nvarchar(255)
DECLARE @authorizationStrategyName nvarchar(255)
DECLARE @resourceName nvarchar(255)
 
SET @actionName = 'create'
SET @authorizationStrategyName = 'RelationshipsWithStudentsOnly'
SET @resourceName = 'StudentEducationOrganizationResponsibilityAssociation'
 
DECLARE @actionId int
DECLARE @authorizationStrategyId int
DECLARE @resourceClaimId int
 
SELECT @actionId = ActionId FROM Actions WHERE ActionName = @actionName
 
SELECT @authorizationStrategyId = AuthorizationStrategyId FROM AuthorizationStrategies
WHERE AuthorizationStrategyName = @authorizationStrategyName
 
SELECT @resourceClaimId = ResourceClaimId FROM ResourceClaims
WHERE ResourceName = @resourceName
 
INSERT INTO ResourceClaimActions
    (ResourceClaimId, ActionId)
VALUES
    (@resourceClaimId, @actionId)
 
INSERT INTO ResourceClaimActionAuthorizationStrategies
 (ResourceClaimActionId, AuthorizationStrategyId)
    SELECT ResourceClaimActionId, @authorizationStrategyId FROM ResourceClaimActions
    WHERE ResourceClaimId = @resourceClaimId AND ActionId = @actionId
```
## Add a Resource and Action to a Claim Set

The Ed-Fi ODS / API comes with a set of claim sets pre-configured with actions that can be performed on various resources. You can update them or create new claim sets and add resource actions to the new claim set.  

:::note
You should replace the values for `@actionName`, `@claimSetName`, and `@resourceName` with values you desire. In addition, if adding Upsert, Manage, or Maintain actions, then the core actions (such as Create) that comprise that composite action should also be added.
:::
```sql
USE EdFi_Security
GO
 
DECLARE @actionName nvarchar(255)
DECLARE @claimSetName nvarchar(255)
DECLARE @resourceName nvarchar(255)
 
SET @actionName = 'create'
SET @claimSetName = 'SIS Vendor'
SET @resourceName = 'academicSubjectDescriptor'
 
DECLARE @actionId int
DECLARE @claimSetId int
DECLARE @resourceClaimId int
 
SELECT @actionId = ActionId FROM Actions WHERE ActionName = @actionName
SELECT @claimSetId = ClaimSetId FROM ClaimSets WHERE ClaimSetName = @claimSetName
SELECT @resourceClaimId = ResourceClaimId FROM ResourceClaims WHERE ResourceName = @resourceName

INSERT INTO ClaimSetResourceClaimActions
    (ClaimSetId, ResourceClaimId, ActionId)
VALUES
    (@claimSetId, @resourceClaimId, @actionId)
```
## Define Claim Set Specific Authorization Strategy Overrides for a Resource Action

As you learned earlier, the Ed-Fi ODS / API comes pre-configured with default authorization strategies for all the core resources. However, you can optionally setup claim set specific authorization strategy overrides to use a different authorization strategy for a certain resource action. The following script can guide you to setup authorization strategy overrides. 

:::note
You should replace the values for `@actionName`, `@authorizationStrategyName`, `@resourceName` and `@claimSetName` with values you desire. In addition, if adding Upsert, Manage, or Maintain actions, then the core actions (such as Create) that comprise that composite action should also be added.
:::

```sql
USE EdFi_Security
GO
 
DECLARE @actionName nvarchar(255)
DECLARE @authorizationStrategyName nvarchar(255)
DECLARE @resourceName nvarchar(255)
DECLARE @claimSetName nvarchar(255)
 
SET @actionName = 'create'
SET @authorizationStrategyName = 'RelationshipsWithStudentsOnly'
SET @resourceName = 'StudentEducationOrganizationResponsibilityAssociation'
SET @claimSetName = 'Ed-Fi Sandbox'
 
DECLARE @actionId int
DECLARE @claimSetId int
DECLARE @resourceClaimId int
DECLARE @authorizationStrategyId int
 
SELECT @actionId = ActionId FROM Actions WHERE ActionName = @actionName
SELECT @claimSetId = ClaimSetId FROM ClaimSets WHERE ClaimSetName = @claimSetName
SELECT @resourceClaimId = ResourceClaimId FROM ResourceClaims WHERE ResourceName = @resourceName
SELECT @authorizationStrategyId = AuthorizationStrategyId FROM AuthorizationStrategies
WHERE AuthorizationStrategyName = @authorizationStrategyName
 
INSERT INTO ClaimSetResourceClaimActions
(ClaimSetId, ResourceClaimId, ActionId)
VALUES(@claimSetId, @resourceClaimId, @actionId)
 
INSERT INTO ClaimSetResourceClaimActionAuthorizationStrategyOverrides
 (ClaimSetResourceClaimActionId, AuthorizationStrategyId)
    SELECT ClaimSetResourceClaimActionId, @authorizationStrategyId FROM ClaimSetResourceClaimActions
    WHERE ClaimSetId = @claimSetId AND ResourceClaimId = @resourceClaimId AND ActionId = @actionId
```
