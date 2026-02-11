# Ed-Fi Admin API - Getting Started

This documentation outlines the steps necessary to deploy and set up the Ed-Fi
ODS / API Admin API. The Admin API provides an API interface to perform common
administrative tasks for an instance of an Ed-Fi ODS / API.

## Audience

This documentation is for System administrators, IT professionals, and DevOps personnel who will be
installing the Admin API to an environment suitable for production.

## Ed-Fi Admin API Overview

Each Ed-Fi Admin API product line has a set of steps outlining a one-time config, installation steps, and technical documentation outlining different use cases. Each section below is separated by product version and should reference the necessary ODS/API configuration needed in the steps.

### Admin API version 2.3 and later (ODS/API 6.x and 7.x)

Admin API version 2.3 and later supports use of both ODS/API 6.x and 7.x applications. Please follow the [Getting Started 2.3 guide](./admin-api-2.3-newer/readme.md) for more information on set up and configuration.

### Admin API version 2.0 - 2.2 (ODS/API 7.x only)

For Admin API versions 2.2 and earlier, users are required to match their version of Ed-Fi ODS/API with the Admin API version that supports that line. For additional instructions, please see our [Getting Started 2.x (2.2 and earlier)](./admin-api-2.2-older/readme.md) page. NOTE: If you are on an Admin API 2.x version earlier than 2.3, the Ed-Fi Alliance **highly** recommends updating to take advantage of all the latest features.

### Admin API version 1.x (ODS/API 5.4 and 6.x)

For Admin API versions 1.4 and earlier users are required to match the proper Admin API version with their corresponding Ed-Fi ODS/API version. For Admin API 1.x, this requires matching an ODS version between ODS/API v5.4 and ODS/API v6.3. Note, if you are on ODS/API v6.x and can upgrade to Admin API 2.3, Ed-Fi **highly** recommends doing so to maintain forward compatibility with upcoming features. Please see our [Getting Started 1.x](./admin-api-1.x/readme.md) page for more information.

## Additional Resources

### Securing the Ed-Fi Admin API - Best Practices

[Securing the Admin API](/reference/admin-api/securing-admin-api)
