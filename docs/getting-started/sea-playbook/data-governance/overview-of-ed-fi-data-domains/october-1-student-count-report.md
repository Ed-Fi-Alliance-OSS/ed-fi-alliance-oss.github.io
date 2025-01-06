# October 1 Student Count Report

## Use Case

For the October 1 Child Count, the student must be enrolled in the school and receiving services to be included. Each student for whom the count date occurs on or between the entry date and the exit withdraw date shall be identified as one of Present - Receiving Services, Absent - Receiving Services, or Not Receiving Services. This element must NOT be sent for enrollment periods that do not include the count date. Leave the field blank.

## Model Navigation Student Count

![Model Navigation Student Count Diagram](https://edfi.atlassian.net/wiki/download/attachments/22906370/image2019-6-15_16-58-40.png?api=v2)

## Oct1CountReport (DRAFT ONLY)

```sql
DROP VIEW edfi.Oct1CountReport;

CREATE VIEW edfi.Oct1CountReport AS
SELECT
    (SELECT schoolyear
     FROM edfi.schoolyeartype
     WHERE schoolyear = '2011') AS 'School Year',
    sch.localeducationagencyId AS 'LEA Id',
    eOrg.NameOfInstitution AS 'LEA',
    ssa.SchoolId AS 'School Id',
    e.NameOfInstitution AS 'School Name',
    stu.StudentUniqueId,
    stu.FirstName,
    stu.LastSurname,
    stu.MiddleName,
    stu.BirthDate,
    DATEDIFF(year, stu.BirthDate, '2010-10-01') AS 'Age',
    d.CodeValue AS 'Gender',
    de.CodeValue AS 'Limited English Proficiency',
    seoa.HispanicLatinoEthnicity,
    ssa.EntryDate AS 'Enrollment Date',
    g.CodeValue AS 'Grade Level',
    '10/01/2010' AS 'Count Date',
    1.0 AS 'FTE',
    'Present' AS 'Attendance'
FROM
    edfi.StudentSchoolAssociation ssa
INNER JOIN
    edfi.School sch
    ON sch.schoolId = ssa.SchoolId
INNER JOIN
    edfi.EducationOrganization e
    ON e.EducationOrganizationId = sch.SchoolId
INNER JOIN
    edfi.EducationOrganization eOrg
    ON eOrg.EducationOrganizationId = sch.LocalEducationAgencyId
INNER JOIN
    edfi.Student stu
    ON stu.StudentUSI = ssa.StudentUSI
INNER JOIN
    edfi.StudentEducationOrganizationAssociation seoa
    ON seoa.StudentUSI = stu.StudentUSI
    AND seoa.EducationOrganizationId = eOrg.EducationOrganizationId
LEFT OUTER JOIN
    edfi.Descriptor d
    ON d.DescriptorId = seoa.SexDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor de
    ON de.DescriptorId = seoa.LimitedEnglishProficiencyDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor g
    ON g.DescriptorId = ssa.EntryGradeLevelDescriptorId
WHERE
    ssa.EntryDate <= '10/01/2010'
    AND ssa.ExitWithdrawDate IS NULL;

SELECT *
FROM edfi.Oct1CountReport;
```
