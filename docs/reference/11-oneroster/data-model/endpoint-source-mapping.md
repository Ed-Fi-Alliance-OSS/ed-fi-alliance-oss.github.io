# Endpoint to Ed-Fi Source Mapping

Each OneRoster endpoint is served from a derived `oneroster12` object that is
built from one or more Ed-Fi ODS tables. On PostgreSQL the objects are
materialized views; on Microsoft SQL Server they are tables populated by
refresh stored procedures. Both variants follow the same logical mapping.

The table below lists every OneRoster 1.2 rostering endpoint implemented by
the service, the primary Ed-Fi entities it reads from, and the SQL artifact
that defines the derivation. See [Descriptor
mappings](./descriptor-mappings.md) for how individual descriptor-backed
fields (sex, race, term type, staff role) are resolved.

| OneRoster endpoint | `oneroster12` object | Primary Ed-Fi sources | Defined in |
|---|---|---|---|
| `/academicSessions`, `/academicSessions/{id}` | `academicsessions` | `edfi.session`, `edfi.school`, `edfi.calendardate`, `edfi.calendardatecalendarevent` | `academic_sessions.sql` |
| `/classes`, `/classes/{id}` | `classes` | `edfi.section`, `edfi.courseoffering`, `edfi.school`, `edfi.sectionclassperiod` | `classes.sql` |
| `/courses`, `/courses/{id}` | `courses` | `edfi.course`, `edfi.courseoffering` | `courses.sql` |
| `/demographics`, `/demographics/{id}` | `demographics` | `edfi.student`, `edfi.studenteducationorganizationassociation`, `edfi.studenteducationorganizationassociationrace` | `demographics.sql` |
| `/enrollments`, `/enrollments/{id}` | `enrollments` | `edfi.staffSectionAssociation`, `edfi.studentSectionAssociation`, `edfi.section` | `enrollments.sql` |
| `/gradingPeriods`, `/gradingPeriods/{id}` | `academicsessions` (filtered) | see `/academicSessions` | `academic_sessions.sql` |
| `/orgs`, `/orgs/{id}` | `orgs` | `edfi.school`, `edfi.localEducationAgency`, `edfi.stateEducationAgency`, `edfi.educationOrganization` | `orgs.sql` |
| `/schools`, `/schools/{id}` | `orgs` (filtered to `type = 'school'`) | see `/orgs` | `orgs.sql` |
| `/students`, `/students/{id}` | `users` (filtered to `role = 'student'`) | see `/users` | `users.sql` |
| `/teachers`, `/teachers/{id}` | `users` (filtered to `role = 'teacher'`) | see `/users` | `users.sql` |
| `/terms`, `/terms/{id}` | `academicsessions` (filtered) | see `/academicSessions` | `academic_sessions.sql` |
| `/users`, `/users/{id}` | `users` | `edfi.student`, `edfi.staff`, `edfi.contact` plus their school / EdOrg associations; `edfi.studentSchoolAssociation`, `edfi.staffSchoolAssociation`, `edfi.staffEducationOrganizationAssignmentAssociation`, `edfi.studentContactAssociation` | `users.sql` |

The SQL artifacts live in the OneRoster service repository under
`standard/{dataStandardVersion}/artifacts/{pgsql,mssql}/core/`.

## `sourcedId` construction

OneRoster requires a globally unique `sourcedId` on every record. The service
builds these deterministically from Ed-Fi natural keys using MD5 (PostgreSQL
`md5()`, Microsoft SQL Server `HASHBYTES('MD5', ...)`):

| Record | `sourcedId` input |
|---|---|
| School | `md5(schoolId)` |
| LEA (district) | `md5(localEducationAgencyId)` |
| SEA (state) | `md5(stateEducationAgencyId)` |
| Course | `md5(educationOrganizationId + '-' + courseCode)` |
| Class (section) | `md5(localCourseCode + '-' + schoolId + '-' + sectionIdentifier + '-' + sessionName)` |
| Academic session (term) | `md5(schoolId + '-' + sessionName)` |
| Academic session (school year) | `md5(schoolYear)` |
| Student user | `md5('STU-' + studentUniqueId + '-' + educationOrganizationId)` |
| Staff user | `md5('STA-' + staffUniqueId + '-' + schoolId)` |
| Parent / contact user | `md5('PAR-' + contactUniqueId + '-' + schoolId)` |
| Student enrollment | `md5(studentUniqueId + '-' + localCourseCode + '-' + schoolId + '-' + sectionIdentifier + '-' + sessionName + '-' + beginDate)` |
| Staff enrollment | `md5(staffUniqueId + '-' + localCourseCode + '-' + schoolId + '-' + sectionIdentifier + '-' + sessionName + '-' + beginDate)` |

Because the inputs are Ed-Fi natural keys, `sourcedId` values remain stable
across refreshes so long as the source Ed-Fi identifiers do not change.

## Ed-Fi natural key metadata

Every OneRoster record includes a `metadata.edfi` object that echoes the
source resource name and its natural key values, for example:

```json
{
  "metadata": {
    "edfi": {
      "resource": "sections",
      "naturalKey": {
        "localCourseCode": "ALG-I",
        "schoolId": 255901001,
        "sectionIdentifier": "25RM1-ALG-I-001",
        "sessionName": "2024-2025 Fall Semester"
      }
    }
  }
}
```

This lets integrators trace a OneRoster record back to the underlying Ed-Fi
resource without joining on the hashed `sourcedId`.

## What is not mapped

The following OneRoster fields are intentionally `null` in the current
release. They require Ed-Fi extensions or configuration that are not
uniformly available across deployments:

- `class.grades`, `class.subjects`, `class.subjectCodes` (sections)
- `course.grades`, `course.subjects`, `course.subjectCodes` (courses; SCED
  codes are not generally populated in Ed-Fi ODSs)
- `user.sms`, `user.phone`, `user.password`, `user.agentSourceIds`,
  `user.userProfiles`, `user.pronouns`, `user.preferredMiddleName`

The `enrollment.role` field is currently fixed to `'teacher'` for staff
enrollments and `'student'` for student enrollments; the shipped
`ClassroomPositionDescriptor` mapping is seeded but not consumed by the
enrollments view. See [Descriptor mappings](./descriptor-mappings.md) for
details.
