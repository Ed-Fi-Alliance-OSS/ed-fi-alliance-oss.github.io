# Installing Ed-Fi Admin App

## Quick Start with Docker Compose

Docker provides the easiest deployment method with consistent environments across platforms. OCI-compliant containers provide a consistent deployment experience across many platforms, including Docker Desktop, Kubernetes, and other services. The following quick start instructions demonstrate application startup in Docker. They illustrate how to configure the applications, including environment variables, persistent storage, and networking. These notes can also serve as a template for building your own deployment in the container runtime engine of your choice, whether on-premises or in the Cloud.

### Docker Prerequisites

- Docker Engine 20.10+ or Docker Desktop
- Docker Compose v2.0+
- Git (for cloning the repository)

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp.git
   cd Ed-Fi-AdminApp/compose
   ```

2. **Create environment configuration**:

   ```bash
   cp .env.example .env
   # Edit .env file with your specific settings
   ```

3. **Generate SSL certificates**:

   ```bash
   # On Linux/WSL/Git Bash:
   cd ssl && ./generate-certificate.sh && cd ..
   ```

   :::note
   Only needed if you don't already have a certificate pair to use.
   :::

4. **Start core services**:

   ```bash
   # PowerShell Core (Windows/Linux/macOS):
   ./up.ps1

   # Linux/macOS:
   mkdir -p logs
   docker network create edfiadminapp-network --driver bridge
   docker compose up -d
   ```

5. **Start Admin App services**:

   ```bash
   # PowerShell Core (Windows/Linux/macOS):
   ./up.ps1 -AdminApp

   # Linux/macOS:
   cd adminapp
   docker compose up -d
   ```

### Production Docker Deployment

For production environments, modify the following:

1. **Environment Variables** (`.env`):

   ```bash
   # Use strong, unique passwords
   POSTGRES_PASSWORD=your-secure-password
   KEYCLOAK_ADMIN_PASSWORD=your-keycloak-password

   # Set production URLs
   VITE_API_URL=https://yourdomain.com/adminapp-api
   FE_URL=https://yourdomain.com/adminapp
   MY_URL=https://yourdomain.com/adminapp-api

   # This line is only necessary when you are using a self-signed certificate.
   NODE_EXTRA_CA_CERTS=/app/ssl/your-production-cert.crt

   # Administrator credentials
   KEYCLOAK_ADMIN=admin
   KEYCLOAK_ADMIN_PASSWORD=admin

   # Frontend UI Configuration
   VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/system-administrators/global-administration-tasks
   VITE_CONTACT=https://community.ed-fi.org/
   VITE_APPLICATION_NAME="Ed-Fi Admin App"
   VITE_IDP_ACCOUNT_URL=https://yourdomain.com/auth/realms/edfi/account/
   ```

  :::note
  **Important:** The `VITE_IDP_ACCOUNT_URL` value may differ from your Keycloak admin console URL.
  This should point to the **account management interface** (`/auth/realms/{realm-name}/account/`), not the admin console.
  Ensure this matches your actual Keycloak realm configuration and domain.
  :::

2. **SSL Certificates**: Replace self-signed certificates with production certificates

3. **Database**: Consider using external PostgreSQL instance for better reliability

## Windows IIS Installation

### Windows Prerequisites

- **IIS with URL Rewrite Module**: Install from [Microsoft](https://www.iis.net/downloads/microsoft/url-rewrite)
- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **PostgreSQL**: Install and configure database server
- **IISNode**: For running Node.js applications in IIS

### Backend API Installation

You can deploy the Node.js backend directly to IIS using only iisnode. This approach is simpler but requires a slightly different configuration.

#### Prerequisites for Direct IIS Deployment

- **IIS with iisnode**: Install iisnode from [GitHub Releases](https://github.com/Azure/iisnode/releases)
- **Node.js**: Install Node.js on the server

#### Steps for Direct Deployment

1. **Install iisnode only**:
   - Download the latest iisnode installer from GitHub
   - Run the installer to integrate iisnode with IIS

2. **Build the application**:

   ```powershell
   # Clone and build (same as before)
   git clone https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp.git
   cd Ed-Fi-AdminApp
   npm ci
   npm run build:api
   ```

3. **Create a folder for the website**:

   We recommend creating a new folder for your app. Typically IIS uses the path `C:\inetpub` for this purpose so create a folder called `C:\inetpub\EdFi-AdminApp-API` and move the following files into it:
   - `main.js` file and `assets` folder located in folder `dist/packages/api/`
   - `node_modules` folder
   - Create a folder `packages/api/config` and copy the file `default.js` located in folder `packages/api/config` from your source to the new folder

4. **Create IIS Website**:
   - Open IIS Manager
   - Right-click on "Sites" and choose "Add Website"
   - Set **Site name**: `EdFi-AdminApp-API`
   - Set **Physical path**: Point to your built application directory (eg. `C:\inetpub\EdFi-AdminApp-API`)
   - Set **Port**: 3333 (or your preferred port)
   - **Important**: Leave **Host name** blank for localhost testing, or set it only if you have proper DNS setup

5. **Configure web.config for Direct IIS Deployment**:
   Create a `web.config` file in the **same directory** as your `main.js` file:

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <!-- URL Rewrite rules - CRITICAL for proper routing -->
       <rewrite>
         <rules>
           <rule name="NodeJS" stopProcessing="true">
             <match url=".*"/>
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
             </conditions>
             <action type="Rewrite" url="main.js"/>
           </rule>
         </rules>
       </rewrite>

       <!-- iisnode configuration -->
       <iisnode
         nodeProcessCommandLine="node.exe"
         watchedFiles="web.config;*.js"
         loggingEnabled="true"
         logDirectory="iisnode"
         debuggingEnabled="true"
         devErrorsEnabled="true"
         node_env="production"
         promoteServerVars="PORT"
         maxConcurrentRequestsPerProcess="1024"
         maxNamedPipeConnectionRetry="100"
         namedPipeConnectionRetryDelay="250"
         maxNamedPipeConnectionPoolSize="512"
         maxNamedPipePooledConnectionAge="30000"
         asyncCompletionThreadCount="0"
         initialRequestBufferSize="4096"
         maxRequestBufferSize="65536"
         uncFileChangesPollingInterval="5000"
         gracefulShutdownTimeout="60000"
         recycleSignalEnabled="false"
         idlePageOutTimePeriod="0"
         configOverrides="iisnode.yml" />

       <!-- Default document -->
       <defaultDocument>
         <files>
           <clear />
           <add value="main.js" />
         </files>
       </defaultDocument>

       <!-- Error pages for detailed debugging -->
       <httpErrors errorMode="Detailed"/>
     </system.webServer>

     <system.web>
       <compilation debug="true"/>
     </system.web>
   </configuration>
   ```

   **Key Configuration Notes:**
   - **URL Rewrite Rules**: Essential for routing API requests (like `/api/*`) to your Node.js application
   - **Handler Mappings**: Configure these in IIS Manager, not in web.config (due to security restrictions)
   - **Node.js Path**: Use `node.exe` to let IIS find Node.js in the system PATH
   - **Environment**: Set `node_env="development"` for easier debugging, change to `"production"` for live deployments
   - **configOverrides**: This section allow you to have a separated file to override you `iisnode` configuration. [For more info](https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/iisnode.yml). Create a file `iisnode.yml` in the folder root. Eg:

   ```xml
   loggingEnabled: true
   debuggingEnabled: true
   devErrorsEnabled: true
   node_env: production
   ```

