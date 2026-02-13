---
title: Using the Sandbox Administration Portal
---

# Using the Sandbox Administration Portal

Before you integrate with a production Ed-Fi ODS / API platform, it's useful to
test your client application against a non-production instance containing test
data. This ensures that your application can correctly exchange data with the
API. This kind of sandbox testing environment is typically isolated from
production data, which ensures that your testing doesn't impact the integrity of
the information in the production system.

The Ed-Fi ODS / API comes with a Sandbox Administration Portal. The Admin Portal
allows users to create and manage testing environments that are completely
isolated from production data.

## Creating New Users

Typically, creating new users is performed by platform administrators on live
systems. It's included here as a reference for developers and those interested
in how the platform is administered.

By logging into the Sandbox Administration Portal using an Admin account,
platform hosts can provision access to vendors to manage their sandboxes. In the
navigation bar at the top, click on **Manage Accounts** > **Create Account**

![Creating new users using Administration Portal](https://edfi.atlassian.net/wiki/download/attachments/22774465/image2020-4-3_11-7-54.png?version=1&modificationDate=1641861354053&cacheVersion=1&api=v2)

**Figure 1.** Creating new users using Administration Portal

Upon completion of the "Create Account" form, the Sandbox Administration Portal
will create and send an account activation e-mail. The e-mail settings are
located in the **appsettings.json** (appsettings.Development.json in a
development environment) file of the **EdFi.Ods.SandboxAdmin** website.  By default, the e-mails are placed in the C:\Temp\AdminConsole\Artifacts\Emails directory on the computer where the Admin site is running. The default setting is:
```json
  "MailSettings": {
        "Smtp": {
            "UserName": "Bingo",
            "From": "noreply@ed-fi.org",
            "SpecifiedPickupDirectory": {
                "PickupDirectoryLocation": "./Artifacts/Emails"
            },
            "DeliveryMethod": "SpecifiedPickupDirectory",
            "Password": "Tingo"
        }
    }
```

SMTP e-mail settings may be used to configure the settings to use an SMTP relay. See [here](https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/file-schema/network/mailsettings-element-network-settings) for more details.



## Obtaining Access and Setting Up Sandboxes

Access to the Sandbox Administration Portal is by invitation only. In the
invitation e-mail, a link will be provided that will direct you to set a
password for your account. Upon logging in, you will see the existing sandboxes
associated with your user, along with their application key and secret.

![Sandbox Administration Portal with configured sandboxes](/img/reference/ods-api/sandbox.webp)

**Figure 2.** Sandbox Administration Portal with configured sandboxes

The **Add Sandbox** button allows you to create a new sandbox environment with or without sample data. A sandbox with sample data includes standard lookup data (e.g., grade level types, attendance event types) as well as anonymized sample data (e.g., students, schools, grades, assessments scores). A sandbox created without sample data will still include the lookup data.

![Add Sandbox](https://edfi.atlassian.net/wiki/download/attachments/22774465/Admin-Portal-Figure-2.png?version=1&modificationDate=1641861354093&cacheVersion=1&api=v2)

**Figure 3.** Adding a sandbox via the Administration Portal

Clicking the Gear icon brings up features like Delete and the ability to change the assigned application Secret. One useful feature included in that menu is **Get Token**, which performs the OAuth authentication steps using the selected application's credentials and returns an access token. This access token code can be used, for example, in the Swagger documentation or to make sample calls to the ODS / API sandbox as shown in the [Authentication](./authentication.md) section of this documentation. 

![Fig 4](https://edfi.atlassian.net/wiki/download/attachments/22774465/Admin-Portal-Figure-3.png?version=1&modificationDate=1641861354080&cacheVersion=1&api=v2)
**Figure 4.** Getting an access token using an application's credentials




### Access to Production

Generally speaking, platform hosts will use a sandbox environment to verify that
a client application can integrate successfully with their instance of the ODS /
API platform. Once integration testing is completed and verified, contact the
platform host for instructions on connecting to production data. Since the data
in a production platform is sensitive, platform hosts generally use a secure
means of communication (e.g., encrypted e-mail, telephone call, secure site), to
supply connection information for production data systems.

---

:::note
The [ODS / API Admin App](https://edfi.atlassian.net/wiki/spaces/ADMIN/overview) is the tool provided with the ODS / API platform code for configuring access to production.
:::

