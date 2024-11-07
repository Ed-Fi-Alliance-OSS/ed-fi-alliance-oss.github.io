# Fundamentals

The Ed-Fi ODS / API is a fairly large, complex system. This section covers the
basic information you’ll want to know before diving in.

## Made to be Secure

Everyone working with student information wants to know that their data is
secure and that students’ information is kept private. The Ed-Fi ODS / API was
built from the ground up to provide developers with a solution to keep data
secure and private.

Communication with the API is encrypted and only sent over HTTPS. The ODS / API
uses OAuth2 to handle client access, requiring clients to provide an access
token before any data-related action is invoked. Once an access token has been
verified, the ODS / API uses a claims-based system to determine whether the
client is authorized to read (or otherwise work with) a particular kind of
resource.

The authorization claim system provides fine-grained control over what
information is shared. Access can be limited by table/entity, row/record, or
field/element, whichever is appropriate. For example, a student information
system might be granted read/write access to a broad set of student profile and
registration information, while an online assessment system might have its
access limited to a read-only view of a class’ student roster and read-write
access to assessment results information.

See the [Security](./security/readme.md) section of this documentation for
implementation details.

## Made to be Extended

Out of the box, the ODS / API core data model covers a wide swath of information
related to the K–12 domain, with a focus on student achievement. However, the
data model is easily extended to handle information specific to your
environment.

The database and the API have easy-to-implement design patterns to follow that
allow you to do something as simple as add an element to a core object like the
student model or as complicated as adding a new domain with its own entities and
associations. Further, many of the supporting features are auto-generated. So,
for example, the documentation for the API is automatically updated with your
additions whenever you extend the core data model.

See the section on [Extensibility &
Customization](./extensibility-customization/readme.md)
in this documentation for details.

## An Open Source, Customizable System

The Ed-Fi ODS / API is an enterprise-class customizable system. The source code
distribution has a complete set of features and can easily be set up to run on a
development machine or test environment — however, some analysis, planning, and
development work are essential to put the complete system into production for an
enterprise.

The Ed-Fi ODS / API is open source, meaning that all the source code is
available to licensees who are free to modify and enhance the system. Many
implementers choose to start with a core installation to get running quickly,
and then customize or swap out modules to improve fit with their environment and
to ready the solution for production deployment. For example, the solution
includes log4net, a highly performant, configurable, and free system for event
logging — but users can swap that module out and use the logging system of their
choice.