6. **Configure Handler Mappings in IIS Manager**:

   Since handler configuration in web.config may be restricted by IIS security policies, configure handlers through IIS Manager:

   - Open **IIS Manager** as Administrator
   - Navigate to your website
   - Double-click **"Handler Mappings"**
   - Click **"Add Module Mapping..."**
   - Configure:
     - **Request path**: `*`
     - **Module**: `Select iisnode`
     - **Executable**: empty
     - **Name**: `iisnode-all`
     - **Uncheck** "Invoke handler only if request is mapped to: File or Folder"
   - **Move this handler to the top** of the list (above StaticFile handler)

7. **Environment Configuration**:
   Create `packages/api/config/production.js` with your settings.

   ```javascript
   module.exports = {
     DB_SECRET_VALUE: {
       DB_USERNAME: 'your_db_user',
       DB_PASSWORD: 'your_db_password',
       DB_HOST: 'localhost',
       DB_PORT: 5432,
       DB_DATABASE: 'sbaa'
     },
     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'https://your-keycloak-server/auth/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api'
     },
     SAMPLE_OIDC_CONFIG: {
      issuer: 'https://your-keycloak-server/auth/realms/edfi',
      clientId: 'edfiadminapp',
      clientSecret: 'your-client-secret',
      scope: '',
     },
     //this should match with a user in your Idp
     ADMIN_USERNAME: 'admin@example.com',
     DB_ENCRYPTION_SECRET_VALUE: {
       // Can replace with `openssl rand -hex 32` or `node -e "console.log('KEY: '+ require('crypto').randomBytes(32).toString('hex'))"`
       KEY: 'your-32-char-encryption-key'
     },
     FE_URL: 'https://your-domain.com/adminapp',
     MY_URL: 'https://your-domain.com/adminapp-api',
     API_PORT: process.env.PORT || 3333,
     _OPEN_API: true, //Set false in case you want to hide swagger definition
   };
   ```

