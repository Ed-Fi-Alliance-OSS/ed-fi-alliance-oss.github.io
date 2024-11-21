---
sidebar_position: 1
---


# Alternative and Supplemental Services Domain - Overview

## Key Entities

This domain contains:

* A Program entity, which defines programs with services offered by an
    education organization.
* A StudentProgramAssociation entity, which links Program entities to
    participating students.
* A StaffProgramAssociation entity, which links Program entities to assigned
    staff.
* Subclasses for all major US K–12 federal program areas.

## Key Concepts

The key concepts include the following:

* The Program entity covers a very wide range of offerings at educational
    institutions. The base model is designed to cover as many of these as
    possible, but specific subclasses (such as Food Service, CTE, or Special
    Education) are provided for the most common US federal K–12 program areas.
* Note that for Program entities tied to Section entities, attendance may be
    taken separately for the Program entity.
* There may be some overlap between student program associations and student
    demographic information. Details on how to decide where different data
    should be stored can be found in the [Student Identification and
    Demographics Domain - Best Practices](../student-identification-and-demographics-domain/best-practices.md).
