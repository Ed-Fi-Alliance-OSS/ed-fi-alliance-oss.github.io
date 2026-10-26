---
description: What you need before deploying each Ed-Fi Technology Stack component (Ed-Fi API v8, Ed-Fi ODS/API 7.3, Admin App and Admin API), with links to each component's full requirements.
---

# Prerequisites by Component

Each component of the Ed-Fi Technology Stack has its own prerequisites. Check
the requirements for each component you plan to deploy, rather than combining
them into one list. The summaries below are copied from each component's
documentation; follow the link for the full, current requirements.

| Component | Prerequisites (summary) | Full requirements |
| --- | --- | --- |
| Ed-Fi API v8 | Docker Desktop or Podman Desktop with Docker Compose v2, PowerShell 7.0, and Git. PostgreSQL 16 is bundled in the provided Docker Compose files; SQL Server 2022 is optional. | [Ed-Fi API v8 Getting Started](/reference/ed-fi-api/8/getting-started/) |
| Ed-Fi ODS/API 7.3 | Tested on Windows Server 2022 or Windows 10, with Microsoft SQL Server 2019 or PostgreSQL 16.x. Binary and source installations need PowerShell 5.0, 7.2, or 7.3 and the .NET 10.0 SDK; binary installations also need IIS and the .NET 10.0 Hosting Bundle on the web server, and source installations need Visual Studio 2022. | [Ed-Fi ODS/API Getting Started](/reference/ed-fi-api/getting-started/) |
| Admin App | Windows Server 2019+ or Linux (Ubuntu 20.04+, RHEL 8+), at least 4 GB RAM and 10 GB free storage, Node.js 22.0.0 or higher, and SSL/TLS certificates for HTTPS. Requires a running Ed-Fi ODS/API and Admin API, with Admin API first-time configuration completed. | [Admin App Getting Started](/reference/admin-app/getting-started/) |
| Admin API 2.3 | A running Ed-Fi ODS/API (v7.x or v6.x). IIS installation needs IIS and the .NET 8 Hosting Bundle v8.0.21 or higher; Docker installation needs a SQL Server or PostgreSQL database server on the same platform as your ODS/API. | [Admin API 2.3 Installation](/reference/admin-api/getting-started/admin-api-2.3-newer/installation-2.3/) |

## Deploying a Component vs Planning an Implementation

These prerequisites cover deploying the software. Planning an implementation
project, including timelines, roles, governance, and working with vendors and
districts, is covered by the implementation playbooks:

- [State Education Agencies - Implementation Playbook](./sea-playbook/readme.md)
- [Education Service Agency (ESA) Playbook](./esa-playbook/readme.md)
- [Technology Providers - Implementation Playbook](./provider-playbook/readme.md)
