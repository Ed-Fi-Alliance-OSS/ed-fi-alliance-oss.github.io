---
sidebar_position: 2
---

# II. Understanding Ed-Fi APIs

This section explains design features specific to Ed-Fi APIs and how to
integrate with them. After completing this section, you should have the
knowledge to connect your system to an Ed-Fi API and successfully transmit
larger amounts of data.

## [API Routes](./api-routes.md)

This section explain how the API routes work: the default locations for the
various API resources provided by the Ed-Fi Operational Data Store API.

## [Descriptors](./descriptors.md)

Descriptors are the standard "code sets" or enumerations in the Ed-Fi data
model. This section explains the parts of descriptors and how they are formatted
for transmission via JSON.

## [API Resource Keys](./api-resource-keys.md)

Ed-Fi APIs support a standard REST API resource ID for discovery and updates,
but the API also supports a natural key system.

## [Date and DateTime Elements](./date-and-datetime-formats.md)

Explains how date and time elements are formatted for transmission via JSON.

## [Dependency Ordering for Resources](./dependency-ordering-for-resources.md)

In the Ed-Fi ODS / API, references to other entities must be resolvable. So, API
resources have a natural dependency order and must be created in that order.
