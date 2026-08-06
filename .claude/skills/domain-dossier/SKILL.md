---
name: domain-dossier
description: "Generate a historical knowledge dossier for one Ed-Fi UDM domain (current state, evolution, design rationale, known inconsistencies) and draft it as a Confluence page. Usage: /domain-dossier <domain-name>"
---

If `$ARGUMENTS` is empty, ask the user which domain to run before doing anything else.

DOMAIN_NAME: `$ARGUMENTS`
DOMAIN_FOLDER_SLUG: derive it (e.g. "discipline" -> "discipline-domain"); if unsure, list
`dataStandard_versioned_docs/version-6/model-reference/` and match the closest folder name.

Run one domain per invocation — do not loop over multiple domains in a single run.

You are building a historical knowledge dossier for this domain of the Ed-Fi
Unifying Data Model (UDM). This is for internal onboarding of new Ed-Fi
Alliance staff/contractors who lack institutional history on why the model
looks the way it does.

Steps tagged "local repo" require reading files from this repo. Steps tagged
"Atlassian MCP" require the Jira/Confluence tools — skip and note if those
tools are unavailable in the current environment.

=== Linking to live docs ===
The dossier's audience mostly won't have repo access, so every local file
citation should link to the live page on docs.ed-fi.org, not just the repo
path. Derive the URL from the local path with these rules (confirmed against
`docusaurus.config.js` and existing cross-links in this repo):

- `dataStandard_versioned_docs/version-N/<rest>/<file>.md(x)` ->
  `https://docs.ed-fi.org/reference/data-exchange/data-standard/<rest>/<file>`
  — for version 6 (currently the latest/"current" version — check
  `lastVersion` in the `dataStandard` plugin block of `docusaurus.config.js`
  if this ever changes). For an older version (5, 4, 3), insert that version
  number as a path segment right after `data-standard/`, e.g. `.../data-standard/5/<rest>/<file>`.
- `docs/reference/<N>-<slug>/<rest>/<file>.md` ->
  `https://docs.ed-fi.org/reference/<slug>/<rest>/<file>` — strip the leading
  `N-` numeric-ordering prefix from every path segment that has one (only the
  top-level segment usually has one, but check each segment).
- `docs/partners/<N>-<slug>/<rest>/<file>.md` ->
  `https://docs.ed-fi.org/partners/<slug>/<rest>/<file>` (same prefix-stripping rule).
- `docs/community/...` and `docs/getting-started/...` map directly to
  `https://docs.ed-fi.org/community/...` and `https://docs.ed-fi.org/getting-started/...`.
- Drop the `.md`/`.mdx` extension in the URL. If the file is `readme.md` (or
  `index.md`), it's the folder's index page — use the folder path with a
  trailing slash and no filename segment.

Worked example: `dataStandard_versioned_docs/version-6/model-reference/discipline-domain/readme.md`
-> `https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/discipline-domain/`.

If a constructed URL looks off, spot-check it against a known-good example
already in the repo (`grep -r "docs.ed-fi.org/reference" docs/` or similar)
rather than guessing.

=== STEP 1: Current state (local repo) ===
Read everything in:
`dataStandard_versioned_docs/version-6/model-reference/{{DOMAIN_FOLDER_SLUG}}/`
  - readme.md, overview.md, entities-references-and-descriptors.md,
    best-practices.md, model-diagrams.mdx, and any *.mmd diagrams
Also skim `docs/reference/1-data-exchange/udm/` (design-principles.md,
governance.md, udm-handbook.md) for cross-domain conventions that apply here.

Summarize: what this domain covers, its sub-domains (if any), key entities,
and how it relates to neighboring domains (e.g. references to Student,
EducationOrganization). Cite the live docs.ed-fi.org URL for each file
referenced (see "Linking to live docs" above), not just the repo path.

