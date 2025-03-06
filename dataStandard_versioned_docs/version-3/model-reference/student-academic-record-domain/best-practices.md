---
sidebar_position: 4
---

# Student Academic Record Domain - Best Practices

## Sample Course Transcript Mapping

The following is a sample course transcript showing mappings to the Ed-Fi data
model. Each circled number corresponds to an element in the Ed-Fi Data Standard;
elements are listed below by number.

![Sample Student Transcript](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Sample%20Student%20Transcript.PNG)

| #   | Description | Ed-Fi Entity | Ed-Fi Element | Condition(s) |
| --- | --- | --- | --- | --- |
| 1   | Student | Student | FirstName<br/><br/>LastSurname |     |
| 2   | Street Address | StudentEducationOrganizationAssociation.Address | StreetNumberName | AddressType = \[SIS Default\] |
| 3   | City/State/ZIP | StudentEducationOrganizationAssociation.Address | City<br/><br/>StateAbbreviationDescriptor<br/><br/>PostalCode | AddressType = \[SIS Default\] |
| 4   | Phone | StudentEducationOrganizationAssociation.Telephone | TelephoneNumber | TelephoneNumberType = \[SIS Default\] |
| 5   | Date of Birth | Student.BirthData | BirthDate |     |
| 6   | Place of Birth | Student.BirthData | BirthCity |     |
| 7   | Gender | StudentEducationOrganizationAssociation | SexDescriptor |     |
| 8   | Credits Earned | StudentAcademicRecord.CumulativeEarnedCredits | Credits | StudentAcademicRecord.SchoolYear = \[Most Recent School Year\] |
| 9   | Weighted GPA | StudentAcademicRecord.GradePointAverage | GradePointAverageValue | StudentAcademicRecord.SchoolYear = \[Most Recent School Year\]<br/><br/>GradePointAverageTypeDescriptor = 'Weighted'<br/><br/>IsCumulative = TRUE |
| 10  | Unweighted GPA | StudentAcademicRecord.GradePointAverage | GradePointAverageValue | StudentAcademicRecord.SchoolYear = \[Most Recent School Year\]<br/><br/>GradePointAverageTypeDescriptor = 'Unweighted'<br/><br/>IsCumulative = TRUE |
| 11  | School Year | StudentAcademicRecord | SchoolYear |     |
| 12  | Semester | StudentAcademicRecord | TermDescriptor |     |
| 13  | Code | CourseTranscript.CourseReference | CourseCode | CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.TermDescriptor = 'Fall Semester' |
| 14  | Course | CourseTranscript.CourseReference | CourseTitle | CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.TermDescriptor = 'Fall Semester' |
| 15  | Grade | CourseTranscript | FinalLetterGrade | StudentAcademicRecordReference → StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>StudentAcademicRecordReference → StudentAcademicRecord.TermDescriptor = 'Fall Semester' |
| 16  | Credits | CourseTranscript.EarnedCredits | Credits | CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>CourseTranscript.StudentAcademicRecordReference → StudentAcademicRecord.TermDescriptor = 'Fall Semester' |
| 17  | GPA | StudentAcademicRecord.GradePointAverage | GradePointAverageValue | StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>StudentAcademicRecord.TermDescriptor = 'Fall Semester'<br/><br/>IsCumulative = FALSE |
| 18  | Cumulative GPA | StudentAcademicRecord.GradePointAverage | GradePointAverageValue | StudentAcademicRecord.SchoolYear = '2019 - 2020'<br/><br/>StudentAcademicRecord.TermDescriptor = 'Fall Semester'<br/><br/>IsCumulative = TRUE |

## Student Transcript Use Cases

### Historical Records for Transfer Students

When students transfer into a new school district, they will have a history of
completed courses from past school years that needs to be documented in the new
district's SIS, in order to document graduation requirements, provide for
transcripts for postsecondary school applications, and other reasons.

A common issue that arises when pulling this data into the ODS is the course
records are associated with schools and districts that are not present in the
new current data store. Therefore the required CourseCode and
EducationOrganization references may be missing.

In this case, there are two recommended solutions:

1. If credit is being given for a course taken in a previous school year, an
    equivalent course may be found in the current data context. In this case,
    the CourseTranscript record should include the equivalent CourseCode in the
    Course reference. The new district or school applying the credit would then
    become the EducationOrganization reference as it is the entity accepting
    those credits towards the student's transcript.
2. Alternatively, the CourseCode can be set to not resolve. Ed-Fi has
    introduced as of Data Standard 3.2 the notion that certain references may
    be  "potentially logical" only – i.e., that the entity referred to may not
    exist in the current context and may only be a "logical" reference. This
    status applies to CourseTranscript.CourseCode

:::info

Users of the Ed-Fi ODS can set this entity to not resolve. Please
consult the ODS documentation for details.

:::

Ticket reference:  [DATASTD-1559](https://tracker.ed-fi.org/browse/DATASTD-1559)

### Course Transcript Data for a Course with Multiple Parts

The common element PartialCourseTranscriptAwards was included with the v3.3-b
release on CourseTranscript as an optional array. This allows Students who take
multiple parts of the same course within the same term to track multiple grades
and credits awarded within the same session. This is a common use case for
online schools that enroll students in multiple parts of the same course. These
records will utilize the same CourseCode and TermType (e.g., "Year Round").

### Standards-Based Grading

The model has the ability to align grades with learning standards.  The
LearningStandardGrade common was added as an optional collection in order to
allow a collection of learning standards to be referenced on a Grade. The common
includes LetterGradeEarned, NumericGradeEarned, DiagnosticStatement,
PerformanceBaseConversion. The LetterGradeEarned and NumericGradeEarned allow
for different ways instructors use grade values. The model can support both
one-time standards (i.e. student learns how to count to 10) as well as standards
that are graded multiple times in the school year.
