# Understanding UML, REST API, and Database Expressions of the Ed-Fi Data Model

## Audience and Purpose

Technologists new to the Ed-Fi community can sometimes be confused as they
navigate through multiple different expressions of the Ed-Fi Unifying Data
Model. The core data model — represented in UML with an accompanying Data
Handbook — looks a little different as it is expressed in JSON for API, in
relational database formats, and in other representations. This document helps
technologists navigate key differences in these formats.

The document focuses how various features of the Ed-Fi UDM are materialized in
JSON in the Ed-Fi REST API standards and in a relational format in the Ed-Fi
Operational Data Store.

Ed-Fi XML formats are not covered, due to declining interest in and use of these
by the community.

## Background

The Ed-Fi Unifying Data Model (or UDM; below we will generally refer to this
below as the "Ed-Fi data model") is a data model that is published in Unified
Modeling Language (UML). It has an accompanying Data Handbook, which reproduces
the schema in a narrative format, and provides full element definitions.

The UDM is a **logical** model, which means that it is expressed independent
from any particular physical representation, such as a relational database,
JSON, or XML schema.

The data model consists of entities, associations and attributes, as can be seen
in this small section of the model.

![Ed-Fi Student Parent Model](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-StudentParent.png)

The Ed-Fi Alliance also publishes data exchange standards that are derived from
the Ed-Fi data model: vendors and others use these to interoperate — to send
data in ways that conform to these standards. There are currently 2 data formats
used in these standards:

* JSON - used by the Ed-Fi REST API standards
* XML - used by legacy Ed-Fi "bulk transfer" standards

These downstream standards are sometimes referred to as "**bindings**" for the
data model.

Many are confused to learn that there is no "standard" relational database (or
any other database) binding for the Ed-Fi data model.

Why is that? The main reason is that Ed-Fi data standards are primarily
concerned with **data in transit,** and not **data at rest** (i.e., in storage).

There are many possible ways to store the same data in a database. A relational
system may store it as a set of decomposed tables, while a document centric
model may persist it as a JSON BLOB or text object. An object database may use a
serialized binary format optimized for deserialization into a run-time
environment.

Although there is no standard Ed-Fi database format, the Ed-Fi open source
Operational Data Store (ODS) platform does contain a relational database version
of the Ed-Fi data model. While this format is not a standard per se, it is
clearly very important to the Ed-Fi community. For that reason we include this
schema in our comparison.

## Important Differences in Data Schemas

In the remaining sections of this document, we explore how various features of
the Ed-Fi UDM are expressed in JSON (for the Ed-Fi REST API standards) and in
the Ed-Fi ODS database schema.

In each case we start with the Ed-Fi data model, as it is the source artifact
from which other representations derive.

### Flattening Sub Classes

_Summary: the Ed-Fi data model maintains a rich hierarchy of reusable sub- or
contained classes, and these contained classes are sometimes "flattened" onto
the entity in downstream data models._

A good example of flattening is the "Name" entity. If we look at Student in UDM,
we see a"Name" entity. From the Data Handbook, we can see that Name is composed
of several attributes: a FirstName, a LastSurname, etc.

| UML | Data Handbook |
| --- | --- |
| ![Ed-Fi Name Model](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-name.png) | ![Data Handbook Name](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/DataHandbook-Name.png)<br/><br/>_click to expand_ |

But if we look in the API JSON model and in the ODS database, the elements of
"name" have been flattened directly onto the entity. There is no independent
"Name" entity — its attributes have been added directly to Student.

| API JSON | ODS Database |
| --- | --- |
| ```<br/> {<br/>    "id": "string",<br/>    "studentUniqueId": "string",<br/>    "firstName": "string",<br/>    "generationCodeSuffix": "string",<br/>    "lastSurname": "string",<br/>    "maidenName": "string",<br/>    "middleName": "string",<br/>    [etc.]<br/>}<br/><br/><br/>``` | ![ODS Database](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/ODSDB-student.png) |

We refer to this as a "contained class": Name is contained by Student. Some but
not all contained classes behave this way, but be on the lookout for it if you
find the models in various Ed-Fi expressions do not look similar.

### Collections of Contained Classes

_Summary: when an entity can have multiple instances of a contained class, the
ODS Database will model this via multiple tables; the API model will resemble
the UDM._

The flattening of Name is a simpler case because a student has only one name, so
there is a 1:1 relationship between Student and Name. But what if the contained
class is a collection?

