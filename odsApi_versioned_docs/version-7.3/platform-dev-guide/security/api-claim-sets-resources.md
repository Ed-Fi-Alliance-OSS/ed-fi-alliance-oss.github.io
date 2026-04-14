# API Claim Sets & Resources

The Ed-Fi ODS / API provides access to the data stored in an underlying Ed-Fi
ODS database only to authorized users and applications. The API is capable of
authorizing requests to a granularity of individual API resources while also
taking into consideration the caller's relationship to or ownership of the data
in question.

For example, a student information system (SIS) vendor can be authorized to read
and write student and staff data, but only for students and staff associated
with the local education agencies the vendor serves. An assessment application,
on the other hand, can be authorized to manage assessment metadata and results
that are specifically tied to its own assessments. These distinctions are
enforced through a combination of claim sets, resource claims, and authorization
strategies, all of which are described in the sections below.

The key concepts and implementation information follow.

## API Resources

The database tables of the Ed-Fi ODS are organized into mutually exclusive
groups based on the Domain Driven Design principles for defining aggregates.
Each table in the database belongs to a single aggregate, but an aggregate can
contain many tables. Each aggregate has an aggregate root, which is the table
that represents the top-level element of the exposed object graph. In the Ed-Fi
ODS / API, aggregates are exposed as resources.

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
the ODS / API, which by definition would be an aggregate root.

A further implication of this rule for modeling is that the parent object of a
one-to-many relationship must either have its children modeled as a collection
within the same aggregate, or it must be an aggregate root itself (so that the
back-references from the children can be represented as direct URLs).

The figure below shows a sample of resources related to restraint events.

![Resources](/img/reference/ods-api/fig1.png)

## Claims

Authorization decisions for API requests from a consumer application are
claims-based. Each consumer of the API must be issued a key and secret by a
system administrator. The key and secret allow the ODS / API system to issue an
access token at runtime. The access token must be included with all API
requests. Additionally, the consumer application's key will be associated with a
specific claim set (i.e., a role). When the consumer calls the Ed-Fi ODS / API,
the server will add a collection of resource claims to the request's context
based on the associated claim set, and the security infrastructure will
subsequently use those claims to make authorization decisions.

For example, a Student Information System (SIS) vendor's token might be given a
claim to read the Education Organization data, but a token supplied by an
approved System Data Administrator would generally receive claims to read,
write, and delete data.

:::info

In most cases, the API now treats the claims documented in this section as
conceptual. In .NET, claim values are stored as strings. However, since the API
authorization process requires a richer context, the values for the resource
claims were actually previously represented as JSON requiring serialization and
deserialization during a single request. For performance reasons, the
authorization metadata they represent are now only available to the application
code through purpose-built in-memory objects in the current request context.
With the exception of "service" claims, the implementation no longer creates
.NET `Claim` objects and adds them to the current principal. Service claims are
still added to the principal, however, to leverage built-in ASP.NET
authorization capabilities for custom developed controllers.

:::

### Identity Claims

Identity claims will be issued to enable the authorization layer to access
specific attributes about the caller when making authorization decisions. The
following identity claims are currently represented by in-memory purpose-built
objects available in the current request context (and not created and accessed
as `Claim` objects):

- Namespace Prefix (`http://ed-fi.org/claims/namespacePrefix`) - used to
  authorize access to resource items where callers need to manage their own data
  in the Ed-Fi ODS that is not associated with any specific education
  organizations, such as custom descriptor values and assessment metadata. A
  consumer could have access to many namespace prefixes, with each namespace
  prefix defined in association with their "Vendor" record in the Ed-Fi ODS /
  API Admin database.
- Profile (`http://ed-fi.org/claims/profile`) - used to apply data policies to
  the response data returned to a consumer. A consumer could have many assigned
  profiles, with each profile name defined in association with their
  "Application" record in the Ed-Fi ODS / API Admin database.
- Claim Set Name (`http://ed-fi.org/claims/claimSetName`) - used to apply a
  predefined set of claims to the consumer (as defined in the Ed-Fi security
  database). A consumer can only be assigned a single claim set, the name of
  which is defined in their associated "Application" record in the Ed-Fi ODS /
  API Admin database.
- Ownership Token Ids (`http://ed-fi.org/claims/ownershipTokenId`) - used to
  perform "Ownership Based" authorization. The consumer has an associated
  "creator" token (assigned through the "ApiClient" record in the Ed-Fi ODS /
  API Admin database), and a set of "data access" tokens (assigned through
  "ApiClientOwnershipTokens" records).
