# Unit Test Framework

## Introduction

The Analytics Middle Tier source code contains extensive unit testing of the
views, utilizing a custom framework for loading and refreshing test data on all
supported Data Standards against a SQL Server database and a Postgres database.
These unit tests serve the dual purposes of exploring the required data during
development and providing regression tests for safely refactoring views and
correcting bugs.

All views created by the core Ed-Fi Analytics development team have a complete
set of unit tests that cover:

* Output columns
* Where clause conditions
* Join clause conditions

The development team encourages [community
contributors](../readme.md) to develop similar unit tests for
their views. The following sections provide a walkthrough of how to add unit
tests for a simple use case, as well as detailed information about the framework
architecture for those who would like to know more.

With the recent addition of having test cases execute against both SQL Server
and Postgres, after downloading the Analytics Middle Tier you should review the
[Analytics Middle Tier Test project
README](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/blob/main/src/EdFi.AnalyticsMiddleTier.Tests/readme.md)
and  [this page in Tech
Docs](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24807117) that mentions
the additional setup and caveats to testing against Postgres in addition to SQL
Server.

## Adding a State Education Agency Dimension

As a concrete example, let's introduce a dimensional view that provides the
names of all state education agencies in the Ed-Fi ODS database. The query is
quite simple, and works on all supported Ed-Fi Data Standards:

```SQL
select
    EducationOrganization.EducationOrganizationId as StateEducationAgencyKey,
    EducationOrganization.NameOfInstitution as StateEducationAgencyName
from
    edfi.StateEducationAgency
inner join
    edfi.EducationOrganization
on
    StateEducationAgency.StateEducationAgencyId = EducationOrganization.EducationOrganizationId

```

### Test Case Queries

#### Identifying Test Cases

In addition to the obvious "happy path" test case where the view returns a state
education agency, there is one negative test case: ensure that an Education
Organization that _is not_ a State Education Agency is not returned by the view.
What about going in reverse? A State Education Agency is defined as _an instance
of an Education Organization_ in the Ed-Fi Data Model; therefore, there cannot
be a State Education Agency record without an Education Organization record. The
reverse case is unnecessary.

Following the unit test principle of asserting one thing at a time, let us split
the positive case in two: one test to ensure that we get the expected Key value
and a second test for the Name value. Finally, there should be a test of the
overall structure, giving us four total tests per Data Standard:

1. Validate the columns and data types (structure).
2. Validate the `StateEducationAgencyKey` for a state education agency.
3. Validate the `StateEducationAgencyName` for a state education agency.
4. Ensure that an `EducationOrganization` that is not
   a `StateEducationAgency` does not appear in the results.

:::tip

Through a quirk of the framework, the first test case will be executed for both
the valid state agency and the invalid agency, therefore there will be five unit
tests per Data Standard.

:::

#### Adding the Test Cases to the Project

In your IDE, expand the `EdFi.AnalyticsMIddleTier.Tests`  project and add a
folder called `StateEducationAgencyDim`  under `TestCases`. In here, create
configuration files with the test cases. These can either be XML or JSON files
(JSON files are more compact, while XML tend to be easier to read because they
support line breaks in the query definition).

Let us define `EducationOrganizationId = 123456` as the valid state agency with
name "Sample" and `654321` as an organization that is not a state agency. Below
are the file definitions for each of the test cases. Note the file naming
convention, which clearly expresses the intent of the test. The next section
will show insertion of matching sample data.

```xml title="123456_should_have_StateEducationAgencyKey.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
    <DBMS>Any</DBMS>
    <ControlDataInsertion>
    </ControlDataInsertion>
    <Query>
        SELECT StateEducationAgencyKey
        FROM analytics.StateEducationAgencyDim
        WHERE StateEducationAgencyKey = 123456;
    </Query>
    <Result>
        <StateEducationAgencyKey>123456</StateEducationAgencyKey>
    </Result>
</TestCase>
```

