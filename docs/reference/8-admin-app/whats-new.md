# What's New

This section provides an overview of what's new in the latest versions of the ODS / API Admin App for Technical Suite Two and Technical Suite Three.

**Contents**

*   [Updates in Admin App v3.3](#updates-in-admin-app-v33)
*   [Updates in Admin App v3.2](#updates-in-admin-app-v32)
*   [Updates in Admin App v3.1](#updates-in-admin-app-v31)
*   [Updates in Admin App for Suite 3 v3.0](#updates-in-admin-app-for-suite-3-v30)
*   [Updates in Admin App for Suite 3 v2.4](#updates-in-admin-app-for-suite-3-v24)
*   [Updates in Admin App for Suite 3 v2.3](#updates-in-admin-app-for-suite-3-v23)
*   [Updates in Admin App for Suite 3 v2.2.1](#updates-in-admin-app-for-suite-3-v221)
*   [Updates in Admin App for Suite 3 v2.2](#updates-in-admin-app-for-suite-3-v22)
*   [Updates in Admin App for Suite 3 v2.1.0](#updates-in-admin-app-for-suite-3-v210)
*   [Updates in Admin App for Suite 3 v2.0.1](#updates-in-admin-app-for-suite-3-v201)
*   [Updates in Admin App for Suite 3 v2.0.0](#updates-in-admin-app-for-suite-3-v200)
*   [Updates in Admin App v1.8 for Ed-Fi ODS / API v3.4](#updates-in-admin-app-v18-for-ed-fi-ods-api-v34)
*   [Updates in Admin App v1.7 for Ed-Fi ODS / API v3.3](#updates-in-admin-app-v17-for-ed-fi-ods-api-v33)
*   [Updates in Admin App v1.6 for Ed-Fi ODS / API v3.2](#updates-in-admin-app-v16-for-ed-fi-ods-api-v32)
*   [Updates in Admin App v1.5.1 for Ed-Fi ODS / API v2.6](#updates-in-admin-app-v151-for-ed-fi-ods-api-v26)
*   [Updates in Admin App v1.5](#updates-in-admin-app-v15)

# Updates in Admin App v3.3

Latest Release

*   .NET 8
*   Updated NuGet package dependencies
*   Improved messaging when editing a claimset ([AA-1440](https://tracker.ed-fi.org/browse/AA-1440))
*   Updated base images for the Docker containers

Admin App v3.3.1 update:

*    [AA-1747](https://tracker.ed-fi.org/browse/AA-1747) - Getting issue details... STATUS
*    [AA-1748](https://tracker.ed-fi.org/browse/AA-1748) - Getting issue details... STATUS
*    [AA-1744](https://tracker.ed-fi.org/browse/AA-1744) - Getting issue details... STATUS

# Updates in Admin App v3.2

### Support for ODS/API Suite 3 and v6.x Security Model Updates

Additional support for ODS/API 6.1 updates and to support field use cases.

*   [\[AA-1705\] Claimset export on adminapp will fail if there are multiple default authorization strategies - Ed-Fi Tracker](https://tracker.ed-fi.org/browse/AA-1705)
*   [\[AA-1711\] UI changes for Claimset export on adminapp will fail if there are multiple default authorization strategies - Ed-Fi Tracker](https://tracker.ed-fi.org/browse/AA-1711) 

### Error Updating Large Claimsets

[\[AA-1651\] EdFi Admin App - Editing large claimsets produces an error on page - Ed-Fi Tracker](https://tracker.ed-fi.org/browse/AA-1651)

# Updates in Admin App v3.1

### Support for ODS/API Suite 3 and v6.x Security Model Updates

Admin App v3.1 provides compatibility for both ODS/API Suite 3 (v3.4-v5.3) and ODS/API v6.x.  [AA-1637](https://tracker.ed-fi.org/browse/AA-1637) - Getting issue details... STATUS

### Removal of Product Improvement features

Based on community feedback, we have removed product improvements features and integrations with Google Analytics, Salesforce and Jira Tracker.  [AA-1638](https://tracker.ed-fi.org/browse/AA-1638) - Getting issue details... STATUS

### Update in installation packages

The installation package for Admin App has been incorporated into the Admin App NuGet package.  Please see Installation Instructions for updated instructions on how to install using the included installation package.  [AA-1603](https://tracker.ed-fi.org/browse/AA-1603) - Getting issue details... STATUS

### Update to PowerShell Pre-Installation Check

The PowerShell pre-installation check has been updated in Admin App v3.1.1 to respond to the reported field issue.  [AA-1663](https://tracker.ed-fi.org/browse/AA-1663) - Getting issue details... STATUS

### Changing Ed Org Id Leaves a Record Behind

A bug was discovered where changing an education organization identifier leaves behind additional data affecting ed org hierarches and data access.  This Admin App v3.1.2 update resolves the issue for this use case.   [AA-1722](https://tracker.ed-fi.org/browse/AA-1722) - Getting issue details... STATUS

# Updates in Admin App for Suite 3 v3.0

### Support for ODS/API v6 Security Model Updates

Admin App v3.0 provides support for the ODS/API v6 security model updates.  [AA-1412](https://tracker.ed-fi.org/browse/AA-1412) - Getting issue details... STATUS

### Single-Sign On Support via OpenID Connect

Admin App v3.0 offers authentication via OpenID Connect (OIDC) and third-party systems using this well-known standard.  OIDC authentication is found in enterprise and major online providers and has been highly requested by the field.  [EdWire](https://www.edgraph.com/) has contributed main portions of this feature with a community contribution to establish the pattern.    [AA-1073](https://tracker.ed-fi.org/browse/AA-1073) - Getting issue details... STATUS

Claim Set Editor Bug Fixes

The following tickets have also been resolved in the Admin App v3.0 release:  
 [AA-1594](https://tracker.ed-fi.org/browse/AA-1594) - Getting issue details... STATUS  
 [AA-1597](https://tracker.ed-fi.org/browse/AA-1597) - Getting issue details... STATUS  
 [AA-1600](https://tracker.ed-fi.org/browse/AA-1600) - Getting issue details... STATUS

# Updates in Admin App for Suite 3 v2.4

### Update to .NET 6 

Admin App has been updated to .NET 6 to match the ODS/API and other utilities in the Ed-Fi suite of products.  [AA-1423](https://tracker.ed-fi.org/browse/AA-1423) - Getting issue details... STATUS

### Remove Azure support from Admin App

The prior ODS/API Cloud Deployment for Azure deployment methods used PowerShell and features-specific to the Azure platform, which were state-of-the-art at time of development.  These deployment methods have modernized and updated now available as the [Docker Deployment 2.x](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119348/Docker+Deployment+2.x), for which Admin App has been updated to run in that context.  The prior methods tied to Azure have been removed here.  Ed-Fi [Docker Deployment 2.x](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119348/Docker+Deployment+2.x)s are known to run on Azure.  The [Ed-Fi on Azure](https://github.com/K12-Analytics-Engineering/edfi-on-azure) repository on GitHub, by Marcos Alcozer of K12 Analytics Engineering, provides documentation and scripts to help deploy Ed-Fi ODS/API and Admin App images to the Azure cloud platform as an updated method.    [AA-1460](https://tracker.ed-fi.org/browse/AA-1460) - Getting issue details... STATUS

### Reported Issues

The following implementation issues have been reported by the community and have been resolved

*   A bug has been fixed in the Claim Set Editor of not preserving an intended update  [AA-1485](https://tracker.ed-fi.org/browse/AA-1485) - Getting issue details... STATUS
*   A request has been made to disable the Product Improvement feature and now available as an appSetting.json configuration variable  [AA-1556](https://tracker.ed-fi.org/browse/AA-1556) - Getting issue details... STATUS  

# Updates in Admin App for Suite 3 v2.3

### Multiple Namespace Support

Admin App now has the ability to register multiple namespaces per vendor within the application.

### Multiple Database Support for Docker

Support for multiple database servers in Admin App for Docker configurations is now supported.

### Expanded Database Name Support

Admin App now supports database names up to 1,024 characters long for SaaS/auto-deploy configurations.

### Upgrade Support

Admin App supports upgrade installations via PowerShell installation script.

### Product Improvement Updates

Admin App now includes the ability to send instance information into Community 365 to offer better service to implementers.  For more information, please see the [https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25243154](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25243154) page.

### Submit Enhanced Log Information to Ed-Fi Tracker

When errors occur in Admin App, a new global error handler can send information to Ed-Fi Tracker to enhance the support experience.

### User Experience Improvements

Various updates to features such as Learning Standards for better error messages and reporting.

# Updates in Admin App for Suite 3 v2.2.1

### **TPDM 1.0 Support for Post-Secondary Institutions**

To support TPDM, Admin App has added the ability to manage Post-Secondary Institutions within the Education Organization section.  Schools can also be added to Post-Secondary Institutions.  Please note, only TPDM 1.0 is supported and prior TPDM versions will not enable this functionality.  Also, for non-TPDM users, this feature will be hidden based on extensions detected within the ODS / API.

### JavaScript Library Update

The Lodash JavaScript library has been updated for a modern product version for UI elements.

### Asynchronous ODS / API Version Checking

A performance update has been implemented in the ODS Instance section to load ODS / API information more efficiently for page load.

# Updates in Admin App for Suite 3 v2.2

### School Year Selection

School year selection within an ODS / API in the past has been a script-level task performed directly in SQL.  Starting with Admin App 2.2, school year selection can now be performed directly within the application with display next to ODS / API instances.

### AES Encryption

Admin App encrypts information to keep safe and secure both in-use and while in rest.  Admin App now uses industry-standards AES encryption to safeguard information such as keys and secrets used to administrate the ODS / API.

### Extended Drop-Down Support

Many UI selection elements have been expanded to support hundreds of items.  As Admin App started to serve small, self-serve districts and charter management organizations, previously selection elements (school drop-downs for example) where limited to a fixed number of items.  Admin App has grown into multiple instance scenarios and larger collaboratives and state installations, these limitations have been removed for broader usage of Admin App in these scenarios.

### ODS / API 5.2 and Docker Deployment 2.0 Support

Admin App has been updated and tested to work with ODS / API 5.2 and packaged as part of the [Docker Deployment 2.0](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Docker+Deployment) release.

# Updates in Admin App for Suite 3 v2.1.0

### .NET Core Migration

Admin App 2.1.0 is now 100% .NET Core-based, which allows it to run on non-Microsoft platforms, such as [Linux Docker](https://www.docker.com/resources/what-container) containers.  This requirement has been signaled by our [Technical Advisory Group](https://edfi.atlassian.net/wiki/display/GOV/Technical+Advisory+Group) and Ed-Fi community members, which we're excited by this release to deliver on.  As related, the Ed-Fi [Docker Deployment](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Docker+Deployment) offering has been updated to include Admin App v2.1.0 and configured to run with ODS / API v5.1.0.  For more information on the migration, please see a recorded webinar titled "[A .NET Core migration story](https://headspring.com/about/events/a-net-core-migration-story-the-benefits-of-a-carefully-planned-process/)" as recently presented by the ODS Tools Team.

### **Display Version Numbers**

To help with support and debugging issues, both Admin App and ODS / API version numbers are displayed within the context of authenticated pages.

### **Session Handling Optimizations**

From external feedback, we've received technical notes on how to handle sessions better including cleaning up cookies not in use after logout.  As part of the migration to .NET Core, we've also improved session handling within Admin App.

### Improved Developer Experience

Improvements have been made to improve the developer experience and starting with source code with an ability to "clone and go".  As Admin App is one of Ed-Fi's open source offerings, please see [https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp) for more information and to get started with Admin App source code.

### Improved User Experience

Optimizations to first setup experience, dialogs, warning messages and bulk load process have been made in this version of Admin App.

# Updates in Admin App for Suite 3 v2.0.1

### Fix for Postgres installations with SSPI authentication

Admin App 2.0.1 was released as an addition was necessary in the installation process for Postgres installations using SSPI authentication.  SSPI allows Windows roles to be mapped to Postgres database users, similar to how is done with SQL Server installations.  This update was provided in this minor release and Admin App installations running with Postgres will have less configuration to modify.

# Updates in Admin App for Suite 3 v2.0.0

## New Features

### Multi-instance Support for District-Specific and Year-Specific Modes

As highly requested by the Ed-Fi community, starting with Admin App v2.0.0, multiple Ed-Fi ODS / API instances can be administered using Admin App configured for district-specific and year-specific modes. Shared instance mode is still supported within Admin App. With multi-instance mode, users have the ability to register numerous instances within their environment, then administer individual functions within each ODS / API, such as manage API keys and secrets, view descriptors, perform bulk uploads and populate learning standards.

### Bulk Registration of ODS / API Instances

Along with the new multi-instance administration feature, Admin App v2.0.0 supports the ability to bulk register existing ODS / API instances by uploading a simple CSV file. The file contains instance values and a short description of each instance. Once complete, this file can be uploaded via Admin App to register multiple instances within your environment.

### Multiple Version Support for Ed-Fi ODS / API v3.4 and v5.0.0

Admin App v2.0.0 supports both ODS / API v3.4 and v5.0.0. 

### ASP.NET Identity and Multiple Role Support

Admin App 2.0.0 replaces Active Directory support with built-in web form authentication using ASP.NET Identity. With ASP.NET Identity, Admin App supports two primary roles within the application: Super-Administrator and Administrator. The Super-Administrator role can register and view listings of all ODS / API instances as well administer application management functions, view descriptors, and perform bulk uploads. The Administrator role can only view the listings of the ODS / API instances they are assigned to and administer the individual functions within.

# Updates in Admin App v1.8 for Ed-Fi ODS / API v3.4

## New Features

### Claim Set Editor

Based on Ed-Fi community feedback and building on the Admin App v1.7 Claim Set Editor preview, a graphical editor for claim sets is now available in Admin App. This feature minimizes the complex work of writing SQL scripts to establish claim sets. See the [https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340) documentation for instructions on how to use the new feature.

### ASP.NET Identity (Preview)

Based on Ed-Fi community feedback from those hosting instances on cloud configurations, authorization approaches other than Active Directory have been preferred by numerous implementers. ASP.NET Identity offers secure web-form authentication as an alternative to the Active Directory support built-in today. Currently, this feature is offered as a preview, and will become part of future releases based on field usage. See the [ASP.NET Identity (Preview in v1.8)](../ods-api-admin-app/technical-articles/aspnet-identity-preview-in-v18.md) section for information and instructions on how to enable this feature.

### Learning Standards 1.1 Update

The Learning Standards feature within Admin App v1.8 has been updated to version 1.1. Optimizations have been updated to help with sequencing of learning standard items as well as enhancements to learning standards updates from within Admin App. Please see the [What's New - Learning Standards Sync Utility](#) section for more information on this update.

### Postgres Support

Admin App v1.8 is fully compatible with Postgres 11 Ed-Fi ODS / API configurations.

### PowerShell Installation Process

Admin App now provides an enhanced and customizable PowerShell installation process based on Ed-Fi community feedback. Please see [Admin App v1.8.1 for Ed-Fi ODS / API v3.4](../ods-api-admin-app/getting-started/installation/older-versions-of-admin-app/admin-app-v181-for-ed-fi-ods-api-v34.md) for more information on how to use and take advantage of the PowerShell installer.

# Updates in Admin App v1.7 for Ed-Fi ODS / API v3.3

## New Feature

### Claim Set Editor (Preview)

Starting with Admin App v3.3, a new graphical editor for Claim Sets is available as a preview feature. Please see [this Technical Article](../ods-api-admin-app/technical-articles/claim-set-editor-tab-preview-in-v17.md) for instructions on how to enable and preview the Claim Set Editor features.

# Updates in Admin App v1.6 for Ed-Fi ODS / API v3.2

## New Feature

### On-Premises Year-Specific Mode

Some Ed-Fi implementers choose "Year-Specific mode" configuration for their Ed-Fi ODS / API platform for data partitioning requirements or other needs. Admin App has been updated to support Year-Specific mode configurations, which can be set initially at installation time.

## Improvement

### On-Premises Cloud License Optimization

On-premises installations have accepted the Ed-Fi license as part of access to source code and other Ed-Fi community material. We have removed the "Cloud ODS" licensing step for on-premises installations to optimize the installation process.

# Updates in Admin App v1.5.1 for Ed-Fi ODS / API v2.6

## New Features

### Student ID to Identification Code Translation

Multiple student identifiers are commonly used in the education data ecosystem. Several cases have emerged in the Ed-Fi Community where student IDs in API transactions (i.e., the `studentUniqueId` field) are not known to the client application. As a result, a related transaction fails. This issue has been raised in, for example, the [ODS-1824](https://tracker.ed-fi.org/browse/ODS-1824), [ODS-2664](https://tracker.ed-fi.org/browse/ODS-2664), and [ODS-2791](https://tracker.ed-fi.org/browse/ODS-2791) tickets. 

The recommended long-term solution is to facilitate, push, and drive rostering products to support configuration of different IDs for different agencies, and to store all roster IDs. However, the Ed-Fi ODS / API v2.6 includes a student identification code translation feature as a stopgap measure.

![](https://techdocs.ed-fi.org/download/attachments/61705307/AdminAppFunctionAddApplication2.PNG?version=3&modificationDate=1561498133930&api=v2)

  
**Admin App v1.5.1 for Ed-Fi ODS / API v2.6 Student Identification System Descriptor selection drop-down**

# Updates in Admin App v1.5

This Admin App v1.5 was the first version of the ODS / API Admin App in its current form. However, many of its core features were part of previous products, including a version distributed with the Ed-Fi ODS / API Cloud Deployment for Azure and the Ed-Fi ODS / API Cloud Deployment for AWS, both published on the [Ed-Fi Exchange](https://exchange.ed-fi.org).

## New Features

### Built-In Support for AB Connect

Admin App v1.5 comes with built-in integration to Certica's Academic Benchmark product, an online resource for academic benchmarks and learning standards. The integration includes a free license to several national and state-level learning standards. See the [Ed-Fi Learning Standards Sync Utility](#) documentation for details.

### Support for On-Premises Deployments

Admin App v1.5 added an installer that provides support for existing enterprise deployments of the Ed-Fi ODS / API.