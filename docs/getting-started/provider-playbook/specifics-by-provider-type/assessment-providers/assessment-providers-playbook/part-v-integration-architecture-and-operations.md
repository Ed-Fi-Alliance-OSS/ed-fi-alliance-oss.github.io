---
title: "Part V: Integration Architecture and Operations"
sidebar_position: 5
---


This section defines how an assessment integration moves from "a payload that can be loaded" to a true native integration that districts can operationalize safely at scale. The focus here is transport and execution discipline: how data is transformed, validated, transmitted, secured, reprocessed, and monitored without introducing fragility, tenant risk, or silent duplication.

Architecture is where good modeling either survives the real world or dies in production.

A vendor can implement perfect Ed-Fi modeling on paper and still deliver an integration that fails districts if it depends on direct database writes, cannot be re-run safely, mixes tenants, or collapses under real volumes during peak testing windows. The Native Integration Foundational Design Principles apply here, too. The integration must be operationally usable, governance-aligned, and stable across implementations. That requires explicit enforcement mechanisms, not hopeful assumptions.

## 9. Architecture Patterns

The patterns below are two common architectures that can meet assessment integration. They are not equal in effort, and each can be implemented well if it meets the technical requirements and the enforcement rules outlined later in this section.

### 9.1 Pattern A: Bidirectional Native API

In this pattern, the vendor owns the full integration runtime. The vendor maps and transforms assessment data from its internal systems into Ed-Fi resources and interacts directly with the district or state Ed-Fi ODS/API using REST. A native integration follows a bidirectional pattern:

- The vendor pulls roster data from Ed-Fi

- The vendor pushes assessment results to Ed-Fi

This bidirectional pattern is foundational to a compliant integration. Pulling roster data from Ed-Fi ensures that student identity, enrollment context, and assessment registration are aligned to the system of record where results will be stored. Pushing results back to Ed-Fi completes the integration by delivering outcomes that are already resolved to that same identity framework.

Every other integration pattern represents a deviation from it. If this pattern is not followed, identity mismatches become unavoidable. Vendors that rely on external rostering sources or delayed reconciliation introduce inconsistencies that break referential integrity, fragment longitudinal data, and increase operational burden on districts. Bidirectionality is not a convenience. It is the mechanism that ensures assessment data is accurate at load time and usable over time.

_**What it looks like in practice:**_

- The vendor sources the assessment data directly from its internal systems (such as application databases or service layers), rather than relying on external extracts.

- The vendor retrieves roster, enrollment, and assessment registration data from the Ed-Fi API to establish identity alignment.

- The vendor applies mapping and transformation logic to convert vendor-native data structures into Ed-Fi resources (Assessment, ObjectiveAssessment, StudentAssessment, StudentObjectiveAssessment).

- The vendor uses Ed-Fi API credentials issued per district or tenant to POST and PUT resources to the ODS/API.

- The vendor is responsible for sequencing, error handling, retries, and safe reprocessing.

#### Why this pattern works when done correctly

- It enforces alignment to the Ed-Fi system of record for both identity and results, eliminating the need for downstream reconciliation.

- It aligns with the Ed-Fi architectural intent that integrations interact with the Ed-Fi API layer, not through database writes.

- It creates a clean operational boundary: the vendor produces standards-aligned resources, and the Ed-Fi implementation is responsible for storage and access.

- It supports real-time or near-real-time ingestion during testing windows when districts want timely results.

- It enables scalable, repeatable integrations across multiple districts and states.

#### What can go wrong if it is implemented carelessly

- If the vendor does not pull roster data from Ed-Fi and instead relies on external sources, identity mismatches occur, leading to misaligned student records and broken longitudinal analysis.

- If the vendor does not implement safe-to-retry behavior, reprocessing creates duplicate StudentAssessment events and corrupts reporting.

- If the vendor fails to respect dependency order, payloads are rejected or partially loaded, resulting in incomplete hierarchy or missing metadata.

- If the vendor does not enforce proper tenant isolation and credential scoping, data boundaries can break, creating significant security and privacy risks.

- If the vendor pushes data without pre-validation, districts become the validation environment and spend significant time triaging avoidable errors.

#### Minimum enforcement expectations

