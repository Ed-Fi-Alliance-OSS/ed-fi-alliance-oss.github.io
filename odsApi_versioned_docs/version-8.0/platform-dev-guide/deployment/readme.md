---
sidebar_position: 4
---

# Deployment

Ed-Fi API v8.0 is distributed as Docker images and deployed using Docker
Compose. This section covers the information required to deploy and provision
a production or non-production instance of the Data Management Service and
Configuration Service.

This documentation assumes familiarity with Docker and Docker Compose. For a
guided first-run experience, see the
[Getting Started](../../getting-started/readme.md) section.

## Database Provisioning

Before Ed-Fi API v8.0 can serve requests, the database schema must be
provisioned. This includes creating tables, indexes, triggers, and
authorization structures for the configured API schema version.

The [Database Provisioning](./database-provisioning.md) section covers the
`dms-schema` CLI tool, startup-time auto-provisioning, and schema version
management.