A good example is ElectronicMail — just as Name is is composed of several
attributes, ElectronicMail has several attributes: ElectronicMailAddress,
ElectronicMailType, DoNotPublish indicator, etc. But unlike Name, a Student or
Staff can have multiple ElectronicMails. You can see this in the UML by the
cardinality "0..n" (highlighted below).

| UML | Data Handbook |
| --- | --- |
| ![Ed-Fi Electronic Mail Model](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-electronicmail.png) | ![Data Handbook Electronic Mail](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/DataHandbook-electronicmail.png)<br/><br/>_Click to expand_ |

Collections of contained classes look different in the API and in the database.

In the API, this containment is represented as a hierarchy

```json
{
  "id": "ff5e7ac270494bd091932e283e65b0e2",
  "staffUniqueId": "207265",
  "firstName": "Alvin",
  "lastSurname": "Lee",
  "electronicMails": [
    {
      "electronicMailAddress": "AlvinLee@edfi.org",
      "electronicMailTypeDescriptor": "uri://ed-fi.org/ElectronicMailTypeDescriptor#Work"
    },
    {
      "electronicMailAddress": "alee7782@gmail.com",
      "electronicMailTypeDescriptor": "uri://ed-fi.org/ElectronicMailTypeDescriptor#Personal"
    }
  ]
}
```

In the database, this hierarchy is flattened via a separate table that inherits
the table name and the key of the containing entity. So in this case, we have
two tables: Staff and StaffElectronicMail.

| ODS Database | | --- | | ![ODS Database](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/ODSDB-email.png) |

As you can see, StaffElectronicMail email inherits the key of the containing
table (StaffUSI) and adds to it (ElectronicMailAddress
and ElectronicMailTypeDescriptor). If other entities also have a collection of
ElectronicMails, they will also have tables that follow this pattern.

### Descriptors

_Summary: in the UDM and API, each descriptor is an independent element, but in
the ODS Database, descriptors are centrally managed in a Descriptor table,
producing a different representation._

Descriptors are Ed-Fi's elements that represent enumerations: elements typically
represented in the real world as an option from a predefined code set, such as
GradeLevel.

Descriptors downstream from the UML have some differences in implementation. See
the table below for details:

| UML/Data Handbook | API JSON |
| --- | --- |
| Core model Descriptors, e.g., **GradeLevel** <br/><br/>Example below from Calendar - note that in this case GradeLevel is a collection ("0..n" cardinality).<br/><br/>**![UML](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-calendar.png)<br/><br/>**<br/><br/>_UML_<br/><br/>**![Data Handbook](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/DataHandbook-calendar.png)<br/><br/>**<br/><br/>_Data Handbook_ | In an API resource, descriptors have a "Descriptor" suffix, as in **GradeLevelDescriptor**<br/><br/>```<br/>{<br/>    "id": "string",<br/>    "calendarCode": "string",<br/>    "schoolReference": {<br/>      "schoolId": 0<br/>    },<br/>    "calendarTypeDescriptor": "string",<br/>    "gradeLevels": [<br/>      {<br/>        "gradeLevelDescriptor": "string"<br/>      }<br/>    ],<br/>``` |
| ODS Database |     |
| In the database, all descriptors are managed in a central data structure, so GradeLevel on an entity will appear as **GradeLevelDescriptorID** that references a **GradeLevelDescriptor** table. However, the actual values for entities in that table are held in a central **Descriptor** Table. The key fields highlighted below will all match.<br/><br/>See the example below.<br/><br/>![ODS Database](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/ODSDB-gradelevel.png) |     |

### Implementation-specific Attributes

_Summary: the API JSON and ODS database have some elements not in the Ed-Fi data
model; those elements are specific to those formats and bindings._

As a logical model, Ed-Fi data model is generally the "data elements only." But
when expressed as a physical model in the API JSON or in the ODS database, other
elements specific to those bindings appear.

In the API JSON, users may find additional elements not in the Ed-Fi data model.
If we look at the Location entity, we can clearly see this:

| UML/Data Handbook | API JSON - Standard |
| --- | --- |
| ![Data Handbook Location](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/DataHandbook-location.png)<br/><br/>_Click to expand_ | ```<br/>{  <br/>  "id": "string",  <br/>  "classroomIdentificationCode": "string",  <br/>  "schoolReference": {  <br/>    "schoolId": 0  <br/>  },  <br/>  "maximumNumberOfSeats": 0,  <br/>  "optimalNumberOfSeats": 0,  <br/>  "_etag": "string"  <br/>}<br/><br/>``` |

