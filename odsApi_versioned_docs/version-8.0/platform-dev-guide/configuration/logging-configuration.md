---
sidebar_position: 2
---

# Logging Configuration

Ed-Fi API v8 uses [Serilog](https://serilog.net/) for structured logging in both
the Ed-Fi API and the Configuration Service. Logs are written to the console in
structured format, suitable for ingestion by log-monitoring platforms such as
Splunk, CloudWatch, Datadog, or the ELK stack.

The log level for each service is controlled independently:

- Ed-Fi API: `LOG_LEVEL` environment variable (maps to
  `Serilog__MinimumLevel__Default` in `appsettings.json`)
- Configuration Service: `DMS_CONFIG_LOG_LEVEL` environment variable

## Log Levels

| Level | When used | Action required |
| --- | --- | --- |
| `FATAL` | Application cannot start or must shut down | Investigate immediately. Check for missing required configuration or resource exhaustion. Report bugs through the [Ed-Fi Community Hub](https://success.ed-fi.org) |
| `ERROR` | Unexpected error that interrupts service, or an external failure (e.g., database unavailable after retries) | Investigate and resolve the external issue. Report application bugs through the [Ed-Fi Community Hub](https://success.ed-fi.org) |
| `WARN` | Unexpected condition the system recovered from automatically (e.g., a database retry that succeeded) | Monitor frequency. Frequent warnings may indicate an underlying issue worth investigating |
| `INFORMATION` | Normal request lifecycle events — method, URL, client ID, response code, duration | Generally no action required |
| `DEBUG` | Detailed diagnostics, including anonymized request payloads (see [PII Protection](#pii-protection-at-debug-level)) | Use for integration troubleshooting. Do not leave enabled in production |

## Default Configuration

### Production (INFORMATION)

The recommended log level for production deployments. Logs request lifecycle
events — method, URL, client ID, response code, and duration — without including
request or response body content.

```ini
LOG_LEVEL=INFORMATION
DMS_CONFIG_LOG_LEVEL=Information
```

Sample log output at `INFORMATION` level:

```text
[INF] POST /api/data/ed-fi/schools 201 clientId=abc123 correlationId=b9567d36-91c1-4bae-aff5-3fde8367b969 duration=18ms
[INF] GET /api/data/ed-fi/schools 200 clientId=abc123 correlationId=c1d2e3f4-... duration=5ms
```

### Local Development (DEBUG)

The Docker Compose `.env.example` ships with `LOG_LEVEL=DEBUG`. At this level,
the Ed-Fi API logs anonymized request payloads to aid integration
troubleshooting. See [PII Protection](#pii-protection-at-debug-level) for how
anonymization works.

```ini
LOG_LEVEL=DEBUG
```

### Production Troubleshooting

When diagnosing a difficult-to-reproduce issue in production, temporarily raise
the log level to `DEBUG`. Return to `INFORMATION` as soon as the issue is
captured — `DEBUG` logging generates significantly more output and should not be
left on indefinitely.

:::warning

`DEBUG` logging includes anonymized request bodies. Although sensitive field
values are replaced with `"*"`, ensure your log storage and access policies are
appropriate before enabling `DEBUG` in a production environment.

:::

## PII Protection at DEBUG Level

At `DEBUG` level, the Ed-Fi API logs anonymized HTTP request payloads. Before
logging, every scalar value in the request body (strings, numbers, booleans,
`null`) is replaced with `"*"`, leaving only the JSON structure and property
names visible. This provides enough information to diagnose request shape issues
(missing fields, incorrect nesting, wrong property names) without exposing
student or staff data.

Example: a `POST /api/data/ed-fi/students` request body is logged as:

```json
{
  "studentUniqueId": "*",
  "birthDate": "*",
  "firstName": "*",
  "lastSurname": "*",
  "sexDescriptor": "*"
}
```

This masking behavior is the default (`MaskRequestBodyInLogs=true`). To log the
full unmasked request body — for example, when debugging a parsing issue in a
controlled environment — set `MaskRequestBodyInLogs=false`:

```ini
MASK_REQUEST_BODY_IN_LOGS=false
```

## Correlation IDs

Every HTTP request is assigned a correlation ID that appears in all log entries
for that request and is included in error response bodies. The correlation ID
makes it possible to trace a specific failed request across multiple log lines
and across service boundaries.

If a request does not include a correlation ID, the Ed-Fi API uses the
request's trace identifier for the request's lifetime. The header name used to
pass or read a correlation ID is configurable via the `CORRELATION_ID_HEADER`
environment variable (default: `correlationid`).

:::info

Requests that result in an HTTP 5xx response are logged at `ERROR` level.
Requests that result in an HTTP 4xx response (including validation errors and
not-found responses) are logged at `Information` level.

:::

### Example 1: Error response body containing a Correlation ID

```json
{
  "detail": "Data validation failed. See 'validationErrors' for details.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed",
  "title": "Data Validation Failed",
  "status": 400,
  "correlationId": "b9567d36-91c1-4bae-aff5-3fde8367b969",
  "validationErrors": {
    "$.gradeLevels": ["gradeLevels is required."]
  },
  "errors": []
}
```

### Example 2: Log entry for the same request

The log entry for the request in Example 1 contains the same correlation ID,
allowing the two to be linked:

```text
[ERR] POST /api/data/ed-fi/schools 400 clientId=abc123
  correlationId=b9567d36-91c1-4bae-aff5-3fde8367b969 duration=12ms
  validationErrors={"$.gradeLevels":["gradeLevels is required."]}
```

### Specifying the Correlation ID for a Request

Client applications can supply their own correlation ID by including an HTTP
header named `correlationid` (or the value of `CORRELATION_ID_HEADER`) on the
request. If no such header is present, the Ed-Fi API uses the request's trace
identifier for the request's lifetime.

Using a client-supplied correlation ID is particularly useful when the API sits
behind a gateway or proxy that logs its own correlation IDs — matching them
allows a single request to be traced end-to-end.

:::tip

Assign a unique correlation ID per request as early as possible in your client
code. A GUID per request is a simple and reliable approach.

:::

### Example 3: Correlation ID supplied as an HTTP header

```text
POST /api/data/ed-fi/schools HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Authorization: Bearer <access_token>
correlationid: b9567d36-91c1-4bae-aff5-3fde8367b969

{ ... }
```
