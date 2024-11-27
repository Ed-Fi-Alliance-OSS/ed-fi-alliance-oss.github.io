---
sidebar_position: 1
---

# Student Health Domain - Overview

## Purpose

The purpose of the Ed-Fi Student Health domain is to hold and encapsulate
student health data maintained by the schools that is deemed appropriate to load
into the Ed-Fi ODS for data sharing, analysis, and reporting.

This initial version of the Student Health data model only addresses **student
immunization records**, even though the model is left open for future additional
student health data such as allergies, health history, health screenings,
physicals, nurse assessments, referrals, medical accommodations, authorization
to administer medications, in-school treatments, or action plans for specific
emergency health concerns.

## Key Concepts

Generally, FERPA-covered public elementary and secondary schools are not
HIPAA-covered entities, even if they employ or contract with healthcare
providers. As a result, student health records maintained by a healthcare
provider acting for a FERPA-covered school are subject to FERPA, not HIPAA.
State and Local Education Agencies (SEAs and LEAs) should reference this
guidance along with applicable state laws when defining policies for student
health data. The immunization data from the ODS can be used to determine
compliance with immunization requirements, analyze immunization rates, assess
exemption rates and trends, correlate immunization coverage with disease risk,
and support parent outreach and education efforts. The model supports recording
multiple doses of immunizations and both medical and non-medical exemptions. The
content is cumulatively historical, with an AsOfDate to reflect the date the
record was last updated.

## Key Entities

This domain contains:

* A StudentHealth entity associated with Student and EducationOrganization
  entities.
