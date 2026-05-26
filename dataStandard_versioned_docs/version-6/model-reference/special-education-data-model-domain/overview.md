---
sidebar_position: 1
---

# Special Education Data Model Domain - Overview

:::important

EARLY ACCESS DOMAIN (Released in version 6.1) - This domain is being released in order to allow early adopters a chance to preview and test the proposed update and provide feedback
on its viability for possible future enhancements. This domain may change outside of the standard Ed-Fi breaking change release cycle if deemed necessary by the community. See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.

:::

## Overview

The Special Education Data Model (SEDM) was designed by PCG, AEM, and Education Analytics to be included in the Common Education Data Standards. Built with six business drivers in mind, SEDM focuses on both Individuals with Disabilities Education Act (IDEA) requirements and the Individual Education Program (IEP) as core entities, SEDM supports longitudinal analysis, evidence-based compliance reporting, and clearer interpretation of special education obligations. For Ed-Fi Data Standard adopters, it has the potential to solve many of the problems found in the existing StudentSpecialEducationProgramAssociation.

## Key Entities

This domain contains:

* The `IDEAEvent` entity, which captures legally significant events required under IDEA—such as referrals, evaluations, parental consent, and IEP meetings—as discrete, auditable records. Each event has a type, begin date, and optional compliance and reason descriptors. Explicitly modeling these events enables systems to reconstruct procedural timelines and demonstrate compliance based on evidence rather than inference.
* The `StudentIEP` entity, which represents a student's Individualized Education Program as a first-class, time-bound legal document. It anchors special education data to the plan finalized at a specific point in time, preserving IEP effective periods, amendments, and historical continuity across school years and organizational changes.
* The `StudentIEPGoal` entity, which captures measurable annual goals established as part of an IEP, including their achievement periods and intended outcomes. Goals are tied directly to the IEP document so that progress can be evaluated relative to the plan in effect when the goals were set.
* The `StudentIEPServicePrescription` entity, which defines the services a student is entitled to receive under a specific IEP, including the type, frequency, duration, and effective dates of each prescribed service.
* The `StudentIEPServiceDelivery` entity, which records the actual delivery of services prescribed in the IEP, including when services occurred and who provided them. Modeling service delivery explicitly enables districts and states to assess whether services were provided as required, rather than assuming delivery based on enrollment or staffing data.

## Key Concepts

The key concepts include the following:

* **IDEA Events precede the IEP.** IDEAEvents typically occur before a `StudentIEP` is created—capturing referrals, evaluations, and parental consent before the plan is finalized. Because of this, `IDEAEvent` is modeled as a separate entity. A `StudentIEP` may optionally reference the IDEA events that led to or are associated with it, and vice versa.
* **IEP amendments create new records.** When an IEP is amended, a new `StudentIEP` record should be created with the updated data rather than modifying the existing record. The `IEPAmendedDate` field on the new record maintains a clear audit trail and preserves the historical record of which IEP was in effect at any given time.
* **Service prescription and delivery are modeled separately.** `StudentIEPServicePrescription` records what services are required under the IEP; `StudentIEPServiceDelivery` records what was actually provided. This distinction supports evidence-based compliance reviews, progress monitoring, and retrospective analysis of service implementation.
* **The IEP is independent of program enrollment.** The `StudentIEP` is not anchored to a local program definition. This improves portability across LEAs and SEAs, ensures IEP history is preserved when students transition, and reduces ambiguity about which plan was in effect when services were delivered.

## Business Drivers

### IDEA Reporting and Compliance

Accurate IDEA reporting depends on representing special education activities as discrete, time-bound, auditable records rather than as side effects of enrollment or program participation. Modeling IDEA events, IEPs, service prescriptions, and service delivery as explicit entities enables precise reconstruction of statutory timelines and procedural safeguards required for federal and state reporting. The model preserves when decisions were made, why they were required, and what actions resulted—without overwriting historical context as IEPs are reviewed, amended, or replaced.

