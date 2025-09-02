---
sidebar_position: 1
---

# Education Organization Domain - Overview

## Key Entities

This domain contains:

* A StateEducationAgency entity, which is an optional entity for the state
    department of education or equivalent.
* An EducationServiceCenter entity, which is an optional entity for a regional
    educational service agency between the district and state level.
* A LocalEducationAgency entity, which represents a school district or charter
    management organization.
* A School entity, which represents a point of education instruction.
* The EducationOrganizationNetwork entity represents a self-organized
    membership network of peer-level schools or LEAs intended to provide shared
    services, collective purchasing, or other organizational purpose.
* The OrganizationDepartment entity represents education organizations under a
    State Education Agency, Local Education Agency, or School.
* The AccountabilityRating entity holds education organization ratings
    assigned by an accountability system.

## Key Concepts

The key concepts include the following:

* The Education Organization domain is modeled with a fixed hierarchy that
    must have a StateEductionAgency entity at the top (if present), with
    LocalEducationAgency and School entities under that.
* The EducationOrganization entity is a complex abstraction with basic
    information inherited by specific organization extensions such as School or
    LocalEducationAgency entities.
* In cases where the Ed-Fi data standard is being implemented in LEAs only,
    State and Local Agencies may be essentially duplicates.
* The EducationOrganizationIndicator allows for reporting of organization
    metrics not otherwise defined in the model.

## EducationOrganization Abstract Type

The EducationOrganization entity is one of the few notable abstract base types
in the Ed-Fi data model. This provides the ability for the concrete entities
such as StateEducationAgency, EducationServiceCenter, LocalEducationAgency, and
School to inherit elements common to all education organizations (e.g.,
institution name, address, operational status). Other entities in the Ed-Fi data
model such as Student, Parent, and Staff share common properties – these could
all be considered a type of Person – but are not modeled on abstract type.

Why not base Student, Parent, and Staff on an abstract Person type? A key
distinction that led to the EducationOrganization abstract type is that the
concrete entities cannot be two things at the same time. For example, in the
Ed-Fi data model, a School entity cannot also be a StateEducationAgency and
LocalEducationAgency at the same time. All entities that inherit from
EducationOrganization share characteristics (thus the EducationOrganization base
type), but each entity can only be one type of concrete thing. This is not true,
for example, of the entities participating in our hypothetical Person abstract
type. In the Ed-Fi data model, a person may actually be a parent in one context,
a student in another, and a staff member in yet another context.
