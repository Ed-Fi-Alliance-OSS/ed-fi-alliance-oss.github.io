---
title: "Part III: Data Modeling Requirements"
sidebar_position: 4
---


## 3. Assessment Identity

Assessment identity must be established and consistently applied across implementations. Assessment identity is a governance decision, not an implementation detail.

### 3.1 What Makes an Assessment Unique?

An Assessment is uniquely defined by the combination of Namespace and AssessmentIdentifier. Together, these form the identity contract that determines analytic grain, ownership, and comparability across implementations and over time. Namespace establishes ownership and prevents collisions, while AssessmentIdentifier defines meaning and analytic grain.

When identity is inconsistently defined:

- The same assessment may appear at different grains
- Subject meaning may be ambiguous
- Longitudinal results may fragment
- Downstream systems must rely on vendor-specific logic to interpret the data

This breaks interoperability and undermines one of Ed-Fi’s core goals: eliminating custom transformation logic.

A consistent identity strategy ensures that:

- A math benchmark and a reading benchmark are represented as distinct assessments
- The same assessment across years retains a stable identifier when the structure has not changed
- Form or administration differences are handled outside of identity unless they change the meaning of the score

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that assessment identity is consistently defined, applied, and governed across implementations:

- Defining the identifier convention
- Ensuring consistency across implementations
- Aligning identity decisions with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they introduce ambiguity in identity and require downstream systems to reconstruct meaning:

- Encoding subject inconsistently (sometimes in the identifier, sometimes not)
- Collapsing multiple subjects into a single top-level assessment
- Treating forms or versions inconsistently across implementations
- Encoding time elements (BOY, MOY, EOY, school year) into the identifier when the structure is unchanged

Establishing a consistent identity strategy ensures that assessment results remain interpretable, comparable across implementations, and usable for longitudinal analysis without requiring downstream systems to infer or reconstruct meaning through custom logic.

### 3.2 The Highest-Grain Rule

The AssessmentIdentifier must represent the highest grain at which overall results are defined. This means the identifier defines the level at which a student receives a complete, top-level outcome for the assessment. Assessment identity must align with how results are actually reported and interpreted. The highest grain is the level at which overall outcomes, such as composite scores, overall performance levels, or total scores, are defined.

If identity is defined below this level:

- Overall results may be fragmented across multiple assessments
- Relationships between subscores and overall outcomes may be lost
- Downstream systems must reconstruct hierarchy to interpret results

If identity is defined above this level:

- Multiple distinct results may be incorrectly combined
- Subject meaning may become ambiguous
- Analytic comparisons become unreliable

Defining identity at the correct grain ensures that the structure of results aligns with how they are consumed in reporting and analysis.

In practice, the highest grain should align with the assessment title and subject, because this is the level at which overall results are defined and interpreted.

For example:

- A math benchmark and a reading benchmark should be represented as separate assessments
- A multi-subject instrument should not collapse multiple subjects into a single top-level assessment unless the vendor explicitly reports a composite at that level

Subscores, strands, domains, and other breakdowns must not define separate assessments. These belong within the assessment structure and are represented through ObjectiveAssessment and the StudentObjectiveAssessment collection within the StudentAssessment record.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that assessment identity is defined at the correct grain and aligned to how results are reported and interpreted:

- Aligning identifier design to the vendor’s score report structure
- Ensuring consistency across implementations
- Avoiding adjustments to grain based on partner-specific requirements

The chosen grain must remain stable and must not vary across deployments.

#### Prohibited Patterns

The following patterns are not allowed because they break alignment between identity and results by distorting the relationship between structure and outcomes and requiring downstream systems to reconstruct meaning:

- Defining separate assessments for subscores, strands, or domains
- Collapsing multiple subjects into a single assessment when results are reported separately
- Defining identity at a level that does not include overall results

