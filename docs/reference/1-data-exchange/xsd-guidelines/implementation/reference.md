---
sidebar_position: 2
---

# XML Schema - Extended Reference Types

Extended reference types provide the mechanism for denoting associations in Ed-Fi XML interchange data. The reference may be to an entity in the same interchange file, an entity in a separate interchange file, or an entity presumed to exist in the system receiving the bulk data. For example, assessment results generally need to reference student records (which are often already in the data store) and assessment metadata (which may be in a separate interchange file traveling with the results, or in the case of statewide tests, may already be in the data store).

Extended reference types define associations in one of three ways:

* Using an XML `IDREF` to refer to an ID defined for an entity within the same interchange file.
* Specifying attributes that represent the natural key for the entity (which may be either in the same interchange file or previously loaded).
* Optionally, specifying attributes that provide enough information to look up the entity from those previously loaded, when appropriate.

Extended reference types are used when an entity or association must reference another, as follows:

* When an entity has an association with another and that association has no attributes, then the entity uses an extended reference type to reference the other entity.
* When an association has attributes, the association uses an extended reference type to reference the associated entity.

Each extended reference type extends the base ReferenceType complex type, as defined below:

```xml
<xs:complexType name="ReferenceType">
     . . .
 <xs:attribute name="id" type="xs:ID">
     . . .
 <xs:attribute name="ref" type="xs:IDREF">
     . . .
</xs:complexType>
```

For example, the extended reference type for a SessionReferenceType is:

```xml
<xs:complexType name="SessionReferenceType">
     . . .
 <xs:complexContent>
  <xs:extension base="ReferenceType">
   <xs:sequence>
    <xs:element name="SessionIdentity" type="SessionIdentityType" minOccurs="0">
                . . .
    <xs:element name="SessionLookup" type="SessionLookupType" minOccurs="0">
                . . .
   </xs:sequence>
  </xs:extension>
 </xs:complexContent>
</xs:complexType>
```

The SessionReferenceType allows the reference to be made in one of three ways:

* Using an XML `IDREF` (if interchanged in the file)
* Specifying the natural key information contained in the type's SessionIdentityType, as follows:

```xml
<xs:complexType name="SessionIdentityType">
     . . .
     <xs:sequence>
         <xs:element name="SessionName" type="IdentificationCode">
         . . .
         <xs:element name="SchoolYear" type="SchoolYearType">
         . . .
         <xs:element name="SchoolReference" type="SchoolReferenceType">
         . . .
     </xs:sequence>
</xs:complexType>
```

* Specifying attributes in the types SessionLookupType to provide enough information to look up the entity from those previously loaded, as follows:

```xml
<xs:complexType name="SessionLookupType">
    . . .
 <xs:sequence>
  <xs:element name="SessionName" type="IdentificationCode" minOccurs="0">
        . . .
  <xs:element name="SchoolYear" type="SchoolYearType" minOccurs="0">
        . . .
  <xs:element name="Term" type="TermDescriptorReferenceType" minOccurs="0">
        . . .
  <xs:element name="SchoolReference" type="SchoolReferenceType" minOccurs="0">
        . . .
 </xs:sequence>
</xs:complexType>
```

Thus, when CourseOffering refers to its association with a Session, it defines a SessionReference of the type SessionReferenceType, as follows:

```xml
<xs:complexType name="CourseOffering">
    . . .
 <xs:complexContent>
  <xs:extension base="ComplexObjectType">
   <xs:sequence>
    . . .
    <xs:element name="SessionReference" type="SessionReferenceType"/>
    . . .
   </xs:sequence>
  </xs:extension>
 </xs:complexContent>
</xs:complexType>
```

In associations with attributes, extended reference types are similarly used to relate the associated entities. For example, the StudentParentAssociation has a StudentReference and a ParentReference, as shown below. The StudentReference is of type StudentReferenceType and the ParentReference is of type ParentReferenceType.

```xml
<xs:complexType name="StudentParentAssociation">
    . . .
 <xs:complexContent>
  <xs:extension base="ComplexObjectType">
   <xs:sequence>
    <xs:element name="StudentReference" type="StudentReferenceType">
                . . .
    <xs:element name="ParentReference" type="ParentReferenceType"/>
    . . .
   </xs:sequence>
  </xs:extension>
 </xs:complexContent>
</xs:complexType>
```

The StudentIdentityType and the StudentLookupType (used within the StudentReferenceType) provide several options for specifying the identity of a student, as is shown below.

