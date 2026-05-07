# What's New - v6.1

## Overview

Data Standard v6.1 delivers **non breaking** enhancements that address key community needs: reducing state-specific extensions and improving support for Special Education data.
• Expanded responsibility modeling:
An optional ResponsibleEducationOrganization reference has been added to the StudentEducationOrganizationResponsibilityAssociation (SEORA).  This allows reporting education organizations to indicate additional organizations with defined responsibilities (e.g., residency, funding, services).
To align with this approach, the residency descriptor in StudentSchoolAssociation is now deprecated and scheduled for removal in v8.0.

• Early access Special Education data model (SEDM):
A new early access domain introduces enhanced support for IEP and IDEA event tracking, with five new entities to capture IEP details such as contract details (studentIEP), prescriptions and goals, along with related IDEA events. New descriptors support these additions.
Developed collaboratively by the community (including PCG, Education Analytics, and South Carolina Department of Education), this model provides a foundation for more detailed and longitudinal Special Education tracking.  As an early access model, it is expected to evolve based on community feedback.  To minimize implementation overhead, initial adoption is recommended for Special Education vendors rather than SIS vendors.

• Address enhancements
A new optional AddressCharacteristic descriptor has been added to the Address common, enabling multiple characteristics (e.g., Primary, Validated, Receives Disciplinary Reports) to be associated with an address, beyond its functional AddressType (e.g., Mailing, Shipping).

• Documentation and tooling updates
Documentation for descriptors has been improved, and UML artifacts are now provided in Mermaid format within the Ed Fi Data Standard repository. Legacy Visio and PDF diagram formats are no longer included.

### A New Domain Is Added For Special Education Data Model (SEDM)

[DATASTD-2559](https://edfi.atlassian.net/browse/DATASTD-2559)

A new EARLY ACCESS domain (See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.)  introduces enhanced support for Special Education data, including:
• IDEA events
• Individualized Education Programs (StudentIEPs)
• Prescribed services and service delivery
• Student goals
Five new entities and supporting descriptors enable more detailed, longitudinal reporting. The existing StudentSpecialEducationProgramAssociation remains available for consolidated reporting use cases.

This model was developed collaboratively with input from the Ed Fi community (including PCG, Education Analytics, and South Carolina).  As an Early Access domain, it is expected to evolve based on community feedback and should not be considered final.

Implementation guidance:
To minimize maintenance overhead while the model matures, initial adoption is recommended for Special Education vendors rather than SIS vendors.

Comments or other feedback about the new SEDM can be shared via [Data Standard RFC 28b](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/discussions/60).

### A New Optional Alternate Responsible Ed Org reference is introduced to the StudentEducationOrganizationResponsibilityAssociation (SEORA)

[DATASTD-2577](https://edfi.atlassian.net/browse/DATASTD-2577)

This enhancement addresses a key modeling gap: previously, reporting education organizations could not consistently represent other organizations responsible for services such as residency, funding, accountability, or transportation when those organizations did not submit their own records.  This often led to state-specific extensions and increased implementation complexity.

With this update:

- Reporting organizations can explicitly identify alternate responsible organizations.
- The ResponsibilityDescriptor is clarified to refer to the responsible organization.
- SEORA is reinforced as the primary association for tracking responsibility, differentiating from:
  - StudentSchoolAssociation (for enrollment)
  - StudentEducationOrganizationAssociation (for indicators)

This change reduces the need for extensions and improves support for funding and accountability use cases.

Implementation guidance:
Although `ResponsibleEducationOrganization` is optional, the community is advised to consistently populate the education organization that holds alternate responsibility, as indicated by the `ResponsibilityDescriptor`.

### Deprecated ResidencyStatus Descriptor

[DATASTD-2572](https://edfi.atlassian.net/browse/DATASTD-2572)

To clearly distinguish enrollment from responsibility (residency):

- The ResidencyStatus descriptor in StudentSchoolAssociation is now deprecated
- It is scheduled for removal in Data Standard v8.0

### Address Characteristic Update

[DATASTD-2543](https://edfi.atlassian.net/browse/DATASTD-2543)
[DATASTD-2544](https://edfi.atlassian.net/browse/DATASTD-2544)

The community identified a need to capture additional address characteristics, such as “Primary,” “Receives Discipline Report”, or “Validated” as part of address metadata. The existing AddressType (part of the Address common key) supports functional classifications (e.g., Mailing, Shipping) but does not support contextual roles, such as multiple primary addresses for a single student. This limitation led states to use contact types or implement extensions to represent these attributes.
To address this gap, a new optional AddressCharacteristic descriptor has been added to the Address common.  This approach supports multiple characteristics per address, rather than limiting the model to a single Boolean indicator (e.g., Primary only).

## Minor Changes

Minor updates in this release focus on improving documentation clarity and consistency.

### Documentation and Descriptor Updates In MetaEd

[DATASTD-2515](https://edfi.atlassian.net/browse/DATASTD-2515)

[DATASTD-2517](https://edfi.atlassian.net/browse/DATASTD-2517)

In this release:

- Descriptor lists have been streamlined and aligned with domain groupings.
- Documentation now reflects a more complete and consistent set of descriptor values.
- Entity reference and descriptor tables have been updated to ensure completeness and accuracy.

These updates improve the usability of the Data Standard documentation without impacting the model structure.

### Spell Out State/Territory Names For StateAbbreviationDescriptor

[DATASTD-2523](https://edfi.atlassian.net/browse/DATASTD-2523)

StateAbbreviationDescriptor values have been updated to reflect the full name of the state or territory.

### Maintenance Related Updates

- [DATASTD-2531](https://edfi.atlassian.net/browse/DATASTD-2531): Missing links on DS 5.2 and 6.0 Handbooks
- [DATASTD-2532](https://edfi.atlassian.net/browse/DATASTD-2532): Update Spacing Issue On Descriptor Tables For Version 5.X Documentation
- [DATASTD-2533](https://edfi.atlassian.net/browse/DATASTD-2533): Update Spacing Issue On Descriptor Tables For Version 4.X Documentation

General documentation maintenance and corrections, including:

- Fixing missing links in prior Data Standard handbooks.
- Resolving formatting issues in descriptor tables.
- Improving overall documentation consistency across versions.
