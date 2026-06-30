# How to: Deploy the Ed-Fi ODS / API v3.4 in Google Cloud Using Images

This "How to" guide was made possible thanks to the Michael and Susan Dell Foundation.

## Description

The following "How to" guide will walk you through the instantiation of the Google Cloud Ed-Fi ODS/API v3.4 VM and tools. This VM includes the following Ed-Fi assets and environments:

Assets:

* ODS \\ API v3.4.0
* Swagger documentation for the API
* Admin application to manage both the Production and Sandbox APIs

Environments:

* Production (Shared Instance)
* Sandbox

## Prerequisites

This will be a hands-on activity using the Ed-Fi ODS/API deployed in a VM on Google Cloud, and you will need to provide your own laptop and have access to a Google Cloud tenancy.

**Note:** Even though Google Cloud has promotions for free accounts and/or $300.00 worth of free credits you may need to input a **credit card.**

There are two prerequisites for this lab:

* **1:** Setup a Google Cloud account. Click here: ([https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances))
* **2:** Request access to the VM image. Please provide your email so that we can share the VM image with you. (send email to [douglas.loyo@msdf.org](mailto:douglas.loyo@msdf.org) with subject: Google Cloud VM Access)

## Setup Instructions

1) Login to ([https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances))

2) Open the Google Cloud Console ![Activate Cloud Shell](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_13-3-8.png)

 and click activate. It will open a shell at the bottom of the screen.

3) Execute the following command (Note might take around 5 minutes):

```sh
gcloud compute instances create edfi-development --image edfi-v340 --image-project genuine-essence-252114 --zone us-central1-c --machine-type n1-standard-4
```

![Deploy shell message](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-23_17-16-29.png)

\*Note: If you get message "API \[[compute.googleapis.com](http://compute.googleapis.com)\] not enabled on project \[xxxxxxxxxxxx\]. Would you like to enable and retry? Say yes. This will enable compute on your account.

4) A successful result should look like the image below. Additionally you should see the instance running at the top of the screen.

![Enable API on project message](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-23_17-18-41.png)

5) To be able to access the VM you will need to use the following credentials:

* Username: Administrator
* Password: EdFi!sCool

**\*NOTE:** We recommend you change the password on the Administrator account upon first login.

\*Optionally, you can create a windows account. To do this click the arrow next to RDP and select "Set windows password"![VM Instances set windows password](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_17-36-33.png)

A prompt will come up. Make sure that you type **edfi** for the username. After you click on "Set" it will give you a secure password. **NOTE:** You should save that password in a secure place.![VM Confirm set new password](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_17-38-13.png)

6) Open RDP (Remote Desktop Connection). Hit your windows key and type RDP and enter.

7) Use the **external IP,** edfi user and the password it gave you to connect to the VM

![VM Instances remote desktop connection](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_17-40-30.png)

![VM Instances login remote desktop connection](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_17-41-25.png)

8) At this point you should be in the VM and we can start exploring the Ed-Fi ODS API

## Exploring the Ed-Fi ODS API Assets

### Exploring Databases

1) Open SSMS (Sql Server Management Studio) by clicking on the icon on the task bar.

        ![SSMS Icon Taskbar](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090719_063541_PM.jpg)

2) Connect to the local instance by just clicking connect.

         ![SSMS SQL Login Page](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_18-38-17.png)

3) Expand the databases on the left panel (Object Explorer). You will see a list of all databases. At this point you can expand and explore all tables and objects in the Ed-Fi ODS databases.

![SQL Server Object Explorer view](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_11-5-17.png)

### Exploring IIS and the Available Sites

1) Open IIS (Internet Information Services) by hitting the windows key, typing IIS and hitting enter.

![Search Internet Information Services](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_12-24-32.png)

2) Expand the server by clicking on the arrow on the left. (Expand all websites and virtual directories)

3) Click on the application that says Api that is under the v3.4.0Sandbox virtual directory.

4) On the right "Actions" panel click on browse 443. It will open a Chrome Browser window with the ODS\\API URL.

![API services in IIS](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_14-1-33.png)

![Test API services response](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_14-5-54.png)

5\. Without closing the Chrome browser you can return to IIS and explore the other applications by selecting them and clicking on Browse 443.

