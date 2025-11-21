# Security Configuration Data Stores

Security settings for the Ed-Fi ODS / API are stored in two separate databases,
`EdFi_Admin` and `EdFi_Security`. Both databases are required. The `EdFi_Admin`
mainly holds data pertaining to Authentication (i.e., Identifying the API
client) while the `EdFi_Security` database mainly holds security metadata
pertaining to Authorization (i.e., Establishing API client's assess rights to
serve the request).

## Ed-Fi Admin Database

The `EdFi_Admin` database stores the following configuration entities:

* **Vendors.** Each education software vendor is represented in the admin
    database and serves as a wrapper for individual users and applications.
* **Vendor Namespace Prefixes:** Vendors are assigned one or more namespace
    prefixes, which take the form of a URI. For resources secured by namespace,
    the client can only perform actions on objects that match the assigned
    namespace prefix.
* **Vendor Users.** Each vendor may have one or more users defined. The
    database includes the full name and e-mail address for each user for
    identification purposes.
* **Vendor Applications.** A list of applications supported by education
    software vendors on behalf of one or more education organizations
    (specifically, an LEA such as a district or a school). A single application
    may be associated with more than one education organization or a separate
    vendor application record can be created for each education organization. In
    addition, each vendor application is assigned a claim set, defined in the
    Ed-Fi Security database, which defines its level of access.
* **API Clients.** Each API client record references a vendor user and
    application. In addition, each API client record may be reused between
    vendor application-LEA combinations, or be uniquely defined for each vendor
    application to education organization association. Finally, each API client
    record includes both a key and a secret, which function as a public and
    private key for the Ed-Fi ODS / API, respectively.
* **ODS Instances.** ODS database connections are configured in the admin
    database and API clients are associated with ODS instances. Some API
    requests are not served by the primary ODS, but by a copy (or "derivative")
    of it. Connections to these derivative ODSs can be configured in the
    OdsInstanceDerivative table. Currently ODS / API supports "ReadReplica" or
    "Snapshot" derivatives.

The following entity relationship diagram (ERD) provides additional data on the
structure of the `EdFi_Admin` database:

![graph](https://edfi.atlassian.net/wiki/download/attachments/25493667/image-2023-7-28_10-28-57.png?version=1&modificationDate=1699456107210&cacheVersion=1&api=v2)

## Ed-Fi Security Database

The `EdFi_Security` database stores information about available resource claims
and their relationship to claim sets, Ed-Fi applications, and authorization
strategies. The following high-level entity descriptions provide additional
context:

* **Ed-Fi Applications.** Distinct Ed-Fi applications that require access to
    resources within an education agency’s Ed-Fi technology implementation.
    Currently, there is only one record in this table, representing the ODS /
    API itself.
* **Resource Claims.** Each resource exposed via the ODS / API interface will
    have a record in the resource claim table. Access to these resources is
    controlled by their inclusion in claim sets and their associated
    authorization strategies. Resource claims are organized as a hierarchy, so
    that a set of related resource claims can be included in a claim set by
    referencing just the parent claim.
* **Resource Claim-Action-Authorization Strategy.** Access to each resource
    claim will be granted through at least one resource claim-authorization
    strategy. A resource claim-authorization strategy combines a resource claim
    with additional logic, an authorization strategy, to validate the claim. For
    example, one available authorization strategy ensures that a vendor has
    access to all related entities before granting access to the requested
    resource while another requires no additional authorization. In addition, a
    resource claim-action-authorization strategy pertains to an available
    action: Create, Read, Update, Delete.
* **Claim Sets.** A claim set is a collection of resource claims for a common
    type of API client, such as that of a SIS vendor. Claim sets are created for
    convenience so that vendor applications do not have to be individually
    associated to resource claims. A resource claim can belong to multiple claim
    sets.
* **Claim Set-Resource Claim-Action-Authorization Strategy Overrides.** Allows
    setting up authorization strategy overrides at claim set level.
* **Actions:** Each action (Create, Read, Update, Delete) is included as a
    record in the action table for reference by resource claim-authorization
    strategies.

The following ERD further outlines the entities and entity relationships in the
`EdFi_Security` database:

![Graph](https://edfi.atlassian.net/wiki/download/attachments/25493667/Security-Config-Figure-02.png?version=1&modificationDate=1699456107237&cacheVersion=1&api=v2)
