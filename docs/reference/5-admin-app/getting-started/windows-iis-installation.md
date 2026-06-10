---
sidebar_position: 3
---

# Windows IIS Installation

This page describes how to install the Ed-Fi Admin App on Windows using Internet Information Services (IIS). It covers the backend API and the frontend single-page application.

:::note
This is one of three alternative installation paths. If you instead want to run the Admin App in containers or on a Unix-like server, see [Docker Compose Installation](./docker-installation.md) or [Unix-like Systems Installation](./unix-installation.md).
:::

## Windows Prerequisites

- **IIS with URL Rewrite Module**: Install from [Microsoft](https://www.iis.net/downloads/microsoft/url-rewrite)
- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **PostgreSQL** or **SqlServer**: Install and configure database server
  - Create an empty database, our example will use the name `sbaa`
- **IISNode**: For running Node.js applications in IIS
- **An Identity Provider (IdP)**: For more details see [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- **Yopass**: We recommend to use this in order to share secrets correctly. For more details see [Yopass Administrator Guide](../configuration/yopass-administrators-guide/readme.md)

## Backend API Installation

You can deploy the Node.js backend directly to IIS using only iisnode. This approach is simpler but requires a slightly different configuration.

### Prerequisites for Direct IIS Deployment

- **IIS with iisnode**: Install iisnode from [GitHub Releases](https://github.com/Azure/iisnode/releases)
- **PostgreSQL** or **SqlServer**: Install and configure database server
  - Create an empty database, our example will use the name `sbaa`
- **Node.js**: Install Node.js on the server
- **An Identity Provider (IdP)**: We use Keycloak. For more details see [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- **Yopass**: We recommend to use this in order to share secrets correctly. For more details see [Yopass Administrator Guide](../configuration/yopass-administrators-guide/readme.md)

### Steps for Direct Deployment

1. **Install iisnode only**:
   - Download the latest iisnode installer from GitHub
   - Run the installer to integrate iisnode with IIS

2. **Build the application**:

   :::note
   Always install from a **stable release tag**, not the default `main` branch (which reflects active development).
   Visit the [Releases page](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases) to find the latest stable release tag, then use it in the command below.
   :::

   ```powershell
   # Replace the TAG value with the latest release from the Releases page
   $TAG = "v4.0.1"

   git clone --branch $TAG --depth 1 https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp.git
   cd Ed-Fi-AdminApp
   npm ci
   npm run build:api
   ```

3. **Create a folder for the website**:

   We recommend creating a new folder for your app. Typically IIS uses the path `C:\inetpub` for this purpose so create a folder called `C:\inetpub\EdFi-AdminApp-API` and move the following files into it:
   - `main.js` file and `assets` folder located in folder `dist/packages/api/`
   - `node_modules` folder located in source code after running the `npm ci` command
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
     - **Module**: Select `iisnode`
     - **Executable**: empty
     - **Name**: `iisnode-all`
     - Click on `Request restrictions...` button and then **Uncheck** `Invoke handler only if request is mapped to: File or Folder`in the `Mapping` tab. Click `Ok` button to save nad close this window.
     - Click `Ok` to close and save.
   - **Move this handler to the top** of the list (above StaticFile handler)

7. **Environment Configuration**:
   Create `packages/api/config/production.js` with your settings.

   :::note
   You can also use the template located in the source code `Ed-Fi-AdminApp/packages/api/config/production.js-edfi` as an example
   :::

   ```javascript
   // This the frontend URL we will create in the 'Frontend Installation' section, in this guide we will use http://localhost:4200, change it in case you will use a different port or host
   const FE_URL = 'http://localhost:4200';

   module.exports = {
     DB_ENGINE: 'pgsql',// 'pgsql' or 'mssql'
     DB_TRUST_CERTIFICATE: false, // For MSSQL local development using self-signed certs, set to true
     DB_TTL_IN_MINUTES: 120, // Time to live for DB sessions in minutes
     DB_SSL: false, //set true if your database server support SSL
     DB_SECRET_VALUE: {
       // If you are using DB_ENGINE:'pgsql' set the following values
       DB_USERNAME: 'your_db_user',
       DB_PASSWORD: 'your_db_password',
       DB_HOST: 'localhost',
       DB_PORT: 5432,
       DB_DATABASE: 'sbaa', //The database must exist in the server

       // If you are using DB_ENGINE:'mssql' set the following values
       MSSQL_DB_HOST: 'edfiadminapp-mssql',
       MSSQL_DB_PORT: 1433,
       MSSQL_DB_USERNAME: 'sa',
       MSSQL_DB_DATABASE: 'sbaa', //The database must exist in the server
       MSSQL_DB_PASSWORD: 'YourStrong!Passw0rd',
     },
     DB_ENCRYPTION_SECRET_VALUE: {
       // Can replace with `openssl rand -hex 32` or `node -e "console.log('KEY: '+ require('crypto').randomBytes(32).toString('hex'))"`
       KEY: 'your-32-char-encryption-key'
     },

     USE_YOPASS: true, //If true, you must provide the YOPASS_URL
     YOPASS_URL: 'http://your-yopass-site',

     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'https://your-keycloak-server/auth/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api'
     },

     //Identity provider (Idp) information
     SAMPLE_OIDC_CONFIG: {
      issuer: 'https://your-keycloak-server/realms/edfi',
      clientId: 'edfiadminapp',
      clientSecret: 'your-client-secret',
      scope: '',
     },
     // If your IdP has enabled PCKE, set to true
     USE_PKCE: true,
     //this should match with a user in your IdP
     ADMIN_USERNAME: 'admin@example.com',

     FE_URL: FE_URL,
     // The site you have create in the '4. Create IIS Website' step
     MY_URL: 'http://localhost:3333',
     // The port must be match with the port you have set for the site
     API_PORT: process.env.PORT || 3333,
     WHITELISTED_REDIRECTS: [FE_URL],
     // The time to live in milliseconds
     RATE_LIMIT_TTL: 60000,
     // The maximum number of requests within the ttl
     RATE_LIMIT_LIMIT: 10,
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
   ├── node_modules\ (complete folder after running the `npm ci` command in source code)
   ├── packages\api\config (with your config files production.js and default.js)
   └── iisnode\ (log directory)
   ```

   :::

### Critical Success Factors

**URL Rewrite Rules are Essential**: The `<rewrite>` section in web.config is **critical** for proper routing. Without these rules:

- API requests like `/api/*` will return 404 errors
- IIS will try to serve requests as static files instead of routing them to Node.js
- The Node.js application won't receive dynamic requests

**Handler Order Matters**: When configuring handlers in IIS Manager, ensure the iisnode handler with path `*` is at the **top** of the handler mappings list, above the StaticFile handler.

See [Troubleshooting](../troubleshooting.md#backend-troubleshooting) section in case you have errors.

## Frontend Installation

1. We will need to build the frontend, to do so go to `packages/fe` folder of your source code, copy or rename the file `.copyme.env.local` to create `.env` and modify the values depending on your environment. This is an example:

   ```xml
   VITE_API_URL=http://localhost:3333
   VITE_OIDC_ID=1
   VITE_BASE_PATH="/"
   VITE_HELP_GUIDE=https://docs.ed-fi.org/reference/admin-app
   VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/configuration/global-administration-tasks
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
   This should point to the **account management interface** (`/realms/{realm-name}/account/`), not the admin console.
   Ensure this matches your actual Keycloak realm configuration and domain.
   :::

2. **Build the frontend**:

   ```powershell
   # Go to the cloned folder
   cd Ed-Fi-AdminApp
   # Build the frontend
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

   Create a `web.config` file in the path (eg. `C:\inetpub\EdFi-AdminApp-FE`) with the following content:

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

See [Troubleshooting](../troubleshooting.md#frontend-troubleshooting) section in case you have errors.

## Next steps

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