Defining identity at the correct grain ensures that downstream systems can support growth analysis, subgroup reporting, and cross-assessment comparisons without reconstructing meaning through custom logic.

### 3.3 Identifier Stability

AssessmentIdentifier values must remain stable over time for the same assessment when the structure and meaning of results have not changed. This stability is foundational to longitudinal analysis, ensuring that results can be compared across administrations, school years, and implementations.

When identifiers change unnecessarily:

- Longitudinal trends are broken
- Historical results cannot be reliably compared
- Duplicate assessments appear in downstream systems
- Analytics require custom logic to reconcile identity over time

Identifier stability means that:

- The same assessment administered across multiple years retains the same AssessmentIdentifier when the structure and meaning of results remain consistent
- Routine operational differences, such as administration window (BOY, MOY, EOY), school year, or minor form variations, do not require a new identifier

A new AssessmentIdentifier is required when:

- The assessment structure changes (e.g., new hierarchy, different scoring model)
- The meaning of results changes (e.g., scale reset, redefinition of performance levels)
- The assessment is redesigned in a way that affects interpretation

AssessmentIdentifier must not include:

- Vendor name (Namespace already communicates ownership)
- Administration window (BOY, MOY, EOY)
- Random or unstable numeric codes that are not interpretable
- State labels unless the assessment is structurally different in that state in a way that affects scoring, hierarchy, or interpretation

Version indicators should only be included when the assessment has materially changed in a way that affects comparability or interpretation.

#### Assessment Provider Responsibility (Score vs. Performance Levels)

The assessment provider is responsible for ensuring that assessment identifiers remain stable over time and change only when the structure or meaning of results materially changes.

- Maintaining identifier stability
- Defining clear versioning rules
- Establishing criteria for when a new identifier is required
- Ensuring that identifier decisions are applied consistently across implementations
- Aligning identifier changes with governance expectations and documentation

#### Prohibited Patterns (Score vs. Performance Levels)

The following patterns are not allowed because they break longitudinal integrity by fragmenting assessment identity and requiring downstream systems to reconstruct meaning:

- Changing AssessmentIdentifier values for routine administration differences
- Encoding time-based elements or versioning information directly into the identifier when the assessment meaning has not changed
- Reusing an AssessmentIdentifier when the assessment structure or meaning has materially changed
- Creating new identifiers for the same assessment across different implementations or partners

Maintaining identifier stability ensures that longitudinal analysis, growth measurement, and cross-year comparisons remain accurate and do not require downstream systems to reconcile fragmented assessment identities through custom logic.

### 3.4 Assessment Family

AssessmentFamily is used to group related assessments that are part of the same product line or progression but remain distinct at the assessment identity level.

Assessments within a family may share common characteristics, such as subject area, vendor origin, or intended use, but each assessment must maintain its own Namespace and AssessmentIdentifier based on its structure and results. AssessmentFamily does not replace or override assessment identity. It provides an organizational relationship across assessments that are intentionally modeled as separate.

Assessment families are especially useful for representing related instruments within a vendor product suite.

However, these relationships must not be used to collapse or blur distinctions between assessments that produce different results or have different structures.

A correct use of AssessmentFamily ensures that:

- Each assessment retains a clear and consistent identity aligned to its results
- Relationships between assessments are explicitly defined without altering their meaning
- Grouping supports organization and navigation without impacting analytic interpretation

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that assessment family relationships are clearly defined, consistently applied, and do not override or conflict with assessment identity:

- Establishing clear criteria for which assessments belong to the same family
- Ensuring consistent grouping across implementations
- Aligning family definitions with governance expectations and documentation

AssessmentFamily must not be used as a substitute for proper identity design or to compensate for inconsistent identifier strategies.

#### Prohibited Patterns

The following patterns are not allowed because they obscure assessment meaning and create ambiguity in how results should be interpreted:

