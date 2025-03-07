---
sidebar_position: 4
---
# Best Practice for Student Program Evaluation

## Key Concepts

The Student Program Evaluation domain models data to capture the evaluation of students within the context of a program they are associated with.

A **Program** refers to a school-sponsored or approved recurring activity, event or function, on- or off-school premises, where students are under the jurisdiction of the local education agency (LEA) or are supervised by school staff.  Programs may provide supplemental instruction, training, services, or benefits. Programs may also include organized extracurricular activities for students.

A **Student Program Evaluation** uses an evaluation instrument to appraise a student in the context of a program. Student program evaluations are typically applied by a staff or external evaluator based upon specific criteria or rubric.  Student program evaluations may be used in a wide variety of program contexts to evaluate eligibility or appraise readiness; student qualities or traits of a student; placement upon entry; or performance, achievement, and growth over time.

An **Evaluation Rubric** is a structured guide that articulates specific criteria and elements of the evaluation.  Rubrics contain descriptions associated with a performance scale which inform what different levels of achievement look like.  Rubrics are organized

* Elements represent the lowest level of criteria to be evaluated.
* Rubric dimensions represent the cells of a rubric associated with an element, consisting of a qualitative description, definition, or exemplar associated with each facet of the performance scale.
* In evaluating a student, the evaluator uses the description of the rubric dimensions to assign a numeric rating and/or a rating level for each element of the rubric.
* The rubric may be organized into one or more objectives hierarchically, aggregating elements to reflect higher levels of evaluation criteria.
* For each student, the numeric ratings or performance level ratings of the elements are aggregated, by numeric rating and/or rating level, by objective.

Note there is a difference between a student program evaluation (addressed in this domain) and a program evaluation:

* A student program evaluation appraises individual students according to criteria appropriate for the use of the instrument.
* A program evaluation is a measure of success of the program according to program-level criteria.
It is also important to note the differences between a student program evaluation and an assessment. While both are evaluative of students’ performance and share some structural similarities, there are specific distinctions between the two.
* Assessments are typically quantitatively scored where student program evaluations are qualitatively judged by an evaluator following the criteria in a rubric.
* Assessments may be associated with a school, grade level, academic subject, section or program.  Student program evaluations are only administered in the context of a program.
The Program Evaluation domain has the following entities:
* ProgramEvaluation: An evaluation instrument applied to evaluate a student in the context of a program. Student evaluations are typically applied by a staff member based upon a rubric.
* ProgramEvaluationObjective: A sub component of a ProgramEvaluation, a specific student objective or domain of performance that is being evaluated.
* ProgramEvaluationElement: The lowest level elements or criterion of a students' performance that is being evaluated, typically by a rubric.
* EvaluationRubricDimension: The cells of a rubric, consisting of a qualitative description, definition, or exemplar with the associated rubric evaluation level.
* StudentProgramEvaluation: The evaluation results for a student as evaluated in the context of a program.
Additional details about the Student Program Evaluation domain can be found in [ED-FI WORKING DRAFT 12.](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+12+-+STUDENT+PROGRAM+EVALUATION+DOMAIN+MODEL)

## Student Program Evaluation Process Use Cases

The various use cases associated with student program evaluation process span several Ed-Fi domains as shown below.

| Primary Use Cases | Ed-Fi Entities |
| ----- | ---- |
| * Prior or upon enrollment in program, a student is evaluated for readiness or eligibility.

* Upon entry into a program, the level of performance of the student is appraised to determine the placement of the student or the services to be provided.
* Relevant qualities or traits of the student are evaluated to inform the program as to how best support the student.
* The student’s achievement is evaluated at a point in time to measure the program’s impact.
* The student’s achievement is evaluated at multiple points in time to measure the student’s improvement or growth. | * The metadata defining the student program evaluation is defined using the entities:
* ProgramEvaluation
* ProgramEvaluationObjective
* ProgramEvaluationElement
* EvaluationRubricDimension
* The results of the student program evaluation are captured in the following entity:
* StudentProgramEvaluation |

## Ed-Fi Prerequisites for Writing Student Program Evaluation Domain Entities

The Student Program Evaluation domain has dependencies on other data that should be entered into the Ed-Fi API/ODS prior to entering enrollment information, as follows:

* Yearly API/ODS setup. The best practice convention has a separate API/ODS for each school year. This means that Student Program Evaluations must be written for each school year.

