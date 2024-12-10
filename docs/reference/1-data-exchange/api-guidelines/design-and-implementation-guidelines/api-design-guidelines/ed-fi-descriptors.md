# Ed-Fi Descriptors

Descriptors in the Ed-Fi Data Standard are a set of mechanisms to support
flexible enumerations or code sets. The following table defined the attributes
of an Ed-Fi Descriptor:

**Table 3.** Descriptor Attributes

The `GET`, `POST`, and `PUT` columns indicate if the attribute is _required_
("yes"), _optional_ ("opt"), or _must not have_ ("no")k.

| Attribute | `GET` | `POST` | `PUT` | Notes |
| --- | --- | --- | --- | --- |
| `namespace` | yes | yes | yes |     |
| `codeValue` | yes | yes | yes | Value _preferred_ to be one or more words rather than a numeric code or random string. |
| `shortDescription` | yes | yes | yes |     |
| `description` | yes | opt | opt | Longer description that may contain additional normative usage guidance. |
| `effectiveBeginDate` | yes | opt | opt | Date for display only, not validation |
| `effectiveEndDate` | yes | opt | opt | Date for display only, not validation |
| `id` | yes | no  | yes |     |
| `_etag` | opt | no  | no  | Required _when the host implements etags_. |
| `xyzDescriptorId` | opt | no  | no  | Retained only for backward-compliance with existing ODS/API implementations. |
| `priorDescriptorId` | opt | no  | no  | Retained only for backward-compliance with existing ODS/API implementations. |
| `lastModifiedDateTime` | opt | no  | no  | Date for display only, not validation |

## URL Construction and HTTP Verb Usage for Ed-Fi Descriptors

Descriptors are also exposed as Resources of an Ed-Fi API and can be accessed
and manipulated as follows:

**Table 4.** Accessing and Manipulating Descriptors

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| `/[abc]Descriptors` | Adds a new Descriptor | Gets all Descriptors for the subtype | Error | Error |
| `/[abc]Descriptors/{id}` | Error | Gets all attributes for an individual Descriptor | Updates an individual Descriptor | Deletes an individual Descriptor |

## Descriptor References

Many Ed-Fi [Resources](./resources/readme.md) have one or more
Descriptor in their lists of attributes. The Descriptor value is a Uniform
Resource Indicator (URI). The URI for a Descriptor _must_ be constructed in the
following format:

```text
uri://[namespace]/[name of descriptor]#[descriptor value]
```

For example, to refer to the `academicSubject` value in the Ed-Fi namespace
(`<http://ed-fi.org>`) with a codeValue of "Chemistry" the reference would be the
following URI:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry
```

Values _must_ be sent as-is and _must not_ be URI or otherwise encoded.

For example, a descriptor whose codeValue has spaces _must_ be sent thus:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```

... and _must not_ be sent as, e.g.,

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English%20Language%20Arts
```

The server API application _should_ parse the `namespace` and `codeValue` from
this URI to perform reference validation, unless reference validation has been
deliberately disabled. For example, if the API application does not have
"Chemistry" as a `codeValue` for `academicSubject`, then the server _must_
respond with status code 400 when processing a `POST` or `PUT` request that
contains `uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry`.

## Ed-Fi Descriptor API

An Ed-Fi API _should_ expose all Descriptors via a REST interface, using the
standard [REST API
Conventions](./rest-api-conventions/readme.md). However, it is
_recommended_ that access to the HTTP verbs be carefully controlled:

* All API clients should have read-access using `GET` requests, so that they
    may ascertain the full set of values available in the given implementation.

* Access to the `POST` verb should be granted only in carefully controlled
    situations, so that the number of `codeValues` does not proliferate
    inappropriately.

* The community best practice is to avoid modifying or deleting existing
    Descriptors; however, a `PUT` request may be used to modify the `endDate` on
    an existing Descriptor, or clarify the `description`, without otherwise
    modifying the `namespace` and `codeValue`.

:::tip

The Descriptor API is completely described in an Open API 3
specification document. Note that there are multiple versions, matching with
the Resources API versions.

:::
