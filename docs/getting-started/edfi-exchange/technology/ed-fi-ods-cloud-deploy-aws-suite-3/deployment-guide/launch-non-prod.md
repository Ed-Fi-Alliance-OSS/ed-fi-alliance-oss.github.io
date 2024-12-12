---
---
# AWS ODS/API Solution - Launch a Non-Production Environment

This section describes how to launch the AWS ODS/API solution in a Non-Production environment.  If you have not read the [Ed-Fi ODS/API Cloud Deployment for AWS - Deployment Guide](./readme.md), please do so now to become familiar with the solution and options available such as the environment types and AWS specific options.

_A Non-Production environment is not suitable for running a test environment that requires access by third-parties using the ODS/API software. Please see the paragraph below for further information:_

A Non-Production environment is suitable for testing the ODS/API through a web browser and with the SwaggerUI tool.  The Non-Production setup is designed to allow you to bring up the solution quickly to become familiar with the launch process, and avoid the steps of requiring a valid SSL certificate.  Please note that this type of environment is intended for local testing, just as you would if you were to deploy the ODS/API onto your local machine.  It is not intended for third-party access to the environment endpoint, as the SSL certificate will not be trusted (e.g using a self-signed).  If you need to have a test environment that is accessible for use by third-party software that requires a trusted, valid SSL certificate, please see the directions for [Launching a Production Environment](./launch-prod.md).  YOu may also view the FAQ at Once a non-production environment is up and running, you could also launch additional non-production environments in the existing VPC (or your own VPC that you may already have up and running) to save additional costs for extra environments.

A non-production environment also gives you the ability to 'stop' your resources to avoid paying for resources that are not being used all of the time like a Production environment.

Please the [Frequently Asked Questions](./faq.md) for more information on the two topics mentioned above.

:::info
**Installation Options**

By default, if you were to launch the solution with no changes to your options, you will launch a non-production environment, sized as a 'small' environment, with a PostgreSQL database, and the SwaggerUI available for testing and viewing the data. This is a low cost environment that allows you to test and work with the ODS/API software suite.
:::

:::info
**For Users of v5.0.1**

If you are installing ODS/API v5.0.1, you MUST perform STEP 8 on this page in order for your solution to work. ODS/API v5.0.1 is administered through a newer version of the Admin Application (Suite 3 v2.0.1). If you fail to to step 8, you will receive a 500 error in your browser until you perform Step 8.
:::

## Installation Instructions

This section provides step-by-step instructions for launching the AWS ODS/API Solution in a Non-Production environment.  Be sure to visit the FAQ page if you encounter an issue with setting the solution up.

* Step 1: Prerequisites
* Step 2: Select your Solution Template
* Step 3: Enter your Solution Options in the Parameter Sections
* Step 3 (Optional): Enter your Existing VPC Information
* Step 4: Complete the CloudFormation Launch Process
* Step 5: Monitor the Progress of the Solution Launching Process.
* Step 6: Gather your ODS/API Endpoints
* Step 7. Download your SSH Private Key File from S3
* Step 8. Access the Admin Application to configure the ODS/API software
* Step 9. Test ODS/API Software Solution

## Step 1: Prerequisites

In order to launch the ODS/API AWS solution, there are three steps that must be taken to that are the responsibility of the user launching the solution:

* Access to an AWS account that has the proper permissions to launch the solution.   It is recommended that a user with 'Administrator' permissions in the AWS account launch the solution. )
* A S3 bucket located in your AWS account that is used to store secure files.
* A SSL certificate that is available in your chosen AWS region through the Amazon Certificate Manager (ACM) service.   Please note that a self-signed certificate can be used for a Non-Production environment, but not for a Production environment.

**If these requirements are not met, the deployment will fail.  Please ensure that these are completed prior to continuing with this document.    For information on performing these steps, please see [AWS ODS/API Solution - Prerequisites](./prerequisites.md).**

## Step 2: Select you Solution Template

The first decision to be made is if you will be launching the solution in a new VPC (networking infrastructure), or an existing VPC in your AWS account. Unless you have been working with AWS and understand how to setup a VPC, choose the option to deploy the solution into a "new" VPC.

