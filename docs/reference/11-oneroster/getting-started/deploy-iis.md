# Deploy on IIS (Windows)

This page walks through hosting the Ed-Fi OneRoster Node service on
Internet Information Services (IIS). Two architectures are supported:

- **`iisnode`** — IIS owns the Node worker process lifecycle. Simplest to
  install, recommended when you already host other IIS Node applications.
- **Reverse proxy (ARR)** — Node runs as a Windows service under WinSW;
  IIS handles TLS, routing, and forwards requests to Node over loopback.
  Preferred for production deployments that need independent Node process
  management.

This page covers the shared prerequisites and both patterns. For database
deployment, see [Deploy on PostgreSQL](./deploy-postgres.md) or [Deploy on
Microsoft SQL Server](./deploy-mssql.md).

## Prerequisites

- **Windows Server 2016** or later (2019 / 2022 recommended)
- **IIS 8.5** or later
- **Node.js** 18 LTS or later, with `npm` on the system `PATH`
- Administrator access to the server
- Connectivity from the server to the Ed-Fi ODS (PostgreSQL or SQL Server)
- A free TCP port for the OneRoster API (default 3000)

### Required IIS components

- **iisnode** — required for the `iisnode` architecture. Install from the
  [iisnode GitHub releases](https://github.com/Azure/iisnode/releases),
  then run `iisreset`.
- **URL Rewrite module** — required for both architectures. Install from
  [Microsoft](https://www.iis.net/downloads/microsoft/url-rewrite).
- **Application Request Routing (ARR)** — required only for the reverse
  proxy architecture. Install from
  [Microsoft](https://www.iis.net/downloads/microsoft/application-request-routing).

## Application preparation (both architectures)

Clone the repository and install dependencies to your chosen application
folder:

```powershell
git clone https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster.git C:\inetpub\oneroster
cd C:\inetpub\oneroster
npm install --production
npm run build
```

Create `.env` at the application root
(`C:\inetpub\oneroster\.env`). See [Environment
variables](../configuration/environment-variables.md) for the full
reference; a minimal PostgreSQL variant looks like:

```env
DB_TYPE=postgres
DB_HOST=your-postgres-host.example.org
DB_PORT=5432
DB_NAME=EdFi_Ods
DB_USER=postgres
DB_PASS=your_password
DB_SSL=false

NODE_ENV=production
PORT=3000
API_BASE_PATH=
PGBOSS_CRON=*/15 * * * *

CORS_ORIGINS=http://localhost:3000,http://localhost:56641
TRUST_PROXY=true

OAUTH2_ISSUERBASEURL=https://your-issuer/
OAUTH2_AUDIENCE=https://oneroster.example.org
OAUTH2_TOKENSIGNINGALG=RS256
OAUTH2_PUBLIC_KEY_PEM=
```

:::note

If IIS serves OneRoster under a virtual directory such as `/oneroster`,
set `API_BASE_PATH=/oneroster` in `.env` so self-referencing URLs
(Swagger discovery, etc.) are generated correctly.

:::

### Lock down the `.env` file

The `.env` file contains database credentials and JWT validation settings;
restrict access to it:

```powershell
$envPath = "C:\inetpub\oneroster\.env"
icacls $envPath /inheritance:r
icacls $envPath /grant:r "SYSTEM:(F)"
icacls $envPath /grant:r "Administrators:(F)"
icacls $envPath /grant:r "IIS AppPool\OneRosterPool:(F)"
```

The `web.config` samples below also block `.env` / `.yml` / `.yaml` files
from being served over HTTP.

## Architecture A: hosting with `iisnode`

IIS runs the Node worker itself via the `iisnode` module. The bundled
`web.config` already wires up the handler and rewrite rules.

### Step 1 — Create the Application Pool

1. Open **IIS Manager** → **Application Pools** → **Add Application Pool**
2. Name: `OneRosterPool`
3. **.NET CLR version**: **No Managed Code** (important for Node)
4. **Managed pipeline mode**: Integrated
5. Open **Advanced Settings** on the pool and set:
   - **Start Mode**: `AlwaysRunning`
   - **Idle Time-out (minutes)**: `0`
   - **Regular Time Interval (minutes)**: `0`

### Step 2 — Create the website

1. **Sites** → **Add Website…**
2. Configure:
   - **Site name**: `OneRoster`
   - **Application pool**: `OneRosterPool`
   - **Physical path**: `C:\inetpub\oneroster`
   - **Binding**: `http`, port `80` (or another free port)
   - **Host name**: `oneroster` (or a DNS name dedicated to this API)

If you use a host name such as `oneroster` on a single server, add a
matching DNS record or a hosts-file entry (`127.0.0.1   oneroster`).

Remove any legacy virtual directory mappings under **Default Web Site** to
avoid duplicate routes.

### Step 3 — Create `web.config`

`web.config` at `C:\inetpub\oneroster\web.config` should contain the
following. The configuration wires `iisnode` to `server.js`, adds URL
Rewrite rules that preserve original protocol and host, blocks `.env`
from being served, and sets basic security headers.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>

    <!-- IIS Node Configuration -->
    <iisnode watchedFiles="web.config;*.js"
      nodeProcessCountPerApplication="1"
      maxConcurrentRequestsPerProcess="1024"
      maxNamedPipeConnectionRetry="100"
      initialRequestBufferSize="4096"
      maxRequestBufferSize="65536"
      uncFileChangesPollingInterval="5000"
      gracefulShutdownTimeout="60000"
      loggingEnabled="true"
      logDirectory=".\logs"
      debuggingEnabled="false"
      devErrorsEnabled="false"
      idlePageOutTimePeriod="0" />

    <handlers>
      <add name="iisnode" path="server.js" verb="*"
           modules="iisnode" resourceType="Unspecified" />
    </handlers>

    <rewrite>
      <rules>
        <rule name="Health Check" stopProcessing="true">
          <match url="^health-check/?$" />
          <action type="Rewrite" url="server.js" />
        </rule>

        <rule name="Node App HTTPS" stopProcessing="true">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{HTTPS}" pattern="^ON$" />
          </conditions>
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="https" />
            <set name="HTTP_X_FORWARDED_HOST" value="{HTTP_HOST}" />
          </serverVariables>
          <action type="Rewrite" url="server.js" />
        </rule>

        <rule name="Node App HTTP" stopProcessing="true">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{HTTPS}" pattern="^OFF$" />
          </conditions>
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="http" />
            <set name="HTTP_X_FORWARDED_HOST" value="{HTTP_HOST}" />
          </serverVariables>
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>

    <security>
      <requestFiltering>
        <fileExtensions>
          <add fileExtension=".env" allowed="false" />
          <add fileExtension=".yml" allowed="false" />
          <add fileExtension=".yaml" allowed="false" />
        </fileExtensions>
      </requestFiltering>
    </security>

    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>

  </system.webServer>
</configuration>
```

### Step 4 — Register forwarded-header server variables

For the URL Rewrite rules above to set `HTTP_X_FORWARDED_PROTO` and
`HTTP_X_FORWARDED_HOST`, register them as allowed server variables:

1. **IIS Manager** → your site → **URL Rewrite**
2. **View Server Variables** (right panel)
3. Add `HTTP_X_FORWARDED_PROTO` and `HTTP_X_FORWARDED_HOST`

### Step 5 — Grant directory permissions

```powershell
$appPath = "C:\inetpub\oneroster"
$appPool = "OneRosterPool"
icacls $appPath /grant "IIS AppPool\${appPool}:(OI)(CI)F" /T /C
```

### Step 6 — Warm up and verify

With `iisnode`, the application starts on the first request.

```powershell
Invoke-WebRequest -Uri "http://localhost/health-check" -UseBasicParsing
Get-Content C:\inetpub\oneroster\logs\*.log -Tail 50
```

## Architecture B: reverse proxy to a Node Windows service

This architecture runs Node independently (e.g., as a Windows service on
port 3000) and uses IIS with ARR + URL Rewrite to terminate TLS and
forward traffic to it.

```text
Client → IIS (80/443) → ARR + URL Rewrite → Node (localhost:3000)
```

### Step 1 — Install Required IIS Modules

Install the URL Rewrite module and Application Request Routing (ARR) from
Microsoft (see _Required IIS components_ above). After install, both
features should appear in IIS Manager at the server level.

### Step 2 — Enable the proxy in ARR

1. In IIS Manager, click the server node
2. Open **Application Request Routing Cache**
3. Click **Server Proxy Settings** (right panel)
4. Check **Enable proxy**, then **Apply**

### Step 3 — Create the IIS site

1. **Sites** → **Add Website**
2. Configure:
   - **Site name**: `NodeProxy` (or similar)
   - **Physical path**: `C:\inetpub\node-proxy` (just a placeholder for
     `web.config`)
   - **Binding**: HTTP on port `8082` (or 80), HTTPS on port 443 if you
     want TLS termination

### Step 4 — Configure the reverse proxy rules

At `C:\inetpub\node-proxy\web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>

        <rule name="ReverseProxyHttps" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="^ON$" />
          </conditions>
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="https" />
            <set name="HTTP_X_FORWARDED_HOST" value="{HTTP_HOST}" />
          </serverVariables>
          <action type="Rewrite"
                  url="http://localhost:3000/{R:1}"
                  appendQueryString="true" />
        </rule>

        <rule name="ReverseProxyHttp" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="^OFF$" />
          </conditions>
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="http" />
            <set name="HTTP_X_FORWARDED_HOST" value="{HTTP_HOST}" />
          </serverVariables>
          <action type="Rewrite"
                  url="http://localhost:3000/{R:1}"
                  appendQueryString="true" />
        </rule>

      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

Register `HTTP_X_FORWARDED_PROTO` and `HTTP_X_FORWARDED_HOST` under the
site's URL Rewrite → **View Server Variables** so the rules are allowed to
set them.

### Step 5 — Run Node as a Windows service with WinSW

Running Node as a Windows service makes it start on boot, run in the
background, and restart on failure. Both `NSSM` and `PM2` are possible
alternatives; WinSW is recommended because it is actively maintained and
XML-configured.

1. Download `WinSW-x64.exe` from the [WinSW
   releases](https://github.com/winsw/winsw/releases)
2. Create `C:\services\oneroster-api\` and copy the binary there as
   `OneRosterApi.exe`
3. Create `OneRosterApi.xml` next to it:

   ```xml
   <service>
     <id>OneRosterApi</id>
     <name>OneRoster API</name>
     <description>Node.js OneRoster API Service</description>
     <executable>C:\Program Files\nodejs\node.exe</executable>
     <arguments>server.js</arguments>
     <workingdirectory>C:\inetpub\oneroster</workingdirectory>
     <logpath>C:\services\oneroster-api\logs</logpath>
     <log mode="roll" />
     <startmode>Automatic</startmode>
     <onfailure action="restart" delay="10 sec"/>
   </service>
   ```

4. Install and start from an elevated PowerShell:

   ```powershell
   cd C:\services\oneroster-api
   .\OneRosterApi.exe install
   .\OneRosterApi.exe start
   ```

5. Confirm the service is running in `services.msc` and that it restarts
   on reboot (`Startup type = Automatic`).

### Step 6 — Verify

```text
Direct Node:       http://localhost:3000/health-check
Through IIS proxy: http://localhost:8082/health-check
```

Useful WinSW commands:

```powershell
.\OneRosterApi.exe stop
.\OneRosterApi.exe start
.\OneRosterApi.exe restart
.\OneRosterApi.exe uninstall
```

## TLS / HTTPS

To serve OneRoster over HTTPS, install or import a certificate into the
Windows certificate store and add an HTTPS binding (port 443) to the IIS
site through **Bindings…** in IIS Manager. Both architectures benefit;
with the reverse-proxy architecture, HTTPS is terminated at IIS and the
back-end Node service continues to listen on plain HTTP loopback.

## Troubleshooting

| Symptom | First thing to check |
| --- | --- |
| HTTP 500 on any request | `C:\inetpub\oneroster\logs\*.log` (iisnode stdout) |
| HTTP 404 on all routes | URL Rewrite module installed; `web.config` rewrite rules present; application pool's .NET CLR version is **No Managed Code** |
| Self-referencing URLs (Swagger discovery) use `http` instead of `https` | `HTTP_X_FORWARDED_PROTO` is registered under **View Server Variables**; `TRUST_PROXY=true` in `.env` |
| Database connection failures | `Test-NetConnection` to the DB host on 5432 / 1433; verify credentials in `.env` |
| App seems to "sleep" after idle | Application pool `Idle Time-out = 0`; `Start Mode = AlwaysRunning`; site-level `Preload Enabled = true`; iisnode `idlePageOutTimePeriod="0"` |

To enable detailed iisnode error pages for a short debugging window
(development only — revert before production):

```xml
<iisnode
  loggingEnabled="true"
  devErrorsEnabled="true"
  debuggingEnabled="true" />
```

Run `iisreset` (or recycle the app pool) so IIS reloads the new
configuration, then flip the flags back to `false` once the issue is
diagnosed.
