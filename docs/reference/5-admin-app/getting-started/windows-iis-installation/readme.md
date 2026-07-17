---
sidebar_position: 1
---

# Windows IIS Installation

This page describes how to install the Ed-Fi Admin App on Windows using Internet Information Services (IIS). It covers the backend API and the frontend single-page application, deployed as two standalone IIS sites over HTTPS.

:::note
This is one of three alternative installation paths. If you instead want to run the Admin App in containers or on a Unix-like server, see [Docker Compose Installation](../docker-installation.md) or [Unix-like Systems Installation](../unix-installation.md).
:::

## Before you start: decide three things

1. **Database engine** — SQL Server (default) or PostgreSQL. You need only one.
2. **Identity provider (IdP)** — the Admin App authenticates against an OIDC provider. This guide sets up **Keycloak**, running locally, as the example identity provider. The Admin App's auth engine uses generic OIDC discovery, but Keycloak is the identity provider documented for this release. See [Configuring an Identity Provider](../../configuration/identity-provider.md).
3. **How much to automate** — pick one of the three installation paths below.

:::info
Both IIS sites are served over **HTTPS by default** — API on port **3443** and frontend on port **4443**. Each also keeps an HTTP binding (**3333** / **4200**) that returns a 301 redirect to its HTTPS URL. When no certificate is supplied, a self-signed certificate is generated and trusted on the local machine; supply a real certificate for anything beyond this host (see [TLS and certificates](./manual.md#tls-and-certificates)). **IIS 10 or newer is required.**
:::

## Installation paths

Choose the path that fits how much you want to automate. All three produce the same two IIS sites.

- **[Automated](./automated.md)** — the whole stack in one command (`setup-vm-prereqs.ps1`, then `install-all.ps1`). Best for a fresh machine or a quick stand-up.
- **[Semi-automated](./semi-automated.md)** — automate some sections and hand-configure others, using the script-to-section map.
- **[Manual](./manual.md)** — every step by hand, with the exact `web.config` and `production.js`. The authoritative reference for what gets configured.