* Descriptor values need to be loaded. The Student Program Evaluation domain has dependency on the following sets of descriptors.
* ProgramEvaluation
  * ProgramEvaluationType
  * ProgramEvaluationPeriod
  * ProgramEvaluationLevel.RatingLevel
* ProgramEvaluationObjective
  * ObjectiveProgramEvaluationLevel.RatingLevel
* ProgramEvaluationElement
  * ElementProgramEvaluationLevel.RatingLevel
* EvaluationRubricDimension
  * EvaluationRubricRatingLevel
* StudentProgramEvaluation
  * SummaryEvaluationRatingLevel
  * EvaluationObjectiveRatingLevel
  * EvaluationElementRatingLevel
* EducationOrganizations, minimally Schools and LocalEducationAgency(s), need to be created for the scope of the ODS.
* Programs need to be loaded that are associated with the ProgramEvaluations.
* Student records need to be written prior to being referenced in a StudentProgramEvaluation.
* Depending on policy, a StudentSchoolAssociation (SSA) may be required prior to a StudentProgramEvaluation.

## Alternative Patterns for the Student Program Evaluation Domain

The Student Program Evaluation domain model supports different levels of complexity and depth for student evaluations.  As shown in the following UML diagram, the model is segmented into the entities that define the criteria and structure of the evaluation (i.e., the metadata) and the entity (as associated commons) that hold the results of each student’s evaluation.

The model is designed to accommodate different levels of detail and structure to meet specific needs, as follows:

* _Summary-level_ program evaluation information only.  This pattern is used when the requirement is just to record just the summary ratings of a student’s evaluation without defining the structure and rubric-based evaluation elements.
* _One-level_ program evaluation consisting of a single level of program evaluation elements and their evaluation rubric dimension definitions.  The students’ program evaluation results are recorded for each program evaluation element as well as the summary-level.
* _Two-level_ program evaluation organizes the various evaluation elements into higher level program evaluation objectives that aggregate and sum the scores from the program evaluation elements.  These program evaluation objectives allow students’ results to be reported at the element, objective, and summary levels.

![Student Program Evaluation Domain ERD](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/student-program-evaluation-domain-erd.png)

The **Summary-Level Option** (shown below) is used to simply record the minimal amount of program evaluation metadata in the ProgramEvaluation entity and the summary ratings of the students in the StudentProgramEvaluation entity.

![Student Program Evaluation Domain Summary](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/student-program-evaluation-domain-summary.png)

The **One-Level Option** (shown below) defines a collection of ProgramEvaluationElements entities and their rubric definitions as EvaluationElementDimensions.  The more detailed student’s results for each ProgramEvaluationElements are recorded in the StudentEvaluationElement common that is part of the StudentProgramEvaluation entity.

![Student Program Evaluation Domain One Level](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/student-program-evaluation-domain-one-level.png)

The **Two-Level Option** (shown below) inserts a hierarchical structure, defining ProgramEvaluationObjectives that aggregate ProgramEvaluationElements. The students’ results at this intermediate level are recorded in the StudentEvaluationObjective common that is part of the StudentProgramEvaluation entity.

![Student Program Evaluation Domain Two Level](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/student-program-evaluation-domain-two-level.png)

## Student Program Evaluation Domain Best Practices

The following best practices are organized below by entity in the Student Program Evaluation Domain,

### ProgramEvaluation

The ProgramEvaluation entity reflects the instrument applied to evaluate a student in the context of a program. Student evaluations are typically applied by a staff member based upon an evaluation rubric. The following table summarizes the best practice use of the ProgramEvaluation attributes.

Best Practice Use of ProgramEvaluation Attributes

| REQUIRED | MUST | RECOMMENDED | AS NEEDED|
| -------  | -----| ----------- | ---------|
|<br>Program (ref)</br><br>ProgramEvaluationTitle</br><br>ProgramEvaluationType</br><br>ProgramEvaluationPeriod</br> | |<br>ProgramEvaluationDescription</br><br>ProgramEvaluationLevel</br><br>EvaluationMaxNumericRating</br><br>EvaluationMinNumericRating</br>||

KEY

* **REQUIRED** attributes in Ed-Fi are hard constraints, meaning that a record or API payload will be rejected if the attribute is not present. These necessarily include key values.
* **MUST** attributes are those whose intended use of the entity requires them to be used, even if, upon creation, they may not be present.
* **RECOMMENDED** attributes are those whose best practices encourage their use.
* **AS NEEDED** attributes are those that should be used when appropriate, based upon policy.

