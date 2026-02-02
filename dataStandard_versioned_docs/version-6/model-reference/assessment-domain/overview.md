---
sidebar_position: 1
---

# Assessment Domain - Overview

The Ed-Fi Assessment domain was intentionally designed to accommodate the significant variability inherent in K–12 assessment data. Assessment providers differ widely in structure, purpose, scoring models, and reporting conventions, and these characteristics continue to evolve over time. To address this diversity, the Assessment domain adopts a flexible conceptual model that enables a broad range of assessment types, formative, interim, summative, diagnostic, and specialized measures to be faithfully represented. Rather than enforcing a rigid or prescriptive structure, the domain allows exam data from disparate assessment frameworks to be modeled in a consistent yet adaptable way, ensuring interoperability while preserving the integrity and intent of each assessment’s results.

This overview introduces the Ed-Fi Assessment domain’s design and its approach to conceptualizing assessment the structures and student performance data across a diverse set of assessment exam models.

Once the conceptual structure is clear, review Assessment Best Practices and Use Cases. Detailed technical guidance for assessment implementation is available in the [Technology Providers Implementation Playbook](/getting-started/provider-playbook/).  

## Key Entities

The key entities in the Assessment domain are:

* Assessment describes assessments and their metadata, including the overall structure and scoring.
* ObjectiveAssessment describes subcomponents or subtests that may have their own score, performance levels, or academic subject.
* AssessmentItem represents the individual questions that comprise the exam. AssessmentItem is used when the score report includes—and use cases call for—a
    student’s performance on each item.
* LearningStandard ties the assessment to the curricular standards assessed and models the hierarchical organization of learning standards that are used to
    drive the assessment. ObjectiveAssessment and AssessmentItem may also reference LearningStandard.
* StudentAssessment represents a student’s performance or score results for a specific assessment administration .

## Key Concepts

The Assessment model is designed to collect and exchange data that is useful to education professionals in interpreting student performance at the classroom, school, and district levels. It is structured to allow implementers to define and load information in a way that most closely reflects and preserves the original exam’s structure, hierarchy, curricular or learning standard alignment and scoring protocols. It is flexible enough to convey the structure and results for a variety of exams, ranging from developmental screeners to state summative exams.

## Parallel Assessment Metadata and Student Results Data

The  Assessment data model defines assessment metadata (Assessment) and student results (StudentAssessment) data into parallel structures. Assessment reflects the assessment’s structure and key attributes and StudentAssessment provides the results for students taking the assessment. Every assessment will include at least one Assessment instance that provides the assessment metadata. Every attempt by a student taking the assessment will have a StudentAssessment instance providing key details about the attempt and score(s).

Likewise, when an assessment is organized into subcomponents or subtests that score specific skills or competencies, this more granular structure is defined by ObjectiveAssessment. This may be expressed as a single sublevel or multiple sublevels that are organized hierarchically, as needed. For each defined ObjectiveAssessment, the student’s results are reflected in StudentAssessment.StudentObjectiveAssessment.

If an assessment report includes results for individual questions, the metadata defining each question is reflected as an AssessmentItem instance. For each AssessmentItem defined in the metadata, the student’s results are reflected in parallel instances of the complex attribute StudentAssessment.StudentAssessmentItem.

![StudentAssessment](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_StudentAssessment.png)

## Hierarchical Modeling of Assessments and Objectives

To accommodate such a range of assessment approaches, as well as the granularity of a variety of use cases, assessment vendors and implementers need to leverage the model’s hierarchical structure to nest objectives within higher-level concepts and items within objectives. The Assessment entity represents the top-level assessment definition and ObjectiveAssessment represents the skill areas. This structure is recursive, so there can be any number of levels of ObjectiveAssessments.

Many assessments provide multiple scores or result sets. For example, a single “Reading” assessment may test multiple skill areas, including “Reading Comprehension”, “Accuracy and Fluency”, and “Phonemic Awareness”. These would be defined as ObjectiveAssessments and associated with the highest-level Assessment.

![ObjectiveAssessment](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_ObjectiveAssessment.png)

Domain Key entities:

![AssessmentKeyEntities](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_KeyEntities.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_KeyEntities.png)

The Assessment hierarchy can be imposing to newcomers. Additional design principles and examples are available under [Assessment Domain Best Practices and Use Cases](best-practices.md).

A student’s results on the assessment can be modeled in the StudentAssessment entity with parallel StudentObjectiveAssessment complex attributes, each of which has references back to its parent or peer entities.

![StudentAssessment](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_StudentAssessment.png)

## Providing Curricular Context through LearningStandard

The LearningStandard entity enables the ObjectiveAssessment to be mapped to an education standard. The standard may be created, defined, and governed at a national level by a consortium of educators, by a state department of education or governing body, or by the local district. LearningStandards should also be defined in Ed-Fi in a way that accurately reflects their hierarchical definition, and the analyst should take care to ensure that the selected standard is the correct match for each level of ObjectiveAssessment.

