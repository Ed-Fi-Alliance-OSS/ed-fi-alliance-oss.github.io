---
sidebar_position: 0
---

# Tutorial: Interacting with an Ed-Fi API

Audience: Developers who wish to learn how to use an Ed-Fi API.

Background assumptions: Basic knowledge of REST API semantics and basic
familiarity with [data exchange standards](../data-exchange/).

This tutorial will walk the audience through some basic interactions with an
Ed-Fi API. It uses a live application running the Ed-Fi Resources API version
5.0 and Descriptors API version 5.0 (hosted via the Ed-Fi ODS/API version 7.1).
The concepts are the same in all versions, though some detail of the data models
may differ.

:::note

The data returned by this API may look _realistic_, but they are entirely _made
up_ for demonstration purposes. The Ed-Fi Alliance does not store, transmit, or
have access to student data - we provide software to our community members, who
run it for themselves or engage with a partner to do so on their behalf. The
live application used by this tutorial is a demonstration site containing
synthetic data.

:::

## Discovery

Before interacting with an Ed-Fi API, we need to know a few details. First, we
need to know the base URL for the running installation. Issuing a `GET` request
to that URL, we receive a document that describes the application with which you
are interacting. This endpoint is called the Discovery API.

```fetch
GET https://api.ed-fi.org/v7.1/api/
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

In particular, note the following:

* This application support the Ed-Fi Data Standard 5.0 with Teacher Preparation
  Data Model (TPDM) extension 1.1.
* Authentication requests (described in the next section) need to use the URL
  specified in the `$.urls.oauth` property.

  :::info

  `$.urls.oauth` is a [JSONPath](https://en.wikipedia.org/wiki/JSONPath)
  expression; it tells you to start at the top (`$`) of the document, look for the
  `urls` element, then inside of it, look for the value on the `oauth` element.

  Arrays are described in JSONPath using index notation. For example, the TPDM
  version number is at path `$.dataModels[1].version`.

  :::

* The `$.urls.dataManagementApi` provides the base path for access to Ed-Fi
  Resources and Ed-Fi Descriptors &mdash; the entities you are managing via an
  Ed-Fi API application. The Ed-Fi API Standard defines the complete URL for
  accessing a resource as the combination of this base URL, a namespace
  representing the core Ed-Fi UDM ("ed-fi") or an extension (e.g. "tpdm"), and
  the name of the resource to access. In template form:
  `{$.urls.dataManagementApi}/{extension}/{resource}`. If the
  `dataManagementApi` value is `https://example.com`, then the actual URL for
  accessing Students in the core UDM will be
  `https://example.com/ed-fi/students`.

:::info

Is it a Standard or a Model? And is it the "Data Standard" or the "API
Standard"? It is a little confusing.

The "things" (_entities_) we are
describing &mdash; such as students, schools, etc. &mdash; are defined by the
Ed-Fi Data Standard. It enumerates the properties that describe each of those
entities. The Data Standard is an abstract concept. We transcribe it into a data
model &mdash; the Ed-Fi Unifying Data Model (UDM) &mdash; that can be used by
machines. In the context of a REST API, the UDM becomes a schema prescribing how
to encode information about a _particular_ entity. In most scenarios this
encoding is in the form of JavaScript Object Notation (JSON).

Back to the questions: from an application code perspective we are now dealing
with a standardized API data model. And we have standards around how to employ
that data model. Hence, "API Standard". But, since it all flows back to the
Ed-Fi Data Standard, it is broadly acceptable to simply refer to the Data
Standard.

:::

## Authentication

All interactions with an Ed-Fi API must be authenticated, generally using the
OAuth client credentials flow.

The following example submits a pairing of `client_id` and `client_secret`, and
the response will contain an `access_token` value. That token value is a
temporary key for unlocking access to the Ed-Fi API. What do we mean by
"temporary"? Note the `expires_in` value, which is in milliseconds - the token
will expire after this time. If you are not finished with your interactions with
the API, then you will need to re-issue the command below to acquire a new
token.

