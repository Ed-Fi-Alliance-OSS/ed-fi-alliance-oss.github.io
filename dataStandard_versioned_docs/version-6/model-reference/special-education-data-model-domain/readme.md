# Special Education Data Model Domain

:::important

EARLY ACCESS DOMAIN (Released in version 6.1) - This domain is being released
in order to allow early adopters a chance to preview and test the proposed
update and provide feedback on its viability for possible future enhancements.
This domain should not be considered fully stable at this time, and it may
change outside of the standard Ed-Fi Data Standard breaking change release cycle if deemed
necessary by the community. See [Early Access
Material](/reference/data-exchange/versioning-and-releases#early-access-material)
for more information.

:::

**Does the Ed-Fi Data Standard support special education data?** Yes, in two
ways:

* **Program participation and eligibility** are part of the standard, through
  `StudentSpecialEducationProgramAssociation` and
  `StudentSpecialEducationProgramEligibilityAssociation` in the [Alternative
  and Supplemental Services
  domain](../alternative-and-supplemental-services-domain/readme.md).
* **The IEP and IDEA events** are modeled by this domain, the Special Education
  Data Model (SEDM), which is early access in Data Standard 6.1. It adds IDEA
  events, IEPs, IEP goals, and prescribed and delivered services.

The SEDM complements the program association rather than replacing it; program
participation should still be recorded there. See [Differences from
StudentSpecialEducationProgramAssociation](./overview.md#differences-from-studentspecialeducationprogramassociation)
and [Early Access
Material](/reference/data-exchange/versioning-and-releases#early-access-material).

This model is expected to evolve, initial implementation is recommended through special education vendors rather than general SIS vendors. This approach helps maintain SIS code stability while the SEDM model matures.

The Special Education Data Model Domain provides the ability to record and track a student's special education journey as it develops.
This **new** domain focuses on the Individuals with Disabilities Education Act (IDEA) related events and a Student's Individual Eduction Program (IEP). It also allows for the tracking for annual goals related to an IEP, services prescribed, and services delivered to the student as part of their IEP.

* [Special Education Data Model Domain - Overview](./overview.md)
* [Special Education Data Model Domain - Model Diagrams](./model-diagrams.mdx)
* [Special Education Data Model Domain - Entities, References, and Descriptors](./entities-references-and-descriptors.md)
