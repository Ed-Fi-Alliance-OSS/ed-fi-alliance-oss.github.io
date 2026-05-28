---
title: "Part IV: Student Identity and Rostering"
sidebar_position: 5
---


## 8. Student Identity Resolution

the Ed-Fi ecosystem.

This section establishes the requirements for ensuring that every StudentAssessment record resolves to a valid student and can be used for reporting, analysis, and longitudinal tracking.

Unlike data modeling, which determines how results are structured, identity and rostering determine whether those results can be used at all.

A dataset that does not resolve to a valid student identity may load partially or fail entirely, but in either case, it cannot support reliable analytics.

A native Ed-Fi assessment integration must ensure that:

-

- Rostering is aligned to the system of record

- Identity resolution is deterministic, transparent, and repeatable

### 8.1 Why Identity Is the Foundation

All assessment results depend on a single requirement: each record must resolve to a valid _StudentUniqueId_ in the Ed-Fi ODS.

This is not simply an API constraint. It is the mechanism that enables:

- Enrollment-aligned reporting

- Longitudinal analysis

- Cross-domain integration

When identity is not correctly resolved:

- StudentAssessment records are rejected or excluded

- Results cannot be attributed to the correct student

- Longitudinal data becomes fragmented or unusable

In practice, the majority of assessment integration challenges are not caused by score modeling issues. They are caused by student identity mismatches across systems. A native integration must treat identity resolution as a first-class requirement, not a downstream correction step.

### 8.2 Rostering Strategy

where assessment results are submitted.

The critical requirement is not the rostering platform itself. The requirement is that student identity alignment is explicit, consistent, and verifiable across systems.

Assessment integrations depend on accurate identity resolution. If rostered students cannot reliably align to the Ed-Fi StudentUniqueId values used by the receiving environment, assessment results become difficult to reconcile, longitudinal analysis becomes fragmented, and downstream systems must compensate for identity inconsistencies through custom logic and manual intervention.

#### Core Principle

Assessment vendors should roster from the same environment that receives assessment results whenever possible.

This ensures that:

-

- Enrollment and assessment participation context remain consistent

- Identity mismatches are minimized

- Assessment results can be resolved directly to the Ed-Fi student record

Rostering is the operational bridge between vendor systems and the Ed-Fi identity model.

#### Recommended Implementation Model

A native integration typically follows a bidirectional pattern:

- The vendor retrieves roster and identity data from Ed-Fi

- The vendor submits assessment results back to Ed-Fi

This model establishes Ed-Fi as the system of record for both identity and assessment outcomes, reducing reconciliation complexity and strengthening longitudinal integrity across systems.

While this represents the strongest alignment pattern, implementations across the ecosystem vary in maturity and operational readiness. Multiple rostering approaches are currently used successfully across states and districts. These approaches are not operationally identical, but each can support a compliant integration when identity alignment is managed appropriately.

#### Rostering Approaches and Identity Alignment

The following rostering approaches represent common implementation patterns across the Ed-Fi ecosystem.

#### 8.2.1 Native OneRoster API from Ed-Fi

An emerging implementation pattern is the exposure of OneRoster endpoints directly from the Ed-Fi API environment.

Beginning with Ed-Fi API v7.3.2, the Ed-Fi Alliance introduced support for native OneRoster API endpoints. This creates a standardized rostering model that aligns directly to the Ed-Fi system of record while leveraging a roster specification already familiar to many assessment vendors.

This approach provides several advantages:

- Ed-Fi remains the authoritative source for student identity and roster data

- Rostering aligns directly to StudentUniqueId

- Rostering workflows can operate through standardized APIs

- Intermediate transformation and synchronization layers are minimized

This pattern represents a strong, long-term interoperability model because it combines Ed-Fi's identity and integrity with OneRoster's operational familiarity.

At the same time, implementation maturity varies across the ecosystem, and not all current Ed-Fi environments expose or operationalize these endpoints consistently.

#### 8.2.2 StudentAssessmentRegistration via Ed-Fi API

When native OneRoster endpoints are not available, vendors may retrieve roster and assessment participation data directly through Ed-Fi APIs using the StudentAssessmentRegistration resource.

The StudentAssessmentRegistration endpoint is supported in the Ed-Fi ODS/API v7.x series and is specifically designed to support assessment rostering and coordination workflows between education agencies and assessment vendors.

This resource provides:

- The set of students expected to participate in an assessment

- Associations between students and assessment administrations

