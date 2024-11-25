# How To: Use Custom View-Based Authorization

## Create the Custom Authorization View in the ODS

First, identify the _basis entity_ for your authorization. This is the entity
whose primary key columns will be used to join to the _subject entity_ (the entity
being authorized). For this example, we’ll use the Student entity and the new
authorization view will only include its primary key column – StudentUSI.

Next, review the Ed-Fi ODS database model and identify how best to write a query
to apply the necessary criteria to meet the business requirements. For this
example, we’ll filter the available Students based on their enrollment in a CTE
(Career and Technical Education) course.

Finally, identify the name for the view, following the strict naming convention
for custom authorization views: `{EntityName}With{HintPhrase}`. The first part of
the view name consists of the basis entity’s name (i.e. “Student” in this case).
The second part is the literal text “With”. This is case-sensitive and is used
to separate the entity name from the hint phrase to follow. The final part is a
title-cased “hint phrase”. When view-based authorization fails, the API returns
a “problem details” message in the response that includes a “hint” for the
consumer indicating ways to remedy the situation. The “Hint Phrase” part of the
name should be able to complete a sentence that starts with “You may need a
Student with…”.

```SQL
CREATE OR ALTER VIEW auth.StudentWithCTECourseEnrollments
AS
    SELECT DISTINCT StudentUSI
    FROM edfi.StudentSectionAssociation ssa
        INNER JOIN edfi.CourseOffering co
            ON co.LocalCourseCode = ssa.LocalCourseCode
            AND co.SchoolId = ssa.SchoolId
            AND co.SchoolYear = ssa.SchoolYear
            AND co.SessionName = ssa.SessionName
        INNER JOIN edfi.CourseAcademicSubject csubj
            ON csubj.CourseCode = co.CourseCode
            AND csubj.EducationOrganizationId = co.EducationOrganizationId
        INNER JOIN edfi.descriptor d
            ON csubj.AcademicSubjectDescriptorId = d.descriptorid
    WHERE d.Uri = 'uri://ed-fi.org/AcademicSubjectDescriptor#Career and Technical Education'
GO
```

![Database Diagram](/img/reference/ods-api/view-based-auth-diagram.webp)

## Add Security Metadata to the Security Database

In custom view-based authorization (which introduces no new metadata due to
design constraints), the authorization strategy name must match the view name.
Create a script to add the new authorization strategy to the EdFi_Security
database (or use another preferred approach):

```SQL
INSERT INTO dbo.AuthorizationStrategies(DisplayName, AuthorizationStrategyName)
VALUES ('Students Enrolled in CTE courses', 'StudentWithCTECourseEnrollments')
```

:::info
Due to differences in how database engines handle casing of identifiers, the
view name and authorization strategy only need to match in a case-insensitive
manner.
:::

Next, use the new authorization strategy for authorization of a resource claim
on a claim set’s actions using your preferred approach.

The declarative XML snippet below follows the approach described in [How To:
Create and Manage API Security Metadata using Declarative Security
Policies](/reference/ods-api/7.3/how-to-guides/how-to-create-and-manage-api-security-metadata-using-declarative-security-policies)
and applies the new authorization strategy to the Student resource for API
clients assigned to the Ed-Fi Sandbox claim set. This XML can be transformed
into a database script using the `transform.ps1` script located in the
_SecurityMetadata_ folder of the _Ed-Fi-Ods-Implementation_ repository:

```powershell
.\transform.ps1 "C:\Temp\Scripts\MsSql\Students-with-CTE-enrollments-security-metadata.xml"
```

:::info
The `transform.ps1` script also supports arguments for the output (SQL) file,
and the database engine (SqlServer or PostgreSQL), but it will default the
output filename to be co-located with the `.xml` file and apply a `.sql`
extension, and it will auto select the appropriate target database if a `MsSql`
or `PgSql` folder is found in the path.
:::

```xml
<SecurityMetadata>
  <Claims>
    <Claim name="http://ed-fi.org/ods/identity/claims/domains/people">
      <Claims>
        <Claim name="http://ed-fi.org/ods/identity/claims/ed-fi/student">
          <ClaimSets>
            <ClaimSet name="Ed-Fi Sandbox">
              <Actions>
                <Action name="Create" />
                <Action name="Read">
                  <AuthorizationStrategyOverrides>
                    <AuthorizationStrategy name="StudentWithCTECourseEnrollments" />
                  </AuthorizationStrategyOverrides>
                </Action>
                <Action name="Update">
                  <AuthorizationStrategyOverrides>
                    <AuthorizationStrategy name="StudentWithCTECourseEnrollments" />
                  </AuthorizationStrategyOverrides>
                </Action>
                <Action name="Delete" />
                <Action name="ReadChanges" />
              </Actions>
            </ClaimSet>
          </ClaimSets>
        </Claim>
      </Claims>
    </Claim>
  </Claims>
</SecurityMetadata>
```

## Test the New Authorization Strategy

With the ODS view created and the security metadata defined to apply the
authorization strategy to an API client, review the behavior of the new
strategy. For this example, identify some students who are enrolled in a CTE
course and some who are not (hint: use a query with a `LEFT JOIN` from
`edfi.Student` to `auth.StudentWithCTECourseEnrollments`). Then test the
following operations:

* `GET` all Student resource items and ensure all returned items are for
  students identified as having CTE course enrollments.
* `GET` all Student resource item for a non-CTE enrolled student by `id`. The
  operation should fail.
* `GET` all Student resource item for a CTE enrolled student by `id`. The
  operation should succeed.
* `POST` a Student resource item for an _existing_ non-CTE enrolled student. The
  operation should fail.
* `POST` a Student resource item for an _existing_ CTE enrolled student. The
  operation should succeed.

:::info
Since this approach is entirely based on security metadata and ODS database
artifacts, the API does not need to be restarted after making the changes
described above – the new authorization strategy will be recognized and applied
after the next security metadata cache expiration in the API.
:::
