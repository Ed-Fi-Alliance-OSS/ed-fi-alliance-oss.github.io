# Patterns for Row-Level User Security

This article describes patterns and SQL objects for limiting end-user access to
student data in applications that use the Analytics Middle Tier.

## Overview

The Family Educational Rights and Privacy Act (FERPA) outlines certain data
privacy rights for students plus the rules by which student data can be shared
to anyone other than the student or parent. Systems that utilize the Analytics
Middle Tier must provide appropriate data security so that school officials,
parents, and so forth are only authorized to view "need-to-know" records. What
is appropriate may vary from state to state and district to district.

The Analytics Middle Tier provides two options for managing authorization to
row-level (i.e., student-level) data sourced from the ODS. The provided options
are certainly not the only approaches; careful evaluation will be needed to
determine what is most appropriate for any given business intelligence solution
and implementation.

## Roles / Scopes of Data Access

In K–12 scenarios, several common roles clearly require different degrees of
authorization to view student data:

* Superintendents see data for all students in their district.
* Principals see data for all students in their school.
* Teachers see data for all students in their classes.
* Parents see data for all their children.
* Students see only data for themselves.

![Pyramid of Data Access](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-2-26_16-30-37.png)

Real-world usage might not map job titles to data authorization levels in such a
simple manner. There may be district employees other than superintendents who
need access to all students. An Assistant Principal might take the lead on
checking an Early Warning system. Rather than speaking about roles, the
Analytics Middle Tier views define these _access scopes_:

* District
* School
* Section

Other scopes can be imagined but are not currently supported in the as-shipped
solution (e.g., counselors assigned to cohorts of students, students viewing
their own information).

:::warning

As state education agencies begin to explore the Analytics Middle Tier, it may
make sense to add a State scope to these views. On the other hand, the state use
cases might be sufficiently different as to require an entirely different access
scheme. If you are part of a state agency investigating the AMT, then please
submit a ticket in the [BIA project in
Tracker](https://tracker.ed-fi.org/browse/BIA) describing your desired access
patterns so that the Alliance can work with you to craft appropriate solutions.

:::

## Option 1. Dynamic Authorization Model

This model is particularly tuned to the capabilities of Microsoft's Tabular Data
Model technology and may be useful elsewhere. Here we will have a User view
representing all the staff listed in the ODS. It will be assumed that the
current user name will be the user's e-mail address; thus, the analytics engine
determines the scope of permissions starting from the current user's username.

![Dynamic Authorization Model](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Dynamic%20Authorization%20Model.png)

The [rls\_UserAuthorization
View](./collections/row-level-security-collection/rls_userauthorization-view.md) maps
each user to a scope of access. The "StudentPermission" shown in the view above
is a place holder for future Student scope; the as-shipped implementation only
supports Section, School, and District scopes. A teacher will have one record
for every section requiring access; a school administrator will have one record
for every school; and a district administrator will have a single record for the
district. Sample rows for two teachers with two and one section respectively,
two school administrators, and a district administrator:

| UserKey | UserClass | StudentPermission | SectionPermission | SchoolPermission |
| --- | --- | --- | --- | --- |
| 1   | Section | ALL | SEC1 | SCH1 |
| 1   | Section | ALL | SEC2 | SCH1 |
| 2   | Section | ALL | SEC3 | SCH2 |
| 3   | School | ALL | ALL | SCH1 |
| 4   | School | ALL | ALL | SCH2 |
| 5   | District | ALL | ALL | ALL |

The [rls\_StudentDataAuthorization
View](./collections/row-level-security-collection/rls_studentdataauthorization-view.md)
brings together a student with her school and section enrollments by date. When
the data modeler builds a security mode with these views, an individual user can
thus access only student data relevant to the time period in which the student
is enrolled in the section or school.

## Option 2. Static Authorization Model

In this model a teacher can access a student's data in any section and at any
date. Likewise, a school administrator is able to access a student's information
for dates prior to enrollment at the administrator's school (if such data are
commingled in the same ODS).

The [rls\_UserStudentDataAuthorization
View](./collections/row-level-security-collection/rls_userstudentdataauthorization-view.md) will
return significantly more rows than the dynamic views, though this will present
only a moderate storage burden for the analytics database. For data modelers who
do not require the more detailed restrictions of the dynamic authorization model
described above, this model may be simpler to use.

![Static Authorization Model](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Static%20Authorization%20Model.png)
