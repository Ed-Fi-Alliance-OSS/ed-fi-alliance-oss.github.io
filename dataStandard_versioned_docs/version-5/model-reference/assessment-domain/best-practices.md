# Assessment Domain - Best Practices

The Ed-Fi assessment specification is purposefully non-restrictive when it comes
to the types of result data than can be sent to the Assessment Outcomes API, so
that vendors with different types of data can be accommodated. While differences
exist between assessment platforms, there are enough similarities to warrant a
suggested method of returning data to the API for the most common use cases.
These suggested methods will help assure consistent data types for the most
common use cases. This document addresses six of those use cases, for typical,
point-based assessments.

## An assessment’s overall maximum and minimum score

For a typical point-based assessment’s overall maximum and minimum score we
suggest an AssessmentReportingType descriptor value of "Number score" and a
ResultDataType descriptor value of "Decimal".

The score elements should reflect the total number of points available. We
recommend you round to two decimal places which are always present. For
instance, for an assessment that has a maximum of 50 points, the suggested
formulation for the “scores” element in json is:

```json
`"scores": [`
    `{`
        `"assessmentReportingMethodType": "Number score",`
        `"resultDatatypeType": "Decimal",`
        `"maximumScore": "50.00",`
        `"minimumScore": "0"`
    `}`
`]`
```

## An assessment’s performance levels

For a typical point-based assessment’s performance levels we suggest an
AssessmentReportingMethodType descriptor value of "Raw score" and a
ResultDataType descriptor value of "Percentage". We recommend no decimal places.

A unique consideration with performance levels is that the level cutoffs can be
either inclusive or exclusive. We suggest that the MinimumScore be inclusive
while the MaximumScore not be considered part of the performance band. In the
example json shown below, this would indicate that a score of 80 would be
considered “Proficient”. In addition, if it is possible for your students to
achieve better than 100% on a performance level, we suggest that a MaximumScore
value for the top performance level be omitted.

|     | | --- | | `"performanceLevels": [`  <br/>           `{`
<br/>               `"assessmentReportingMethodType": "Raw score",`
<br/>               `"performanceLevelDescriptor":
"[http://namespace.com/Advanced](http://namespace.com/Advanced)",`
<br/>               `"minimumScore”: "90",`
<br/>               `"resultDatatypeType”: "Percentage”`  <br/>           `},`
<br/>           `{`  <br/>               `"assessmentReportingMethodType": "Raw
score",`  <br/>               `"performanceLevelDescriptor":
"[http://namespace.com/Proficient](http://namespace.com/Proficient)",`
<br/>               `"minimumScore”: "80",`  <br/>               `"maximumScore":
"90",`  <br/>               `"resultDatatypeType”: "Percentage”`
<br/>           `},`  <br/>           `{`
<br/>               `"assessmentReportingMethodType": "Raw score",`
<br/>               `"performanceLevelDescriptor":
"[http://namespace.com/Basic](http://namespace.com/Basic)",`
<br/>               `"minimumScore”: "70",`  <br/>               `"maximumScore":
"80",`  <br/>               `"resultDatatypeType”: "Percentage”`
<br/>           `},`  <br/>           `{`
<br/>               `"assessmentReportingMethodType": "Raw score",`
<br/>               `"performanceLevelDescriptor":
"[http://namespace.com/Below](http://namespace.com/Below) Basic",`
<br/>               `"minimumScore”: "0",`  <br/>               `"maximumScore":
"70",`  <br/>               `"resultDatatypeType”: "Percentage”`
<br/>           `}`  <br/>       `],` | |     |

## An objective’s scores designation

For a typical point-based assessment objective’s scores designations we suggest
an AssessmentReportingType descriptor value of "Raw score" and for the
ResultDataType descriptor value we recommend "Percentage", as shown in the
example json below.

