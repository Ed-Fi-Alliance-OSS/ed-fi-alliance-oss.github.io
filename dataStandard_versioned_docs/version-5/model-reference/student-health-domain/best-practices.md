# Student Health Domain - Best Practices

## Definitions and Key Concepts

Joint guidance from U.S. Education Department (ED) and Health and Human Services (HHS) in the document [_Joint Guidance on the Application of the Family Educational Rights and Privacy Act (FERPA) and the Health Insurance Portability and Accountability Act of 1996 (HIPAA) To Student Health Records_](https://studentprivacy.ed.gov/sites/default/files/resource_document/file/2019%20HIPAA%20FERPA%20Joint%20Guidance%20508.pdf), December 2019 Update, explains the relationship between FERPA and HIPAA and how these two laws apply to health records maintained on students.

Generally, FERPA-covered public elementary and secondary schools are not a HIPAA-covered entity, even though a school employs or contracts with school nurses, physicians, psychologists, or other health care providers.  As a result, student health records maintained by a health care provider, acting for a FERPA-covered elementary or secondary school, would qualify as _education records_ subject to FERPA and not HIPAA.

State and Local Education Agencies (SEAs and LEAs) should reference the above guidance in addition to applicable state laws in defining their policies for student health data.

_Since the Ed-Fi ODS is specifically designed to hold FERPA-covered student education data, the use of the Student Health data model should only include student health records that are included in the FERPA-covered definition of education records._

Out of concerns for public health, all U.S states, the District of Columbia, and U.S. territories have requirements for the immunization of children as a condition for attending public school and childcare. These vaccination requirements are important tools for maintaining high vaccination coverage and low rates of vaccine-preventable diseases (VPDs). Medical or non-medical exemptions from vaccination requirements may apply for some children. [Vaccination requirements](https://www.cdc.gov/vaccines/imz-managers/laws/state-reqs.html) and permitted exemptions vary by state.

The Centers for Disease Control and Prevention (CDC) provides the following [definitions](https://www.cdc.gov/vaccines/vac-gen/imz-basics.htm):

**Immunity**: Protection from an infectious disease. If you are immune to a disease, you can be exposed to it without becoming infected.

**Vaccine**: A preparation that is used to stimulate the body’s immune response against diseases. Vaccines are usually administered through needle injections, but some can be administered by mouth or sprayed into the nose.

**Vaccination**: The act of introducing a vaccine into the body to produce protection from a specific disease.

**Immunization**: A process by which a person becomes protected against a disease through vaccination. This term is often used interchangeably with vaccination or inoculation.

State vaccination requirements are typically documented in a [vaccination schedule](https://www.cdc.gov/vaccines/parents/schedules/index.html) that details:

1. Number of doses of each vaccine,
2. Timing between each dose,
3. Age when infants and children should receive the vaccine, and
4. Precautions and contraindications (who should not receive the vaccine).

[Exemptions](https://www.cdc.gov/vaccines/imz-managers/coverage/schoolvaxview/requirements/exemption.html) from state or local requirements may apply to some children. All states and the District of Columbia allow a medical exemption. A **medical exemption** is allowed when a child has a medical condition that prevents them from receiving a vaccine. All but three states offer **nonmedical exemptions** for religious or philosophical reasons.

## Use Cases

### Immunization Related Use Cases

Student immunization records are acquired from one or more authoritative sources:

* State immunization registries.
* Local health departments, often provided directly to the school systems.
* Doctor’s offices which provide signed immunization records for the school, often delivered by the parents or guardians.
* Nurses in the school that, with permission, administer immunizations.

These student immunization records are then stored in various types of systems, such as;

* Electronic Health Records (EHR) systems
* Environment, Health, and Safety (EHS) management applications
* Student Information Systems (SIS) with a student health module
* Other application system or web site

From these systems, the immunization data will flow into the Ed-Fi API/ODS.  Depending on the source system, new API or batch interfaces may need to be developed.

There are several possible uses of the immunization data from the ODS that includes:

* Determine what students meet the current immunization requirements.
* Examine specific immunization rates to predict the risks of disease in the school.
* Analyze medical and nonmedical exemption rates and trends.
* Examine changes in immunization behaviors and exemptions.
* Correlate immunization coverage against historical or predicted infection rates.
* Use immunization coverage and exemption rates to direct parent outreach and education efforts.
* Monitor immunization coverage to assess how well areas are protected from vaccine-preventable diseases.
* Correlate student immunizations against absences due to sickness.

Support state and local health departments with immunization data.

## Best Practices in Using the Student Health Domain

### Best Practices Related to Immunization

An example of data collection for student’s immunization history is shown below. Whether the data is gathered from a form, a data stream or source system, the figure below should explain the immunization attributes in the StudentHealth entity.

![Immunization form with captions](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/student-health-best-practices.webp)

When obtaining immunization data, it is important to factor in correlating the student with the StudentUniqueId. Depending on the source, this may be accomplished in a number of ways:

* Synchronizing rosters with source systems to store the StudentUniqueId.
* Use of matching algorithm to correlate incoming data with personally identifiable information to the StudentUniqueId.
* Use of manual methods (the least attractive option) to looking student identities.

The SEAs should adjust the descriptor sets, ImmunizationType and NonMedicalImmunizationExemption, if necessary, according to the immunization policies and laws in their state.

Interfaces may need to be built to new systems that contain student immunization data to bring data into the Ed-Fi API/ODS.  Depending on the use of the immunization data, the frequency of update needs to be determined.

The access control for the StudentHealth entity should be carefully considered with respect to what system will write the data, what systems may access the data, and what user roles may read the data from the ODS.  SEA and LEA policies may have special provisions for accessing student health data.

As SEAs or LEAs wish to bring additional student health data into the ODS, the recommendation is to work with the Ed-Fi Alliance to extend the StudentHealth entity.
