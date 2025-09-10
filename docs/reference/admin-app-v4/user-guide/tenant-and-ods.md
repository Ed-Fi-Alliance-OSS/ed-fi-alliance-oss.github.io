# ODS Instance and Tenant Management in Admin App

:::warning

This is pre-release documentation for software that is not yet available.

:::

This guide covers the creation and management of tenants and Operational Data Store (ODS) instances using the Ed-Fi Admin App. Proper tenant and ODS instance management is essential for multi-tenant Ed-Fi ODS/API implementations.

## Understanding ODS Instance and Tenants

### Operational Data Store (ODS) Instances

The ODS is the central data repository that stores educational data. In multi-tenant scenarios, each tenant typically has its own dedicated ODS instance or shares an ODS with data isolation.

At the database level, a single pairing of `EdFi_Admin` and `EdFi_Security` databases can support one more instances of the `EdFi_Ods` database.

### Mult-Tenancy

:::tip

Multi-tenancy was introduced in ODS/API 7.1. This section does not apply to prior versions of the ODS/API

Fore more information, see [Single and Multi-Tenant Configuration](/reference/ods-api/platform-dev-guide/configuration/single-and-multi-tenant-configuration).

:::

In the Ed-Fi Technology Suite, a tenant represents an isolated environment for a specific organization or group. Each tenant has its own:

- Data isolation
- Security boundaries
- Configuration settings
- User access controls

These tenants are isolated "virtual environments" that allow users the ability to locally control things like claimsets, vendors, and applications without impacting other tenants hosted in the same environment. At the database level, each tenant has a separate pairing of the `EdFi_Admin` and `EdFi_Security` databases, thus isolating the security settings at the tenant level.

The diagram below depicts how an API client is routed to the correct ODS instance:

![multi_tenant_routing.png](https://docs.startingblocks.org/imgs/multi_tenant_routing.PNG)

Notice that the tenant ID that is part of the URL informs how to route API requests through the Ed-Fi API.

## Tenant Management

Like other resources in the Admin App, users must have the appropriate permissions assigned to them to manage Ed-Fi tenants in their Ed-Fi environment(s). With the appropriate permissions, users are able to create and delete tenants from their Ed-Fi environment(s). If you do not see the options to create or delete a tenant within your Ed-Fi environment but believe you should have these permissions, please reach out to your system administrator.

:::warning

Tenant management is not yet fully functional in the Ed-Fi Admin App. At this time, tenants can only be created during initial environment setup.

If you add additional tenants to a multi-tenant ODS/API 7.x installation _after_ having already created an environment, then start over by creating a new environment.

:::

<!-- ### Creating and Deleting Tenants

1. Navigate to the Ed-Fi environment where you'd like to add an Ed-Fi Tenant. Clicking on an environment under the `Environments` section will bring you to the environment details page.

2. If the user has the appropriate permissions, the user will be able to see the `+ New` button at the top right of the Tenants box on this page. If you do not see this button but you believe you should have permissions to do so, please reach out to your system administrator.

3. After clicking the `+ New` button on the tenants section, a `Create New Tenant` form will pop up on the next page. To create a new tenant in Ed-Fi, you will need to enter the Tenant ID and the Tenant Name. Your new tenant will be available to use after clicking `Save` on the creation page.

   :::info
   The Tenant ID will be used in the API URL when making calls to that particular tenant. Ensure this ID follows your organization's naming conventions and is easily identifiable.
   :::

4. To delete a tenant, click on the three dots menu next to the tenant name and select `Delete`.

:::warning
Deleting a tenant is a permanent action that will remove all associated data, vendors, claimsets, and applications. Ensure you have proper backups and approval before proceeding with tenant deletion.
::: -->

## ODS Instance Management

An Operational Data Store (ODS) is a database that holds operational data for the current school year in the Ed-Fi API. The data is stored in accordance to Ed-Fi Data Standard. In multi-tenant environments, each tenant can have its own dedicated ODS or share an ODS with other tenants.

### Creating and Managing ODS Instances

1. Navigate to your environment and select the appropriate tenant.

2. Within the tenant, locate the ODS section where you can view existing ODS instances.

3. If you have the appropriate permissions, you'll see an option to create a new ODS instance. Click `+ New` to begin the ODS creation process.

4. Configure the ODS settings:
   - **ODS Name**: Provide a descriptive name for the ODS instance
   - **Database Configuration**: Set up connection parameters and database settings
   - **Academic Year**: Specify the academic year this ODS will serve
   - **Data Standards Version**: Select the appropriate Ed-Fi Data Standard version

5. Review and save your ODS configuration.

:::tip
When creating multiple ODS instances, consider your data archival strategy and ensure proper naming conventions that reflect the academic year and purpose of each ODS.
:::

### ODS Configuration Best Practices

- **Performance Optimization**: Configure appropriate indexing and query optimization settings
- **Backup Strategy**: Implement regular backup procedures for data protection
- **Security Settings**: Ensure proper access controls and encryption are in place
- **Monitoring**: Set up monitoring and alerting for ODS performance and availability

## Multi-Tenant Architecture Benefits

Using the multi-tenant architecture provides several advantages:

- **Data Isolation**: Each tenant operates independently with its own data boundaries
- **Scalability**: Resources can be allocated based on individual tenant needs
- **Flexibility**: Different tenants can have different configurations and permissions
- **Cost Efficiency**: Shared infrastructure reduces overall operational costs
- **Simplified Management**: Centralized administration with tenant-specific control

## Troubleshooting

### Common Tenant Issues

#### Tenant Creation Failures

- Verify you have administrative permissions for the environment
- Check that the Tenant ID is unique and follows naming conventions
- Ensure all required fields are properly filled out
- Review system logs for specific error messages

#### ODS Connection Problems

- Validate database connection strings and credentials
- Check network connectivity between the Admin App and database
- Verify that the database server is running and accessible
- Review firewall and security group configurations

#### Permission Issues

- Confirm your user account has the necessary tenant management permissions
- Check with your system administrator about role assignments
- Verify that you're working within the correct environment scope

### Getting Support

For additional assistance with tenant and ODS management:

- Review system logs and error messages
- Review the multi-tenancy implementation guide
- Contact your system administrator for environment-specific issues
- Engage with the Ed-Fi Community for best practices and troubleshooting tips

Proper tenant and ODS management ensures secure, scalable, and efficient operation of your Ed-Fi implementation across multiple organizational units or environments.