The relationship looks like this:

![ObjectiveAssessmentLearningStandard](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_ObjectiveAssessmentLearningStandard.png)

LearningStandard modeling aligns to the standards guidance used by the assessment creator and depends upon the purpose of the exam. Learning standards are also often structured hierarchically, beginning with top-level concepts and moving down to more specific curricular points.

## Assessment Identifiers

"Identifiers" were introduced into the Assessment domain as partial surrogate keys to allow the source systems employed by assessment organizations to use their internally unique identifiers instead of adhering to a natural key system created by the education organizations. Namespace ensures that the identifiers created by an assessment organization are unique within a district or state ODS.
The intent was to allow Assessment to be identified by:

1. An internal key for the assessment, potentially even a computer-generated number that is used to populate the data into the API.
2. A namespace reflecting the uri for the assessment organization.
This pattern of an Identifier + Namespace was introduced for Assessment, ObjectiveAssessment, and StudentAssessment.
However, assessment scores are often obtained from results files that may not directly contain metadata about the assessment or objective assessments.  These files are loaded into the ODS in batch mode. These loaders must create identifiers by convention and thus there is great amount of variance and in some cases misunderstanding on how best to do this. There is a temptation to create complex patterns of identifiers, **but this is not necessary**.

To best understand, it is important to consider the key structures, as follows:

| Entity | Composite Key |
| --- | --- |
| Assessment | _AssessmentIdentifier_ Namespace |
| ObjectiveAssessment | ·Assessment reference <br /> AssessmentIdentifer _Namespace_ IdentificationCode |
| AssessmentItem | ·Assessment reference <br /> AssessmentIdentifer _Namespace_ IdentificationCode |
| StudentAssessment | ·Assessment reference <br /> AssessmentIdentifer _Namespace_ Student reference _StudentUniqueId_ StudentAssessmentIdentifier |

### Assessment Identifier

The composite key for Assessment is:

1. Namespace is the uri of the source assessment organization (ex. the namespace “[uri://act.org]” for the ACT exam).
2. AssessmentIdentifer needs to uniquely identify the specific assessment within the context of the assessment organization, consisting of:
    * Internal ID for the assessment by the assessment organization, or
    * Short identifier for the assessment that is unique within the organization across the various assessments they offer. For example, there could be “ACT”
      and “ACT Practice” assessments that are offered.
    * Optionally a string representing the version of the assessment, as it may be pertinent such as:
        * Version number, such as 3.2; or
        * Year or school year, such as 2021
    * NOT the assessment organization, since this is reflected in the namespace

### ObjectiveAssessment IdentificationCode

The composite key for ObjectiveAssessment is:

1. Namespace is the uri of the source assessment organization (ex. the namespace “[uri://act.org]” for the ACT exam).
2. AssessmentIdentifer is the unique identifier for the specific assessment within the context of the assessment organization.
3. IdentificationCode for the ObjectiveAssessment needs to uniquely reflect the “subtest” in the context of the AssessmentIdentifier and the Namespace.
    * Internal ID for the objective assessment by the assessment organization, or
    * Reflect the topic of the objective assessment, for example Mathematics, Reading, Science, Writing, etc.
    * NOT the assessment or assessment organization, since that is reflected in the AssessmentIdentifer and the Namespace.

### AssessmentItem IdentificationCode

The composite key for AssessmentItem is:

1. Namespace is the uri of the source assessment organization (ex. the namespace “[uri://act.org]” for the ACT exam).
2. AssessmentIdentifer is the unique identifier for the specific assessment within the context of the assessment organization.
3. IdentificationCode for the AssessmentItem needs to uniquely reflect the item in the context of the AssessmentIdentifier and the Namespace. This is typically either:
    * Internal ID for the assessment item by the assessment organization, or
    * A unique identifier of the item from the test bank; or
    * A generated number, potentially even a sequence number

### StudentAssessment IdentificationCode  

The composite key for StudentAssessment is:

1. Namespace is the uri of the source assessment organization (ex. the namespace “[uri://act.org]” for the ACT exam).
2. AssessmentIdentifer is the unique identifier for the specific assessment within the context of the assessment organization.
3. StudentReference consisting of the StudentUniqueID
4. StudentAssessmentIdentifier for the student’s results from an Assessment. The only uniqueness requirement is to distinguish between multiple times the student takes the same assessment.  
    * Possible Values
        * A booklet (if paper) or session ID (if electronic), or
        * The assessment vendor’s ID for the student, or
        * The ID for the student obtained from rostering, or
        * An internal ID for the student’s results for this administration
    * NOT the assessment or assessment organization, since that is reflected in the AssessmentIdentifer and the Namespace.
    * NOT the Ed-Fi StudentUniqueID since it is already part of the key.
