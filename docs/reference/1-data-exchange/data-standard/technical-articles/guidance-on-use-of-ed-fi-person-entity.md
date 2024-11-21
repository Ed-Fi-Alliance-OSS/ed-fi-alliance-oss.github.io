# Guidance on Use of Ed-Fi Person Entity

This document describes the introduction of a Person entity into the Ed-Fi data
model, provides background and rationale, and provides guidance for its
application in the field.

## Terminology

Throughout the document we will use the following terminology:

* “Person” (always capitalized) will refer to the Person entity in the Ed-Fi
    data model.
* The term “individual(s)” will be used to generically talk about about
    distinct humans.
* “Person-role” will refer to specific Ed-Fi entities such as Student, Parent,
    and Staff, which are entities that capture characteristics of an individual
    acting within a particular role, generally an organizational role.

## Background

The initial Ed-Fi data model was heavily influenced by the need to improve data
quality. Both SEA use cases around accountability reporting and LEA use cases
around local data analytics revealed that data quality was often very poor, and
records were often in error. This was a consequence of the largely manual
processes to which the data was subjected as it moved between systems, and a
large challenge to Ed-Fi in the early days was to improve this quality.

At the time, Student and Staff were the primary set of individuals, or actors,
of interest in the domain (Parent came later). Because of their role as actors,
they have unique attributes, associations, and networks of entities that are
specific to their Person-role as a Student or Staff.

Moreover, current practice at the time — and still the dominant practice — was
to have different systems of identification: Students would have one set of
unique identifiers and Staff would have another. Student identifiers were most
often assigned by the LEA or SEA; Staff identifiers were most often assigned by
a human resources (HR) system, as depicted in the diagram below.

![Agency Configuration](../img/Agency%20Configuration.png)

## Typical Early Agency Architecture

At the time, there was discussion as to whether to introduce a Person entity
with Student and Staff inheriting the attributes and associations of
Person. This was dismissed for several reasons:

* The relationship between Person and the Person-roles is NOT one of
    inheritance because of the person-role may not be mutually exclusive. Parent
    is an example of where Staff may also be Parents.
* Unlike the person-roles Student and Staff, Person did not have associations
    to other entities that belonged at the that level in the use cases of the
    day. While it was possible for a K-12 Student to also be K-12 Staff, this
    was a rare occurrence and resolving that across two different identification
    systems was deemed to be “not worth the effort.”
* While there are frequent cases where Staff are also Parent, the two
    person-roles were similarly distinct in the source systems with little
    operational or analytic need to link them.
* Conversation with early SEA partners indicated that they preferred keeping
    Student and Staff separate without a Person abstraction, since this matched
    their operational processes and matched the “systems of record” that were
    used.

The early Ed-Fi model was also explicitly looking to stay as close to the Common
Education Data Standards (CEDS) as possible. CEDS defines supertypes for Person,
Organization, and Roles. Persons have Roles associated with an Organization for
a period of time. This structure solves two specific data modeling issues:

* It allows a unified Person to have multiple roles, where Ed-Fi segmented
    these roles into Student, Staff and Parent.
* It unifies the Person-role entities from different domains (e.g., K12School
    and PSInstitution) as subtypes of a common supertype Person.

In the Ed-Fi model with Person added, associations may be made to the Person
entity to denote that the association is valid for any subclasses, or may be
made specifically to a subclass (i.e., to Student, Staff or Parent), indicating
that it is not valid for all other subclasses.

In the CEDS model, all associations are made to the supertype Person, as
subtypes are defined only to “reuse” the attributes of the supertype. This
specifically was counter to Ed-Fi’s desire for a data model that enforced a
higher level of data quality at the point of data exchange between systems. For
example, the Ed-Fi model use of person-roles does not allow a Student to
erroneously be associated as a Teacher for a section.

## New Needs for Person

The Ed-Fi data model of disconnected person-roles Student, Staff, and Parent has
generally served the K-12 community well. However, there are new drivers to
introduce a Person, as follows:

* SEAs are introducing Person ID Systems to assign unique IDs to an individual
    regardless of their role. These Person ID Systems are becoming more common
    with both commercial and open source sources.
* New longitudinal analytic use cases are emerging to link an individual’s
    data over long periods of time — decades — from birth through career — which
    would lean heavily on a common resolution of their identity as a Person.
* To that end, Ed-Fi is being stretched and extended from its K–12 roots, to
    include early childhood, postsecondary and career data.
* New use cases, specifically the Educator Preparation Data Model (EPDM), have
    surfaced use cases where a single individual can have multiple person-roles
    simultaneously.
* New data integrations have identified data sources that provide data related
    to individuals that can span many person-roles — such as Surveys. Rather
    than have many different associations with the several person-roles, a
    single association to a Person entity becomes attractive.

## Ed-Fi Person Model

The Ed-Fi Person model is shown as UML below. A new Person entity is introduced,
as follows:

* The Person entity has a key of a PersonID plus a SourceSystem (descriptor).
    This allows more than one Person ID system to be used for different set of
    individuals, if appropriate. By making SourceSystem a descriptor, this
    forces the control of PersonID sources.
