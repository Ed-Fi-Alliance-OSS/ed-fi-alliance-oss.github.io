---
sidebar_position: 4
---

# Discipline Domain - Best Practices

## Summary

With the Data Standard v3.3-a release, a number of changes were introduced to
the Discipline domain. New entities, like the
StudentDisciplineIncidentBehaviorAssociation and
StudentDisciplineIncidientNonOffenderAssociation were introduced while the
previously used StudentDisciplineIncidentAssociation was deprecated. The
following documentation is an attempt to clarify best practices of how to store
the Discipline data given these recent changes.

## Locations for the Behavior Descriptor

The Behavior descriptor captures the nature of the behavior of an individual
involved in a discipline incident.  This descriptor is located in a few places
within the Discipline domain. Namely:

1. as an optional collection on DisciplineIncident
2. as a required field on the new StudentDisciplineIncidentBehaviorAssociation
3. as an optional collection on the deprecated
    StudentDisicplineIncidentAssociation

The Alliance advises avoiding use of deprecated elements, so usage of the
Behavior collection on StudentDisicplineIncidentAssociation is not recommended.

## Use Cases

There are four identified use cases these elements address.

### Behaviors in an Incident

In a DisciplineIncident, it is assumed that there may be multiple behaviors
performed by multiple students within a single incident. For this reason, the
Behavior descriptor is an optional collection on DisciplineIncident. All
behaviors associated with the incident SHOULD be recorded here, regardless of
which student or non-student participant was responsible for each Behavior.

### Student Behaviors

The second use case is to tie these behaviors to the individuals responsible. To
do this, use the StudentDisciplineIncidentBehaviorAssociation. In the new
entity, Behavior is a part of the key and so must be defined. If a student is
responsible for more than one behavior in a single incident, multiple
StudentDisciplineIncidentBehaviorAssociation records will be created.

Note that this use case was previously handled via the
StudentDisciplineIncidentAssociation, but that entity is now deprecated.

### Behavior Consequences

The final use case is to tie these students and behaviors to a DisciplineAction.
There is a new collection of optional references on DisciplineAction to
StudentDisciplineIncidentBehaviorAssociation. This allows for multiple behaviors
to be tied to a single action.

Alternatively, if there are different actions required for each behavior,
multiple DisciplineAction records can be created to reference each
StudentDisciplineIncidentBehaviorAssociation record.

### Capture of Non-offender Data

The last new entity, StudentDisciplineIncidientNonOffenderAssociation does not
include Behavior descriptor as it is assumed there is no Behavior or
DisciplineAction required for students that were not the perpetrators of the
incident.
