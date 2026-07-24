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

## Windows Server prerequisite: install winget

The scripts use the Windows Package Manager (`winget`) to install Node.js, OpenJDK, SQL Server, and Git. It ships with Windows 10 and Windows 11 but is **not** included on Windows Server 2019 or 2022, so install it there before running `setup-vm-prereqs.ps1`. (`00-check-prereqs.ps1` reports when winget is missing.)

- **Official Microsoft guidance:** see [Install WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget). Because Windows Server 2019/2022 do not include the Microsoft Store, install the App Installer package directly from the official [microsoft/winget-cli releases](https://github.com/microsoft/winget-cli/releases).
- **Community helper (optional):** the [`winget-install`](https://www.powershellgallery.com/packages/winget-install) PowerShell Gallery script is a third-party tool that installs winget in a single command. It downloads only from official Microsoft and GitHub sources, though it is not maintained or endorsed by Ed-Fi or Microsoft.

## Run everything at once

On a fresh machine, run `setup-vm-prereqs.ps1` first (it installs the operating-system-level pieces: IIS, SQL Server, Git), then `install-all.ps1`. Both run from an elevated PowerShell in the `windows-install` folder. Choose the identity provider with the mandatory `-IdpProvider` parameter; this guide uses `keycloak`.

You can run `install-all.ps1` with **no parameters**: it applies sensible defaults (SQL Server, the latest stable Admin App release, and the seeded administrator `admin@example.com`) and prompts you at the console for the identity provider and any secrets it needs. The blocks below are **examples of common configurations** to copy and adapt; you do not have to pass these parameters.

`install-all.ps1` fetches the Admin App source for you — by default it clones the latest stable release of `Ed-Fi-AdminApp` as a sibling folder (for example `C:\Ed-Fi\Ed-Fi-AdminApp`). To build from a checkout you already have, pass `-SourcePath`; to pin a specific version, pass `-AdminAppRef <tag>` (for example `-AdminAppRef v4.0.1`).

:::tip
**If you use one of the examples below**, run it **exactly as written** — do not substitute your own passwords into them. Each `(Read-Host -AsSecureString '...')` tells PowerShell to **prompt you for that value at the console** when the command runs (your input stays hidden). Paste the whole command, press Enter, and type each secret when prompted. Replacing the `Read-Host` calls with literal password text is what causes errors, so leave them as-is.
:::

For the full list of parameters and configuration options, see the [`windows-install/README.md`](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts/blob/main/windows-install/README.md) in the scripts repository, or run `Get-Help .\install-all.ps1 -Full`.

**Example — local Keycloak, SQL Server (the default):**

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -AppDbPassword (Read-Host -AsSecureString 'Admin App database login password') `
  -KeycloakAdminPassword (Read-Host -AsSecureString 'Keycloak admin password') `
  -OidcClientSecret (Read-Host -AsSecureString 'OIDC client secret') `
  -TestUserPassword (Read-Host -AsSecureString 'Keycloak test-user password')
```

The password parameters are `SecureString`s, so pass them with `Read-Host -AsSecureString` (as above) rather than plain quoted strings. `-AppDbPassword` sets the password for the least-privilege `edfi_adminapp` login the script creates; it is required for SQL Server. This stands up the local Keycloak (realm `edfi`, client `edfiadminapp`, and a test user) and deploys the API and Web Application as part of the run.

**Example — local Keycloak, PostgreSQL via Docker** (no local SQL Server; the bundled docker-compose runs PostgreSQL, and requires Docker Desktop in Linux-container mode):

```powershell
.\install-all.ps1 -IdpProvider keycloak `
  -DbEngine pgsql -UsePostgresDocker `
  -PostgresSuperuserPassword (Read-Host -AsSecureString 'PostgreSQL superuser password') `
  -PostgresAppPassword (Read-Host -AsSecureString 'PostgreSQL app password') `
  -KeycloakAdminPassword (Read-Host -AsSecureString 'Keycloak admin password') `
  -OidcClientSecret (Read-Host -AsSecureString 'OIDC client secret') `
  -TestUserPassword (Read-Host -AsSecureString 'Keycloak test-user password')
```

:::note
By default the sites use a self-signed certificate (auto-trusted on this machine only). To bind a real certificate, pass `-CertificateThumbprint`, or `-CertificatePfxPath` with `-CertificatePassword` (see [TLS and certificates](./manual.md#tls-and-certificates)). Yopass is off by default; add `-SetupYopassDocker` to stand up a local Yopass via Docker, or `-YopassUrl <url>` to point at an existing one.
:::

The script is idempotent: if a step fails, fix the cause and re-run. `-SkipPhase1` (skip prerequisites) and `-SkipPhase2` (skip build) speed up re-runs.

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and unsets `JAVA_HOME`; leaves the JDK installed).

## First sign-in

Open the Web Application at `https://localhost:4443` and sign in through the identity provider. For the local Keycloak example, use the seeded user — email `admin@example.com` (the `-AdminUsername` / `-TestUserEmail` default) and the password you passed as `-TestUserPassword`. This first user is the bootstrap administrator; additional users must be granted access from within the Admin App afterward.

## Next steps

- [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md)
- [Security Considerations](../../configuration/security-considerations.md)
- [Global Administration Tasks](../../configuration/global-administration-tasks.md)
