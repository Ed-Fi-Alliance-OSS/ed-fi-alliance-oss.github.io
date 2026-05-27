# Accessibility Notes

## Summary

The conversion includes semantic Markdown, tables, and Mermaid diagrams so the content is understandable without relying only on slide screenshots. Full-page screenshots are retained as visual fallbacks and for fidelity review.

## Alt text policy

Alt text summarizes each slide's visual purpose and key information, including chart values when those values are necessary to understand the slide. Decorative branding is described only when it provides orientation.

## Full-page slide alt text

| Page | Image | Alt text |
|---:|---|---|
| 1 | `assets/images/pages/page-01.png` | Cover slide for Ed-Fi Overview and ESA Implementation with the Ed-Fi Alliance logo over a blue-to-pink classroom image. |
| 2 | `assets/images/pages/page-02.png` | Slide describing pain points for state education agencies, education service agencies, and local districts, including timeliness, data quality, cost, staffing gaps, reporting, absenteeism, assessment views, and college/career readiness. |
| 3 | `assets/images/pages/page-03.png` | Diagram showing Ed-Fi connecting states, vendors, ESAs, and districts through a data standard, open-source APIs, and community support. |
| 4 | `assets/images/pages/page-04.png` | Bar chart of state Ed-Fi adoption for reporting: 3 states in 2013, 5 in 2016, 6 in 2019, and in 2022, 8 production states plus 6 implementing states. |
| 5 | `assets/images/pages/page-05.png` | Bar chart of LEA Ed-Fi adoption through ESAs: 65 districts in 2013, 120 in 2016, 165 in 2019, and 1,283 in 2022, labeled as a 7.8x increase. |
| 6 | `assets/images/pages/page-06.png` | Michigan example slide listing new analytics, new tools, and vendor integrations enabled by Ed-Fi, with a quote about immediate information for newly enrolled students improving timely services. |
| 7 | `assets/images/pages/page-07.png` | Slide listing common ESA-driven local use cases: assessment, CCMR, attendance, educator prep, transcript/student transfer, data warehousing, and rostering. |
| 8 | `assets/images/pages/page-08.png` | Slide explaining why ESAs are positioned to provide data services through their existing market role, service opportunity, and ecosystem influence. |
| 9 | `assets/images/pages/page-09.png` | Slide showing South Carolina District Data Governance, Texas Education Exchange, and Michigan DataHub as examples of Ed-Fi-related work already operating. |
| 10 | `assets/images/pages/page-10.png` | Comparison table of three Ed-Fi implementation approaches: do it alone, do it together with standards, and do it together with state vendor support, with the last marked as best practice. |
| 11 | `assets/images/pages/page-11.png` | Slide listing district data-use challenges: low staff capacity, complexity, expensive vendor walled gardens, and slow disconnected data visibility, plus a note that this does not compete with district SaaS tools. |
| 12 | `assets/images/pages/page-12.png` | Architecture diagram showing LEA data sources flowing through an Ed-Fi API into an ESA data hub, analytics and warehouse, then to an SEA Ed-Fi API, data warehouse, and state/federal reporting. |
| 13 | `assets/images/pages/page-13.png` | Other Questions slide with Ed-Fi Alliance contact blocks for David Clements, Solutions Architect, and Eric Jansson, VP Solutions. |
| 14 | `assets/images/pages/page-14.png` | Section divider titled Implementation, noting that remaining slides are for leaders bringing teams on board and that more details are in the knowledge base repository. |
| 15 | `assets/images/pages/page-15.png` | Organizational roles slide showing responsibilities for SEA, LEAs, vendors, and ESAs or data hubs. |
| 16 | `assets/images/pages/page-16.png` | The Four Phases slide showing market research, planning, pilot, and growth with estimated durations, ESA activities, and key success guidance. |
| 17 | `assets/images/pages/page-17.png` | Market Research Phase ESA Tasks slide focusing on value proposition, district and stakeholder conversations, existing services, market fit, and product support. |
| 18 | `assets/images/pages/page-18.png` | Engage Ed-Fi Expertise slide recommending a badged Ed-Fi Managed Service Provider or consultant and explaining how to find MSP support and references. |
| 19 | `assets/images/pages/page-19.png` | Data Mapping and Specifications Development slide contrasting recommended use of an MSP, descriptor guidance, and staff training against several not-recommended practices. |
| 20 | `assets/images/pages/page-20.png` | Planning Phase ESA Tasks slide organized into build timeline, build business plan, and seek funding, with example MVPs and funding sources. |
| 21 | `assets/images/pages/page-21.png` | Pilot Phase ESA Tasks slide showing governance, field integration testing, vendor engagement, bridge funding, MSP contract management, and awareness raising. |
| 22 | `assets/images/pages/page-22.png` | Growth and Expansion Phase slide showing sustainability, go-to-market execution, and state coordination for the school year following the pilot. |
| 23 | `assets/images/pages/page-23.png` | Do this, Not that slide comparing recommended go-to-market, district growth, state-relevant use cases, and statewide ecosystem building against over-scoping, isolation, and non-scalable LEA targeting. |
| 24 | `assets/images/pages/page-24.png` | Slide explaining how to work when the state is already using Ed-Fi for reporting, with a diagram showing SEA data as a subset of local analytics and integration data and a table of key actions and examples. |

## Text-only crawler support

`README_TEXT_ONLY.md` removes full-page images while keeping headings, visual context paragraphs, tables, extracted source text, and Mermaid source.

## Known limitations

- Mermaid diagrams are semantic conversions, not pixel-perfect replicas of the original slide layouts.
- Full-page screenshots are retained when exact layout, branding, or image fidelity matters.
- Extracted embedded images include some slide-level or decorative assets; review `assets/static/manifest.json` before reusing them independently.
- The source PDF text layer was available, so OCR was not used.
