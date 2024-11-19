# Migration Utility – End of Support Notice and Product Discontinuation

31 Mar 2022

:::warning

The Alliance intends to stop providing support for Migration Utility on March
31st, 2023 and there will be no new migration support or enhancements to this
product from March 31, 2022 onwards.

:::

## What is Migration Utility?

The Migration Utility is a command-line tool built to upgrade the schema of an
ODS instance to the latest version. The utility provides out-of-the-box support
for migrating an as-shipped ODS to the latest version. See Migration Utility.

## What is changing specifically?

### What Changes

* There will be no additional releases of the Migration Utility supporting newer
  versions of the ODS  beyond Ed-Fi ODS / API v5.3.
* After EOL date, tracker tickets on migration utility will not be investigated
  or addressed.
* The Alliance starts allocating additional resources and budgets towards
  working on providing simple SQL migration scripts for non breaking changes for
  upgrades during the school year. Major version upgrades will not have full
  migration support and are expected to be taken by the education agency at the
  beginning of the school year.

### What Does Not Change

* Ed-Fi community members can continue to use Migration Utility for existing
  version upgrades.
* Ed-Fi licensees will continue to have full access to source code.
* All existing documentation on TechDocs will be retained.

## Why is this change being made?

Migration Utility was built to support upgrading a ODS deployed for multi-year
use to newer versions. Migration utility is being retired following the recent
recommendation to use the ODS for single year data collection (see [Guidance on
Multi-Year Data in
ODS](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24547444/Guidance+on+Multi-Year+Data+in+ODS)).
Migration is less of concern when using ODS for single year data collection, as
a new ODS (or ODS database) is created at the beginning of every school year.

## What are other alternatives?

As noted above, The Alliance will be providing standalone SQL migration scripts
for minor releases to facilitate upgrades during the school year. Apart from
that various off the shelf productions &mdash; like [SQL Server Data Tools
(SSDT) Schema
Compare](https://docs.microsoft.com/en-us/sql/ssdt/how-to-use-schema-compare-to-compare-different-database-definitions?view=sql-server-ver15),
[RedGate SQL
Compare](https://www.red-gate.com/products/sql-development/sql-compare/), or
others &mdash; can be used for generating ODS upgrade scripts.

## I have a question that is not answered above

Please contact the Alliance via the [Ed-Fi Community
Hub](https://community.ed-fi.org)
