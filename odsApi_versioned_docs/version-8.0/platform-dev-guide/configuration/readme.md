---
sidebar_position: 1
---

# Configuration

Ed-Fi API v8 consists of two separately configured services, each with its own
`appsettings.json`:

- **Data Management Service (DMS)** — handles the Ed-Fi REST API (resources,
  descriptors, discovery, and OAuth token validation). The primary configuration
  file is `appsettings.json` in the DMS application.
- **Configuration Service** — handles the management API (vendors, applications,
  claim sets, data stores, and identity). Configuration is also stored in
  `appsettings.json`.

By customizing these files you can adjust database connections, authentication
providers, multi-tenancy behavior, logging verbosity, and other runtime options.
For a full listing of available settings and their defaults, see
[Configuration Details](./configuration-details).

Both services support environment variable overrides using the standard ASP.NET
Core double-underscore `__` separator for hierarchical keys. Environment
variables take priority over `appsettings.json`. For example:

```ini
AppSettings__Datastore=mssql
RateLimit__PermitLimit=1000
```

In the provided Docker Compose setup, these overrides are managed through the
`.env` file in `eng/docker-compose/`. See
[Getting Started — Appendix](../../getting-started/getting-started-appendix)
for the complete `.env` variable reference.

The identity provider (self-contained OpenIddict or Keycloak) has its own
configuration section. See [Identity Provider](./identity-provider) for details.

Logging is configured separately. See
[Logging Configuration](./logging-configuration) for log levels, PII masking,
and correlation IDs.

## Security Configuration

In addition to the application settings above, Ed-Fi API v8 allows implementers
to configure several aspects of security:

- **Claim Sets.** Claim sets provide fine-grained access control over which
  resources a client application can read and write. Claim sets are managed
  through the Configuration Service API.
- **API Profiles.** Profiles allow implementers to define data policies that
  specify exactly what access is permitted for a particular client application
  type. For example, a student information system might require broad access to
  student, grade, and attendance data, while a gradebook application needs
  access only to a subset of those resources.

For more detail on security configuration, see the
[Security](../security/readme.md) section of this documentation.
