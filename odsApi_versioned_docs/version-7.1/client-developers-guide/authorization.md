# Authorization

Authorization takes place after authentication is established. The purpose of authorization is to establish that a particular user has rights to work with a particular system function or a specific piece of information. This section describes the fundamentals of authorization in connecting with an Ed-Fi API. The core concepts to understand are how tokens and profiles are used.

## Tokens & Profiles

With each request made to the API, the token obtained from the authentication process must be passed in an HTTP header:

```
Authorization: Bearer <token_value>
```

The Ed-Fi API uses this token to identify the caller and determine the permissions that apply to each of the accessible API resources.

## Authorization Details

Different authorization strategies are used for different API Resources. For many resources, a relationship-based strategy will be used. For example, a SIS vendor will be provided with an API key that is associated with a specific school or local education agency. When accessing the "students" resource, they will only be able to read and write data for students that are registered at their school, or at a school within the associated local education agency.

When implementing an API Client that will be given an API key and secret that uses the relationship-based authorization strategy, it is imperative for developers to understand some of the hierarchical dependencies for creating and subsequently performing other operations on those resources.

For example, a SIS system using an API key and secret combination that uses the relationship-based authorization strategy will be able to add a student, but will not be able to perform any other operation on that resource until it is associated with an education agency that the SIS system API key and secret are associated with. This association is usually done through an enrollment record (studentSchoolAssociation). Once that relationship is created, then the SIS system will be able to perform other operations on that student record. The same is applicable to staff and parents.

If there is an education organization reference on the resource created, this should not be an issue. If no education organization reference is on the resource created, an association record would need to be created to perform other operations on the newly created resource. More information can be found on the [API Claim Sets & Resources](../platform-dev-guide/security/api-claim-sets-resources) page.

An ownership-based authorization strategy is used for assessment metadata, enabling multiple callers to create and manage their own metadata.

## API Client Profiles

API Profiles enable an Ed-Fi ODS / API platform host to constrain the data exposed from specific resources to meet the needs of individual use cases. When an API client is assigned a profile, API responses for resources covered by the profile are served on a profile-specific media-type. To use a profile, callers can add media-type information to their requests.

For read operations, this takes the form of an Accept header:
```
Accept: application/vnd.ed-fi.student.nutrition.readable+json
```
For write operations, the Content-Type header:
```
Content-Type: application/vnd.ed-fi.student.nutrition.writable+json
```
Any extra data passed in the message body can (and generally will) be quietly discarded by the server.

API clients assigned only one profile covering the accessed Resource can omit the media-type headers or use standard 'application/json', and the Ed-Fi ODS /API will auto apply the assigned profile. API clients assigned with more than one profile covering the accessed Resource MUST include the media-type headers for one of the applicable profiles. Failing to provide a valid profile header will result in an error response.

## Token Info

The Ed-Fi API provides a way to get information about education organizations, namespaces, and profiles related to a token.

POST to the `/oauth/token_info` endpoint with an HTTP Authorization header as "Bearer XYZ" where "XYZ" is the access token. The same access token must be sent in the request body in the `token` parameter.

Example PowerShell:
```powershell
$response = Invoke-RestMethod -Method Post -Uri "https://api.ed-fi.org/v7.1/api/oauth/token_info" -Headers @{ "Authorization" = "Bearer 385432d854194fd5bb09fe08092353b5" } -Body @{ "token" = "385432d854194fd5bb09fe08092353b5"; }
$response | ConvertTo-Json
```

Example response:
```json
{
  "active": true,
  "client_id": "RvcohKz9zHI4",
  "namespace_prefixes": ["uri://ed-fi.org", "uri://gbisd.org", "uri://tpdm.ed-fi.org"],
  "education_organizations": [
    {
      "education_organization_id": 255901,
      "name_of_institution": "Grand Bend ISD",
      "type": "edfi.LocalEducationAgency",
      "local_education_agency_id": 255901,
      "education_service_center_id": 255950
    }
  ]
}
```

Now that you've seen how to authenticate and authorize a client application, let's look at how to design an elegant solution by trapping errors and leveraging best practices learned from hard-won experience. The [Error Handling & Best Practices](./error-handling-best-practices.md) section walks you through the details.

Downloads:
* [Ed-Fi API Client Developer Postman Example](https://edfi.atlassian.net/wiki/download/attachments/20480666/Ed-Fi%20API%20Client%20Developer%20Postman%20Example.zip?version=3&modificationDate=1527887971107&api=v2&download=true)