8. **Set IIS Application Pool**:
   - In IIS Manager, go to Application Pools
   - Find your application pool (usually named after your site, in our case `EdFi-AdminApp-API`)
   - Set **.NET CLR version** to "No Managed Code"
   - Set **Identity** to an account with appropriate permissions
   - Set **Start Mode** to "AlwaysRunning" for better performance

9. **Create Required Directories**:
   - Create the iisnode log directory. In our case `C:\inetpub\EdFi-AdminApp-API\iisnode`
   - Grant full permissions to the IIS App Pool user. In our case `IIS APPPOOL\EdFi-AdminApp-API`

   :::note
   Ensure your IIS directory has:

   ```text
   C:\inetpub\EdFi-AdminApp-API\
   ├── assets (the built folder)
   ├── main.js (the built file)
   ├── web.config
   ├── iisnode.yml (optional)
   ├── node_modules\ (complete folder)
   ├── packages\api\config (with your config files production.js and default.js)
   └── iisnode\ (log directory)
   ```

   :::

#### Critical Success Factors

**URL Rewrite Rules are Essential**: The `<rewrite>` section in web.config is **critical** for proper routing. Without these rules:

- API requests like `/api/*` will return 404 errors
- IIS will try to serve requests as static files instead of routing them to Node.js
- The Node.js application won't receive dynamic requests

**Handler Order Matters**: When configuring handlers in IIS Manager, ensure the iisnode handler with path `*` is at the **top** of the handler mappings list, above the StaticFile handler.

