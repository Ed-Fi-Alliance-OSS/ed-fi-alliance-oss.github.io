# Using the Generated Artifacts

## ... or, "Now What?"

The MetaEd IDE generates a number of technical artifacts, which you can find in
the Explorer in the MetaEdOutput directory. We figure you wouldn't be here if
you didn't have a solid working knowledge of Ed-Fi technology — but a few pieces
of information are worth covering.

![Generated artifacts](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/metaed-output-folder.png)

## Generated SQL

The MetaEd IDE generates a number of SQL script artifacts, which can be found in
the ODS-SQLServer directory. These include Core and Extended database tables for
the Ed-Fi ODS, and related SQL structure scripts such as index declarations.
These files are used by the Ed-Fi ODS / API software, in particular, its code
generation cycle.

The SQL files are prefixed by a number. Generally speaking, there are several
new SQL files, most of which have "EXTENSION" in the name. These are additive to
the set of scripts that ship with the Ed-Fi ODS / API. There are other scripts
with the same name as files that ship with the ODS / API — these are intended to
replace the files with the same name.

The generated files are:

* `0001-Schemas.sql` - the Ed-Fi core database schema definitions.
* `0001-EXTENSION-extension-Schemas.sql` - The database schema definitions for
    the extensions provided, using the default "extension" namespace.
* `0004-Tables.sql` - the Ed-Fi core database tables.
* `0004-EXTENSION-extension.sql` - the extension database tables, using the
    default "extension" namespace.
* `0009-IdColumnUniqueIndexes.sql` - an indexing update to the Ed-Fi core tables
    for API support.
* `0009-EXTENSION-extension-IdColumnUniqueIndexes.sql` - the same indexing
    update for extensions, using the default "extension" namespace.

See the [Ed-Fi ODS / API
documentation](/reference/ods-api/platform-dev-guide/extensibility-customization/extending-the-ods-api-data-model) for more detail
on the SQL files and the code generation process.

## Generated XSD

The MetaEd IDE generates XSD artifacts aligned with the SQL script artifacts,
and are found in the XSD and Interchange folders. These generally include an
Extended XSD core and one or more additional Interchange Files. These files
define the structure for bulk data exchange and bulk loading of Ed-Fi data. XSD
artifacts are also used as part of the Ed-Fi ODS / API code generation process.

The generated files are:

* Ed-Fi-Core.xsd - the Ed-Fi core XSD
* EXTENSION-Ed-Fi-Extended-Core.xsd - the XSD for the extension, using the
    default "extension" namespace.
* SchemaAnnotation.xsd - definitions of annotations in an Ed-Fi XSD.
* Interchange-\*.xsd - the interchanges in Ed-Fi core.
* EXTENSION-Interchange-\*.xsd - the interchanges for the extension, using the
    default "extension" namespace.

See the [Ed-Fi ODS / API documentation](/reference/ods-api) for more detail.

## Generated API Metadata

The MetaEd IDE generates a number of metadata files used by the Ed-Fi ODS / API.
These can be found in the ApiMetadata folder, and include DomainMetadata.xml,
DomainMetadata-Extension.xml and EdOrgReferenceMetadata.xml. They provide
directives to the Ed-Fi ODS / API build process.

## Generated Data Dictionaries

The MetaEd IDE generates two data dictionaries in the DataDictionary folder. The
Ed-Fi SQL Data Dictionary provides documentation on the core and extension
tables generated by MetaEd. This is an Excel file
named Public-Ed-Fi-SQL-Data-Dictionary.xlsx. The Ed-Fi XSD Data Dictionary
provides documentation on core and extension XSD elements generated by MetaEd.
This Excel file is named Public-Ed-Fi-XML-Data-Dictionary.xlsx.

## Generated Data Handbook

The MetaEd IDE generates a data handbook that combines both Ed-Fi core and
extensions in the Ed-Fi-Handbook folder. The data handbook takes several forms,
but each one contains the same comprehensive information.

The generated files are:

* Ed-Fi-Handbook.xlsx - An Excel version of the data handbook
* MetaEd-Handbook-Index.html - An interactive and searchable version of the
    data handbook.

The HTML version of the data handbook is a self-contained file that can be run
locally or hosted on a web server. An example of the output is shown below:

![Ed-Fi Data Handbook](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/Ed-Fi-Data-Handbook.png)

## Artifact Deployment for ODS / API Builds

The MetaEd IDE can deploy the generated artifacts necessary for an ODS / API
build of an extension project. These include the generated SQL, generated XSD,
and generated API metadata.

Assuming you have a working ODS / API build environment on your machine, you can
easily configure the MetaEd IDE to copy the generated files over to the correct
locations for the ODS / API project.

:::tip

See [How To: Extend the Ed-Fi ODS / API - Student Transportation
Example](/reference/ods-api/how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transcript-example) for
more information on creating the related C# project.

:::

First, ensure that your Ed-Fi ODS / API source directory is set properly in the
MetaEd IDE settings.

![ODS/API path](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/deployment-directory.png)

Then, deploy by selecting **MetaEd** > **Deploy** from the menu bar. Click OK on
the confirmation dialog.

![Deploy artifacts](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/class-discussion-deploy.png)

This will run a new build of all artifacts, and the artifacts required for the
ODS / API will be copied over to the correct locations.
