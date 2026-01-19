# Securing the Admin App

## Overview

Admin App v3.0 supports two methods for authentication: web-forms authentication
or single-sign on via Open ID Connect (OIDC).  Both utilize [ASP.NET Core
Identity](https://learn.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-6.0)
as the underlying framework.  This page will provide details to configure Admin
App based on the selected model.  Please use this as reference for Admin App
v2.x, however the  single-sign on via Open ID Connect method is not supported in
those product versions.

## Admin App Roles

Admin App uses two roles within the application for ODS/API management.  The
_Super-Administrator_ role is used to register multiple users with separate
roles and privileges along with all ODS / API instances and its functions. The
_Administrator_ role is allowed to access only specific ODS / API instances and
its functions. This user authentication model pairs well with multi-instance
support within Admin App.

### 1. Super-Administrator (default role for the first user)

The Super-Administrator role is intended for an IT Administrator managing a
collection of individual ODS instances, such as found within district
collaboratives.

#### Super-Administrator Permissions

* Add a user
* Assign a role to an added user
* Register and delete ODS / API instances
* Change and assign an ODS / API instance to an added user
* Change user settings for other users
* Delete a user
* Plus, all permissions of the Administrator role

### 2. Administrator

The Administrator role is one that can access one or more ODS instances assigned
by the Super-Administrator. This means that users in the Administrator role can
only administer ODS / API instances specifically assigned.

#### Administrator Permissions

* Manage applications
* API key/secret creation
* View descriptors
* Bulk data uploads
* Learning standards synchronization

## Securing Admin App

<!-- markdownlint-disable-next-line MD059 -->
1. Existing form authentication (Please refer [here](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=25243028)
   for more details)

2. Single sign on (SSO)

**References:**

[https://learn.microsoft.com/en-us/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/social/?view=aspnetcore-3.1&tabs=visual-studio)

[https://www.keycloak.org/getting-started/getting-started-docker](https://www.keycloak.org/getting-started/getting-started-docker)