=== STEP 2: Prior versions (local repo) ===
Check the same relative folder path under version-5, version-4, and version-3
(`dataStandard_versioned_docs/version-{5,4,3}/model-reference/{{DOMAIN_FOLDER_SLUG}}/`).
If the domain didn't exist in an older version, note when it was introduced
instead of treating it as missing. Also scan each version's `whats-new/`
folder for changelog entries mentioning this domain or its key entities.
Produce a short narrative (not a field-by-field diff) of how the domain's
scope or structure has visibly shifted release to release. Cite the live
docs.ed-fi.org URL for each version's files (see "Linking to live docs"
above) — remember to insert the version-number path segment for versions 5, 4, and 3.

=== STEP 3: Certification alignment (local repo) ===
Search `docs/partners/2-certification/available-certifications/**`
(especially `*/use-cases`, `*/test-scenarios`, `*/change-log.md`) for mentions
of this domain's name and its key entity names. Certification content is NOT
organized by domain, so this is a keyword search, not a folder lookup.
Compare what you find against the Step 1 model description. List any
inconsistencies as concrete, actionable notes (quote both sides, cite the
live docs.ed-fi.org URL per "Linking to live docs" above — include the repo
path alongside it if a line number is needed to pinpoint the claim).

=== STEP 4: Design rationale from Jira (Atlassian MCP) ===
Search Jira projects DATASTD and MODL for tickets relevant to this domain:
  JQL: `project in (DATASTD, MODL) AND text ~ "{{DOMAIN_NAME}}"`
  Also repeat with `text ~ "<key entity name>"` for each major entity from Step 1.
Prioritize tickets with substantial descriptions or comment threads that
explain WHY a design choice was made (not routine bug fixes). For each
significant ticket, capture: ticket key + link, one-paragraph summary of the
design decision/rationale, and date/fix version if available.

=== STEP 5: RFC history from Confluence (Atlassian MCP) ===
Search Confluence for RFC documents relevant to this domain. Look among the
descendants of this page:
  https://edfi.atlassian.net/wiki/spaces/rc/pages/712278041/Ed-Fi+Data+Standard+Request+for+Comments+RFC
using the domain name and key entity names as search terms (also run a
general CQL search in case a relevant RFC isn't nested under that page).
For each relevant RFC found, capture: page title + link, date/status, and a
summary of what it proposed and whether/how it was ultimately adopted (per
Steps 1-2 evidence).

=== STEP 6: Synthesize the dossier ===
Write a single page with these sections, in this order:

1. **AI-generated content notice** — one line: "Drafted with AI assistance
   from the sources listed below on {{DATE}}. Review before relying on this
   for design decisions; verify citations independently."
2. **Quick orientation** (3-5 sentences) — what this domain is and why it
   exists, for someone with zero context.
3. **Current state (Data Standard v6)** — entities, sub-domains,
   relationships to other domains, with live docs.ed-fi.org links to the
   source pages (not repo paths).
4. **Historical evolution** — narrative from Steps 2, 4, and 5, in
   roughly chronological order, each claim linked to its Jira ticket,
   RFC, or version doc.
5. **Known inconsistencies / reconciliation needed** — from Step 3,
   plus any contradictions you noticed between Jira/RFC narrative and
   the current model. Written as an actionable punch list.
6. **Open questions / gaps** — anything sources left unclear or
   disagreed on.
7. **Source index** — every file cited above, deduplicated, listed with
   its live docs.ed-fi.org link (repo path in parentheses for anyone with
   repo access), plus every ticket key and Confluence page, so a human can
   audit coverage.

=== STEP 7: Publish (Atlassian MCP) ===
Show the drafted content to the user for review. Do not create the
Confluence page without explicit confirmation.

Once confirmed, create a new Confluence page under
https://edfi.atlassian.net/wiki/spaces/DATASTDDEV/folder/2664398901?atlOrigin=eyJpIjoiNThiMGViN2IzN2Q4NGU5NmI2MmExOTBmNGJjNDBkZDIiLCJwIjoiYyJ9
Title: "Domain: {{DOMAIN_NAME}}"
