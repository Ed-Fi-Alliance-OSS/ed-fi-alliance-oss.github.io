# Audit Logging Configuration

Admin API 2.4 adds an `AuditLogging` configuration section that records
authentication attempts and API actions to an audit trail in the `EdFi_Admin`
database.

## AuditLogging.Enabled

**Type:** `boolean`
**Default:** `true`
**Purpose:** Records authentication attempts and API actions to an audit trail
in the `EdFi_Admin` database.

```json
"AuditLogging": {
  "Enabled": true
}
```

When enabled, Admin API writes a row to the `AuditLogs` table for each recorded
event, capturing:

| Column | Contents |
| --- | --- |
| `EventType` | `AuthenticationSuccess`, `AuthenticationFailure`, or `Action`. |
| `Timestamp` | When the event occurred. |
| `ClientId` | The API client that made the request, where one is known. |
| `SourceIpAddress` | The caller's IP address. |
| `HttpVerb` | The request method. |
| `HttpUrl` | The requested URL. |
| `StatusCode` | The final response status code. |
| `DeletedObjectSnapshot` | For deletions, a snapshot of the removed record. |

:::warning

The shipped `appsettings.json` sets `Enabled` to `true`, but the setting itself
defaults to `false` when the section is absent. If you build an `appsettings`
file from scratch rather than editing the one that ships with the release, omit
the `AuditLogging` section and no audit trail will be written — silently, since
nothing fails when auditing is off.

:::

## Mode and Database Requirements

Audit logging is only available in `v2` and `v3` modes. The `v1` database schema
has no `AuditLogs` table, so the middleware is not registered in `v1` mode at
all and the setting has no effect there.

Rows are written to the `AuditLogs` table in the `EdFi_Admin` database, so that
database must be at a schema version that includes the table.

## Behavior Under Load and Multi-Tenancy

Events are queued in memory and written by a background service rather than
inline with the request, so auditing does not add latency to the API call.
The trade-off is that the queue is bounded: under sustained pressure, events can
be dropped, and dropped events are reported in the application log rather than in
the audit trail.

In a multi-tenant deployment, each event is written to the resolving tenant's own
`EdFi_Admin` database. If the tenant cannot be resolved, or resolves without an
`EdFi_Admin` connection string, the event is written to the application log
instead of to any database — Admin API will not fall back to the base
`EdFi_Admin` connection string, which is not a real database in a multi-tenant
deployment.

:::tip

If audit rows are missing in a multi-tenant deployment, check the application
log for unresolved-tenant warnings before assuming the setting is wrong.

:::

:::info

Behind a gateway, the `SourceIpAddress` column records the proxy's address
rather than the caller's unless forwarded headers are configured. See the
[Reverse Proxy Configuration Guide](reverse-proxy-configuration.md).

:::
