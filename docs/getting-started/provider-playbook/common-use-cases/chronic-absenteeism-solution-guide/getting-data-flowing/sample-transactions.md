---
description: A few examples of what real-world transactions look like.
sidebar_position: 7
---

# Sample Transactions

## Example: Creating a Student

Putting the pieces in the above sections together, we can look at the contents
of a sample transaction:

```none title="Request: Creating a Student"
POST "https://ed-fi.grandbend.edu/data/v3/ed-fi/students"
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
Student API resource. There is an authorization token in the HTTP header
("Bearer 20ea10c525354cdaa32aacfb71bc2ff8"), and then the actual contents of the
new Student record, in JSON format.

:::info

You can paste this JSON into the API Swagger interface for the /student API
resource and run it – see the section [Online API Documentation and Sandbox -
Chronic Absenteeism-VDG](./online-api-documentation-and-sandbox.md) and follow
the instructions to authorize and try it out.

:::

A response from your system would look as follows:

```none title="Response"
201
access-control-allow-origin: *
access-control-expose-headers: *
connection: keep-alive
content-length: 0
date: Wed07 Apr 2021 17:21:27 GMT
etag: "5249220147305124204"
location: https://ed-fi.grandbend.edu/data/v3/ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66
```

This is an empty response with only HTTP headers (a few headers have been
removed to allow us to focus on the ones most important to our discussion).

* The 201 code indicates that the request was successful and the API resource
    was created.
* The location field returns the resource ID for the new entity – in this case:
    918bb778138b4ab2a44e599fbcbf7f66. A GET request to
    /ed-fi/students/918bb778138b4ab2a44e599fbcbf7f66 would return the entity
    that was just created.
* Other elements — such as an [ETag](https://en.wikipedia.org/wiki/HTTP_ETag)
    and timestamp — are also provided. Generally these are not needed by most
    applications.

## Example: Creating a Student Attendance Record

A second example that represents a more complex scenario would look like this:

```http title="Request: Creating a Student Attendance Record"
POST "https://ed-fi.grandbend.edu/data/v3/ed-fi/studentSchoolAttendanceEvents"
accept: application/json
Content-Type: application/json
authorization: Bearer 20ea10c525354cdaa32aacfb71bc2ff8
{
    "schoolReference": {
        "schoolId": 255901107
    },
    "sessionReference": {
        "schoolId": 255901107,
        "schoolYear": 2011,
        "sessionName": "2010-2011 Fall Semester"
    },
    "studentReference": {
        "studentUniqueId": "604877"
    },
    "attendanceEventCategoryDescriptor":
         "uri://ed-fi.org/AttendanceEventCategoryDescriptor#Unexcused Absence",
    "eventDate": "2010-08-25",
    "attendanceEventReason": "Absent unexcused",
    "eventDuration": 1
}
```

This example of a POST showcases a few more advanced elements of a Ed-Fi
transaction.

* In this example, you can see **references** to other API resources:
    schoolReference, sessionReference, and studentAttendance. These resources
    must exist in the API or the transaction will be rejected by the API. You
    will also note that the reference is made via the natural key to the
    resource and not the REST id — you can read about this in the upcoming
    section [API Resource
    Keys](../understanding-ed-fi-apis/api-resource-keys.md).
* Also, in this example, you can see an example of how Ed-Fi handles controlled
    vocabularies via the string
    "uri://ed-fi.org/AttendanceEventCategoryDescriptor#Unexcused Absence". These
    are called "descriptors" in Ed-Fi, and you can read more about them in the
    upcoming section [Descriptors](../understanding-ed-fi-apis/descriptors.md).
* Also present here is an example of date formatting - read more on that in the
    section [Date and DateTime
    Formats](../understanding-ed-fi-apis/date-and-datetime-formats.md).