- The API-only rule must be respected. No direct database writes, no “patching the ODS,” and no shadow tables that bypass the API contract.

- Bidirectional integration must be implemented. Rostering and identity must be sourced from EdFi, not external systems, unless explicitly required as a fallback.

- Safe-to-retry behavior must be engineered from the start, not added after duplicates are discovered.

- Dependency order must be enforced to maintain referential integrity.

- Errors must be transparent and recoverable. Silent drops are not acceptable.

- Validation must occur prior to submission to prevent avoidable downstream failures.

### 9.2 Pattern B: Bundle-Based (Earthmover + Lightbeam)

In this pattern, transformation, validation, and loading are explicitly separated into distinct stages prior to API submission, using a repeatable “bundle” workflow. Earthmover is used to transform and shape data, and Lightbeam is used to validate and load data into the Ed-Fi ODS/API reliably. The key concept is that these stages are independently managed, observable, and reusable across implementations.

#### What it looks like in practice

- Vendor exports results in a defined vendor format, or a district extracts results via vendor export tooling.

- Earthmover applies vendor-specific transformation logic (housed in Bundles), often producing staged outputs that map 1:1 to Ed-Fi resources.

- Validation occurs before loading, including schema checks, dependency checks, descriptor checks, and key consistency checks.

- Lightbeam submits resources to the ODS/API in dependency order with robust retry logic and error reporting.

#### Why this pattern works when done correctly

- It creates reusable mapping patterns and repeatable pipelines that can be operationalized across districts and states, especially when vendors provide consistent input structures. Bundles can often be reused across states with minimal adaptation when the same source data format is available.
- It allows strict technical enforcement before submission, which reduces the “district as QA environment” problem.
- It supports governance because the mapping logic is visible, reviewable, and version-controlled.
- It is often the fastest path to consistency across multiple vendor integrations because the same enforcement scaffolding is reused.

#### What can go wrong if it is implemented carelessly

- If the bundle does not include stable natural keys, reruns create duplicates or overwrite the wrong records.
- If the pipeline treats validation as optional, bad data gets loaded and becomes harder to unwind.
- If the transformation logic embeds district-specific hacks, the workflow becomes non-portable and fragile.
- If Lightbeam loads are not monitored with clear error outputs, districts lose trust and stop operationalizing the feed.

#### Minimum enforcement expectations

- Transform → validate → send is mandatory. If validation is skipped, the architecture is not bundle-based; it is just a delayed failure.
- Mapping logic must be designed to be reusable across districts without rewriting the model each time.

## 10. Descriptor Mapping Infrastructure

Descriptor management is a critical component of a native Ed-Fi assessment integration. While earlier sections define how descriptors should be modeled and how vendor semantics must be preserved, this section defines how descriptor behavior must function in a real-world implementation.

A native integration does not end with correctly assigning descriptor namespaces and values. It must support the realities of multi-state, multi-district deployments, where descriptor availability, naming conventions, and governance expectations vary across environments.

If descriptor handling is rigid, hidden, or hard-coded, the integration becomes brittle, non-portable, and difficult to govern. If descriptor handling is overly permissive or opaque, meaning becomes inconsistent and analytics become unreliable.

A native integration must strike a balance and source meaning at ingestion while enabling controlled, visible, and configurable interpretation at the local level.

### 10.1 Preservation at Ingestion

At ingestion, descriptor values must reflect exactly what the assessment provider reported. This includes:

- Assessment reporting method descriptors (score names)

- Performance level descriptors

- Assessment category descriptors

- Assessment period descriptors

These values must:

- Remain in the vendor namespace

- Retain their original code values

- Not be altered or normalized before submission

Preserving vendor semantics ensures that:

- All data remains traceable to the original score report

- Meaning is not altered before governance is applied

- Multiple analytical interpretations remain possible without altering source data

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that vendor-native descriptor values are preserved exactly as reported:

- Preserve vendor-native descriptor values at ingestion

- Maintain vendor namespace alignment for all assessment-specific descriptors

- Maintain alignment with the vendor score report

- Avoid any transformation that alters meaning during ingestion

- Ensure consistency of descriptor behavior across implementations

#### Prohibited Patterns