```xml title="123456_should_have_StateEducationAgencyName.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
    <DBMS>Any</DBMS>
    <ControlDataInsertion>
    </ControlDataInsertion>
    <Query>
        SELECT StateEducationAgencyName
        FROM analytics.StateEducationAgencyDim
        WHERE StateEducationAgencyKey = 123456;
    </Query>
    <Result>
        <StateEducationAgencyName>Sample</StateEducationAgencyName>
    </Result>
</TestCase>
```

```xml title="654321_should_not_be_a_StateEducationAgency.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
    <DBMS>Any</DBMS>
    <ControlDataInsertion>
    </ControlDataInsertion>
    <Query>
        SELECT COUNT(1) AS CountValue FROM analytics.StateEducationAgencyDim WHERE StateEducationAgencyKey = 654321;
    </Query>
    <Result>
        <CountValue>0</CountValue>
    </Result>
</TestCase>
```

### Sample Data Insertion

The test framework loads a clean database, with no records, for each test
execution. Therefore, sample data need to be added, again using embedded
configuration files. Because the supported Ed-Fi Data Standards can represent
the same information in different ways, test data are created for each data
standard version, although the insert scripts may end up being identical.

For each supported Data Standard version, create two files with the following
naming convention:

1. `0000_NAMEOFTHEVIEW_Data_Load.xml`
2. `0001_NAMEOFTHEVIEW_should_match_column_dictionary.xml`

The first file will have INSERT statements for all data required for the test
cases, and the second one defines the expected output column names and types. In
this trivial case, the scripts are identical for Data Standards v3.1 and v3.2a,
but slightly different for version 2.2. The output structure, however, will
always be the same for all supported Data Standards.

```xml title="0000_StateEducationAgencyDim_Data_Load.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
  <DBMS>Any</DBMS>
  <ControlDataInsertion>
      insert into edfi.EducationOrganization (
          EducationOrganizationId,
          NameOfInstitution
      )
      values (
          123456,
          'Sample'
      ), (
          654321,
          'Not a state agency'
      );
      insert into edfi.StateEducationAgency (
        StateEducationAgencyId
      )
      values (
        123456
      )
  </ControlDataInsertion>
</TestCase>
```

```xml title="0000_StateEducationAgencyDim_Data_Load.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
  <DBMS>Any</DBMS>
  <ControlDataInsertion>
  insert into edfi.EducationOrganization (
      EducationOrganizationId,
      NameOfInstitution,
      StateOrganizationId
  )
  values (
      123456,
      'Sample',
      'Value is required but is irrelevant to this test'
  ), (
      654321,
      'Not a state agency',
      'asdfghjk'
  );
  insert into edfi.StateEducationAgency (
      StateEducationAgencyId
  )
  values (
      123456
  )
  </ControlDataInsertion>
</TestCase>
```

```xml title="0001_StateEducationAgency_should_match_column_dictionary.xml"
<?xml version="1.0" encoding="utf-8" ?>
<TestCase>
    <DBMS>Any</DBMS>
    <ControlDataInsertion>
    </ControlDataInsertion>
    <Query>
        SELECT COLUMN_NAME AS ColumnName,
        DATA_TYPE AS DataType
        FROM information_schema.columns
        WHERE table_schema = 'analytics'
        AND table_name = 'StateEducationAgencyDim'
        ORDER BY ORDINAL_POSITION ASC;
    </Query>
    <Result>
        <ColumnName>StateEducationAgencyKey</ColumnName>
        <DataType>nvarchar</DataType>
    </Result>
    <Result>
        <ColumnName>StateEducationAgencyName</ColumnName>
        <DataType>nvarchar</DataType>
    </Result>
</TestCase>
```

Here are the new XML files we've added, as seen from within Visual Studio 2019:

![XML files](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-4-21_17-8-21.png)

### C# Object

