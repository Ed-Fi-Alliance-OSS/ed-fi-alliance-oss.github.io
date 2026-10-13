# ADR: Admin App Global Admin Quick Start — connected (API) vs offline (SQL) provisioning, and machine-to-machine authentication

- **Status:** Proposed
- **Date:** 2026-07-01
- **Ticket:** EDFI-2780
- **Deciders:** Admin App maintainers / reviewers

> Working note attached to the `EDFI-2780_AdminApp_QuickStart` PR to make the tradeoffs
> explicit. Not published to docs.ed-fi.org.

## Context

The Global Admin Quick Start exists so that, right after installing the Ed-Fi Admin App, an
administrator can reach the management screens (environments, ODS instances, applications)
without manually clicking through user → team → environment → ownership setup. The Quick
Start stands up that starter configuration: an admin user, a team with membership, an
environment, a default Ed-Fi tenant, one or more ODS instances (each with an education
organization), and the ownership rows that tie them together.

There are two ways to create that configuration, and they are **not** equivalent:

- **Direct SQL seed** into the Admin App application database (`sbaa`). This injects
  `configPublic` and the ODS/Ed-Org rows directly. It is fast and needs no authentication,
  but it produces a **"lists-only"** environment. It cannot:
  - **encrypt the per-tenant Admin API secret into `configPrivate`** — the Admin App
    encrypts that value with an application-held key, so SQL leaves `configPrivate` NULL;
  - **run ODS/API discovery** — detect the ODS/API version (v1/v2) and tenant mode from the
    discovery URL;
  - **register OAuth client credentials** at the Admin API `/connect/register`;
  - **sync ODS instances / education organizations** from the Admin API into the local
    tables.

  As a result, the Applications, Profiles, and Ed-Org-sync screens do not authenticate
  against the live Admin API until the environment is later connected through the app UI.

- **API-based provisioning** — a script POSTs to the Admin App REST API
  (`POST /adminapp-api/api/sb-environments`) so the application runs its real
  `create()` flow: it validates the URLs, auto-detects version/tenant mode, registers and
  **AES-encrypts** the credentials into `configPrivate`, and syncs the ODS instances /
  Ed-Orgs. The result is a **fully connected** environment.

The API endpoints sit behind the Admin App `AuthenticatedGuard`, and the Admin App has **no
password endpoint** — human login is the OIDC browser (authorization-code) flow only.
Therefore any non-interactive script that drives these endpoints must present a
**service-account / machine token** obtained via the OAuth2 `client_credentials` grant. This
is the sole reason machine-to-machine (M2M) authentication is involved; it is an enabling
mechanism for the connected Quick Start, not a feature in its own right, and it is not
currently a documented feature of the Admin App.

## Decision drivers

- Let an administrator reach the management screens quickly after install.
- Whether the Applications / Profiles / Ed-Org screens should actually work out of the box
  (connected) or only list seeded rows (offline).
- Minimize new authentication surface area and ongoing maintenance.
- Remain provider-agnostic: the reference stack ships Keycloak, but some deployments use
  Microsoft Entra ID or Auth0.

## Considered options

### 1. SQL seed only (offline)

- **Pros:** simplest; no authentication or IdP setup; deterministic and re-runnable;
  already shipped.
- **Cons:** lists-only. Cannot encrypt `configPrivate`, run discovery, register credentials,
  or sync — so Applications/Profiles/Ed-Org sync do not authenticate until the environment
  is connected manually.

### 2. API provisioning with an M2M token (connected)

- **Pros:** produces a fully functional environment via the real `create()` path;
  provider-agnostic (validated only against the configured `ISSUER` / `MACHINE_AUDIENCE` and
  the `login:app` grant).
- **Cons:** requires an IdP machine client and a **pre-seeded machine-user row** in the
  Admin App (the token is only accepted once that user exists, so it cannot be created
  through the API); exercises a `client_credentials` path that is otherwise undocumented;
  each IdP has quirks (see Consequences).

### 3. Manual UI clickthrough

- **Pros:** no scripting or auth infrastructure.
- **Cons:** not automatable — defeats the purpose of a "quick start."

### 4. App-side bootstrap / maintenance command

- **Pros:** the app mints its own token or exposes a maintenance command, avoiding an
  external IdP M2M client.
- **Cons:** a larger new application feature to design, build, and maintain; out of scope
  for this change.

## Decision outcome (neutral)

- **Keep** the SQL seed as the offline / "lists-only" Quick Start.
- **Offer** the API-based Quick Start as the connected alternative, authenticating with a
  `client_credentials` M2M token.
- The `AuthenticatedGuard` was made **provider-tolerant** — it reads the caller id from
  `client_id` / `azp` / `appid` and the `login:app` grant from `scope` / `scp` / `roles`, so
  the same path works with Keycloak, Auth0, and Entra ID. The change is backward-compatible
  with the existing Keycloak flow and covered by a unit test.

**Open question for reviewers:** is a connected Quick Start valuable enough to justify
carrying and documenting M2M support, or is the offline SQL seed sufficient — in which case
the API path should be kept experimental or dropped? This ADR exists to enable that
decision with the full picture in view.

## Consequences

- **Positive:** a connected, fully functional environment out of the box; provider-agnostic;
  the guard change is backward-compatible and unit-tested; the SQL path is retained
  regardless of the outcome.
- **Costs / negative:** M2M becomes a newly-exercised authentication path that requires an
  IdP machine client and a pre-seeded machine-user row. Provider specifics: Entra ID delivers
  `login:app` in the `roles` claim (handled by the guard change) and its token `iss`/`aud`
  depend on the API app's `requestedAccessTokenVersion`; Google Workspace M2M is
  **not supportable** because its service-account tokens cannot carry the `login:app` claim.
- **Neutral:** the offline SQL seed remains available and unchanged.

## References

- `docs/reference/5-admin-app/user-guide/global-admin-quick-start.mdx` (SQL / offline)
- `docs/reference/5-admin-app/user-guide/global-admin-quick-start-api.mdx` (API / connected)
- `Ed-Fi-AdminApp/packages/api/src/auth/login/authenticated.guard.ts` — provider-tolerant
  machine-token check (+ `authenticated.guard.spec.ts`)
- `Ed-Fi-AdminApp/packages/api/src/auth/auth.service.ts` — `verifyBearerJwt` (issuer/audience
  validation)
- `drafts/adminapp-m2m-entra-and-google.md` — Entra/Google M2M working notes and
  troubleshooting