See [Troubleshooting](troubleshooting.md#backend-troubleshooting) section in case you have errors.

### Frontend Installation

1. In `packages/fe`, copy `.copyme.env.local` to create `.env` and modify the values depending on your environment. This is an example:

   ```xml
   VITE_API_URL=http://localhost:3333
   VITE_OIDC_ID=1
   VITE_HELP_GUIDE=https://docs.ed-fi.org/
   VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/system-administrators/global-administration-tasks
   VITE_CONTACT=https://community.ed-fi.org/
   VITE_APPLICATION_NAME="Ed-Fi Admin App"
   VITE_IDP_ACCOUNT_URL=https://localhost/auth/realms/edfi/account/
   ```

   **Environment Variable Descriptions:**
   - `VITE_API_URL`: Backend API endpoint
   - `VITE_OIDC_ID`: OpenID Connect configuration ID from database
   - `VITE_HELP_GUIDE`: URL to general help documentation
   - `VITE_STARTING_GUIDE`: URL to getting started/system administrator guide
   - `VITE_CONTACT`: URL to community support or contact page
   - `VITE_APPLICATION_NAME`: Display name shown in the UI (customize for branding)
   - `VITE_IDP_ACCOUNT_URL`: Identity provider account management page URL

   :::note
   **Important:** The `VITE_IDP_ACCOUNT_URL` value may differ from your Keycloak admin console URL.
   This should point to the **account management interface** (`/auth/realms/{realm-name}/account/`), not the admin console.
   Ensure this matches your actual Keycloak realm configuration and domain.
   :::

2. **Build the frontend**:

   ```powershell
   npm run build:fe
   ```

3. **Create a folder for the website**:

   We recommend creating a new folder for your app. Typically IIS uses the path `C:\inetpub` for this purpose so create a folder called `C:\inetpub\EdFi-AdminApp-FE` and move the following files into it:
   - `index.html` file and `assets` folder located in folder `dist/packages/fe/`

4. **Create IIS Website**:
   - Open IIS Manager
   - Right-click on "Sites" and choose "Add Website"
   - Set **Site name**: `EdFi-AdminApp-FE`
   - Set **Physical path**: Point to your built application directory (eg. `C:\inetpub\EdFi-AdminApp-FE`)
   - Set **Port**: 4200 (or your preferred port)
   - **Important**: Leave **Host name** blank for localhost testing, or set it only if you have proper DNS setup
   - Configure IIS site with proper bindings (HTTPS recommended)

5. **Configure URL Rewrite** for React Router:

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="React Routes" stopProcessing="true">
             <match url=".*" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
               <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
             </conditions>
             <action type="Rewrite" url="/" />
           </rule>
         </rules>
       </rewrite>
       <staticContent>
         <!-- Remove existing MIME types before adding to prevent duplicates -->
         <remove fileExtension=".json" />
         <remove fileExtension=".woff" />
         <remove fileExtension=".woff2" />
         <mimeMap fileExtension=".json" mimeType="application/json" />
         <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
         <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
       </staticContent>
       <httpCompression>
         <dynamicTypes>
           <add mimeType="application/json" enabled="true" />
         </dynamicTypes>
         <staticTypes>
           <add mimeType="application/javascript" enabled="true" />
           <add mimeType="text/css" enabled="true" />
         </staticTypes>
       </httpCompression>
       <!-- Error handling -->
       <httpErrors errorMode="Detailed" />
     </system.webServer>
   </configuration>
   ```

   **Important**: The `<remove>` elements are **critical** to prevent duplicate MIME type errors. IIS may already have these MIME types configured at the server level.

See [Troubleshooting](troubleshooting.md#frontend-troubleshooting) section in case you have errors.

## Unix-like Systems Installation

### Unix Prerequisites

- **NGiNX**: For reverse proxy and static file serving
- **Node.js**: Version 22.0.0+
- **PostgreSQL**: Database server
- **systemd**: For service management (most modern Linux distributions)

### Unix Backend API Installation

1. **Create application user**:

   ```bash
   sudo useradd --system --create-home --shell /bin/bash edfiadminapp
   sudo mkdir -p /opt/edfiadminapp
   sudo chown edfiadminapp:edfiadminapp /opt/edfiadminapp
   ```

2. **Install and build application**:

   ```bash
   sudo -u edfiadminapp bash
   cd /opt/edfiadminapp
   git clone https://github.com/Ed-Fi-Alliance-OSS/AdminApp-v4.git .
   npm ci
   npm run build:api
   ```

3. **Create configuration file**:

   ```bash
   sudo -u edfiadminapp cat > packages/api/config/local.js << 'EOF'
   module.exports = {
     DB_SECRET_VALUE: {
       DB_USERNAME: 'edfiadminapp',
       DB_PASSWORD: 'your_secure_password',
       DB_HOST: 'localhost',
       DB_PORT: 5432,
       DB_DATABASE: 'sbaa'
     },
     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'https://your-domain.com/auth/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api'
     },
     SAMPLE_OIDC_CONFIG: {
      issuer: 'https://your-keycloak-server/auth/realms/edfi',
      clientId: 'edfiadminapp',
      clientSecret: 'your-client-secret',
      scope: '',
     },
     //this should match with a user in your Idp
     ADMIN_USERNAME: 'admin@example.com',
     DB_ENCRYPTION_SECRET_VALUE: {
       KEY: 'your-32-char-encryption-key-here'
     },
     FE_URL: 'https://your-domain.com/adminapp',
     MY_URL: 'https://your-domain.com/adminapp-api',
     API_PORT: 3333
   };
   EOF
   ```

   :::tip
   `your-32-char-encryption-key-here` Can be replaced with `openssl rand -hex 32` or `node -e "console.log('KEY: '+ require('crypto').randomBytes(32).toString('hex'))"`
   :::
4. **Create systemd service**:

   ```bash
   sudo cat > /etc/systemd/system/edfiadminapp-api.service << 'EOF'
   [Unit]
   Description=Ed-Fi Admin App API
   After=network.target postgresql.service
   Wants=postgresql.service

   [Service]
   Type=simple
   User=edfiadminapp
   Group=edfiadminapp
   WorkingDirectory=/opt/edfiadminapp
   ExecStart=/usr/bin/node dist/packages/api/main.js
   Restart=always
   RestartSec=10
   Environment=NODE_ENV=production

   # Security settings
   NoNewPrivileges=true
   PrivateTmp=true
   ProtectSystem=strict
   ProtectHome=true
   ReadWritePaths=/opt/edfiadminapp/logs

   [Install]
   WantedBy=multi-user.target
   EOF

   sudo systemctl daemon-reload
   sudo systemctl enable edfiadminapp-api
   sudo systemctl start edfiadminapp-api
   ```

### Frontend Installation with NGiNX

1. **Build frontend**:

   ```bash
   sudo -u edfiadminapp npm run build:fe
   ```

2. **Configure NGiNX**:

   ```bash
   sudo cat > /etc/nginx/sites-available/edfiadminapp << 'EOF'
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name your-domain.com;

       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
       ssl_prefer_server_ciphers off;

       # Frontend application
       location /adminapp/ {
           alias /opt/edfiadminapp/dist/packages/fe/;
           try_files $uri $uri/ /adminapp/index.html;

           # Cache static assets
           location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
               expires 1y;
               add_header Cache-Control "public, immutable";
           }
       }

       # Backend API
       location /adminapp-api/ {
           proxy_pass http://localhost:3333/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
           proxy_read_timeout 86400;
       }
   }
   EOF

   sudo ln -s /etc/nginx/sites-available/edfiadminapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Configuration

