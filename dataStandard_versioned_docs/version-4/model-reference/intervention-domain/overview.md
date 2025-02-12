---
sidebar_position: 1
---

# Intervention Domain - Overview

## Key Entities

This domain contains:

* The InterventionPrescription entity, which describes an activity intended to
    address a specific problem or diagnosis. It identifies the kinds of students
    targeted and how the intervention should be delivered.
* The Intervention entity, which is a specific implementation of an
    instructional approach, outlined in an InterventionPrescription entity.
* A StudentInterventionAttendanceEvent entity which captures attendance and
    participation for interventions.
* A StudentInterventionAssociation entity, which links students to
    interventions in which they participate.
* Data about a formal InterventionStudy entity for an InterventionPrescription
    entity may also be associated with an InterventionPrescription.

## Key Concepts

The key concepts include the following:

* The InterventionPrescription entity is a course of action designated by
    appropriate personnel to remedy an academic or behavioral issue, while the
    Intervention entity is the resulting action requiring participation by the
    student.

* The StudentInterventionAssociation entity captures data related to the
    student's participation in the entity, such as the effectiveness or dosage.
* Interventions can be tied to a Cohort entity, but only through the
    StudentInterventionAssociation entity.
* Interventions may be one-time actions or recurring actions over time. The
    StudentInterventionAttendanceEvent can be used to capture the record of a
    student's participation in an intervention.
* Dosage in the model
  * Prescribed time for an intervention is stored in Dosage elements. These
        may be a range of recommended time in minutes (e.g., MinDosage and
        MaxDosage in the Intervention and InterventionPrescription entities) or
        prescribed time in minutes for a particular student (e.g., Dosage in the
        StudentInterventionAssociation entity).
  * Actual time spent in an intervention is captured via the
        InterventionDuration element on the StudentInterventionAttendanceEvent
        entity.
* EducationContent metadata may be linked to InterventionPrescription entities
    and/or Intervention entities. The EducationContent entity includes
    descriptive information about the content, and was derived from the metadata
    model for the Learning Resource Metadata Initiative (LRMI).
