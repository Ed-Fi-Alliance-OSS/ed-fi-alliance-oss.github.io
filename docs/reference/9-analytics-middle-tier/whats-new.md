---
hide_table_of_contents: true
sidebar_position: 2
---


# What's New in the Analytics Middle Tier

This section provides an overview of what's new in each release of the Analytics
Middle Tier.

## Version 4.0.0 (Latest)

### Enhancements

Analytics Middle Tier v4.0 provides support for the ODS/API v6.1 version.

## Version 3.1.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

The AMT 3.1 release provides some minor clean up on column data types by casting
columns to be more appropriate and consistent data types.  The data types are
now more consistent across the SQL Server, postgres, and API driven AMT
solutions.  These changes were validated against the existing starter kit Power
BI reports to make sure no significant errors or changes occur.

</details>

## Version 3.0.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

The AMT 3.0 release will support new database versions (SQL Server 2019 and
Postgres 13), provide Multi-Year support, and Multi-version support. AMT has
been updated to support .NET 6. The 3.0 release also includes additional data
elements for the EPP starter kit. Finally, the 3.0 release includes some bug
fixes identified by comparing API results with the AMT results.

</details>

## Version 2.9.2

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.9.2 includes updates to the EPP starter kit collection.  The updates
improve the EPP starter kit security.  Other updates include a move to .NET 6,
fixed an optional address bug on SchoolDim, and added some workflow improvements
to building and release of AMT.  Note that version 2.9.1 release was a minor
update to better support the AMT docker install and wasn't provided publicly.

</details>

## Version 2.9.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.9.0 includes the EPP starter kit collection.  The changes move the EPP
starter kit queries to the AMT core model from the community contribution
repository.  Note that version 2.8.0 was an internal release and wasn't provided
publicly.  The 2.8.0 release was focused on changes to the build and deployment
steps related to Analytics Middle Tier.

</details>

## Version 2.7.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.7.0 has modifications to include:

* Support for ODS/API version 5.3
* Expanded and Updated unit tests
* We also updated our build processes during this release

</details>

## Version 2.6.1

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.6.1 has modifications to include:

* Expanded postgres testing
* corrected the formatting on the GradingPeriodKey
* Removed constraints on the assignment submission types
* Changed priority of the asmt\_AssessmentFact
* Fixed the SessionKey in the SectionDim
* Updated the AcademicTimePeriodDim's SessionKey

</details>

## Version 2.6.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.6.0 has support for the Engage Online Learners starter kit.  These
changes include moving the digital equity columns, updating StudentSectionDim to
include StudentSchoolKey, and the Engage Online Learners collection.

</details>

## Version 2.5.1

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.5.1 has a few minor updates.

* The Student Equity Collection supports the grading cohort view in addition
    to the previous cohort domain.
* Row level security supports a section permission
* The assessment collection has some bug fixes to improve assessment results

</details>

## Version 2.5.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.5.0 comes with a few changes to the Analytics Middle Tier:

1. AMT has a new Student Equity based collection which includes student
    discipline, feeder schools, student food service programs, and student
    history.
2. Made the following updates to core collections:
    1. Added birthdate to StudentSchoolDim
    2. Added postal code to ContactPersonDim
3. Minor performance improvements to the chronic absenteeism views

</details>

## Version 2.4.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.4.0 includes some additions to the Core library that better supports
section information, staff information, and program information.  These new
views also help to fill in information needed for the new starter kit projects.
This version also includes a fix to the assessment collection that no longer
filters out assessments when some data is absent.

</details>

## Version 2.3.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.3.0 comes with a few changes to the Analytics Middle Tier:

1. AMT has a new Assessment based collection. Which includes all the scores,
    performance levels, and learning standards across each assessment and any of
    its loaded assessment objectives.
2. Fixed a teacher union issue with the row-level security's
    UserStudentDataAuthorization view.

</details>

## Version 2.2.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

Version 2.2.0 comes with a few changes to the Analytics Middle Tier:

1. AMT now has official support for postgres deployments. All tests have been
    run against the postgres implementation using sample data and match the
    output of the SQL Server counterpart
