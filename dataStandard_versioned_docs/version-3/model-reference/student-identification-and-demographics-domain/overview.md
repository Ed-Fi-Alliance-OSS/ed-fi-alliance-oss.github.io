---
sidebar_position: 1
---

# Student Identification and Demographics Domain - Overview

## Key Entities

This domain contains:

* The Student entity, which captures important information and characteristics
    of a student.
* The StudentEducationOrganizationAssociation, which captures demographic and
    similar characteristics of a student that are specific to a student's
    relationship with a particular education organization. Note that this entity
    does not have dates attached; it is intended to capture the current
    demographics of a student as assessed by the education organization. It
    should be thought of as a core part of the student record, but scoped to the
    education organization (as such demographic assessments can vary by
    education organization).
* The Parent entity, which spans all variants of a parent or guardian.
* The StudentParentAssociation entity, which links students and parents and
    defines the relationship.

## Key Concepts

The key concepts include the following:

* Parents as well as guardians are stored within the Parent entity in the Ed-Fi
  data model. The Parent entity can also represent other important contacts that
  have been approved by the parent or guardian for contact in cases of emergency
  or even pick-up from school.

* The Parent entity is kept as a separate entity that is related to a Student
  entity through an Association entity. This contrasts other systems that merely
  track parents as elements of student records. This allows contact information
  to be more easily kept up to date for parents with multiple students.

* If extending the Parent entity, be careful to keep any information dealing
  with the relationship on the StudentParentAssociation entity record.
