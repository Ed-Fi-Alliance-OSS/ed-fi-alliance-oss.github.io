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
- Configuration Service: `CONFIGURATION_SERVICE_LOG_LEVEL` environment variable

## Log Levels

| Level | When used | Action required |
| --- | --- | --- |
| `FATAL` | Application cannot start or must shut down | Investigate immediately. Check for missing required configuration or resource exhaustion. Report bugs through the [Ed-Fi Community Hub](https://success.ed-fi.org) |
| `ERROR` | Unexpected error that interrupts service, or an external failure (e.g., database unavailable after retries) | Investigate and resolve the external issue. Report application bugs through the [Ed-Fi Community Hub](https://success.ed-fi.org) |
| `WARN` | Unexpected condition the system recovered from automatically (e.g., a database retry that succeeded) | Monitor frequency. Frequent warnings may indicate an underlying issue worth investigating |
| `INFORMATION` | Normal request lifecycle events — method, path, response code, duration, trace ID | Generally no action required |
| `DEBUG` | Detailed diagnostics, including anonymized request payloads (see [PII Protection](#pii-protection-at-debug-level)) | Use for integration troubleshooting. Do not leave enabled in production |

## Default Configuration

### Production (INFORMATION)

The recommended log level for production deployments. Logs request lifecycle
events — method, path, response code, duration, and trace ID — without including
request or response body content.

```ini
LOG_LEVEL=Information
CONFIGURATION_SERVICE_LOG_LEVEL=Information
```

Both services write structured JSON to the console — one JSON object per log entry.
Sample output at `INFORMATION` level (formatted for readability):

```json
{
  "Timestamp": "2026-06-29T14:23:45.123Z",
  "Level": "Information",
  "MessageTemplate": "{EventName}: DMS request completed: {Method} {Path} responded {StatusCode} in {DurationMs} ms with TraceId {TraceId}",
  "RenderedMessage": "HttpRequestCompleted: DMS request completed: POST /data/ed-fi/schools responded 201 in 18 ms with TraceId 0HN...",
  "Properties": {
    "Application": "EdFi.DataManagementService",
    "EventName": "HttpRequestCompleted",
    "EventId": { "Id": 1228001, "Name": "HttpRequestCompleted" },
    "SourceContext": "EdFi.DataManagementService.Frontend.AspNetCore.Infrastructure.LoggingMiddleware",
    "RequestLayer": "Frontend",
    "TraceId": "0HN...",
    "ActivityTraceId": "4bf92f3577b34da6a3ce929d0e0e4736",
    "SpanId": "00f067aa0ba902b7",
    "Method": "POST",
    "Path": "/data/ed-fi/schools",
    "StatusCode": 201,
    "DurationMs": 18,
    "PathBase": ""
  }
}
```

`ActivityTraceId` and `SpanId` are present only when an ASP.NET `Activity` is active (e.g., when OpenTelemetry tracing is enabled). Failure events use `EventId` `1228002` and `Level` `Error`. The file sink writes the same structured properties but omits `RenderedMessage`.

:::warning

Do not set `Serilog:WriteTo:*:Args:outputTemplate` in a local
`appsettings.Development.json` override. Serilog's configuration array merging
causes `outputTemplate` to silently replace the JSON formatter with plain text,
breaking log collection. Override `MinimumLevel` only.

:::

### Local Development (DEBUG)

The environment files that ship with the Docker Compose setup start both
services at `Information`. To troubleshoot an integration locally, set the log
level to `Debug` in the `.env` file you start the stack with. At this level, the
Ed-Fi API logs anonymized request payloads. See [PII
Protection](#pii-protection-at-debug-level) for how anonymization works.

```ini
LOG_LEVEL=Debug
CONFIGURATION_SERVICE_LOG_LEVEL=Debug
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

### Container Log Retention

The Docker Compose setup limits how much log output Docker keeps for each
container, so logs can't fill the host's disk:

| Variable | Default | Description |
| --- | --- | --- |
| `DOCKER_LOG_MAX_SIZE` | `50m` | Maximum size of one log file before Docker starts a new one |
| `DOCKER_LOG_MAX_FILE` | `5` | Maximum number of log files Docker keeps for each container |

With the defaults, each container keeps up to 250 MB of logs, and the oldest
entries are discarded as new ones arrive. Under heavy load at `Debug` level,
that can amount to only a few seconds of history.

For a longer investigation, raise these values temporarily and restore the
defaults afterward, or [export logs with
OpenTelemetry](#opentelemetry-otlp-log-export) so they're kept outside the
container.

:::caution

Docker rejects "unlimited" values such as `-1` or `0`. A very large value, such
as `DOCKER_LOG_MAX_SIZE=1000g`, effectively removes the limit and can let a log
file fill the host's disk, which affects every container on the host.

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
request's trace identifier for the request's lifetime. The header name used to pass or read a correlation ID is configurable via the
`CORRELATION_ID_HEADER` environment variable. This is **disabled by default**
(empty string); set it explicitly to enable header-based extraction:

```ini
CORRELATION_ID_HEADER=correlationid
```

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

The log entry for the request in Example 1 contains the same value as `TraceId`,
linking the structured log event to the error response body:

```json
{
  "Timestamp": "2026-06-29T14:23:45.123Z",
  "Level": "Information",
  "MessageTemplate": "{EventName}: DMS request completed: {Method} {Path} responded {StatusCode} in {DurationMs} ms with TraceId {TraceId}",
  "RenderedMessage": "HttpRequestCompleted: DMS request completed: POST /data/ed-fi/schools responded 400 in 12 ms with TraceId b9567d36-91c1-4bae-aff5-3fde8367b969",
  "Properties": {
    "Application": "EdFi.DataManagementService",
    "EventName": "HttpRequestCompleted",
    "EventId": { "Id": 1228001, "Name": "HttpRequestCompleted" },
    "TraceId": "b9567d36-91c1-4bae-aff5-3fde8367b969",
    "Method": "POST",
    "Path": "/data/ed-fi/schools",
    "StatusCode": 400,
    "DurationMs": 12
  }
}
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

### Correlation ID Normalization

Before the Ed-Fi API uses a correlation ID in a log entry or an error response,
it normalizes the value. This applies to client-supplied values and to trace
identifiers alike:

- Values longer than the maximum length are truncated. The maximum is set by
  `CORRELATION_ID_MAX_LENGTH` (`AppSettings:CorrelationIdMaxLength`), which
  defaults to `255`.
- Control characters (including carriage return, line feed, and tab),
  invisible format characters, and Unicode line and paragraph separators are
  removed, so a client-supplied value can't add extra lines to the logs. All
  other characters, including punctuation and non-ASCII characters, are kept.

The Ed-Fi API never rejects a request because of its correlation ID. Because the
same normalized value is used everywhere, the correlation ID in an error
response always matches the one in the logs.

When normalization changes a client-supplied correlation ID, the Ed-Fi API logs
a `CorrelationIdModified` event at `Information` level (see [Event
IDs](#event-ids)). The event reports what changed, but deliberately doesn't log
the original value:

| Property | Meaning |
| --- | --- |
| `SuppliedLength`, `NormalizedLength` | Length of the value before and after normalization |
| `CharactersRemoved` | `true` if characters were removed |
| `Truncated` | `true` if the value was cut to the maximum length |
| `FellBackToServerIdentifier` | `true` if nothing usable was left, so the request's trace identifier was used instead |

`FellBackToServerIdentifier` is the property to alert on: when it is `true`, the
client's own identifier can't be recovered from the logs. No event is logged
when the value is unchanged or when no correlation header is configured.

:::warning

`CORRELATION_ID_MAX_LENGTH` must be between `64` and `1024`. With any other
value, the Ed-Fi API starts but answers every request, including `/health`,
with a `500` error until the setting is fixed and the service is restarted.

:::

:::note

A client-supplied correlation ID that is truncated or has characters removed no
longer matches the identifier recorded by the upstream system that generated
it. To avoid this, use correlation IDs of plain printable characters within the
maximum length.

:::

## Log Collection

Both services emit the same structured request-log contract. Collector rules
should target structured properties — not parse `RenderedMessage`.

### Event IDs

Use `EventId.Id` to target request lifecycle events without matching on message
strings:

| `EventId.Id` | `EventName` | `Level` | Meaning |
| --- | --- | --- | --- |
| `1228001` | `HttpRequestCompleted` | `Information` (Ed-Fi API); `Information` or `Debug` (Configuration Service, see note) | Request completed — includes all 4xx responses |
| `1228002` | `HttpRequestFailed` | `Error` | Request failed with a 5xx or unhandled exception |
| `1228003` | `CorrelationIdModified` | `Information` | Ed-Fi API only. A client-supplied correlation ID was changed by [normalization](#correlation-id-normalization). This isn't a request event, so rules that filter on `1228001` and `1228002` don't receive it |

:::note

The Configuration Service logs `HttpRequestCompleted` at `Debug` level for
`/.well-known/*` paths (OIDC discovery endpoints). An `Information`-level
collector will not receive these events. All other paths follow the `Information`
rule above.

:::

### RequestLayer (Ed-Fi API only)

The Ed-Fi API emits two log events per resource API request: one from the
ASP.NET frontend (`RequestLayer = "Frontend"`) and one from the core pipeline
(`RequestLayer = "Core"`). Endpoints that are handled directly without entering
the core pipeline — such as the Discovery and Health endpoints — emit only the
`Frontend` event. For request-count dashboards and failure-rate alerts, filter
to `RequestLayer = "Frontend"` to count only externally visible HTTP requests
and avoid double-counting.

The Configuration Service does not emit `RequestLayer`.

### Exception Field

The `Exception` field is present only when the logging middleware itself
observed an exception. It is **omitted entirely** — not set to `null` — when a
5xx status is produced without an observable exception (for example, when a
downstream pipeline returned a 5xx status code). Collector rules must treat
`Exception` as optional.

### HTTP 413 Responses

Oversized request body rejections (HTTP 413) are emitted as
`HttpRequestCompleted` events, not `HttpRequestFailed`, because they are handled
as client errors. The `StatusCode` property carries `413`.

## OpenTelemetry (OTLP) Log Export

Both the Ed-Fi API and the Configuration Service can also send their logs to an
[OpenTelemetry](https://opentelemetry.io/) (OTLP) endpoint, either a compatible
service or an OpenTelemetry Collector that forwards them to a backend such as
Splunk, Datadog, Elastic, or CloudWatch. Log export is off by default. When it
is on, logs are still written to the console as well.

Each service is configured through its own `OtlpLogging` section:

| Setting | Ed-Fi API variable | Configuration Service variable | Description |
| --- | --- | --- | --- |
| `OtlpLogging:Enabled` | `OTLP_LOGGING_ENABLED` | `CONFIGURATION_SERVICE_OTLP_LOGGING_ENABLED` | `true` to export logs. Default: `false` |
| `OtlpLogging:Endpoint` | `OTLP_LOGGING_ENDPOINT` | `CONFIGURATION_SERVICE_OTLP_LOGGING_ENDPOINT` | Absolute `http://` or `https://` URL of the OTLP endpoint, for example `http://collector:4318`. Required when export is on |
| `OtlpLogging:Protocol` | `OTLP_LOGGING_PROTOCOL` | `CONFIGURATION_SERVICE_OTLP_LOGGING_PROTOCOL` | `HttpProtobuf` (default) or `Grpc` |
| `OtlpLogging:DeploymentEnvironment` | `OTLP_LOGGING_DEPLOYMENT_ENVIRONMENT` | `CONFIGURATION_SERVICE_OTLP_LOGGING_DEPLOYMENT_ENVIRONMENT` | Optional name of the deployment environment, such as `production` |
| `OtlpLogging:Headers` | Not mapped | Not mapped | Optional headers sent with every export request, such as `Authorization` |

The variable names are those used by the Docker Compose files. Without those
files, set the settings directly, for example `OtlpLogging__Enabled=true`.

```ini
OTLP_LOGGING_ENABLED=true
OTLP_LOGGING_ENDPOINT=http://collector:4318
```

:::caution

- Header values are often secrets. Supply them through environment variables,
  such as `OtlpLogging__Headers__Authorization`, or a secret store, never a
  committed configuration file.
- The standard `OTEL_EXPORTER_OTLP_*` environment variables are ignored. Use
  the `OtlpLogging` settings instead.
- If the endpoint is missing or invalid, log export isn't applied and a warning
  is written to the console's error output. Delivery failures never stop the
  service from starting or serving requests.

:::
