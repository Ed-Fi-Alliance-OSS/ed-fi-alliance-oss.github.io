---
---
# AWS ODS/API Solution - Parameter Options

This page provides detailed information on what each parameter option is available when launching the AWS ODS/API solution.   While most parameters can be left at their defaults for a quick deployment, it is recommended that you read this page to understand the affect of each parameter and its use when launching the solution.    There are two master templates that can be deployed to bring the ODS/API solution online.

* Ed-Fi ODS/API in NEW VPC
* Ed-Fi ODS/API in an EXISTING VPC

For most users of this solution, and those that are new to AWS, the **new**  VPC template will be deployed. Only experienced AWS administrators and users will deploy the **existing** VPC template.  The existing VPC template has the same parameters as the new VPC template, but provides some additional parameters that must be entered as well.

## CloudFormation Parameters for deploying the Ed-Fi ODS/API into a NEW VPC

### Standard Parameters for any EdFi ODS / API Environment

| **Parameter label (name)** | **Default** | **Description** |
| --- | --- | --- |
| **ODS/API Software Suite Version** (Version) | 5.0.1 | The version of the ODS/API software suite to install.   This also installs the Admin Application version that is compatible with the ODS/API software selected.  Versions 3.4.1 and 5.0.1 are currently supported, and as new version of the ODS/API software suite are released this field will add additional versions to select. |
| **Type of environment**  (Environment) | nonprod | Select the type of environment to launch. The ‘prod’ option requires a valid SSL certificate and DNS changes, while a ‘nonprod’ environment is cheaper, provides no fault tolerance or high availability, and is useful for test environments.  Note that this is merely a parameter that ultimately defines the SSL validity and availability options for your environment. |
| **Select a sizing option based on the anticipated levels of usage** (size) | small | This will map the resources launched in AWS to a predefined solution to provide resource sizing to match anticipate levels.   There are four options to select: 'small', 'medium', 'large', xlarge'.   This cannot be changed once the solution is launched. |
| **Database Engine** (DBEngine) | PostgreSQL | There are two options:  'PostgreSQL' and 'SQL Server'.   There is no functionality difference between the two database engines.   The PostgreSQL will be considerably less in costs. |
| **Label your environment**  (EnvLabel) | _Requires iuser nput_ | Provide a **unique** label for your environment to identify resources easier.  This should be unique for each deployment.  You cannot reuse a label value from a stack that is currently running in the same account and AWS region. |
| **Availability Zones (2)**  (AvailabilityZones) | _Requires user input_ | A List of Availability Zones to use for the subnets in the VPC. You only will need to select two Availability Zones. |
| **The ARN of a SSL certificate ID**  (SSLCertificateId) | _Requires input_ | The ARN of the SSL certificate in the AWS ACM service to use for the ODS/ API environment.  This is the value you obtained in the [Prerequisites](../ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/aws-odsapi-solution-prerequisites.md) ACM section.   It will be in the format of`:arn:aws:acm:<REGION>:<AWS ACCOUNT ID>:certificate/<CERTIFICATE ID>` |
| **S3 location to store your own secure files**  (S3BucketSecureStore) | _Requires input_ | The name of the S3 bucket in **YOUR** AWS account that can be used to store the SSH Private Key pair file in S3.  This would be the name of the S3 bucket you created or identified in your own AWS account in the [Prerequisites](../ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/aws-odsapi-solution-prerequisites.md) section for creating your own S3 bucket. |
| **Initial ODS API Database Data Set**  (DatabaseData) | populated | Select to populate the initial database with a ‘minimal’  or ‘populated’ data set.  A 'populated' data set adds sample data into your ODS/API database, and is useful for testing API calls in non-production environments.  The 'minimal' option configures the database to have no data and will require data to be added into the ODS/API system. |
| **Install the SwaggerUI into the environment**  (UseSwagger) | yes | By default, the SwaggerUI application is installed onto the ODS/API server(s) to allow for testing API calls and viewing data results.   It is not recommended for installation in production level environments, as the data should be treated as sensitive and access limited. |
| **A password for the database account**  (DatabasePassword) | _Requires input_ | Password for the Database administrator account. Must be at least 8 characters containing letters, numbers, and symbols |
| **A password for the local administrator accounts on the ODS API Server**  (AdminPasswordAPI) | _Requires input_ | Password for the ODS API local administrative account. Must be at least 8 characters containing letters, numbers and symbols |
| **A password for the local administrator accounts on the RDP Server**  (AdminPasswordRDGW) | _Requires input_ | Password for the Remote Desktop Gateway local administrative account. Must be at least 8 characters containing letters, numbers and symbols |
| **Network Address range (CIDR)  to allow connections to Remote Desktop Gateway**  (RDGWCIDR) | _Requires input_ | Allowed CIDR Block for external access to the Remote Desktop Gateways. _**This should be a trusted network.**_  If you choose to place 0.0.0.0/0 in this field, access to your environment’s RDGW is available to the entire Internet.   Contact your network administrator for your network CIDR block. |

### Production Require Parameters (only fill in of you selected 'prod' for your Environment type)

