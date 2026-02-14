# API Claim Sets & Resources

The Ed-Fi ODS / API provides access to the data stored in an underlying Ed-Fi
ODS database only to authorized users and applications. The API is capable of
authorizing requests to a granularity of individual API resources while also taking
into consideration the caller's relationship to or ownership of the data in
question.

The authorization strategy employs a two-pronged authorization approach. The
first component of this approach is relationship-based, whereby vendors are
associated with one or more local education agencies for which they can submit and
access education data. The second component is resource-based. Using this approach,
vendors are given the right to access or perform operations against specific
resources. For example, a student information system application can be authorized
to access or perform operations against students and staff that are associated
with the local education agencies that they serve, while an assessment
application can be authorized to view and modify assessment metadata and data that is
specifically related to its own assessments.

The key concepts and implementation information follow.

## API Resources

The database tables of the Ed-Fi ODS are organized into mutually exclusive
groups based on the Domain Driven Design principles for defining aggregates. Each
table in the database belongs to a single aggregate, but an aggregate can contain
many tables. Each aggregate has an aggregate root, which is the table that represents the top-level element of the exposed object
graph. In the Ed-Fi ODS / API, aggregates are exposed as resources.

While there is some good material available on how to determine the most
appropriate boundaries for an aggregate in Domain Driven Design, from the perspective
of creating Ed-Fi data model representations, there is one main consideration
when creating new aggregates or extending an existing aggregate. Each aggregate
represents an object graph consisting of a single root object, and may contain
subordinate objects (i.e., objects contained in child collections within the object
graph). In order for a subordinate object to reference an object external to the
graph (generally representing the back-reference of a many-to-one
relationship), the target object must be the root of its own aggregate.

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

The outbound `href` attribute must directly reference a resource available on the ODS / API, which
by definition would be an aggregate root.

A further implication of this rule for modeling is that the parent object of a
one-to-many relationship must either have its children modeled as a collection
within the same aggregate, or it must be an aggregate root itself (so that the
back-references from the children can be represented as direct URLs).

The figure below shows a sample of resources related to restraint events.

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774347/fig1.png?version=1&modificationDate=1641861349217&cacheVersion=1&api=v2)

## Claims

Authorization decisions for API requests from a consumer application are
claims-based. Each consumer of the API must be issued a key and secret by a system
administrator. The key and secret allow the ODS / API system to issue a security
token at runtime. The security token must be included with all API requests.
Additionally, the consumer application's key will be associated with a specific claim
set (i.e., a role). When the consumer calls the Ed-Fi ODS / API, the server will
add a collection of claims to the request's context based on the associated
claim set, and the security infrastructure will subsequently use those claims to
make authorization decisions.

For example, a Student Information System (SIS) vendor's token might be given a
claim to read the Education Organization data, but a token supplied by an
approved System Data Administrator would generally receive claims to read, write, and
delete data.

### Identity Claims

Identity claims will be issued to enable the authorization layer to identify the
caller. For the currently supported scenarios of application-level integration
(e.g., for SIS or assessment vendors), an identity claim named "NamespacePrefix"
will be issued. This claim is currently used to perform authorization where
callers need to manage their own data in the Ed-Fi ODS that is not associated with
any specific education organizations, such as custom descriptor values and
assessment metadata. The value for this claim will contain a namespace prefix that
will be assigned to the consumer when their "Vendor" record is created in the
Ed-Fi ODS / API Admin database.

### Resource Claims

The claims used for API resource authorization are based directly on the
resources exposed by the API, and as such can be referred to as resource claims. Due to
the large number of resources, however, they have also been organized into a
claims taxonomy. While resource claims can be issued for individual resources, in
most cases they will be issued for a higher level conceptual grouping. For
example, rather than issue resource claims for each individual type of descriptor,
the broader "systemDescriptors" or "managedDescriptors" resource claims will be
issued instead.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774347/fig2.png?version=1&modificationDate=1641861349210&cacheVersion=1&api=v2&width=1251&height=336)

#### Resource Claim Values

In .NET, claim values are stored as strings. However, since the API
authorization process requires a richer context, the values for the resource claims are
actually objects represented as JSON. The claim value will contain the actions that
can be performed on the resource, an optional claim set-specific authorization
strategy override and some domain-specific context (such as a list of education
organization identifiers).

##### **Actions**

The Ed-Fi ODS / API supports basic CRUD operations. Thus, the primitive actions
that can be added to claims include Create, Read, Update, and Delete. The actions are expressed as URIs, such as `https://ed-fi.org/ods/actions/create`.

##### **Domain-Specific Context**

Another facet of performing some authorization decisions relates to identifying
the education organizations that are in context for the claim. For example, a
SIS vendor would have permissions to manage student data, but only for students
enrolled in schools within the local education agencies they serve. As of this
writing, underlying support for any type of education organization is in place,
however explicit work has only been undertaken to specifically support local
education agencies and schools.

### Claims Taxonomy

As described above, the claims taxonomy organizes the granular resource claims
into higher-level logical groupings. However, the metadata contained in the
taxonomy also identifies authorization strategies for the various claims that are
applied after the basic "action" checks have been performed. The figure below shows
a representative piece of the Ed-Fi ODS / API claims taxonomy.

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774347/fig3_a.png?version=1&modificationDate=1641861349197&cacheVersion=1&api=v2)

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774347/fig3_b-1.PNG?version=1&modificationDate=1641861349183&cacheVersion=1&api=v2)

