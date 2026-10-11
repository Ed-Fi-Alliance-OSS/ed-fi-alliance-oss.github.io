# Ed-Fi Data Standard Documentation Content Audit: Report

Status: Phase 3 synthesis, 2026-10-10. Draft for human review (Phase 4). Not
yet approved; no tickets have been created and no documentation has been
edited.

## AI-Assisted Analysis

This report and all of the findings it draws on were produced with AI models
(Claude AI agents) working from the repository source, a local
`npm run build`, and scripts in [scripts/](./scripts/). A person must review
every recommendation before acting on it, and that reviewer is accountable for
any decision taken from this report. If you share this report, or content
derived from it, outside the documentation team, disclose that the analysis
was AI-assisted and include the limitations below. The proposed wording in
this report (for example, the "after" example and the glossary definitions)
is illustrative and needs subject-matter expert (SME) review before
publication.

### Assumptions and Limitations

- **Perplexity is a black box.** The target answer engine (Perplexity web
  search restricted to `docs.ed-fi.org`) was not queried. Its crawling,
  chunking, ranking, and handling of `noindex`, canonical tags, and redirects
  are undocumented or only partly documented.
- **The BM25 simulator is a directional proxy.** `scripts/retrieval.py` ranks
  whole pages with BM25 and a title boost. It shows relative effects (does an
  older version outrank v6?), not what Perplexity will return.
- **The 251 evaluation questions are synthetic.** They were written by an AI
  model from the rubric and the pages (`questions.yaml`); no real search logs
  were available. Their `expected_urls` reflect the question author's view.
- **Rendered evidence comes from a local build.** The live site was not
  reachable from the container (proxy 403). All "built HTML" evidence comes
  from `npm run build` on Docusaurus 3.10.2 at the audited commit.
- **Findings are AI judgments.** Rubric scores vary by agent: some agents
  marked vacuous criteria `n/a`, and 2b5 scored them 3, which inflates its
  scores slightly. Treat scores as relative within this report, not as
  absolute quality grades. 2f1 retrieval verdicts were partly keyword-based
  (lower confidence); 2f2 read page text.
- **External links were not checked** (274 in v5 and UDM pages alone), and
  claims about artifacts on GitHub (for example, "Visio format" diagrams) were
  not verified offline.
- **Scope.** Ed-Fi Data Standard v5 and v6 content, the Ed-Fi Unifying Data
  Model (UDM) folder, `data-standards.md`, and cross-version handling of v3
  and v4. Site-wide notes outside this scope are labeled as such.

## Contents

