---
title: "Assessment Vendor Ed-Fi Native Integration Playbook"
sidebar_position: 1
---

- Part I: Executive Summary (you are here)
- [Part II: How Ed-Fi Assessment Data Works](./part-ii-how-edfi-assessment-data-works.md)
- [Part III: Data Modeling Requirements](./part-iii-data-modeling-requirements.md)
- [Part IV: Student Identity and Rostering](./part-iv-student-identity-and-rostering.md)
- [Part V: Integration Architecture and Operations](./part-v-integration-architecture-and-operations.md)
- [Part VI: Validation and Certification](./part-vi-validation-and-certification.md)

## 1 Executive Summary

### 1.1 Purpose

The purpose of this playbook is to define clear guidance and foundational design principles for what
constitutes a native Ed-Fi Data Standard assessment integration.

The Ed-Fi Alliance provides a data standard and an API-based interoperability framework used by education agencies to exchange data consistently across domains such as assessment, enrollment, attendance, grades, and demographics. In many implementations, this standard is operationalized through the Ed-Fi API, which provides a common interface for data exchange. For assessment providers, supporting the Ed-Fi Data Standard is not simply about delivering a file or exposing data elsewhere. It means integrating into a common, structured exchange model that enables assessment data to flow into a broader educational data ecosystem in a usable, governed way.

The Ed-Fi Assessment domain is intentionally flexible. It was designed to accommodate the wide variety of assessment instruments used across K–12 systems, including state summative assessments, formative screeners, interim benchmarks, college-readiness exams, diagnostic tools, and classroom-level measures. The model supports hierarchical structures, multiple score types, performance levels, and alignment to learning standards. That flexibility is powerful, and it is not self-governing. Without modeling discipline and governance alignment, the same assessment can be implemented in materially different ways across vendors, states, and districts. Data may technically load yet fail to support real-world analytics.

This playbook establishes a clear standard: a native Ed-Fi integration is not simply a data feed that posts results to an Ed-Fi ODS. It is an integration that publishes a complete, hierarchically accurate, subject-safe, and governance-aligned representation of an assessment, suitable for both compliance reporting and local analytic use without requiring custom downstream logic.

This playbook also makes it explicit that native integration is a full lifecycle responsibility, not just a data modeling exercise. It covers the major implementation workstreams required to move from raw vendor data to a production-ready integration, including data modeling, student identity and rostering, descriptor governance, integration architecture, operational readiness, and testing and certification.

### 1.2 What Districts and States Need from Assessment Data

Districts and states do not use assessment data as isolated scores. They rely on it to support operational, instructional, and policy decisions that require complete, structured, and longitudinally consistent data.

In practice, stakeholders expect to answer questions such as:

- How did this student grow from the beginning of the year to the end of the year?
- How are outcomes trending by subgroup, school, or program participation?
- How do students perform across different vendors’ assessments in a single dashboard?
- What was the student's performance at the time they were enrolled in a specific school?
- How do subdomain or strand-level results inform instruction and intervention?
- How do assessment outcomes connect to college and career readiness indicators?

These are not advanced use cases. They are baseline expectations for districts, state agencies, and research partners.

However, most assessment integrations are designed to satisfy a much narrower requirement: state reporting. A typical reporting specification may require only a composite score, a performance level, and a testing window or period indicator. While sufficient for compliance, this level of data is not sufficient for real-world use.

As a result, critical elements of the assessment are often lost or inconsistently represented. Subscores, growth measures, and contextual indicators may be omitted. Hierarchical structure may be flattened or partially modeled. Event context, such as the administration date or grade level, may be incomplete. Vendor-specific meaning may be lost or inconsistently interpreted.

The impact is predictable. Districts and states must reconstruct missing structures, reverse-engineer meaning, maintain vendor-specific transformation logic, and reconcile inconsistencies across systems and over time. This increases cost, delays access to insights, and limits the usability of the data.

A native Ed-Fi assessment integration is designed to eliminate these gaps.

It ensures that assessment data supports state reporting, district and school-level dashboards, longitudinal growth analysis, subgroup and program evaluation, and cross-vendor comparability— without requiring additional downstream engineering.

Completeness at ingestion enables usability downstream. When the full structure, context, and meaning of an assessment are preserved at the point of integration, the data becomes immediately usable across systems, partners, and use cases.

### 1.3 The Problem This Playbook Addresses

Despite widespread adoption of Ed-Fi, assessment integrations remain inconsistent, fragile, and difficult to scale. Limitations in the standard itself do not cause these challenges; rather, they stem from variability in how integrations are implemented across vendors and environments.

Four core problem areas consistently emerge:

#### Data Modeling Inconsistency

Vendors make different decisions about how to represent the same assessment in Ed-Fi, including how to define assessment identity, structure the hierarchy, assign subjects, and place results at the correct level in the student assessment record. These variations often produce datasets that pass API validation but cannot be analyzed consistently across districts, states, or vendors.

