# UML Notation and Conventions

This section explains the principles, patterns, and conventions used for the
Ed-Fi Unifying Data Model.

## Ed-Fi Unifying Data Model

The Ed-Fi Unifying Data Model (UDM) is a conceptual model, and a common
framework for the representation of data in the education domain. The UDM serves
as the enterprise data model which is the basis for all Ed-Fi Data Exchange
Standards.

## Notation

The Ed-Fi UDM is expressed as Unified Modeling Language (UML) Class diagrams to
capture the logical structure of a domain as a set of classes, their features
(attributes), and the relationships (associations) between them. UML Class
diagrams are more useful than Entity-Relationship diagrams to understand the
Ed-Fi Unifying Data Model because they support generalization of classes.

## UML Diagram Conventions

In the Ed-Fi UDM, classes represent the major entities or objects in the
education domain, such as students, teachers, campuses, and locations.
Additionally, classes model non-physical entities in the education space, such
as courses, sections, attendance events, and discipline actions.

![Class](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-Diagram-Convention-1.png)

The class attributes represent properties or characteristics of entities that
are important in the education domain. Complex attributes with many components
are defined as separate classes and referenced as the type of the attribute. For
example, the complex attribute type Address has the components street address,
city, state, and ZIP code. Unless otherwise indicated, attributes are of
cardinality 1, meaning that they are single-valued and required. Other
cardinalities are shown within square brackets.

![Complex Attribute](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-Diagram-Convention-2.png)

Relationships or associations represent logical connections between entities
that are important in our education domain.

![Association](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-Diagram-Convention-3.png)

For example, students are associated with campuses through enrollment. The
direction of an association indicates readability (as in Student HasAssociated
School) in the domain model. The direction of the association has additional
meaning in the XML Schema, indicating the class from which the relationship is
specified. Cardinalities (e.g., 1-to-1, 1-to-many, many-to-many) are shown for
all associations.

An association class is used when an association has attributes. For example,
the date of enrollment is an important attribute of the Enrollment Association
between student and campus.

A generalization association indicates that a more specialized subclass is a
generalization of a broader superclass. For example, a campus or school is a
specialization of the more general Education Organization. The attributes and
associations defined for the superclass are inherited by the more specialized
subclasses. Generalization semantics are compatible with Type extensions in XML
schemas.

![Generalization](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-Diagram-Convention-4.png)

To explain the purpose of certain complex types contained within an entity
class, the following convention is used. Complex attributes may contain
attributes, other complex types, and/or associations.

![Complex Attribute](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/UML-Diagram-Conventions-5.png)

Notes are included in the Ed-Fi Unifying Data Model to explain or elaborate on
points not obvious from the UML model structure or class names.

## Association Labels

The Ed-Fi UDM uses the following association labels. These were originally
adapted from the National Education Data Model (NEDM) project.

### Table 1: Association Labels and Definitions in the Ed-Fi Data Model

| **Label** | **Definition** |
| --- | --- |
| HasAssociated | The object entity has relationship to the associated subject entity |
| HasCausalRelationship | A strong relationship in which one entity causes a change in another entity |
| HasFunctionalComponent | Reflects the construction of an entity through functional components represented by other entities |
| IsDirectProviderOf | Directly provides goods or services |
| IsFunctionalComponentOf | This relation indicates that subject entity makes up, in part or in whole, the function of the object entity |
| IsOrganizationalComponentOf | Used to indicate an organizational structure of non-person entities such as schools, districts, etc. |
| ParticipatesIn | A person-type entity participates in an activity-type entity |
| ProvidesServicesTo | Subject provides services to the object |
| ReceivesServicesFrom | Subject receives services from the object |
| Additional Ed-Fi association types are as follows: |     |
| Defines | Subject defines the data reflected by the object |

## UDM Naming Conventions

The Ed-Fi Data Standard naming conventions are detailed below. Consistent naming
is used across all Ed-Fi technical artifacts.

General naming conventions are as follows:

* Concatenated title case is used for entities, relationships, and
    attributes (e.g., “SchoolId”)
* Names use common terminology for the education industry

Generally, the entity and attribute names align with those of CEDS with the
following exceptions:

* If there is not an analogous name in CEDS
* If the CEDS name does not reflect common terminology or is unnecessarily
    long
* When the CEDS name conflicts with Ed-Fi naming conventions and guidelines

By default, association names are formed as follows:

* Associations with attributes are named by concatenating the two entities
    they relate and ending with “Association”, e.g.,  “StudentSchoolAssociation”
* When there can be two associations between the same pair of entities, a
    semantic discriminator is added, e.g.,
     StaffEducationOrganizationEmploymentAssociation, StaffEducationOrganizationAssignmentAssociation

Extensions to the Ed-Fi Data Standard should carry forward the naming
conventions. The same naming conventions apply to the Ed-Fi UDM, the Ed-Fi REST
API Specifications, and the associated Ed-Fi XML schemas. For additional and
specific rules for how the naming conventions apply to the REST APIs, see [API Design &amp; Implementation Guidelines](../api-guidelines/readme.md).
For the Ed-Fi XML-based data standards, see [XSD Design & Implementation Guidelines](../xsd-guidelines/readme.md).