The following patterns are not allowed because they alter source meaning and require downstream systems to reconstruct interpretation:

- Renaming descriptor values during ingestion

- Mapping performance levels to local categories at load time

- Collapsing distinct descriptor values into generalized categories

- Applying local simplification or normalization categories at ingestion

Preserving descriptor values at ingestion ensures that meaning remains intact and that all downstream interpretation is explicit and governed.

### 10.2 Local Mapping and Override

For shared, non-assessment descriptors such as AcademicSubject, GradeLevel, and Language, the assessment provider must align to the descriptors defined within the Ed-Fi implementation.

While a native integration may include default mappings, these are not authoritative. The receiving EdFi environment defines the canonical descriptor values for these domains.

This requires the ability to map descriptor values to match:

- The namespace used by the implementation

- The code values used in the Ed-Fi API

This alignment is essential because these descriptors are used across domains. Misalignment prevents accurate joins between assessment results and enrollment, course, and student data.

Assessment-specific descriptors—including vendor-defined score names and performance levels—must remain in the vendor namespace and must not be overridden.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that shared descriptor mappings are configured and aligned to the receiving environment:

- Support configurable mapping for shared descriptor types

- Align shared descriptors to the target Ed-Fi implementation

- Validate shared descriptor values against the target environment before submission

- Document mapping configuration for each implementation

- Ensure mappings are repeatable and version-controlled

#### Prohibited Patterns

The following patterns are not allowed because they create inconsistency and break interoperability:

- Assuming default descriptor values apply across all environments

- Hardcoding shared descriptor values without environment alignment

- Using the same shared descriptor values across environments without validation

- Applying undocumented or inconsistent mappings

Proper descriptor alignment ensures that data integrates cleanly across domains without requiring downstream reconciliation.

### 10.3 No Hard-Coded Descriptor Logic

Descriptor handling must never be hard-coded into transformation logic.

Hard-coded descriptors create:

- Non-portable pipelines that break across implementations
- Hidden dependencies that are difficult to diagnose
- Barriers to reuse across districts and states

Instead, descriptor logic must be:

- Parameterized (e.g., namespace variables)
- Externalized into mapping layers or configuration files
- Adjustable without requiring code changes

This applies to all descriptor categories, including:

- Reporting methods
- Performance levels
- Assessment periods
- Result data types

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that all descriptor handling logic is externalized:

- Parameterize descriptor values and namespaces

- Externalize descriptor configuration into editable mapping files

- Support updates without code changes

- Document descriptor handling logic

- Ensure portability across implementations

#### Prohibited Patterns

The following patterns are not allowed because they prevent scalability and governance:

- Hard-coding descriptor values in transformation logic

- Requiring code changes for descriptor updates

- Embedding descriptor logic in undocumented scripts

- Using hidden or implicit descriptor rules

### 10.4 Transparency and Traceability

Descriptor mappings must be visible, auditable, and explainable.

A native integration must make it possible to answer:

- What descriptor value was sent?

- What was the original vendor value?

- Was a mapping applied?

- What rule produced the mapped value?

To support this, descriptor handling must include:

- Explicit mapping tables or configuration artifacts
- Clear documentation of namespace usage and mapping rules
- Version tracking of descriptor mappings over time

Mappings must not be hidden in code or dependent on institutional knowledge.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring full transparency of descriptor behavior:

- Maintain visible mapping tables

- Document mapping rules and namespace usage

- Track mapping versions over time

- Preserve original vendor values where applicable

- Enable audit and troubleshooting without code inspection

#### Prohibited Patterns

The following patterns are not allowed because they obscure behavior and prevent governance:

- Hiding mappings in transformation code

- Applying undocumented transformations

- Requiring code inspection to understand descriptor behavior

- Losing original vendor values after mapping

Transparency ensures that descriptor behavior is governable, auditable, and trustworthy.

### 10.5 Multi-Partner Scalability

Descriptor mapping must support reuse across multiple implementations.

A native integration should be able to:

- Deploy the same transformation logic across districts and states

- Apply different descriptor mappings per environment

- Onboard new partners without rewriting pipelines

This requires:

- Separation of mapping logic from transformation logic
- Environment-specific configuration layers
- Consistent input structures

