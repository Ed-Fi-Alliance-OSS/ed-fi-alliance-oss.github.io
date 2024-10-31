# Using the Sandbox Administration Portal

Before you integrate with a production Ed-Fi ODS / API platform, it's useful to
test your client application against a non-production instance containing test
data. This ensures that your application can correctly exchange data with the
API. This kind of sandbox testing environment is typically isolated from
production data, which ensures that your testing doesn't impact the integrity of
the information in the production system.

The Ed-Fi ODS / API comes with a Sandbox Administration Portal. Most platform
hosts expose this portal to client developers. The Admin Portal allows users to
create and manage testing environments that are completely isolated from
production data.

## Creating New Users

Typically, creating new users is performed by platform administrators on live
systems. It’s included here as a reference for developers and those interested
in how the platform is administered.

By logging into the Sandbox Administration Portal using an Admin account,
platform hosts can provision access to vendors to manage their sandboxes. In the
navigation bar at the top, click on **Manage Accounts** > **Create Account**

Upon completion of the "Create Account" form, the Sandbox Administration Portal
will create and send an account activation e-mail. The e-mail settings are
located in the **appsettings.json** (appsettings.Development.json in a
development environment) file of the **EdFi.Ods.SandboxAdmin** website. By
default, the e-mails are placed in the "Artifacts/Emails" directory where
Sandbox Admin's binaries reside.

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

You may configure and use an SMTP relay for e-mail delivery;
see [here](https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/file-schema/network/mailsettings-element-network-settings)
for more information.

## Obtaining Access

Access to the Sandbox Administration Portal is by invitation only. In the
invitation e-mail, a link will be provided that will direct you to set a
password for your account. Upon logging in, you will see the existing sandboxes
associated with your user, along with their application key and secret.

![Sandbox Administration Portal with configured sandboxes](/img/reference/ods-api/sandbox.png)

**Figure 2.** Sandbox Administration Portal with configured sandboxes

## Managing Vendors

Click the **Manage Vendors** button in the navigation bar to open the Vendors
administration page.

The "Test Admin" Vendor comes pre-configured with the namespace prefixes
`uri://ed-fi.org`, `uri://gbisd.edu`, and `uri://tpdm.ed-fi.org`. If this Vendor
satisfies your testing requirements, you can skip this section.

Clicking on the **Add Vendor** button opens a modal where you can specify a
namespace prefix alongside its contact information.

:::info

Although the ODS API supports multiple namespace prefixes associated with a
Vendor, the Sandbox Administration Portal only supports assigning a single
namespace prefix in the "Add Vendor" modal.

:::

To delete a Vendor, click on the trash icon next to it. This action also deletes
any Applications associated with the Vendor. It does not remove associated
Sandboxes, which will appear in the Sandbox Orphan Report, where you can
manually delete them.

## Managing Applications

Click the **Manage Applications** button in the navigation bar to open the
Applications administration page.

The "Default Sandbox Application Sample" Application comes pre-configured with
the `255901` and `19255901` Education Organizations. If this Application
satisfies your testing requirements, you can skip this section.

Clicking on the **Add Application** button opens a modal dialog box where you
can specify a Vendor and an Education Organization. You must first create a
Vendor on the "Manage Vendors" page.

:::info

Although the ODS API supports multiple Education Organizations associated with
an Application, the Sandbox Administration Portal only supports assigning a
single Education Organization in the "Add Application" modal.

:::

To delete an Application, click on the trash icon next to it. It does not remove
associated Sandboxes, which will appear in the Sandbox Orphan Report, where you
can manually delete them.

## Managing Sandboxes

The **Add Sandbox** button allows you to create a new sandbox environment with
or without sample data. A sandbox with sample data includes standard lookup data
(e.g., grade level types, attendance event types) as well as anonymized sample
data (e.g., students, schools, grades, assessments scores). A sandbox created
without sample data will still include the lookup data.

Clicking the Gear icon brings up features like Delete and the ability to change
the assigned application Secret. One useful feature included in that menu
is **Get Token**, which performs the OAuth authentication steps using the
selected application's credentials and returns an access token. This access
token code can be used, for example, in the Swagger documentation or to make
sample calls to the ODS / API sandbox as shown in the
[Authentication](./authentication.md) document.

## Access to Production

Generally speaking, platform hosts will use a sandbox environment to verify that
a client application can integrate successfully with their instance of the ODS /
API platform. Once integration testing is completed and verified, contact the
platform host for instructions on connecting to production data. Since the data
in a production platform is sensitive, platform hosts generally use a secure
means of communication (e.g., encrypted e-mail, telephone call, secure site), to
supply connection information for production data systems.1

## How To Reset the Admin Password Without an E-mail Server

If the admin password you see in the appsettings.json file doesn't work or you
do not have Sandbox Admin connected to an email server for password resets
(i.e., the configured DeliveryMethod is SpecifiedPickupDirectory), follow the
next steps to reset it.

1. Try to log into Sandbox Admin and click the "Forgot Password" link, enter
    the email configured in appsettings.json under "User.Test Admin.Email" and
    click "Reset Password".
2. Look in the appsettings.json for the setting
    "MailSettings.Smtp.SpecifiedPickupDirectory.PickupDirectoryLocation". By
    default, it points to "./Artifacts/Emails" in the directory where Sandbox
    Admin binaries reside.
3. Open up that directory. You should see a .eml file with a long cryptic name.
4. Change the extension of that file from .eml to .mht
5. The file should then open in a web browser. It will contain a link for
    resetting the password.
6. Copy and paste that link into a web browser and you should be able to reset
    the password.

The [Admin API](/reference/admin-api) is provided for configuring access to
production deployments.
