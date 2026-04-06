---
sidebar_position: 3
hide_table_of_contents: true
---

# Special Education Data Model Domain - Entities, References, and Descriptors

:::important

EARLY ACCESS DOMAIN (Released in version 6.1) - This domain is being released in order to allow early adopters a chance to preview and test the proposed update and provide feedback
on its viability for possible future enhancements. This domain should not be considered fully stable at this time. See [Early Access Material](https://docs.ed-fi.org/reference/data-exchange/versioning-and-releases/#early-access-material) for more information.

:::

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

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Accommodation | StudentIEP | The special variation(s) to be used in how various services (in general) are presented, how they are administered, or how the student is allowed to respond. This generally refers to changes that do not substantially alter the content that the service renders. The proper use of accommodations does not substantially change academic level or performance criteria. | Local |     | Yes |     |
| Disability | StudentIEP | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| DisabilityDesignation | StudentIEP | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| DisabilityDeterminationSourceType | StudentIEP | The source that provided the disability determination. | Orthodox |     |     |     |
| DurationInterval | StudentIEPServicePrescription | How often the prescribed service is to be provided within the specified duration period. Examples include: Per Session, Per Week, Per Month. |     |     |     |     |
|EventCompliance |  IDEAEvent | The type of compliance represented by this event. |     |     |     |     |
| EventReason | IDEAEvent | The reason why the IDEA event occurred. |     |     |     |     |
| FrequencyInterval | StudentIEPServicePrescription | How often the frequency should repeat for the prescribed service. Examples include: Per Session, Weekly, Monthly. |     |     |     |     |
| IDEAEventType | IDEAEvent  | The IDEA event recorded for the student. |     |     |     |     |
| IEPStatus | StudentIEP  | The current status of the IEP. |     |     |     |     |
| IEPGoalType | StudentIEPGoal | A focused goal prescribed as part of the IEP. Examples include Academic Goal, Behavioral Goal, Attendance Goal. |     |     |     |     |
| ReasonExited | StudentIEP  | The reason why a person stops receiving special education services. |     |     |     |     |
| ServiceDelivery | StudentIEPServiceDelivery | The type of services delivered to the student. |     |     |     |     |
| ServiceLocationType | StudentIEPServicePrescription | The type of location where the prescribed service is to be provided. Examples include: Home, Hospital, School. |     |     |     |     |
| ServicePrescription | StudentIEPServicePrescription  | The type of service prescribed. Examples include: Auditory Specialist, Vocational Therapy. |     |     |     |     |
| ServiceProviderType | StudentIEPServiceDelivery | The type of services delivered to the student. |     |     |     |     |
| SpecialEducationSetting | StudentIEP | The major instructional setting (more than 50 percent of a student's special education program). | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
