---
title: "Part II: How Ed-Fi Assessment Data Works"
sidebar_position: 3
---


## 2. The Ed-Fi Ecosystem

### 2.1 What the ODS is and How the API Works

Ed-Fi provides a standardized way for education systems and technology providers to exchange data across domains, including assessment, enrollment, attendance, grades, and demographics. This is accomplished through two core components: the Operational Data Store (ODS) and the RESTful API.

The _**Operational Data Store (ODS)**_ is where data is stored. It is a structured database that organizes information according to the Ed-Fi data model, enabling data from different sources to be represented consistently. Assessment data does not exist in isolation within the ODS. It is connected to other domains such as students, schools, courses, and programs, enabling a more complete and integrated view of student outcomes.

The _**API**_ is how data enters and exits the system. It provides a standardized interface that allows external systems, including assessment platforms, to submit and retrieve data using common patterns. Rather than exchanging custom files or managing one-off data extracts, vendors interact with a consistent set of endpoints that represent Ed-Fi resources such as Assessment, StudentAssessment, and its associated structures.

These two components work together as a single system. The API serves as the access layer, handling validation, authorization, and data exchange, while the ODS serves as the storage layer, maintaining the structured data that supports downstream reporting and analytics. Vendors do not interact directly with the database. All data exchange occurs through the API.

Access to the API is controlled by implementation-specific credentials issued for each environment. These credentials determine what data can be submitted and accessed. Permissions are managed through predefined access configurations, often called claimsets, that define the scope of allowed interactions with the API.

In practice, this means that an assessment vendor integrates into a defined environment by authenticating with the API and submitting data in alignment with the Ed-Fi data model. The system receiving the data may represent a district, a state, or another education agency implementation, but the interaction model remains consistent.

The key concept is straightforward: the API is how data is exchanged, and the ODS is where that data is stored and connected to the broader ecosystem. Understanding this relationship is essential before deciding how assessment data should be modeled, transmitted, and validated within an Ed-Fi integration.

### 2.2 The Assessment Domain: Core Entities

The Ed-Fi Assessment domain is designed to represent how assessment results are interpreted and used in real-world education settings. It is not intended to replicate the full complexity of an assessment platform, such as item banks, delivery engines, or scoring algorithms. Instead, it provides a structured way to describe assessment results so they can be consistently exchanged, understood, and used across systems.

At its core, the domain is built around a set of core entities that work together to represent both the structure of an assessment and the results produced for each student. These constructs operate across two parallel layers:

- _Assessment and ObjectiveAssessment_ entities define what the assessment is and how it is structured.

- _StudentAssessment_ entity and its corresponding _StudentObjectiveAssessment collection_ record what happened for a student within that structure.

#### The Core Entities

#### Assessment

The Assessment entity represents the assessment instrument at the highest level. It defines the overall context in which results are reported, including the intended subject, reporting structure, and the hierarchy of components that make up the assessment.

#### ObjectiveAssessment

ObjectiveAssessment represents the subcomponents of an assessment, such as sections, strands, domains, measures, or skill groupings. Many assessments organize results into multiple levels, and this entity allows that structure to be represented.

Some assessments include detailed subscores and multi-level hierarchies, while others report only a single overall result. The model supports both cases by allowing hierarchy where it exists and remaining simple where it does not.

#### StudentAssessment

StudentAssessment represents a student’s attempt at an assessment. It captures the overall outcome of that attempt along with the contextual information needed to interpret it, such as when the assessment occurred. It reflects the highest level of results for a student.

#### StudentObjectiveAssessment

StudentObjectiveAssessment is a collection within the _StudentAssessment_ record that represents a student’s results within the assessment structure, such as performance at the strand, domain, or skill level. These results align with the corresponding ObjectiveAssessment definitions and provide the details needed for deeper analysis.

A useful way to think about this model is:

- Assessment describes the _map_
- ObjectiveAssessment defines the _landmarks within the map_
- StudentAssessment records the _journey,_ and the collection of StudentObjectiveAssessment records what happened at each _landmark_

This separation preserves meaning while ensuring results remain consistent, interpretable, and comparable across assessments and vendors.

#### Optional Entities

In some cases, additional detail may be included when supported by the assessment and required by the implementation context.

#### AssessmentItem (optional)