As we can see from the Data Handbook, Location has 4 elements, but in the API
JSON, it has 6 elements - in the API JSON, it has an **id**, **\_etag** as well.
These elements are specific to the API and API standards, and so do not appear
in the UDM.

In the ODS Database, we will also find the id and but also many more elements —
CreateDate, LastModifiedDate, ChangeVersion, etc. These elements are specific to
the database, and not part of Ed-Fi's standards, and they are not provided by
source systems. Some of these elements — such as ChangeVersion — are also
feature-dependent: they are only present if certain features are enabled.

ODS Database

![ODS Database](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/ODSDB-location.png)

### Inheritance

_Summary: the Ed-Fi data model makes limited use of inheritance, and only uses
inheritance from abstract classes. In the API, the abstract super-classes do not
materialize; rather, their elements appear on the JSON of the sub-class. In the
ODS database, however, the abstract super classes are represented by a table
whose schema contains the common elements of sub-classes (i.e., the attributes
of the abstract super-class)._

The Ed-Fi data model makes limited use of inheritance: cases where there is a
base entity (or super-class) from which sub-classes "inherit" properties of the
super-class. A classic example might be Vehicle - a Car, an Airplane, and a
Train are all examples of a Vehicle, and so some properties we can simply put on
the super-class (such as MaxCapacity or MaxSpeed) rather than adding them to all
sub-classes.

Inheritance (and sub-classing in general) are useful tools in software
development and data modeling, but they also create complexity. As such, the
Ed-Fi data model makes limited use of this feature, only using it where it is
most valuable.

There are 2 abstract classes in the data model:

* EducationOrganization
* GeneralStudentProgramAssociation

If you look at the API endpoints, you will see that there are no endpoints (API
resources) for these entities. Rather, the elements of these entities appear on
their subclasses.

Let's look at a specific example: School, which inherits from (is a subclass of)
the abstract class EducationOrganization.

| UML | Data Handbook |
| --- | --- |
| ![UML EdOrg School](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-EdOrg-School.png) | ![Data Handbook EdOrg School](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/DataHandbook-EdOrg-School.png)<br/><br/>_Excerpt of School entity in the Data Handbook. The subclass relationship is highlighted in red._<br/><br/>_Click to expand._ |

```json
{
  "id": "string",
  "educationOrganizationCategories": [
    {
      "educationOrganizationCategoryDescriptor": "string"
    }
  ],
  "gradeLevels": [
    {
      "gradeLevelDescriptor": "string"
    }
  ],
  "schoolId": 0,
  "charterApprovalSchoolYearTypeReference": {
    "schoolYear": 0
  },
  "localEducationAgencyReference": {
    "localEducationAgencyId": 0
  },
  "administrativeFundingControlDescriptor": "string",
  "charterApprovalAgencyTypeDescriptor": "string",
  "charterStatusDescriptor": "string",
  "identificationCodes": [
    {
      "educationOrganizationIdentificationSystemDescriptor": "string",
      "identificationCode": "string"
    }
  ],
  "institutionTelephones": [
    {
      "institutionTelephoneNumberTypeDescriptor": "string",
      "telephoneNumber": "string"
    }
  ],
  "internetAccessDescriptor": "string",
  "magnetSpecialProgramEmphasisSchoolDescriptor": "string",
  "nameOfInstitution": "string",
  "operationalStatusDescriptor": "string",
  "schoolCategories": [
    {
      "schoolCategoryDescriptor": "string"
    }
  ],
  "schoolTypeDescriptor": "string",
  "shortNameOfInstitution": "string",
  "titleIPartASchoolDesignationDescriptor": "string",
  "webSite": "string",
  "address": [],
  "etc.": [],
  "_etag": "string"
}
```

In the API, there is no EducationOrganization entity, as the class is abstract.
Rather, the elements of the abstract class — elements like NameOfInstitution,
Address, EducationOrganizationCategory — now appear on the School API JSON, the
concrete sub-class of EducationOrganization.

In the ODS database, however, abstract classes like EducationOrganization are
materialized in a table. Where this happens, there is also a column on the
abstract super-class called **Discriminator** added that will hold the type of
the subclass

| ODS Database | | --- | |
![ODS Database EdOrg School](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/ODSDB-EdOrg-School.png)<br/><br/>_Abstract class and its
sub-class in the ODS database. Note the field "Discriminator" on the super
class._ |

This representation looks much more like the data model we see in the UML. In
that representation, the data attributes are stored in either the abstract or
concrete subclass, depending on where that element is in the Ed-Fi data model.
