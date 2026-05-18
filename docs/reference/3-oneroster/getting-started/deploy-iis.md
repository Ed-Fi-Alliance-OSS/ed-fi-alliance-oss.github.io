# Deploy on IIS (Windows)

The Ed-Fi OneRoster® Node service can be hosted on Internet Information
Services (IIS) on Windows Server, either with `iisnode` (IIS owns the
Node process) or as a reverse proxy to a Node Windows service. Both
patterns are production-supported.

The authoritative, step-by-step IIS walkthrough is maintained alongside
the service source in the `edfi-oneroster` repository:

- [IIS Installation Guide](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/docs/IIS_Installation_Guide.md)

Keeping the detailed procedure next to the code lets it evolve with the
`web.config` templates, PowerShell snippets, and WinSW service
definitions that it references.

For the database side of the deployment, see [Deploy on
PostgreSQL](./deploy-postgres.md) or [Deploy on Microsoft SQL
Server](./deploy-mssql.md). Environment variables referenced by the IIS
guide are documented in [Environment
variables](../configuration/environment-variables.md).