Represents item-level results. This level of detail can support advanced analysis but introduces additional complexity and is typically used only when item-level reporting is required and governed.

#### LearningStandard (optional)

Represents the alignment between assessment components and academic standards. This can support standards-based analysis but requires careful management because standards vary across states and may change over time.

The Ed-Fi Assessment domain provides a flexible structure that can represent a wide range of assessment types while maintaining a consistent model for interpretation. Understanding how these core entities and their nested result structures relate is essential before deciding how to model, integrate, and use assessment data.

### 2.3 Descriptors and Namespaces

Two foundational concepts when working with Ed-Fi are _descriptors_ and _namespaces_ both the representation of categorical meaning and its ownership, which are critical for preserving semantic integrity across integrations.

A _**descriptor**_ represents a controlled vocabulary value. It is how Ed-Fi expresses categorical meaning in a consistent, machine-readable way. Examples include score types, performance levels, and assessment periods. Descriptors are not just labels. They are governed values that must be interpreted consistently across systems.

A _**namespace**_ represents _ownership of meaning_. It defines who is responsible for the definition and lifecycle of a descriptor. This is a critical distinction in Ed-Fi:

- The default Ed-Fi namespace is used for shared, cross-domain concepts (such as AcademicSubject or GradeLevel).
- A vendor namespace is used for assessment-specific semantics that originate from the provider (such as score names or performance levels).

Ed-Fi separates these namespaces intentionally. This separation ensures that:

- Vendor meaning is preserved exactly as reported
- Shared concepts remain consistent across domains
- Downstream systems can interpret or map values without losing traceability

For example, consider a vendor that reports a score called “ _Lexile Measure_ .”

#### API Integration

The score is sent using an AssessmentReportingMethodDescriptor in the vendor namespace, for example:

`uri://vendor.org/AssessmentReportingMethodDescriptor#LexileMeasure`

#### Within the Ed-Fi ODS

The value remains unchanged. No normalization or renaming occurs at this stage. The system stores the vendor's report.

This pattern is essential. It ensures that:

- The original vendor's meaning is never lost
- Local interpretations are explicit and auditable
- Multiple vendors can coexist without forcing premature standardization

### 2.4 Student Identity in Ed-Fi

A foundational concept in Ed-Fi is the use of the _StudentUniqueId_ as the canonical anchor for student identity. All student-level data, including assessment results, must resolve to the student represented by this identifier in order to be successfully ingested, linked, and reported.

This requirement is critical because Ed-Fi does not rely on names or local identifiers for matching. Instead, the StudentUniqueId ensures that records are consistently associated with the correct student across systems, time, and data domains.

When assessment data does not correctly resolve to the student represented by a valid StudentUniqueId, several issues can occur:

- Payloads may be rejected during ingestion
- Records may fail to associate with a student, creating silent data gaps
- Longitudinal reporting may be incomplete or inaccurate

These failure points are often not immediately visible but can significantly impact downstream reporting and analytics.

This section introduces the concept at a high level. A more detailed treatment of identity resolution, matching strategies, and common implementation challenges is provided in Part IV.

### 2.5 Worked Example: A Benchmark Assessment End to End

This worked example introduces a hypothetical single-subject benchmark assessment — the **ClearPath K–3 Reading Benchmark** — and walks through how it is completely represented in Ed-Fi. It covers the Assessment definition, the three ObjectiveAssessment records that define its subscore hierarchy, a StudentAssessment event record, and the StudentObjectiveAssessment results collection nested within it. Descriptor usage, namespace ownership, and event context fields are shown in concrete annotated payloads. This example serves as the primary reference point throughout the remainder of the Playbook.

#### Assessment overview

ClearPath is a hypothetical assessment vendor offering a benchmark screener for grades K–3. The Reading Benchmark yields a composite score plus three subscore areas: Phonological Awareness, Fluency, and Vocabulary. The assessment is administered three times per year (fall, winter, spring). This example covers one student’s fall administration.

|**Attribute**|**Value**|
|---|---|
|**Assessment name**|ClearPath K–3 Reading Benchmark|
|**Subject**|English Language Arts (one subject — one Assessment record)|
|**Assessed grades**|Kindergarten, Grade 1, Grade 2, Grade 3|
|**Administration periods**|Fall, Winter, Spring|
|**Vendor namespace**|uri://clearpath.example.com/assessment/clearpath-reading|
|**Assessment identifer**|ClearPathBenchmark-Reading|
|**Subscores**|CP-RD-PA (Phonological Awareness), CP-RD-FL (Fluency), CP-RD-VC (Vocabulary)|

