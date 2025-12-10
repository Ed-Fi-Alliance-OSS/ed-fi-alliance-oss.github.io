---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Health Domain - Entities, References, and Descriptors

## Student Health Domain Entities

| Name | Description |
| --- | --- |
| StudentHealth | This event entity represents actions taken by an education organization after a disruptive event that is recorded as a discipline incident. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents an educational organization. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Student Health Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| EducationOrganization <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| StudentHealth | RequiredImmunization | An indication of the type of immunization that the student has received. |     |     |     |     |
| EducationOrganization | Indicator | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. | Local |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| StudentHealth | NonMedicalImmunizationExemption | The type of nonmedical exemption from vaccination claimed by the student's parent or guardian. | Local |     | Yes |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| EducationOrganization <br /> Student | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |

:::tip

See [Non-Normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications) for more information on _Usage Classification_.

:::

The default descriptor values for ImmunizationType are based upon the 2024 list of [recommended immunizations](https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age.html) for children 18 years or younger by the CDC, as follows:

| Code    | Short Description                          |
| ------- | ------------------------------------------ |
| RSV     | Respiratory syncytial virus                |
| HepB    | Hepatitis B                                |
| RV      | Rotavirus                                  |
| DTaP    | Diphtheria, tetanus, & acellular pertussis |
| Hib     | Haemophilus influenzae type b              |
| PCV     | Pneumococcal conjugate                     |
| IPV     | Inactivated poliovirus                     |
| 1vCOV   | COVID-19                                   |
| IIV4    | Influenza                                  |
| LAIV4   | Influenza                                  |
| MMR     | Measles, mumps, rubella                    |
| VAR     | Varicella (chickenpox)                     |
| HepA    | Hepatitis A                                |
| HPV     | Human papillomavirus                       |
| MenACWY | Meningococcal serogroup A,C,W,Y            |
| MenB    | Meningococcal serogroup B                  |
| DEN4CYD | Dengue                                     |
| Mpox    | Mpox                                       |

The default descriptor values for NonMedicalImmunizationExemption are as follows:

| Code          | Short Description    |
| ------------- | -------------------- |
| Religious     | Religious belief     |
| Philosophical | Philosophical belief |
| Other         | Other                |
