# API Claim Sets & Resources

The Ed-Fi API provides access to the data stored in an underlying database only
to authorized users and applications. The API is capable of authorizing requests
to a granularity of individual API resources while also taking into
consideration the caller's relationship to the data in question.

For example, a student information system (SIS) vendor can be authorized to read
and write student and staff data, but only for students and staff associated
with the local education agencies the vendor serves. An assessment application,
on the other hand, can be authorized to manage assessment metadata and results
that are specifically tied to its own assessments. These distinctions are
enforced through a combination of claim sets, resource claims, and authorization
strategies, all of which are described in the sections below.

The key concepts and implementation information follow.

## API Resources

The database tables of the Ed-Fi data model are organized into mutually
exclusive groups based on the Domain Driven Design principles for defining
aggregates. Each table in the database belongs to a single aggregate, but an
aggregate can contain many tables. Each aggregate has an aggregate root, which
is the table that represents the top-level element of the exposed object graph.
In the Ed-Fi API, aggregates are exposed as resources.

While there is some good material available on how to determine the most
appropriate boundaries for an aggregate in Domain Driven Design, from the
perspective of creating Ed-Fi data model representations, there is one main
consideration when creating new aggregates or extending an existing aggregate.
Each aggregate represents an object graph consisting of a single root object,
and may contain subordinate objects (i.e., objects contained in child
collections within the object graph). In order for a subordinate object to
reference an object external to the graph (generally representing the
back-reference of a many-to-one relationship), the target object must be the
root of its own aggregate.

The reason for this is obvious if you consider how that outbound link would be
represented in JSON:

```json
"schoolReference": {
    "schoolId": 255901107,
    "link": {
      "rel": "School",
      "href": "/schools?schoolId=255901107"
    }
```

The outbound `href` attribute must directly reference a resource available on
the Ed-Fi API, which by definition would be an aggregate root.

A further implication of this rule for modeling is that the parent object of a
one-to-many relationship must either have its children modeled as a collection
within the same aggregate, or it must be an aggregate root itself (so that the
back-references from the children can be represented as direct URLs).

The figure below shows a sample of resources related to restraint events.

![Resources](/img/reference/ods-api/fig1.png)

## Claims

Authorization decisions for API requests from a consumer application are
claims-based. Each consumer of the API must be issued a key and secret by a
system administrator. The key and secret allow the Ed-Fi API to issue an access
token at runtime. The access token must be included with all API requests.
Additionally, the consumer application's key will be associated with a specific
claim set (i.e., a role). When the consumer calls the Ed-Fi API, the server will
add a collection of resource claims to the request's context based on the
associated claim set, and the security infrastructure will subsequently use
those claims to make authorization decisions.

For example, a Student Information System (SIS) vendor's token might be given a
claim to read the Education Organization data, but a token supplied by an
approved System Data Administrator would generally receive claims to read,
write, and delete data.

:::info

The resource claims documented in this section are conceptual: they aren't
added to the access token. The token carries the client's claim set name, and
the Ed-Fi API reads that claim set's resource claims, actions, and
authorization strategies from the Configuration Service. It caches them for
`CacheSettings:ClaimSetsCacheExpirationSeconds` (600 seconds by default), so a
change to a claim set can take up to that long to take effect.

:::

### Identity Claims

Identity claims give the authorization layer specific attributes about the
caller when making authorization decisions. The claim set name, namespace
prefixes, and education organization IDs are in the access token. Changes to
them take effect when the client gets a new token. Assigned profiles are looked
up in the Configuration Service.

- Namespace Prefix - used to authorize access to resource items where callers
  need to manage their own data that is not associated with any specific
  education organizations, such as custom descriptor values and assessment
  metadata. A consumer can have zero or more namespace prefixes, defined on
  their "Vendor" record in the Configuration Service. Namespace prefixes are
  optional, and can be changed by updating the vendor.
- Profile - used to apply data policies to the response data returned to a
  consumer. A consumer could have many assigned profiles, with each profile name
  defined in association with their "Application" record in the Configuration
  Service.
- Claim Set Name - used to apply a predefined set of claims to the consumer. A
  consumer can only be assigned a single claim set, the name of which is defined
  in their associated "Application" record in the Configuration Service.
- Education Organization Ids - used to identify the education organizations
  whose data the consumer can access. For example, a SIS vendor would have
  permissions to manage student data, but only for students enrolled in schools
  within the local education agencies they serve. Education organization IDs
  are assigned to the "Application" record in the Configuration Service. By
  default, each API client of the application uses all of them, but an API
  client can be narrowed to a subset of its application's education
  organizations. See [API Client and Data Store
  Configuration](../configuration/api-client-and-data-store-configuration.md).

