---
sidebar_position: 3
---

# Coding Patterns

This section outlines code and architectural patterns used throughout Ed-Fi API
v8.

## ASP.NET Core

Ed-Fi API v8 is built on [Microsoft ASP.NET Core](https://asp.net). As a
mature and robust platform for building web APIs, this framework is familiar to
tens of thousands of software developers and fully supported by Microsoft.
Ed-Fi API v8 takes advantage of well-known ASP.NET Core features such as route
mapping, middleware pipeline, authorization filters, and the built-in dependency
injection extension points to provide its advanced features.

## Inversion of Control and Dependency Injection

Inversion of Control and Dependency Injection (DI) are a technique and set of
practices for creating testable, modular software systems. Ed-Fi API v8 uses the
ASP.NET Core built-in dependency injection framework
(`Microsoft.Extensions.DependencyInjection`).

In a nutshell, the set of software components representing desired functionality
are registered and linked together in the DI container. When the top-level
application components are resolved, each component runs agnostically using
whatever implementations were registered in the configuration. This approach
decouples components, makes testing easier, and allows for easier modification
and customization.

## Ed-Fi REST API Design & Implementation Guidelines

The Ed-Fi Data Standard includes guidelines for the design and implementation of
APIs. Those guidelines describe the properties to which an API specification and
related implementation must adhere in order to be considered aligned to Ed-Fi
technology standards. Ed-Fi API v8 follows those guidelines. The guidelines are
described in the [API Design & Implementation
Guidelines](/reference/data-exchange/api-guidelines) documentation.

## Ed-Fi Data Model Extension Patterns

The Ed-Fi Data Standard has a set of conventions collectively known as the
[Ed-Fi Extensions Framework](/reference/data-exchange/extensions-framework/).
This framework defines the patterns for extending the Ed-Fi Data Model in
concrete technology components. [MetaEd](/reference/metaed) simplifies authoring
extensions following the patterns defined in the Ed-Fi Extensions Framework and
produces the core technical artifact required by Ed-Fi API v8: the
`ApiSchema.json` file. This single file drives the API surface, database
provisioning, authorization structures, and Swagger documentation. The
[Extensibility & Customization](./extensibility-customization/readme.md) section in this
documentation provides information on integrating data model extensions with
Ed-Fi API v8.