* Optional association references are made from all person-roles: Staff,
    Student, Parent; and in extensions as needed (e.g., TPDM TeacherCandidate).

![Ed-Fi Person Model](../img/Person%20Model%20UML.png)

This model makes the use of Person entirely optional and supports backward
compatibility with existing use of person-roles, whether Person is used or not.

For API bindings, Person is an addressable resource (/persons) supported by CRUD
operations. The API support for person-roles continues as before (/students,
/staffs, /parents). There is no special support or behavior for Person; these
entities must be created and managed like any other entities.

## Guidance on Use of Person

### Use only if required by the use case, and avoid if not necessary

Person should only be used if there is a need and value in tracking individuals
across various person-roles. While in the K–12 enterprise such use cases do
exist and while they are becoming more common, most of the time, agencies are
not positioned to or trying to join data from these person-roles together.

Avoiding usage when not needed is best, as tracking identity of individuals
across systems is operationally challenging and subject to error. How do we know
that one "Stephen Mills" is the same as another "Stephen Mills" — we may have
access to characteristics like date of birth, demographics, and such, but like
names, dates and demographics can also be duplicated, and are frequently
mis-entered into systems.

To address these limitations, we can gather detailed identity markers, such as
drivers license numbers or social security numbers and use those to to check for
common identity, but individuals may not have those IDs, and gathering such
sensitive IDs and storing them in our systems should always be a last resort, as
such IDs can be misused, and storage and transmission of such IDs can pose
significant privacy risks.

Hence, management of a Person identity is inherently complex, and that
complexity should only be taken on when there is clear value to doing so, and
when it can be done safely.

### Using Person is designed to work best in concert with a Person ID system(s)

This is not explicitly required, but the assumption is that Person is best used
when the "data exchange context" has a system in place designed to uniquely
track all individuals across all systems. Such a system would accomplish the
following activities:

* Create a new Person when a new unique individual becomes known to the system
    and assign a new unique PersonID. This requires querying the
    personally-identifiable information of existing Persons to determine is a
    Person is already known to the system – a function typically provided by
    Person ID systems.
* Link person roles (Student, Staff, etc.) to the correct Person.

Today, few organizations actually have Person ID systems. Person ID systems are
used by systems of record (or by humans using them) to obtain PersonIDs. Those
PersonIDs are used by these systems (i.e., SIS, HR) as the appropriate student
or staff IDs and thus would be the IDs written by those systems into the Ed-Fi
data model as the ID for the person-roles. The administering organizations must
determine how to create the Person and link to person-roles with the same ID —
perhaps in real time. This approach would be easily applied with existing Person
ID systems.

### Using Person with surrogate Person IDs

It may be possible to use Person without a Person ID system if there is an
appropriate surrogate ID that can effectively serve as a Person ID. In such a
case, there is no Person ID system per se, but there is a reliable identifier
that provides for uniqueness of individuals across the data exchange context for
the use case.

For example, person IDs assigned by teacher certification systems have been
identified as a possibility for some Teacher Preparation Data Model use cases.
In these cases, anyone who embarks on the process of teacher certification
receives an ID, and that ID can remain with them through the life-cycle of the
individuals training and transition into a practicing teacher (i.e., a Staff).

### Using Person with a hybrid system of surrogate IDs

As a last resort, it may be possible to use a hybrid system where some Person
IDs come from one system and some come from another system. The practical
impacts of this approach are not well understood, and it is therefore
recommended to avoid this if possible.

For example, consider these records for these 2 individuals:

|     | Individual 1 | Individual 2 |
| --- | --- | --- |
| Person entity data | Person<br/><br/>_PersonID: 167223<br/>_   SourceSystem: Grand Bend SIS | Person<br/><br/>_PersonID: HR556621<br/>_   SourceSystem: Grand Bend HR System |
| Person-role entity data | Parent<br/><br/>_Name: Stephen Mills<br/>_   ParentUniqueID: 167223 | Staff<br/><br/>_Name: Steven Mills<br/>_   StaffUniqueID: HR556621 |

In this case, Person is populated by using 2 different ID systems: Student IDs
from the SIS system and Staff IDs from the staff system. While this works as a
way of populating a data model that uses Person, the issue is that enterprise is
not actually attempting to "unify" its tracking of Persons.

For example, what happens if a year later we find out that "Stephen Mills" and
"Steven Mills" are actually the same person? By that time, we may have to go
back and fix a bunch of data records (often problematic) and the Person ID may
have been propagated to other systems (yet more cleanup).

For these reasons, it is recommended to have a Person ID system in place when
using the Person entity.

## Extending the Person Model

As with any other entity in the Ed-FI, the Person entity may be used in
extensions as follows:

* Additional attributes may be added to Person as an extension, for example to
    better effect the integration of a Person ID system.
* Associations can be created from other entities that are best related to the
    generic Person rather than a person-role, like a Survey.
* New person-roles (such the Teacher Prep Data Model TeacherCandidate,
    Applicant, and Prospect) should follow the pattern established by including
    optional association references to Person.
