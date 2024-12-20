# Configure with SQL Server Express

These instructions have come from the field for notes to configure Data Import
using SQL Server Express:

Documentation for Data Import install process with SQL Server Express on a
Windows Server 2012 VM.

* Install SQL Express - Update Instance name From SQLEXPRESS to MSSQLSERVER
    during setup, add in appropriate AD users for administration
* After Install - Make sure to activate SQL Browser Service as it does not get
    enabled by default with the SQL Express Install
* Update or install .Net Runtime of version 4.7.2 or newer
* After Runtime installation make sure you follow DI Install steps to activate
    .net Runtime for IIS
* Install DI through preferred setup, verify that SQL Express instance
    connection is verified during installation
* After Install, attempt login, if you see a 500 error then you have missed a
    prior step, revisit DI install documentation
* If you arrive at a .Net error page citing a SQL create or modify error,
    review your AppPool and Website settings in IIS and add in an AD user or SQL
    user that has full DB Owner permissions on the SQL Express instance. If the
    AppPool and the Website user permissions are set correctly you should arrive
    at the Data Import login page and be able to create a DI user account.
* Verify that the DI database has been created in the SQL Express install, no
    tables will exist till you attempt the first login to the DI app.
* You can use a service account for the AppPool and Application login
    identities, but it is preferable to use pass-through security and that
    requires additional guidance that is requested from the Alliance.
