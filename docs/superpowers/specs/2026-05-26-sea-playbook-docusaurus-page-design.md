# Design: SEA Playbook Docusaurus Page

**Date:** 2026-05-26
**Branch:** sea-playbook
**Author:** Robert Hunter

## Goal

Convert the 36-page SEA Ed-Fi Overview and Implementation Playbook PDF slide deck
(already converted to Markdown in `conversions/sea-playbook/`) into a single
Docusaurus page and integrate it into the existing `docs/getting-started/sea-playbook/`
section.

## Source Material

- `conversions/sea-playbook/sea-ed-fi-playbook/sea-ed-fi-playbook/README.md` — full
  slide content with embedded Mermaid and extracted text
- `conversions/.../assets/images/pages/page-XX.png` — full-page PNG renders of each slide
- `conversions/.../assets/diagrams/*.mmd` — Mermaid source files

## Decisions

### Approach: Single page (Option 1)

All 36 slides become one page. The slide deck tells a coherent narrative
(problem → solution → approaches → phases → best practices); splitting it loses
that flow. The existing KB articles in the subdirectories already provide depth;
this page provides the overview arc.

### Integration: Linked from readme (Option B)

The existing `docs/getting-started/sea-playbook/readme.md` stays unchanged except
for one new bullet at the top of the "SEA Knowledge Base" list pointing to the new
page.

### Images: PNG renders as placeholders (Option B)

Slides that are charts or dense comparison tables use the PNG renders inline.
These are acknowledged placeholders — the site convention is that production
images go to Azure blob storage, so they will need to be uploaded and URLs updated
before final publishing. Slides covered by Mermaid or prose do not use PNGs.

## Output Files

| File | Description |
|------|-------------|
| `docs/getting-started/sea-playbook/ed-fi-overview-and-implementation-playbook.md` | New page |
| `static/img/sea-playbook/page-XX.png` | PNG renders for slides that need them |
| `docs/getting-started/sea-playbook/readme.md` | Minor update — one new bullet |

## New Page: Content Outline

`sidebar_position: 2`, title: "Ed-Fi Overview and Implementation Playbook"

| Slides | Section heading | Rendering |
|--------|----------------|-----------|
| 1 | Intro blurb + download links | Prose |
| 2 | Data Pain Points | Prose (SEA vs. district lists) |
| 3 | Ed-Fi's Mission | Mermaid flowchart |
| 4–5 | Adoption Growth | PNG renders |
| 6 | Impact: Nebraska Example | Markdown table |
| 7 | Impact: District Use Cases (Michigan) | Markdown table + blockquote |
| 8 | Three Implementation Approaches | PNG render |
| 9–10 | Reporting + Data Hub: Phases, Architecture | Mermaid flowcharts |
| 11 | Core Implementation Team | PNG render |
| 12 | Risk Mitigation | Mermaid flowchart |
| 13, 36 | Contact slides | Skipped |
| 14, 29 | Section dividers | H2 headings only |
| 15 | The Four Stages | Mermaid flowchart |
| 16, 23, 26, 28 | Phase overviews (per stakeholder) | Prose lists |
| 17, 24, 27 | Planning / Pilot / Parallel SEA tasks | Mermaid flowcharts |
| 18–22, 25 | Best practice sub-topics | Prose + do/don't tables |
| 30 | Technical Task Assignment | PNG render |
| 31, 33, 35 | Vendor comms / LEA comms / data portal | Mermaid diagrams |
| 32, 34 | Six / Four keys to readiness | Numbered lists |

## PNG Renders Needed

Only slides that are not fully covered by Mermaid or prose:

- `page-04.png` — state adoption chart
- `page-05.png` — district adoption chart
- `page-08.png` — three approaches comparison table
- `page-11.png` — core team table
- `page-30.png` — technical task assignment table

All five are copied to `static/img/sea-playbook/`.

## Markdown Conventions

Follow existing repo conventions:
- Emphasis: `_underscores_`
- Bullets: dashes
- Fenced code blocks with language identifier
- Admonitions: `:::tip`, `:::note`, etc.
- No inline HTML except allowed tags

## Out of Scope

- Uploading images to Azure blob storage (deferred; placeholders are sufficient for review)
- Changes to any KB articles in the subdirectories
- Changes to any other files outside the three listed above
