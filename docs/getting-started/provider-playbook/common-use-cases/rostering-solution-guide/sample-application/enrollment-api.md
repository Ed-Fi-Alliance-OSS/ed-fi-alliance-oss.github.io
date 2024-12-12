# Enrollment API

Use this guide to download and run the Ed-Fi Roster Application using test data
available from the public deployment of the Ed-Fi ODS / API Suite 3 v6.2.0.

Be sure to go through the [Ed-Fi Roster Sample Application Setup
Guide](./setup-guide.md) before going through this page.

## Run the Application

Once you have extracted and compiled the solution.

* Click on **Run and Debug**:

![Run and
Debug](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-2-39.png)

* Select the "Enrollment" project:

![Select
Enrollment](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-4-13.png)

* Press the Green Arrow, the F5 Key or Click on **Run → Start Debugging**:

![Start
Debugging](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/start%20debugging.png)

* Alternatively, this can be run from the terminal with

```powershell
dotnet run --project src/EdFi.Roster.Explorer
```

This will leave the server running in this terminal. To stop the server and go
back to the terminal hit **C****trl-C**.

## Browsing

When the solution is running correctly, the following messages will appear in
the terminal:

![Terminal
Output](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/application%20running.png)

Browse to [https://localhost:5001](https://localhost:5001/), and the home page
will load.

### Explore the Sample Application

Add the desired ODS / API URL, and a valid Key and Secret.

![Add ODS / API URL, Key, and
Secret](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-28_18-1-13.png)

This sample application performs reads and writes against the target ODS
installation, and persists synchronized data from that ODS into a local demo
database to demonstrate API calls and possibilities. This sample application is
intended for use against sample data in a sample ODS, and is not intended for
use against a "Production" installation. The application suggests using the
public demo ODS, though you could point at another non-Production installation
as well. If you use the public demo URL, you can use the following values for
the Key and Secret:

**Key:** `RvcohKz9zHI4`

**Secret:** `E1iEFusaNf81xzCxwHfbolkC`

In Production scenarios with real-world data, be sure to protect your Key and
Secret just as you would any critical username and password.

Now, the Ed-Fi Roster Sample Application is ready to use.

An overview of the available information pages in the Sample Application:

* **Ed-Fi API Settings.** Page that enables the configuration of the url, key
    and secret of the API that this example application will interact with.
* **Full Roster.** Pull all the roster information available via the Ed-Fi
    Enrollment Composite and shows the calls that were used.
* **LEAs.** Shows local education agencies that are currently saved in the app
    and has button to retrieve a new set of local education agencies from the
    configured Ed-Fi API.
* **Schools.** Shows schools that are currently saved in the app and has button
    to retrieve a new set of local education agencies from the configured Ed-Fi
    API.
* **Staff.** Shows schools that are currently saved in the app and has button to
    retrieve a new set of local education agencies from the configured Ed-Fi
    API.
* **Students.** Shows students that are currently saved in the app and has
    button to retrieve a new set of local education agencies from the configured
    Ed-Fi API.
* **Sections.** Shows sections that are currently saved in the app and has
    button to retrieve a new set of local education agencies from the configured
    Ed-Fi API.
* **Roster.** This has links to three different tree views of the data retrieved
    from the Ed-Fi Enrollment Composite.
* **API Logs.** This shows a log of API transactions.

## Compatibility

The steps described above and the application itself have been tested in:

* Windows 10
* Windows Server 2019
* Windows Server 2016
* Ubuntu 20

:::info **Reminder**

Do not use this sample application "as-is" with real student data. You will need
to implement best-practice security measures before using the application in a
production setting.

:::

## Next Steps

### Make it your own

Now that you have explored some of the capabilities of using the Ed-Fi API to
pull roster information, use this as a starting point to integrate roster
capabilities in your education technology platform.
