# Sandbox Deployment

This section describes the particulars of deploying a Sandbox instance of the
Ed-Fi ODS / API in an on-premises configuration. Although a Sandbox instance
should mirror a Production environment as closely as possible, the Sandbox is
different from a Production deployment in a few important ways:

* The data accessed is test data that is fully disconnected from production data.
* The API documentation resides on the Sandbox instance.
* The Sandbox instance includes a Sandbox Administration Portal that should not be
  part of a Production deployment.
* The hardware and platform requirements are typically lower than with a
  Production deployment.

A Sandbox environment is generally used to support API client developers in
developing client applications. It is not intended to be a staging environment for
the platform host.

## Sandbox Fundamentals

This section outlines the basic information you'll need to know to get a Sandbox
instance up and running.

### API Sandbox Components

There are several websites and databases that work together to provide primary
and supporting functions for a Sandbox instance:

* **Websites**
  * **Ed-Fi ODS API.** The REST endpoint for client applications.
  * **Swagger Documentation UI.** A hosted, web-based Ed-Fi ODS / API client that allows a user to interactively
    explore the API and read API documentation.
  * **Sandbox Administration UI.** This website provides administrative functions for managing sandboxes,
    including the keys and secrets for accessing sandboxes.
* **Databases**
  * **EdFi_ODS_*.** Databases used as templates and test data stores for a Sandbox installation of
    the Ed-Fi-ODS / API.
  * **EdFi_Admin.** A database containing authentication information for API clients.
  * **EdFi_Security.** A database containing authorization information for API clients.

## Sandbox Security

The Sandbox system is, by definition, a test system so it has a different
security profile than a production system. The following are a few guidelines
applicable to Sandbox instances:

* Client applications should be assigned different OAuth key/secret pairs for the
  Sandbox than are used in production.
* Use test data. If you plan to use a copy of production data, scramble or
  otherwise de-identify the data before use in the Sandbox.
* The use of HTTPS and SSL certificates is required for production application
  instances, so the Sandbox instance should mimic that approach.
* Similar to production systems, Sandbox instances should use non-default service
  accounts configured for minimal privileges. However, note that Sandbox instances
  create and drop databases as part of administrative operations, which requires
  elevated SQL privileges.
* It is not recommended that production platforms or servers share hosting duties
  with Sandbox instances.

## Logical Configuration

At its most basic level, the Ed-Fi ODS / API platform consists of two logical
servers: a web server (for the ODS / API), a database server (for the ODS
database). A diagram showing a typical configuration follows:

