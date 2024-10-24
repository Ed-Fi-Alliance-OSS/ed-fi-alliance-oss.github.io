# Documentation & Client Support

The Ed-Fi ODS / API comes with several chunks of documentation and client-facing
material to help platform hosts support developers of client applications.

## Online API Documentation via Swagger

The REST interface to the Ed-Fi ODS / API exposes metadata based on the open
source [OpenAPI
Specification](https://swagger.io/resources/open-api/).[1](https://edfi.atlassian.net/wiki/pages/resumedraft.action?draftId=23299233#PlatformDevGuide-Documentation&amp;ClientSupport-Footnote-1)
This metadata describes all the API resources as well as the inputs, HTTP verbs,
and schema of the exposed resources. This metadata enables a user interface to
automatically generate and display API documentation. This documentation
describes everything a client needs to connect to the ODS / API, including
resource URIs, methods (e.g., GET, POST, PUT, DELETE), parameters, and so forth.

The documentation also supports the ability to make sample calls through the UI,
which means client developers can try out calls and review responses before
writing a line of code. A key benefit of auto-generating the documentation is
that any changes you make to the data model will automatically be reflected in
your platform's client-facing documentation.

To get a sense for the appearance and content of the documentation, you can view
the docs for an as-shipped version of the ODS / API hosted
at [https://api.ed-fi.org/v7.2/docs/](https://api.ed-fi.org/v7.2/docs/). Also,
the [Using the Online
Documentation](../client-developers-guide/using-the-online-documentation.md)
section of the API Client Developers' Guide provides an overview of the
documentation along with information on how to make sample API calls through the
UI.

## Client SDK Code Generation for C# and Java

The same metadata that the Ed-Fi ODS / API exposes for documentation also
supports the ability for client-side generation of data access SDKs. The
generated SDKs include client libraries and server stubs based on the resources
exposed by the API. Swagger Codegen tools can be used for generating client SDKs
for the ODS / API in wide range of languages beyond C# and Java. Client
languages include ActionScript, Bash, C#, C++, Erlang, Go, Groovy, Haskell,
Java, Node.js, Objective-C, Perl, PHP, PowerShell, Python, R, Ruby, Scala,
Swift, and others. Clients connecting to the platform can use the SDKs as a
starting point. The SDK's purpose is to automatically create code interfaces and
data access objects that match the platform API exactly.

By supporting flexible, client-side SDK generation, platform hosts can provide
excellent tools to support client developers without mandating a particular kind
of code or programming model. This flexibility doesn't prevent platform hosts
from distributing a preferred SDK — however, the Ed-Fi Alliance recommends
supporting client-side SDK generation to ensure that your client system
developers can leverage work they may already have done for other Ed-Fi-based
APIs.

The Client SDK code generation is based on the Swagger Codegen tools. An
excellent overview of how the Swagger Codegen works is available on the [Swagger
website](http://swagger.io/swagger-codegen/). More specific documentation on the
SDK generation for the Ed-Fi ODS / API is available in the [Using Code
Generation to Create an
SDK](../client-developers-guide/using-code-generation-to-create-an-sdk.md)
section of the API Client Developers' Guide documentation.

## API Client Developers' Guide

The Ed-Fi Alliance also publishes an API Client Developers' Guide that describes
the fundamentals of connecting client applications to an Ed-Fi-based ODS / API.
Platform hosts can refer clients to this documentation or use the guide as a
starting place for documentation describing their own platform instance. See the
[API Client Developers'
Guide](../client-developers-guide/readme.md)
documentation for more details.

1 Formerly known as the Swagger specification. In January 2016, the
specification changed its name to the OpenAPI specification, though many of the
tools retain the Swagger identity.
