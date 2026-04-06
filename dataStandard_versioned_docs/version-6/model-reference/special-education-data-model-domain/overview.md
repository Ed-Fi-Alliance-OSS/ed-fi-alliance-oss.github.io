---
sidebar_position: 1
---

# Special Education Data Model Domain - Overview

:::important

EARLY ACCESS DOMAIN (Released in version 6.1) - This domain is being released in order to allow early adopters a chance to preview and test the proposed update and provide feedback
on its viability for possible future enhancements. This domain should not be considered fully stable at this time. See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.

:::

The Special Education Data Model Domain provides the ability to record and track a student's special education program journey as it evolves.
The **new** domain focuses on the IDEAEvents and StudentIEP as the foundational concepts but allows Organizations to expand their data and reporting beyond.
The IDEAEvent entity can be utilized to track the initial set of  occurrences that identify the Student as needing additional support, such as the
initial request for evaluation, consent of parent or guardian, and beginning of services to the Student. From there the domain expands with the ability
to record the Student's IEP  dates associated for reporting, related IDEAEvents, as well as accommodations and disabilities for the student. The StudentIEP
forms the foundation for the additional entities in the domain. Supporting these entities the SEDM Domain allows for Organizations to track the Prescribed
Services for a student and if/when those services were delivered to the Student as it relates to their IEP via the StudentIEPPrescription and
StudentIEPDelivery entities. Ideally the prescribed services and their delivery culminate in a desired outcome for the student which is recorded on the
StudentIEPGoal entity which define the objectives that each StudentIEP is targeting to accomplish within a defined period.

## Key Entities

This domain contains:

* The IDEA Event entity which captures events related to Special Education for a student.
* The StudentIEP entity which captures information related to a Student's Individual Education Program.
* The StudentGoal entity which captures desired outcomes of the IEP.
* The StudentIEPServicePrescription entity which indicates what type of services (and the providers) have been prescribed
    for delivery to the student in order to meet the Goals associated to their IEP.
* The StudentIEPServiceDelivery entity which records when the prescribed services were provided to the student.

## Key Concepts

The key concepts include the following:

* StudentIEP entity is the foundation for StudentGoal, StudentIEPServicePrescription,
    StudentIEPServiceDelivery, and StudentGoal.

* IDEAEvents can be referenced as an optional collection to all other entities in the SEDM Model.

* New Provider Common used on the StudentIEPServiceDelivery entity can be used to capture both staff and non-staff
    related service providers.
