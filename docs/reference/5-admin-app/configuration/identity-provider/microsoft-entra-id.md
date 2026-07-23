---
sidebar_position: 3
---

# Microsoft Entra ID

:::info

Scope: native Windows/IIS installation with SQL Server, a single OIDC provider, and a fresh install. Validated end-to-end on Windows/IIS. This section covers only what is Entra-specific; follow the [Windows IIS installation guide](../../getting-started/windows-iis-installation/readme.md) for the install itself and [Configuring Ed-Fi Admin App](../configuring-admin-app.md) for the non-OIDC configuration.

:::

Register the Entra application **first** — its issuer, client id, and secret go into the Admin App configuration during installation. Do not install the Admin App before completing Part A.

## Prerequisites

- A Windows/IIS server with SQL Server prepared per the [Windows IIS installation guide](../../getting-started/windows-iis-installation/readme.md).
- Sufficient Microsoft Entra directory roles: **Cloud Application Administrator** (or higher) to create the App Registration, and **Privileged Role Administrator** or **Global Administrator** to grant admin consent in step A3. Cloud Application Administrator alone can create the app but cannot grant tenant-wide admin consent; if your account lacks that privilege, have a Global Administrator grant consent afterward.
- The host where the Admin App **API** is served — used in the redirect URI. In the two-site Windows/IIS layout this is the API site, for example `https://localhost:3443`.
- Your Entra **Tenant ID**.
- The **email of the first admin user** — it must equal the email Entra sends for that person. It is set as `ADMIN_USERNAME` during installation, so decide it beforehand.

## Part A — Register the application in Microsoft Entra ID

:::tip Automate Part A with a script

Instead of the manual steps below, you can script this entire section with `idp-entra-setup.ps1` from the [Admin App Installation Scripts repository](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts) (`windows-install` folder). Using the Microsoft Graph PowerShell SDK, it creates a single-tenant App Registration with the Web redirect URI, the `email` ID-token optional claim, the delegated `openid`/`email` permissions, and a client secret, and grants tenant-wide admin consent (or prints the exact manual consent URL when your account lacks the privilege). It outputs the client id, issuer, and redirect URI, and writes the secret to an ACL-restricted file — the values you need for Part B or the [automated install](../../getting-started/windows-iis-installation/automated.md).