### Service Claims

Service claims authorize access to services exposed by the Ed-Fi API other than
resources. They're resource claims in the claims hierarchy whose names use the
prefix `http://ed-fi.org/identity/claims/services/`, and they're granted to
claim sets like any other resource claim.

The Ed-Fi API has one service claim,
`http://ed-fi.org/identity/claims/services/identity`, which authorizes the
[Identities API](../../technical-articles/identities-api.md)
(`/identity/v2/identities`, available when Identity Management is enabled).
Creating an identity requires the `Create` action; every other identity
operation requires `Read`. Leave this claim's authorization strategy as
`NoFurtherAuthorizationRequired`. A client whose claim set doesn't grant the
required action receives `403`. In the default claims, `EdFiSandbox` can create
and read identities; `SeedLoader` can only create them.

### Resource Claims

The claims used for API resource authorization are based directly on the
resources exposed by the API, and as such can be referred to as resource claims.
Due to the large number of resources, however, they have also been organized
into a claims taxonomy. While resource claims can be issued for individual
resources, in most cases they will be issued for a higher level conceptual
grouping. For example, rather than issue resource claims for each individual
type of descriptor, the broader "systemDescriptors" or "managedDescriptors"
resource claims will be issued instead.

![Resource Claims](/img/reference/ods-api/fig2.png)

#### Resource Claim Values

The base security metadata for a claim set's resource claims will also contain
the actions that can be performed on the resource, along with any
action-specific authorization strategy overrides. The API client context will
provide access to the list of education organization identifiers that have been
associated with the consumer in the Configuration Service.

##### Actions

The Ed-Fi API supports the standard CRUD operations plus a change-query action.
The primitive actions that can be added to claims are **Create**, **Read**,
**Update**, **Delete**, and **ReadChanges** — the last of which authorizes access
to the [changed record query](../features/changed-record-queries.md) endpoints
(`/deletes` and `/keyChanges`). The actions are expressed as URIs, such as
`uri://ed-fi.org/api/actions/create` and
`uri://ed-fi.org/api/actions/readChanges`.

A POST that creates a new record is authorized as **Create**. A POST whose
identity matches a record that already exists (including an identical repost)
is authorized as **Update**, the same as a PUT: the claim set must grant
Update, and Update's authorization strategies are applied. Clients that re-run
loads against existing data therefore need both Create and Update; the
built-in `SeedLoader` claim set grants both.

## Claims Taxonomy

