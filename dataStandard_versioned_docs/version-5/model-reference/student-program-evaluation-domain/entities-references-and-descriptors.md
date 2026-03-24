---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Program Evaluation Domain- Entities, References, and Descriptors

## Student Program Evaluation Model Entities

| Name | Description |
| --- | --- |
| StudentProgramEvaluation | The evaluation results for a student as evaluated in the context of a program. |
| Program| This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| ProgramEvaluation | This entity represents an evaluation instrument applied to evaluate a student in the context of a program. Student evaluations are typically applied by a staff member based upon a rubric." |
| ProgramEvaluationElement | This entity represents lowest level elements or criterion of a students's performance that is being evaluated, typically by a rubric |
| ProgramEvaluationObjective | This entity represents a subcomponent of a ProgramEvaluation, a specific student objective or domain of performance that is being evaluated |
| EvaluationRubricDimension | This entity describes the cells of a rubric, consisting of a qualitative decription, definition, or exemplar with the associated rubric evaluation level |

## Extended References

| Name | Description |
| --- | --- |
| Program | The program associated with the student program evaluation |
| Student | The student being evaluated on behalf of the program |
| EducationOrganization | A reference to the education organization that evaluated the student, which may be different from the education organization associated with the program |
| Staff | Reference to the staff that evaluated the student |

## Student Program Evaluation Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Program | ProgramType | The type of program. |     |     |     |     |
| Program | ProgramCharacteristic | Reflects important characteristics of the program, such as categories or particular indications. |     |     |     |     |
| Program | ProgramSponsor | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). |     |     |     |     |
| ProgramEvaluation | ProgramEvaluationType | The type of program evaluation conducted |     |     |     |     |
| ProgramEvaluation | ProgramEvaluationPeriod | The name of the period for the program evaluation |     |     |     |     |
| ProgramEvaluation | RatingLevel | The title for a level of rating or evaluation band (e.g., Excellent, Acceptable, Needs Improvement, Unacceptable). |     |     |     |     |
| ProgramEvaluationObjective | RatingLevel | The title for a level of rating or evaluation band (e.g., Excellent, Acceptable, Needs Improvement, Unacceptable). |     |     |     |     |
| ProgramEvaluationElement | RatingLevel | The title for a level of rating or evaluation band (e.g., Excellent, Acceptable, Needs Improvement, Unacceptable). |     |     |     |     |
| StudentProgramEvaluation | RatingLevel | The summary rating level achieved based upon the rating or score |     |     |     |     |
| EvaluationRubricDimension | RatingLevel | The rating level achieved for the evaluation rubric dimension. |     |     |     |     |
