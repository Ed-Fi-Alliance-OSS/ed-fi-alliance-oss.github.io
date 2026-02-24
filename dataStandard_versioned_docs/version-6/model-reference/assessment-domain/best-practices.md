---
sidebar_position: 4
---

# Assessment Domain - Best Practices and Use Cases

The Ed-Fi Assessment Domain is intentionally designed to support a wide range of assessment types, from state summative assessments, college readiness assessments to classroom benchmarks and quizzes. Its flexibility allows for assessment data to be modeled in a way that preserves the structure, scoring logic, and instructional intent of the source assessment.

Successful implementation depends less on the terminology of individual entities and more on a conceptual understanding of the model’s hierarchy, components, and relationships. By applying consistent modeling practices and aligning to the assessment’s underlying design, vendors and implementers can ensure that results are structured and visualized accurately across diverse use cases.

The guiding principle is to reflect the source assessment’s structure, context, and nuance as faithfully as possible, enabling accurate analysis and meaningful interpretation.educators, program leaders, and policy professionals to support decision-making in the classroom and beyond.

## Resources for Understanding Assessments

Ed-Fi enables K–12 assessment data to be seamlessly and interoperably integrated for it is imperative that the integrated data and downstream visualizations are as reflective of the actual test’s intent, structure, and context as possible. Ed-Fi-compliant assessment vendors structure their integrations to best represent their assessment tools within the Ed-Fi model; however, the national P-20 system leverages hundreds of assessments to monitor student development, readiness, performance, and outcomes.