- Using AssessmentFamily to group assessments that should be represented as a single assessment
- Using AssessmentFamily to compensate for inconsistent or incorrect AssessmentIdentifier
definitions
- Grouping assessments with materially different structures or scoring models without a clear
distinction
- Relying on AssessmentFamily to drive analytic logic instead of using a properly defined
assessment identity

Proper use of AssessmentFamily ensures that related assessments can be organized and understood together while preserving a clear, consistent identity. This allows downstream systems to group, filter, and analyze related assessments without compromising interpretability or requiring custom logic to reconstruct relationships.

## 4. Subject Strategy

Subject strategy exists to enforce the foundational principle of protecting subject integrity. Subject ambiguity is one of the highest-cost failure patterns because it forces downstream systems to infer meaning using vendor-specific logic, which is not stable or scalable.

### 4.1 The Single Subject Rule

Each Assessment must resolve to exactly one AcademicSubject.

This is the standard that enables district analytics, state reporting alignment, course-linked reporting, CCR and CCMR pipelines, and cross-vendor comparability. When subject is ambiguous at the top level, downstream systems must infer meaning from score names or structure, which introduces inconsistency and breaks comparability.

If an assessment cannot resolve to a single subject, it must use a subject of _Composite_ , with subjectspecific results represented through ObjectiveAssessments.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that each assessment resolves to a single, explicitly defined subject that aligns with how results are reported and interpreted:

- Defining a single AcademicSubject for each assessment
- Ensuring subject assignment is consistent across implementations
- Avoiding reliance on downstream systems to infer subject meaning
- Aligning subject decisions with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they introduce subject ambiguity and require downstream systems to reconstruct meaning:

- Assigning multiple subjects to a single top-level Assessment
- Requiring downstream systems to infer subject from score names or objective structure
- Inconsistently assigning subject across implementations for the same assessment

Establishing a single, explicit subject ensures that assessment results remain interpretable, comparable across implementations, and usable for subject-based analysis without requiring downstream systems to infer meaning through custom logic.

### 4.2 Subject Integrity Enforcement

Subject integrity must be established at ingestion and must not depend on downstream interpretation. If subject meaning is not explicit in the model, the data may load successfully but will not support reliable analytics.

Subject integrity ensures that:

- Results can be filtered and compared consistently
- Cross-vendor analysis remains valid
- Subject-based reporting does not require custom logic
- Composite and subject-specific results remain analytically distinct

#### Composite Handling

Cross-subject instruments are the primary case where subject integrity must be enforced through structure.

For any assessment that spans multiple subjects:

- The top-level Assessment subject must be Composite
- Subject-specific results must be represented through ObjectiveAssessment

This approach ensures that:

- Composite results are not misattributed to a single subject
- Subject-level results remain available for analysis
- Subject-based queries behave predictably

Subject meaning must be clear at every level of the model. A subject-specific query should not unintentionally include composite results due to ambiguous modeling.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that subject meaning is explicit, stable, and consistently applied across all aspects of the assessment model.

- Assign Composite as the top-level subject for cross-subject assessments
- Ensuring subject meaning is explicitly defined at the assessment level
- Preventing ambiguity between composite and subject-specific results
- Maintaining consistency across implementations and over time
- Aligning subject modeling decisions with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they break subject integrity and introduce ambiguity in interpretation:

- Multi-subject top-level assessments without Composite designation
- Any design that requires subject inference from score names or structure
- Inconsistent subject modeling across implementations of the same assessment

Enforcing subject integrity at ingestion ensures that assessment data remains reliable, comparable, and analytically usable across systems, preventing ambiguity and eliminating the need for downstream systems to infer or reconstruct subject meaning.

## 5. Hierarchy and Results Placement

Hierarchy and results placement define how assessment structure (metadata) and student outcomes (results) are represented in the Ed-Fi model.

This section operationalizes the core entities defined in Section 2.2:

- Assessment and ObjectiveAssessment define the structure
- StudentAssessment and StudentObjectiveAssessment deliver results within that structure

