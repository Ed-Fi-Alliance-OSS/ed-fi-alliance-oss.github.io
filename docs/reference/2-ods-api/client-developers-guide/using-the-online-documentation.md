# Using the Online Documentation

Online documentation for the Ed-Fi ODS / API is available through Swagger UI,
which is a visual and interactive documentation suite providing detailed
descriptions for each resource as well as a simple way to test calls to the API
in sandbox environments.

## Gaining Access to the Documentation

Before using the Swagger documentation interface, you must get authorized access
to the system. The as-shipped Ed-Fi ODS / API documentation auto-fills the
necessary authorization information for you — but some implementers prefer to
disable this feature, so you may need to acquire an API key and secret assigned
by an ODS / API platform administrator.

Once you select a section (e.g., Resources, Enrollment) from the main Swagger
page, you will see an "Authorize" button.

![Authorize button](/img/reference/ods-api/image2018-5-31_22-59-59.png)

**Figure 1.** Authorize button

Not surprisingly, clicking the Authorize button opens the authorization dialog.
If the API key and API secret fields are already filled in, simply click
"Authorize." If not, use a key and secret provided to you by the ODS / API
platform administrator.

![Swagger authorization dialog showing auto-filled values](/img/reference/ods-api/image2018-5-31_23-0-52.png)

**Figure 2.** Swagger authorization dialog showing auto-filled values

Authorizing will provide you with a temporary access token. This access token is
used by the Swagger user interface while making calls on your behalf to the
Ed-Fi ODS / API.

## Browsing All Resources

Because there are many resources exposed through the Ed-Fi ODS / API, they are
categorized into separate sections in Swagger for easier browsing. The sections
are Resources, Descriptors, Types, Other, Composites, and Profiles. The
resources exposed are, generally speaking, representative of entities from the
Ed-Fi data model. This means that the entities will share names, organizations,
and definitions across all parts of the [Ed-Fi Data
Standard](https://edfi.atlassian.net/wiki/spaces/EFDS5), including the Ed-Fi XSD
and the Ed-Fi ODS / API.

Detail follows about the API documentation sections.

### Resources

The Resources section is for main Ed-Fi API elements such as student, school,
grade, and assessment. Each resource in this section maps one-to-one with Ed-Fi
entities except for the domain aggregates. These domain aggregates have been
created to wrap closely related entities into a single entity. `Students` and
`studentAssessments` are examples of domain aggregates.

### Descriptors

The Descriptors sections represent the Ed-Fi Descriptors (e.g.,
`academicSubjectDescriptors`, `accommodationDescriptors`) from the Ed-Fi data
model.

### Other

The Other section contains functional resources that aren't part of the data
model. In the as-shipped solution, these resources include operations related to
identity management.

### Composites

Composites are read-only combinations of resources that address specific
business use cases. Using composites reduces the number of calls that an API
client application must make to retrieve resources for these use cases.

For example, the Enrollment composite can return all the students in a given
class section or all students associated with a particular staff member in a
compact way.

### Profiles

If the ODS / API platform host has enabled API profiles, you will see them
listed with the other API Sections. Profiles are used by platform hosts to
restrict access to properties of a resource. Resource properties may be
read-write, read-only, or hidden from use by certain client applications. When
API client applications use a profile to access resources, they are limited to a
subset of the properties available on the underlying resource.

For example, an assessment system might have read-only access to students and
read-write access to other information in the assessment domain.

## Viewing an Individual Resource

When expanding a resource, you will see that each resource is broken into
sections based on the verbs supported.

![Supported verbs for the `students` resource](/img/reference/ods-api/image2018-5-31_23-4-0.png)

**Figure 3.** Supported verbs for the `students` resource

## Model vs. Example Value

When the documentation for a GET operation is expanded, you will see the Example
Value and Model options. The Model shows the type and description for each
element within the resource. The Example Value shows an example of the JSON
representation for the resource.

![The Model schema for the students resource](/img/reference/ods-api/image2018-5-31_23-7-26.png)

**Figure 4.** The Model schema for the students resource

## Performing a Read and Write

To perform a read and write to the Ed-Fi ODS / API through the documentation UI,
choose a resource and execute a GET that uses a “Get” pattern by clicking the
“Try it out” button. Then scroll down past the Parameters section and click the
"Execute" button.

![The result of a sample GET operation for the `students` resource](/img/reference/ods-api/image2018-5-31_23-9-57.png)

**Figure 5.** The result of a sample GET operation for the `students` resource

To explore further, choose one of the returned resources and copy a single
student from the JSON results. Next, expand the POST section of students and
click the "Try it out" button. Then paste the copied JSON into the associated
POST text area, overwriting the Example value. Remove the ETag and id, modify
some of the remaining values, and click “Execute” for the POST. If the return
code indicates a successful operation, a subsequent GET operation will return
the modified resource with a new ETag.

![A sample POST operation for the `students` resource](/img/reference/ods-api/image2018-5-31_23-14-51.png)

**Figure 6.** A sample POST operation for the `students` resource

### Checking for Errors

After executing an operation, an HTTP status code is displayed that shows the
result of the operation along with a message where applicable. The system sends
response codes along with human-readable error messages.

![A sample 400 response accompanied by an error message](/img/reference/ods-api/image2018-5-31_23-15-46.png)

**Figure 7.** A sample 400 response accompanied by an error message

## Identifying Resources that Support Natural Key Updates

Ed-Fi ODS / API is configured to allow natural key updates on selected Resources
using PUT operation. The natural language description of the PUT verb for the
resources would indicate whether natural key updates are supported for the
resource.

![Natural natural language description of PUT operation in `section` resource indicating that the resource supports natural key updates](/img/reference/ods-api/cascade%20on%20update.png)

**Figure 8.** Natural natural language description of PUT operation in
 `section` resource indicating that the resource supports natural key updates

![Natural natural language description of PUT operation in `reportCards` resource indicating that the resource does not support natural key updates](/img/reference/ods-api/No%20key%20updates.png)

**Figure 9.** Natural natural language description of PUT operation in
`reportCards` resource indicating that the resource does not support natural key
updates

In addition, the resources that allow natural key updates can be identified
through the `"x-Ed-Fi-isUpdatable": true` extension in the OpenAPI metadata for
their PUT verb and is visible on the swagger documentation.

![`x-Ed-Fi-isUpdatable` field on `section` resource indicating that the resource supports natural key updates](/img/reference/ods-api/image-2023-3-24_13-13-19.png)

**Figure 10. `x-Ed-Fi-isUpdatable`** field on `section` resource indicating that
the resource supports natural key updates

## Developer Tools

To view the full request and response including the JSON and header values, you
can use the developer tools included with the browser (typically with an **F12**
in most browsers).

:::note

The Ed-Fi Alliance hosts a sandbox version of the documentation you
can explore: [Ed-Fi ODS / API Sandbox
Documentation](https://api.ed-fi.org/v7.2/docs/)

:::