When implemented correctly, this enables:

- Faster onboarding

- Lower implementation cost

- Consistent governance

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that descriptor mapping scales across partners:

- Reuse transformation logic across implementations

- Support environment-specific configuration

- Separate configuration from code

- Maintain consistent data structures

- Avoid per-partner customization

#### Prohibited Patterns

The following patterns are not allowed because they prevent scalability:

- Rewriting descriptor logic per district

- Embedding partner-specific mappings in core logic

- Maintaining separate pipelines without governance

- Treating descriptor mapping as a one-off process

Scalable descriptor mapping ensures consistent behavior across all implementations.

### 10.6 Change Control

Descriptor mappings evolve over time as:

- Vendors introduce new values
- States update standards
- Districts refine reporting definitions

A native integration must support:

- Versioning of descriptor mappings

- Controlled updates with documentation

- Traceability of mapping history

Changes must be:

- Reviewed through governance processes

- Tested before deployment

- Documented with clear downstream impact

Without change control, descriptor drift breaks comparability and trust.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that descriptor changes are governed and traceable:

- Version descriptor mappings

- Document all changes

- Test updates before deployment

- Maintain mapping history

- Align changes with governance processes

#### Prohibited Patterns

The following patterns are not allowed because they create inconsistency and loss of trust:

- Changing mappings without documentation

- Applying updates without testing

- Losing historical mapping context

- Implementing uncontrolled overrides

Controlled change management ensures that descriptor meaning remains stable and comparable over time.

## 11. API Interaction and Safe Reprocessing

API interaction and safe reprocessing are the enforcement backbone of a native Ed-Fi assessment integration. These requirements ensure that integrations are not only technically valid but also operationally reliable, repeatable, and safe to run in production environments.

A native integration must treat the Ed-Fi ODS/API as an API-driven system. It must respect dependency order, enforce validation, and support deterministic reprocessing.

If these requirements are not met, integrations may:

- Load successfully once but fail under reprocessing

- Create duplicate records or corrupt longitudinal data

- Require manual intervention to repair data integrity

A production-ready integration is not defined by whether it can load data once. It is defined by whether it can be executed repeatedly without corruption.

### 11.1 API Interaction Rules

The Ed-Fi ODS/API must be treated as an API-driven system. All interactions must occur through the REST API layer.

The API is where Ed-Fi enforces:

- Validation rules

- Referential integrity

- Descriptor constraints

- Authorization and access control

Bypassing the API bypasses governance.

Core rules:

- No direct database writes. Ever.

- No temporary database patches to fix vendor modeling

- No bypass mechanisms that write directly to ODS tables

Direct database interaction:

- Breaks validation and consistency rules

- Creates incompatibility across API versions

- Removes the ability for districts to govern and troubleshoot using standard tools

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that all integration behavior respects the API contract:

- Submit all data through approved Ed-Fi API endpoints

- Respect validation and authorization rules

- Preserve API error responses for troubleshooting

- Ensure compatibility across Ed-Fi API versions

- Avoid any mechanism that bypasses API enforcement

#### Prohibited Patterns

The following patterns are not allowed because they bypass governance and introduce instability:

- Direct database writes into the ODS

- Manual table patches to fix integration errors

- Shadow write mechanisms outside the API

- Ignoring or suppressing API validation errors

- Treating API validation as optional

API-only interaction ensures that integrations remain secure, governable, and consistent across implementations.

### 11.2 Dependency Order

The Ed-Fi ODS/API cannot accept records that reference metadata that does not exist.

A native integration must load data in the correct dependency order.

Required load order:

- Assessment

- ObjectiveAssessment

- StudentAssessment (including nested StudentObjectiveAssessment results)

This order reflects how the data model is constructed:

- Assessment defines the overall instrument

- ObjectiveAssessment defines the structure and hierarchy

- StudentAssessment defines the student event

- StudentObjectiveAssessment represents detailed results within that event

StudentObjectiveAssessment is not a separate entity. It is a collection within StudentAssessment and must align to both:

- The StudentAssessment event

- The ObjectiveAssessment hierarchy

#### Operational Implications

- Assessment and ObjectiveAssessment must exist before student results are submitted

