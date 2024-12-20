# Canvas Mapping Notes

**Contents**

* [Canvas Mapping Notes](#canvas-mapping-notes)
  * [Resource Mappings](#resource-mappings)
  * [Canvas Enumerations](#canvas-enumerations)
  * [Mappings to ODS Tables](#mappings-to-ods-tables)

## Resource Mappings

| Canvas Resource | Data Model Entity | Business Logic Notes |
| --- | --- | --- |
| [Assignments](https://canvas.instructure.com/doc/api/assignments.html) | Assignment | \-  |
| [Submissions](https://canvas.instructure.com/doc/api/submissions.html) | AssignmentSubmission | \-  |
| [Enrollment](https://canvas.instructure.com/doc/api/enrollments.html).grades | LMSGrade | The SourceSystemIdentifier and LMSGradeIdentifier are going to be be a concatenation of g# and the ID of the enrollment. |
| [Sections](https://canvas.instructure.com/doc/api/sections.html) | LMSSection | \-  |
| [Users](https://canvas.instructure.com/doc/api/users.html) | LMSUser | For now the extractor is only exporting students. |
| [Authentications Log](https://canvas.instructure.com/doc/api/authentications_log.html) | LMSSystemActivity | The SourceSystemIdentifier is going to be a concatenation of (("in" if it is a sign-in) or ("out" if it is a sign-out)) + # + User.Id + timestamp for the event. Examples:  _in#111#2021-02-08T21:21:41Z_   out#111#2021-02-08T21:21:48Z |
| \-  | LMSSectionActivity | There's no section activity information being extracted at this moment. |
| [Enrollments](https://canvas.instructure.com/doc/api/enrollments.html) | LMSUserLMSSectionAssociation | \-  |

## Canvas Enumerations

The following enumerations and value sets for Canvas are based on the [Canvas API](https://canvas.instructure.com/doc/api/all_resources.html) documentation.

| Enumeration | System Values | Equivalent LMS UDM Attribute |
| --- | --- | --- |
| courses.enrollment\_type | _teacher_   student _ta_   observer *   designer | LMSUser.UserRole |
| courses.enrollment\_state | _active_   invited\_or\_pending *   completed | LMSUserLMSSectionAssociation.EnrollmentStatus |
| courses.state | _unpublished_   available _completed_   deleted | LMSSection.LMSSectionStatus |
| assignments.submission\_type | _online\_quiz_   none _on\_paper_   discussion\_topic _external\_tool_   online\_upload _oneline\_text\_entry_   online\_url *   media\_recording | Assignment.SubmissionType |
| discussion\_topics.discussion\_type | _side\_comment_   threaded | LMSUserActivity.ActivityType |
| enrollments.state | _active_   invited _creation\_pending_   deleted _rejected_   completed _inactive_   current\_and\_invited _current\_and\_future_   current\_and\_concluded | LMSUserLMSSectionAssociation.EnrollmentStatus |
| submissions.submission\_type | _online\_text\_entry_   online\_url _online\_upload_   media\_recording *   basic\_lti\_launch | Assignment.SubmissionType |
| submissions.workflow\_state | _submitted_   unsubmitted _graded_   pending\_review | AssignmentSubmission.SubmissionStatus |

## Mappings to ODS Tables

| Object | Canvas API elements | ODS Column |
| --- | --- | --- |
| **User** | User.sis\_user\_id | edfi.Student.StudentUniqueId |
|     |     |     |
| **Section** | Section.sis\_section\_id | edfi.Section.SectionIdentifier |
|     |     |     |
| **Assignment** | Section.id + Assignment.id | lmsx.Assignment.AssignmentIdentifier |
|     | "Canvas" | lmsx.Assignment.LMSSourceSystemDescriptorId |
|     | Assignment.name | lmsx.Assignment.Title |
|     | "assignment" | lmsx.Assignment.AssignmentCategoryDescriptorId |
|     | Assignment.description | lmsx.Assignment.AssignmentDescription |
|     | Assignment.unlock\_at | lmsx.Assignment.StartDateTime |
|     | Assignment.lock\_at | lmsx.Assignment.EndDateTime |
|     | Assignment.due\_at | lmsx.Assignment.DueDateTime |
|     | Assignment.points\_possible | lmsx.Assignment.MaxPoints |
|     |     |     |
| **Submission** | Submissions.id | lmsx.AssignmentSubmission.AssignmentSubmissionIdentifier |
|     | Submissions.late + Submissions.missing + Submissions.graded\_at | lmsx.AssignmentSubmission.SubmissionStatusDescriptorId |
|     | Submissions.submitted\_at | lmsx.AssignmentSubmission.SubmissionDateTime |
|     | None | lmsx.AssignmentSubmission.EarnedPoints |
|     | Submissions.grade | lmsx.AssignmentSubmission.Grade |
