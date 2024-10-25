# Ed-Fi API Publisher Extensibility

::: warning

This page is stale, and may not be accurate.

:::

The Ed-Fi API Publisher has been developed using SOLID Principles of Software
Development. It provides several interfaces that are pertinent for a developer
wanting to change some of the behavior or out-of-the-box integrations of the
software.

For example, a developer could provide alternative implementations for any of
the following aspects:

* Rather than using AWS Systems Manager Parameter Store to manage the connection
  configurations, they could be persisted and managed using Azure App
  Configuration.
* Rather than simply logging the data errors that occur, the API Publisher could
  write these values to a structured data store like Amazon DynamoDB or
  Microsoft Azure Cosmos DB.
* Rather than storing the LastChangeVersionProcessed in the AWS Systems Manager
  Parameter Store, they could be saved to a database. NOTE: This type of
  customization would require some additional work to also integrate that
  persistent store with the .NET configuration architecture since those values
  are read by the Ed-Fi API Publisher as configuration values.

The following interfaces are defined, and could be useful for tailoring the
Ed-Fi API Publisher to work in other contexts:

* **IErrorPublisher** - Defines a method for capturing data-related errors for
  subsequent analysis and troubleshooting.
* **INamedApiConnectionDetailsReader** - Defines a method for obtaining named
  API connection details.
* **IChangeVersionProcessedWriter** - Defines a method for setting the last
  change version processed for a particular source and target connection.
