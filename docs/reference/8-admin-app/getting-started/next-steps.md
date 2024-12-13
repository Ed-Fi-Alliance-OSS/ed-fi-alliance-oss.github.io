# Next Steps

This section outlines a few recommended next steps following a successful installation:

* [Explore Admin App Features](#explore-admin-app-features)
* [Admin App Walkthrough](#admin-app-walkthrough)
* [Review Ed-Fi ODS / API Documentation](#review-ed-fi-ods-api-documentation)
* [Admin App Source Code Access](#admin-app-source-code-access)

Details follow.

# Explore Admin App Features

After installation, consider exploring the Admin App itself:

* **Review and edit education organizations.** This allows you to set up district and school information specific to your organization. If you installed the Admin App for a new, empty ODS / API, this provides you with an easy setup. If your Admin App is pointing to an existing ODS / API, you can confirm that the education organization information is as you expect.
* **Review Ed-Fi Descriptors.** Ed-Fi technology allows you to configure value lists (i.e., code sets) specific to your context using Ed-Fi Descriptors. You can review Descriptors in the Admin App to make sure the as-shipped ODS / API contains values appropriate for your environment.
* **Add client systems.** Data moves in and out of the ODS / API from client systems such as a student information system, assessment system, rostering system, and so forth. If your Admin App is connected to a new instance of the ODS / API, you'll need to set up client systems and provide those system administrators with credentials to get data into your new ODS / API. If your Admin App is connected to an existing instance, you can verify that the vendors and applications are set up as you expect.
* **Add learning standards.** The Ed-Fi Alliance and Certica Solutions partnered to offer the Academic Benchmarks system of learning standards mappings available through the Ed-Fi Operational Data Store (Ed-Fi ODS/API). This partnership will make Academic Benchmarks’ digitized learning standards readily available to education agencies and vendors. The Admin App has built-in synchronization to populate an ODS / API directly from Certica AB. The license is free, and can be obtained online by [visiting this link](https://certicasolutions.com/products/academic-benchmarks/#demo).

The activities above are documented in the [https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25231476](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25231476).

# Admin App Walkthrough

Below is a quick start guide and walk through of Admin App's important features.

## Add Vendor & Application

In this step, we'll add a new vendor and a client application.

If you're not already there, go to the Admin App Home page:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-5-7.png)

Click **Global** and you'll be presented with the screen below with two tabs: Vendors and Claim Sets.

Details for the Claim Sets tab can be found here: [https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340).

We'll continue with the Vendor tab to add a vendor.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-3-7.png)

Clicking on Add Vendor will open the following screen for adding a new vendor.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-6-49.png)

Please enter company, namespace, contact name, and contact e-mail address and hit Save Changes.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2021-4-29_9-57-21.png)

Now, we'll add an application to the vendor we just created. Applications are specific to an ODS / API instance. We can go to the Application creation screen using the **Define Applications** button that appears besides the Add Vendor button when we create the first vendor.
In **Shared Instance mode**, the **Define Applications** button simply takes you to the Applications tab for the single instance.
In **District/Year Specific modes**, the **Define Applications** button takes you to the Instance selection screen.
If there are instances registered already, the user is guided to select an instance to define applications for it.
![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-26-10-07-59-556.png)

If there are no instances registered, a **super admin** user is guided to register an instance and define applications for it.
 ![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-26-10-05-33-329.png)

If there are no instances registered, a **non-super admin** user is guided to contact a super admin to get an instance assigned and proceed further.
![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-26-10-04-39-050.png)

Click on the **Settings from Home** page will take you to **ODS Instance** section.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-9-36.png)

Clicking on Add Application will show following screen.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/Applicationpage5.JPG)

Steps for adding application to vendor

* Provide application name
* Select either option for education organization type
* Choose any available education organization ID from the drop-down menu
* Select appropriate claim set name
* Click Add Application to save the application

You will be presented with the Key and Secret at the next screen. Copy this information to a safe place.

It's useful to test client system functionality (in this document we will be using the generated key and secret for Bulk upload process).

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-1-24_16-20-38.png)

