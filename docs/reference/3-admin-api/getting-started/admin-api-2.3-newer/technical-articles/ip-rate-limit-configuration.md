# IP Rate Limiting Configuration Guide

## Overview

The `IpRateLimiting` configuration section provides endpoint-level rate limiting capabilities for the Ed-Fi Admin API. This feature protects the API from abuse by limiting the number of requests that can be made to specific endpoints within a given time period.

## Configuration Structure

```json
"IpRateLimiting": {
  "EnableEndpointRateLimiting": true,
  "StackBlockedRequests": false,
  "RealIpHeader": "X-Real-IP",
  "ClientIdHeader": "X-ClientId",
  "HttpStatusCode": 429,
  "IpWhitelist": [],
  "EndpointWhitelist": [],
  "GeneralRules": [
    {
      "Endpoint": "POST:/Connect/Register",
      "Period": "1m",
      "Limit": 3
    }
  ]
}
```

## Configuration Properties

### EnableEndpointRateLimiting

**Type:** `boolean`  
**Default:** `true`  
**Purpose:** Master switch to enable or disable the entire rate limiting feature.

* When set to `true`: Rate limiting is active and enforces the configured rules.
* When set to `false`: No rate limiting is applied, and all requests are allowed through.

**Implementation Note:** When disabled, the system uses a `NoLimiter` that permits all requests without restrictions.

---

### StackBlockedRequests

**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Determines whether blocked requests should count against the rate limit.

* When set to `true`: Blocked requests are queued and count toward the limit.
* When set to `false`: Blocked requests are rejected immediately and don't affect subsequent rate calculations.

**Recommendation:** Keep this as `false` to prevent abuse where attackers could exhaust the rate limit queue.

---

### RealIpHeader

**Type:** `string`  
**Default:** `"X-Real-IP"`  
**Purpose:** Specifies the HTTP header name used to identify the real IP address of the client.

**Use Cases:**

* When the API is behind a reverse proxy (e.g., nginx, Apache)
* When the API is behind a load balancer
* When the API is deployed in a containerized environment

**Common Values:**

* `"X-Real-IP"` (nginx default)
* `"X-Forwarded-For"` (standard proxy header)
* `"CF-Connecting-IP"` (Cloudflare)

**Important:** Ensure your proxy/load balancer is properly configured to set this header, otherwise the rate limiting will use the proxy's IP instead of the client's IP.

---

### ClientIdHeader

**Type:** `string`  
**Default:** `"X-ClientId"`  
**Purpose:** Specifies an optional HTTP header that can be used to identify specific clients.

**Use Cases:**

* Differentiating between multiple clients behind the same IP address
* Applying client-specific rate limiting policies
* Tracking API usage by application/client

**Note:** This is currently defined in the configuration model but not actively used in the current implementation. It's available for future enhancements.

---

### HttpStatusCode

**Type:** `integer`  
**Default:** `429`  
**Purpose:** The HTTP status code returned when a request is rate-limited.

**Standard Value:** `429 Too Many Requests` (RFC 6585)

**Why 429?**

* It's the standard HTTP status code for rate limiting
* Clearly indicates to clients that they've exceeded their allowed request rate
* Allows clients to implement appropriate retry logic

**Alternative Values:** While you can configure other status codes (e.g., `503 Service Unavailable`), 429 is strongly recommended for API best practices.

---

### IpWhitelist

**Type:** `array of strings`  
**Default:** `[]` (empty array)  
**Purpose:** List of IP addresses that should be exempt from rate limiting.

**Use Cases:**

* Internal systems that need unrestricted access
* Monitoring/health check services
* Trusted partner integrations
* Administrative tools

**Example:**

```json
"IpWhitelist": [
  "192.168.1.100",
  "10.0.0.0/8",
  "172.16.0.1"
]
```

**Note:** This property is defined in the configuration model but not actively used in the current rate limiting implementation. Future enhancements may leverage this for IP-based whitelisting.

---

### EndpointWhitelist

