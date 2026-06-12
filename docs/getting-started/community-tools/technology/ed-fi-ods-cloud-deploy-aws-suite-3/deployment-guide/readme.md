---
---
# Ed-Fi ODS/API Cloud Deployment for AWS - Deployment Guide

## Overview

This  deployment guide provides information and instructions for deploying the Ed-Fi ODS / API solution on the AWS Cloud.   The deployment guide is divided into the following areas:

* [Overview of Solution](../readme.md) (this page; read this page for information on the solution itself and the costs of the solution)
* [AWS ODS/API Solution - Prerequisites](./prerequisites.md) (these must be performed before launching the solution)
* [AWS ODS/API Solution - Launch a Non-Production Environment](./launch-non-prod.md) (go here if you just want the steps to get the solution up and running)
* [AWS ODS/API Solution - Launch a Production Environment](./launch-prod.md)
* [AWS ODS/API Solution - Parameter Options](./parameter-options.md)
* [AWS ODS/API Solution - Frequently Asked Questions](./faq.md) (go here if you want information on common questions asked, and where to get support)
* [AWS ODS/API Solution - Steps for Quick Validation of Solution in AWS](./quick-validation.md) (use this after launching your environment to perform a quick test that everything is working)

This  Quick Deploy solution is for users who want to deploy the Ed-Fi ODS / API software suite into AWS.  It will allow users to deploy a non-production or production environment that follows AWS best practices for a solution architecture.

This Quick Deploy solution will provision the AWS infrastructure required for the environment, and install and configure the ODS / API software for first-time use.   Once the solution is available, the end user is responsible for any further software configuration of the system.

You can use this Quick Deploy to do the following:

* Provision a new VPC, with new EC2 instances, bootstrap the appropriate instance(s) to install the software, a Remote Desktop Gateway server, and other infrastructure components such as the database (RDS), to deploy a fully functional ODS/API software solution.
* Deploy the ODS/API solution into an existing VPC (after ensuring the VPC meets the minimum requirements)
* Deploy a Production or Non-Production environment.
* Launch the solution using a sizing option, such as 'small' and 'xlarge'.  This allows you to control your environment size and costs for your anticipate usage scenario.
* Select between a PostgreSQL database or SQL Server database.
This solution includes nested AWS CloudFormation templates that launch multiple stacks.

When deployed in a **production environment configuration**, the solution can be configured to provide fault tolerance, high availability, and auto-scaling.  This ensures that there are always ODS/API servers available, and that a failed server can be replaced automatically. The database also can be deployed in a highly available configuration  to ensure that a database is automatically recovered in the event of a failure.   The ODS/API servers can also be selected to scale up or scale down based on the CPU Utilization of the servers in use at any given time.   Enabling these features will increase your costs, however, can provide the AWS configuration typically seen in Production level environments.  You also can configure the Production environment to not enable these features.

In a **non-production environment**, which is useful for testing the software, a low-cost solution is deployed that places all of the software onto one server, but  does not provide any fault tolerance or automatic recovery. The database is also deployed in a configuration that does not provide fault tolerance. In addition, your SSL certificates can be self-signed to allow for a quicker deployment when using the non-production environment option.

## Ed-Fi ODS / API on AWS

The Ed-Fi ODS / API gives you a simple, cost-effective way of connecting and maintaining systems, helping you turn data from something you have into something you can use.

