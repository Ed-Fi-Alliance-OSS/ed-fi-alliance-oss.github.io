---
sidebar_position: 3
---

# Windows IIS Installation

This page describes how to install the Ed-Fi Admin App on Windows using Internet Information Services (IIS). It covers the backend API and the frontend single-page application, deployed as two standalone IIS sites.

:::note
This is one of three alternative installation paths. If you instead want to run the Admin App in containers or on a Unix-like server, see [Docker Compose Installation](./docker-installation.md) or [Unix-like Systems Installation](./unix-installation.md).
:::

Every section can be completed **manually** or with an **optional PowerShell script** that automates it. The scripts ship in the Admin App repository under `windows-install/`. You can mix the two: automate some sections, do others by hand.

## Before you start: decide three things

1. **Database engine** — SQL Server (default) or PostgreSQL.
2. **Identity provider (IdP)** — Keycloak running locally (the example IdP, with a setup script), Microsoft Entra ID, Google Workspace, or any other OIDC provider. The Admin App's auth engine is provider-agnostic (generic OIDC discovery); Keycloak is only the example.
3. **Manual or automated** — follow the manual steps in each section, or run the script that automates it.

:::info
The steps below set up HTTP bindings on ports 3333 (API) and 4200 (frontend). For a production deployment, add TLS as described in [Production considerations](#production-considerations). **IIS 10 or newer is required.**
:::

## Fast path: automation scripts

To automate, clone the Admin App repository at a stable release tag and run the scripts in `windows-install/` from an elevated PowerShell, in the order below. Each script maps to a manual section later on this page; any script can be skipped in favor of its manual steps.

| Order | Script | What it automates | Manual section |
| --- | --- | --- | --- |
| 0 (fresh VM) | `setup-vm-prereqs.ps1` | OS-level installs: IIS feature set, SQL Server Developer, Git. Scans first, installs only what is missing; also sets the execution policy and unblocks the scripts. | Windows Prerequisites |
| 1 | `01-prereqs-iis.ps1` | URL Rewrite Module + iisnode; unlocks the `handlers` section and allows the `HTTP_X_ORIGINAL_URL` server variable. | Windows Prerequisites |
| 2 | `02-prereqs-sql.ps1` | SQL Server Mixed Mode + TCP/IP + `sa`; creates the `sbaa` database. | Windows Prerequisites |
| 3 | `03-prereqs-node.ps1` | Installs Node.js LTS; remediates a too-old Node via nvm-windows. | Windows Prerequisites |
| 4 | `04-build.ps1` | `npm ci` + build API + build frontend. Seeds the frontend `.env` before building. | Backend API / Frontend |
| 5 | `05-deploy-api.ps1` | Deploys the API as standalone site `EdFi-AdminApp-API` (HTTP :3333): web.config, App Pool, `production.js`, App-Pool-scoped npm cache. | Backend API |
| 6 | `06-deploy-fe.ps1` | Deploys the frontend as standalone site `EdFi-AdminApp-FE` (HTTP :4200). | Frontend |
| verify | `00-check-prereqs.ps1` | Read-only diagnostic: IIS (and version), database, Node, build artifacts, ports 3333/4200 free. | Run before starting |
| optional | `idp-keycloak-setup.ps1` | Installs a JDK, downloads and starts a local Keycloak, provisions realm `edfi`, client `edfiadminapp`, and a test user. | Identity Provider |
| optional | `idp-keycloak-start.ps1` | Restarts the local Keycloak (e.g. after a reboot). | Identity Provider |
| optional | `yopass-docker.ps1` | Stands up a local Yopass via Docker. | Yopass |
| optional | `install-all.ps1` | Runs the whole sequence end to end, including the IdP chosen with `-IdpProvider keycloak\|microsoft\|google`. | (whole page) |

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and unsets `JAVA_HOME`; leaves the JDK installed).

## Run everything at once

To install the whole stack in one command, `install-all.ps1` runs the entire sequence end to end: the pre-flight check, all prerequisites, the build, the identity-provider setup, both deployments, and a smoke test. This is the fastest path; the manual sections below are for installing a piece by hand or understanding what each step does.

On a fresh machine, run `setup-vm-prereqs.ps1` first (it installs the OS-level pieces: IIS, SQL Server, Git), then `install-all.ps1`. Run both from an elevated PowerShell in the `windows-install` folder, and choose the identity provider with the mandatory `-IdpProvider` parameter.

Local Keycloak example (SQL Server):

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -SaPassword 'YourStrong!Passw0rd' `
  -KeycloakAdminPassword 'admin' `
  -OidcClientSecret 'your-client-secret' `
  -TestUserPassword 'TestUser123!'
```

