---
sidebar_position: 1
---

# Enrollment Domain - Overview

## Key Entities

This domain contains:

* The StudentSchoolAssociation entity, which represents a student's enrollment
    in a school.

* The StudentEducationOrganizationResponsibilityAssociation entity, which
    represents an EducationOrganization's (most often LocalEducationAgency's)
    responsibility for a student.

## Key Concepts

The key concepts include the following:

* During enrollment at a school, a student may have associations (e.g.,
    accountability, funding, etc.) with other education organizations at any
    institutional level. For non-enrollment, responsibility-driven associations
    between a student and a school or local education agency (e.g., school of
    accountability), the StudentEducationOrganizationResponsibilityAssociation
    entity is defined.

* A few elements that some external systems may model as directly related to a
    Student entity (e.g., a child's school year) are placed instead on the
    StudentSchoolAssociation entity (which signifies enrollment).

* The StudentEducationOrganizationAssociation is not a part of this domain, as
    those records are not intended to represent a student's enrollment. Some
    student characteristics may be specific to a student's relationship with a
    particular education organization and these are a part of the [Student
    Identification and Demographics
    Domain](../student-identification-and-demographics-domain/readme.md).
