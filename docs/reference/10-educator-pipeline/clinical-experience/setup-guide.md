---
title: Setup Guide
sidebar_position: 0
---

# Clinical Experience and Performance Setup Guide

Use this Setup Guide to install and configure your Clinical Experience and Performance solution using test data. This guide will walk you through setting up a test environment that closely mimics a staging or production environment. At the end of this Setup Guide you'll have a test environment with your own test data loaded, but to cover all required elements (credentials, candidates, and financial aid/grants) for the Clinical Experience and Performance solution additional steps will be required as indicated at the end of Step 3.

This test environment allows your tech team, administrators, and stakeholders to test configuration changes being considered for the production environment without an impact on end-users. It is important to note that this test environment is separate and distinct from the sample environment you accessed during the Quick Start.

This Setup Guide assumes that you have access to a the following data (in CSV format), which provides the data to power the dashboard:

* Student Information System data
* Candidates that have received credentials from the state or other licensing body
* Data on Candidates that have received grants

The following steps to get this test environment up and running are very similar to the steps for setting up a production or staging environment.

## Solution Overview

This section provides an overview of the components of your Clinical Experience and Performance solution to provide context for completing the remainder of the Setup Guide. The diagram below depicts the high-level architecture and component interactions. Names and acronyms in the diagram are explained below.

![Architecture diagram](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/epp-sk-architecture.webp)

The core components involved in this solution are:

* Student Information System (SIS) Data.
* Program Data.
* Survey and Evaluation Data.
* Credentials Data.
* The Ed-Fi ODS / API & Tools, which include Ed-Fi ODS / API, Ed-Fi Admin App, and Data Import Tool.
* Power BI Desktop, the application chosen to model, create, and deliver the Clinical Experience and Performance Dashboards.
* Power BI Online, which allows you to publish the dashboard and manage the different users and roles.

The rest of this guide will instruct you on how to:

* Install the above components.
* Configure Education Organizations and apps in the Ed-Fi Admin App.
* Load data via the Data Import Tool (SIS, Programs, Credentials, Financial Aid/Grants) to the Ed-Fi ODS.
* Use the Clinical Experience and Performance Dashboard to engage and provide support to staff, deans, and program managers.

  :::note

  Important data security notes:

  * Adhere to your organization's data security guidelines regarding student data.
  * We recommend using test data for this walkthrough.
  * If you only have access to production data (i.e., live data about students), you'll want to ensure the platform is as secure as your production environment. Consult your organization's IT or security resources for specific guidance.

  :::

## Step 1. Install the Ed-Fi Solution

:::warning

These instructions were developed with older versions of the Ed-Fi software, though they should remain compatible with newer versions.

:::

In this step, you will install the components of the Ed-Fi solution needed for the Dashboard. These components are:

* ODS / API for Suite 3
* Analytics Middle Tier
* Admin App for Suite 3
* Data Import

### Basic Infrastructure and Prerequisites

The list of infrastructure items you need to be successful is provided below.

* **Database Server (****Windows Server 2019)** with the following components installed:
  * **PowerShell 5.0.** (or newer)
  * **.NET 8 SDK**
  * **Microsoft SQL Server 2019 Standard (or higher)**
* **Web Server (Windows Server)** with the following components installed:
  * **.NET 8 Hosting Bundle.** The .NET Hosting Bundle is required for running the API on IIS.
  * **Internet Information Services.** IIS is the web server that will run the ODS / API.

It is always recommended to follow your institution's best practices for maintenance and backups.

### Install Ed-Fi ODS/API

Install the ODS / API for Suite 3 by following instructions in the [Getting Started - Binary Installation](/reference/ods-api/getting-started/binary-installation/) guide

### Install Analytics Middle Tier

Install Analytics Middle Tier by following the instructions in the [AMT Deployment Guide](../../9-analytics-middle-tier/deployment-guide/readme.mdx) to install the 'EPP' and 'RLS' collections

### Install Admin App

Install Instructions for Admin App can be found in the [Admin App](../../8-admin-app/readme.md) guide.

### Install Data Import

Install Instructions for Data Import can be found in the [PowerShell Installation for Data Import using NuGet Packages](../../6-data-import/readme.md) guide. Data Import configuration is also described below.

:::tip Time to complete

Installing the Ed-Fi Solution usually takes **a few hours to a day**, assuming you have access to the hardware and software prerequisites, and are comfortable working with Windows Server, IIS, and SQL Server.