```json
`"scores": [`
      `{`
          `"assessmentReportingMethodType": "Raw score",`
          `"resultDatatypeType": "Percentage"`
      `},`
```

## An objective’s performance levels

For a typical point-based objective’s performance levels we suggest an
AssessmentReportingMethodType descriptor value of "Raw score" and a
ResultDataType descriptor value of "Percentage". We recommend no decimal places.

A unique consideration with performance levels is that the level cutoffs can be
either inclusive or exclusive. We suggest that the MinimumScore be inclusive
while the MaximumScore not be considered part of the performance band. In the
example json shown below, this would indicate that a score of 80 would be
considered “Proficient”. In addition, if it is possible for your students to
achieve better than 100% on a performance level, we suggest that a MaximumScore
value for the top performance level be omitted.

```json
`"performanceLevels": [`
           `{`
               `"assessmentReportingMethodType": "Raw score",`
               `"performanceLevelDescriptor": "[http://namespace.com/Advanced](http://namespace.com/Advanced)",`
               `"minimumScore”: "90",`
               `"resultDatatypeType”: "Percentage”`
           `},`
           `{`
               `"assessmentReportingMethodType": "Raw score",`
               `"performanceLevelDescriptor": "[http://namespace.com/Proficient](http://namespace.com/Proficient)",`
               `"minimumScore”: "80",`
               `"maximumScore": "90",`
               `"resultDatatypeType”: "Percentage”`
           `},`
           `{`
               `"assessmentReportingMethodType": "Raw score",`
               `"performanceLevelDescriptor": "[http://namespace.com/Basic](http://namespace.com/Basic)",`
               `"minimumScore”: "70",`
               `"maximumScore": "80",`
               `"resultDatatypeType”: "Percentage”`
           `},`
           `{`
               `"assessmentReportingMethodType": "Raw score",`
               `"performanceLevelDescriptor": "[http://namespace.com/Below](http://namespace.com/Below) Basic",`
               `"minimumScore”: "0",`
               `"maximumScore": "70",`
               `"resultDatatypeType”: "Percentage”`
           `}`
       `],`
```

## A student’s final score for the overall assessment

For a student’s final score on a typical point-based assessment we suggest an
AssessmentReportingType descriptor value of "Number score" and for the
ResultDataType descriptor value we recommend "Decimal".

For the result, we recommend you round to two decimal places which are always
present. The result should reflect the raw score of the student’s final result.
For instance, for a score of 37 out of 50 points, the result would be shown as
37.00.

```json
`"scoreResults": [`
    `{`
        `"assessmentReportingMethodType": "Number score",`
        `"result": "37.00",`
        `"resultDatatypeType": "Decimal"`
    `},`
`],`
```

## A student’s final score on an objective

For a student’s score on a typical point-based objective’s performance levels we
suggest an AssessmentReportingMethodType descriptor value of "Raw score" and a
ResultDataType descriptor value of "Percentage".

For the result we recommend two decimal places, reflecting the percent correct
the student achieved for the objective.

```json
`"scoreResults": [`
   `{`
       `"assessmentReportingMethodType": "Raw score",`
       `"result": "42.86",`
       `"resultDatatypeType": "Percentage"`
   `}`
 `],`
```

## Assigning Assessment Identifiers

When assigning identifiers for Assessment, ObjectiveAssessment, and Assessment
metadata and StudentAssessment

:::info

"Identifiers" were introduced into the assessment domain as _partial surrogate
keys_ to allow the source systems employed by assessment organizations to use
their internally unique identifiers instead of adhering to a natural key system
created by the education organizations. A namespace was created to ensure that
the identifiers created by an assessment organization were unique within a
district or state ODS.

:::

The original intent was to allow Assessment to be identified by:

1. An internal key for the assessment, potentially even a computer-generated
    number, that is used to populate the data into the API.
2. A namespace reflecting the uri for the assessment organization.

This pattern of an Identifier +Namespace was introduced for Assessment,
ObjectiveAssessment, and Assessment metadata and StudentAssessment.

However, assessment results are often being obtained from files that provide the
assessment results and may not directly contain metadata about the assessment or
objective assessments.  These files are loaded into the ODS in batch mode.
These loaders must create these identifiers by convention and thus there is
great amount of variance and in some cases misunderstanding on how best to do
this.  The is a temptation to create complex patterns of identifiers – **but
this is not necessary.**

To best understand, it is important that one consider the key structures, as
follows:

| Entity | Composite Key |
| --- | --- |
| Assessment | _AssessmentIdentifier<br/>_   Namespace |
| ObjectiveAsessment | _·Assessment reference<br/>_   AssessmentIdentifer<br/>    _Namespace<br/>_   IdentificationCode |
| AssessmentItem | _·Assessment reference<br/>_   AssessmentIdentifer<br/>    _Namespace<br/>_   IdentificationCode |
| StudentAssessment | _Assessment reference<br/>_   AssessmentIdentifer<br/>    _Namespace<br/>_   Student reference<br/>    _StudentUniqueID<br/>_   StudentAssessmentIdentifier |

### For Assessment Identifier

The composite key for Assessment is:

1. **Namespace** is the uri of the source assessment organization. Thus, for
    the ACT assessment, the namespace would be “[uri://act.org]”
2. **AssessmentIdentifer** needs to unique identify the specific assessment
    within the context of the assessment organization, consisting of:

* * **Internal ID for the assessment by the assessment organization**, or
  * **Short identifier for the assessment** that is unique within the
        organization across the various assessments they offer. For example,
        there could be “ACT” and “ACT Practice” assessments that are offered.
  * **Optionally a string representing the version of the assessment,** as
        it may be pertinent such as:
    * **Version number**, such as 3.2; or
    * **Year or school year**, such as 2021
  * **NOT the assessment organization**, since this is reflected in the
        namespace

### For ObjectiveAssessment IdentificationCode

The composite key for ObjectiveAssessment is:

1. **Namespace** is the uri of the source assessment organization. Thus, for
    the ACT assessment, the namespace would be “[uri://act.org]”
2. **AssessmentIdentifer** is the unique identifier for the specific assessment
    within the context of the assessment organization.
3. **IdentificationCode for the ObjectiveAssessment** needs to uniquely reflect
    the “subtest” in the context of the AssessmentIdentifier and the Namespace.

* * **Internal ID for the objective assessment by the assessment
        organization**, or
  * **Reflect the topic of the objective assessment**, for example
        Mathematics, Reading, Science, Writing, etc.
  * **NOT the assessment or assessment organization**, since that is
        reflected in the AssessmentIdentifer and the Namespace.

### For AssessmentItem IdentificationCode

The composite key for AssessmentItem is:

1. **Namespace** is the uri of the source assessment organization. Thus, for
    the ACT assessment, the namespace would be “[uri://act.org]”
2. **AssessmentIdentifer** is the unique identifier for the specific assessment
    within the context of the assessment organization.
3. **IdentificationCode for the AssessmentItem** needs to uniquely reflect the
    item in the context of the AssessmentIdentifier and the Namespace. This is
    typically either:

* * **Internal ID for the assessment item by the assessment organization**,
        or
  * **A unique identifier of the item from the test bank;** or
  * **A generated number**, potentially even a sequence number

### For StudentAssessment IdentificationCode

The composite key for StudentAssessment is:

1. **Namespace** is the uri of the source assessment organization. Thus, for
    the ACT assessment, the namespace would be “[uri://act.org]”
2. **AssessmentIdentifer** is the unique identifier for the specific assessment
    within the context of the assessment organization.
3. **StudentReference** consisting of the StudentUniqueID
4. **StudentAssessmentIdentifier for the student’s results from an
    Assessment.** The only uniqueness requirement is to distinguish between
    multiple times the student takes the same assessment.  

* * **Possible values:**
    * A booklet (if paper) or session ID (if electronic). or
    * The assessment vendor’s ID for the student, or
    * The ID for the student obtained from rostering, or
    * An internal ID for the student’s results for this administration
  * **NOT the assessment or assessment organization**, since that is
        reflected in the AssessmentIdentifer and the Namespace.
  * **NOT the Ed-Fi StudentUniqueID** since it is already part of the key.
