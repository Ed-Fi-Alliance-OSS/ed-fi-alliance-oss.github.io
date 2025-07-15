---
description: Detailed description of new features in ODS/API v7.1.
sidebar_position: 1
---

# What's New in v7.1

This section provides an overview of the new features in v7.1 of the Ed-Fi ODS /
API, targeted for deployment starting in the 2024–2025 school year. A
comprehensive list of all changes can be found in the [Release
Notes](./release-notes.md) section.

Detail about each change follows.

## Improvements & Enhancements

This section briefly describes the new features and enhancements built into the
Ed-Fi ODS / API Platform v7.1 and provides links to additional documentation.

### Data Model Changes

Ed-Fi ODS / API v7.1 adds support for implementing [Ed-Fi Data Standard
v5](/reference/data-exchange/data-standard/), which introduces important updates that impact multiple domains of the Ed-Fi data
model. Refer to [What's New in Data Standard
v5](/reference/data-exchange/data-standard/whats-new/) for details. There are breaking changes to the model so implementers are
advised to review the changes carefully.

### External Cache Performance Optimization

The ODS / API utilizes caching for descriptors, person-USI-to-Unique-Id mapping
and API client details used for authorization, which improves API performance by
eliminating the need for additional database calls. However, when this cache is
store in memory, it increases memory requirements, repetitions on large scale
implementation with multiple API servers and potentially leads to cache sync
issues.

In ODS / API v6.1, an optional feature was introduced, enabling API hosts to
leverage a shared external distributed cache service, specifically Redis. During
the development of this feature, the existing cache access logic that was written
optimized for local cache access and speed was adapted for use with the
distributed cache. While this adaptor successfully avoided multiple copies and reduced
cache sync issues, it did not address optimization of cache access over the
network.

A notable enhancement in ODS / API v7.1 focuses on optimizing the network usage
of person-USI-to-Unique-Id mapping in external cache storage. In previous
versions, the entire serialized mappings were transferred to and deserialized from an
external cache provider like Redis every time a translation was needed. With the
latest release, this process has been refined to minimize network overhead.
Refer to [How To: Use an External Cache Provider for the Ed-Fi API](../how-to-guides/how-to-use-an-external-cache-provider-for-the-ed-fi-api.md) for details on how to enable external caching and how to choose external or
in-memory caching for specific cache data.

### Support for OpenAPI 3

The Ed-Fi ODS/API exposes metadata based on the open-source OpenAPI
Specification (OAS), which is a widely adopted, standardized format for describing REST
APIs. This metadata comprehensively outlines all API resources, including inputs,
HTTP verbs, and the schema of the exposed resources. The OpenAPI specification is
utilized in generating [Online Documentation](../client-developers-guide/using-the-online-documentation.md), and by the code generation tools to [Generate SDKs](../client-developers-guide/using-code-generation-to-create-an-sdk.md). In earlier versions, the ODS/API exposed OAS version 2. However, in ODS/API 7.1,
metadata is exposed in OAS v3 by default, while still allowing access to OAS v2
through a version parameter for backward compatibility. This ensures a smooth
transition for users while providing compatibility with previous specification.

### MetaEd IDE v4.3

Implementing extensions in Ed-Fi ODS / API v7.1 requires implementers to update to [MetaEd IDE v4.3](/reference/metaed). Refer to [MetaEd What's New](/reference/metaed/whats-new) for details on latest updates and improvements.

## Improvements & Enhancements - Previous v7.0

Refer to [What's New in Previous v7.x
Releases](./whats-new-in-prev-v7x-releases.md) for details on the
features added in v7.0 of the Ed-Fi ODS / API.