### Compliance Monitoring

State departments of education are required to monitor school districts to ensure that each student with a disability receives a Free Appropriate Public Education (FAPE), that each family has the benefits of a system of procedural safeguards, and that each school district is adhering to the compliance requirements set forth in IDEA. By modeling IDEA events, service prescriptions, and service delivery as discrete, auditable records, SEDM provides the evidentiary foundation state agencies need to conduct general supervision and demonstrate that obligations under IDEA are being met at the district level.

### Whole Learner Progress Monitoring

Effective progress monitoring extends beyond tracking IEP goal attainment to encompass the fidelity of implementation of accommodations and services, surfacing insights for classroom instructors, school and district educators, parents, and learners. While most districts restrict their progress monitoring to the goals specified in each IEP, a broader set of indicators supports a whole child, strength-based approach—providing the data needed to recommend changes in services and improve cost effectiveness over time.

### IEP Portability

Modeling the IEP as a first-class, portable entity; independent of program participation, ensures that IDEA events, prescribed services, and delivery records can be exchanged and interpreted consistently across jurisdictions. This improves interoperability, preserves the intent and effective dates of the plan, and supports continuity of services when students transition between LEAs or SEAs.

### Teacher Talent Pipelines and Professional Learning Communities

The special education workforce faces a significant and growing shortage: approximately 46,000 special education teachers leave public schools every year, while teacher preparation programs are training fewer than 30,000 new ones to replace them. Recent federal action has added teaching to the list of registered apprenticeships eligible for WIOA funding, and Grow Your Own (GYO) programs are springing up across the country in response. By grounding staffing decisions in anticipated service demand derived from IEP data, districts and states can calculate supply and demand gaps and address them proactively. The model also supports identification of where additional technical assistance, coaching, and professional development are most needed.

### Strategic Planning, Research, and Action Planning

Strategic planning and continuous improvement in special education depend on an analytic model of valid metrics that can be implemented through business intelligence tooling—ranging from single metric facts with dimensions to more complex statistical relationships between multiple metrics. This analytical work must be grounded in solid data science applied to modern education theory, enabling education leaders to move beyond compliance-oriented reporting toward evidence-based planning and action.

## Differences from StudentSpecialEducationProgramAssociation

Prior to the SEDM domain, the primary way to represent special education in the Ed-Fi Data Standard was through the `StudentSpecialEducationProgramAssociation` (SSEPA) resource. The SSEPA associates a student with a locally defined special education program and contains elements that closely resemble an IEP. The SEDM domain does not replace the SSEPA—program participation data should continue to be recorded there. The SEDM entities model the IEP and its associated activities as legally significant records, complementing the existing program enrollment model.

The table below summarizes the key structural differences between the two approaches.

| Characteristic | StudentSpecialEducationProgramAssociation | SEDM Domain |
|---|---|---|
| **Primary anchor** | Local program enrollment | The IEP document itself |
| **IEP representation** | IEP-like fields embedded in the program association | `StudentIEP` as a standalone, time-bound entity |
| **IEP history** | Changes require overwriting dates or creating new program associations | Amendments create new `StudentIEP` records, preserving full history |
| **IDEA events** | Not represented | Modeled explicitly as `IDEAEvent` records with type, dates, and compliance descriptors |
| **Service tracking** | Service prescription only | Separated into `StudentIEPServicePrescription` (what is required) and `StudentIEPServiceDelivery` (what was provided) |
| **Goal tracking** | Not represented | Modeled as `StudentIEPGoal` records tied to the IEP |
| **Program dependency** | Requires a locally defined program to exist | Independent of local program structures |
| **Portability** | Program definitions vary across LEAs and SEAs, limiting cross-jurisdiction consistency | IEP records are more portable and interpretable without reliance on local program constructs |
| **Compliance audit trail** | Inferred from program state and enrollment dates | Evidence-based: events, prescriptions, and delivery are discrete, auditable records |