![Logical Configuration](https://edfi.atlassian.net/wiki/download/thumbnails/22774363/image2015-11-16%208-35-34.png?version=1&modificationDate=1641861349667&cacheVersion=1&api=v2&width=709&height=309)

These logical functions may be combined into one or more physical (or virtual)
machines depending upon the scale and preferences of the hosting organization.

The ODS / API is the only component of this system that interacts outside of the
firewall, and only over HTTP(S) (ports 80 and 443). The database server only
uses local networking, and should not be exposed to internet traffic.

A single-server configuration does not violate the logical design of the system.
Web application and the database may all be installed on a single machine; in
this case the internal network traffic becomes communication between services on a
single computer.

In this document we are discussing deployment to Internet Information Server
(IIS) on a Windows Server and using SQL Server for the database. However the web
applications, being a .NET 8 application, can run cross-platform and PostgreSQL is
another choice for database.

### ODS / API Server

This logical server requires Internet Information Server (IIS) to be installed
as well as the [ASP.NET Core Hosting Bundle](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-6.0#install-the-aspnet-core-modulehosting-bundle).

### ODS Database Server

Microsoft SQL Server 2019 (Development, Standard, or Enterprise) is required for
this logical server. Logins to the database may use either Windows
authentication or SQL authentication. If the SQL databases are on a single server with the
ODS / API or the servers are on the same domain, Windows Authentication is the
recommended approach.

## Sandbox Hardware Requirements

### Single-Server Deployment

In a single-server deployment of an Ed-Fi ODS / API Sandbox, all components are
installed on a single server. This configuration is typical for a small school
district or test installations with a low expected load. While a single disk
configuration is possible, a dual raid configuration is recommended for use in live
Sandbox deployments. A typical single-server specification follows:

| Server | OS / Apps | SQL Data |
|--------|-----------|----------|
| CPU / RAM | 4 Core / 28+ GB | |
| Disk Configuration | SSD RAID 1 (2 Disks) | SSD RAID 5 (3+ disks) |
| Disk Size | 2 x 250 GB | 3+ x 500+ GB |

### Two-Server Deployment

A diagram of a simple two-server deployment follows:

![Two-Server Deployment](https://edfi.atlassian.net/wiki/download/thumbnails/22774363/image17.png?version=1&modificationDate=1641861349630&cacheVersion=1&api=v2&width=300&height=153)

The two-server deployment of an Ed-Fi ODS / API Sandbox provides greater
security and performance than the single server configuration. This is a common
deployment configuration for very large installations. Due to the disk-intensive nature
of the Ed-Fi ODS, the ODS Database server is typically much more capable, in
terms of memory, disk, and CPU than the ODS / API.

| Server | OS/Apps | SQL Data |
|--------|---------|----------|
| CPU / RAM | 4 Core / 16+ GB | 4 Core / 16+ GB |
| Disk Configuration | SSD RAID 1 (2 disks) | SSD RAID 5 (3+ disks) |
| Disk Size | 2 x 250 GB | 3+ x 500+ GB |

### Other Deployment Variations

Similar to Production deployments, components of an Ed-Fi ODS / API Sandbox may
be segregated to individual servers for security or performance considerations;
likewise, components may be duplicated across multiple servers to improve
reliability.

The platform host should find the cost / benefit ratio that makes the most sense
for their particular Sandbox environment.
  
The remainder of this document describes the steps for a two-server deployment
for the Sandbox deployment configuration. For this configuration:

* The ODS / API is named **WEB**
* The ODS Database server is named **SQL**

## Software Requirements

A Sandbox instance of the Ed-Fi ODS / API requires Windows Server 2019 with the
Web Server role, Internet Information Server, and Microsoft SQL Server 2019.

The installation procedures for setting up a two-server Sandbox deployment
follow. Strap in.

## Installation Procedures for a Sandbox Instance

### Migrating from a Development Instance

Typically, platform hosts will spin up a Sandbox instance of the ODS / API at
some point in the platform development cycle, for example, after the core
development is complete, but before the API surface and operational details are
finalized. This section assumes a deployment scenario where developers are moving from
the development phase to a production phase, and are thus migrating from a
development instance of the ODS / API.

Each of the steps that follow can be done manually, and are described as if a
user is deploying their sandbox instance interactively. However, all these steps
can be performed automatically on a build or continuous integration server, and
it is recommended that platform hosts do so where practical.

**Step 1.** Run the PowerShell `initdev` Script. A successful initialize development environment creates each of the
required databases.

**Step 2.** Initialize Security Credentials:

* Run the **EdFi.Ods.WebApi** project locally.
* Open the **Sandbox Administration** website (EdFi.Ods.SandboxAdmin).
* Login as [test@edfi.org](mailto:test@edfi.org) and change the password.
* Do not create any sandboxes or additional users.

**Step 3.** Backup the ODS databases.

Open **Microsoft SQL Server Management Studio** and backup each of the following
databases:

* **EdFi_Admin**
* **EdFi_Ods_Minimal_Template**
* **EdFi_Ods_Populated_Template**
* **EdFi_Security**

**Step 4.** Publish Websites and Services.

Detailed instructions for each of the websites and services are included later
in this document. The following steps are provided as a high-level overview.
Please see the individual installation and configuration instructions as they
pertain to your configuration.

Load the **EdFi_ODS** solution in **Visual Studio** and publish the following projects to a local directory with the same name as the
project under a common parent directory (like C:\temp):

* **EdFi.Ods.SandboxAdmin**
* **EdFi.Ods.SwaggerUI**
* **EdFi.Ods.WebApi**

## Deploy Databases to ODS Database

**Step 1.** Prerequisites.

* Install **SQL Server 2019 Standard** with current service packs and updates.

**Step 2.** Restore Databases.

* Copy the database backups that were created previously to your database sever.
* Using a local instance of **Microsoft SQL Server Management Studio**, restore each
  database.
* Verify that each database is online and browsable.

**Step 3.** Create Database Users.

* If using Windows Authentication:
  * The as-shipped configuration uses Windows Authentication.
  * Add the appropriate app pool identity for each website to the Logins section of
    Microsoft SQL Server Management Studio and assign permissions to the
    corresponding databases.
* If using SQL Server Authentication:
  * Enable SQL Server Authentication by using the Properties context menu item for
    the server. From the Server Properties, Security page, select **SQL Server and
    Windows Authentication mode**.
  * Create Logins for each of the database users in your appsettings.json file for your websites and applications.
  * Assign permissions to the corresponding databases.

## Deploy Websites to ODS / API

This section describes how to deploy and configure the web applications related
to the Ed-Fi ODS / API.
  
In the following instructions, when deploying web applications, we use
C:\inetpub\wwwroot as the default root folder. This is not required. Your root location
can be:

* C:\EdFi\Application
* C:\inetpub\web
* … or something else.

The following diagram shows the relationship between the various databases and
their corresponding ODS / API websites.

![Websites and Databases](https://edfi.atlassian.net/wiki/download/thumbnails/22774363/image2015-11-16%208-58-14.png?version=1&modificationDate=1641861349680&cacheVersion=1&api=v2&width=749&height=300)

Detailed instructions regarding the installation and configuration of each
website are provided in the sections that follow.

### EdFi.Ods.WebApi

**Type.** Web Application.

**Description.** This website provides the main functionality of transactional API over the web.

**Dependencies**

* EdFi_Admin (Database)
* EdFi_Ods_* (Database)
* EdFi_Security (Database)

**Deployment Steps (for an on-premises IIS)**

1. Open the Ed-Fi-Ods solution in Visual Studio.
2. Right-click on EdFi.Ods.WebApi project and select **Publish.**
3. Under Profiles, choose **PublishToIIS** and click on **Connection.**
4. Choose your deployment path in the Target Location textbox. This can be a
   network path. The default location is C:\inetpub\wwwroot\EdFi.Ods.WebApi.
5. Click **Publish.**
6. Open IIS in the target machine, expand the Sites, right-click on **Default Web Site** and select **Add Application.**
7. Fill in the application name and the server location that you have published the
   application:
   
   ![Add Application](https://edfi.atlassian.net/wiki/download/attachments/22774363/image18.png?version=1&modificationDate=1641861350260&cacheVersion=1&api=v2)
   
8. Click **OK.**
9. The application is ready to use. You can browse and see version information
   about the API.

| Configuration | | |
| ------------- | --- | --- |
| App Settings | | |
| ApiSettings:Mode* | Configures the Database Partitioning Strategy. These are the out of the box options: Sandbox. Separate databases for each client application key/secret. SharedInstance. A single database is shared by all client applications. YearSpecific. One database per year (as specified in the URL) is shared by all client applications. DistrictSpecific. One database per district. Other modes may be created to address other scenarios. | The default development value is Sandbox. |
| BearerTokenTimeoutMinutes | The amount of time in minutes that an OAuth session token is valid between calls. | Default value is 30. |
| **Connection Strings** | | |
| EdFi_Ods | Points to the main ODS database in Shared, or provides the connection string template for reaching the specific ODS in YearSpecific or Sandbox. | |
| EdFi_Admin | Points to the Admin database. | |
| EdFi_Security | Points to the Security database. | |

*Values are not optional and MUST be defined at deployment time.

### EdFi.Ods.SandboxAdmin

**Type.** Web Application.

**Description.** Provides and controls security of Web API. Provides administration features to
vendor users and developers to manage their own sandboxes.

**Dependencies**

* EdFi_Admin (Database)
* EdFi_Security (Database)
* EdFi_Ods (Database)
* EdFi_Ods_YYYY (Database)
* EdFi_Ods_Populated_Template (Database)
* EdFi_Ods_Minimal_Template (Database)
* EdFi.Ods.WebApi

**Deployment Steps (for an on-premises IIS)**

Prerequisites:

1. IIS must be running on the target machine.
2. All dependent databases are in place.

Steps to deploy the application:

1. Open the Ed-Fi-Ods solution in Visual Studio.
2. Right-click on EdFi.Ods.SandboxAdmin project and select **Publish**.
3. Under Profiles, choose **PublishToIIS** option and click **Connection**.
4. Choose your deployment path in the Target Location textbox. This can be a
   network path. The default location is C:\inetpub\wwwroot\EdFi.Ods.SandboxAdmin.
5. Click **Publish**.
6. Open IIS in the target machine, expand the Sites, right-click on **Default Web Site** and select **Add Application**.
7. Fill in the application name and the server location that you have published the
   application:
   
   ![Add Application](https://edfi.atlassian.net/wiki/download/thumbnails/22774363/image05.png?version=1&modificationDate=1641861349690&cacheVersion=1&api=v2&width=535&height=372)
   
8. Click **OK**.
9. The application is ready to use.

   ![Sandbox Admin](https://edfi.atlassian.net/wiki/download/thumbnails/22774363/image07.png?version=1&modificationDate=1641861350250&cacheVersion=1&api=v2&width=688&height=222)
   
10. The article [Using the Sandbox Admin Portal](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774465/Using+the+Sandbox+Administration+Portal) has useful information about how to set up accounts for client system
    developers, additional configuration details, plus general usage instructions.

| Configuration | | |
| ------------- | --- | --- |
| App Settings | | |
| DefaultApplicationName | The name of the application used for sandbox application clients. | Default value is Default Sandbox Application. |
| DefaultClaimSetName | The claim set name for the default application for sandbox application clients. | Default value is Ed-Fi Sandbox. |
| OAuthUrl* | Points to WebApi OAuth controller. | Default value is http://localhost:54746/oauth/. |
| MaximumSandboxesPerUser | The maximum number of sandboxes a sandbox admin user can create. | Default value is 5 |
| **Connection Strings** | | |
| EdFi_Admin | Should point to the Sandbox deployment of EdFi_Admin. Note that this database should NOT be shared with Security Tools. | |
| EdFi_Security | Should point to the Sandbox deployment of EdFi_Security. Note that this database should NOT be shared with Security Tools. | |
| EdFi_master | Connection string template to create other ODS connection strings on the fly. It should point to the proper server upon which you want the ODS databases to be created. | |
| User | Defining automatically created user accounts and sandboxes. Also configures automatic refreshes of sandboxes to a clean state. Each user entry will be created with the given email/password, and the sandboxes defined underneath it will also be created for the type and key/secret values. | Example: See appsettings.json |

*Values are not optional and MUST be defined at deployment time.

### EdFi.Ods.SwaggerUI

**Type.** Web Application.

**Description.** Online documentation for the Ed-Fi REST API is available through Swagger.
Swagger is a visual and interactive documentation site providing detailed
descriptions for each API resource as well as a simple way to test calls to the Ed-Fi REST
API in sandbox environments.

**Dependencies**

* EdFi.Ods.WebApi (Application)

**Deployment Steps (for an on-premises IIS)**

1. Open the Ed-Fi-Ods solution in Visual Studio.
2. Right-click on EdFi.Ods.SwaggerUI project and select **Publish**.
3. Under Profiles, choose **PublishToIIS** option and click on **Connection**.
4. Choose your deployment path in the **Target Location** textbox. This can be a
   network path. The default location is C:\inetpub\wwwroot\EdFi.Ods.SwaggerUI.
5. Click **Publish**.
6. Open IIS in the target machine, expand the Sites, right-click on **Default Web Site** and select **Add Application**.
7. Fill in the application name and the server location that you have published the
   application:
   
   ![Add Application](https://edfi.atlassian.net/wiki/download/attachments/22774363/image16.png?version=1&modificationDate=1641861350240&cacheVersion=1&api=v2)
   
8. Click **OK**.
9. The application is ready to use.

   ![Swagger UI](https://edfi.atlassian.net/wiki/download/attachments/22774363/image08.png?version=1&modificationDate=1641861350230&cacheVersion=1&api=v2)

| Configuration | | |
| ------------- | --- | --- |
| App Settings | | |
| WebApiVersionUrl* | Provides the version information for ODS / API. | Sample value: https://server-name |
| SwaggerUIOptions:OAuthConfigObject:ClientId | Optionally provides the value to prefill in the "key" field of auth. | Sample value: populatedTemplate |
| SwaggerUIOptions:OAuthConfigObject:ClientSecret | Optionally provides the value to prefill in the "secret" field of auth. | Sample value: populatedTemplateSecret |

*Values are not optional and MUST be defined at deployment time.

## Deploying Other Sandbox Configurations

The steps above describe the configuration for a two-server Sandbox instance.
The steps and the configuration details are generally the same for other
configurations — but there are a few differences worth noting. The key differences are
summarized in the sections that follow.

### Single-Server Sandbox Configuration

In a single-server sandbox configuration, the databases reside on the same
server as the web server. This is a simpler configuration, but less scalable than a
multi-server configuration. For small districts, this configuration represents
the highest performance-per-dollar option.

In this configuration, **SQL Server** should be firewalled from the public internet,
and possibly have the **TCP/IP protocol disabled**.

It is recommended that **SQL Server Authentication** be disabled in this
configuration, and that only **NT authentication** with local machine service accounts be used
as connection criteria from the API.

### Sandbox Deployment in Azure and AWS Environments

Documentation and scripts for deployment of an Ed-Fi ODS / API instance in
**Microsoft Azure** and **Amazon Web Services** can be found in the **Ed-Fi Exchange**. To locate
these, navigate to [https://exchange.ed-fi.org](https://exchange.ed-fi.org/), and browse to the following entries:

* **Ed-Fi ODS/API on AWS**
* **Ed-Fi ODS/API Deploy Tools for Azure**

## Conclusion

A Sandbox instance of the ODS / API is a critical element in the success of a
large-scale deployment. This section should have provided you with the information
needed to get your Sandbox instance up and running.

Once you've done that, you'll want to consider production deployments, which are
covered in the [next section](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774379/Production+Deployment) of this documentation.
