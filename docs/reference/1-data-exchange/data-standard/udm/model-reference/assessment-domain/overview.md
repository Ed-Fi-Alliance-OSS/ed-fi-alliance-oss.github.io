---
sidebar_position: 1
---

# Assessment Domain - Overview

## Key Entities

The key entities in the Assessment domain are:

* An Assessment entity that describes assessments along with associated
    metadata.  The ObjectiveAssessment entity describes the structure of the
    assessment subcomponents or subtests that are separately scored or
    administered. The AsessmentItem represent the individual questions for cases
    when the student's score on each question is reported.
* A LearningStandard entity that drives the curriculum and the assessments.
    The ObjectiveAssessment and AssessmentItem may reference the learning
    standards which they assess.
* A StudentAssessment entity that holds assessment scores/results and
    administration attributes for a student's attempt at the assessment.  

## Key Concepts

The assessment model is flexible enough to convey results from complex tests
such as the SAT and ACT exams, large summative assessments such as state-level
standardized tests, formative assessments, and simple tests such as classroom
benchmark assessments or quizzes.

The key concepts include the following:

* The overall domain is primarily designed to collect and exchange data that
    is useful in the interpretation of student assessment results at a classroom
    and school-level. The domain is therefore not designed to deliver on use
    cases such as:

  * to recreate assessment instruments fully or provide for assessment or
        assessment item portability across systems
  * to capture precise algorithmic or technical details of scoring systems
  * to gather all data generated from a student's interaction with an
        assessment instrument.
* On this last point, note that there is some focus on gathering student
    inputs during the assessment process, but those are generally limited: the
    assumption is that a  "replay" or more full account of student interactions
    (for example with a complex question or technology-enabled item) would be
    better accomplished by some facility on the host system and that therefore
    the focus is on providing for such linkages to other systems in these cases.
* The LearningStandard entity models the hierarchical organization of learning
    standards for skills and comprehension that are used to drive instruction
    and assessment.
* The ObjectiveAssessment entity reflects a subset of items on an assessment
    that may have its own score, performance levels, or academic subject and
    that can be tied to learning standards.  Objective assessments, when used,
    reflect the subcomponents or subtests of the assessment, and may be arranged
    hierarchically into multiple levels as required.

## Parallel Assessment Metadata and Student Results Data

The Ed-Fi data model for assessments have parallel structures, depicted below,
to:

1. Define the metadata for the assessment in terms of its structure and key
    attributes
2. Provide the results from students' taking the assessment

Every assessment will minimally have an Assessment instance providing the
assessment metadata.  Similarly, every attempt by a student taking the
assessment will minimally have a StudentAssessment instance, providing key
attributes about the attempt and the highest-level assessment score(s).

If an assessment is organized into subcomponents or subtests that score specific
skills or competencies, the structure is defined by ObjectiveAssessment
instances that may be organized into a single sublevel, or may be organized
hierarchically, as needed.  For each ObjectiveAssessment that is defined in the
metadata, the student's results are reflected in  separate parallel instances of
the complex attribute StudentAssessment.StudentObjectiveAssessment.

If an assessment reports results on individual questions, the metadata defining
those questions are reflected as AssessmentItem instances.  For each
AssessmentItem that is defined in the metadata, the student's results are
reflected in parallel instances of the complex attribute
StudentAssessment.StudentAssessmentItem.

![Assessment Explained](../../../img/Assessment%20Explained.png)

## Hierarchical Model

The Ed-Fi data model for assessments contains a number of entities and reference
patterns. While its scope may make it a bit imposing to newcomers, understanding
a few design principles enable it to be easily understood and adopted.

### Assessment and ObjectiveAssessment Example

Many assessments are multi-tier in the sense that they provide multiple scores
or result sets for each assessment. An example would be a single "reading"
assessment that tested multiple skill areas, such as "Reading Comprehension,"
"Accuracy and Fluency," "Phonemic Awareness," and so forth.

In the Assessment domain, the top-level assessment is an Assessment entity and
the skill areas are ObjectiveAssessment entities. This structure is recursive,
so that there can be any number of levels of
ObjectiveAssessments.![ObjectiveAssessments](../../../img/ObjectiveAssessments.png)

Once a student takes an assessment, the results can be modeled in the
StudentAssessment entity with parallel StudentObjectiveAssessment complex
attributes, each of which has references back to its parent or peer entities.

![StudentObjectiveAsessments](../../../img/StudentObjectiveAsessments.png)

### Support for Mapping to Local Learning Standards

Field implementation has shown that, while school systems will intake into their
systems the results of student assessments in areas like "Reading Comprehension"
(in other words, the ObjectiveAssessment entity with student results held in the
StudentObjectiveAssessment entity), they also commonly need to map those
"Reading Comprehension" results to learning benchmarks. The LearningStandard
entity enables the ObjectiveAssessment to be mapped to an education standard.
Further, the LearningStandard entity may be a locally defined benchmark or a
formal, external learning standard, such as one provided by the state or Common
Core State Standards.

The structure looks like this:

![LearningStandards](../../../img/LearningStandards.png)

The source of the data is typically as follows:

|     |     |     |
| --- | --- | --- |
|     | **Ed-Fi Entity** |     |
|     | **ObjectiveAssessment** | **LearningStandard** |
| **Who provides ("owns") the entity data?** | The assessment provider | A third party |
| **Example of a provider** | "DIBELS" | "Common Core State Standards" |

## Sample Mapping

For assessment vendors, it may be helpful to review a sample score report and
see how the individual elements would map to the Ed-Fi Assessment model. The
following is a fictitious math assessment score report, Math Whale followed by a
breakdown of where we would expect the different data points to land within the
Assessment model.

For assessment vendors, it may be helpful to review a sample score report and
see how the individual elements would map to the Ed-Fi Assessment model. The
following is a fictitious math assessment score report, Math Whale followed by a
breakdown of where we would expect the different data points to land within the
Assessment model. Additional information for Assessment Vendors can be found in
the

### A Sample Score Report

A typical classroom score report (for a fictitious provider) might look like
this:

![mathwhale score report](../../../img/mathwhale.png)

_Figure 1: a sample score report (click to expand)_

A mapping of the main elements might look like this (you will see a few new
elements appear here):

![mathwhale annotated](../../../img/mathwhale-annotated.png)

_Figure 2: mappings for sample score report (click to expand)_