These two layers must remain strictly aligned. The structure declared by the assessment must match the placement of student results.

This is the primary enforcement point for a native Ed-Fi assessment integration.

Correct implementation preserves the relationship between structure and results exactly as defined in the vendor score report. This allows results to be interpreted directly, without vendor-specific logic, reconstruction, or score-name parsing.

Incorrect implementation breaks that relationship. Data may load into Ed-Fi, but:

- Hierarchy must be inferred rather than represented
- Subject and grain become ambiguous
- Downstream systems must reconstruct the structure
- Cross-vendor comparability is lost

This section defines the rules that eliminate these failure modes by ensuring that:

- The full score report is represented
- Hierarchy is modeled explicitly and completely
- Results are placed at the correct grain
- Structure and results remain aligned across all implementations

These rules are not optional. They are required for an integration to be considered complete, interoperable, and analytically usable.

### 5.1 Modeling the Hierarchy

The assessment hierarchy must faithfully and completely represent the structure defined in the vendor score report.

This is where the conceptual model from Section 2.2 becomes operational:

- _Assessment_ defines the top-level instrument at the highest grain where overall results exist
- _ObjectiveAssessment_ defines the hierarchical components of the assessment
- _StudentAssessment_ records a student’s attempt and holds the overall results
- _StudentObjectiveAssessment_ (a collection within _StudentAssessment_ ) records results aligned to ObjectiveAssessment

Assessment metadata must declare the structure first. Student results must then align to that structure exactly. A native integration is not simply sending scores. It is sending a structured representation of the assessment and results that conform to that structure.

If the vendor score report includes subscores, domains, strands, subtests, measures, skills, or reporting categories, those structures must be represented using ObjectiveAssessment. The corresponding results must be delivered through StudentObjectiveAssessment. If the score report contains hierarchy, the model must reflect it exactly.

When hierarchy is not faithfully modeled:

- Structural meaning is lost
- Subscore relationships become ambiguous
- Results must be interpreted through score names or vendor-specific conventions
- Downstream systems must reconstruct the structure
- Cross-vendor comparison becomes unreliable

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that the assessment hierarchy is faithfully defined, consistently applied, and aligned to the vendor score report across implementations:

- Define Assessment at the correct top-level grain
- Model ObjectiveAssessment structures wherever hierarchy exists
- Apply recursive hierarchy when multiple levels are present
- Preserve all parent-child relationships across levels
- Ensure StudentObjectiveAssessment results align with ObjectiveAssessment definitions
- Maintain consistent hierarchy across implementations

#### Prohibited Patterns

The following patterns are not allowed because they break the relationship between assessment structure and results and require downstream systems to reconstruct hierarchy or infer meaning:

- Omitting ObjectiveAssessment when hierarchy exists
- Collapsing multi-level hierarchy into a single level
- Flattening structure into score names instead of modeling it
- Defining ObjectiveAssessment structures that do not match the score report
- Defining structure without delivering corresponding results
- Treating StudentObjectiveAssessment as a standalone entity or payload
- Modeling the same assessment with different hierarchies across implementations

Modeling the true hierarchy ensures that structure and results remain aligned and eliminates the need for downstream reconstruction.

### 5.2 Full Result Delivery

A native integration must deliver the complete vendor score report, not a subset of results.

All results present in the vendor score report must be represented and placed at the correct level unless prohibited by policy or regulation. Partial representation is not a complete or native integration. This is the primary enforcement point for correct modeling.

#### Core Principle

Every reported value must be delivered:

- If a value appears on the vendor score report, it must appear in the integration
- If a structure is defined (via ObjectiveAssessment), corresponding results must be present
- If results exist, they must be delivered at the level where they are reported

A native integration is a faithful transmission of the full score report, not an interpretation or reduction of it.

#### What Must Be Included

The integration must include all available result types, including:

- Scale scores
- Performance levels
- Percentiles and rankings
- Growth Measures
- Subscores at all reported levels
- Subtest, domain, strand, or skill-level results
- And additional reported metrics or indicators

If the vendor reports it, the integration must deliver it.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that the full score report is delivered consistently and completely across implementations:

- Deliver all reported results, not a subset

- Ensure every defined structure has corresponding results

- Preserve all reported values and levels of detail

- Maintain consistency across administrations and integrations

#### Prohibited Patterns

The following patterns are not allowed because they result in incomplete or distorted representations of the score report:

- Omitting subscores or lower-level results

- Sending only overall scores when additional detail exists

- Delivering different levels of detail across implementations

- Defining structure without delivering corresponding results

- Filtering results based on perceived importance or use

- Delivering derived values instead of vendor-reported values

### 5.3 Recursive Objective Structures

ObjectiveAssessment must be used recursively when the score report includes multiple levels of hierarchy.

Many assessments include nested structures such as domains, strands, subdomains, or reporting categories. These must be represented using explicit parent-child ObjectiveAssessment relationships.

All results across these levels must be captured within the StudentObjectiveAssessment collection.

The rule is simple: _If the score report has hierarchy, the model must reflect it._

When recursive structure is not modeled:

- Multi-level relationships are lost

- Subscores lose context

- Results cannot be interpreted consistently

- Detailed analysis becomes unreliable

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that recursive objective structures are accurately defined, fully represented, and consistently applied across implementations:

- Identify all levels of hierarchy in the score report

- Define ObjectiveAssessment relationships to match that hierarchy

- Model all levels consistently

- Align results to the correct level

- Ensure all results are delivered within StudentObjectiveAssessment

#### Prohibited Patterns

The following patterns are not allowed because they collapse or distort hierarchical structure and require downstream systems to reconstruct relationships or infer meaning:

- Modeling multi-level assessments as flat structures

- Skipping levels present in the score report

- Representing hierarchy through naming instead of structure

- Creating structure without corresponding results

- Inconsistent hierarchy across implementations

Recursive modeling ensures that complex assessments retain their full meaning without downstream reconstruction.

### 5.4 Score vs. Performance Level Separation

Scores and performance levels are distinct and must be modeled separately.

- _Scores_ are quantitative (scale scores, raw scores, percentiles, growth metrics)

- _Performance levels_ are categorical (proficiency levels, risk bands, achievement categories)

They are not interchangeable and are not inherently one-to-one.

When these concepts are conflated:

- Numeric values are misinterpreted as categories

- Performance levels are compared incorrectly across assessments

- Analytical meaning is lost

#### Assessment Provider Responsibility (Section 5.4)

The assessment provider is responsible for ensuring that scores and performance levels are clearly separated, correctly represented, and consistently applied across implementations:

- Model quantitative results as scores

- Represent performance levels using descriptor-based fields

- Preserve vendor-defined performance level semantics

- Avoid implicit mappings between scores and levels

- Use descriptor categories consistently

#### Prohibited Patterns (Section 5.4)

The following patterns are not allowed because they conflate distinct concepts and require downstream systems to reinterpret or infer analytical meaning:

- Storing performance levels as numeric scores

- Storing scores as categorical descriptors

- Treating scores and performance levels as interchangeable

- Reusing descriptor categories across contexts

- Embedding performance level meaning in score values

Separating scores from performance levels preserves analytical clarity and prevents downstream misinterpretation.

### 5.5 Indicators vs. Scores

Not all assessment data represents performance. Indicators must not be modeled as scores.

Indicators include:

- Participation status

- Accommodations

- Testing conditions

- Risk or context flags

These provide context, not performance outcomes.

Indicators must be represented using other appropriate fields or constructs within the student assessment entity and must not be included in score results.

When indicators are stored as scores:

- Performance data is contaminated

- Non-performance values are misinterpreted

