---
draft: true
---

# Ed-Fi Resource Authorization and Admin App

This guide covers the resource authorization features and capabilities of the Ed-Fi Admin App. Resource authorization controls access to Ed-Fi API resources and ensures data security across your Ed-Fi implementation.

## Understanding Resource Authorization

Resource authorization in the Ed-Fi ecosystem determines which applications and users can access specific data resources through the Ed-Fi ODS/API. The Admin App provides tools to configure and manage these authorization policies.

## Key Concepts

### Resources

Ed-Fi resources represent different types of educational data (students, schools, assessments, etc.). Each resource has specific access requirements and security considerations.

### Claims

Claims define specific permissions that can be granted to applications or users. Common claim types include:

* Create
* Read
* Update
* Delete
* ReadChanges

### Claimsets

Claimsets are collections of claims that can be assigned to vendors or applications. They provide a convenient way to manage groups of related permissions.

## Configuring Resource Authorization

### Viewing Current Authorization

The Admin App provides a comprehensive view of current resource authorization settings. You can review:

* Active claimsets
* Resource-specific permissions
* Vendor assignments

### Managing Claimsets

Use the Admin App to:

1. Create new claimsets
2. Modify existing claimsets
3. Assign claimsets to vendors
4. Review claimset usage

### Security Best Practices

When configuring resource authorization:

* Follow the principle of least privilege
* Regularly review and audit permissions
* Document authorization decisions
* Test changes in a non-production environment

## Authorization Profiles

The Admin App supports authorization profiles that define different levels of access:

* **Application Profile**: Standard application access
* **Assessment Profile**: Specialized access for assessment data
* **Roster Profile**: Access to student roster information

Each profile has predefined settings that can be customized based on your needs.

## Monitoring and Auditing

The Admin App provides tools for monitoring resource access:

* View access logs
* Generate authorization reports
* Track permission changes
* Monitor vendor activity

Regular monitoring helps ensure that authorization policies are working as intended and can help identify potential security issues.

## Troubleshooting Authorization Issues

Common authorization issues and solutions:

1. **Access Denied Errors**: Verify claimset assignments and resource permissions
2. **Missing Data**: Check read permissions for relevant resources
3. **Update Failures**: Ensure update/delete permissions are granted
4. **Performance Issues**: Review the scope of granted permissions

For complex authorization scenarios, consult the Ed-Fi community documentation or reach out to your system administrator.
