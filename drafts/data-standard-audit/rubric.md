# Data Standard Documentation Audit — Rubric

Status: Phase 1 output, 2026-10-10. Draft for user review at Checkpoint 1.
AI-assisted: this rubric was drafted with an AI model and must be reviewed by a
person before Phase 2 agents use it.

This rubric is the shared quality bar for every Phase 2 agent. It defines:

1. Scored criteria (0–3) with stable codes that findings must cite.
2. Which criteria apply to each page type, with weights and "what good looks
   like" examples from real Ed-Fi Data Standard v6 pages.
3. The Findings Schema, severity and `pattern` guidance, and worked examples.
4. Evidence rules.

Read [plan.md](./plan.md) for scope and
[terminology-guidelines.md](./terminology-guidelines.md) for brand rules. Your
own recommendations and proposed rewrites must follow the terminology
guidelines (for example, write "Ed-Fi Data Standard v6" or "Ed-Fi Unifying
Data Model (UDM)", never a bare "Ed-Fi").

## Audiences and Scoring Lens

Score every page twice in your head, then record the lower score:

- **New learner** (human): someone new to the Ed-Fi Data Standard who arrived
  on _this one page_ from a search engine. They do not know what a domain,
  descriptor, association, or extended reference is, and they do not know
  which Data Standard version they need.
- **Answer engine** (LLM + retrieval): Perplexity web search restricted to
  `docs.ed-fi.org`. It sees the _published HTML_ only. Mermaid diagrams are
  rendered client-side, so their content is effectively invisible. The
  `<title>` comes from the H1 and the meta description is auto-derived because
  no page has a `description:` front matter key. A retrieved passage may be a
  single section without the H1.

Sources of evidence, in order of preference: the Markdown source under
`dataStandard_versioned_docs/` or `docs/reference/1-data-exchange/`; the
Phase 0 metrics in `working/inventory.csv`, `working/version-diff.csv`,
`working/table-dupes.csv`, and `working/terminology-hits.csv`; and the built
HTML under `build/` when available.

## Score Scale

Every criterion uses the same scale. The per-criterion anchors below make each
level concrete.

| Score | Meaning |
| --- | --- |
| 0 | Absent or actively harmful (wrong, misleading, or blocks understanding) |
| 1 | Present but weak; a new learner or answer engine would likely fail |
| 2 | Adequate; works for most readers with minor gaps |
| 3 | Exemplary; could serve as the template for other pages |

Mark a criterion `n/a` only when the page type table below says it does not
apply.

## Criteria

### H — Human Orientation

**H1 Opening statement.** The first paragraph after the H1 says what the page
covers and why a reader would care.

- 0: No prose before the first table, list, heading, or diagram (for example,
  the H1 is followed directly by `## Key Entities`).
- 1: Prose exists but is vague or circular ("provides background, rationale,
  and provides guidance").
- 2: States the subject and scope in one or two sentences.
- 3: States subject, scope, _and_ the real-world problem it solves or who uses
  it (for example, SEA, LEA, SIS vendor, assessment vendor).

**H2 Jargon defined or linked.** Model terms (domain, entity, association,
descriptor, extended reference, common, abstract type, UDM, SEOA, SEORA,
EPDM, IEP, IDEA) are defined in place or linked on first use.

- 0: Three or more undefined terms or acronyms that block understanding.
- 1: Some terms linked, but core terms (descriptor, extended reference) are
  not.
- 2: Most terms defined or linked; one or two minor gaps.
- 3: Every term a new learner needs is defined or linked on first use.

**H3 Wayfinding and next steps.** The page links to sibling pages, related
domains, the Handbook, and the relevant What's New page, with descriptive link
text.

- 0: No outbound links, or only "Go back" boilerplate.
- 1: Links exist but are vague ("here") or only point up the hierarchy.
- 2: Links to siblings and at least one related domain or concept page.
- 3: Explicit "related domains" or "next steps" guidance that explains _why_
  to follow each link.

**H4 Concrete examples.** Abstract model statements are grounded in a
real-world scenario or sample data.

- 0: No examples on a page whose purpose is explanation.
- 1: A passing parenthetical example.
- 2: At least one worked scenario.
- 3: Scenarios that map real-world situations to specific entities and
  elements (use-case tables, sample mappings).

### S — Self-Containment

**S1 Names the domain and version in the body.** The body text (not only the
URL, sidebar, or breadcrumb) names the domain and the Ed-Fi Data Standard
version.

- 0: Neither domain nor version appears in body text.
- 1: Domain only, via the H1.
- 2: Domain in the body; version only implied (for example, "In DS 6.0, ...").
- 3: First paragraph names both (for example, "In Ed-Fi Data Standard v6.1,
  the Graduation domain ...").

**S2 No context dependencies.** The page and each section still make sense
when retrieved alone: no "see above", "as described previously", "the
following" without a referent, or "this domain" as the only subject; acronyms
expanded on the page.

- 0: Key meaning depends on another page or an earlier section.
- 1: Several dangling references or unexpanded acronyms.
- 2: Minor dependencies only.
- 3: Every H2 section restates its subject and can be quoted alone.

**S3 Passage completeness.** Answers to likely questions sit in one
contiguous passage (a section or paragraph), not scattered across a table, a
diagram, and a link.

- 0: The answer exists only in a diagram, image, or across pages.
- 1: The answer requires joining two or more distant sections.
- 2: Mostly contiguous.
- 3: Each likely question has a self-contained answering paragraph.

### M — Metadata

**M1 Title specificity.** The H1 (which becomes `<title>`) is specific, and
for versioned pages distinguishes the version.

- 0: Title is generic or identical across four versions (for example,
  "Graduation Domain - Overview" exists in v3, v4, v5, and v6).
- 1: Specific to the page but no version signal.
- 2: Version signal present via front matter `title:` or a version-labeled
  sidebar, but not in the H1.
- 3: Specific, includes version, under about 60 characters.

**M2 Meta description.** Front matter `description:` exists, is plain
language, is 120–160 characters, and names domain and version.

- 0: Missing (current state for all in-scope pages).
- 1: Present but generic or over-length.
- 2: Present and specific but missing version or domain.
- 3: Present, specific, version-aware, and in the right length range.

**M3 Headings descriptive and unique.** H2/H3 headings describe their content
and are not repeated identically across many pages; a single H1; no skipped
levels.

- 0: Multiple H1s or skipped levels, or only generic headings.
- 1: Mostly generic headings repeated site-wide ("Key Entities", "Key
  Concepts").
- 2: Mix of generic and descriptive headings.
- 3: Headings carry the domain or concept name ("Graduation Plan Key
  Concepts") and form a meaningful outline.

**M4 Naming consistency.** H1, sidebar label, link text on the domain readme,
URL slug, and domain name in the UDM domain list agree.

- 0: Conflicting names that could split retrieval (for example, slug
  `recruiting-and-staffing-domain` with H1 "Recruitment And Staffing Domain").
- 1: Two or more variants of the name on related pages.
- 2: One minor variant (for example, "Credential Data Model Domain - Model
  Diagrams" vs "Credential Domain").
- 3: Fully consistent.

### R — Rendered Visibility

**R1 Diagram text equivalent.** Information carried by a Mermaid diagram (or
other client-rendered content) also exists as crawlable text: at least the
entities shown and their key relationships.

- 0: Diagram only; no prose (the current default domain-diagrams page).
- 1: A heading or a single generic sentence ("This section contains reference
  information").
- 2: Prose summary of the main entities, or a link to an equivalent text page.
- 3: Prose or list that states each key relationship in words (for example,
  "A StudentSchoolAssociation links one Student to one School").

**R2 Images have text equivalents.** Images (PNG screenshots, annotated score
reports) have descriptive alt text, and any information needed to answer a
question also appears in text.

- 0: Image carries essential information; alt text is a file name or missing.
- 1: Alt text present but not descriptive.
- 2: Descriptive alt text; some information only in the image.
- 3: Descriptive alt text plus a prose or table equivalent.

**R3 Embedded and external content.** Content in iframes (for example, the
Handbook), downloads (`.mmd` files), or external sites has a crawlable summary
and a plain link.

- 0: Essential content only inside an iframe or download.
- 1: Plain link present but no summary.
- 2: Short summary of what the external resource contains.
- 3: Summary plus the key facts a learner most often needs.

### T — Table Usability

**T1 Table size and structure.** Large tables are grouped, ordered
meaningfully, or split so a reader can scan them.

- 0: More than 80 rows in a single unordered table with no grouping.
- 1: 41–80 rows, or a flat alphabetical list mixing unrelated items.
- 2: 40 rows or fewer, or larger but logically grouped.
- 3: Grouped by purpose with short subheadings.

**T2 Empty columns.** Columns are populated enough to justify their space.
Use `empty_cell_ratio` from the inventory.

- 0: Page `empty_cell_ratio` 0.40 or higher, or a column that is entirely
  empty.
- 1: 0.25–0.39.
- 2: 0.10–0.24.
- 3: Below 0.10, or empty cells mean something and that meaning is stated.

**T3 Cross-domain duplication.** Rows repeated across many domains (see
`working/table-dupes.csv`) are labeled or separated from domain-owned rows.

- 0: Most rows are inherited (for example, `Country`, `AddressType` under
  Graduation) with no distinction from domain-owned rows.
- 1: Some inherited rows; no labeling.
- 2: Inherited rows present but labeled or grouped.
- 3: Only domain-owned rows, with a link to where shared items are defined.

**T4 Narrative context.** Each table has an introductory sentence before it
that explains what a row represents and what each non-obvious column means.

- 0: Tables appear directly under headings with no explanation.
- 1: An explanation exists only after the table (for example, the Usage
  Classification tip at the bottom of each entities page).
- 2: A brief lead-in sentence before the table.
- 3: Lead-in plus column definitions and guidance on how to use the table.

**T5 Table accuracy and placement.** Rows are in the right table and of the
right kind.

- 0: Rows of the wrong kind (for example, vaccine codes such as `HepB` listed
  as entities, or `School` listed as a Bell Schedule domain entity).
- 1: Several misplaced rows.
- 2: One misplaced row.
- 3: Every row belongs where it is.

### V — Version Disambiguation

**V1 Version signal on page.** A reader can tell which Ed-Fi Data Standard
version the page describes without reading the URL.

- 0: No version signal anywhere in the rendered page body.
- 1: Version only in the site version dropdown or URL.
- 2: Version in a note or admonition, or in passing.
- 3: Version stated in the first paragraph and, where relevant, which minor
  release (6.0 vs 6.1) introduced the content.

**V2 Cross-version redundancy.** The page is not a near-duplicate of the same
page in another version without a reason. Use `sim_v6_v5`, `sim_v6_v4`,
`sim_v6_v3` from `working/version-diff.csv`.

- 0: Similarity of at least 0.98 with an older version, no differences
  called out, and the older version is out of support.
- 1: Similarity of at least 0.98, both versions supported, no differences
  called out.
- 2: Similar but differences are called out.
- 3: Unique content, or a single canonical page with version notes.

**V3 Change pointers.** Domain pages mention what changed in this version (or
"no changes") and link to the matching What's New section; What's New pages
link to the affected domain pages.

- 0: No pointers in either direction, or a pointer to the wrong place.
- 1: A generic link to What's New.
- 2: A specific link to the relevant What's New section.
- 3: An in-page "Changes in v6.x" note plus a specific link.

**V4 Lifecycle status.** Early access, deprecated, and out-of-support status
is visible on the page.

- 0: Status missing or wrong (for example, a supported-years claim that has
  expired).
- 1: Status only on a parent page.
- 2: Status on the page, but not near the top.
- 3: Clear admonition near the top with a link to the policy.

### G — Terminology

Apply [terminology-guidelines.md](./terminology-guidelines.md). Phase 2a-T
classifies individual hits; page-level agents score the page overall.

**G1 No bare "Ed-Fi"; full form first.** Each page uses the full accepted
phrase ("Ed-Fi Data Standard", "Ed-Fi Unifying Data Model (UDM)", "Ed-Fi
ODS/API", "Ed-Fi API Specification") on first use; later short forms are
clear.

- 0: Three or more bare or unlisted uses ("the Ed-Fi data model", "Ed-Fi
  generally avoids aggregations").
- 1: One or two bare uses.
- 2: No bare uses; full form missing on first use.
- 3: Fully conformant.

**G2 No avoid-list phrases.** No "Ed-Fi technology", "Ed-Fi standards",
"Ed-Fi Partner", "Ed-Fi credentials", and so on.

- 0: Two or more avoid-list phrases.
- 1: One.
- 2: None, but near-misses ("the Ed-Fi Standards" capitalized).
- 3: None.

**G3 Implement, deploy, adopt.** The Data Standard is _implemented_; the
technology is _deployed_; the Alliance _drives adoption_.

- 0: Two or more misuses ("deployed the data standard").
- 1: One misuse.
- 2: Ambiguous usage.
- 3: Correct throughout.

**G4 Consistent concept and entity names.** Entity and concept names match
the model (Contact, not Parent, in v5 and later; `SectionAttendanceTakenEvent`
spelled the same everywhere); product names are spelled correctly ("Ed-Fi",
not "EdFi" or "Ed Fi").

- 0: A wrong or retired name that would mislead (for example, "Parent" in
  v6 text).
- 1: Two or more spelling variants of the same entity.
- 2: One variant.
- 3: Consistent.

### Q — Quality

**Q1 Typos and grammar.** No typos, repeated words, or broken sentences.

- 0: An error that changes meaning, or three or more errors.
- 1: Two errors.
- 2: One error.
- 3: None.

**Q2 Accuracy and currency.** Claims are correct for the version (counts,
"latest version", file formats, support windows).

- 0: A claim that is false today (for example, "17 base domains", "Visio
  format" for 6.0 diagrams that are Mermaid files in 6.1).
- 1: Stale wording that is technically true but misleading.
- 2: Minor imprecision.
- 3: Accurate.

**Q3 Link quality.** Links resolve, use descriptive text, and point to the
right version.

- 0: Broken link, repository-path link (for example,
  `/dataStandard_versioned_docs/version-6/...`), or link to the wrong version.
- 1: Vague link text ("here", "click here").
- 2: Working links; minor text issues.
- 3: Descriptive, version-correct links.

**Q4 Consistency with other pages.** The page does not contradict the UDM
pages, What's New, or another domain (for example, an entity listed as a key
entity in two different domains without explanation).

- 0: Direct contradiction.
- 1: Implicit tension a learner would notice.
- 2: Minor inconsistency in wording.
- 3: Consistent.

**Q5 Completeness.** No placeholders, empty sections, or sentences that stop
mid-thought.

- 0: Placeholder content ("_Coming Soon_") or an empty required section.
- 1: An empty heading (for example, `## Subsections` with no list) or a
  dangling sentence ("can be found in the").
- 2: Minor omission.
- 3: Complete.

## Page Types

Page types come from the `page_type` column of `working/inventory.csv`. One
known misclassification: `student-attendance-domain/best-practices-and-use-cases`
(the folder index) is typed `domain-readme` but is a 3,859-word best-practices
page. Score it as `domain-other`.

Weights: **3** = critical for this page type, **2** = important, **1** =
nice to have, **–** = not applicable. A page score is the weighted mean of
applicable criteria, reported on the 0–3 scale with one decimal place.

| Code | domain-readme | domain-overview | domain-diagrams | domain-entities | domain-other | whats-new | ds-landing | conceptual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H1 | 3 | 3 | 2 | 2 | 3 | 2 | 3 | 3 |
| H2 | 2 | 3 | 1 | 3 | 2 | 1 | 3 | 3 |
| H3 | 3 | 2 | 2 | 2 | 2 | 2 | 3 | 2 |
| H4 | – | 2 | – | – | 3 | 1 | 1 | 2 |
| S1 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | – |
| S2 | 1 | 2 | 1 | 2 | 3 | 2 | 2 | 2 |
| S3 | 1 | 3 | 1 | 2 | 3 | 2 | 2 | 3 |
| M1 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 2 |
| M2 | 2 | 3 | 2 | 3 | 3 | 2 | 3 | 3 |
| M3 | 1 | 2 | 1 | 2 | 2 | 2 | 1 | 2 |
| M4 | 3 | 2 | 2 | 2 | 1 | – | 1 | 1 |
| R1 | – | 1 | 3 | – | 1 | – | – | 1 |
| R2 | – | 2 | 2 | – | 2 | 1 | 1 | 3 |
| R3 | – | – | 2 | – | – | 1 | 3 | 2 |
| T1 | – | 1 | – | 3 | 2 | 2 | – | 1 |
| T2 | – | – | – | 3 | 1 | – | – | – |
| T3 | – | – | – | 3 | – | – | – | – |
| T4 | – | 1 | – | 3 | 2 | 2 | – | 1 |
| T5 | – | – | – | 2 | 1 | 1 | – | – |
| V1 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 1 |
| V2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | – |
| V3 | 1 | 2 | – | 1 | 1 | 3 | 2 | 1 |
| V4 | 2 | 2 | 1 | 1 | 1 | 2 | 3 | 1 |
| G1 | 2 | 2 | 1 | 1 | 2 | 2 | 3 | 3 |
| G2 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 |
| G3 | 1 | 1 | – | – | 1 | 1 | 2 | 2 |
| G4 | 2 | 3 | 2 | 3 | 3 | 3 | 2 | 2 |
| Q1 | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 |
| Q2 | 2 | 3 | 1 | 2 | 3 | 3 | 3 | 3 |
| Q3 | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 2 |
| Q4 | 2 | 3 | 1 | 2 | 3 | 3 | 2 | 3 |
| Q5 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 |

### domain-readme (27 pages in v6)

_Role:_ the domain landing page and the most likely search entry point for
"what is the X domain". Today it is a short definition plus a link list.

_What good looks like:_ two or three sentences that define the domain, name
the real-world records it holds, and point to neighbors, then a link list
with one-line descriptions, and a version statement.

- Good: Graduation readme, "The information to determine if a student has
  fulfilled these requirements is typically held in the [Student Academic
  Record Domain]". It defines the scope _and_ tells the reader where the
  neighboring data lives (H1, H3).
- Good: School Calendar readme, "Note that the calendar domain is not
  intended to cover section (class period) and other event scheduling during
  school days; those needs are covered via the [Bell Schedule Domain]". An
  explicit boundary statement is exactly what a learner and an answer engine
  need (S3, H3).
- Weak: Credential readme, "The Credential Domain provides background,
  rationale, and provides guidance for its application in the field." (H1 = 1;
  it says nothing about credentials.)
- Weak: the closing link varies between "Go back to the UDM Reference page"
  (Graduation, Teaching and Learning) and "Go back to the Model Reference
  page" (Student Attendance) (M4, Q4).

### domain-overview (26 pages in v6)

_Role:_ the conceptual explanation of the domain. It is the page most likely to
answer "how do I model X" questions.

_What good looks like:_ an opening paragraph that names domain and version;
key entities each described in one plain-language sentence; key concepts that
explain _why_ the model works the way it does, with an example; links to
best practices and related domains.

- Good: Teaching and Learning overview, "A CourseOffering entity is simply the
  local availability of a course at a school during a specific session. It's
  the equivalent of an entry in the school's annual or semester course
  catalog." A plain-language analogy for a model concept (H2, H4).
- Good: Special Education Data Model overview, the "Differences from
  StudentSpecialEducationProgramAssociation" comparison table answers a
  learner's first question ("does this replace what I use today?") in one
  self-contained passage (S3, Q4).
- Weak: Graduation overview opens with `## Key Entities` immediately after the
  H1 and never mentions the Data Standard version (H1 = 0, S1 = 1).
- Weak: Recruitment and Staffing overview, both sections read "_Coming
  Soon_" (Q5 = 0).

### domain-diagrams (26 pages in v6)

_Role:_ visual model reference. Today each is an H1, one or more `<Mermaid>`
embeds, and a download link. Source word counts range from 44 to 747; 22 of
26 have fewer than 120 words. In built HTML, the diagram body is not crawlable
text.

_What good looks like:_ a short paragraph stating what the diagram shows, then
a crawlable list of the entities and key relationships in the diagram, and a
note on how to read the notation (link to UML Notation and Conventions).

- Partial good: Teaching and Learning diagrams, "A school will have one or
  more Sections for each CourseOffering. Students are enrolled in specific
  Sections. Each Section will have one or more assigned Staff ..." Prose that
  states relationships in words (R1 = 2).
- Weak: Graduation diagrams, whose body is only `## Graduation Model UML
  Diagram`, `<Mermaid value={diagramSimple} viewport />`, a second diagram, and
  "[Download detailed UML diagram](./Graduation.mmd)" (R1 = 0, H1 = 0).

### domain-entities (26 pages in v6)

_Role:_ lookup tables of entities, extended references, and descriptors. These
pages are long and dominated by tables.

_What good looks like:_ a lead-in that explains the three tables and the
columns before the first table; domain-owned descriptors separated from
descriptors inherited through extended references; classification columns
either populated or removed; a link to the Handbook for full element detail.

- Good, but misplaced: each entities page ends with a tip, "See [Non-normative
  Descriptor Classifications] for more information on _Usage
  Classification_." The content is right; it belongs before the table (T4 = 1).
- Weak: Graduation entities, a 59-row descriptor table with empty-cell ratio
  0.507, including `Country`, `AddressType`, and `InternetAccess`, which hang
  off `EducationOrganization` or `School`, not graduation (T2 = 0, T3 = 0).
- Weak: Student Health entities, where immunization codes (`RSV`, `HepB`,
  `DTaP`) and exemption values (`Religious`, `Philosophical`) appear as
  table rows alongside entities (T5 = 0).

### domain-other (best practices and use cases; 15 pages in v6)

_Role:_ the deepest how-to content, and the best answers for "how do I record
X" questions.

_What good looks like:_ a definition section, a use-case table that maps
real-world situations to entities, prerequisites, anti-patterns, and
per-entity guidance, with each section able to stand alone.

- Good: Student Attendance best practices, a use-case table that maps
  "Student arrives late to school but is present for the rest of the day" to
  `StudentSchoolAttendanceEvent` (H4 = 3, S3 = 3).
- Good: the same page says "Note that staff attendance, known as staff leave,
  is captured by the _StaffLeave_ entity in the Staff domain." A cross-domain
  redirect a learner needs (H3).
- Weak: four best-practices pages use the heading pattern "Ed-Fi
  Prerequisites for Writing ... Domain Entities" (Alternative and
  Supplemental Services, Enrollment, Student Program Evaluation, Student
  Attendance), which is both a bare "Ed-Fi" (G1) and a near-duplicate heading
  across pages (M3). The Teaching and Learning H1 is singular "Best Practice"
  while the others are plural (M4).

### whats-new (6 pages in v6)

_Role:_ change history and migration. These pages answer version-sensitive
questions and must link out to the affected domain pages.

_What good looks like:_ release date and breaking/non-breaking status at the
top; each change states old behavior, new behavior, who is affected, and
links to the domain page and the migration guide.

- Good: What's New v6.1, "**Implementation guidance:** To minimize
  maintenance overhead while the model matures, initial adoption is
  recommended for Special Education vendors rather than SIS vendors." Clear,
  audience-specific guidance (H1, V4).
- Good: Migration Guide, the rename table "`LastEvaluationDate` →
  `IEPLastEvaluationDate`" is a self-contained answer (S3).
- Weak: What's New v6.0, "can be found in the updated model references pages
  `[here](/dataStandard_versioned_docs/version-6/model-reference/readme.md)`".
  A repository path and vague link text (Q3 = 0).

### ds-landing (3 pages in v6: version root, Handbook, Model Reference)

_Role:_ the version home and the hub for "what is the Ed-Fi Data Standard"
and "which version" questions.

_What good looks like:_ the first paragraph defines the Ed-Fi Data Standard in
plain language and states the current version; a "start here" path for new
learners; Handbook and diagram links with accurate format labels.

- Good: version root, ":::warning Please note that the current version of
  Data Standard v6 is v6.1 (full version number v6.1.0)." An explicit, current
  version signal (V1 = 3).
- Weak: version root, "**Unifying Modeling Language (UML)** diagrams". The
  correct expansion is Unified Modeling Language, as the UDM Getting Started
  page says (Q1, Q4).
- Weak: Model Reference landing labels the 6.0 Handbook "(Latest version)"
  under "Version 6.0" and the 6.0 diagrams "(Visio format, on GitHub)" (Q2).
- Weak: Handbook page content is an `<iframe>`; the only crawlable text is
  two short paragraphs (R3 = 1).

### conceptual (UDM folder plus `data-standards.md`; 10 pages)

_Role:_ unversioned explanations of the Ed-Fi Unifying Data Model (UDM),
governance, and design principles. These are the natural home for a
concepts glossary.

_What good looks like:_ defines concepts with examples, links to the current
version's model reference, and stays consistent with the versioned pages.

- Good: Core Concepts, "Entities have natural **associations** (i.e.,
  relationships): for example, students are related to schools via their
  enrollments." A definition with an example (H2, H4).
- Weak: Ed-Fi Domains, "The Ed-Fi UDM is organized into the following 17 base
  domains". The v6 model reference has 26 domain folders, and the page lists
  none of the Educator Preparation domains (Q2 = 0).
- Weak: Core Concepts glossary defines only Entity, Association, and Attribute;
  "descriptor" and "extended reference", which head tables on every entities
  page, are not defined anywhere in scope (H2).
- Weak: `data-standards.md` says Data Standard 4.0 "is intended to support
  school years 2024-2025, 2025-2026", a window that has ended (V4 = 0).

## Findings Schema

Restated verbatim from [plan.md](./plan.md):

> Each Phase 2 agent writes `working/findings/<agent-id>.md` containing a table
> with these columns:
>
> `id | path | version | domain | page_type | rubric_code | severity (H/M/L) | audience (human/llm/both) | evidence (quote or metric) | recommendation | effort (S/M/L) | pattern (page-only / domain-template / site-wide)`
>
> `pattern` matters: it lets synthesis turn 27 instances of the same issue
> into one template recommendation.

Column notes:

- `id`: `<agent-id>-<nnn>`, for example `2b-3-014`.
- `path`: repository-relative source path from the `repo_path` column of the
  inventory. For site-wide findings, use the most representative path and
  say "and N others" in `evidence`.
- `version`: `3`, `4`, `5`, `6`, or `udm`.
- `rubric_code`: one primary code (for example, `R1`). If a second code
  applies, put it in the recommendation text, not in this column.
- `effort`: S = under an hour per page or a find-and-replace; M = a
  half-day or a template change; L = multi-day or needs subject-matter
  experts.

### Severity

- **H (high):** A new learner or answer engine would get a _wrong_ answer or
  no answer for a likely question, or the issue affects many pages. Examples:
  diagram-only content (R1 = 0), placeholder pages (Q5 = 0), false claims
  (Q2 = 0), broken links, wrong-version answers (V1 = 0 on a page that
  duplicates an older version), terminology that names a retired entity.
- **M (medium):** The answer is findable but slow, incomplete, or
  ambiguous. Examples: missing opening statement, undefined jargon, empty
  table columns, missing meta description, naming inconsistencies.
- **L (low):** Polish that does not change comprehension. Examples: single
  typos, inconsistent bullet style, minor heading capitalization.

When in doubt, ask: "Would fixing this change whether a learner gets the
right answer?" Yes means H or M; no means L.

### Pattern

- **page-only:** Unique to this page (a typo, a wrong claim, a placeholder).
- **domain-template:** Recurs on the same page type across domains because
  every domain follows the four-page template (for example, every
  domain-diagrams page lacks a text equivalent). Report _once_ with a count
  and two or three example paths, not once per domain.
- **site-wide:** Affects pages of different types or the whole versioned set
  (for example, no `description:` front matter anywhere; identical titles
  across v3–v6; repeated "Go back" boilerplate).

Before writing a domain-template or site-wide finding, check the inventory or
`grep` to confirm the count. Quote the count in `evidence`.

### Worked Examples

| id | path | version | domain | page_type | rubric_code | severity (H/M/L) | audience (human/llm/both) | evidence (quote or metric) | recommendation | effort (S/M/L) | pattern (page-only / domain-template / site-wide) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ex-001 | dataStandard_versioned_docs/version-6/model-reference/graduation-domain/model-diagrams.mdx | 6 | graduation-domain | domain-diagrams | R1 | H | both | Body is only two `<Mermaid value={...} viewport />` embeds plus "[Download detailed UML diagram](./Graduation.mmd)"; inventory `words` = 44. All 26 v6 domain-diagrams pages embed Mermaid (inventory `mermaid_embeds` > 0), and 22 of 26 have fewer than 120 words. | Add a crawlable "Entities and relationships in this diagram" list under each diagram (for example, "A GraduationPlan is defined by an EducationOrganization; a StudentSchoolAssociation may reference a GraduationPlan"), and a one-line intro naming the domain and Ed-Fi Data Standard v6.1. | M | domain-template |
| ex-002 | dataStandard_versioned_docs/version-6/model-reference/graduation-domain/entities-references-and-descriptors.md | 6 | graduation-domain | domain-entities | T3 | M | both | Descriptor table has 59 rows; `empty_cell_ratio` = 0.507. Rows such as `Country`, `AddressType`, `InternetAccess`, and `CharterStatus` belong to `EducationOrganization` or `School`. `table-dupes.csv` shows `Country` repeated in 21 v6 domains. | Split the descriptor table into "Graduation descriptors" (Entity = GraduationPlan, PostSecondaryEvent) and "Descriptors used by referenced entities", collapsed or linked to the owning domain. Move the Usage Classification tip above the table. | M | domain-template |
| ex-003 | dataStandard_versioned_docs/version-6/model-reference/student-attendance-domain/overview.md | 6 | student-attendance-domain | domain-overview | G4 | M | both | Key Entities says "A SectionAttendanceTakenEvent, which models ..."; Key Concepts says "The SectionAttendanceEventTaken entity is strictly for recording ..." The entities table spells it `SectionAttendanceTakenEvent`. Also "An AttendanceEvent entities which connect", and the page uses "Ed-Fi data model" three times plus "Ed-Fi generally avoids aggregations" (G1). | Use `SectionAttendanceTakenEvent` throughout; fix "An AttendanceEvent entities"; replace "Attendance in the Ed-Fi data model" with "Attendance in the Ed-Fi Unifying Data Model (UDM)" on first use. | S | page-only |

## Evidence Rules

- **Every finding needs evidence**: a short verbatim quote (under about 40
  words, in quotation marks or backticks) _or_ a metric with its source (for
  example, "`empty_cell_ratio` = 0.507 (inventory.csv)", "`sim_v6_v5` = 1.0
  (version-diff.csv)", "`grep -c` finds 26 files"). Synthesis drops findings
  without evidence.
- For domain-template and site-wide findings, give the count and two or three
  example paths.
- Quote the _source_ Markdown when the issue is in wording; cite built HTML
  (for example, `<title>` text) when the issue is in rendering.
- Do not infer missing content from memory of the Ed-Fi Data Standard; if
  you believe something is missing, `grep` the in-scope folders first and
  say what you searched for.
- Recommendations must be actionable (say what to add, remove, or change),
  and any proposed wording must follow the terminology guidelines.
- Do not edit any page under `docs/` or `dataStandard_versioned_docs/`.

## Scoring Output (Phase 2b and 2c)

In addition to the findings table, Phase 2b and 2c agents add a per-page
score table to their findings file:

```markdown
| path | page_type | H1 | H2 | ... | Q5 | weighted_score |
| --- | --- | --- | --- | --- | --- | --- |
```

Use `n/a` for criteria the page type table marks "–". Compute
`weighted_score` as `sum(score × weight) / sum(weight)` over applicable
criteria, rounded to one decimal place.
