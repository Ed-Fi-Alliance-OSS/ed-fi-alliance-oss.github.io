# LMS Toolkit User Guide - Extract Data From the LMS

The LMS Toolkit provides utilities called "extractors" that fetch data from your Learning Management System (LMS).

These extractors may be used as part of a larger "pipeline" that moved data from your LMS to your ODS. For how to information on that second step, see [LMS Toolkit User Guide - Load Data into the ODS](./lms-toolkit-user-guide-load-data-into-the-ods.md)

## Step 1: Create an Extractor Configuration File

The first step in the pipeline is the extractor. Extractors connect to the API (or other applicable interface) of the LMS and extract the data.

To run an extractor, you need to provide the extractor the information needed to connect to your LMS. The simplest way to do this is to put this data into a file named ".env" that sits in the same directory as the extractor. The LMS Toolkit gives you a sample file named ".env.example" to work with. You can simply rename this file to get started. You can find those files at this location (use the link that corresponds to your LMS platform; \[INSTALL DIRECTORY\] is where the LMS Toolkit is installed):

:::note

Canvas

```shell
[INSTALL DIRECTORY]/LMS-Toolkit/src/canvas-extractor/.env.example
```

Google Classroom

```shell
[INSTALL DIRECTORY]/LMS-Toolkit/src/google-classroom-extractor/.env.example
```

Schoology

```shell
[INSTALL DIRECTORY]/LMS-Toolkit/src/schoology-extractor/.env.example
```

:::

Make a copy of this file and name it .env. Leave it in the same directory as the ".env.example" file.

The file for Canvas LMS would look like this:

```shell
CANVAS_BASE_URL=[CANVAS_BASE_URL]
CANVAS_ACCESS_TOKEN=[CANVAS_ACCESS_TOKEN]
START_DATE=[CLASS_START_DATE]
END_DATE=[CLASS_END_DATE]
OUTPUT_DIRECTORY=data
SYNC_DATABASE_DIRECTORY=data
FEATURE=[activities, attendance, assignments, grades]
# options: DEBUG, INFO, WARNING, ERROR, CRITICAL
LOG_LEVEL=INFO
```

Each **.env** file has 2 kinds of information in it:

1. Configuration info that is **SPECIFIC** to the LMS you are trying to connect to.
2. Configuration info that is common to **ALL** LMS toolkit extractors

In the sections below  we cover how to complete both of these sets of configuration options.

## Step 2: Add LMS-specific Configuration To Your Config File

In the config file, you now need to fill out the elements specific to your LMS.

Consult the section below to find the configuration options specific to your LMS

:::note

Canvas

Canvas requires these four connection configuration parameters:

| Parameter name | What to put there |
| --- | --- |
| `CANVAS_BASE_URL` | This points to the default URL for the entire canvas deployment, which might be something like "canvas.myschooldistrict.edu" or "myschooldistrict.edy/canvas/2021" etc. |
| `CANVAS_ACCESS_TOKEN` | This is the Canvas API access token that you retrieved from the Canvas administration panel. |
| ``` START_DATE ``` | Start Date and End Date are the dates between which you want to pull data assignment, activity and other data, We recommend by default that these dates span a semester or similar school calendar timespan. |
| ``` END_DATE ``` | |

Google Classroom

Google Classroom requires this one connection configuration parameters:

| Parameter name | What to put there |
| --- | --- |
| ``` CLASSROOM_ACCOUNT ``` | This is the email address of the Google Classroom admin account. |

Schoology

Schoology requires these two connection configuration parameters:

| Parameter name | What to put there |
| --- | --- |
| ``` SCHOOLOGY_KEY ``` | This is the Schoology API key that you retrieved from the Schoology administration panel. |
| ``` SCHOOLOGY_SECRET ``` | This is the Schoology API secret value that you retrieved from the Schoology administration panel. |

:::

Now you should have a .env config file that is partially filled out.

## Step 3: Test the Connection to the LMS

At this point, you should have a .env file has the info it needs to connect to the LMS.

Next remove all the lines from the .env file that you did not edit above (lines that are not-LMS specific). After doing that, you should have a file that looks like this (click on the link corresponding to your LMS):

:::note

Canvas

```sh
CANVAS_BASE_URL=https://myschooldistrict/canvas
CANVAS_ACCESS_TOKEN=a1866c3d1e9a47c893d84d97d6584a0f
START_DATE=08/10/2021
END_DATE=12/17/2021
```