- Education Organization Ids - used to identify the education organizations
  whose data the consumer can access. For example, a SIS vendor would have
  permissions to manage student data, but only for students enrolled in schools
  within the local education agencies they serve. The education organization ids
  associated with the consumer are managed in the Ed-Fi ODS / API Admin
  database.

### Service Claims

Service claims are defined in the Ed-Fi ODS / API Security database with a claim
name using a prefix of `http://ed-fi.org/claims/services/`. These are the only
type of claims that are actually created as `Claim` objects and added to the
consumer's authenticated principal. They can be used to perform authorization on
additional services exposed through the API such as the Identity management
services using the built-in ASP.NET architecture (e.g. ASP.NET security
policies). The value of each service claim will contain a comma-separated list
of the associated Action URIs.

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
associated with the consumer in the Ed-Fi ODS / API Admin database.

##### Actions

The Ed-Fi ODS / API supports basic CRUD operations. Thus, the primitive actions
that can be added to claims include **Create**, **Read**, **Update**, and
**Delete**. The actions are expressed as URIs, such as
`https://ed-fi.org/ods/actions/create`.

## Claims Taxonomy

As described above, the claims taxonomy organizes the granular resource claims
into higher-level logical groupings. The metadata contained in the taxonomy also
identifies [authorization strategies](#authorization-strategies) for the various
claims that are applied after the basic "action" checks have been performed. The
figure below shows a representative piece of the Ed-Fi ODS / API claims
taxonomy.

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

Resource claims are organized as a hierarchy in the Ed-Fi Security database (for
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
overrides are stored in the
`ClaimSetResourceClaimActionAuthorizationStrategyOverrides` table in the Ed-Fi
Security database and take precedence over both the resource-level defaults and
any parent-inherited strategies.

## Authorization Strategies

The implementation of the Ed-Fi ODS / API includes several authorization
strategies, applied to the claims taxonomy shown in the figure above.

- **NoFurtherAuthorizationRequired.** Explicitly performs no additional
  authorization beyond resource/action verification. Used for actions where no
  relationship check is possible or necessary (such as creating a record for the
  first time).
- **NamespaceBased.** Allows access to items based on the caller's
  NamespacePrefix claim. A resource's namespace value must start with at least
  one of the caller's assigned namespace prefixes. NamespacePrefix values are
  assigned when a vendor's record is created.
- **Relationship-based strategies.** A family of strategies that authorize
  access to student and education organization-related data through ODS
  relationships, from the perspective of the education organization(s) contained
  in the caller's claims. See [Relationship-Based
  Authorization](#relationship-based-authorization) for more details.
- **OwnershipBased.** Allows access to items based on ownership tokens
  associated with the caller. The caller is granted access to a resource when
  the token captured at creation time matches an ownership token in the caller's
  claims. This strategy is available when the "OwnershipBasedAuthorization"
  feature is enabled by the API host, which is required to capture the ownership
  token at each aggregate root at write time. See [Ownership-Based
  Authorization](#ownership-based-authorization) for more details.
- **Custom View-Based Authorization.** Provides a powerful and flexible
  mechanism for defining custom authorization strategies. API Hosts can create
  custom database views tailored to specific authorization needs, such as
  restricting access by student program enrollment or grade level. Granular
  security setup can be achieved simply by creating a custom database view and
  configuring the necessary metadata, without requiring recompilation or an API
  process restart. See [Authorizing Requests Using Custom Database
  Views](../../technical-articles/authorizing-requests-using-custom-database-views)
  and [How To: Use Custom View-Based
  Authorization](../../how-to-guides/how-to-use-custom-view-based-authorization)
  for additional details.

## How Authorization Is Enforced

With the concepts of resource claims, actions, the claims taxonomy and authorization
strategies in place, authorization for every API request is enforced in two
sequential phases:

1. **Resource claim and action check.** Does the caller's assigned claim set
   include the requested resource and the action being performed (Create, Read,
   Update, or Delete)?
2. **Authorization strategy check.** Given that the claim exists, does the
   associated authorization strategy validate the specific data being accessed?
   For example, does the caller have an established relationship in the ODS to
   the education organization or person referenced in the resource?

Both phases must pass for the request to be allowed. The authorization strategy
applied in phase 2 varies by resource and action. Claim set level overrides can
also be configured.

## Relationship-Based Authorization

Many of the Ed-Fi ODS / API resources contain sensitive data subject to FERPA
regulations. Access to this data is authorized based on the caller's
relationship to the specifically requested resource.

### Education Organization Hierarchy

When an API client is associated with an education organization (such as a
district), that association is automatically extended to all subordinate
education organizations in the hierarchy (such as schools within that district).
The ODS maintains a transitive closure of the education organization hierarchy,
so a caller with access to a parent education organization implicitly has access
to all of its descendants. This means a SIS vendor associated with a district
does not need separate configuration for each individual school within that
district.

### Primary Relationship Tables

In the Ed-Fi ODS data model, the following tables have been identified as the
"primary" relationship tables that define the relationships between people and
organizations for authorization purposes:

- **StudentSchoolAssociation.** Represents a student's enrollment at a
  particular school. This is the most common path for establishing an API
  caller's relationship to student data.
- **StudentEducationOrganizationResponsibilityAssociation.** Used to identify an
  education organization that is responsible for the student, providing an
  alternative authorization path to `StudentSchoolAssociation`.
- **StudentParentAssociation/StudentContactAssociation.** Associates a
  parent/guardian with their student(s), enabling authorization of
  parent-related resources.
- **StaffEducationOrganizationAssignmentAssociation.** Captures a staff member's
  assignment to an education organization (typically a school or local education
  agency).
- **StaffEducationOrganizationEmploymentAssociation.** Captures a staff member's
  employment by an education organization (typically a school or local education
  agency).

### How Relationship Paths Are Evaluated

The essence of all relationship-based authorization strategies is to determine
whether a path can be established through the primary relationship tables in the
ODS between the education organization(s) associated with the API caller and the
education organization and/or person associated with the targeted resource.

For GET (list) requests, this check is performed as a JOIN against the
relationship tables, filtering results to only those records reachable through
the caller's education organization associations. For GET-by-id, PUT, and DELETE
requests, it is performed as an existence check before the operation proceeds.

### Relationship-Based Strategy Variants

**Standard variants** (parent education organization access grants access to
child education organizations):

- **RelationshipsWithEdOrgsAndPeople.** The general-purpose strategy for
  FERPA-sensitive resources. Both education organization and person identifiers
  on the targeted resource must be reachable through the caller's education
  organization associations and the primary relationship tables. For example,
  authorizing a `CourseTranscript` checks both the `EducationOrganizationId` and
  the `StudentUSI` fields.
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

When multiple relationship-based strategies are configured for a resource, they
are combined with OR logic — authorization succeeds if any single variant
establishes a valid path. Non-relationship strategies (namespace, ownership) are
combined with AND logic and are evaluated first.

### Example

When a SIS vendor sends a request to create a restraint event (see the figure
above in the [API Resources](#api-resources) section), the resource to be
written will be associated with a particular school and student. The
"RelationshipsWithEdOrgsAndPeople" authorization strategy will evaluate whether
the SIS vendor's education organization(s) have an established path to that
school (via the education organization hierarchy) and to that student (via
`StudentSchoolAssociation` or another primary relationship table). If such a
path exists, authorization is granted. If not, the request is rejected with an
HTTP 403 response and a descriptive error message identifying which relationship
is missing, for example:

> _No relationships have been established between the caller's education
> organization(s) and the resource. Verify that a StudentSchoolAssociation
> exists for the referenced student and school._

## Ownership-Based Authorization

Though the relationship-based authorization strategy is sufficient for most
implementations, there are use cases with overlapping local contexts where
education-organization-based authorization lacks the granularity necessary for
controlling data access — for example, private schools that students from
multiple LEAs attend for special education needs. In such cases, the
ownership-based authorization strategy is typically applied _in conjunction
with_ the relationship-based authorization strategy.

When both strategies are configured for a resource, both must pass: the
relationship-based check confirms the caller's education organization has a path
to the resource, and the ownership-based check then further filters to only
those records that were originally created by a caller with a matching ownership
token. This AND combination ensures that overlapping-context scenarios do not
inadvertently expose one LEA's data to another.

This strategy authorizes access to individual resources based on the concept of
"ownership". Each API caller has an associated "Ownership Token" that is
captured with each resource the caller creates. The API caller's claims
information also includes a list of "Ownership Tokens" that can be used to
identify which resource items they currently "own", and the authorization
process will filter results to matching "Ownership Token" values stored with the
resources.
