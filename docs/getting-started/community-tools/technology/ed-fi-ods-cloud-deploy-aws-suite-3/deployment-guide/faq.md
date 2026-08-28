---
---

# AWS ODS/API Solution - Frequently Asked Questions

The questions and answers below have been gathered through feedback from adopters.   It contains information that is commonly asked of users of the AWS ODS/API Solution.

## I encountered a CREATE_FAILED error when I launched the solution

 If AWS CloudFormation fails to create the stack, we recommend that you relaunch the template with Rollback on failure set to No. (This setting is under Advanced in the AWS CloudFormation console, Options page.) With this setting, the stack’s state will be retained and the instance will be left running, so you can troubleshoot the issue.   Common reasons for failure could include exceeding your AWS service limits or providing an incorrect ARN value for the SSL certificate in the ACM service.

Important   When you set Rollback on failure to No, you will continue to incur AWS charges for this stack. Please make sure to delete the stack when you finish troubleshooting.

For additional information, see [Troubleshooting AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html) on the AWS website.

In the event a failure has occurred, the approximate amount of time a stack will need to Rollback is 1 hour.

## When I attempt to access the Admin Application the first time when using a PostgreSQL database, I see an error similar to ones shown below

  [Postgres Initial Error](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-postgres-initial-error.png)

  [Postgres Admin App next error](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-error-2-pg.png)

  This is a known bug with the new PostgreSQL feature that has been added in v3.4.1.   Simply refresh your browser page and the login page for the Admin Application will return.

## Where can I find the passwords I typed into the parameters if I forgot them?

 The solution stores a copy of the passwords you provided to the template in the AWS Systems Manager Parameter Store.  You can identify the proper password for an environment by looking at the parameter name and finding the environment label and server function.  For example, to locate the password for the ODS/API server in an environment labeled ‘test’, you would look for the parameter named ‘edfi-ods-api-server-local-admin-pwd-test’.

## Can I login into the Windows instances with the built-in ‘Administrator’ account?

 Yes.   However, you will need to decrypt the password by using the SSH Private Key Pair file that you have downloaded from S3 (see step #7 in the Deployment Steps).  Once you have the file, follow these instructions in the AWS documentation to obtain your password.

## Can I avoid the SSL certificate warning on non-production environment URLs?

 No, at this time this is a necessary configuration of the software for non-production environments.  If you need a valid 'test' environment that will not produce SSL certificate warnings, you can launch a 'small' production environment and do not enable any of the high availability or scaling options.  This will provide you with low-cost test environment if you select the PostgreSQL database option.

## Can I avoid the SSL certificate warning on a Production environment’s Admin Application URL?

 No, this is not possible at this time due to the Admin Application setup process and its requirement for a self-signed SSL certificate.  The communication between the Admin Application and ODS/API is over a TLS connection that is validated.  Direct communication to the ODS/API is over a trusted SSL connection in a production environment.

## Are there installation logs available for review in case of an error?

 Yes. All of the installation logs for a server can be found at the path of “C:\EdFiInstallLogs” on each EC2 instance.

## Why does the Admin Application show the ODS/API Production URL as `http://localhost/EdFI.Ods.WebApi`?

 This is a result of both the Admin Application and the ODS/API software residing on the same server. The Admin Application requires the endpoint to be 'localhost' when setup in this configuration to work properly.

## Why does the Admin Application always label the ODS/API URL as 'Production'?

 At this time, only one environment exists per deployed AWS solution.  The Admin Application defaults its value for the ODS/API URL as a 'Production' location.   This is a label anomaly and the URL shown is the ODS/API value used by the Admin Application only.

## Can I update an existing solution with CloudFormation?

 While this is technically possible, it is recommended to not update existing stacks and instead to launch a new stack.   The reason for this is that the Admin Application is not yet fully ready to be removed and relaunched seamlessly in an environment. Consult an AWS expert on the possibilities that are there in an existing stack.

## Can I stop my EC2 or RDS resources for a Non-Production type environment?

 Yes.  You can stop your EC2 instance of the ODS/API Server, and the RDS system associated with the environment. In addition, you can also stop the RDWG service from keeping a server online at all time from auto-scaling. Follow the instructions below:

1. From the AWS Management Console, navigate to the EC2 service.
2. Located your EC2 instance for your Non-Production environment by looking for a Name value that includes your Stack Name of the environment.     It would look similar to something such as 'edfi-nonprod-pgsql-1-NonProdStack-153CK03EZ9CMX-App and Admin Server
3. Right click the instance and choose 'Stop'.  This will ask you to verify that you want to Stop the instance.  Select 'Yes' and your instance will be stopped.
4. Next, on the left side menu for the Ec2 service, select the 'Auto-Scaling' link.
5. Locate your Remote Desktop Gateway auto-scaling group by looking for the Name value that contains your Stack Name of the environment..  It would look similar to something such as 'edfi-nonprod-pgsql-1-RDGWStack-HUH4X7A7XQIA-RDGWAutoScalingGroup'
6. Select your Auto-Scaling group, and click the grey button labeled Actions→Edit .
7. For the Desired Capacity and Min values use '0'.   Scroll down the Edit window and click 'Save'.
8. In the AWS Management Console, go to the 'RDS' service.
9. In the RDS service, locate your RDS for the environment.  You can obtain your RDS name by viewing the Outputs of your CloudFormation master stack in the CloudFormation service
10. Click your RDS identifier that matches your prefix for the RDS in your CloudFormation Output tab labeled 'DatabaseEndpont'.
11. In the details page of your RDS, click the 'Actions' button and select the 'Stop' option.   This will ask you to verify the stop (you don't need to create a snapshot, but feel free to do so if desired)

Your resources will be in a stopped state.  Please note that an RDS can only stay stopped for 7 consecutive days at which point it would automatically start back up.  To bring you r resources back online, perfrom the same steps as above except choose the 'Start' option for the EC2 instances and RDS.  For the Remote Desktop Gateway auto-scaling group use a value of '1' for both the Desired Capacity and Min values.   If you require any assistance with this process, please see the first FAQ in this page to submit a support request.

## I need a test environment to work with third-party software.  The Non-Production environment does not use a valid SSL certificate.  What should I do?

 To launch an test environment  that is used by thrid-party software, you should launch the solution as a 'prod' environment and follow those instructions.   However, during the launch process, do not enable any of the features that will provide high availability or scaling.  This will launch a minimal production level environment that uses a valid SSL certificate.

## I installed ODS/API v5.0.1, but when I attempt to add an 'Application' within the Admin Application, I receive a 500 error code like below.  What should I do?

 This error is due to not restarting the IIS Web Server service on your ODS/API Server in your environment.  To correct this issue, RDP into your ODS/API Server and restart the IIS service.   For a 'nonprod' type of environment, there is only one server and you can restart IIS on the server.  For the 'prod' type of environment, you will need to RDP to your Application Servers (the servers that are named with your stack name with Application Server) and restart the IIS service.
