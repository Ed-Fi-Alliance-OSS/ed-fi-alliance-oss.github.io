---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Program Evaluation Domain- Entities, References, and Descriptors

## Student Program Evaluation Model Entities

| Name | Description |
| --- | --- |
| ProgramEvaluation | This entity represents an evaluation instrument applied to evaluate a student in the context of a program. Student evaluations are typically applied by a staff member based upon a rubric." |
| EvaluationRubricDimension | This entity describes the cells of a rubric, consisting of a qualitative decription, definition, or exemplar with the associated rubric evaluation level |
| ProgramEvaluationElement | This entity represents lowest level elements or criterion of a students's performance that is being evaluated, typically by a rubric |
| ProgramEvaluationObjective | This entity represents a subcomponent of a ProgramEvaluation, a specific student objective or domain of performance that is being evaluated |

## Extended References

| Name | Description |
| --- | --- |
| Program | The program associated with the student program evaluation |
| Student | The student being evaluated on behalf of the program |
| EducationOrganization | A reference to the education organization that evaluated the student, which may be different from the education organization associated with the program |
| Staff | Reference to the staff that evaluated the student |

## Student Program Evaluation Domain Descriptors

| Entity | Name | Description |
| --- | --- | --- |
| ProgramEvaluation | ProgramEvaluationType | The type of program evaluation conducted |
| ProgramEvaluationPeriod | The name of the period for the program evaluation |
| StudentProgramEvaluation | RatingLevel | The summary rating level achieved based upon the rating or score |
| EvaluationRubricDimension |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