As described above, the claims taxonomy organizes the granular resource claims
into higher-level logical groupings. The metadata contained in the taxonomy also
identifies [authorization strategies](#authorization-strategies) for the various
claims that are applied after the basic "action" checks have been performed. The
figure below shows a representative piece of the Ed-Fi API claims taxonomy.

![Claims Taxonomy](/img/reference/ods-api/fig3.webp)

The strategy used to authorize a request for an Ed-Fi type or descriptor is
different from the one used to authorize a request to modify student-related
data. The former is a straightforward check against the caller's claims for the
requested action on the resource. The latter must also take into account the
relationship between the caller and the student.

The authorization strategy may also differ based on the action in the request,
such as with the case of creating vs. reading or updating a student (see the
"people" resource claim in the figure above). To create a student record, a SIS
vendor only needs the "student" (or "people") resource claim with an associated
action of "Create" — no further authorization is performed. This is intentional:
when a student is being created for the first time, no association records exist
yet. Requiring a relationship to already exist would make it impossible to ever
write the foundational records that establish that relationship. However, to
read or update a student, the SIS vendor must not only have been granted the
appropriate action, but must also have an established relationship with the
student (through the `StudentSchoolAssociation` resource). As the diagram
indicates, this is handled by the
[RelationshipsWithEdOrgsAndPeople](#relationship-based-strategy-variants)
strategy.

### Claims Taxonomy Hierarchy and Strategy Resolution

Resource claims are organized as a hierarchy in the Configuration Service (for
example, `student` is a child of `people`, which is a top-level domain claim).
When authorization is evaluated for a specific resource, the system first checks
for a directly configured authorization strategy. If none is found, it walks up
the parent chain until it finds a configured strategy. This means a new
extension resource can inherit appropriate authorization behavior simply by
being placed under the correct parent claim in the taxonomy, without requiring
explicit per-resource configuration.

### Claim Set Authorization Strategy Overrides

While the claims taxonomy defines default authorization strategies for each
resource-action combination, these defaults can be overridden at the claim set
level. For example, a specialized claim set could override the default
`RelationshipsWithEdOrgsAndPeople` strategy on `students` to use
`NoFurtherAuthorizationRequired` for a trusted administrative tool. These
overrides are stored in the Configuration Service database and take precedence
over both the resource-level defaults and any parent-inherited strategies.

### Managing a Claim Set's Resource Claims

Besides importing or replacing a whole claim set, you can change one resource
claim at a time with these Configuration Service endpoints:

| Endpoint | Purpose |
| --- | --- |
| `POST /v3/claimSets/{claimSetId}/resourceClaimActions` | Grant actions on a resource claim (`201`) |
| `PUT /v3/claimSets/{claimSetId}/resourceClaimActions/{resourceClaimId}` | Replace the granted actions (`204`) |
| `DELETE /v3/claimSets/{claimSetId}/resourceClaimActions/{resourceClaimId}` | Remove the resource claim from the claim set (`204`) |
| `POST /v3/claimSets/{claimSetId}/resourceClaimActions/{resourceClaimId}/overrideAuthorizationStrategy` | Override the strategies for one action (`200`) |
| `POST /v3/claimSets/{claimSetId}/resourceClaimActions/{resourceClaimId}/resetAuthorizationStrategies` | Remove the overrides and return to the defaults (`200`) |

The `DELETE` and `resetAuthorizationStrategies` requests take no body. The
other requests take a body that must include `claimSetId` and
`resourceClaimId`; where they also appear in the route, they must match (a
mismatch returns `400`). The grant and replace requests also take a
`resourceClaimActions` list of `{ "name": "Read", "enabled": true }` entries,
with at least one action enabled. For example, to grant read access on resource
claim `17` in claim set `5`:

```http
POST http://localhost:8081/config/v3/claimSets/5/resourceClaimActions
Content-Type: application/json
Authorization: Bearer <token>

{
  "claimSetId": 5,
  "resourceClaimId": 17,
  "resourceClaimActions": [{ "name": "Read", "enabled": true }]
}
```

The override request takes an `actionName` and an `authorizationStrategies`
list of strategy names. Look up IDs and names with `GET /v3/resourceClaims`,
`GET /v3/actions`, and `GET /v3/authorizationStrategies`.

System-reserved claim sets can't be changed through these endpoints (`400`).
These include the built-in claim sets and any claim set loaded from a claims
file when the Configuration Service starts. An unknown action or strategy name
also returns `400`.

## Authorization Strategies

The implementation of the Ed-Fi API includes several authorization strategies,
applied to the claims taxonomy shown in the figure above.

- **NoFurtherAuthorizationRequired.** Explicitly performs no additional
  authorization beyond resource/action verification. Used for actions where no
  relationship check is possible or necessary (such as creating a record for the
  first time).
- **NamespaceBased.** Allows access to items based on the caller's
  NamespacePrefix claim. A resource's namespace value must start with at least
  one of the caller's assigned namespace prefixes. NamespacePrefix values are
  assigned on the vendor's record. A caller with no
  namespace prefixes receives `403` on any request this strategy applies to.
- **OwnershipBased.** Allows access to items based on ownership tokens
  associated with the caller. The caller is granted access to an item when the
  ownership token stamped on it when it was created matches one of the caller's
  ownership tokens. See [Ownership-Based
  Authorization](#ownership-based-authorization) for more details.
- **Relationship-based strategies.** A family of strategies that authorize
  access to student and education organization-related data through relationships
  in the database, from the perspective of the education organization(s)
  contained in the caller's claims. See [Relationship-Based
  Authorization](#relationship-based-authorization) for more details.
- **Custom View-Based Authorization.** Provides a flexible mechanism for
  defining custom authorization strategies. Platform hosts can create database
  views tailored to specific authorization needs, such as restricting access by
  student program enrollment or grade level, and name them as authorization
  strategies in the security metadata, without recompiling or restarting the
  Ed-Fi API. Custom view-based strategies are combined with the other strategies
  using AND semantics, so they further restrict access. See [Authorizing
  Requests Using Custom Database
  Views](../../technical-articles/authorizing-requests-using-custom-database-views.md)
  and [How To: Use Custom View-Based
  Authorization](../../how-to-guides/how-to-use-custom-view-based-authorization.mdx)
  for details.

## How Authorization Is Enforced

With the concepts of resource claims, actions, the claims taxonomy and
authorization strategies in place, authorization for every API request is
enforced in two sequential phases:

1. **Resource claim and action check.** Does the caller's assigned claim set
   include the requested resource and the action being performed (Create, Read,
   Update, Delete, or ReadChanges)?
2. **Authorization strategy check.** Given that the claim exists, does the
   associated authorization strategy validate the specific data being accessed?
   For example, does the caller have an established relationship in the database
   to the education organization or person referenced in the resource?

Both phases must pass for the request to be allowed. The authorization strategy
applied in phase 2 varies by resource and action. Claim set level overrides can
also be configured.

## Relationship-Based Authorization

Many of the Ed-Fi API resources contain sensitive data subject to FERPA
regulations. Access to this data is authorized based on the caller's
relationship to the specifically requested resource.

### Education Organization Hierarchy

When an API client is associated with an education organization (such as a
district), that association is automatically extended to all subordinate
education organizations in the hierarchy (such as schools within that district).
The database maintains a transitive closure of the education organization
hierarchy, so a caller with access to a parent education organization implicitly
has access to all of its descendants. This means a SIS vendor associated with a
district does not need separate configuration for each individual school within
that district.

### Primary Relationship Tables

In the Ed-Fi data model, the following tables have been identified as the
"primary" relationship tables that define the relationships between people and
organizations for authorization purposes:

- **StudentSchoolAssociation.** Represents a student's enrollment at a
  particular school. This is the most common path for establishing an API
  caller's relationship to student data.
- **StudentEducationOrganizationResponsibilityAssociation.** Used to identify an
  education organization that is responsible for the student, providing an
  alternative authorization path to `StudentSchoolAssociation`.
- **StudentContactAssociation.** Associates a parent/guardian with their
  student(s), enabling authorization of contact-related resources.
- **StaffEducationOrganizationAssignmentAssociation.** Captures a staff member's
  assignment to an education organization (typically a school or local education
  agency).
- **StaffEducationOrganizationEmploymentAssociation.** Captures a staff member's
  employment by an education organization (typically a school or local education
  agency).

### How Relationship Paths Are Evaluated

The essence of all relationship-based authorization strategies is to determine
whether a path can be established through the primary relationship tables in the
database between the education organization(s) associated with the API caller
and the education organization and/or person associated with the targeted
resource.

For GET (list) requests, this check is performed as a JOIN against the
relationship tables, filtering results to only those records reachable through
the caller's education organization associations. For GET-by-id, PUT, and DELETE
requests, it is performed as an existence check before the operation proceeds.

An update (a PUT, or a POST that matches an existing record) is checked against
both the stored record and the proposed new values. The caller must be
authorized for the record as it is now and as it will be after the change, so
a client can't move a record out of its own scope or into another
organization's.

### Relationship-Based Strategy Variants

**Standard variants** (parent education organization access grants access to
child education organizations):

- **RelationshipsWithEdOrgsAndPeople.** The general-purpose strategy for
  FERPA-sensitive resources. Both education organization and person identifiers
  on the targeted resource must be reachable through the caller's education
  organization associations and the primary relationship tables. For example,
  authorizing a `CourseTranscript` checks both the `EducationOrganizationId` and
  the student identifier fields.
- **RelationshipsWithEdOrgsOnly.** Authorizes based solely on education
  organization identifiers. Person identifiers (student, staff, contact) on the
  resource are ignored. This is also the strategy used to authorize creation of
  the primary relationship records themselves (such as
  `StudentSchoolAssociation` and
  `StaffEducationOrganizationAssignmentAssociation`). Because these records are
  what establish a person-to-education organization relationship, requiring a
  person-level check before they can be written would create a circular
  dependency — the record needed to authorize the write is the same record being
  written.
- **RelationshipsWithPeopleOnly.** The inverse: authorizes based solely on
  person identifiers and ignores education organization fields on the resource.
- **RelationshipsWithStudentsOnly.** A narrower variant that considers only
  student-specific relationship paths, disregarding contact, staff, and
  education organization fields.
- **RelationshipsWithStudentsOnlyThroughResponsibility.** Same as
  `RelationshipsWithStudentsOnly` but establishes the student relationship via
  `StudentEducationOrganizationResponsibilityAssociation` rather than the
  standard `StudentSchoolAssociation`.

**Inverted variants** (child education organization access grants access to
parent education organizations):

The standard relationship-based strategies work down the education organization
hierarchy: a caller associated with a parent education organization (such as a
state education agency) gains access to resources owned by its children
(districts, schools). The inverted variants reverse this direction, allowing a
caller associated with a child education organization to read resources owned by
a parent education organization.

The motivating use case is state-level reference data such as `Program`. A state
education agency (SEA) may define programs at the state level that districts
need to reference when enrolling students. With standard authorization, a
district-level API caller cannot read SEA-owned programs because the SEA is a
parent, not a child, of the district. The inverted strategy solves this by
granting district callers read access to programs owned by their parent SEA —
while still preventing a district from reading programs owned by a sibling
district, since only the direct parent-child relationship is traversed.

A typical configuration pairs the standard strategy (for read/write at the local
level) with an inverted strategy (for read-only access to state-level data)
using OR logic, so that a district caller can both manage its own programs and
read programs defined by the SEA.

- **RelationshipsWithEdOrgsAndPeopleInverted.** Reverses the hierarchy direction
  of `RelationshipsWithEdOrgsAndPeople`: a caller associated with a child
  education organization is granted access to resources belonging to its parent
  education organizations, considering both education organization and person
  identifiers. This is the strategy used in practice for education
  organization-scoped reference data such as `Program` and `Course`, allowing
  district-level callers to read records defined at the state level.
- **RelationshipsWithEdOrgsOnlyInverted.** Same inverted hierarchy check but
  ignores person identifiers entirely.

The inverted strategies are used in the Data Standard 6.1 default claims for
`Course`, `Program`, and `ChartOfAccount` reads.

**Including-deletes variants** (for change queries):

The [changed record query](../features/changed-record-queries.md) endpoints
(`/deletes` and `/keyChanges`) return records that may no longer exist, and
the relationship that authorized a record may itself have been deleted. These
variants also consider relationships that have since been deleted, so a
caller can still see deletes and key changes for students, staff, and contacts
it was related to. In the default claims, these are the `ReadChanges`
strategies for relationship-based resources.

- **RelationshipsWithEdOrgsAndPeopleIncludingDeletes.** The `ReadChanges`
  counterpart of `RelationshipsWithEdOrgsAndPeople`.
- **RelationshipsWithStudentsOnlyIncludingDeletes.** The `ReadChanges`
  counterpart of `RelationshipsWithStudentsOnly`.
- **RelationshipsWithStudentsOnlyThroughResponsibilityIncludingDeletes.** The
  `ReadChanges` counterpart of
  `RelationshipsWithStudentsOnlyThroughResponsibility`.

Custom view-based strategies can also be applied to the `ReadChanges` action.
See [Authorizing Requests Using Custom Database
Views](../../technical-articles/authorizing-requests-using-custom-database-views.md#change-queries).

When multiple relationship-based strategies are configured for a resource, they
are combined with OR logic — authorization succeeds if any single variant
establishes a valid path. Non-relationship strategies (such as namespace-based
authorization) are combined with AND logic and are evaluated first.

### Example

When a SIS vendor sends a request to create a restraint event (see the figure
above in the [API Resources](#api-resources) section), the resource to be
written will be associated with a particular school and student. The
"RelationshipsWithEdOrgsAndPeople" authorization strategy will evaluate whether
the SIS vendor's education organization(s) have an established path to that
school (via the education organization hierarchy) and to that student (via
`StudentSchoolAssociation` or another primary relationship table). If such a
path exists, authorization is granted. If not, the request is rejected with an
HTTP 403 response. The `errors` list names the caller's education organization
IDs and the properties of the resource that couldn't be authorized, and the
`detail` may include a hint. For example, reading a student who has no
`StudentSchoolAssociation` with the caller's school returns:

```json
{
  "detail": "Access to the requested data could not be authorized. Hint: You may need to create a corresponding 'StudentSchoolAssociation' item.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "correlationId": "...",
  "validationErrors": {},
  "errors": [
    "No relationships have been established between the caller's education organization id claim ('255901') and the resource item's 'StudentUniqueId' value."
  ]
}
```

## Ownership-Based Authorization

Though the relationship-based authorization strategy is sufficient for most
implementations, there are use cases with overlapping local contexts where
education-organization-based authorization lacks the granularity necessary for
controlling data access — for example, private schools that students from
multiple LEAs attend for special education needs. In such cases, the
ownership-based authorization strategy is typically applied _in conjunction
with_ the relationship-based authorization strategy.

This strategy authorizes access to individual resources based on the concept of
"ownership". An API client can have a creator ownership token, which is stamped
on each resource the client creates, and a list of ownership tokens that
identifies which resources it currently "owns". Resources created by a client
without a creator token have no owner. The authorization process filters results
to the resources whose stamped token is in that list. Platform hosts manage
ownership tokens through the Configuration Service; unlike the Ed-Fi ODS/API,
there's no feature flag to turn on. See [Ownership-Based
Authorization](./ownership-based-authorization.md) for setup details.
