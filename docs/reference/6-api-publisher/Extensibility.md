---
sidebar_position: 14
---

# Ed-Fi API Publisher Extensibility

The Ed-Fi API Publisher was developed following SOLID principles and defines
interfaces for the parts a developer may want to replace, for example to keep
connections in another configuration service, or to write data errors to a
database instead of the log.

A custom implementation requires changing and building the API Publisher from
its [source code](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher).
The connection and configuration store plugins are listed in `Program.cs` of
the `EdFi.Tools.ApiPublisher.Cli` project, and the API Publisher does not load
plugins from other assemblies at run time.

| Interface | Purpose | Implementations in the API Publisher |
| --- | --- | --- |
| `INamedApiConnectionDetailsReader` | Reads the details of a named API connection from a configuration store. | AWS Systems Manager Parameter Store, PostgreSQL, SQL Server and plain text |
| `IChangeVersionProcessedWriter` | Stores the last change version published from a source connection to a target connection. | AWS Systems Manager Parameter Store, PostgreSQL and SQL Server; the plain text store only logs a warning |
| `IErrorPublisher` | Captures data-related errors for later analysis and troubleshooting. | The log, through Serilog |
| `IPlugin` | Adds a connection type or a configuration store: its configuration values and its service registrations. | One per connection type and per configuration store |

Each configuration store is a project named
`EdFi.Tools.ApiPublisher.ConfigurationStore.<Store>` that implements
`INamedApiConnectionDetailsReader`, `IChangeVersionProcessedWriter` and
`IPlugin`. To add a store, follow the same pattern and add its plugin to the
list in `Program.cs`.
