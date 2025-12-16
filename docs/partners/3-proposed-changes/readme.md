# Proposed Credentialing Changes for School Year 2026-27

The Ed-Fi Alliance conducts an annual review of its credentialing process, soliciting input from education agencies, vendor partners, and community members. This comprehensive approach ensures transparency and predictability in credentialing changes while providing the community with opportunities for feedback at multiple stages.

As part of this yearly process, we are presenting proposed credentialing updates for community review. These changes are scheduled to take effect in November 2024, targeting School Year 2025-25 implementations. The proposed updates are designed to align with the official release of Data Standard version 5.2. By aligning these updates, the Ed-Fi Alliance aims to streamline adoption and maintain consistency across its ecosystem.

We encourage members of the Ed-Fi community to review these proposed changes and provide feedback. You can submit feedback directly to [certification@ed-fi.org](mailto:certification@ed-fi.org). Your input will help ensure that the final changes meet the needs of our community and continue to support the growth and effectiveness of the Ed-Fi ecosystem.

_Annual cadence for credential changes_

| Jan–May                                           | June–Sept                                                       | October-November                                      | December              |
|--------------------------------------------------|------------------------------------------------------------------|----------------------------------------------|------------------------|
| Working sessions to source credential changes  | Changes reviewed by SIS, MSP, TAG, GAT working groups         | Changes posted for community review, feedback collected         |Changes go into effect |

## Summary of SY 26-27 changes

* SIS Certification: stronger alignment of test scenarios with data standard best practices
* Intervention Certification: recognize Intervention/MTSS domain as a unique certification
* All Certifications: include optional registry entry to link security and data privacy validations
* Implementation Partner Badge: update requirements for stronger alignment to Agency expectations

## Reminder of last year's changes

