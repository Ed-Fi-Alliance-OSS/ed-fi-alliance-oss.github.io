# How To: Configure Claim Sets

The API claim sets for the Ed-Fi ODS / API are stored in `EdFi_Security`
database. Out of the box, Ed-Fi ODS / API has a set of default claim sets
pre-loaded:

* **AB Connect** - Provides CRUD permissions on a minimum set of learning
    standard resources and a select number of Descriptors for learning standard
    synchronization.
* **Assessment Read** - Provides Read only permissions on a limited set of
    resources used for Assessment data.
* **Assessment Vendor** - Provides CRUD permissions on a set of resources used
    for all Assessment data.
* **Bootstrap Descriptors and EdOrgs** - Provides Create only permissions for
    Descriptor and Education Organization data, intended for loading set up data
    by Administration Level users.
* **Ed-Fi ODS Admin App** - Used by the Admin App/Admin API and has CRUD
    permissions on the Descriptor and Education Organization resources, intended
    for loading set up data by Administration Level users.
* **Ed-Fi Sandbox** - For Administration Level users. This allows the highest
    level of access and allows for CRUD permissions on all resources.  Not
    intended for Vendor access (API hosts can use it for setup, e.g. loading
    bootstrap data like education organizations and local descriptors).
* **Education Preparation Program** \- Provides CRUD permissions on resources
    from the Education Preparation Domain and any TPDM extensions.
* **Roster Vendor** - Provides Read only permissions on a set
    of resources used for rostering Student and Staff Section data.
* **SIS Vendor** - Provides CRUD permissions on most common resources that
    represent the staff and student school and classroom data.  This Claim Set
    is typically used by an implementer with a multitenant LEA ODS.  There may
    be restrictions on some key resources that cannot be updated by the SIS
    vendor and are owned by the higher level organization, such as a State or a
    Collaborative organization.  Examples of some resources that may be
    restricted are State Education Agency, Local Education Agency, School, etc..
* **District Hosted SIS Vendor** - Same as the SIS Vendor Claim Set, but also
    includes Create/Update assess to the School recourse and Update access to
    the Local Education Agency resource.   This claim set is commonly used for a
    single LEA implementation.
* **Finance Vendor** - Provides Read only access to dimensions (e.g.
    FundDimension, ProgramDimension etc.) in the [finance
    domain](https://edfi.atlassian.net/wiki/display/EFDS4X/Finance+Domain+-+Entities%2C+References%2C+and+Descriptors).
    Provides CRUD access to ChartOfAccount and locals (e.g. LocalAccount,
    LocalBudget etc.) in the finance domain authorized using education
    organization.

API clients can be assigned with one of the default claim set or a new claim
sets can be created to suite the needs. The [Admin API](/reference/admin-api)
provides endpoints for managing claim sets. For those wishing to setup Claim
Sets directly in the database, the SQL queries on this page enable a database
administrator to edit information about security configurations.

:::info

Security configuration is cached in the ODS / API, claim set changes will take
effect on the ODS / API only after the security cache is refreshed. Out of the
box, ODS / API is configured to refresh security cache every 10 minutes. Cache
refresh interval can be configured using
[ApiSettings:Caching:Security:AbsoluteExpirationMinutes](../platform-dev-guide/configuration/configuration-details.md)
setting in application configuration. For immediate reflection of changes,
manual restart of ODS / API would be needed.

:::

Security configurations can be setup at different levels, as described in the
sections below.

## Define default Authorization Strategies for a Resource Action

The Ed-Fi ODS / API comes pre configured with default authorization strategies
for all the ed-fi core resources. The following script can guide you to setup
new defaults if you choose to change the out of the box settings.

:::info

You should replace the values for `@actionName`, `@authorizationStrategyName`,
and `@resourceName` with values you desire. In addition, if adding Upsert,
Manage, or Maintain actions, then the core actions (such as Create) that
comprise that composite action should also be added.

:::

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

The Ed-Fi ODS / API comes with a set of claim sets pre-configured with actions
that can be performed on various resources. You can update them or create new
claim sets and add resource actions to the new claim set.

:::info

You should replace the values for `@actionName`, `@claimSetName`, and
`@resourceName` with values you desire. In addition, if adding Upsert, Manage,
or Maintain actions, then the core actions (such as Create) that comprise that
composite action should also be added.

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

As you learnt earlier, the Ed-Fi ODS / API comes pre-configured with default
authorization strategies for all the core resources. However you can optionally
setup claim set specific authorization strategy overrides to use a different
authorization strategy for a certain resource action. The following script can
guide you to setup authorization strategy overrides.

:::info

You should replace the values for `@actionName`, `@authorizationStrategyName`,
`@resourceName`, and `@claimSetName` with values you desire. In addition, if
adding Upsert, Manage, or Maintain actions, then the core actions (such as
Create) that comprise that composite action should also be added.

:::

```sql
USE EdFi_Security
GO

DECLARE @actionName nvarchar(255)
DECLARE @authorizationStrategyName nvarchar(255)
DECLARE @resourceName  nvarchar(255)
DECLARE @claimSetName  nvarchar(255)

SET @actionName = 'create'
SET @authorizationStrategyName = 'RelationshipsWithStudentsOnly'
SET @resourceName = 'StudentEducationOrganizationResponsibilityAssociation'
SET @claimSetName   = 'Ed-Fi Sandbox'

DECLARE @actionId int
DECLARE @claimSetId int
DECLARE @resourceClaimId int
DECLARE @authorizationStrategyId int

SELECT @actionId = ActionId FROM Actions WHERE ActionName = @actionName
SELECT @claimSetId = ClaimSetId FROM ClaimSets WHERE claimSetName = @claimSetName
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