### Backend API Configuration

The backend API uses a hierarchical configuration system based on the [config](https://www.npmjs.com/package/config) package.

#### Configuration Files

Configuration files are located in `packages/api/config/`:

- `default.js` - Base configuration
- `production.js` - Production overrides
- `local.js` - Local/environment-specific settings
- `custom-environment-variables.js` - Environment variable mappings

#### Key Configuration Options

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
    MACHINE_AUDIENCE: 'edfiadminapp-api',
    MANAGEMENT_DOMAIN: 'your-domain.com',
    MANAGEMENT_CLIENT_ID: 'edfiadminapp-machine',
    MANAGEMENT_CLIENT_SECRET: 'machine-client-secret'
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
    // Can replace with `openssl rand -hex 32` or `node -e "console.log('KEY: '+ require('crypto').randomBytes(32).toString('hex'))"
    KEY: 'your-32-character-encryption-key'
  },

  // Application URLs
  FE_URL: 'https://your-domain.com/adminapp',
  MY_URL: 'https://your-domain.com/adminapp-api',
  YOPASS_URL: 'https://your-domain.com/yopass', // Optional

  // API Configuration
  API_PORT: 3333,
  _OPEN_API: false, // Set to true for Swagger documentation

  // Database Options
  DB_SSL: true, // Use SSL for database connections
  DB_RUN_MIGRATIONS: true, // Auto-run database migrations
  DB_SYNCHRONIZE: false, // Never use in production
  TYPEORM_LOGGING: false, // Enable for debugging

  // Optional Features
  USE_YOPASS: false, // Enable Yopass integration

  // Sync Schedule (cron format)
  SB_SYNC_CRON: '0 2 * * *', // Daily at 2 AM

  // Security
  WHITELISTED_REDIRECTS: ['https://your-domain.com/adminapp']
};
```

#### Environment Variables

Alternatively, you can use environment variables:

```bash
# Database
DATABASE_SECRET={"username":"user","password":"pass","host":"localhost","port":5432,"dbname":"sbaa"}

# Authentication
AUTH0_CONFIG_SECRET={"ISSUER":"https://keycloak/realms/edfi","CLIENT_ID":"edfiadminapp","CLIENT_SECRET":"secret","MACHINE_AUDIENCE":"edfiadminapp-api"}