2. The chronic absenteeism view has been modified to clarify what data resides
    in the view. Instead of a naming convention that uses "isAbsent..." or
    "isPresent..." the modified naming convention uses "reportedAsAbsent" and
    "reportedAsPresent". This is to clarify that the data contained within those
    columns are dependent on how the data was reported. Districts reporting
    positive attendance will typically use the "reportedAsPresent" columns while
    districts reporting negative attendance will typically use the
    "reportedAsAbsent" columns.
3. AMT now has a companion repository for community contributed collections.
    This companion repository can be found
    at [https://github.com/Ed-Fi-Exchange-OSS/Analytics-Middle-Tier-Contrib](https://github.com/Ed-Fi-Exchange-OSS/Analytics-Middle-Tier-Contrib).
    Documentation on usage and deployment can be found at [Community
    Contribution
    Repository](./contributor-guide/community-contribution-repository.md)

</details>

## Version 2.1.1

<details>
<summary>Click here to expand...</summary>

### Enhancements

The version 2.1.1 release of Analytics Middle contains a hotfix to add
SectionKey to the ClassPeriodDim View.  This was added to remove ambiguity and
better support referencing ClassPeriodDim with the ODS.

</details>

## Version 2.1.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

The version 2.1.0 release of Analytics Middle has the following additions to the
solution

* Added the chronic absenteeism use case collection.
* Validated support for Ed-Fi ODS/API Suite 3 version 5.0.0
* Included the class period name to the section Dim

</details>

## Version 2.0.0

<details>
<summary>Click here to expand...</summary>

### Enhancements

The version 2.0.0 release of Analytics Middle resolves several key architectural
problems from the original releases, and introduces improvements that make the
tool easier to maintain and easier for the community to make contributions. This
release includes breaking changes from previous releases.

Highlights include:

* Supports Ed-Fi Data Standard
    v[2.2](https://edfi.atlassian.net/wiki/spaces/EFDS22),
    v[3.1](https://edfi.atlassian.net/wiki/spaces/EFDS31), and
    v[3.2](https://edfi.atlassian.net/wiki/spaces/EFDS32/overview) (both 3.2a or
    3.2b).
  * Thus it supports Ed-Fi ODS/API versions 2.5.1, 2.6, 3.1.1, 3.2.0, 3.3.0,
        and 3.4.0.
* The names of "dimension views" have been trimmed to use the suffix "Dim"
    instead of "Dimension".
* All references to Student, Parent, and Staff tables in the Ed-Fi ODS
    database now utilize the "UniqueId" unique columns instead of the "USI"
    unique columns.
* A `SchoolYear` column has been added to several views, thus facilitating
    import of Analytics Middle Tier data from multiple year-specific databases
    into a single data mart.
* The old `StudentDimension` is now two
    views: `StudentSchoolDim` and `StudentLocalEducationAgencyDim` . These two
    views encapsulate the relationship of a student to an organization entity,
    including demographic information.
* Fully supports mapping descriptors (and, in Data Standard v2.2, Types) to
    constant values used by the views — thus removing the previous hard-coding
    of the views to the out-of-the box Ed-Fi Descriptors (and types).
* There is a clearly defined set of core views that are always installed, and
    a mechanism for the optional install of use-case specific views. The
    original Early Warning System and Row-Level Security views have now become
    optional use-case collections.
* Program-related views were removed, but may be replaced in the future based
    on community needs.

For more information on these design changes, please see [Version 2.0
Requirements and
Design](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24806003/Version+2.0+Requirements+and+Design).

### Bug Fixes

Some of the enhancements were in response to community-identified issues, which
were never logged as bugs per se. They are listed below for completeness along
with one community-reported bug.

|     |     |     |     |
| --- | --- | --- | --- |
| Key | Summary | T   | Status |

[No issues
found](https://tracker.ed-fi.org/issues/?jql=key+in+%28BIA-150%2C+BIA-152%2C+BIA-227%2C+BIA-309%29+&src=confmacro)

### Installation

Brief instructions follow. For more detailed instructions, please see the [AMT
Deployment Guide](./deployment-guide/readme.mdx).

1. Download the compiled application [from
    GitHub](https://github.com/Ed-Fi-Alliance/Ed-Fi-Analytics-Middle-Tier/releases/tag/2.0.0-rc1),
    either:
    1. EdFi.AnalyticsMiddleTier-win10.x64.zip is fully compiled for execution
        in Windows 10 or Windows Server 2016/2019, with or without the .NET Core
        3.1 runtime, or
    2. EdFi.AnalyticsMiddleTier.zip contains the compiled code without platform
        optimizations. Requires the [.NET Core 3.1
        runtime](https://dotnet.microsoft.com/download), which can be executed
        in any .NET Core support environment.
2. Unzip the downloaded files, open PowerShell, and navigate to the folder
    containing the application files.
3. Run the application with no arguments, carefully studying the help message
    for detailed instructions on the command line operation of this tool.
    1. For EdFi.AnalyticsMiddleTier-win10.x64.zip:

        ```powershell
        cd EdFi.AnalyticsMiddleTier-win10.x64
        .\EdFi.AnalyticsMiddleTier.Console.exe
        ```

    2. For EdFi.AnalyticsMiddleTier.zip:

        ```powershell
        cd EdFi.AnalyticsMiddleTier.Console
        dotnet EdFi.AnalyticsMiddleTier.Console.dll
        ```

</details>

## Version 1.3.2

<details>
<summary>Click here to expand...</summary>

### Bug Fixes

|     |     |     |
| --- | --- | --- |
| Key | Summary | T   |

[No issues
found](https://tracker.ed-fi.org/issues/?jql=fixVersion+%3D+%22Analytics+Middle+Tier+v1.3.2%22+&src=confmacro)

</details>

## Version 1.3.1

<details>
<summary>Click here to expand...</summary>

### Bug Fixes

|     |     |     |
| --- | --- | --- |
| Key | Summary | T   |

[No issues
found](https://tracker.ed-fi.org/issues/?jql=fixVersion+%3D+%22Analytics+Middle+Tier+v1.3.1%22++&src=confmacro)

</details>

## Version 1.3.0

<details>
<summary>Click here to expand...</summary>

### New Functionality

Now with support for Data Standard 3.1! (both ODS/API 3.1 and 3.2). The default
installation parameters still correspond to Data Standard 2.x. To install with
Data Standard 3.1, add flag `--dataStandard Ds31` to the command. For example:

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe --dataStandard Ds31 `
  --connectionString "Server=.;Database=EdFi_Glendale;Trusted_connection=true"
```

Or alternately, use the short-hand:

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe -d Ds31 `
  -c "Server=.;Database=EdFi_Glendale;Trusted_connection=true"
```

### Bug Fixes

Student enrollment now accepts students with future exit date as being enrolled,
whereas before the views were erroneously excluding all students with an
ExitDate regardless of when that date occurs.

|     |     |     |
| --- | --- | --- |
| Key | Summary | T   |

[No issues
found](https://tracker.ed-fi.org/issues/?jql=issuetype+%3D+Bug+AND+fixVersion+%3D+%22Analytics+Middle+Tier+v1.3.0%22+++&src=confmacro)

</details>

## Version 1.2.0

<details>
<summary>Click here to expand...</summary>

### New Functionality

* Added `LetterGradeEarned`  column to `StudentSectionGradeFact`

### Bug Fixes

* Resolve a naming conflict, internal to the views, that impacts ability to
    add the views directly to PowerBi (bypassing Tabular Data Model).
* Allow re-install after uninstall

</details>

## Version 1.1.0

<details>
<summary>Click here to expand...</summary>

The installation process has changed slightly, to make it easier to introduce
new optional domains. Now, to install the optional indexes, use argument `-o
Indexes` instead of the old `-i`.

This release includes the EWS views created for the QuickSight starter kit.

`StudentDataAuthorizationDimension` has a breaking change in it, reporting
on `SectionId` instead of `SectionKey`. There was previously an inconsistency
with `UserStudentDataAuthorization`, which used the `Section.Id` instead of
concatenating the natural key into a `SectionKey`. Since solutions that use this
dimension are providing student-level authorization, not section-level, it was
appropriate to (a) change for consistency and (b) not confuse people further by
keeping the name `SectionKey`. Per normal SemVer rules this should have bumped
the version number to 2.0.0, but we're breaking that rule since we're still very
early in the rollout of this application.

In `StudentSectionGradeFact`, letter grades are now translated to numeric
grades, with the help of a new table `analytics_config.LetterGradeTranslation`.
Default values are provided. When a student has a numeric grade, the fact view
will use the numeric value. If the numeric value is null, then the view attempts
to use a translated letter instead.

</details>

## Version 1.0.0

Initial release.