Without a shared modeling approach, analytics must be rewritten for each integration, undermining interoperability and increasing implementation cost.

#### Student Identity Mismatches

Assessment results must resolve to a valid StudentUniqueId to be usable. In practice, mismatches between vendor identifiers and district or state identity systems lead to rejected records, incomplete datasets, or silent data gaps.

Even low rates of identity misalignment can undermine longitudinal analysis, distort reporting, and require manual reconciliation efforts that do not scale.

#### Descriptor Governance Failures

Descriptors define the meaning of data elements. When vendor-specific values are overwritten, reused incorrectly, or inconsistently mapped, the data's semantic integrity is lost.

This results in ambiguity between scores and performance levels, inconsistency across domains such as assessment and courses, and a lack of transparency in how values are interpreted downstream.

#### Operational Reliability Gaps

Many integrations are not designed for repeatable, large-scale operation. Missing dependency enforcement, weak reprocessing logic, inconsistent scheduling, and limited monitoring create systems that are difficult to maintain and prone to failure.

These gaps lead to incomplete loads, duplicate records, delayed data availability, and a high ongoing support burden for both vendors and education agencies.

The result across all four areas is the same: technically valid data that cannot be reliably used without vendor-specific transformation, manual intervention, or parallel data pipelines.

This playbook addresses these problems by defining a consistent, end-to-end standard for how
assessment integrations should be modeled, implemented, and operated.

### 1.4 What This Playbook Covers

This playbook defines the full lifecycle of a native Ed-Fi assessment integration across six core
workstreams. Each workstream represents a critical component of a complete, scalable, and
analytically usable integration, and together they establish the expectations for moving from raw
assessment data to a production-ready implementation.

_**Data Modeling**_ defines how assessments, hierarchical structure, results, their placement within the student assessment record, and descriptors must be represented in the Ed-Fi data model. It establishes the rules that ensure assessment data is complete, interpretable, and consistent across vendors and environments.

_**Student Identity and Rostering**_ establishes how assessment results are aligned to StudentUniqueId and connected to the broader data ecosystem. It defines how identity is resolved, validated, and maintained, enabling results to support longitudinal analysis and enrollment-aligned reporting.

_**Descriptor Governance**_ defines how meaning is preserved at ingestion through proper use of namespaces and descriptor categories. It also establishes how mapping and interpretation are handled transparently, ensuring data remains consistent across domains and implementations.

_**Integration Architecture**_ specifies how data is transformed, validated, and transmitted into the Ed-Fi ODS/API. It defines the technical patterns that ensure integrations are reliable, repeatable, and scalable across multiple partners.

_**Operational Readiness**_ defines the runtime expectations for operating an integration in production. This includes scheduling, retry behavior, monitoring, error handling, and change management to ensure ongoing stability and maintainability.

_**Testing and Certification**_ establishes the validation criteria for confirming that the integration meets the
requirements of this playbook. It ensures that integrations are not only technically correct but also
complete, stable, and analytically usable.

Together, these workstreams define what it takes to move from a data feed that loads to an integration
that can be trusted, reused, and scaled across districts, states, and vendors.

### 1.5 The Business Case for Vendors

Adopting a native Ed-Fi assessment integration is not just a technical decision. It is a business decision that directly affects costs, scalability, and the long-term product strategy.

Today, most assessment integrations are built and maintained as one-off implementations. Variability across states, districts, and partners—particularly in areas such as rostering, student identity, descriptor usage, and data expectations—forces vendors into a repeated cycle of customization, support, and rework.

This playbook defines a different model: build once, implement consistently, and scale across partners.

**Without a standardized approach, vendors incur ongoing operational and engineering costs:**

#### Per-site customization cycles

Each implementation requires adapting to different rostering formats, identifier conventions, and data
expectations. Inconsistent rostering approaches across implementations create significant overhead in
aligning student identity and preparing data for integration.

#### Sustained support burden

Fragmented integrations lead to recurring issues with identity mismatches, missing data, and inconsistent behavior across environments. Support teams must continuously troubleshoot problems that stem from a lack of standardization rather than product defects.

#### Cross-site redesign and retrofit costs

Integrations built for one state or partner often require redesign when deployed elsewhere. As expectations evolve, especially with emerging standards, vendors are forced to revisit and retrofit prior work.

**With a native integration aligned to this playbook, vendors establish a scalable and repeatable foundation for growth:**

#### Scalable, repeatable deployment model

A consistent integration pattern reduces the need for per-partner customization, enabling faster onboarding across states and districts.

#### Clear alignment with procurement expectations

As ETC states, adopt this playbook within RFPs and vendor evaluation processes, and alignment to these standards becomes a differentiator and a pathway to broader adoption.

