---
sidebar_position: 2
---

# Special Education Data Model Domain - Model Diagrams

## Special Education Data Model Domain Model ER Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
 direction TB
 StudentIEP {

 }

 IDEAEvent {

 }

 EducationOrganization {

 }

 StudentIEPServicePrescription["StudentIEP<br/>ServicePrescription"] {

 }

 StudentIEPServiceDelivery {

 }

 Student {

 }

 Staff {

 }

 StudentIEPGoal {

 }

 Student}o..o{EducationOrganization:"has associated"
 Student}o--||StudentIEP:"has"
 Student||--o{IDEAEvent:"has"
 IDEAEvent||--o{EducationOrganization:"has associated"
 IDEAEvent}o..o{StudentIEP:"includes"
 StudentIEPGoal}o--o{IDEAEvent:"has associated"
 StudentIEP||--o{EducationOrganization:"  "
 StudentIEP||--o{StudentIEPServicePrescription:"includes"
 StudentIEP||--o{StudentIEPServiceDelivery:"includes"
 StudentIEP||..o{StudentIEPGoal:"includes"
 StudentIEPServicePrescription||..o{StudentIEPServiceDelivery:"implements"
 StudentIEPServiceDelivery}o..o{Staff:"provides service"
 StudentIEPServiceDelivery}o..o{IDEAEvent:"includes"
 StudentIEPServicePrescription}o..||Staff:"  "
 StudentIEPServicePrescription}o..o{IDEAEvent:"includes"

 style StudentIEP fill:#E1BEE7,stroke:#AA00FF
 style IDEAEvent fill:#E1BEE7,stroke:#AA00FF
 style EducationOrganization fill:#FFE0B2
 style StudentIEPServicePrescription fill:#E1BEE7,stroke:#AA00FF
 style StudentIEPServiceDelivery fill:#E1BEE7,stroke:#AA00FF
 style Student fill:#FFE0B2,stroke:#FF6D00
 style Staff fill:#FFE0B2,stroke:#FF6D00
 style StudentIEPGoal fill:#E1BEE7,stroke:#AA00FF

```

### IDEAEvent

| Field | Type | Required |
| --- | --- | --- |
| IDEAEventIdentifier | Attribute | :white_check_mark: Yes |
| IDEAEvent | Attribute | :white_check_mark: Yes |
| BeginDate | Attribute | :white_check_mark: Yes |
| EndDate | Attribute | :white_check_mark: Yes |
| EventReason | Attribute | :warning: Optional [0..1] |
| EventCompliance | Attribute | :warning: Optional [0..1] |
| EventNarrative | Attribute | :warning: Optional [0..1] |

### StudentIEP

| Field | Type | Required |
| --- | --- | --- |
| StudentIEPIdentifier | Attribute |  :white_check_mark: Yes |
| IEPAmendedDate | Attribute | :white_check_mark: Yes |
| IEPBeginDate | Attribute | :white_check_mark: Yes |
| IEPEndDate | Attribute | :white_check_mark: Yes |
| IEPFinalizedDate | Attribute | :white_check_mark: Yes |
| IEPStatus | Attribute | :white_check_mark: Yes |
| Accommodation | Attribute |  :warning: Optional [0..n] |
| Disability | Attribute |  :warning: Optional [0..n] |
| MedicallyFragile | Attribute | :warning: Optional [0..1] |
| MultiplyDisabled | Attribute | :warning: Optional [0..1] |
| ReasonExited | Attribute | :warning: Optional [0..1] |
| SchoolHoursPerWeek | Attribute | :warning: Optional [0..1] |
| SpecialEducationSetting | Attribute | :warning: Optional [0..1] |
| SpecialEducationHoursPerWeek | Attribute | :warning: Optional [0..1] |

### StudentIEPGoal

| Field | Type | Required |
| --- | --- | --- |
| IEPGoalIdentifier | Attribute |  :white_check_mark: Yes |
| IEPGoalDetails | Attribute | :white_check_mark: Yes |
| IEPGoalType | Attribute | :white_check_mark: Yes |
| GoalAchievementPeriod | Attribute |  :warning: Optional [0..1] |

### StudentIEPServicePrescription

| Field | Type | Required |
| --- | --- | --- |
| ServicePrescription | Attribute |  :white_check_mark: Yes |
| ServicePrescriptionDate | Attribute | :white_check_mark: Yes |
| BeginDate | Attribute | :white_check_mark: Yes |
| Duration | Attribute | :white_check_mark: Yes |
| DurationInterval | Attribute | :white_check_mark: Yes |
| Frequency | Attribute | :white_check_mark: Yes |
| FrequencyInterval | Attribute | :white_check_mark: Yes |
| ServiceLocationType | Attribute | :white_check_mark: Yes |
| StudentIEPServicePrescriptionIdentifier | Attribute | :white_check_mark: Yes |
| EndDate | Attribute |  :warning: Optional [0..1] |

### StudentIEPServiceDelivery

| Field | Type | Required |
| --- | --- | --- |
| IEPServiceDeliveryIdentifier | Attribute |  :white_check_mark: Yes |
| ServiceDelivery | Attribute | :white_check_mark: Yes |
| ServiceDeliveryDate | Attribute | :white_check_mark: Yes |
| Provider | Attribute | :warning: Optional [0..n] |