Google Classroom

```sh
CLASSROOM_ACCOUNT=google-admin@mydistrict.edu
```

Schoology

```sh
SCHOOLOGY_KEY=RvcohKz9zHI4
SCHOOLOGY_SECRET=RvcohKz9zHI4
 ```

:::

Next, open a command line tool (Windows command, PowerShell, etc.) and navigate to the root director for the extractor. Install the tool's dependencies before you execute the tool for the first time.

:::note

Canvas

```sh
cd [INSTALL DIRECTORY]/LMS-Toolkit/src/canvas-extractor/
# One-time execution:
poetry install
```

Google Classroom

```sh
cd [INSTALL DIRECTORY]/LMS-Toolkit/src/google-classroom-extractor/
# One-time execution:
poetry install
```

Schoology

```sh
cd [INSTALL DIRECTORY]/LMS-Toolkit/src/schoology-extractor/
# One-time execution:
poetry install
```

:::

Finally, run the command that corresponds to your extractor

:::note
Canvas

```sh
poetry run python edfi_canvas_extractor
```

Google Classroom

```sh
poetry run python edfi_google_classroom_extractor
```

Schoology

```sh
poetry run python edfi_schoology_extractor
```

:::

You should see data flowing and lines that look like the following appear.

```sh
2021-09-03 17:45:41,185 - INFO - edfi_canvas_extractor.extract_facade - Starting Ed-Fi LMS Canvas Extractor
2021-09-03 17:45:41,213 - INFO - edfi_canvas_extractor.extract_facade - Extracting Courses from Canvas API
2021-09-03 17:45:41,213 - INFO - edfi_canvas_extractor.api.courses - Pulling course data
2021-09-03 17:45:43,925 - INFO - edfi_canvas_extractor.extract_facade - Extracting Sections from Canvas API
2021-09-03 17:45:43,925 - INFO - edfi_canvas_extractor.api.sections - Pulling section data
2021-09-03 17:46:08,866 - INFO - edfi_canvas_extractor.extract_facade - Writing LMS UDM Sections to CSV file
2021-09-03 17:46:08,870 - INFO - edfi_lms_extractor_lib.csv_generation.write - Generated file => c:\source\ed-fi\lms-data\canvas\sections\2021-09-03-17-46-08.csv
```

Congratulations: you are on your way to using LMS data!

It may take a bit of time to complete this run, as you are now extracting basic data from your LMS on users and sections. if your school district is large, that might be tens of thousands of records, and will take some time to complete.

In the next steps, we expand the config file to tell the extractor what LMS data we need, and decide if we need to do other optional configuration - keep reading to learn more.

### If there are errors

Read the error messages and copy them down in case you need to share them with others. The  most likely causes of errors are:

* The configuration information is incorrectly entered. Double check the info in the .env file to be sure it was copied correctly
* There is some network configuration that is blocking access from the machine you are on to the LMS. To resolve this item, you will need to consult with a network person at your organization.

## Step 4: Add General Configuration to your Config File

Now that the extractor is working, you need to tell it what data you need, and decide if you need to do other optional configuration.

The most important configuration is to tell the extractor what data you need. Data is organized into domains or "features". To set this up, add a line to your .env file that looks like this:

```sh
FEATURE=assignments
```

This line tells the extractor that you want all data related to assignments.

These are the features available. Please note that some are under development/experimental (see column 3) and that the Toolkit only extracts **some** of the LMS data in this area.

| Feature | Experimental? | Description |
| --- | --- | --- |
| assignments | No  | Extracts data related to student assignments and student assignment submissions. |
| activities | No  | Extracts data related to student activities - logins/logouts (if available), discussion forum posts, etc. |
| grades | **YES** | If the LMS has a gradebook integrated, extracts grades |
| attendance | **YES** | If the LMS has an attendance system integrated, extracts attendance data. Note: this is not a value calculated by he LMS Toolkit and does not attempt to derive if the student was in attendance or not! This is literally only what is in the LMS attendance system |

To request multiple features, you can separate them with commas

```sh
FEATURE=[assignments, activities]
```