#### GOVERNANCE — SECTION 4: ONE SUBJECT PER ASSESSMENT

This example intentionally covers one subject only. If ClearPath also offers a Math screener, that is a separate Assessment record with its own assessmentIdentifier, its own ObjectiveAssessments, and its own StudentAssessment events. A single Assessment record must never span two academic subjects. The two assessments share a vendor and a namespace but are otherwise independent entities in Ed-Fi. Placing both Reading and Math results under one Assessment identifier collapses the subject boundary, prevents subject-level analytics, and violates the single-subject rule defined in Section 4.

#### Entity hierarchy

The Ed-Fi assessment domain uses two parallel layers. The definition layer describes the assessment structure. The event layer records what a specific student did on a specific date. One Assessment record anchors three ObjectiveAssessments. One StudentAssessment event carries three nested StudentObjectiveAssessment results — one per subscore. The relationships are shown in the table below.

|**Layer**|**Entity**|**Role**|
|---|---|---|
|Definition|**Assessment**|Defines the map: one record for the Reading<br />Benchmark|
|Definition|**ObjectiveAssessment**|Defines the landmarks: one record per subscore (CP-RD-PA, CP-RD-FL, CP-RD-VC)|
|Event|**StudentAssessment**|Records the journey: one record per student per<br />administration|
|Event|**StudentObjectiveAssessment**|Records results at each landmark: a collection<br />nested inside StudentAssessment, not a separate POST|

#### PLAYBOOK REFERENCE — SECTION 2.2: PARALLEL LAYERS

StudentObjectiveAssessment is not a standalone entity posted via a separate API call. It is a collection nested within the StudentAssessment body. The definition layer (Assessment + ObjectiveAssessments) describes the map. The event layer (StudentAssessment + the nested collection) records the student's journey through that map.

#### Step 1 - [POST] /ed-fi/assessments

The Assessment resource defines the map. One Assessment record is posted for the Reading Benchmark. ClearPath owns the namespace, the assessmentIdentifier, and all vendor-specific descriptors. These values must remain stable across all school years and all states where this assessment is deployed.

#### Assessment payload

```json
{
  "assessmentIdentifier": "ClearPathBenchmark-Reading",
  "namespace": "uri://clearpath.example.com/assessment/clearpath-reading",
  "assessmentTitle": "ClearPath K-3 Reading Benchmark",
  "assessmentFamily": "ClearPath Benchmark",
  "assessmentVersion": 4,
  "revisionDate": "2023-07-01",
  "assessedGradeLevels": [
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Kindergarten" },
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#First grade" },
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Second grade" },
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Third grade" }
  ],
  "academicSubjects": [
    { "academicSubjectDescriptor": "uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts" }
  ],
  "scores": [
  {
    "assessmentReportingMethodDescriptor":
    "uri://clearpath.example.com/assessment/clearpath-
    reading/AssessmentReportingMethodDescriptor#Composite Score",
    "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Integer",
    "minimumScore": "0",
    "maximumScore": "1000"
  },
  {
    "assessmentReportingMethodDescriptor":
    "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#SEM",
    "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Integer"
  }
  ],
    "performanceLevels": [
    {
      "assessmentReportingMethodDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-
      reading/AssessmentReportingMethodDescriptor#Benchmark Level",
      "performanceLevelDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Did not yet meet
      expectations",
      "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-
      reading/AssessmentReportingMethodDescriptor#Benchmark Level",
      "performanceLevelDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Approaching
      expectations",
      "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-
      reading/AssessmentReportingMethodDescriptor#Benchmark Level",
      "performanceLevelDescriptor":
      "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Met expectations",
      "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor":
        "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Benchmark Level",
      "performanceLevelDescriptor":
        "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Exceededexpectations",
      "resultDatatypeTypeDescriptor": "uri://ed-�i.org/ResultDatatypeTypeDescriptor#Level"
    }
  ]
}
```

#### GOVERNANCE — SECTION 3: ASSESSMENT IDENTITY

