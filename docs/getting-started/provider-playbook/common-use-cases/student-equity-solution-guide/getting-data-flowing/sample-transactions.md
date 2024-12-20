---
description: A few examples of what real-world transactions look like.
sidebar_position: 7
---

# Sample Transactions

## Example: Creating a Student

Putting the pieces in the above sections together, we can look at the contents
of a sample transaction.

Below is an example of atransaction made by a Student Information System to
create a student.

```none title="Request - Creating a Student"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/students"
accept: application/json
Content-Type: application/json
authorization: Bearer 20ea10c525354cdaa32aacfb71bc2ff8
{
    "studentUniqueId": "6048999",
    "birthDate": "2009-07-22",
    "firstName": "Julie",
    "lastSurname": "Martinez",
    "middleName": "Macon"
}
```

In this example, you can see that this is a POST operation, so is creating a new
Student API resource.  There is an authorization token in the HTTP header
("Bearer 20ea10c525354cdaa32aacfb71bc2ff8"), and then the actual contents of the
new Student record, in JSON format.

:::info

You can paste this JSON into the API Swagger interface for the /student API
resource and run it – see the section [Online API Documentation and Sandbox -
Student Equity-VDG](./online-api-documentation-and-sandbox.md) and follow the
instructions to authorize and try it out.

:::

A response from the API sent back would look like is as follows:

```none title="Response - Creating a Student"
201
access-control-allow-origin: *
access-control-expose-headers: *
connection: keep-alive
content-length: 0
date: Wed07 Apr 2021 17:21:27 GMT
etag: "5249220147305124204"
location: https://api.ed-fi.org:443/data/v3/ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66
```

This is an empty response with only HTTP headers and no body message (a few
headers have been removed to allow us to focus on the ones most important to our
discussion).

* The 201 code indicates that the request was successful and the API resource
    was created.
* The location field returns the resource ID for the new entity – in this case:
    `918bb778138b4ab2a44e599fbcbf7f66`. A GET request to
    `/ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66` would return the entity
    that was just created.
* Other elements –  such as an [ETag](https://en.wikipedia.org/wiki/HTTP_ETag)
    and timestamp – are also provided. Generally these are not needed by most
    applications.

## Example: Creating a Discipline Incident

Adding a disciplineIncident would look as follows. Note the references in this
element to another element: schoolReference. The School element must have been
previously submitted, using the same pattern shown above for Student. If the
School does not exist in the API, the transaction will fail.

```none title="Request - Creating a Discipline Incident"
POST "https://ed-fi.grandbend.edu:443/v5.1.0/api/data/v3/ed-fi/disciplineIncident"
accept: application/json
Content-Type: application/json
authorization: Bearer 20ea10c525354cdaa32aacfb71bc2ff8
{
    "schoolReference": {
      "schoolId": 255901107
    },
    "incidentIdentifier": "155654",
    "incidentDate": "2021-02-09",
    "incidentLocationDescriptor": "uri://ed-fi.org/IncidentLocationDescriptor#Auditorium",
    "incidentTime": "10:30:00",
    "behaviors": [
      {
        "behaviorDescriptor": "uri://ed-fi.org/BehaviorDescriptor#School Code of Conduct"
      }
    ]
  }
```