Best practice business rules are shown below.

The EvaluationMaxNumericRating must be greater than the EvaluationMinNumericRating.

### ProgramEvaluationObjective

The ProgramEvaluationObjective entity reflects a sub component of a ProgramEvaluation, a specific student objective or domain of performance that is being evaluated. The following table summarizes the best practice use of the ProgramEvaluationObjective attributes.

Best Practice Use of ProgramEvaluationObjective Attributes

| REQUIRED | MUST | RECOMMENDED | AS NEEDED|
| -------  | -----| ----------- | ---------|
|<br>ProgramEvaluation (ref)</br><br>ProgramEvaluationObjectiveTitle</br> | |<br>ProgramEvaluationObjectiveDescription</br><br>ObjectiveProgramEvaluationLevel</br><br>ObjectiveMaxNumericRating</br> <br>ObjectiveMinNumericRating</br> | <br>ObjectiveSortOrder</br>|

Best practice business rules are shown below.

:::note
The ObjectiveMaxNumericRating must be greater than the ObjectiveMinNumericRating.
:::

### ProgramEvaluationElement

The ProgramEvaluationElement entity is the lowest level elements or criterion of a students' performance that is being evaluated, typically by a rubric. The following table summarizes the best practice use of the ProgramEvaluationElement attributes.

Best Practice Use of ProgramEvaluationElement Attributes

| REQUIRED | MUST | RECOMMENDED | AS NEEDED|
| -------  | -----| ----------- | ---------|
|<br>ProgramEvaluation (ref)</br><br>ProgramEvaluationElementTitle</br> | | <br>ProgramEvaluationElementDescription</br> <br>ElementProgramEvaluationLevel</br><br>ElementMaxNumericRating</br> <br>ElementMinNumericRating</br> | <br>ProgramEvaluationObjective(ref) </br> <br> ElementSortOrder </br>|

Best practice business rules are shown below.

:::note
The ElementMaxNumericRating must be greater than the ElementMinNumericRating.
:::

### EvaluationRubricDimension

The EvaluationRubricDimension entity reflects the cells of a rubric, consisting of a qualitative description, definition, or exemplar with the associated rubric evaluation level. The following table summarizes the best practice use of the EvaluationRubric attributes.

Best Practice Use of EvaluationRubricDimension Attributes

| REQUIRED | MUST | RECOMMENDED | AS NEEDED|
| -------  | -----| ----------- | ---------|
|<br>ProgramEvaluationElement (ref)</br> EvaluationRubricRating | EvaluationCriterionDescription | EvaluationRubricRating Level | RubricDimensionSortOrder|

Best practice business rules are shown below.

:::note
For each ProgramEvaluationElement, two or more EvaluationRubricDimensions must be defined.
:::

### StudentProgramEvaluation

The StudentProgramEvaluation entity captures the evaluation results for a student as evaluated in the context of a program. The following table summarizes the best practice use of the StudentProgramEvaluation attributes.

Best Practice Use of StudentProgramEvaluation Attributes

| REQUIRED | MUST | RECOMMENDED | AS NEEDED|
| -------  | -----| ----------- | ---------|
| <br>ProgramEvaluation (ref) </br><br> Student (ref) </br><br> EvaluationDate </br> | |  <br>SummaryEvaluationNumericRating  </br><br>SummaryEvaluationRatingLevel </br> <br> StaffEvaluatorStaff </br> | <br> EducationOrganization (ref) </br> <br>EvaluationDuration SummaryEvaluationComment ExternalEvaluator </br> <br> StudentEvaluationObjective (common)</br> <br> StudentEvaluationElement (common)</br>|

Best practice business rules are shown below.

:::note
The StudentProgramEvaluation.SummaryEvaluationNumericRating must be greater than or equal to the associated ProgramEvaluation.EvaluationMinNumericRating and less than or equal to the ProgramEvaluation.EvaluationMaxNumericRating.

The StudentProgramEvaluation.StudentEvaluationObjective. EvaluationObjectiveNumericRating must be greater than or equal to the associated ProgramEvaluationObjective.ObjectiveMinNumericRating and less than or equal to the ProgramEvaluationObjective.ObjectiveMaxNumericRating.

The StudentProgramEvaluation.StudentEvaluationElement. EvaluationElementNumericRating must be greater than or equal to the associated ProgramEvaluationElement.ElementMinNumericRating and less than or equal to the ProgramEvaluationElement.ElementMaxNumericRating.
:::
