# How to Use the Student Dimensions

## Overview

There are two dimensions in the [Core View
Collection](./collections/core-view-collection/readme.md) that provide lists of
students: [StudentSchoolDim
View](./collections/core-view-collection/studentschooldim-view.md) and
[StudentLocalEducationAgencyDim
View](./collections/core-view-collection/studentlocaleducationagencydim-view.md).
These dimension provide student names and a few key demographic values with
cardinality of one (e.g., student recorded with a single "sex"). For demographic
information with cardinality "many" (e.g., student record with multiple tribal
affiliations or multiple languages), the Core Collection provides
a `DemographicsDim`  and two bridge views that link the student dimensions to
the demographic dimension: [StudentSchoolDemographicsBridge
View](./collections/core-view-collection/studentschooldemographicsbridge-view.md)
and  [StudentLocalEducationAgencyDemo](./collections/core-view-collection/studentlocaleducationagencydemographicsbridge-view.md).
This article illustrates the relationships between these views and demonstrates
realistic usage scenarios.

### Design Note

Why are there two similar views ([StudentSchoolDim
View](./collections/core-view-collection/studentschooldim-view.md) and
[StudentLocalEducationAgencyDim
View](./collections/core-view-collection/studentlocaleducationagencydim-view.md)),
instead of a single `StudentDim` ?

* We wanted to include demographic / enrollment information directly in the
    Student dimension.
* In the Ed-Fi Data Standard v3.x, demographic information can be recorded
    either on the school relationship or the local education agency (LEA)
    relationship.
* To create a single view, we would have to coalesce the data, choosing either
    the school or LEA information as the primary information.
* Which one is primary? It depends on the implementation.
    → Combining into a single view would oversimplify the necessary complexity
    in the Ed-Fi ODS database and lead to incorrect results in some
    implementations.

In short, we decided that it's better to be transparent than to disguise this
challenging point.

:::info

The sample queries and results below are based on the Glendale sample database.
The article provides a few simple examples of what can be done with the views,
but not all facets are explored.

:::

## Data Model

![Student and Demographic Dimensions](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Student-and-Demographic-Dimensions.png)

## Enrollment

### School Enrollment

"Lander Middle School" has school key 628530001. The following query shows us
that there are 320 students enrolled at the school:

```sql
select
    count(1)
from
    analytics.StudentSchoolDim
where
    schoolkey = 628530001
```

Because the Analytics Middle Tier is not a temporal solution, there is no way to
ask the question "How many students were enrolled yesterday?" The views are
returning data student-school data for _right now_.

:::tip

The Analytics Middle Tier could be useful for building a temporal solution — a
true data warehouse. One would need to create an ETL process running every day:
query the `StudentSchoolDim` , add a calculated column calling `GETDATE()`, and
insert the result into a new table on another database.

:::

### Local Education Agency Enrollment

Lander Middle School's LocalEducationAgencyKey is 628530, Lander ISD. Another
simple query gives us the current enrollment in this school district:

```sql
select
    count(1)
from
    analytics.StudentLocalEducationAgencyDim
where
    StudentLocalEducationAgencyDim.LocalEducationAgencyKey = 628530
```

The answer is: 320. Apparently Lander ISD only has a middle school, as confirmed
by the script below:

```sql
select
    *
from
    analytics.SchoolDim
where
    LocalEducationAgencyKey = 628530
```

Now let's find a better example: What is the enrollment for each school in a
district? This time we'll use the Glendale ISD local education agency, with
key 867530:

```sql
select
    LocalEducationAgencyDim.LocalEducationAgencyName,
    SchoolDim.SchoolName,
    count(1) as Enrollment
from
    analytics.LocalEducationAgencyDim
inner join
    analytics.SchoolDim
inner join
    analytics.StudentSchoolDim
on
    SchoolDim.SchoolKey = StudentSchoolDim.SchoolKey
on
    LocalEducationAgencyDim.LocalEducationAgencyKey = SchoolDim.LocalEducationAgencyKey
where
    LocalEducationAgencyDim.LocalEducationAgencyKey = 867530
group by
    LocalEducationAgencyDim.LocalEducationAgencyName,
    SchoolDim.SchoolName
```

:::tip

This same query without Analytics Middle Tier is not much longer, only
requiring one more table join. The foreign keys only require a single column,
so they are difficult to get wrong — unlike the complex natural keys on so
many other tables.

<details>
<summary>Expand source</summary>

