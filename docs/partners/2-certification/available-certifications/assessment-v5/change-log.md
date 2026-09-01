# Ed-Fi Assessment Outcomes API for Data Standard v5 Certification - Change Log

| Date | Change |
| --- | --- |
| February 2, 2023 | Change log created. |
| [DRAFT — date TBD upon Alliance publication] | **Version 2.0.** Comprehensive realignment of the Overview and Certification Steps pages to the Ed-Fi Assessment Vendor Native Integration Playbook. Requirement set reorganized around the Playbook's six Certification Checklist categories (§15.1–§15.6). 2 net-new pre-certification documentation steps added (Descriptor Mapping Configuration; Student Identity Crosswalk and Match Rate Methodology) and 1 net-new certification test added (Governance and Namespace Validation). New structural-hierarchy, submission-sequencing, and parallelization-safety criteria are incorporated as labeled sub-sections within existing tests rather than as separate step numbers, to keep the vendor-facing step count manageable. Step count changes from 14 (8 documentation + 6 tests, though 7 were actually listed — see Changed, below) to 17 (10 documentation + 7 tests). Full detail below. |

---

## Version 2.0 Detail

### Added

**Overview page**

- "Ed-Fi Assessment Vendor Native Integration Playbook" added to Standards Referenced.

**Certification Steps page — new pre-certification documentation**

- **Step 9, Descriptor Mapping Configuration Documentation** — provider must document descriptor-mapping configurability, override capability, a transparency/traceability artifact, and change control (Playbook §10.2–§10.6).
- **Step 10, Student Identity Crosswalk and Match Rate Methodology** — provider must document identity crosswalk approach, match-rate measurement/reporting, unmatched-record handling, and district correction workflow (Playbook §8.2, §8.4, §8.6, §8.7).

**Certification Steps page — new criteria added to existing tests**

- **Structural and hierarchy validation** — added to Step 13 (Batch Transmission and Structural Validation Test) as a labeled sub-section: single-subject resolution and correct Composite usage, hierarchy fidelity and recursion against the vendor's score report, and absence of orphaned or "ghost" definitions (Playbook §4.1, §4.2, §5.1, §5.3, §11.2).
- **Submission sequencing** — added to Step 13 as a further labeled sub-section: rejection of out-of-order resource submissions with a clear referential-integrity error, and retry logic that neither skips forward past a failed dependency nor creates a duplicate once it succeeds (Playbook §11.2).
- **Parallelization safety** — added to Step 15 (Error Handling Verification Test): where a vendor's integration supports parallelized submission, safe execution across tenants and respect for dependency order, with no race-condition duplicate writes (Playbook §13.1).

**Certification Steps page — new test**

- **Step 16, Governance and Namespace Validation Test** — confirms vendor/shared namespace alignment, vendor semantic preservation, and live descriptor-override configurability (Playbook §7.1–§7.3, §10.2–§10.4).

### Changed

**Overview page**

- "Technical Suite: Suite 3" field replaced with "Data Standard: v5" — Suite 3 designation retired.
- Certification Name changed from "Ed-Fi Assessment Outcomes API for Suite 3" to "Ed-Fi Assessment Outcomes API for Data Standard v5."
- Certification Version: 1.0 → 2.0. Obsoletes: — → Version 1.0 (Published December 4, 2023). Publication Date updated to reflect this release (placeholder pending Alliance approval).
- "Overview of Requirements" restructured from six ad hoc headers (Local Descriptor Guidance, Required Fields on API Resources, Student ID Configuration, Operations, Error Handling, Enumerations) into the Playbook's six Certification Checklist categories: Structural Integrity, Student Identity and Rostering, Event Completeness, Safe Reprocessing, Scalability and Runtime, Governance and Namespace (Playbook §15.1–§15.6). Existing content relocated into the matching category, not dropped.

**Certification Steps page — extended documentation steps**

- **Step 2** (Initial Implementation Verification) — added requirement to document version tracking across three independent layers: Assessment Version, Ed-Fi Data Standard Version, Integration (Bundle) Version (Playbook §13.3).
- **Step 3** (Data Mapping) — added requirements to document AssessmentIdentifier stability policy (Playbook §3.3), AssessmentFamily grouping criteria where applicable (Playbook §3.4), and subject-assignment confirmation (single AcademicSubject; correct Composite usage) (Playbook §4.1, §4.2).
- **Step 4** (Usage Narrative) — added a lightweight attestation describing how the integration handles peak/bursty load and distinguishes initial, incremental, correction, and full-reprocessing loads (Playbook §13.1). Documentation-level only; no dedicated peak-load test was added — flagged for staff/SIG discussion in the underlying gap analysis.
- **Step 6** (Fictitious Test Data) — added two sample-data requirements: one student record with intentionally unresolvable identity, and (where applicable) one student with more than one administration. Both are consumed by later tests (Step 12 and Step 14).
- **Step 8** (Custom Enumerations) — added a forward reference to new Step 16, where the "no renaming/normalization at ingestion" rule this step establishes is later confirmed. No new documentation burden.

**Certification Steps page — extended and renamed tests**

