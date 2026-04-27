---
sidebar_position: 3
hide_table_of_contents: true
---

# Credential Domain - Entities, References, and Descriptors

## Credential Domain Entities

| Name | Description |
| --- | --- |
| Certification | An offering by an official granting authority of a certification or license that qualifies persons to perform specific job functions, such as fulfill a teaching assignment. |
| CertificationExam | An examination required by one or more certifications. |
| CertificationExamResult | The person's result from taking a certification exam. |
| Credential | The legal document giving authorization to perform teaching assignment services. |
| CredentialEvent | An event associated with a person's credential. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Person | The person who obtained and is holding the credential. |
| Staff | The Staff member who obtained and is holding the credential. |
| StudentAcademicRecord | Reference to the person's student academic records for the school(s) with which the credential is associated. |
| StudentAssessment | Reference to a detailed result for the assessment taken by a person. |

## Credential Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | Credential | The academic subjects to which the credential pertains. | Local | Yes | Yes |     |
| CertificationExamStatus | CertificationExamResult | The status of the certification exam attempt. |     |     |     |     |
| CertificationExamType | CertificationExam | The type or category of the certification exam. |     |     |     |     |
| CertificationField | Certification | The field of certification. |     |     |     |     |
| CertificationLevel | Certification | The level or category of the certification. |     |     |     |     |
| CertificationRoute | Certification <br /> Credential | The process, program, or pathway used to obtain the certification. | Orthodox |     |     |     |
| CertificationStandard | Certification | The standard, law, or policy defining the certification. |     |     |     |     |
| CredentialEventType | CredentialEvent | The type of event associated with a person's credential. |     |     |     |     |
| CredentialField | Credential | The field of certification for the credential. | Local |     |     |     |
| CredentialStatus | Credential | The current status of the credential. | Standard |     |     |     |
| CredentialType | Credential | An indication of the category of the credential a person holds. | Local |     |     |     |
| Degree | Certification | The minimum level of degree, if any, required for the certification. | Orthodox |     |     |     |
| EducatorRole | Certification <br /> Credential | The role authorized by the certification, typically associated with service and administrative certifications. | Standard |     |     |     |
| GradeLevel | Certification <br /> Credential | The grade level(s) certified for teaching. | Orthodox | Yes | Yes |     |
| InstructionalSetting | Certification | The setting authorized by the certification in which a person receives education and related services. |     |     |     |     |
| PopulationServed | Certification | The type of students that the certification is offered and tailored to. | Orthodox |     |     |     |
| StateAbbreviation | Credential | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | Standard |     | Yes |     |
| TeachingCredential | Credential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | Orthodox |     |     |     |
| TeachingCredentialBasis | Credential | An indication of the pre-determined criteria for granting the teaching credential that a person holds. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
