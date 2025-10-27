# Yopass Administrator Guide

## Introduction

This guide provides system administrators with detailed instructions for setting up, configuring, and managing Yopass integration with Ed-Fi Admin App. Yopass is a secure, one-time password sharing service that helps protect sensitive information like API credentials by creating self-destructing links.

## Setting Up Yopass Integration

### Step 1: Configure Admin App to Use Yopass

Add the following configuration to your Admin App environment:

```json
{
  "USE_YOPASS": true,
  "YOPASS_URL": "http://your-yopass-service:8082"
}
```

Key configuration flags:

- `USE_YOPASS` - Set to `true` to enable Yopass integration
- `YOPASS_URL` - The full URL where the Yopass service is accessible

For local development:

```json
{
  "USE_YOPASS": true,
  "YOPASS_URL": "http://localhost:8082"
}
```


## Where to add the configuration?

You should add the following lines in the `packages/api/config/local.js` file, inside the `module.exports` object:

```javascript
USE_YOPASS: true,
YOPASS_URL: 'http://your-yopass-service:8082',
```

For example:

```javascript
module.exports = {
  // ...existing code...
  USE_YOPASS: true,
  YOPASS_URL: 'http://your-yopass-service:8082',
  // ...existing code...
};
```

This enables Yopass integration in the local environment or whichever environment you are configuring.

### Step 2: Verify the Integration

1. After configuring, restart the Admin App service
2. Create or reset API client credentials in the Admin App
3. Verify that a secure link is generated instead of displaying credentials directly
4. Test the link to ensure it successfully retrieves the credentials
5. Verify the link only works once

## Troubleshooting

### Common Issues

#### Connection Problems

**Issue**: Admin App can't connect to Yopass service  
**Solution**:

- Verify that Yopass service is running
- Check network connectivity between Admin App and Yopass
- Ensure firewall rules allow communication

#### Secret Creation Failures

**Issue**: Error when creating secrets  
**Solution**:

- Check Memcached/Redis is running and accessible
- Verify maximum secret size has not been exceeded
- Look for error logs in the Yopass service

#### Expired Secrets

**Issue**: Secrets expire before they can be viewed  
**Solution**:

- Adjust expiration time settings
- Check for time synchronization issues between services

### Diagnostic Approaches

When troubleshooting Yopass integration, check the following:

1. Verify Yopass service health status
2. Examine application logs for error messages
3. Test connectivity between Admin App and Yopass service
4. Check memory cache status and availability

## Security and Compliance Recommendations

To ensure secure and compliant operation of Yopass within the AdminApp environment, follow these recommendations:

- **Treat Yopass as an internal service**: Deploy Yopass so that only trusted systems within your organization can access it. Avoid exposing Yopass to the public internet.
- **Restrict CORS access**: Configure CORS settings to only allow requests from authorized AdminApp domains. This helps prevent unauthorized access from external sources.
- **Enforce firewall rules**: Limit network access to the Yopass service using firewall rules, allowing only necessary traffic from AdminApp servers.
- **Enable TLS/SSL**: Always use encrypted connections (HTTPS) for Yopass, especially in production environments, to protect sensitive data in transit.
- **Monitor and audit usage**: Regularly review logs and monitor access to Yopass for unusual activity or potential security incidents.

Following these practices will help maintain the confidentiality and integrity of sensitive information managed by Yopass.

## Disabling Yopass Integration

If you need to disable Yopass integration:

1. Set the `USE_YOPASS` configuration flag to `false` in the Admin App configuration
2. The system will fall back to displaying credentials directly in the UI
3. See the "Disabling Yopass" design document for more details

## References

- [Yopass GitHub Repository](https://github.com/jhaals/yopass)
- [Ed-Fi System Architecture Documentation](../ed-fi-system-architecture.md)
- [Disabling Yopass Design Document](../design/20250821%20Disabling%20Yopass.md)
