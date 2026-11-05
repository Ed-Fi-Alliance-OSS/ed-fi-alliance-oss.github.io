# Ed-Fi Technology Roadmap: Fall 2026

<!--
Source material for a slide deck. Each H1/H2 heading starts a new slide.
"Speaker notes" blocks are talking points, not slide text.
Primary source: blog/2026-11-05.md. Supporting: 2025-10-09, 2026-03-25, 2026-04-27,
2026-05-11, 2026-07-15, 2026-09-30, 2026-10-14, 2026-10-22.
-->

## Title Slide

What we shipped, what is next through 2027, and where we need your input

Presented by the Ed-Fi Alliance product team

---

## Today's Headline: Ed-Fi API 8.1

**Ed-Fi API 8.1 is released today.**

- Follows the milestone **8.0** release this summer
- Production-ready for the 2027-2028 school year
- The culmination of years of work by the Alliance and the community

---

## Agenda

1. Ed-Fi API 8.1: today's release
2. The year in review
3. Planning principles and priorities
4. Data Standard: 6.2 and 7.0
5. ODS/API and OneRoster: staying stable
6. Tools and tooling
7. Timeline at a glance
8. How to give feedback

---

## The Year in Review

**Delivered in 2026:**

- **Data Standard 6.1** (May): Special Education Data Model (early access), education organization responsibility for a student
- **ODS/API 7.3.2** (May): Data Standard 6.1, .NET 10, OneRoster integration
- **Ed-Fi OneRoster Service** (May): OneRoster 1.2, SQL Server and PostgreSQL
- **MetaEd 4.7** (May) and **4.8** (July)
- **Ed-Fi API v8.0** (July): the next-generation platform
- **Ed-Fi API 8.1** (today): production-ready for 2027-2028
- **Certification Suite 2.1** (July): Data Standard 5 coverage complete
- **API Publisher 1.4** (October): Ed-Fi API v8 support, cursor paging, resumable runs

Speaker notes:

- Data Standard 6.0 and ODS/API 7.3.1 went out in November 2025, so this is a full year of releases.
- Also released: Admin App 4.0 and Admin API 2.3 (December 2025).
- Data Import reached end of life with v2.4. No further features are planned.

---

## Roadmap Versus Reality

**What we said at Summit 2025, and what happened:**

| Item | Summit 2025 forecast | Outcome |
| --- | --- | --- |
| Data Management Service 1.0 | Q1 2026 (with a question mark) | Released July 2026 as **Ed-Fi API v8.0** |
| Data Standard 6.1 | Spring 2026 | Released May 2026 |
| ODS/API 7.3.2 | Q2 2026 | Released May 2026 |
| OneRoster API | Q1 2026 | Released May 2026 |

- The relational backend decision (March 2026) is the main reason v8 landed later than first hoped
- Dates are targets, not commitments

Speaker notes:

- Be candid here. The v8 timeline moved because the team changed the data store to a fully relational design based on community feedback.
- Verify the table against current release dates before presenting.

---

## Planning Principles

- **Stable cadence:** 1-2 releases per year of each product, spaced through the year
- **Evolving portfolio:** products and their capabilities continue to change
- **Budget-informed:** the completed budget cycle determines what and how much we can build
- **Transparent:** every item links to a tracking issue in the public roadmap

