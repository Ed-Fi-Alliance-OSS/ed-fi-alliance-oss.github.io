---
sidebar_position: 2
---

# Automated

The fastest path: install the whole stack with the PowerShell scripts from the [Admin App Installation Scripts repository](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts), with no manual steps. For what each step configures under the hood, see [Manual](./manual.md).

## Get the scripts

Clone the repository into a dedicated parent folder, then open the `windows-install` folder from an elevated PowerShell:

```powershell
git clone https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts.git C:\Ed-Fi\Admin-App-Installation-Scripts
cd C:\Ed-Fi\Admin-App-Installation-Scripts\windows-install
```

:::info Where the folders end up
`install-all.ps1` clones the Admin App source **beside** the scripts repository, not inside it, so where you put the scripts determines where the source lands. With the commands above:

```text
C:\Ed-Fi\
├── Admin-App-Installation-Scripts\   the scripts you cloned
│   └── windows-install\              run the scripts from here
└── Ed-Fi-AdminApp\                   the Admin App source, cloned for you
```

Avoid a user profile folder like `Downloads`, since the Admin App source lands beside it. To put the source somewhere else, pass `-SourcePath`. If the scripts already sit inside an Admin App checkout, that checkout is used instead of a new clone.
:::

:::note
On a bare machine without Git, download the repository as a ZIP from GitHub (**Code → Download ZIP**) and extract it under `C:\Ed-Fi`, so it sits where the clone above would have put it. Only the location matters, not the extracted folder's name. `setup-vm-prereqs.ps1` installs Git afterward. If PowerShell refuses to run the scripts (they carry the internet Mark of the Web), `setup-vm-prereqs.ps1` unblocks them and sets the execution policy; to do it by hand, run `Get-ChildItem *.ps1 | Unblock-File` and `Set-ExecutionPolicy -Scope Process Bypass`.
:::

## Windows Server prerequisite: install winget

The scripts use the Windows Package Manager (`winget`) to install Node.js, OpenJDK, SQL Server, and Git. It ships with Windows 10 and Windows 11 but is **not** included on Windows Server 2019 or 2022, so install it there before running `setup-vm-prereqs.ps1`. (`00-check-prereqs.ps1` reports when winget is missing.)