After completing the above step, you'll see the new Test application you just added.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-11-18.png)

## Descriptors tab

View configured descriptors for a known instance.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-12-33.png)

## Education Organizations tab

View and manage education organizations (LEAs and schools).

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-13-31.png)

## Bulk Upload process

You can enter a generated key and secret here and save the credentials. The saved key and secret will be used to authorize bulk upload processes.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-14-19.png)

After saving credentials, bulk upload page will be presented.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-17-17.png)

To perform upload, please select appropriate file type and input file and click upload. After clicking the upload button, the popup will display the upload progress.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/page12.JPG)

Bulk upload is completed successfully.

## Sync Learning Standards

In this step, we'll populate learning standards in the ODS / API by using the Admin App to synchronize with the AB Connect API.

To synchronize learning standards in on local environment, select the **Learning Standards** tab. You'll be presented with the screen below:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-18-44.png)

The screen contains instructions on how to get an API ID and Key from Certica Solutions. Following the instructions on screen to obtain an ID and Key.

Please enter AB connect ID and Key obtained from Certica and click **Enable Learning Standards.** Syncing will begin. A progress bar will show you the current status, and you'll see a "completed successfully" message once done.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-19-30.png)

Clicking Reload will take you to the following screen, where you can reset the AB connect credentials or update the learning standards.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-20-15.png)

## Optional Verification Step

To confirm that learning standards have been populated, a SQL query, such as shown below, can be run against your ODS / API instance database. The query should return a count in the thousands from a successful learning standards synchronization:

```
SELECT COUNT(*) FROM EdFi.LearningStandard WHERE [Namespace] LIKE '%api.academicbenchmarks%';
```

### Reports

Select Reports tab for Ods Instance specific reports.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-21-7.png)

Choosing district will provide district specific reports.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-21-58.png)

By clicking on the individual report link will take you to the detailed report page.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2020-4-17_13-22-45.png)

## New features in Admin App 2.2

### Product Improvement

User can find [Product Improvement details here](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Product+Improvement).

### Edit School Year

In this step, the user can set the ODS instance-level School Year setting. The school year dropdown provides a list of possible years and lets the Admin App user witness the current selection as well as change that selection.

In **Shared Instance mode**, the year selection is visible and editable in the header of the Instance Settings screen.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-18-17-29-15-964.png)

In **District/Year Specific modes**, the **Set School Year** column is visible and editable for the registered instances on the Registered Instances screen.
![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-19-12-10-48-570.png)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-19-12-11-52-878.png)

Clicking the edit pencil icon opens up a modal to select the current school year from the dropdown of possible school years.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image2021-4-29_8-29-43.png)

There are special considerations for Year Specific mode. At instance registration time, we default the instance's year selection to the single year that the instance is dedicated for, saving the user from (likely) ever needing to edit it themselves. However, we do still offer the controls, primarily so a user could correct the system if the school year was altered outside of the app. When a user goes to edit the year in Year Specific mode, we put up a warning as well as suggest exactly what value is expected for that instance. This warning and suggestion also helps to guide the user away from an "off by one" mistake as "Current Year 2021" really corresponds with a "2020-2021" school year.
 ![](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/installation/image-2021-03-18-11-55-55-246.png)

# Review Ed-Fi ODS / API Documentation

If you're new to the Ed-Fi ODS / API — or even if you're upgrading from a previous version in tandem with installing the Admin App — the product documentation for your solution has additional information you'll find useful:

* The Ed-Fi ODS / API v5.2 documentation is available online [here](https://edfi.atlassian.net/wiki/spaces/ODSAPI34).
* You can find documentation for prior version at [Ed-Fi Technology Version Index](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875717/Ed-Fi+Technology+Version+Index)

The Platform Developers' Guide and API Client Developers' Guide are essential reading for platform hosts.

# Admin App Source Code Access

Admin App source code is available under Apache 2 license terms, and can be found at [https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp).

## Contents
