# Known Issues Details

The notes below apply to Ed-Fi API Publisher 1.4. They are grouped by the API in
use as source or target: the [Ed-Fi ODS/API](#ed-fi-odsapi),
[Ed-Fi API v8](#ed-fi-api-v8), or [both](#all-apis).

## Ed-Fi ODS/API

### Sources Without a Configured Snapshot

For an Ed-Fi ODS/API version 7 or later source, the publisher reads from a
snapshot so that the data it walks cannot change mid-run. The Ed-Fi ODS/API does
not configure a snapshot by default. Without one, every source request fails
with `404 Snapshot not found.` and nothing is published.

This applies to the source of a run, not the target.

There are two ways to publish from such a source:

* **Configure a snapshot on the source.** The run then reads from a frozen copy,
  so the data it reads cannot change while it is being walked.
* **Set `--ignoreIsolation=true`** (or `ignoreIsolation` on the named
  connection). The run reads live data instead. This is simpler, but changes
  made at the source during the run may not be captured consistently.

Setting the option while a snapshot is configured still reads live data, which
is rarely what is intended.

### Large Resources

For resources with millions of records, use cursor paging (the default for an
Ed-Fi ODS/API 7.3 or later source). With offset paging, deep pages can take
longer than the source API's database timeout and fail. If a source cannot
answer a resource's `/partitions` request within its timeout, the publisher
falls back to offset paging for that resource.

### Known Limitations for Ed-Fi ODS/API 5.1-5.3 (Details)

Below are usage notes if using Ed-Fi ODS/API 5.1-5.3 only. These issues have
been resolved in the
[Ed-Fi ODS / API 5.3-cqe](https://techdocs.ed-fi.org/display/EFTD/Change+Query+Enhancements)
patch and also resolved in upstream versions
[Ed-Fi ODS / API 6.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/overview).

#### Deletes Cannot Be Published (without a custom build of the ODS API)

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

#### Primary Key Changes Cannot Be Published

While it is generally preferred in relational database design for primary keys
to be treated as immutable, with the natural key style of the Ed-Fi model,
primary key value changes are inevitable for some resources (often because of
the inclusion of "BeginDate" values, or similarly volatile values).

For this reason, there are some API resources that support changes to primary
key values through `PUT` requests. API clients identify the resource to be
updated by providing the `id` in the route. The request body is then used to
supply the new key values.

The Ed-Fi ODS API supports this functionality for the following resources:

* classPeriods
* grades
* gradebookEntries
* locations
* sections
* sessions
* studentSchoolAssociations
* studentSectionAssociations

If an API client updates a primary key value as described above, the Change
Queries implementation of the Ed-Fi ODS will not reflect this. The "new"
resource (and all its dependencies) will be visible as new resources, but the
removal of the "old" resource(s) will not. The result will be that a stale
copies of all of the affected items (with the old primary key values) will be
stranded in the target ODS.

#### Deletes of Descriptors Cannot Be Published (without custom processing)

Since the resource `id` values are not portable between Ed-Fi ODS databases, API
clients must use the primary key values to locate target resources when
publishing deletes. However, the primary key of the `edfi.Descriptor` table in
the ODS is an internal identity column which is also not portable, but is
exposed to the client. Thus, the resources must be identified by the _alternate
key_ -- `namespace` and `codeValue`. However, the Ed-Fi ODS tracks deletes using
triggers which (a) don't have the namespace/codeValue in context in the derived
descriptor table triggers, and (b) don't have the descriptor sub-type in context
in the base Descriptor table trigger. The consequence is that API does not
currently make it possible to publish descriptor deletions.

#### Profiles Not Currently Supported

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

## Ed-Fi API v8

### Snapshots on an Ed-Fi API v8.0 Source

Ed-Fi API v8.0 does not support snapshots. It ignores the request for one and
serves live data, so a run from an Ed-Fi API v8.0 source succeeds with or
without `--ignoreIsolation`, but always reads data that can change while it is
being walked. Publish from it when the source is not being written to, or rely
on the next incremental run to pick up changes made during the run.

### Paging on an Ed-Fi API v8.0 Source

Ed-Fi API v8.0 does not support cursor paging, so a run from an Ed-Fi API v8.0
source always uses offset paging. The log shows a `WARN` line for each resource
("Request to Source API for the /partitions child resource was unsuccessful");
this is expected and needs no action.

### Ed-Fi API v8 as a Target

**Load school years before publishing.** The publisher does not publish
`schoolYearTypes`, because an Ed-Fi ODS/API database includes them. An Ed-Fi API
v8 data store gets them only when its seed data is loaded. Without them, most
student-related records fail, many reported as `Forbidden` rather than as a
missing reference.

**When the data store is on PostgreSQL, make sure it has enough connections.**
Ed-Fi API v8 keeps a connection pool per data store. Under the publisher's
default concurrency it can exhaust PostgreSQL's `max_connections`; the affected
requests fail with `500` and those documents are not published. Raise
`max_connections` (300 was enough for an instance serving two data stores in
testing) or reduce the API's connection pool size.

### Rate Limit on an Ed-Fi API v8.0 Target

By default, Ed-Fi API v8.0 accepts 5000 requests per 10 seconds and answers the
requests above that with `429 Too Many Requests`. The publisher does not retry a
write rejected this way: the run reports the failed documents and exits with a
non-zero code, but the target is left incomplete. To stay under the limit, turn
on the publisher's own rate limiting, for example
`--enableRateLimit=true --rateLimitNumberExecutions=400 --rateLimitTimeSeconds=1`
(or the same options in `apiPublisherSettings.json`), or raise
`RateLimit:PermitLimit` on the Ed-Fi API.

### Empty Values in Required Fields (Ed-Fi API v8 Target)

An Ed-Fi ODS/API can hold an empty string in a required field; Ed-Fi API v8
rejects it. When the field is part of a record's key, every record that
references it is rejected too. For example, a grading period with an empty name
blocks its sessions, course offerings, sections and their grades. Correct such
values at the source before publishing to Ed-Fi API v8.

### Descriptors With Trailing Spaces (Data Standard 5.x)

Three default tribal affiliation descriptors in Data Standard 5.x end with a
space ("Little Shell Tribe ", "Pechanga Band of Indians ", "Yuhaaviatam of San
Manuel Nation "). The Ed-Fi ODS/API keeps the space; Ed-Fi API v8 removes it.
Publishing from Ed-Fi API v8 into an ODS/API therefore creates a second
descriptor next to each of the three, and records that reference them point to
the new one. Data Standard 6.0 and later are not affected.

## All APIs

### Extensions Present Only on the Target

By default the publisher builds its list of resources from the target. If the
target has an extension the source does not (for example TPDM), reading those
resources from the source fails and the run ends with an error. Exclude the
extension's resources with `--exclude`.

### Writes That Time Out on Every Retry

If the target does not respond to a write within the HTTP timeout on every
retry, the publisher drops that document without reporting it as failed, and a
run with no other errors exits with code 0. A target that refuses or resets the
connection is reported correctly. The run does not advance its last change
version and logs "This run did not finish without losing documents", so a later
incremental run republishes the affected changes. After a one-time full
publish, check the run summary: a resource whose Published count is lower than
its Attempted count lost documents. Reducing parallelism lowers the load on a
target that is close to its limits.