The time to configure and coordinate data flowing from a certified SIS system typically takes anywhere from **a couple of hours to a week or two** of calendar time, depending on the type of SIS.

:::

## Step 2. Configure your Education Organizations and Applications

In this step, you will load data from your SIS, credential, and financial aid providers to the Ed-Fi ODS / API for it to be available on the Diversity and Persistence dashboard. This step requires you to have access to data in CSV format for Data Import to load into the Ed-Fi ODS / API. If you would like to see sample data import templates and CSV data it can be found [in GitHub](https://github.com/Ed-Fi-Exchange-OSS/Educator-Pipeline-Dashboards/tree/main/Starter%20Kit%20Support/Data%20Import%20Templates%20and%20Sample%20Data).

### Add Your Education Organizations in the Admin App

Once you have successfully installed the Admin App following the instructions provided above, you can continue to configure Admin App to add your Education Organizations. This configuration will allow your data to be loaded properly as much of it requires education organizations. You can also find instructions for AdminApp configuration at [Admin App - Next Steps](../../8-admin-app/next-steps.md).

1. The first time you open Admin App will ask you to register a new user in order to get access to the utility. The user you set up can be used for any future access to the tool. You will also have the opportunity to create additional users later.
2. In order to register a new user you will need to provide an email address and create a new password.
3. As soon as you log in for the first time with your new user, you will see a page to complete the set up of Admin App. You will need to click the continue button to complete the Admin App's initial configuration.
4. After this initial one-time set up you will see a screen with the "Global" and "Settings" buttons. You can start by clicking on the "Settings" button within Admin App to configure your Education Organizations.
5. Click on the "Education Organizations" tab. You might see a spinning icon on screen as the admin app calls the ODS/API to retrieve existing education organizations. When the page finishes loading the 'Local Education Agencies" radio button will be selected. Choose the "Post-Secondary Institutions" radio button.
6. Click the 'Add Post-Secondary Institution" button, this will pop up a new window that will allow you to add a Post-Secondary Institution, which represents the University or institution that your EPP is a part of.

   :::tip

   The Post-Secondary Institution ID, Name of Institution, Address, City, State and Zip Code fields are required. Post-Secondary Institution ID is a numeric field.

   :::

7. After you fill out the information click 'Add'. You will be taken back to the Education Organizations tab and should see the Post-Secondary Institution you just added. Now click on the 'Add School' button on the lower right under your Post-Secondary Institution.
8. A new popup will show that looks very similar to the one you used to create the Post-Secondary Institution. Fill in this form with a School ID that is different from the Post-Secondary ID from that last step. At least one grade level from the drop down. As well as the Name of your EPP and Address information for your EPP. Click the 'Add' button when your done.
9. You will be returned to the Education Organizations tab, you should see two education organizations, if you do click the 'Home' button at the top right side of the page.
10. Click on the "Global" button within Admin App to configure the vendor and Application that will provide API keys and access for Data Import to load your data.
11. Click on the "Add Vendor" button within the Vendors tab to add the vendor you will be using with Data Import.
    1. The Namespace prefix should be a URL which includes your institution's web domain (e.g., uri://www.demo.edu)
12. After you fill out the information and click on "Save Changes", you should see the new entry at the bottom of the screen.
13. Now that the vendor is created, the application needs to be added. Click on the "Define Applications" button to enter the Application menu. Click on Add Application
14. The application form will describe how the vendor will be used.  Here is an example of how to fill out the Education Organization and Claim Set information.

    :::tip

    For test environments using the Ed-Fi Sandbox claim set is appropriate, bur if this is a production environment we suggest using a claim set tailored specifically to this Dashboard.

    :::

15. The next screen will provide you a key and secret to be used with importing data. These values will be required in your data import configuration. Make sure to save this information off somewhere for safekeeping.
16. Finally, the information of the added application is displayed.
17. You will then submit the API URL and security information to your vendor so they can start to load data with you ODS / API.

Once you create an Application in the Admin App, you will store and use the generated **"Key"** and **"Secret"** in the next section.

:::warning

Note: Treat the **Key** and **Secret** as secure information for your organization (because it will control API access to data in the Ed-Fi ODS). Store it according to your local IT Security policy. Often this will be in a password keeper app, on a secure file server, or a similar method.

:::

## Step 3. Configure Data Import and Load Data

The [Data Import tool](../../6-data-import/readme.md) is used for loading export files (typically in CSV format) generated manually, by the EPP, or one of their automated services. There are 5 steps to load data to the ODS/API:

1. Configure Data Import for First Time Use
2. Create your map
3. Create an Import Agent
4. Upload the file
5. Execute the Data Import

:::info

The initial setup of data import will only need to happen once per server that Data Import is installed on. The remaining steps will need to be repeated for each CSV you plan to upload. We have provided an example below using program data.

:::

### Configure Data Import for First Time Use

1. The first time you log in to you Data Import application you will see a log in screen. You will need to create a user for this site by clicking on the register link.
2. Enter an email address and password to get access to data import.
3. Now you can log in to the Data Import application. Under the Admin tab, select the "Configuration" menu item. This is where you will configure Data Import to access the ODS / API.
4. Click on the "Ed-Fi API Connections" button to configure the connection to the API.
5. The next step is to add an API connection which you can do by clicking on the "Add API Connection" button.
6. Enter the API data and then the key and secret generated in the previous Admin App configuration step. Test the connection and confirm appropriate credentials. Click on Save Changes. The API Connection Name should match the name used in Admin App.
7. The new connection should appear in the API Connections list.

Data Import is now configured and you are ready to create or import a template to load data.

### Create or Import a Mapping Template

1. If you already have a import map created select the 'Import / Export' option from the Admin menu.
2. On the Import / Export Templates page, select 'Choose File', this will open a file picker dialog where you can choose the json template to import.
3. To create a new map for importing data select 'Maps' from the configuration menu.
4. Click 'Add Data Map'
5. Fill in the Map Name, for this example we will be using program data, so we will name the map 'EPP Programs'. Select '5.2' from the API Version drop down. Next choose the API resource that you would like data import to import into. Since we're importing program data, we'll select Programs.
6. Finally, click on the 'Choose File' button and select your CSV program data.
7. Click 'Upload'
8. Data Import will read the file looking at the first row for the column names, it will then show you those column names and the first five rows of data in the CSV.
9. You can now map columns in the CSV to fields in the Programs API resource.
10. Once you have completed the mapping, click 'Save Map'
11. This will bring you back to the Maps page. You should now see your new map in the map list.

### Create an Import Agent

1. With the map created, Data Import needs an agent to execute the mapping against data. Select 'Agents' from the Configure menu.
2. Click 'Add Agent'
3. Give the agent a name, this should be something that represents the data being imported, for this example we're using program, so select your API connection created previously. Data Import had a number of different ways to import data, including over FTP or SFTP as well as from the file system.
4. We're choosing to use a manual template. Make sure your agent is enabled and choose the map created in the previous step. Make sure to click 'Add Map' after you've selected your map from the dropdown.
5. Confirm that the map is now listed above the drop down as in the screenshot below.
6. Click 'Save Agent.'  Your new agent will show in the list of agents.

### Upload a file

1. Click on the upload icon to the right of the agent
2. Click 'Choose a File'
3. Select the program data file and click 'Upload
4. You will be taken to the activity page that will show your agent and if the file was able to be uploaded and read. The status should be _Uploaded_. You  can now tell Data Import to import your data into the Ed-Fi ODS.

### Execute Data Import

1. When the configuration is completed and the data files are loaded, import the data in: `c:\inetpub\wwwroot\Ed-Fi\Data Import\DataImport.Server.TransformLoad`
2. Run the _DataImport.Server.TransformLoad.exe executable

:::note

To import the data necessary for the Clinical Experience and Performance Dashboard, you will need to upload data for people, candidates, credentials, programs, and financial aid. This will require repeating Section 3, beginning with _Create or Import a Mapping Template_ for each of the remaining data sources until all of the required data is loaded.

:::

:::tip

For detailed information on the data requirements to be able to power the Clinical Experience and Performance Dashboard, see the [data loading requirements](./data-requirements.md)

:::

## Step 4. Install and Test the Clinical Experience and Performance Dashboard

In this step, you'll install Power BI prerequisites, as well as download and run the Clinical Experience and Performance Dashboards.

### Prerequisites

* At this point, you should have an operational Ed-Fi ODS / API with data loaded through Data Import.
* Additionally, you should have installed the AMT views on your ODS database.
* You will also need a machine that has access to the ODS database and has Power BI Desktop installed.

### Install Power BI Desktop

The Clinical Experience and Performance Dashboard was built with Microsoft's Power BI Desktop application.

To run the dashboard you will need a machine with:

* Access to the database server where you installed the Ed-Fi ODS database
* Power BI Desktop that can be downloaded at this link: [https://powerbi.microsoft.com/en-us/downloads/](https://powerbi.microsoft.com/en-us/downloads/)

### Download and Configure the Clinical Experience and Performance Dashboard

The latest version of the Clinical Experience and Performance Power BI Dashboard file is located in a GitHub repository.

Use the machine that has Power BI and create the following folder structure: `C:\Ed-Fi\QuickStarts\EPP_Performance`.

Save this file onto that location by clicking this link: [Clinical Experience and Performance Power Bi Report](https://github.com/Ed-Fi-Exchange-OSS/Educator-Pipeline-Dashboards/raw/main/Clinical%20Experience/Ed-Fi%20EPP%20Performance.pbix) .

Once the download completes, navigate to the folder where you downloaded the file and double-click it. This should open Power BI and load the Clinical Experience and Performance Dashboard as depicted below:

![Teacher Work Sample Summary view](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/teacher-work-sample-summary-view.webp)

### Update Groups Used in the Dashboard

The current Diversity and Persistence Dashboard groups Programs into grade levels and Financial Aid into Aid Type. The program groups are All Level, Elementary, Middle School, and High School. The financial aid groups are Grants, Loans, Work Study, and Other. In this step, you'll update both groups to better fit your organization.

### Connect your Power BI Dashboard to your Ed-Fi ODS

The data that is pre-populated is a set of data that mimics real world data in a educator preparation program.

* To connect to your Ed-Fi ODS database, use the top menu and navigate to Home and then Transform Data. Click the dropdown arrow and select "Data source settings".

  ![Data Source button](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-1.png)

* When the modal opens click on the "Change Source..." button.

  ![Change Source...](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-2.png)

* A second modal will popup with inputs to configure your SQL Server server connection. Use the IP address or the hostname of the server that contains the database. Then input the name of your Ed-Fi ODS database. Usually the name of your database will be `EdFi_ODS`.

  Depending on your organization's security configuration, you may use integrated or SQL server security.

  ![Choosing a database](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-3.png)

* Once you click ‘OK’, you will see SQL statements. Click ‘OK or ‘Run’
* Additionally, it might show you the following screen:

  ![Changing security](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-4.png)

  This is where you can switch from Windows Integrated Security to MsSQL security if you desire.

* Proceed to click on connect and accept the defaults.
* You will see a screen that will load data from your ODS like the one below. Note that it might take a minute or two to finish loading. This depends on the amount of data and students you have in your Ed-Fi ODS.

  ![Waiting for data load](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-5.png)

* Once it loads, the Clinical Experience and Performance Dashboard will display your data.

If you haven't already, visit the [Clinical Experience and Performance Dashboard Use Case](/getting-started/educator-pipeline/clinical-experience) to learn more about how to use the Clinical Experience and Performance Dashboard.

## Step 5. Publish the Clinical Experience and Performance Dashboard and Plan Your Rollout

The final step is to publish the Clinical Experience and Performance Dashboards to Power BI Online. This release is targeted to your internal test users, allowing them to log in, view, use, and test the data visualizations. At the end of this step, you will be able to plan your rollout and deployment.

### Basic Power BI Online Setup

We will guide you through some of the basics around Power BI Online.

For this dashboard to work you will need:

* A subscription to Power BI Online
* A few users created in Office 365
* A Workspace to be able to publish the dashboard

#### Creating Users in Power BI Online

If you already have users created in your Power BI account you can skip to the next section.

To create users follow these simple steps:

* Login to Power BI Online
* Click on the ![PowerBI "more" button](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/powerbi-dots.png)

  menu on the top left of the screen and select the Admin button
  as depicted below.

  ![Clicking on Admin](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/click-admin-button.png)

* This will open the 365 admin center. From here click on the "Add a user"
  button indicated on the image below.

  ![Add a user](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/add-a-user.png)

* This will open a modal window that will allow you to add a user. Follow the instruction on that modal to create a user.
* It is important to note that the user's email address in Power BI should be the same as the ones in you SIS and in the Ed-Fi ODS. This is how we match the user that is logged in with a role in the Ed-Fi ODS.
* You can repeat this process to add all the users that will be accessing the Clinical Experience and Performance Dashboard on Power BI

#### Creating a Workspace to Hold the Dashboard

Back on the main screen of Power BI Online, click on the menu icon and then on the "Workspaces" subsection, which expands a side modal. At the bottom, click on the "Create a workspace" button to toggle a slide-out form on the right. This slide out form allows you to create and name the workspace. For this demo we named it "Ed-Fi EPP Starter Kits".

At this point you are done with this step.

#### Publishing the Dashboard

Open Power BI Desktop and Sign in with the account that has access to publish to Power BI online.

Proceed to locate and click on the "Home → Publish" menu entry as depicted below.

![Create a workspace](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/create-a-workspace.png)

This will open a modal popup window. Select the workspace you created in the section above and click on the "Select" button.

![Select the new workspace](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/select-the-new-workspace.png)

In a few seconds you will see the modal popup indicating that it is publishing. When complete you will see a "Success!" message.

To confirm, we recommend that you login to Power BI Online and ensure you can see the Dashboard.

To do this, open your favorite browser and navigate to [https://powerbi.microsoft.com/](https://powerbi.microsoft.com/) and login.

Click on your workspace and you should see the "Clinical Experience and Performance Dashboard" in the list, similar to the Diversity Dashboard shown in the screenshot below:

![Dashboard as listed in a workspace](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/dashboard-listed-in-workspace.png)

#### Enabling Security on the Report

The report comes configured with two security roles:

* Supervisor - Has full access to all data
* Standard - This role is meant to restrict access to Personally Identifiable Information and does not have access to the details page of the Dashboard.

To enable it in Power BI Online, follow these steps:

Open your browser and navigate to Power BI Online. Then proceed to open the workspace where you published the "Clinical Experience and Performance Dashboard" report. Ensure that the "All" submenu has been selected, and click on the context menu for the row showing the "Dataset". In the context menu select the security option.

![Enable security](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/enable-security-1.png)

In the Row-Level Security page, ensure you click either 'Standard' or 'Supervisor'. Then add either a role or an individual user who will be able to view the report.

![Choose a role](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/choose-role.png)

Click on the "Save" button once you are done adding groups or users to the members section .

To test the security, hover over the "Standard" or 'Supervisor' role and click on the context menu then select "Test as role."

![Test the role](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/test-the-role.png)

This will load the report and you should see the widgets show blank data as the user you are using will most likely not be part of the security.

![PowerBI showing the 'now viewing' banner](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/now-viewing.png)

On the top blue menu, click on "Now viewing as: " and enter the email of a previously configured user. In this case, we are going to use Sandra Atkins, who is a Faculty member. This is our sample data set. The report will show data specific to that user profile.

![Changing users](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/view-as-different-user.png)

Explore by impersonating other users.

When an actual user logs in, the data will be filtered specifically to that user’s profile.

#### Additional Recommended Reading and Live Dataset Connectivity

We recommend reading the following articles. They explain how to setup a live database connection from Power BI Online to your Ed-Fi ODS SQL Server database.

* [Establish a Power BI service live connection to the published dataset](https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-report-lifecycle-datasets#:~:text=To+establish+a+connection+to,prompts+you+to+sign+in)
* [Connect to on-premises data sources with a Power BI gateway](https://powerbi.microsoft.com/en-us/gateway/)
* [Azure SQL Database with DirectQuery](https://docs.microsoft.com/en-us/power-bi/connect-data/service-azure-sql-database-with-direct-connect)

:::warning

Regarding identity mapping, **it is important to note that a user's email address in Power BI Online should match the email in your SIS and in the Ed-Fi ODS**. This is how the Dashboard matches the user that is logged in to a role in the Ed-Fi ODS.

:::

## Success! You are Ready to Plan Your Rollout and Production Deployment With Your Team

At this point you have completed all the steps required to launch your "Clinical Experience and Performance Dashboard" with your organization. You are now in a position to:

* Verify functionality and support from key systems
* Explore the dashboard (follow the [use case description](/getting-started/educator-pipeline/clinical-experience) to help you and your users)
* Understand what resources and technical skills you need to support it
* Test this solution with your key audiences in a pilot (Note: it is recommended to have a small pilot group so that they help by looking at data and provide feedback on the displayed metrics)
* Plan and conduct a production rollout of your solution
