# Authorizing Requests Using Custom Database Views

The relationship-based authorization strategies in the Ed-Fi API are oriented
around an API client's education organization claims: the education
organization hierarchy, and the "primary associations" that connect students,
staff, and contacts to education organizations (such as student enrollment or
staff employment). When applied, these strategies allow access to all students
enrolled in an education organization in the API client's claims, the contacts
of those students, and the staff employed or assigned to those education
organizations.

Some use cases need narrower rules, such as limiting access to students based on
their enrollment in specific courses or grade levels. The Ed-Fi API supports
these through _custom view-based authorization strategies_. A custom view-based
strategy only requires a database view in the Ed-Fi API database and an entry
in the security metadata. No code changes, recompilation, or API restarts are
needed.

Using this capability, you could create authorization strategies that limit an
API client's access to groups of students such as:

- Students enrolled in CTE courses
- Students in the Gifted and Talented program
- Students in preschool or early childhood education

Custom views are not limited to students. Any Ed-Fi or extension resource can be
the basis for authorization. For example:

- `AssessmentWithReadingInTheIdentifier` could limit access to assessment data
  (assessment metadata or student assessment results) to assessments whose
  `assessmentIdentifier` contains "Reading".
- `TransportationTypeDescriptorWithABus` could limit access to student
  transportation items to those with a transportation type whose code value
  contains "Bus".

The approach is flexible, but it requires strict conventions for the
authorization strategy names and the matching database views. This article
describes those conventions. For a worked example, see [How To: Use Custom
View-Based Authorization](../how-to-guides/how-to-use-custom-view-based-authorization.mdx).

:::info

