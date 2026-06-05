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
- **Security headers**: Implement proper security headers via reverse proxy

## Authentication Security

- **Strong secrets**: Use cryptographically strong client secrets
- **Token validation**: Implement proper JWT validation
- **Session management**: Configure appropriate session timeouts
- **Multi-factor authentication**: Enable MFA in your OIDC provider