* New Requirements
  * [Alignment with new Break-Rest Development cadence](https://docs.ed-fi.org/reference/roadmap/cadence/)
  * [Require that each student has a calendar reference](https://docs.ed-fi.org/partners/certification/available-certifications/sis-v4/test-scenarios/student-school-association-scenarios)
  * [Add historical transcript records to SIS certification testing](https://docs.ed-fi.org/partners/certification/available-certifications/sis-v4/test-scenarios/student-academic-record-scenarios/)
  * [Require pricing statement for registry](https://docs.ed-fi.org/partners/certification/certification-for-data-providers/pricing-statement)
  * [Require more detailed availability statements](https://docs.ed-fi.org/partners/certification/certification-for-data-providers/product-availability-information)
  * [Retire platform Consumer Badge](https://docs.ed-fi.org/partners/badging/available-badges/ed-fi-ods-platform-consumer-badge)
  * [Rename Managed ODS API Platform Badge to Managed Service Provider Badge](http://localhost:3000/partners/badging/available-badges/ed-fi-ods-platform-consumer-badge)
* [API Best Practices Became Requirements](https://docs.ed-fi.org/partners/certification/certification-for-data-providers/api-integration-best-practices)
  * Connections and security: allow for multiple Ed-Fi API connections with different key/secret combos
  * Performance and optimization to minimize API transactions and reduce network traffic
  * API consuming clients minimize transactions
  * Error handling to reduce number of errors
  * UI/UX for admin users to solve errors

## SIS Certification: stronger alignment of test scenarios with data standard best practices

For the 2026–2027 school year, SIS certification requirements are being updated to focus on data elements that are widely supported and instructionally meaningful, such as enrollment, program participation, attendance, and staff associations. An analysis of recently published best practices and required elements revealed gaps an misalignments; read the full report [here](https://drive.google.com/file/d/1ZYJojGpaV3joivy2CrXaFTV9IsoKTgrD/view). These changes are based on broad vendor support and best practices, aiming to improve data consistency, interoperability, and compliance across SIS platforms.

#### Next steps

* Ed-Fi will publish proposed certification scenarios based on these recommendations.
* SIS vendors are invited to review and provide feedback on feasibility and technical considerations.
* Community input will shape the scope and sequencing of new certification areas.

#### Background

Ed-Fi best practices were created to standardize data collection and reporting across diverse educational environments. This ensures consistency in student enrollment, program participation, attendance monitoring, and instructional planning.

Aligning best practices with certification ensures that required data elements are implemented consistently across SIS platforms. Certification promotes interoperability, controls fragmentation, improves data quality, supports compliance, and enables better decision-making.

#### Methodology

* Vendor Interviews: The analysis is based on interviews with 8 out of 10 currently certified SIS providers, representing a broad cross-section of the K-12 SIS market.
* Domains Reviewed: Providers reviewed their support for Ed-Fi data elements in four domains: Enrollment, Programs, Attendance, and Teaching & Learning.
* Support Levels: Vendor responses were categorized as Supported, Partially Supported, or Missing for each data element.

#### Findings

* Strong Support: Most SIS vendors already support key Ed-Fi data elements in Enrollment and Programs. There is strong support for school and section attendance.
* Moderate/Limited Support: Program/intervention attendance and Teaching & Learning domains show moderate to little support.
* Market Signal: The majority of vendors are aligned with best practices for core fields, indicating readiness for certification updates.
* Areas for Growth: Some elements (e.g., crisis events, transportation, advanced teaching/learning fields) are not widely implemented and will require future alignment.

#### Recommendations

| Scenario                                         | Newly Required Elements                                                                 |
|--------------------------------------------------|------------------------------------------------------------------------------------------|
| [StudentSchoolAssociation](/docs/partners/2-certification/available-certifications/sis-v5/test-scenarios/student-school-association-scenarios.md)  | PrimarySchool, SchoolYear, EnrollmentType, CalendarReference, FullTimeEquivalency       |
| [StudentEducationOrganizationResponsibilityAssociation](/docs/partners/2-certification/available-certifications/sis-v5/test-scenarios/student-ed-org-responsibility-association-scenarios.md) | StudentReference, EducationOrganizationReference, ResponsibilityDescriptor, BeginDate, **StudentTransportation.StudentReference (if transportation module)** |
|[StudentProgram](/docs/partners/2-certification/available-certifications/sis-v5/test-scenarios/student-program-association-scenarios.md) scenarios (CTE, Language, Migrant, Homeless, Neglected or Delinquent, Food, Title I) | EndDate                                                                                 |
| [StudentSpecialEducationProgramAssociation](/docs/partners/2-certification/available-certifications/sis-v5/test-scenarios/student-special-education-program-association-scenarios.md)        | EndDate, **ReasonExited (if supported)**, SpecialEducationExitDate                      |
| [StaffSectionAssociation](/docs/partners/2-certification/available-certifications/sis-v5/test-scenarios/staff-section-association-scenarios.md)                         | EndDate                                                                                 |

## Intervention Certification: recognize Intervention/MTSS domain as a unique certification

The Ed-Fi Alliance is recognizing MTSS as a distinct domain certification to ensure that intervention and support data—such as student participation, progress monitoring, and service delivery—can be exchanged reliably and consistently across diverse platforms. This certification sets clear standards for vendors, addressing real-world needs for interoperability, error handling, and data quality in MTSS implementations.

By formalizing MTSS certification, Ed-Fi helps districts and states leverage intervention data for better instructional decisions and student outcomes. For vendors, it provides clear standards and a streamlined path to demonstrate interoperability, data quality, and error handling in MTSS products—making it easier to meet district and state requirements and stand out in the market. This move responds to market demand and field experience, driving consistency and innovation in how schools support students through multi-tiered systems.

Review the certification requirements here.

## All Certifications: include optional registry entry to link security and data privacy validations

Allowing certification holders to display a link to their security validations on the Ed-Fi Registry increases transparency and trust for schools and agencies evaluating Ed-Fi-certified products. By showing vendor-maintained security verification pages—such as SOC 2 or ISO 27001—districts can quickly assess a product’s security posture, streamlining procurement and supporting informed decisions.

For at least the initial year, this is optional and does not affect certification status, so vendors are not burdened with new requirements. Only links to pages maintained by the certification holder will be accepted and displayed, ensuring vendors retain ownership of their security documentation while giving schools a clear, reliable way to review security practices.

## Implementation Partners: update requirements for stronger alignment to Agency expectations

The revised Implementation Partner Badge requirements are more rigorous and targeted, reflecting lessons learned from the first 18 months of the program. Partners must now show repeatable, standards-aligned Ed-Fi implementations across multiple projects, provide clear documentation of their methods, and participate in project retrospectives to validate quality and alignment.

These changes benefit the community by making it easier to identify partners who consistently deliver reliable, high-quality support. By raising the bar for accountability and transparency, the new requirements foster greater trust, improved data interoperability, and a stronger Ed-Fi ecosystem for all stakeholders.