Both values must remain identical across every school year and every state deployment. Changing either value breaks longitudinal tracking and creates orphaned student records that can no longer be matched to their assessment definition. The namespace must use a domain owned and controlled by ClearPath, not by any state or district.

#### DESCRIPTOR OWNERSHIP — SECTION 7

AssessmentReportingMethodDescriptor and PerformanceLevelDescriptor values carry the vendor namespace prefix (uri://clearpath.example.com/...). These are vendor-owned descriptors and must not be overridden, normalized, or replaced at ingestion. GradeLevelDescriptor, AcademicSubjectDescriptor, and ResultDatatypeTypeDescriptor use the Ed-Fi shared namespace (uri://ed-fi.org/...) because they are cross-domain descriptors governed by the Ed-Fi Alliance.

#### Step 2 — POST /ed-fi/objectiveAssessments (three records)

ObjectiveAssessments define the subscore hierarchy — the landmarks on the map. The ClearPath
Reading Benchmark has three subscores, each requiring one ObjectiveAssessment record. All three
reference the same parent Assessment via assessmentReference. Each carries its own score range and
performance level vocabulary.

#### CP-RD-PA — Phonological Awareness

**[POST]** /ed-fii/objectiveAssessments — CP-RD-PA

```json
{
  "assessmentReference": {
    "assessmentIdentifier": "ClearPathBenchmark-Reading",
    "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
  },
  "identificationCode": "CP-RD-PA",
  "description": "Phonological Awareness subtest",
  "percentOfAssessment": 35,
  "scores": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
      "minimumScore": "0.00",
      "maximumScore": "100.00"
    }
  ],
  "performanceLevels": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Higher than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    }
  ]
}
```

#### CP-RD-FL — Fluency

**[POST]** /ed-fii/objectiveAssessments — CP-RD-FL

```json
{
  "assessmentReference": {
    "assessmentIdentifier": "ClearPathBenchmark-Reading",
    "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
  },
  "identificationCode": "CP-RD-FL",
  "description": "Fluency subtest",
  "percentOfAssessment": 35,
  "scores": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
      "minimumScore": "0.00",
      "maximumScore": "100.00"
    }
  ],
  "performanceLevels": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Higher than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    }
  ]
}
```

#### CP-RD-VC — Vocabulary

**[POST]** /ed-fii/objectiveAssessments — CP-RD-VC

```json
{
  "assessmentReference": {
    "assessmentIdentifier": "ClearPathBenchmark-Reading",
    "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
  },
  "identificationCode": "CP-RD-VC",
  "description": "Vocabulary subtest",
  "percentOfAssessment": 30,
  "scores": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
      "minimumScore": "0.00",
      "maximumScore": "100.00"
    }
  ],
  "performanceLevels": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Higher than Average",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Level"
    }
  ]
}
```

#### GOVERNANCE — SECTION 5: HIERARCHY MUST MIRROR THE SCORE REPORT

The ObjectiveAssessment hierarchy must exactly mirror the structure of ClearPath's score report. Three subscores reported by the vendor means exactly three ObjectiveAssessment records — not fewer (which would collapse the hierarchy), not more (which would invent structure that does not exist on the score report). The identificationCode value is the stable key for each subtest and must not change between school years.

#### Step 3 — POST /ed-fi/studentAssessments

The StudentAssessment records the event — one record per student per administration. This example shows fake_student_1, a Kindergartner, taking the Reading Benchmark in the fall window on January 1, 2024. All event context fields are required: administrationDate, schoolYearTypeReference, whenAssessedGradeLevelDescriptor, and assessmentPeriodDescriptor. Together they form the event identity anchor for longitudinal tracking.

**[POST]** /ed-fii/studentAssessments — fake_student_1, Reading, Fall 2024

```json
{
  "studentAssessmentIdentifier": "fake_student_1-ClearPathBenchmark-Reading-2024-Fall",
  "assessmentReference": {
    "assessmentIdentifier": "ClearPathBenchmark-Reading",
    "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
  },
  "studentReference": {
    "studentUniqueId": "1000"
  },
  "schoolYearTypeReference": {
    "schoolYear": 2024
  },
  "administrationDate": "2024-01-01",
  "administrationEndDate": "2024-01-01",
  "whenAssessedGradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Kindergarten",
  "assessmentPeriodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentPeriodDescriptor#Fall",
  "scoreResults": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Composite Score",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer",
      "result": "100"
    },
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#SEM",
      "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Integer",
      "result": "10"
    }
  ],
  "performanceLevels": [
    {
      "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Benchmark Level",
      "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Did not yet meet expectations",
      "performanceLevelMet": true
    }
  ],
  "studentObjectiveAssessments": [
    // see Step 4 for full collection
  ]
}
```

#### GOVERNANCE — SECTION 6: EVENT IDENTITY AND LONGITUDINAL INTEGRITY

The natural key for this record is the combination of studentUniqueId + assessmentIdentifier + namespace + administrationDate + schoolYear. Every field must be deterministic and stable across all ingestion runs. If administrationDate changes between runs for the same test event — for example, a processing timestamp is substituted — the system will create a duplicate record instead of updating the original, resulting in doubled student data and broken longitudinal analysis.

#### STUDENT IDENTITY — SECTION 8

ClearPath's internal vendor identifier fake_student_1 via the identity crosswalk at integration time. The vendor's internal identifier must never be placed in studentUniqueId. Correct identity resolution at this step determines whether every downstream assessment record links accurately to the right student enrollment, demographic, and program data.

#### COMMON ERROR — SECTION 5.4: SCORES VS. PERFORMANCE LEVELS

Scores and performance levels are separate arrays serving distinct analytical purposes. scoreResults carries numeric values (Composite Score = 100, SEM = 10). performanceLevels carries categorical classification (Did not yet meet expectations). Never place a performance level label inside scoreResults, and never place a numeric score value inside performanceLevels. Both errors produce data that is analytically unusable and will fail validation.

#### Step 4 — studentObjectiveAssessments collection (nested in StudentAssessment)

The studentObjectiveAssessments array is nested inside the StudentAssessment body — it is not a separate API call. Each element references one ObjectiveAssessment by its identificationCode and carries that subtest's score result and performance level. All three subtest results for fake_student_1 are shown below with values drawn from the sample source data.

#### Nested array — studentObjectiveAssessments inside StudentAssessment body (not a separate POST)

// studentObjectiveAssessments array -- nested inside StudentAssessment body

```json
[
  {
    "objectiveAssessmentReference": {
      "assessmentIdentifier": "ClearPathBenchmark-Reading",
      "identificationCode": "CP-RD-PA",
      "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
    },
    "scoreResults": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
        "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
        "result": "20.10"
      }
    ],
    "performanceLevels": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
        "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
        "performanceLevelMet": true
      }
    ]
  },
  {
    "objectiveAssessmentReference": {
      "assessmentIdentifier": "ClearPathBenchmark-Reading",
      "identificationCode": "CP-RD-FL",
      "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
    },
    "scoreResults": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
        "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
        "result": "20.20"
      }
    ],
    "performanceLevels": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
        "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
        "performanceLevelMet": true
      }
    ]
  },
  {
    "objectiveAssessmentReference": {
      "assessmentIdentifier": "ClearPathBenchmark-Reading",
      "identificationCode": "CP-RD-VC",
      "namespace": "uri://clearpath.example.com/assessment/clearpath-reading"
    },
    "scoreResults": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Score",
        "resultDatatypeTypeDescriptor": "uri://ed-fi.org/ResultDatatypeTypeDescriptor#Decimal",
        "result": "20.20"
      }
    ],
    "performanceLevels": [
      {
        "assessmentReportingMethodDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/AssessmentReportingMethodDescriptor#Subtest Level",
        "performanceLevelDescriptor": "uri://clearpath.example.com/assessment/clearpath-reading/PerformanceLevelDescriptor#Lower than Average",
        "performanceLevelMet": true
      }
    ]
  }
]
```

#### GOVERNANCE — SECTION 5.2: CORRECT GRAIN ENFORCEMENT

Overall composite results belong on StudentAssessment.scoreResults and StudentAssessment.performanceLevels. Subtest results belong in the studentObjectiveAssessments collection, each nested under its corresponding objectiveAssessmentReference. Placing a composite score inside a studentObjectiveAssessment element — or placing a subtest score directly on StudentAssessment — violates grain enforcement. Both errors produce analytically unusable data and will fail certification validation.

#### API SEQUENCING — SECTION 11

ObjectiveAssessments (which reference the Assessment), then StudentAssessments (which reference both). Posting a StudentAssessment before its parent Assessment exists will fail with a referential integrity error. This dependency order must be deterministic and repeatable across every ingestion run.

#### Descriptor reference — ClearPath Reading Benchmark

Every descriptor used in this example is listed below with its namespace, type, and ownership classification. Vendor-owned descriptors use the clearpath.example.com namespace prefix. Ed-Fi shared descriptors use the ed-fi.org namespace. This table should be included in vendor documentation and supplied as part of the integration evidence artifact package.

|**Descriptor value**|**Type**|**Owner**|
|---|---|---|
|AssessmentReportingMethodDescriptor#Composite<br />Score|AssessmentReportingMethod|**Vendor**|
|AssessmentReportingMethodDescriptor#SEM|AssessmentReportingMethod|**Vendor**|
|AssessmentReportingMethodDescriptor#Benchmark<br />Level|AssessmentReportingMethod|**Vendor**|
|AssessmentReportingMethodDescriptor#Subtest Score|AssessmentReportingMethod|**Vendor**|
|AssessmentReportingMethodDescriptor#Subtest Level|AssessmentReportingMethod|**Vendor**|
|AssessmentPeriodDescriptor#Fall|AssessmentPeriod|**Vendor**|
|PerformanceLevelDescriptor#Did not yet meet<br />expectations|PerformanceLevel<br />(composite)|**Vendor**|
|PerformanceLevelDescriptor#Approaching expectations|PerformanceLevel<br />(composite)|**Vendor**|
|PerformanceLevelDescriptor#Met expectations|PerformanceLevel<br />(composite)|**Vendor**|
|PerformanceLevelDescriptor#Exceeded expectations|PerformanceLevel<br />(composite)|**Vendor**|
|PerformanceLevelDescriptor#Lower than Average|PerformanceLevel (subtest)|**Vendor**|
|PerformanceLevelDescriptor#Average|PerformanceLevel (subtest)|**Vendor**|
|PerformanceLevelDescriptor#Higher than Average|PerformanceLevel (subtest)|**Vendor**|
|GradeLevelDescriptor#Kindergarten (and Grade 1–3)|GradeLevel|**Ed-Fi shared**|
|AcademicSubjectDescriptor#English Language Arts|AcademicSubject|**Ed-Fi shared**|
|ResultDatatypeTypeDescriptor#Integer|ResultDatatypeType|**Ed-Fi shared**|
|ResultDatatypeTypeDescriptor#Decimal|ResultDatatypeType|**Ed-Fi shared**|

ResultDatatypeTypeDescriptor#Level is an Ed-Fi shared ResultDatatypeType.

#### GOVERNANCE — SECTION 7: DESCRIPTOR AND NAMESPACE GOVERNANCE

Vendor-owned descriptors must use the vendor's registered namespace prefix. They must not be normalized, translated, or replaced with Ed-Fi default namespace values at ingestion. A state or district implementer is not permitted to change PerformanceLevelDescriptor#Did not yet meet expectations to a locally preferred label during load. Doing so destroys the semantic integrity that enables cross-vendor and cross-state comparability. Shared cross-domain descriptors (GradeLevel, AcademicSubject, ResultDatatypeType) use the Ed-Fi default namespace and may be configured through governed mapping layers.

#### API call sequence summary

All resources must be POSTed in the dependency order shown below. Steps 1 and 2 are one-time setup for the assessment definition and are re-posted only when the assessment version changes. Step 3 is executed once per student per administration window.

|||||
|---|---|---|---|
|**#**|**Resource**|**Records**|**Dependency**|
|**1**|POST /ed-fii/assessments|1|None|
|**2**|POST /ed-fii/objectiveAssessments|3 (one per subscore)|Assessment (Step 1) must exist|
|**3**|POST /ed-fii/studentAssessments|1 per student per window|Assessment + ObjectiveAssessments (Steps 1 and 2) must exist|

#### REPROCESSING — SECTION 11.3

All three resource types are safe to reprocess. A repeated POST with the same natural key will upsert rather than duplicate, provided all identity fields remain identical across runs. Never substitute a processing timestamp for administrationDate — doing so breaks idempotent reprocessing and will generate duplicate student records that cannot be deduplicated without manual intervention.
