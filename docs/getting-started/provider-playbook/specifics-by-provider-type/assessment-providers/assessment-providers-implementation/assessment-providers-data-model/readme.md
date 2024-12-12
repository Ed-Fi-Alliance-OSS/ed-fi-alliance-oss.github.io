# Assessment Providers - Data Model

:::info

There are three main kinds of data covered in the Ed-Fi Assessment API: metadata on the assessment instrument, student results, and learning competency alignment information.

:::

## Main Entities

The Ed-Fi assessment data model covers data related to student outcomes and interactions with assessment instruments. There are three main kinds of data captured in the model:

1. _Assessment metadata_ - Data related to the assessment instrument itself - i.e. its title, version, questions, scores to expect, etc.
2. _Student results_ - data related to a student's interaction with an assessment instrument - e.g. which student, the scores, individual responses, accommodations, dates and times, etc.
3. _Learning competency metadata_ - data that indexes the assessment instrument to curricular expectations, such as academic learning standards published by a state, or sequence and objectives relating to an individual school district

These are the core entities of the model, and they correspond to API resources

| Entity | Contains? | Definition |
| --- | --- | --- |
| Assessment | Assessment metadata | Represents a tool, instrument, process, or exhibition composed of a systematic sampling of behavior for measuring a student's competence, knowledge, skills, or behavior. |
| ObjectiveAssessment | Assessment metadata | Represents subtests that assess specific learning objectives. These might be "strands" but they might be other groupings. |
| AssessmentItem | Assessment metadata | Represents one of many single measures that make up an assessment. Typically these are the individual questions that students respond to. |
| StudentAssessment | Student results | Represents the analysis or scoring of a student's response on an assessment. This will contain the scores for all elements included in the Assessment (if they exist) including ObjeciveAssessments and Assessmentitems; these are the sub-objects StudentObjectiveAssessment and StudentAssessmentItem (not API resource, but you will see them in the JSON) |
| LearningObjective | Curricular metadata | Represents identified learning objectives for courses of study in specific grades. |
| LearningStandard | Curricular metadata | A precise statement of the expectation of a student's proficiency, typically defined by a curriculum standards body, such as a state education agency. |

There are a few other concepts that are important in the model and will be covered below.

Let's look at a sample score report and how those elements would map into the model.

[Assessment Domain - Sample Mapping](https://edfi.atlassian.net/wiki/spaces/EFDS32/pages/20187078/Assessment+Domain+-+Sample+Mapping)

## Key Topics

From here, we will go into key topics - you can explore these below. We recommend going through these in order, but feel free to skip ahead if you understand the topic.

* [Key Structure](./key-structure.md)
* [Assessment Entity](./assessment-entity.md)
* [Assessment Scores](./assessment-scores.md)
* [Objective Assessment Entity](./objective-assessment-entity.md)
* [Performance Levels](./performance-levels.md)
* [Learning Standards and Learning Objective Entities](./learning-standards-and-learning-objective-entities.md)
