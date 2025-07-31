# Support for multiple credentials per application

:::info

This information is relevant if you are using Admin API 2.3 and forward

:::

Admin API 2.x includes now an endpoint to manage extra credentials for an application.

It now implements two different approaches

## Original approach (single set of credentials per Application)

You can manage a single set of credentials with the `/v2/applications` endpoint. In case
you want to reset these credentials, you can use the `/v2/applications/{id}/reset-credentials` endpoint.

## New approach (multiple credentials per Application)

When you create an Application, Admin API still creates a new set of credentials, but you can use
the `/v2/apiclients` endpoint to manage additional credentials.

:::warning

It's highly recommended that you disable the `/v2/applications/{id}/reset-credentials` endpoint
when working with the new approach, given that this endpoint will reset the first set of credentials
only for the given Application, and this might lead to confusing scenarios.

To disable this endpoint, go to the `appSettings.json` file and set the `EnableApplicationResetEndpoint`
property to false.

:::
