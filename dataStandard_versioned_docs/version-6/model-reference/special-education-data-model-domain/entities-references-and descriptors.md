---
sidebar_position: 3
hide_table_of_contents: true
---

# Special Education Data Model Domain - Entities, References, and Descriptors

## Special Education Data Model Domain Entities

| Name | Description |
| --- | --- |
| IDEAEvent | An IDEA related student event describing status, dates and narrative. |
| StudentIEP | This entity represents an Individualized Education Program (IEP) for a student receiving special education services. The IEP is a legally required document that outlines a student's special education services. |
| StudentIEPServicePrescription | The service prescribed to a student as part of their Individual Education Program (IEP). |
| StudentIEPServiceDelivery | Services delivered to a student as prescribed by their Individual Education Program (IEP). |
| StudentIEPGoal | A goal prescribed to a student as part of their Individual Education Program (IEP). |

## Extended References

| Name | Description |
| --- | --- |
| Education Organization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |

## Special Education Data Model Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StudentIEP | Accommodation | The special variation(s) to be used in how various services (in general) are presented, how they are administered, or how the student is allowed to respond. This generally refers to changes that do not substantially alter the content that the service renders. The proper use of accommodations does not substantially change academic level or performance criteria. | Local |     | Yes |     |
| StudentIEP | Disability | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| StudentIEP | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| StudentIEP |DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     |     |     |
| StudentIEPServicePrescription | DurationInterval | How often the prescribed service is to be provided within the specified duration period. Examples include: Per Session, Per Week, Per Month. |     |     |     |     |
| IDEAEvent| EventCompliance | The type of compliance represented by this event. |     |     |     |     |
| IDEAEvent | EventReason | The reason why the IDEA event occurred. |     |     |     |     |
| StudentIEPServicePrescription | FrequencyInterval | How often the frequency should repeat for the prescribed service. Examples include: Per Session, Weekly, Monthly. |     |     |     |     |
| IDEAEvent | IDEAEvent | The IDEA event recorded for the student. |     |     |     |     |
| StudentIEP | IEPStatus | The current status of the IEP. |     |     |     |     |
| StudentIEPGoal | IEPGoalType | A focused goal prescribed as part of the IEP. Examples include Academic Goal, Behavioral Goal, Attendance Goal. |     |     |     |     |
| StudentIEP | ReasonExited | The reason why a person stops receiving special education services. |     |     |     |     |
| StudentIEPServiceDelivery | ServiceDelivery | The type of services delivered to the student. |     |     |     |     |
| StudentIEPServicePrescription | ServiceLocationType | The type of location where the prescribed service is to be provided. Examples include: Home, Hospital, School. |     |     |     |     |
| StudentIEPServicePrescription | ServicePrescription | The type of service prescribed. Examples include: Auditory Specialist, Vocational Therapy. |     |     |     |     |
| StudentIEPServiceDelivery | ServiceProviderType | The type of services delivered to the student. |     |     |     |     |
| StudentIEP | SpecialEducationSetting | The major instructional setting (more than 50 percent of a student's special education program). | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