- **v1.0 Step 10, Student Roster Configurability Test → v2.0 Step 12, Student Identity and Rostering Test.** Renamed and substantially extended. Trigger condition broadened from "formal, shared rostering specification" (e.g., Clever, OneRoster, Ed-Fi Enrollment API) to any rostering approach — including proprietary integrations — that exposes multiple possible student identifiers (Playbook §8.3). Added a live match-rate demonstration (Playbook §8.4) and an unmatched-record handling sub-test, including a district-facing correction-workflow demonstration (Playbook §8.6, §8.7), with an alternative path for architectures that resolve identity fully upstream of Ed-Fi submission.
- **v1.0 Step 11, Batch Transmission Test → v2.0 Step 13, Batch Transmission and Structural Validation Test.** Renamed and expanded into three labeled sub-sections examined against one data submission: *data transmission* (now with explicit full-result-delivery and grain-placement criteria, Playbook §5.1, §5.2), *structural and hierarchy validation*, and *submission sequencing* (both new — see Added, above). Consolidating these into one step, rather than three separately-numbered tests, was a deliberate simplification: all three examine the same vendor submission, and vendors do not resubmit data for each.
- **v1.0 Step 14, Error Handling Verification Test → v2.0 Step 15.** Renumbered; added a backoff-strategy requirement (Playbook §13.1), upgraded the error-logging criterion to require a tenant-scoped, resource-specific, time-stamped format sufficient for district-side diagnosis without vendor interpretation — including dependency-order failures as a distinct, diagnosable category (Playbook §13.2) — and added a parallelization-safety scenario (see Added, above).
- **v1.0 Step 15, API Integration Test → v2.0 Step 17.** Renumbered; added a requirement to walk through identity resolution, descriptor mapping, and event-modeling logic in the same live session, sufficient that a reviewer could explain this behavior without inspecting transformation code (Playbook §13.3).
- **v1.0 Step 9, User Interaction and Availability Test → v2.0 Step 11.** Renumbered only; content unchanged.

**Both pages**

- Step-count language corrected. The v1.0 Certification Steps page stated "14 steps... 8 documentation steps and 6 tests" while actually listing 7 numbered tests (Steps 9–15) — an internal inconsistency in the source document, independent of Playbook alignment. v2.0 states the corrected, current total: 17 steps (10 documentation, 7 tests).

### Removed

**Overview page**

- Sentence "Given market demand, the Alliance will publish a consumer conformance specification as well." removed from Overview and Purpose (staff decision; not Playbook-driven).
- "Obsoleted By: –" line retained as-is (this document does not yet obsolete a future version).

**Certification Steps page**

- **v1.0 Step 12, Synchronization Recovery Test** and **v1.0 Step 13, Provider Data Update Test** removed as standalone steps. Their procedures are absorbed into v2.0 Step 14, Safe Reprocessing Simulation Test, as the "historical backfill" and "correction reload" scenarios respectively — consistent with Playbook §11.3's treatment of reprocessing as one capability tested across four named scenarios, rather than as separate, narrower ad hoc tests.

---

## Old → New Step Number Mapping

*(Built directly from the trailing comments in assessment-v5-certification-steps-v2.md; feeds directly into this change-log per the workflow's Phase 3 instruction. Reflects the final, consolidated 17-step structure.)*

| v1.0 Step | v2.0 Step | Disposition |
| --- | --- | --- |
| 1. Product Availability & Pricing Information | 1 | Unchanged |
| 2. Initial Implementation Verification Information | 2 | Extended (+ version tracking) |
| 3. Data Mapping | 3 | Extended (+ identifier stability, AssessmentFamily, subject assignment) |
| 4. Usage Narrative | 4 | Extended (+ peak-load attestation) |
| 5. Score Report Template(s) | 5 | Unchanged |
| 6. Fictitious Test Data for 100–500 Students | 6 | Extended (+ 2 sample-data requirements) |
| 7. Sample Learning Standards Reference Identifiers | 7 | Unchanged |
| 8. Custom Enumerations Used by the Vendor in Integrations | 8 | Extended (+ forward reference) |
| — | 9 | **New** — Descriptor Mapping Configuration Documentation |
| — | 10 | **New** — Student Identity Crosswalk and Match Rate Methodology |
| 9. User Interaction and Availability Test | 11 | Unchanged (renumbered only) |
| 10. Student Roster Configurability Test | 12 | Replaced/renamed — Student Identity and Rostering Test (broadened + extended) |
| 11. Batch Transmission Test | 13 | Extended and expanded — Batch Transmission and Structural Validation Test (adds structural/hierarchy and submission-sequencing sub-sections) |
| 12. Synchronization Recovery Test | 14 | Absorbed, with Step 13 below, into Safe Reprocessing Simulation Test |
| 13. Provider Data Update Test | 14 | Absorbed, with Step 12 above, into Safe Reprocessing Simulation Test |
| 14. Error Handling Verification Test | 15 | Extended (+ backoff strategy, upgraded logging, parallelization-safety scenario) |
| — | 16 | **New** — Governance and Namespace Validation Test |
