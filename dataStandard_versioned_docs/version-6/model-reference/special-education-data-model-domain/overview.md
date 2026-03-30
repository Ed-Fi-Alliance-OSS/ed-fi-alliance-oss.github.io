---
sidebar_position: 1
---

# Special Education Data Model Domain - Overview

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

* The Provider Common used on the StudentIEPServiceDelivery entity can be used to capture both staff and non-staff
    related service providers.