### Sign in to AWS

In a separate browser tab, [sign in to your AWS account](https://aws.amazon.com) with an IAM user role that has the necessary permissions. An IAM Role with Administrator Access provides the quickest way to launch the solution.

### Deploy AWS CloudFormation template

Click on your preferred "Deploy" option link below to launch the appropriate AWS CloudFormation template for your environment. This will automatically open the template in the AWS CloudFormation service in another browser tab.

* Option 1: [Deploy the Ed-Fi ODS/API into a New VPC on AWS](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=PlaceYourStackNameHere&templateURL=https://edfi-aws-quick-deployment.s3.amazonaws.com/templates/edfi-ods-api-master.yml)

* Option 2: [Deploy the Ed-Fi ODS/API  into your Existing VPC on AWS](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=PlaceYourStackNameHere&templateURL=https://edfi-aws-quick-deployment.s3.amazonaws.com/templates/edfi-ods-api-master-existing-vpc.yml)

After clicking one of the links above, your window will look similar to the one below:
![Create ODS/API AWS Stack](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/create-ods-api-aws-stack.png)

### Verify AWS Region

Check the AWS Region that’s displayed in the upper-right corner of the navigation bar, and change it if necessary. This is where the network infrastructure for Ed-Fi ODS/API will be built. By default, the template is launched in the US East (N. Virginia) Region . At this time, the Ed-Fi ODS API AWS Solution can only be deployed into the following AWS Regions:

* N. Virginia (us-east-1)
* Ohio (us-east-2)
* Oregon (us-west-2)

### Select Next Config

On the Select Template page, keep the default setting for the template URL, and then choose Next.

## Step 3: Enter your Solution Options in the Parameter Sections

Next, you will be required to enter in only a few parameters to get up and running.   Follow the steps outlined below, taking note of parameters that require input. If you need further information on each parameter, please see the [Parameter Options](./parameter-options.md) page. Please note that you will need your S3 bucket name and AWS Amazon Certificate ARN value that you have recorded when ensuring that your [Prerequisites](./prerequisites.md) were completed.

### Stack Details and Options

Your window should look similar to below after completing Step 2 above:

![Starting AWS CF Details](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/starting-aws-cf-details.png)

#### Basic Stack detail parameters

Provide a `Name` for the Stack.  Replace the text `PlaceYourStackNameHere` in this field with your unique stack name. Record this name value, as it will allow you to review the status of the creation process.

For the `ODS/API Software Suite Version` parameter,  select the value of  `3.4.1`.  or `5.0.1` depending on your preference.

For the `Type of environment` parameter, leave the value of `nonprod`.

Choose a sizing option for your deployment.   The default is `small` and is recommended for `nonprod` environments.   For further details on the sizing options, please see the Cost and Licenses section of the Overview of the Solution.

Select your preferred Database engine.   The default is `PostgreSQL` and will be the lower cost option.  However, you can select `SQL Server` if you wish.

For the parameter `Label Your Environment`, provide what will be a unique  label identifier for your environment.   Please note that only one value can exist per solution launched.

![Label Your Environment](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/label-param.png)

#### Set Availability Zone (AZ)

Next, select  (2) AWS Availability Zones from the drop down list provided in the parameter.   Click outside anywhere of the drop down box to return to your Parameter page.

![AWS Availability Zone selection](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/avail-zones-pick.png)

#### ARN

For the parameter labeled `The ARN of the SSL Certificate ID`, you will copy in your own value for your certificate that exists in the AWS ACM service.  Ensure that no white space is before or after the value.

![ARN of SSL Certificate ID](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/arn-param.png)

#### S3 Location Parameter

Next, for the parameter labeled `S3 location to store your own secure files`, copy in the S3 bucket name you provided from the Prerequisites.

![S3 Location of Secure Files](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/s3-param.png)

#### Initial ODS API Datbase Field

For the  parameter of `Initial ODS API Database Data Set`, leave the value as `populated`.  This is recommended for non-production environments so that sandbox data is available immediately.

![Initial ODS API Database Populated DataSet](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/populated-db-set.png)

#### Install SwaggerUI into environment

For the parameter of `Install the SwaggerUI into the environment`, leave the value as `yes`.  This is also recommended for non-production environments as a means to view the data with API testing calls.

![Install the SwaggerUI into the environment](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-yes.png)

#### Admin Passwords for Database

The next three parameters that you enter will be the administrator passwords for your database, and RDP account to access the servers.  Password requirements are provided in the parameter description.

![Password Params](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/password-params.png)

#### Public / CIDR Params

The final parameter that you will need to enter is a Public Network IP Address Space that allows access to the Remote Desktop Gateway Server to allow you to access the servers if needed.  You may need to obtain your trusted network address space from your network administrator.   If you wish to  simply use your local machine's IP address, you can type into Google the phrase 'what is my ip' and this will give you your current IP address.  Take this address and append a `/32` to its value to complete this parameter.   For example, if your IP address is `3.4.5.6`, the value you would enter is `3.4.5.6/32` in the field.  However, for a non-production environment, you can place the value of `0.0.0.0/0` to allow connections from anywhere to get started, but it is recommended to limit access to this server if possible.

![CIDR Params](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/cidr-param.png)

#### Other Parameters

For all of the other parameters, you do not need to adjust for a non-production environment.  Leave the reaming fields `as-is`, scroll down to the bottom of the page, and click the orange `next` button to proceed.

### (Optional): Enter your Existing VPC Information

If you are launching the solution inside of a VPC that you already have created in the AWS account, you will need to enter its information into the following parameters.  If you are launching in a new VPC, you can skip this section and move to Step 4.   When launching in an existing VPC, your VPC needs to meet the following requirements as listed at the bottom of the [Parameter Options](./parameter-options.md) page.   If you are using this option for deployment, it is assumed that you are familiar with AWS VPC concepts.  The parameters you will need to fill are shown in the window below:

![Existing VPC Params](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/existing-vpc-params.png)

* Select your **VPC ID** value from the drop down list.
* Provide the `Subnet ID` for a `Public` subnet in the first Availability Zone of the list you selected in the `Availability Zones` during parameter entry earlier.   Please note that the definition of `Public` is that the subnet assigned Public IP addresses automatically and can access the Internet through an Internet Gateway.
* Provide the `Subnet ID` for a `Public` subnet in the second Availability Zone of the list you selected earlier.
* Provide the `Subnet ID` for a `Private` subnet in the first Availability Zone of the list you selected.  A `Prviate` subnet is defined as a subnet that is not exposed to the public internet and accesses the Internet through a NAT gateway in the VPC through its route table.
* Provide the `Subnet ID` for a `Private` subnet in the second Availability Zone of the list you selected.
* After entering these parameters, your can leave the remaining parameters `as-is` and move on to Step 4.

## Step 4: Complete the CloudFormation Launch Process

The next step is to navigate the remaining CloudFormation windows and launch the solution.   You do not need to enter anything in the window and only need to check two boxes on the final window.  Follow the steps below to complete this step.

On the window named `Configure Stack Options`, scroll down to the bottom and click the orange `Next` button.
In the `Review` window, you are presented with a change to review your settings.  Scroll to the bottom of the page.  At the bottom of the page, there is a blue box under the word `Capabilities`.  Check the two boxes as shown below:

![Stack Capabilities and Create](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/stack-capabilites-and-create.png)

Click the orange `Create Stack` button to launch the solution.

## Step 5:  Monitor the Progress of the Solution Launching Process

At this time, your solution is now launching inside of your AWS account. The solution will take _approximately **1 hour**_  to complete the process.    You should monitor the progress of your solution launching, by following the steps below.

You can set the CloudFormation console to show only your Main Stack by flipping the `View Nested` option in the console.   If you wish to see each nested stack that is being launched, you can toggle this switch.

![Nested Stack Switch](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/Nested-Stack-Switch.png)

Monitor the progress of the stack creation. The stack name to monitor will be the name you provided in Step #3, for the `Stack Name` parameter.  While the solution is launching, it will show a message if  `In Progress`.  When the status of this stack is `CREATE_COMPLETE`, the Ed-Fi ODS/API environment is ready.  An example of a stack that was named `edfi-demo` that has completed is shown below:

![Stack Create Complete](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/stack-create-complete.png)

When the stack has finished launching, you can move to the next step.

## Step 6: Gather your ODS/API Endpoints

After your solution has launched, you will need to gather your URL endpoints to access your ODS/API and the Admin Application.   To obtain these endpoints, perform the following steps:

Select the CloudFormation stack that you have been monitoring.  On the `Stacks` list, scroll down to the master template stack name that you have been monitoring in the previous step.  Select the radio button next to the stack name in the box.   The details of the stack will show in the right pane of the window.   Your window would look similar to below:

![Non Prod Endpoint outputs](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/nonprod-outputs.png)

Click the Outputs tab to view the environment URLs. In this tab will be three URLs to view and record their values(do not click any yet). They are labeled in the outputs tab as follows:

* AdminAppNonProdURL
* OdsApiNonProdURL
* SwaggerUINonProdURL

At this point, your AWS ODS/API solution is ready for the software configuration.  Proceed to the next step to configure the environment.

Please note that in a non-production environment, you will receive warnings in your browser that the SSL certficate is not valid when using the links above.     Accept these warnings when using the links in your web browser to proceed.

## Step 7. Download your SSH Private Key File from S3

In an effort to limit the amount of technical requirements in launching this solution, the launch process will create a SSH Key Pair for you to assign to the EC2 instances.   The private key file of this key pair is stored in the S3 bucket that you provided in your template. **You should download this file from the S3 bucket and store it in a safe location, following your security policies for handling a secure file**.  This file can be used to obtain the Windows Administrator password (not to be confused with the account named ‘LocalAdmin’ that the solution creates on each server) for the EC2 instances.

## Step 8. Access the Admin Application to configure the ODS/API software

The next steps involved using the actual software.   The first step is to login into the Admin Application and configure the ODS/API server. The minimum required steps are below. For more detailed instructions on using the Admin Application, please see the Ed-Ft Technical documentation on the Admin Application Guide.

1. In the `Outputs` tab labeled `AdminAppNonProdURL`, click the link provided.   You will need to accept the SSL certificate warning in your browser to proceed, as the Admin Application installs itself with a self-signed certificate. The Admin application takes about 20 seconds to load the first time, but when it does you will be presented with a login box.   As this is the first time to use the application, you will need to create a user account. Click the link 'Register as a new user'
2. Enter the required information to create your account.  Please note that this will be an Administrator level account and should be treated appropriately.
3. After creating your account, you will be redirected to the final setup page of the Admin Application.  Click the 'Continue' button to proceed.  Do not leave this web page until the final setup process completes.
4. Once the setup processes completes, you will be redirected to the Admin Application configuration pages.  At this point, you can add Vendors and Applications to obtain API Keys for use with the ODS/API software that was launched.
5. You will be required to restart the ODS/API IIS site to continue using the software.

:::warning
**Resart required!**

Prior to continuing, due to the Admin Application inserting required security data into the Admin database during its setup process, the ODS/API needs to be restarted. **This is accomplished by restarting the IIS server on an ODS/API server in the solution**. For details on connecting to the servers in this solution, please see the section titled [Accessing the Servers](./).

Steps for restarting the ODS / API:

* Open 'IIS Manager' (inetmgr) on an ODS/API Server.
* In the Connections pane on the left, expand Sites and locate the Default Web Site site
* Right-click the website and select Manage Website > Restart
* Close the IIS Manager (inetmgr).
For non-production environments, the ODS/API software in located on the same server that the Admin Application has been installed. For production environments, the ODS/API software is located on separate servers than the Admin Application.

**PLEASE NOTE THAT IF YOU ARE INSTALLING ODS/API v5.0.1 YOU MUST PERFORM THIS RESTART OF IIS!**
:::

## Step 9. Test ODS/API Software Solution

The environment is now ready to be tested and used.  It is highly recommended to test your entire environment in a validation manner. Please see [AWS ODS/API Solution - Steps for Quick Validation of Solution in AWS](./quick-validation.md) to work with the environment for the first time.

Please note that a Non-Production environment only allows requests over the HTTPS links.  Requests to the same links over HTTP will result in a timeout as that port is not open in a non-production environment.

If you have encountered any issue or would like some more information on the solution, please see the [AWS ODS/API Solution - Frequently Asked Questions](./faq.md) page.

## Next Steps

Once your environment is up and running on AWS, information on using the software can be found in following the links in Step 8 above.

Further support on using the Ed-FI ODS/API solution can be obtained at the [Ed-Fi Alliance website](/docs/reference/ods-api-platform.mdx). In addition, technical support is available. Information can be found in the [AWS ODS/API Solution - Frequently Asked Questions page](./faq.md).

### Accessing the Servers

To access the servers that are launched, you must RDP to the Remote Desktop Gateway server using a RDP client. You can connect to this server by using its IP address that is obtained from the Outputs tab from the name `RemoteDesktopGatewayIP`.

From this server, once connected, you can use the Remote Desktop program on this server to connect to each server launched in the solution. The username for all servers is `LocalAdmin` and the password is the value that you typed into the CloudFormation parameter window for each type of system.

The solution also stores a copy of the passwords that you entered within your CloudFormation parameters inside the AWS Systems Manager Parameter Store service. To access this area, search for the `SSM` (Systems Manager) service in the AWS Management Console. Click the `Parameter Store` link on the left side menu. You will see entries for your passwords that you entered. You can identify an environment’s password by looking at the name and matching the final word in the name to the environment label that you put into the CloudFormation template values.

You will need to obtain the _internal_ IP address of the ODS API Application Server and the Admin Application server to remote desktop into the systems.  To obtain this information, go to the EC2 service of the Management Console. Click `Instances`. Each server can be identified by its value in the `Name` field. Click the checkbox next to an instance and in the window that appears in the bottom half of the page, look for the Private IP value:  A non-production environment only has one server with both the ODS/API software and Admin Applicaiton installed. In a production environment, there is a single server for the Admin Applicaiton, and one or more ODS/API servers.

Once connected to the Remote Desktop Gateway Server, click the Windows icon in the lower left corner, and select the `Remote Desktop` application.  In the resulting window, enter in a server's _internal_ IP address (10.x.x.x) to connect to the server. The username is `LocalAdmin’ and the password is the one you entered in the CloudFormation template for the respective server

You must connect to the ODS API server or Admin Application server by first connecting to the remote desktop gateway server. These servers are not directly publicly accessible.

### Security

Security in AWS follows a shared responsibility model. AWS is responsible for the security **of** the cloud (physical devices, data centers, etc.). You are responsible for security in the cloud. This includes the security configuration of the operating systems, the AWS account itself, and database systems.

* The solution deployed already is following best practices for security in the AWS services such as VPC, EC2, and RDS. The EC2 instances are not publicly available, and can only be accessed through the use of a RDGW server that has been deployed into the environment.
* The passwords for your environment are stored in a secure string through the AWS Systems Manager Parameter Store.
* The database is encrypted at-rest using the AWS Key Management Service (KMS).  Backups of the database are configured automatically via AWS RDS Snapshots. The solution will keep seven days of backups, and encrypt the backup as well.
* You should ensure that you have downloaded the SSH Private Key file from S3.  This file is to be treated as any secure file your organization manages. Please see Step 7 in the Deployment steps for instructions on performing this operation.
* You should ensure that your AWS account is configured to use the [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) service, as well as the [AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/gs-console.html) service. Enabling both of these services follows the best practices for security in AWS. As part of the shared-responsibility security model of AWS, it is your responsibility to protect the account and configure these two services.
* The solution will use the latest, patched Windows 2019 AMI when launching an environment.
* For non-production environments, you are responsible for applying updates to the Windows instances through the standard Windows Update processes in the operating system.  Please note that anytime that you launch a new non-production environment, however, the operating system will be the latest patched image available at that time.
* It is highly recommended that you become familiar with AWS Security best practices to ensure that you understand how to secure your AWS account and resources. [Further information on these best practices can be found here](https://aws.amazon.com/blogs/security/getting-started-follow-security-best-practices-as-you-configure-your-aws-resources/)
