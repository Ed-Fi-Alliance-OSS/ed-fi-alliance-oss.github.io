---
---

# Deployment

Ed-Fi API v8.0 is distributed as Docker images and deployed using Docker
Compose. This section covers the information required to deploy and provision a
production or non-production instance of the Ed-Fi API and Configuration
Service.

This documentation assumes familiarity with Docker and Docker Compose. For a
guided first-run experience, see the [Getting
Started](../../getting-started/readme.md) section.

## Database Provisioning

Before Ed-Fi API v8.0 can serve requests, the database schema must be
provisioned. This includes creating tables, indexes, triggers, and authorization
structures for the configured API schema version.

The [Database Provisioning](../utilities/database-provisioning.md) page, covers
the `api-schema-tools` CLI tool, how the Configuration Service and Data Management
Service databases are provisioned, and schema fingerprint validation.
