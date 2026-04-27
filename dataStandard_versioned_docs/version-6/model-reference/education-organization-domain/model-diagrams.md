---
sidebar_position: 2
hide_table_of_contents: true
---

# Education Organization Domain - Model Diagrams

## Education Organization Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    EducationOrganization {
    }
    EducationOrganizationIdentificationCode["EducationOrganization<br/>IdentificationCode"] {
    }
    StateEducationAgency {
    }
    LocalEducationAgency {
    }
    EducationServiceCenter {
    }
    School {
    }
    PostSecondaryInstitution {
    }
    AccountabilityRating {
    }
    EducationOrganizationNetwork {
    }
    EducationOrganizationNetworkAssociation["EducationOrganization<br/>NetworkAssociation"] {
    }
    FeederSchoolAssociation {
    }
    CommunityOrganization {
    }
    CommunityProvider {
    }
    CommunityProviderLicense {
    }
    OrganizationDepartment {
    }
    StateEducationAgency ||--o{ EducationOrganization : "relates to"
    EducationServiceCenter ||--o{ EducationOrganization : "relates to"
    School ||--o{ EducationOrganization : "relates to"
    PostSecondaryInstitution ||--o{ EducationOrganization : "relates to"
    CommunityOrganization ||--o{ EducationOrganization : "relates to"
    OrganizationDepartment ||--o{ EducationOrganization : "relates to"
    EducationOrganization ||--o{ EducationOrganization : "relates to"
    EducationOrganization ||--o{ EducationOrganizationNetwork : "relates to"
    EducationOrganizationNetwork ||--o{ EducationOrganization : "relates to"
    AccountabilityRating ||--o{ EducationOrganization : "relates to"
    EducationOrganizationNetworkAssociation ||--o{ EducationOrganizationNetwork : "relates to"
    School ||--o{ LocalEducationAgency : "relates to"
    LocalEducationAgency ||--o{ EducationServiceCenter : "relates to"
    LocalEducationAgency ||--o{ LocalEducationAgency : "relates to"
    EducationServiceCenter ||--o{ StateEducationAgency : "relates to"
    LocalEducationAgency ||--o{ StateEducationAgency : "relates to"
    FeederSchoolAssociation ||--o{ School : "relates to"
    CommunityProvider ||--o{ CommunityOrganization : "relates to"
    CommunityProviderLicense ||--o{ CommunityProvider : "relates to"
    EducationOrganizationIdentificationCode ||--o{ EducationOrganization : "relates to"
```
