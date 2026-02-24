---
sidebar_position: 5
hide_table_of_contents: true
---

# Assessment Domain Examples

The following examples use two fictional assessments to demonstrate patterns for defining Assessment and StudentAssessment and using score reports to fill assessment gaps.

## Defining Assessment and StudentAssessment

Literacy assessments are a type of screener that assesses acquisition of language and reading skills. They may be used in early grades through secondary and are conducted multiple times throughout the year, depending upon district schedules and policies. The solution will need to accommodate multiple administrations, scores, and performance levels for each student.

An example of a fictional literacy test (“EarlyLit”) is provided below and show how Assessment, ObjectiveAssessment, and StudentAssessment information can be mapped from a score results file.

### Assessment

Assessment metadata definition may be guided by research about the overall test and its structure. The score report header and contents offer information about levels and score formats. For example:

| StudentPrimaryID | Benchmark Period | Assessment Measure-Composite Score-Levels | Assessment Measure - Composite Score-Score |
| --- | --- | --- | --- |
| 605000 | BOY | Below Benchmark | 14 |
| 605000 | MOY | Below Benchmark | 89 |
| 605000 | EOY | Well Below Benchmark | 76 |
| 605001 | BOY | Above Benchmark | 59 |
| 605001 | MOY | Above Benchmark | 172 |

This information can be used to define assessment-level scores and performance levels, as shown below:

```json
{
"assessmentIdentifier": "{{assessmentIdentifier}}",
"assessmentTittle": "{{assessmentTitle}}",
"assessmentFamily": "{{assessmentFamily}}",
"namespace": "{{namespace}}",
"assessedGradeLevels": "[{{grade_json}}]",
"academicSubjects": "[{{subject_json}}]",
"scores" : [
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Score",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Integer"
    },
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Benchmark Period",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level"
    }
],
"performanceLevels": [
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Well Below Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level" 
    },
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Below Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level" 
    },
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level" 
    },
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Above Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level" 
    },
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Not Determined",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Level" 
    },
]
}
```

### ObjectiveAssessment

Objectives represent the next level of the hierarchy, and are shown in additional columns the sample score report below:

| StudentPrimaryID | Benchmark Period | Assessment Measure-FSF-Levels | Assessment Measure-FSF-Score | Assessment Measure-LNF-Levels | Assessment Measure-LNF-Score | Assessment Measure-PSF-Levels | Assessment Measure-PSF-Score | Assessment Measure-NWF (CLS)-Levels | Assessment Measure-NWF (CLS)-Score | Assessment Measure-NWF (WWR)-Levels | Assessment Measure-NWF (WWR)-Score |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 605000 | BOY | Benchmark | 12 | NotDetermined | 1 |     |     |     |     |     |     |
| 605000 | MOY | Below Benchmark | 21 | NotDetermined | 21 | BelowBenchmark | 14 | AboveBenchmark | 32 | NotDetermined | 0 |
| 605000 | EOY |     |     | NotDetermined | 18 | Below Benchmark | 27 | Benchmark | 30 | NotDetermined | 2 |
| 605001 | BOY | Above Benchmark | 26 | NotDetermined | 32 |     |     |     |     |     |     |
| 605001 | MOY | Above Benchmark | 38 | NotDetermined | 54 | AboveBenchmark | 45 | AboveBenchmark | 36 | NotDetermined | 12 |

In this case, performance level definitions at the objective level echo the performance levels at the higher assessment level. This may or may not be the case for all related assessments.

The information is defined as follows:

```json
{
"assssmentItems": [],
"assessmentReference": {
    "assessmentIdentifier": "EarlyLit",
    "namespace": "uri://namespace.com/assessment/earlylit"
},
"description": "{{identification_code}}",
"identificationCode": "{{identification_code}}",
"learningObjectives": [],
"learningStandards": [],
"performanceLevels": [
    {
        "assessmentReportingMethoddescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Well Below Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Level"
    },
    {
        "assessmentReportingMethoddescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Below Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Level"
    },
    {
        "assessmentReportingMethoddescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Level"
    },
    {
        "assessmentReportingMethoddescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Above Benchmark",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Level"
    },
    {
        "assessmentReportingMethoddescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Level",
        "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/PerformanceLevelDescriptor#Not Determined",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Level"
    }
],
"scores": [
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#Assessment Measure Score",
        "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#Integer"
    }
]
}
```

Scores for all objectives may not be available for all administrations.

### StudentAssessment and StudentObjectiveAssessment

The sample below shows scores for both the top-level assessment and assessment objectives for two individual students—ID #\605000 and ID #\605001—each with results for multiple administrations. Note that data related to the enrolled school, district, and grade, and demographics are also available in the source file but are not included in the clip below.

| School Year | StudentPrimaryID | Benchmark Period | ClientDate |  Assessment Measure- Composite Score-Levels | Assessment Measure- Composite Score-Score | Assessment Measure-FSF-Levels | Assessment Measure-FSF-Score | Assessment Measure-LNF-Levels | Assessment Measure-LNF-Score | Assessment Measure- PSF-Levels | Assessment Measure- PSF-Score | | Assessment Measure-NWF (CLS)-Levels | Assessment Measure-NWF (CLS)-Score | Assessment Measure-NWF (WWR)-Levels | Assessment Measure-NWF (WWR)-Score |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2022-2023 | 605000 | BOY | 10/5/2022 | BelowBenchmark | 14 | Benchmark | 12 | NotDetermined | 1 |     |     |     |     |     |     |
| 2022-2023 | 605000 | MOY | 1/11/2023 | BelowBenchmark | 89 | BelowBenchmark | 21 | NotDetermined | 21 | BelowBenchmark | 14 | AboveBenchmark | 32 | NotDetermined | 0 |
| 2022-2023 | 605000 | EOY | 5/8/2023 | WellBelowBenchmark | 76 |     |     | NotDetermined | 18 | BelowBenchmark | 27 | Benchmark | 30 | NotDetermined | 2 |
| 2022-2023 | 605001 | BOY | 10/5/2022 | AboveBenchmark | 59 | AboveBenchmark | 26 | NotDetermined | 32 |     |     |     |     |     |     |
| 2022-2023 | 605001 | MOY | 1/11/2023 | 172 | Benchmark | 38 | NotDetermined | 54 | AboveBenchmark | 45 | AboveBenchmark | 36 | NotDetermined | 12 |

