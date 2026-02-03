---
sidebar_position: 1
---

# Student Identification and Demographics Domain - Overview

## Key Entities

This domain contains:

* The Contact entity, which spans all variants of a parent or guardian.
* The ContactIdentificationCode entity, which captures the system identification codes
    associated to a given Contact record and links to an education organization.
* The Person entity, which captures which Person record the Student is linked to.
* The Student entity, which captures important information and characteristics
    of a student.
* The StudentDemographic entity, which captures demographic characteristics of a student.
* The StudentDirectory entity, which captures contact information of a student.
* The StudentIdentificationCode entity, which captures the system identification codes
    associated to a given Student record and links to an education organization.
* The StudentEducationOrganizationAssociation, which captures characteristics of a
    student that are specific to a student's relationship with a particular
    education organization. Note that this entity does not have dates attached; it
    is intended to capture specific indicators and characteristics of a student as
    assessed by the education organization. It should be thought of as a core part of
    the student record, but scoped to the education organization.
* The StudentContactAssociation, which links students and parents and
    defines the relationship.

## Key Concepts

The key concepts include the following:

* Parents as well as guardians are stored within the Contact entity in the
    Ed-Fi data model. The Contact entity can also represent other important
    contacts that have been approved by the parent or guardian for contact in
    cases of emergency or even pick-up from school.

* The Contact entity is kept as a separate entity that is related to a Student
    entity through an Association entity. This contrasts other systems that
    merely track parents as elements of student records. This allows contact
    information to be more easily kept up to date for parents with multiple
    students.

* If extending the Contact entity, be careful to keep any information dealing
    with the relationship on the StudentContactAssociation entity record.

* The StudentIdentificationCode entity holds the different identity codes for a
    student by education organization. Previously this information was stored on
    the StudentEducationOrganizationAssociation but was broken out into a separate
    entity to simplify updates and expand flexibility.

* The StudentDemographic entity holds the demographic information belonging to a student
    by education organization. Previously this information was stored on the
    StudentEducationOrganizationAssociation but was broken out into a separate entity
    to simplify updates and expand flexibility.

* The StudentDirectory entity holds the contact information for a given student by
    education organization. Previously this information was stored on the
    StudentEducationOrganizationAssociation but was broken out into a separate entity
    to simplify updates and expand flexibility.

* StudentEducationOrganizationAssociation holds indicators that do not easily or
    immediately fall into the other categories outlined above. Information tracked by
    the StudentEducationOrganizationAssociation contains the information such as Cohort
    Year, LoginId, DisplacedStudent, and indicators related to a student's internet access.
