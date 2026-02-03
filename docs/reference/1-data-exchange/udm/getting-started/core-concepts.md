# Core Concepts

The Ed-Fi Unifying Data Model (UDM) is an enterprise data model of commonly
exchanged, shared, and analyzed K–12 education data. The model includes
**entities** such as students, teachers, assessment results, attendance, and
many others. Those entities contain **attributes** (i.e., properties) that are
also easily recognized. For example, assessment results have things like scores,
the date the assessment was taken, and accommodations. Entities have natural
**associations** (i.e., relationships): for example, students are related to
schools via their enrollments.

![Core Concepts](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/image-2023-5-1_8-58-34.png)

The Ed-Fi UDM is independent of any interchange mechanism, database or data
warehouse storage structure. It is meant to capture the meaning and inherent
structure of the most important information in the K–12 education enterprise in
order to facilitate information sharing of education data.

The purpose of the Ed-Fi UDM is to enable information sharing and reuse of
education data. The Ed-Fi UDM provides a standard means for:

* **Data Description.** Provides a uniform means to describe education data,
    its structure (syntax), and meaning (semantics), thereby supporting its
    discovery and sharing.
* **Data Context.** Facilitates discovery based upon the definition of
    specific education data domains.
* **Data Sharing.** Supports the access and exchange of data based upon
    bindings of subsets of the Ed-Fi UDM to specific structures and protocols
    that provide semantic interoperability between systems.
* **Data Unification or “Harmonization."** Provides the capability to compare
    education data artifacts across systems through a well-defined model that
    unifies the semantics of data artifacts into common entities.

As such, the Ed-Fi UDM forms the foundation for all Ed-Fi data standards and the
products in the Ed-Fi Technology Suite.

## Scope

The scope of the Ed-Fi UDM is K–12 education data relevant to schools, local
education agencies, regional service education agencies, and state education
agencies. The core goal of the Ed-Fi UDM is to capture "student-centric"
information. That is, the data model is optimized to capture data directly
relevant to decision-making as regards student performance. But, the data model
has grown over time into related areas of the K–12 enterprise with important
indirect relations to student achievement such as teacher professional
development.

![Scope](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Ed-Fi%20Scope.PNG)

The Ed-Fi UDM focuses on granular education data for specific students,
teachers, schools, courses, grades, assessments, and so forth. It generally does
not include aggregate data but rather includes the fine-grained source data from
which aggregate data may be calculated.

## Ed-Fi Unifying Data Model Notation and Conventions

### Unified Modeling Language Notation

The Ed-Fi UDM is expressed as Unified Modeling Language (UML) Class diagrams.
UML Class diagrams capture the logical structure of a domain (in this case the
education domain) as a set of entities, attributes, and associations between
entities. More details can be found in the [UML Notation and Conventions](../uml-notation-and-conventions.md).

### Data Handbook

The Data Handbook accompanies the UML and completes the formal description of
the UDM. The Data Handbook contains definitions of entities and other important
information, such as entity keys. The Data Handbook also repeats various
information from the UML notation, such as entity attributes and model
structure.

:::tip

Each version of the Ed-Fi Data Standard has its own Data Handbook, which you
can find from the [version-specific pages](../../data-standards.md). Once you
click on the documentation for a specific Data Standard, look for "Handbook"
in the left-side navigation.

:::

### Naming Conventions

The following naming conventions are used for the Ed-Fi Data Standard, and are
consistent across Ed-Fi technical artifacts.

* Concatenated title case is used for entities, relationships, and
    attributes (e.g., “SchoolId”)
* Names use common terminology for the education industry
* Entity and attribute names generally align with those of CEDS
* Association names are formed as follows:
  * Associations with attributes are named by concatenating the two entities
        they relate and ending with “Association”, e.g.,
        “StudentSchoolAssociation”
  * When there can be multiple associations between the same pair of
        entities, a semantic discriminator is added, e.g.,
        StaffEducationOrganizationEmploymentAssociation, StaffEducationOrganizationAssignmentAssociation

### Key Structure

To improve data quality and maximize the possibility for data to move between
systems, Ed-Fi data models employ a natural key system. In the Ed-Fi UDM, this
means one or more attributes that together define a unique record within an
entity.

You can look up a key for any entity in the [UDM Data
Handbook](../udm-handbook.md). Key
attributes are indicated in the "Identity" column.

![Course Offering Handbooks Key Example](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Course%20Offering%20Handbook%20Key%20Example%20-%20cropped.png)

In the above example showing the Course Offering entity, the key is a Local
Course Code, a School, and a Session. Collectively, these constitute the natural
key.

### Glossary of Terms

The following table is a general glossary of data modeling terms.

| Term | Definition |
| --- | --- |
| Entity | A classifier that describes a set of abstract or real objects that share the same features, constraints, and semantics. |
| Association | A relationship between entities which is used to show that instances of the entities could be linked to each other. |
| Attribute | A property that is owned by an entity. |
