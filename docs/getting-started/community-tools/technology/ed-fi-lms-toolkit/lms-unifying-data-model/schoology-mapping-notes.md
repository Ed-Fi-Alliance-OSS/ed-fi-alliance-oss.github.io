# Schoology Mapping Notes

## Usage Notes

The [Schoology API](https://developers.schoology.com/api) is well designed for resource discovery and access to hierarchical data. For example, to retrieve assignment submissions:

1. Query for all courses (`https://api.schoology.com/v1/courses`)
2. For each course:
    1. Query for all sections (`https://api.schoology.com/v1/courses/{course\_id}/sections`)
    2. For each section:
        1. Query for all assignments (`https://api.schoology.com/v1/sections/{section\_id}/assignments`)
        2. For each assignment, which has a `grade_item_id`:
            1. Query for all submissions (`https://api.schoology.com/v1/sections/{section\_id}/submissions/{grade\_item\_id}/`)

This is very logical - and makes it a chatty interface. Thus the overall processing requires a considerable number of API calls. Furthermore, there are no tools for querying by date range or by create / modified date. Thus users of the Schoology Extractor may want to consider running during off hours rather than during school hours, and should consider carefully the frequency of data pulls, which are retrieving _all_ available records _every_ time the extractor runs.

## Resource Mapping

| Schoology Resource | Data Model Entity | Business Logic Notes |
| --- | --- | --- |
| [User](https://developers.schoology.com/api-documentation/rest-api-v1/user) | Users | Includes both students and staff |
| [Course Section](https://developers.schoology.com/api-documentation/rest-api-v1/course-section) | Sections | Includes all sections that are in a currently-active [Grading Period](https://developers.schoology.com/api-documentation/rest-api-v1/grading-period) |
| [Assignment](https://developers.schoology.com/api-documentation/rest-api-v1/assignment) | Assignments | There is a bug in the Schoology API which causes the `Description`  field to be blank in all requests for Assignment data. Thus this column will always be blank in the output CSV files. |
| [Submissions](https://developers.schoology.com/api-documentation/rest-api-v1/submissions) + [Grade](https://developers.schoology.com/api-documentation/rest-api-v1/grade) | Submissions | ![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)  The initial software release will not include the assignment grades |
| [Discussion Thread](https://developers.schoology.com/api-documentation/rest-api-v1/discussion-thread) in the "Section" realm | Section Activities Assignment | Discussions that are marked for grading are cross-listed in both the Section Activities and Assignments outputs |
| [Discussion Reply](https://developers.schoology.com/api-documentation/rest-api-v1/discussion-reply) in the "Section" realm | Section Activities Submissions | Replies on "graded discussions" are cross-listed in both the Section Activities and Submissions outputs |
| [Updates](https://developers.schoology.com/api-documentation/rest-api-v1/updates) in the "Section" realm | Section Activities |     |
| [Update Comment](https://developers.schoology.com/api-documentation/rest-api-v1/update-comment) in the "Section" realm | Section Activities |     |
| [Attendance](https://developers.schoology.com/api-documentation/rest-api-v1/attendance) | Attendance Events |     |
| [Grades](https://developers.schoology.com/api-documentation/rest-api-v1/user-grades) | Grades | ![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)  The initial software release will not include these section grades |
| [Discussion Thread](https://developers.schoology.com/api-documentation/rest-api-v1/discussion-thread) in the "Groups" realm | System Activities |     |
| [Discussion Reply](https://developers.schoology.com/api-documentation/rest-api-v1/discussion-reply) in the "Groups" realm | System Activities |     |
| [Updates](https://developers.schoology.com/api-documentation/rest-api-v1/updates) in the "Groups" realm | System Activities |     |
| [Update Comment](https://developers.schoology.com/api-documentation/rest-api-v1/update-comment) in the "Groups" realm | System Activities |     |
| [Enrollment](https://developers.schoology.com/api-documentation/rest-api-v1/enrollment) | Section Associations |     |
| Usage Analytics\* | System Activities | Reports on the "Login success" and "Logout" actions from the usage analytics report |

## Retrieving Usage Analytics

\* Because of the lack of API support, the Usage Analytics processing requires manual steps by the system administrator:

1. Sign-in to Schoology as an administrator
2. Click on the Tools menu and then "Usage Analytics"
3. Click the Actions button in the upper right quadrant of the screen, and choose Export Report
4. Follow the prompts to generate an e-mailed report link
5. Once the e-mail is received, save the downloaded file into an input directory
6. Configure the Schoology Extractor to read from that input directory.

## Schoology Enumerations

The following enumerations and value sets for Schoology are based on the [Schoology API](https://developers.schoology.com/api-documentation/rest-api-v1) documentation. Note that user roles in Schoology are stored in a configurable attribute, Role.title so there are no static system values.

[Reference to Google Classroom API](https://developers.google.com/classroom/reference/rest)

| Enumeration | System Values | Equivalent LMS UDM Attribute |
| --- | --- | --- |
| enrollments.status | _1: Active_   2: Expired _3: Invite pending_   4: Requrest Pending *   5: Archived | LMSUserLMSSectionAssociation.EnrollmentStatus |
| assignments.type | _assignment_   discussion *   assessment | Assignment.AssignmentCategory |
| assignments.comments.status | _0: deleted_   1: available *   2: pending moderation approval | LMSUserActivity.ActivityStatus |
| attendance.status | _1: present_   2: absent _3: late_   4: excused | LMSUserAttendanceEvent.AttendanceStatus |

## Mappings to ODS Tables

| Object | Schoology API elements | ODS Column |
| --- | --- | --- |
| **User** | user.school\_uid | edfi.Student.StudentUniqueId |
|     |     |     |
| **Section** | section.section\_school\_code | edfi.Section.SectionIdentifier |
|     |     |     |
| **Assignment** | assignment.id | lmsx.Assignment.AssignmentIdentifier |
|     | "Schoology" | lmsx.Assignment.LMSSourceSystemDescriptorId |
|     | assignment.title | lmsx.Assignment.Title |
|     | assignment.type | lmsx.Assignment.AssignmentCategoryDescriptorId |
|     | assignment.description | lmsx.Assignment.AssignmentDescription |
|     | None | lmsx.Assignment.StartDateTime |
|     | None | lmsx.Assignment.EndDateTime |
|     | assignment.due | lmsx.Assignment.DueDateTime |
|     | assignment.max\_points | lmsx.Assignment.MaxPoints |
|     |     |     |
| **Submission** | submission.id + assignment.id + section.id + user.id | lmsx.AssignmentSubmission.AssignmentSubmissionIdentifier |
|     | submission.late + submission.draft + submission.due | lmsx.AssignmentSubmission.SubmissionStatusDescriptorId |
|     | submission.created | lmsx.AssignmentSubmission.SubmissionDateTime |
|     | None | lmsx.AssignmentSubmission.EarnedPoints |
|     | None | lmsx.AssignmentSubmission.Grade |
