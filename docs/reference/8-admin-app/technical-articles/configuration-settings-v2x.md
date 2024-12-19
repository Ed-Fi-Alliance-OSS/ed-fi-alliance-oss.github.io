# Configuration Settings (v2.x)

## Overview

This article describes configuration settings in appSettings.json for Admin App
v2.x.

## Details

Following are some important configuration settings for Admin App along with
their corresponding details:

|     |     |     |
| --- | --- | --- |
| **AppSettings** |     |     |
| Setting Name | Description | Valid Values |
| **AppStartup** | Sets the environment in which Admin App is hosted. | "Azure", "OnPrem". Default value: "Azure". "Azure" is used by Cloud ODS deployment exclusively, and it is the default merely in service of Cloud ODS deployment processes. It is set to OnPrem by on-prem installation scripts, for instance. All deployments other than Cloud ODS should use "OnPrem". |
| **DatabaseEngine** | Sets the database engine being used. | "SqlServer", "PostgreSql". Default value: "SqlServer" |
| **ApplicationInsightsInstrumentationKey** | Sets the instrumentation key for Application Insights for Cloud ODS deployments. Admin App logging can be viewed in Application Insights when using Azure. The instrumentation key identifies the resource that you want to associate your telemetry data with. More information can be found [here](https://docs.microsoft.com/en-us/azure/azure-monitor/app/create-new-resource#copy-the-instrumentation-key). | An instrumentation key can be procured from [the Azure portal](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-resources-app-insights-keys?view=azure-bot-service-4.0). Example: "5b46bad4-b3c3-454f-80dc-6f6f5bd7ce4b" |
| **XsdFolder** | Sets the path to the directory containing the Ed-Fi Standard XSD files. | Any string (must be an existing folder path). Default value: "Schema" which points to the Schema folder under the Admin App web project. For most users, this should be left equal to the default. (This setting is expected to become irrelevant for ODS 5.2.0 and above.) |
| **DefaultOdsInstance** | Sets the default ODS instance name to be used in case of SharedInstance mode. | Any string.   Default value: "EdFi ODS" |
| **ProductionApiUrl** | Points to the Ed-Fi ODS / API server url. | Any string (must be a valid server url) |
| **SecurityMetadataCacheTimeoutMinutes** | Sets the amount of time the security metadata from the EdFi\_Security database is cached. E.g., if it is set to 10 mins, the claim set changes will reflect in the API at least after 10 mins without needing to recycle the API process. **This setting must match the same setting on the ODS/API appsettings.json.** | A positive integer representing the number of minutes. Default value: 10 |
| **ApiStartupType** | Sets the component settings for the API. **This setting must match the ODS/API settings.** See the [following section](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=20480170#PlatformDevGuideExtensibility&Customization-DbPartition) on Developers' Guide for more information on this setting. | "SharedInstance", "YearSpecific", "DistrictSpecific".  Default value: "SharedInstance" |
| **LocalEducationAgencyTypeValue** | Sets the name for the 'Local Education Agency' education organization type. | Any string. Default value: "Local Education Agency" |
| **SchoolTypeValue** | Sets the name for the 'School' education organization type. | Any string. Default value: "School" |
| **BulkUploadHashCache** | Sets the folder path to the Bulk Upload hash cache. | Any string (must be an existing folder path). Default value: "C:\\\\ProgramData\\\\Ed-Fi-ODS-AdminApp\\\\BulkUploadHashCache" |
| ****OptionalEntropy  ****> ⚠️> Admin App 2.2x onwards, this appsetting is deprecated. The only encryption protocol supported is AES. This appsetting is, therefore, no longer needed. | Sets the optional entropy value for DPAPI encryption and decryption calls. Entropy is an additional key specific to the application that is protecting the data. If not specified, it allows other applications running on the same machine to decrypt the encrypted data. If specified, it allows for the protection of data from other system applications. | Any string |
| **EncryptionProtocol**> ⚠️> Admin App 2.2x onwards, this appsetting is deprecated. The only encryption protocol supported is AES. This appsetting is, therefore, no longer needed. | Sets the encryption protocol to be used. Data Protection API (DPAPI) is the default encryption protocol. AES encryption is used for docker deployments. | "DPAPI", "AES". Default value: "DPAPI" |
| **Cloud ODS Specific App Settings - Set by Cloud ODS Deployment and not recommended to set manually.** |     |     |
| **IdaAADInstance** | Sets the base URL of the authorization server (this is always [https://login.microsoftonline.com](https://login.microsoftonline.com)) |     |
| **IdaClientId** | Sets the application/client Id in [Azure Active Directory/App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) for the Azure AD app registered when you deployed |     |
| **IdaClientSecret** | Sets the shared secret of the application. In the App Registration screen for the AdminApp. Click on "Certificates & secrets" and add a New Client Secret. This key value is your IdaClientSecret. |     |
| **IdaTenantId** | Sets the tenant Id. Can be procured from the Azure portal [under Tenant properties](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties). |     |
| **IdaSubscriptionId** | Sets the subscription Id. Can be procured from the Azure portal [under Subscription properties](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade). |     |
| **Docker Specific App Settings** |     |     |
| **ApiExternalUrl** | Points to the Ed-Fi ODS / API server URL. This appsetting is only supposed to be used for displaying the correct URL in docker environments. It is used when displaying the ODS API location on the Applications screen. | Any string (must be a valid server url) |
| **EncryptionKey** | Sets the encryption key for AES encryption. | Must be an AES 256-bit key. An AES 256-bit key can be expressed as a hexadecimal string with 64 characters. It will require 44 characters in base64. Rather than setting this manually, see the [docker setup instructions](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp/tree/main/Docker) for populating it via environment variable ENCRYPTION\_KEY. |
| **ConnectionStrings** |     |     |
| **Formatting Note:** Example values contain the special character "\\". When placed into a double-quoted JSON string, they must be "escaped" as a double slash:Value: Data Source=.\\;Initial Catalog=EdFi\_Admin;Integrated Security=TrueValue as appears quoted in appsettings.json: "Data Source=.\\\\;Initial Catalog=EdFi\_Admin;Integrated Security=True" |     |     |
| **ConnectionString Name** | **Description** | **Examples** |
| **Admin** | Sets the connection string for the EdFi\_Admin database. Can be a PostgreSQL or SQLServer connection string depending on the DatabaseEngine appsetting. | Data Source=.\\;Initial Catalog=EdFi\_Admin;Integrated Security=True |
| **Security** | Sets the connection string for the EdFi\_Security database. Can be a PostgreSQL or SQLServer connection string depending on the DatabaseEngine appsetting. | Data Source=.\\;Initial Catalog=EdFi\_Security;Integrated Security=True |
| **ProductionOds** | Sets the connection string for the EdFi\_ODS database. The database name depends on the ApiStartupType (multi-instance or single instance). Can be a PostgreSQL or SQLServer connection string depending on the DatabaseEngine appsetting. Just like in the ODS's own config, instance name templating with the special placeholder "{0}" is supported. | Data Source=.\\;Initial Catalog=EdFi\_Ods\_Production;Integrated Security=True    Data Source=.\\;Initial Catalog=EdFi\_{0};Integrated Security=True |
