# Assessment Systems

Data requirements for the Dashboard are provided below.

* Elements listed as **optional** should be provided when available: while
    their absence will not cause issues with the Dashboard visualizations,
    their presence will enhance the capabilities of the Dashboard.
* Descriptors (values suffixed with "Descriptor" below) must be consistent
    with the standard values provided as part of [Ed-Fi Data Standard
    v3.2](https://edfi.atlassian.net/wiki/spaces/EFDS32/overview).
  * Links to specific sets are provided below in Ed-Fi XML format. See the
        section "Descriptors" to understand how these look in JSON format for
        transit.
  * Descriptor values marked as "deprecated" must not be used
* A note on IDs (for entities like students, staff, parents, schools and the
    district itself): these must be the local district identifiers, which are
    the ones that typically appear by default in the SIS. They must not be
    state, federal, or other identifiers unless those are used by the district's
    SIS.

Note that the ODS database information (where the data lands in the Ed-Fi ODS
platform) is provided in the rightmost columns. This information can be very
helpful to you during development if you are using a local Ed-Fi ODS to test
against.

| API Resource | API Resource Field | Required/Optional | Constraints | ODS Database Table | ODS Database Column |
| --- | --- | --- | --- | --- | --- |
| /assessments |     |     |     |     |     |
| assessments | assessmentIdentifier | Required |     | edfi.Assessment | AssessmentIdentifier |
| assessments | namespace | Required |     | edfi.Assessment | Namespace |
| assessments | assessmentTitle | Required |     | edfi.Assessment | AssessmentTitle |
| assessments | assessedGradeLevels=>gradeLevelDescriptor | Required | Must be in the Ed-Fi standard list at: [GradeLevel](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/GradeLevelDescriptor.xml) | edfi.AssessmentAssessedGradeLevel | GradeLevelDescriptorId |
| assessments | academicSubjects=>academicSubjectDescriptor | Required | Must be in the Ed-Fi standard list at: [AcademicSubject](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/AcademicSubjectDescriptor.xml) | edfi.AssessmentAcademicSubject | AcademicSubjectDescriptorId |
| /studentAssessments |     |     |     |     |     |
| studentAssessments | studentUniqueId | Required | Must be the local SIS identifier (i.e., not the state or other ID) | edfi.StudentAssessment | StudentUniqueId |
| studentAssessments | scoreResults=>assessmentReportingMethodDescriptor | Required | A mapping to "Raw score" must be provided. Other provider-specific values may be included as well. | edfi.AssessmentReportingMethodDescriptor | AssessmentReportingMethodDescriptorId |
| studentAssessments | scoreResults=>result | Required | Must follow [domain Best Practices](https://edfi.atlassian.net/wiki/display/EFDS32/Assessment+Domain+-+Best+Practices) for score reporting | edfi.StudentAssessmentScoreResult | Result |
| studentAssessments | performanceLevels=>performanceLevelDescriptor | Required | Must contain a mapping to an Ed-Fi standard value [PerformanceLevel](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/blob/v3.2.0/Descriptors/PerformanceLevelDescriptor.xml). Other provider-specific values may be included as well. | edfi.AssessmentPerformanceLevel | PerformanceLevelDescriptorId |
| studentAssessments | administrationDate | Required |     | edfi.StudentAssessment | AdministrationDate |
