# LMS Toolkit User Guide - Load Data into the ODS

In these steps, you will move data from the extracted files into your ODS.

## Starting Point

First we need to verify that you are ready: you should have extracted data from your LMS and have a set of comma-separated value (CSV) files in a directory on the machine. That directory will look similar to this:

![Selecting CSV from data puddle](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-lms-toolkit/LMSToolkit-DataPuddle.png)

If you do not have these files extracted ready, please perform the steps [LMS Toolkit User Guide - Extract Data From the LMS](../lms-toolkit-user-guide/lms-toolkit-user-guide-extract-data-from-the-lms.md) first.

:::info
**Are you a software developer familiar with Python?**
If you are, you can likely skim (or skip) much of this material and go directly to the README files in  the GitHub repo! See [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit) for the best starting point!
:::

## Step 1: Run the LMS Toolkit Loader

The LMS Toolkit Loader loads the data into a relational database structure, a database called LMS-DS. This database may be located on the same server as your ODS database, and the tables may even be added to the ODS table itself (not recommended, but possible), but these tables are not part of the Ed-Fi ODS database.

To run the loader, navigate to the folder:

```shell
cd [INSTALL DIRECTORY]/LMS-Toolkit/src/lms-ds-loader/
```

To run the loader, you need this info at a minimum:

* The URL of the database server
* The name of the database where the data will be loaded
* Either the username and the password for the database server OR user-integrated security setup to the database (i.e., database access handled by the current computer login and network domain security)
* The path to the directory where the files created by the extractor live

You may need this info:

* If the database server is not listening on the default port, you will need the port the database server is listening on

A full list of options can be found here: [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-ds-loader](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-ds-loader)

To run the loader, execute this command if using password-based database security (you need to fill in the options in brackets)

```shell
poetry run python edfi_lms_ds_loader `
  --server [URL of the database server] `
  --port [needed if the port the database server is listening on is not the default] `
  --dbname [name of the database where the data will be loaded] `
  --username [username for the database server] `
  --password [password for the database server] `
  --csvpath [path to the directory where the files created by the extractor]
  --engine [mssql (default) or postgresql]
```

Execute this command if using integrated database security

```shell
poetry run python edfi_lms_ds_loader `
  --server [URL of the database server] `
  --port [needed if the port the database server is listening on is not the default] `
  --dbname [name of the database where the data will be loaded] `
  --useintegratedsecurity `
  --csvpath [path to the directory where the files created by the extractor]
  --engine [mssql (default) or postgresql]
```

:::tip
As mentioned in the [source code readme](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-ds-loader), you can also use a `.env`  file to store these configuration settings.
:::

:::info
**Why not load the data directly into the ODS?**
The answer is that the data from your LMS system and from your ODS are likely to "disagree" on certain basic facts or at the least be inconsistent. For example, it is very common that lists of students, staffs and sections do not match from your ODS (and your SIS) to your LMS.
That mismatch is not welcome, but it reflects the messy reality of managing two very different systems - a system focused on reporting and accountability  (the SIS), and a much more flexible system designed for classroom usage (the LMS).
Since the Ed-Fi ODS is a "cleaned" store of data, if we tried to load data, directly from the LMS Extractors, some of that data would fail to load, and might therefore be "lost" in the process. As a result of this problem, the LMS Toolkit contains an intermediate step - a "Harmonizer" that attempts to match LMS and SIS data more carefully.
To allow the Harmonizer to be fast and more easily customized, we stage the data into database tables before it is loaded into the ODS.
:::

You should see data flowing into the relational database tables. Congratulations on achieving the next step in the pipeline!

At this point, you are able to use standard SQL tooling to query your extracted LMS data, but your data is not yet in the Ed-Fi ODS. See the sidebar for more information on why the data is not loaded into the ODS directly.

### If there are errors

Read the error messages and copy them down in case you need to share them with others. The  most likely causes of errors are:

* The database configuration information is incorrectly entered. Double check to make sure that the data is correct.
* The loader cannot locate the extractor files: double-check that those are in the right location.
* There is some network configuration that is blocking access from the machine you are on to the database server. To resolve this item, you will need to consult with a network person at your organization.

## Step 2: Run the LMS Toolkit Harmonizer

### About the Harmonizer

The Harmonizer is a utility that "loads and links" your LMS data with SIS data in an Ed-Fi ODS.

The primary duty of the Harmonizer is to match Student and Sections found in the data extracted from upstream Learning Management Systems (LMS) with the same entities in an Ed-Fi ODS database, which are sourced from a Student Information System (SIS). These systems often do not have perfect alignment.

The harmonizer ships with a default implementation that attempts to match these entities. However,  in some cases, the harmonization process may need customization to fit your implementation. The assumptions necessary to use the default version are documented  on this page: [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-harmonizer](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-harmonizer) - see the bottom sections on "Student Mapping" and "Section Mapping." See the bottom section [CustomizationoftheHarmonizer](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22500433/LMS+Toolkit+User+Guide+-+Load+Data+into+the+ODS#LMSToolkitUserGuide-LoadDataintotheODS-CustomizationoftheHarmonizer) for info on customization.

### Running the Harmonizer

To run the Harmonizer, navigate to the folder:

```shell
cd [INSTALL DIRECTORY]/LMS-Toolkit/src/lms-harmonizer/
```

To run the Harmonizer, you need this info at a minimum:

* The URL of the database server
* The name of the database where the KMS data is currently loaded
* Either the username and the password for the database server OR user-integrated security setup to the database (i.e., database access handled by the current computer login and network domain security)

You may need this info:

* If the database server is not listening on the default port, you will need the port the database server is listening on

A full list of options can be found here: [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-harmonizer](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-harmonizer)

To run the Harmonizer, execute this command if using password-based database security (you need to fill in the options in brackets )

```shell
poetry run python edfi_lms_harmonizer `
  --server [URL of the database server] `
  --port [needed if the port the database server is listening on is not the default] `
  --dbname [name of the database where the data is currently loaded] `
  --username [username for the database server] `
  --password [password for the database server]
  --engine [mssql (default) or postgresql]
```