- Analytics produce incorrect conclusions

_- Ed Fi Data Standard 6.0_ introduces structured support for indicators not otherwise captured in a specific property, reinforcing this separation.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that indicators are correctly represented, separated from performance data, and consistently applied across implementations:

- Identify non-performance attributes

- Map indicators to appropriate constructs

- Ensure indicators are not included in score results

- Preserve the distinction between performance and context

- Align indicator modeling with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they misrepresent contextual data as performance and require downstream systems to reinterpret or infer meaning:

- Storing indicators as score results

- Using score fields for participation or status

- Mixing indicators with performance data

- Encoding indicator meaning through score naming

Separating indicators from scores ensures that performance data remains accurate and analytically valid.

## 6. Event Identity and Longitudinal Integrity

Event identity defines how a student's assessment attempt is anchored in time and context. Without a complete and consistent event definition, assessment results cannot be reliably interpreted, aligned to enrollment, or used for longitudinal analysis.

A StudentAssessment is not just a container for results. It represents a specific assessment event for a student. That event must include the contextual fields required to distinguish when the assessment occurred, under what conditions, and how it relates to other attempts over time.

This section enforces the foundational principle of including full event context. Without it, results may load successfully, but cannot support growth analysis, cohort tracking, enrollment alignment, or reporting pipelines such as CCR and CCMR.

### 6.1 Required Event Context Fields

A StudentAssessment must include the event context necessary to uniquely identify and interpret a student’s assessment attempt.

These fields anchor the assessment in time and context and must be populated when available, even if not required by a state reporting specification.

- _SchoolYear_ ensures that results are grouped into the correct academic year

- _AdministrationDate_ distinguishes individual attempts and enables alignment to enrollment and instruction timelines

- _AssessmentPeriod_ provides a consistent interpretation of when the assessment occurred within the instructional cycle

- _WhenAssessedGradeLevel_ anchors the result to the student’s grade at the time of assessment

- _RetestIndicator_ distinguishes first attempts from subsequent attempts when multiple administrations occur

Without these fields, assessment results lose temporal meaning and cannot be reliably interpreted across systems.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that event context is fully defined, accurately represented, and consistently applied across implementations:

- Populate all required event context fields when available

- Ensure event context reflects the actual timing and conditions of the assessment

- Align event context values to the vendor’s source data and score report

- Maintain consistent use of event context fields across implementations

- Ensure multiple attempts are distinguishable through event context rather than identity

#### Prohibited Patterns

The following patterns are not allowed because they remove temporal context and require downstream systems to reconstruct or infer event identity:

- Omitting SchoolYear when it is available

- Omitting AdministrationDate when it is available

- Omitting AssessmentPeriod when the vendor defines one

- Omitting WhenAssessedGradeLevel when available

- Failing to distinguish multiple attempts when retesting occurs

Populating a complete event context ensures that assessment results remain interpretable, align with enrollment and reporting periods, and support longitudinal analysis without requiring downstream systems to infer timing or reconstruct attempt history.

### 6.2 Why Missing Event Context Breaks Everything

Event context is not optional metadata. It is the foundation for interpreting results over time. When event context is missing or incomplete:

- Attempts cannot be reliably grouped into the correct academic year

- Multiple attempts cannot be distinguished or sequenced correctly

- Enrollment alignment becomes unreliable or impossible

- Growth analysis becomes inconsistent across systems

- Cohort and program analysis cannot be trusted

The impact is immediate and systemic:

- Without _SchoolYear_ , off-cycle or summer assessments may be grouped into the wrong reporting window

- Without _AdministrationDate_ , retakes cannot be ordered, and attempt history becomes unreliable

- • Without _AssessmentPeriod_ and grade context, systems must invent heuristics for growth interpretation, leading to inconsistent results

- Without a clear attempt context, longitudinal grouping becomes fragmented

