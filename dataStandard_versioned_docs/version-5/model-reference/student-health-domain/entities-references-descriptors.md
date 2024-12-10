---
hide_table_of_contents: true
---

# Student Health Domain - Entities, References, and Descriptors

## Student Health Domain Entities

| **Name**      | **Description**                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| StudentHealth | This event entity represents actions taken by an education organization after a disruptive event that is recorded as a discipline incident. |

## Extended References

| Name                  | Description                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EducationOrganization | This entity represents an educational organization.                                                                                                                                                                                                                                                                                               |
| Student               | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Student Health Domain Descriptors

| Entity        | Name                            | Description                                                                                    | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------- | --------------- | ------------- | ---------------------- |
| StudentHealth | ImmunizationType                | An indication of the type of immunization that an individual has satisfactorily received.      | Standard             |                 | Yes           | Yes                    |
| StudentHealth | NonMedicalImmunizationExemption | The type of nonmedical exemption from vaccination claimed by the student's parent or guardian. | Local                |                 | Yes           |                        |

:::tip

See [Non-Normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications) for more information on _Usage Classification_.

:::

The default descriptor values for ImmunizationType are based upon the 2024 list of [recommended immunizations](https://www.cdc.gov/vaccines/schedules/hcp/imz/child-adolescent.html) for children 18 years or younger by the CDC, as follows:

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
