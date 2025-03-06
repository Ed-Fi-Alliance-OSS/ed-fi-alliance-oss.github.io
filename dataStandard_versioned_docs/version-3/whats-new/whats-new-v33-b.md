# What's New - v3.3-b

## Major Changes

### Addition of Educator Preparation Data Model Elements ([DATASTD-1586](https://tracker.ed-fi.org/browse/DATASTD-1586), [DATASTD-1585](https://tracker.ed-fi.org/browse/DATASTD-1585), [DATASTD-1584](https://tracker.ed-fi.org/browse/DATASTD-1584), [DATASTD-1583](https://tracker.ed-fi.org/browse/DATASTD-1583), [DATASTD-1579](https://tracker.ed-fi.org/browse/DATASTD-1579))

This release brings a subset of TPDM elements into the core data model.  Please
see [Educator Preparation Data
Model](https://edfi.atlassian.net/wiki/display/EPP/Educator+Preparation+Programs)
for more information on this data model and effort to standardize exchange of
teacher preparation-related data. The elements selected for inclusion in core
are those that have been proven through field work across multiple agencies and
implementation projects. Please see individual tickets for details on the
elements included.

### Addition of Digital Equity Collection ([DATASTD-1594](https://tracker.ed-fi.org/browse/DATASTD-1594))

As digital equity has become more defined, Ed-Fi recognizes that elements used
to track this data should be moved out of the generic student indicator model
and defined as standard elements on the StudentEducationOrganizationAssociation.

As such, the v3.3-b release adds six new optional descriptors and one new
optional boolean to the StudentEducationOrganizationAssociation to capture
internet access and device details for students:

* PrimaryLearningDeviceAwayFromSchoolDescriptor
* PrimaryLearningDeviceAccessDescriptor
* PrimaryLearningDeviceProviderDescriptor
* InternetAccessInResidence (boolean)
* BarrierToInternetAccessInResidenceDescriptor
* InternetAccessTypeInResidenceDescriptor
* InternetPerformanceInResidence

These elements align with phase 2 of the CEDS working draft for digital equity
data collection, defined here: [Add Elements Pertaining to Internet Speed to CEDS](https://github.com/CEDStandards/CEDS-Elements/issues/241).

### Partial Course Transcript Awards ([DATASTD-1442](https://tracker.ed-fi.org/browse/DATASTD-1442))

A number of use cases, including high mobility programs and multiple grading
periods within a single session, have been discussed where students may be
awarded partial credits or grades for a single course within a single session.
Previously, there was not a way to capture those partial awards in the Course
Transcript model.

An optional common array is now present on CourseTranscript,
PartialCourseTranscriptAwards, that allows systems to capture partial
EarnedCredits, AwardDate, MethodOfCreditEarnedDescriptor, NumericGradeEarned,
and LetterGradeEarned on a single CourseTranscript record.

### Student Section Attendance by Class Period ([DATASTD-1530](https://tracker.ed-fi.org/browse/DATASTD-1530))

The first Suite 3 data standard release introduced the ability to associate a
Section with multiple Class Periods. The StudentSectionAttendanceEvent now
aligns with this change by including an optional array ClassPeriod reference.
This allows for the distinction of when a student may miss one of multiple class
periods in a single day that all fall within the same section.