- Context needed to align assessment results to the correct assessment event

Using StudentAssessmentRegistration helps ensure that:

- Ed-Fi remains the system of record

- Student identity aligns directly to StudentUniqueId

-

This approach supports the automation of assessment registration workflows that have historically depended on manual processes and spreadsheet-based coordination.

Operational adoption varies because not all Ed-Fi implementations currently operationalize these endpoints consistently. In those environments, additional coordination with student and enrollment resources may still be required.

#### 8.2.3 OneRoster CSV Exports Derived from Ed-Fi

Some implementations generate OneRoster-compliant CSV exports directly from the Ed-Fi environment.

This approach preserves alignment to the Ed-Fi system of record while supporting vendors that already consume standard OneRoster CSV workflows.

This pattern:

- Preserves Ed-Fi as the authoritative source

- Supports batch-based rostering workflows

- Enables large-scale operational exchanges

- Provides a practical interoperability bridge for implementations not yet supporting native roster APIs

This model is commonly used in exchange-based implementations where standardized roster exports are generated centrally and distributed to vendors.

While this approach introduces more operational coordination than API-based patterns, it remains strongly aligned to Ed-Fi identity because the roster source originates from the Ed-Fi environment itself

#### 8.2.4 External Rostering Systems

External rostering platforms such as ClassLink, Clever, and SIS-driven rostering workflows may also support successful assessment integrations when identity alignment is managed appropriately.

Some implementations successfully leverage external rostering providers in coordination with Ed-Fi environments, including models where roster synchronization and identity reconciliation processes are already operationally established.

These approaches can:

- Accelerate onboarding

- Reduce implementation friction

- Leverage existing district rostering investments

- Simplify operational coordination for vendors already integrated with these platforms

At the same time, these systems are not typically the Ed-Fi system of record. As a result, additional identity reconciliation and governance controls are often required to ensure accurate alignment with StudentUniqueId.

When rostering does not originate directly from the Ed-Fi environment, vendors assume additional responsibility for:

- Deterministic identity matching

- Cross-system reconciliation transparency

- Match rate monitoring

- Referential integrity validation between rostered students and Ed-Fi identity records

The success of these implementations depends on whether student identity alignment remains consistent, auditable, and operationally manageable over time.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that the selected rostering approach consistently supports accurate identity resolution and referential integrity across implementations.

This includes:

- Documenting the rostering approach used for each implementation

- Preserving alignment to StudentUniqueId

- Supporting deterministic and auditable identity matching

- Monitoring and reporting identity match rates

- Ensuring unresolved identity conflicts are surfaced and corrected

- Applying identity reconciliation processes consistently across implementations

- Ensuring rostering workflows remain operationally maintainable over time

#### Prohibited Patterns

The following patterns are not allowed because they weaken identity integrity and require downstream systems to reconstruct or infer student identity:

- Using roster data that cannot be deterministically aligned to StudentUniqueId
- Allowing identity matching behavior to vary unpredictably across implementations
- Treating identity reconciliation as a downstream responsibility
- Silently dropping unmatched students or unresolved records
- Using rostering workflows that cannot be audited or explained operationally
- Relying on manual or undocumented identity repair processes as part of normal operations

Rostering is not defined by the specific tool or platform being used. It is defined by whether student
identity can be consistently aligned to the Ed-Fi system, where assessment results are stored.

The closer the rostering source is to the Ed-Fi system of record, the stronger the referential integrity, the lower the reconciliation burden, and the more reliable the integration becomes over time.

### 8.3 Student Identifier Selection and Configuration

- District student IDs
- State student IDs
- SIS identifiers
- Platform-specific identifiers

A native integration must support explicit configuration of which identifier is used for matching.

This configuration must be:

- Visible
- Testable
- Consistently applied

The integration must not assume that any given identifier will automatically align with StudentUniqueId. Identifiers such as names or loosely defined attributes must not be used as primary matching keys.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that identity matching is configurable,
deterministic, and consistently applied across implementations:

- Provide configurable identifier selection
- Support multiple identifier types
- Ensure matching resolves to StudentUniqueId
- Prevent use of non-deterministic identifiers
- Maintain consistent matching logic across implementations

#### Prohibited Patterns

The following patterns are not allowed because they introduce ambiguity in identity and require
downstream systems to reconstruct or infer matches:

