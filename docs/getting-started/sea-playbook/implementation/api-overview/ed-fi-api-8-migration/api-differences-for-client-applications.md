---
sidebar_position: 8
---

# API Differences for Client Applications

Ed-Fi API v8 implements the same Ed-Fi API, so most client applications keep working. A few changes affect every vendor and every state-built application that calls the API. Share this page with your vendors.

The full list is in the [release notes](/reference/ed-fi-api/8/whats-new/release-notes#client-application-changes).

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Resource URL | `/data/v3/ed-fi/schools` | `/api/data/ed-fi/schools` (no `v3` segment; `api` is the default path base) |
| Year-specific URL | `/2026/data/v3/ed-fi/schools` | `/api/2026/data/ed-fi/schools` |
| Token endpoint | `https://{api-host}/oauth/token` | `https://{config-service-host}/connect/token` (the old `/oauth/token` still works through a forwarding proxy) |
| Property names in request bodies | Not case-sensitive | **Case-sensitive** |
| Resource IDs and change versions | Existing values | New values, because data is reloaded through the API |
| Credentials | Existing key and secret | New key and secret from the Configuration Service |

## Example: case-sensitive property names

This is the change most likely to break an existing client.

Before, the ODS/API accepted this:

```json
{
  "SchoolId": 255901001,
  "NameOfInstitution": "Grand Bend High School",
  "GradeLevels": [ ... ]
}
```

Now, property names must match the OpenAPI specification exactly (`camelCase`):

```json
{
  "schoolId": 255901001,
  "nameOfInstitution": "Grand Bend High School",
  "gradeLevels": [ ... ]
}
```

With wrong casing, a required property makes the request fail with HTTP 400. An optional property is **dropped without any error**, so the value is silently lost. To check a client, compare its request bodies against the specification at `/metadata/specifications/resources-spec.json`.

## Example: base URL and token URL

A client configured for the ODS/API:

```text
Base URL:  https://api.your-state.gov/data/v3
Token URL: https://api.your-state.gov/oauth/token
```

The same client on Ed-Fi API v8:

```text
Base URL:  https://api.your-state.gov/api/data
Token URL: https://config.your-state.gov/connect/token
```

## Features not in Ed-Fi API v8.0

Some ODS/API features are not available yet, including OneRoster, ownership-based authorization, and custom view-based authorization. Change Queries work without snapshots. See [Feature Availability](/reference/ed-fi-api/8/whats-new/release-notes#feature-availability) for the current list, and check the release notes for later versions.

## What to tell vendors

- The new base URL and token URL for your Ed-Fi API v8 environment.
- That property names are case-sensitive, and how to check.
- When they will get new credentials.
- Which Data Standard version your Ed-Fi API v8 will run, and when.
- That resource IDs and change versions will be new, so any stored values must be refreshed.

:::info[Still being worked out]

- **Carrying credentials across.** We have not found a supported way to keep vendors' existing keys and secrets. Plan for new credentials for now.
- **A vendor test environment.** We have not yet published a recommended approach for giving vendors an Ed-Fi API v8 environment to test against before cutover.

:::