- **Official Microsoft guidance:** see [Install WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget). Because Windows Server 2019/2022 do not include the Microsoft Store, install the App Installer package directly from the official [microsoft/winget-cli releases](https://github.com/microsoft/winget-cli/releases).
- **Community helper (optional):** the [`winget-install`](https://www.powershellgallery.com/packages/winget-install) PowerShell Gallery script is a third-party tool that installs winget in a single command. It downloads only from official Microsoft and GitHub sources, though it is not maintained or endorsed by Ed-Fi or Microsoft.

## Run everything at once

On a fresh machine, run `setup-vm-prereqs.ps1` first — it installs the operating-system-level pieces: IIS, SQL Server, and Git — then `install-all.ps1`.

`install-all.ps1` fetches the Admin App source for you — by default it clones the latest stable release of `Ed-Fi-AdminApp` beside the scripts repository, as shown in [Get the scripts](#get-the-scripts). To build from a checkout you already have, pass `-SourcePath`; to pin a specific version, pass `-AdminAppRef <tag>` (for example `-AdminAppRef v4.0.1`).

`install-all.ps1` can be run with **no parameters**. It applies sensible defaults (SQL Server, the latest stable Admin App release, and the seeded administrator `admin@example.com`) and prompts at the console for anything it requires, including the identity provider (`-IdpProvider`) and any secrets. It always asks for the identity provider, so the choice is explicit; this guide uses `keycloak`.

Running with the defaults stands up the local Keycloak (realm `edfi`, client `edfiadminapp`, and a test user), creates the least-privilege `edfi_adminapp` database login, and deploys the API and Web Application in the same run.

Pass a parameter only to change something the defaults do not cover. PostgreSQL is the common case: the engine and the bundled container are not prompted for, though its passwords are.

**Example — PostgreSQL via Docker** (no local SQL Server; the bundled docker-compose runs PostgreSQL and requires Docker Desktop in Linux-container mode):

```powershell
.\install-all.ps1 -DbEngine pgsql -UsePostgresDocker
```

**Example — managed Azure SQL Database** (provision the logical server, a client-IP firewall rule, and an empty database in Azure first — see [Database](./manual.md#database)):

```powershell
.\install-all.ps1 -SqlServerHost myserver.database.windows.net -SqlAdminUsername sqladmin
```

The script prompts for `-SqlAdminPassword`, `-AppDbPassword`, and the rest, the same as any other run. It provisions the Admin App login as a contained user, connects with encryption and validates the server certificate, and configures the API to do the same — nothing to set by hand. For a remote server that presents a self-signed certificate rather than a CA-issued one, add `-TrustServerCertificate`, which turns that validation off. Azure rejects a database password containing the login name, so avoid `edfi_adminapp` in the value; the script checks this up front.

:::note
By default the sites use a self-signed certificate (auto-trusted on this machine only). To bind a real certificate, pass `-CertificateThumbprint`, or `-CertificatePfxPath` with `-CertificatePassword` (see [TLS and certificates](./manual.md#tls-and-certificates)). Yopass is off by default; add `-SetupYopassDocker` to stand up a local Yopass via Docker, or `-YopassUrl <url>` to point at an existing one.
:::

`install-all.ps1` is idempotent: if a step fails, fix the cause and re-run. `-SkipPhase1` (skip prerequisites) and `-SkipPhase2` (skip build) speed up re-runs.

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and its startup task, and unsets `JAVA_HOME`; leaves the JDK installed). Against a managed Azure SQL Database, pass the same `-SqlServerHost` and `-SqlAdminUsername`: the database itself is yours and is left untouched, and only the Admin App's contained user is removed.

For the full list of parameters and configuration options, see the [`windows-install/README.md`](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts/blob/main/windows-install/README.md) in the scripts repository, or run `Get-Help .\install-all.ps1 -Full`.

## First sign-in

Open the Web Application at `https://localhost:4443` and sign in through the identity provider. For the local Keycloak example, use the seeded user — email `admin@example.com` (the `-AdminUsername` / `-TestUserEmail` default) and the test-user password you entered when the script prompted for it (`-TestUserPassword`). This first user is the bootstrap administrator; additional users must be granted access from within the Admin App afterward.

## After a restart: the Keycloak startup task

After the host restarts, the local Keycloak is not running. The API needs Keycloak to be answering requests by the time the API starts, so the two have to come back in that order: Keycloak first, then the API.

The install does this for you. `install-all.ps1` (through `idp-keycloak-setup.ps1`) registers a scheduled task named `Ed-Fi Admin App Keycloak`, triggered at system startup and running as `SYSTEM`, which:

1. Starts Keycloak from its install folder (`C:\keycloak` by default).
2. Waits for the OIDC discovery endpoint to respond, up to `-ReadyTimeoutSeconds` (120 by default).
3. Recycles the `EdFi-AdminApp-API` App Pool, so the API starts again with Keycloak already running.

No manual step is needed after a restart, though a sign-in attempted before the task finishes can fail. If sign-in does not work, wait a moment and retry; if it still fails, check the task's log at `C:\keycloak\keycloak-startup-task.log`.

To start Keycloak again without restarting the host, run `idp-keycloak-start.ps1`.

`uninstall-keycloak.ps1` removes the task along with Keycloak. To remove only the task:

```powershell
schtasks /delete /tn 'Ed-Fi Admin App Keycloak' /f
```

:::note
This task belongs to the local Keycloak example. It is not registered when the Admin App points at an external identity provider, which is expected: an external provider does not need to be started on this host.
:::

## Next steps

A fresh install has no users, teams, or environments yet. The Global Admin Quick Start seeds that starter configuration, so it is the recommended next step.

- [Global Admin Quick Start](../../user-guide/global-admin-quick-start/readme.md)
- [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md)
- [Security Considerations](../../configuration/security-considerations.md)
- [Global Administration Tasks](../../configuration/global-administration-tasks.md)