This also stands up the local Keycloak (realm `edfi`, client `edfiadminapp`, and a test user) as part of the run.

External provider (Microsoft Entra ID shown; Google is similar):

```powershell
.\install-all.ps1 -IdpProvider microsoft `
  -SaPassword 'YourStrong!Passw0rd' `
  -OidcIssuer 'https://login.microsoftonline.com/<tenant-id>/v2.0' `
  -OidcClientId '<application-id>' `
  -OidcClientSecret 'your-client-secret' `
  -AdminUsername 'you@yourtenant.onmicrosoft.com'
```

For an external provider, register the redirect/origin URIs first (see [Identity provider](#identity-provider) below). The script validates the issuer's OIDC discovery endpoint and prints the URIs to register. Required parameters vary by provider: `-OidcClientSecret` and `-OidcClientId` are always required; `-OidcIssuer` is required for `microsoft` (defaulted for `google`).

:::note
Yopass is off by default. Add `-SetupYopassDocker` to stand up a local Yopass via Docker, or `-YopassUrl <url>` to point at an existing one.
:::

The script is idempotent: if a step fails, fix the cause and re-run. `-SkipPhase1` (skip prerequisites) and `-SkipPhase2` (skip build) speed up re-runs.

## Windows Prerequisites

:::tip Automation shortcut
On a fresh VM, `setup-vm-prereqs.ps1` installs the operating-system pieces (the IIS feature set, SQL Server, Git). Then automate the rest with `01-prereqs-iis.ps1`, `02-prereqs-sql.ps1`, and `03-prereqs-node.ps1`, plus the identity provider below. Or follow the manual steps in each subsection. **IIS 10 or newer is required.**
:::

### Operating system components (IIS, SQL Server, Git)

_Automated by `setup-vm-prereqs.ps1` (scans first, installs only what is missing)._

- **IIS**: Enable the IIS web server role and management tools. From an elevated PowerShell:

  ```powershell
  Enable-WindowsOptionalFeature -Online -All -FeatureName `
    IIS-WebServerRole, IIS-WebServer, IIS-WebServerManagementTools, `
    IIS-ManagementConsole, IIS-RequestFiltering, IIS-StaticContent, `
    IIS-DefaultDocument, IIS-HttpErrors, IIS-HttpRedirect
  ```

