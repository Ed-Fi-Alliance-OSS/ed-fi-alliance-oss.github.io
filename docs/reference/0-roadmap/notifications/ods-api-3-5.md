# End of Support - ODS/API v3.4 and v5.0

June 30, 2023

## What Is Happening

As of June 30, 2023, the Ed-Fi ODS/API versions 3.4 and 5.0 will have reached
the end of support.

## What Should I Do Now?

Please consider moving to a new version of the ODS/API for the next school year;
see [Ed-Fi Technology Suite Supported Versions](../supported-versions.md).

ODS/API version 3.4 and version 5.0 implemented "pre-release" editions of the
Ed-Fi Data Standard version 3.2 (v3.2.0-b). ODS/API version 5.1 is the last
release that supports Data Standard 3.2 (v3.2.0-c), and it is completely
backward-compatible with respect to the Data Standard. Starting a new school
year with ODS/API version 5.1 is a good option for those on older versions.

Alternately, you may wish to explore the changes in [Data Standard
3.3](https://edfi.atlassian.net/wiki/display/EFDS33/What%27s+New) or [Data
Standard
4.0](https://edfi.atlassian.net/wiki/display/EFDS4X/What%27s+New+-+v4.0) to see
if an even newer version of the ODS/API might be appropriate for your next
school year.

If you have a shared instance deployment with multiple years in the same
database, then you can use the [Migration Utility](./migration.md) to upgrade
your database, release by release, to ODS/API version 5.3.