### StudentAssessment

```json
{
"studentAssessmentIdentifier": "{{student_assessment_id}}",
"assessmentReference": {
    "assessmentIdentifier": "{{assessmentIdentifier}}",
    "namespace": "{{namespace}}"
},
"schoolYearTypeReference": {
    "schoolYear": "{{school_year}}",
},
"studentReference": {
    "studentUniqueId": "{{student_unique_id}}",
},
"admininstrationDate": "{{client_date}}",
"performanceLevels": [

    {%- for pl in pls -%}
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#{{pl[0]}}",
        "performanceLevelDescriptor": "uri://namespace.com/earlylit/PerformanceLevelDescriptor#{{pl[1]}}",
        "performanceLevelMet": true
    }
    {%- if not loop.last-%}
    {%- else %}{% endif %}{%- endfor -%}
    ],
"scoreReults": [
    {%- for score in scores -%}
    {
        "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#{{score[0]}}",
        "resultDattypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDataypeTypeDescriptor#{{score[2]}}",
        "result": "{{score[1]}}"   
    }
    {%- if not loop.last -%}
    {%- else %}{% endif %}{%- endfor -%}
    ],
}
```

### StudentObjectiveAssessment

```json
{
"studentObjectiveAssessments": 
    [
    {% set possible_obj_assess = [['EarlyLit-FSF', ['Assessment Measure Level', assessment_measure_fsf_levels], ['Assessment Measure Score', 
                                 assessment_measure_fsf_score]], 
                                 ['EarlyLit-LNF', ['Assessment Measure Level', assessment_measure_lnf_levels], ['Assessment Measure Score', assessment_measure_lnf_score]],
                                 ['EarlyLit-PSF', ['Assessment Measure Level', assessment_measure_psf_levels], ['Assessment Measure Score', 
                                 assessment_measure_psf_score]],
                                 ['EarlyLit-NWF-CLS', ['Assessment Measure Level', assessment_measure_nwf-cls_levels], ['Assessment Measure Score', 
                                 assessment_measure_nwf-cls_score]],
                                 ['EarlyLit-NWF-wwr', ['Assessment Measure Level', assessment_measure_nwf-wwr_levels], ['Assessment Measure Score', 
                                 assessment_measure_nwf-wwr_score]]] %}
    {% set all_obj_assessment = [] %}
    {%- for obj in possible_obj_assess -%}
    {% if (obj[1]|length > 0 and obj [1][1] != '') or (obj[2] is defined and obj [2][1]) != '') %}
    {% set _=all_obj_aswsessment.append(obj) %}
    {% endif %}
    {% endfor %}
    {%- for obj in all_obj_assessment -%}
    {
        "objectiveAssessmentReference": {
            "assessmentIdentifier": "EarlyLit:",
            "identificationCode": "{{obj[0]}}",
            "namespace": "uri://namespace.com/asessment/earlylit"
        }
    {% if obj[1]|length > 0 and obj [1][1] != '' %},
    "performanceLevels": [
        { 
            "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#{{obj[1][0]}}",
            "performanceLevelDescriptor": "uri://namespace.com/assessment/earlylit/performanceLevelDescriptor#{{obj[1][1]}}",
            "performanceLevelMet": true
        }
    ]
    {% endif %}
    {% if obj[2] is defined and obj[2][1] != '' %},
    "scoreResults": [
        {
            "assessmentReportingMethodDescriptor": "uri://namespace.com/assessment/earlylit/AssessmentReportingMethodDescriptor#{{obj[2][0]}}",
            "resultDatatypeTypeDescriptor": "${DESCRIPTOR_NAMESPACE}/ResultDatatypeTypeDescriptor#Integer",
            "result": "{{obj[2][1]}}"
        }
    ]
    {% endif %}
    }
  {%- if not loop.last -%}
  {%- else %}{% endif %}{%- endfor -%}  
    ],
  "whenAssessedGradeLevelDescriptor": "{{edfi_descriptor}}"
}
```

### Using Score Reports to Fill Assessment Gaps

Educator-facing score reports provide important information to help analysts understand assessment structures or provide full descriptions, including assessment sections, minimum and maximum scores, and performance level definitions.

The following is a fictitious math assessment score report, Math Whale followed by a breakdown of where we would expect the different data points to land within the Assessment model. The following is a fictitious math assessment score report, Math Whale followed by a breakdown of where we would expect the different data points to land within the Assessment model. Additional information for Assessment Vendors can be found in the

#### A Sample Score Report

A typical classroom score report (for a fictitious provider) might look like this:

![mathwhale score report](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/mathwhale.png)

[_Figure 1: a sample score report (click to expand)_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/mathwhale.png)

A mapping of the main elements might look like this (you will see a few new elements appear here):

![mathwhale annotated](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/mathwhale-annotated.png)

[_Figure 2: mappings for sample score report (click to expand)_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/mathwhale-annotated.png)
