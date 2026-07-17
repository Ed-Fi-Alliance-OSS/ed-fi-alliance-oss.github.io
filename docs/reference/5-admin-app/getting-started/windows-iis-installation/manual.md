---
sidebar_position: 4
---

# Manual

This page documents the full manual Windows/IIS installation — every prerequisite, both IIS sites, and the exact `web.config` and `production.js` that a working install contains. It is the authoritative reference for what gets configured; the [Automated](./automated.md) and [Semi-automated](./semi-automated.md) paths produce the same result.

## Windows Prerequisites

Prepare the following on the Windows host before deploying the API and frontend. Each item is detailed in its own subsection below.

- **[Operating-system components](#operating-system-components-iis-sql-server-git)** — IIS (**version 10 or newer**), SQL Server, and, optionally, Git.
- **[IIS modules](#iis-modules)** — the URL Rewrite Module and an httpPlatform handler.
- **[Database](#database)** — SQL Server (default) or PostgreSQL.
- **[Node.js](#nodejs)** — the major version pinned in the Admin App's `package.json` (currently `>=22`).
- **[Identity provider](../../configuration/identity-provider.md)** — an OIDC provider; this guide uses a local Keycloak example.
- **[TLS certificate](#tls-and-certificates)** — a CA-issued certificate, or a self-signed one for local use.
- **[Yopass](../../configuration/yopass-administrators-guide/readme.md)** (optional) — for one-time credential links.

### Operating system components (IIS, SQL Server, Git)

- **IIS**: Enable the IIS web server role and management tools. From an elevated PowerShell:

  ```powershell
  Enable-WindowsOptionalFeature -Online -All -FeatureName `
    IIS-WebServerRole, IIS-WebServer, IIS-WebServerManagementTools, `
    IIS-ManagementConsole, IIS-RequestFiltering, IIS-StaticContent, `
    IIS-DefaultDocument, IIS-HttpErrors, IIS-HttpRedirect
  ```

- **SQL Server**: Install SQL Server (the Developer or Express edition is fine for local use). See [Microsoft SQL Server downloads](https://www.microsoft.com/sql-server/sql-server-downloads).
- **Git**: Optional, used to clone the Admin App repository. See [git-scm.com](https://git-scm.com/).

### IIS modules and configuration (URL Rewrite + httpPlatform handler) {#iis-modules}

IIS hosts the Node.js API through the **httpPlatform handler**: IIS acts as a reverse proxy, launching the Node process (`main.js`) and forwarding requests to a loopback port it assigns via the `HTTP_PLATFORM_PORT` environment variable.

1. Install the [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite). It is used for the HTTP→HTTPS redirect and the frontend's SPA fallback.
2. Install an httpPlatform handler. Two are compatible, and both register the same `httpPlatformHandler` module name:
   - **HttpBridge** — the [LeXtudio fork](https://github.com/lextudio/httpbridge) (MIT, actively maintained).
   - **Microsoft HttpPlatformHandler** — the [original v1.2](https://www.iis.net/downloads/microsoft/httpplatformhandler) (signed, stable, frozen since ~2016).
3. **Unlock the handlers configuration section** so the application's `web.config` can register the handler. From an elevated PowerShell:

   ```powershell
   & "$env:SystemRoot\System32\inetsrv\appcmd.exe" unlock config -section:system.webServer/handlers
   ```

:::warning
Without unlocking the `handlers` section, requests to the API return **HTTP 500.19**. Unlocking it lets the `httpPlatformHandler` handler ship in the deployed `web.config`.
:::

### Database

The Admin App supports PostgreSQL 16+ and SQL Server 2017+, and needs only one. This guide uses **SQL Server** by default on Windows; PostgreSQL is available via Docker (requires Docker Desktop in Linux-container mode).

For SQL Server:

1. Enable **Mixed Mode (SQL Server and Windows) authentication** (the Node `mssql` driver connects with SQL authentication).
2. Enable the **TCP/IP** protocol and confirm it listens on port **1433** (the driver requires TCP).
3. Enable the **`sa`** login and set a password. `sa` is used **only for setup** (enabling Mixed Mode and creating the database and app login); the Admin App itself does not connect as `sa`.
4. Create an empty database. This guide uses the name **`sbaa`**.
5. Create a dedicated least-privilege login for the Admin App to connect as. It is `db_owner` on the Admin App database **only** and holds no server-level role (it is not a sysadmin like `sa`). `db_owner` — rather than just `db_datareader`/`db_datawriter` — is required because the app creates and migrates its own schema on startup.

   ```sql
   CREATE LOGIN [edfi_adminapp] WITH PASSWORD = N'YourStrong!AppPassw0rd', CHECK_POLICY = ON;
   USE [sbaa];
   CREATE USER [edfi_adminapp] FOR LOGIN [edfi_adminapp];
   ALTER ROLE db_owner ADD MEMBER [edfi_adminapp];
   ```

   This login and its password become `MSSQL_DB_USERNAME` / `MSSQL_DB_PASSWORD` in `production.js`. `CHECK_POLICY = ON` enforces the Windows password policy, so use a strong password (length ≥ 8 and at least 3 of: uppercase, lowercase, digit, symbol).

:::note
Installing the Admin App database in its own SQL Server instance, separate from the ODS/API databases (`EdFi_Admin`, `EdFi_Security`), is recommended.
:::

For PostgreSQL, see [Configuring the Admin App](../../configuration/configuring-admin-app.md).

### Node.js

Install the Node.js major version pinned in the Admin App's `package.json` (`engines.node`, currently `>=22`) from [nodejs.org](https://nodejs.org/).

### Identity provider

This guide uses **Keycloak**, running locally, as the example OIDC identity provider. Install a supported LTS JDK — Keycloak 26.6 supports OpenJDK 17, 21, or 25 — then download and start [Keycloak](https://www.keycloak.org/) and create the `edfi` realm, the `edfiadminapp` confidential client, and a test user.

:::note
Register these in the Keycloak client (HTTPS, matching the default ports):

- Redirect URI: `https://localhost:3443/api/auth/callback/<oidc-id>`
- Post-logout redirect URI: `https://localhost:3443/api/auth/post-logout`
- Web origin: `https://localhost:4443`

`<oidc-id>` is the id of the row in the `oidc` database table (it is not always `1`; resolve it from that table). A user must exist in Keycloak whose email/username claim matches the Admin App admin user (default `admin@example.com`). Java is required **only** for the local Keycloak example.
:::

For more detail, see [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md).

### Yopass (optional)

Yopass lets the Admin App share newly created API client credentials as one-time, self-destructing links instead of showing them inline. Stand up a local Yopass via Docker, point the app at an existing Yopass, or leave it disabled (credentials are then shown inline, a supported configuration). See the [Yopass Administrator Guide](../../configuration/yopass-administrators-guide/readme.md).

### TLS and certificates

Both IIS sites are served over HTTPS (API `:3443`, frontend `:4443`). Each also keeps an HTTP binding (`:3333` / `:4200`) that returns a 301 redirect to its HTTPS URL. Use a CA-issued certificate where you can; for local use, a self-signed certificate (CN/SAN `localhost` plus the machine name) is sufficient. Place the certificate in `LocalMachine\My` and bind it to each site's HTTPS binding.

:::warning
A self-signed certificate is auto-trusted **only on this machine**; other machines browsing to it still see a trust warning. Supply a real certificate (thumbprint or PFX) for anything beyond this host.
:::

To configure TLS manually, generate or obtain a certificate and place it in `LocalMachine\My`. For a self-signed certificate (local use), from an elevated PowerShell:

```powershell
New-SelfSignedCertificate -DnsName 'localhost', $env:COMPUTERNAME `
  -CertStoreLocation Cert:\LocalMachine\My -FriendlyName 'Ed-Fi Admin App'
```

Then add an HTTPS binding to each IIS site (in IIS Manager, or with `New-WebBinding` + `New-Item IIS:\SslBindings`), selecting that certificate.

### Verify prerequisites

Before deploying, confirm the prerequisites above are in place and that the four ports the two sites use — **3333**, **4200**, **3443**, and **4443** — are free.

## Backend API Installation

The API is deployed as a standalone IIS site, `EdFi-AdminApp-API`, with an HTTP binding on port 3333 and an HTTPS binding on port 3443; the HTTP binding only 301-redirects to HTTPS. IIS hosts the Node.js process through the **httpPlatform handler** (reverse proxy), which comes from [IIS modules and configuration](#iis-modules).

1. **Build the application**:

   :::note
   Always install from a **stable release tag**, not the default `main` branch (which reflects active development). Find the **latest stable release tag** on the [Releases page](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases), then use it below.
   :::

   ```powershell
   # Replace the TAG value with the latest release from the Releases page
   $TAG = "v4.0.1"

   git clone --branch $TAG --depth 1 https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp.git
   cd Ed-Fi-AdminApp
   npm ci --legacy-peer-deps
   npm run build:api
   ```

2. **Create a folder for the website and copy three pieces into it**:

   Create a dedicated folder for the API, for example `C:\inetpub\EdFi-AdminApp-API` (a standalone directory, not nested under another site's root), and copy in:
   - The `main.js` file and `assets` folder from `dist/packages/api/` (the build output).
   - The `packages/api/config` folder from the source. It contains `production.js-edfi`, the configuration template you will base `production.js` on in step 6.
   - The `node_modules` folder from the repository root (after `npm ci --legacy-peer-deps`).

3. **Create the IIS site and its Application Pool**:

   Create a standalone IIS site (not an application nested under another site):
   - Open IIS Manager, right-click **Sites**, and choose **Add Website**.
   - **Site name**: `EdFi-AdminApp-API`
   - **Physical path**: the folder from step 2 (for example `C:\inetpub\EdFi-AdminApp-API`)
   - **Binding**: type **http**, port **3333**
   - Leave **Host name** blank for localhost testing.

   Then, on the site's Application Pool (`EdFi-AdminApp-API`):
   - Set **.NET CLR version** to **No Managed Code**.
   - Under **Advanced Settings**, set **Load User Profile** to **True**.

4. **Add the HTTPS binding**:

   Add a second binding to the site: type **https**, port **3443**, and select a certificate. See [TLS and certificates](#tls-and-certificates) for how to obtain one (a self-signed certificate is fine for local use). The HTTP binding on 3333 remains only to redirect to HTTPS.

5. **Configure `web.config`**:

   Create a `web.config` in the same directory as `main.js`. IIS forwards every request to the Node process that the httpPlatform handler launches; the rewrite rule redirects HTTP to HTTPS.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="HTTP to HTTPS redirect" stopProcessing="true">
             <match url="(.*)" />
             <conditions>
               <add input="{HTTPS}" pattern="off" />
               <add input="{HTTP_HOST}" pattern="^([^:]+)(:\d+)?$" />
             </conditions>
             <action type="Redirect" url="https://{C:1}:3443/{R:1}" redirectType="Permanent" appendQueryString="true" />
           </rule>
         </rules>
       </rewrite>
       <handlers>
         <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" />
       </handlers>
       <httpPlatform processPath="C:\Program Files\nodejs\node.exe" arguments="main.js" stdoutLogEnabled="true" stdoutLogFile=".\logs\node-stdout.log" startupTimeLimit="60">
         <environmentVariables>
           <environmentVariable name="NODE_ENV" value="production" />
         </environmentVariables>
       </httpPlatform>
       <httpProtocol>
         <customHeaders>
           <remove name="X-Powered-By" />
           <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
           <add name="Referrer-Policy" value="no-referrer" />
           <add name="Content-Security-Policy" value="default-src 'none'; frame-ancestors 'none'; base-uri 'none'" />
         </customHeaders>
       </httpProtocol>
       <httpErrors errorMode="DetailedLocalOnly" />
     </system.webServer>
   </configuration>
   ```

   :::note
   Key details in this `web.config`:

   - The `httpPlatformHandler` handler is declared here, which works because the `handlers` section was unlocked in [IIS modules and configuration](#iis-modules). If it is still locked, the API returns HTTP 500.19.
   - `processPath` must point at a **machine-wide** `node.exe` (for example `C:\Program Files\nodejs\node.exe`). The App Pool virtual account cannot execute a Node installed under a user profile (an nvm-windows default), which fails with HTTP 502.5 / Access Denied.
   - httpPlatform passes the loopback port it assigns to Node in the `HTTP_PLATFORM_PORT` environment variable; the app reads it in step 6 (`API_PORT`).
   - The security headers are a baseline. The API also sets `X-Content-Type-Options` and `X-Frame-Options` in-app, so they are not repeated here.
   :::

6. **Configure the environment (`production.js`)**:

   Copy `production.js-edfi` to `production.js` in `packages/api/config`, then set the values. The example below is a local SQL Server install with the local Keycloak example identity provider.

   ```javascript
   // Frontend URL from the 'Frontend Installation' section (HTTPS).
   const FE_URL = 'https://localhost:4443';

   module.exports = {
     DB_ENGINE: 'mssql', // 'mssql' (this guide) or 'pgsql'
     DB_TRUST_CERTIFICATE: true, // true for a local SQL Server using a self-signed certificate
     DB_TTL_IN_MINUTES: 120,
     DB_SSL: false,
     DB_SECRET_VALUE: {
       MSSQL_DB_HOST: 'localhost',
       MSSQL_DB_PORT: 1433,
       MSSQL_DB_USERNAME: 'edfi_adminapp', // the least-privilege login, not sa
       MSSQL_DB_DATABASE: 'sbaa', // the database must already exist on the server
       MSSQL_DB_PASSWORD: 'YourStrong!AppPassw0rd',
     },
     DB_ENCRYPTION_SECRET_VALUE: {
       // Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
       KEY: 'your-64-hex-char-encryption-key',
     },

     // Verify TLS certificates on the API's OUTBOUND calls to the ODS/API, Admin API,
     // and Yopass. Keep true. If a local ODS/API presents a self-signed certificate,
     // adding an Environment fails with a certificate error; make Node trust it via
     // NODE_EXTRA_CA_CERTS rather than turning this off.
     SSL_VERIFICATION: true,

     // Yopass: set USE_YOPASS true with a YOPASS_URL to share credentials as one-time
     // links. Leave false to show newly created credentials inline (a supported configuration).
     USE_YOPASS: false,
     YOPASS_URL: '',

     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'http://localhost:8080/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api',
     },

     // Identity provider (OIDC). The values below are the local Keycloak example.
     SAMPLE_OIDC_CONFIG: {
       issuer: 'http://localhost:8080/realms/edfi',
       clientId: 'edfiadminapp',
       clientSecret: 'your-client-secret',
       scope: 'openid email profile',
     },
     USE_PKCE: true,
     ADMIN_USERNAME: 'admin@example.com', // must match a user in your IdP

     FE_URL: FE_URL,
     MY_URL: 'https://localhost:3443', // the API site's HTTPS URL
     API_PORT: process.env.HTTP_PLATFORM_PORT || 3333, // httpPlatform assigns the port
     WHITELISTED_REDIRECTS: [FE_URL],
     RATE_LIMIT_TTL: 60000,
     RATE_LIMIT_LIMIT: 10,
   };
   ```

7. **Create the log directory**:
   - Create `C:\inetpub\EdFi-AdminApp-API\logs` (httpPlatform writes Node's stdout to `logs\node-stdout.log`).
   - Grant the App Pool identity (`IIS APPPOOL\EdFi-AdminApp-API`) modify rights over `logs\` and over `packages\`.

   :::note
   The deployed directory should look like this:

   ```text
   C:\inetpub\EdFi-AdminApp-API\
   ├── assets\              (built API assets)
   ├── main.js              (built entry point)
   ├── web.config
   ├── node_modules\        (full folder, from npm ci)
   ├── packages\api\config\ (production.js and the production.js-edfi template)
   └── logs\                (Node stdout log directory)
   ```

   :::

8. **Set the App-Pool npm cache (if npm runs under the pool)**:

   If npm runs under the App Pool and fails to write its cache, set `NPM_CONFIG_CACHE` on the `EdFi-AdminApp-API` App Pool's environment (an IIS 10+ feature) to a writable folder such as `C:\npm-cache`, and grant that identity write access.

### Critical success factors

- **`node.exe` must be machine-wide.** The App Pool virtual account cannot execute a Node under a user profile; that fails with HTTP 502.5. Install Node to `C:\Program Files\nodejs`.
- **The `handlers` section must be unlocked.** The `httpPlatformHandler` handler is declared in `web.config`; if the section is still locked at the server level, the API returns HTTP 500.19. See [IIS modules and configuration](#iis-modules).
- **`API_PORT` must read `HTTP_PLATFORM_PORT`.** httpPlatform assigns the loopback port at runtime; a hard-coded port makes IIS and Node disagree and the site returns 502.
- **The HTTPS binding needs a certificate.** Without one bound to port 3443, the site cannot start over HTTPS. See [TLS and certificates](#tls-and-certificates).

See the [Troubleshooting](../../troubleshooting.md#backend-troubleshooting) section if you hit errors.

## Frontend Installation

The frontend is a Vite single-page application, deployed as a second standalone IIS site, `EdFi-AdminApp-FE`, with an HTTP binding on port 4200 and an HTTPS binding on port 4443; the HTTP binding only 301-redirects to HTTPS.

1. **Configure the build-time environment (`.env`)**:

   In `packages/fe`, copy `.copyme.env.local` to `.env` and set the values for your environment:

   ```text
   VITE_API_URL=https://localhost:3443
   VITE_OIDC_ID=1
   VITE_BASE_PATH="/"
   VITE_HELP_GUIDE=https://docs.ed-fi.org/reference/admin-app
   VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/configuration/global-administration-tasks
   VITE_CONTACT=https://community.ed-fi.org/
   VITE_APPLICATION_NAME="Ed-Fi Admin App"
   VITE_IDP_ACCOUNT_URL=http://localhost:8080/realms/edfi/account/
   ```

   **Environment variable descriptions:**
   - `VITE_API_URL`: Backend API endpoint (the API site's HTTPS URL, `https://localhost:3443`).
   - `VITE_OIDC_ID`: OpenID Connect configuration ID from the database (the id of the `oidc` row; must match the redirect-URI callback id).
   - `VITE_BASE_PATH`: URL path the app is served from. Keep it `"/"`: the frontend is served from the root of its own site.
   - `VITE_HELP_GUIDE`: URL to general help documentation.
   - `VITE_STARTING_GUIDE`: URL to the getting-started / system administrator guide.
   - `VITE_CONTACT`: URL to a community support or contact page.
   - `VITE_APPLICATION_NAME`: Display name shown in the UI.
   - `VITE_IDP_ACCOUNT_URL`: Identity provider account-management page URL.

   :::warning
   These values are baked into the bundle at build time, so set `.env` **before** building (step 2); changing it afterward has no effect. For the local Keycloak example, `VITE_IDP_ACCOUNT_URL` is the account-management interface (`/realms/{realm-name}/account/`), not the admin console.
   :::

2. **Build the frontend**:

   ```powershell
   # From the cloned repository
   cd Ed-Fi-AdminApp
   npm run build:fe
   ```

3. **Create the website folder**:

   Create a dedicated folder, for example `C:\inetpub\EdFi-AdminApp-FE`, and copy into it the `index.html` file and the `assets` folder from `dist/packages/fe/`.

4. **Create the IIS site**:

   Create a standalone IIS site (not nested under another site):
   - Open IIS Manager, right-click **Sites**, and choose **Add Website**.
   - **Site name**: `EdFi-AdminApp-FE`
   - **Physical path**: the folder from step 3 (for example `C:\inetpub\EdFi-AdminApp-FE`)
   - **Binding**: type **http**, port **4200**
   - Leave **Host name** blank for localhost testing.

5. **Add the HTTPS binding**:

   Add a second binding: type **https**, port **4443**, and select a certificate (the same one used for the API is fine). See [TLS and certificates](#tls-and-certificates).

6. **Configure `web.config`**:

   Create a `web.config` in the site folder. It redirects HTTP to HTTPS, falls back client-side routes to `index.html`, and sets the frontend's security headers.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="HTTP to HTTPS redirect" stopProcessing="true">
             <match url="(.*)" />
             <conditions>
               <add input="{HTTPS}" pattern="off" />
               <add input="{HTTP_HOST}" pattern="^([^:]+)(:\d+)?$" />
             </conditions>
             <action type="Redirect" url="https://{C:1}:4443/{R:1}" redirectType="Permanent" appendQueryString="true" />
           </rule>
           <rule name="React Routes" stopProcessing="true">
             <match url=".*" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
             </conditions>
             <action type="Rewrite" url="index.html" />
           </rule>
         </rules>
       </rewrite>
       <httpProtocol>
         <customHeaders>
           <remove name="X-Powered-By" />
           <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
           <add name="X-Content-Type-Options" value="nosniff" />
           <add name="X-Frame-Options" value="DENY" />
           <add name="Referrer-Policy" value="no-referrer" />
           <add name="Content-Security-Policy" value="default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://localhost:3443; form-action 'self'" />
         </customHeaders>
       </httpProtocol>
     </system.webServer>
   </configuration>
   ```

   :::note
   The `connect-src` in the Content-Security-Policy must name the exact API origin the bundle calls (`VITE_API_URL`), or the browser blocks the frontend's API requests. Here it is `https://localhost:3443`.
   :::

   :::note
   If your web fonts fail to load (HTTP 404 for `.woff2` files), your IIS may be missing that MIME type. See [Troubleshooting](../../troubleshooting.md#frontend-troubleshooting).
   :::

See the [Troubleshooting](../../troubleshooting.md#frontend-troubleshooting) section if you hit errors.

## Security headers

Both IIS sites emit a baseline set of response headers (shown in each site's `web.config` above) and remove `X-Powered-By`. Both send `Strict-Transport-Security` (HSTS) and `Referrer-Policy`, and each carries an **enforcing** `Content-Security-Policy`:

- **API** — `default-src 'none'`, since it serves only JSON in production (Swagger UI is disabled there).
- **Frontend** — allows its own origin plus the API origin in `connect-src`; `style-src` allows `'unsafe-inline'` because the UI framework injects styles at runtime.

The API additionally sets `X-Content-Type-Options` and `X-Frame-Options` in application code. Adjust these headers if you place the sites behind a reverse proxy that sets its own.

## Production considerations

The default install is suitable for a local or trusted-network deployment. Before exposing the Admin App more broadly:

- **Use a CA-issued certificate.** The default self-signed certificate is trusted only on the install host. Bind a CA-issued certificate (see [TLS and certificates](#tls-and-certificates)) so other machines trust the sites without warnings.
- **Do not run the example Keycloak in production.** The local Keycloak example runs in `start-dev` (HTTP, embedded H2 database, hostname strictness off) and is for local development only. For production, run `kc.bat start` with `--hostname`, a real database, and TLS — or use your own OIDC provider.
- **Keep upstream TLS verification on.** `SSL_VERIFICATION` defaults to `true`, so the API verifies the certificate of the ODS/API and Admin API it calls. If an upstream presents a self-signed or dev certificate, make Node trust it rather than disabling verification:
  1. Export the upstream's certificate (or its issuing CA) to a PEM file (`.crt`/`.pem`).
  2. Set `NODE_EXTRA_CA_CERTS` to that file's path for the API process — add an `<environmentVariable name="NODE_EXTRA_CA_CERTS" value="C:\path\to\upstream-ca.crt" />` inside `<httpPlatform><environmentVariables>` in the API site's `web.config` (next to `NODE_ENV`), or set it on the `EdFi-AdminApp-API` App Pool's environment.
  3. Restart the API site so Node re-reads the value.

  On Node 22.15+ you can instead set `NODE_OPTIONS=--use-system-ca`, which honors the Windows certificate store.
- **Review secrets handling.** A manual install keeps credentials in `production.js`. Protect or rotate them per your policy.
- **Harden the database and App Pool identities.** This guide already connects as a least-privilege SQL login (`edfi_adminapp`, not `sa`); keep that separation in production.

## Uninstall

To remove a manual install, reverse the steps:

- In IIS Manager, remove the `EdFi-AdminApp-API` and `EdFi-AdminApp-FE` sites and their App Pool.
- Delete the deployed folders (for example `C:\inetpub\EdFi-AdminApp-API` and `C:\inetpub\EdFi-AdminApp-FE`), and the npm cache folder if you created one.
- Drop the `sbaa` database and the `edfi_adminapp` login.
- If you set up the local Keycloak example, stop its process, delete its install directory, and unset the machine `JAVA_HOME` (the JDK can stay installed).

Node.js, SQL Server, and IIS can remain in place.

## Next steps

The Admin App is now running, but it manages **Ed-Fi ODS/API** instances that run separately — this guide does not install an ODS/API. To start using the Admin App, sign in and connect a running ODS/API environment (ODS/API 6.x or 7.x) by its Discovery API URL.

:::note First sign-in
Open the frontend at `https://localhost:4443` and sign in through the identity provider. For the local Keycloak example, use the Keycloak user you created — its email must match `ADMIN_USERNAME` in `production.js` (default `admin@example.com`). This first user is the bootstrap administrator; additional users must be granted access from within the Admin App afterward.
:::

:::note
If the ODS/API or Admin API presents a self-signed or dev certificate — common for a local ODS/API — adding an Environment fails with a certificate error (`DEPTH_ZERO_SELF_SIGNED_CERT`) in the API log (`logs\node-stdout.log`). Make Node trust the upstream certificate via `NODE_EXTRA_CA_CERTS`; see [Production considerations](#production-considerations).
:::

- [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md)
- [Security Considerations](../../configuration/security-considerations.md)
- [Global Administration Tasks](../../configuration/global-administration-tasks.md)
