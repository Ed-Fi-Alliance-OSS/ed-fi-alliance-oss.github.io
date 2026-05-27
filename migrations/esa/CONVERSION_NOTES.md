# Conversion Notes

## Source

- Source PDF: `original/educational-service-agency-esa-playbook.pdf`
- Page count: 24
- Conversion date: 2026-05-27

## Tooling

- PyMuPDF (`fitz`) was used to extract page text, render full-page PNGs, and extract embedded images.
- Manual semantic conversion was used for tables, charts, process diagrams, and architecture diagrams.

## Mermaid conversions

The following pages include editable Mermaid diagrams:

| Page | Diagram file | Purpose |
|---:|---|---|
| 3 | `assets/diagrams/page-03-edfi-interoperability.mmd` | Ed-Fi stakeholder interoperability map. |
| 4 | `assets/diagrams/page-04-state-adoption-chart.mmd` | State adoption chart. |
| 5 | `assets/diagrams/page-05-lea-adoption-chart.mmd` | LEA adoption chart. |
| 7 | `assets/diagrams/page-07-local-use-cases.mmd` | ESA-driven use-case mind map. |
| 10 | `assets/diagrams/page-10-implementation-approaches.mmd` | Implementation approach relationship summary. |
| 12 | `assets/diagrams/page-12-reporting-data-hub-architecture.mmd` | Reporting + data hub architecture. |
| 15 | `assets/diagrams/page-15-organizational-roles.mmd` | Organizational roles and communication relationships. |
| 16 | `assets/diagrams/page-16-four-phases.mmd` | Four-phase implementation timeline. |
| 21 | `assets/diagrams/page-21-pilot-phase-tasks.mmd` | Pilot phase task flow. |
| 22 | `assets/diagrams/page-22-growth-expansion.mmd` | Growth and expansion flow. |
| 24 | `assets/diagrams/page-24-local-vs-sea-data.mmd` | Local analytics data versus SEA reporting data and actions. |

## Static asset policy

- Every PDF page was rendered to `assets/images/pages/page-XX.png`.
- Embedded images larger than a small-icon threshold were extracted to `assets/static/`.
- The Markdown primarily references full-page screenshots and Mermaid diagrams; extracted static assets are provided for reuse and review.

## Review checklist

- [x] Every source PDF page is represented.
- [x] Original PDF is included in `original/`.
- [x] Page images exist for every page.
- [x] Mermaid files exist for converted diagrams.
- [x] Tables and comparison slides are represented as Markdown where practical.
- [x] Every full-page image has alt text.
- [x] Text-only version can be understood without images.
- [ ] Manually validate Mermaid rendering in the target Docusaurus site.
- [ ] Review extracted static assets and remove decorative duplicates if not needed.