You may have questions about what exact data is included. That information is LMS-specific. If you need that info, you can consult: [LMS Unifying Data Model#AdditionalMappingNotes](../lms-unifying-data-model/readme.md)

At this point, we recommend that you these two lines to your .env file - this tells the extractor to gather assignments data.

```sh
FEATURE=[assignments]
LOG_LEVEL=warn
```

This second line just tells the extractor to reduce the amount of text it spews out, if effect saying: "just tell me when things go wrong."

You should now have a file that looks like this (click on the link corresponding to your LMS).

:::note

Canvas

```sh
CANVAS_BASE_URL=https://myschooldistrict/canvas
CANVAS_ACCESS_TOKEN=a1866c3d1e9a47c893d84d97d6584a0f
START_DATE=08/10/2021
END_DATE=12/17/2021
FEATURE=[assignments]
LOG_LEVEL=warn
```

Google Classroom

```sh
CLASSROOM_ACCOUNT=google-admin@mydistrict.edu
FEATURE=[assignments]
LOG_LEVEL=warn
```

Schoology

```sh
SCHOOLOGY_KEY=RvcohKz9zHI4
SCHOOLOGY_SECRET=RvcohKz9zHI4
FEATURE=[assignments]
LOG_LEVEL=warn
```

:::
Now run the extractor using the same command you used above. You should see data flowing again!

It may take some time to complete this run, as you are now extracting data on ALL assignments and ALL  assignment submissions. If your school district is quite large, this could take a while.

## Step 5: Verify Your Data

The fist step to verifying that the extractor got the data is to look for errors during the extractor run. Look and see if any lines that start with "Warning" or "Error" appear. There.

A further inspection is to look in the filesystem for the files that the extractor created. By default, the data is extracted to a directory named "data" in the same directory where the extractor lives. If you open up that directory, you should see something that looks like this:

![Data verification in directory screenshot](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-lms-toolkit/image2021-9-3_17-54-21.png)

The presence of a directory with a name denotes that the extractor is attempting to gather that class of data. For example, in the screenshot above you can see many "assignment=\*" folders under a "section=\*" folder: this is the extractor gathering data on individual assignments for a section.

If extracting data from the LMS at a large school district, your filesystem should contain tens of thousands of such files.

## Step 6: Set any Additional Configuration Options (optional)

Below are listed all the possible configuration options and which extractor each applies to. As you prepare the extractor for regular usage, you may choose to tune some of these options.

When running with the command line tool, you can also provide the `--help`  option to get the full set of options for that extractor.

| Applies To | Argument | Required? | Purpose |
| --- | --- | --- | --- |
| All | Feature | No  | Define which _optional_ features are to be retrieved from the upstream system. Default: none. Available features:_**`Activities`** : encompassing _section activities_ and_system activities.   **`Attendance`**: attendance data. Only applies to Schoology.`**Assignments**`: encompassing _assignments_ and _submissions.   `**Grades**`: section-level grades (assignment grades are included on the _submissions_ resource). Experimental and only implemented for Canvas at this time. Note: Sections, Section Associations, and Users are _always_ pulled from the Source System. |
| Log Level | No  | Valid options are: DEBUG, INFO (default), WARNING, ERROR, CRITICAL | |
| Output Directory | No  | The output directory for the generated CSV files. Defaults to: `./data`. | |
| Sync database directory | No  | Directory for storing a SQLite database that is used in support of synchronizing the data between successive executions of the tool. Defaults to: `./data`. | |
| Google Classroom | Classroom account | **Yes** | The email address of the Google Classroom admin account. |
| Usage start date | No  | Start date for usage data pull in YYYY-MM-DD format. | |
| Usage end date | No  | End date for usage data pull in YYYY-MM-DD format. | |
| Schoology | Client key | **Yes** | Schoology client key. |
| Client secret | **Yes** | Schoology client secret. | |
| Page size | No  | Page size for the paginated requests. Defaults to: 200. Max value: 200. | |
| Input directory | No  | Input directory for usage CSV files. | |
| Canvas | Base URL | **Yes** | The Canvas API base url. |
| Access token | **Yes** | The Canvas API access token | |
| Start Date | **Yes** | Start date for the range of classes and events to include, in YYYY-MM-DD format. | |
| End Date | **Yes** | End date for the range of classes and events to include, in YYYY-MM-DD format. | |

:::info
> **Are you a software developer familiar with Python?**
> If you are, you can likely skim (or skip) much of this material and go directly to the README files in  the GitHub repo! See [https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit) for the best starting point!
:::
