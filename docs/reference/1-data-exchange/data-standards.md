---
sidebar_position: 0
---

# About the Ed-Fi Data Standards

## Active Versions

### Version 5.x

Version 5.0 was released in 2023 and again modified in 2024 with minor releases
5.1 and 5.2. This version is intended to support school years 2024-2025,
2025-2026, 2026-2027, and 2027-2028.

➡️ [Documentation for 5.x](/reference/data-exchange/data-standard/)

### Version 4.0

Version 4.0 was released in 2022, following a prior convention of breaking
changes in consecutive years followed by a year with no breaking changes. This
version is intended to support school years 2024-2025, 2025-2026. There is no
plan for a 4.1 or other minor release.

➡️ [Documentation for 4.0](/reference/data-exchange/data-standard/4/)

### Version 3.x

Version 3.0 was released in 2018 and received several updates until 2022,
through version 3.3.1. School year 2024-2025 will be the last year to support
Data Standard 3.3.1; older 3.x releases are already out of support.

➡️ [Documentation for 3.3](/reference/data-exchange/data-standard/3/)

## Data Standard Principles

Those new to the Ed-Fi Community, particularly those with expertise in other data domains, often have questions about the data covered by the Ed-Fi Data Standards — why some pieces of information are included while others are not, why we bother with an extension model in a "standard," and other good questions. Brief answers to the big questions follow.

### Our Core Principles

There are a number of standards in the K–12 education space or that intersect with that space, and understanding how organizations develop those standards is important. The core principles that inform how we work are:

* **The standards center on exchange of data related to student academic outcomes.** This is not to say that the standards won't evolve to cover related areas, like teacher credentialing, student food service eligibility, bus routes, or a myriad of other things that make up the school life of a student. All of those things are important and contribute to student performance. But, the polestar for the Ed-Fi Data Standards is to surface and make useful the data that is most directly relevant in decision making related to teaching and learning.
* **The standards rely on proven field work.** The standards focus on what has already been shown to work in field projects, not on what might theoretically work. This is one reason why the Alliance and community focus their efforts on producing robust software components that implement and use the standards. Of course, it is not always possible or efficient to implement first given the competing demand for timeliness and community agreement. In such cases, tiebreakers between designs are made based on the weight of available field evidence.
* **The standards work hard to balance standardization with customization.** The real world demands flexibility that challenges the power of standardization, but that also drives adoption. Handled correctly as a community, customization is an opportunity for further exploration and evolution of standards. Ed-Fi standards recognize both sides of this equation, and this is seen most specifically in the extension system for the Ed-Fi Data Standards.

### What do the Ed-Fi Data Standards cover?

The Ed-Fi Data Standards focus on K–12 information related to students and their academic performance. The standards cover:

* Directly related information, such as student names, assessment scores, report card data, and transcript data.
* Indirect-but-relevant information, such as enrollments, student class schedules, graduation plans, links to teachers, and links to programs.
* Common leading indicator and common research information, such as attendance and discipline records.
* Common disaggregation variables, such as demographic data.
* Useful roster information such as contact information, student IDs, and parent/guardian information.
* Basic information from students' Pre-K and postsecondary experiences.

The standards are student-centric, meaning that detailed data is described at the individual student level. Many Ed-Fi products aggregate or otherwise process information to give a look at school, district, and state-level trends – but central to our philosophy is that any aggregation should be calculated based on student-level information, since each student's story is unique.

### What standards do the Ed-Fi Alliance publish?

The Alliance publishes a number of normative and non-normative standards.

Normative standards include API endpoint descriptions and JSON messages. The [API Technical Design and Implementation Guidelines](./api-guidelines/readme.md) contains additional normative and non-normative documentation. The [Ed-Fi Unifying Data Model](./udm/readme.md) is a logical model only and non-normative.

### What is the purpose of the Ed-Fi Unifying Data Model?

The Ed-Fi Unifying Data Model (UDM) serves a special function in the Ed-Fi technology suite. The Ed-Fi UDM is an abstract model that specifies the organization, structure, and types for all concrete Ed-Fi Data Standards and Ed-Fi technology – meaning that elements like Student First Name will contain similar and analogous definitions in all Ed-Fi products, including API endpoints, XSD definitions, ODS SQL tables, and so forth.

The UDM exists primarily to reconcile all published Ed-Fi standards to ensure they work together. It takes more effort as a community to maintain and ensure this harmonization via the UDM, but the experience of many data standards efforts shows that it is common to produce specifications with conflicting underlying data models, which results in complexity and incompatibility in actual data systems in the field.

### Why are Ed-Fi Data Standards extensible? Doesn't that work against interoperability?

Extensibility exists in a natural state of tension with standardization – and the Ed-Fi Data Standards are no exception. However, all our field work has shown that extensions are a necessary complexity in the K–12 education space. Schools, districts, and state education agencies are often required by law to track or report certain data unique to their environment, but that otherwise directly relates to the information covered by the Ed-Fi Data Standards.

Rather than deny implementers the means to extend the standards, the Alliance issues non-normative Extension Framework Guidelines for each technology component. These guidelines are updated with each version, with the goal of increasing flexibility while getting as close as possible to perfect interoperability.

## Data Standard Governance

The Ed-Fi Data Standards are not static, nor is the Ed-Fi Unifying Data Model intended to fulfill every possible use case. For this reason, the Alliance has a governance process that allows for gradual change.

The process also supports the creation and publication of standards for leading-edge work, and the publication of standards that support technology aligned to the Alliance's mission – even if that technology is not baked into the Ed-Fi core technology offerings.

### What are the classes of Ed-Fi Data Standards?

As noted, the Alliance may publish standards that aren't necessarily part of the Ed-Fi technology core offerings. This section outlines the distinctions.

#### Standard

The Core Standard contains data elements that are part of our student-centric, academically focused K–12 data model. These standards are directly developed by (or under the auspices of) the Ed-Fi Alliance.

Data elements in Core Standards are found in the Ed-Fi Unifying Data Model and the Ed-Fi Data Handbook, and generally adhere to Ed-Fi Design and Implementation Guidelines.

#### Request for Comment

Request for Comment (RFC) versions contain data elements and models proposed for use by the community, but not yet part of core standards. It is expected that elements and exchanges defined in RFCs will be implemented in field usage in order to find issues and refine the model further. However, those using RFC versions should be cautious to stay on the latest versions, in order to avoid fragmenting the ecosystem, as early iterations naturally occur more frequently.

#### Data Standard Certification

The Ed-Fi Alliance has a certification program that covers many use cases based on its Core Standards.

Ed-Fi certifications allow product developers to demonstrate a product's fidelity to Ed-Fi standards and guidelines, and for purchasers or users to be confident that a product conforms to those same Ed-Fi standards and guidelines. The program's goal is to ensure that systems can inter-operate and exchange data using Ed-Fi standards and technology.

The Ed-Fi certification program was developed from the experience of education agencies in certifying Ed-Fi-compliant data exchanges for their enterprise systems. The Ed-Fi Alliance has built on that foundation to provide a certification that can be used across different agencies and organizations, alleviating the need for vendors to undergo multiple, overlapping local quality assurance efforts.

Information about the Ed-Fi Certification Program [can be found here](/partners/certification).

## Data Standard Development

The Ed-Fi Alliance doesn't develop standards in a vacuum. It relies on field work and community expertise to produce solid, workable solutions. The Alliance's role in data standard development is a coordinating one: it sets schedules, assigns (and often funds) development work on the standard, arranges for field testing, shepherds draft standards through an RFC process, and publishes the final, authoritative artifacts.
