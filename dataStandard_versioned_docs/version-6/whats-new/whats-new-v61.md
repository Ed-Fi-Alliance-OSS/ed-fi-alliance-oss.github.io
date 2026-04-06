# What's New - v6.1

## Overview

Data Standard version v6.1 is the first release in the year 2026. It is designed to deliver only non-breaking changes to the Ed-Fi Unifying Data Model (UDM) since it was decided earlier that 2026 would be the year for minor updates in the model. Even though the release introduces non-breaking changes to the model, it is not shy of introducing some major updates in the model. These major updates add enhanced support for Student Special Education information in order to provide enhanced support in tracking IEPs, goals and delivery of special education services. Another major change is the addition of a "ResponsibleEducationOrganization" reference onto the StudentEducationOrganizationResponsibilityAssociation in order to enable reporting districts to indicate responsibilities by other Education Organizations for funding allocation. Because of the new reference to EducationOrganization and the responsibility descriptor the need for the "ResidencyStatus" on StudentSchoolAssociation no longer appears to be needed and has been flagged for Deprecation in the 8.0 release.

Besides these main updates, DS v6.1 also introduces some minor changes to the API and supporting documentation on the Ed-Fi site as well as the Model to improve insight to the descriptors and supporting documentation of various entities.

## Major Changes

### A New Domain Is Added For Special Education Data Model

