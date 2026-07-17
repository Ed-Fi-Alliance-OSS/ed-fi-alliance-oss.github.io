---
sidebar_position: 3
---

# Windows IIS Installation

This page describes how to install the Ed-Fi Admin App on Windows using Internet Information Services (IIS). It covers the backend API and the frontend single-page application, deployed as two standalone IIS sites over HTTPS.

:::note
This is one of three alternative installation paths. If you instead want to run the Admin App in containers or on a Unix-like server, see [Docker Compose Installation](./docker-installation.md) or [Unix-like Systems Installation](./unix-installation.md).
:::

Every section can be completed **manually** or with an **optional PowerShell script** that automates it. The scripts ship in the [Admin App Installation Scripts repository](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts) under `windows-install/`. You can mix the two: automate some sections, do others by hand.

## Before you start: decide three things

1. **Database engine** — SQL Server (default) or PostgreSQL. You need only one.
2. **Identity provider (IdP)** — the Admin App authenticates against an OIDC provider. This guide sets up **Keycloak**, running locally, as the example identity provider (a setup script provisions it). The Admin App's auth engine uses generic OIDC discovery, but Keycloak is the identity provider documented for this release.
3. **Manual or automated** — follow the manual steps in each section, or run the script that automates it.

:::info
Both IIS sites are served over **HTTPS by default** — API on port **3443** and frontend on port **4443**. Each also keeps an HTTP binding (**3333** / **4200**) that returns a 301 redirect to its HTTPS URL. When no certificate is supplied, a self-signed certificate is generated and trusted on the local machine; supply a real certificate for anything beyond this host (see [TLS and certificates](#tls-and-certificates)). **IIS 10 or newer is required.**
:::

## Fast path: automation scripts

To automate, clone the [Admin App Installation Scripts repository](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts) and run the scripts in `windows-install/` from an elevated PowerShell, in the order below. Each script maps to a manual section later on this page; any script can be skipped in favor of its manual steps.

```powershell
git clone https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts.git
cd Admin-App-Installation-Scripts\windows-install
```

:::note
On a bare machine without Git, download the repository as a ZIP from GitHub (**Code → Download ZIP**) and extract it — `setup-vm-prereqs.ps1` installs Git afterward. If PowerShell refuses to run the scripts (they carry the internet Mark of the Web), `setup-vm-prereqs.ps1` unblocks them and sets the execution policy; to do it by hand, run `Get-ChildItem *.ps1 | Unblock-File` and `Set-ExecutionPolicy -Scope Process Bypass`.
:::

| Order | Script | What it automates | Manual section |
| --- | --- | --- | --- |
| 0 (fresh VM) | `setup-vm-prereqs.ps1` | OS-level installs: IIS feature set, SQL Server Developer, Git. Scans first, installs only what is missing; also sets the execution policy and unblocks the scripts. | [Windows Prerequisites](#windows-prerequisites) |
| 1 | `01-prereqs-iis.ps1` | URL Rewrite Module + the httpPlatform handler (HttpBridge by default, or Microsoft HttpPlatformHandler); unlocks the `handlers` configuration section. | [Windows Prerequisites](#windows-prerequisites) |
| 2 | `02-prereqs-sql.ps1` | SQL Server Mixed Mode + TCP/IP + `sa`; creates the `sbaa` database and a dedicated least-privilege login (`edfi_adminapp`) the app connects as. | [Windows Prerequisites](#windows-prerequisites) |
| 3 | `03-prereqs-node.ps1` | Installs Node.js (the major version pinned in `engines.node`); remediates a too-old Node via nvm-windows. | [Windows Prerequisites](#windows-prerequisites) |
| 4 | `04-build.ps1` | `npm ci` + build API + build frontend. Seeds the frontend `.env` before building. | [Backend API](#backend-api-installation) / [Frontend](#frontend-installation) |
| 5 | `05-deploy-api.ps1` | Deploys the API as standalone site `EdFi-AdminApp-API` (HTTPS :3443; HTTP :3333 redirects): web.config, App Pool, `production.js`, App-Pool-scoped npm cache. | [Backend API](#backend-api-installation) |
| 6 | `06-deploy-fe.ps1` | Deploys the frontend as standalone site `EdFi-AdminApp-FE` (HTTPS :4443; HTTP :4200 redirects). | [Frontend](#frontend-installation) |
| verify | `00-check-prereqs.ps1` | Read-only diagnostic: IIS (and version), database, Node, build artifacts, and whether ports 3333/4200/3443/4443 are free. | [Verify prerequisites](#verify-prerequisites) |
| optional | `idp-keycloak-setup.ps1` | Installs a JDK, downloads and starts a local Keycloak, provisions realm `edfi`, client `edfiadminapp`, and a test user. | [Identity provider](#identity-provider) |
| optional | `idp-keycloak-start.ps1` | Restarts the local Keycloak (e.g. after a reboot). | [Identity provider](#identity-provider) |
| optional | `yopass-docker.ps1` | Stands up a local Yopass via Docker. | [Yopass](#yopass-optional) |
| optional | `install-all.ps1` | Runs the whole sequence end to end, including the local Keycloak IdP setup. | (whole page) |

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and unsets `JAVA_HOME`; leaves the JDK installed).

## Run everything at once

To install the whole stack in one command, `install-all.ps1` runs the entire sequence end to end: the pre-flight check, all prerequisites, the build, the identity-provider setup, both deployments, and a smoke test. This is the fastest path; the manual sections below are for installing a piece by hand or understanding what each step does.

On a fresh machine, run `setup-vm-prereqs.ps1` first (it installs the OS-level pieces: IIS, SQL Server, Git), then `install-all.ps1`. Run both from an elevated PowerShell in the `windows-install` folder. Choose the identity provider with the mandatory `-IdpProvider` parameter; this guide uses `keycloak`.

`install-all.ps1` fetches the Admin App source for you — by default it clones the latest stable release of `Ed-Fi-AdminApp` as a sibling folder (for example `C:\Ed-Fi\Ed-Fi-AdminApp`). To build from a checkout you already have, pass `-SourcePath`; to pin a specific version, pass `-AdminAppRef <tag>` (for example `-AdminAppRef v4.0.1`).

Local Keycloak example (SQL Server):

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -SaPassword (Read-Host -AsSecureString 'SQL Server sa password') `
  -AppDbPassword (Read-Host -AsSecureString 'Admin App DB login password') `
  -KeycloakAdminPassword (Read-Host -AsSecureString 'Keycloak admin password') `
  -OidcClientSecret (Read-Host -AsSecureString 'OIDC client secret') `
  -TestUserPassword (Read-Host -AsSecureString 'Keycloak test-user password')
```

The password parameters are `SecureString`s, so pass them with `Read-Host -AsSecureString` (as above) rather than plain quoted strings. `-AppDbPassword` sets the password for the least-privilege `edfi_adminapp` login the script creates; it is required for SQL Server. This stands up the local Keycloak (realm `edfi`, client `edfiadminapp`, and a test user) and deploys the API and frontend as part of the run.

:::note
By default the sites use a self-signed certificate (auto-trusted on this machine only). To bind a real certificate, pass `-CertificateThumbprint`, or `-CertificatePfxPath` with `-CertificatePassword` (see [TLS and certificates](#tls-and-certificates)). Yopass is off by default; add `-SetupYopassDocker` to stand up a local Yopass via Docker, or `-YopassUrl <url>` to point at an existing one.
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

### IIS modules and configuration (URL Rewrite + httpPlatform handler) {#iis-modules}

_Automated by `01-prereqs-iis.ps1` (assumes the IIS role above is already installed)._

IIS hosts the Node.js API through the **httpPlatform handler**: IIS acts as a reverse proxy, launching the Node process (`main.js`) and forwarding requests to a loopback port it assigns via the `HTTP_PLATFORM_PORT` environment variable.

1. Install the [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite). It is used for the HTTP→HTTPS redirect and the frontend's SPA fallback.
2. Install an httpPlatform handler. Two are compatible, and both register the same `httpPlatformHandler` module name:
   - **HttpBridge** — the [LeXtudio fork](https://github.com/lextudio/httpbridge) (MIT, actively maintained). This is the scripts' default.
   - **Microsoft HttpPlatformHandler** — the [original v1.2](https://www.iis.net/downloads/microsoft/httpplatformhandler) (signed, stable, frozen since ~2016).
3. **Unlock the handlers configuration section** so the application's `web.config` can register the handler. From an elevated PowerShell:

   ```powershell
   & "$env:SystemRoot\System32\inetsrv\appcmd.exe" unlock config -section:system.webServer/handlers
   ```

:::warning
Without unlocking the `handlers` section, requests to the API return **HTTP 500.19**. Unlocking it lets the `httpPlatformHandler` handler ship in the deployed `web.config`.
:::

### Database

_Automated by `02-prereqs-sql.ps1` (SQL Server path)._

The Admin App supports PostgreSQL 16+ and SQL Server 2017+, and needs only one. This guide uses **SQL Server** by default on Windows; PostgreSQL is available via Docker (`install-all.ps1 -DbEngine pgsql`; requires Docker Desktop in Linux-container mode).

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

For PostgreSQL, see [Configuring the Admin App](../configuration/configuring-admin-app.md); the automated PostgreSQL path runs through `install-all.ps1 -DbEngine pgsql`.

### Node.js

_Automated by `03-prereqs-node.ps1` (upgrades a too-old version via nvm-windows)._

Install the Node.js major version pinned in the Admin App's `package.json` (`engines.node`, currently `>=22`) from [nodejs.org](https://nodejs.org/). `03-prereqs-node.ps1` reads `engines.node` at runtime and remediates a too-old Node via nvm-windows.

### Identity provider

_Automated by `idp-keycloak-setup.ps1`._

This guide uses **Keycloak**, running locally, as the example OIDC identity provider. `idp-keycloak-setup.ps1` installs a JDK, downloads and starts Keycloak, and provisions the `edfi` realm, the `edfiadminapp` confidential client, and a test user. To do it manually: install a supported LTS JDK — Keycloak 26 supports OpenJDK 17, 21, or 25 (the setup script installs OpenJDK 21) — download and start [Keycloak](https://www.keycloak.org/), then create the realm, a confidential client, and a user.

:::note
Register these in the Keycloak client (HTTPS, matching the default ports):

- Redirect URI: `https://localhost:3443/api/auth/callback/<oidc-id>`
- Post-logout redirect URI: `https://localhost:3443/api/auth/post-logout`
- Web origin: `https://localhost:4443`

`<oidc-id>` is the id of the row in the `oidc` database table; `install-all.ps1` resolves it and prints the exact callback URI to register (it is not always `1`). A user must exist in Keycloak whose email/username claim matches the Admin App admin user (`-AdminUsername`, default `admin@example.com`). Java is required **only** for the local Keycloak example.
:::

For more detail, see [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md).

### Yopass (optional)

_Automated by `yopass-docker.ps1`._

Yopass lets the Admin App share newly created API client credentials as one-time, self-destructing links instead of showing them inline. Stand up a local Yopass via Docker, point the app at an existing Yopass, or leave it disabled (credentials are then shown inline, a supported configuration). See the [Yopass Administrator Guide](../configuration/yopass-administrators-guide/readme.md).

### TLS and certificates

_Automated by the deploy scripts: `05-deploy-api.ps1` / `06-deploy-fe.ps1` bind the certificate (a supplied `-CertificateThumbprint` / `-CertificatePfxPath`, or a generated self-signed one); `install-all.ps1` forwards the same parameters._

Both IIS sites are served over HTTPS (API `:3443`, frontend `:4443`). Each also keeps an HTTP binding (`:3333` / `:4200`) that returns a 301 redirect to its HTTPS URL. The certificate is resolved in this order:

1. **`-CertificateThumbprint`** — bind an existing certificate already in `LocalMachine\My`.
2. **`-CertificatePfxPath`** + **`-CertificatePassword`** — import and bind a PFX you supply.
3. **None supplied** — a **self-signed** certificate (CN/SAN `localhost` plus the machine name) is generated, bound, and added to `LocalMachine\Root` so local browsers trust it. Opt out of the trust step with `-SkipSelfSignedTrust`.

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

Run the read-only diagnostic before continuing:

```powershell
.\00-check-prereqs.ps1
```

It reports IIS (and that it is version 10 or newer), the database, Node.js, build artifacts, and whether ports 3333, 4200, 3443, and 4443 are free. It does not check the identity provider.

## Backend API Installation

:::tip Automation shortcut
The build (step 1) is automated by `04-build.ps1`; the deploy (steps 2-8) by `05-deploy-api.ps1`. Or follow the manual steps.
:::

The API is deployed as a standalone IIS site, `EdFi-AdminApp-API`, with an HTTP binding on port 3333 and an HTTPS binding on port 3443; the HTTP binding only 301-redirects to HTTPS. IIS hosts the Node.js process through the **httpPlatform handler** (reverse proxy), which comes from [IIS modules and configuration](#iis-modules).

1. **Build the application**:

   :::note
   Always install from a **stable release tag**, not the default `main` branch (which reflects active development). Use the **latest stable release tag** — the same release the automated `install-all.ps1` path resolves for you. Find it on the [Releases page](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases), then use it below.
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

   `05-deploy-api.ps1` sets `NPM_CONFIG_CACHE` on the `EdFi-AdminApp-API` App Pool's environment (an IIS 10+ feature) and grants that identity write access, so npm has a writable cache scoped to the pool. If you configure manually and npm fails to write its cache, set that environment variable on the pool to a writable folder such as `C:\npm-cache`.

### Critical success factors

- **`node.exe` must be machine-wide.** The App Pool virtual account cannot execute a Node under a user profile; that fails with HTTP 502.5. Install Node to `C:\Program Files\nodejs`.
- **The `handlers` section must be unlocked.** The `httpPlatformHandler` handler is declared in `web.config`; if the section is still locked at the server level, the API returns HTTP 500.19. See [IIS modules and configuration](#iis-modules).
- **`API_PORT` must read `HTTP_PLATFORM_PORT`.** httpPlatform assigns the loopback port at runtime; a hard-coded port makes IIS and Node disagree and the site returns 502.
- **The HTTPS binding needs a certificate.** Without one bound to port 3443, the site cannot start over HTTPS. See [TLS and certificates](#tls-and-certificates).

See the [Troubleshooting](../troubleshooting.md#backend-troubleshooting) section if you hit errors.

## Frontend Installation

:::tip Automation shortcut
The `.env` and build (steps 1-2) are automated by `04-build.ps1`; the deploy (steps 3-6) by `06-deploy-fe.ps1`. Or follow the manual steps.
:::

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
   If your web fonts fail to load (HTTP 404 for `.woff2` files), your IIS may be missing that MIME type. See [Troubleshooting](../troubleshooting.md#frontend-troubleshooting).
   :::

See the [Troubleshooting](../troubleshooting.md#frontend-troubleshooting) section if you hit errors.

## Security headers

Both IIS sites emit a baseline set of response headers (shown in each site's `web.config` above) and remove `X-Powered-By`. Both send `Strict-Transport-Security` (HSTS) and `Referrer-Policy`, and each carries an **enforcing** `Content-Security-Policy`:

- **API** — `default-src 'none'`, since it serves only JSON in production (Swagger UI is disabled there).
- **Frontend** — allows its own origin plus the API origin in `connect-src`; `style-src` allows `'unsafe-inline'` because the UI framework injects styles at runtime.

The API additionally sets `X-Content-Type-Options` and `X-Frame-Options` in application code. Adjust these headers if you place the sites behind a reverse proxy that sets its own.

## Production considerations

The default install is suitable for a local or trusted-network deployment. Before exposing the Admin App more broadly:

- **Use a CA-issued certificate.** The default self-signed certificate is trusted only on the install host. Bind a real certificate (`-CertificateThumbprint` or `-CertificatePfxPath`) so other machines trust the sites without warnings.
- **Do not run the example Keycloak in production.** The local Keycloak example runs in `start-dev` (HTTP, embedded H2 database, hostname strictness off) and is for local development only. For production, run `kc.bat start` with `--hostname`, a real database, and TLS — or use your own OIDC provider.
- **Keep upstream TLS verification on.** `SSL_VERIFICATION` defaults to `true`, so the API verifies the certificate of the ODS/API and Admin API it calls. If an upstream presents a self-signed or dev certificate, make Node trust it rather than disabling verification:
  1. Export the upstream's certificate (or its issuing CA) to a PEM file (`.crt`/`.pem`).
  2. Set `NODE_EXTRA_CA_CERTS` to that file's path for the API process — add an `<environmentVariable name="NODE_EXTRA_CA_CERTS" value="C:\path\to\upstream-ca.crt" />` inside `<httpPlatform><environmentVariables>` in the API site's `web.config` (next to `NODE_ENV`), or set it on the `EdFi-AdminApp-API` App Pool's environment.
  3. Restart the API site so Node re-reads the value.

  On Node 22.15+ you can instead set `NODE_OPTIONS=--use-system-ca`, which honors the Windows certificate store.
- **Review secrets handling.** A manual install keeps credentials in `production.js`; a scripted `install-all.ps1` run keeps them in the API App Pool's environment and writes the generated encryption key to an ACL-restricted `install-summary.txt`. Protect or rotate them wherever they live, per your policy.
- **Harden the database and App Pool identities.** This guide already connects as a least-privilege SQL login (`edfi_adminapp`, not `sa`); keep that separation in production.

## Uninstall

This works the same whether you installed with the scripts or by hand, as long as you used the site names, paths, and database name from this guide.

- `uninstall.ps1` removes the generic Admin App install: the `EdFi-AdminApp-API` and `EdFi-AdminApp-FE` sites, the App Pool, the deployed directories, the `sbaa` database, the dockerized PostgreSQL/Yopass stacks (if used), and the npm cache folder. It leaves Node.js, SQL Server, and IIS in place. It prompts for confirmation; pass `-Force` for a non-interactive run, and `-SaPassword` to drop the SQL Server database over SQL authentication.
- `uninstall-keycloak.ps1` tears down the local Keycloak example: it stops the Keycloak process, deletes the Keycloak install directory, and unsets the machine `JAVA_HOME`. The JDK itself is left installed.

## Next steps

The Admin App is now running, but it manages **Ed-Fi ODS/API** instances that run separately — this guide does not install an ODS/API. To start using the Admin App, sign in and connect a running ODS/API environment (ODS/API 6.x or 7.x) by its Discovery API URL.

:::note First sign-in
Open the frontend at `https://localhost:4443` and sign in through the identity provider. For the local Keycloak example, use the seeded user — email `admin@example.com` (the `-AdminUsername` / `-TestUserEmail` default) and the password you passed as `-TestUserPassword`. This first user is the bootstrap administrator; additional users must be granted access from within the Admin App afterward.
:::

:::note
If the ODS/API or Admin API presents a self-signed or dev certificate — common for a local ODS/API — adding an Environment fails with a certificate error (`DEPTH_ZERO_SELF_SIGNED_CERT`) in the API log (`logs\node-stdout.log`). Make Node trust the upstream certificate via `NODE_EXTRA_CA_CERTS`; see [Production considerations](#production-considerations).
:::

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
