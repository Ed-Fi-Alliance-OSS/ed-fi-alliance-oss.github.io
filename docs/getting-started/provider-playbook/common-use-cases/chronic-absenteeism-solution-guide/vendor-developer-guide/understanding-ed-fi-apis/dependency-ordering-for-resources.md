# Dependency Ordering for Resources

Resources must be loaded into an Ed-Fi API instance according to a set
dependency order.

## Dependency Order Overview

The dependency order is enforced through entity relationships in the ODS
database or by authorization.

* **Dependency order enforced by the entity relationships.** Like in any
    relationship-based database, many entities in the ODS have foreign key
    relationships with other entities. The ODS / API will return validation
    errors if constraints for these relationships are not met. While loading or
    updating data it is important to consider these dependencies to avoid
    validation errors from the database.
* **Dependency order enforced by authorization.** Many resources in the ODS /
    API are authorized by their relationship to education organization and/or
    people. For example, access to Student and student-related data is
    restricted by the StudentSchoolAssociation. The same is true for staff
    members and their relationships provided by the
    StaffEducationOrganizationEmploymentAssociation and the
    StaffEducationOrganizationAssignmentAssociation. Access to Parent
    information is restricted by the accessible Students and their
    StudentParentAssociations. For example, if "Student A" is accessible, then
    any Parents to which Student A has a StudentParentAssociation will be
    accessible as well.

A high-level dependency graph is shown below:

![Ed-Fi API Dependency Graph](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Ed-Fi%20API%20Dependency%20Graph.png)

## Dependency Order Endpoint

As an API client developer, it is useful to know the dependency order of
resources to load the data and minimize authorization and validation errors in
API responses.

The ODS / API provides a dependency metadata endpoint at
`/metadata/data/v3/dependencies` to show this dependency order based on each
HTTP operation. The default GET generates a JSON response with an order group of
resource endpoints that can be loaded at the same time. The response also
includes the "Create" and "Update" operations that can be performed in that
order group. "Delete" operations are to be performed at the reverse order of
Create operations. API Client developers can use this as documentation or can
use it programmatically for orchestration of API calls.

The Postman screenshot below shows the GET call:

![Dependency Endpoint - json endpoint](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Dependency%20Endpoint%20-json%20endpoint.jpg)

Adding a header `Accept` with a value of `application/graphml` can be passed to
obtain dependency output in the graphml XML format. The Postman screenshot
below shows the GET call with the added header:

![Dependency Endpoint - Graphml output](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Dependency%20Endpoint%20-%20Graphml%20output.png)

The screenshots below show the dependency order enforced by authorization on the
Students resource. You can see that Student creation is at
order 3, StudentSchoolAssociation creation is at order 18, and the Student
update is at order 19. This shows that a client cannot edit a student record it
has created until an enrollment record has been established.

A Postman screen shot showing the Student creation at order 3:

![Dependency Endpoint - Student Create](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Dependency%20Endpoint%20-%20Student%20Create.png)

A screenshot showing the StudentSchoolAssociation creation at order 18:

![Dependency Endpoint - Student School Association Create](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Dependency%20Endpoint%20-%20Student%20School%20Association%20Create.png)

A final screenshot showing the Student update at order 19, after
the StudentSchoolAssociation creation:

![Dependency Endpoint - Student Update](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/chronic-absenteeism-solution-guide/Dependency%20Endpoint%20-%20Student%20Update.png)

:::note

You can explore the dependency endpoint at the Ed-Fi Alliance-hosted sandbox:
[Dependency Endpoint in Ed-Fi ODS / API
Sandbox](https://api.ed-fi.org/v5.2/api/metadata/data/v3/dependencies)

:::
