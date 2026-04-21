# Docker Compose (Demo)

:::warning

**The bundled Docker Compose stack is for demo and evaluation only.** It
enables a small, self-contained environment for development, testing against
a known data set, or trying OneRoster end-to-end with a bundled Ed-Fi ODS/API
and OAuth token issuer. Do not use it for production.

For production-supported deployments, use one of the native paths:
[PostgreSQL](./deploy-postgres.md), [Microsoft SQL
Server](./deploy-mssql.md), or [IIS](./deploy-iis.md).

:::

The Docker Compose configuration lives in the OneRoster service repository
under `compose/`. It starts the Ed-Fi ODS/API v7 stack, an OAuth issuer /
Swagger UI, an NGINX TLS reverse proxy, and the OneRoster Node service, all
wired together on a shared Docker network.

## What gets deployed

| Service | Role |
|---|---|
| `db-ods`, `db-admin` | PostgreSQL containers seeded from the Ed-Fi populated template |
| `v7-single-api` | Ed-Fi ODS/API v7 (used as the OAuth issuer and Ed-Fi resource API) |
| `swagger` | Bundled Swagger UI for the Ed-Fi v7 API |
| `pgadmin4` | Optional database browser at `http://localhost:5050` |
| `nginx` | Terminates TLS on `https://localhost:443` and routes to the APIs |
| `oneroster-api` | The OneRoster Node service, built from the repo root |

## Prerequisites

- Docker Desktop (or Docker Engine) with Compose v2
- PowerShell 7+ (`pwsh`) — the helper scripts are written in PowerShell and
  run cross-platform
- Git (to clone the repository)

## Quick start

From a clone of `Ed-Fi-Alliance-OSS/edfi-oneroster`:

```bash
cd compose
cp .env.5.2.0.example .env.5.2.0
# edit .env.5.2.0 to set credentials, image tags, and JWT keys as needed
```

Then start the stack. The helper script launches all compose files together
and can generate JWT signing keys for a quick trial:

```bash
pwsh ./start-services.ps1 -EnvFile ./.env.5.2.0 -GenerateSigningKeys -InitializeAdminClients
```

Key flags:

- `-EnvFile` — points at the `.env` variant for the Data Standard version
  you want (`.env.5.2.0` or `.env.4.0.0`). Relative paths resolve from
  `compose/`.
- `-GenerateSigningKeys` — creates an ephemeral RSA key pair and injects it
  as `SECURITY__JWT__PRIVATEKEY` / `SECURITY__JWT__PUBLICKEY`. Use when you
  don't already have keys set.
- `-InitializeAdminClients` — seeds test vendors / clients (using
  `LEA_KEY`, `LEA_SECRET`, `SCHOOL_KEY`, `SCHOOL_SECRET` from the env file)
  via the bootstrap script.
- `-Rebuild` — rebuilds the OneRoster image before starting; use after
  changing OneRoster source.

The script validates that JWT signing keys exist (in the environment, env
file, or via `-GenerateSigningKeys`) before starting containers.

## Accessing the stack

Once the containers are healthy:

| Service | URL |
|---|---|
| Ed-Fi API | `https://localhost/<V7_SINGLE_API_VIRTUAL_NAME>` |
| OneRoster API | `https://localhost/<ONEROSTER_API_VIRTUAL_NAME>` |
| Swagger UI | `https://localhost/<DOCS_VIRTUAL_NAME>` |
| pgAdmin | `http://localhost:5050` |

The virtual-name values come from the env file and must match the NGINX
template under `compose/ssl/` so TLS certificates resolve correctly.

## Picking an env file

| File | Target Data Standard |
|---|---|
| `compose/.env.5.2.0.example` | Ed-Fi Data Standard 5.2.0 (default) |
| `compose/.env.4.0.0.example` | Ed-Fi Data Standard 4.0.0 |

Rename a copy to `.env.5.2.0` / `.env.4.0.0` (the version-numbered files are
git-ignored working copies), or pass the file path directly to the helper
scripts with `-EnvFile`.

See [Environment variables](../configuration/environment-variables.md) for
the full list of configuration keys.

## Stopping the stack

```bash
pwsh ./stop-services.ps1 -EnvFile ./.env.5.2.0
```

- `-Purge` adds `--volumes --rmi all` to tear down the database volumes and
  images as well — useful when switching Data Standards or templates.
- `-EnvFile` should match the file used when starting so the correct compose
  project is torn down.

## Security hardening for custom compose files

If you adapt the sample compose files into your own stack (even for staging),
apply the same least-privilege controls the Ed-Fi Alliance applies elsewhere:

- `cap_drop: [ALL]` by default; add back only capabilities a container needs
- Run workload containers as a non-root user (`USER` in the Dockerfile,
  `user:` in Compose)
- `security_opt: ["no-new-privileges:true"]`
- Apply seccomp / AppArmor / SELinux profiles per host platform
- Do _not_ use `privileged: true`, host namespaces, or broad device mounts

Example service hardening for the OneRoster Node container:

```yaml
services:
  oneroster-api:
    build: ../
    user: appuser
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges:true
```

For third-party images (database, reverse proxy, admin tools), follow vendor
guidance before dropping capabilities — some need them to initialize.