| **Parameter label (name)** | **Default** | **Description** |
| --- | --- | --- |
| **Domain Name that matches the SSL certificate for the ODS/API environment**  (DomainName) | _Requires user input_ | The fully qualified domain name in a URL to be used for this ODS API environment (e.g. [edfi.domain.com](http://edfi.domain.com)).  _**This should match the domain you use in your SSL certificate**_ |
| **A password for the local administrator accounts on the Admin Server**  (AdminPassword) | _Requires user input_ | Password for the Admin Application local administrative account. Must be at least 8 characters containing letters, numbers and symbols.   You will need to REMOVE the \*\*\*\*\* in the filed and replace with your own password. |
| **Highly Available Application Server Pool** (MultiAZAppServers) | false | Enable the ODS/API servers to have a minimum of (2) servers always active and available.  Enabling this option will increase monthly costs.  Please note that if you leave at 'false', AWS will still automatically replace the server; there just may be a slight availability issue while the new one is being launched. |
| **Highly Available Database**  (MultiAZRDS) | false | Enable the database to be highly available, providing a near real-time failover.  Note that this will increase your monthly AWS costs for the environment being deployed. |
| **Enable AutoScaling for the ODS/API Servers** (EnableAutoScaling) | false | Enable the ODS/API servers to add servers if the load on the existing ODS/API server(s) exceeds a CPU Utilization threshold of 75%.  In the event this threshold is breached, AWS will launch additional severs (up to a total of 4 servers) to handle the extra load.   As load decreases, AWS will remove servers back to the original number.  Please note that this option is independent of the 'Highly Available Application Server Pool' parameter. |

### Network Configuration (these do not need to be changed)

| **Parameter label (name)** | **Default** | **Description** |
| --- | --- | --- |
| **VPC CIDR**  (VPCCIDR) | 10.0.0.0/16 | CIDR block for the new VPC. |
| **Public subnet 1 CIDR**  (PublicSubnet1CIDR) | 10.0.128.0/20 | CIDR block for the new public subnet 1 located in Availability Zone 1. |
| **Public subnet 2 CIDR**  (PublicSubnet2CIDR) | 10.0.144.0/20 | CIDR block for the new public subnet 2 located in Availability Zone 2. |
| **Private subnet 1 CIDR**  (PrivateSubnet1CIDR) | 10.0.0.0/19 | CIDR block for new private subnet 1 located in Availability Zone 1. |
| **Private subnet 2 CIDR**  (PrivateSubnet2CIDR) | 10.0.32.0/19 | CIDR block for new private subnet 2 located in Availability Zone 2. |

### Amazon EC2 configuration (this should not be changed)

| **Parameter label (name)** | **Default** | **Description** |
| --- | --- | --- |
| **Latest AMI ID**  (LatestAmiId) | /aws/service/ami-windows-latest/Windows\_Server-2019-English-Full-Base | Unless advised, do not change this value |

# CloudFormation Parameters for deploying the Ed-Fi ODS/API into an EXISTING _VPC_

:::note
_This template has the Standard Parameters defined in the NEW VPC section above, but provides this section in lieu of the Network Configuration section for a new VPC.    These parameter options provide AWS with your  own VPC information in which to launch the solution._
:::

### Provide Your Own Existing VPC Network Configuration

| **Parameter label (name)** | **Default**           | **Description**                                  |
| ---                        | ---                   | ---                                              |
| **VPC ID** (VPCID)         | _Requires user input_ | This is the AWS VPC ID (vpc-xxxxxxx) of your Existing VPC.  You can select it from a drop-down list for existing VPCs in the account and region. |
| **Public Subnet 1 ID** (PublicSubnet1ID) | _Requires user input_ | This is the AWS Subnet ID for your Public Subnet that exists in your VPC **and**  is available in the first Availability Zone that you selected in your standard parameters.  For example, if the first zone in your selected list of AZs is 'us-east-1a' , the subnet ID selected here must exist in that subnet.   A drop-down list is provided of subnets that are available.  A public subnet is defined as a subent that assigned Public IP addresses **automatically**, can expose resources directly to the Internet, and accesses the Internet through an Internet Gateway in your VPC.  This subnet will be used for the Elastic Load Balancers and RDGW server(s). |
| **Public Subnet 2 CIDR** (PublicSubnet2ID) | _Requires user input_ | This is the AWS Subnet ID for your Public Subnet that exists in your VPC **and**  is available in the second Availability Zone that you selected in your standard parameters.  For example, if the second zone in your selected list of AZs is 'us-east-1b' , the subnet ID selected here must exist in that subnet.   A drop-down list is provided of subnets that are available.  A public subnet is defined as a subnet that assigned Public IP addresses **automatically**, can expose resources directly to the Internet, and accesses the Internet through an Internet Gateway in your VPC.  This subnet will be used for the Elastic Load Balancers and RDGW server(s). |
| **Private Subnet 1 ID** (PrivateSubnet1CIDR) | _Requires user input_ | This is the AWS Subnet ID for your Private Subnet that exists in your VPC **and**  is available in the first Availability Zone that you selected in your standard parameters.  For example, if the first zone in your selected list of AZs is 'us-east-1a' , the subnet ID selected here must exist in that subnet.   A drop-down list is provided of subnets that are available.  A private subnet is defined as a subnet that does not expose resources directly to the Internet, does not allow public IP address assignments, and accesses the Internet through an NAT Gateway in the VPC.  This subne will be used for EC2 instances of the ODS/API servers and Admin Application, along with a RDS Subnet Group. |
| **Private Subnet 2 ID** (PrivateSubnet2CIDR) | _Requires user input_ | This is the AWS Subnet ID for your Private Subnet that exists in your VPC **and**  is available in the second Availability Zone that you selected in your standard parameters.  For example, if the second zone in your selected list of AZs is 'us-east-1b' , the subnet ID selected here must exist in that subnet.   A drop-down list is provided of subnets that are available.  A private subnet is defined as a subnet that does not expose resources directly to the Internet, does not allow public IP address assignments, and accesses the Internet through an NAT Gateway in the VPC.  This subne will be used for EC2 instances of the ODS/API servers and Admin Application, along with a RDS Subnet Group. |
