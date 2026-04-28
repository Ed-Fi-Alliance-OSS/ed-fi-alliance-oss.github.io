---
sidebar_position: 2
hide_table_of_contents: true
---

# Alternative and Supplemental Services Domain - Model Diagrams

This section contains reference information for the Alternative and Supplemental
Services domain model and subdomains.

## Alternative and Supplemental Services Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Program {
    }
    Staff {
    }
    GeneralStudentProgramAssociation["GeneralStudent<br/>ProgramAssociation"]  {
    }
    StaffProgramAssociation {
    }
    Section {
    }
    StudentSectionAssociation {
    }
    Student {
    }
    EducationOrganization {
    }
    StudentSectionAttendanceEvent["StudentSection<br/>AttendanceEvent"] {
    }
    StudentSchoolAttendanceEvent["StudentSchool<br/>AttendanceEvent"] {
    }
    StudentProgramAttendanceEvent["StudentProgram<br/>AttendanceEvent"] {
    }
    StudentSpecialEducationProgramEligibilityAssociation["StudentSpecialEducation<br/>ProgramEligibility<br/>Association"] {
    }
    School {
    }
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    Program ||--o{ Staff : "has associated"
    Section ||--o{ Program : "has associated"
    Student ||--o{ School : "has associated"
    Student ||--o{ GeneralStudentProgramAssociation : "has associated"
    Student ||--o{ StaffProgramAssociation : "has associated"
    Staff ||--o{ StaffProgramAssociation : "has associated"
    Student ||--o{ StudentSectionAssociation : "has associated"
    Section ||--o{ StudentSectionAssociation : "has associated"
    Student ||--o{ StudentSpecialEducationProgramEligibilityAssociation : "has associated"
    StudentSectionAttendanceEvent ||--o{ Student : "has associated"
    StudentSectionAttendanceEvent ||--o{ Section : "has associated"
    StudentSchoolAttendanceEvent ||--o{ School : "has associated"
    StudentSchoolAttendanceEvent ||--o{ Student : "has associated"
    StudentProgramAttendanceEvent ||--o{ EducationOrganization : "has associated"
    StudentProgramAttendanceEvent ||--o{ Program : "has associated"
```

## Detailed - Alternative and Supplemental Services Model UML Diagram

[Detailed - Alternative and Supplemental Services Model UML Diagram](/files/dataStandard/uml-diagrams/v6/alternative-and-supplemental-services/alternative-and-supplemental-services-detailed.mmd)

```mermaid
---
title: AlternativeAndSupplementalServices
config:
  layout: elk
---
erDiagram
    Program {
        reference EducationOrganization "I"
        string ProgramId "O"
        string ProgramName "I"
        descriptor ProgramType "I"
        descriptor ProgramCharacteristic "OC"
        descriptor ProgramSponsor "OC"
        reference LearningStandard "OC"
    }
    Staff {
        string StaffUniqueId "I"
        common Name "R"
        common OtherName "OC"
        date BirthDate "O"
        descriptor HighestCompletedLevelOfEducation "O"
        decimal YearsOfPriorProfessionalExperience "O"
        decimal YearsOfPriorTeachingExperience "O"
        string LoginId "O"
        bool HighlyQualifiedTeacher "O"
        common Recognition "OC"
        reference Credential "OC"
        reference Person "O"
        descriptor HighlyQualifiedAcademicSubject "OC"
        common EducatorResearch "O"
        reference EducatorPreparationProgram "OC"
        reference OpenStaffPosition "O"
    }
    GeneralStudentProgramAssociation {
        reference Student "I"
        reference Program "I"
        date BeginDate "I"
        date EndDate "O"
        descriptor ReasonExited "O"
        reference EducationOrganization "I"
        bool ServedOutsideOfRegularSession "O"
        common ProgramParticipationStatus "OC"
    }
    StaffProgramAssociation {
        reference Staff "I"
        reference Program "I"
        date BeginDate "I"
        date EndDate "O"
        bool StudentRecordAccess "O"
    }
    Section {
        string SectionIdentifier "I"
        descriptor SectionType "O"
        integer SequenceOfCourse "O"
        descriptor EducationalEnvironment "O"
        descriptor MediumOfInstruction "O"
        descriptor PopulationServed "O"
        common AvailableCredits "O"
        descriptor SectionCharacteristic "OC"
        descriptor InstructionLanguage "O"
        reference CourseOffering "I"
        reference LocationSchool "O"
        reference Location "O"
        reference ClassPeriod "OC"
        reference Program "OC"
        descriptor CourseLevelCharacteristic "OC"
        descriptor OfferedGradeLevel "OC"
        bool OfficialAttendancePeriod "O"
        string SectionName "O"
    }
    StudentSectionAssociation {
        reference Student "I"
        reference Section "I"
        date BeginDate "I"
        date EndDate "O"
        bool HomeroomIndicator "O"
        descriptor RepeatIdentifier "O"
        bool TeacherStudentDataLinkExclusion "O"
        descriptor AttemptStatus "O"
        reference Program "OC"
        common DualCredit "O"
    }
    Student {
        string StudentUniqueId "I"
        common Name "R"
        common OtherName "OC"
        common BirthData "R"
        reference Person "O"
    }
    EducationOrganization {
        integer EducationOrganizationId "I"
        string NameOfInstitution "R"
        string ShortNameOfInstitution "O"
        descriptor EducationOrganizationCategory "RC"
        common Address "OC"
        common InternationalAddress "OC"
        common InstitutionTelephone "OC"
        string WebSite "O"
        descriptor OperationalStatus "O"
        common EducationOrganizationIndicator "OC"
    }
    StudentSectionAttendanceEvent {
        common AttendanceEvent "R"
        reference Student "I"
        reference Section "I"
        integer SectionAttendanceDuration "O"
        time ArrivalTime "O"
        time DepartureTime "O"
        reference ClassPeriod "OC"
    }
    StudentSchoolAttendanceEvent {
        common AttendanceEvent "R"
        reference Student "I"
        reference School "I"
        reference Session "I"
        integer SchoolAttendanceDuration "O"
        time ArrivalTime "O"
        time DepartureTime "O"
    }
    StudentProgramAttendanceEvent {
        common AttendanceEvent "R"
        reference Student "I"
        reference EducationOrganization "I"
        reference Program "I"
        integer ProgramAttendanceDuration "O"
    }
    StudentSpecialEducationProgramEligibilityAssociation {
        reference EducationOrganization "I"
        reference Student "I"
        reference Program "I"
        date ConsentToEvaluationReceivedDate "I"
        date OriginalECIServicesDate "O"
        descriptor IDEAPart "R"
        date ConsentToEvaluationDate "O"
        bool EvaluationCompleteIndicator "O"
        date EligibilityEvaluationDate "O"
        descriptor EligibilityEvaluationType "O"
        descriptor EvaluationDelayReason "O"
        string EvaluationLateReason "O"
        integer EvaluationDelayDays "O"
        date EligibilityDeterminationDate "O"
        bool IDEAIndicator "O"
        descriptor EligibilityDelayReason "O"
        date TransitionNotificationDate "O"
        date TransitionConferenceDate "O"
        date EligibilityConferenceDate "O"
    }
    School {
        integer SchoolId "I"
        descriptor GradeLevel "RC"
        descriptor SchoolCategory "OC"
        descriptor SchoolType "O"
        descriptor CharterStatus "O"
        descriptor TitleIPartASchoolDesignation "O"
        descriptor MagnetSpecialProgramEmphasisSchool "O"
        descriptor AdministrativeFundingControl "O"
        descriptor InternetAccess "O"
        reference LocalEducationAgency "O"
        descriptor CharterApprovalAgencyType "O"
        enumeration CharterApprovalSchoolYear "O"
        descriptor FederalLocaleCode "O"
        reference PostSecondaryInstitution "O"
        bool ImprovingSchool "O"
        descriptor AccreditationStatus "O"
    }
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    Program ||--o{ Staff : "has associated"
    Section ||--o{ Program : "has associated"
    Student ||--o{ School : "has associated"
    Student ||--o{ GeneralStudentProgramAssociation : "has associated"
    Student ||--o{ StaffProgramAssociation : "has associated"
    Staff ||--o{ StaffProgramAssociation : "has associated"
    Student ||--o{ StudentSectionAssociation : "has associated"
    Section ||--o{ StudentSectionAssociation : "has associated"
    Student ||--o{ StudentSpecialEducationProgramEligibilityAssociation : "has associated"
    StudentSectionAttendanceEvent ||--o{ Student : "has associated"
    StudentSectionAttendanceEvent ||--o{ Section : "has associated"
    StudentSchoolAttendanceEvent ||--o{ School : "has associated"
    StudentSchoolAttendanceEvent ||--o{ Student : "has associated"
    StudentProgramAttendanceEvent ||--o{ EducationOrganization : "has associated"
    StudentProgramAttendanceEvent ||--o{ Program : "has associated"
```

### Federal Programs Subdomain

#### Alternative and Supplemental Services, Federal Programs Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Program {
    }
    Student {
    }
    EducationOrganization {
    }
    GeneralStudentProgramAssociation {
    }
    StudentCTEProgramAssociation {
    }
    StudentHomelessProgramAssociation {
    }
    StudentLanguageInstructionProgramAssociation {
    }
    StudentMigrantEducationProgramAssociation {
    }
    StudentNeglectedOrDelinquentProgramAssociation {
    }
    StudentProgramAssociation {
    }
    StudentSchoolFoodServiceProgramAssociation {
    }
    StudentSpecialEducationProgramAssociation {
    }
    StudentTitleIPartAProgramAssociation {
    }
    StudentSpecialEducationProgramEligibilityAssociation {
    }
    StudentSection504ProgramAssociation {
    }
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "has associated"
    StudentSpecialEducationProgramEligibilityAssociation ||--o{ EducationOrganization : "has associated"
    StudentCTEProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentHomelessProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentLanguageInstructionProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentMigrantEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentNeglectedOrDelinquentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSchoolFoodServiceProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSpecialEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentTitleIPartAProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSection504ProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
```

#### Detailed - Alternative and Supplemental Services, Federal Programs Model UML Diagram

```mermaid
---
title: AlternativeAndSupplementalServices-FederalPrograms
config:
  layout: elk
---
erDiagram
    Program {
        reference EducationOrganization "I"
        string ProgramId "O"
        string ProgramName "I"
        descriptor ProgramType "I"
        descriptor ProgramCharacteristic "OC"
        descriptor ProgramSponsor "OC"
        reference LearningStandard "OC"
    }
    Student {
        string StudentUniqueId "I"
        common Name "R"
        common OtherName "OC"
        common BirthData "R"
        reference Person "O"
    }
    EducationOrganization {
        integer EducationOrganizationId "I"
        string NameOfInstitution "R"
        string ShortNameOfInstitution "O"
        descriptor EducationOrganizationCategory "RC"
        common Address "OC"
        common InternationalAddress "OC"
        common InstitutionTelephone "OC"
        string WebSite "O"
        descriptor OperationalStatus "O"
        common EducationOrganizationIndicator "OC"
    }
    GeneralStudentProgramAssociation {
        reference Student "I"
        reference Program "I"
        date BeginDate "I"
        date EndDate "O"
        descriptor ReasonExited "O"
        reference EducationOrganization "I"
        bool ServedOutsideOfRegularSession "O"
        common ProgramParticipationStatus "OC"
    }
    StudentCTEProgramAssociation {
        bool NonTraditionalGenderStatus "O"
        bool PrivateCTEProgram "O"
        descriptor TechnicalSkillsAssessment "O"
        common CTEProgramService "OC"
    }
    StudentHomelessProgramAssociation {
        descriptor HomelessPrimaryNighttimeResidence "O"
        bool AwaitingFosterCare "O"
        bool HomelessUnaccompaniedYouth "O"
        common HomelessProgramService "OC"
    }
    StudentLanguageInstructionProgramAssociation {
        common EnglishLanguageProficiencyAssessment "OC"
        bool EnglishLearnerParticipation "O"
        common LanguageInstructionProgramService "OC"
        integer Dosage "O"
    }
    StudentMigrantEducationProgramAssociation {
        bool PriorityForServices "R"
        date LastQualifyingMove "R"
        descriptor ContinuationOfServicesReason "O"
        date USInitialEntry "O"
        date USMostRecentEntry "O"
        date USInitialSchoolEntry "O"
        date QualifyingArrivalDate "O"
        date StateResidencyDate "O"
        date EligibilityExpirationDate "O"
        common MigrantEducationProgramService "OC"
    }
    StudentNeglectedOrDelinquentProgramAssociation {
        descriptor NeglectedOrDelinquentProgram "O"
        descriptor ELAProgressLevel "O"
        descriptor MathematicsProgressLevel "O"
        common NeglectedOrDelinquentProgramService "OC"
    }
    StudentProgramAssociation {
        common Service "OC"
    }
    StudentSchoolFoodServiceProgramAssociation {
        bool DirectCertification "O"
        common SchoolFoodServiceProgramService "OC"
    }
    StudentSpecialEducationProgramAssociation {
        bool IdeaEligibility "O"
        descriptor SpecialEducationSetting "O"
        common ServiceProvider "OC"
        decimal SpecialEducationHoursPerWeek "O"
        decimal SchoolHoursPerWeek "O"
        bool ShortenedSchoolDayIndicator "O"
        decimal ReductionInHoursPerWeekComparedToPeers "O"
        bool MultiplyDisabled "O"
        bool MedicallyFragile "O"
        date IEPLastEvaluationDate "O"
        date IEPLastReviewDate "O"
        date IEPEvaluationDueDate "O"
        date IEPReviewDueDate "O"
        date IEPBeginDate "O"
        date IEPEndDate "O"
        common Disability "OC"
        common SpecialEducationProgramService "OC"
        date SpecialEducationExitDate "O"
        descriptor SpecialEducationExitReason "O"
        string SpecialEducationExitExplained "O"
    }
    StudentTitleIPartAProgramAssociation {
        descriptor TitleIPartAParticipant "R"
        common TitleIPartAProgramService "OC"
    }
    StudentSpecialEducationProgramEligibilityAssociation {
        reference EducationOrganization "I"
        reference Student "I"
        reference Program "I"
        date ConsentToEvaluationReceivedDate "I"
        date OriginalECIServicesDate "O"
        descriptor IDEAPart "R"
        date ConsentToEvaluationDate "O"
        bool EvaluationCompleteIndicator "O"
        date EligibilityEvaluationDate "O"
        descriptor EligibilityEvaluationType "O"
        descriptor EvaluationDelayReason "O"
        string EvaluationLateReason "O"
        integer EvaluationDelayDays "O"
        date EligibilityDeterminationDate "O"
        bool IDEAIndicator "O"
        descriptor EligibilityDelayReason "O"
        date TransitionNotificationDate "O"
        date TransitionConferenceDate "O"
        date EligibilityConferenceDate "O"
    }
    StudentSection504ProgramAssociation {
        bool Section504Eligibility "R"
        bool AccommodationPlan "O"
        descriptor Section504Disability "O"
        date Section504MeetingDate "O"
        date Section504EligibilityDecisionDate "O"
    }
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "has associated"
    StudentSpecialEducationProgramEligibilityAssociation ||--o{ EducationOrganization : "has associated"
    StudentCTEProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentHomelessProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentLanguageInstructionProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentMigrantEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentNeglectedOrDelinquentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSchoolFoodServiceProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSpecialEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentTitleIPartAProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSection504ProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
```
