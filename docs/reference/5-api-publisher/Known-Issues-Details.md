# Known Issues Details

# Known Limitations for Ed-Fi ODS/API 5.1-5.3 (Details)

Below are usage notes if using Ed-Fi ODS/API 5.1-5.3 only. These issues have
been resolved in the
[Ed-Fi ODS / API 5.3-cqe](https://techdocs.ed-fi.org/display/EFTD/Change+Query+Enhancements)
patch and also resolved in upstream versions
[Ed-Fi ODS / API 6.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/overview).

## Deletes Cannot Be Published (without a custom build of the ODS API)

Resources deleted in the source API cannot currently be published by the Ed-Fi
API Connector due to the implementation of the Change Queries feature in the
Ed-Fi ODS API. As currently implemented, the API provides a "/deletes" resource
under each data management resource (e.g. _/data/v3/ed-fi/students/deletes_).
However, the resource only returns two properties for each deleted item: the
resource identifier and the change version. Unfortunately, resource identifiers
cannot be specified by API clients upon creation (they are server-assigned
values), and so as data is moved from a given source API to one or more targets,
each corresponding target's resource will have its own resource identifier for
the resource. Since the Ed-Fi API Publisher only has access to the source's
resource identifier, no meaningful action can be taken against the target.

There has been some discussion with the Ed-Fi Alliance about how to address this
deficiency, but there is currently no timeline available for a resolution.

## Primary Key Changes Cannot Be Published

While it is generally preferred in relational database design for primary keys
to be treated as immutable, with the natural key style of the Ed-Fi model,
primary key value changes are inevitable for some resources (often because of
the inclusion of "BeginDate" values, or similarly volatile values).

For this reason, there are some API resources that support changes to primary
key values through `PUT` requests. API clients identify the resource to be
updated by providing the `id` in the route. The request body is then used to
supply the new key values.

The Ed-Fi ODS API supports this functionality for the following resources:

- classPeriods
- grades
- gradebookEntries
- locations
- sections
- sessions
- studentSchoolAssociations
- studentSectionAssociations

If an API client updates a primary key value as described above, the Change
Queries implementation of the Ed-Fi ODS will not reflect this. The "new"
resource (and all its dependencies) will be visible as new resources, but the
removal of the "old" resource(s) will not. The result will be that a stale
copies of all of the affected items (with the old primary key values) will be
stranded in the target ODS.

## Deletes of Descriptors Cannot Be Published (without custom processing)

Since the resource `id` values are not portable between Ed-Fi ODS databases, API
clients must use the primary key values to locate target resources when
publishing deletes. However, the primary key of the `edfi.Descriptor` table in
the ODS is an internal identity column which is also not portable, but is
exposed to the client. Thus, the resources must be identified by the _alternate
key_ -- `namespace` and `codeValue`. However, the Ed-Fi ODS tracks deletes using
triggers which a) don't have the namespace/codeValue in context in the derived
descriptor table triggers, and b) don't have the descriptor sub-type in context
in the base Descriptor table trigger. The consequence is that API does not
currently make it possible to publish descriptor deletions.

## Profiles Not Currently Supported

When an API Profile is defined, it introduces an intentional requirement on the
part of the API client to communicate with the Ed-Fi ODS API using
profile-specific content types (e.g.
`_application/vnd.ed-fi.{resource}.{profile}.readable+json_`). The reason for
this behavior is that it is important for an API client to acknowledge that they
are aware that they are reading or writing only _part_ of a resource rather than
operating on the resource as a _whole_. When extra JSON data is supplied in a
POST request to the Ed-Fi ODS API, the request will be processed and the
extraneous data will just be ignored. Without the explicit use of the content
types, unexpected data loss could result.

The Ed-Fi API Publisher does not currently automatically identify that use of a
profile-based content type is required after interacting with either the source
or target APIs. Thus, requests against such an API endpoint will currently fail.