[Ed-Fi Technology Roadmap](https://docs.ed-fi.org/reference/roadmap/)

---

## Priorities, in Order

1. **Data Standard alignment:** help agencies and vendors align to the core Data Standard, and measure progress
2. **Data Standard 7.0:** a breaking-change release focused on priority domains and simplification
3. **Ed-Fi API 8 adoption:** non-breaking features that lower operating and integration costs
4. **Administrative tooling and certification:** keep large-scale deployments cheap to administer
5. **Stability for the existing platform:** ODS/API, Admin API, Admin App, and OneRoster stay stable while adoption moves to v8

---

## Roadmap at a Glance

| Release | Target |
| --- | --- |
| **Ed-Fi API 8.1** | **Released today** |
| API Publisher 1.5 | 2026-Q4 |
| OneRoster API Service 1.1 | 2026-Q4 |
| ODS Admin API 2.5 | 2026-Q4 |
| Admin App 4.2 | 2026-Q4 |
| Data Standard 6.2 | 2027-Q1 |
| ODS/API 7.3.3 | 2027-Q1 |
| Ed-Fi API 8.2.0 | 2027-Q2 |
| Data Standard 7.0 | 2027-Q2 |

Speaker notes:

- Milestones are quarterly.
- Admin API 2.5 and Admin App 4.2 are listed as Q4 but the text expects December or January.
- A fall 2027 Ed-Fi API 8.3.0 is planned, but scope is not yet committed.

---

## Section: Data Standard

---

## Two Releases in Parallel

**Split so that easy wins do not wait on breaking changes:**

| | **Data Standard 6.2** | **Data Standard 7.0** |
| --- | --- | --- |
| Type | Non-breaking | Breaking |
| Target | 2027-Q1 | 2027-Q2 |
| Delivered via | ODS/API 7.3.3 and Ed-Fi API 8.x | Ed-Fi API v8 only |
| Goal | Easy wins, workforce changes | Simplify, reduce state extensions, clarify usage |

---

## Data Standard 6.2

Targeted for **2027-Q1**, early enough for school year 2027-2028

- Multiple section enrollment for Course Enrollment and Course Transcript
- Responsible Contact for Special Education
- `educationOrganizationCategories` optional on EducationOrganization sub-types
- Individual Graduation Plan (IGP)
- A Validation API

**Everything in 6.2 is non-breaking.** If your integration works on 6.1, it should keep working.

Speaker notes:

- Delivered first through ODS/API 7.3.3.
- Included by default in Ed-Fi API 8.2.
- Because of the v8 architecture, it can also be swapped in for Data Standard 6.1 in Ed-Fi API 8.1 for anyone who does not want to wait.

---

## Data Standard 7.0

Targeted for **2027-Q2**. A **breaking** release.

Three goals:

1. Simplify integrations for incoming and outgoing data
2. Reduce the number of state extensions
3. Clarify the intended usage of existing entities

**Only available on Ed-Fi API v8. Not released via ODS/API.**

---

## Data Standard 7.0: Candidate Changes

Currently 13 sub-issues. Scope is still moving.

- Staff and Performance Evaluation domain updates
- Special Education and Intervention domain updates
- Program updates and Section historical begin/end dates
- `GenerationCodeSuffix` replaced by `GenerationCode`
- Student Application (charter waitlist) support
- Multiple bus routes for StudentTransportation
- Education organization reference on StudentContactAssociation

**The bar for inclusion:** three or more states needing the same change

Speaker notes:

- Earlier thinking (October 2025) also floated `SchoolYearType` to `SchoolYear`, a Finance domain, and a Gradebook domain. These are not in the current candidate list, so do not present them as planned.
- This is the most valuable place for audience feedback.

---

## Metadata Catalog and Scoring Engine

**Measuring and reducing complexity in state Ed-Fi implementations:**

- **Metadata Catalog:** database, ingestion process, and dashboard for state data collection specifications
- **Scoring engine:** rules engine that automates complexity scoring, with human override
- Built on the [NACHOS](https://docs.ed-fi.org/getting-started/sea-playbook/data-governance/overview-of-the-NACHOS-scoring/) scoring algorithm
- Internal tool today; **in 2027, we expect to open it to state leaders** to study their own scores
- Scores are visible to states only, not public and not shared with vendors
- Exploring anonymous browsing of ingested data collection _rules_

_Not yet on the public GitHub roadmap views._

---

## Section: Ed-Fi API v8

---

## Ed-Fi API 8.1 Is Here

**Released today, November 5, 2026.**

- The release that takes Ed-Fi API v8 to **production** for the 2027-2028 school year
- Built for the needs of state education agencies and statewide deployments
- Faster than the ODS/API on PostgreSQL across every workload we tested
- The payoff of a multi-year effort, from Project Meadowlark to Project Tanager to Ed-Fi API v8

Speaker notes:

- This is the headline of the talk. Pause here and let it land before moving on.
- Confirm the final feature list against the 8.1 release notes before presenting. The items on the next slides come from the API FAQ, the September performance post, and the MetaEd 4.9 and API Publisher 1.4 documentation, not from the 8.1 release notes themselves.

---

## Why 8.1 Matters

8.0 proved the architecture. **8.1 is the release you can build production on.**

- **SQL Server gaps closed:** both PostgreSQL and SQL Server are now first-class data stores
- **Consistent bulk reads:** snapshot support and cursor paging, which API Publisher 1.4 already takes advantage of
- **Built for SEAs:** the detailed client authorization and raw-data access that statewide warehousing and reporting require
- **Performance:** ahead of ODS/API 7.3.2 on PostgreSQL for writes, deep paging, and filtered reads
- **Data Standard 5.2 and 6.1** supported; **MetaEd 4.9** adds 8.1 as a target

Speaker notes:

- 8.0 did not have complete parity with the optional features of the ODS/API, and was aimed at early adopters and pilots. 8.1 is the release that closes the most important gaps.
- The FAQ describes 8.1 as the SEA-oriented release.

---

## A Multi-Year Journey: Three Names, One Goal

**A cloud-native replacement for the ODS/API, in three chapters:**

1. **Project Meadowlark** (R&D, shut down January 2024): a proof of concept built on NoSQL document storage. Its lessons shaped the 2024 roadmap.
2. **Project Tanager and the Data Management Service** (2024-2026): the project and the product that carried those lessons toward production, announced at Tech Congress 2024.
3. **Ed-Fi API v8** (2026): the production release of the Data Management Service. 8.0 in July, 8.1 today.

Nearly three years from the close of Meadowlark to today's 8.1 release.

Speaker notes:

- Project Tanager is the code name for the _project_; the Data Management Service was its key _product_. Ed-Fi API v8 is that product's production name.
- Meadowlark is documented only on its project page (docs/getting-started/community-tools/technology/project-meadowlark.md). Its last release was Milestone 0.5.0 in January 2024. Earlier history is not covered in the blog.
- The blog posts from this period carry a note that Ed-Fi API v8 is the production release of the DMS, which is useful for audience members who remember the earlier names.

---

## Milestones Along the Way

| When | Milestone | What it proved |
| --- | --- | --- |
| May 2024 | Tanager FAQ at Tech Congress 2024 | The community wants an ODS/API successor and has questions |
| June 2024 | **0.1** | PostgreSQL-backed API: validation, persistence, Resources, Descriptors, and Discovery APIs |
| August 2024 | **0.2** | Referential integrity and descriptor validation |
| March 2025 | **0.4** | Configuration Service, OAuth with Keycloak, namespace-based authorization |
| April 2025 | Tech Congress 2025 | Call for community posters showing use cases for the platform |
| June 2025 | **0.5** | MetaEd-based extensions, SDK generation, relationship-based authorization |
| July 2025 | **0.6 (release candidate 1)** | Swagger UI, template databases, end-to-end and compatibility testing |
| December 2025 | **0.7** | Multi-tenancy, built-in identity provider, OpenSearch removed |
| March 2026 | Relational backend decision | Familiar, joinable tables for ODS-experienced teams |
| July 2026 | **8.0** | A new platform: the summer milestone |
| October 2026 | Pilot Test Kit | Real client integrations tested against v8 |
| November 2026 | **8.1** | Production-ready |

Speaker notes:

- The 0.3 milestone has no blog post in the source material, so it is not listed.
- Show a subset on the slide if the table is too long, for example 0.1, 0.4, 0.7, 8.0, 8.1.

---

## Listening Shaped the Design

**The architecture changed as the community and the evidence spoke:**

- **Documents to relational tables:** the data store moved from document-style storage to a fully relational design (March 2026), so ODS-experienced teams find it familiar
- **Search engine removed:** PostgreSQL alone met read and write needs, so OpenSearch and Elasticsearch were dropped in 0.7 (December 2025). This lowered cost and complexity, especially in multi-tenant deployments.
- **Streaming became optional:** Kafka went from required to optional
- **Built-in identity provider:** no external identity server needed for a standard deployment

Speaker notes:

- The original plan for GET by query leaned on Debezium, Kafka, and OpenSearch (see the 0.2 post). It is a good story about being willing to simplify.

---

## The Summer Milestone: Ed-Fi API v8.0

**A new platform, not an incremental ODS/API update. The long-term replacement for the ODS/API.**

- **Relational storage** (PostgreSQL or SQL Server): dedicated tables per resource
- **Multi-tenancy** with database-level data isolation
- **Profiles:** readable and writable
- **Changed Record Queries**
- **Self-contained identity provider** (OpenIddict); Keycloak still supported
- **Docker-based deployment**

Two services: **Ed-Fi API** (Resources, Descriptors, Discovery) and **Configuration Service** (Management API)

---

## Performance: Ed-Fi API 8.1 Versus ODS/API 7.3.2

| Workload | PostgreSQL | SQL Server |
| --- | --- | --- |
| Volume (writes) | 5.6% higher throughput | Behind |
| DeepPaging | 34% lower latency | Near tie |
| FilteredRead | 1.7x faster | Near tie |

- On PostgreSQL, 8.1 wins on every workload we tested
- Advantage is mostly lower database CPU on reads
- SQL Server write gap is traced to change-version stamp triggers; a fix is scoped
- Single runs on tuned PostgreSQL. A snapshot, not a guarantee for your deployment.

Speaker notes:

- Measured on the pre-release 8.1 code with the Suite-3 performance suite and the Northridge dataset. The September post said further database changes were still being finalized, so confirm the numbers still hold for the released build.
- Be careful with SQL Server wording: it is behind on writes, and the blog is explicit about that. Improved SQL Server performance is on the 8.2.0 list.

---

## Adopting 8.1

- **New implementations and pilots:** start on 8.1
- **Teams running 8.0:** plan to upgrade to 8.1, and expect to re-provision your databases
- **Production target:** school year 2027-2028
- **ODS/API users:** you have runway; ODS/API is fully supported through the 2028-2029 school year

[Ed-Fi API v8 FAQ and migration guidance](https://docs.ed-fi.org/reference/roadmap/api-faq)

---

## Pilot Test Kit: Try v8 With Your Integration

Internal testing shows how v8 behaves for _us_. Pilots show how it behaves for _you_.

- Docker Compose environment: `git clone` to first authenticated API call in under an hour
- Looking for three integration shapes: **SIS** (write-heavy), **Assessment providers** (write, narrow), **Warehouse and analytics** (read-heavy)
- Results anonymous unless you opt in; no bearing on Ed-Fi Certification
- Synthetic data only; local development only

Coming: ODS/API comparison environment and log-based report scripts

[Pilot Test Kit on GitHub](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-API-v8-pilot-testing-kit)

---

## What's Next: Ed-Fi API 8.2.0

Targeted for **2027-Q2**, a quick follow-up to 8.1

- **Integrated OneRoster:** one application serves Ed-Fi and OneRoster 1.2 endpoints
- **Lineage tracking** in GET output
- **Improved SQL Server performance**
- **Universal Vendor ID**

**Design constraint:** minimize data structure changes. Operators should be able to take this release without a migration project.

**Fall 2027:** 8.3.0 planned, scope not committed.

---

## How 8.x Work Is Prioritized

Priority goes to work that:

- **Reduces platform operating costs**, or
- **Reduces vendor integration costs**

If a proposed feature does neither, expect it to wait.

---

## Section: ODS/API and OneRoster

---

## Existing Platform: Stable, Supported

- ODS/API remains in production and **fully supported through the 2028-2029 school year**
- Focus: routine maintenance and limited, approved enhancements
- Adoption shifts to Ed-Fi API v8 over time

[ODS/API and Ed-Fi API v8 FAQ](https://docs.ed-fi.org/reference/roadmap/api-faq)

---

## ODS/API 7.3.3

Targeted for **2027-Q1** (no later than February). A maintenance release.

- Data Standard 6.2 support
- Bug fixes
- [Caching performance improvements](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/issues/177) (still up for debate)
- NuGet package updates

_Tell us if the caching work matters to you._

---

## OneRoster Service 1.1.0

Targeted for **2026-Q4**, in progress

- Release version **1.1.0**; implements **OneRoster 1.2**. The two version numbers are independent.
- Adds Data Standard 6.1 (alongside 4.0 and 5.2)
- Bug fixes and performance improvements

**Long term:** OneRoster merges into Ed-Fi API v8 (see v8.2.0). The standalone service stabilizes rather than expands.

---

## Section: Tools

---

## API Publisher

**1.4 shipped October 22:**

- Ed-Fi API v8 support, in any combination with ODS/API
- Cursor paging for faster reads of large sources
- Resumable runs
- Exit codes that report lost documents
- Moves to .NET 10

**1.5 targeted for 2026-Q4:**

- JSON configuration file support
- Expanded test coverage
- Documentation and build cleanup

---

## Admin Tooling and Certification

**ODS Admin API 2.5 and Admin App 4.2** (December or January)

- Support for managing the vendor certification process
- Primarily for internal use; state education agencies could adopt for localized certification

**Investment focus:**

- Cost-effective administration at large scale
- Certification automation
- Push-button sandbox management

---

## Section: Cross-Cutting

---

## AI, Quality, and Documentation

**Committed:**

- AI-assisted development, emphasizing security, quality, and timeliness over output volume
- Security assurance: targeted vendor-led testing plus AI-based testing aligned to each release
- Documentation improvements on docs.ed-fi.org and the Fiona community support agent

**Exploratory (not committed):**

- [Ed-Fi SDK for AI coding assistants](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-SDK-for-AI-Assistants)
- [Ed-Fi MCP prototype](https://github.com/Ed-Fi-Exchange-OSS/Prototype-Semantic-Layer-with-MCP)
- Pursued opportunistically or with separate funding

---

## Timeline

| Quarter | Milestones |
| --- | --- |
| **2026-Q4** | **Ed-Fi API 8.1 (today)**, API Publisher 1.5, OneRoster Service 1.1, Admin API 2.5, Admin App 4.2 |
| **2027-Q1** | Data Standard 6.2, ODS/API 7.3.3 |
| **2027-Q2** | Ed-Fi API 8.2.0, Data Standard 7.0 |
| **2027 fall** | Ed-Fi API 8.3.0 (scope TBD) |

_Dates are quarterly targets, not commitments._

---

## What to Plan For

- **Data Standard 7.0 is breaking.** Review candidate changes now for impact on integrations and extensions.
- **Data Standard 6.2 is safe to adopt** early for school year 2027-2028.
- **Start on Ed-Fi API 8.1.** New implementations and pilots should begin there. Teams on 8.0 should plan to upgrade and re-provision databases.
- **Join the pilot** if you are a SIS, assessment, or warehouse integrator.
- **ODS/API users have runway** through the 2028-2029 school year.
- **.NET 8 support ends in November 2026.** Make sure deployments are on a supported runtime. ODS/API 7.3.2 and API Publisher 1.4 target .NET 10.

---

## How You Can Help

**Most useful feedback right now: Data Standard 7.0 scope:**

- Does a state extension of yours benefit other states?
- Would a proposed breaking change hurt your integration?
- Three or more states needing the same change moves things.

**Where to engage:**

- [Data Standard 7.0 issue](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/issues/46)
- [Roadmap boards](https://github.com/orgs/Ed-Fi-Alliance-OSS/projects/1)
- [Ed-Fi Community Hub](https://community.ed-fi.org/)

---

## Resources

- [Ed-Fi Technology Roadmap](https://docs.ed-fi.org/reference/roadmap/)
- [ODS/API and Ed-Fi API v8 FAQ](https://docs.ed-fi.org/reference/roadmap/api-faq)
- [What's New in Ed-Fi API v8.0](https://docs.ed-fi.org/reference/ed-fi-api/8/whats-new/whats-new-in-this-release)
- [Ed-Fi API v8 Pilot Test Kit](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-API-v8-pilot-testing-kit)
- [Roadmap Update for the Ed-Fi Data Standard and Technology Suite (October 2025)](https://docs.ed-fi.org/blog/2025/10/09/)

**Questions?:**