- **SQL Server**: Install SQL Server (the Developer or Express edition is fine for local use). See [Microsoft SQL Server downloads](https://www.microsoft.com/sql-server/sql-server-downloads).
- **Git**: Optional, used to clone the Admin App repository. See [git-scm.com](https://git-scm.com/).

### IIS modules and configuration (URL Rewrite + iisnode)

_Automated by `01-prereqs-iis.ps1` (assumes the IIS role above is already installed)._

1. Install the [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite).
2. Install [iisnode](https://github.com/Azure/iisnode/releases) (the build that runs Node.js applications under IIS).
3. **Unlock the handlers configuration section** so the application's `web.config` can register the iisnode handler. From an elevated PowerShell:

   ```powershell
   & "$env:SystemRoot\System32\inetsrv\appcmd.exe" unlock config -section:system.webServer/handlers
   ```

4. **Allow the `HTTP_X_ORIGINAL_URL` server variable** at the server level; the API's rewrite rule sets it so iisnode forwards the original path to the application.

:::warning
Without unlocking the `handlers` section, requests to the API return **HTTP 500.19 (0x80070021)**. Unlocking it lets the iisnode handler ship in the deployed `web.config`, which replaces the older approach of adding the handler mapping by hand in IIS Manager.
:::

### Database

_Automated by `02-prereqs-sql.ps1` (SQL Server path)._

This guide uses **SQL Server** in its examples. PostgreSQL is also supported (see [Configuring the Admin App](../configuration/configuring-admin-app.md)); the automated PostgreSQL path runs through `install-all.ps1 -DbEngine pgsql`.

For SQL Server:

1. Enable **Mixed Mode (SQL Server and Windows) authentication**.
2. Enable the **TCP/IP** protocol and confirm it listens on port **1433**.
3. Enable the **`sa`** login and set a password.
4. Create an empty database. This guide uses the name **`sbaa`**.

### Node.js

_Automated by `03-prereqs-node.ps1` (installs LTS; upgrades a too-old version via nvm-windows)._

Install the current **Node.js LTS** from [nodejs.org](https://nodejs.org/). The Admin App requires the major version pinned in its `package.json` (`engines.node`).

:::note
The npm cache override the API needs under iisnode is configured later, on the API Application Pool, by `05-deploy-api.ps1` — not here.
:::

### Identity provider

The Admin App authenticates against an OIDC identity provider. Choose one:

- **Keycloak (local example)** — _automated by `idp-keycloak-setup.ps1`_, which installs a JDK, downloads and starts Keycloak, and provisions the `edfi` realm, the `edfiadminapp` client, and a test user. To do it manually: install a JDK (Java 17 or 21), download and start [Keycloak](https://www.keycloak.org/), then create the realm, a confidential client, and a user.
- **Microsoft Entra ID** — register an application in the Entra portal; collect the issuer, client ID, and client secret.
- **Google Workspace** — configure OAuth credentials in the Google admin console.

:::note
For any external provider, register these in its OIDC client:

- Redirect URI: `http://localhost:3333/api/auth/callback/1`
- Post-logout redirect URI: `http://localhost:3333/api/auth/post-logout`
- Web origin: `http://localhost:4200`

A user must exist in the provider whose email/username claim matches the Admin App admin user. Java is required **only** for the local Keycloak example; the external-provider paths need no Java.
:::

For more detail, see [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md).

### Yopass (optional)

_Automated by `yopass-docker.ps1`._

Yopass lets the Admin App share newly created API client credentials as one-time, self-destructing links instead of showing them inline. Stand up a local Yopass via Docker, point the app at an existing Yopass, or leave it disabled (credentials are then shown inline, a supported configuration). See the [Yopass Administrator Guide](../configuration/yopass-administrators-guide/readme.md).

### Verify prerequisites

Run the read-only diagnostic before continuing:

```powershell
.\00-check-prereqs.ps1
```

It reports IIS (and that it is version 10 or newer), the database, Node.js, build artifacts, and whether ports 3333 and 4200 are free. It does not check the identity provider.

## Backend API Installation

:::tip Automation shortcut
The build (step 1) is automated by `04-build.ps1`; the deploy (steps 2-7) by `05-deploy-api.ps1`. Or follow the manual steps.
:::

The API runs under iisnode as a standalone IIS site, `EdFi-AdminApp-API`, on HTTP port 3333. iisnode, the URL Rewrite Module, and the unlocked `handlers` section come from [Windows Prerequisites](#windows-prerequisites).

1. **Build the application**:

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

2. **Create a folder for the website**:

   Create a dedicated folder for the API, for example `C:\inetpub\EdFi-AdminApp-API` (a standalone directory, not nested under another site's root), and move the following into it:
   - The `main.js` file and `assets` folder from `dist/packages/api/`
   - The `node_modules` folder from the source repository (after running `npm ci`)
   - The `packages/api/config` folder from the source. It contains `production.js-edfi`, the configuration template you will base `production.js` on in step 5.

3. **Create the IIS site**:

   Create a standalone IIS site (not an application nested under another site):
   - Open IIS Manager, right-click **Sites**, and choose **Add Website**.
   - **Site name**: `EdFi-AdminApp-API`
   - **Physical path**: the folder from step 2 (for example `C:\inetpub\EdFi-AdminApp-API`)
   - **Binding**: type **http**, port **3333**
   - Leave **Host name** blank for localhost testing.

4. **Configure `web.config`**:

   Create a `web.config` file in the same directory as `main.js`. This is the known-good configuration: it rewrites non-file requests to `main.js`, preserves the original URL (including the query string) in `HTTP_X_ORIGINAL_URL`, and registers the iisnode handler.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="NodeJS" stopProcessing="true">
             <match url=".*" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
             </conditions>
             <serverVariables>
               <set name="HTTP_X_ORIGINAL_URL" value="/{R:0}?{QUERY_STRING}" />
             </serverVariables>
             <action type="Rewrite" url="main.js" />
           </rule>
         </rules>
       </rewrite>
       <iisnode nodeProcessCommandLine="&quot;C:\Program Files\nodejs\node.exe&quot;" watchedFiles="web.config;*.js" loggingEnabled="true" logDirectory="iisnode" debuggingEnabled="true" devErrorsEnabled="true" node_env="production" promoteServerVars="PORT" />
       <defaultDocument>
         <files>
           <clear />
           <add value="main.js" />
         </files>
       </defaultDocument>
       <httpErrors errorMode="Detailed" />
       <handlers>
         <add name="iisnode-all" path="main.js" verb="*" modules="iisnode" resourceType="Unspecified" />
       </handlers>
     </system.webServer>
   </configuration>
   ```

   :::note
   Three details in this `web.config` are required:

   - The iisnode handler is declared here, which works because the `handlers` section was unlocked in [Windows Prerequisites](#windows-prerequisites). If it is still locked, the API returns HTTP 500.19.
   - `HTTP_X_ORIGINAL_URL` keeps the query string (`?{QUERY_STRING}`); without it, the OIDC callback loses its `code`/`state` and login falls into a redirect loop.
   - The full path to `node.exe` is used because the App Pool identity does not resolve Node from the user PATH.
   :::

5. **Configure the environment (`production.js`)**:

   Create `packages/api/config/production.js`. Base it on the `production.js-edfi` template you copied in step 2; the values below are filled in for a local SQL Server install with the local Keycloak example identity provider.

   ```javascript
   // The frontend URL from the 'Frontend Installation' section. This guide uses http://localhost:4200.
   const FE_URL = 'http://localhost:4200';

   module.exports = {
     DB_ENGINE: 'mssql', // 'mssql' (this guide) or 'pgsql'
     DB_TRUST_CERTIFICATE: true, // true for a local SQL Server using a self-signed certificate
     DB_TTL_IN_MINUTES: 120,
     DB_SSL: false,
     DB_SECRET_VALUE: {
       // SQL Server. For PostgreSQL, set DB_ENGINE: 'pgsql' and the DB_* values instead.
       MSSQL_DB_HOST: 'localhost',
       MSSQL_DB_PORT: 1433,
       MSSQL_DB_USERNAME: 'sa',
       MSSQL_DB_DATABASE: 'sbaa', // The database must already exist on the server
       MSSQL_DB_PASSWORD: 'YourStrong!Passw0rd',
     },
     DB_ENCRYPTION_SECRET_VALUE: {
       // Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
       KEY: 'your-32-char-encryption-key',
     },

     // Yopass: set to true with a YOPASS_URL to share credentials as one-time links.
     // Leave false to show newly created credentials inline (a supported configuration).
     USE_YOPASS: false,
     YOPASS_URL: '',

     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'http://localhost:8080/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api',
     },

     // Identity provider (OIDC). Use the issuer, client ID, and secret from your IdP.
     // The values below are the local Keycloak example; for Entra ID or Google, use theirs.
     SAMPLE_OIDC_CONFIG: {
       issuer: 'http://localhost:8080/realms/edfi',
       clientId: 'edfiadminapp',
       clientSecret: 'your-client-secret',
       scope: 'openid email profile',
     },
     // Set to true if your IdP requires PKCE.
     USE_PKCE: true,
     // Must match a user in your IdP.
     ADMIN_USERNAME: 'admin@example.com',

     FE_URL: FE_URL,
     MY_URL: 'http://localhost:3333', // the API site created above
     API_PORT: process.env.PORT || 3333,
     WHITELISTED_REDIRECTS: [FE_URL],
     RATE_LIMIT_TTL: 60000,
     RATE_LIMIT_LIMIT: 10,
   };
   ```

6. **Set the Application Pool**:
   - In IIS Manager, open **Application Pools** and select the pool for the site (named after it: `EdFi-AdminApp-API`).
   - Set **.NET CLR version** to **No Managed Code**.
   - Under **Advanced Settings**, set **Load User Profile** to **True** (required so npm can write its cache under the App Pool identity).

   :::note
   `05-deploy-api.ps1` also sets `NPM_CONFIG_CACHE` on this App Pool's environment variables (an IIS 10+ feature), scoping the npm cache to the pool. If you configure manually and npm fails to write its cache under iisnode, set that environment variable on the pool to a writable folder such as `C:\npm-cache`.
   :::

7. **Create the iisnode log directory**:
   - Create `C:\inetpub\EdFi-AdminApp-API\iisnode`.
   - Grant the App Pool identity (`IIS APPPOOL\EdFi-AdminApp-API`) full control over it.

   :::note
   The deployed directory should look like this:

   ```text
   C:\inetpub\EdFi-AdminApp-API\
   ├── assets\              (built API assets)
   ├── main.js              (built entry point)
   ├── web.config
   ├── node_modules\        (full folder, from npm ci)
   ├── packages\api\config\ (production.js and the production.js-edfi template)
   └── iisnode\             (log directory)
   ```

   :::

### Critical success factors

- **The URL Rewrite rule is essential.** Without the `<rewrite>` section in `web.config`, API requests such as `/api/*` return 404 and IIS tries to serve them as static files instead of routing them to Node.js.
- **The `handlers` section must be unlocked.** The iisnode handler is declared in `web.config`; if the section is still locked at the server level, the API returns HTTP 500.19. See [Windows Prerequisites](#windows-prerequisites).
- **Preserve the query string.** The `HTTP_X_ORIGINAL_URL` rewrite must keep `?{QUERY_STRING}`, or the OIDC login loops.

See the [Troubleshooting](../troubleshooting.md#backend-troubleshooting) section if you hit errors.

## Frontend Installation

:::tip Automation shortcut
The `.env` and build (steps 1-2) are automated by `04-build.ps1`; the deploy (steps 3-5) by `06-deploy-fe.ps1`. Or follow the manual steps.
:::

The frontend is a Vite single-page application, deployed as a second standalone IIS site, `EdFi-AdminApp-FE`, on HTTP port 4200.

1. **Configure the build-time environment (`.env`)**:

   In `packages/fe`, copy `.copyme.env.local` to `.env` and set the values for your environment:

   ```text
   VITE_API_URL=http://localhost:3333
   VITE_OIDC_ID=1
   VITE_BASE_PATH="/"
   VITE_HELP_GUIDE=https://docs.ed-fi.org/reference/admin-app
   VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/configuration/global-administration-tasks
   VITE_CONTACT=https://community.ed-fi.org/
   VITE_APPLICATION_NAME="Ed-Fi Admin App"
   VITE_IDP_ACCOUNT_URL=http://localhost:8080/realms/edfi/account/
   ```

   **Environment variable descriptions:**
   - `VITE_API_URL`: Backend API endpoint (the API site, `http://localhost:3333`).
   - `VITE_OIDC_ID`: OpenID Connect configuration ID from the database.
   - `VITE_BASE_PATH`: URL path the app is served from. Keep it `"/"`: the frontend is served from the root of its own site.
   - `VITE_HELP_GUIDE`: URL to general help documentation.
   - `VITE_STARTING_GUIDE`: URL to the getting-started / system administrator guide.
   - `VITE_CONTACT`: URL to a community support or contact page.
   - `VITE_APPLICATION_NAME`: Display name shown in the UI.
   - `VITE_IDP_ACCOUNT_URL`: Identity provider account-management page URL.

   :::warning
   These values are baked into the bundle at build time, so set `.env` **before** building (step 2); changing it afterward has no effect. For the local Keycloak example, `VITE_IDP_ACCOUNT_URL` is the account-management interface (`/realms/{realm-name}/account/`), not the admin console. For Entra ID or Google, use that provider's account URL.
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

5. **Configure URL Rewrite for React Router**:

   Create a `web.config` in the site folder so client-side routes fall back to `index.html`:

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
             </conditions>
             <action type="Rewrite" url="index.html" />
           </rule>
         </rules>
       </rewrite>
     </system.webServer>
   </configuration>
   ```

   :::note
   If your web fonts fail to load (HTTP 404 for `.woff2` files), your IIS may be missing that MIME type. See [Troubleshooting](../troubleshooting.md#frontend-troubleshooting).
   :::

See the [Troubleshooting](../troubleshooting.md#frontend-troubleshooting) section if you hit errors.

## Production considerations

The deploy steps above (and the automation scripts) create **HTTP** bindings on ports 3333 and 4200, without TLS. That is fine for a local or trusted-network install. Before exposing the Admin App more broadly, add at least:

- **TLS**: add an HTTPS binding with a certificate to each IIS site (or front them with a reverse proxy such as IIS Application Request Routing), and update `FE_URL` / `MY_URL` / `VITE_API_URL` to the HTTPS URLs.
- **Harden the database and App Pool identities** (avoid `sa`; use least-privilege accounts).
- **Review secrets handling** (the install writes passwords into `production.js` and an `install-summary.txt`).

## Uninstall

This works the same whether you installed with the scripts or by hand, as long as you used the site names, paths, and database name from this guide.

- `uninstall.ps1` removes the generic Admin App install: the `EdFi-AdminApp-API` and `EdFi-AdminApp-FE` sites, the App Pool, the deployed directories, the `sbaa` database, the dockerized PostgreSQL/Yopass stacks (if used), and the npm cache folder. It leaves Node.js, SQL Server, and IIS in place. It prompts for confirmation; pass `-Force` for a non-interactive run, and `-SaPassword` to drop the SQL Server database over SQL authentication.
- `uninstall-keycloak.ps1` tears down the local Keycloak example: it stops the Keycloak process, deletes the Keycloak install directory, and unsets the machine `JAVA_HOME`. The JDK itself is left installed.

## Next steps

The Admin App is now running, but it manages **Ed-Fi ODS/API** instances that run separately — this guide does not install an ODS/API. To start using the Admin App, sign in and connect a running ODS/API environment (ODS/API 6.x or 7.x) by its Discovery API URL.

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
