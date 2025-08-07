# How To: View Security Configuration Details

The [Security Visualization
Tool](../platform-dev-guide/utilities/security-visualization-tool.md) is
a command-line utility to view and graphically depict security configurations.
However, it is sometimes useful to view configurations as stored in the
system. The SQL queries on this page enable a database administrator to view
information about security configurations. Execute the queries from the
`EdFi_Security` database.

## View Permissions Under a Claim Set

```sql
USE EdFi_Security
GO

SELECT ClaimSets.ClaimSetName, ResourceClaims.ResourceName, Actions.ActionName
FROM ClaimSets
JOIN ClaimSetResourceClaimActions ON ClaimSetResourceClaimActions.ClaimSetId = ClaimSets.ClaimSetId
JOIN ResourceClaims ON ResourceClaims.ResourceClaimId = ClaimSetResourceClaimActions.ResourceClaimId
JOIN Actions ON Actions.ActionId = ClaimSetResourceClaimActions.ActionId
```

## View Configured Authorization Strategies per Resource Claim

```sql
USE EdFi_Security
GO

SELECT Actions.ActionName, AuthorizationStrategies.DisplayName AS AuthorizationName, ResourceClaims.ResourceName
FROM  ResourceClaimActions
JOIN ResourceClaims ON ResourceClaims.ResourceClaimId = ResourceClaimActions.ResourceClaimId
JOIN Actions ON Actions.ActionId = ResourceClaimActions.ActionId
JOIN ResourceClaimActionAuthorizationStrategies ON ResourceClaimActionAuthorizationStrategies.ResourceClaimActionId = ResourceClaimActions.ResourceClaimActionId
JOIN AuthorizationStrategies ON AuthorizationStrategies.AuthorizationStrategyId = ResourceClaimActionAuthorizationStrategies.AuthorizationStrategyId
ORDER BY ResourceClaims.ResourceClaimId
```

## View Configured Authorization Strategy Overrides per Claim Set

```sql
USE EdFi_Security
GO

SELECT Actions.ActionName, AuthorizationStrategies.DisplayName AS AuthorizationName,  ResourceClaims.ResourceName, ClaimSets.ClaimSetName
FROM ClaimSets
JOIN ClaimSetResourceClaimActions ON ClaimSetResourceClaimActions.ClaimSetId = ClaimSets.ClaimSetId
JOIN ClaimSetResourceClaimActionAuthorizationStrategyOverrides ON ClaimSetResourceClaimActionAuthorizationStrategyOverrides.ClaimSetResourceClaimActionId = ClaimSetResourceClaimActions.ClaimSetResourceClaimActionId
JOIN AuthorizationStrategies ON AuthorizationStrategies.AuthorizationStrategyId = ClaimSetResourceClaimActionAuthorizationStrategyOverrides.AuthorizationStrategyId
JOIN ResourceClaims ON ResourceClaims.ResourceClaimId = ClaimSetResourceClaimActions.ResourceClaimId
JOIN Actions ON Actions.ActionId = ClaimSetResourceClaimActions.ActionId
ORDER BY ClaimSets.ClaimSetId, ResourceClaims.ResourceClaimId
```

## View Applications in Claim Sets

```sql
USE EdFi_Security
GO

SELECT Apps.ApplicationName, Apps.ClaimSetName
FROM ClaimSets
JOIN EdFi_Admin.dbo.Applications Apps ON Apps.ClaimSetName = ClaimSets.ClaimSetName
```
