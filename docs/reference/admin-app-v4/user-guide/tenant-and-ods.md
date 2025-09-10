# Tenant and ODS Management in Admin App

:::warning

This is pre-release documentation for software that is not yet available.

:::

Ed-Fi version 7.1 and later support the creation of Ed-Fi Tenants. These tenants are isolated "virtual environments" that allow Ed-Fi users the ability to locally control things like claimsets, vendors, and applications without impacting other tenants hosted in the same Ed-Fi environment. The Ed-Fi Admin App allows for users to manage tenants and ODSs within their team's scope in the Admin App.

[**Please find more information about Multi-Tenancy in Ed-Fi here**](/reference/ods-api/configuration/single-and-multi-tenant-configuration.md)

Below is a diagram pulled from the Ed-Fi tech docs page above depicting how routing works in a multi-tenant environment:

![multi_tenant_routing.png](https://docs.startingblocks.org/imgs/multi_tenant_routing.PNG)

Notice that the tenant ID that is part of the URL informs how to route API requests through the Ed-Fi API.

## Tenant Management

Like other resources in the Admin App, users must have the appropriate permissions assigned to them to manage Ed-Fi tenants in their Ed-Fi environment(s). With the appropriate permissions, users are able to create and delete tenants from their Ed-Fi environment(s). If you do not see the options to create or delete a tenant within your Ed-Fi environment but believe you should have these permissions, please reach out to your system administrator.

### Creating and Deleting Tenants

1. Navigate to the Ed-Fi environment where you'd like to add an Ed-Fi Tenant. Clicking on an environment under the `Environments` section will bring you to the environment details page.

2. If the user has the appropriate permissions, the user will be able to see the `+ New` button at the top right of the Tenants box on this page. If you do not see this button but you believe you should have permissions to do so, please reach out to your system administrator.

3. After clicking the `+ New` button on the tenants section, a `Create New Tenant` form will pop up on the next page. To create a new tenant in Ed-Fi, you will need to enter the Tenant ID and the Tenant Name. Your new tenant will be available to use after clicking `Save` on the creation page.

   :::info
   The Tenant ID will be used in the API URL when making calls to that particular tenant. Ensure this ID follows your organization's naming conventions and is easily identifiable.
   :::

4. To delete a tenant, click on the three dots menu next to the tenant name and select `Delete`.

:::warning
Deleting a tenant is a permanent action that will remove all associated data, vendors, claimsets, and applications. Ensure you have proper backups and approval before proceeding with tenant deletion.
:::

## ODS Management

An Operational Data Store (ODS) is a database that holds operational data for the current school year in Ed-Fi. The data is stored in accordance to Ed-Fi Data Standards. In multi-tenant environments, each tenant can have its own dedicated ODS or share an ODS with other tenants.

### Creating and Managing ODS Instances

1. Navigate to your Ed-Fi environment and select the appropriate tenant.

2. Within the tenant, locate the ODS section where you can view existing ODS instances.

3. If you have the appropriate permissions, you'll see an option to create a new ODS instance. Click `+ New` to begin the ODS creation process.

4. Configure the ODS settings:
   - **ODS Name**: Provide a descriptive name for the ODS instance
   - **Database Configuration**: Set up connection parameters and database settings
   - **Academic Year**: Specify the academic year this ODS will serve
   - **Data Standards Version**: Select the appropriate Ed-Fi Data Standards version

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

Using the multi-tenant architecture in Ed-Fi provides several advantages:

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

- Consult the Ed-Fi technical documentation
- Review the multi-tenancy implementation guide
- Contact your system administrator for environment-specific issues
- Engage with the Ed-Fi community for best practices and troubleshooting tips

Proper tenant and ODS management ensures secure, scalable, and efficient operation of your Ed-Fi implementation across multiple organizational units or environments.
