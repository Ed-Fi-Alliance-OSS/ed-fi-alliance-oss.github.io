---
sidebar_position: 3
---

# Semi-automated

Automate some sections and hand-configure others — for example, script the prerequisites and the build, then deploy against an existing IIS setup by hand. Each script below automates one section; any script can be skipped in favor of the matching [Manual](./manual.md) steps.

First clone the scripts (see [Automated](./automated.md#get-the-scripts)), then run the ones you want from an elevated PowerShell in `windows-install/`, in the order below.

| Order | Script | What it automates | Manual section |
| --- | --- | --- | --- |
| 0 (fresh VM) | `setup-vm-prereqs.ps1` | OS-level installs: IIS feature set, SQL Server Developer, Git. Scans first, installs only what is missing; also sets the execution policy and unblocks the scripts. | [Windows Prerequisites](./manual.md#windows-prerequisites) |
| 1 | `01-prereqs-iis.ps1` | URL Rewrite Module + the httpPlatform handler (HttpBridge by default, or Microsoft HttpPlatformHandler); unlocks the `handlers` configuration section. | [Windows Prerequisites](./manual.md#iis-modules) |
| 2 | `02-prereqs-sql.ps1` | SQL Server Mixed Mode + TCP/IP + `sa`; creates the `sbaa` database and a dedicated least-privilege login (`edfi_adminapp`) the app connects as. | [Database](./manual.md#database) |
| 3 | `03-prereqs-node.ps1` | Installs Node.js (the major version pinned in `engines.node`); remediates a too-old Node via nvm-windows. | [Node.js](./manual.md#nodejs) |
| 4 | `04-build.ps1` | `npm ci` + build API + build frontend. Seeds the frontend `.env` before building. | [Backend API](./manual.md#backend-api-installation) / [Frontend](./manual.md#frontend-installation) |
| 5 | `05-deploy-api.ps1` | Deploys the API as standalone site `EdFi-AdminApp-API` (HTTPS :3443; HTTP :3333 redirects): web.config, App Pool, `production.js`, App-Pool-scoped npm cache. | [Backend API](./manual.md#backend-api-installation) |
| 6 | `06-deploy-fe.ps1` | Deploys the frontend as standalone site `EdFi-AdminApp-FE` (HTTPS :4443; HTTP :4200 redirects). | [Frontend](./manual.md#frontend-installation) |
| verify | `00-check-prereqs.ps1` | Read-only diagnostic: IIS (and version), database, Node, build artifacts, and whether ports 3333/4200/3443/4443 are free. | [Verify prerequisites](./manual.md#verify-prerequisites) |
| optional | `idp-keycloak-setup.ps1` | Installs a JDK, downloads and starts a local Keycloak, provisions realm `edfi`, client `edfiadminapp`, and a test user. | [Identity provider](./manual.md#identity-provider) |
| optional | `idp-keycloak-start.ps1` | Restarts the local Keycloak (e.g. after a reboot). | [Identity provider](./manual.md#identity-provider) |
| optional | `yopass-docker.ps1` | Stands up a local Yopass via Docker. | [Yopass](./manual.md#yopass-optional) |
| optional | `install-all.ps1` | Runs the whole sequence end to end (see [Automated](./automated.md)). | (whole install) |

To remove an install, use `uninstall.ps1` (generic) and, for the local Keycloak, `uninstall-keycloak.ps1` (removes Keycloak and unsets `JAVA_HOME`; leaves the JDK installed).