The strategy used to authorize a request for an Ed-Fi Type is different from the
one used to authorize a request to modify student-related data. The former is a
straightforward check against the caller's claims for requested action on the
resource. The latter must also take into account the relationship between the
caller and the student.

The authorization strategy may also differ based on the action in the request,
such as with the case of creating vs. updating a student (see the "people"
resource claim in the figure above). To create a student, a SIS vendor only needs the
"student" (or "people") resource claim with an associated action of "Create".
Once the action on the resource has been verified, there is no further
authorization performed. However, to read or update a student, the SIS vendor must not only
have been granted the appropriate action, but must also have an established
relationship with the student (through the StudentSchoolAssociation resource). As
the diagram indicates, this is handled by the "AllRelationships" strategy
described below).

### Authorization Strategies

The implementation of the Ed-Fi ODS / API includes several authorization
strategies, applied to the claims taxonomy shown in the figure above.

* **NoFurtherAuthorizationRequired.** Explicitly performs no additional authorization (beyond resource/action
verification).
* **NamespaceBased.** Allows access to items based on the caller's NamespacePrefix claim.
NamespacePrefix values are assigned when a vendor's record is created in the [ODS / API Admin App](https://edfi.atlassian.net/wiki/spaces/ADMIN/overview).
* **Ownership based.** Allows access to items based on ownership tokens associated with the caller.
Somewhat similar to the namespace-based strategy, in this case, the caller is
granted access to the resource when token associated with the resource matches an
ownership token associated with the caller. This strategy is available when
"OwnershipBasedAuthorization" feature is turned on by the API hosts, which is
necessary to capture ownership token at each aggregate root.
* **Relationship-based strategies.** A family of strategies that authorize access to student and education
organization-related data through ODS relationships from the perspective of the education
organization(s) contained in the caller's claims. The variations provided
out-of-the-box are described below.

### Relationship-Based Authorization

Many of the Ed-Fi ODS / API resources contain sensitive data subject to FERPA
regulations. Access to this data is authorized based on the caller's relationship
to the specifically requested resource. In the Ed-Fi ODS data model, the
following tables have been identified as the "primary" relationship tables that define
the relationships between people and organizations to be used for authorization
purposes:

* **StudentSchoolAssociation.** Represents a student's enrollment at a particular school.
* **StudentEducationOrganizationResponsibilityAssociation.** Used to identify an education organization that is responsible for the student.
* **StudentParentAssociation.** Associates a parent/guardian with their student(s).
* **StaffEducationOrganizationAssignmentAssociation.** Captures a staff member's assignment to an education organization (typically a
school or local education agency).
* **StaffEducationOrganizationEmploymentAssociation.** Captures a staff member's employment by an education organization (typically a
school or local education agency).

Other relationships that have been identified as pertinent, but not primary, to
establishing relationships between people and organizations are:

* **StaffSchoolAssociation.** Captures a relationship with a staff member at the school level.
* **StudentCohortAssociation, StaffCohortAssociation.** Captures a relationship of a student/staff to an education organization.

:::info
The StaffSectionAssociation and StudentSectionAssociation tables capture the classroom level-relationship between staff and students. These are
not used in the two-legged OAuth security scheme supported by the shipped code,
but would be needed by platform hosts choosing to implement three-legged OAuth or
other method for authorizing API requests made on behalf of end-users.
:::

The essence of all relationship-based authorization strategies is to determine
whether a path can be established through the primary relationships in the ODS
between the education organizations or person associated with the API caller and
the education organization and/or person associated with the targeted resource.

The relationship-based strategies available are:

* **PrimaryRelationships.** Performs a relationship-based authorization where the person identifier
associated with the targeted resource is ignored for authorization purposes, and only
the education organization identifier is considered. This strategy is generally
used for authorizing requests to create the primary relationships, which are then
used as the gateways to authorize access to other FERPA-sensitive data.
* **AllRelationships.** Performs a relationship-based authorization where the identifiers for both
people and education organizations are considered. This strategy is the general
purpose authorization strategy for establishing relationships to FERPA-sensitive
resources from the perspective of the caller's education organization.

For example, when a SIS vendor sends a request to the API to create a restraint
event (see figure above), the resource to be written will be associated with a
particular school and student. Since the SIS vendor will have been issued the
necessary resource claim with both "Create" and "Update" actions, the
"AllRelationships" authorization strategy will evaluate the SIS vendor's relationship in the
ODS to determine if the targeted school is related to the SIS vendor's education
organization(s). If such a relationship exists, then authorization will be
granted. If not, an exception will be thrown and the caller will receive a
descriptive error message.

### Ownership-Based Authorization

Though relationship-based authorization strategy is sufficient for most of the
implementations, there are uses cases with overlapping local contexts where the
relationship-based authorization strategy based on education organizations, lacks
the granularity necessary for controlling data access e.g. private schools to
which students from multiple LEAs attend for special education needs. In such
cases, ownership based authorization strategy is typically applied in conjunction
with the relationship-based authorization strategy.

This authorization strategy authorizes access to individual resources based on
the concept of "ownership". API caller has an associated "Ownership Token" that
is captured with each resource the caller creates. The API caller's claims
information also includes a list of "Ownership Tokens" that can be used to identify
which resource items they currently "own", and the authorization process will
filter results for matching "Ownership Token" value stored with the resources.
