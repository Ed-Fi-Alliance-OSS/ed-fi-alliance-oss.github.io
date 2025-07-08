---
sidebar_position: 4
hide_table_of_contents: true
---

# Student Path Domain

:::note
StudentPath is currently part of the [EPDM community extension](https://docs.ed-fi.org/getting-started/educator-pipeline/overview).
:::

This article describes the Student Path Domain for the Educator Preparation Data Model (EPDM), providing the background and rationale, and offers guidance for its application in the field.

## Background

The EPDM model is an extension to do Ed-Fi core model that captures data to allow an Educator Preparation Provider (EPP) to understand and answer key questions relating to educator Candidates, as they progress through the process of being a Student of the EPP, receiving instruction, taking assessments, accomplishing fieldwork and clinical teaching, and getting their teacher certification(s).  The EPDM model supports capturing the results of these processes.  
Feedback from the EPP community indicates a need to capture the student’s detailed Path and track progress against that Path.
Note a similar need has been raised in the K-12 community to similarly capture the student’s detailed graduation Path and track progress against that Path.

## Drivers for the Student Path Domain

The Path for a student to become an educator comprises many steps, including a program sequence of courses offered by the EPP, various assessments, fieldwork in a school, certification exams typically offered by a third party, and certifications from the state education agency.  Candidates are a finisher when they have completed the EPP program, but still must pass their exams for educator certification.
The need to capture the Student Path and track progress against the Path is driven by several requirements to:

* Capture the detailed Path that individual students are assigned.
* Track the student’s progress to the Path, so as to better counsel the student to remain on track.
* Support Paths that may extend back in high school and then into an EPP, for students with an interest in becoming an educator.
* Track the aggregate EPP students’ progress so as to assess and improve the EPP program.
* Track the pipeline of EPP students against the projected needs of the local school districts.
* Target certifications can be matched to available assignments.
* Assess how many EPP finishers complete their certifications.

## Student Path Concepts

A **Path** defines the various requirements for students to achieve an educational goal, for example educator certification, graduation, etc.

* Paths are typically generic Paths to which many students are assigned. Different Paths may be defined for different pathways to certification.
* However, a Path may be customized for a specific student.
* A path entity is identified by a PathName and a reference to an EducationOrganization

The Path is defined along a timeline organized by **PathPhases**, (aka stages) for example,or example school year,student seniority (freshman, sophomore...), or ranges of credits earned.

* A PathPhase entity is identified by a PathPhase Name and a reference to a Path.

The Path is defined by specifying **PathMilestones** to be achieved in each Path Phase. For example, Path Milestones may include courses, assignments, fieldwork, or certifications.

* Path Milestones may be shared amongst Paths. This allows a student to maintain their status if they change Paths that have common Path milestones.
* A PathMilestone entity is identified by a PathMilestoneName and PathMilestoneType.

### Conceptual View Of a Path

![Figure 1](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Conceptual%20View%20Of%20A%20Path.png)

### Structural View of a Path

The hierarchical structure for the three entities: Path, PathPhase, and PathMilestone are shown below.

![Figure 2](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Structural%20View%20Of%20A%20Path.png)

A student is assigned to a Path via a **StudentPath** association and may change paths. Multiple students may be assigned to the same Path.

Students may be tracked through teh PathPhases over time with the **StudentPathPhase**.

* Status may be recorded using a CompletionIndicator and/or by recording more granular PathPhaseStatusEvents (e.g., active, complete, inactive).
* The period(s) when a student is considered “in the phase” can be recorded, if desired, in StudentPathPhasePeriods.
* Recording of StudentPathPhaseStatus is optional.

As students attempt and complete PathMilestones, the appropriate **StudentPathMilestoneStatus** is posted.  

* Status may be recorded using a completion indicator and/or by recording more granular PathMilestoneStatusEvents (e.g., scheduled, attempting, pass, complete, fail, in
    remediation, waiver).
* Multiple PathMilestoneStatusEvents may be posted for the same PathMilestone as the student makes progress.
* The PathPhase when the PathMilestone is completed may optionally be recorded.

The entity structure for the Path definition and the recording of a student’s Path status is shown below.

### Structural View of a Student Path Status

![Figure 3](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Structural%20View%20Of%20A%20Students%20Path%20Status.png)

## Student Path Domain Data Model

The Student Path domain data model is shown below.  Key items of note:

* The Path entity is defined and associated with an EducationOrganization.
* Paths may be generic Paths to which many students are assigned or may be customized for a student.
* Paths may be optionally associated with a GraduationPath.
* Paths must have PathPhases and PathMilestones defined.
* PathMilestones may be referenced in multiple Paths and PathPhases.
* The optional PathMilestoneCode attribute of the PathMilestone is meant to hold a unique identifier associated with the PathMilestone, for example, for a course
    identifier, a certification identifier, or an exam or assessment identifier.
* The StudentPath entity is associated with Student.  In EPDM, Students may be associated with Candidates via the Person entity.
* A StudentPath may be created when the Student is initially assigned to a Path and before there is any status.
* Tracking of StudentPathPhaseStatus is optional; if desired, only StudentPathMilestoneStatus may be used to track status.
* • Status may be tracked simply with the CompletionIndicators or more granularly with *StatusEvents.

![Figure 4](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Path%20Domain%20Data%20Model.png)

The detailed definition of the model is shown in the tables below.

### Path Entity Definitions

**Path**: A scheme for achieving milestones organized by phases for students to follow and be tracked against.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| EducationOrganization| Reference | object | MetaEd DSLDatatype:  DomainEntityProperty | Yes | required | A Reference to the Education Organization  associated with the path |
| PathName | String | string | MetaEd DSLDatatype:  SharedStringProperty  SQL Recommended Datatype:  VARCHAR(60) | Yes | required | The name of the path associated with the path milestone. |
| GraduationPlan | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | No | optional | A reference to the graduation plan associated with this path. |

<br />

**PathPhase**: A stage in the process of a student achieving milestones.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| Path | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the path associated with the phase |
| PathPhaseName | String | string | MetaEd DSL Datatype:  Shared String Property  SQL recommended Datatype:  VARCHAR(60) | Yes | required | The name of the phase associated with the path. |
| PathPhaseSequence | Number | number | MetaEd DSL Datatype:  SharedIntegerProperty  SQL Recommended Datatype: INT | No | optional | Indicates the number in order, starting with 1, that the phases are organized into. |
| PathPhaseDescription | String | string | MetaEd DSL Datatype:  SharedStringProperty  SQL Recommended Datatype:  VARCHAR(256) | No | optional | Additional information describing the path's phase |
| PathPhaseMilestone | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | No |  optional  collection | A reference to the path milestones associated with this phase |

**PathMilestone**: A significant event or achievement as part of a path.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| PathMilestoneName | String | string | MetaEd DSL Datatype:  SharedStringProperty  SQL Recommended Datatype:  VARCHAR(60) | Yes | required | The descriptive name of the milestone |
| PathMilestoneType | Reference | object | MetaEd DSL Datatype:  DescriptorProperty | Yes | required | The type of milestone defined for the student's path |
| PathMilestoneCode | String | string | MetaEd DSL Datatype:  SharedStringProperty  SQL Recommended Datatype:  VARCHAR(60) | No | required | The code or identifier associated with an  element associated with the path  milestone (e.g., course, certification, etc) |
| PathMilestoneDescription | String | string | MetaEd DSL Datatype:  SharedStringProperty  SQL Recommended Datatype:  VARCHAR(256) | No | optional | Additional information describing the path's milestone to be achieved. |

### StudentPath Entity Definitions

**StudentPath**: The entity representing the association or assignment of the student to the path being pursued.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| Student | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the Student Associated with  the Path. |
| Path | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the path associated with or  assigned to the student. |
| Period | Reference | object | MetaEd DSL Datatype:  CommonProperty  Ed-Fi ODS/API Identity: No | No | optional  collection | The time periods for which the student  was assigned and pursuing the path. |

**StudentPathPhaseStatus**: The status of the student's association with the path's phase.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| StudentPath | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the student's path  assignment or association. |
| PathPhase | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the phase in time  associated with the status. |
| CompletionIndicator | Boolean | boolean | MetaEd DSL Datatype:  BooleanProperty  SQL Recommended Datatype:  BOOLEAN | No | optional | Indicator on whether the student has  completed the phase associated with the  path. |
| PathPhaseStatusEvent | Reference | object | MetaEd DSL Datatype:  CommonProperty  Ed-Fi ODS/API Identity: No | No | optional  collection | The student's phase status and the date of  the status change. |
| Period | Reference | object | MetaEd DSL Datatype:  Common Property  Ed-fi ODS/API Identity: No | No | optional  collection | the time period associated with the  phase status. |

**StudentPathMilestoneStatus**: The status of the student's achievement of the path milestone.

| Property | UML Datatype | JSON Datatype | Other | Identity | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- | --- |
| StudentPath | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the student's path  assignment or association. |
| PathMilestone | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | Yes | required | A reference to the PathMilestone against  which the status s being recorded. |
| CompletionIndicator | Boolean | boolean | MetaEd DSL Datatype:  BooleanProperty  SQL Recommended Datatype:  BOOLEAN | No | optional | Indicator on whether the student has  completed the phase milestone. |
| PathMilestoneStatusEvent | Reference | object | MetaEd DSL Datatype:  CommonProperty   Ed-Fi ODS/API Identity: No | No | optional  collection | The student's milestone status and the  date of the status change. |
| PathPhase | Reference | object | MetaEd DSL Datatype:  DomainEntityProperty | No | optional  collection | The phase in time when the milestone   status was achieved. |

### Common Definitions

**Period (Common from Ed-Fi Core)**: The time period for which the information is applicable or effective.

| Property | UML Datatype | JSON Datatype | Other | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- |
| BeginDate | Date | number | MetaEd DSL Datatype: DateProperty  SQL Recommended Datatype: DATE  Ed-Fi ODS/API Identity: Yes | required | The month, day, and year for the start of  the period. |
| EndDate | Date| number | MetaEd DSL Datatype: DateProperty  SQL Recommended Datatype: DATE  Ed-Fi ODS/API Identity: No | optional | The month, day, and year for the end of the  period. |

**PathPhaseStatusEvent (Common)**: An event recognizing the change in status for the path phase.

| Property | UML Datatype | JSON Datatype | Other | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- |
| PathPhaseStatus | Reference | object | MetaEd DSL Datatype: DescriptorProperty  Ed-Fi ODS/API Identity: Yes | required | The student's status associated with  entering or completing the phase. |
| PathPhaseStatusDate | Date | number | MetaEd DSL Datatype: DateProperty  SQL Recommended Datatype: DateProperty  Ed-Fi ODS/API Identity: Yes | required | The month, day, and year on which the   status was achieved for the milestone. |

**PathMilestoneStatusEvent (Common)**: An event recognizing the change in status for the path milestone.

| Property | UML Datatype | JSON Datatype | Other | Cardinality | Definition |
| --- | --- | --- | --- | --- | --- |
| PathMilestoneStatus | Reference | object | MetaEd DSL Datatype: DescriptorProperty  Ed-Fi ODS/API Identity: Yes | required | The student's status associated with the  path milestone. |
| PathPhaseMilestoneDate | Date | number | MetaEd DSL Datatype: DateProperty  SQL Recommended Datatype: DATE  Ed-Fi ODS/API Identity: Yes | required | The month, day, and year associated with  the change in the path milestone status. |
| PathMilestoneStatusDescription | String | string | MetaEd DSL Datatype: SharedStringProperty  SQL Recommended Datatype:  VARCHAR(256) | optional | Additional information associated with the milestone status achieved. |

## Using the Student Path Model

The following diagram provides an example certification path annotated with the using the Student Path domain model.  The example certification path is part of a university-based teacher preparation program.

* The program Path is organized into five PathPhases, as reflected in the vertical columns of the path.
* The program Path is further organized by the various PathMilestoneTypes (a descriptor), as reflected in the horizontal swim lanes.
* The body of the Path lists the individual PathMIlestones, organized by their PathMilestoneType (the horizontal swim lanes) and by the PathPhase (vertical column).

![Figure 5](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Example%20Annotated%20Certification%20Path.png)
