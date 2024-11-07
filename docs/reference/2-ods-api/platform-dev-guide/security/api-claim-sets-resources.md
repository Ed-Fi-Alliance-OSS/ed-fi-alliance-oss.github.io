# API Claim Sets & Resources

The Ed-Fi ODS / API provides access to the data stored in an underlying Ed-Fi
ODS database only to authorized users and applications. The API is capable of
authorizing requests to a granularity of individual API resources while also
taking into consideration the caller’s relationship to or ownership of the data
in question.

The authorization strategy employs a two-pronged authorization approach. The
first component of this approach is relationship-based, whereby vendors are
associated with one or more local education agencies for which they can submit
and access education data. The second component is resource-based. Using this
approach, vendors are given the right to access or perform operations against
specific resources. For example, a student information system application can be
authorized to access or perform operations against students and staff that are
associated with the local education agencies that they serve, while an
assessment application can be authorized to view and modify assessment metadata
and data that is specifically related to its own assessments.

The key concepts and implementation information follow.

## API Resources

The database tables of the Ed-Fi ODS are organized into mutually exclusive
groups based on the Domain Driven Design principles for defining aggregates.
Each table in the database belongs to a single aggregate, but an aggregate can
contain many tables. Each aggregate has an aggregate root*,* which is the table
that represents the top-level element of the exposed object graph. In the Ed-Fi
ODS / API, aggregates are exposed as resources*.*

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

The outbound `href` attribute must directly reference a resource available on
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
the server will add a collection of resource claims to the request’s context
based on the associated claim set, and the security infrastructure will
subsequently use those claims to make authorization decisions.

For example, a Student Information System (SIS) vendor’s token might be given a
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
.NET `Claim`  objects and adds them to the current principal. Service claims are
still added to the principal, however, to leverage built-in ASP.NET
authorization capabilities for custom developed controllers.

:::

### Identity Claims

Identity claims will be issued to enable the authorization layer to access
specific attributes about the caller when making authorization decisions. The
following identity claims are currently represented by in-memory purpose-built
objects available in the current request context (and not created and accessed
as `Claim`  objects):

* Namespace Prefix (`<http://ed-fi.org/claims/namespacePrefix>`) - used to
  authorize access to resource items where callers need to manage their own
  data in the Ed-Fi ODS that is not associated with any specific education
  organizations, such as custom descriptor values and assessment metadata. A
  consumer could have access to many namespace prefixes, with each namespace
  prefix defined in association with their “Vendor” record in the Ed-Fi ODS /
  API Admin database.
* Profile (`<http://ed-fi.org/claims/profile>`) - used to apply data policies to
  the response data returned to a consumer. A consumer could have many
  assigned profiles, with each profile name defined in association with their
  "Application" record in the Ed-Fi ODS / API Admin database.
* Claim Set Name (`<http://ed-fi.org/claims/claimSetName>`) - used to apply a
    predefined set of claims to the consumer (as defined in the Ed-Fi security
  database). A consumer can only be assigned a single claim set, the name of
  which is defined in their associated "Application" record in the Ed-Fi ODS /
  API Admin database.
* Ownership Token Ids (`<http://ed-fi.org/claims/ownershipTokenId>`) - used to
  perform "Ownership Based" authorization. The consumer has an associated
  "creator" token (assigned through the "ApiClient" record in the Ed-Fi ODS /
  API Admin database), and a set of "data access" tokens (assigned through
  "ApiClientOwnershipTokens" records).
* Education Organization Ids - used to identify the education organizations
  whose data the consumer can access.  For example, a SIS vendor would have
  permissions to manage student data, but only for students enrolled in
  schools within the local education agencies they serve. The education
  organization ids associated with the consumer are managed in the Ed-Fi ODS /
  API Admin database.

### Service Claims

Service claims are defined in the Ed-Fi ODS / API Security database with a claim
name using a prefix of `<http://ed-fi.org/claims/services/>`. These are the only
type of claims that are actually created as `Claim`  objects and added to the
consumer's authenticated principal. They can be used to perform authorization on
additional services exposed through the API such as the Identity management
services using the built-in ASP.NET architecture (e.g. ASP.NET security
policies). The value of each service claim will contain a comma-separate list of
the associated Action URIs.

### Resource Claims

The claims used for API resource authorization are based directly on the
resources exposed by the API, and as such can be referred to as resource claims.
Due to the large number of resources, however, they have also been organized
into a claims taxonomy. While resource claims can be issued for individual
resources, in most cases they will be issued for a higher level conceptual
grouping. For example, rather than issue resource claims for each individual
type of descriptor, the broader “systemDescriptors” or “managedDescriptors”
resource claims will be issued instead.

![Resource Claims](/img/reference/ods-api/fig2.png)

#### Resource Claim Values

The base security metadata for a claim set's resource claims will also contain
the actions that can be performed on the resource, along with any
action-specific authorization strategy overrides. The API client context will
provide access to the list of education organization identifiers that have been
associated with consumer in the Ed-Fi ODS / API Admin database.

##### Actions

The Ed-Fi ODS / API supports basic CRUD operations. Thus, the primitive actions
that can be added to claims
include **Create**, **Read**, **Update,** and **Delete**. The actions are
expressed as URIs, such as `https://ed-fi.org/ods/actions/create`.

## Claims Taxonomy

As described above, the claims taxonomy organizes the granular resource claims
into higher-level logical groupings. However, the metadata contained in the
taxonomy also identifies authorization strategies for the various claims that
are applied after the basic “action” checks have been performed. The figure
below shows a representative piece of the Ed-Fi ODS / API claims taxonomy.

