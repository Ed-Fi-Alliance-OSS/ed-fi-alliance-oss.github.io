# Special Education Student Count Report

## Use Case

WI - For the October 1 Child Count, the student must be receiving special education services under an active IEP or ISP, and the student must be assigned to a valid grade for his or her school to be included. The student's special education program association (SSEPA) record must also cover the count date. Effective Dates will be used to determine enrollment in the case of overlapping records. Additionally, the student must be between the ages of 3-21 on the count date and IDEA eligible.  

AZ - OCT1 FED SPED Report provides a list of students receiving special student services with an indicator of whether the student was counted on the federally reported ESS October 1 count.

## Model Navigation Special Education

![Model Navigation Special Education Diagram](https://edfi.atlassian.net/wiki/download/attachments/22906370/image2019-6-15_17-42-58.png?api=v2) |

## Special Education Count Report (DRAFT ONLY)

```sql
DROP VIEW edfi.SpecialEdCountReport;

CREATE VIEW edfi.SpecialEdCountReport AS
SELECT
    (SELECT schoolyear
     FROM edfi.schoolyeartype
     WHERE schoolyear = '2011') AS 'School Year',
    stu.FirstName,
    stu.LastSurname,
    stu.MiddleName,
    stu.StudentUniqueId,
    stu.BirthDate,
    DATEDIFF(year, stu.BirthDate, '2010-10-01') AS 'Age',
    d.CodeValue AS 'Gender',
    rd.CodeValue AS 'Race',
    SEOA.HispanicLatinoEthnicity,
    de.CodeValue AS 'LEP',
    ssa.EntryDate AS 'Enrollment Date',
    gd.CodeValue AS 'Grade Level',
    SSEPA.ProgramName AS 'Program Name',
    pd.CodeValue AS 'Program Type',
    SSEPA.BeginDate AS 'Special Education Begin Date'
    -- D.DisabilityDescriptorId,
    -- SSEOA.IEPBeginDate AS 'Entry Date',
    -- SSEOA.IEPEndDate AS 'Exit Date',
    -- SVC.PrimaryIndicator,
    -- SVC.ServiceBeginDate,
    -- SVC.ServiceEndDate
FROM
    edfi.StudentSpecialEducationProgramAssociation SSEPA
INNER JOIN
    edfi.Student stu
    ON stu.StudentUSI = SSEPA.StudentUSI
INNER JOIN
    edfi.StudentSchoolAssociation SSA
    ON SSA.StudentUSI = SSEPA.StudentUSI
    AND SSA.EntryDate IS NOT NULL
    AND SSA.ExitWithdrawDate IS NULL
INNER JOIN
    edfi.StudentEducationOrganizationAssociation SEOA
    ON SEOA.StudentUSI = SSEPA.StudentUSI
    AND SEOA.EducationOrganizationId = SSEPA.EducationOrganizationId
INNER JOIN
    edfi.StudentEducationOrganizationAssociationRace R
    ON R.StudentUSI = SSEPA.StudentUSI
    AND R.EducationOrganizationId = SSEPA.EducationOrganizationId
LEFT OUTER JOIN
    edfi.Descriptor d
    ON d.DescriptorId = SEOA.SexDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor de
    ON de.DescriptorId = SEOA.LimitedEnglishProficiencyDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor rd
    ON rd.DescriptorId = R.RaceDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor gd
    ON gd.DescriptorId = SSA.EntryGradeLevelDescriptorId
LEFT OUTER JOIN
    edfi.Descriptor pd
    ON pd.DescriptorId = SSEPA.ProgramTypeDescriptorId
    -- INNER JOIN edfi.StudentSpecialEducationProgramAssociationDisability Dis
    -- ON Dis.StudentUSI = SSEPA.StudentUSI
    -- AND Dis.EducationOrganizationId = SSEPA.EducationOrganizationId
    -- AND Dis.BeginDate = SSEPA.BeginDate
    -- AND Dis.ProgramEducationOrganizationId = SSEPA.ProgramEducationOrganizationId
    -- AND Dis.ProgramName = SSEPA.ProgramName
    -- AND Dis.ProgramTypeDescriptorId = SSEPA.ProgramTypeDescriptorId
    -- LEFT OUTER JOIN edfi.Descriptor dd
    -- ON dd.DescriptorId = Dis.DisabilityDescriptorId
    -- INNER JOIN edfi.StudentSpecialEducationProgramAssociationSpecialEducationProgramService SVC
    -- ON SVC.StudentUSI = SSEPA.StudentUSI
    -- AND SVC.EducationOrganizationId = SSEPA.EducationOrganizationId
    -- AND SVC.BeginDate = SSEPA.BeginDate
    -- AND SVC.ProgramEducationOrganizationId = SSEPA.ProgramEducationOrganizationId
    -- AND SVC.ProgramName = SSEPA.ProgramName
    -- AND SVC.ProgramTypeDescriptorId = SSEPA.ProgramTypeDescriptorId
WHERE
    SSEPA.BeginDate <= '10/01/2010';

SELECT *
FROM edfi.SpecialEdCountReport;
```
