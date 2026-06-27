---
sidebar_position: 5
---

# Extensibility & Customization

This section describes the built-in extension points in Ed-Fi API v8.0. The
primary extension mechanism is the Ed-Fi MetaEd toolchain, which generates
the artifacts required to extend the API data model.

## Extending the Data Model

Ed-Fi API v8.0 supports extensions to the Ed-Fi Data Standard through the
MetaEd toolchain. An extension produces an `APISchema.json` file that
describes the additional resources, properties, or associations. This file,
together with the core schema, defines the full API surface.

The extension workflow in v8.0 differs from the ODS/API approach:

1. Author the extension in MetaEd and generate `APISchema.json`
2. Place the generated file in the `ApiSchemaPath` directory configured for
   the DMS
3. Author or update claim sets in the Configuration Service to authorize access
   to the new resources
4. Run `dms-schema ddl provision` to create the extension tables in the
   database

See [Extending with MetaEd](./extending-with-metaed.md) for step-by-step
instructions.

## Security Configuration

As with the core data model, access to extension resources is controlled by
claim sets in the Configuration Service. The
[Security](../security/readme.md) section covers claim set management and
authorization strategies.
