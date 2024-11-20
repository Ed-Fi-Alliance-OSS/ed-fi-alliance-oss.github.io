---
sidebar_position: 1
---

# XSD Guidelines - Scope

The essential features that characterize an Ed-Fi XSD specification are the data model that serves as its basis.

## Data Model

The [Ed-Fi Unifying Data Model](../data-standard/udm.md) [UDM] provides the basis for the data exchanged via Ed-Fi Bulk XML standards. The Ed-Fi UDM is a structured, conceptual model of common K–12 education data. The model includes entities that are easily recognized by educators and administrators: schools, students, teachers, attendance, grades, assessment results, and many others. These entities contain attributes (i.e., properties) that are also easily recognized. For example, assessment results contain data, such as a score and the date the assessment was administered. The UDM also includes associations (i.e., relationships) between entities, such as the association between students and schools.

Ed-Fi-aligned XSD specifications are generally built around entities that define nouns. In the education domain, these nouns include such things as schools, students, and teachers. In the Ed-Fi UDM these nouns have been rigorously defined as "entities," with specific attributes and associations. Compositions of entities, with their attributes and associations, are called "domain aggregates." These are identified from the Ed-Fi UDM according to the principles of Domain-Driven Design (DDD).

The full Ed-Fi UDM covers a broad set of information, and so it is impractical to send the entire representation of the UDM via a single XML document. Instead, the Ed-Fi Alliance publishes interchange standards as XSD that reference a common XSD Core, but that are composed of different logical sets of information that make sense to transfer in a single exchange. By referencing a standardized XSD Core, similar information will adhere to the same standards even when exchanged via a different specification.

:::tip

See, e.g., Evans, Eric, et al. (2006), _[Domain-Driven Design Quickly](http://www.infoq.com/minibooks/domain-driven-design-quickly)_, C4Media Inc., for a brief outline of Domain-Driven Design principles.

:::

## Ed-Fi Domain Scope

The Ed-Fi Unifying Data Model is organized into 16 base domains:

* Alternative/Supplemental Services
* Assessment
* Bell Schedule
* Discipline
* Education Organization
* Enrollment
* Finance
* Graduation
* Intervention
* School Calendar
* Staff
* Student Academic Record
* Student Attendance
* Student Cohort
* Student Identification and Demographics
* Teaching and Learning

These domains are generally well-recognized in the K–12 education data space.

Additional subdomains pre-defined in the Ed-Fi UDM are for specific and relatively common instances of Alternative/Supplemental Services:

* Career and Technical Education
* Migrant Education
* Special Education
* Title I Part A Services
