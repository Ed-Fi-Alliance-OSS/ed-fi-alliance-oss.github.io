# Coding Patterns

This section outlines code and database patterns used throughout the Ed-Fi ODS /
API.

## ASP.NET MVC

The Ed-Fi ODS / API is built on [Microsoft ASP.NET](https://www.asp.net) MVC Web
API. As a mature and robust platform for building a Web API, this framework is
familiar to tens of thousands of software developers and fully supported by one
of the most recognized software companies in the world. The Ed-Fi ODS / API
takes advantage of well-known extensions to this framework such as route
mapping, authorization filters, and dependency injection extension points to
provide its advanced features.

## Inversion of Control via Autofac

Inversion of Control and Dependency Injection (DI) are a technique and set of
practices for creating testable, modular software systems.
[Autofac](https://github.com/autofac/Autofac), a mature and stable,
best-of-breed dependency inversion container was selected as the DI Container
for the Ed-Fi ODS / API.

In a nutshell, the set of software components representing desired functionality
are registered and linked together in the DI Container. When the top-level
application components are retrieved, the components run agnostically using
whatever components were included in the configuration. This approach to
software development tends to decouple components, makes testing easier, and
allows for easier modification and customization.

## Ed-Fi REST API Design & Implementation Guidelines

The Ed-Fi Data Standard includes guidelines for the design and implementation of
APIs. Those guidelines describe the properties to which an API specification and
related implementation must adhere to in order to be considered aligned to Ed-Fi
technology standards. The Ed-Fi ODS / API follows those guidelines. The
guidelines are described in the [API Design &amp; Implementation
Guidelines](/reference/data-exchange/api-guidelines) documentation.

## Ed-Fi Data Model Extension Patterns

The Ed-Fi Data Standard has a set of conventions collectively known as the
[Ed-Fi Extensions
Framework](https://edfi.atlassian.net/wiki/display/EFDS5/Ed-Fi+Extension+Framework).
This framework defines the patterns to use in concrete technology components
like the ODS and the XSD where extensions to the Ed-Fi Data Model are required
by implementers. [MetaEd IDE](/reference/metaed) simplifies authoring extensions
following patterns defined in Ed-Fi Extensions Framework and produces core
technical artifacts such as the Ed-Fi Standard Interchange Schema (XSD files),
the Ed-Fi ODS (SQL Scripts). [Extending the ODS / API Data
Model](./extensibility-customization/extending-the-ods-api-data-model.md)
section in this documentation provides information on integrating data model
extensions with ODS / API.
