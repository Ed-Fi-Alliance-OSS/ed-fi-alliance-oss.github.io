---
sidebar_position: 2
---

# Machine User Setup (Optional)

The quick start calls the Admin App API as a **machine user**, authenticated
with a **service-account (machine-to-machine) token** obtained via the OAuth2
`client_credentials` grant. This is required because the Admin App has no
password endpoint — human login goes through the OIDC provider's browser flow,
so the bootstrap user's username and password cannot be passed to a script.

:::info

**You normally do not need this page.** `run.ps1` runs `bootstrap.ps1`, which
provisions the Keycloak machine client and seeds the machine user
automatically. Use this page when you want to configure the identity provider
by hand.

:::

## Setup Keycloak machine account (manually)

If you prefer to configure Keycloak manually instead of running the
[bootstrap script](run-the-quick-start), follow the steps below.

:::info

On the **Docker stack** this is already done: the bundled `edfiadminapp-machine`
service-account client/secret and carries all the required info. On other deployments (e.g. IIS-hosted) the machine client is
**not** present unless you add it — do the steps below once, in the `edfi`
realm. See also the Admin App's `compose/readme.md` ("Machine-to-Machine
Authentication").

:::

### 1. Create the `login:app` client scope

1. In the Keycloak admin console, select the `edfi` realm
2. Go to **Client scopes** in the left sidebar
3. Click **Create client scope**
4. Fill in:
   - **Name**: `login:app`
   - **Description**: `Access to Ed-Fi Admin App API`
   - **Type**: Default
   - **Protocol**: OpenID Connect
   - **Include in token scope**: ON
5. Click **Save**

### 2. Create the machine client

1. Go to **Clients** in the left sidebar
2. Click **Create client**
3. **General Settings**:
   - **Client type**: OpenID Connect
   - **Client ID**: `edfiadminapp-machine`
   - Click **Next**
4. **Capability config**:
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Authentication flow**: check only **Service accounts roles** (uncheck
     "Standard flow" and "Direct access grants")
   - Click **Next**
5. **Login settings**: leave empty and click **Save**
6. On the client's **Credentials** tab, copy the **Client Secret** — this is the
   value to use as `MACHINE_CLIENT_SECRET`

:::warning

**Importing the client JSON silently drops `serviceAccountsEnabled`** — if you
imported the bundled JSON instead of creating the client manually, re-enable
**Service accounts roles** on the client afterward, or the token request returns
`401 unauthorized_client` ("Client not enabled to retrieve service account").

:::

### 3. Add the protocol mappers

Navigate to the client's **Client scopes** tab, click
**edfiadminapp-machine-dedicated**, then **Add mapper** → **By configuration**,
and add:

1. An **Audience** mapper:
   - **Name**: `machine-client-audience`
   - **Included Custom Audience**: `edfiadminapp-api`
   - **Add to access token**: ON
2. A **User Session Note** mapper (lets the Admin App resolve the machine user):
   - **Name**: `client-id-mapper`
   - **User Session Note**: `clientId`
   - **Token Claim Name**: `client_id`
   - **Claim JSON Type**: String
   - **Add to ID token**: ON
   - **Add to access token**: ON

:::warning

**Use _Included Custom Audience_ = `edfiadminapp-api`** on the audience mapper,
not "Included Client Audience" (there is no client by that name, so the latter
adds nothing).

:::

### 4. Assign the client scopes

1. On the client's **Client scopes** tab, click **Add client scope**, select
   `login:app`, and add it as **Default** — this puts `scope = login:app` in the
   token
2. On the same tab, change the built-in **`roles`** scope's **Assigned type**
   from **Default** to **Optional**

:::warning

**Setting the `roles` scope to _Optional_ is required.** Otherwise Keycloak's
Audience Resolve mapper adds a second `account` audience, making `aud` an array
— and the Admin App requires `aud` to be the single value `edfiadminapp-api`.

:::

## Setup Microsoft Entra ID (not supported)

**Microsoft Entra ID** is **not supported** as the machine-token provider in
Admin App v4.0: Entra client-credentials tokens carry app permissions in the
`roles` claim rather than `scope`, and Admin App v4.0 does not read the
`login:app` grant from `roles`. Use Keycloak for the service account
instead.

## Google Workspace (not supported)

**Google Workspace** is **not supported** for machine-to-machine authentication:
its service-account tokens cannot carry the `login:app` claim the Admin App
requires. Use Keycloak for the service account instead.
