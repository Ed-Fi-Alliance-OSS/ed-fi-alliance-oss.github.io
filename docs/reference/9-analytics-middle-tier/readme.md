# Analytics Middle Tier

:::warning December 2023:

* Released: [Analytics Middle Tier
v4.1.0](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/releases/tag/4.1.0),
with support for .NET 8. October 2023
* [Analytics Middle Tier Transitioning to Ed-Fi Exchange in
    2025](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875033/Analytics+Middle+Tier+Transitioning+to+Ed-Fi+Exchange+in+2025)

:::

:::caution

The Ed-Fi Alliance no longer recommends new production dependencies
on Analytics Middle Tier; see the Ed-Fi Exchange announcement above for more
information.

:::

## Overview

The Analytics Middle Tier is a set of denormalized analytics views over the
database tables backing an
[https://edfi.atlassian.net/wiki/spaces/TT/pages/18648017](https://edfi.atlassian.net/wiki/spaces/TT/pages/18648017),
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

## Contributing

We ❤️ your code contributions! Have some useful queries to share with others in
the community? Easy: just turn them into views and share via the Analytics
Middle Tier.

For more information, see the [AMT Contributor
Guide](./contributor-guide/readme.md).

## Related Content From the Ed-Fi Blog

* February 14, 2020: [The Analytics Middle Tier Grows
    Up](https://www.ed-fi.org/blog/2020/02/the-analytics-middle-tier-grows-up/)
* January 16, 2019: [(Re)New on the Ed-Fi Exchange: Analytics Starter
    Kits](https://www.ed-fi.org/blog/2019/01/renew-ed-fi-exchange-analytics-starter-kits/)
* August 7, 2018: [From Diagrams & Definitions: Solving the Analytics Reporting
    Gap]
