# Security

 The Ed-Fi ODS / API contains a robust, configurable means of securing
 information. This section covers the essential information and provides links
 to additional detail and how-to information. A few key concepts you'll find
 throughout this section are discussed below.

## Authentication via OAuth2

The ODS / API solution uses OAuth 2.0 Client Credentials Grant Flow for
authentication. In the context of an education enterprise, this means that
authentication is granted to client applications (like student information
systems or gradebook systems) as opposed to assigning permissions for every
end-user. This means that client applications, such as a student information
system at a district, control end-user access to data based on local accounts
and roles, and the ODS / API platform host simply controls what data the student
information system can access and modify.

OAuth 2.0 Client Credentials Grant Flow was selected because it provides greater
control for local system hosts (often school districts or local organizations)
while greatly simplifying the administration of ODS / API accounts and roles in
the system (often state education agencies or regional education service
centers).

## Authorization via Claims and Profiles

The API exposes data as resources. Access to these resources is primarily
controlled by two mechanisms: claims and profiles.

The following diagram shows the interaction of these two concepts. Profiles
define what data elements of a resource are available for reading and/or writing
(e.g., FirstName, LastSurname, SexType) while Claims are used to authorize
access to resources generally. In some cases, as is depicted below for students,
the caller may only be able to access some items in the collection (i.e., only
"Johnny Johns" and "Jane Doe" are available).

![Authorization](/img/reference/ods-api/auth-via-claims-and-profiles.png)

Claims and claim sets provide fine-grained access control over the resources
available in the API. Claims define whether a client has permissions to create,
read, update, or delete information (i.e., perform the basic database CRUD
operations). If desired, resource claims can be set all the way down to the
individual resource level – but for convenience, a claims taxonomy has been
established to allow host administrators to set claims at higher-level
conceptual groupings of resources.

The article [How To: Configure Claim
Sets](../../how-to-guides/how-to-configure-claim-sets.md) describes
specifics about making adjustments to the API claim sets. (Claim sets are
expressed in a database, but the solution doesn't have a UI to manage that data,
so modifying claim sets is a developer task.)

Profiles also define access to resources, but use the concept of a data policy.
Profiles allow platform hosts to limit client access to particular parts of
resources for read and/or write use cases. While it's not a perfect analogy,
profiles have a similar function to database views in this regard. Profiles can
also be used to define and communicate an explicit subset of the API resources
that are relevant to a particular usage scenario.

The [API Profiles](./api-profiles.md) section of
this documentation provides conceptual and practical information about
profiles.

Claims and profiles both control facets of client access to resources, but they
are complementary. Claims are useful when you want incredibly fine-grained
control over access to resources. Claim sets are analogous to "roles" or "group"
permissions in other security schemes. Profiles are useful when you want to
constrain access to data elements based on a type of client. For example, you
may determine that every gradebook client application needs view-only access to
a subset of student information, but full write access to resources related to
grades and gradebook entries. Profiles make this configuration easy to implement
and easy to understand once implemented.

## Vendors and Applications

As noted above, two-legged OAuth2 authentication grants access at the client
application level. Throughout this documentation (and the solution), we use the
term "Vendor" to describe an organization that hosts or owns client systems, and
"Application" to describe an actual client system. Vendors are associated with
one or more applications. Each application is issued an OAuth key and secret.

The technical article [Securing OAuth
Secrets](../../technical-articles/securing-oauth-secrets.md)
provides details about how OAuth secrets are stored, plus guidance on how to
change the hashing method by which OAuth secrets are secured.

## API Security Configuration Using Admin API

Platform host administrators can manage and distribute keys and secrets for
applications using the Admin API (released separately). For more information,
see the [Admin
API](/reference/admin-api) documentation.

## Adaptable Security

Some platform hosts may wish to extend or create their own security model. Since
the ODS / API is open source, the built-in security can be extended in a number
of ways. The [API Claim Sets &
Resources](./api-claim-sets-resources.md) section of
this documentation provides detail on the resources and claims implementation in
the ODS / API solution. Meanwhile, the [Security Configuration Data
Stores](./security-configuration-data-stores.md) section
of this documentation provides details on how information is organized in the
various security and admin databases.

## More Information

Platform host administrators, lead developers, and DevOps personnel will want to
read the material in the [Education Agency Business Process Security
Considerations](../../technical-articles/education-agency-business-process-security-considerations.md)
technical article. This article provides important detail about security
concerns and mitigations.

Additional information regarding Ed-Fi ODS / API security concepts can be found
in the [Ed-Fi ODS/API Security
Concepts](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24806697), which was
presented at the 2021 'In the Weeds' session.