**Type:** `array of strings`  
**Default:** `[]` (empty array)  
**Purpose:** List of endpoints that should be exempt from rate limiting.

**Use Cases:**

* Health check endpoints
* Public documentation endpoints
* Read-only endpoints with minimal resource impact

**Example:**

```json
"EndpointWhitelist": [
  "GET:/health",
  "GET:/swagger",
  "/metrics"
]
```

**Note:** This property is defined in the configuration model but not actively used in the current implementation. Endpoints not specified in `GeneralRules` effectively have no rate limiting applied.

---

### GeneralRules

**Type:** `array of objects`  
**Default:** Contains one default rule for the registration endpoint  
**Purpose:** Defines the specific rate limiting rules for endpoints.

Each rule object contains:

#### Endpoint

**Type:** `string`  
**Format:** `"HTTP_METHOD:/path"`  
**Purpose:** Identifies the endpoint to apply rate limiting to.

**Format Rules:**

* Must include HTTP method (GET, POST, PUT, DELETE) followed by a colon
* Must include the full path starting with `/`
* Matching is case-insensitive for the HTTP method
* Matching is case-sensitive for the path

**Examples:**

```json
"POST:/Connect/Register"
"GET:/api/users"
"DELETE:/api/applications/{id}"
```

#### Period

**Type:** `string`  
**Format:** `"<number>m"` (minutes)  
**Purpose:** Defines the time window for the rate limit.

**Supported Format:**

* Currently only supports minutes (e.g., `"1m"`, `"5m"`, `"60m"`)
* The number is parsed from the string before the 'm' suffix

**Use Cases:**

* `"1m"` - One minute window (most common for strict limits)
* `"5m"` - Five minute window (for moderate limits)
* `"60m"` - One hour window (for daily usage patterns)

**Implementation:** Uses a Fixed Window algorithm, meaning the window resets completely after the specified period.

#### Limit

**Type:** `integer`  
**Purpose:** Maximum number of requests allowed within the specified period.

**Examples:**

* `3` - Only 3 requests per period (strict, for sensitive operations)
* `10` - 10 requests per period (moderate)
* `100` - 100 requests per period (relaxed)

**Considerations:**

* Too low: May block legitimate users
* Too high: May not provide adequate protection
* Should be based on expected legitimate usage patterns

---

## Rate Limiting Algorithm

The implementation uses a **Fixed Window** rate limiting algorithm, which:

1. **Creates a time window** based on the `Period` setting
2. **Counts requests** within that window
3. **Rejects requests** that exceed the `Limit`
4. **Resets the counter** when the window expires

### Example Behavior

With the default configuration (`Endpoint: "POST:/Connect/Register"`, `Period: "1m"`, `Limit: 3`):

* **Time 0:00**: First request → Allowed (1/3)
* **Time 0:20**: Second request → Allowed (2/3)
* **Time 0:40**: Third request → Allowed (3/3)
* **Time 0:50**: Fourth request → **REJECTED - 429 Too Many Requests**
* **Time 1:01**: Fifth request → Allowed (1/3) - New window started

---

## Implementation Details

### Technology

* Uses ASP.NET Core's built-in `RateLimiter` middleware (Microsoft.AspNetCore.RateLimiting)
* Implements `PartitionedRateLimiter` for endpoint-specific limits
* Uses `FixedWindowRateLimiter` for time-based rate limiting

### Request Matching Logic

1. Extracts HTTP method and path from incoming request
2. Compares against each rule's `Endpoint` pattern
3. If a match is found, applies that rule's rate limiter
4. If no match is found, allows the request (no limiting)

---

## Default Configuration

The default configuration protects the OAuth registration endpoint:

```json
{
  "Endpoint": "POST:/Connect/Register",
  "Period": "1m",
  "Limit": 3
}
```

**Why this endpoint?**

* Registration endpoints are common targets for abuse
* Attackers may try to create multiple fake accounts
* Legitimate users rarely need to register more than once per minute
* Prevents automated account creation attacks

---

## Configuration Examples