The result is not just incomplete data. It is ambiguous data that cannot be consistently interpreted across systems, partners, or time.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that event identity is complete and sufficient to support longitudinal analysis and consistent interpretation across implementations:

- Provide complete event context for every StudentAssessment record

- Ensure that event context enables reliable grouping, sequencing, and comparison of results

- Align event context to enrollment and reporting timelines

- Maintain consistency in how event context is defined and populated across implementations

#### Prohibited Patterns

The following patterns are not allowed because they break longitudinal integrity and require downstream systems to reconstruct or infer event meaning:

- Delivering results without sufficient context to distinguish attempts

- Relying on downstream systems to infer academic year or reporting period

- Using inconsistent or ambiguous definitions of assessment period

- Providing incomplete event context that prevents reliable grouping or sequencing of results

Ensuring complete event identity preserves longitudinal integrity, enabling accurate growth analysis, cohort tracking, and reporting without requiring downstream systems to reconstruct or infer temporal context.

### 6.3 Event Identity Modeling Rules

Event identity must be represented through explicit context fields, not encoded into identifiers or implied through naming conventions.

Identifiers define what the assessment is. Event context defines when and how it occurred. These responsibilities must remain separate.

- Assessment identity becomes unstable

- Longitudinal analysis is fragmented

- Implementations become inconsistent across partners

- Downstream systems must reverse-engineer meaning

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that event identity is modeled explicitly through context fields and not embedded in identifiers or naming conventions across implementations:

- Represent timing and attempt context using defined event fields

- Keep assessment identity separate from event context

- Ensure consistency in how event identity is modeled across implementations

- Align event modeling decisions with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they conflate identity and event context and require downstream systems to reconstruct or infer meaning:

- Encoding BOY, MOY, EOY, or time-based labels in AssessmentIdentifier

- Using school year as part of the assessment identity when structure is unchanged

- Encoding event timing in identifiers instead of context fields

- Using AssessmentPeriod as a substitute for event identity instead of context

- Relying on naming conventions to convey timing or attempt information

Modeling event identity through explicit context fields ensures that assessment identity remains stable while event context remains interpretable, enabling consistent longitudinal analysis without requiring downstream systems to reconstruct meaning.

## 7. Descriptor and Namespace Governance

Descriptors are not just technical values. They carry semantic meaning that must remain consistent, interpretable, and traceable back to the source assessment. Namespaces define ownership of that meaning.

A native integration preserves vendor-reported meaning at ingestion and ensures that any interpretation, normalization, or cross-assessment comparison occurs through transparent, governed downstream processes.

Cross-vendor comparability is not achieved by rewriting vendor data at ingestion. It is achieved through consistent modeling, preserved semantics, and explicit mapping layers applied after ingestion.

Incorrect descriptor governance does not break data loading. It breaks meaning.

### 7.1 Vendor Namespace Rules

Native integrations must preserve vendor-native score names, reporting methods, and performance level semantics exactly as defined in the vendor score report.

A native integration does not alter, simplify, or normalize vendor meaning during ingestion.

This applies to all assessment-specific descriptors, including:

- Assessment reporting method descriptors (e.g., score names)

- Performance level descriptors (e.g., proficiency categories)

- Assessment category descriptors

- Assessment period descriptors

If interpretation or grouping is required for analytics, it must be implemented through:

- governed downstream mapping layers, or

- clearly defined metadata aligned to vendor-specific values

At ingestion, preservation of meaning is the priority.

This ensures:

- Full transparency of what the vendor reported

- Traceability back to the original score report

- Ability to support multiple analytic interpretations

- Elimination of hidden transformation logic

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that vendor-specific descriptors, including score names and performance level semantics, are preserved exactly as defined and consistently applied across implementations:

- Publish descriptor values exactly as defined in the vendor score report

- Use a vendor-specific namespace for all assessment-owned descriptors

- Preserve performance level definitions without remapping or simplification