- [Executive Summary](#executive-summary)
- [Findings by Theme](#findings-by-theme)
- [Proposed Domain Page Template](#proposed-domain-page-template)
- [Version Plan for v3, v4, and v5](#version-plan-for-v3-v4-and-v5)
- [Per-Domain Scorecard](#per-domain-scorecard)
- [Retrieval Results](#retrieval-results)
- [Terminology Appendix](#terminology-appendix)
- [Glossary Proposal](#glossary-proposal)
- [Candidate Work Items](#candidate-work-items)
- [Appendix: Findings Index and How to Re-Run](#appendix-findings-index-and-how-to-re-run)

## Executive Summary

The Ed-Fi Data Standard (DS) v6 documentation holds a lot of good, specific
guidance, mostly on the best-practices pages. When a reader is already on the
right v6 domain page, the domain pages fully answer 124 of 208 domain
questions (60%), partly answer 74, and fail on 10. The problem is getting
there. In the BM25 simulation, a top-3 result fully answers only 102 of 251
questions (41%). An older Data Standard version (v3, v4, or v5) appears in
the top 3 for 174 questions (69%), because most v3 to v5 pages are
near-copies of v6. And 99 of 129 v6 page titles are identical to an older
version's title.

Three structural problems explain most misses:

1. **Version noise.** About 290 older-version pages compete with 129 v6 pages.
   No page title or opening sentence names its version. Support status is
   wrong in several places: DS v4 is still labeled "active" and "Supported",
   the v5 landing page calls v5.2 "the most recent version", and
   `data-standards.md` lists v3 and v4 under "Active Versions".
2. **Thin, template-driven domain pages.** 24 of 26 v6 overviews open
   directly with `## Key Entities`, so their auto-derived meta description is
   literally "Key Entities". No in-scope page has a `description:`. 19 of 26
   diagram pages expose fewer than 60 words of crawlable text. Entity tables
   bury each domain's own descriptors under rows inherited from other domains:
   Bell Schedule owns 1 of 31 descriptor rows, and Student Attendance owns 1
   of 39. Domain pages rarely use learner vocabulary such as "bus route",
   "teaching license", "room number", or "A/B schedule".
3. **No on-ramp.** No page defines "descriptor" or "extended reference", none
   explains how to read an entities table, and none contrasts the Ed-Fi Data
   Standard with the Ed-Fi ODS/API. The "Ed-Fi Domains" page says "17 base
   domains", but v6 has 26. Of 32 conceptual questions, 18 got no answer in
   the retrieval test.

Factual errors also give learners wrong answers. Examples include a "Coming
Soon" overview (Recruiting and Staffing), a Survey diagrams page that
describes the "Assessment domain model", "Parent" in v6 prose where the
entity is Contact, a Discipline best-practices page written for DS v3.3-a,
corrupted JSON in Assessment best practices, and a StudentHealth definition
copied from Discipline. See [Quality and accuracy fixes](#quality-and-accuracy-fixes).

In the simulation, removing v3 and v4 and canonicalizing the 49 v5 pages
that are near-identical to v6 moves 25 more questions' expected page into
the top 3 (hit@3 rises from 42% to 52%). It also cuts "older version in top
3" from 69% to 45%. Content fixes (overview template, glossary, gap filling)
target another 61 to 70 misses that the simulation cannot model. The
directional estimate is that 60% to 70% of questions would be fully answered
after the top 10 recommendations, up from 41%.

### Top 10 Recommendations

Priority = impact ÷ effort (scoring in [Prioritization](#prioritization)).

| # | Recommendation | Effort | Work item |
| --- | --- | --- | --- |
| 1 | Correct stale version-status and "latest version" statements in `data-standards.md`, `1-data-exchange/readme.md`, `supported-versions.md`, the v5 landing and Model Reference pages, the version dropdown, and the v4 banner and `className`. | S | WI-01 |
| 2 | Fix the factual errors and naming conflicts in Q-04 to Q-42 under [Quality and accuracy fixes](#quality-and-accuracy-fixes), starting with the ones that give wrong answers (Q-04 to Q-20). | S–M | WI-02 |
| 3 | Execute the version plan: retire DS v3 now (remove and redirect), set `noIndex` and an "unmaintained" banner on DS v4 now and retire it on 2027-07-01, and canonicalize 49 near-identical v5 pages to v6. | M | WI-03, WI-04, WI-05 |
| 4 | Put "Ed-Fi Data Standard vN" in every Data Standard page `<title>` and a visible line above the H1 (one theme wrapper), and add `description:` front matter to v6, v5, and UDM pages. | M | WI-06, WI-07 |
| 5 | Build the learner on-ramp: a data model concepts glossary, a "how to read an entities page" section, a grouped domain map on the v6 Model Reference index, a corrected "Ed-Fi Domains" page (26 domains), and a Data Standard vs. UDM vs. Ed-Fi ODS/API vs. Ed-Fi API Specification table. | M | WI-08, WI-09 |
| 6 | Wire up change history: list all five What's New child pages, add a release summary table, put "Data Standard" in What's New titles, and add a "Changes in v6.x" note (or "No changes") to every domain overview, linked both ways. | S–M | WI-10 |
| 7 | Run a terminology find-and-review pass: 234 violations in 55 files, including template sentences that repeat across domains and versions. | S | WI-11 |
| 8 | Adopt the domain readme and overview template: an opening paragraph naming the domain, version, and audience; all owned entities; an "In everyday terms" line; common scenarios; related domains. | L (M per domain) | WI-12 |
| 9 | Redesign the 26 entities pages: add a lead-in and column legend, list domain-owned descriptors first, collapse inherited ones, and drop empty classification columns. | M | WI-13 |
| 10 | Add crawlable "Entities and relationships" text under every v6 Mermaid diagram (and v5 image diagram), derived from the `.mmd` sources. | M | WI-14 |

Recommendations 8 to 10 are the largest content lift. A pilot on two or three
domains, followed by a re-run of the retrieval judgment, is the best way to
confirm the template before scaling it to all 26 domains.

### Verification of High-Severity Claims

The High-severity claims used in the summary and Top 10 were spot-checked
against the source or `build/` during synthesis.

| Claim (source finding) | Result |
| --- | --- |
| DS v4 Student Identification pages list `Contact` and `StudentContactAssociation` while descriptor rows still say `Parent` (2e-006) | Verified: `version-4/.../student-identification-and-demographics-domain/entities-references-and-descriptors.md` lines 12, 16, 28 to 33; the rename is credited to v5.0 in `version-5/whats-new/whats-new-v50.md` line 210. |
| Recruiting and Staffing overview is "Coming Soon" (2a1-001, 2b7-001) | Verified: source lines 9 and 15; 2 occurrences in built HTML. |
| Survey diagrams page describes the "Assessment domain model" (2b7-011, 2c2-22) | Verified in v6 (line 12) and v5 (line 7); it is also the built meta description. |
| `data-standards.md` lists v3 and v4 as active (2a2-018, 2d1-04, 2e-004) | Verified: "## Active Versions" with "### Version 4.0" and "### Version 3.x" ("will be the last year"); `1-data-exchange/readme.md` says "version 4 (active)". |
| v4 configured as active (2e-003) | Verified: `docusaurus.config.js` sets `4: { banner: 'none', className: 'active' }`; the dropdown shows "4 (Supported)"; the built v4 banner says "still maintained". |
| v5 landing claims v5.2 is "the most recent version" (2c2-01) | Verified: `version-5/readme.md` line 46. |
| Discipline best practices discusses deprecated `StudentDisciplineIncidentAssociation` (2b2-05) | Verified: the only v6 file containing the name. |
| StudentHealth described as a discipline-incident entity (2b6-24) | Verified: line 12 of the v6 entities page. |
| Assessment best-practices JSON corrupted (2b5-18) | Verified: curly quotes in code (lines 118, 119, 124) and Markdown links inside JSON (line 117). |
| "Parent" in v6 prose (2b1-16, 2b7-012) | Verified in the Education Organization and Survey overviews. |
| Bell Schedule entities, Student Program Evaluation missing entity, "CalendarEvent entity", `api-changes-6.md` survey routes, "17 base domains", v5 EPDM readme (2b5-30, 2b5-37, 2b5-24, 2b7-021, 2d1-01, 2c1-01) | Verified in source. |
| No `description:` front matter in scope; 99 of 129 v6 titles shared with an older version; 24 v6 meta descriptions are "Key Entities" | Verified by grep and from `inventory-html.csv`. |
| Docusaurus 3.10.2 supports per-version `noIndex` | Verified in `node_modules/@docusaurus/plugin-content-docs/lib/options.js`. |

Q-08, Q-12, Q-16, Q-17, and Q-21 to Q-42 rely on the source findings and were
not re-checked during synthesis.

Items that **did not verify** or need correction:

- **2a1-002** says the What's New v6.0 repository-path link
  (`/dataStandard_versioned_docs/version-6/model-reference/readme.md`) does
  not resolve. It does: Docusaurus rewrites it to
  `/reference/data-exchange/data-standard/model-reference/` in the build
  (2d2-23 is correct). The finding is downgraded to Low: vague link text and
  a fragile path.
- **Rubric T5 example (Student Health).** The vaccine codes are not entity
  rows. They are two untitled "Code / Short Description" tables after the
  descriptor table (2b6-25). The real issues are the missing headings and
  lead-ins. The rubric example should be corrected.
- **`StudentDemographic`** in the Enrollment overview is a current v6 entity,
  not a stale name. The issue is unclear ownership between Enrollment and
  Student Identification and Demographics (2b4-05).
- **`ChartOfAccount` vs. `ChartOfAccounts`.** 2b7-023 says to use
  `ChartOfAccount`, and 2c1-15 says to use `ChartOfAccounts`. In v6, the
  `.mmd` and the descriptor rows use `ChartOfAccount`, while the entities
  table row uses `ChartOfAccounts`. This is unresolved and needs an SME
  decision.
- **2b1 answerability tally.** The text says 14 full and 10 partial, but the
  table rows give 15 full and 9 partial. This report uses the table rows.

## Findings by Theme

Findings below are deduplicated by `pattern`. Counts come from the inventory
or a grep and are cited with the source finding IDs. Paths abbreviate
`dataStandard_versioned_docs/version-N/model-reference/` as `vN/mr/`.

### Metadata and Titles

| Issue | Evidence | Recommendation |
| --- | --- | --- |
| No version in `<title>` or H1 | 418 Data Standard pages share 147 distinct titles; 99 of 129 v6 titles are identical to an older version's (for example `Graduation Domain - Overview \| Ed-Fi Alliance` exists in v3 to v6) (2e, 2b2-03) | Theme wrapper on `DocItem/Metadata` and `DocItem/Content` for `pluginId === 'dataStandard'`: title `Graduation Domain - Overview (Ed-Fi Data Standard v6)`, plus a visible line above the H1 (2e Option F). One code change covers every version. |
| No `description:` front matter | 0 in-scope pages; built descriptions are the first heading: "Key Entities" on 24 v6 pages, "Active Versions" (`data-standards.md`), "Documentation Home" (v6 landing), "New Endpoints" (API changes) (2b1-35, 2b3-44, 2d2-11) | Add 120 to 160 character descriptions naming domain and version. Drafts are in 2b4-32, 2b3-44, 2b6-35, and 2d2-11. |
| Generic, repeated headings | "Key Concepts" on 27 v6 pages, "Key Entities" 26, "Extended References" 25; v5 similar (2a1-009, 2a2-025) | Prefix with the domain: "Graduation Key Concepts". Retrieved passages often carry only the H2. |
| Name drift within a domain | Recruiting and Staffing: three names (H1 "Recruitment And Staffing", slug and What's New "Recruiting", `api-changes-61.md` "RecruitingAndStaffing"); Educator Preparation Program: three H1 variants plus "Data Model" link text; Performance Evaluation, Path, and Credential diagram H1s say "Data Model Domain"; Student Health slug `entities-references-descriptors` (1 of 26) (2b7-003, 2b2-08, 2b1-25, 2b3-37, 2b4-31, 2b6-30) | Choose one name per domain matching the slug; apply it to the H1, readme link text, What's New, and the "Ed-Fi Domains" page. |
| Back-link boilerplate | 24 v6 readmes end with "Go back to the UDM Reference page" or "...Model Reference page"; the target H1 is "Unifying Data Model - v6 Model Reference" (2a1-007) | Replace with a "Related domains" block (see template). |
| `hide_table_of_contents: true` on long pages | 3,000 to 4,000-word best-practices pages and 70-row entities pages (2b4-37, 2b2-19, 2b7-036) | Remove the setting on pages longer than about 1,000 words. |

### Version Strategy and Retirement

Summary only; the full plan is in [Version Plan](#version-plan-for-v3-v4-and-v5).

- **Duplication.** Among pages with a v6 counterpart, 28 of 65 (v3), 36 of 68
  (v4), and 49 of 80 (v5) are at least 0.98 similar to v6. v4 and v5 share
  67 byte-identical pages. The only content that really differs by version is
  the entities tables and What's New (2e-001).
- **Retrieval competition.** Older twins of the expected v6 page are in the
  top 3 for 75 questions; v5 accounts for 54 of these (2e-002). v6 entities
  pages are a median 1.65 times longer than v5's (inherited descriptor rows),
  and BM25 length normalization favors the shorter old tables (2e-008).
- **Wrong lifecycle signals.** v4 is labeled active in the config, banner,
  dropdown, and two landing pages. No v5 page says that v6 exists or that v5
  is supported through 2027-2028, and v5 has `banner: 'none'`
  (2e-003, 2c1-08, 2c2-02).
- **Unreliable v4 docs.** The v4 Student Identification pages contain DS 5.0
  content (`Contact`), so they can give wrong DS 4.0 answers (2e-006).
- **Renamed domains.** EPDM-era pages (`educator-preparation-data-model-domain`,
  `student-path`) win Educator Preparation, Path, and Performance Evaluation
  questions with no pointer to the v6 domains (2e-012).
- **On-site search.** Algolia `contextualSearch: false` mixes v3 to v6 results
  with identical titles (2e-014).

### Domain Page Template

Recurring page-level findings promoted to template recommendations. The
template itself is in [Proposed Domain Page Template](#proposed-domain-page-template).

| Pattern | Count | Example pages | Source |
| --- | --- | --- | --- |
| Overview opens with `## Key Entities`; no scope, audience, or version | 24 of 26 v6 overviews; 20 of 21 v5 overviews | `v6/mr/graduation-domain/overview.md` | 2a2-027, 2b1-32, 2b2-31, 2b4-32, 2b5-07, 2b6-02, 2b7-041 |
| Readme is a link hub (one sentence plus 3 to 6 links) | 26 v6 readmes (median 75 words of prose); 21 v5 | `v6/mr/credential-domain/readme.md` (34 words) | 2a1-006, 2a2-029 |
| Overview omits owned entities that the table and diagram include | 15+ domains, for example Performance Evaluation 4 of 13, Credential 2 of 5, Survey 6 of 13, Enrollment 5 of 14 | `v6/mr/performance-evaluation-domain/overview.md` | 2b1-24, 2b4-15, 2b7-013, 2b4-06 |
| Overview, entities table, and diagram disagree | Every batch found at least one (for example `StudentSection504ProgramAssociation`, `OpenStaffPositionEvent`, `RubricDimension`, `GeneralStudentProgramAssociation` vs. `StudentProgramAssociation`) | `v6/mr/alternative-and-supplemental-services-domain/` | 2b1 consistency table, 2b2-21, 2b4-19 |
| No links from overviews | `links` = 0 on most v6 overviews | `v6/mr/student-cohort-domain/overview.md` | 2b3-43, 2b6-03, 2b4-27 |
| Learner vocabulary absent | 23 retrieval misses; terms such as "school district", "bus route", "teaching license", "room number", "email", "ethnicity", "A/B", "tutoring", "end-of-course exam" | many | 2f1-02, 2f2-02, 2b batches |
| No "changes in this version" pointer | No v6 domain folder links to What's New; only Enrollment best practices and the Staff overview carry an in-page version note | `v6/mr/path-domain/` (new in 6.0) | 2b3-42, 2b5-13, 2b7-045 |
| Domains with no best-practices page and unanswered how-to questions | Bell Schedule, Educator Preparation Program, Intervention, Education Organization, Student Cohort, Performance Evaluation, Credential, Survey, Recruiting and Staffing | `v6/mr/intervention-domain/readme.md` | 2b5-36, 2b2-15, 2b6-31, 2b1-31, 2b4-28 |
| Repeated template sentences with brand issues | "Required attributes in Ed-Fi are hard constraints" (6 pages per version); heading "Ed-Fi Prerequisites for Writing ..." (4) | `v6/mr/enrollment-domain/best-practices.md` | 2aT1-01, 2aT1-02 |

### Entities Tables and Descriptors

- **Inherited descriptor rows dominate.** All 26 v6 entities pages have an
  `empty_cell_ratio` of 0.25 or higher. Domain-owned descriptor shares
  include Bell Schedule 1 of 31, Student Attendance 1 of 39, Student Cohort 3
  of 42, Graduation 9 of 51, Discipline 7 of 28, Teaching and Learning 24 of
  77, School Calendar 5 of 37, and Finance 3 of 11. `Country` repeats in 21
  v6 domains and `Sex` in 18 (2b1-10, 2b3-18, 2b4-29, 2b5-31, 2b2-33).
- **This is a v6 regression.** The v5 tables list mostly domain-owned
  descriptors grouped by owning entity: Graduation 16 rows vs. 65 in v6, Bell
  Schedule 7 vs. 47, School Calendar 6 vs. 38. v6 should return to the
  owner-first design (2c1-31, 2c2-25).
- **Empty classification columns.** Pooled across v6, "Commonly
  State-Defined" is empty in 91.5% of rows, "EDFacts Mapping" in 83.6%, and
  "Commonly Used" in 72.9%. None of these columns is defined anywhere in v6
  (2a1-008).
- **No lead-in.** Every entities page goes from the H1 to a heading and a
  table. The only explanation is a trailing tip about Usage Classification
  (2b1-30, 2b2-32, 2b4-36, 2b5-10, 2b6-05, 2b7-044).
- **Wrong rows or wrong table** (T5). Bell Schedule lists School, Section,
  Session, and EducationOrganization as domain entities. Student Program
  Evaluation omits `StudentProgramEvaluation`. Discipline lists School, Staff,
  and Student as domain entities. Student Identification lists FinancialAid as
  an extended reference after the 6.1 move. Student Health's default-value
  tables have no headings (2b5-30, 2b5-37, 2b2-24, 2b6-19, 2b6-25).
- **Inconsistent column order** across versions ("Entity, Name" in v5 vs.
  "Name, Entity" in v6) (2c1-32).

### Diagram Text Equivalents

- 19 of 26 v6 diagram pages expose fewer than 60 visible words (median 28).
  Mermaid renders client-side, so the entities and relationships are not
  crawlable (2b2-01, 2b3-01, 2b4-01, 2b6-01, 2b7-010). Teaching and Learning,
  Assessment, Student Academic Record, and Student Program Evaluation have
  partial prose, which is the pattern to copy.
- Some answers exist only in `.mmd` files. Examples: `AlternateDayName`
  (A/B schedules), `RequiredAssessment` (graduation), `DisciplineActionLength`
  and `ActualDisciplineActionLength`, `RequiredImmunization`, `AcademicHonor`,
  `GradePointAverage`, and the Candidate-to-Person-to-Staff link
  (2b5-33, 2b3-33, 2b2-25, 2b6-26, 2b7-033, 2b2-11).
- Relationship labels in `.mmd` files are almost all `"HasAssociated"`, so
  even the download carries little meaning (2b4-01). "Download detailed UML
  diagram" links to a Mermaid text file, not a UML artifact (2b3-02). The
  Educator Preparation Program link points to the simple diagram (2b2-12).
- v5 diagrams are PNG and JPEG images with generic alt text ("Graduation
  Domain"). 9 of 11 audited v5 diagram pages have no relationship text
  (2c1-03, 2c2-20).
- The retrieval judgment found **no** misses caused purely by diagram-only
  content, because most questions are also partly answered in prose or
  tables. The diagram fix mainly turns partial answers into full ones and
  serves human readers who cannot read the diagram. That is why it ranks
  10th, not higher.

### Learner On-Ramp and Glossary

- No definition of "descriptor", "extended reference", "domain", or
  "reference" exists in the UDM pages. The Core Concepts glossary has three
  rows (2d1-02).
- The "Ed-Fi Domains" page says "17 base domains" while v6 has 26, and an SEA
  playbook page says 16. Nine v6 domains are missing from the page (2d1-01).
- `data-standards.md` opens with "Active Versions" rather than a definition.
  No page contrasts the Ed-Fi Data Standard, the UDM, the Ed-Fi ODS/API, and
  the Ed-Fi API Specification (2d1-03, q-concept-02 = none).
- The v6 landing page never links the Model Reference or explains the domain
  page structure. Its first sentence calls the UDM "the ... data standard"
  (2d2-01, 2d2-02).
- The v6 Model Reference index names no domains. The 26 domains exist only in
  the autogenerated sidebar, which is not crawlable as an answer passage
  (2d2-13).
- Concept content is duplicated across pages: definitions, naming
  conventions, Handbook descriptions, and support windows each appear on 3 to
  6 pages (2d1 overlap table). The recommended single home for each is in
  2d1.

### Change History (What's New and Migration)

- The What's New index lists 3 of 5 child pages; `api-changes-61.md` and
  `migration-guide.md` are not linked from it or the landing page. Four of
  the change-history pages have zero links to model-reference pages (2d2-18).
- Titles lack "Data Standard". "API Changes from 5.0 to 6.0" collides with
  Ed-Fi ODS/API version numbers, and `/reference/ed-fi-api/6.2/whats-new`
  outranks the Data Standard page for "what changed in data standard 6.0"
  (2d2-28, 2d2-29).
- There is no per-change structure (breaking or not, who is affected, what to
  do) and no release summary table. "Breaking" appears 0 times in the API
  changes pages (2d2-19, 2d2-20, 2d2-30).
- The migration guide omits breaking changes that What's New v6.0 lists:
  `numericRating`, the `tpdm` to `ed-fi` descriptor namespace change, and
  removed Candidate properties (2d2-35).
- "When was X added?" questions fail for Assessment Registration (v5.2),
  Student Health (v5.1), Student Program Evaluation (v5.0), and the Parent to
  Contact rename (v5.0). The answers exist only on v5 What's New pages
  (2d2 answerability, 2b6-10, 2b6-29).
- v5 What's New has no release dates, no breaking-change summary, no forward
  pointer to v6, and `api-changes-5.md` covers only 5.1 to 5.2 (2c2-07,
  2c2-08, 2c2-14).

### Terminology Conformance

Summary only; see the [Terminology Appendix](#terminology-appendix).

- 234 violations across 55 files (106 in v6 and UDM pages, 128 in v5 pages).
  The largest families are "Ed-Fi" plus an unlisted noun (57), "Ed-Fi data
  model" and its variants (49), and bare "Ed-Fi" as a subject or location
  (28).
- 41 pages fail the "full form first" check: 21 v6 and UDM pages and 20 v5
  pages (2aT1, 2aT2).
- Template sentences make up a large share: 12 "hard constraints"
  sentences, 8 "Prerequisites" headings, and 14 table headers. Fix them once
  per template, in both v5 and v6.
- Site-wide note (outside audit scope): lowercase "Ed-Fi community" appears 95
  times in 57 files under `docs/` and `dataStandard_versioned_docs/`, and
  "Ed-Fi Unified Data Model" (wrong name) appears in 4 files (2aT1-06,
  2aT1-07).

### Quality and Accuracy Fixes

Concrete errors with file paths, grouped by impact. "SME" marks items that
need a subject-matter expert to confirm the correct wording.

#### Wrong answers (fix first)

| # | Path | Error | Fix | Source |
| --- | --- | --- | --- | --- |
| Q-01 | `docs/reference/1-data-exchange/data-standards.md`; `docs/reference/1-data-exchange/readme.md` | v3 and v4 listed as "Active"; "will be the last year" (past); v6 window conflicts with `supported-versions.md`; 6.1 not mentioned | Rewrite as "Supported versions" and "Retired versions"; link `supported-versions.md`; keep the `version-3x` anchor (used by the certification registry) | 2a2-018, 2d1-04, 2e-004 |
| Q-02 | `dataStandard_versioned_docs/version-5/readme.md`; `v5/mr/readme.md`; `v6/mr/readme.md` | v5 is "the most recent version"; v5.2 Handbook "(Latest version)"; v6.0 Handbook "(Latest version)" under 6.1 | "Most recent v5 release is v5.2.0; v6 is current"; remove "(Latest version)" | 2c2-01, 2c1-08, 2d2-14 |
| Q-03 | `docusaurus.config.js`; `src/components/VersionDropDown/index.jsx`; `src/theme/DocVersionBanner/index.js` | v4 `className: 'active'`, banner "still maintained", "4 (Supported)"; v3 banner says "Ed-Fi Alliance 3" | Covered by WI-03 | 2e-003, 2e-007 |
| Q-04 | `v6/mr/recruiting-and-staffing-domain/overview.md` | "_Coming Soon_" in both sections | Write the overview (SME), or hide the page until ready | 2a1-001, 2b7-001 |
| Q-05 | `v6/mr/survey-domain/model-diagrams.mdx`; `v5/mr/survey-domain/model-diagrams.md` | "reference information for the Assessment domain model" (also the meta description) | "the Survey domain model" | 2b7-011, 2c2-22 |
| Q-06 | `v6/mr/education-organization-domain/overview.md` (lines 64, 67); `v6/mr/survey-domain/overview.md` (line 41); same lines in v5 | "Student, Parent, and Staff"; "(Student, Staff, or Parent)" | Use "Contact" | 2b1-16, 2b7-012, 2c1-24 |
| Q-07 | `v6/mr/discipline-domain/best-practices.md` (identical in v5) | Framed as "With the Data Standard v3.3-a release ..."; advises on deprecated `StudentDisciplineIncidentAssociation`, absent from v6 | Rewrite for v6 (SME) | 2b2-05 |
| Q-08 | `v6/mr/discipline-domain/overview.md` | "one DisciplineAction entity could have multiple DisciplineIncident entities as an attribute" contradicts the v6 diagram | A DisciplineAction references StudentDisciplineIncidentBehaviorAssociation records | 2b2-06 |
| Q-09 | `v6/mr/student-health-domain/entities-references-descriptors.md` (and v5) | StudentHealth "represents actions taken ... recorded as a discipline incident" | Use the immunization-record definition | 2b6-24, 2c2-24 |
| Q-10 | `v6/mr/assessment-domain/best-practices.md` | 5 of 6 JSON blocks invalid (curly quotes, backticks, Markdown links in code) | Rewrite as valid JSON | 2b5-18 |
| Q-11 | `v6/mr/assessment-registration-domain/best-practices.md` | Prerequisites list SEOA attributes (Race, Sex, Address) moved in v6.0; names nonexistent `AssessmentRegistrationParticipation`; "introduced in this version" means 5.2 | Update for v6 (StudentDemographic, StudentDirectory); correct entity names | 2b6-09, 2b6-10, 2b6-11 |
| Q-12 | `v6/mr/student-identification-and-demographics-domain/best-practices.md` | StudentCharacteristic and Disability placed on SEOA (v5 model); three images all "v3.1"; malformed JSON | Update for v6; text version of the decision tree | 2b6-16, 2b6-17, 2b6-18 |
| Q-13 | `v6/mr/bell-schedule-domain/entities-references-and-descriptors.md` | School, Section, Session, EducationOrganization listed as domain entities; AcademicWeek, GradingPeriod as references; "PostSecondaryInstitiution" | Entities: BellSchedule and ClassPeriod only | 2b5-30, 2b5-32 |
| Q-14 | `v6/mr/student-program-evaluation-domain/entities-references-and-descriptors.md` | Central `StudentProgramEvaluation` entity missing | Add the row | 2b5-37 |
| Q-15 | `v6/mr/school-calendar-domain/overview.md`; `readme.md`; `entities-references-and-descriptors.md` | "The CalendarEvent entity" (it is a descriptor on CalendarDate); readme says SEAs or LEAs define calendars, overview says calendars are school-level; CalendarDate and GradingPeriod descriptions wrong | Use CalendarDate; align the readme with the model | 2b5-24, 2b5-25, 2b5-27 |
| Q-16 | `v6/mr/educator-preparation-program-domain/entities-references-and-descriptors.md` | `FieldworkExperience` described as "a post-secondary instructional course" | Describe the clinical placement (SME) | 2b2-07 |
| Q-17 | `v6/mr/enrollment-domain/overview.md` | "StudentEducationOrganizationAssociation is not a part of this domain" but it is in the table and diagram; StudentDemographic, StudentDirectory, StudentIdentificationCode ownership unexplained | State ownership and link Student Identification and Demographics | 2b4-04, 2b4-05 |
| Q-18 | `v6/mr/alternative-and-supplemental-services-domain/best-practices.md` (and v5) | `EntrEducationOrganization Date (key)`, `Staf (key)`, `GeneralStudentProgamAssociation` ×4, stale `LastEvaluationDate`; Section 504 association missing from the entities table | Correct names against the Handbook | 2b1-01, 2b1-06, 2b1-11, 2a2-001 |
| Q-19 | `v6/whats-new/api-changes-6.md` (line 634) | `surveyResponsePersonTargetAssociation` lists `/ed-fi/studentDemographics` routes; other route typos (`/ed-fi/ed-fi/credentialEvents`, missing `/` before `{id}`) | Correct routes | 2b7-021, 2d2-31 |
| Q-20 | `docs/reference/1-data-exchange/udm/getting-started/ed-fi-domains.md` | "17 base domains"; nine v6 domains missing | Update to 26 and add the missing domains | 2d1-01 |

#### Stale, inconsistent, or misleading

| # | Path | Issue | Source |
| --- | --- | --- | --- |
| Q-21 | `v6/mr/education-organization-domain/overview.md` | Hierarchy "must have a StateEductionAgency ... (if present)"; omits ESC; three associations missing from overview | 2b1-18, 2b1-19 |
| Q-22 | `v6/mr/student-identification-and-demographics-domain/entities-references-and-descriptors.md` | FinancialAid listed as an extended reference after the 6.1 move; AncestryEthnicOrigin and TelephoneNumberType mapped to wrong entities | 2b6-19, 2b6-20 |
| Q-23 | `v6/whats-new/whats-new-v60.md`; `api-changes-6.md` | FinancialAid filed under Enrollment with no pointer to the 6.1 move | 2d2-22 |
| Q-24 | `v6/whats-new/migration-guide.md` | Staff section says data went to SEOA; duplicated StudentIdentificationCode sentence; wrong anchor; invalid JSON; "EdFi API 5.x" | 2d2-33, 2d2-34, 2a1-019 |
| Q-25 | `v6/mr/finance-domain/best-practices.md`; `readme.md`; `overview.md` | "With the Data Standard v4.0-a release"; nonexistent "Account entity"; `ChartOfAccount` vs. `ChartOfAccounts` (SME); "CMP" vs. "CMO" | 2b7-022, 2b7-023, 2b7-026 |
| Q-26 | `v6/mr/student-academic-record-domain/best-practices.md` | Version signals are "as of Data Standard 3.2", "v3.3-b"; sample year 2019-2020 | 2b7-035 |
| Q-27 | `v6/mr/enrollment-domain/best-practices.md` | "Data Standard v6 will include the EPDM" (future tense); CrisisEvent attribute names differ from the table | 2b4-13, 2b4-11 |
| Q-28 | `v6/mr/student-attendance-domain/overview.md`; `best-practices-and-use-cases/readme.md` | `SectionAttendanceEventTaken` vs. `SectionAttendanceTakenEvent`; AttendanceEvent (a common) called an entity; Intervention attendance ownership; "CalendarDat (key)" | 2b3-03, 2b3-05, 2b3-08, 2b3-10 |
| Q-29 | `v6/mr/staff-domain/entities-references-and-descriptors.md` | `OpenStaffPositionEvent` descriptors with no entity row or diagram node; "StatEducationAgency" | 2b4-19, 2b4-24 |
| Q-30 | `v6/mr/assessment-domain/overview.md`; `model-diagrams.mdx` | Duplicated paragraph ending "can be found in the"; Assessment described as "a specific administration" on the diagrams page; `AsessmentItem`, `AssessmentIdentifer` | 2a1-003, 2b5-06, 2b5-14, 2b5-16 |
| Q-31 | `v6/mr/assessment-domain/overview.md` | Score-report mapping exists only in two images with filename alt text | 2b5-15 |
| Q-32 | `v6/mr/special-education-data-model-domain/readme.md`; `entities-references-and-descriptors.md` | "Individual Eduction Program"; two early-access notice wordings; ServiceProviderType description copied; unsourced statistics on overview | 2b3-23, 2b3-26, 2b3-29, 2b3-30 |
| Q-33 | `v6/mr/credential-domain/readme.md`; `overview.md` | Circular readme ("provides background, rationale, and provides guidance"); overview names 2 of 5 entities; references a nonexistent "Professional Development domain" | 2b4-14, 2b4-15, 2b7-004 |
| Q-34 | `v6/mr/teaching-and-learning-domain/readme.md`; `best-practices.md` | "student enrollment" (school enrollment is the Enrollment domain); v5.2 image; five typos; copy-pasted Location lead-in | 2b2-29, 2b2-16, 2b2-18 |
| Q-35 | `dataStandard_versioned_docs/version-6/readme.md` | "Unifying Modeling Language (UML)"; `target=" blank"`; "Ed-Fi Data Standard for Suite 3 v6.1.0" | 2d2-08, 2a1-022, 2d2-10 |
| Q-36 | `docs/reference/0-roadmap/supported-versions.md` | Data Standard pairing table disagrees with the ODS/API table (DS 4.0.0 on ODS/API 7.3; DS 5.x only on 7.1); "Ed-FI" | 2e-005 |
| Q-37 | `v5/mr/educator-preparation-data-model-domain/readme.md` | Opens with the Education Organization paragraph | 2c1-01, 2e-013 |
| Q-38 | `v5/mr/student-identification-and-demographics-domain/overview.md` | "Contract entity" | 2c2-16 |
| Q-39 | `v5/mr/student-program-evaluation-domain/entities-references-and-descriptors.md` | Program listed as both entity and extended reference | 2c2-23 |
| Q-40 | `dataStandard_versioned_docs/version-5/whats-new/api-changes-5.md` | H1 "5.1 to 5.2" only; POST description copied from GET | 2c2-14, 2c2-15 |
| Q-41 | `v5/mr/graduation-domain/entities-references-and-descriptors.md`; `v5/mr/finance-domain/entities-references-and-descriptors.md` | 8-cell row in a 7-column table; "ObejctDimension" | 2c1-13, 2c1-15 |
| Q-42 | `docs/partners/2-certification/available-certifications/sis-v4/readme.md` | "Status: Active" for an out-of-support DS; "aligned with Data Standard v3.0" | 2e-015 |

#### Low (typos and formatting)

Low-severity typos, doubled words, and formatting are listed in
[2a1](./working/findings/2a1.md) (sections C and F),
[2a2](./working/findings/2a2.md), and the Q1 rows of each 2b file. Examples:
"acceptances acceptances" (Graduation overview, v5 and v6),
"specific specific" ×6 (`api-changes-6.md`), "decription", "batter parts",
H2-to-H4 heading skips, and "Qualtrex". Synthesis found one more:
"AlternativeAndSupplementalSupplementalServices Domain" in
`dataStandard_versioned_docs/version-6/whats-new/api-changes-6.md`. A
one-time `npm run lint:fix` on the v5 Teaching and Learning best-practices
page clears 131 markdownlint issues (2a2-032). The CLAUDE.md rule "bullets:
dashes" conflicts with the actual style (2,127 `*` bullet lines in v6, 1,292
in v5) and with `ul-style: consistent`. The team should decide which wins
before any bulk change (2a1-024, 2a2-033).

## Proposed Domain Page Template

The template keeps the four existing URLs per domain (readme, overview,
model-diagrams, entities-references-and-descriptors), plus best practices
where it exists. Keeping the URLs avoids redirect churn and broken anchors.
A later option is to merge the readme into the overview, which would remove
26 thin pages but needs 26 redirects.

### Readme (Domain Landing)

1. H1: `<Domain> Domain` (one canonical name, matching the slug).
2. Opening paragraph (2 to 3 sentences): what the domain records, in learner
   words; who writes and reads it; what it does _not_ cover and where that
   lives.
3. Status line: "Part of Ed-Fi Data Standard v6.1. New in v6.0" or "Unchanged
   since vN" or "Early access", with a link to the matching What's New section.
4. "Pages in this domain": one line per page saying what it answers.
5. "Related domains": 2 to 4 links, each with a reason ("Class periods are in
   the Bell Schedule domain").
6. No "Go back" line.

### Overview

1. Front matter: `description:` (120 to 160 characters, domain and version).
2. Opening paragraph naming the domain and Ed-Fi Data Standard version, the
   real-world problem, and the audience.
3. "In everyday terms": learner synonyms mapped to entity names.
4. `:::note Changes in this version` block (or "No changes in v6.0 or v6.1"),
   linked to What's New.
5. `## <Domain> Key Entities`: **every** entity the domain owns, one
   plain-language sentence each; then "Referenced from other domains", with
   links.
6. `## <Domain> Key Concepts`: domain-prefixed headings, with an example for
   each abstract statement.
7. `## Common <Domain> Scenarios`: a "How do I record ...?" table mapping
   real situations to entities and elements (the Student Attendance and
   Assessment Registration use-case tables are the models).
8. "X vs. Y" disambiguation where learners confuse paired concepts (Program
   vs. StudentProgramAssociation, Cohort vs. Section vs. Program).
9. Related domains and next steps.

### Model Diagrams

1. One-sentence intro naming the domain and version, plus how to read the
   notation (link UML Notation and Conventions).
2. Under each diagram: "Entities and relationships in this diagram", a
   bulleted list in words derived from the `.mmd` file.
3. Download link text: "Download the detailed diagram (Mermaid `.mmd` text
   file)".

### Entities, References, and Descriptors

1. Lead-in: what a row in each of the three tables means; one sentence each
   for entity, extended reference, and descriptor (link the glossary).
2. Column legend before the descriptor table (move the Usage Classification
   tip up); drop columns that are empty for the whole page.
3. `## <Domain> Entities`: owned entities only.
4. `## <Domain> Extended References`: entities owned elsewhere, each linked to
   its owning domain.
5. `## <Domain> Descriptors`: descriptors on owned entities, grouped by owning
   entity (the v5 design).
6. `<details><summary>Descriptors on referenced entities</summary>`: inherited
   rows, or a link to the owning domain instead.

### Before and After Example: Bell Schedule Overview

Bell Schedule is a small v6 domain with typical issues: no opening paragraph,
an A/B schedule answer that exists only in the diagram, an image-only
example, an entities page that lists other domains' entities, and an overview
byte-identical to v3, v4, and v5.

#### Before (current source, abridged)

`dataStandard_versioned_docs/version-6/model-reference/bell-schedule-domain/overview.md`.
Built meta description: "Key Entities". `sim_v6_v3` = `sim_v6_v4` =
`sim_v6_v5` = 1.0.

```markdown
# Bell Schedule Domain - Overview

## Key Entities

This domain contains:

* A BellSchedule entity, which defines the meeting times and dates for each
    logical class period.
* A ClassPeriod entity, which allows Sections and Bell Schedules to change
    independently.
* A Section entity, which is related to a ClassPeriod entity that represents
    the basic unit for scheduling a section.

## Key Concepts

The key concepts include the following:

* The model accommodates a wide variety of bell schedules, including block
    schedules.
...

## Key Entity Connections

![Bell-Schedule-Data-Diagram](https://edfidocs.blob.core.windows.net/...)
```

#### After (illustrative draft, needs SME review)

This draft is AI-generated for illustration only. Items marked `[SME]` need
confirmation by the Data Standard team before publication. Element names come
from `BellSchedule.mmd`.

```markdown
---
sidebar_position: 1
description: "Bell Schedule domain in Ed-Fi Data Standard v6.1: how BellSchedule and ClassPeriod record class period times, block schedules, and late-start days."
---

# Bell Schedule Domain - Overview

In Ed-Fi Data Standard v6.1, the Bell Schedule domain records when classes
meet at a school: the named class periods (such as "Period 1" or "Block A"),
their start and end times, and the dates each schedule applies to. Student
information system (SIS) vendors usually write this data, and state and
local education agencies use it for instructional-time reporting. School
calendars (which days are instructional days) are in the
[School Calendar domain](../school-calendar-domain/readme.md).

In everyday terms: a "bell schedule" or "bell times" is a BellSchedule, a
"period" or "block" is a ClassPeriod, and a "class" is a Section.

:::note Changes in this version

No changes to BellSchedule or ClassPeriod in Ed-Fi Data Standard v6.0 or
v6.1. [SME] Changes to the referenced School entity are listed in
[API Changes from v6.0 to v6.1](../../whats-new/api-changes-61.md).

:::

## Bell Schedule Key Entities

- **BellSchedule**: one named schedule for one School (for example, "Regular
  Day" or "Late Start Wednesday"). It lists the ClassPeriods it includes and,
  optionally, the dates it applies to, its start and end times, the grade
  levels it applies to, and its total instructional time.
- **ClassPeriod**: one named period at one School (for example, "Block A"),
  with its meeting times. A Section is scheduled into one or more
  ClassPeriods, so a school can change its bell times without changing its
  sections.

Referenced from other domains: Section
([Teaching and Learning](../teaching-and-learning-domain/readme.md)), School
and EducationOrganization
([Education Organization](../education-organization-domain/readme.md)), and
Session ([School Calendar](../school-calendar-domain/readme.md)).

## Bell Schedule Key Concepts

- A BellSchedule connects to a Section through a ClassPeriod. For example,
  Section "Algebra I-01" is assigned to ClassPeriod "Block A", and the
  BellSchedule says Block A meets from 8:00 to 9:30 on the dates it applies
  to.
- A school can have several bell schedules at once, for example a different
  schedule for each grade band (use GradeLevel on BellSchedule).
- A fully specified bell schedule lists every date its class periods meet in
  the school year (the Date element).

## Common Bell Schedule Scenarios

| Situation | How to record it |
| --- | --- |
| A late-start or testing day | Define a second BellSchedule and list that day in its Date element. |
| An A/B block schedule | [SME] One BellSchedule per rotation day, with AlternateDayName set to "A" or "B" and the dates for each. |
| Different times for different grades | Separate BellSchedules, each with its GradeLevel values. |
| Instructional time for state reporting | TotalInstructionalTime on BellSchedule. [SME: confirm the unit, for example minutes] |
| The schedule changes mid-year | [SME: guidance needed; no page covers this today] |

## Related Domains

- [School Calendar](../school-calendar-domain/readme.md): which dates are
  instructional days, sessions, and grading periods.
- [Teaching and Learning](../teaching-and-learning-domain/readme.md): the
  Section that is scheduled into a ClassPeriod.
- [Student Attendance](../student-attendance-domain/readme.md): section
  attendance recorded against those class periods.
```

The matching diagrams-page addition (from `BellSchedule-simple.mmd`):

```markdown
### Entities and relationships in this diagram

- Each BellSchedule belongs to one School; a School can have many.
- Each BellSchedule includes one or more ClassPeriods.
- Each ClassPeriod belongs to one School.
- A Section can be scheduled into zero or more ClassPeriods.
- Each Session belongs to one School.
- A School is a kind of EducationOrganization.
```

The matching entities-page change: `## Bell Schedule Entities` lists
BellSchedule and ClassPeriod only. `## Bell Schedule Extended References`
lists School, Section, Session, and EducationOrganization, each linked to its
owning domain. `## Bell Schedule Descriptors` shows only `GradeLevel`
(on BellSchedule), and the other 30 rows move into a collapsed `<details>`
block or are replaced by links. This matches the v5 page, which already lists
one descriptor.

## Version Plan for v3, v4, and v5

Based on [2e](./working/findings/2e.md), with the corrections above. The
retirement decision belongs to the Data Standard and Ed-Fi ODS/API product
owners, together with the certification team. This report recommends; it does
not decide.

### Status Today (2026-10-10)

| DS version | Stated support (`supported-versions.md`) | Status | Paired software | Certifications |
| --- | --- | --- | --- | --- |
| 3.3.1 | Through 2024-2025 | Out of support (about 2025-06-30) | ODS/API 5.3 and 5.4 (out of support) | Suite 3 certifications no longer issued since December 2024 |
| 4.0.0 | Through 2025-2026 | Out of support (about 2026-06-30) | ODS/API 6.2 and 7.1 (ended), 7.2 (inactive), **7.3 (active through 2028-2029)**; the Ed-Fi Alliance OneRoster offering | SIS v4 and Domain API v4 "Status: Active"; last SIS v4 listing valid to 2027-06-05; Domain API v4 to 2026-10-14 |
| 5.x | Through 2027-2028 | Supported | ODS/API 7.1 to 7.3; Ed-Fi API 8.0 and 8.1 | SIS, Assessment, and Domain API v5 current |
| 6.x | Through 2029-2030 | Current (6.1.0 released May 7, 2026) | ODS/API 7.3; Ed-Fi API 8.0 and 8.1 | None yet |

### Recommendation per Version

| Version | Now | Later | Rationale |
| --- | --- | --- | --- |
| v3 | **Retire**: remove from the build, add redirects, tag the repo (`ds3-docs-final`), link the v3.3 Handbook from a "Retired versions" section | — | Out of support; no certifications; 4 inbound links; Handbook and GitHub releases keep the normative detail |
| v4 | `noIndex: true`, `banner: 'unmaintained'`, `className: 'unmaintained'`, dropdown "4 (Unsupported)"; add a note that the v4 entity tables match DS 5 | **Retire on 2027-07-01** (after the last SIS v4 listing, 2027-06-05, and the 2026-2027 school year), or sooner if the owners agree that DS 4.0 on ODS/API 7.3 is "runs, but not documented here" | Out of support; contains DS 5 content; no certification page links into it; ODS/API 7.3 and OneRoster still reference DS 4.0 |
| v5 | Keep. Add a top-of-page support banner ("supported through 2027-2028; v6 is current"); add version-labeled titles; set `rel=canonical` to v6 on the 49 pages ≥ 0.98 similar (allowlist from `version-diff.csv`); keep entities and What's New pages self-canonical | `noIndex` no earlier than the start of its final supported year (2e proposes about 2027-08), and only after v5 certifications stop being issued; retire after 2028-06-30 | Supported and certified; the largest retrieval competitor (54 of 75 twin cases) |
| v6 | Version-labeled titles; "Looking for a retired version?" note on the v6 landing and Model Reference pages | — | Readers redirected from v3 and v4 land on different entity tables |

Decision point: `noIndex` on v5 during its last supported year would make DS 5
questions unanswerable in Perplexity while v5 is still supported. The owners
should weigh that against retrieval gains. The canonical-to-v6 step captures
most of the gain without hiding v5 entity tables.

### Implementation Notes (Docusaurus 3.10.2 on GitHub Pages)

- Per-version `noIndex: true` emits `<meta name="robots" content="noindex,
  nofollow">` and drops those routes from the sitemap. Google and Bing honor
  it. PerplexityBot documents compliance with `robots.txt` but not with meta
  robots, so spot-check Perplexity 4 to 8 weeks after deployment.
- GitHub Pages has no server-side 301 redirects.
  `@docusaurus/plugin-client-redirects` writes meta-refresh stubs, and only
  where the `from` path does not exist. Remove the version first, then add
  redirects.
- The broken-link checker does not accept redirect stubs, so update the 11
  build-checked inbound links to `/3` and `/4` first. These are in
  `VersionDropDown`, `data-standards.md`, `1-data-exchange/readme.md`,
  `migration-utility.md`, the ODS/API 5.4 bulk-load how-to, and ODS/API 6.2
  pages. The 4 absolute links in ODS/API 7.1 are not build-checked.
- Do not `Disallow` redirected paths in `robots.txt`, because crawlers would
  never see the redirect.
- Canonical tags: add them through the existing `DocItem` wrapper with an
  allowlist or a front matter flag. Verify that each built page has exactly
  one canonical.
- Consider `contextualSearch: true` for Algolia after the titles carry
  versions.

### Redirect Mapping Rule

Add to `createRedirects(existingPath)` in `docusaurus.config.js` (from 2e).
It maps `/3/<path>` (and later `/4/<path>`) to the same v6 path wherever v6
has the same slug:

```js
const DS = '/reference/data-exchange/data-standard';
const RETIRED_DS = ['3']; // add '4' at v4 retirement
// v6 is the unversioned route; skip versioned (/5/...) paths and the root.
if (
  existingPath.startsWith(`${DS}/`) &&
  existingPath !== `${DS}/` &&
  !/^\/reference\/data-exchange\/data-standard\/\d+(\/|$)/.test(existingPath)
) {
  return RETIRED_DS.map((v) => existingPath.replace(`${DS}/`, `${DS}/${v}/`));
}
```

Explicit exceptions:

| From | To | Reason |
| --- | --- | --- |
| `/3` and later `/4` (version roots) | `/reference/data-exchange/data-standards` | Status page explains the retirement |
| `/3/handbook`, `/4/handbook` | `/reference/data-exchange/data-standards` (retired-versions section) | The rule would send readers to the v6 Handbook |
| `/3/whats-new/*`, `/4/whats-new/*` | `/reference/data-exchange/data-standards` | No v6 equivalent; update the ODS/API 6.2 link to `whats-new-v40` |
| `/3/model-reference/educator-preparation-data-model-domain/*` | `/model-reference/educator-preparation-program-domain/*` | Domain renamed in v6 |
| `/4/model-reference/educator-preparation-data-model-domain/student-path` | `/model-reference/path-domain` | Became the Path domain |

Verify after the build: no broken links or redirect collisions; a stub exists
for each of the 88 v3 URLs; `sitemap.xml` has no `/data-standard/3/` URLs (or
`/4/` after `noIndex`); v4 pages contain `noindex, nofollow`.

### Certification and Ed-Fi ODS/API Pairing Impacts

- The certification registry links to
  `/reference/data-exchange/data-standards/#version-3x`. Keep that anchor when
  rewriting `data-standards.md`; `onBrokenAnchors` only warns.
- SIS v4 and Domain API v4 certification pages say "Status: Active". The
  certification team should set a sunset status and fix "aligned with Data
  Standard v3.0" (2e-015).
- `supported-versions.md` must become the single source of truth for pairings,
  including an explicit statement on DS 4.0 with ODS/API 7.3 (2e-005).
- ODS/API 6.2 and 7.1 docs are still configured `className: 'active'`. Raise
  this with the ODS/API documentation owners so both retirements happen
  together (2e-016, outside scope).

### Sequencing

1. Decide and communicate: owners agree on the DS 4.0 story; the
   certification team sets the v4 sunset; publish a roadmap notification.
2. Correct status text (WI-01). This step is small and carries no structural
   risk.
3. v4 `noIndex` and banner; v3 banner text (WI-03).
4. Version-labeled titles for all versions (WI-06).
5. Retire v3: update links, remove the version, add redirects, build (WI-04).
6. v5 canonicals and banner (WI-05).
7. Re-run the retrieval simulation and the 2f judgment; spot-check Perplexity.
8. Retire v4 on 2027-07-01 (add `'4'` to `RETIRED_DS`).
9. v5: `noIndex` and retirement per the owners' decision (no earlier than
   its final supported year).

## Per-Domain Scorecard

Page scores are rubric-weighted means (0 to 3) from the 2b files, in the
order readme / overview / diagrams / entities / best practices; "–" means the
page does not exist. 2b1 and 2b5 scores were computed during synthesis from
their criterion tables. R1 is the diagrams-page text-equivalent score and T3
the entities-page duplication score. "Content" answerability is the 2b
judgment from domain pages (8 questions each: full/partial/none). "Retrieval
yes" is the number of the 8 questions that the 2f top-3 results answer fully.

| Domain | Page scores | Mean | R1 | T3 | Content F/P/N | Retrieval yes | Top issue | v5 delta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Alternative and Supplemental Services | 1.9 / 1.5 / 1.3 / 1.3 / 1.3 | 1.46 | 1 | 0 | 5/3/0 | 1 | Corrupted key names and stale attributes in best practices; 44 of 77 descriptors inherited | v5 readme lacks the best-practices link; v5 descriptors owner-first |
| Assessment | 1.9 / 1.1 / 1.6 / 1.6 / 1.4 | 1.52 | 2 | 1 | 8/0/0 | 3 | Invalid JSON in best practices; score-report mapping only in images | v5 diagrams have 650 words of prose (keep as model) |
| Assessment Registration | 1.7 / 1.5 / 1.5 / 1.4 / 1.4 | 1.50 | 1 | 0 | 5/3/0 | 5 | Best practices still describe the v5 SEOA model | Added in v5.2; no page says so |
| Bell Schedule | 1.9 / 1.6 / 1.6 / 1.4 / – | 1.62 | 0 | 0 | 5/2/1 | 4 | Entities page lists other domains' entities; A/B answer only in `.mmd` | v5 table has 1 descriptor (cleaner) |
| Credential | 1.4 / 1.3 / 1.4 / 1.7 / – | 1.45 | 0 | 3 | 1/7/0 | 3 | Boilerplate readme; overview names 2 of 5 entities; "new in v6.0" not stated | New in v6 (EPDM extension in v5) |
| Discipline | 1.9 / 1.4 / 1.4 / 1.5 / 1.3 | 1.50 | 0 | 0 | 5/3/0 | 2 | Best practices written for v3.3-a; overview contradicts diagram | Overview and best practices identical across v3 to v6 |
| Education Organization | 2.0 / 1.1 / 1.4 / 1.7 / – | 1.55 | 0 | 3 | 5/3/0 | 1 | "Parent" in v6; contradictory hierarchy statement; no best practices | Same "Parent" text; v5 overview lists fewer entities |
| Educator Preparation Program | 1.6 / 1.2 / 1.2 / 1.5 / – | 1.38 | 0 | 2 | 4/3/1 | 1 | Three name variants; FieldworkExperience mis-described; no link to What's New | v5 "EPDM" readme copies Education Organization text; "TPDM" headings |
| Enrollment | 1.8 / 1.4 / 1.4 / 1.4 / 1.5 | 1.50 | 0 | 1 | 6/2/0 | 3 | Overview contradicts table on SEOA; omits CrisisEvent and StudentTransportation | v6.1 changes are legitimate; v5 has no pointer |
| Finance | 1.6 / 1.3 / 1.4 / 1.5 / 1.4 | 1.44 | 0 | 0 | 5/3/0 | 6 | Best practices framed as v4.0-a; entity name variants; acronyms unexpanded | "ObejctDimension" typo |
| Graduation | 1.9 / 1.5 / 1.3 / 1.3 / – | 1.50 | 0 | 0 | 4/3/1 | 4 | Required assessments and certifications only in `.mmd`; 42 of 51 descriptors inherited | v5 table 16 rows (vs. 65); malformed row |
| Intervention | 1.8 / 1.4 / 1.3 / 1.6 / – | 1.52 | 0 | 0 | 5/2/1 | 3 | No Intervention vs. Program guidance; identical to v3 to v5 | Identical |
| Path | 1.6 / 1.3 / 1.3 / 1.6 / – | 1.45 | 0 | 3 | 4/4/0 | 4 | Scope unstated (educators or any student); non-model names | v5 `student-path` EPDM page (typos) |
| Performance Evaluation | 1.8 / 1.4 / 1.3 / 1.8 / – | 1.58 | 0 | 3 | 5/3/0 | 4 | Overview lists 4 of 13 entities; no "new in v6.0" | New in v6 |
| Recruiting and Staffing | 1.4 / 0.9 / 1.3 / 1.4 / – | 1.25 | 0 | 1 | 1/5/2 | 3 | "Coming Soon" overview; three domain names | New in v6 |
| School Calendar | 2.0 / 1.5 / 1.5 / 1.4 / 1.9 | 1.66 | 0 | 0 | 6/1/1 | 4 | "CalendarEvent entity"; readme contradicts overview on calendar ownership | v5 table 6 rows (vs. 38) |
| Special Education Data Model | 1.9 / 1.9 / 1.6 / 1.6 / – | 1.75 | 0 | 3 | 7/1/0 | 7 | Typos; two early-access wordings; no worked example | New in v6.1 (early access) |
| Staff | 1.8 / 1.7 / 1.4 / 1.4 / – | 1.58 | 0 | 1 | 4/4/0 | 1 | No "teacher at two schools" scenario; `OpenStaffPositionEvent` orphan | v5 has three associations; no v6 pointer |
| Student Academic Record | 1.8 / 1.6 / 1.5 / 1.4 / 1.6 | 1.58 | 2 | 1 | 6/2/0 | 5 | GPA, honors, and awards only in `.mmd`; version signals say 3.2 | Best practices identical; v5 table 24 rows (vs. 70) |
| Student Attendance | 1.8 / 1.2 / 1.2 / 1.4 / 1.5 | 1.43 | 0 | 0 | 6/2/0 | 2 | Entity misspelled; 1 of 39 descriptors owned; 3,859-word best-practices page | Identical text; v5 table 7 rows |
| Student Cohort | 1.7 / 1.7 / 1.4 / 1.5 / – | 1.58 | 0 | 0 | 4/3/1 | 2 | No Cohort vs. Section vs. Program guidance; no links | Identical; v5 table 4 rows |
| Student Health | 1.9 / 1.8 / 1.6 / 1.3 / 1.7 | 1.66 | 2 | 0 | 4/4/0 | 6 | StudentHealth described as discipline; immunization fields only in image and `.mmd` | v5 diagrams page has modelling prose v6 lost |
| Student Identification and Demographics | 1.5 / 1.4 / 1.3 / 1.5 / 1.4 | 1.42 | 0 | 2 | 5/3/0 | 4 | Best practices describe the v5 SEOA design; FinancialAid ownership | v5 "Contract entity" typo |
| Student Program Evaluation | 2.0 / 1.6 / 1.9 / 1.5 / 1.6 | 1.72 | 2 | 2 | 4/3/1 | 4 | Central entity missing from the table; copy-paste "enrollment information" | v5 lists Program as entity and reference |
| Survey | 1.6 / 1.1 / 1.2 / 1.5 / – | 1.35 | 0 | 1 | 3/4/1 | 4 | "Assessment domain" diagram text; "Parent"; 7 of 13 entities missing from overview | Same "Assessment domain" text; v5 table 4 rows |
| Teaching and Learning | 1.8 / 1.6 / 1.6 / 1.4 / 1.6 | 1.60 | 2 | 0 | 7/1/0 | 4 | Best practices typos and v5.2 image; 53 of 77 descriptors inherited | v5 diagrams have good prose; v5 table 28 rows |
| **All 26** | | **1.52** | | | **124/74/10** | **90 of 208** | | |

Observations:

- Every domain falls between 1.25 and 1.75. The template issues (M2 = 0, V3 =
  0, H1 = 0 on overviews, R1 = 0 on diagrams) cap all domains in the same
  band, so domain-level differences come from content quality.
- Content beats retrieval. Alternative and Supplemental Services, Education
  Organization, Staff, and Educator Preparation Program answer 4 to 5 of 8
  questions fully from their pages, yet retrieval answers only 1. Version
  twins and missing learner vocabulary explain the gap.
- Strongest patterns to copy: the Special Education Data Model early-access
  admonition and its comparison table, the Student Attendance and Assessment
  Registration use-case tables, and the Teaching and Learning diagram prose.

## Retrieval Results

### Baseline (Combined 2f1 and 2f2, 251 Questions)

| Verdict | Count | Share |
| --- | --- | --- |
| Yes (top-3 page fully answers) | 102 | 41% |
| Partial | 67 | 27% |
| No | 82 | 33% |

| Miss cause (partial + no) | Partial | No | Total |
| --- | --- | --- | --- |
| Wrong version (older twin outranks v6) | 34 | 5 | 39 |
| Non-Data-Standard page outranks (certification scenarios, playbooks, ODS/API, blog) | 8 | 20 | 28 |
| Answer absent | 6 | 18 | 24 |
| Vocabulary mismatch | 0 | 23 | 23 |
| Answer only in a table row | 9 | 5 | 14 |
| Ranking noise | 9 | 3 | 12 |
| Wrong domain | 1 | 8 | 9 |
| Diagram only | 0 | 0 | 0 |
| **Total** | **67** | **82** | **149** |

BM25 metrics on the same questions: hit@1 25%, hit@3 42%; top-1 version is
v6 for 101 questions, v5 33, v3 19, v4 11, and a non-Data-Standard page 87.
Conceptual questions are the weakest group (9 yes, 5 partial, 18 no out of
32).

### Directional "After" Estimate

Re-run during synthesis with `scripts/retrieval.py`'s BM25 settings over
`working/corpus.jsonl`, removing documents to simulate retirement, `noIndex`,
or canonicalization (code in the appendix). It reproduces the 2e figures.

| Scenario | Docs | hit@1 | hit@3 | Older version at rank 1 | Older version in top 3 |
| --- | --- | --- | --- | --- | --- |
| Current | 1,754 | 25.5% | 41.8% | 25.1% | 69.3% |
| Without v3 | 1,675 | 27.5% | 47.0% | 21.9% | 68.1% |
| Without v3, v4 | 1,592 | 29.1% | 51.0% | 19.1% | 66.5% |
| Without v3, v4, and 49 v5 near-duplicates (≥ 0.98) | 1,543 | 29.1% | 52.2% | 17.9% | 45.0% |
| Without v3, v4, v5 (upper bound) | 1,492 | 35.9% | 56.2% | 0% | 0% |
| Current + version in every Data Standard `<title>` | 1,754 | 24.7% | 41.8% | 24.7% | 68.5% |

Reading the results:

- The recommended version plan (v3 and v4 removed, v5 near-duplicates
  canonicalized) moves the expected page into the top 3 for **25 more
  questions** and none fewer. Of the 2f misses, these 25 were labeled wrong
  version (14), ranking noise (5), wrong domain (3), and table only (3).
- v5 remains a competitor through its entities tables (61 top-3 slots after
  canonicalization) and What's New pages. This competition ends only when v5
  is hidden or retired.
- Version-labeled titles do not change BM25 results, because learners rarely
  type a version number. Their value is for the answer engine and the human
  reader: every retrieved title and passage names its version, so an LLM can
  prefer and cite v6. This effect cannot be simulated here.
- Content fixes are not simulated. They map to the remaining miss causes:
  - "In everyday terms" lines: vocabulary mismatch (23).
  - Glossary, domain map, and gap content: answer absent (24).
  - Overview prose for table-only facts: table only (14).
  - Lead sentences on Data Standard pages, plus links from certification and
    playbook pages: non-Data-Standard page (28).

| Stage | Fully answered (directional) | Basis |
| --- | --- | --- |
| Baseline | 102 (41%) | 2f judgment |
| After the version plan | up to about 127 (51%) | Simulation (+25 into top 3; assumes they become full answers) |
| After the version plan and Top 10 content fixes | about 150 to 175 (60% to 70%) | Judgment: about half to three-quarters of the 70 vocabulary, absent, table-only, and wrong-domain misses, plus a few non-Data-Standard misses |

These figures are directional. Validate them by piloting the template on two
or three domains, re-running `retrieval.py` and the 2f judgment, and
spot-checking 10 to 20 questions in live Perplexity before and after.

## Terminology Appendix

### Sources and Method

- Pre-pass: `scripts/terminology.py` over v5, v6, and UDM pages wrote
  `working/terminology-hits.csv`. The file was regenerated after
  classification to fix line numbers and line-wrapped names. It now has 519
  hits: 258 accepted, 240 unlisted, 13 bare, and 8 avoid-list.
- Classification: [2aT1](./working/findings/2aT1.csv) (v6 and UDM, 127 rows)
  and [2aT2](./working/findings/2aT2.csv) (v5, 140 rows) labeled every
  non-accepted hit in context. They worked from the earlier pre-pass but
  relocated each hit to its real file line, so their labels stand. The 15
  "unsure" rows were all resolved as violations in
  [2aT-unsure.md](./working/findings/2aT-unsure.md).
- Result: 234 violations and 33 acceptable uses. Acceptable uses are proper
  names of artifacts and line-wrapped accepted names.

### Violations by Rule

| Rule family | v6 | UDM | v5 | Total |
| --- | --- | --- | --- | --- |
| "Ed-Fi" + other unlisted noun (security model, descriptors, XML schemas, governance, system, specification) | 17 | 12 | 28 | 57 |
| "Ed-Fi data model", "Ed-Fi model", "Ed-Fi core model" | 18 | 2 | 29 | 49 |
| Bare "Ed-Fi" as subject, location, or possessive ("In Ed-Fi", "Ed-Fi has", "set by Ed-Fi") | 11 | 0 | 17 | 28 |
| Lowercase "Ed-Fi community" | 2 | 3 | 22 | 27 |
| "Ed-Fi" + domain(s) ("Ed-Fi domains", "the Ed-Fi Student Health domain") | 7 | 1 | 8 | 16 |
| Table headers ("Ed-Fi Entity", "Ed-Fi Element", "Ed-Fi Domains Needed") | 7 | 0 | 7 | 14 |
| Avoid list or near-miss ("Ed-Fi Standards", "Ed-Fi data exchange standards", "Ed-Fi technology team", "Ed-Fi Summit", "Ed-Fi Technical Congress") | 1 | 8 | 3 | 12 |
| Template sentence "Required attributes in Ed-Fi are hard constraints" | 6 | 0 | 6 | 12 |
| Heading "Ed-Fi Prerequisites for Writing ... Domain Entities" | 4 | 0 | 4 | 8 |
| "Ed-Fi data standard" (casing) | 2 | 2 | 3 | 7 |
| Platform name variants ("Ed-Fi API/ODS", "Ed-Fi REST API Specifications", "EdFi API") | 2 | 0 | 1 | 3 |
| Wrong name ("Ed-Fi Unified Data Model") | 0 | 1 | 0 | 1 |
| **Total** | **77** | **29** | **128** | **234** |

Rule families were assigned by pattern-matching the classified phrases during
synthesis. A few rows could fit two families, so treat per-family counts as
approximate; the total is exact.

### Violations by Page (Top 17 of 55)

| Violations | Page |
| --- | --- |
| 27 | `dataStandard_versioned_docs/version-5/whats-new/whats-new-v50.md` |
| 14 | `dataStandard_versioned_docs/version-5/whats-new/whats-new-v51.md` |
| 13 | `dataStandard_versioned_docs/version-5/whats-new/whats-new-v52.md` |
| 11 | `dataStandard_versioned_docs/version-6/model-reference/enrollment-domain/best-practices.md` |
| 11 | `dataStandard_versioned_docs/version-5/model-reference/enrollment-domain/best-practices.md` |
| 7 | `dataStandard_versioned_docs/version-6/model-reference/alternative-and-supplemental-services-domain/best-practices.md` |
| 7 | `dataStandard_versioned_docs/version-5/model-reference/alternative-and-supplemental-services-domain/best-practices.md` |
| 7 | `dataStandard_versioned_docs/version-6/model-reference/student-academic-record-domain/best-practices.md` |
| 7 | `dataStandard_versioned_docs/version-5/model-reference/student-academic-record-domain/best-practices.md` |
| 7 | `docs/reference/1-data-exchange/udm/reporting-issues-and-making-suggestions.md` |
| 7 | `docs/reference/1-data-exchange/udm/uml-notation-and-conventions.md` |
| 6 | `docs/reference/1-data-exchange/udm/governance.md` |
| 5 each | `dataStandard_versioned_docs/version-6/model-reference/assessment-domain/overview.md` and its v5 copy |
| 5 each | `dataStandard_versioned_docs/version-6/model-reference/education-organization-domain/overview.md` and its v5 copy |
| 5 each | `dataStandard_versioned_docs/version-6/model-reference/student-attendance-domain/best-practices-and-use-cases/readme.md` and its v5 copy |
| 4 | `dataStandard_versioned_docs/version-6/model-reference/student-attendance-domain/overview.md` |
| 4 | `dataStandard_versioned_docs/version-6/model-reference/student-program-evaluation-domain/best-practices.md` |

The full per-row list, with line numbers and suggested replacements, is in
the two CSVs. Of the 128 v5 violations, 68 sit on lines identical to v6, so
one edit pattern fixes both versions.

### Replacement Table for a Find-and-Review Pass

The two classification agents sometimes proposed different replacements for
the same pattern (for example "Ed-Fi Data Standard domains" vs. "Ed-Fi UDM
domains"). The house rules below resolve those differences: model concepts use
the Ed-Fi Unifying Data Model (UDM); normative content uses the Ed-Fi Data
Standard; the platform is the Ed-Fi ODS/API; the organization is the Ed-Fi
Alliance. Review each hit in context; do not apply blindly.

| Find (regex-style) | Replace with | Notes |
| --- | --- | --- |
| `Ed-Fi data model`, `Ed-Fi Data Model`, `Ed-Fi model` | First use on page: `Ed-Fi Unifying Data Model (UDM)`; later: `the UDM` | Includes the Handbook pages ("every entity and element in the ...") |
| `Ed-Fi core model`, `aka Ed-Fi core model` | `Ed-Fi Unifying Data Model (UDM)`; drop the alias | v5 and v6 What's New indexes |
| `Required attributes in Ed-Fi are hard constraints` | `Required attributes in the Ed-Fi Data Standard are hard constraints` | 6 pages per version |
| `## Ed-Fi Prerequisites for Writing <X> Domain Entities` | `## Prerequisites for Writing <X> Domain Entities` | Check inbound anchors first |
| `Ed-Fi Entity`, `Ed-Fi Element`, `Ed-Fi Entities` (table headers) | `Entity`, `Element`, `Entities` | |
| `Ed-Fi Domain and Entity needed`, `Ed-Fi Domains Needed` | `Domain and entity needed`, `Domains needed` | |
| `Ed-Fi domains` | `Ed-Fi Data Standard domains` (first use) or `domains` | |
| `the Ed-Fi <Name> domain` | `the <Name> domain of the Ed-Fi Data Standard` (first use) or `the <Name> domain` | Pending the ruling below |
| `In Ed-Fi,` / `in Ed-Fi` (model facts) | `In the Ed-Fi Data Standard,` | |
| `Ed-Fi has`, `Ed-Fi defined`, `set by Ed-Fi` (organization actions) | `The Ed-Fi Alliance has`, `defined by the Ed-Fi Alliance` | |
| `Ed-Fi community` (lowercase, prose) | `Ed-Fi Community` | Site-wide: 95 hits in 57 files; skip quoted titles and URLs |
| `Ed-Fi data standard` | `Ed-Fi Data Standard` | |
| `Ed-Fi Standards`, `Ed-Fi data exchange standards`, `Ed-Fi data standards` | `the Ed-Fi Data Standard` and, where APIs are meant, `the Ed-Fi API Specification` | Avoid list |
| `Ed-Fi Resources API`, `Ed-Fi REST API Specifications` | `the Ed-Fi API Specification` | |
| `Ed-Fi API/ODS`, `Ed-Fi ODS / API`, `EdFi API`, `Ed Fi` | `Ed-Fi ODS/API` (platform) or `Ed-Fi API` (API-specific pages only) | |
| `Ed-Fi security model` | `the Ed-Fi ODS/API security model` | Security is a platform concern; writer to confirm |
| `Ed-Fi extension mechanism` | `the Ed-Fi Data Standard extension framework` | |
| `Ed-Fi assessment specification`, `Ed-Fi Assessment model` | `the Assessment domain of the Ed-Fi Data Standard` | |
| `Ed-Fi StudentUniqueID`, `Ed-Fi Student` (entity) | `StudentUniqueID`, `the Student entity` | Entity names need no prefix |
| `Ed-Fi technology team` | `Ed-Fi Alliance technology team` | Avoid list |
| `Ed-Fi Summit`, `Ed-Fi Technical Congress` | `Ed-Fi Alliance Summit`, `Ed-Fi Alliance Tech Congress` | Avoid list |
| `Ed-Fi Governance`, `Ed-Fi Governance Groups` | `Ed-Fi Alliance governance`, `Ed-Fi Alliance governance groups` | |
| `Ed-Fi Unified Data Model`, `Unify Data Model` | `Ed-Fi Unifying Data Model (UDM)` | 4 files site-wide |
| `standard Ed-Fi breaking change release cycle` | `the standard breaking-change release cycle of the Ed-Fi Data Standard` | Special Education Data Model admonition |
| `deployment` (of the Data Standard) | `implementation` | v5.0 and v6.0 What's New intro sentences |
| `Ed-Fi Data Handbook` | `Ed-Fi Unifying Data Model (UDM) Handbook` | Not on the accepted list; align with the Handbook page H1 |

### Source-Guidelines Inconsistency and Rulings

- **"API Standard" vs. "API Specification".** The source guidance's Avoid
  list named "Ed-Fi API Standard", while its accepted uses list "Ed-Fi API
  Specification". For this audit, **Ed-Fi API Specification** is enforced, and
  [terminology-guidelines.md](./terminology-guidelines.md) records the
  correction. The owner of the brand guidance should fix the source document
  so that future audits do not repeat the ambiguity.
- **UDM ruling.** "Ed-Fi Unifying Data Model (UDM)" is accepted; "Ed-Fi UDM"
  is acceptable after the first full reference on a page. Pages that use
  "Ed-Fi Unifying Data Model" without "(UDM)" (the v6 Handbook page and the
  UDM readme) should add it, and `udm/readme.md` front matter `title:` should
  include "Ed-Fi".
- **Open question for the guideline owner.** Should "Ed-Fi" + domain name
  ("the Ed-Fi Assessment domain") be allowed? This report treats it as a
  violation. A ruling either way would settle about 16 hits and the domain
  template wording.

## Glossary Proposal

Refined from the [2d1 outline](./working/findings/2d1.md#glossary-outline).
There is no official glossary. This proposal covers _data model concepts_
only; brand terms stay in the terminology guidelines.

- **Page:** `docs/reference/1-data-exchange/udm/getting-started/glossary.md`,
  titled "Ed-Fi Data Model Concepts Glossary", with a `description:`. Link it
  from the UDM readme, Core Concepts (replacing its three-row table), the v6
  landing page, every v6 domain readme, and every entities-page lead-in.
- **Style:** one-line definitions in plain language, each with an example and
  a link to the authoritative page; no restated guidance. Use "Ed-Fi Data
  Standard" on first use and "the data standard" later.

### Section 1: The Standard and Its Artifacts

| Term | Draft definition | Source or status |
| --- | --- | --- |
| Ed-Fi Data Standard | The common framework that keeps education data from multiple systems consistent, compatible, and secure; K-12, student-centric, built on the UDM | Terminology guidelines; `data-standards.md` |
| Ed-Fi Unifying Data Model (UDM) | The logical model of commonly exchanged K-12 data that the Ed-Fi Data Standard is built on; describes meaning, not storage | `udm/readme.md`; needs SME wording for "non-normative" |
| Ed-Fi API Specification | Defines how education data is structured and shared through APIs under the Ed-Fi Data Standard | Terminology guidelines |
| Ed-Fi ODS/API | The Ed-Fi Alliance platform (database plus API) that implements the Ed-Fi API Specification | Terminology guidelines |
| Ed-Fi Unifying Data Model (UDM) Handbook | A searchable reference of every entity and element, with types, cardinality, and identity | `version-6/handbook.md` |
| Normative and non-normative | Normative content is a requirement (API resources, JSON); non-normative content is guidance or a logical view | `data-standards.md` |
| Extension | An agency-specific addition built with the extension framework | Needs SME |
| Early access | Model content that may change outside the normal breaking-change cycle | `versioning-and-releases.md` |

### Section 2: Model Building Blocks

| Term | Draft definition | Source or status |
| --- | --- | --- |
| Domain | A group of related entities that covers one area, such as Enrollment or Assessment; v6 has 26 | `ed-fi-domains.md` |
| Subdomain | A named part of a domain, such as Gradebook in Student Academic Record | `ed-fi-domains.md` |
| Entity | A kind of thing the model records, such as Student or School | Core Concepts |
| Attribute (element) | A property of an entity, such as BirthDate | Core Concepts |
| Association | An entity that relates other entities and can carry its own attributes, such as StudentSchoolAssociation (dates, grade level) | Core Concepts; UML Notation |
| Generalization | A specialized entity that inherits from a broader one, such as School from EducationOrganization | UML Notation |
| Common | A reusable group of attributes inside an entity, such as Address | Design Principles; needs SME |
| Identity (natural key) | The attributes that together make a record unique, such as LocalCourseCode, School, and Session for CourseOffering | Core Concepts |
| Reference | How one entity points to another by the other's identity | Needs SME |
| Extended reference | On an entities page, an entity owned by another domain that this domain's entities point to | Observed usage; needs SME |
| Descriptor | A controlled list of allowed values (a code set), such as GradeLevel | `technical-articles/descriptor-guidance.md` |
| Descriptor namespace | The URI that says who owns a descriptor value; `uri://ed-fi.org/` values are part of the Ed-Fi Data Standard | v6 landing "Default Descriptors" |
| Usage Classification and other descriptor columns | What "Orthodox", "Standard", "EDFacts Mapping", "Commonly Used", and "Commonly State-Defined" mean | `technical-articles/non-normative-descriptor-classifications.md`; to be verified |

### Section 3: How to Read the Model Reference

- "How to read an Entities, References, and Descriptors page": what a row in
  each table means, each column, and why a descriptor appears in several
  domains (it belongs to a shared entity).
- "How to read a model diagram": four sentences plus a link to UML Notation
  and Conventions; explain simple vs. detailed diagrams and the `.mmd`
  download.
- When to use the Handbook, a domain overview, or best practices.

### Section 4: Domain Map and "Where Do I Find ..."

- The 26 v6 domains grouped by theme, one line each, linking to each overview.
  Proposed groups from 2d2: Organizations and calendars; Students; Teaching
  and learning; Assessment; Staff and educator pipeline; Finance and special
  education. Host the authoritative copy on the v6 Model Reference index; the
  glossary links to it.
- A topic lookup table: bus transportation → Enrollment; course grades and
  transcripts → Student Academic Record; parent contact → Student
  Identification and Demographics; class period times → Bell Schedule;
  teacher candidates → Educator Preparation Program.

### Section 5: Versions

- Major, minor, and patch releases; breaking change; supported versions (link
  `versioning-and-releases.md` and `supported-versions.md`); the Data Standard
  vs. UDM vs. Ed-Fi ODS/API vs. Ed-Fi API Specification table (also placed on
  `data-standards.md`).

## Candidate Work Items

Sized for Jira; not created. Effort: S = under a day, M = 2 to 5 days, L =
more than a week or SME-dependent. Each item should follow the repo
conventions (branch `TRACKER-ID`, PR title `[TRACKER-ID] ...`, `npm run
build` before the PR).

### Prioritization

Impact (1 to 5) combines affected questions, affected pages, new-learner
relevance, and retrieval effect. Effort weights: S = 1, M = 2, L = 3.

| Work item | Impact | Effort | Priority | Questions affected | Pages affected |
| --- | --- | --- | --- | --- | --- |
| WI-01 Version-status text | 4 | S (1) | 4.0 | Version and orientation questions; every reader of the status pages | ~10 |
| WI-02 Factual error fixes | 4 | S–M (1.5) | 2.7 | ~25 with wrong or contradictory answers | ~40 |
| WI-03 to WI-05 Version plan | 5 | M (2) | 2.5 | +25 into top 3 (simulated) | 180 hidden or removed; 49 canonicalized |
| WI-06 and WI-07 Titles and descriptions | 4 | M (2) | 2.0 | All (snippet and citation quality) | ~420 titles; ~240 descriptions |
| WI-08 and WI-09 On-ramp | 4 | M (2) | 2.0 | 18 conceptual "none" + 11 orientation "none" | ~8 plus 1 new |
| WI-10 Change history | 3 | S–M (1.5) | 2.0 | ~15 change-history misses | ~35 |
| WI-11 Terminology pass | 2 | S (1) | 2.0 | Indirect (consistent canonical names) | 55 |
| WI-12 Domain template | 5 | L (3) | 1.7 | ~61 (vocabulary, absent, table-only) | 52 |
| WI-13 Entities pages | 3 | M (2) | 1.5 | 14 table-only; length-normalization effect | 26 (plus v5 Staff and Student Identification) |
| WI-14 Diagram text | 3 | M (2) | 1.5 | Partial-to-full on diagram-only facts | 26 v6 + 21 v5 |
| WI-15 Content gaps (SME) | 3 | L (3) | 1.0 | ~12 "none" answers | ~9 new or rewritten |
| WI-16 Style and lint decisions | 1 | M (2) | 0.5 | None | ~150 |

### Work Items

#### WI-01 Correct Data Standard version-status statements

- **Scope:** `data-standards.md`, `1-data-exchange/readme.md`,
  `supported-versions.md`, `version-5/readme.md`,
  `version-5/model-reference/readme.md`, `version-6/model-reference/readme.md`,
  `version-6/readme.md` (add "which version" guidance), `udm/readme.md`,
  `udm/udm-handbook.md`.
- **Acceptance criteria:** no page calls DS v3 or v4 active or supported;
  `supported-versions.md` is the single source for dates and pairings, and the
  other pages link to it; the v6 window agrees everywhere; v6.1 is named as
  current; "(Latest version)" labels removed from v5 and v6.0 artifacts; the
  `#version-3x` anchor still resolves.
- **Effort:** S. **Dependencies:** owner confirmation of support dates.

#### WI-02 Fix verified factual errors and naming conflicts

- **Scope:** Q-04 to Q-42 in [Quality and accuracy fixes](#quality-and-accuracy-fixes)
  (Q-01 to Q-03 are in WI-01 and WI-03); one canonical name per domain
  (Recruiting and Staffing, Educator Preparation Program, Performance
  Evaluation, Path, Credential); rename Student Health
  `entities-references-descriptors` with a redirect.
- **Acceptance criteria:** each listed item fixed or explicitly rejected with
  a reason; SME sign-off recorded for items marked SME; overview, entities
  table, and `.mmd` list the same owned entities for each touched domain;
  build passes.
- **Effort:** S per item, M overall. **Dependencies:** SME availability
  (Discipline, Recruiting and Staffing, Educator Preparation Program, Finance
  naming, Survey person-target associations).

#### WI-03 Hide DS v4 and correct version banners

- **Scope:** `docusaurus.config.js` (v4 `noIndex: true`, `banner:
  'unmaintained'`, `className: 'unmaintained'`); `VersionDropDown` labels;
  `DocVersionBanner` text for v3 and v4 ("Ed-Fi Data Standard vN ... out of
  support since ..."); a note on v4 entity pages that tables match DS 5.
- **Acceptance criteria:** built v4 pages contain `noindex, nofollow`; no
  `/data-standard/4/` URLs in `sitemap.xml`; banners name the product, the
  version, and the end of support.
- **Effort:** S. **Dependencies:** owner decision; WI-01.

#### WI-04 Retire DS v3

- **Scope:** update the build-checked inbound links; remove version 3 from
  `dataStandard_versions.json`, config, docs, and sidebars; add the redirect
  rule and exceptions; tag the repository; add "Retired versions" with the
  Handbook link.
- **Acceptance criteria:** build passes with no broken links; a redirect stub
  exists for all 88 v3 URLs; the certification registry anchor resolves.
- **Effort:** M. **Dependencies:** WI-01, owner decision, roadmap notice.

#### WI-05 Deprioritize DS v5 for answer engines

- **Scope:** a top-of-page v5 support banner (or a shared admonition);
  canonical to v6 for the 49 pages with `sim_v6_v5 >= 0.98` through the
  `DocItem` wrapper and an allowlist; v5 domain pages renamed in v6 (EPDM,
  Student Path) point to the v6 domains.
- **Acceptance criteria:** exactly one canonical per page; entities and What's
  New pages remain self-canonical; the allowlist is generated from
  `version-diff.csv` and documented; the re-run simulation shows the
  older-version top-3 share at or below 50%.
- **Effort:** M. **Dependencies:** WI-06.

#### WI-06 Version-labeled titles and pre-H1 version line

- **Scope:** wrap `@theme/DocItem/Metadata` and `DocItem/Content` for the
  `dataStandard` plugin.
- **Acceptance criteria:** every Data Standard `<title>` ends with "(Ed-Fi
  Data Standard vN)"; a visible version and domain line appears above the H1;
  sidebar labels are unchanged.
- **Effort:** S–M. **Dependencies:** none.

#### WI-07 Add `description:` front matter

- **Scope:** v6 (129 pages), v5 (109), UDM and `data-standards.md` (10).
  Start with the v6 overviews, readmes, landing pages, and What's New.
- **Acceptance criteria:** 120 to 160 characters; names the domain or topic
  and the Data Standard version; follows the terminology guidelines; no built
  meta description equals a bare heading such as "Key Entities".
- **Effort:** M. **Dependencies:** none (drafts exist in 2b4, 2b3, and 2d2).

#### WI-08 Data model concepts glossary

- **Scope:** a new glossary page per the [Glossary Proposal](#glossary-proposal);
  replace the Core Concepts three-row table with a link; link from readmes and
  the entities-page lead-ins.
- **Acceptance criteria:** "descriptor", "extended reference", "domain",
  "identity", and every descriptor column are defined; the retrieval simulator
  ranks the glossary in the top 3 for q-concept-05, -07, -14, and -15.
- **Effort:** M. **Dependencies:** SME definitions for reference, extended
  reference, common, and extension.

#### WI-09 Learner on-ramp pages

- **Scope:** `data-standards.md` opening definition and the Data Standard vs.
  UDM vs. Ed-Fi ODS/API vs. Ed-Fi API Specification table; `ed-fi-domains.md`
  updated to 26 domains; the v6 Model Reference index rebuilt with a grouped
  domain map and topic lookup (2d2 outline); the v6 landing per the 2d2
  outline; the UDM readme as a hub with a reading path; fix the SEA playbook
  count (16).
- **Acceptance criteria:** one stated domain count site-wide; the Model
  Reference index names all 26 domains with one-line scopes; q-concept-01,
  -02, -09, and -10 to -12 are answered on these pages.
- **Effort:** M. **Dependencies:** WI-08; domain readme summaries (WI-12) for
  the one-line scopes.

#### WI-10 Change-history wiring

- **Scope:** the What's New index lists all 5 pages with descriptions and a
  release summary table (version, date, breaking, headline changes, early
  access); titles say "Ed-Fi Data Standard"; per-change "who is affected and
  what to do"; an intro and summary on the API changes pages; the migration
  guide completed with the EPDM breaking changes; "Changes in v6.x" notes on
  all 26 overviews; a forward note in v6.0 for the FinancialAid move; a v5
  What's New forward pointer to v6.
- **Acceptance criteria:** every v6 domain overview links its What's New
  section (or says "No changes"); every What's New change links the affected
  domain page; "when was X added" questions are answerable on v6 pages.
- **Effort:** M. **Dependencies:** WI-12 (overview template) for placement.

#### WI-11 Terminology find-and-review pass

- **Scope:** the 234 violations in 2aT1 and 2aT2, using the replacement table;
  template sentences first; v5 and v6 together.
- **Acceptance criteria:** re-running `scripts/terminology.py` and
  reclassifying shows zero violations in v6 and UDM pages, with v5 violations
  remaining only where the owners chose to freeze v5 text; each page's first
  reference is a full accepted form.
- **Effort:** S. **Dependencies:** a ruling on "Ed-Fi" + domain name. The
  site-wide "Ed-Fi community" fix is a separate, out-of-scope item for other
  doc owners.

#### WI-12 Domain readme and overview template (pilot, then rollout)

- **Scope:** pilot on Bell Schedule, Credential, and Student Attendance, then
  roll out to the other 23 domains (readme and overview pages; v5 overviews
  get the opening paragraph and version line only).
- **Acceptance criteria:** each overview has the template sections; all owned
  entities are named; an "In everyday terms" line is present; related domains
  are linked with reasons; before rollout, the re-run 2f judgment improves on
  the pilot domains' questions.
- **Effort:** L overall (M per domain). **Dependencies:** WI-06, WI-08; SME
  review per domain.

#### WI-13 Entities page redesign

- **Scope:** 26 v6 entities pages (plus v5 Staff and Student Identification,
  which have the same inheritance issue).
- **Acceptance criteria:** a lead-in and column legend before the first
  table; domain-owned descriptors grouped by owning entity; inherited rows
  collapsed or linked; no column empty for a whole page; consistent column
  order across versions.
- **Effort:** M (scriptable for the split, manual for the lead-ins).
  **Dependencies:** WI-08 for definitions.

#### WI-14 Diagram text equivalents

- **Scope:** 26 v6 `model-diagrams.mdx` pages (lists derived from `.mmd`
  relationships, which could be script-assisted); 21 v5 image pages (alt text
  and lists); fix the Educator Preparation Program download link.
- **Acceptance criteria:** every diagram has a crawlable "Entities and
  relationships" list that matches the `.mmd`; every page names the domain and
  version; download links describe the file format.
- **Effort:** M. **Dependencies:** none.

#### WI-15 Fill content gaps with SMEs

- **Scope:** the Recruiting and Staffing overview; short best-practices or
  "When to use" pages for Bell Schedule (A/B, mid-year changes), Educator
  Preparation Program, Intervention (vs. Program), Education Organization
  (hierarchy, CMO), and Student Cohort (vs. Section vs. Program); Survey
  anonymity and matrix questions; the Staff "teacher at two schools" scenario;
  IEP goal progress (possible model gap).
- **Acceptance criteria:** the 10 "none" domain questions in the 2b files are
  answerable on v6 pages.
- **Effort:** L. **Dependencies:** SME availability.

#### WI-16 Style and lint decisions

- **Scope:** decide dashes vs. asterisks (CLAUDE.md vs. `ul-style:
  consistent`); decide whether frozen versions are exempt; fix the v5 Teaching
  and Learning best-practices lint issues; correct the rubric's Student
  Health T5 example.
- **Acceptance criteria:** the decision is recorded in CLAUDE.md or
  `.markdownlint.yaml`; `npm run lint` passes.
- **Effort:** M if a bulk conversion is chosen; S otherwise.
  **Dependencies:** Tech team input.

## Appendix: Findings Index and How to Re-Run

### Findings Files

| File | Agent scope |
| --- | --- |
| [rubric.md](./rubric.md), [questions.yaml](./questions.yaml) | Phase 1 rubric (criteria, weights, schema) and 251 synthetic questions |
| [2a1.md](./working/findings/2a1.md) | Mechanical scan, v6 (typos, headings, links, empty columns) |
| [2a2.md](./working/findings/2a2.md) | Mechanical scan, v5 and UDM |
| [2aT1.md](./working/findings/2aT1.md), [2aT1.csv](./working/findings/2aT1.csv) | Terminology classification, v6 and UDM |
| [2aT2.md](./working/findings/2aT2.md), [2aT2.csv](./working/findings/2aT2.csv) | Terminology classification, v5 |
| [2aT-unsure.md](./working/findings/2aT-unsure.md) | Resolution of 15 unsure terminology rows |
| [2b1.md](./working/findings/2b1.md) | v6: Alternative and Supplemental Services, Education Organization, Performance Evaluation |
| [2b2.md](./working/findings/2b2.md) | v6: Teaching and Learning, Discipline, Educator Preparation Program |
| [2b3.md](./working/findings/2b3.md) | v6: Student Attendance, Special Education Data Model, Graduation, Path |
| [2b4.md](./working/findings/2b4.md) | v6: Enrollment, Staff, Student Cohort, Credential |
| [2b5.md](./working/findings/2b5.md) | v6: Assessment, Student Program Evaluation, School Calendar, Bell Schedule |
| [2b6.md](./working/findings/2b6.md) | v6: Assessment Registration, Student Identification and Demographics, Student Health, Intervention |
| [2b7.md](./working/findings/2b7.md) | v6: Student Academic Record, Finance, Survey, Recruiting and Staffing |
| [2c1.md](./working/findings/2c1.md), [2c2.md](./working/findings/2c2.md) | v5 pages that differ from v6 |
| [2d1.md](./working/findings/2d1.md) | UDM pages, `data-standards.md`, learner journey, glossary outline |
| [2d2.md](./working/findings/2d2.md) | v6 landing, Model Reference index, What's New, migration guide; recommended outlines |
| [2e.md](./working/findings/2e.md) | Cross-version redundancy, retirement, implementation options |
| [2f1.md](./working/findings/2f1.md), [2f1.csv](./working/findings/2f1.csv) | Retrieval judgment, questions 1 to 126 |
| [2f2.md](./working/findings/2f2.md), [2f2.csv](./working/findings/2f2.csv) | Retrieval judgment, questions 127 to 251 |

Data files in `working/`: `inventory.csv`, `inventory-html.csv`,
`version-diff.csv`, `table-dupes.csv`, `terminology-hits.csv`,
`retrieval-results.csv`, `v5-delta-pages.txt`, and `corpus.jsonl`
(gitignored).

### How to Re-Run

Run from the repository root. Scripts need Python 3 with PyYAML.

```bash
npm ci
npm run build                                                     # produces build/
python3 -I drafts/data-standard-audit/scripts/inventory.py        # inventory.csv, version-diff.csv, table-dupes.csv
python3 -I drafts/data-standard-audit/scripts/html_enrich.py      # inventory-html.csv, corpus.jsonl
python3 -I drafts/data-standard-audit/scripts/terminology.py      # terminology-hits.csv
python3 -I drafts/data-standard-audit/scripts/retrieval.py        # retrieval-results.csv (all questions)
python3 -I drafts/data-standard-audit/scripts/retrieval.py "what is a descriptor"   # ad hoc query
```

The counterfactual scenarios in [Retrieval Results](#retrieval-results) use
this logic. Save it outside the repository, for example as
`counterfactual.py`, and run it from the repository root with `python3 -I`:

```python
import csv, json, sys
from pathlib import Path
AUDIT = Path("drafts/data-standard-audit").resolve()
sys.path.insert(0, str(AUDIT / "scripts"))
import yaml
from retrieval import Index, ds_version, norm

docs = [json.loads(l) for l in open(AUDIT / "working/corpus.jsonl", encoding="utf-8")]
qs = yaml.safe_load(open(AUDIT / "questions.yaml", encoding="utf-8"))["questions"]
sim = {r["rel_path"]: float(r["sim_v6_v5"] or 0)
       for r in csv.DictReader(open(AUDIT / "working/version-diff.csv"))}
v5_dupes = {norm(r["url"]) for r in csv.DictReader(open(AUDIT / "working/inventory-html.csv"))
            if r["set"] == "v5" and sim.get(r["rel_path"], 0) >= 0.98}

def run(keep):
    idx = Index([d for d in docs if keep(d)])
    hit3 = 0
    for q in qs:
        urls = [norm(d["url"]) for _, d in idx.search(q["question"])]
        exp = {norm(e) for e in q.get("expected_urls", [])}
        hit3 += any(u in exp for u in urls[:3])
    return hit3 / len(qs)

print(run(lambda d: True))
print(run(lambda d: ds_version(d["url"]) not in ("3", "4") and norm(d["url"]) not in v5_dupes))
```

After any content change, re-run the build, `html_enrich.py`, and
`retrieval.py`, then repeat the 2f judgment on the affected questions. The
retrieval simulation is directional; confirm important changes with a manual
Perplexity spot-check of 10 to 20 questions.
