# Global Administration Tasks – Setup Guide

This guide walks you through the initial global administration setup in the Ed-Fi Admin App. It is designed to help system administrators configure the core elements required for tenant and environment management.

:::info

The Ed-Fi Admin App shares code with the Starting Blocks Admin App from Education Analytics. Although this documentation is generally the same as that for Starting Blocks Admin App, users of Starting Blocks should preferentially refer to [its official documentation](https://docs.startingblocks.org/StartingBlocks%20Admin%20App/about/) rather than this document.

:::

## Environments

### Creating a New Environment

An environment is a paired deployment of an Ed-Fi ODS/API and an Ed-Fi ODS Admin API application. These deployments can operate with multiple _ODS Instances_ (e.g. for separate school years) and, with ODS/API 7+, can also operate in _multi-tenant_ mode. The environment encompasses both concepts. Any pair of ODS/API and Admin API operating together constitutes the environment.

To create a new environment:

1. Navigate to **Home** > **Environments**
2. Click **Connect new environment**
3. Fill in the following fields:

   | Field | Description |
   |-|-|
   | Using Starting Blocks from Education Analytics? | Leave it OFF, otherwise the system will try to connect to a Starting Blocks deployment. |
   | Name | Enter a descriptive name for this environment. |
   | Ed-Fi API Discovery URL | Enter the URL where the Ed-Fi ODS/API discovery endpoint is available (e.g., `https://api.example.org`). |
   | Management API Discovery URL | Enter the URL where the Admin API discovery endpoint is available. |
   | Environment Label | Enter a label to identify this environment (e.g., "production", "development", "staging"). |

4. Click **Save** to create the environment.

:::note

- All URL fields must be valid, accessible endpoints
- The system will attempt to validate these connections when you save

![Required fields for environment](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/environment_requiredfields.png)

:::

### Global Administrator Access to Environments

Once an environment has been created, the Global Administrator will already have access to perform some tasks. However, the Global Administrator's permissions were not designed for environment management. When regularly using a Global Administrator account, it is best to assign that account to a team that has ownership over all relevant environments. Doing so will ensure the right permissions have been applied.

Continue reading for more information about teams and ownerships.

### Environment Validations

1. When an URL is invalid the error would be shown in the specific field.

   ![Invalid URL fields validation](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/environment_invalidurls.png)

2. When creating an environment, the app autodetects whether it's a v6 or v7 environment. Based on this detection, the app will configure tenants accordingly. For v6 environments, there will be a default tenant created automatically. For v7 environments, you'll be able to create multiple tenants.

### Single Tenant v6

![Single Tenant](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/environment_single_tenants.png)

### Single Tenant v7

![Single Tenant](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/environment_v7_singletenant.png)

### Multi-Tenant v7

![Multi Tenant](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/environment_v7_multitenant.png)

## Teams

Teams allow you to organize users and control their access to resources within the Admin App. Creating teams is essential for proper privilege management.

### Creating a New Team

1. Navigate to **Global** > **Teams** in the main navigation menu
2. Click **Create Team** button
3. Fill in the following information:
   - **Name**: Enter a descriptive name for the team (e.g., "District Admins", "API Managers")
4. Click **Save** to create the team

:::tip **Best Practice:**

- Use clear, descriptive names that indicate the team's purpose

:::

![Team Creation Success](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/team/team-successfull-creation.png)

### Granting Ownership to Environments

For an environment to be managed, you must grant ownership to a team. This process allows team members to manage the environment with their different privilege levels. Follow these steps:

1. Select the environment
2. Click "Grant Ownership"

From step 2, follow the guide in [Managing Resource Ownership](#5-ownerships) to complete this process.

![Grant ownership view for environment](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/environment/grant-ownership-to-environment.png)

### Managing Teams

After creating a team, you'll have access to several important management functions:

- **Assume Team Role**: Click the "Assume" button to switch to this team's context, allowing you to manage resources on behalf of the team. When you assume a team role, you can access and modify all resources the team has been granted ownership to, based on the team's assigned roles and privileges.

- **Grant Resource Ownership**: Use the "Add resource" button to give the team access to specific resources like environments, tenants, or applications. This defines what this team can manage within the system.

- **Manage Team Membership**: Click the "Add user" button to add users to this team. Users added to the team will inherit the access permissions defined by the team's role assignments.

These management options make it easy to configure exactly what each team can see and do within the Ed-Fi Admin App.

## Team Memberships

Team memberships connect users to teams and determine their level of access within those teams.

### Adding a Team Membership

1. Navigate to **Global** > **Team Memberships** in the main navigation menu
2. Click **Create Team Membership** button
3. Fill in the following information:
   - **Team**: Select the team this membership applies to.
   - **User**: Select user account.
   - **Role**: Select the role with the appropriate level of access within the team.
4. Click **Save** to create the membership

![Team membership success](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/team-membership/team-membership-success.png)

:::tip **Common Role Types Explained:**

- **Admin**: Full administrative access to manage settings, resources, and perform all administrative functions
- **Standard**: Standard access to work with resources with limited administrative capabilities
- **Viewer**: Read-only access to resources and settings without modification privileges

:::

![Team membership validation](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/team-membership/team-membership-validation.png)

## Roles

Roles determine what actions users can perform within the Admin App. Each role contains a set of privileges that can be assigned or revoked.

### Configuring Role Privileges

1. Navigate to **Global** > **Roles** in the main navigation menu
2. Find and click on the role you want to modify (e.g., **Admin**, **Standard**, **Viewer**)
3. In the privileges list, select or unselect the privileges you want to grant to the role
4. Click **Save** after modifying the role

![Role creation form](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/role/role-creation-view.png)

### Role Types

The **Type** field in the role configuration specifies the context where this role applies:

- **User team**: Roles that determine permissions within a specific team context
- **User global**: Roles that apply globally across the system for users
- **Resource ownership**: Roles that define permissions for managing specific resources

:::warning

**Do NOT enable the "row-count" permission (`team.sb-environment.edfi-tenant.ods:read-row-counts`).**

This permission enables the "row count" button on the ODS page, but this feature is not yet functional in this release of Admin App. Enabling it will cause errors.

![row count permission](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/role/role-privilege-not-select-row-count.png)

:::

## 5. Ownerships

Ownerships define which teams have access to specific resources in the system. Managing ownerships is crucial for proper access control and delegation of responsibilities.

:::Note

You will not be able to configure ownerships until an environment is created (see Step 1). If you are blocked by AWS dependencies, resolve those first.

:::

### Managing Resource Ownership

1. Select the resource type (Environment, Tenant, Application, etc.)
2. Select the specific resource (it may be pre-selected depending on context)
3. Choose the team that should have ownership
4. Select the appropriate role that defines permission level
5. Click "Save"

![Resource Ownership Form](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/ownership/grant-resource-ownership-view.png)

### Types of Resources That Can Be Owned

- **Whole environment**: Grant teams access to manage entire environments
- **Tenant**: Allow teams to manage specific tenants within an environment
- **Ods**: Define which teams can access specific ODS instances
- **Ed-Org**: Grant teams access to manage educational organizations
- **Integration provider**: Allow teams to manage integration providers

![Resource type based ownership selection](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/admin-guide/ownership/grant-ownership-by-resourcetype.png)

The ownership form is dynamic and adapts to your resource type selection. When you choose a specific resource type, the form will update to display only the relevant resources available for that category, streamlining the ownership assignment process.

### Removing Ownerships

If you need to revoke access:

1. Navigate to **Global** > **Ownerships** in the main navigation menu
2. Locate the ownership you want to remove
3. Click the delete (trash) icon
4. Confirm the deletion when prompted

## Creating Applications (Admin API v2 Mode)

To create applications in Admin API v2 mode, you must first populate the ODS instance information in the database manually. This is a prerequisite before you can register any applications.

### Required Manual Database Configuration

1. Connect to your database using your preferred SQL client
2. Execute the following SQL to insert ODS instance records:

```sql
INSERT INTO dbo.odsinstances ("name", instancetype, connectionstring)
VALUES
  ('EdFi_Ods_2026', '2026 ODS', 'host=SERVER_1;port=5432;username=postgres;password=CHANGEME;database=EdFi_Ods_2026'),
  ('EdFi_Ods_2027', '2027 ODS', 'host=SERVER_2;port=5432;username=postgres;password=CHANGEME;database=EdFi_Ods_2027');

INSERT INTO dbo.odsinstancecontexts (odsinstance_odsinstanceid, contextkey, contextvalue)
SELECT odsinstanceid, 'schoolYearFromRoute', '2026' FROM dbo.odsinstances WHERE "name" = 'EdFi_Ods_2026'
UNION
SELECT odsinstanceid, 'schoolYearFromRoute', '2027' FROM dbo.odsinstances WHERE "name" = 'EdFi_Ods_2027';
```

See [Context-Based Routing for Year-Specific ODS](/reference/ods-api/platform-dev-guide/configuration/context-based-routing-for-year-specific-ods) for more information on this multi-instance feature.

:::note

- Replace `SERVER_1`, `SERVER_2`, and `CHANGEME` with your actual server names and credentials
- After inserting these records, you **must restart the ODS/API application container** for the changes to take effect
- This manual step will be automated in a future release

:::
