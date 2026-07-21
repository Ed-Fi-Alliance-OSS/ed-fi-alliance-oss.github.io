---
sidebar_position: 6
---

# Troubleshooting

## Backend Troubleshooting

The API is hosted in IIS through the **httpPlatform handler**: IIS launches the
Node process (`main.js`) and forwards requests to a loopback port it assigns via
`HTTP_PLATFORM_PORT`. Most backend failures surface in the Node stdout log at
`logs\node-stdout.log` under the API site folder (for example
`C:\inetpub\EdFi-AdminApp-API\logs\`). Start there.

**HTTP 500.19 — configuration locked:**

- **Cause**: the `system.webServer/handlers` section is locked at the server
  level, so the `httpPlatformHandler` mapping in the site's `web.config` cannot
  be applied.
- **Solution**: unlock it from an elevated PowerShell, then retry:

  ```powershell
  & "$env:SystemRoot\System32\inetsrv\appcmd.exe" unlock config -section:system.webServer/handlers
  ```

  See [IIS modules and configuration](./getting-started/windows-iis-installation/manual.md#iis-modules).

**HTTP 502.5 — process failure (Node not machine-wide):**

- **Cause**: `processPath` points at a `node.exe` under a user profile (an
  nvm-windows default). The App Pool virtual account (`IIS APPPOOL\EdFi-AdminApp-API`)
  cannot execute it.
- **Solution**: install Node.js machine-wide (`C:\Program Files\nodejs\node.exe`)
  and set `processPath` to that path in `web.config`.

**HTTP 502 — IIS and Node disagree on the port:**

- **Cause**: `API_PORT` is hard-coded instead of reading the port httpPlatform assigns.
- **Solution**: set `API_PORT: process.env.HTTP_PLATFORM_PORT || 3333` in `production.js`.

**Site will not start over HTTPS:**

- **Cause**: no certificate is bound to the HTTPS port (3443 API, 4443 frontend).
- **Solution**: bind a certificate to the site's HTTPS binding (a self-signed one
  is fine for local use). See [TLS and certificates](./getting-started/windows-iis-installation/manual.md#tls-and-certificates).

**Adding an Environment fails with a certificate error:**

- **Error**: `DEPTH_ZERO_SELF_SIGNED_CERT` (or a similar TLS error) in
  `logs\node-stdout.log` when connecting an ODS/API or Admin API.
- **Cause**: `SSL_VERIFICATION` is on (the secure default) and the upstream
  presents a self-signed or dev certificate Node does not trust.
- **Solution**: make Node trust the upstream certificate via `NODE_EXTRA_CA_CERTS`
  rather than disabling verification. See [Production considerations](./getting-started/windows-iis-installation/manual.md#production-considerations).

**"NODE_ENV value of 'production' did not match any deployment config file names":**

- **Cause**: the app runs with `NODE_ENV=production` but no `production.js` exists
  in `packages/api/config`.
- **Solution**: create `production.js` from the `production.js-edfi` template. The
  `web.config` sets `NODE_ENV=production` through httpPlatform's `environmentVariables`.

**Database password error ("client password must be a string"):**

- **Error**: `SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string` (PostgreSQL).
- **Cause**: a database credential is not a string.
- **Solution**: ensure every value in `DB_SECRET_VALUE` is a string:

  ```javascript
  DB_SECRET_VALUE: {
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_USERNAME: 'edfiadminapp',
    DB_DATABASE: 'sbaa',
    DB_PASSWORD: 'your_secure_password', // must be a string
  }
  ```

**Testing the deployment:**

- Browse to `https://localhost:3443/api/healthcheck`; it should return a healthy
  response. The HTTP binding (`http://localhost:3333`) should 301-redirect to HTTPS.
- Check `logs\node-stdout.log` first for any startup error.

### Build errors

Check that the `production.js` (or `local.js`) values are set correctly. If a
stale build cache causes problems, run `nx reset` to clear it before rebuilding.

## Frontend Troubleshooting

**Common Frontend Deployment Issues:**

**Duplicate MIME Type Error (HTTP 500.19):**

- **Error**: "Cannot add duplicate collection entry of type 'mimeMap' with unique key attribute 'fileExtension' set to '.json'"
- **Cause**: IIS already has MIME type mappings for certain file extensions
- **Solution**: Use `<remove>` elements before `<mimeMap>` elements (see the `.woff2` example below)

**React Router 404 Errors:**

- **Symptom**: Direct URLs (like `/dashboard`) return 404 errors, but navigation within the app works
- **Cause**: IIS tries to serve routes as static files instead of letting React Router handle them
- **Solution**: Ensure the URL Rewrite rule for React Routes is properly configured

**Static Asset Loading Issues (fonts / `.woff2` return 404):**

- **Symptom**: CSS, JS, or font files (commonly `.woff2`) return 404 or a wrong MIME type
- **Cause**: The IIS install is missing a MIME type mapping for the extension. Some IIS versions do not register `.woff2` by default
- **Solution**: Add the missing MIME types to the frontend site's `web.config`, inside `<system.webServer>`. Use `<remove>` before each `<mimeMap>` to avoid a duplicate-entry error (HTTP 500.19) if IIS already defines it:

  ```xml
  <staticContent>
    <remove fileExtension=".woff" />
    <remove fileExtension=".woff2" />
    <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
    <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
  </staticContent>
  ```

**API Communication Errors:**

- **Symptom**: Frontend loads but API calls fail
- **Cause**: CORS issues or incorrect API URL configuration
- **Solution**: Verify `VITE_API_URL` build variable points to your API endpoint

## Common Issues

### Database Connection Errors

```bash
# Check database connectivity
psql -h localhost -U edfiadminapp -d sbaa

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### API Startup Issues

```bash
# Check API logs
tail -f /opt/edfiadminapp/logs/application.log

# Check service status
sudo systemctl status edfiadminapp-api

# Check service logs
sudo journalctl -u edfiadminapp-api -f
```

### Authentication Issues

1. **OIDC Configuration**: Verify OIDC provider is accessible
2. **Client Configuration**: Check client ID and secret
3. **Redirect URIs**: Ensure redirect URIs match exactly
4. **Network**: Verify network connectivity to OIDC provider

### Frontend Issues

1. **Build errors**: Check environment variables are set correctly. Sometimes you need to execute `nx reset` in order to get a new build without caching files. You can include the command in yout `package.json` as `cache: nx reset` and then use it `npm run cache`
2. **Routing issues**: Verify web server is configured for SPA routing
3. **API connectivity**: Check CORS and network connectivity