The Ed-Fi Alliance also welcomes code contributions from field implementers and
hosts a platform called the Ed-Fi Exchange that allows licensees to share code
modules. For a listing of available technology and information about how to
contribute code, see [exchange.ed-fi.org](http://exchange.ed-fi.org).

## Unique ID Endpoints: Some Assembly Required

Most enterprises have their own existing unique ID system to look up and assign
IDs to students, staff, and other individuals associated with their
organization. Similar to most unique ID systems, the API assumes that the ID is
unique across the enterprise, but that each individual is given only one
enterprise-wide unique ID even if they’re in multiple roles (e.g., when a staff
member is also a parent).

The Ed-Fi ODS / API comes with unique ID code that makes it easy to set up a
development or test environment. However, integration and development are
required to connect to an existing unique ID system. The Ed-Fi ODS / API does
not replace an organization’s unique ID system, instead providing a standard
interface for clients and clear extension points for platform developers to
integrate with existing systems.

Platform developers can choose how best to integrate their unique ID system, if
at all. The as-shipped configuration of the ODS / API returns an HTTP `501 - Not
Implemented` response for calls to the unique ID endpoints, so the system is
logically complete and correct out of the box. However, most platform hosts will
want to consider an integration model.

One integration model is to have the unique ID functionality "integrated" with
the API, which means that the platform hosts have wired in their unique ID
system to communicate with the ODS / API. As a consequence, the ODS / API
contains the enterprise-wide unique ID for person entities, and uses that value
as the primary ID attribute for those resources. This integrated approach means
that client applications can rely on the API to be aware of that enterprise-wide
unique ID when making updates or looking up a record by ID.

Another approach is a "non-integrated" model, which means that the ODS / API is
not wired into an enterprise-wide unique ID system, but rather relies on client
applications to either assign or obtain a unique ID outside the context of the
ODS / API. This unique ID may be an enterprise-wide ID or simply a GUID assigned
by clients – the key point just being that client applications are responsible
for populating the unique value in the ODS / API.

See the technical article [Unique ID System
Integration](../technical-articles/unique-id-system-integration.md) for
implementation details.

Keeping the unique ID API endpoints — and behavior — consistent regardless of
the underlying Unique ID product allows flexibility for platform implementers.
This approach also makes it easy for client application vendors to connect to
different implementations of the Ed-Fi ODS / API platform without requiring
custom code.

## Key Structure

The Ed-Fi ODS / API uses natural keys as its primary means of enforcing
uniqueness in records and maintaining relationships between records.

The data in the ODS / API represents a rich domain with deep relationships. The
ODS data model is organized into aggregates based on the principles of
[Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design), and
those aggregates are exposed as API resources. Since the ODS is typically not
the system of record (i.e., the system that creates and manages the data),
primary keys are formed from the well-known, natural keys in the domain.

See the technical article [Key Structure in the Ed-Fi ODS /
API](../technical-articles/key-structure-in-the-ed-fi-ods-api.md)
for additional details.

## Support for Incremental Updates

The API provides a feature that allows client systems to view updates made to
the data in the ODS after a specified point in time, including information about
creates, updates, and deletes. This allows client systems to stay in sync with
the data in the ODS through incremental updates. The feature is optional for
platform hosts, and can be enabled through configuration.

Documentation for client systems is provided in the [Using the Changed Record
Queries](../client-developers-guide/using-the-changed-record-queries.md)
section of the API Client Developers' Guide.

## Support for Transactional & Bulk Modes

The API supports transactional model for updating data in the ODS using JSON
format for data exchange. However there are utilities that can aid in uploading
data in batch mode via the API (e.g., [Bulk Load Client
Utility](./utilities/bulk-load-client-utility.md) can
be used to bulk load XML data and Data Import [Data
Import](/reference/data-import) can be
used to bulk load CSV data). Bulk loading is useful for solutions where data is
updated in batches (e.g., for organizations that feed data on a nightly
schedule). Bulk loading is also useful for the initial population of data (e.g.,
when connecting a new system or at the start of the year). A transactional model
is useful once you have data in the system. Individual records and fields can be
updated in real-time (or near real-time) by client applications.

## Code Generation Wherever Possible

Much of the data access code and API surface have architectural patterns and
conventions defined, so the Ed-Fi ODS / API leverages code generation techniques
throughout the system.

The Visual Studio solution includes several Mustache templates to generate many
of the C# data-related objects based on the data model. During the build
process, the (possibly extended) Ed-Fi Standard XSD, database structure, and
metadata files provide inputs to the code generation process that generates the
Ed-Fi ODS / API and Swagger documentation. The client-facing documentation for
the API is also auto-generated and consumed by the Swagger documentation
website.

For implementers extending the data model of the ODS / API, the Ed-Fi Alliance
publishes a free, lightweight tool called the MetaEd IDE. The MetaEd IDE uses a
simple language to express data model customizations, and generates all the
technical artifacts you'll need to implement your extensions.

The [Extensibility &amp;
Customization](./extensibility-customization/readme.md)
section of this documentation provides additional detail on the code generation
used by the solution.

Code generation from authoritative sources helps ensure that the API and
Documentation are kept up-to-date in a way that manual maintenance cannot.

## Built for Agile Development and Continuous Integration

The Ed-Fi ODS / API ships with unit tests and integration tests that provide
assurance that the system functions as intended. Under Agile development
methodologies, code introduced to fix existing issues or provide new features
must have accompanying test coverage, and should not break any pre-existing
tests (unless those tests should break because of changing requirements).

The code was designed to be modular and customizable. The Inversion of Control
design pattern is used extensively along with other recognizable software
patterns to maximize the flexibility and extensibility of the solution for
implementers.

In the Continuous Integration software development methodology, a build and
integration server automatically pulls down, builds, deploys, and tests code
with every code commit into the version control system. This practice provides
an automated authoritative build that can be deployed automatically to test or
production servers. The Ed-Fi ODS / API solution is shipped with scripts that
can be used as a basis for Continuous Integration.
