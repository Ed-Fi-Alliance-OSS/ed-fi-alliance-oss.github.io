# Configuring an Identity Provider for Ed-Fi Admin App

The Ed-Fi Admin App uses an Open ID Connect (OIDC) compatible Identity Provider (IdP) for managing users accounts. In theory any OIDC-compatible IdP will suffice. The Ed-Fi Alliance development to date has only tested Keycloak. Another development team has used Auth0. Further documentation on alternatives to Keycloak will be provided here when available.

## General IdP Guidance and Configuration

### Backend Configuration Settings

The Ed-Fi Admin App backend requires specific configuration settings to connect to your OIDC-compatible Identity Provider. These settings are typically configured in the application's environment variables or configuration files.

Key configuration parameters include:

- **Authority URL**: The base URL of your IdP (e.g., `https://your-keycloak-server/realms/edfi`)
- **Client ID**: The client identifier registered in your IdP (e.g., `edfiadminapp`)
- **Client Secret**: The confidential secret associated with the client
- **Redirect URI**: The callback URL where the IdP sends authentication responses (e.g., `https://your-admin-app-url/api/auth/callback/1`)
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

## Using Keycloak

This guide walks you through setting up Keycloak as the identity provider for the Ed-Fi Admin App. Keycloak is used for OpenID Connect (OIDC) authentication, managing user sessions, and providing secure authentication for both the web interface and machine-to-machine (M2M) clients.
More info in the [Official Keycloak Website](https://www.keycloak.org/guides)

### Prerequisites

Before starting, ensure you have:

- Install Keycloak
  - Option A: Use the compose file cloned Ed-Fi Admin App repository
  - Option B: Physical or virtual server. See details [Keycloak installation and setup](https://www.keycloak.org/getting-started/getting-started-zip)
- The Ed-Fi Admin App repository cloned
- Basic familiarity with Keycloak concepts (realms, clients, users)

### Create the Ed-Fi Realm

1. In the Keycloak admin console, click the realm dropdown (top-left)
2. Click "Create Realm"
3. Enter realm name: `edfi`
4. Click "Create"

#### Configure Realm Settings

Navigate to **Realm Settings** → **General**:

- **Enabled**: ON
- **Display Name**: `Ed-Fi`
- **HTML Display Name**: `Ed-Fi Technology Suite`

#### Configure Session Timeouts

Navigate to **Realm Settings** → **Sessions**:

```text
SSO Session Idle: 2 hours (7200 seconds)
SSO Session Max: 2 hours (7200 seconds)
Client Session Idle: 2 hours
Client Session Max: 2 hours
Offline Session Idle: 30 days
Offline Session Max: 60 days
```

:::warning
These settings should align with your Admin App's express session timeout configured in `main.ts` to ensure consistent authentication behavior.
:::

Click **Save**.

### Client Configuration

If you need to create the client manually:

1. In the Keycloak admin console, select the `edfi` realm
2. Go to **Clients** in the left sidebar
3. Click **Create client**
4. **General Settings**:
   - **Client type**: OpenID Connect
   - **Client ID**: `edfiadminapp`
   - Click **Next**
5. **Capability config**:
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Authentication flow**: Check only "Standard flow"
   - Click **Next**
6. **Login settings**:
   - **Root URL**: `https://your-admin-app-url`
   - **Valid redirect URIs**:

     ```text
     https://your-admin-app-url/*
     https://your-admin-app-url/auth/callback
     https://your-admin-app-url-api-url/api/auth/callback/1
     https://your-admin-app-url-api-url/api/auth/post-logout
     ```

   - **Valid post logout redirect URIs**: `https://your-admin-app-url/*`
   - **Web origins**: `https://your-admin-app-api-url`
   - Click **Save**

### User Creation

#### 1. Create Your First Admin User

1. In the Keycloak admin console, select the `edfi` realm
2. Go to **Users** in the left sidebar
3. Click **Add user**
4. Fill in the user details:
   - **Username**: Choose a username (e.g., `admin`)
   - **Email**: `admin@example.com` (or your email)
   - **First Name**: Your first name
   - **Last Name**: Your last name
   - **Email Verified**: ON (toggle this to avoid verification emails)
5. Click **Create**

#### 2. Set User Password

After creating the user:

1. Click on the **Credentials** tab
2. Click **Set password**
3. Enter a password
4. Toggle **Temporary** to OFF (so the user won't be forced to change it on first login)
5. Click **Save**
6. Confirm by clicking **Set password** in the dialog

### HTTP Security for Keycloak

:::warning

The Ed-Fi Alliance software developers are not network security experts. Please consult your own trusted experts and information sources when applying these notes to your environment. The challenges of properly securing an IdP are a strong argument for using third-party managed service.

:::

The Ed-Fi Alliance's development and testing environments use Keycloak hosted inside of a Docker container, with NGiNX providing a reverse proxy layer. Our network configuration is a high trust environment: inside the container network we do not use Transport Layer Security (TLS). In other words, we allow `http` instead of enforcing `https`. This frees up the development team from needing to configure a certificate in Keycloak; the NGiNX reverse proxy handles the TLS termination. However, this is not a universally accepted best practice. Many practitioners prefer a [Zero Trust](https://www.cisa.gov/topics/cybersecurity-best-practices/zero-trust) architecture that assumes the network has been compromised and unsecured connections will be intercepted.

We have found the following NGiNX configuration to be useful for our high-trust configuration:

```none
location /auth {
    proxy_pass http://keycloak:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port 443;
    proxy_redirect off;

    # Do not set "HttpOnly" below, as Keycloak can't handle it: https://github.com/keycloak/keycloak/pull/16747
    proxy_cookie_flags ~ Secure SameSite=Strict;

    proxy_hide_header Content-Security-Policy;

    # Allowing 'unsafe-inline' for script-src and style-src are required for using Keycloak's UI: https://github.com/keycloak/keycloak/issues/16277
    # ... this version is preferred and works in a more production-like deployment
    # add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-inline';  style-src 'self' 'unsafe-inline';";
    # ... and this version works better for localhost development. It removes the form-action restriction.
    add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline';  style-src 'self' 'unsafe-inline';";
}
```

Notes:

- Cookie
  - The comment about `HttpOnly` above refers to the common weakness [CWE-1004: Sensitive Cookie Without 'HttpOnly' Flag](https://cwe.mitre.org/data/definitions/1004.html).
  - The `SameSite` setting addresses common weakness [CWE-1275: Sensitive Cookie with Improper SameSite Attribute](https://cwe.mitre.org/data/definitions/1275.html)
- Content Security Policy
  - There may be much better settings than these to address [CWE-942: Permissive Cross-domain Security Policy with Untrusted Domains](https://cwe.mitre.org/data/definitions/942.html), but these are what we have been able to work with.

:::tip

The header values can also be managed directly through Keycloak's realm settings; we chose to use the reverse proxy layer so that we would not need to spend time resetting (or automating) the Keycloak settings after frequent developer teardown / restart operations. The default Keycloak header settings also adds these headers:

```none
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-Robots-Tag: none
X-Xss-Protection: 1; mode=block
```

:::

### Key Rotation in Keycloak

The Ed-Fi Admin App has its own client credentials (aka "key and secret") for
connecting to the OAuth provider, such as Keycloak. As a best practice, many
organizations require regular rotation of keys and secrets - the longer a secret
is active, the more opportunity there is for it to be stolen.

Keycloak does not support client secret rotation as a default feature. Secret
rotation is available as a preview feature; it is disabled by default. To enable
secret rotation, administrators need to manually configure and activate this
feature within Keycloak settings.

#### Enable client secret rotation feature on docker

To enable client secret rotation in Keycloak when running in Docker, add this
under environment in your docker-compose.yml

```yml
  environment:
      KC_FEATURES: client-secret-rotation
```

#### Create a Client Profile with Secret Rotation Executor

- Navigate to Realm Settings > Client Policies > Profiles.
- Click on Create client profile and provide a name and description.
- After saving, add an executor of type `secret-rotation`.
- Configure the executor with parameters such as:
  1. Secret Expiration: Maximum duration (in seconds) a secret remains valid.
  2. Rotated Secret Expiration: Duration (in seconds) a rotated (previous)
     secret remains valid.
  3. Remain Expiration Time: Time window (in seconds) before secret expiration
     during which updates trigger rotation.

#### Create a Client Policy

- Still under Client Policies, navigate to the Policies tab.
- Click on Create client policy and provide a name and description.
- Add conditions to specify which clients the policy applies to (e.g., clients
  with a specific access type or role).
- Associate the previously created client profile with this policy.

#### Apply the Policy to Existing Clients

- During the creation of new clients, if the client secret rotation policy is
  active, the behavior will be applied automatically.
- For existing clients to adopt the new secret rotation behavior, an update
  action is required: Navigate to `Clients > [Select Client] > Credentials` tab.
  Click on Regenerate Secret to trigger the rotation mechanism as per the defined
  policy.

For detailed guidance, refer to the [Keycloak Server Administration Guide on
Client Secret
Rotation](https://www.keycloak.org/docs/latest/server_admin/index.html#_proc-secret-rotation).