- Ensure consistency of descriptor values across implementations

- Align descriptor usage with governance expectations

#### Prohibited Patterns

The following patterns are not allowed because they alter source meaning and require downstream systems to reconstruct or reinterpret vendor semantics:

- Normalizing or renaming vendor score descriptors at ingestion

- Mapping performance levels to simplified or local categories during ingestion

- Overwriting vendor descriptor values with implementation-specific definitions

- Collapsing distinct vendor measures into a single generic descriptor

- Embedding interpretation logic within descriptor values

Preserving vendor namespace semantics ensures that meaning remains intact at ingestion and that any analytical interpretation is transparent, governed, and reproducible.

### 7.2 Default Namespace Usage

Certain descriptors represent shared dimensions across the Ed-Fi data model and must remain in the default Ed-Fi namespace unless a defined extension applies.

These include:

- AcademicSubject

- GradeLevel

- Language

These descriptors are not owned by the assessment provider, even when referenced within assessment metadata.

Maintaining these descriptors in the default namespace ensures:

- Consistency across domains such as assessments, courses, and student records

- Reliable cross-domain analysis

- Elimination of conflicting definitions across implementations

Implementations may apply environment-specific mappings for shared cross-domain descriptors through governed configuration layers when required to align with local Ed-Fi environments. However, assessment-specific descriptors, including vendor-defined score names and performance levels, must remain vendor-defined at ingestion and must not be locally overridden during load processing.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that shared descriptors are correctly referenced from the default namespace and consistently applied across implementations:

- Use default Ed-Fi descriptors for shared dimensions

- Align descriptor values to those defined in the target implementation

- Avoid redefining shared descriptors within the vendor namespace

- Ensure consistent usage across integrations

#### Prohibited Patterns

The following patterns are not allowed because they introduce inconsistency across domains and require downstream systems to reconcile conflicting definitions:

- Defining AcademicSubject within a vendor namespace

- Defining GradeLevel within a vendor namespace

- Creating duplicate descriptor sets for shared dimensions

- Using inconsistent descriptor values across implementations

Using default namespace descriptors ensures cross-domain consistency and supports reliable integration across systems.

### 7.3 Descriptor Governance by Domain

Descriptor governance must clearly distinguish between assessment-specific descriptors and shared descriptors used across domains.

Assessment-specific descriptors are owned by the assessment provider and must be defined and maintained within the vendor namespace. Assessment-specific descriptors must not be locally overridden or remapped at ingestion because doing so compromises the semantic integrity of the assessment results.

These include:

- Assessment reporting method descriptors

- Performance level descriptors

- Assessment category descriptors

- Assessment period descriptors

Performance level semantics must be preserved as vendor-defined descriptor values. They must not be remapped to local or simplified categories at ingestion.

These descriptors are intrinsic to the assessment and must reflect vendor-defined meaning without modification.

In contrast, non-assessment descriptors:

- AcademicSubject

- GradeLevel

- Language

are shared across domains and must align to the implementation environment.

Failure to separate these responsibilities introduces ambiguity and breaks interoperability.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that descriptor ownership is clearly defined and consistently applied across implementations:

- Define assessment-specific descriptors within the vendor namespace

- Preserve vendor-defined meaning for all assessment descriptors

- Reference shared descriptors from the default namespace

- Avoid redefining or overriding shared descriptors

- Maintain consistent descriptor governance across integrations

#### Prohibited Patterns

The following patterns are not allowed because they blur ownership boundaries and require downstream systems to infer or reconcile descriptor meaning:

- Mixing assessment and non-assessment descriptors within the same namespace

- Redefining shared descriptors within the vendor namespace

- Using vendor namespaces for cross-domain descriptors

- Applying inconsistent governance rules across descriptor types

Clear separation of descriptor governance ensures that meaning remains consistent, ownership is explicit, and cross-domain integration remains reliable.
