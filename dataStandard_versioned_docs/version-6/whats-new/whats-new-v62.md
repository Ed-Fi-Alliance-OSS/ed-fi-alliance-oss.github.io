---
draft: true
---

# What's New - v6.2

Release Date: xxxx, 2027

## Overview

Data Standard v6.2 delivers **non breaking** enhancements that address key community needs: identifying which contacts are responsible for a student, both for Special Education and for other local purposes, and keeping a history of how that responsibility changes over time.

- **Responsible contacts for Special Education:**
A new ResponsibleContact common has been added as an optional collection on the StudentSpecialEducationProgramAssociation (SSEPA). It allows reporting education organizations (Ed Org) to identify the contact who holds a responsibility for the student (e.g., IDEA Parent or surrogate parent), with begin and end dates that preserve the history of changes during the school year.

- **Early access IEP responsible contacts:**
A new early access StudentIEPResponsibleContactAssociation has been added to the Special Education Data Model (SEDM). It relates a contact to a StudentIEP and identifies the contact's dated responsibility for that IEP.

- **General contact responsibilities:**
A new optional collection of ContactResponsibility descriptors has been added to the StudentContactAssociation. It captures responsibilities that are not tied to a period of time (e.g., Transportation, Attendance, Mailing).

- **New ContactResponsibility descriptor:**
A new ContactResponsibility descriptor is shared by all three changes above, so the same set of responsibility values is used across the model.

## Key Changes

### A New ResponsibleContact Common Is Added to the StudentSpecialEducationProgramAssociation (SSEPA)

- [DATASTD-2670](https://edfi.atlassian.net/browse/DATASTD-2670)
- [DATASTD-2671](https://edfi.atlassian.net/browse/DATASTD-2671)

States and districts need to identify which contact is responsible for a student for special education purposes, such as the IDEA Parent or a surrogate parent. This responsibility can change during the school year. For example, a biological parent may begin as the IDEA Parent, a court-appointed surrogate may later take over, and the responsibility may then return to the biological parent. The previous model could not represent these transitions or keep the history of who was responsible and when.

The original request was to add begin and end dates to the StudentContactAssociation. Through community discussion, the direction evolved toward a reusable responsibility pattern that can be attached where it is needed.

With this update:

- A new ResponsibleContact common captures:
  - Contact (reference to the responsible contact)
  - ContactResponsibility (descriptor for the type of responsibility)
  - ContactResponsibilityBeginDate
  - ContactResponsibilityEndDate (optional)
- The Contact, ContactResponsibility and ContactResponsibilityBeginDate are part of the identity of the common, so the same contact can hold the same responsibility over several periods.
- The StudentSpecialEducationProgramAssociation now includes ResponsibleContact as an optional collection, allowing multiple contacts and responsibility periods to be reported for a student's special education program.

This approach was approved by the Arizona state education agency (SEA) and received positive community feedback.

**Implementation guidance:**
When a responsibility changes, populate the `ContactResponsibilityEndDate` on the current record and add a new record for the contact who takes over, rather than overwriting the existing one. This keeps the full timeline of responsibility. Ed-Fi recommends inclusive dates, but states may define dates as inclusive or exclusive; for calculations, align with local guidelines.

### A New Early Access StudentIEPResponsibleContactAssociation Is Added to the Special Education Data Model (SEDM)

- [DATASTD-2675](https://edfi.atlassian.net/browse/DATASTD-2675)

The SEDM, introduced in v6.1 as an EARLY ACCESS domain (See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.), tracks Individualized Education Programs (StudentIEPs) in more detail. This release adds a new StudentIEPResponsibleContactAssociation that relates a contact to a StudentIEP and identifies the responsibility the contact has for the student, effective beginning on a specific date.

The association carries the same responsibility elements as the ResponsibleContact common (ContactResponsibility, ContactResponsibilityBeginDate and an optional ContactResponsibilityEndDate). It is modeled as an association to represent the many-to-many relationship between student IEPs and contacts. The existing ResponsibleContact on the StudentSpecialEducationProgramAssociation remains available for consolidated reporting use cases.

As part of an Early Access domain, this association is expected to evolve based on community feedback and should not be considered final.

**Implementation guidance:**
As with the rest of the SEDM, initial adoption is recommended for Special Education vendors rather than SIS vendors, to minimize maintenance overhead while the model matures. Use the same approach as the ResponsibleContact common when a responsibility such as IDEA Parent passes from one contact to another: close the current record with an end date and create a new record for the new contact.

Comments or other feedback about the SEDM can be shared via [Data Standard RFC 28b](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/discussions/60).

### A New Optional ContactResponsibility Collection Is Added to the StudentContactAssociation

- [DATASTD-2672](https://edfi.atlassian.net/browse/DATASTD-2672)
- [DATASTD-2673](https://edfi.atlassian.net/browse/DATASTD-2673)

Outside of Special Education, education organizations also need to identify contacts with local responsibilities that are not tied to a period of time, such as the transportation, attendance or mailing contact for a student. The community recommended a collection, since a single contact can hold several responsibilities for the same student.

With this update:

- The StudentContactAssociation includes an optional collection of ContactResponsibility descriptors.
- The collection does not carry dates; it describes the current, general responsibilities of a contact.
- The StudentContactAssociation is differentiated from:
  - ResponsibleContact on the StudentSpecialEducationProgramAssociation (for dated Special Education responsibilities)
  - StudentIEPResponsibleContactAssociation (for dated IEP responsibilities in the SEDM)

**Implementation guidance:**
Responsibilities that need a timeline, such as IDEA Parent, should be reported through the ResponsibleContact common or the StudentIEPResponsibleContactAssociation, not through the StudentContactAssociation.

## Minor Changes

Minor updates in this release focus on improving documentation clarity and consistency.

### Descriptor Updates

- [DATASTD-2714](https://edfi.atlassian.net/browse/DATASTD-2714)
- [DATASTD-2722](https://edfi.atlassian.net/browse/DATASTD-2722)

In this release:

- A new ContactResponsibility descriptor has been added. Its default values are:
  - Attendance
  - Bus-route responsibilities
  - IDEA Parent
  - Mailing
  - Nurse-Related Contact
  - Texting
  - Transportation
  - Other program-specific responsibilities
- The ContactResponsibility descriptor is listed in each domain that uses it, so it appears in the descriptor tables for:
  - Alternative and Supplemental Services (including the Special Education subdomain)
  - Special Education Data Model
  - Student Identification and Demographics
