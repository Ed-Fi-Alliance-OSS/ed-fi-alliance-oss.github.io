---
draft: true
---

# Vendor and Claimset Management

This guide covers the management of vendors and claimsets in the Ed-Fi Admin App. Vendors represent third-party applications or systems that need access to Ed-Fi data, while claimsets define the specific permissions granted to those vendors.

## Understanding Vendors and Claimsets

### Vendors

Vendors in the Ed-Fi ecosystem are external applications, systems, or organizations that require access to Ed-Fi data through the ODS/API. Each vendor must be properly registered and configured before they can access any data.

### Claimsets

Claimsets are collections of permissions (claims) that define what actions a vendor can perform on specific Ed-Fi resources. They provide a structured way to manage and assign permissions to vendors.

## Vendor Management

### Registering a New Vendor

To register a new vendor in the Admin App:

1. **Access Vendor Management**
   Navigate to the vendor management section in the Admin App

2. **Create Vendor Profile**
   * Enter vendor name and contact information
   * Provide vendor description and purpose
   * Set vendor status (active/inactive)

3. **Configure Technical Details**
   * Generate or assign client credentials
   * Set up authentication parameters
   * Configure connection limits and quotas

4. **Assign Initial Permissions**
   * Select appropriate claimsets
   * Review and approve access levels
   * Set effective dates for access

### Vendor Configuration Options

#### Basic Information

* **Vendor Name**: Unique identifier for the vendor
* **Contact Information**: Primary contact details for support
* **Description**: Purpose and scope of vendor access
* **Status**: Active, inactive, or pending approval

#### Security Configuration

* **Client ID**: Unique identifier for API authentication
* **Client Secret**: Secure credential for vendor authentication
* **Authentication Method**: OAuth 2.0, certificate-based, or custom
* **Access Restrictions**: IP allowlists, time-based restrictions

#### Operational Settings

* **Rate Limits**: Maximum API calls per time period
* **Data Access Quotas**: Limits on data volume or record counts
* **Monitoring Level**: Standard, enhanced, or detailed logging
* **Support Level**: Priority and escalation procedures

## Claimset Management

### Understanding Claims

Claims represent specific permissions within the Ed-Fi system:

* **Create**: Permission to add new data records
* **Read**: Permission to retrieve and view data
* **Update**: Permission to modify existing data
* **Delete**: Permission to remove data records
* **ReadChanges**: Permission to access change tracking data

### Creating Custom Claimsets

1. **Define Claimset Purpose**
   * Identify the specific use case
   * Determine required resources and actions
   * Consider security and compliance requirements

2. **Select Resources and Claims**
   * Choose relevant Ed-Fi resources
   * Assign appropriate claim levels
   * Review cross-resource dependencies

3. **Configure Advanced Settings**
   * Set up resource-specific filters
   * Configure ownership-based access
   * Define temporal restrictions

4. **Test and Validate**
   * Test claimset with sample data
   * Verify security boundaries
   * Confirm intended functionality

### Pre-built Claimsets

The Admin App includes several pre-configured claimsets:

#### Standard Application Claimset

* Basic read/write access to core educational data
* Suitable for most SIS integrations
* Includes student, staff, and academic record access

#### Assessment Integration Claimset

* Specialized access for assessment systems
* Read access to student and school data
* Write access to assessment results and scores

#### Analytics and Reporting Claimset

* Read-only access to aggregated data
* Optimized for business intelligence tools
* Includes historical and change tracking data

#### Roster Management Claimset

* Access to student enrollment and scheduling data
* Suitable for learning management systems
* Includes section and course information

## Assigning Claimsets to Vendors

### Assignment Process

1. **Review Vendor Requirements**
   * Understand vendor's data needs
   * Assess security and compliance requirements
   * Verify vendor's technical capabilities

2. **Select Appropriate Claimsets**
   * Choose claimsets that match vendor needs
   * Consider principle of least privilege
   * Review potential data exposure

3. **Configure Assignment Parameters**
   * Set effective dates for access
   * Configure any vendor-specific restrictions
   * Define monitoring and audit requirements

4. **Approve and Activate**
   * Review assignment for compliance
   * Obtain necessary approvals
   * Activate vendor access

### Assignment Best Practices

* **Least Privilege**: Grant only the minimum necessary permissions
* **Regular Review**: Periodically review and update assignments
* **Documentation**: Maintain detailed records of all assignments
* **Monitoring**: Track vendor usage and access patterns

## Monitoring and Auditing

### Vendor Activity Monitoring

The Admin App provides comprehensive monitoring capabilities:

* **API Usage Statistics**: Track call volumes and patterns
* **Data Access Logs**: Monitor which data is being accessed
* **Authentication Events**: Log successful and failed login attempts
* **Performance Metrics**: Track response times and error rates

### Audit Reporting

Generate regular audit reports to:

* Review vendor compliance with assigned permissions
* Identify unusual access patterns or potential security issues
* Document access for compliance and regulatory requirements
* Support vendor performance evaluations

## Troubleshooting

### Common Vendor Issues

#### Authentication Failures

* Verify client credentials are correct
* Check authentication method configuration
* Review network connectivity and firewall settings
* Examine authentication logs for error details

#### Permission Denied Errors

* Verify claimset assignments are active
* Check resource-specific permissions
* Review any vendor-specific restrictions
* Confirm API endpoint configurations

#### Performance Problems

* Monitor rate limiting and quota usage
* Review data access patterns
* Check for inefficient API calls
* Consider optimization recommendations

### Claimset Troubleshooting

#### Insufficient Permissions

* Review required claims for specific operations
* Check resource dependencies and relationships
* Verify temporal restrictions and effective dates
* Consider upgrading to more comprehensive claimsets

#### Over-permissioned Access

* Audit current claimset assignments
* Identify and remove unnecessary permissions
* Consider creating more specific, limited claimsets
* Implement additional monitoring for high-privilege access

## Security Considerations

### Best Practices

* **Regular Credential Rotation**: Periodically update client secrets
* **Access Review**: Conduct quarterly reviews of vendor access
* **Incident Response**: Maintain procedures for security incidents
* **Compliance Monitoring**: Ensure ongoing compliance with regulations

### Risk Management

* **Vendor Assessment**: Evaluate vendor security practices
* **Data Classification**: Understand sensitivity of exposed data
* **Impact Analysis**: Assess potential impact of data breaches
* **Mitigation Strategies**: Implement appropriate risk controls

Regular vendor and claimset management ensures secure, efficient, and compliant access to Ed-Fi data while supporting the diverse needs of your educational technology ecosystem.
