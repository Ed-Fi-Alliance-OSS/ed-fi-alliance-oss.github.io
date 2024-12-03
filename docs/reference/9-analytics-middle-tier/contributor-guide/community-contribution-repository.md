# Community Contribution Repository

## Overview

The Analytics Middle Tier Community Contribution Repository is a place for
community members to share their views into the data for other organizations to
leverage.  Contributing your views helps other organizations re-use your work
and promotes editing instead of having to create from nothing.  If contributions
to the community repository become more widely used then we will consider
curating the change within the main Analytics Middle Tier branches.

The Contributors repository has a simplified contribution process and minimal
standards and guidelines.  This is to encourage everyone to share their work for
others to use.  

## Contribution Process

1. Fork the [Analytics Middle Tier Contribution
    repository](https://github.com/Ed-Fi-Exchange-OSS/Analytics-Middle-Tier-Contrib) named
    after your organization and use case
2. Clone the forked repository with git.
3. Commit your contribution to your forked repository
4. Create a pull request to merge your fork back on to the "main" branch in
    GitHub project.
5. Your pull request will be reviewed by a repository manager and will be merged
    upon approval

## What to Contribute

There are just two pieces of information we ask in your contribution.  The
SQL scripts to create the view that you are using and a readme file describing
the data you are expecting.  This information will greatly help the
people wanted who want to use your views in their environment.

The SQL Scripts should be targeting SQL Server or Postgres or both.  The scripts
should not be destructive in nature although it is acceptable to drop the prior
version of the view and create the latest version.  Also the scripts should be
safe to run multiple times.

The readme file should contain:

* A brief description of the use case.
* List the supported ODS/AMT versions.
* Description of data assumptions.
* (optional) Your contact information if community members have questions. It is
    understood that you are under no obligation to provide support; however,
    providing contact information helps in creating a community of practice.

## How to Deploy Community Contributions

The deployment process for community contributions is a simple as running the
SQL create scripts for the use cases you are interested in.  You do not need to
load the entire community contribution library.  Prior to loading the use
case(s) onto your reporting ODS, you should review the SQL scripts and readme
file.  Make sure that the use case accomplishes what you are looking for and you
made any necessary changes to better match your environment.

* Download the [community contribution
    repository](https://github.com/Ed-Fi-Exchange-OSS/Analytics-Middle-Tier-Contrib)
* Each use case is self contained within a folder.  Navigate to the use case(s)
    that you would like to load
* Inside the folder, open the folder named after the database platform you are
    using (Postgres or SQL Server)
* Open the \`.sql\` files found within that folder in SQL Server management
    studio or similar database tool
* Connect to the reporting ODS database you would like deploy the use case on
* Execute the create scripts

## How is this different than contributing to AMT?

The Analytics Middle Tier is an Ed-FI sponsored tool that comes with a few
tested considerations:

* AMT is tested to work with SQL Server and Postgres
* AMT is data neutral for wider adoption
* AMT is documented with examples and descriptions of each collection
* AMT follows the core domains found in the ODS

Contributing to that repository requires stronger standards and guideline
reviews to ensure that the contribution meets AMT's considerations.
The contributor's repository does not require AMT's more stringent
considerations so it can be much easier to share work.  If there is
a contributor's project that meets (or can meet) the above criteria then Ed-Fi
can work with the contributor to also include the contribution natively in AMT.