```xml
<xs:complexType name="StudentIdentityType">
    . . .
 <xs:sequence>
  <xs:element name="StudentUniqueId" type="UniqueId">
        . . .
 </xs:sequence>
</xs:complexType>

<xs:complexType name="StudentLookupType">
    . . .
 <xs:sequence>
  <xs:element name="StudentUniqueId" type="UniqueId" minOccurs="0">
        . . .
  <xs:element name="StudentIdentificationCode" type="StudentIdentificationCode" minOccurs="0">
        . . .
  <xs:element name="Name" type="Name" minOccurs="0">
        . . .
  <xs:element name="OtherName" type="OtherName" minOccurs="0">
        . . .
  <xs:element name="BirthData" type="BirthData" minOccurs="0">
        . . .
  <xs:element name="EducationOrganizationReference" type="EducationOrganizationReferenceType" minOccurs="0">
        . . .
 </xs:sequence>
</xs:complexType>
```

First, a student may be specified by a StudentUniqueId provided by the StudentIdentityType. Alternatively, additional attributes provided by the StudentLookup may be specified for lookup providing a combination of StudentUniqueId, StudentIdentificationCode, Name, OtherName, BirthData, and/or EducationOrganizationReference.

## Reference Types in v3.1

The following is a complete list of reference types in Ed-Fi Data Standard v3.1:

* AcademicWeekReferenceType
* AccountCodeReferenceType
* AccountReferenceType
* AccountabilityRatingReferenceType
* ActualReferenceType
* AssessmentItemReferenceType
* AssessmentReferenceType
* BellScheduleReferenceType
* BudgetReferenceType
* CalendarDateReferenceType
* CalendarReferenceType
* ClassPeriodReferenceType
* CohortReferenceType
* CommunityOrganizationReferenceType
* CommunityProviderLicenseReferenceType
* CommunityProviderReferenceType
* CompetencyObjectiveReferenceType
* ContractedStaffReferenceType
* CourseOfferingReferenceType
* CourseReferenceType
* CourseTranscriptReferenceType
* CredentialReferenceType
* DisciplineActionReferenceType
* DisciplineIncidentReferenceType
* EducationContentReferenceType
* EducationOrganizationInterventionPrescriptionAssociationReferenceType
* EducationOrganizationNetworkAssociationReferenceType
* EducationOrganizationNetworkReferenceType
* EducationOrganizationPeerAssociationReferenceType
* EducationOrganizationReferenceType
* EducationServiceCenterReferenceType
* FeederSchoolAssociationReferenceType
* GeneralStudentProgramAssociationReferenceType
* GradeReferenceType
* GradebookEntryReferenceType
* GradingPeriodReferenceType
* GraduationPlanReferenceType
* InterventionPrescriptionReferenceType
* InterventionReferenceType
* InterventionStudyReferenceType
* LearningObjectiveReferenceType
* LearningStandardReferenceType
* LocalEducationAgencyReferenceType
* LocationReferenceType
* ObjectiveAssessmentReferenceType
* OpenStaffPositionReferenceType
* ParentReferenceType
* PayrollReferenceType
* PostSecondaryEventReferenceType
* PostSecondaryInstitutionReferenceType
* ProgramReferenceType
* ReferenceType
* ReportCardReferenceType
* RestraintEventReferenceType
* SchoolReferenceType
* SectionAttendanceTakenEventReferenceType
* SectionReferenceType
* SessionReferenceType
* StaffAbsenceEventReferenceType
* StaffCohortAssociationReferenceType
* StaffEducationOrganizationAssignmentAssociationReferenceType
* StaffEducationOrganizationContactAssociationReferenceType
* StaffEducationOrganizationEmploymentAssociationReferenceType
* StaffLeaveReferenceType
* StaffProgramAssociationReferenceType
* StaffReferenceType
* StaffSchoolAssociationReferenceType
* StaffSectionAssociationReferenceType
* StateEducationAgencyReferenceType
* StudentAcademicRecordReferenceType
* StudentAssessmentReferenceType
* StudentCTEProgramAssociationReferenceType
* StudentCohortAssociationReferenceType
* StudentCompetencyObjectiveReferenceType
* StudentDisciplineIncidentAssociationReferenceType
* StudentEducationOrganizationAssociationReferenceType
* StudentEducationOrganizationResponsibilityAssociationReferenceType
* StudentGradebookEntryReferenceType
* StudentHomelessProgramAssociationReferenceType
* StudentInterventionAssociationReferenceType
* StudentInterventionAttendanceEventReferenceType
* StudentLanguageInstructionProgramAssociationReferenceType
* StudentLearningObjectiveReferenceType
* StudentMigrantEducationProgramAssociationReferenceType
* StudentNeglectedOrDelinquentProgramAssociationReferenceType
* StudentParentAssociationReferenceType
* StudentProgramAssociationReferenceType
* StudentProgramAttendanceEventReferenceType
* StudentReferenceType
* StudentSchoolAssociationReferenceType
* StudentSchoolAttendanceEventReferenceType
* StudentSchoolFoodServiceProgramAssociationReferenceType
* StudentSectionAssociationReferenceType
* StudentSectionAttendanceEventReferenceType
* StudentSpecialEducationProgramAssociationReferenceType
* StudentTitleIPartAProgramAssociationReferenceType
