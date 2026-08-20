---
sidebar_position: 2
---

# Fundamentals

Ed-Fi API v8 is a fairly large, complex system. This section covers the basic
information you'll want to know before diving in.

## Made to be Secure

Everyone working with student information wants to know that their data is
secure and that students' information is kept private. Ed-Fi API v8 was built
from the ground up to provide developers with a solution to keep data secure and
private.

Communication with the API is encrypted and only sent over HTTPS. Ed-Fi API v8
uses OAuth 2.0 to handle client access, requiring clients to provide an access
token before any data-related action is invoked. Tokens are issued by the
built-in [OpenIddict](https://openiddict.com/)-based identity provider hosted in
the Configuration Service, or by an external Keycloak instance for environments
that require enterprise identity management. Once an access token has been
verified, the API uses a claims-based system to determine whether the client is
authorized to read (or otherwise work with) a particular kind of resource.

The authorization claim system provides fine-grained control over what
information is shared. Access can be limited by resource type, record, or
field — whichever is appropriate. For example, a student information system
might be granted read/write access to a broad set of student profile and
registration information, while an online assessment system might have its
access limited to a read-only view of a class's student roster and read-write
access to assessment results information.

See the [Security](./security/readme.md) section of this documentation for
implementation details.

## Made to be Extended

Out of the box, the Ed-Fi API core data model covers a wide swath of information
related to the K–12 domain, with a focus on student achievement. However, the
data model is easily extended to handle information specific to your environment.

The data model and API surface have well-defined extension points that allow
changes as simple as adding an element to a core object like the student model
or as complex as adding a new domain with its own entities and associations.
Supporting artifacts — including API documentation and database structures — are
generated automatically from the data model description, so extensions are
reflected consistently across the platform without manual maintenance.

See the section on
[Extensibility & Customization](./extensibility-customization/readme.md) in this documentation
for details.

## An Open Source, Customizable System

Ed-Fi API v8 is an enterprise-class customizable system. The source code
distribution has a complete set of features and can easily be set up to run on a
development machine or test environment — however, some analysis, planning, and
development work are essential to put the complete system into production for an
enterprise.

Ed-Fi API v8 is open source, meaning that all the source code is available to
licensees who are free to modify and enhance the system. Many implementers
choose to start with a core installation to get running quickly, and then
customize or swap out modules to improve fit with their environment and to ready
the solution for production deployment.

The Ed-Fi Alliance also welcomes code contributions from field implementers and
hosts a platform called the Ed-Fi Exchange that allows licensees to share code
modules. For a listing of available technology and information about how to
contribute code, see [exchange.ed-fi.org](http://exchange.ed-fi.org).

## Key Structure

The Ed-Fi data model is organized into aggregates based on the principles of
[Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design), and
those aggregates are exposed as API resources. Since the API is typically not the
system of record, primary keys are based on the well-known natural keys of the
Ed-Fi domain.

Each resource row has a surrogate `DocumentId` (`bigint`) as its database
primary key. The Ed-Fi natural key is enforced separately as a unique
constraint — it is the business identity of the record and what client
applications use to identify and reference resources. Person entities
(`Student`, `Staff`, `Contact`) are identified by their Ed-Fi natural
identifiers (e.g., `StudentUniqueId`) as the first-class reference.

See [Relational Data Model](../technical-articles/relational-data-model.md) for
the full schema reference.

## Support for Incremental Updates

The API provides a feature that allows client systems to view updates made to
the data after a specified point in time, including information about creates,
updates, and deletes. This allows client systems to stay in sync with the data
through incremental updates.

Documentation for client systems is provided in the [Using the Changed Record
Queries](../client-developers-guide/using-the-changed-record-queries.md) section
of the API Client Developers' Guide.

## Support for Transactional & Bulk Modes

The API supports a transactional model for updating data using JSON format for
data exchange. Utilities are also available to upload data in batch mode via the
API — for example, the [Bulk Load Client
Utility](./utilities/bulk-load-client-utility.md) can be used to bulk load XML
data.

Bulk loading is useful for solutions where data is updated in batches (e.g., for
organizations that feed data on a nightly schedule) and for the initial
population of data when connecting a new system or at the start of the year. A
transactional model is useful once you have data in the system — individual
records and fields can be updated in real time (or near real time) by client
applications.

## Schema-Driven API Surface

The Ed-Fi API v8 API surface — resources, properties, validations, and OpenAPI
documentation — is generated from a single authoritative source: the
`ApiSchema.json` file produced by the [MetaEd](https://techdocs.ed-fi.org/x/JwEJBQ)
toolchain. The same schema file drives database provisioning (via the
`api-schema-tools` CLI), authorization structures, and Swagger documentation.

For implementers extending the data model, MetaEd provides a lightweight
language to express data model customizations. The toolchain generates the
`ApiSchema.json` extension artifact automatically, and the API picks it up on
startup. See [Extending API DataModel](./extensibility-customization/extending-api-datamodel.md)
for details.

Schema-driven generation from an authoritative source ensures that the API,
database, and documentation remain consistent in a way that manual maintenance
cannot.

## Built for Agile Development and Continuous Integration

Ed-Fi API v8 ships with unit tests and integration tests that provide assurance
that the system functions as intended. Under Agile development methodologies,
code introduced to fix existing issues or provide new features must have
accompanying test coverage and should not break any pre-existing tests (unless
those tests should break because of changing requirements).

The code was designed to be modular and customizable, using recognizable software
patterns to maximize flexibility and extensibility for implementers. The
repository includes scripts that can be used as a basis for Continuous
Integration workflows.
