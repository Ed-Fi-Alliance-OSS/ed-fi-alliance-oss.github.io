---
sidebar_position: 3
---

# Features

This section contains reference documentation for the built-in features of the
Ed-Fi API.

| Feature | Description |
| --- | --- |
| changeQueries | The [Changed Record Queries](./changed-record-queries.md) feature tracks inserts, updates, and deletes on resources. See also [Using the Changed Record Queries](../../client-developers-guide/using-the-changed-record-queries.md). |
| openApiMetadata | The OpenAPI metadata endpoint used by the Swagger UI. Specific domains can be excluded from OpenAPI metadata using the `DomainsExcludedFromOpenApi` setting. |
| profiles | The [Profiles](../security/api-profiles.md) feature constrains API consumer access to specific resource properties for read and/or write operations. |
| extensions | Enables API endpoints created for [Extensions](../extensibility/extending-with-metaed.md) loaded from the configured `ApiSchemaPath` directory. |
| tokenInfo | The OAuth [token\_info](https://tools.ietf.org/html/rfc7662#section-2) introspection endpoint, which provides security configuration information for a token. See [Token Info](./../../client-developers-guide/authorization.md#token-info) for details. |

## Contents

- [Changed Record Queries](./changed-record-queries.md)