```sql
select
    edOrgLea.NameOfInstitution as LocalEducationAgencyName,
    edOrgSchool.NameOfInstitution as SchoolName,
    count(1) as Enrollment
from
    edfi.StudentSchoolAssociation
inner join
    edfi.School
on
    StudentSchoolAssociation.SchoolId = School.SchoolId
inner join
    edfi.EducationOrganization edOrgSchool
on
    School.SchoolId = edOrgSchool.EducationOrganizationId
inner join
    edfi.EducationOrganization edOrgLea
on
    School.LocalEducationAgencyId = edOrgLea.EducationOrganizationId
where
    edOrgLea.EducationOrganizationId = 867530
group by
    edOrgLea.NameOfInstitution,
    edOrgSchool.NameOfInstitution
```

</details>

:::

## Demographics

### School

How do we access student demographics, for example, around language use? The
following query gives the count of students by language and school, using the
Analytics Middle Tier.

```sql
SELECT
    SchoolDim.SchoolName AS 'School name',
    DemographicDim.DemographicLabel AS 'Language',
    COUNT(1) AS 'Number of students'
FROM
    analytics.StudentSchoolDim
INNER JOIN
    analytics.StudentSchoolDemographicsBridge
ON
    StudentSchoolDim.StudentSchoolKey = StudentSchoolDemographicsBridge.StudentSchoolKey
INNER JOIN
    analytics.DemographicDim
ON
    StudentSchoolDemographicsBridge.DemographicKey = DemographicDim.DemographicKey
INNER JOIN
    analytics.SchoolDim
ON
    StudentSchoolDim.SchoolKey = SchoolDim.SchoolKey
WHERE
    DemographicDim.DemographicParentKey = 'Language'
GROUP BY
    SchoolDim.SchoolName,
    DemographicDim.DemographicLabel
```

We can write a similar query without Analytics Middle Tier and it does not
require much more effort. However, that query is different between Data Standard
v2.2 and Data Standard v3.x, because the old `edfi.StudentLanguage`  table is
now `StudentEducationOrganizationAssociationLanguage`. This one query on
Analytics Middle Tier is now portable across Ed-Fi ODS / API versions since
v2.3, without requiring a rewrite.

:::tip

This same query provides other demographics simply by replacing the
word "Language" in the where clause with another demographic key, for example,
"TribalAffiliation". You can find all available demographic keys with this
query:

<details>
<summary>Expand source</summary>

```sql
select
    distinct DemographicParentKey
from
    analytics.DemographicDim
/*
DemographicParentKey
---------------------
CohortYear
Disability
DisabilityDesignation
Language
LanguageUse
Race
StudentCharacteristic
TribalAffiliation
*/
```

</details>

:::

### Local Education Agency

As discussed in the overview of this article, demographics in Data Standard v3.x
can be stored either with the student's relationship to the school, or the
relationship with the local education agency. The above query can be rewritten
for district-level information:

```sql
SELECT
    LocalEducationAgencyDim.LocalEducationAgencyName,
    DemographicDim.DemographicLabel AS 'Language',
    COUNT(1) AS 'Number of students'
FROM
    analytics.StudentLocalEducationAgencyDim
INNER JOIN
    analytics.StudentLocalEducationAgencyDemographicsBridge
ON
    StudentLocalEducationAgencyDim.StudentLocalEducationAgencyKey = StudentLocalEducationAgencyDemographicsBridge.StudentLocalEducationAgencyKey
INNER JOIN
    analytics.DemographicDim
ON
    StudentLocalEducationAgencyDemographicsBridge.DemographicKey = DemographicDim.DemographicKey
INNER JOIN
    analytics.LocalEducationAgencyDim
ON
    StudentLocalEducationAgencyDim.LocalEducationAgencyKey = LocalEducationAgencyDim.LocalEducationAgencyKey
WHERE
    DemographicDim.DemographicParentKey = 'Language'
GROUP BY
    LocalEducationAgencyDim.LocalEducationAgencyName,
    DemographicDim.DemographicLabel
```

The query is nearly identical, requiring only two changes:

* `StudentSchoolDim`  → `StudentLocalEducationAgencyDim`
* `StudentSchoolDemographicsBridge`  → `StudentLocalEducationAgencyDemographicsBridge` .

:::tip

For Data Standard v2.2, the two queries should return the same counts because
all of the demographics are stored on the school relationship. But, in Data
Standard v3.x, the two queries can produce very different results. Which set of
results is appropriate for any given use case depends on how the Student
Information System is storing demographic data in the Ed-Fi ODS / API. Data
analysts will need to evaluate the results carefully before deciding which data
set is the most appropriate for any particular question being explored in the
data.

:::
