# CORS, Rate Limiting, and Proxy

The OneRoster© service exposes three cross-cutting runtime controls that
govern how requests are admitted into the application:

- CORS origin allowlisting (`CORS_ORIGINS`)
- Per-IP rate limiting on the `/ims/oneroster/*` routes
  (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`)
- Trust-proxy behavior when the service sits behind a reverse proxy
  (`TRUST_PROXY`)

All three are controlled by environment variables; see [Environment
variables](./environment-variables.md) for the full reference. This page
describes the runtime behavior so operators can predict it and diagnose
issues.

## CORS origins

`CORS_ORIGINS` is a comma-separated list of origins (scheme + host + port)
that the service accepts as CORS origins. The value in the `.env.example`
is:

```env
CORS_ORIGINS=http://localhost:3000
```

Behavior at startup:

- If `CORS_ORIGINS` is **empty or unset**, the service allows all origins
  (equivalent to `cors({ origin: true })`). This is convenient for local
  development but is not recommended for production.
- If `CORS_ORIGINS` is set, the service only allows exact matches from
  the comma-separated list. Requests with a disallowed `Origin` header
  are rejected with a CORS error; requests with **no** `Origin` header
  (curl, Postman, server-to-server) are always allowed through.

Origins are matched on the full string (scheme + host + port) and are not
wildcard-expanded. To allow a Swagger UI served alongside the ODS/API,
include its origin, for example:

```env
CORS_ORIGINS=https://oneroster.example.org,https://odsapi.example.org:56641
```

Tokens still need to satisfy the JWT validation regardless of origin; CORS
only decides whether the browser is allowed to read the response.

## Rate limiting

The `/ims/oneroster/*` routes are rate-limited by
[`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit)
using the IP address of the client. Other routes (`/health-check`,
`/docs`, `/swagger.json`, `/`) are not rate-limited.

| Variable | Default | Behavior |
| --- | --- | --- |
| `RATE_LIMIT_WINDOW_MS` | `60000` (1 minute) | Sliding window length |
| `RATE_LIMIT_MAX_REQUESTS` | `60` | Max requests per IP per window |

Default headers follow the RFC draft for rate-limit headers
(`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`); legacy
`X-RateLimit-*` headers are disabled.

When a client exceeds the limit, the service returns an IMS-formatted
error:

```json
{
  "imsx_codeMajor": "failure",
  "imsx_severity": "error",
  "imsx_description": "Too many requests. Server is busy, retry later."
}
```

For deployments where clients routinely retrieve large result sets
through pagination, raise `RATE_LIMIT_MAX_REQUESTS` or widen the window
rather than disabling the limit entirely. Document the adjusted values
to the integrators consuming the API.

## Trust proxy

The OneRoster© service reads `X-Forwarded-Proto`, `X-Forwarded-Host`, and
`X-Forwarded-Prefix` to generate self-referencing discovery URLs (the
Swagger UI `servers` entry and the JSON returned by `GET /`). Express
only honors these headers when the application has `trust proxy` enabled.

| `TRUST_PROXY` | Behavior |
| --- | --- |
| `false` (default) | `X-Forwarded-*` headers are ignored. Discovery URLs use the protocol and host the Node process observes directly. |
| `true` | `X-Forwarded-*` headers are trusted. Discovery URLs reflect the public-facing protocol and host from the proxy. |

Set `TRUST_PROXY=true` whenever the service is deployed behind:

- IIS (both `iisnode` and ARR reverse-proxy setups)
- NGINX (including the bundled `compose/nginx-compose.yml`)
- Any other reverse proxy terminating TLS

:::warning

Do not set `TRUST_PROXY=true` when the service is exposed directly to
untrusted networks without a trusted proxy in front of it. In that case
callers could forge `X-Forwarded-*` headers to influence discovery URLs.

:::

For the ARR reverse-proxy setup on IIS, also register
`HTTP_X_FORWARDED_PROTO` and `HTTP_X_FORWARDED_HOST` under URL Rewrite →
_View Server Variables_ so the rewrite rules are allowed to set them.
The IIS deployment guide walks through this step — see [Deploy on
IIS](../getting-started/deploy-iis.md).

## How `API_BASE_PATH` interacts with proxy behavior

When the service is hosted under a virtual directory (for example,
`https://example.org/oneroster`), discovery URLs must include the virtual
path. The service resolves this in the following order:

1. `X-Forwarded-Prefix` request header (when `TRUST_PROXY=true`)
2. `API_BASE_PATH` environment variable
3. Empty (service treated as hosted at root)

If the proxy does not emit `X-Forwarded-Prefix`, set `API_BASE_PATH`
explicitly so the generated URLs include the virtual-directory segment.