```fetch
POST https://api.ed-fi.org/v7.1/api/oauth/token
Content-Type: application/json

{
    "grant_type": "client_credentials",
    "client_id": "RvcohKz9zHI4",
    "client_secret": "E1iEFusaNf81xzCxwHfbolkC"
}
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

:::info

Every API client application will have its own `client_id` and `client_secret`.
These are alternately called the "key / secret" pair. The application hosting
organization provides the key and secret, unique to their installation.

:::

## Managing Student Records

Before creating a student, let's retrieve the first student available, for
practice. (Why the _first_? Because otherwise the following request will return
25 results, which would be rather cumbersome in this tutorial!).

We do this with a `GET` request to the `/ed-fi/students` endpoint, appending the
query string parameters `limit=1`.

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students?limit=1
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

### Access Token Authorization

Look carefully at the response to the `GET` request above; the first line
shows HTTP Status Code 401, Unauthorized. It is because we "forgot" to include
the `access_token` from the authentication request! The server does not
recognize the client applications and denies it access to this resource.

In the following example, copy the `access_token` from the response in the
**Authentication** section above into the box below, replacing
"98aa86998da3476c95c296e99e397891" after the word "bearer":

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students?limit=1
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

This time, you should receive status code 200 ("OK") and a response body
containing a single student record.

### Create a New Student

While there are other elements available on the Student data model, at minimum a
Student must have these properties defined: `studentUniqueId`, `birthDate`,
`firstname`, `lastSurname`.

The following request creates a new student. Once again, you will need to copy
and paste your new access token from above. You might also want to replace the
`studentUniqueId` value with something truly unique; otherwise, if someone else
has run this tutorial recently, you will end up _updating_ an existing record
instead of _creating_ a new one.

```fetch
POST https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students
Authorization: bearer 98aa86998da3476c95c296e99e397891
Content-Type: application/json

{
  "studentUniqueId": "unique",
  "firstName": "Bugs",
  "lastSurname": "Bunny",
  "birthDate": "1940-07-27"
}
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

If you have created a new record, then the first line in the response above will
have status code 201 ("Created"). If you have updated an existing record, it
will be status code 200 ("OK"). Look for the `location` value in the list of
_response headers_ &mdash; the key-value pairs below the status code. That
`location` value is the unique URL for the just-created Student. Copy and paste
that value into the next request.

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students/692ea2ceebd142bfa7a5ace10c3f11e7
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

Read that response carefully: you should have received status code 403
("Forbidden") with a message telling you that authorization was denied!.

### Education Organization Authorization

Having an access token is the _first_ step to being authorized to perform an
action. The access token provides certain basic permissions, but not blanket
permissions. This error tells us that the `client_id`'s permissions do not
extend to being able to read this Student. That may sound rather odd, given that
we just created the Student in the first place.

:::info

There are several additional ways of securing student data in the Ed-Fi ODS/API.
Most Ed-Fi API applications will have similar rules, but this section is
currently specific to the Ed-Fi ODS/API application.

:::

In this case, we are looking at education organization security. Each
`client_id` is assigned to one or more education organizations, most likely a
Local Education Agency (LEA) or a specific School. The client application is
allowed to allowed to read (or update, or delete) only those Students that are
associated with that LEA or individual school. We need to create a
`studentSchoolAssociation` record tying this specific Student to an allowed
School. The error message above tells us what `educationOrganizationId` values
we are allowed to use: 255901 or 19255901. But neither of these is a school, as
it turns out. We will need a `schoolId`. The following request looks up the
first School associated with LEA 255901.

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/schools?localEducationAgencyId=255901&limit=1
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

We'll use the `schoolId` value in the next section.

### Creating a Student School Association

The data model for `studentSchoolAssociation` has only four
required properties:

* `schoolReference`
* `studentReference`
* `entryDate`
* `entryGradeLevelDescriptor`

These "references" describe other resources that must already exist in the API
application. In this case, the reference values are rather simple, both
containing only a single property. But, most situations are more complex, due to
the multi-part _natural keys_ employed by the Ed-Fi Data Standard. For example,
a `Section` has a five-part natural key; therefore a `sectionReference` would
have five properties in it.

Descriptors are sets of available code values for a given concept. The
descriptor value representation in an HTTP request is in the form of a URI with
the template `{BASE_URI}#{CodeValue}`. Entry Grade Level refers to the Grade
Level Descriptors. The following example looks up the first two available
`gradeLevelDescriptor` resources held by the API.

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/gradeLevelDescriptors?limit=2
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

If you update the following request to have a valid bearer token, and the
`studentUniqueId` that you used above, then you should be able to create the
association. If the response comes back with status code 201, as expected, then
you can try the `GET` request for the Student again (above). This time, it should be successful.

```fetch
POST https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/studentSchoolAssociations
Authorization: bearer 000b2ebdc059479d93f75f4f64934dd3
Content-Type: application/json

{
  "schoolReference": {
    "schoolId": 255901001
  },
  "studentReference": {
    "studentUniqueId": "unique"
  },
  "entryDate": "2024-06-02",
  "entryGradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Ninth grade",
}
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

### Updating the Student

There are two ways to update the `student` record: with a `POST` request that contains the natural key (in this case, `studentUniqueId`), or a `PUT` request to the specific resource's URL. They are mutually acceptable approaches, and both are shown below. For the `PUT` request to work, please note that you will need to paste the unique record identifier into the `id` property, in addition to it being at the end of the URL. But, don't try this on the `POST` request, because `id` is not allowed in `POST` requests.

```fetch
POST https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students
Authorization: bearer 98aa86998da3476c95c296e99e397891
Content-Type: application/json

