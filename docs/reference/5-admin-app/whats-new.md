---
sidebar_position: 7
---

# What's New

This section provides an overview of what's new in the latest versions of the
Ed-Fi Admin App v4.

## Updates in Admin App v4.1.0 (Latest Release)

### Features

* Support for the Admin API v3 specification, alongside the existing v1 and v2 environments. Admin App detects the specification from the Admin API discovery endpoint and uses "Data Stores" terminology for v3 environments. In v3 you can manage Applications, API Clients, Claim Sets (including import/export), Profiles, Data Stores, and view Education Organizations.
* Data Store (ODS) instance management: list, create, and delete database instances from a template, with the Admin API job outcome shown for each create or delete.
* Multiple credentials per Application: list, view, create, edit, reset, and delete credentials.
* Synchronization with Admin API: environments, ODS instances, and education organizations are synchronized from the Admin API, with refresh and job status tracking.
* Audit logging of administrative actions and sign-in/sign-out activity.
* Microsoft Entra ID support for machine users, generalized OIDC logout, and a configurable Account Management link.

### Enhancements

* Full Microsoft SQL Server support for the Admin App database.
* Security hardening: session secret and cookie protections, cross-site request protection, prevention of privilege escalation and mass assignment, and no secrets baked into the production image.
* Claim set display now includes resource claims with no actions.
* Configurable session timeout.
* Fixed OIDC login with Google Workspace.
* Upgraded to Node.js 24.
* Docker Compose improvements and a guide for setting up on a private server..

## Updates in Admin App v4

### Bug Fixes in Admin App 4.0.1

* [AC-458] - Fix on show secret page and Docker improvements.

## Initial Release

### Features

* Managing client credentials, database instances, and API health across diverse user roles and deployment models.
* Support for Microsoft SQL Server and PostgreSQL.
* Optional Yopass Integration Configuration.
* Supports both ODS/API 6.x and 7.x.
* Friendly and modern user interface.

For more information you can visit the [User's Guide](/reference/admin-app/user-guide/).