- Missing or incorrect hierarchy can be resolved before loading results

- Descriptor or metadata issues can be corrected at the metadata level

- StudentAssessment payloads must align with the pre-existing structure

A practical enforcement pattern:

- Stage and validate Assessment and ObjectiveAssessment

- Load metadata into the Ed-Fi API

- Then construct and submit StudentAssessment payloads

#### Assessment Provider Responsibility

The assessment provider is responsible for enforcing dependency order and ensuring recoverable load behavior:

- Load Assessment before dependent records

- Load ObjectiveAssessment before student results

- Ensure StudentAssessment references valid metadata

- Ensure nested StudentObjectiveAssessment aligns to hierarchy

- Detect and handle dependency failures before continuing

#### Prohibited Patterns

The following patterns are not allowed because they create incomplete or misleading data states:

- Loading student results before assessment metadata

- Loading objective-level results before hierarchy definitions

- Continuing loads after dependency failures

- Treating partial loads as successful

- Repairing dependency issues manually outside the pipeline

Enforcing dependency order ensures that structure exists before results, preserving data integrity and enabling reliable troubleshooting.

### 11.3 Safe Reprocessing and Duplicate Prevention

Safe reprocessing is the difference between an integration that can be operated in production and one that corrupts the dataset with every rerun.

A native integration must be engineered so that it can be executed repeatedly without:

- Creating duplicate records

- Corrupting longitudinal history

- Overwriting unrelated events

Reprocessing scenarios are not edge cases. They are routine and must be supported for situations including:

- Historical backfills

- Vendor score corrections

- Vendor resends

- District-requested reloads

- Environment rebuilds

- Data Standard / API upgrades

If an integration cannot safely handle these scenarios, it is not production-ready.

#### Core Requirements

Stable natural keys must exist for all resources

- The integration must behave deterministically

- The same input must always produce the same resource identity

- Reprocessing must not create duplicate StudentAssessment events

- Reprocessing must not overwrite non-equivalent events

#### What Stable Keys Mean in Practice

#### Assessment

- Keys remain stable across years unless the assessment materially changes

#### ObjectiveAssessment

- Keys remain stable and aligned to the hierarchy

#### StudentAssessment

- Keys must represent a unique student attempt event

- Must include event identity (e.g., AdministrationDate, SchoolYear)

#### StudentObjectiveAssessment

- Keys must align to both:

  - The StudentAssessment event

  - The ObjectiveAssessment definition

- Must not rely on parsing score names

#### Reprocessing Behavior Expectations

- Reruns must upsert existing records, not create new ones

- Distinct attempts must generate distinct keys

- Corrections must update the existing record for that event

- Reprocessing must not depend on delete-and-reload strategies

#### Why AdministrationDate Is Critical

AdministrationDate is required for safe reprocessing.

Without it:

- Multiple attempts cannot be reliably distinguished

- Reloads may create duplicate StudentAssessment records

- Corrections cannot safely replace prior results

- Longitudinal analysis becomes unreliable

When AdministrationDate is missing, reprocessing behavior becomes guesswork—and guesswork is not acceptable in a native integration.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that reprocessing is safe, deterministic, and governed:

- Define stable natural keys for all resources

- Ensure deterministic behavior across runs

- Support updates for corrected records

- Distinguish separate attempts using event context

- Prevent duplicate StudentAssessment events

- Avoid destructive reload strategies

- Validate reprocessing behavior before production

#### Prohibited Patterns

The following patterns are not allowed because they create data corruption and unreliable longitudinal behavior:

- Creating new StudentAssessment records on every rerun

- Keying StudentAssessment only by student and assessment

- Using delete-and-reload as the primary recovery strategy

- Overwriting non-equivalent attempts

- Omitting AdministrationDate when needed

- Using batch IDs or runtime artifacts as stable keys

Safe reprocessing ensures that integrations can handle real-world operational scenarios without corrupting data, enabling reliable longitudinal analysis and repeatable execution.

## 12. Security and Tenant Isolation

Security is not an add-on. In assessment integrations, security failures often become privacy failures, and tenant isolation failures become data exposure incidents.