- Using names or non-unique attributes as primary identifiers
- Relying on implicit or undocumented matching logic
- Hardcoding identifier selection per implementation
- Using identifiers that cannot be mapped to StudentUniqueId

Using explicit, governed identifier configuration ensures that identity resolution is reliable, auditable,
and consistent across systems.

### 8.4 Identity Mapping and Crosswalk

In these cases, identity must be resolved through a crosswalk process.

Identity mapping is not a one-time setup. It is an operational process that must support:

- Initial data loads

- Incremental updates

-

A valid identity mapping process includes:

- Deterministic matching logic

- Measurable match rates

- Repeatable execution

- Full auditability

This ensures that identity resolution is transparent and governed rather than implicit or hidden.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that identity mapping is implemented as a governed, repeatable process:

- Support crosswalk-based identity resolution

- Provide deterministic matching logic

- Enable match rate measurement and validation

- Ensure auditability of all identity mappings

- Support reprocessing of corrected records

#### Prohibited Patterns

The following patterns are not allowed because they obscure identity resolution and create untraceable data inconsistencies:

- Performing identity matching without auditability

- Using non-deterministic or heuristic-only matching

-

- Failing to measure or report match quality

Treating identity mapping as a governed process ensures that identity remains reliable, transparent, and correctable over time.

### 8.5 Referential Integrity and Load Enforcement

The Ed-Fi API enforces referential integrity.

A StudentAssessment record cannot be loaded unless:

- The referenced student exists

-

This means identity resolution must occur before data submission, not after.

If identity is not resolved:

- Payloads are rejected

- Records are excluded

- Data completeness is compromised

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that identity is fully resolved prior to submission and that all records reference valid students:

- Validate identity before loading

- Ensure all records resolve to StudentUniqueId

- Prevent partial or inconsistent submissions

- Maintain referential integrity across all data

#### Prohibited Patterns

The following patterns are not allowed because they break referential integrity and result in incomplete or unreliable data:

- Submitting records with unresolved student identity

- Allowing partial loads with missing student references

- Attempting to resolve identity after ingestion

- Ignoring or suppressing identity-related errors

Enforcing referential integrity ensures that all assessment data is complete, valid, and usable at the point of ingestion.

### 8.6 Handling Identity Failures

Identity failures must be explicitly surfaced and resolved. Unmatched records must never be silently dropped. A successful integration is not defined by what loads. It is defined by whether all data is accounted for.

A native integration must include staging for unmatched records, reconciliation reporting, clear error diagnostics, and reprocessing workflows after correction.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that identity failures are visible, traceable, and correctable:

- Surface unmatched records

- Provide clear failure diagnostics

- Support correction and reprocessing

- Maintain visibility into data completeness

#### Prohibited Patterns

The following patterns are not allowed because they hide data loss and undermine data integrity:

- Dropping unmatched records silently

- Reporting successful loads that exclude data

- Failing to provide diagnostics for identity failures

- Preventing reprocessing after correction

Handling identity failures transparently ensures that data completeness and quality are maintained.

### 8.7 District Visibility and Correction

Identity resolution must be visible and actionable by districts and implementation teams.

District users must be able to:

- View unmatched or incorrect records

- Understand why matching failed

- Provide corrections

- Re-run processing

Identity resolution cannot depend solely on vendor intervention.

#### Assessment Provider Responsibility

The assessment provider is responsible for enabling district-level visibility and correction of identity issues:

- Provide access to identity mismatch data

- Enable correction workflows

- Ensure transparency in matching logic

- Support operational resolution without vendor dependency

#### Prohibited Patterns

The following patterns are not allowed because they create dependency and prevent timely resolution:

- Hiding identity logic from users

- Requiring vendor intervention for corrections

- Preventing visibility into unmatched records

-

Providing district visibility ensures that identity resolution becomes a governed operational process rather than a bottleneck.

### 8.8 Impact on Local Use and Longitudinal Integrity

Accurate student identity resolution is what makes assessment data usable beyond basic reporting. When identity is aligned:

- Results align to enrollment at the time of assessment

- Growth analysis is accurate across time

- Cohort and subgroup analysis are reliable

- Cross-domain integration becomes possible

When identity is not aligned:

- Students appear duplicated or missing

- Longitudinal data is fragmented

- Reporting becomes unreliable

- Data cannot be trusted

Identity resolution is not a supporting function. It is the condition that determines whether an integration is usable at all. For this reason, student identity validation and rostering are required components of a native integration. These core requirements determine whether the integration is viable at all.
