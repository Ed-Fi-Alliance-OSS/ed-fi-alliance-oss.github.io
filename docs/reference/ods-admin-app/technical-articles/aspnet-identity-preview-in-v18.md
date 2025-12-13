# ASP.NET Identity (Preview in v1.8)

> [!INFO] In the Admin App v2.0.0, ASP.NET Identity was promoted to a supported
> feature. The documentation for the feature can be found in the [Securing the
> Admin App](../getting-started/securing-the-admin-app.md)
> section of the Admin App User Guide. Version 1.8 of the Admin App contained a
> preview version. This is the documentation for the preview in v1.8.

This section describes how to enable the [ASP.NET
Identity](https://docs.microsoft.com/en-us/aspnet/identity/overview/getting-started/introduction-to-aspnet-identity)
feature preview in the Admin App.

Admin App supports Active Directory authentication, which is not suitable for
all deployment scenarios. Although some users
may wish to continue using AD for authentication, the Admin App offers
an alternative authentication method using ASP.NET Identity web forms. ASP.NET
Identity
is expected to work seamlessly within different deployment environments, specifically
including cloud deployments.

The ASP.NET Identity feature is a preview feature for v3.4 and disabled by
default with a new installation of the Admin App. Based on usage and field
reports, we intend to publish a production-ready version in Admin App v2.0.0 for
ODS / API v3.5 and beyond. To enable this preview using ASP.NET Identity, Admin
App has a feature flag which can be turned on.

## Overview

Admin App users may choose to enable the ASP.NET Identity to provide web-form
authentication. For more information on enabling the Identity feature set for
the Admin App, please see below:

## Admin App Configuration

Admin App requires a single configuration change in the Web.config file in order
to enable the ASP.NET Identity feature.

### Step 1. Locate the Web.config file

To find the Web.config file, open IIS Manager and navigate to the AdminApp web
application. **Right-click** and select **Explore**. This will open the
installation directory of Admin App where you will find the Web.config file:

![IIS Manager](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-10-19.png)

### Step 2. Configure for ASP.NET Identity Login

1. In Web.config, to enable ASP.NET Identity functionality inside Admin App,
    change the **AspNetIdentityEnabled** item to a value of **true** as shown
    below in the AppSettings node in Web.config:
    ![Web Config](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-2_15-23-42.png)

2. Open IIS Manager and navigate to the AdminApp web application.
    **Double-click** on **Authentication** under IIS Settings. Set "Anonymous
    Authentication" under Authentication settings to "Enabled". If you have an
    option of "Windows Authentication" as well, set that to "Disabled".
    ![Authentication](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-3_10-2-3.png)

## ASP.NET Identity Login

After the above configuration change, the Identity feature is enabled on the
Admin App.

1. The login flow is initiated.
    ![Login](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-3_9-40-18.png)

2. Click on the Sign In button to go to the Login page. A new user can be
    created on first-time setup by clicking **Register as a new user** on the
    lower right.
    ![Admin App Login](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-3_9-41-34.png)

    Registration requires an e-mail and password:
    ![Register](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-3_9-49-11.png)

3. Log in with the created user. Following is the expected home page after
    logging in with the Identity feature enabled. Notice the newly created
    `<test123@test.com>` user in the top right corner:
    ![Admin App](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-3-3_9-44-7.png)

## Troubleshooting

### Common Errors

If you encounter an issue where your browser appears to be in an endless
redirect loop (as if the browser is repeatedly attempting and failing to arrive
at the login screen) check that the IIS Anonymous Authentication settings are
properly configured (as mentioned in Step 2, item 2, above). This issue is seen
when AspNetIdentityEnabled is set to "true" in Web.config, but IIS Anonymous
Authentication is not enabled.

### Reporting Issues

If you encounter issues related to configuration of the Admin App, please create
a ticket in the [Ed-Fi Tracker system (in the EDFI
project)](https://tracker.ed-fi.org/projects/EDFI).
