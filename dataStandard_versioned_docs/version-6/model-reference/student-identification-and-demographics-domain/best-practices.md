---
sidebar_position: 4
---

# Student Identification and Demographics Domain - Best Practices

## Purpose

In the Ed-Fi Unifying Data Model, student demographic data is generally found in
the Student Identification and Demographics domain as a well-defined attribute
in the core model, as a Student Characteristic, or as a Student Indicator. There
are also cases, particularly when a demographic indicator is closely associated
with a program, where this information is stored in the Alternative and
Supplemental Services domain, within student program association entities. The
following is intended to clarify how to distinguish where this data should be
stored.

## Student Core Elements

The student information is broken out into separate entities to reflect the fact that
the information could be reported with different data by different Local
Education Agencies (LEAs) where the student had enrolled. The differences could
be attributed to changes that occurred in the student’s information (e.g.,
address) or that it was represented differently for different enrollments (e.g.,
race). To accomplish this, three separate entities track the various IdentificationCode,
Directory (phone, address, email etc.), and Demographic information for a given student's
enrollment.

![Student Demographics v3.1](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Demographics%20v3.1.png)

![Student Directory v3.1](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Demographics%20v3.1.png)

![Student Identification Code v3.1](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Demographics%20v3.1.png)

Please note that StudentDemographics, StudentDirectory, and StudentIdentificationCode
do not have dates attached: they are intended to capture the current information for a student
as assessed by the education organization. It is not intended to capture "as of"
dates, historical changes to the data, enrollment dates, or the like.

## Use of Student Education Organization Association

### Purpose

The StudentEducationOrganizationAssociation (SEOA) encapsulates a set of supporting
student information typically acquired during the enrollment – although it could be
collected as part of an application process.  This information includes:

* CohortYear
* Internet Accessibility
* Learning Device information
* Displaced/Disrupted Educational Services

### Best Practice

Given these, this element should be managed as follows:

* The elements should track current values for the student for the current
    school year
* The association should not be deleted if the student enrollment in the
    education organization changes, or at the end of a school year.  Rather, the
    association should be thought of as a core part of the student record, but
    scoped to the education organization.

Please note that StudentEducationOrganizationAssociation also does not have dates
attached: it is intended to capture the current indicators of a student as assessed
by the education organization. It is not intended to capture "as of" dates,
historical changes to the data, enrollment dates, or the like.

## Student Program Associations

Student program and program subclasses defined for federal education programs
hold eligibility and participation status information for students. These
entities break down as follows:

![Student Program Association Entities](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Program%20Association%20Entities.png)

## Student Characteristic vs Student Program Association

* * *

Student characteristics SHOULD NOT be used as proxies for program participation
or eligibility indicators, as this duplicates data capture in the model and
forces complexity onto downstream systems, who must look for data in multiple
places.

As an example, if a student is eligible for participation in the federal food
service program, this should be captured as a program
association (StudentSchoolFoodServiceProgramAssociation with the
ParticipationStatus set to "Eligible" or active status); this characteristic
SHOULD NOT be captured as a independent characteristic (StudentCharacteristic)
called "Food service eligible" (or similar value).

Not recommended (SHOULD NOT)

Recommended (SHOULD)

```json

[in studentEducationOrganizationAssociation]
...
"studentUniqueId": "111565",
{
  "studentCharacteristics": [
    {
      "studentCharacteristicDescriptor":
 "[uri://somestate.edu/Food] service eligible"
    }
  ], ...

[in studentTitleIPartAProgramAssociations]
...
"studentUniqueId": "111565",
"participationStatus": "[uri://ed-fi.org/Eligible]"
...

```

However, if a demographic indicator is not-program specific, then it is
appropriate to (systems SHOULD) capture the relationship on
the StudentEducationOrganizationAssociation. In the above case, if a LEA had a
student characteristic of "Economic Disadvantaged" that was distinct from the
federal food service participation, then it is appropriate to capture this as a
StudentCharacteristic on StudentEducationOrganizationAssociation.

## Student Characteristic vs Student Indicator

StudentCharacteristic is a descriptor, limiting the data stored here to
pre-defined option sets, with each option being a boolean / binary option.

Student characteristics have an optional array, Period, to define BeginDate and
EndDate values. Characteristics are intended to have a "true/false" status where
if a student has a StudentCharacteristic defined, it is considered true or
active. If a characteristic is not present on a student record, then it is
considered false or not applicable to the student. If a student is a part of a
single parent household, this is a true/false state of "Single Parent" and works
well as a StudentCharacteristic.

StudentIndicator is a key-value store intended to store student metrics -
calculated values or values that are non-boolean in nature. The IndicatorName
defines the measure and the Indicator holds the value for that measure.
Indicators may be grouped and also have an optional array Period to define
BeginDate and EndDate values. A metric like "Home Internet Access" works well
here, where more open-ended values like "Broadband", "DSL", "Dial-up", "Cellular
service", or "No internet access" may apply.

## Modeling as an Attribute, Student Characteristic, Student Indicator, or Program Data

A good indicator of whether or not a data point should be reported as a student
demographic attribute, student characteristic, or as a student program is
whether or not the student is evaluated for services based on the data point.

For example, "Homeless" is both a Student Characteristic descriptor value, a
Program Type descriptor value, and a Student Program Association subclass,
Student Homeless Program Association. In this case, if the student is evaluated
for services around the homeless demographic, then the data should be reported
as either a Student Program Association or Student Homeless Program Association.
The former is for a State or Local program and the latter is specifically for
the federally reported McKinney-Vento Homeless program.

General guidelines can be summarized as follows:

![Student Demographic Decision Tree](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Demographic%20Decision%20Tree.png)

### Disabilities Special Case

In the field, it is common for student disability data to be managed by both a
student information system (SIS) and a Special Education (SPED) application. In
this case, the SIS should usually default to recording the disability data in
the StudentEducationOrganizationAssociation Disability elements, and the SPED
application should default to recording the disability data in the
StudentSpecialEducationProgramAssociation Disability elements. This reflects
that the SIS indicator is usually an overall, district-wide indicator used
across programs and academics, while the program data captured is formally
connected with the SPED program. This also prevents the two systems from
over-writing each others data.