Execute this command if using integrated database security

```shell
poetry run python edfi_lms_ds_loader `
  --server [URL of the database server] `
  --port [needed if the port the database server is listening on is not the default] `
  --dbname [name of the database where the data is currently loaded] `
  --useintegratedsecurity
  --engine [mssql (default) or postgresql]
```

You will see data flowing into your ODS. Congratulations!

#### If there are errors

Read the error messages and copy them down in case you need to share them with others. The  most likely causes of errors are:

* The database configuration information is incorrectly entered. Double check to make sure that the data is correct.
* The Harmonizer cannot locate the database where the data is loaded: double-check the name
* There is some network configuration that is blocking access from the machine you are on to the database server. To resolve this item, you will need to consult with a network person at your organization.

## Step 3: Set up Scheduling for these Utilities (optional, but recommended)

It is clearly not a good use of time to run the extraction and load process manually each day. We  recommend that once these processes are stabilized and tested, they be scheduled.

Generally, agencies schedule such processes nightly, and teachers and staff then expect updates to have been made at the beginning of each school day. One reason to handle it like this is that the extraction and load process can take long time, so running it during the day will put stress on production systems when they are being used by other processes, and will mean that some records may be updated for some users while updates for other users are delayed.  This can cause confusion; nightly updates avoid these issues.

The exact processes and tools to use for scheduling are beyond the scope of this User Guide, but it is very likely that your IT department has tools in place for such scheduling.

## Customizing the Harmonizer

As mentioned above, in some cases the harmonizer may need customization. This can be done via SQL scripting: the Harmonizer "linking and matching" processes" are performed via SQL stored procedures:

* lms.harmonize\_lmsuser\_canvas
* lms.harmonize\_lmsuser\_schoology
* lms.harmonize\_lmsuser\_google\_classroom
* lms.harmonize\_lmssection\_canvas
* lms.harmonize\_lmssection\_google\_classroom
* lms.harmonize\_lmssection\_schoology

To customize the Harmonizer, modify the appropriate stored procedures from this list to use the logic appropriate for your implementation of the LMS.

For best results, you may want to fork the [LMS Toolkit repository](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit) in GitHub and add your own custom scripts in the `src/lms-harmonizer/edfi_lms_harmonizer/scripts`  directory. We recommend using a large serial number prefix (e.g. `5000_<script name>.sql`) to guarantee that any core modifications, with lower prefix numbers, will not override your versions. You also must update the `MIGRATION_SCRIPTS`  constant in `migrator.py` to include your scripts in the deployment process.
