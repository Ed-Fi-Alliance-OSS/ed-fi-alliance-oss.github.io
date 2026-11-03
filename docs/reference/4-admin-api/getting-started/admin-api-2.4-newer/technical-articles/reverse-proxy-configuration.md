# Reverse Proxy Configuration

Admin API 2.4 adds a `ReverseProxy` configuration section controlling which
forwarded headers Admin API trusts.

When Admin API runs behind IIS, nginx, or a load balancer, the connection it
sees originates at the proxy, not at the client. Without forwarded header
handling, Admin API records the proxy's IP address and builds URLs from the
internal scheme and host rather than the public ones.

This affects audit log `SourceIpAddress` values, IP rate limiting, and any
absolute URL that Admin API generates — including the `Location` header returned
by the asynchronous instance management endpoints.

## UseForwardedHeaders

**Type:** `boolean`
**Default:** `false`
**Purpose:** Master switch for forwarded header processing.

When enabled, Admin API honors `X-Forwarded-For`, `X-Forwarded-Host`, and
`X-Forwarded-Proto`.

## KnownProxies

**Type:** `string` — a comma-separated list of IP addresses
**Default:** `""` (empty)
**Purpose:** The proxy addresses whose forwarded headers Admin API will trust.

## KnownNetworks

**Type:** `string` — a comma-separated list of CIDR ranges
**Default:** `""` (empty)
**Purpose:** The networks whose forwarded headers Admin API will trust, for
deployments where the proxy's address is not fixed.

```json
"ReverseProxy": {
  "UseForwardedHeaders": true,
  "KnownProxies": "10.0.0.4, 10.0.0.5",
  "KnownNetworks": "10.0.0.0/16, 172.16.0.0/12"
}
```

Entries in both lists are trimmed, so spaces after the commas are fine. An entry
that is not a valid IP address or CIDR range fails configuration validation at
startup with a message naming the offending value, rather than being skipped.

## Trust and Security

Forwarded headers are client-supplied strings. If Admin API trusted them from
any source, a caller could spoof `X-Forwarded-For` and defeat both IP rate
limiting and the audit trail's record of who made a request. That is why the
trust lists exist.

Enabling `UseForwardedHeaders` without populating either list leaves the
framework's own default in place, which trusts loopback only. That is safe but
usually not useful: a proxy on another host is not loopback, so its headers are
ignored and you are back to seeing the proxy's address.

:::warning

Populate `KnownProxies` or `KnownNetworks` with the narrowest range that covers
your proxies. Trusting a broad range — or the whole network — means trusting
anything that can reach Admin API directly to assert any client IP address it
likes.

:::

:::info

`ReverseProxy` governs the forwarded headers Admin API trusts at the framework
level. It is separate from `IpRateLimiting.RealIpHeader`, which names the header
the rate limiter reads. In a proxied deployment both usually need attention —
see the [IP Rate Limiting Configuration
Guide](ip-rate-limit-configuration.md).

:::

:::info

The audit trail's `SourceIpAddress` column depends on this section being
configured correctly. See the
[Audit Logging Configuration Guide](audit-logging-configuration.md).

:::
