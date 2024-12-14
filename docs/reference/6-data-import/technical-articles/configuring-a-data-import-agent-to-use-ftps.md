# Configuring a Data Import Agent to use FTPS

Data Import supports configuring agents to retrieve files from secure file transfer protocols, namely **SFTP** (Secure File Transfer Protocol) and **FTPS** (File Transfer Protocol over SSL). This article provides guidance on how to add a Data Import Agent with a type of FTPS, to communicate with an FTPS service running in IIS.

## Step 1: Create an FTPS site in IIS

* Review the documentation for creating an FTPS site, [Scenario: Build an FTP Site on IIS](https://docs.microsoft.com/en-us/iis/publish/using-the-ftp-service/scenario-build-an-ftp-site-on-iis). Note that, with reference, to [FTP over SSL](https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/sites/site/ftpserver/security/ssl) in IIS, Data Import v1.0.1's support for FTPS is **implicit on port 990**..
* The screen grabs below show the step-by-step wizard entries

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/ftp.png)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/ftp1.PNG)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/ftp2.PNG)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/ftp3.PNG)

## Step 2: Verify you can connect to the FTPS service using an FTP client

* Use an FTP client such as [FileZilla](https://filezilla-project.org/) to verify that you can connect to the FTPS site you have created.The screen grapbs below show the configuration and successful connection using the FileZilla client.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/filezilla.PNG)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/filezilla2.PNG)

## Step 3: Configure a Data Import Agent to use FTPS

* Using Data Import, aavigate to **Agents** in the main tool bar and select **Add Agent.**
* Enter an Name and select Agent Type = **FTPS.**
* Fill in the remainder of the fields to match the FTPS site you created in Step 1 and values you tested with in Step 2.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/di1.PNG)

| Property Name | Value |
| --- | --- |
| Host Name | The name of the server hosting the FTPS site |
| Username | User name to connect to the FTPS site with |
| Password | Password for the supplied username |
| Directory | FTP directory, usually "./" |
| File Pattern | The file pattern that the Data Import agent will use to retrieve files from the FTPS location, usually "\*.csv" |

* Select **Test Connection**, and you should get a successful message

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/di2.PNG)

* Select the Enabled check box and add details on data maps to be processed by this agent