Next, we must create a "Plain Old C# Object" (POCO) in order to map the query
results into the C#-based unit test framework. Create a file
named `StateEducationAgencyDim.cs` under `Classes` and add properties for each
expected column.

![POCO](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-4-21_11-50-20.png)

```csharp title="StateEducationAgencyDim.cs"
namespace EdFi.AnalyticsMiddleTier.Tests.Classes
{
    public class StateEducationAgencyDim
    {
        public string StateEducationAgencyKey { get; set;  }
        public string StateEducationAgencyName { get; set;  }
    }
}

```

### Write the Test Cases in C #

The final step is to write the C# test cases, utilizing the test case framework
to load the sample data, execute the test, and verify the results. The framework
is built on [NUnit3](https://nunit.org/) and the
[Shouldly](https://shouldly.readthedocs.io/en/latest/) assertion library.

Create file `When_querying_the_StateEducationAgencyDim_view.cs`
under `Dimensions`.

![C# test class](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-4-21_11-53-41.png)

The class must be abstract, must inherit from `When_querying_a_view`, and needs
to include some standard boilerplate code as shown below:

```csharp title="Boilerplate in When_querying_the_StateEducationAgencyDim_view.cs"
using EdFi.AnalyticsMiddleTier.Tests.Classes;
using NUnit.Framework;
using Shouldly;

namespace EdFi.AnalyticsMiddleTier.Tests.Dimensions
{
    public abstract class When_querying_the_StateEducationAgencyDim_view : When_querying_a_view
    {
        protected const string TestCasesFolder = "TestCases.StateEducationAgencyDim";

        protected (bool success, string errorMessage) Result;

        [OneTimeSetUp]
        public void PrepareDatabase()
        {
            DataStandard.PrepareDatabase();
        }

        [OneTimeSetUp]
        public void Act()
        {
            Result = DataStandard.LoadTestCaseData<LocalEducationAgencyDim>($"{TestCasesFolder}.{DataStandard.DataStandardFolderName}.0000_StateEducationAgencyDim_Data_Load.xml");
            Result.success.ShouldBeTrue($"Error while loading data: '{Result.errorMessage}'");

            Result = DataStandard.Install();
            Result.success.ShouldBeTrue($"Error while installing Base: '{Result.errorMessage}'");
        }
    }
}

```

Next add the test case for the structure:

```csharp
[Test]
public void Then_view_should_match_column_dictionary()
{
    (bool success, string errorMessage) testResult = DataStandard.RunTestCase<TableColumns>($"{TestCasesFolder}.{DataStandard.DataStandardFolderName}.0001_StateEducationAgency_should_match_column_dictionary.xml");
    testResult.success.ShouldBe(true, testResult.errorMessage);
}
```

The two happy-path cases should be grouped together in a class that inherits
from the new class. To understand this organizational pattern, simply read the
class and method signatures out loud:

1. Given education organization 123456
2. When querying the StateEducationAgencyDim
3. Then (it) should have State Agency Key (actual value in the config file)

```csharp
public class Given_education_organization_123456 : When_querying_the_StateEducationAgencyDim_view
{
    private string _caseIdentifier = "123456";

    public Given_education_organization_123456(TestHarness dataStandard) => SetDataStandard(dataStandard);

    [Test]
    public void Then_should_have_StateEducationAgencyKey()
    {
        (bool success, string errorMessage) testResult = DataStandard.RunTestCase<StateEducationAgencyDim>($"{TestCasesFolder}.{_caseIdentifier}_should_have_StateEducationAgencyKey.xml");
        testResult.success.ShouldBe(true, testResult.errorMessage);
    }

    [Test]
    public void Then_should_have_StateEducationAgencyName()
    {
        (bool success, string errorMessage) testResult = DataStandard.RunTestCase<StateEducationAgencyDim>($"{TestCasesFolder}.{_caseIdentifier}_should_have_StateEducationAgencyName.xml");
        testResult.success.ShouldBe(true, testResult.errorMessage);
    }
}
```

And now, a class for the negative test case:

```csharp
public class Given_education_organization_654321 : When_querying_the_StateEducationAgencyDim_view
{
    private string _caseIdentifier = "654321";

    public Given_education_organization_654321(TestHarness dataStandard) => SetDataStandard(dataStandard);

    [Test]
    public void Then_should_return_zero_records()
    {
        (bool success, string errorMessage) testResult = DataStandard.RunTestCase<CountResult>($"{TestCasesFolder}.{_caseIdentifier}_should_not_be_a_StateEducationAgency.xml");
        testResult.success.ShouldBe(true, testResult.errorMessage);
    }
}
```

### Compile and Run the Tests

At this point, we can run the tests to confirm that the view works as intended.
Results from Visual Studio 2019: nine tests passed and five failed.

![Results](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-4-21_17-46-33.png)

Digging into one of the failures reveals the following message:

```text
  Then_view_should_match_column_dictionary
    Source: When_querying_the_StateEducationAgencyDim_view.cs line 30
    Duration: 120 ms

  Message:
    Shouldly.ShouldAssertException : success
        should be
    True
        but was
    False

    Additional Info:
        The expected data set does not match the one received from the database.
    Xml Diff Result:
    <xd:xmldiff version="1.0" srcDocHash="13467357853539592381" options="IgnoreChildOrder IgnoreComments IgnoreNamespaces IgnorePrefixes IgnoreWhitespace " fragments="no" xmlns:xd="http://schemas.microsoft.com/xmltools/2002/xmldiff">
      <xd:node match="1">
        <xd:node match="1">
          <xd:node match="2">
            <xd:change match="1">int</xd:change>
          </xd:node>
        </xd:node>
      </xd:node>
    </xd:xmldiff>
  Stack Trace:
    When_querying_the_StateEducationAgencyDim_view.Then_view_should_match_column_dictionary() line 33
```

Admittedly, this is a little obscure. When you look deep into the XML diff
result, you see `<xd:change match="1">int</xd:change>` , indicating column 1 is
an integer and something else was expected.

Up above in file `0001_StateEducationAgency_should_match_column_dictionary.xml`,
the `StateLocalEducationAgencyKey` column is assumed to be a string — whereas
the view is returning the `EducationOrganizationId`, which is an integer. Which
is correct?

Because this column represents a relational label that should not be used in any
arithmetic calculations, treating the integer as a string is appropriate.
Therefore _the tests are right_: they've found a bug! Change the query to cast
the `EducationOrganizationId`  to `nvarchar` and re-run the tests. Outcome: they
all pass! Problem solved, bug found and resolved.

![Results](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2020-4-21_17-56-23.png)

:::tip

Continue reading below if you are interested in the architecture of this test
framework. If your only interest is in adding tests, then the above walkthrough
may be sufficient.

:::

## Test Framework Architecture

The following table lists the main components, which are described in detail in
the following sections.

| Component | Description |
| --- | --- |
| Entity view C# classes | *   A class representing the view. Each field represents a column. |
| Test case files | *   An XML or JSON file with the test definition. It contains the query and the expected result. |
| Test class | _Abstract class: Base class for a view, from which the creation of the specific test classes will be carried out. It contains common methods for all related test scenarios.<br/>_   Test Fixture class: Class in which test cases are defined for a specific scenario. |

### Entity View C# Classes

The test framework uses Dapper to query the views and map their results into an
appropriate entity view object. Each view under test requires a corresponding
Plain Old C# Object definition (POCO). Two additional
classes, `CountResult` and `TableColumns`, provide cross-cutting support for
test cases.

If a numeric column can be null then you must to set the data type as nullable.
In the following example, `NumericGradeEarned` is nullable in the view result,
and therefore the C# type is `decimal?` .

```csharp title="Entity"
public class StudentSectionGradeFact
{
     public int StudentKey { get; set; } //(int, not null)
     public int SchoolKey { get; set; } //(int, not null)
     public string GradingPeriodKey { get; set; } //(nvarchar(92), null)
     public string StudentSectionKey { get; set; } //(nvarchar(544), null)
     public string SectionKey { get; set; } //(nvarchar(482), null)
     public decimal? NumericGradeEarned { get; set; } //(decimal(9,2), null)
     public string LetterGradeEarned { get; set; } //(nvarchar(20), null)
}

```

Some examples of the use of classes:

| Query Type | C# Class | Example |
| --- | --- | --- |
| Columns | TableColumns | **Entity**<br/><br/>```<br/>(bool success, string errorMessage) testResult <br/> = _dataStandard.RunTestCase<TableColumns>($"{TestCasesFolder}.0001_ContactPersonDimension_should_match_column_dictionary.xml");<br/><br/>``` |
| Count | CountResult | **Entity**<br/><br/>```<br/>(bool success, string errorMessage) testResult <br/> = _dataStandard.RunTestCase<CountResult>($"{TestCasesFolder}.{_caseIdentifier}_should_return_one_record.xml");<br/><br/>``` |
| View Columns Query | In this case, DateDimension | **Entity**<br/><br/>```<br/>(bool success, string errorMessage) testResult <br/> = _dataStandard.RunTestCase<DateDimension>($"{TestCasesFolder}.{_caseIdentifier}_calendarQuarter_should_be_1.xml");<br/><br/>``` |

### Test Case Files

The unit test framework uses a configuration file structure to define both
sample data as well as queries and their expected results. This file can be
written in XML or JSON. While JSON is more compact, the core development team
generally uses XML for better readability. The file can contain these data
elements:

| Element | Description |
| --- | --- |
| DBMS | Indicates whether the query is for a specific database engine, or for any. |
| ControlDataInsertion | Scripts to insert the data required for the test. It can be an insertion list or a single node with all insertions. |
| ControlDataDelete | Scripts to test delete from database. It can be an insertion list or a single node with all deletes. |
| Query | Database query used to obtain the database record (s) to be compared with the control records. |
| Result | Validation records obtained in a controlled database, which are used to verify that the new installed database is consistent with the control database. |

If you are unsure of how to format the expected Result for the Query, you can
try running the Query command manually in SQL Server Management Studio with
either `FOR XML`  or `FOR JSON`  appended to the query, as shown below:

| FORMAT | SQL | Example |
| --- | --- | --- |
| XML | FOR XML PATH('Result') | **XML Result**<br/><br/>```<br/><Result><br/> <CalendarQuarter>3</CalendarQuarter><br/></Result><br/><br/>``` |
| JSON | FOR JSON PATH, ROOT('Result') | **JSON Result**<br/><br/>```<br/>"Result":[{"CalendarQuarter":3}]<br/><br/>``` |

Sample test data files:

| Format | File |
| --- | --- |
| XML | **XML example**<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>  </ControlDataInsertion><br/>  <Query><br/>    SELECT CalendarQuarter <br/>    FROM analytics.DateDimension <br/>    WHERE DateKey=20190401;<br/>  </Query><br/>  <Result><br/>    <CalendarQuarter>2</CalendarQuarter><br/>  </Result><br/></TestCase><br/><br/>``` |
| JSON | **JSON example**<br/><br/>```<br/>{<br/>  "DBMS": "Any",<br/>  "ControlDataInsertion": "",<br/>  "DropControlData": "",<br/>  "Query": "SELECT CalendarQuarter \n FROM analytics.DateDimension \nWHERE DateKey=20190401;",<br/>  "Result": [<br/>    {<br/>      "CalendarQuarter": "2"<br/>    }<br/>  ]<br/>}<br/><br/>``` |

### Test Classes

Test classes contain an abstract class for each view, and concrete classes for
each scenario. Using the concept of "Given... When... Then" found in Behavior
Driven Development, each "Given" (input condition) should have its own concrete
class inheriting from the abstract class. The abstract class name contains the
"When" clause. This inverts the order to "When... Given", which simplifies the
structure of the tests. Finally, each Test should contain one assertion and its
name will be something like "Then\_should\_xzy".

#### Abstract class

In this class we define common methods and tests for all test cases. There is a
set of basic methods to create:

| Method | Annotation | Description |
| --- | --- | --- |
| PrepareDatabase | OneTimeSetup | From this method, the database or the snapshot that will be used in the tests is loaded. |
| Act | OneTimeSetup | Run install process of views and stored procedures. Also, it is used to load the control data. |
| Then\_view\_should\_match\_column\_dictionary | Test | This test verifies that the view has the names and data types of the corresponding columns. |

To run test cases, the summary uses two XML / JSON files in Act and
Then\_view\_should\_match\_column\_dictionary.

| File | Description |
| --- | --- |
| 000\_`<ViewName>`\_Data\_Load.xml | It includes in ControlDataInsertion all the insertions necessary to execute test cases. To test a view, you must insert data into the joined tables to create the view. It is necessary, when removing an insertion from a row, to extract the inserts for all required foreign key restrictions.  <br/><br/>For example, if you want to extract a row from table A, and this table refers by means of a foreign key to table B, then instead of making a single insertion, two insertions are needed to respect referential integrity. And, if B has other foreign keys, B must follow the same process, and so on with all foreign keys, almost recursively.<br/><br/>Although it is possible to include inserts for each specific test case, it is recommended to use one file to include all the inserts, and only in cases of exception, insert files into a particular test case file.<br/><br/>**Example of 000\_`<ViewName>`\_Data\_Load.xml** Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>    SET IDENTITY_INSERT edfi.schooltype ON;<br/>    INSERT INTO edfi.schooltype (SchoolTypeId, CodeValue, Description, ShortDescription, Id, LastModifiedDate, CreateDate ) <br/>  ( SELECT TOP 1 '2', 'Regular', 'Regular', 'Regular', 'FA037C41-5BAE-4077-B48D-3C2308185F37', <br/>   'Jun 19 2015 11:41AM', 'Jun 19 2015 11:41AM' WHERE NOT EXISTS ( SELECT 1 FROM edfi.schooltype WHERE schooltypeId = 2 ) );<br/>    SET IDENTITY_INSERT edfi.schooltype OFF;<br/>  <br/> INSERT INTO edfi.CalendarEventDescriptor (CalendarEventDescriptorId, CalendarEventTypeId ) <br/>  ( SELECT TOP 1 '686', '1' WHERE NOT EXISTS ( SELECT 1 FROM edfi.CalendarEventDescriptor <br/>    WHERE CalendarEventDescriptorId = 686 AND CalendarEventTypeId = 1 ) );<br/>    ...<br/>  </ControlDataInsertion><br/></TestCase><br/><br/>``` |
| 0001\_view\_should\_match\_column\_dictionary | This file has the query to obtain the list of the columns and their types of data, for which you need to indicate the schema and the name of the view or table.<br/><br/>The query to obtain the column name and data type is as follows:<br/><br/>**Get table columns**<br/><br/>```<br/>SELECT [COLUMN_NAME] AS [ColumnName], <br/>       [DATA_TYPE] AS [DataType]<br/>FROM [information_schema].[columns]<br/>WHERE [table_schema] = '<Schema>'<br/>      AND [table_name] = '<View_Name>'<br/>ORDER BY [ORDINAL_POSITION] ASC;<br/><br/>```<br/><br/>To obtain the list of columns in XML format that must be included in the XML, the original query, adding at the end 'FOR XML PATH (' Result ').<br/><br/>The above will return an XML with the result of the column.<br/><br/>**Get table columns XML**<br/><br/>```<br/>SELECT [COLUMN_NAME] AS [ColumnName], <br/>       [DATA_TYPE] AS [DataType]<br/>FROM [information_schema].[columns]<br/>WHERE [table_schema] = '<Schema>'<br/>      AND [table_name] = '<View_Name>'<br/>ORDER BY [ORDINAL_POSITION] ASC<br/>FOR XML PATH('Result');<br/><br/>```<br/><br/>For example, the file for the DateDimension view would look like this:<br/><br/>**Example of 0001\_view\_should\_match\_column\_dictionary.xml**  Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/> <DBMS>Any</DBMS><br/> <ControlDataInsertion><br/> </ControlDataInsertion><br/> <Query><br/>     SELECT COLUMN_NAME AS ColumnName,<br/>       DATA_TYPE AS DataType<br/>     FROM information_schema.columns<br/>     WHERE table_schema = 'analytics'<br/>      AND table_name = 'DateDimension'<br/>     ORDER BY ORDINAL_POSITION ASC;<br/> </Query><br/> <Result><br/>  <ColumnName>DateKey</ColumnName><br/>  <DataType>varchar</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>Date</ColumnName><br/>  <DataType>datetime</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>Day</ColumnName><br/>  <DataType>int</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>Month</ColumnName><br/>  <DataType>int</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>MonthName</ColumnName><br/>  <DataType>nvarchar</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>CalendarQuarter</ColumnName><br/>  <DataType>int</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>CalendarQuarterName</ColumnName><br/>  <DataType>varchar</DataType><br/> </Result><br/> <Result><br/>  <ColumnName>CalendarYear</ColumnName><br/>  <DataType>int</DataType><br/> </Result><br/></TestCase><br/>``` |

#### Test Fixture Class

To test a view, you must consider a set of cases and rows to prove that everyone
passes the test, and, most importantly, to prove that the test fails if
something is different in a view. In some cases, this requires more than one
test class to cover test cases of success and exception. The first step is to
identify possible points of error on a view query if the original script was
changed or does not correspond with the current version.

You must populate data with at least one row that works correctly. Then, you
need to add data rows that should not be returned. If one of those rows are
returned, it is because some condition is failing or is missing. That is our
control data.

When developing tests, pay attention to points that could change the view
behavior. Some examples of conditions that do not break the view, but could
change the result if they are changed:

* IsNull replacement: if a column uses an `ISNULL` function call (or `COALESCE`)
  to handle null values and replace it with a default value. We can validate if
  the value is correctly changed. For that, you need a row that has null that
  column.
* Join conditions: some joins can use a list of conditions with and. If you
  comment out a condition, the view, in some cases would be failed. You need
  enough data to check to join conditions combinations.
* Where filter: if the view uses a where you need data to simulate that view
  return data if you comment out or remove that filter.

It is recommended to write at least one test case for each of the columns in the
table. Additionally, each test case must verify only one item (e.g., row,
column) at a time. The framework allows you to compare queries with multiple
rows and columns, but for control purposes, it is recommended to keep it
restricted in the test cases.

Below are some examples of test cases:

| Case | Description |
| --- | --- |
| Should return one record | This case is used to verify cases where a query against a view should return a single record (ensuring, for example, queries using the key return one and only one record).<br/><br/>The expected result is that the count is equal to 1. If, for some reason, a filter or a join has been modified, it would be possible for the query to return more than one. This is not going to happen as a general rule, because in some cases the view query filters will restrict the key from always returning one record.<br/><br/>If that is not the case, you should consider the above to include rows that, for existing combinations, if modified, return more than one record.<br/><br/>**Apr\_1\_2019\_should\_return\_one\_record.xml** Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>  </ControlDataInsertion><br/>  <Query><br/>    SELECT count(1) as CountValue<br/> FROM analytics.DateDimension<br/> WHERE DateKey=20190401;<br/>  </Query><br/>  <Result><br/>    <CountValue>1</CountValue><br/>  </Result><br/></TestCase><br/>``` |
| Should not return any record | For some cases, the view should never return rows. However, by modifying any of the filters, some rows affected by it can be returned, which would not be correct and would fail the test.<br/><br/>In cases like the one described, it is necessary to insert test records that have conditions that do not meet the filters. In this way, with eliminating one of the conditions, the count will be different from 0.<br/><br/>Cases created in this way should be treated with care, since if the query has errors or incorrect values in the XML, the query will not fulfill its purpose, since it would always return empty.<br/><br/>In this case, the queried row does not meet the criteria included internally in the view. If one of those conditions is eliminated, then the row will be returned. The test validates, that for the current conditions, the row is never returned by the view.<br/><br/>**\_should\_not\_return\_any\_record.xml** Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>  </ControlDataInsertion><br/>  <Query><br/>    SELECT COUNT(1) AS CountValue<br/>    FROM analytics.UserStudentDataAuthorization<br/>    WHERE UserKey='11324' AND StudentKey='218269';<br/>  </Query><br/>  <Result><br/>    <CountValue>0</CountValue><br/>  </Result><br/></TestCase><br/>``` |
| Should be empty | For some rows of a view, a column may be empty. You can test if a column is empty or if you are using ISNULL or COALESCE. For example, if a null column is using an ISNULL to return an empty string, and this is deleted, the test receives a null value, and the test case will fail.<br/><br/>In the following case, the query in the row returns empty the LocalEducationAgencyCharterStatus column.<br/><br/>**\_should\_be\_empty.xml** Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>  </ControlDataInsertion><br/>  <Query><br/>    SELECT LocalEducationAgencyCharterStatus<br/>    FROM analytics.LocalEducationAgencyDimension<br/>    WHERE LocalEducationAgencyKey = 528530;<br/>  </Query><br/>  <Result><br/>    <LocalEducationAgencyCharterStatus></LocalEducationAgencyCharterStatus><br/>  </Result><br/></TestCase><br/>``` |
| Should be `<value>` | Sometimes, the returned columns can be generated as calculated columns (e.g., the quarter, the date of the last modification) or it is simply required to verify that the value obtained for that column corresponds to a specific one corresponding to the data of control inserted.<br/><br/>In the following example, the view calculates the quarter number to which a date belongs. Then, in the query it is verified that the value returned by the query in the database corresponds to the expected value. In this case, for the date 2019-04-01, the expected value of the quarter is 2. If a value other than 2 is obtained, the test fails.<br/><br/>**Apr\_1\_2019\_calendarQuarter\_should\_be\_2** Expand source<br/><br/>```<br/><?xml version="1.0" encoding="utf-8" ?><br/><TestCase><br/>  <DBMS>Any</DBMS><br/>  <ControlDataInsertion><br/>  </ControlDataInsertion><br/>  <Query><br/>    SELECT CalendarQuarter<br/>    FROM analytics.DateDimension<br/>    WHERE DateKey=20190401;<br/>  </Query><br/>  <Result><br/>    <CalendarQuarter>2</CalendarQuarter><br/>  </Result><br/></TestCase><br/>``` |

So, a Test Fixture class will look like:

```csharp title="Test Fixture class"
[TestFixture]
public class Given_<test_scenario>
    : When_querying_the_<base abstract class>_view
{
    protected override TestHarness _dataStandard => TestHarness.DataStandardX;
    private string _caseIdentifier = "<test case prefix>";

    [Test]
    public void Then_should_return_one_record()
    {
        (bool success, string errorMessage) testResult =
           _dataStandard.RunTestCase<CountResult>($"{TestCasesFolder}.{_caseIdentifier}_should_return_one_record.xml");
  //For this case, test result should be true.
        testResult.success.ShouldBe(true, testResult.errorMessage);
    }
...
}
```
