# API Resource Keys

Ed-Fi API resources have two overlapping key systems. This section describes the
structure of the different systems along with detail about how and in what
circumstances API clients interact with each.

* [Resource IDs](#resource-ids)
* [Natural Keys](#natural-keys)
* [Identifying Key Field Merges](#identifying-key-field-merges)

## Resource IDs

In the API, Ed-Fi API resources are assigned a resource ID by the API
implementation. This value is defined as a UUID. This ID must be unique with the
API scope, but it is not guaranteed to be a GUID.

This ID helps provide for compatibility with REST conventions. For example, a
CourseOffering can be looked up and queried by doing a HTTP GET on a path like
this:

/courseOfferings/d0fd729db6ee4a7bbc989720e4f833f5

In the JSON, the resource ID appears as the "id" element:

```json title="Resource ID in JSON"
{
  "id": "d0fd729db6ee4a7bbc989720e4f833f5", // Resource ID
  "courseReference": {
    "code": "03100500",
    "educationOrganizationId": 255901001
  },
  "schoolReference": {
    "schoolId": 255901001
  }
}
```

The resource ID is API-assigned and can't be requested.1 Further, if a HTTP PUT
includes such an ID, that ID will either be ignored or result in an error — in
either case, it should not be included!

When an element is POSTed (created) the resource ID is sent back to the client
via a HTTP **location** Header (note that this is a sample, and specific values
will vary):

```json
{
  "date": "Fri, 15 Mar 2019 21:51:24 GMT",
  "etag": "\"63682654845800000\"",
  "strict-transport-security": "max-age=31536000",
  "location": "https://ed-fi.grandbend.edu/courseOfferings/dba76850635c4bf793bc1d1f4a539c1a", // Resource ID
  "access-control-expose-headers": "*",
  "content-length": "0",
  "content-type": null
}
```

_Figure 2. The resource ID of the newly created API resource._

## Natural Keys

To improve data quality and maximize the possibility for data to move between
systems, the Ed-Fi API also employs a natural key system.

The key for an entity can be looked up by using the [Ed-Fi Data
Handbook](/reference/data-exchange/udm/udm-handbook)  and looking under the
column “Identity”. Key fields are indicated there. Note, for example, the
documentation for the CourseOffering entity:

![Natural Key
Fields](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/assessment-solution-guide/handbook-courseoffering(1).png)

_Figure 3. Natural key fields are shown by looking at the "identity" column in
the UDM Handbook._

You can see that the entity has three keys: LocalCourseCode, School, and
Session. Collectively, these constitute the natural key.

In the API endpoint for /courseOfferings (you can see this resource in the
[Ed-Fi ODS / API
Sandbox](https://api.ed-fi.org/v2.5.0/docs/index.html?url=https://api.ed-fi.org/v2.5.0/api/metadata/resources/api-docs#!/courseOfferings/getCourseOfferingsAll)),
the JSON reveals that these keys collectively contain data from 4 distinct
fields, as the Session has 3 fields in its natural key and School and
LocalCourseCode 1 field each. There are 5 fields in total, but the schoolId
field is duplicated — more on this below.

```json title="JSON snippet for CourseOffering"
{
  "id": "d0fd729db6ee4a7bbc989720e4f833f5",
  "courseReference": {
    "code": "03100500",
    "educationOrganizationId": 255901001
  },
  "schoolReference": {
    "schoolId": 255901001
  },
  "sessionReference": {
    "schoolId": 255901001,
    "schoolYear": 2011,
    "termDescriptor": "Spring Semester"
  },
  "localCourseCode": "03100500"
}

```

So the key for CourseOffering is constituted by these fields:

* schoolId
* schoolYear
* termDescriptor
* localCourseCode

Why does Ed-Fi use composite natural keys instead of only assigning entities a
surrogate ID and using that exclusively? The use of ecosystem identifiers plays
two important roles:

### Allows systems with no knowledge of the API to transact with the API

If the API assigns all keys, then systems with no knowledge of the API are at a
distinct disadvantage. In the case above, you can see that a system that has the
school, session, and course code would be easily able to locate and query this
entity. All of the key fields here are well-known within the K–12 district
already.

### Supports key field unification to improve data quality

Note in the JSON above that schoolId appears twice, but we only list it once as
part of the key. Why is that? The reason is that the API "unifies" the schoolId
that is part of the SchoolReference and the SessionReference. If an API tries to
POST a CourseOffering where those two schoolIds differ, the API will refuse the
transaction as these fields are unified by the API.

This ensures a basic level of data integrity — that the CourseOffering being
created at a School is assigned to a Session that is also part of that School.

## Identifying Key Field Merges

How do you know when fields are being unified? This information is declared in
the Ed-Fi Data Handbook under the Merge column.

![Merge
Column](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/assessment-solution-guide/handbook-merge(1).png)

_Figure 5. The "Merge" column shows which fields in the entity are merged_
— _this merging is most common with key fields._

This note is declaring that the School in the Session reference must match the
School reference on CourseOffering itself.
