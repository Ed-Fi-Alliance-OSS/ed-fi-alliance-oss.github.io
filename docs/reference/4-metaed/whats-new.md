# What's New

:::tip

If you already have the Visual Studio Code based editor, then it will
automatically update the MetaEd extension for you. If you are still using the
deprecated Atom based editor, then please see [MetaEd IDE - Upgrading to MetaEd
4.x](./ide-user-guide/upgrading-to-metaed-4x.md).

:::

## Updates and Improvements in version 4.4.0

Release date: 20 May 2024

### Overview

Version 4.4 supports the upcoming ODS/API 7.2 and Data Standard 5.1 releases and
supports ODS/API 6.2 and 5.4 releases explicitly (formerly only supported
implicitly, by selecting the prior minor release 6.1 or 5.3). Includes improved
user error reporting for swifter diagnosis.

### Changes

* \[METAED-1514\] typos in metaed settings "API source directory" should be
  causing deploy to fail but are not
* \[METAED-1466\] Display deployment failure message on error
* \[METAED-1466\] Improve error messages
* \[METAED-1433\] Make it easier to find data standard folders for MetaEd
* \[METAED-1548\] Support for 5.4 and 6.2
* \[METAED-1557\] Add DS 5.1

[Complete change log in
Tracker](https://tracker.ed-fi.org/projects/METAED/versions/15627). Note that
there are many more changes that are not user facing, primarily in support of
[Project Tanager](https://github.com/Ed-Fi-Alliance-OSS/Project-Tanager/).

## Updates and Improvements in version 4.3.0

Release date: 30 Nov 2023

## Overview

This release supports version 5.0 final of the Ed-Fi Data Standard, and Ed-Fi
ODS/API version 7.1. It drops support for obsolete Ed-Fi Data Standard and Ed-Fi
ODS/API versions in alignment with the Ed-Fi Technical Suite Version Matrix.

### Changes

* Support for ODS/API 7.1 and DS 5.0 final.
* Dropped support for all ODS/API and Data Standard versions no longer supported
  as of ODS/API 7.1 release date.
* MetaEd Ids are now completely optional and duplicate checking has been
  removed.
* Added warning that the ODS/API treats choice properties as optional even when
  annotated as required.
* Update to ODS/API index generation in support of performance improvements in
  ODS/API 7.1.

## Updates and Improvements in version 4.2.1

Release date: 01 Aug 2023

## Overview

This release updates version 5.0-pre.2 of the Ed-Fi Data Standard.

### Changes

* Update packaged version of 5.0-pre.2 of the Ed-Fi Data Standard to the final
  version.

[Complete change log in
Tracker](https://tracker.ed-fi.org/projects/METAED/versions/15614)

## Updates and Improvements in version 4.2.0

Release date: 01 Aug 2023

<details>
<summary>Click here to expand...</summary>

## Overview

This release supports version 5.0-pre.2 of the Ed-Fi Data Standard, and Ed-Fi
ODS/API version 7.0. It also adds support for new Meadowlark features.

### Changes

* Include Data Standard 5.0-pre.2
* Support performance improvements to ODS/API 7.0
* Improve support for Meadowlark.

[Complete change log in
Tracker](https://tracker.ed-fi.org/projects/METAED/versions/15603)

</details>

## Updates and Improvements in version 4.1.1

Release date: 22 May 2023

<details>
<summary>Click here to expand...</summary>

### Overview

This release provides for internal changes to MetaEd, including a shift to
hosting on Azure Artifacts and a change to the internal plugin architecture.

### Changes

* Moved from MyGet npm package hosting to Azure Artifacts
* Changed internal plugin architecture to be compatible with modern JavaScript
  bundlers for future performance improvements.

</details>

## Updates and Improvements in version 4.0

Release date: 25 Apr 2023

<details>
<summary>Click here to expand...</summary>

### Overview

With this release, the MetaEd IDE moves from the
[now-retired](https://github.blog/2022-06-08-sunsetting-atom/) Atom text editor
to Visual Studio Code ("VS Code").

### Installation

* [Upgrading to MetaEd 4.x](./ide-user-guide/upgrading-to-metaed-4x.md)

### Changes

In addition to all of the work that went into moving to VS Code:

* The HTML handbook includes a new property "JSON Element Name" that translates
  the MetaEd model name to the name that will be expressed in the API documents.
  Example below; the highlighted words show the reason for this update: the
  model property `LanguageUse`  on entity `Language`  becomes simply `uses`  in
  the JSON schema / API model.
    ![Capture.PNG](https://tracker.ed-fi.org/secure/attachment/26521/Capture.PNG)

* Removed the plugin generator: plugins are not widely used, and the code
  generator relied on an old set of JavaScript packages with known
  vulnerabilities. While those vulnerabilities do not appear to be a threat to
  MetaEd, we decided there was no value to keeping the code around.

### Bug Fixes

* \[[METAED-1350](https://tracker.ed-fi.org/browse/METAED-1350)\] - ApiModel
  DomainMetadata table comparison not using overlap-collapsed table name
* \[[METAED-1330](https://tracker.ed-fi.org/browse/METAED-1330)\] -
  ApiModel.json does not include decimal max and min values
* \[[METAED-1299](https://tracker.ed-fi.org/browse/METAED-1299)\] -
  ApiModel.json does not include integer max and min values
  * The MetaEd language defines support for MinValue and MaxValue on Decimal and
    Integer data types - but support for these was never built into MetaEd or
    the ODS/API code generation process. As of version 4.0.0, the MetaEd output
    will include these values. However, the ODS/API will not utilize the
    additional information until the 7.0 release later in the summer of 2023. If
    you have need for early access, please submit a Tracker ticket to request
    instructions on recompiling an older version of the ODS/API with these
    updates.

</details>

## Updates & Improvements in 3.2.0

Release date: 01 Dec 2022

<details>
<summary>Click here to expand...</summary>

### Overview

This release supports version 4.0 of the Ed-Fi Data Standard, and Ed-Fi ODS/API
version 6.1. We also upgrade many of the underlying package dependencies in this
version, addressing some technical debt.

This version continues to run on Atom. The next planned release will be MetaEd
4.0.0 running on Visual Studio Code.

</details>

## Updates & Improvements in 3.1.0

Release date: 30 Aug 2022

<details>
<summary>Click here to expand...</summary>

### Overview

This release corresponds with the release of the 4.0.0-a version of the Ed-Fi
Data Standard and with Ed-Fi ODS/API 6.0, along with a few functional changes
that impact any supported data standard.

### Key Changes

[Complete change log in
Tracker](https://tracker.ed-fi.org/projects/METAED/versions/14620)

* \[[METAED-1274](https://tracker.ed-fi.org/browse/METAED-1274)\] - Support ODS
  API version 6.0
  * Various tickets related to Data Standard 4.0.0-a and ODS/API 6.0, including
    several changes to how change query SQL scripts are generated.
    ![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)

         These changes only apply to the new data standard, not to older technology.
* \[[METAED-1271](https://tracker.ed-fi.org/browse/METAED-1271)\] - SQL Server
  Support String Length > 4000
* \[[METAED-1262](https://tracker.ed-fi.org/browse/METAED-1262)\] - Drop
  unnecessary plugins (MappingEDU, interchange, udm)
* \[[METAED-1286](https://tracker.ed-fi.org/browse/METAED-1286)\] - Add SQL
  Information to the DS Handbook
* \[[METAED-1267](https://tracker.ed-fi.org/browse/METAED-1267)\] - Support for
  Console Build Process on Linux

</details>

## Updates & Improvements in 3.0.0

Release date: 07 Mar 2022

<details>
<summary>Click here to expand...</summary>

### Overview

The primary purpose of this release is to upgrade MetaEd for use with NodeJs 16.
Previously, MetaEd required NodeJs 12. As of 30 April, 2022, that version will
no [longer be supported](https://endoflife.date/nodejs). By skipping over NodeJs
14, straight to version 16, this MetaEd release will be on a supported version
of NodeJs until the end of April, 2024.

Along with this upgrade, many of the Node libraries / dependencies were brought
up to date, thus eliminating a large source of tech debt and potential bugs.

### Functional Changes

There are no functional changes to the MetaEd language, build and deploy
process, extension authoring, etc. From a user perspective, the only change is
to the NodeJs framework.

</details>

## Updates & Improvements in 2.6.0

Release date: 10 Nov 2021

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in 2.5.1 include:

* **Supports ODS / API 5.3.x and Data Standard 3.3.1-b**. This version supports
  the latest (November 2021) release of the Ed-Fi Data Standard and Ed-Fi ODS /
  API.
* **License Agreement Acceptance Change.**  The MetaEd license agreement is now
  required to be accepted the first time MetaEd is run, instead of at download
  time from Tech Docs.
* **Modifications to support sub-classing of Common types**. Support for
  sub-classing of Common types was in something of a "partially supported
  limbo"; this release corrects that and offers full support for this modeling
  pattern.

### Change Detail

The following is a detailed list of changes in 2.6.0:

|     |     |
| --- | --- |
| [METAED-1228](https://tracker.ed-fi.org/browse/METAED-1228) | Support DS 3.3.1-b |
| [METAED-1209](https://tracker.ed-fi.org/browse/METAED-1209) | Upgrade axios library - security issue |
| [METAED-1210](https://tracker.ed-fi.org/browse/METAED-1210) | MetaEd-IDE link to Ed-Fi licensing is out of date |
| [METAED-1216](https://tracker.ed-fi.org/browse/METAED-1216) | Enforce license agreement at first run |
| [METAED-1224](https://tracker.ed-fi.org/browse/METAED-1224) | Expose MetaEd project "description" in ApiModel.json |
| [METAED-1207](https://tracker.ed-fi.org/browse/METAED-1207) | Add support for "Used By" in Data Handbook for Extension elements |
| [METAED-1231](https://tracker.ed-fi.org/browse/METAED-1231) | Allow common subclass to rely on parent identity |

### Known Problem

When targeting Data Standard 3.3b, the following warning will be displayed. This
can be safely ignored.

```text
  warn: MetaEdId '3116' on Descriptor Property Term already exists on another entity. All MetaEdIds must be globally unique. C:\projects\metaed\node_modules\ed-fi-model-3.3b\Common\CohortYear.metaed (9:21)
  warn: MetaEdId '3116' on Shared Decimal Property EarnedCredits already exists on another entity. All MetaEdIds must be globally unique. C:\projects\metaed\node_modules\ed-fi-model-3.3b\Common\PartialCourseTranscriptAwards.metaed (6:53)
```

</details>

## Updates & Improvements in 2.5.1

Release date: 26 Mar 2021

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in 2.5.1 include:

* **Supports ODS / API 5.2 and Data Standard 3.3.0-a**. This version supports
  the latest (March 2021) release of the Ed-Fi Data Standard and Ed-Fi ODS /
  API.
* **Language Features Changes.**
  * Use of "is weak" is now marked as deprecated; although it continues to
    support prior data standards, "is weak" will cause an error with Data
    Standard version 3.3.0-a or higher.
  * Similarly, the use of attributes on Descriptors is deprecated and will
    generate an error with Data Standard 3.3.0-a and higher.
  * The new "[potentially
    logical](./language-specification/supporting-components.md)"
    keywords indicate that a reference may have a logical rather that literal
    interpretation in a target technology.
* **Publishing Changes.**
  * The Data Handbook will no longer display the XSD Datatype for a field.
  * No longer generating an `InterchangeOrderMetadata.xml`  file, as the API
    Bulk Client Loader no longer relies on it for running bulk uploads into the
    ODS / API.

### Change Detail

The following is a detailed list of changes in 2.5.1:

|     |     |
| --- | --- |
| [METAED-742](https://tracker.ed-fi.org/browse/METAED-742) | MetaEd needs to prohibit adding attributes to descriptors |
| [METAED-1152](https://tracker.ed-fi.org/browse/METAED-1152) | Generated SQL Artifacts When In Core Mode Should Include License Header |
| [METAED-1170](https://tracker.ed-fi.org/browse/METAED-1170) | MetaEd language construct to indicate optional reference |
| [METAED-1177](https://tracker.ed-fi.org/browse/METAED-1177) | Rename API Model element mapping from "potentially logical" keyword |
| [METAED-1179](https://tracker.ed-fi.org/browse/METAED-1179) | Fix any new year (2021) issues |
| [METAED-1180](https://tracker.ed-fi.org/browse/METAED-1180) | Fix FK gen issue with role-named collection of entities themselves having role-named properties |
| [METAED-1186](https://tracker.ed-fi.org/browse/METAED-1186) | Support ODS API version 5.2.0 |
| [METAED-1191](https://tracker.ed-fi.org/browse/METAED-1191) | Bug on build and deploy buttons |
| [METAED-434](https://tracker.ed-fi.org/browse/METAED-434) | Drop 'is weak' |
| [METAED-1178](https://tracker.ed-fi.org/browse/METAED-1178) | Remove InterchangeOrderMetadata generation for ODS/API 5.0.0+ |
| [METAED-1182](https://tracker.ed-fi.org/browse/METAED-1182) | Remove XSD Datatype from the Data Handbook |

</details>

## Updates & Improvements in 2.4.0

Release date: 28 Oct 2020

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in 2.4.0 include:

* **Supports ODS / API 5.1.x and Data Standard 3.2.0-c.**  This version supports
  the latest Data Standard and ODS / API releases.
* **Fixes deploy issue.**  This version works around a bug in Atom 1.52.0 that
  prevented the MetaEd deploy feature from working.

### Change Detail

The following is a detailed list of changes in 2.4.0:

* [METAED-1171](https://tracker.ed-fi.org/browse/METAED-1171) — Metaed is not
  deploying the StudentTransportation sample extension in 5.0.0
* [METAED-1166](https://tracker.ed-fi.org/browse/METAED-1166) — MetaEd consider
  removing \\r\\n from generated artifacts
* [METAED-1168](https://tracker.ed-fi.org/browse/METAED-1168) — Support ODS API
  version 5.1.0

</details>

## Updates & Improvements in 2.3.0

Release date: 29 Jul 2020

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in 2.3.0 include:

* **Supports ODS / API 5.0.x and Data Standard 3.2.0-c.** This version supports
  the latest Data Standard and ODS / API releases.

### Change Detail

The following is a detailed list of changes in 2.3.0:

* [METAED-777](https://tracker.ed-fi.org/browse/METAED-777) — Missing Core
  Identities When Generating Interchange XSD
* [METAED-1135](https://tracker.ed-fi.org/browse/METAED-1135) — Generates
  incomplete extension interchange XML
* [METAED-1136](https://tracker.ed-fi.org/browse/METAED-1136) — Align Unique
  Index Names
* [METAED-635](https://tracker.ed-fi.org/browse/METAED-635) — Common As
  Collection With No Identity Properties Should Fail Validation
* [METAED-731](https://tracker.ed-fi.org/browse/METAED-731) — Shouldn't Allow a
  Collection of Inline Common
* [METAED-1127](https://tracker.ed-fi.org/browse/METAED-1127) — Update MetaEd
  IDE version selection components
* [METAED-1134](https://tracker.ed-fi.org/browse/METAED-1134) — Support new
  surrogate key pattern for Person
* [METAED-1138](https://tracker.ed-fi.org/browse/METAED-1138) — Change XSDs to
  use semver versions for data standard
* [METAED-1146](https://tracker.ed-fi.org/browse/METAED-1146) — Change About
  screen text to white
* [METAED-1147](https://tracker.ed-fi.org/browse/METAED-1147) — Update MetaEd
  IDE version selection components for a change in API release version
* [METAED-1144](https://tracker.ed-fi.org/browse/METAED-1144) — Default MetaEd
  to latest instead of Suite 2

</details>

## Updates & Improvements in v2.2

Release date: 20 Apr 2020

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in v2.2 include:

* **Supports ODS / API v3.4 and Data Standard v3.2b.** This version supports the
  latest Data Standard and ODS / API releases.

### Change Detail

The following is a detailed list of changes in v2.2:

* [METAED-763](https://tracker.ed-fi.org/browse/METAED-763) — MetaEd Generates
  Extra Extension Table When Extending With Optional Common
* [METAED-948](https://tracker.ed-fi.org/browse/METAED-948) — Required
  collections in MetaEd additions aren't reflected in the
  ApiModel-EXTENSION.json with correct cardinality
* [METAED-1101](https://tracker.ed-fi.org/browse/METAED-1101) — Deploy does not
  work correctly when targeting "C:"
* [METAED-1128](https://tracker.ed-fi.org/browse/METAED-1128) — Change Queries
  Deletes Fail for Derived Types in PostgreSQL
* [METAED-1102](https://tracker.ed-fi.org/browse/METAED-1102) — Consider having
  deploy list full paths for deployed files
* [ODS-3884](https://tracker.ed-fi.org/browse/ODS-3884) — Refactor Existing
  Change Queries MetaEd Plug-in for targeting specific database engines
* [ODS-3885](https://tracker.ed-fi.org/browse/ODS-3885) — Modify Change Queries
  MetaEd Plugins to Support SQL Server and PostgreSQL
* [ODS-4061](https://tracker.ed-fi.org/browse/ODS-4061) — Fix the case on the
  change query schema name

</details>

## Updates & Improvements in v2.1.2

Release date: 21 Jan 2020

<details>
<summary>Click here to expand...</summary>

### Overview

MetaEd v2.1.2 is a bug fix release. It resolves an issue that prevented
extension projects from deploying to ODS / API version 2.x.

### Change Detail

The following is a detailed list of changes in v2.1.2:

* [METAED-1106](https://tracker.ed-fi.org/browse/METAED-1106) — Deploy
  incorrectly checks for extensions projects in 2.x versions

</details>

## Updates & Improvements in v2.1.1

Release date: 03 Jan 2020

<details>
<summary>Click here to expand...</summary>

### Overview

MetaEd v2.1.1 is a bug fix release. It resolves an issue when targeting ODS /
API v3.3 and Data Standard v3.2a that prevented extension projects from building
in the ODS / API.

### Change Detail

The following is a detailed list of changes in v2.1.1:

* [METAED-1105](https://tracker.ed-fi.org/browse/METAED-1105) — Revert and
  incorporate Ed-Fi-Model 3.2a to report project version 3.2.0

</details>

## Updates & Improvements in v2.1.0

Release date: 11 Dec 2019

<details>
<summary>Click here to expand...</summary>

### Overview

The major improvements in v2.1 include:

* **Supports ODS / API v3.3 and Data Standard v3.2a.** This version supports the
  latest Data Standard and ODS / API releases.
* **Adds Support for Deprecation.** Modelers can now mark entities and
  properties as being deprecated and slated for removal in future model
  versions. Warnings notify users where extension projects rely on a deprecated
  entity or property. Deprecation is also surfaced in the Ed-Fi Handbook
  documentation.
* **Adds Common Subclasses.** This allows modelers to subclass a Common in a
  manner similar to Association and Domain Entity subclasses, providing an
  alternative to Common Extensions.
* **Deprecated Uncommon Language Features.** Extensions will get deprecation
  warnings when using uncommon language features slated for removal in a future
  version. Most extension projects will be unaffected.
* **Ready for Roadrunner.** This version generates all files necessary for
  Project Roadrunner's PostgreSQL implementation.

### Change Detail

The following is a detailed list of changes in v2.1:

* [METAED-621](https://tracker.ed-fi.org/browse/METAED-621) — Create New
  Language Element to Subclass Core Common Types
* [METAED-1082](https://tracker.ed-fi.org/browse/METAED-1082) — Implement
  PostgreSQL name collapsing
* [METAED-966](https://tracker.ed-fi.org/browse/METAED-966) — Revise Data
  Handbook to clearly distinguish the case when there are duplicate entity names
* [METAED-969](https://tracker.ed-fi.org/browse/METAED-969) — Remove dash from
  "Ed-Fi" project name in MetaEd versions of Data Standard projects
* [METAED-989](https://tracker.ed-fi.org/browse/METAED-989) — Have Data Handbook
  conform to UML datatypes and standardized bindings
* [METAED-994](https://tracker.ed-fi.org/browse/METAED-994) — Ed-Fi HTML
  Handbook missing extension components
* [METAED-1004](https://tracker.ed-fi.org/browse/METAED-1004) — Introduce
  concept of deprecation in MetaEd DSL
* [METAED-1018](https://tracker.ed-fi.org/browse/METAED-1018) — Expand merge
  validation to include Domain Entities that are parents of conflicting Simple
  Types
* [METAED-1041](https://tracker.ed-fi.org/browse/METAED-1041) — Create
  PostgresSQL-specific SQL plugin
* [METAED-1044](https://tracker.ed-fi.org/browse/METAED-1044) — Surface
  deprecation in the Data Handbook
* [METAED-1045](https://tracker.ed-fi.org/browse/METAED-1045) — Surface
  deprecation in the API model
* [METAED-1046](https://tracker.ed-fi.org/browse/METAED-1046) — Deprecate use of
  MetaEd DSL words for use in extensions
* [METAED-1054](https://tracker.ed-fi.org/browse/METAED-1054) — Add deprecation
  warnings to extension and subclassing
* [METAED-1055](https://tracker.ed-fi.org/browse/METAED-1055) — Support for
  Record Level Ownership Authorization
* [METAED-1060](https://tracker.ed-fi.org/browse/METAED-1060) — Minor
  realignments to Handbook branding
* [METAED-1064](https://tracker.ed-fi.org/browse/METAED-1064) — Add deprecation
  reason to Data Handbook
* [METAED-1075](https://tracker.ed-fi.org/browse/METAED-1075) — Plugin load
  errors should communicate to end users
* [METAED-1076](https://tracker.ed-fi.org/browse/METAED-1076) — Surface
  non-validator issue messages to IDE and console end users
* [METAED-1083](https://tracker.ed-fi.org/browse/METAED-1083) — MetaEd support
  for ODS/API v2.6
* [METAED-1086](https://tracker.ed-fi.org/browse/METAED-1086) — Change ODS / API
  Deploy directory structure
* [METAED-1092](https://tracker.ed-fi.org/browse/METAED-1092) — Changes to ODS /
  API Deploy core artifacts location
* [METAED-1098](https://tracker.ed-fi.org/browse/METAED-1098) — Set log messages
  unimportant to end users to debug level
* [METAED-891](https://tracker.ed-fi.org/browse/METAED-891) — Handbook - provide
  link back to superclass from a subclass
* [METAED-1049](https://tracker.ed-fi.org/browse/METAED-1049) — Entity with same
  name as simple type causes incorrect XSD generation
* [METAED-1062](https://tracker.ed-fi.org/browse/METAED-1062) — Turn off
  deprecation warnings for core when in normal (not Alliance) mode
* [METAED-1078](https://tracker.ed-fi.org/browse/METAED-1078) — MetaEdEnvironment.metaEdVersion
  not being set to actual version
* [METAED-1085](https://tracker.ed-fi.org/browse/METAED-1085) — Relational
  plugin - column cloning is too shallow
* [METAED-1087](https://tracker.ed-fi.org/browse/METAED-1087) — Some plugins
  crash when non-dependent plugins are not loaded

</details>

## Updates & Improvements in v2.0

Release date: 24 Jul 2019

<details>
<summary>Click here to expand...</summary>

### Backward Compatibility with v1.x

Existing MetaEd v1.x projects can be upgraded to v2.x. The steps to upgrade a
project are outlined in
[https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709882](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709882).

### Overview

The major improvements from v1.0 include:

* **Added New Namespace Reference.** This new feature allows reuse of entity
  names across multiple extension projects. See the [Namespace
  Reference](./language-specification/namespace-references.md)
  documentation for more details.
* **Requires Node 12.5.0 or higher.** Node 6.x was end-of-lifed in April 2019.
  Node 12.5.0 is the most current version, with long term support until April
  2022.
* **Removed Implicit Merges.** This improvement removes automatic key
  unification when column names match, which provides greater transparency to
  data modelers. See the MetaEd Cookbook entry [Using Merge
  Directives](./cookbook/14-using-merge-directives.md) for more
  information about key unification in MetaEd v2.0.
* **Added Standardized Plugin Configuration.** This new feature for the IDE
  framework automatically loads configuration files, organizes the data, and
  notifies plugins.
* **Changed "With Context" to "Role Name".** This language improvement changed
  `With Context` to `Role Name` to better represent the purpose of the keywords.
  The
  [https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709882](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709882)
  section in the Getting Started guide has details about how to update old
  projects to reflect the new language specification.
* **Added Open Existing Project Support in the IDE.** This improvement adds a
  new Open Existing Project menu option, which, not surprisingly, opens an
  existing project in MetaEd.

### Change Detail

The following is a detailed list of changes from v1.0:

* [METAED-898](https://tracker.ed-fi.org/browse/METAED-898) — New Namespace
  Reference
* [METAED-854](https://tracker.ed-fi.org/browse/METAED-854) — Upgrade Node
  Requirement to 12.x
* [METAED-916](https://tracker.ed-fi.org/browse/METAED-916) — Removed Implicit
  Merges
* [METAED-827](https://tracker.ed-fi.org/browse/METAED-827) — Standardized
  Plugin Configuration
* [METAED-886](https://tracker.ed-fi.org/browse/METAED-886) — With Context to
  Role Name
* [METAED-953](https://tracker.ed-fi.org/browse/METAED-953) — Api Model is
  Generating DateTime instead of DateTime2
* [METAED-972](https://tracker.ed-fi.org/browse/METAED-972) — Convert CreateDate
  and LastModifiedDate to DateTime2
* [METAED-861](https://tracker.ed-fi.org/browse/METAED-861) — Have IDE save
  before build and deploy
* [METAED-991](https://tracker.ed-fi.org/browse/METAED-991) — inline common not
  caught by validation in 2.x
* [METAED-988](https://tracker.ed-fi.org/browse/METAED-988) — MetaEd 2.0 needs
  validation that SchoolYear is EdFi.SchoolYear
* [METAED-965](https://tracker.ed-fi.org/browse/METAED-965) — Add an open
  existing extension project option to IDE
* [METAED-1024](https://tracker.ed-fi.org/browse/METAED-1024) — Association
  domain entity references cannot have merge directives
* [METAED-993](https://tracker.ed-fi.org/browse/METAED-993) — Clarify Tech Suite
  2 support for new features added in MetaEd 2.0
* [METAED-1026](https://tracker.ed-fi.org/browse/METAED-1026) — Improve error
  message for projectName
* [METAED-997](https://tracker.ed-fi.org/browse/METAED-997) — If the user
  duplicates an entity name in multiple namespaces, don't generate bulk
  extension artifacts

</details>
