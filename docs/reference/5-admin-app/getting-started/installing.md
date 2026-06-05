---
sidebar_position: 1
---

# Installing Ed-Fi Admin App

The Ed-Fi Admin App can be installed in one of three **alternative** ways. These
are independent paths, not sequential steps — pick the one that matches your
target environment and follow that page from start to finish.

## Prerequisites

The following are common to all installation paths. Path-specific prerequisites
are listed on each page.

- **PostgreSQL** (or **SQL Server**, where supported) database server, with an
  empty database created for the Admin App (the examples use the name `sbaa`)
- **Node.js** version 22.0.0 or higher
- **An Identity Provider (IdP)** — Keycloak is the recommended OIDC provider. See
  [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md).
- **SSL/TLS certificates** for HTTPS endpoints
- **Yopass** (optional) for securely sharing secrets. See the
  [Yopass Administrator Guide](../configuration/yopass-administrators-guide/readme.md).

## Choose an installation path

| Path | When to use |
| --- | --- |
| [Docker Compose Installation](./docker-installation.md) | The easiest path. Run the Admin App and its dependencies as containers, on-premises or in the Cloud. |
| [Windows IIS Installation](./windows-iis-installation.md) | Host the backend API and frontend on Windows Server using Internet Information Services (IIS). |
| [Unix-like Systems Installation](./unix-installation.md) | Host the backend API with systemd and serve the frontend with NGiNX on a Linux or other Unix-like server. |

:::note
You only need to complete **one** of the paths above. After installing,
configure the application using the
[Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md) page and review the
[Security Considerations](../configuration/security-considerations.md) before going to
production.
:::

## Next steps

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