### Protecting Multiple Endpoints

```json
"GeneralRules": [
  {
    "Endpoint": "POST:/Connect/Register",
    "Period": "1m",
    "Limit": 3
  },
  {
    "Endpoint": "POST:/connect/token",
    "Period": "1m",
    "Limit": 10
  },
  {
    "Endpoint": "POST:/api/applications",
    "Period": "5m",
    "Limit": 20
  },
  {
    "Endpoint": "DELETE:/api/applications",
    "Period": "1m",
    "Limit": 5
  }
]
```

### Lenient Configuration

For development or trusted environments:

```json
"IpRateLimiting": {
  "EnableEndpointRateLimiting": false,
  "HttpStatusCode": 429,
  "GeneralRules": []
}
```

### Strict Configuration

For public-facing production environments:

```json
"IpRateLimiting": {
  "EnableEndpointRateLimiting": true,
  "StackBlockedRequests": false,
  "RealIpHeader": "X-Forwarded-For",
  "HttpStatusCode": 429,
  "GeneralRules": [
    {
      "Endpoint": "POST:/Connect/Register",
      "Period": "1m",
      "Limit": 2
    },
    {
      "Endpoint": "POST:/connect/token",
      "Period": "1m",
      "Limit": 5
    }
  ]
}
```

---

## Docker Environment Configuration

In Docker environments, rate limiting settings can be configured via environment variables:

```bash
IPRATELIMITING__ENABLEENDPOINTRATELIMITING=true
IPRATELIMITING__STACKBLOCKEDREQUESTS=false
IPRATELIMITING__REALIPHEADER=X-Real-IP
IPRATELIMITING__CLIENTIDHEADER=X-ClientId
IPRATELIMITING__HTTPSTATUSCODE=429
IPRATELIMITING__IPWHITELIST=[]
IPRATELIMITING__ENDPOINTWHITELIST=[]
```

**Note:** ASP.NET Core converts double underscores (`__`) to colons (`:`) for nested configuration sections.

---

## Best Practices

### 1. Always Enable in Production

Enable rate limiting for public-facing APIs to protect against abuse and DDoS attacks.

### 2. Configure Real IP Detection

When behind a proxy or load balancer, properly configure `RealIpHeader` to ensure rate limiting is applied per client, not per proxy.

### 3. Monitor Rate Limit Hits

Implement logging or monitoring to track when rate limits are triggered. This helps identify:

* Legitimate users with unusual usage patterns
* Potential attacks or abuse
* Whether limits are too strict or too lenient

### 4. Document Your API's Rate Limits

Inform API consumers about rate limits through:

* API documentation
* Response headers (consider adding `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`)
* Client SDKs and examples

### 5. Test Rate Limiting

Include rate limiting tests in your test suite to ensure:

* Limits are enforced correctly
* Status codes are returned as expected
* Window resets work properly

### 6. Consider Client Impact

Before setting strict limits, analyze legitimate usage patterns to avoid blocking real users.

### 7. Start Conservative

Begin with more lenient limits and tighten them based on observed usage and abuse patterns.

---

## Troubleshooting

### Rate Limiting Not Working

**Check:**

1. `EnableEndpointRateLimiting` is set to `true`
2. Your endpoint format matches exactly (method and path)
3. The middleware is properly registered in the application pipeline

### All Requests Being Blocked

**Check:**

1. `Limit` values aren't too restrictive
2. `RealIpHeader` is correctly configured
3. Clock/time synchronization on your servers

### Different Clients Sharing Same Rate Limit

**Cause:** Multiple clients appear to have the same IP address.

**Solutions:**

1. Verify proxy configuration and `RealIpHeader` setting
2. Consider implementing `ClientIdHeader` for client-specific limiting
3. Check if clients are behind the same NAT/proxy

### Rate Limiting Applied to Wrong Endpoints

**Check:**

1. Endpoint path matching is case-sensitive
2. Endpoint format uses correct HTTP method
3. No trailing slashes or query parameters in the pattern
