# ODS / API Admin App

The Ed-Fi ODS / API Admin App is a web-based administrative interface for the
Ed-Fi ODS / API. Its purpose is to provide a user-friendly way to manage API
clients, claim sets, and other configuration options for the ODS / API. The
Admin App is available as a standalone application, and is also available for
deployments on Azure and Docker. The Admin App is available for Technical Suite
Three.

![Admin App Screenshot](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/AdminApp18-ScreenCap.png)

## Supported Releases

The following Admin App releases are compatible with ODS/API v5.4:

* [Admin App for Suite 3 v2.3](https://edfi.atlassian.net/wiki/display/ADMIN/Admin+App+for+Suite+3+v2.3)
* [Admin App for Suite 3 v2.2.1](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25231403/Admin+App+for+Suite+3+v2.2.1)
* [Admin App for Suite 3 v2.2](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25231382/Admin+App+for+Suite+3+v2.2)

:::info
For complete and up-to-date Admin App documentation, please visit the [ODS / API Admin App](https://docs.ed-fi.org/reference/admin-app/) documentation.
:::

## Features

The Admin App provides the following key features:

* **API Client Management**: Create, edit, and delete API clients
* **Claim Set Management**: Configure API security claim sets
* **Education Organization Management**: Assign permissions to Education Organizations
* **User Management**: Create and manage Admin App users
* **Multiple Instance Configuration**: Configure connections to multiple ODS instances
* **Vendor Management**: Register third-party vendors and manage their access
* **Descriptors Management**: View and manage descriptors in the ODS
* **Custom Role-Based Security**: Define roles and permissions for Admin App users

## Installation

The Admin App provides a graphical interface for platform hosts to administer and manage non-sandbox instances of the Ed-Fi ODS / API. Follow the installation steps in the [Admin App for Suite 3 v2.3 documentation](https://edfi.atlassian.net/wiki/display/ADMIN/Admin+App+for+Suite+3+v2.3).

### Installation Requirements

* Windows Server 2016 or higher
* IIS 10.0 or higher
* .NET Core 3.1 Runtime
* SQL Server 2016 or higher

### Installation Methods

The Admin App can be installed using one of the following methods:

* NuGet package
* Azure deployment
* Docker container

## Administration

Alternatively, API keys and secrets can be administered by database administrators via SQL queries as outlined in the article [How To: Configure Key / Secret](../../how-to-guides/how-to-configure-key-secret.md).

## Additional Resources

* [Admin App for Suite 3 Documentation](https://edfi.atlassian.net/wiki/spaces/ADMIN/overview)
* [Multi-Instance Connections](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25239521/Multi-Instance+Connections)
* [Year Specific Installation](../../getting-started/readme.md)
