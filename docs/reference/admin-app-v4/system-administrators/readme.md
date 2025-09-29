# Ed-Fi Admin App - System Administrator Installation and Configuration Guide

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation Methods](#installation-methods)
   - [Docker Installation (Recommended)](#docker-installation-recommended)
   - [Windows IIS Installation](#windows-iis-installation)
   - [Unix-like Systems Installation](#unix-like-systems-installation)
4. [Configuration](#configuration)
   - [Backend API Configuration](#backend-api-configuration)
   - [Frontend Configuration](#frontend-configuration)
   - [Database Configuration](#database-configuration)
   - [Authentication Configuration](#authentication-configuration)
5. [Security Considerations](#security-considerations)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)

## Overview

The Ed-Fi Admin App is a user interface for managing Ed-Fi Technology Suite deployments. It consists of:

- **Frontend**: React-based single-page application (SPA)
- **Backend API**: Node.js/NestJS application
- **Database**: PostgreSQL database for application data
- **Authentication**: OpenID Connect (OIDC) integration (typically Keycloak)

### Required Components

- **PostgreSQL Database** (Required)
- **OIDC Provider** (Required) - Keycloak or similar
- **Reverse Proxy** (Recommended) - NGiNX, IIS, or similar

### Optional Components

- **Yopass** (Optional) - For sharing encrypted secrets
- **Memcached** (Optional) - Required only if using Yopass

## Prerequisites

### System Requirements

- **Operating System**: Windows Server 2019+, Linux (Ubuntu 20.04+, RHEL 8+), or similar
- **Memory**: Minimum 4GB RAM, Recommended 8GB+
- **Storage**: Minimum 10GB free space
- **Network**: HTTPS capability (SSL/TLS certificates)

### Software Dependencies

- **Node.js**: Version 18.0.0 or higher
- **PostgreSQL**: Version 12 or higher
- **SSL/TLS Certificates**: For HTTPS endpoints

## Installation Methods

## Docker Installation (Recommended)

Docker provides the easiest deployment method with consistent environments across platforms.

### Docker Prerequisites

- Docker Engine 20.10+ or Docker Desktop
- Docker Compose v2.0+
- Git (for cloning the repository)

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ed-Fi-Alliance-OSS/AdminApp-v4.git
   cd AdminApp-v4/compose
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

4. **Start core services**:

   ```bash
   # PowerShell (Windows):
   .\up.ps1
   
   # Linux/macOS:
   mkdir -p logs
   docker network create edfiadminapp-network --driver bridge
   docker-compose up -d
   ```

5. **Start Admin App services**:

   ```bash
   # PowerShell (Windows):
   .\up.ps1 -AdminApp
   
   # Linux/macOS:
   cd adminapp
   docker-compose up -d
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
   
   # Use production SSL certificates
   NODE_EXTRA_CA_CERTS=/app/ssl/your-production-cert.crt
   ```

2. **SSL Certificates**: Replace self-signed certificates with production certificates

3. **Database**: Consider using external PostgreSQL instance for better reliability

4. **Scaling**: Use Docker Swarm or Kubernetes for high availability

## Windows IIS Installation

### Windows Prerequisites

- **IIS with URL Rewrite Module**: Install from [Microsoft](https://www.iis.net/downloads/microsoft/url-rewrite)
- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **PostgreSQL**: Install and configure database server
- **IISNode**: For running Node.js applications in IIS

### Backend API Installation

1. **Install IISNode**:
   Download and install from [GitHub](https://github.com/Azure/iisnode)

2. **Build the application**:

   ```powershell
   # Clone and build
   git clone https://github.com/Ed-Fi-Alliance-OSS/AdminApp-v4.git
   cd AdminApp-v4
   npm ci
   npm run build:api
   ```

3. **Configure IIS Application**:

   ```xml
   <!-- web.config for API -->
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <handlers>
         <add name="iisnode" path="main.js" verb="*" modules="iisnode"/>
       </handlers>
       <rewrite>
         <rules>
           <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
             <match url="^main.js\/debug[\/]?" />
           </rule>
           <rule name="StaticContent">
             <action type="Rewrite" url="public{REQUEST_URI}"/>
           </rule>
           <rule name="DynamicContent">
             <conditions>
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
             </conditions>
             <action type="Rewrite" url="main.js"/>
           </rule>
         </rules>
       </rewrite>
       <security>
         <requestFiltering>
           <hiddenSegments>
             <remove segment="bin"/>
           </hiddenSegments>
         </requestFiltering>
       </security>
       <httpErrors existingResponse="PassThrough" />
       <iisnode watchedFiles="web.config;*.js"/>
     </system.webServer>
   </configuration>
   ```

4. **Environment Configuration**:
   Create `packages/api/config/local.js`:

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
     DB_ENCRYPTION_SECRET_VALUE: {
       KEY: 'your-32-char-encryption-key',
       IV: 'your-16-char-iv'
     },
     FE_URL: 'https://your-domain.com/adminapp',
     MY_URL: 'https://your-domain.com/adminapp-api',
     API_PORT: process.env.PORT || 3333
   };
   ```

### Alternative: Backend API Installation without URL Rewrite

If you prefer not to use the URL Rewrite module, you can deploy the Node.js backend directly to IIS using only iisnode. This approach is simpler but requires a slightly different configuration.

#### Prerequisites for Direct IIS Deployment

- **IIS with iisnode**: Install iisnode from [GitHub Releases](https://github.com/Azure/iisnode/releases)
- **Node.js**: Install Node.js on the server
- **No URL Rewrite Module required**

#### Steps for Direct Deployment

1. **Install iisnode only**:
   - Download the latest iisnode installer from GitHub
   - Run the installer to integrate iisnode with IIS
   - No need to install URL Rewrite module

2. **Build the application**:

   ```powershell
   # Clone and build (same as before)
   git clone https://github.com/Ed-Fi-Alliance-OSS/AdminApp-v4.git
   cd AdminApp-v4
   npm ci
   npm run build:api
   ```

3. **Create IIS Website**:
   - Open IIS Manager
   - Right-click on "Sites" and choose "Add Website"
   - Set **Site name**: `EdFi-AdminApp-API`
   - Set **Physical path**: Point to your built application directory (where `dist/packages/api/main.js` is located)
   - Set **Port**: 3333 (or your preferred port)
   - **Important**: Leave **Host name** blank for localhost testing, or set it only if you have proper DNS setup

4. **Configure web.config for Direct IIS Deployment**:
   Create a `web.config` file in the **same directory** as your `main.js` file:

   ```xml
   <!-- web.config for Direct IIS Deployment (No URL Rewrite) -->
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <!-- Configure iisnode to handle ALL requests to Node.js -->
       <handlers>
         <add name="iisnode" path="main.js" verb="*" modules="iisnode"/>
         <!-- Handle all paths through the Node.js application -->
         <add name="iisnode-api" path="*" verb="*" modules="iisnode" scriptProcessor="main.js"/>
       </handlers>
       
       <!-- Rewrite all requests to main.js (this is different from URL Rewrite module) -->
       <rewrite>
         <rules>
           <rule name="NodeJS" stopProcessing="true">
             <match url=".*"/>
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
             </conditions>
             <action type="Rewrite" url="main.js"/>
           </rule>
         </rules>
       </rewrite>
       
       <!-- iisnode configuration -->
       <iisnode 
         nodeProcessCommandLine="C:\Program Files\nodejs\node.exe"
         watchedFiles="web.config;*.js"
         loggingEnabled="true"
         logDirectory="iisnode"
         debuggingEnabled="true"
         devErrorsEnabled="true"
         node_env="production"
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
       
       <!-- Security settings -->
       <security>
         <requestFiltering>
           <hiddenSegments>
             <remove segment="bin"/>
           </hiddenSegments>
         </requestFiltering>
       </security>
       
       <!-- Error handling -->
       <httpErrors existingResponse="PassThrough" />
       
       <!-- Default document -->
       <defaultDocument>
         <files>
           <clear />
           <add value="main.js" />
         </files>
       </defaultDocument>
       
       <!-- Static content handling -->
       <staticContent>
         <!-- Remove existing .json mapping if it exists, then add our own -->
         <remove fileExtension=".json" />
         <mimeMap fileExtension=".json" mimeType="application/json" />
       </staticContent>
       
     </system.webServer>
   </configuration>
   ```

5. **Environment Configuration**:
   The configuration remains the same as the URL Rewrite method. Create `packages/api/config/local.js` with your settings.

6. **Set IIS Application Pool**:
   - In IIS Manager, go to Application Pools
   - Find your application pool (usually named after your site)
   - Set **.NET CLR version** to "No Managed Code"
   - Set **Identity** to an account with appropriate permissions
   - Set **Start Mode** to "AlwaysRunning" for better performance

#### Troubleshooting Direct IIS Deployment

**Common Issues and Solutions:**

**Node.js Executable Not Found:**

- **Error**: "The iisnode module is unable to start the node.exe process..."
- **Cause**: IIS cannot find the Node.js executable
- **Solution**:
  1. **Find your Node.js installation path**:

     ```powershell
     # Check where Node.js is installed
     where node
     
     # Or check the version and default location
     node --version
     # Default locations:
     # C:\Program Files\nodejs\node.exe (standard installation)
     # C:\Program Files (x86)\nodejs\node.exe (32-bit installation)
     ```
  
  2. **Update the `nodeProcessCommandLine` in web.config**:

     ```xml
     <!-- For standard Node.js installation -->
     nodeProcessCommandLine="C:\Program Files\nodejs\node.exe"
     
     <!-- For NVM (Node Version Manager) installation -->
     nodeProcessCommandLine="%APPDATA%\nvm\v18.17.0\node.exe"
     <!-- Replace v18.17.0 with your actual Node.js version -->
     ```
  
  3. **For NVM (Node Version Manager) users**:

     **Find your current Node.js version and path:**

     ```powershell
     # Check your current Node.js version
     node --version
     
     # Check nvm list to see installed versions
     nvm list
     
     # Check the exact path
     where node
     ```

     **Common NVM paths:**
     - `%APPDATA%\nvm\v{version}\node.exe` (nvm-windows)
     - `C:\Users\{username}\AppData\Roaming\nvm\v{version}\node.exe` (full path)
     - `%NVM_HOME%\v{version}\node.exe` (if NVM_HOME is set)

     **Example for Node.js v18.17.0:**

     ```xml
     nodeProcessCommandLine="%APPDATA%\nvm\v18.17.0\node.exe"
     ```

     **Alternative approach for NVM - Use symlink:**

     ```xml
     <!-- If nvm creates a symlink (some nvm versions do this) -->
     nodeProcessCommandLine="%APPDATA%\nvm\nodejs\node.exe"
     ```

  4. **Alternative locations to check**:
     - `C:\Program Files\nodejs\node.exe` (standard installation)
     - `C:\Program Files (x86)\nodejs\node.exe` (32-bit)
     - `%APPDATA%\nvm\v{version}\node.exe` (nvm-windows)
     - `%APPDATA%\npm\node.exe` (npm global installations)
     - Custom installation directory

**Duplicate MIME Type Error:**

- **Error**: "Cannot add duplicate collection entry of type 'mimeMap' with unique key attribute 'fileExtension' set to '.json'"
- **Cause**: IIS already has a MIME type mapping for `.json` files
- **Solution**: Use the `<remove>` element before adding the MIME type:

  ```xml
  <staticContent>
    <!-- Remove existing .json mapping if it exists, then add our own -->
    <remove fileExtension=".json" />
    <mimeMap fileExtension=".json" mimeType="application/json" />
  </staticContent>
  ```

**HTTP Error 403.14 - Forbidden:**

- **Cause**: IIS cannot find the default document or directory browsing is disabled
- **Solution**:
  1. Ensure `web.config` is in the same directory as `main.js`
  2. Verify the `<defaultDocument>` section includes `main.js`
  3. Check that the physical path in IIS points to the directory containing `main.js`
  4. Verify iisnode is properly installed and the handler is registered

**HTTP Error 404.0 - Not Found for `/api` routes:**

- **Cause**: Requests aren't being routed through the Node.js application
- **Solution**:
  1. The updated `web.config` above includes rewrite rules to handle this
  2. Ensure the `<rewrite>` section is present (this is different from URL Rewrite module)
  3. Verify that all API requests go through `main.js`

**Testing Your Deployment:**

1. **Test the root endpoint**: `http://localhost:3333/` should return your Node.js application response
2. **Test API endpoints**: `http://localhost:3333/api/` should work for API routes
3. **Test Swagger**: `http://localhost:3333/api/` should show the Swagger documentation if enabled
4. **Check iisnode logs**: Look in the `iisnode` folder for detailed error logs

**Debugging Steps:**

1. **Enable detailed errors** in the `web.config` (already enabled in the config above):

   ```xml
   debuggingEnabled="true"
   devErrorsEnabled="true"
   ```

2. **Check Windows Event Viewer**: Look for IIS and iisnode related errors

3. **Verify file permissions**: Ensure IIS has read access to your application files

4. **Test Node.js directly**: Before deploying to IIS, test that `node main.js` works locally

**Configuration Issues:**

**NODE_ENV Configuration Warning:**

- **Warning**: "NODE_ENV value of 'production' did not match any deployment config file names"
- **Cause**: Application running in production mode but no production.js config file exists
- **Solutions**:
  1. **Use development mode** in web.config:

     ```xml
     node_env="development"
     ```

  2. **Create production.js** config file in the config directory with production settings
  3. **Add promoteServerVars** to ensure environment variables are passed:

     ```xml
     promoteServerVars="NODE_ENV"
     ```

**Database Password Error:**

- **Error**: "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
- **Cause**: PostgreSQL password not being passed as a proper string
- **Solution**: Ensure all database credentials in config are strings:

  ```javascript
  DB_SECRET_VALUE: {
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_USERNAME: 'postgres',
    DB_DATABASE: 'sbaa',
    DB_PASSWORD: 'postgres',  // Ensure this is a string
  }
  ```

#### Advantages of Direct IIS Deployment

- **Simpler setup**: No need for URL Rewrite module
- **Direct integration**: Node.js runs directly within IIS worker process
- **Better error handling**: iisnode provides detailed error logging
- **Process management**: IIS handles process recycling and monitoring

#### Considerations

- **Single entry point**: All requests go directly to `main.js`
- **Port binding**: The application runs on the port configured in IIS, not the port in your Node.js code
- **Process environment**: The Node.js application runs within the IIS worker process context
- **Logging**: iisnode provides its own logging mechanism in addition to your application logs

### Frontend Installation

1. **Build the frontend**:

   ```powershell
   npm run build:fe
   ```

2. **Deploy to IIS**:
   - Copy `dist/packages/fe/*` to your IIS website directory
   - Configure IIS site with proper bindings (HTTPS recommended)

3. **Configure URL Rewrite** for React Router:

   ```xml
   <!-- web.config for Frontend -->
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
     </system.webServer>
   </configuration>
   ```

## Unix-like Systems Installation

### Unix Prerequisites

- **NGiNX**: For reverse proxy and static file serving
- **Node.js**: Version 18.0.0+
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
     DB_ENCRYPTION_SECRET_VALUE: {
       KEY: 'your-32-char-encryption-key-here',
       IV: 'your-16-char-iv'
     },
     FE_URL: 'https://your-domain.com/adminapp',
     MY_URL: 'https://your-domain.com/adminapp-api',
     API_PORT: 3333
   };
   EOF
   ```

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
- `local.js` - Local/environment-specific settings (create this file)
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
  
  // Database Encryption (for storing sensitive data)
  DB_ENCRYPTION_SECRET_VALUE: {
    KEY: 'your-32-character-encryption-key',
    IV: 'your-16-char-iv'
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
```

These variables must be set during the build process:

```bash
# Build with custom configuration
VITE_API_URL=https://your-domain.com/adminapp-api \
VITE_OIDC_ID=1 \
VITE_BASE_PATH=/adminapp/ \
VITE_HELP_GUIDE=https://your-help-site.com/ \
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

## Troubleshooting

### Common Issues

#### Database Connection Errors

```bash
# Check database connectivity
psql -h localhost -U edfiadminapp -d sbaa

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

#### API Startup Issues

```bash
# Check API logs
tail -f /opt/edfiadminapp/logs/application.log

# Check service status
sudo systemctl status edfiadminapp-api

# Check service logs
sudo journalctl -u edfiadminapp-api -f
```

#### Authentication Issues

1. **OIDC Configuration**: Verify OIDC provider is accessible
2. **Client Configuration**: Check client ID and secret
3. **Redirect URIs**: Ensure redirect URIs match exactly
4. **Network**: Verify network connectivity to OIDC provider

#### Frontend Issues

1. **Build errors**: Check environment variables are set correctly
2. **Routing issues**: Verify web server is configured for SPA routing
3. **API connectivity**: Check CORS and network connectivity

### Log Locations

- **API Logs**: `/opt/edfiadminapp/logs/` (Linux) or `logs/` (Docker)
- **Web Server Logs**: `/var/log/nginx/` (NGiNX) or IIS logs (Windows)
- **Database Logs**: `/var/log/postgresql/` (Linux)
- **System Logs**: `journalctl` (systemd) or Event Viewer (Windows)

### Health Checks

The application provides health check endpoints:

- **API Health**: `GET /api/healthcheck`
- **Frontend Health**: `GET /health` (when using NGiNX configuration)

## Maintenance

### Regular Maintenance Tasks

1. **Database Maintenance**:

   ```sql
   -- Regular vacuum and analyze
   VACUUM ANALYZE;
   
   -- Check for bloat
   SELECT schemaname, tablename, attname, n_distinct, most_common_vals 
   FROM pg_stats WHERE tablename = 'your_table';
   ```

2. **Log Rotation**:

   ```bash
   # Configure logrotate for application logs
   sudo cat > /etc/logrotate.d/edfiadminapp << 'EOF'
   /opt/edfiadminapp/logs/*.log {
       daily
       rotate 30
       compress
       delaycompress
       missingok
       notifempty
       copytruncate
   }
   EOF
   ```

3. **Backup Strategy**:

   ```bash
   # Database backup script
   #!/bin/bash
   BACKUP_DIR="/backup/edfiadminapp"
   DATE=$(date +%Y%m%d_%H%M%S)
   
   mkdir -p $BACKUP_DIR
   pg_dump -h localhost -U edfiadminapp sbaa | gzip > $BACKUP_DIR/sbaa_$DATE.sql.gz
   
   # Keep only 30 days of backups
   find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
   ```

### Updates and Upgrades

1. **Application Updates**:

   ```bash
   # Stop services
   sudo systemctl stop edfiadminapp-api
   
   # Backup current installation
   sudo cp -r /opt/edfiadminapp /opt/edfiadminapp.backup
   
   # Update code
   cd /opt/edfiadminapp
   git pull origin main
   npm ci
   npm run build:api
   npm run build:fe
   
   # Run migrations
   npm run migrations:run
   
   # Restart services
   sudo systemctl start edfiadminapp-api
   sudo systemctl reload nginx
   ```

2. **Database Updates**:
   - Always backup before schema changes
   - Test migrations in staging environment first
   - Monitor application logs after updates

3. **Security Updates**:
   - Regular OS security updates
   - Keep Node.js and dependencies updated
   - Monitor security advisories

### Monitoring

Implement monitoring for:

- **Application health**: API and database connectivity
- **Performance metrics**: Response times, memory usage
- **Security events**: Failed authentication attempts
- **Resource utilization**: CPU, memory, disk space
- **Database performance**: Query performance, connection counts

Consider using tools like:

- **Prometheus + Grafana**: For metrics and dashboards
- **ELK Stack**: For log aggregation and analysis
- **Nagios/Zabbix**: For infrastructure monitoring

This concludes the comprehensive System Administrator Installation and Configuration Guide for Ed-Fi Admin App.
