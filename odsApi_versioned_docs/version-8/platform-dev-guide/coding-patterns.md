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
Ed-Fi API v8 takes advantage of well-known ASP.NET Core features such as
minimal API route mapping, the middleware pipeline, and the built-in dependency
injection extension points to provide its advanced features. The Ed-Fi API and
the Configuration Service both define their HTTP endpoints with ASP.NET Core
minimal APIs, grouped into endpoint modules.

## The Request Pipeline

The request pipeline is internal to the Ed-Fi API and isn't an extension
point; use [Plugins](#plugins) to add behavior.

In the Ed-Fi API, the endpoint modules do little more than pass each request
to the API's core library. The core library processes the request through a
pipeline of steps. Each step does its work and then passes the request to the
next step. A step can end the pipeline early, for example when it rejects the
request with an error response.

The Ed-Fi API assembles a separate pipeline for each kind of request (`POST`,
`GET` by ID, query, `PUT`, `DELETE`, change queries, and so on). A typical
write pipeline does the following, roughly in order:

1. Logs the request and validates the tenant.
2. Authenticates the access token and resolves the data store for the request.
3. Parses the path, selects the database to use (always the primary for a
   write; reads can go to a read replica or a snapshot), and checks that the
   database matches the API schema.
4. Parses, coerces, and validates the request body against the API schema.
5. Applies API profiles and claim-set authorization.
6. Runs the unique ID validator, if the host has installed one.
7. Hands the request to the backend that reads or writes the database.

## Plugins

Plugins add behavior without changing or rebuilding the services. A plugin is
a directory of compiled .NET assemblies whose entry point derives from the
`EdFiApiPlugin` base class in the `EdFi.Api.Plugins` package. At startup, each
service loads the plugins named in its `Plugins:Allowed` setting, and each
plugin registers its implementations in the dependency injection container,
for example a unique ID validator that the request pipeline then runs (see
[Unique ID System
Integration](../technical-articles/unique-id-system-integration.md)). See
[Plugins](./extensibility-customization/plugins.md).

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