#### Future alignment with Ed-Fi Data Standard direction

Implementing these principles positions vendors for compatibility with Data Standard 6.0 and reduces the need for future rework as the ecosystem evolves.

#### Participation in a stable, interoperable ecosystem

Standardized integrations reduce fragmentation and enable vendors to operate in a more predictable, consistent data exchange environment.

**A native integration requires upfront investment and a shift from one-off delivery to standardized implementation:**

#### Initial investment in modeling and architecture

Vendors must design integrations that fully reflect the assessment structure, including how results are structured within student assessment records, reliably resolve student identity, and implement governance of descriptor handling and operational safeguards.

#### Commitment to consistency across implementations

The value of this approach lies in applying the same integration patterns across partners rather than adapting the model for each new environment.

#### Ongoing operational discipline

Integrations must be maintained with clear versioning, monitoring, and governance practices to ensure stability as both vendor products and Ed-Fi standards evolve.

A native Ed-Fi integration shifts that model by establishing a consistent, repeatable approach that reduces long-term cost, improves reliability, and aligns with emerging expectations across states and the broader ecosystem. The investment is upfront. The return is sustained.

### 1.6 Foundational Design Principles

The following principles define the governing logic of a native Ed-Fi assessment integration. They are
not implementation details. They are the constraints that ensure assessment data remains complete,
interpretable, and reusable across systems and over time.

These principles apply across all workstreams in this playbook and should guide every modeling, architecture, and operational decision that follows.

#### Send the Full Score Report

If a data element appears on the official score report and is available in vendor exports, it belongs in Ed-Fi unless a regulatory constraint prohibits it. This includes composite scores, subscores, percentiles, growth metrics, performance levels, risk indicators, contextual flags, accommodations, and administration conditions.

Publishing only the minimum required for state reporting results in incomplete datasets that cannot support real-world use. Ed-Fi is not a reporting file destination. It is an interoperability standard.

#### Model the Assessment Hierarchy

Assessment data must reflect the structure of the vendor’s scorebook. The Ed-Fi model provides explicit constructs to represent this hierarchy, including Assessment, ObjectiveAssessment, and StudentAssessment, which contains StudentObjectiveAssessment as a collection of objective-level results.

Top-level results belong at the student assessment level. Subscores belong within the StudentObjectiveAssessment collection inside the StudentAssessment record. If the vendor presents a hierarchical score report, the integration must preserve that structure. Collapsing hierarchy for convenience compromises analytical integrity.

#### Protect Subject Integrity (DS 6.0 Alignment)

Each assessment must resolve to exactly one academic subject. When an assessment produces cross-subject results, the top-level subject must be represented as _Composite_ , with subject-specific results modeled within the hierarchy.

Allowing multiple subjects at the top level forces downstream systems to infer meaning, which is not stable or reliable. Subject meaning must be explicit at ingestion.

#### Separate Scores from Performance Levels

Scores are quantitative measures. Performance levels are categorical interpretations. These concepts are distinct and must be modeled separately.

Treating performance levels as scores or assuming a one-to-one relationship between them reduces analytical clarity and introduces ambiguity into downstream use.

#### Preserve Vendor Semantics

Assessment-specific descriptors, including score names and performance levels, must retain vendor-defined meaning within the vendor namespace. Normalization to shared analytic categories should occur downstream, where context is known.

Preserving vendor semantics maintains transparency, avoids hidden transformation logic, and allows multiple interpretations of the same data without loss of meaning.

#### Include Full Event Context

Assessment results must include the contextual information required to interpret them correctly. This includes the administration date, school year, assessment period, grade level at the time of assessment, and relevant attempt indicators when available.

Without full event context, results cannot be reliably aligned to enrollment, compared across time, or used for longitudinal analysis.

#### Align to Governance Oversight

Assessment modeling carries inherent ambiguity, including how identifiers are defined, how descriptors are managed, and how changes are versioned over time. A native integration must align with a governance framework that defines identifier strategy, namespace ownership, descriptor management, versioning rules, and change control expectations. Without governance alignment, consistency degrades over time, even if the initial implementation is correct.

These principles establish the expectations for how assessment data must be represented, interpreted, and maintained. The sections that follow translate these principles into concrete modeling, identity, architecture, and validation requirements.

### 1.7 The Standard

A native Ed-Fi assessment integration is one that publishes a complete, hierarchically accurate, subject-safe, and governance-aligned representation of an assessment that enables stakeholders to analyze student performance reliably, measure growth over time, and compare outcomes across systems without requiring custom downstream reconstruction, score parsing, or vendor-specific transformation logic.

An integration that merely loads data is not sufficient. An integration must interoperate.

_Continue to [Part II - How Ed-Fi Assessment Data Works](./part-ii-how-edfi-assessment-data-works.md)..._