[DATASTD-2559](https://edfi.atlassian.net/browse/DATASTD-2559)

The Special Education Data Model Domain is an EARLY ACCESS domain (See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.) outlines the entities and relationships for agencies to adopt a more granular approach to tracking student special education data. The domain covers IDEA Events, Individual Education Plans, prescribed services, service delivery, and overall goals for the student. The domain allows for more longitudinal data in reporting and greater depth for organizations that do not want to track, or do not consider Special Education as a separate program under the StudentSpecialEducationProgramAssociation. Key concepts for the domain are StudentIEP and IDEAEvents. As noted above because this domain is noted as being Early Access the community's engagement and feedback will be reviewed and utilized for possible future enhancements. As a result the domain's current design should **not** be considered stable.

<!--[Data Standard RFC 28b](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/discussions/60)-->

#### Concept

A student receiving special education services is represented in the Ed-Fi Data Standard by the StudentSpecialEducationProgramAssociation (SSEPA) resource. This resource, as its name implies, associates a student to a program at an education organization (generally a school or local education agency). This entity contains elements that closely resemble a student's Individual Education Program (IEP).

The SSEPA models special education primarily as participation in a locally defined program, which creates structural misalignment with how special education operates in practice. SSEPA requires a student to be enrolled in a program and uses program identifiers and enrollment dates as the primary anchors for special education data. Program definitions and life cycles vary across Local Education Agencies (LEAs) and State Education Agencies (SEAs), and program begin and end dates do not reliably align with IEP effective periods. As a result, changes to an IEP often require creating a new program association or overwriting existing dates, even when the student's enrollment has not changed, leading to ambiguity around which IEP was in effect at a given time and limiting portability across jurisdictions. Additionally, the Ed-Fi standard does not currently provide a way to represent Individuals with Disabilities Education Act (IDEA) related events, IEP related goals, or IEP related service delivery.

In contrast, a model such as SEDM treats the IEP as a first-class, time-bound legal document, explicitly capturing IDEA events, service prescriptions, and service delivery as records tied to the IEP rather than inferred from program state. SSEPA does not natively preserve IEP history, represent IDEA events as discrete entities, or support granular tracking of service delivery and goal progress over time; instead, it is optimized to reflect a current program state. This limits the ability to reconstruct compliance timelines, demonstrate procedural intent, or evaluate progress relative to the plan in effect when services were delivered. By anchoring data to the IEP itself, SEDM supports longitudinal analysis, evidence-based reporting, and clearer interpretation of special education obligations without reliance on program constructs that were not designed to carry legal or historical meaning.

#### Model Details

<!--TODO Add Link for SEDM Pages created under DATASTD-2567-->

#### Use Cases/Best Practices

**IDEA Reporting and Compliance**
Accurate IDEA reporting and compliance depend on the ability to represent special education activities as discrete, time-bound, and legally significant records rather than as side effects of enrollment or program participation. Modeling IDEA events, IEP plans, service prescriptions, and service delivery as explicit, auditable entities enables precise reconstruction of statutory timelines, procedural safeguards, and service obligations required for federal and state reporting. A compliance-oriented model must preserve when decisions were made, why they were required, and what actions resulted, without overwriting historical context as IEPs are reviewed, amended, or replaced. By aligning the data model with the legal and procedural structure of IDEA—rather than with local operational workflows—the model supports consistent generation of indicators, reduces ambiguity during audits and monitoring, and enables downstream systems to demonstrate compliance based on evidence rather than inference.

**Progress Monitoring**
Effective progress monitoring requires a data model that distinguishes between what was planned, what was delivered, and what outcomes were observed over time. By explicitly modeling IEP goals, service prescriptions, and service delivery as discrete, time-bound records tied to a specific IEP, the model enables progress to be evaluated against the original intent of the plan rather than inferred from enrollment, staffing, or assessment data alone. A progress-monitoring-oriented design must preserve historical context as IEPs are amended, services change, or goals are revised, allowing progress to be assessed relative to the plan in effect at the time services were delivered. Aligning the model to the structure of the IEP supports consistent local monitoring, longitudinal analysis, and downstream reporting while avoiding assumptions about instructional effectiveness or compliance that cannot be supported by evidence captured in the data.

**IEP Portability**
IEP portability is essential because the Individualized Education Program is a student-specific legal artifact whose meaning, obligations, and history must remain intact across changes in enrollment, education organizations, and local program structures. Modeling the IEP as a first-class, portable entity—independent of program participation—ensures that IDEA events, prescribed services, and service delivery records can be exchanged and interpreted consistently without reliance on locally defined programs that do not translate across jurisdictions. A portable IEP model preserves the intent and effective dates of the plan, supports accurate reconstruction of compliance timelines, and enables continuity of services when students transition between LEAs or SEAs. By anchoring special education data to the IEP itself rather than to enrollment or program constructs, the model improves interoperability, historical fidelity, and downstream reporting while reducing ambiguity and data loss during student mobility.

### Enhance StudentEducationOrganizationResponsibility Association To Include Responsible EducationOrganization

[DATASTD-2571](https://edfi.atlassian.net/browse/DATASTD-2571)

The complexity analysis initiated in 2025 identified a gap in the Data Standard: the Reporting EdOrg cannot explicitly represent the Responsible EdOrg that provides services such as residency, accountability, or funding—information required for state funding. To address this limitation, state agencies extended SEORA, StudentSchoolAssociation, or SEOA, increasing SIS complexity. In Data Standard v6.1, this need is addressed by adding an optional ResponsibleEducationOrganizationReference to the SEORA and clarifying that the Responsibility Descriptor refers to the Responsible EdOrg. This enables reporting districts to indicate alternate responsible districts and allows states to accurately identify all responsible organizations for funding allocation.

### Deprecated ResidencyStatus Descriptor

[DATASTD-2572](https://edfi.atlassian.net/browse/DATASTD-2572)

In some state implementations, StudentSchoolAssociation (SSA).ResidencyStatus is used—along with extensions—to indicate the District of Residency. This pattern emerged because, prior to Data Standard v6.1, there was no way for a reporting (enrolled) EdOrg to explicitly identify the EdOrg of residency. Data Standard v6.1 addresses this gap by introducing an optional SEORA.ResponsibleEducationOrganizationReference and clarifying that the SEORA.Responsibility Descriptor refers to the Responsible EdOrg. With this enhancement, alternate responsibilities such as district of residency can be modeled directly and consistently in SEORA.
As a result, SSA.ResidencyStatus becomes redundant and potentially misleading, as it can be misused to represent alternate responsibilities that now belong in SEORA. The ResidencyStatus Descriptor has been marked for removal in DS v8.0.

## Minor Changes

### Address Characteristic Update

[DATASTD-2543](https://edfi.atlassian.net/browse/DATASTD-2543)
[DATASTD-2544](https://edfi.atlassian.net/browse/DATASTD-2544)

The community presented a need to enhance an address record associated to a student which would allow for greater flexibility to indicate values such as “Primary”, “Billing”, or “Shipping” onto that address. The community discussed this request in Data Standard Work Group 14 and it was determined that in order to meed the needs of all parties the Ed-Fi Model should support a set of values beyond a simple boolean. As a result the community agreed the best way to handle this would be to add a new "AddressCharacteristic" descriptor onto the existing Address common. This change would not be breaking since the new data field would be a new added optional collection for areas utilizing the Address common.

### Update Domain Descriptor Lists In MetaEd

[DATASTD-2515](https://edfi.atlassian.net/browse/DATASTD-2515)

After the 6.0 release which included new entities supporting identification, demographics, and contact many descriptors were consolidated into a much smaller overall list of domains. This update has minimal impact to the Model but helps keep the handbook and documentation association to each domain more in line for better reference. The overall documentation for descriptors associated to each domain was adjusted to reflect the updates as well as several previously missing descriptor values.

### Review Entities References And Descriptor Tables

[DATASTD-2517](https://edfi.atlassian.net/browse/DATASTD-2517)

Following the updates to the list of descriptors in the Model and expanding on a list of previously missing descriptor documentation as part of [DATASTD-2450](https://edfi.atlassian.net/browse/DATASTD-2450) the Ed-Fi documentation model have been updated to ensure the tables listed under Entities References and Descriptors contains the complete list of updated values for each domain and that each descriptor list the entity or entities associated.

### Spell Out State/Territory Names For StateAbbreviationDescriptor

[DATASTD-2523](https://edfi.atlassian.net/browse/DATASTD-2523)

In order to improve transparency within the API the description values for the StateAbbreviationDescriptors have been updated to reflect the full name of the State or Territory referenced.

### Maintenance Related Updates

[DATASTD-2531](https://edfi.atlassian.net/browse/DATASTD-2531): Missing links on DS 5.2 and 6.0 Handbooks
[DATASTD-2532](https://edfi.atlassian.net/browse/DATASTD-2532): Update Spacing Issue On Descriptor Tables For Version 5.X Documentation
[DATASTD-2533](https://edfi.atlassian.net/browse/DATASTD-2533): Update Spacing Issue On Descriptor Tables For Version 4.X Documentation

## List of All Changes

* [Update Model To Remove Descriptors That Have Been Moved to New Domain Entities](https://edfi.atlassian.net/browse/DATASTD-2515)
* [Update Documentation Pages For Domains Descriptors](https://edfi.atlassian.net/browse/DATASTD-2517)
* [Spell Out State Names In The State Abbreviation Descriptor](https://edfi.atlassian.net/browse/DATASTD-2523)
* [Missing Links To DS 5.2 And 6.0 Handbooks](https://edfi.atlassian.net/browse/DATASTD-2531)
* [Update Descriptor Tables On Version 5.X Documentation](https://edfi.atlassian.net/browse/DATASTD-2532)
* [Update Descriptor Tables On Version 4.X Documentation](https://edfi.atlassian.net/browse/DATASTD-2533)
* [Create AddressCharacteristic Descriptor](https://edfi.atlassian.net/browse/DATASTD-2543)
* [Add SampleData For New AddressCharacteristic Descriptor](https://edfi.atlassian.net/browse/DATASTD-2544)
* [Create Domain Entities For IDEAEvent and StudentIEP And Descriptors](https://edfi.atlassian.net/browse/DATASTD-2560)
* [Create Domain Entity For StudentGoal](https://edfi.atlassian.net/browse/DATASTD-2561)
* [Create Domain Entities For StudentIEPServicePrescription And StudentIEPServiceDelivery](https://edfi.atlassian.net/browse/DATASTD-2562)
* [Create Interchange File For Special Education Data Model](https://edfi.atlassian.net/browse/DATASTD-2566)
* [Create SEDM Documentation Pages](https://edfi.atlassian.net/browse/DATASTD-2567)
* [Create SEDM Sample Data And Descriptor Values](https://edfi.atlassian.net/browse/DATASTD-2568)
* [Add ResponsibleEdOrg Reference To StudentEducationOrganizationResponsibilityAssociation (SEORA)](https://edfi.atlassian.net/browse/DATASTD-2571)
* [Mark StudentSchoolAssociation.ResidencyStatus As Deprecated](https://edfi.atlassian.net/browse/DATASTD-2572)
* [Change Descriptor Name IDEAEvent To IDEAEvent Type](https://edfi.atlassian.net/browse/DATASTD-2584)
* [Update Documentation For Student School Association](https://edfi.atlassian.net/browse/DATASTD-2585)
