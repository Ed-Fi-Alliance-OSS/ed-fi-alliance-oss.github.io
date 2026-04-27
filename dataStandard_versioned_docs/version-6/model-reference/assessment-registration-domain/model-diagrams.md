---
sidebar_position: 2
hide_table_of_contents: true
---

# Assessment Registration Domain - Model Diagrams

The UML diagram below illustrates the model for the Assessment Registration domain
with its entities, attributes and associations.

```mermaid
---
config:
  layout: elk
---
erDiagram
    Assessment {
    }
    AssessmentAdministration {
    }
    AssessmentAdministrationParticipation["AssessmentAdministration<br/>Participation"] {
    }
    AssessmentBatteryPart {
    }
    ObjectiveAssessment {
    }
    StudentAssessmentRegistration {
    }
    StudentAssessmentRegistrationBatteryPartAssociation["StudentAssessment<br/>RegistrationBattery<br/>PartAssociation"] {
    }
    StudentEducationOrganizationAssessmentAccommodation["StudentEducation<br/>OrganizationAssessment<br/>Accommodation"] {
    }
    Student {
    }
    StudentDemographic {
    }
    StudentSchoolAssociation {
    }
    EducationOrganization {
    }
    LocalEducationAgency {
    }
    School {
    }
    School ||--o{ EducationOrganization : "has associated"
    School ||--o{ LocalEducationAgency : "has associated"
    LocalEducationAgency ||--o{ EducationOrganization : "has associated"
    AssessmentBatteryPart ||--o{ Assessment : "has associated"
    AssessmentBatteryPart ||--o{ ObjectiveAssessment : "has associated"
    ObjectiveAssessment ||--o{ Assessment : "has associated"
    AssessmentAdministration ||--o{ AssessmentBatteryPart : "has associated"
    AssessmentAdministration ||--o{ EducationOrganization : "has associated"
    AssessmentAdministrationParticipation ||--o{ AssessmentAdministration : "has associated"
    AssessmentAdministrationParticipation ||--o{ EducationOrganization : "has associated"
    StudentAssessmentRegistration ||--o{ AssessmentAdministration : "has associated"
    StudentAssessmentRegistration ||--o{ StudentSchoolAssociation : "has associated"
    StudentAssessmentRegistration ||--o{ EducationOrganization : "has associated"
    StudentAssessmentRegistration ||--o{ StudentEducationOrganizationAssessmentAccommodation : "has associated"
    StudentAssessmentRegistrationBatteryPartAssociation ||--o{ StudentAssessmentRegistration : "has associated"
    StudentAssessmentRegistrationBatteryPartAssociation ||--o{ AssessmentBatteryPart : "has associated"
    StudentEducationOrganizationAssessmentAccommodation ||--o{ Student : "has associated"
    StudentEducationOrganizationAssessmentAccommodation ||--o{ EducationOrganization : "has associated"
    StudentSchoolAssociation ||--o{ Student : "has associated"
    StudentSchoolAssociation ||--o{ EducationOrganization : "has associated"
    StudentDemographic ||--o{ Student : "has associated"
```
