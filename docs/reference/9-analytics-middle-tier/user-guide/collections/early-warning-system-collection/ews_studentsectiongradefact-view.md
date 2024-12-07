# ews_StudentSectionGradeFact View

## Purpose

Records describe a student's cumulative grade in a section for each grading
period.

## SQL Object

`analytics.ews_StudentSectionGradeFact`

## Data Definition and Source

Selects all `Grade`  records where the `GradeType`  is "Grading Period".

| Column | Source Table | Source Column or Value | Data Type |
| --- | --- | --- | --- |
| ​StudentKey | Grade​ | StudentUniqueId | int​ |
| SchoolKey | Grade | SchoolId | int |
| GradingPeriodKey | Grade | `<GradingPeriodDescriptorId>-<SchoolId>-<GradingPeriodBeginDate as YYYY-MM-DD>` | nvarchar |
| StudentSectionKey | Grade | Composed from the natural key from StudentSectionAssociation | nvarchar |
| SectionKey | Grade | Composed from the natural key from Section | nvarchar |
| NumericGradeEarned | Grade or LetterGradeTranslation | If (Grade.NumericGradeEarned is not null) then Grade.NumericGradeEarned  <br/>Else lookup in LetterGradeTranslation table, using Grade.LetterGradeEarned | nvarchar |