# Encryption
DB_ENCRYPTION_SECRET={"KEY":"your-32-char-key","IV":"your-16-char-iv"}

# URLs
FE_URL=https://your-domain.com/adminapp
MY_URL=https://your-domain.com/adminapp-api
YOPASS_URL=https://your-domain.com/yopass

# Options
OPEN_API=false
TYPEORM_LOGGING=false
```

### Frontend Configuration

The frontend is configured through environment variables that are embedded at build time.

#### Build-time Environment Variables

```bash
# API Configuration
VITE_API_URL=https://your-domain.com/adminapp-api

# OIDC Configuration
VITE_OIDC_ID=1  # ID of OIDC configuration in database

# Application Paths
VITE_BASE_PATH=/adminapp/

# Help Documentation
VITE_HELP_GUIDE=https://docs.ed-fi.org/

# UI Configuration
VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/system-administrators/global-administration-tasks
VITE_CONTACT=https://community.ed-fi.org/
VITE_APPLICATION_NAME="Ed-Fi Admin App"
VITE_IDP_ACCOUNT_URL=https://your-domain.com/auth/realms/edfi/account/
```

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

These variables must be set during the build process:

```bash
# Build with custom configuration
VITE_API_URL=https://your-domain.com/adminapp-api \
VITE_OIDC_ID=1 \
VITE_BASE_PATH=/adminapp/ \
VITE_HELP_GUIDE=https://your-help-site.com/ \
VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/system-administrators/global-administration-tasks \
VITE_CONTACT=https://community.ed-fi.org/ \
VITE_APPLICATION_NAME="Ed-Fi Admin App" \
VITE_IDP_ACCOUNT_URL=https://your-domain.com/auth/realms/edfi/account/ \
npm run build:fe
```

### Database Configuration

#### PostgreSQL Setup

1. **Create database and user**:

   ```sql
   -- Connect as postgres superuser
   CREATE DATABASE sbaa;
   CREATE USER edfiadminapp WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE sbaa TO edfiadminapp;

   -- Connect to sbaa database
   \c sbaa
   GRANT ALL ON SCHEMA public TO edfiadminapp;
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

#### Database Migrations

Database migrations run automatically when `DB_RUN_MIGRATIONS: true` is set. For manual control:

```bash
# Run migrations
npm run migrations:run

# Generate new migration
npm run migrations:generate -- --name AddNewFeature

# Revert last migration
npm run migrations:revert
```

### Authentication Configuration

The Admin App uses OpenID Connect (OIDC) for authentication. Keycloak is the recommended provider.

#### Keycloak Configuration

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

3. **Create Client for Machine-to-Machine**:

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

4. **Create Client Scope**:
   - Name: `login:app`
   - Type: Default
   - Protocol: openid-connect
   - Include in token scope: ON

#### OIDC Database Configuration

The OIDC configuration is stored in the application database. Insert configuration:

```sql
INSERT INTO oidc_client (issuer, "clientId", "clientSecret", scope) VALUES
('https://your-domain.com/auth/realms/edfi', 'edfiadminapp', 'your-client-secret', '');
```

## Security Considerations

### SSL/TLS Configuration

- **Use HTTPS everywhere**: All communication should be encrypted
- **Strong cipher suites**: Use modern TLS 1.2+ with strong ciphers
- **Certificate validation**: Use proper SSL certificates (not self-signed in production)

### Database Security

- **Encryption at rest**: Enable PostgreSQL encryption
- **Connection encryption**: Always use SSL for database connections
- **Principle of least privilege**: Create dedicated database user with minimal permissions
- **Regular backups**: Implement automated, encrypted backups

### Application Security

- **Environment variables**: Never commit secrets to source control
- **Input validation**: All inputs are validated on both client and server
- **CORS configuration**: Properly configure allowed origins
- **Security headers**: Implement proper security headers via reverse proxy

### Authentication Security

- **Strong secrets**: Use cryptographically strong client secrets
- **Token validation**: Implement proper JWT validation
- **Session management**: Configure appropriate session timeouts
- **Multi-factor authentication**: Enable MFA in your OIDC provider

This concludes the comprehensive System Administrator Installation and Configuration Guide for Ed-Fi Admin App.
