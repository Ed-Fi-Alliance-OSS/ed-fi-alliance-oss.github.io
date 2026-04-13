---
sidebar_position: 2
---

# Alternative and Supplemental Services Domain - Model Diagrams

This section contains reference information for the Alternative and Supplemental
Services domain model and subdomains.

## Alternative and Supplemental Services Model UML Diagram

```mermaid
---

config:
  layout: elk
title: AlternativeAndSupplementalServices
---

erDiagram
    Program {
        EligibilityConferenceDate "0..1"
        ProgramId "0..1"
        ProgramName
    }
    Staff {
        ProgramType
        ProgramCharacteristic "0..n"
        ProgramSponsor "0..n"
        StaffUniqueId
        Name
        OtherName "0..n"
        Sex "0..1"
        GenderIdentity "0..1"
        BirthDate "0..1"
        Address "0..n"
        InternationalAddress "0..n"
        Telephone"0..n"
        ElectronicMail "0..n"
        HispanicLatinoEthnicity "0..1"
        Race "0..n"
    }
    GeneralStudentProgramAssociation {
        string BeginDate
        EndDate "0..1"
    }
    StaffProgramAssociation {
        string BeginDate
    }
    Section {
        EndDate "0..1"
        StudentRecordAccess "0..1"
        string SectionIdentifier "0..1"
        SequenceOfCourse "0..1"
        EducationalEnvironment "0..1"
        MediumOfInstruction "0..1"
        PopulationServed "0..1"
        AvailableCredits "0..1"
    }
    StudentSectionAssociation {
        BeginDate
        EndDate "0..1"
        HomeroomIndicator "0..1"
    }
    Student {
        AccreditationStatus "0..1 NEW v6.0"
        StudentUniqueId
        Name
    }
    EducationOrganization {
        EducationOrganizationId
        NameOfInstitution
        ShortNameOfInstitution "0..1"
        EducationOrganizationCategory "1..n"
        Address "0..n"
    }
    StudentSectionAttendanceEvent {
        string AttendanceEvent
        SectionAttendanceDuration "0..1"
        ArrivalTime "0..1"
        DepartureTime "0..1"
    }
    StudentSchoolAttendanceEvent {
        AttendanceEvent
        SchoolAttendanceDuration"0..1"
        ArrivalTime "0..1"
        DepartureTime "0..1"
    }
    StudentProgramAttendanceEvent {
        AttendanceEvent
        ProgramAttendanceDuration "0..1"
    }
    StudentSpecialEducationProgramEligibilityAssociation {
        string ConsentToEvaluationReceivedDate
        OriginalECIServicesDate "0..1"
        IDEAPart
        ConsentToEvaluationDate "0..1"
        EvaluationCompleteIndicator "0..1"
        EligibilityEvaluationDate "0..1"
        EligibilityEvaluationType "0..1"
        EvaluationDelayReason "0..1"
    }
    School {
        string SchoolId
        GradeLevel "1..n"
        SchoolCategory "0..n"
        SchoolType "0..1"
        CharterStatus "0..1"
        TitleIPartASchoolDesignation "0..1"
        MagnetSpecialProgramEmphasisSchool "0..1"
        AdministrativeFundingControl "0..1"
        InternetAccess "0..1"
        CharterApprovalAgencyType "0..1"
        CharterApprovalSchoolYear"0..1"
        FederalLocaleCode " 0..1 NEW v6.0"
        ImprovingSchool "0..1 NEW v6.0"
    }
    EducationOrganization ||--o{ Program : "has"
    Student ||--o{ Program : "has"
    Program ||--o{ Staff : "has"
    GeneralStudentProgramAssociation ||--|| School : "extends"
    Section ||--o{ School : "has"
    Student ||--o{ School : "has"
    Staff ||--o{ School : "has"
    StudentSchoolAttendanceEvent ||--o{ School : "has"
    StudentSchoolAttendanceEvent ||--o{ Student : "has"
    StudentProgramAttendanceEvent ||--o{ Student : "has"
    StudentProgramAttendanceEvent ||--o{ EducationOrganization : "has"
    StudentProgramAttendanceEvent ||--o{ Program : "has"
    StudentSectionAttendanceEvent ||--o{ Section : "has"

```

### Federal Programs Subdomain

#### Alternative and Supplemental Services, Federal Programs Model UML Diagram

![Federal Programs Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/AlternativeAndSupplementalServices_FederalPrograms_v6.X.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/AlternativeAndSupplementalServices_FederalPrograms_v6.X.png)