* Mapping of assessment model to samples (flat file, and theoretical)
* Industry implementation of assessment mapping (open source)
  * To  support standardization, implementers have shared their [mappings](https://github.com/edanalytics) for dozens of assessments representing major categories, including state summative assessments, benchmark assessments, college readiness exams, and early childhood assessments. Analysts may replicate these mappings or use them as guidance if mapping an assessment is not included in the repository.

When mapping a new assessment or designing a downstream visualization, it is important that analysts take advantage of an array of documentation and vendor guidance, including:

* Technical documentation and flat results files that show the data available and define elements and values;
* Educator-facing classroom-level score reports that offer important metadata, context or descriptions and show the hierarchical structure and how scores do or do not roll up; and  
* Professional development and training resources that guide educators’ understanding and interpretation of test components, scores, and performance levels .

Effective assessment implementation is a combination of the successful application of the domain model, mapping, data and business analysis, visualization design, and governance. Suggested best practices are provided below. For a full review of assessment implementation, see the [Ed-Fi Technology Providers Implementation Playbook](/getting-started/provider-playbook/).

## Assessment Hierarchy

Determining the assessment’s hierarchy is one of the most important steps in mapping. The hierarchy has implications for titles, identifiers, descriptors and score structures.

Best practices and notes regarding hierarchy are included below. To better understand the conceptual structure of the domain, see the [Assessment Domain Overview](overview.md).

* Assessment titles should be defined in a way that is distinct, descriptive, and consistent to allow for student performance to be compared across years.
* Assessment is the highest level of the hierarchy. Assessments have at minimum, a title and a single subject (including “composite” ). This level includes the overall score and performance level. Except in the case of redesign, top-level scores and performance levels can be generally compared across years and administrations.
* Assessments can have one or more objective levels, usually called sub-tests or component tests. They also have their own scores that inform, but do not always directly add up to, the overall score. ObjectiveAssessment.ParentObjective nests these levels correctly within the hierarchy and creates relationships between the objectives.
* An objective level may be related to one or more parent objectives, allowing for more robust or nuanced analysis. Some assessments, including developmental screeners, may include objectives comprised of skills assessed in isolation in other parts of the test.

    Example: A theoretical assessment includes three objectives--Listening, Speaking, and Language. Each objective is defined separately and has its own score. Due to the compound nature of the Language objective on this assessment, its score considers and weights items from the Listening and Speaking objectives.

    Ed-Fi allows the analyst to relate the Language objective to both the Listening and Speaking subject areas. However, the analyst should not attempt to recalculate an overall Listening or Speaking score/performance level by splitting components of the Language objective (unless such a rollup is available in the assessment vendor’s score report).

Note that when a use case requires multiple related assessments to be compared in a visualization or analysis, it can be helpful to define the assessments using a similar structure, if possible.

Creating a diagram of the assessment, its sections, and their scores prior to mapping allows the analyst to more easily visualize how it fits into the Ed-Fi model. It also helps to identify the level of granularity necessary to meet the requirements of selected use cases. See an example hierarchy diagram for a college readiness exam and its translation to Ed-Fi below.

![College Readiness Exam](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_CollegeReadinessExam.png)

![Assessment Ed-Fi Mapping](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Assessment_Ed-FiMapping.png)

## Scores and Performance Levels

Scores at all levels of the assessment hierarchy should be loaded as defined and provided by the assessment vendor. Implementers should not attempt to calculate scores, as information related to weighting or score composition may be unavailable or inconsistent across administrations.

Guidance for defining Assessment and StudentAssessment for a basic summative assessment are included below.

### Assessment

#### Overall Scores

Score elements should reflect the total number of points available. To define an assessment’s overall minimum and maximum score, use an AssessmentReportingType descriptor value of “Number score” and a ResultDataType descriptor value of “Decimal.” Round to two decimal places which are always present.

For a test with a maximum score of 50 points:

```json
"scores": [
    {
        "assessmentReportingMethodType": "Number score",
        "resultDatatypeType": "Decimal",
        "maximumScore": "50.00",
        "minimumScore": "0"
    }
]
```

#### Performance Levels

The assessment may also define performance levels that are linked to a student’s overall score. A unique consideration is that performance levels may be either inclusive or exclusive. Best practice is to make the MinimumScore for the performance level band to be inclusive, while the MaximumScore would not be considered part of the band. If it is possible for students to achieve better than 100% on a performance level, omit the MaximumScore value for the top performance level.

In the example below, the four performance levels are expressed as percentages of the overall points score.

```json
"performanceLevels": [
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "http://namespace.com/Advanced",
        "minimumScore": "90",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "http://namespace.com/Proficient",
        "minimumScore": "80",
        "maximumScore": "90",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "http://namespace.com/Basic",
        "minimumScore": "70",
        "maximumScore": "80",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "http://namespace.com/Below Basic",
        "minimumScore": "0",
        "maximumScore": "70",
        "resultDatatypeType": "Percentage"
    }
]
```

Defining scores and performance levels for the Assessment will allow for the loading of the student’s overall/composite score and overall/composite performance level (see StudentAssessment section below). This may be sufficient to power an overview dashboard or determine if a student has taken and passed or achieved the desired performance level on an assessment but will include no information about sub-tests, which are defined through ObjectiveAssessment.

#### ObjectiveAssessment

For objective-level scores, use an AssessmentReportingType descriptor value of "Raw score" and for the ResultDataType descriptor value we recommend "Percentage", as shown in the example json below.

```json
"scores": [
      {
          "assessmentReportingMethodType": "Raw score",
          "resultDatatypeType": "Percentage"
      },
```

When performance levels are reported at the objective level, use an AssessmentReportingMethodType descriptor value of "Raw score" and a ResultDataType descriptor value of "Percentage". We recommend no decimal places. The same considerations regarding the inclusive or exclusive nature of the performance level from the overall assessment should be considered at the objective level.

```json
"performanceLevels": [
    { 
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "[http://namespace.com/Advanced](http://namespace.com/Advanced)",
        "minimumScore": "90",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "[http://namespace.com/Proficient](http://namespace.com/Proficient)",
        "minimumScore": "80",
        "maximumScore": "90",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "[http://namespace.com/Basic](http://namespace.com/Basic)",
        "minimumScore": "70",
        "maximumScore": "80",
        "resultDatatypeType": "Percentage"
    },
    {
        "assessmentReportingMethodType": "Raw score",
        "performanceLevelDescriptor": "[http://namespace.com/Below](http://namespace.com/Below) Basic",
        "minimumScore": "0",
        "maximumScore": "70",
        "resultDatatypeType": "Percentage"
    },
]
```

### StudentAssessment

#### OverallScore

Because Assessment and StudentAssessment are structured in parallel, the same descriptor values should be used when reporting a student’s assessment reports.

For a student who scored 37 out of the maximum 50 points:

```json
"scoreResults": [
    {
        "assessmentReportingMethodType": "Number score",
        "result": "37.00",
        "resultDatatypeType": "Decimal"
    },
],
```

The score represents a 74%, which falls in the Basic performance level.

#### ObjectiveScore

For performance on an objective, the score results will appear as follows:

```json
"scoreResults": [
   {
       "assessmentReportingMethodType": "Raw score",
       "result": "42.86",
       "resultDatatypeType": "Percentage"
   }
 ],
```

This score also falls in the Basic performance level at the objective level.

## Learning Standards

Learning standards alignment provides curricular and conceptual context and can power visualizations that let educators who use multiple classroom assessments review student performance across concepts.  If aligning to learning standards, ensure that you are referring to the correct version—not just the correct standard number. Many classroom or formative assessments have an item bank that is built over time and may include valid questions that are tied to multiple versions of a standard. This is especially important following a new issuance or update to standards.

## Grade Levels and School Year

Grade level and school year are very important contextual information.

Grade level is included in Assessment and StudentAssessment. Assessment.AssessedGradeLevel defines one or more grade levels for which the assessment is explicitly designed. StudentAssessment includes two types of grade level information—AssessedGradeLevel and WhenAssessedGradeLevel. AssessedGradeLevel represents the grade level the student was assessed at through the exam form and often has implications for performance level determination. WhenAssessedGradeLevel represents the grade in which the student was enrolled at the time of assessment. These values may or may not be the same, though widely it may be a point for review during validation testing.

StudentAssessment.SchoolYear is required and represents the school year in which or for which the assessment was administered. School year provides important context for visualizations and allows for the appropriate categorization of the scores, regardless of the actual administration date. This eliminates the need to arbitrarily define a cut-off date to decide which school year to attach to a specific administration or score.

This is especially important for assessments taken during the summer, as it can be unclear how to group the scores in a school year-based visualization. Take care to follow the convention laid out by the implementing state or district. For example, if a student takes a make-up exam or is attempting to pass a state summative exam after multiple administrations, their scores will likely be attributed to the prior school year including for purposes of accountability or state or federal reporting. In another case, a student may be accelerating their coursework during the summer and district practice may be to attribute the exam to the upcoming year.

## Use Cases and Visualization Design

Assessments are an important part of assessing a student’s mastery of academic concepts, skills acquisition, and readiness to pursue specific academic tracks. The Assessment domain in Ed-Fi allows for expanded insights from linkages to other systems and use cases that leverage other academic or student performance data.

The domain is designed to deliver on or contribute to use cases such as:

* holistic review of a student’s academic performance
* performance against dropout prevention, early warning system, or on-/off-track metrics
* completion of one or more college readiness assessments
* achievement of specific performance levels on one or more assessments, including college readiness benchmarks
* student participation in and performance trends over multiple assessment administrations
* strengths and weaknesses in specific curricular learning standards, both through grades and assessment performance
* comparison of student performance across multiple related exams

The domain is not designed to deliver on use cases such as:

* recreating assessment instruments fully or providing for assessment or assessment item portability across systems
* capturing precise algorithmic or technical details of scoring systems
* recreating or recalculating scores
* gathering all data generated from a student’s interaction with an assessment instrument

Assessment systems often include robust item-level reporting and details of the student’s interaction with the assessment, especially for computer-adaptive testing.

Educators often receive professional development designed to help them read and interpret the reports generated by the assessment source vendor. Source systems may also offer detailed item-level analysis or configurable reports. Ed-Fi use cases should not seek to replicate these features, but rather to enhance an educator’s understanding of student performance by using data from other domains to provide expanded context for participation or scores. Item-level definition is available in Ed-Fi, but its use requires a strong and somewhat unique use case.