A native integration must demonstrate strong data separation, appropriate access controls, and auditable behavior across all environments. Security must be designed into the integration architecture from the beginning, not layered on after implementation.

This section defines the minimum expectations for credential management, access control, auditability, and tenant isolation required for a production-ready integration.

### 12.1 District-Scoped Credentials

Every district or tenant must have its own API credentials. Credentials must not be shared across districts, even when the assessment provider and integration logic are the same.

District-scoped credentials enforce tenant isolation at the access layer and ensure that integration activity can be clearly attributed to a specific district and integration client.

This requirement ensures that:

- Tenant boundaries are enforced through authentication

- The impact of a credential compromise is limited to a single tenant

- Audit trails can accurately trace actions to a specific district

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that credentials are properly scoped and managed across all implementations:

- Issue separate credentials for each district or tenant

- Use separate credentials for production and non-production environments

- Prevent credential reuse across tenants

- Maintain clear ownership and tracking of credential usage

- Support credential revocation and re-issuance

#### Prohibited Patterns

The following patterns are not allowed because they break tenant isolation and increase security risk:

- Sharing credentials across multiple districts

- Using the same credentials for production and non-production environments

- Maintaining credentials without ownership or tracking

- Reusing credentials after tenant scope changes

- Continuing to use credentials after revocation or suspected compromise

District-scoped credentials ensure that access boundaries are enforced and that integration activity remains traceable and governable.

### 12.2 Least-Privilege Claimsets

API credentials must use claimsets that grant only the permissions required for the integration.

The integration’s technical access scope must align with its intended function. If the integration only needs to write assessment data and read limited supporting data, it must not have permissions to modify unrelated domains.

Limiting permissions reduces risk and ensures that access is intentional and controlled.

This ensures that:

- Accidental writes to unrelated domains are prevented

- The impact of compromised credentials is limited

- Integration behavior aligns with governance expectations

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that claimsets are restricted to the minimum required permissions:

- Request only the permissions needed for the integration

- Avoid granting access to unrelated domains

- Align claimsets to the integration’s functional scope

- Review and validate permissions before production deployment

- Update permissions when integration scope changes

#### Prohibited Patterns

The following patterns are not allowed because they create unnecessary access risk:

- Granting broad or administrative claimsets

- Providing permissions to modify unrelated Ed-Fi domains

- Reusing elevated credentials for integration runtime

- Expanding permissions to compensate for design gaps

- Leaving unused or outdated permissions in place

Least-privilege claimsets ensure that integrations operate within clearly defined and controlled boundaries.

### 12.3 Audit, Rotation, and Tenant Model

A native integration must support auditability, credential rotation, and strong tenant isolation across all components of the system.

#### Audit Logging

Audit logs must capture:

- What data was sent

- When it was sent

- To which district/tenant

- Which credential identity was used

- What the API returned, including errors

Audit logs must support:

- Troubleshooting by vendors and implementation teams

- District-level visibility into integration behavior

- Governance review and compliance validation

Without audit logs, it is not possible to determine whether data was never sent, rejected, or incorrectly processed.

#### Credential Rotation

Credentials must be rotatable without breaking the integration.

Rotation must be:

- Routine, not emergency-only

- Supported without code changes

- Executable without downtime

The integration must also support:

- Immediate revocation if compromise is suspected

- Controlled re-issuance of credentials

- Separation of production and non-production credentials

Assessment data must not be copied into lower environments without masking or explicit authorization.

#### Strong Tenant Model

Tenant isolation must be enforced across all layers of the integration:

- Credential scoping

- Data processing pipelines

- Storage layers

- Logging and observability systems

This is especially critical for architectures that include shared infrastructure or intermediate data stores.

A strong tenant model ensures that:

- Data is never exposed across districts

- Processing remains isolated per tenant

- Observability and logging do not leak cross-tenant information

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that security operations are auditable, maintainable, and tenant-isolated:

- Maintain comprehensive audit logs for all API interactions

- Support credential rotation without requiring code changes

- Support immediate credential revocation and re-issuance

- Enforce separation between production and non-production environments

- Ensure tenant isolation across processing, storage, and logging

- Prevent any cross-tenant data access or exposure

#### Prohibited Patterns

The following patterns are not allowed because they create security gaps and risk data exposure:

- Lack of audit logging for integration activity

- Credential rotation requiring code changes

- Sharing data between production and non-production environments without controls

- Logging that mixes or exposes data across tenants

- Cross-tenant access paths in processing or storage

- Inability to trace actions to a specific credential or tenant

Security and tenant isolation are required conditions for a native integration.

An integration that cannot enforce tenant boundaries, audit behavior, and manage credentials securely cannot be considered production-ready.

## 13. Scheduling, Monitoring, and Change Management

Scheduling, monitoring, and change management determine whether an integration is operationally sustainable or fragile.

A native integration must not only produce correct data—it must do so reliably under real-world conditions, including peak load, failures, corrections, and system changes.

An integration that requires manual intervention for routine operation is not production-ready.

This section defines the expectations for runtime design, observability, and change governance required for a scalable and trustworthy integration.

### 13.1 Batch Planning and Runtime Design

Assessment integrations are inherently bursty. Large volumes of data are generated during defined testing windows, including:

- Beginning-of-year assessments

- Interim benchmark cycles

- End-of-year summative testing

- District-wide retesting events

A native integration must be designed to handle both peak load conditions and full reprocessing scenarios.

Batch planning must account for:

- Peak record volumes

- Dependency ordering across resources

- Tenant isolation during concurrent district loads

- Full-year reload scenarios

The integration must explicitly support:

- Initial historical loads (large backfills)

- Incremental loads (daily or periodic updates)

- Correction loads (vendor resends)

- Full reprocessing events

A common failure pattern is designing only for incremental loads and failing under full reload conditions. A native integration must support both without degradation.

#### Retry Logic

Retry logic must be deterministic, bounded, and coordinated with safe reprocessing.

The integration must:

- Retry transient API failures

- Respect HTTP response codes

- Avoid infinite retry loops

- Log retry behavior clearly

Retries must not create duplicate StudentAssessment events and must respect dependency order. If a dependency fails, downstream processing must pause until resolved.

#### Backoff Strategy

During peak load periods, APIs may throttle or degrade.

The integration must:

- Respect API rate limits

- Use controlled or exponential backoff

- Avoid overwhelming the ODS/API during outages

- Prevent cascading failures across tenants

Backoff must work in coordination with retry logic so that failures are spaced, logged, and diagnosable.

#### Parallelization Safety

Parallelization improves throughput but introduces risk if not controlled.

Parallelization must:

- Respect tenant boundaries

- Respect dependency order

- Avoid race conditions across resources

- Prevent duplicate writes

Safe parallelization includes:

- Parallel processing by district tenant

- Parallel loading of StudentAssessment after metadata is established

- Bounded batch processing of StudentObjectiveAssessment

Unsafe patterns include:

- Loading dependent resources simultaneously without validation

- Running full reloads and incremental loads concurrently for the same tenant

- Multi-threaded writes without stable key enforcement

Parallelization must be tested at scale prior to production.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that runtime behavior is scalable, controlled, and resilient:

- Design for peak and full-load scenarios

- Implement deterministic retry logic

- Implement controlled backoff strategies

- Enforce dependency-aware execution

- Ensure safe parallelization across tenants

- Validate runtime performance under load conditions

- Prevent duplicate or conflicting writes

#### Prohibited Patterns

The following patterns are not allowed because they create instability and operational risk:

- Designing only for incremental loads

- Infinite or uncontrolled retry loops

- Ignoring API rate limits

- Parallel execution that violates dependency order

- Running conflicting load processes against the same tenant

- Retry strategies that create duplicate records

Well-designed runtime behavior ensures that integrations remain stable under load and recover gracefully from failure.

### 13.2 Monitoring and Observability

If you cannot see what the integration is doing, you cannot govern it.

Observability transforms an integration from a black box into accountable infrastructure. It enables troubleshooting, validation, and governance oversight.

#### Human-Readable Error Logs

Error logs must be:

- Human-readable

- Tenant-scoped

- Resource-specific

- Time-stamped

- District-auditable

Logs must clearly answer:

- What resource failed?

- Why did it fail?

- Was it a validation error?

- Was it a dependency issue?

- Was it a descriptor mismatch?

- Was it an authentication failure?