6\. Open the "Docs" application that resides inside the /v3.4.0Sandbox/ virtual directory. This is the sandbox swagger. Click on the resources link on the right.

        ![Swagger Documentation](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_14-7-21.png)

7) Authorize your session: Click on the authorize button and use the following credentials.

* client\_id: A0hcXwnYrwaj
* client\_secret: fIM7AKJNYqDRF2DPgD8zup8i

Then click on the "Authorize" button and the inputs should switch to asterisks. This means you are authorized. At this point you can click the "Close" button.

![Authorize Swagger ](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_14-8-56.png)

![OAuth Authorize Swagger](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_12-56-19.png)

1) Execute the students request: Scroll all the way to the bottom of the screen and locate the students request. Click on the arrow on the right to expand it (#1). Then proceed to click on the "GET" request (#2) to expand the options. Click on the "Try it out" button (#3) and scroll to the bottom until you see a big blue button that says "Execute".

![Select Students schema](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090919_103216_AM.jpg)

![Select Try it out](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090919_103455_AM.jpg)

Click on the "Execute" button (#1). You should see a loading animation and then on the results below you will see an array of students (#2). You can continue to explore the rest of the Ed-Fi ODS API endpoints.

![Swagger Execute request](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090919_103719_AM.jpg)

You can explore the rest of the applications on that server.

**Production:**

* Production API: [https://localhost/v3.4.0Production/Api](https://localhost/v3.4.0Production/Api)
* Production Swagger: [https://localhost/v3.4.0Production/Docs](https://localhost/v3.4.0Production/Docs)
  * client\_id: 0CjxTBzwQfQZ

  * client\_secret: Y2D3p9QQ4o3V8mH5LKzJRN0k

* Production Admin App: [https://localhost/v3.4.0Production/AdminApp](https://localhost/v3.4.0Production/AdminApp)
  * user: Administrator
  * pass: EdFi!sCool

**Sandbox:**

* Sandbox API: [https://localhost/v3.4.0Sandbox/Api](https://localhost/v3.4.0Sandbox/Api)
* Sandbox Swagger: [https://localhost/v3.4.0Sandbox/Docs](https://localhost/v3.4.0Sandbox/Docs)
  * client\_id: A0hcXwnYrwaj
  * client\_secret: fIM7AKJNYqDRF2DPgD8zup8i
* Sandbox Admin: [https://localhost/v3.4.0Sandbox/SandboxAdmin](https://localhost/v3.4.0Sandbox/SandboxAdmin)
  * user: [test@ed-fi.org](mailto:test@ed-fi.org)
  * pass: \*\*\*REMOVED\*\*\*

### Exploring the Ed-Fi ODS API through PostMan

1) Open Postman. Click on the icon on the task bar.

        ![Select Postman from App menu](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090719_064517_PM.jpg)

2) Execute a authorization request: On the left panel expand the folders EdFi → V 3.x  and select the "POST 1)GetOAuthToken" request (#1). You can choose what environment you want to use by using the environment dropdown that has been pre-configured with both a sandbox and a production environment. (#2). Once you have selected an environment proceed to click on the "Send" button (#3). Once the request finishes you should see in the results panel a response that contains the access\_token.

![Configure auth token from request](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2020-9-28_14-48-10.png)

3) Execute the students request: On the left pane select the "GET Get Students" (#1) request and click the send button (#2). The results panel should show an array of students. (#3)

Note: you have to have authenticated first by running the "POST Get Auth Token" request and getting an access\_token as described above.

         ![Postman configure auth access tokens](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090919_102046_AM.jpg)

## KNOW Issues

1) When executing "gcloud compute instance create" it gives the following errors:

    1.a) Error message:  "Billing must be enabled for activation of service..."

![Billing must be enabled error](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090719_011047_PM.jpg)

Fix: you will need to activate your account and add a credit card. The simplest way of doing this is clicking on the top right button that says "Activate"![Activate billing from console](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/Untitled_Clipping_090719_010631_PM.jpg)

    1.b) "Could not fetch resource"

![Could not fetch resource error](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/how-to-deploy-ods-google-cloud/image2019-9-7_17-33-9.png)

Fix: We need to give you access to the image. Please email "douglas.loyo@[msdf.org](http://msdf.org)" so that we can give you access to the image.