Documentation for using the Ed-Fi ODS/API can be found at [Ed-Fi ODS / API v3.4](https://edfi.atlassian.net/wiki/spaces/ODSAPI34/overview) and [Ed-Fi ODS / API for Suite 3 v5.0.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/overview)

The Ed-Fi ODS/API software suite consists of the ODS/API application, an Admin Application to manage the ODS/API, and optionally, the Swagger documentation of the ODS/API for viewing.

Deploying the Ed-Fi ODS/API solution into AWS can provide you with a scalable, secure, and redundant environment. AWS provides flexible compute, storage, networking, and database services, making it an ideal platform to run the ODS/API solution. AWS offers a complete set of services and tools for deploying business-critical enterprise workloads on its highly reliable and secure cloud infrastructure. Coupled with AWS as the underlying infrastructure, you can launch a cost effective, secure ODS/API solution to get up and running quickly.

As this solution allows for the use of a production or non-production environment, you can easily launch test environments quickly to try out the software before moving to a fully functional production level environment.

Backups are automatically enabled for the database, and encryption-at-rest is automatically enabled for the database.

The AWS solution allow you to pick and choose the options that are right for your usage scenario.    You select the size of your solution from a pre-defined list of 'small', 'medium', 'large', and 'xlarge'.   These sizes have been configured to allow smaller installations to not incur large costs by running larger resources, but still provides a best practice solution in AWS.    You also have the option to select a lower cost backend database engine using PostgreSQL, or can select the SQL Server option if you are more comfortable with using that database engine.

The AWS ODS/API solution currently supports v3.4.1 and v5.0.1 of the software suite.   Future releases of the ODS/API software suite will be added as they are released.     The ODS/API Software suite uses the following versions of supporting software:

* ODS/API v3.4.x or ODS/API v5.0.1
* Admin Application v1.8-3.4.0 or Admin Application Suite 3 v2.0.1
* Windows 2019 Base
* SQL Server Standard Edition 13.00.5598.27
* PostgreSQL  11.7
* IIS 10.0

The solution has been developed to try and automate as much as possible for a new user in AWS.   However, there still are three prerequisites that will need to be performed before launching your first environment in AWS.   Please see AWS ODS/API Solution - Prerequisites for more information.

Each environment is associated with a Label, that is unique and provided by you.   The AWS resources for an environment will use this label to help you identify the resources associated with your environment in AWS through the use of Tags.

The AWS ODS/API Quick Deploy provide pre-defined setups based on your anticipated usage.   There are four sizing options:

|**Option**| **Usage**|
|----------|----------|
| Small     | Less than 75,000 students|
| Medium    | Between 75,0000 and 150,000 students |
| Large     | Between 150,000 and 500,000 students |
| XLarge    | Over 500,000 students  |

:::note
Please note that these size estimates are provided for guidance.   It is recommend that any 'nonprod' type environment that a type of 'small' be used to give you the lowest cost environment.
:::

## Cost and Licenses

You are responsible for the cost of the AWS services used while running this deployment. There is no additional cost for using the Quick Deploy solution.

The Ed-Fi ODS/API technology is free to license and use.

The AWS CloudFormation template for this solution includes configuration parameters that you can customize. Some of these settings, such as enabling a highly available ODS/API server layer, will affect the cost of deployment. For cost estimates, see the pricing pages for each AWS service you will be using. AWS prices are subject to change.

By selecting the PostgreSQL database as the database engine, there are considerable cost savings involved.   However, SQL Server database engine is also an option for users who prefer to use that database engine.

AWS anticipated costs per month for the solution, broken down by Environment Type and Database Engines, are shown below:

**The costs show below are for On-Demand resources, running 24x7 each month, and using their own VPC.**

**Non-Production Environment**

|Options  | PostgreSQL Database | SQL Server Database |
|---------|-------------------- |---------------------|
| Small   | $223.00/mo + tax    | $879.00/mo + tax    |
| Medium  | $261.00/mo + tax    | $916.00/mo + tax    |
| Large   | $314.00/mo + tax    | $965.00/mo + tax    |
| XLarge  | $354.00/mo + tax    | $1,904.00/mo + tax  |

**Production Environment** (No high availability or scaling enabled)

| Options | PostgreSQL Database | SQL Server Database |
|---------|---------------------|---------------------|
| Xlarge  |$503.00/mo + tax     | $1,809.00/mo + tax  |
| Small   |$305.00/mo + tax     | $959.00/mo + tax    |
| Medium  |$344.00/mo + tax     | $997.00/mo + tax    |
| Large   |$411.00/mo + tax     | $1,045.00/mo + tax  |

**AWS Options Enabled (extra costs)**
_If you choose to enable these options below, you can add your cost for each option to the estimated total for your environment in the above tables.  For example, if you were running a 'small' production environment using PostgreSQL, and enable a HIhgly Available database and Highly Available ODS/API servers, your total monthly bill would be approximately $417.00 + tax ($305+$65+47)._

:::tip
After you deploy the solution, we recommend that you enable the [AWS Cost and Usage Report](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-reports-gettingstarted-turnonreports.html) to track costs associated with the Quick Deploy.

This report delivers billing metrics to an S3 bucket in your account. It provides cost estimates based on usage throughout each month and finalizes the data at the end of the month. For more information about the report, see the [AWS documentation](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-reports-costusage.html).
:::

## AWS Architecture

The solution can be deployed into a non-production or production configuration.   The underlying network infrastructure remains the same between the two configurations.  The differences are within the number of resources provisioned, the use of a highly available configuration, and the domain name configurations.

A non-production environment will not utilize multiple servers, nor auto-scaling.  The database will also not contain a replica available for failover purposes.

Deploying this solution in a **production** environment builds the following Ed-Fi ODS API environment in the AWS Cloud

![Production Architecture for ODS/API on AWS](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/image2020-4-9_15-42-31.png)

**Figure 1: Production Architecture for Ed-Fi ODS API on AWS

The Quick Deploy solution in a **production environment**, using the default parameters, sets up the following:

* A highly available architecture that spans two Availability Zones.
* A VPC configured with public and private subnets according to AWS best practices, to provide you with your own virtual network on AWS.
* In the public subnets, managed NAT gateways to allow outbound internet access for resources in the private subnets.
* In the public subnets, a Windows RDGW server in an Auto Scaling group to allow inbound RDP access to EC2 instances in public and private subnets.
* In the private subnets, the ODS/API application server(s), the Admin Application server, and a database provisioned with RDS.
* A highly available configuration for the ODS/API application servers that will ensure that two EC2 instances are always available (_optional).
* A database that can configured in a Multi-AZ configuration to provide fault tolerance across two availability zones (_ optional).
* EC2 Auto-Scaling for the ODS/API application server group (* optional)

The Quick Deploy solution, in a **non-production environment**, using the default parameters, will do the following:

* An AWS  architecture that spans two Availability Zones.
* A VPC configured with public and private subnets according to AWS best practices, to provide you with your own virtual network on AWS.
* In the public subnets, managed NAT gateways to allow outbound internet access for resources in the private subnets.
* In the public subnets, a Windows RDGW server in an Auto Scaling group to allow inbound RDP access to EC2 instances in public and private subnets.
* In the private subnets, one EC2 instance that provides the ODS/API and Admin Application.  No auto-scaling is configured.
* A database, by default, that is provisioned with RDS in a single availability zone.  You can optionally select a highly available configuration at a higher cost per month.
* Deploy a single EC2 instance that provides the Admin Application and ODS/API software suite.   This instance is not fault-tolerant.

## Planning the AWS Deployment

This Quick Deploy solution assumes familiarity with the following basic concepts of networking, SSL certificates and their creation process (valid and self-signed), using a remote desktop client to access Windows servers, the Internet Information Services software (IIS), and the PostgreSQL and/or Microsoft SQL Server database engines.

It is recommended that you have a moderate level of familiarity with AWS services to assist in managing your solution after a deployment. If you’re new to AWS, visit the [Getting Started Resource Center](https://aws.amazon.com/getting-started/) and the [AWS Training and Certification website](https://aws.amazon.com/training/) for materials and programs that can help you develop the skills to design, deploy, and operate your infrastructure and applications on the AWS Cloud.

While having familiarity with the Ed-Fi ODS/API software suite is not required to launch this solution, it is recommended that you have familiarity with the software suite to understand how to use the solution properly.  See [Ed-Fi ODS / API v3.4](https://edfi.atlassian.net/wiki/spaces/ODSAPI34/overview) or [Ed-Fi ODS / API for Suite 3 v5.0.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/overview) for more details.

### AWS Account Requirement

If you don’t already have an AWS account, create one at [https://aws.amazon.com](https://aws.amazon.com) by following the on-screen instructions. Part of the sign-up process involves receiving a phone call and entering a PIN using the phone keypad.

Your AWS account is automatically signed up for all AWS services. You are charged only for the services you use.

### Minimum Steps to Launch the ODS/API in AWS

To get the ODS/API solution running in AWS, you will need to first complete the [AWS ODS/API Solution - Prerequisites](./prerequisites.md) page.   Once those are completed, you should first [Launch a Non-Production Environment](./launch-non-prod.md) to become familiar with the deployment and using the system.    Then, visit the[AWS ODS/API Solution - Steps for Quick Validation of Solution](./quick-validation.md) in AWS to test the system.  If you require support or would like assistance in launching the solution, please see the first FAQ located on the [AWS ODS/API Solution - Frequently Asked Questions](./faq.md).

## Additional Resources

### AWS Resources

* [Getting Started Resource Center](https://aws.amazon.com/getting-started/)
* [AWS General Reference](https://docs.aws.amazon.com/general/latest/gr/)
* [AWS Glossary](https://docs.aws.amazon.com/general/latest/gr/glos-chap.html)

### AWS Services

* [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/)
* [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
* [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
* [Amazon EC2](https://docs.aws.amazon.com/ec2/)
* [AWS IAM](https://docs.aws.amazon.com/iam/)
* [Amazon VPC](https://docs.aws.amazon.com/vpc/)
* [AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
* [AWS RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)

### Ed-Fi Documentation

* [ODS/API Getting Started](/reference/ods-api-platform)
* [Admin Application](/reference/admin-app)
