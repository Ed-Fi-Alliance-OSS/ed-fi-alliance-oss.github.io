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

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Credential | AcademicSubject | The academic subjects to which the credential pertains. | Local | Yes | Yes |     |
| CertificationExamResult | CertificationExamStatus | The status of the certification exam attempt. |     |     |     |     |
| CertificationExam | CertificationExamType | The type or category of the certification exam. |     |     |     |     |
| Certification | CertificationField | The field of certification. |     |     |     |     |
| Certification | CertificationLevel | The level or category of the certification. |     |     |     |     |
| Certification <br /> Credential | CertificationRoute | The process, program, or pathway used to obtain the certification. | Orthodox |     |     |     |
| Certification | CertificationStandard | The standard, law, opr policy defining the certification. |     |     |     |     |
| CredentialEvent | CredentialEventType | The type of event associated with a person's credential. |     |     |     |     |
| Credential | CredentialField | The field of certification for the credential. | Local |     |     |     |
| Credential | CredentialStatus | The current status of the credential. | Standard |     |     |     |
| Credential | CredentialType | An indication of the category of the credential a person holds. | Local |     |     |     |
| Certification | Degree | The minimum level of degree, if any, required for the certification. | Orthodox |     |     |     |
|  Certification <br /> Credential | EducatorRole | The role authorized by the certification, typically associated with service and administrative certifications. | Standard |     |     |     |
| Certification <br /> Credential | GradeLevel | The grade level(s) certified for teaching. | Orthodox | Yes | Yes |     |
| Certification | InstructionalSetting | The setting authorized by the certification in which a person receives education and related services. |     |     |     |     |
| Certification | PopulationServed | The type of students that the certification is offered and tailored to. | Orthodox |     |     |     |
| Credential | StateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | Standard |     | Yes |     |
| Credential | TeachingCredential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | Orthodox |     |     |     |
| Credential | TeachingCredentialBasis | An indication of the pre-determined criteria for granting the teaching credential that a person holds. | Orthodox |     |     |     |