It needs the same Entra roles as the manual path (see [Prerequisites](#prerequisites)) plus the Microsoft Graph `Application.ReadWrite.All` scope, and does not require an elevated session.

```powershell
# From the windows-install folder:
$r = .\idp-entra-setup.ps1 -DisplayName 'Ed-Fi Admin App' -TenantId '<tenant-id>'
```

By default the redirect URI targets `https://localhost:3443/api/auth/callback/1`; pass `-ApiBaseUrl` for a different API host, or `-RedirectCallbackId <id>` if the install reports an `oidc` row id other than `1`. Run `Get-Help .\idp-entra-setup.ps1 -Full` for all parameters.

:::

### A1. Create the App Registration

1. Azure portal → **Microsoft Entra ID** → **App registrations** → **New registration**.

   ![Entra ID new App registration screen](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/configuration/identity-provider/entra/01-new-registration.png)

2. **Name:** for example, `Ed-Fi Admin App v4`.
3. **Supported account types:** _Accounts in this organizational directory only (single tenant)_.
4. **Redirect URI:** platform **Web**, value `https://<api-host>/api/auth/callback/<oidc-id>`. For the two-site Windows/IIS layout the API host is the `:3443` site, for example `https://localhost:3443/api/auth/callback/1`.
5. **Register**, then from **Overview** copy the **Application (client) ID** and **Directory (tenant) ID**.

![Entra ID Overview showing client and tenant IDs](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/configuration/identity-provider/entra/02-overview-ids.png)

:::note

The redirect URI points at the **API** site, not the frontend. `<oidc-id>` is the `oidc` table row id; on a fresh single-provider install it is `1`.

:::

### A2. Create a client secret

1. **Certificates & secrets** → **Client secrets** → **New client secret** → set a description and expiry → **Add**.
2. Copy the secret **Value** immediately (shown only once) — this is the `clientSecret`. (Ignore "Secret ID".)

![Entra ID client secret creation](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/configuration/identity-provider/entra/03-client-secret.png)

### A3. API permissions

1. **API permissions** → **Add a permission** → **Microsoft Graph** → **Delegated permissions** → add `openid` and `email`.
2. **Grant admin consent** for your directory; confirm the status shows "Granted".

![Entra ID API permissions with admin consent granted](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/configuration/identity-provider/entra/04-api-permissions.png)

### A4. Add the `email` optional claim (required)

Entra v2.0 does not emit the `email` claim by default, and the auth strategy rejects login with `Invalid email from IdP` when it is empty.

1. **Token configuration** → **Add optional claim** → **Token type: ID** → check `email` → **Add**.
2. If prompted to enable the associated Microsoft Graph permission, accept.

![Entra ID optional email claim in Token configuration](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/configuration/identity-provider/entra/05-optional-claim-email.png)

:::warning

Even with the optional claim, a directory user whose profile has no email may still send an empty `email`. Use an account with a real email address, or set the user's Email attribute in Entra.

:::

### Single-tenant vs. multitenant

This section uses **single-tenant**, the recommended model for on-premise deployments where each Implementation Partner runs its own Admin App against its own directory. The issuer is `https://login.microsoftonline.com/<tenantId>/v2.0` and token validation is straightforward.

Multitenant is **not supported out of the box**: it uses the `common` endpoint, whose discovery document declares a templated issuer while tokens carry each user's real tenant id — which Admin App's strict issuer validation would reject. It also widens the sign-in surface to any Microsoft organization. A safe multitenant setup would need pattern-based issuer validation plus a tenant allowlist and `tid` validation, none of which exist today.

## Part B — Configure the API (`production.js`)

Set the OIDC block in `packages/api/config/production.js`; the API seeds it into the `oidc` table on first startup. See [Configuring Ed-Fi Admin App](../configuring-admin-app.md) for the full file (database, encryption key, Yopass, and so on).

```javascript
SAMPLE_OIDC_CONFIG: {
  issuer:       'https://login.microsoftonline.com/<tenantId>/v2.0',
  clientId:     '<appClientId>',
  clientSecret: '<clientSecret>',
  scope:        'openid profile email',
},
USE_PKCE: true,
// First admin: must match the email Entra sends for this person.
ADMIN_USERNAME: '<admin-email>',
```

Differences from the Keycloak example:

- `issuer` → the Entra v2.0 issuer, not a Keycloak realm URL.
- `scope` → `openid profile email`. Keycloak returns the `email` claim through its default client scopes even without an explicit scope, but Entra does not: without the `email` scope the claim is absent and login is rejected with `Invalid email from IdP`.
- `clientId` / `clientSecret` → the App Registration values from Part A.

:::note

A successful sign-in still fails with `USER_NOT_FOUND` unless a user with that email exists with a role. On a fresh install, startup seeding creates the admin from `ADMIN_USERNAME` with roleId `2` (Global admin) when the `user` table is empty. Roles for reference: 1 = Tenant user global, **2 = Global admin**, 3 = Global viewer, 6 = Tenant admin, 7 = Tenant viewer, 8 = Standard tenant access.

:::

## Part C — Configure the frontend

Set the frontend build-time variables in `packages/fe/.env` (see [Configuring Ed-Fi Admin App](../configuring-admin-app.md) for the full set). Only two are provider-specific for Entra:

- `VITE_OIDC_ID=1` — the `oidc` row the login button targets (`1` on a single-provider fresh install; the shipped default).
- `VITE_IDP_ACCOUNT_URL=https://myaccount.microsoft.com/` — drives the Account → Account Management self-service link.

:::warning

Do not point `VITE_IDP_ACCOUNT_URL` at `portal.azure.com` or `entra.microsoft.com` — those are admin consoles, not end-user self-service. These are build-time variables, so set them before `npm run build:fe`.

:::

## Part D — Validate end-to-end

1. Start the API so it reads the `oidc` table and registers the Entra strategy.
2. Open the Admin App in a clean browser at the frontend site, for example `https://localhost:4443`.
3. Login redirects to Microsoft sign-in, then back through `/api/auth/callback/<oidc-id>` into the app.
4. Confirm you land authenticated (no `Invalid email from IdP`, no `USER_NOT_FOUND`).

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Invalid email from IdP` | `email` claim empty | Re-check A4 and that `scope` includes `email`; use an account with a real email |
| `USER_NOT_FOUND` | admin not seeded with that email | Set `ADMIN_USERNAME` (Part B) |
| `NO_ROLE` | user exists without a role | Assign a role (for example, roleId 2) |
| `redirect_uri` mismatch (from Microsoft) | Entra redirect URI does not match the callback | Make them match exactly |
| Discovery error at API startup | wrong issuer | Confirm `https://login.microsoftonline.com/<tenantId>/v2.0` |
