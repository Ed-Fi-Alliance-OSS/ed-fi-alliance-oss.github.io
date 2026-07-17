---
sidebar_position: 1
---

# Configuring an Identity Provider for Ed-Fi Admin App

The Ed-Fi Admin App uses an Open ID Connect (OIDC) compatible Identity Provider (IdP) for managing user accounts. In theory any OIDC-compatible IdP will suffice. The Ed-Fi Alliance has validated three providers end-to-end on the native Windows/IIS deployment: [Keycloak](./keycloak.md) (the default example), [Microsoft Entra ID](./microsoft-entra-id.md), and [Google Workspace](./google-workspace.md). Each has its own guide, linked below.

## General IdP Guidance and Configuration

### Backend Configuration Settings

The Ed-Fi Admin App backend requires specific configuration settings to connect to your OIDC-compatible Identity Provider. These settings are typically configured in the application's environment variables or configuration files.

Key configuration parameters include:

- **Authority URL**: The base URL of your IdP (e.g., `https://your-keycloak-server/realms/edfi`)
- **Client ID**: The client identifier registered in your IdP (e.g., `edfiadminapp`)
- **Client Secret**: The confidential secret associated with the client
- **Redirect URI**: The callback URL where the IdP sends authentication responses (e.g., `https://your-admin-app-api-url/api/auth/callback/<oidc-id>`, where `<oidc-id>` is the id of the `oidc` table row)
- **Post Logout Redirect URI**: Where users are redirected after logging out (e.g., `https://your-admin-app-url/api/auth/post-logout`)
- **Response Type**: Typically set to `code` for authorization code flow
- **Scope**: The OIDC scopes requested, typically `openid profile email`

These settings must match the configuration in your IdP to ensure proper authentication flow.

### Bootstrap User Concept

The Ed-Fi Admin App uses a **bootstrap user** mechanism to initialize the system with its first administrative user. This is necessary because:

1. The application requires at least one user with administrative privileges to configure the system
2. User permissions and roles are managed within the Admin App itself, separate from the IdP
3. The bootstrap user provides the initial entry point to set up additional users and permissions

**How it works:**

- When the Admin App starts for the first time (or when the database is empty), it looks for a configured bootstrap user
- This user's email address or username is specified in the application configuration
- When this user first authenticates through the IdP, they are automatically granted administrative privileges in the Admin App
- Subsequent users who authenticate must be granted permissions by an existing administrator

:::tip
Configure the bootstrap user email/username before deploying the application to production. This ensures you can immediately access the system after initial deployment.
:::

### Authentication and Authorization Architecture

The Ed-Fi Admin App implements a two-layer security model:

**Authentication (IdP Layer):**

- The Identity Provider handles user authentication and session management
- Users log in through the IdP interface (e.g., Keycloak login page)
- The IdP validates credentials and issues authentication tokens
- The application uses cookie-based authentication to maintain user sessions

**Authorization (Admin App Layer):**

- The Admin App maintains its own authorization system independent of the IdP
- User permissions, roles, and access controls are managed within the Admin App database
- The IdP does not need to provide special claims, scopes, or role information
- Users only need a valid IdP account; all authorization decisions are made by the Admin App

**What this means for IdP configuration:**

- You do not need to configure custom claims or scopes in your IdP
- You do not need to map roles or permissions from the IdP to the Admin App
- Users simply need a valid account in the IdP with basic profile information (username, email, name)
- All permission management happens within the Admin App after successful authentication

This separation of concerns allows for flexible user management while maintaining security and simplifying IdP setup.

### How Provider Settings Are Loaded

Admin App's OIDC integration is generic and table-driven. On startup the API reads the `oidc` table and registers one authentication strategy per provider, discovering each provider's endpoints automatically from `{issuer}/.well-known/openid-configuration`. Provider values reach that table through the API config file `packages/api/config/production.js` (the `SAMPLE_OIDC_CONFIG` block), which the API seeds into the `oidc` table on first startup when the table is empty.

Configuring any provider therefore follows the same five steps: (1) register an application with the provider, (2) put its values in `production.js` (`SAMPLE_OIDC_CONFIG`), (3) set the first admin's email (`ADMIN_USERNAME`), (4) set the frontend variables, and (5) sign in. No application code changes are required. The app uses the `email` claim as the username and matches it to a user that must already exist with a role.

On a fresh, single-provider install the `oidc` table starts empty, so the provider you configure lands at row id `1` — the frontend's default (`VITE_OIDC_ID=1`).

## Provider Guides

Step-by-step guides for the three validated providers:

- [Keycloak](./keycloak.md) — the bundled default example.
- [Microsoft Entra ID](./microsoft-entra-id.md)
- [Google Workspace](./google-workspace.md)
