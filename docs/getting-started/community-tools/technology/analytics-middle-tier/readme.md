# Analytics Middle Tier

:::caution

The Ed-Fi Alliance no longer recommends new production dependencies
on Analytics Middle Tier; see the Ed-Fi Community Tools announcement above for more
information.

:::

## Overview

The Analytics Middle Tier is a set of denormalized analytics views over the
database tables backing an
[Ed-Fi ODS/API deployment](/reference/ods-api-platform),
satisfying the user story:

As a district data analyst, I want to build intelligent reporting on the Ed-Fi
ODS with **minimal learning curve and low risk of breaking changes**, so that I
can deliver timely data to educators and administrators.

These views are suitable for use in a wide range of downstream applications. For
more information, see the [AMT
Overview](./amt-overview.md).

## Installing the Views

System administrators install the Analytics Middle Tier into an Ed-Fi ODS
database using a command-line utility. Every version of the utility builds on
prior releases by migrating the analytics views to the current release, without
having to uninstall (though v2.0.0 requires an uninstall of v1.x, if present).
The product contains a number of use-case specific collections that are
installed as optional components. After install, the system administrator must
perform some manual steps to customize the system to the distinct implementation
details.

For more information, see the [AMT Deployment
Guide](./deployment-guide/readme.mdx).

## Using the Views

The Analytics Middle Tier contains a core collection of views and a number of
use case-specific collections. The Analytics Middle Tier views are a simple
representation the Ed-Fi Data Standard, which support a seamless bridge from one
version of the Data Standard to the next. The work to simplify and bridge
standards comes at cost, however: data analysts and programmers using these
views need to understand both their utility and their limitations, or else risk
confusion and/or misleading analyses.

For more information, see the [AMT User
Guide](./user-guide/readme.md).