![Claims Taxonomy](/img/reference/ods-api/fig3_a.png)

![Claims Taxonomy](/img/reference/ods-api/fig3_b-1.png)

The strategy used to authorize a request for an Ed-Fi Type is different from the
one used to authorize a request to modify student-related data. The former is a
straightforward check against the caller’s claims for requested action on the
resource. The latter must also take into account the relationship between the
caller and the student.

The authorization strategy may also differ based on the action in the request,
such as with the case of creating vs. updating a student (see the “people”
resource claim in the figure above). To create a student, a SIS vendor only
needs the “student” (or “people”) resource claim with an associated action of
“Create”. Once the action on the resource has been verified, there is no further
authorization performed. However, to read or update a student, the SIS vendor
must not only have been granted the appropriate action, but must also have an
established relationship with the student (through the StudentSchoolAssociation
resource). As the diagram indicates, this is handled by the “AllRelationships”
strategy described below.

## Authorization Strategies

The implementation of the Ed-Fi ODS / API includes several authorization
strategies, applied to the claims taxonomy shown in the figure above.

* **NoFurtherAuthorizationRequired.** Explicitly performs no additional
    authorization (beyond resource/action verification).
* **NamespaceBased.** Allows access to items based on the
    caller’s NamespacePrefix claim. NamespacePrefix values are assigned when a
    vendor's record is created.
* **OwnershipBased**. Allows access to items based on ownership tokens
    associated with the caller. Somewhat similar to the namespace-based
    strategy, in this case, the caller is granted access to the resource when
    token associated with the resource matches an ownership token associated
    with the caller. This strategy is available when
    “OwnershipBasedAuthorization” feature is turned on by the API hosts, which
    is necessary to capture ownership token at each aggregate root.
* **Relationship-based strategies.** A family of strategies that authorize
    access to student and education organization-related data through ODS
    relationships from the perspective of the education organization(s)
    contained in the caller’s claims. The variations provided out-of-the-box are
    described below.

## Relationship-Based Authorization

Many of the Ed-Fi ODS / API resources contain sensitive data subject to FERPA
regulations. Access to this data is authorized based on the caller’s
relationship to the specifically requested resource. In the Ed-Fi ODS data
model, the following tables have been identified as the “primary” relationship
tables that define the relationships between people and organizations to be used
for authorization purposes:

* **StudentSchoolAssociation.** Represents a student’s enrollment at a
    particular school.
* **StudentEducationOrganizationResponsibilityAssociation.** Used to identify
    an education organization that is responsible for the student.
* **StudentParentAssociation.** Associates a parent/guardian with their
    student(s).
* **StaffEducationOrganizationAssignmentAssociation.** Captures a staff
    member’s assignment to an education organization (typically a school or
    local education agency).
* **StaffEducationOrganizationEmploymentAssociation.** Captures a staff
    member’s employment by an education organization (typically a school or
    local education agency).

Other relationships that have been identified as pertinent, but not primary, to
establishing relationships between people and organizations are:

* **StaffSchoolAssociation.** Captures a relationship with a staff member at
    the school level.
* **StudentCohortAssociation, StaffCohortAssociation.** Captures a
    relationship of a student/staff to an education organization.

:::info

The **StaffSectionAssociation** and **StudentSectionAssociation** tables capture
the classroom level-relationship between staff and students. These are not used
in the two-legged OAuth security scheme supported by the shipped code, but would
be needed by platform hosts choosing to implement three-legged OAuth or other
method for authorizing API requests made on behalf of end-users.

:::

The essence of all relationship-based authorization strategies is to determine
whether a path can be established through the primary relationships in the ODS
between the education organizations or person associated with the API caller and
the education organization and/or person associated with the targeted resource.

The relationship-based strategies available are:

* **PrimaryRelationships.** Performs a relationship-based authorization where
    the person identifier associated with the targeted resource is ignored for
    authorization purposes, and only the education organization identifier is
    considered. This strategy is generally used for authorizing requests
    to create the primary relationships, which are then used as the gateways to
    authorize access to other FERPA-sensitive data.
* **AllRelationships.** Performs a relationship-based authorization where the
    identifiers for both people and education organizations are considered. This
    strategy is the general purpose authorization strategy for establishing
    relationships to FERPA-sensitive resources from the perspective of the
    caller’s education organization.

For example, when a SIS vendor sends a request to the API to create a restraint
event (see figure above), the resource to be written will be associated with a
particular school and student. Since the SIS vendor will have been issued the
necessary resource claim with both “Create” and “Update” actions, the
“AllRelationships” authorization strategy will evaluate the SIS vendor’s
relationship in the ODS to determine if the targeted school is related to the
SIS vendor’s education organization(s). If such a relationship exists, then
authorization will be granted. If not, an exception will be thrown and the
caller will receive a descriptive error message.

## Ownership-Based Authorization

Though relationship-based authorization strategy is sufficient for most of the
implementations, there are uses cases with overlapping local contexts where the
relationship-based authorization strategy based on education organizations,
lacks the granularity necessary for controlling data access e.g. private schools
to which students from multiple LEAs attend for special education needs. In such
cases, ownership based authorization strategy is typically applied in
conjunction with the relationship-based authorization strategy.

This authorization strategy authorizes access to individual resources based on
the concept of “ownership”. API caller has an associated "Ownership Token" that
is captured with each resource the caller creates. The API caller’s claims
information also includes a list of "Ownership Tokens" that can be used to
identify which resource items they currently "own", and the authorization
process will filter results for matching "Ownership Token" value stored with the
resources.
