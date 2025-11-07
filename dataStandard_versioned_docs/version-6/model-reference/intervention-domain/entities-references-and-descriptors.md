---
sidebar_position: 3
hide_table_of_contents: true
---

# Intervention Domain - Entities, References, and Descriptors

## Intervention Domain Entities

| Name | Description |
| --- | --- |
| EducationOrganizationInterventionPrescriptionAssociation | This association indicates interventions made available by an education organization. Often, a district-level education organization purchases a set of intervention prescriptions and makes them available to its schools for use on demand. |
| Intervention | An implementation of an instructional approach focusing on the specific techniques and materials used to teach a given subject. |
| InterventionPrescription | This entity represents a formal prescription of an instructional approach focusing on the specific techniques and materials used to teach a given subject. This can be prescribed by academic research, an interventions vendor, or another entity. |
| InterventionStudy | An experimental or quasi-experimental study of an intervention technique. |
| StudentInterventionAssociation | This association indicates the students participating in an intervention. |
| StudentInterventionAttendanceEvent | This event entity represents the recording of whether a student is in attendance for an intervention service. |

## Extended References

| Name | Description |
| --- | --- |
| Cohort | This entity represents any type of list of designated students for tracking, analysis, or intervention. |
| EducationContent | This entity represents materials for students or teachers that can be used for teaching, learning, research, and more. Education content includes full courses, course materials, modules, intervention descriptions, textbooks, streaming videos, tests, software, and any other tools, materials, or techniques used to support access to knowledge. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentCohortAssociation | This association represents the Cohort(s) for which a student is designated. |

## Intervention Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Staff | AcademicSubject | The academic subject(s) in which the staff is deemed to be "highly qualified". |     |     |     |     |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) |     |     |     |     |
| Cohort | CohortScope | The scope of cohort (e.g., school, district, classroom). |     |     |     |     |
| Cohort | CohortType | The type of cohort (e.g., academic intervention, classroom breakout). |     |     |     |     |
| EducationContent | CostRate | The rate by which the cost applies. |     |     |     |     |
| EducationOrganization <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br /> InterventionStudy | DeliveryMethod | The way in which an intervention was implemented: individual, small group, whole class, or whole school. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br />  InterventionStudy <br /> StudentInterventionAssociation  | Diagnosis | Targeted purpose of the intervention or intervention prescription. (e.g., attendance issue, dropout risk) |     |     |     |     |
| StudentInterventionAttendanceEvent | EducationalEnvironment | The setting in which a child receives education and related services. This attribute is only used if it differs from the EducationalEnvironment of the Section. This is only used in the AttendanceEvent if different from the associated Section. |     |     |     |     |
| EducationOrganization |  EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. |     |     |     |     |
| EducationOrganization | Indicator |The name or code for the indicator or metric. |     |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." |     |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br /> InterventionStudy | GradeLevel | Grade levels participating in the study, the intervention, or prescribed intervention. |     |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType |The type of communication number listed for an individual or organization. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br /> InterventionStudy | InterventionClass | The way in which an intervention is used: curriculum, supplement, or practice. |     |     |     |     |
| InterventionStudy <br /> StudentInterventionAssociation | InterventionEffectiveness | An intervention demonstrates effectiveness if the research has shown that the program caused an improvement in outcomes. Values: positive effects, potentially positive effects, mixed effects, potentially negative effects, negative effects, and no discernible effects. |     |     |     |     |
| Staff | LevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). |     |     |     |     |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). |     |     |     |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). |     |     |     |     |
| Staff | OtherNameType | The types of alternate names for an individual. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br /> InterventionStudy <br /> StudentInterventionAssociation | PopulationServed | A subset of students that are the focus of the intervention, prescription, or study. (e.g. Population for which effectiveness is measured) |     |     |     |     |
| Staff | RecognitionType | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. |     |     |     |     |
| Intervention <br /> InterventionPrescription <br /> PrescriptionStudy <br /> Student | Sex | Sexes for the intervention. If omitted, considered generally applicable. (e.g. A person's sex at birth) |     |     |     |     |
| InterventionStudy <br /> Student | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area, the school system of which the participants of the study are considered to be a part. |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
