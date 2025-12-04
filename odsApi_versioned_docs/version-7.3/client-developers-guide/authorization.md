# Authorization

Authorization takes place after [authentication](./authentication.md) is
established. If you're reading this, you probably already know that the purpose
of authorization is to establish that a particular user has rights to work with
a particular system function or a specific piece of information. This section
describes the fundamentals of authorization in connecting with an Ed-Fi API. The
core concepts to understand are how tokens and profiles are used.

## Tokens & Profiles

With each request made to the API, the token obtained from the authentication
process must be passed in an HTTP header like so:

```text
Authorization: Bearer <token_value>
```

The Ed-Fi API uses this token to identify the caller and determine the
permissions that apply to each of the accessible API resources.

:::info

Throughout this documentation, we generally use "HTTP" to describe specific uses of that
protocol. As noted elsewhere, the traffic between systems containing production
data is always over HTTPS.

:::

## Authorization Details

Additionally, different authorization strategies are used for different API
Resources.

For many resources, a relationship-based strategy will be used. For example, a
SIS vendor will be provided with an API key that is associated with a specific
school or local education agency. When accessing the “students” resource, they
will only be able to read and write data for students that are registered at
their school, or at a school within the associated local education agency.

When implementing an API Client that will be given an API key and secret that
uses the relationship-based authorization strategy, it is imperative for the
developers to understand some of the hierarchical dependencies for creating and
subsequently performing other operations on those resources.

An example scenario is when a SIS system is using an API key and secret
combination that uses the relationship-based authorization strategy, the SIS
system will be able to add a student, however the SIS system will not be able to
perform any other operation on that resource until it is associated with an
education agency that the SIS system API key and secret are associated with.
This association is usually done through an enrollment record which is the
creation of a studentSchoolAssociation record. Once that relationship is
created, then the SIS system will be able to perform other operations on that
student record. The same is applicable to staff and parents.

In lieu of listing every possible resource that could be affected by this, it is
better to determine if there is an education organization reference on the
resource that is created. If there is, this should not be an issue. If no
education organization reference is on the resource created, an association
record would need to be created to perform other operations on the newly created
resource. More information can be found on the [API Claim Sets &
Resources](../platform-dev-guide/security/api-claim-sets-resources.md)
page.

An ownership-based authorization strategy is used for assessment metadata,
enabling multiple callers to create and manage their own metadata.

## API Client Profiles

API Profiles enable an Ed-Fi ODS / API platform host to constrain the data
exposed from specific resources to meet the needs of individual use cases. When
an API client is assigned a profile, API responses for resources covered by the
profile are served on a profile-specific media type. To use a profile, callers
must add media-type information to their requests.

### Profile Media Type Format

Profile media types follow this structure:

```text
application/vnd.{schema}.{resource}.{profile-name}.{readable|writable}+json
```

Where:

- `{schema}` — The schema name for the resource. Use ed-fi for core schema resources, or the appropriate extension schema for extension resources (e.g., `ed-fi` ,`tpdm`)
- `{resource}` — The API resource name (e.g., `student`, `school`)
- `{profile-name}` — The name of the profile as declared in the [profile definition](/reference/ods-api/platform-dev-guide/security/api-profiles/#profile-definition) (e.g., nutrition, assessment)
- `{readable|writable}` — Operation type: `readable` for read operations, `writable` for write operations

### Read Operations

For read operations, use the `Accept` header with `readable+json`:

```text
Accept: application/vnd.ed-fi.student.nutrition.readable+json
```

This indicates to the server that the caller will accept the profile-based version of the resource.

### Write Operations

For write operations, use the `Content-Type` header with `writable+json`:

```text
Content-Type: application/vnd.ed-fi.student.nutrition.writable+json
```

This indicates to the server that the caller expects their update to apply to the constrained surface area of the resource as defined by the profile.

With this explicit communication style, any extra data passed in the message body can (and generally will) be quietly discarded by the server.

:::info

API clients that have been assigned only one profile covering the accessed resource can omit the media-type headers or use standard `application/json`, and the Ed-Fi ODS / API will auto-apply the assigned profile. API clients assigned with more than one profile covering the accessed resource MUST include the media-type headers for one of the applicable profiles. Failing to provide a valid profile header will result in an error response.

:::

## Token Info

The Ed-Fi API provides a way to get information about education organizations,
namespaces, profiles, and accessible resources related to a token.

As previously discussed, the Ed-Fi API uses a token to identify the client and
determine associated permissions. The Ed-Fi API uses a relationship-based
strategy to authorize access to most resources. Relationship-based access is
established by the education organization associated with a given token. You can
use the `/oauth/token_info` endpoint to determine the education organization
associated with and the profiles assigned to a token; it also returns what
resources are accessible and which operations are allowed (Create, Delete, etc.).

:::tip

Combining the `/oauth/token_info` endpoint with the [Dependency Order](./resource-dependency-order.md) endpoint could make integrating with Ed-Fi API easier.

:::

The process is relatively straightforward. POST to the `/oauth/token_info` with
an HTTP Authorization header as "Bearer XYZ" where "XYZ" is the access token.
The same access token must be sent in the request body in the `token` parameter.
Note that you need an active bearer token for this call, which you can obtain
using `/oauth/token` endpoint.
See [Authentication](../client-developers-guide/authentication.md) for a
refresher on how to acquire a token.

The snippet below shows an example POST:

```powershell
$response = Invoke-RestMethod -Method Post -Uri "https://api.ed-fi.org/v7.3/api/oauth/token_info" `
  -Headers @{ "Authorization" = "Bearer 385432d854194fd5bb09fe08092353b5"}
  -Body @{ "token" = "385432d854194fd5bb09fe08092353b5"; }

$response | ConvertTo-Json
```

The snippet below shows a sample response. For a description of each field, refer to the [OpenAPI specification](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Standards/blob/main/api-specifications/oauth-token-introspection/1.0-draft/oauth-token-introspection-api-1.0.yml).

```json
{
    "active": true,
    "client_id": "RvcohKz9zHI4",
    "namespace_prefixes": [
        "uri://ed-fi.org",
        "uri://gbisd.edu",
        "uri://tpdm.ed-fi.org"
    ],
    "education_organizations": [
        {
            "education_organization_id": 255901,
            "name_of_institution": "Grand Bend ISD",
            "type": "edfi.LocalEducationAgency",
            "local_education_agency_id": 255901,
            "education_service_center_id": 255950
        }
    ],
    "assigned_profiles": [
        "Sample-Profile-Resource-IncludeOnly"
    ],
    "claim_set": {
        "name": "Ed-Fi Sandbox"
    },
    "resources": [
        {
            "resource": "/ed-fi/absenceEventCategoryDescriptors",
            "operations": [
                "Create",
                "Read",
                "Update",
                "Delete",
                "ReadChanges"
            ]
        },
        {
            "resource": "/ed-fi/students",
            "operations": [
                "Create",
                "Read",
                "Update",
                "Delete",
                "ReadChanges"
            ]
        }
    ],
    "services": [
        {
            "service": "identity",
            "operations": [
                "Create",
                "Read",
                "Update"
            ]
        }
    ]
}
```

Now that you've seen how to authenticate and authorize a client application,
let's look at how to design an elegant solution by trapping errors and
leveraging best practices learned from hard-won experience. The [Error Handling
&amp; Best Practices](./error-handling-best-practices.md) section walks you through
the details.
