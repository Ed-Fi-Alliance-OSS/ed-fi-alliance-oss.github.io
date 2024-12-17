# Claim Set Editor Tab (Preview in v1.7)

:::info
In the Admin App v1.8 for ODS / API v3.4, the Claim Set Editor was promoted to a supported feature. The documentation for the feature can be found in the [https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340](https://edfi.atlassian.net/wiki/spaces/ADMIN/pages/25238340) section of the Admin App User Guide. Version 1.7 of the Admin App contained a preview version. This is the documentation for the preview in v1.7.
:::

This section describes how to enable the Claim Set Editing tab in the configuration for Admin App. This feature is a preview feature for v3.3 and disabled by default with a new installation of the Admin App for v1.7 of the Admin App.

## Overview

Admin App users may choose to enable the "Claim Sets" tab found within the Admin App ODS Instance Settings. For more information on enabling the claim set editing feature set for the Admin App, please see below:

## Admin App Configuration

Admin App requires a single configuration change in the Web.config file in order to enable the Claim Set Editor Tab.

### Step 1. Locate the Web.config file

To find the Web.config file, open IIS Manager and navigate to the AdminApp web application. Right-click and select the "Explore" option. This will open the installation directory of Admin App where you will find Web.config.

![IIS Select Admin App](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-10-19.png)

### Step 2. Configure for Claim Set Editor tab

In Web.config, to enable Claim Set Editing functionality inside Admin App, change the **IsClaimSetsTabEnabled** item to have a value of **true** as shown below in the AppSettings node in Web.config:

![Is Claimset Tag enabled](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-1-13_11-15-28.png)

## Claim Sets Tab

After the above configuration change, the Claim Sets tab can be accessed within the Admin App ODS Instance Settings as seen below:
![View ODS Instances](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-1-13_11-25-50.png)

## Reporting Issues

If you encounter issues related to configuration of the Admin App, please create a ticket in the [Ed-Fi Tracker system (in the EdFI project)](https://tracker.ed-fi.org/projects/EDFI).
