---
sidebar_position: 2
---

# Automated

The fastest path: install the whole stack with the PowerShell scripts from the [Admin App Installation Scripts repository](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts), with no manual steps. For what each step configures under the hood, see [Manual](./manual.md).

## Get the scripts

Clone the repository and open the `windows-install` folder from an elevated PowerShell:

```powershell
git clone https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts.git
cd Admin-App-Installation-Scripts\windows-install
```

:::note
On a bare machine without Git, download the repository as a ZIP from GitHub (**Code → Download ZIP**) and extract it — `setup-vm-prereqs.ps1` installs Git afterward. If PowerShell refuses to run the scripts (they carry the internet Mark of the Web), `setup-vm-prereqs.ps1` unblocks them and sets the execution policy; to do it by hand, run `Get-ChildItem *.ps1 | Unblock-File` and `Set-ExecutionPolicy -Scope Process Bypass`.
:::

## Run everything at once

On a fresh machine, run `setup-vm-prereqs.ps1` first (it installs the OS-level pieces: IIS, SQL Server, Git), then `install-all.ps1`. Both run from an elevated PowerShell in the `windows-install` folder. Choose the identity provider with the mandatory `-IdpProvider` parameter; this guide uses `keycloak`.

`install-all.ps1` fetches the Admin App source for you — by default it clones the latest stable release of `Ed-Fi-AdminApp` as a sibling folder (for example `C:\Ed-Fi\Ed-Fi-AdminApp`). To build from a checkout you already have, pass `-SourcePath`; to pin a specific version, pass `-AdminAppRef <tag>` (for example `-AdminAppRef v4.0.1`).

:::tip
Run the examples below **exactly as written** — do not substitute your own passwords into them. Each `(Read-Host -AsSecureString '...')` tells PowerShell to **prompt you for that value at the console** when the command runs (your input stays hidden). Paste the whole command, press Enter, and type each secret when prompted. Replacing the `Read-Host` calls with literal password text is what causes errors, so leave them as-is.
:::

For the full list of parameters and configuration options, see the [`windows-install/README.md`](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts/blob/main/windows-install/README.md) in the scripts repository, or run `Get-Help .\install-all.ps1 -Full`.

**Local Keycloak, SQL Server** — the default:

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -SaPassword (Read-Host -AsSecureString 'SQL Server sa password') `
  -AppDbPassword (Read-Host -AsSecureString 'Admin App DB login password') `
  -KeycloakAdminPassword (Read-Host -AsSecureString 'Keycloak admin password') `
  -OidcClientSecret (Read-Host -AsSecureString 'OIDC client secret') `
  -TestUserPassword (Read-Host -AsSecureString 'Keycloak test-user password')
```

The password parameters are `SecureString`s, so pass them with `Read-Host -AsSecureString` (as above) rather than plain quoted strings. `-AppDbPassword` sets the password for the least-privilege `edfi_adminapp` login the script creates; it is required for SQL Server. This stands up the local Keycloak (realm `edfi`, client `edfiadminapp`, and a test user) and deploys the API and frontend as part of the run.

**Local Keycloak, PostgreSQL via Docker** — no local SQL Server; the bundled docker-compose runs PostgreSQL (requires Docker Desktop in Linux-container mode):

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -DbEngine pgsql -UsePostgresDocker `
  -PostgresSuperuserPassword (Read-Host -AsSecureString 'Postgres superuser password') `
  -PostgresAppPassword (Read-Host -AsSecureString 'Postgres app password') `
  -KeycloakAdminPassword (Read-Host -AsSecureString 'Keycloak admin password') `
  -OidcClientSecret (Read-Host -AsSecureString 'OIDC client secret') `
  -TestUserPassword (Read-Host -AsSecureString 'Keycloak test-user password')
```

**Microsoft Entra ID, SQL Server** — an external OIDC provider. Register the application and its redirect URIs in Entra first (or script that step with `idp-entra-setup.ps1` — see [Microsoft Entra ID](../../configuration/identity-provider/microsoft-entra-id.md#part-a--register-the-application-in-microsoft-entra-id)), and make sure a user exists there whose email matches `-AdminUsername`:

```powershell
.\install-all.ps1 -IdpProvider microsoft `
  -SaPassword (Read-Host -AsSecureString 'SQL Server sa password') `
  -AppDbPassword (Read-Host -AsSecureString 'Admin App DB login password') `
  -OidcIssuer 'https://login.microsoftonline.com/<tenant-id>/v2.0' `
  -OidcClientId '<application-id>' `
  -OidcClientSecret (Read-Host -AsSecureString 'Entra client secret') `
  -AdminUsername 'you@yourtenant.onmicrosoft.com'
```

**Google Workspace, SQL Server** — an external OIDC provider. The issuer is defaulted for Google; register the OAuth client first:

```powershell
.\install-all.ps1 -IdpProvider google `
  -SaPassword (Read-Host -AsSecureString 'SQL Server sa password') `
  -AppDbPassword (Read-Host -AsSecureString 'Admin App DB login password') `
  -OidcClientId '<google-client-id>' `
  -OidcClientSecret (Read-Host -AsSecureString 'Google client secret') `
  -AdminUsername 'you@yourdomain.com'
```

`-IdpProvider` accepts `keycloak`, `microsoft`, `google`, or `other` (a generic OIDC provider you register yourself). Pass `-OidcIssuer` and `-OidcClientId` for `microsoft` and `other`; for `keycloak` and `google` the issuer is defaulted. In every external-provider example, `-AdminUsername` is the email of the first (bootstrap) administrator — it must exactly match the `email` claim your identity provider returns for that user. See [Configuring an Identity Provider](../../configuration/identity-provider/readme.md) for how to register the application with each provider.

:::note
By default the sites use a self-signed certificate (auto-trusted on this machine only). To bind a real certificate, pass `-CertificateThumbprint`, or `-CertificatePfxPath` with `-CertificatePassword` (see [TLS and certificates](./manual.md#tls-and-certificates)). Yopass is off by default; add `-SetupYopassDocker` to stand up a local Yopass via Docker, or `-YopassUrl <url>` to point at an existing one.
:::

The script is idempotent: if a step fails, fix the cause and re-run. `-SkipPhase1` (skip prerequisites) and `-SkipPhase2` (skip build) speed up re-runs.

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and unsets `JAVA_HOME`; leaves the JDK installed).

## First sign-in

Open the frontend at `https://localhost:4443` and sign in through the identity provider. For the local Keycloak example, use the seeded user — email `admin@example.com` (the `-AdminUsername` / `-TestUserEmail` default) and the password you passed as `-TestUserPassword`. This first user is the bootstrap administrator; additional users must be granted access from within the Admin App afterward.

## Next steps

- [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider/readme.md)
- [Security Considerations](../../configuration/security-considerations.md)
- [Global Administration Tasks](../../configuration/global-administration-tasks.md)
