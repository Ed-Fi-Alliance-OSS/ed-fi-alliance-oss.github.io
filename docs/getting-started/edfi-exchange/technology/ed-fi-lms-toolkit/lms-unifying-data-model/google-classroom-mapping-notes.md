# Google Classroom Mapping notes

## Resource Mapping

| Google Classroom Resource | Data Model Entity | Business Logic Notes |
| --- | --- | --- |
| [courses.courseWork](https://developers.google.com/classroom/reference/rest/v1/courses.courseWork) | Assignment | \-  |
| [courses.courseWork.studentSubmissions](https://developers.google.com/classroom/reference/rest/v1/courses.courseWork.studentSubmissions) | AssignmentSubmission | \-  |
| \-  | LMSGrade | This information is not being extracted at this moment, the generated files will be empty. |
| [courses](https://developers.google.com/classroom/reference/rest/v1/courses) | LMSSection | \-  |
| [courses.aliases](https://developers.google.com/classroom/reference/rest/v1/courses.aliases) | LMSSection | Aliases map to LMSSection.SISSectionIdentifiers. Only one is used, with preference to aliases prefixed with "EdFiLMS.". Aliases with that prefix should map to a section identifier in the Ed-Fi ODS/API. |
| [students](https://developers.google.com/classroom/reference/rest/v1/courses.students), [teachers](https://developers.google.com/classroom/reference/rest/v1/courses.teachers) | LMSUser | The students and teachers are separated in two resources. |
| \-  | LMSSystemActivity | This information is not being extracted at this moment, the generated files will be empty. |
| [courses.courseWork.studentSubmissions](https://developers.google.com/classroom/reference/rest/v1/courses.courseWork.studentSubmissions) | LMSSectionActivity | \-  |
| \-  | LMSUserLMSSectionAssociation | This information is mapped from students, teachers and courses information. |

## Google Classroom Enumerations

The following enumerations and value sets for Google Classroom are based on the [Google Classroom API](https://developers.google.com/classroom/reference/rest) documentation.

| Enumeration | System Values | Equivalent LMS UDM Attribute |
| --- | --- | --- |
| courses.CourseState | _COURSE\_STATE\_UNSPECIFIED_   ACTIVE _ARCHIVED_   PROVISIONED _DECLINED_   SUSPENDED | LMSSection.LMSSectionStatus |
| courses.courseWork.CourseWorkType | _COURSE\_WORK\_TYPE\_UNSPECIFIED_   ASSIGNMENT _SHORT\_ANSWER\_QUESTION_   MULTIPLE\_CHOICE\_QUESTION | Assignment.AssignmentCategory |
| courses.courseWork.studentSubmissions.SubmissionState | _SUBMISSION\_STATE\_UNSPECIFIED_   NEW _CREATED_   TURNED\_IN _RETURNED_   RECLAIMED\_BY\_STUDENT | AssignmentSubmission.SubmissionStatus |
| invitations.CourseRole | _COURSE\_ROLE\_UNSPECIFIED_   STUDENT _TEACHER_   OWNER | User.UserRole |

## Mappings to ODS Tables

| Object | Google Classroom API elements | ODS Column |
| --- | --- | --- |
| **User** | User.profile.emailAddress | edfi.StudentEducationOrganizationAssociationElectronicMail.ElectronicMailAddress |
|     |     |     |
| **Section** | CourseAlias.alias beginning with "EdFiLMS." | edfi.Section.SectionIdentifier |
|     |     |     |
| **Assignment** | CourseWork.id + CourseWork.courseId | lmsx.Assignment.AssignmentIdentifier |
|     | "Google" | lmsx.Assignment.LMSSourceSystemDescriptorId |
|     | CourseWork.title | lmsx.Assignment.Title |
|     | CourseWork.workType | lmsx.Assignment.AssignmentCategoryDescriptorId |
|     | CourseWork.description | lmsx.Assignment.AssignmentDescription |
|     | CourseWork.scheduledTime | lmsx.Assignment.StartDateTime |
|     | None | lmsx.Assignment.EndDateTime |
|     | CourseWork.dueDate + CourseWork.dueTime | lmsx.Assignment.DueDateTime |
|     | CourseWork.maxPoints | lmsx.Assignment.MaxPoints |
|     |     |     |
| **Submission** | StudentSubmission.id + StudentSubmission.courseId + StudentSubmission.courseWorkId | lmsx.AssignmentSubmission.AssignmentSubmissionIdentifier |
|     | StudentSubmission.state | lmsx.AssignmentSubmission.SubmissionStatusDescriptorId |
|     | StudentSubmission.state + StudentSubmission.updateTime | lmsx.AssignmentSubmission.SubmissionDateTime |
|     | StudentSubmission.assignedGrade | lmsx.AssignmentSubmission.EarnedPoints |
|     | StudentSubmission.assignedGrade | lmsx.AssignmentSubmission.Grade |