{
  "studentUniqueId": "unique",
  "firstName": "George",
  "middleName": "Washington",
  "lastSurname": "Bunny",
  "birthDate": "1940-07-27"
}
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

```fetch
PUT https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students/a597ca255e8e4155b54c389a7b13931c
Authorization: bearer 98aa86998da3476c95c296e99e397891
Content-Type: application/json

{
  "id": "a597ca255e8e4155b54c389a7b13931c",
  "studentUniqueId": "unique",
  "firstName": "George",
  "middleName": "Washington",
  "lastSurname": "Bunny",
  "birthDate": "1940-07-27"
}
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

### Deleting a Resource and Dependency Ordering

To delete the Student, use the same URL as in the `PUT` request:

```fetch
DELETE https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/students/a597ca255e8e4155b54c389a7b13931c
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

Look carefully: the request should have failed with status code 409
("Conflict"). The detail error message tells you that there is a Student School
Association connected to this Student, and therefore it cannot be deleted. This
is an example of the Ed-Fi API's _referential integrity_ in action. If you were
allowed to delete this Student, then there would be a dangling Student School
Association that points to a student who does not exist!

This is an example of dependency ordering. Look again at the Discovery API
example at the top of this page. The URL specified at path
`$.urls.dependendencies` can be used to help understand dependency order. For
example, `/ed-fi/students` has order 3, and `/ed-fi/studentSchoolAssociations`
has order 13. When _creating_ a resource, the lower number must be created
first. When _deleting_, we must go in reverse: delete the higher number first.

To delete the Student School Association, you will need the `id` value to insert
into the URL. The following `GET` will return the `studentSchoolAssociation`
record, from which the `id` value can be copied and pasted into the `DELETE`
request that follows it.

```fetch
GET https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/studentSchoolAssociations?studentUniqueId=unique&schoolId=255901001
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

```fetch
DELETE https://api.ed-fi.org/v7.1/api/data/v3/ed-fi/studentSchoolAssociations/629d690e8007483ba52780749688f104
Authorization: bearer 98aa86998da3476c95c296e99e397891
```

<codapi-snippet engine="browser" sandbox="fetch" editor="basic" init-delay="500"></codapi-snippet>

Finally, try the the `DELETE /ed-fi/students` request above again. A successful
`DELETE` request will result in a 204 status code ("No Content").

## Exploring the Full Ed-Fi Resources API

In this tutorial, you have learned the basics of how to create, read, update,
and delete ("CRUD") data in an Ed-Fi API, have learned the basics about
authorization, and have seen specific examples relating to Students, Grade Level
Descriptors, and Student School Associations.

As a next step in learning how to interact with an Ed-Fi API, we suggest trying
the [live documentation site for ODS/API
7.1](https://api.ed-fi.org/v7.1/docs/swagger). It uses a tool called Swagger UI
to read the OpenAPI specification file &mdash; provided by the Discovery API, in
`$.urls.openApiMetadata` &mdash; and create a friendly user interface for
exploring the full scope of the Resources API.

A few tips to help you navigate and use the tool:

1. The "Authorize" button at the top, or the small lock icons on each request,
   facilitates client authentication for acquiring an access token. The tool
   will automatically apply that access token for you, so that you don't need to
   copy and paste it as you did in this tutorial.
2. Click the down arrow `⋎` on the right side of the page to expand a section.
3. Each resource type (e.g. `academicWeeks`, `accountabilityRatings`, etc.) has
   expandable content for `GET`, `POST`, `GET` by ID, `PUT`, and `DELETE`
   requests &mdash; plus two more `GET` requests that relate to the [Change
   Queries](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18811902/Using+the+Changed+Record+Queries)
   feature.
4. The `GET` request shows all of the available _query string parameters_ for
   filtering query results.
5. The `POST` request shows an example value by default. Click on the word
   `Schema` above the example value to learn more about the data model for that
   resource type. This data model shows you all of the properties available for
   that resource, and it places a red asterisk next to all of the required
   properties.
6. At the top of the page there is a dropdown menu that will allow you to
   explore Ed-Fi API definitions other than the Resource API. For example, you
   can explore the Descriptors API.

## Further Reading

The following resources will help you learn more about working with an Ed-Fi API
application:

* [Ed-Fi API
  Guidelines](https://edfi.atlassian.net/wiki/spaces/EFAPIGUIDE/overview): this
  space contains guidance on how to build a compliant Ed-Fi API application.
  Those who are writing client applications that interact with a compatible
  Ed-Fi API application can also benefit by learning more about what to expect
  from the system.
* [API Client Developers'
  Guide](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493693/API+Client+Developers+Guide):
  provides more detail on many of the topics explored in this tutorial, and
  covers additional details not reviewed here. This link is to the Ed-fFi
  ODS/API version 7.1 documentation. Most if not all content there applies
  equally to other versions of the Ed-Fi ODS/API and to other Ed-Fi API
  applications more generally.