Opaque or technical-only logs are not acceptable. Districts must be able to interpret failures without vendor intervention.

#### Reconciliation Reporting

Reconciliation reporting ensures that intended data matches actual outcomes.

At a minimum, reporting must include:

- Count of records attempted

- Count of records successfully loaded

- Count of records rejected

- Breakdown by resource type

- Breakdown by error category

Advanced reconciliation should include:

- Student-level discrepancies

- Objective-level discrepancies

- Duplicate detection

- Missing dependency detection

Reconciliation is critical during:

- Initial go-live

- Full-year reloads

- Vendor correction resends

- Data Standard / API upgrades

Without reconciliation, districts are forced to trust integration outcomes without validation.

#### Resource-Level Error Breakdown

Errors must be categorized to enable rapid diagnosis and governance review.

Categories include:

- Assessment metadata failures

- ObjectiveAssessment structure failures

- StudentAssessment event identity failures

- StudentObjectiveAssessment hierarchy failures

- Descriptor resolution failures

- Referential integrity failures

Without structured categorization, large failure volumes become unmanageable.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that integration behavior is fully observable and auditable:

- Provide human-readable error logs

- Ensure logs are tenant-scoped and time-stamped

- Produce reconciliation reports for all runs

- Categorize errors at the resource level

- Enable district-level visibility into failures

- Support troubleshooting without requiring code access

#### Prohibited Patterns

The following patterns are not allowed because they prevent governance and troubleshooting:

- Opaque or unreadable logs

- Logs that require vendor interpretation

- Lack of reconciliation reporting

- Failure to categorize errors

- Missing visibility into failed records

Observability ensures that integration behavior can be understood, trusted, and governed.

### 13.3 Change Management and Versioning

Native integrations operate in evolving ecosystems. Without disciplined versioning and governance, change introduces silent data corruption and breaks longitudinal comparability.

There are three independent version layers that must be tracked and managed.

#### Assessment Version

This refers to changes in the assessment instrument itself.

Examples of changes include:

- Structural hierarchy changes

- Score calculation changes

- Performance level definition changes

- Statistical model recalibration

- Standards alignment changes

- Addition or removal of subtests or measures

These changes require governance decisions:

- Should the AssessmentIdentifier change?

- Does comparability across years remain valid?

- Should AssessmentFamily grouping change?

Failure to properly manage assessment versioning results in misleading longitudinal analysis.

#### Ed-Fi Data Standard Version

Ed-Fi Data Standard versions evolve and may introduce:

- New fields

- Deprecated fields

- Updated validation rules

- Descriptor constraints

- API behavior changes

The integration must:

- Explicitly track the target Ed-Fi version

- Be tested before upgrades

- Support migration planning

Silent incompatibility with new versions is not acceptable.

#### Integration (Bundle) Version

The transformation layer must be versioned independently.

This includes:

- Mapping logic updates

- Descriptor handling updates

- Hierarchy modeling changes

- Performance improvements

- Bug fixes

Versioning must include:

- Documentation

- Release notes

- Audit traceability

- Regression validation

Without versioning, districts cannot diagnose changes in data behavior.

#### Governance Triggers

The following events require formal governance review:

- Structural hierarchy changes

- Score method changes

- Performance level definition changes

- Statistical model changes

- Descriptor namespace changes

- Identifier construction changes

- Addition or removal of objective levels

Governance must evaluate the impact on:

- Longitudinal comparability

- Cross-district comparability

- Growth models

- Reporting pipelines

- Transcript reconstruction

No structural change should be deployed without governance review.

#### Assessment Provider Responsibility

The assessment provider is responsible for ensuring that all changes are controlled, documented, and governed:

- Track all version layers independently

- Document all changes and impacts

- Test changes prior to deployment

- Maintain version traceability

- Trigger governance review for structural changes

- Prevent silent or undocumented updates

#### Prohibited Patterns

The following patterns are not allowed because they introduce instability and loss of trust:

- Untracked or undocumented changes

- Silent updates to mappings or structure

- Deploying changes without testing

- Ignoring version dependencies

- Failing to assess longitudinal impact

Disciplined change management ensures that integrations remain stable, interpretable, and trustworthy over time.
