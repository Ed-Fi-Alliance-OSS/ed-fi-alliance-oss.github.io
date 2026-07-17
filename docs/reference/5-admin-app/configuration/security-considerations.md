---
sidebar_position: 3
---

# Security Considerations

Review the following recommendations before running the Ed-Fi Admin App in a production environment.

## SSL/TLS Configuration

- **Use HTTPS everywhere**: All communication should be encrypted
- **Strong cipher suites**: Use modern TLS 1.2+ with strong ciphers
- **Certificate validation**: Use proper SSL certificates (not self-signed in production)

## Database Security

- **Encryption at rest**: Enable PostgreSQL encryption
- **Connection encryption**: Always use SSL for database connections
- **Principle of least privilege**: Create dedicated database user with minimal permissions
- **Regular backups**: Implement automated, encrypted backups

## Application Security

- **Environment variables**: Never commit secrets to source control
- **Input validation**: All inputs are validated on both client and server
- **CORS configuration**: Properly configure allowed origins
- **Security headers**: The Windows/IIS install ships enforcing security headers by default (HSTS, an enforcing Content-Security-Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) on both sites; if you front the app with a reverse proxy, set equivalent headers there. See the [Windows IIS Installation guide](../getting-started/windows-iis-installation.md#security-headers).

## Authentication Security

- **Strong secrets**: Use cryptographically strong client secrets
- **Token validation**: Implement proper JWT validation
- **Session management**: Configure appropriate session timeouts
- **Multi-factor authentication**: Enable MFA in your OIDC provider

## Built-in Protections

The Ed-Fi Admin App provides several protections out of the box across all installation paths (with Windows/IIS specifics noted):

- **TLS by default**: Each installation path terminates TLS itself — Docker and Unix through NGiNX, Windows through two IIS sites over HTTPS (the HTTP bindings redirect). On the Windows install, when no certificate is supplied a self-signed one is generated and trusted **only on the install host**; in every path, supply a CA-issued certificate for anything beyond that host.
- **Encryption at rest**: Stored ODS/API and Admin API secrets are encrypted with a per-install key (`DB_ENCRYPTION_SECRET.KEY`). The Windows scripted install generates this key per install and records it only in an Administrators-only `install-summary.txt`.
- **Upstream TLS verification**: `SSL_VERIFICATION` is on by default, so the app verifies the TLS certificate of the ODS/API and Admin API it calls. For a self-signed upstream, trust it via `NODE_EXTRA_CA_CERTS` rather than disabling verification.
- **Rate limiting**: The API rate-limits requests (configurable via `RATE_LIMIT_TTL` / `RATE_LIMIT_LIMIT`).
- **One-time credential sharing**: Newly created API client secrets can be delivered as one-time, self-destructing links via the optional [Yopass](./yopass-administrators-guide/readme.md) integration instead of being shown inline.
- **Least-privilege database access**: Deploy with a dedicated non-admin database login (SQL Server: `db_owner` on its own database, not `sa`; PostgreSQL: a non-superuser owning `public` with `CONNECT` + `CREATE`).