If you're moving custom views from the Ed-Fi ODS/API, rewrite them for the Ed-Fi
API v8 database. ODS/API views return the basis entity's primary key columns,
such as `StudentUSI`. Ed-Fi API v8 views must return the basis resource's
`DocumentId` instead, and the tables and columns they query are different. On
PostgreSQL, the view name must also be quoted (see [Name the
View](#name-the-view)).

:::

## How Custom View-Based Strategies Work

When a claim set's security metadata names an authorization strategy that isn't
one of the built-in strategies, the Ed-Fi API treats it as a custom view-based
strategy:

1. It finds the _basis resource_ in the strategy name. The name follows the
   pattern `{BasisResource}With{Description}`, so
   `StudentWithCTECourseEnrollments` has the basis resource `Student`.
1. It finds the path from the resource being authorized to the basis resource,
   through the resource's references. Not every reference can be used; see
   [Which References Are Used](#which-references-are-used).
1. It checks that the basis resource's `DocumentId` for the item is in the view
   `auth.{StrategyName}`.

Custom view-based strategies are combined with the other strategies using AND
semantics. They act as additional filters rather than new ways to relate
education organizations and people, so you can use them alone or together with a
relationship-based strategy to further restrict access. When several strategies
apply to the same request:

- Custom view-based and `NamespaceBased` strategies run in the order they're
  listed in the claim set's strategies for the resource, and all of them must
  pass.
- `OwnershipBased` always runs last of these.
- Relationship-based strategies run after the others. They're combined with
  each other using OR semantics.

When more than one custom view-based strategy applies, an item must be in every
view.

## Step 1: Identify the Basis Resource

A custom view-based strategy starts with a basis resource. This is the resource
whose `DocumentId` the view returns, and that the resources being authorized
must reference. Any Ed-Fi or extension resource can be used, including
descriptors and education organizations.

For this example, let's build a strategy based on `Assessment` that authorizes
access to resources that reference an assessment, filtering them to assessments
with the academic subject "Mathematics".

### Which References Are Used

Most strategies use a direct reference to the basis resource, and you don't
need the details in this section. They matter when the basis resource is
reached through other resources, when a resource has more than one reference to
it, or when you use change queries (see [Change Queries](#change-queries)).

The resource being authorized can reach the basis resource through a direct
reference, such as a student assessment's reference to an assessment, or
through a chain of references, such as:

`Grade` → `StudentSectionAssociation` → `Section` → `CourseOffering`

Only some references can be part of this path:

- **Only top-level references.** References inside a collection, such as an
  item in a list of programs, and references added by an extension aren't used.
  For a descriptor basis resource, the descriptor value must also be at the top
  level of the resource.
- **After the first reference, only identifying references.** The first
  reference can be any top-level reference. Each reference after it must be
  part of the identity of the resource it's on. In the chain above, a grade can
  reach a course offering because a student section association is identified
  in part by its section, and a section in part by its course offering. This
  rule applies to references to other resources. A descriptor value at the end
  of the path, such as a school's school type, doesn't have to be identifying,
  except for change queries (see [Change Queries](#change-queries)).

If the basis resource can't be reached this way, requests fail with a security
configuration error, even if the resources are connected in the data model.
See [Configuration Errors](#configuration-errors).

When more than one path reaches the basis resource, the Ed-Fi API uses only one
of them, chosen as follows:

1. If the basis resource is `EducationOrganization`, or another resource that
   has several types, a reference to the basis resource itself is preferred
   over a reference to one of its types, such as `School`, even when that path
   is longer. For example, with an `EducationOrganization` basis, a student
   school association is authorized through its graduation plan's education
   organization reference, not through its own school reference. An
   association without a graduation plan is then treated as having no basis
   reference, so it's denied or left out of results.
1. Otherwise, the paths are compared one reference at a time, starting from the
   resource being authorized. An identifying reference is preferred over one
   that isn't, a required reference over an optional one, and a reference
   without a role name (such as `schoolReference`) over one with a role name
   (such as `responsibilitySchoolReference`).
1. If the paths are still tied, the shorter path is used.

Only the basis item reached through the chosen path is checked against the
view. Other references to the basis resource on the same item aren't checked.

## Step 2: Create the Database View

### Name the View

The view's name and the authorization strategy's name must be the same, and must
follow this convention:

`{BasisResource}With{HintPhrase}`

- The first part is the basis resource's name, such as `Assessment`.
- The second part is the literal text `With`. It's case-sensitive.
- The final part is a title-cased hint phrase, described below.

The Ed-Fi API reads every `With` in the name and chooses the longest resource
name that the strategy name starts with. If an extension has a resource with the
same name as an Ed-Fi resource, the Ed-Fi resource is used.

The Ed-Fi API looks for the view in the `auth` schema and matches its name
_case-sensitively_ on both database engines. On PostgreSQL, quote the view name
when you create it. Without quotes, PostgreSQL stores the name in lowercase and
the Ed-Fi API doesn't find the view:

```sql
-- Found by the Ed-Fi API
CREATE VIEW "auth"."AssessmentWithAnAcademicSubjectOfMathematics" AS ...

-- Not found: stored as auth.assessmentwithanacademicsubjectofmathematics
CREATE VIEW auth.AssessmentWithAnAcademicSubjectOfMathematics AS ...
```

Names are also limited by the database engine: PostgreSQL identifiers are at most
63 bytes long, and SQL Server identifiers at most 128 characters.

#### The Hint Phrase

When a request fails custom view-based authorization, the Ed-Fi API returns a
problem details response with a hint about how to fix it. Because a custom view
has no other metadata, the hint is built from the strategy name:

- The name is split into words at each capital letter, keeping acronyms such as
  "CTE" together.
- Common articles, prepositions, and conjunctions (such as "with", "a", "of",
  "the", and "or") are made lowercase.
- "You may need a" (or "an") is added at the start.

For example, a strategy named `StudentWithCTECourseEnrollments` produces the
hint "You may need a Student with CTE Course Enrollments." Choose a hint phrase
that completes the sentence "You may need a Student with…".

:::info

Using the word "a" right before an acronym makes the result ambiguous. For
example, `StudentWithACTECourseEnrollment` produces "You may need a Student with
ACTE Course Enrollment" rather than "…with a CTE Course Enrollment". Use a
plural noun instead to avoid the "a".

:::

### What the View Must Return

The view must:

- Be in the `auth` schema, with the same name as the authorization strategy.
- Be a view. On PostgreSQL, a materialized view also works, but it must be
  refreshed for data changes to take effect (see [When Changes Take
  Effect](#when-changes-take-effect)). A table isn't accepted.
- Have a `DocumentId` column, named exactly that, with the type `bigint`,
  containing the basis resource's `DocumentId` values. Other types, such as
  `integer` or text, aren't accepted. Other columns are ignored.

For a descriptor basis resource, return the descriptor's `DocumentId` from
`dms.Descriptor`, not its `DescriptorId`.

Don't use `SELECT DISTINCT`. The Ed-Fi API checks membership with an `IN`
condition, so duplicate rows don't change the result, and on PostgreSQL
`DISTINCT` prevents the database from optimizing the check.

### Plan the Query

The view's query uses the Ed-Fi API's relational tables. In those tables:

- Each resource has a table named after it, in a schema for its project (such as
  `edfi`), with a `bigint` `DocumentId` primary key.
- A reference to another resource is stored as a `{Reference}_DocumentId`
  column, such as `Assessment_DocumentId` or `Student_DocumentId`.
- A descriptor value is stored as a `{Descriptor}_DescriptorId` column, which
  joins to `dms.Descriptor` on `DescriptorId`. `dms.Descriptor` holds each
  descriptor's `Namespace`, `CodeValue`, and `DocumentId`.
- Collections, such as an assessment's academic subjects, are stored in their
  own tables, with a column referring to their parent's `DocumentId`.

Table and column names come from the data standard and extensions you deploy,
so check the names against your own database.

In this example, an assessment's academic subjects are stored in the
`edfi.AssessmentAcademicSubject` collection table:

```mermaid
erDiagram
    Assessment ||--o{ AssessmentAcademicSubject : has
    AssessmentAcademicSubject }o--|| Descriptor : references

    Assessment {
        bigint DocumentId PK
        varchar AssessmentIdentifier
        varchar Namespace
    }

    AssessmentAcademicSubject {
        bigint CollectionItemId PK
        bigint Assessment_DocumentId FK
        int AcademicSubjectDescriptor_DescriptorId FK
    }

    Descriptor {
        int DescriptorId PK
        bigint DocumentId
        varchar Namespace
        varchar CodeValue
    }
```

Since `Assessment_DocumentId` is already on the collection table, the view
doesn't need to query `edfi.Assessment` itself. It does need to join to
`dms.Descriptor` to filter on the academic subject.

### Create the View

With the name and query decided, create the view. The `auth` schema is created
when the database is provisioned.

PostgreSQL:

```sql
CREATE OR REPLACE VIEW "auth"."AssessmentWithAnAcademicSubjectOfMathematics" AS
    SELECT aas."Assessment_DocumentId" AS "DocumentId"
    FROM "edfi"."AssessmentAcademicSubject" aas
        INNER JOIN "dms"."Descriptor" d
            ON d."DescriptorId" = aas."AcademicSubjectDescriptor_DescriptorId"
    WHERE d."Namespace" = 'uri://ed-fi.org/AcademicSubjectDescriptor'
        AND d."CodeValue" = 'Mathematics';
```

SQL Server:

```sql
CREATE OR ALTER VIEW [auth].[AssessmentWithAnAcademicSubjectOfMathematics] AS
    SELECT aas.[Assessment_DocumentId] AS [DocumentId]
    FROM [edfi].[AssessmentAcademicSubject] aas
        INNER JOIN [dms].[Descriptor] d
            ON d.[DescriptorId] = aas.[AcademicSubjectDescriptor_DescriptorId]
    WHERE d.[Namespace] = N'uri://ed-fi.org/AcademicSubjectDescriptor'
        AND d.[CodeValue] = N'Mathematics';
GO
```

## Step 3: Define the Security Metadata

Use the strategy name like any other authorization strategy, usually as a claim
set authorization strategy override. Because overrides replace a resource's
strategies, list the relationship-based strategy as well if the resource should
still be authorized by relationships:

```json
"authorizationStrategyOverrides": [
  { "name": "RelationshipsWithEdOrgsAndPeople" },
  { "name": "AssessmentWithAnAcademicSubjectOfMathematics" }
]
```

Add the override through the claims document, not the claim set endpoints. The
claim set import and override endpoints (`POST /v3/claimSets/import` and
`.../overrideAuthorizationStrategy`) accept only the built-in authorization
strategies, and reject a custom strategy name. You can add the override:

- In a non-production environment, by editing and uploading the claims document
  with `POST /management/upload-claims`.
- At deployment time, in the `Claims.json` used by the Filesystem loading mode
  or in a claims fragment.

See [How To: Create and Manage API Security Metadata using Declarative Security
Policies](../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx)
for both approaches, including when deployment-time claims are loaded.

## How Requests Are Authorized

A custom view-based strategy applies to every action it's configured for:

- **Read, many items.** Items whose basis resource isn't in the view are left
  out of the results. No error is returned, so an empty view returns an empty
  page.
- **Read, one item, and Delete.** The stored item is checked. If it isn't in
  the view, the request fails with `403 Forbidden`.
- **Update.** The stored item is checked first, then the new values in the
  request.
- **Create.** The new values in the request are checked. A `POST` that matches
  an existing item is authorized as an Update. If the basis resource is the
  resource being created (for example, `StudentWithCTECourseEnrollments` on
  Create for `Student`), the create is always denied, because a new item can't
  be in the view yet.
- **ReadChanges.** The strategy also applies to the `/deletes` and
  `/keyChanges` change query endpoints. See [Change
  Queries](#change-queries).

A denied request returns `403 Forbidden` with the type
`urn:ed-fi:api:security:authorization` and the hint from the strategy name:

```json
{
  "detail": "Access to the requested data could not be authorized. Hint: You may need a Student with CTE Course Enrollments.",
  "type": "urn:ed-fi:api:security:authorization",
  "title": "Authorization Denied",
  "status": 403,
  "errors": [
    "The caller is not authorized to perform the requested operation on the item based on the existing value of the 'StudentUniqueId' property of the item."
  ]
}
```

If the reference to the basis resource is empty:

- A read or delete of a stored item without that reference fails with `403
  Forbidden` and the type
  `urn:ed-fi:api:security:authorization:custom-view:invalid-data:element-uninitialized`.
- A create or update without that reference fails with `403 Forbidden` and the
  type `urn:ed-fi:api:security:authorization:custom-view:access-denied:element-required`.
- A read of many items leaves those items out.

### Change Queries

On `/deletes` and `/keyChanges`, the Ed-Fi API authorizes each deleted or
changed item using the values recorded when it was deleted or changed. These
values are kept in a _tracked-change table_ for each resource, such as
`tracked_changes_edfi.School`. The table only keeps a resource's identifying
values and the values used for authorization, so the first reference on the path
to the basis resource must be part of the resource's identity or one of those
authorization values. If it isn't, change query requests for that resource fail
with a security configuration error.

A descriptor basis resource reached through another resource has one more
requirement: the descriptor value must be part of the identity of every
resource on the path, so that it's recorded in the tracked-change table. For
example, a student school association can reach a school type descriptor
through its school reference, and this works for regular requests. But a school
type isn't part of a school's identity, so it isn't recorded when an association
is deleted, and `/studentSchoolAssociations/deletes` fails with a security
configuration error for a strategy such as `SchoolTypeDescriptorWithX`.

How the Ed-Fi API then checks the basis resource depends on what the basis
resource is:

- **The resource itself, or a student, contact, or staff member used for
  authorization.** The recorded values include the basis item's `DocumentId`,
  and it's checked against the view as it is now. If the view still returns
  that `DocumentId`, the item is authorized, even if the basis item has since
  been deleted. A student, contact, or staff member counts only when the
  resource's reference to them is one of its authorization values, which is
  usually the case.
- **Any other resource**, including a student, contact, or staff member
  referenced in some other way. The Ed-Fi API uses the recorded values to look
  up the basis item, and checks the `DocumentId` of the item it finds. If the
  basis item has since been deleted, or its identifying values have changed,
  it isn't found, and the item is denied, unless the strategy uses
  `IncludingDeletes` (see below).

#### Authorizing Items Whose Basis Was Deleted

When the basis item has to be looked up, a deleted basis item can't be found.
For example, with `SchoolWithAlternativeType` on
`/studentSchoolAssociations/deletes`, a deleted enrollment is denied once its
school has also been deleted. To keep authorizing items like this:

1. **Add `IncludingDeletes` to the end of the strategy and view names**, for
   example `SchoolWithAlternativeTypeIncludingDeletes`. The Ed-Fi API then also
   looks for the basis item in its tracked-change table by its old identifying
   values, so a deleted basis item, or one whose identifying values changed, can
   still be found. The suffix only affects `/deletes` and `/keyChanges`
   requests, so you can use the strategy for the ReadChanges action only.
1. **Include deleted basis items in the view.** A view that queries only the
   resource's table stops returning an item's `DocumentId` once the item is
   deleted, so the suffix alone isn't enough. Add a second query to the view,
   with `UNION ALL`, that returns the `DocumentId` of deleted items from the
   tracked-change table.

Because tracked-change tables keep only identifying and authorization values,
the second query can only filter on those. For example, a deleted school's
type isn't recorded, so the following view includes every deleted school. In
`tracked_changes_edfi.School`, deleted schools are the rows without a
`NewSchoolId`; the other rows record changes to a school's `SchoolId`.

PostgreSQL:

```sql
CREATE OR REPLACE VIEW "auth"."SchoolWithAlternativeTypeIncludingDeletes" AS
    SELECT s."DocumentId"
    FROM "edfi"."School" s
        INNER JOIN "dms"."Descriptor" d
            ON d."DescriptorId" = s."SchoolTypeDescriptor_DescriptorId"
    WHERE d."Namespace" = 'uri://ed-fi.org/SchoolTypeDescriptor'
        AND d."CodeValue" = 'Alternative'
    UNION ALL
    SELECT tc."DocumentId"
    FROM "tracked_changes_edfi"."School" tc
    WHERE tc."NewSchoolId" IS NULL;
```

SQL Server:

```sql
CREATE OR ALTER VIEW [auth].[SchoolWithAlternativeTypeIncludingDeletes] AS
    SELECT s.[DocumentId]
    FROM [edfi].[School] s
        INNER JOIN [dms].[Descriptor] d
            ON d.[DescriptorId] = s.[SchoolTypeDescriptor_DescriptorId]
    WHERE d.[Namespace] = N'uri://ed-fi.org/SchoolTypeDescriptor'
        AND d.[CodeValue] = N'Alternative'
    UNION ALL
    SELECT tc.[DocumentId]
    FROM [tracked_changes_edfi].[School] tc
    WHERE tc.[NewSchoolId] IS NULL;
GO
```

If the basis resource has many deleted items, consider adding an index to its
tracked-change table on the identifying values, such as `OldSchoolId`, to speed
up these requests.

## When Changes Take Effect

The Ed-Fi API checks each custom view when a request uses it, not at startup.
You can create or fix a view at any time without restarting the Ed-Fi API.

For a regular view, changes to the data the view queries take effect
immediately. For example, when a student enrolls in a CTE course, the next
request for that student is authorized.

A PostgreSQL materialized view stores its results, so changes to the data take
effect only when the view is refreshed with `REFRESH MATERIALIZED VIEW`. Until
then, the view keeps returning its old results, both for items that should now
be authorized and for items that should no longer be. If you use a materialized
view, refresh it often enough for your access rules. See
[Materialized Views](https://www.postgresql.org/docs/current/rules-materializedviews.html)
in the PostgreSQL documentation.

A new or changed authorization strategy in the security metadata takes effect
when the Ed-Fi API next refreshes its claim set cache. By default, the cache
expires after 10 minutes, set by `CacheSettings:ClaimSetsCacheExpirationSeconds`.
Restarting the Ed-Fi API applies the change immediately.

## Configuration Errors

Mistakes in a custom view or its strategy name cause server errors rather than
authorization failures, so that a broken configuration isn't mistaken for an
empty result. Check the Ed-Fi API log for details.

- **A missing or invalid view.** If the view doesn't exist, isn't a view, or has
  no `bigint` `DocumentId` column, requests fail with `500 Internal Server Error`
  and the type `urn:ed-fi:api:system`. This includes a PostgreSQL view created
  without quotes around its name.
- **An unknown basis resource.** If the strategy name has no `With`, or no
  resource name matches the part before it, requests fail with `500 Internal
  Server Error`, the type `urn:ed-fi:api:system:configuration:security`, and
  the title "Security Configuration Error".
- **No path to the basis resource.** If the resource being authorized can't
  reach the basis resource through the references described in [Which References
  Are Used](#which-references-are-used), requests fail with the same security
  configuration error. The log message names the resource, the strategy, and the
  basis resource.

A view is only checked when the strategies before it pass. For example, if
`NamespaceBased` is listed before the view and denies a request, the response is
a `403 Forbidden`. Since the view isn't checked, a missing or invalid view
doesn't cause a `500` for that request.
