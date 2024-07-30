# Configuration Store for AWS Parameter Store

Enables management of individual connection settings with encryption support for securely storing keys and secrets in the [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

## Configure AWS SDK

Ensure that the AWS SDK has the necessary [configured AWS credentials](https://docs.aws.amazon.com/sdk-for-net/latest/developer-guide/net-dg-config-creds.html).

## Configure API Connections

Use the AWS console's UI (or other preferred mechanism) to manage API connection details, providing key names as defined in  [API Connection Management](../API-Connection-Management.md). When creating entries for API client *keys* or *secrets*, use the _SecureString_ type for the value.

![AWS](../../../images/Aws-Parameter-Store-configuration-store-example.png)

## Configure API Publisher

To use the AWS Parameter Store for you connection management, change the `provider` setting in the _configurationStoreSettings.json_ file to `awsParameterStore` and supply the appropriate AWS SDK initialization parameters, as shown below (see the [AWS SDK for .NET Core documentation](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-config-netcore.html) for more information):

```json
{
  "configurationStore": {
    "provider": "awsParameterStore",
    "awsParameterStore": {
      "Profile": "default",
      "Region": "us-east-1"
    }
  }
}
```