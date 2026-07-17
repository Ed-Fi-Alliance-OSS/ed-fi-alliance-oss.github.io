---
sidebar_position: 2
---

# Configuring Ed-Fi Admin App

This page describes how to configure the Ed-Fi Admin App after installation, regardless of which installation path you followed ([Docker Compose](../getting-started/docker-installation.md), [Windows IIS](../getting-started/windows-iis-installation.md), or [Unix-like Systems](../getting-started/unix-installation.md)). It covers backend API configuration, frontend build-time configuration, database setup and migrations, and authentication.

## Backend API Configuration

The backend API uses a hierarchical configuration system based on the [config](https://www.npmjs.com/package/config) package.

### Configuration Files

Configuration files are located in `packages/api/config/`:

- `default.js` - Base configuration
- `production.js` - Production overrides
- `local.js` - Local/environment-specific settings
- `custom-environment-variables.js` - Environment variable mappings

### Key Configuration Options

```javascript
module.exports = {
  // Database Configuration
  DB_SECRET_VALUE: {
    DB_USERNAME: 'database_username',
    DB_PASSWORD: 'database_password',
    DB_HOST: 'database_host',
    DB_PORT: 5432,
    DB_DATABASE: 'database_name'
  },

  // Authentication Configuration (OIDC)
  AUTH0_CONFIG_SECRET_VALUE: {
    ISSUER: 'https://your-oidc-provider/realms/edfi',
    CLIENT_ID: 'edfiadminapp',
    CLIENT_SECRET: 'your-client-secret',
    MACHINE_AUDIENCE: 'edfiadminapp-api', // only used for direct bearer-token API access
  },

  SAMPLE_OIDC_CONFIG: {
      issuer: 'https://your-keycloak-server/auth/realms/edfi',
      clientId: 'edfiadminapp',
      clientSecret: 'your-client-secret',
      scope: '',
  },
  //this should match with a user in your Idp
  ADMIN_USERNAME: 'admin@example.com',

  // Database Encryption (for storing sensitive data)
  DB_ENCRYPTION_SECRET_VALUE: {
    // A 32-byte key, hex-encoded (64 hex characters).
    // Generate with: openssl rand -hex 32
    // or: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    KEY: 'your-64-hex-char-encryption-key'
  },

  // Application URLs
  FE_URL: 'https://your-domain.com/adminapp',
  MY_URL: 'https://your-domain.com/adminapp-api',
  YOPASS_URL: 'https://your-domain.com/yopass', // Optional

  // API Configuration
  API_PORT: 3333,
  ENABLE_OPEN_API: false, // Set to true for Swagger documentation

  // Database Options
  DB_SSL: true, // Use SSL for database connections
  DB_RUN_MIGRATIONS: true, // Auto-run database migrations
  DB_SYNCHRONIZE: false, // Never use in production
  TYPEORM_LOGGING: false, // Enable for debugging

  // Outbound TLS: verify the certificate of the ODS/API and Admin API the app calls.
  // Keep true. For a local upstream with a self-signed cert, trust it via
  // NODE_EXTRA_CA_CERTS rather than disabling this.
  SSL_VERIFICATION: true,

  // Optional Features
  USE_YOPASS: false, // Enable Yopass integration

  // Sync Schedule (cron format)
  SB_SYNC_CRON: '0 2 * * *', // Daily at 2 AM

  // Security
  WHITELISTED_REDIRECTS: ['https://your-domain.com/adminapp']
};
```

:::note
These URL examples assume a single public origin behind a reverse proxy (path-based `/adminapp` and `/adminapp-api`). For a direct two-site deployment such as the Windows/IIS install, use each site's own HTTPS URL (for example `https://host:3443`) instead.
:::

### Environment Variables Unix

Alternatively, you can use environment variables:

```bash
# Database
DATABASE_SECRET={"username":"user","password":"pass","host":"localhost","port":5432,"dbname":"sbaa"}

# Authentication
AUTH0_CONFIG_SECRET={"ISSUER":"https://keycloak/realms/edfi","CLIENT_ID":"edfiadminapp","CLIENT_SECRET":"secret","MACHINE_AUDIENCE":"edfiadminapp-api"}

# Encryption
DB_ENCRYPTION_SECRET={"KEY":"your-64-hex-char-key"}

# URLs
FE_URL=https://your-domain.com/adminapp
MY_URL=https://your-domain.com/adminapp-api
YOPASS_URL=https://your-domain.com/yopass

# Options
OPEN_API=false
TYPEORM_LOGGING=false
```

## Frontend Configuration

The frontend is configured through environment variables that are embedded at build time.

### Build-time Environment Variables

```bash
# API Configuration
VITE_API_URL=https://your-domain.com/adminapp-api

# OIDC Configuration
VITE_OIDC_ID=1  # ID of OIDC configuration in database

# Application Paths
VITE_BASE_PATH=/adminapp/

# Help Documentation
VITE_HELP_GUIDE=https://docs.ed-fi.org/reference/admin-app

# UI Configuration
VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/configuration/global-administration-tasks
VITE_CONTACT=https://community.ed-fi.org/
VITE_APPLICATION_NAME="Ed-Fi Admin App"
VITE_IDP_ACCOUNT_URL=https://your-domain.com/auth/realms/edfi/account/
```

:::note
`VITE_API_URL` and `VITE_BASE_PATH` depend on how the app is exposed. Behind a reverse proxy on a single origin, use path-based values (`.../adminapp-api` and `/adminapp/`) as shown. For a direct two-site deployment such as the Windows/IIS install, use the API site's own HTTPS URL (for example `https://host:3443`) and serve the frontend from root (`VITE_BASE_PATH="/"`).
:::

**Variable Descriptions:**

- `VITE_STARTING_GUIDE`: URL to the getting started or system administrator guide, displayed in the help menu
- `VITE_CONTACT`: URL to the community support or contact page where users can get help
- `VITE_APPLICATION_NAME`: Display name for the application shown in the UI (can be customized for branding)
- `VITE_IDP_ACCOUNT_URL`: URL to the identity provider's account management page where users can manage their profile and authentication settings

:::note
**Important:** The `VITE_IDP_ACCOUNT_URL` value may differ from your Keycloak admin console URL.
This should point to the **account management interface** (`/auth/realms/{realm-name}/account/`), not the admin console.

- Local development: `https://localhost/auth/realms/edfi/account/`
- Production: `https://auth.yourdomain.com/auth/realms/production/account/`
- Custom realm: `https://keycloak.example.org/auth/realms/school-district/account/`

:::

Set these before building — put them in `packages/fe/.env` (copy `.copyme.env.local` to `.env`) or export them in the shell — because they are baked into the bundle at build time:

```bash
npm run build:fe
```

## Database Configuration

### PostgreSQL Setup

1. **Create database and user**:

   ```sql
   -- Connect as the postgres superuser
   CREATE DATABASE sbaa;
   CREATE USER edfiadminapp WITH PASSWORD 'your_secure_password';

   -- Least privilege: CONNECT + CREATE on the database (so the app can create the
   -- citext extension and its pgboss job-queue schema at first boot) and ownership
   -- of the public schema so it can create its own tables. Not database-wide ALL.
   GRANT CONNECT, CREATE ON DATABASE sbaa TO edfiadminapp;
   \c sbaa
   ALTER SCHEMA public OWNER TO edfiadminapp;
   ```

2. **Configure PostgreSQL** (`postgresql.conf`):

   ```ini
   # Enable SSL
   ssl = on
   ssl_cert_file = 'server.crt'
   ssl_key_file = 'server.key'

   # Connection settings
   max_connections = 100
   shared_buffers = 256MB
   effective_cache_size = 1GB
   work_mem = 4MB

   # Logging
   log_statement = 'none'  # Don't log SQL statements
   log_min_duration_statement = 1000  # Log slow queries
   ```

3. **Configure client authentication** (`pg_hba.conf`):

   ```conf
   # TYPE  DATABASE        USER            ADDRESS                 METHOD
   local   all             postgres                                peer
   local   all             all                                     md5
   host    sbaa            edfiadminapp    127.0.0.1/32           md5
   host    sbaa            edfiadminapp    ::1/128                md5
   hostssl sbaa            edfiadminapp    0.0.0.0/0              md5
   ```

### Database Migrations

Database migrations run automatically when `DB_RUN_MIGRATIONS: true` is set. For manual control:

```bash
# Run migrations
npm run migrations:run

# Generate new migration
npm run migrations:generate -- --name AddNewFeature

# Revert last migration
npm run migrations:revert
```

## Authentication Configuration

The Admin App uses OpenID Connect (OIDC) for authentication. Keycloak is the recommended provider.

### Keycloak Configuration

1. **Create Realm**: Create a new realm called `edfi`

2. **Create Client for Web Application**:

   ```json
   {
     "clientId": "edfiadminapp",
     "protocol": "openid-connect",
     "publicClient": false,
     "standardFlowEnabled": true,
     "directAccessGrantsEnabled": false,
     "serviceAccountsEnabled": false,
     "redirectUris": [
       "https://your-domain.com/adminapp-api/api/auth/callback/*"
     ],
     "webOrigins": [
       "https://your-domain.com"
     ]
   }
   ```

3. **Create Client for Machine-to-Machine** _(optional — only for direct bearer-token API access, e.g. Postman/curl/CI; the browser login flow does not need it)_:

   ```json
   {
     "clientId": "edfiadminapp-machine",
     "protocol": "openid-connect",
     "publicClient": false,
     "serviceAccountsEnabled": true,
     "standardFlowEnabled": false,
     "directAccessGrantsEnabled": true
   }
   ```

4. **Create Client Scope** _(optional — used by the machine-to-machine client above)_:
   - Name: `login:app`
   - Type: Default
   - Protocol: openid-connect
   - Include in token scope: ON

### OIDC Database Configuration

The OIDC configuration is stored in the application database. Insert configuration:

```sql
INSERT INTO oidc (issuer, "clientId", "clientSecret", scope) VALUES
('https://your-domain.com/auth/realms/edfi', 'edfiadminapp', 'your-client-secret', '');
```

For more details on configuring an identity provider, see [Configuring an Identity Provider for Ed-Fi Admin App](./identity-provider.md).

## Next Steps

Review the [Security Considerations](./security-considerations.md) before deploying to production, then continue with [Global Administration Tasks](./global-administration-tasks.md).
