# Non-normative Descriptor Classifications

Descriptors have been provided a non-normative classification to help provide
adopters with useful info on how different descriptors are typically treated in
data exchanges based.

There are four non-normative
classifications: **Standard**, **Orthodox**, **Flexible**, and **Local**.

| Classification | Definition                                                                                                                                                                                                                                                                                                                                                                    | Examples                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Standard       | The community usage is generally  **highly standardized**(but not perfectly standardized), sometimes due to strong standards like EDFacts reporting. There is reason to believe that with sufficient governance a set of values that can work for a large majority of use cases is possible.                                                                                  | SchoolFoodServiceProgramService |
| Orthodox       | The community is **mostly standardized**, but exceptions and localization are not infrequent. Ed-Fi's sample descriptor values will include a list that mirrors the standardization seen in the community.                                                                                                                                                                    | GradeLevel                      |
| Flexible       | The community is **somewhat standardized**, or there is one or more **common, broadly-adopted vernacular classifications** around the concept. Local usage may be completely at odds with the vernacular, and that is to be expected in some cases. Ed-Fi's sample descriptor values will generally include a "starter" set of values that mirror the most common vernacular. | InternetAccess                  |
| Local          | The option set values are **highly localized in nearly all cases**. Ed-Fi's sample values will generally only illustrate possible values, or not provide any Ed-Fi defined values at all.                                                                                                                                                                                     | GradingPeriod                   |

## Most Commonly-Used Descriptors

There are over 160 descriptors in the core Ed-Fi data model and many more in
domains under development or proposed for introduction into the core model. Not
all of them will be relevant to your organization's use of Ed-Fi.

Generally, the descriptors that matter most to your organization initially will
be those **involved in data exchanges between systems**. That list will
generally depend on the APIs your organization is using.

A good first list to pay attention to are the descriptors that are **required**
**in an [Ed-Fi API certification](/partners/certification),** as these must be
implemented by compliant systems. By API, those descriptors are:

### Core Student API

* AcademicSubjectDescriptor
* AddressTypeDescriptor
* AttendanceEventCategoryDescriptor
* BehaviorDescriptor
* BirthCountryDescriptor
* CalendarEventDescriptor
* CalendarTypeDescriptor
* CareerPathwayDescriptor
* ClassroomPositionDescriptor
* CohortScopeDescriptor
* CohortTypeDescriptor
* CountryDescriptor
* CourseAttemptResultDescriptor
* CourseIdentificationSystemDescriptor
* CourseLevelCharacteristicDescriptor
* CteProgramServiceDescriptor
* DisciplineDescriptor
* EducationalEnvironmentDescriptor
* EducationOrganizationCategoryDescriptor
* ElectronicMailTypeDescriptor
* EntryGradeLevelDescriptor
* EntryTypeDescriptor
* ExitWithdrawTypeDescriptor
* GradeLevelDescriptor
* GradePointAverageTypeDescriptor
* GradingPeriodDescriptor
* GraduationPlanTypeDescriptor
* GradeTypeDescriptor
* HighestCompletedLevelOfEducationDescriptor
* HomelessPrimaryNighttimeResidenceDescriptor
* IncidentLocationDescriptor
* LanguageDescriptor
* LanguageInstructionProgramServiceDescriptor
* LanguageUseDescriptor
* LevelOfEducationDescriptor
* LimitedEnglishProficiencyDescriptor
* MonitoredDescriptor
* NeglectedOrDelinquentProgramDescriptor
* NeglectedOrDelinquentProgramServiceDescriptor
* ParticipationDescriptor
* ProficiencyDescriptor
* ProgramAssignmentDescriptor
* ProgramTypeDescriptor
* RaceDescriptor
* RelationDescriptor
* ReporterDescriptionDescriptor
* ResidencyStatusDescriptor
* SchoolFoodServiceProgramServiceDescriptor
* SexDescriptor
* SpecialEducationSettingDescriptor
* StaffClassificationDescriptor
* StateAbbreviationDescriptor
* StudentCharacteristicDescriptor
* StudentIdentificationSystemDescriptor
* StudentParticipationCodeDescriptor
* TechnicalSkillsAssessmentDescriptor
* TelephoneNumberTypeDescriptor
* TermDescriptor
* TitleIPartAParticipantDescriptor

### Assessment Outcomes API

* AcademicSubjectDescriptor
* AssessmentReportingMethodDescriptor
* ResultDatatypeTypeDescriptor
