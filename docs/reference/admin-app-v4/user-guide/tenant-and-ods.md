---
draft: true
---

# Tenant and ODS Creation

This guide covers the creation and management of tenants and Operational Data Store (ODS) instances using the Ed-Fi Admin App. Proper tenant and ODS management is essential for multi-tenant Ed-Fi implementations.

## Understanding Tenants and ODS

### Tenants

In the Ed-Fi ecosystem, a tenant represents an isolated environment for a specific organization or group. Each tenant has its own:

* Data isolation
* Security boundaries
* Configuration settings
* User access controls

### Operational Data Store (ODS)

The ODS is the central data repository that stores educational data. In multi-tenant scenarios, each tenant typically has its own dedicated ODS instance or shares an ODS with data isolation.

## Creating a New Tenant

### Prerequisites

Before creating a tenant, ensure you have:

* Administrative privileges in the Admin App
* Access to the underlying database infrastructure
* Proper network connectivity
* Required licensing and compliance approvals

### Step-by-Step Tenant Creation

1. **Access Tenant Management**
   Navigate to the tenant management section in the Admin App

2. **Initialize Tenant Configuration**
   * Provide tenant name and identifier
   * Configure basic settings
   * Set initial security parameters

3. **Configure Data Isolation**
   * Choose isolation strategy (separate database, schema-based, or row-level)
   * Set up tenant-specific connection strings
   * Configure data access policies

4. **Validate Configuration**
   * Test database connectivity
   * Verify security settings
   * Confirm data isolation

### Tenant Configuration Options

#### Isolation Strategies

#### Separate Database

* Each tenant has a dedicated database
* Maximum isolation and security
* Higher resource requirements
* Simplified backup and recovery

#### Schema-Based Isolation

* Tenants share a database but use separate schemas
* Balanced isolation and resource usage
* Requires careful schema management
* Cost-effective for medium-scale deployments

#### Row-Level Security

* Single database with data filtered by tenant
* Minimal resource overhead
* Complex security configuration
* Suitable for large-scale deployments

## Creating an ODS Instance

### ODS Creation Process

1. **Database Preparation**
   * Provision database infrastructure
   * Configure connection strings
   * Set up backup procedures

2. **Schema Deployment**
   * Deploy Ed-Fi ODS schema
   * Configure extensions if needed
   * Set up initial data structures

3. **Security Configuration**
   * Configure authentication providers
   * Set up authorization policies
   * Establish audit logging

4. **Integration Setup**
   * Configure API endpoints
   * Set up monitoring
   * Test connectivity

### ODS Configuration Parameters

#### Database Settings

* Connection string configuration
* Performance tuning parameters
* Backup and recovery settings
* Monitoring and logging options

#### API Configuration

* Endpoint URLs and ports
* Authentication methods
* Rate limiting settings
* Caching configuration

## Managing Existing Tenants and ODS

### Tenant Administration

The Admin App provides tools for ongoing tenant management:

* **User Management**: Add, remove, and modify tenant users
* **Configuration Updates**: Modify tenant settings and policies
* **Monitoring**: Track tenant usage and performance
* **Maintenance**: Perform routine maintenance tasks

### ODS Maintenance

Regular ODS maintenance includes:

* **Performance Monitoring**: Track query performance and resource usage
* **Data Integrity**: Verify data consistency and relationships
* **Security Updates**: Apply security patches and updates
* **Backup Verification**: Test backup and recovery procedures

## Best Practices

### Planning and Design

* **Capacity Planning**: Estimate resource requirements based on expected usage
* **Security Design**: Implement defense-in-depth security strategies
* **Scalability**: Design for future growth and expansion
* **Compliance**: Ensure compliance with relevant regulations and standards

### Operations and Maintenance

* **Regular Monitoring**: Implement comprehensive monitoring and alerting
* **Documentation**: Maintain detailed documentation of configurations
* **Change Management**: Follow proper change management procedures
* **Disaster Recovery**: Establish and test disaster recovery procedures

## Troubleshooting

### Common Issues

#### Tenant Creation Failures

* Verify database connectivity
* Check administrative permissions
* Review configuration parameters
* Examine log files for error details

#### ODS Connection Problems

* Validate connection strings
* Check network connectivity
* Verify authentication credentials
* Review firewall and security group settings

#### Performance Issues

* Monitor resource utilization
* Analyze query performance
* Review indexing strategies
* Consider scaling options

### Getting Help

For additional assistance:

* Consult the Ed-Fi community documentation
* Review system logs and error messages
* Contact your system administrator
* Engage with the Ed-Fi community forums

Regular maintenance and monitoring ensure optimal performance and reliability of your tenant and ODS infrastructure.
