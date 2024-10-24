# Features

The Ed-Fi ODS / API comes with a set of configurable features that can be
enabled or disabled using configuration settings in deployed API. This section
contains additional reference documentation for these configurable features.

| Feature | Is Enabled by Default | Description |
| --- | --- | --- |
| changeQueries | true | The [Changed Record Queries](./changed-record-queries.md) feature can be enabled or disabled via configuration. Database configuration remains a separate step, see [Using the Changed Record Queries](../../client-developers-guide/using-the-changed-record-queries.md). |
| openApiMetadata | true | The metadata API endpoint used by Swagger UI can be enabled or disabled via configuration. It is recommend for Production deployments to disable this. |
| composites | true | The [Composites](../extensibility-customization/api-composite-resources.md) API endpoints can be enabled or disabled via configuration. This includes the default Enrollments composite and any custom composites that have been added to the platform. |
| profiles | true | The [Profiles](../security/api-profiles.md) feature can be enabled or disabled via configuration. |
| identityManagement | false | Enables the [Identity API](../../technical-articles/identities-api.md) endpoints. |
| extensions | true | Enables the API endpoints created for all [Extensions](../extensibility-customization/extending-the-ods-api-data-model.md). Installations can be extended by modifying source code see [How To: Extend the Ed-Fi ODS / API - Alternative Education Program Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md) or by deploying dynamic extension plugins see [How To: Deploy an Extension Plugin](../../how-to-guides/how-to-deploy-an-extension-plugin.md) for details. |
| uniqueIdValidation | false | Enables [Unique ID Validation](../../technical-articles/unique-id-system-integration.md). This requires custom implementation of IUniqueIdToIdValueMapper and its registration within the WebApi. |
| tokenInfo | true | Enables oauth [token\_info](https://tools.ietf.org/html/rfc7662#section-2) introspective endpoint which provides the additional security configuration information for the token. See [Token Info](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Authorization#Authorization-tokeninfo) section for mode details. |

## Contents

* [Changed Record Queries](./changed-record-queries.md)
* [Notifications Expiring Local Caches Remotely](./notifications-expiring-local-caches-remotely.md)
* [Ownership Based Authorization](./ownership-based-authorization.md)
* [Read Replicas](./read-replicas.md)
