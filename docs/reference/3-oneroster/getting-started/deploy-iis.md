# Deploy on IIS (Windows)

The Ed-Fi OneRoster® Node service is hosted on Internet Information Services
(IIS) on Windows Server as a reverse proxy (ARR + URL Rewrite) to a separately
managed Node.js process, typically run as a Windows service with WinSW. This is the
supported production deployment pattern.

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
