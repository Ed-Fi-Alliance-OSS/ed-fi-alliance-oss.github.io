# Loading College Board Results

## How to Import College Board Results

This lab describes a step by step way to import the CollegeBoard SAT, PSAT
NMSQT, PSAT10 and PSAT89 Assessments

1. Open Data import and navigate to **Admin  -> Template Sharing**

2. Click on the **View** link that says “CollegeBoard SAT, PSAT NMSQT, PSAT10
   and PSAT89 Assessments”

    ![Template Sharing](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-10-17.png)

3. Scroll to the bottom and click on Import Template. After a couple of seconds
   it will redirect you to the “Template Sharing page”.

    ![Template Information](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-12-25.png)

4. Click on Maps and verify that all 4 maps have been loaded.

    ![Maps](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-13-12.png)

5. Click on Lookups and verify that there is 1 lookup with 2 boolean values.

    ![Lookups](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-13-44.png)

6. Click on Admin -> Bootstrap Data and verify that there is 73 bootstraps.
   (Note that it starts in 0)

    ![Bootstrap Data](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-14-26.png)

7. Click on the Agents tab. (This one should be empty) Proceed to add 4 agents.
   Add Agentname as described below. Select Manual, check enabled and Select Add
   Data Map dropdown and then click Add Map.
    1. National(CollegeBoard) PSAT\_NMSQT
    2. National(CollegeBoard) PSAT10
    3. National(CollegeBoard) PSAT89
    4. National(CollegeBoard) SAT

    ![Agent](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-15-7.png)

8. You should end up with a configuration like below.

    ![Agents](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-15-57.png)

9. Click the Upload link on each of them and attach the sample csv file to each.

    ![Upload File](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-17-16.png)

10. The result should now have the Files column with a 1 on it.

    ![Agent Source](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-17-45.png)

11. Open Powershell and navigate to the following path: “C:\\ed-fi\\Data Import
    1.0\\DataImport.Server.TransformLoad” (or the path where you installed Data
    Import. Then locate the folder for TransformLoad).

12. Lets Open SSMS and ensure we have no assessment data in our ODS.

    ![Queries](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-18-14.png)

13. Here are some handy queries you can use to view the assessments in the ODS.

    ```sql
    select * from  [edfi].[Assessment] where AssessmentIdentifier like 'National-%'

    select * from  [edfi].AssessmentScore where AssessmentIdentifier like 'National-%'

    select * from  [edfi].ObjectiveAssessment where AssessmentIdentifier like 'National-%' order by IdentificationCode

    select * from  [edfi].ObjectiveAssessmentScore where AssessmentIdentifier like 'National-%' order by IdentificationCode

    select * from  [edfi].ObjectiveAssessmentPerformanceLevel where AssessmentIdentifier like 'National-%'

    select * from  [edfi].StudentAssessmentStudentObjectiveAssessmentPerformanceLevel where AssessmentIdentifier like 'National-%'

    select * from  [edfi].Descriptor where Namespace = 'uri://ed-fi.org/assessmentCategoryDescriptor' order by CodeValue

    select * from  [edfi].Descriptor where Namespace = 'uri://ed-fi.org/AssessmentReportingMethodDescriptor'

    select * from  [edfi].Descriptor where Namespace = 'uri://ed-fi.org/resultDatatypeTypeDescriptor'

    select * from  [edfi].Descriptor where Namespace = 'uri://ed-fi.org/PerformanceLevelDescriptor'

    select * from  [edfi].StudentAssessmentStudentObjectiveAssessment where AssessmentIdentifier like 'National-%'

    select * from  [edfi].StudentAssessmentScoreResult where AssessmentIdentifier like 'National-%'

    select * from  [edfi].StudentAssessmentStudentObjectiveAssessmentScoreResult where AssessmentIdentifier like 'National-%'



    select * from  [edfi].Descriptor where CodeValue = 'Integer'

    select * from  [edfi].Descriptor where CodeValue = 'Number Score'

    select * from  [edfi].Descriptor where CodeValue = 'Composite Score'

    select * from  [edfi].Descriptor where CodeValue = 'CollegeBoard SAT Suite of Assessments'



    select * from  [edfi].StudentAssessment where AssessmentIdentifier like 'National-%'

    select * from  [edfi].StudentAssessmentScoreResult where AssessmentIdentifier like 'National-%' order by AssessmentIdentifier

    select * from  [edfi].StudentAssessmentStudentObjectiveAssessmentScoreResult where AssessmentIdentifier like 'National-%' order by IdentificationCode

    select * from  [edfi].StudentAssessmentStudentObjectiveAssessmentPerformanceLevel where AssessmentIdentifier like 'National-%' order by IdentificationCode
    ```

14. Back to in the Powershell window run the following command
     `.\DataImport.Server.TransformLoad.exe`

    ![DataImport Command](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-19-55.png)

15. It will go through a series of steps like Inserting Bootstrap data. And
     then proceed to load the CSVs with the provided mappings.

    ![DataImport Result](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-21-3.png)

16. Go back to SSMS and run the SQL statement.

    ![Sql Statement](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image2019-10-4_11-21-34.png)

17. Voila! You have now imported these sample Collegeboard CSV files into your
     ODS.
