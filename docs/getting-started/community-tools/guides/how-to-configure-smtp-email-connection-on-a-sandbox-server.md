# How to configure SMTP Email Connection on a Sandbox server

## Context

This document provides instructions on how to configure the Ed-Fi Sandbox for SMTP connectivity so that emails for creating accounts and resetting passwords will be sent back to the user.
These instructions were written specifically for 6.1, but generally apply to older versions as well.

## Instructions

To be able to send emails when needed, please update/add the following properties and set the corresponding values in your appsettings.json file, located in the root directory of the sandbox admin web application.

Under **"MailSettings"** Configure the following values

* **Host** - Network name of the email server (must be accessible from the Sandbox server)
* **Port -** TCP Port for email connectivity (often 487)
* **UserName** \- Username for login to email server
* **From** - The FROM email address
* **DeliveryMethod**: Must be "**Network"** For SMTP configuration
* **Password -** Password for login to email server
* **EnableSsl**: Can be **"True"** or **"False"**

```json
"MailSettings": {
"Smtp": {
"Host": "",
"Port": 487,
"UserName": "",
"From": "",
"DeliveryMethod": "Network",
"Password": "",
"EnableSsl": "true"
 }
}
```

## SendGrid Sample configuration

You can get the corresponding values from the following link: [https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

![Integrating with SendGrid](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/sendgrid-smtp.png)

```json
"MailSettings": {
 "Smtp": {
  "Host": "smtp.sendgrid.net",
  "Port": 587, "UserName": "apiKey",
  "From": "some-sendGridEmail@sendgrid.com",
  "DeliveryMethod": "Network",
  "Password": "somePassword",
   "EnableSsl": "true"
   }
 }
```

## Configuration for Ethereal (Only for testing purposes)

Go to the Ethereal link: [https://ethereal.email/](https://ethereal.email/) and create an account (free); this will provide all the necessary configurations.

![Ethereal Configuration](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/ethereal.png)

```json
"MailSettings": {
 "Smtp": {
  "Host": "smtp.ethereal.email",
  "Port": 587,
  "UserName": "graciela43@ethereal.email",
  "From": "graciela43@ethereal.email",
  "DeliveryMethod": "Network",
  "Password": "fP8jddVmQqxxdew6Yv",
  "EnableSsl": "false"
  }
 }
```
