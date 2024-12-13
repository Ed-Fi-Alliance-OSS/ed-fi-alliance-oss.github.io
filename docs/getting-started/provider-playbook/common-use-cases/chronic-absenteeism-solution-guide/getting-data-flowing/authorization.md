---
description: This section describes how requests to the API are authorized
sidebar_position: 5
---

# Authorization

## Overview

Authorization takes place after authentication is established. Authorization
establishes that a particular user or client has rights to work with a
particular system function or a specific piece of information. This section
describes the fundamentals of authorization in connecting with an Ed-Fi API.

## Tokens & Profiles

With each request made to the API, the token obtained from the authentication
process must be passed in a HTTP header, like so:

```none
Authorization: Bearer <token_value>
```

The Ed-Fi API uses this token to identify the caller and determine the
permissions that apply to each of the accessible API resources.

## How Authorization Works

The Ed-Fi ODS / API implements authorization based on relationships of the API
resource being accessed back to an education organization
(EducationOrganization) and to a namespace (Namespace).

### Authorization via Relationship to an EducationOrganization

This strategy is mostly applicable to Student Information Systems. In this
strategy the API determines if the resource being accessed by an API client can
be related to an education organization that the API client has permissions
over.

:::info

Please note that this authorization pattern is mostly applicable to Student
Information Systems.

:::

1. Your client API credentials (key and secret) are associated with one or more
    EducationOrganizations by the operator of the API.
2. The API traces resources your API client attempts to manage back to a root
    EducationOrganization. This is typically the organization that owns that
    record. For example:
    * for an enrollment record (StudentSchoolAssociation), the
        EducationOrganization is the school that the student is enrolled in
    * for a course transcript (CourseTranscript) record, this is the school or
        school district that owns and issued the credits
    * for a class section (Section), this is school in which class section
        exists
    * and so on...
3. Your API client is authorized based on the following 2 items being true:
    * the EducationOrganization that the API resource is tied to matches
        an EducationOrganization associated with your API credentials
    * your API client has the proper CRUD permissions over API resources of
        that kind

This is a simplified view, and there are other authorization mechanisms in place
on the API that affect your access, as well as other API authorization
configuration options. However, you generally do not need to know about those
other situations as they are more rare.

The most common pattern for assigning your API client credentials access is that
it associated with the school district (LocalEducationAgency, a class of
EducationOrganization) with which your organization has a contract.

If you get a 403 error, the most common cause is that the EducationOrganization
tied to the resource you are trying to create or access is not associated with
your credentials.

**Example 1**: to access a StudentSectionAssociation resource, the student (see
the "studentReference" in the JSON below) must be enrolled in a school and the
API client must have been authorized with permissions over that school or the
school district within which that school exists.

```json title="Example API Resource JSON - StudentSectionAssociation"
{
    "beginDate": "2021-04-06",
    "sectionReference": {
      "localCourseCode": "string",
      "schoolId": 0,
      "schoolYear": 0,
      "sectionIdentifier": "string",
      "sessionName": "string"
    },
    "studentReference": {
      "studentUniqueId": "string"
    },
    "attemptStatusDescriptor": "string",
    "endDate": "2021-04-06",
    "homeroomIndicator": true,
    "repeatIdentifierDescriptor": "string"
}
```

### Authorization via Relationship to a Namespace

This strategy is mostly applicable to Assessment Systems. In this strategy the
API determines if the resource being accessed by an API client can be related to
the namespace assigned to the API client.

:::info

Please note that this authorization pattern is mostly applicable to Assessment
Systems.

:::

1. Your client API credentials (key and secret) are assigned a namespace by the
    operator of the API.
2. The API traces resources your API client attempts to manage back to a "root
    entity" that has a Namespace element. This Namespace typically indicates the
    organization that owns that record. For example:
    * the namespace string must begin with "uri://"
    * for an assessment (Assessment) record, the namespace typically indicates
        the vendor that owns or provides the assessment (e.g.,
        `uri://nwea.org`, `uri://act.org`, etc.)
    * for a student assessment result (StudentAssessment), this is the vendor
        that owns or provides the assessment for which the results were assigned
    * for a credential (Credential), this is the organization that assigns the
        credential (e.g., `uri://dpi.wi.gov`,
        `uri://microsoft.com`, etc.)
    * and so on...
3. Your API client is authorized based on the following 2 items being true:
    * The namespace of the root the API resource matches the namespace
        associated with your API client. Note that this is actually a prefix
        substring match: the test is that the namespace assigned to the root
        entity begins with the same string as the namespace assigned to your API
        client (this allow some important flexibility in assigning namespaces in
        the model)
    * Your API client has the proper CRUD permissions over API resources of
        that kind

This is a simplified view, and there are other authorization mechanisms in place
on the API that affect your access, as well as other API authorization
configuration options. However, you generally do not need to know about those
other situations as they are more rare.

If you get a 403 error, the most common cause is that the namespace tied to the
resource you are trying to create or access does not match the namespace
associated with your credentials.

**Example 2**: to access an Assessment resource, the namespace assigned to the
API client must be an exact prefix substring match on the namespace on the
Assessment entity (see schema below).

```json title="Assessment API resource format"
{
  "id": "string",
  "assessmentFamilyReference": {
    "title": "string"
  },
  "educationOrganizationReference": {
    "educationOrganizationId": 0
  },
  "identifier": "string",
  "periodDescriptor": "string",
  "title": "string",
  "maxRawScore": 0,
  "namespace": "string",
  "nomenclature": "string",
...
}
```

## Understanding the EducationOrganization Entity

In the Ed-Fi API, there is no EducationOrganization API resource (you can see
the v6.2 API surface
at: [https://api.ed-fi.org/v6.2/docs/swagger/index.html](https://api.ed-fi.org/v6.2/docs/swagger/index.html)).

This is because EducationOrganization is abstract: it only has concrete
subclasses, the most common of which are: School, LocalEducationAgency, and
StateEducationAgency.

However, in the data model, you will see EducationOrganization references. These
are generally what is used to drive authorization. An EducationOrganization
reference can be any of the concrete subclasses (School, LocalEducationAgency,
etc.)

## School vs LocalEducationAgency

The Ed-Fi ODS / API authorization is generally setup to account for the fact
that specific schools are within a school district and transitively provide
permissions from district to school. If an API resource is tied to a school
(School) and not a school district (LocalEducationAgency) authorization will
still work if the API client has permissions over the school district. However,
the inverse is not true: authorization over a school does not grant
authorization over data only associated with the school district.

For example, in the StudentSectionAssociation API resource depicted in the the
right column, it is the SchoolID that is part of the sectionReference that
drives authorization: to access this API resource, the API client must have
permissions either over that school or the school district of which this school
is a part.

## Getting Started

The owner or operator of the Ed-Fi API will generally inform you which
EducationOrganizations and Namespaces are associated with your credentials.

However, for EducationOrganizations that association may be obvious: if your
contract is with the school district, it is quite likely that your API
credentials will be associated with the school district.

If you have questions about which EducationOrganizations and Namespaces your
client has permissions over, please inquire with the API operator.

:::note

The following link is a ZIP archive containing a Postman example illustrating
the relationship based authorization strategy for a student. [Ed-Fi API Client
Developer Postman
Example](https://edfi.atlassian.net/wiki/download/attachments/20480666/Ed-Fi%20API%20Client%20Developer%20Postman%20Example.zip?version=3&modificationDate=1527887971107&api=v2&download=true)

<!-- When we replace the Confluence link above, we might want to put this content into GitHub rather than upload a zip file -->

:::
