# Setup Guide

Full source code for the Roster Starter Kit is available on GitHub as denoted on
the right. Below, this guide will show how to work with the source code from
this application.

## Prerequisites

* [VS Code](https://code.visualstudio.com/)
* [GIT](https://git-scm.com/download/win)
* [.NET Core SDK v3.1](https://dotnet.microsoft.com/download/dotnet/3.1)

:::warning

.NET Core 3.1 is no longer supported by Microsoft; however, it should be easy to update the sample code to work with newer versions of .NET.

:::

## Code

To get the RSK source code, clone or download the
repository [https://github.com/Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors](https://github.com/Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors).

## Local Configuration

Step 1. Open the project folder in VS Code.

<details>
<summary>How to open a folder in VS Code</summary>

Option 1: Right-click on the folder and click **Open with Code**

![Open with
Code](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-2_11-30-40.png)

Option 2: From VS Code, click on **File** → **Open Folder**...

![From VS Code -> Open
Folder](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-2_11-45-27.png)

</details>

![Open folder in VS
Code](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/Open%20folder%20in%20VS%20Code.png)

Step 2. After opening, a popup will appear.

![Install
recomendations](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/Install%20recomendations.png)

Click on **Install**. This will add the C# compiler to VS Code.

Wait for the installation to finish. If you continue while the installation is
in process, the following steps could have a different behavior than the one
shown in this guide.

![C# install
start](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/C%23%20install%20start.png)

![C# install
done](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/C%23%20install%20done.png)

Step 3. Open the integrated terminal:

![Open
terminal](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/open%20terminal.png)

Step 4. Run the ./build.ps1 command.

![Run build
ps1](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/run%20build%20ps1.png)

Or run manually with:

```powershell
dotnet build src
```

Step 5. Wait for the build to finish.

![Build
success](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/build%20success.png)

Step 6. Since the Roster Starter Kit runs in https, we need to add a test
certificate to run locally, this can be done by running:

```powershell
dotnet dev-certs https --trust
```

Then, a warning will appear to check if you trust the certificate.
Click **Yes**.

![Security
warning](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/security-warning.png)

Alternatively, you can skip this step and click on continue when the warning
appears.

| Chrome/Edge | Firefox |
| --- | --- |
| ![Chrome warning](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/chrome%20warning.png) | ![Firefox warning ](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/firefox%20warning.png) |

Step 7. Now, you can run the solution.

## Run the Solution

* Click on **Run and Debug** ![Run and
Debug](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-2-39.png)

<details>
<summary>Enrollment</summary>

* Select the "Enrollment" project

![Enrollment](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-4-13.png)

* Press the Green Arrow, the F5 Key or Click on **Run → Start Debugging**

![Start
Debugging](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/start%20debugging.png)

* Alternatively, this can be run from the terminal with

```powershell
dotnet run --project src/EdFi.Roster.Explorer
```

This will leave the server running in this terminal. To stop the server and go
back to the terminal hit **ctrl-c**.

</details>

<details>
<summary>ChangeQueries</summary>

* Select the "ChangeQueries" project

![ChangeQueries](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-17-33.png)

* Press the Green Arrow, the F5 Key or Click on **Run → Start Debugging**

![Start
Debugging](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/start%20debugging.png)

* Alternatively, this can be run from the terminal with

```powershell
dotnet run --project src/EdFi.Roster.ChangeQueries
```

This will leave the server running in this terminal. To stop the server and go
back to the terminal hit **ctrl-c**.

</details>

## Browsing

When the solution is running correctly, the following messages will appear in
the terminal:

![Application
running](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/application%20running.png)

Browse to [https://localhost:5001](https://localhost:5001), and the home page
will load.

<details>
<summary>Enrollment</summary>

![Enrollment](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-28_18-0-19.png)

</details>

<details>
<summary>ChangeQueries</summary>

![ChangeQueries](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-15_16-22-16.png)

</details>

Add the desired ODS / API URL, and a valid Key and Secret.

![Add ODS / API
URL](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-28_18-1-13.png)

This sample application performs reads and writes against the target ODS
installation, and persists synchronized data from that ODS into a local demo
database to demonstrate Change Queries. This sample application is intended for
use against sample data in a sample ODS, and is not intended for use against a
"Production" installation. The application suggests using the public demo ODS,
though you could point at another non-Production installation as well. If you
use the public demo URL, you can use the following values for the Key and
Secret:

**Key:** `RvcohKz9zHI4`

**Secret:** `E1iEFusaNf81xzCxwHfbolkC`

In Production scenarios with real-world data, be sure to protect your Key and
Secret just as you would any critical username and password.

The Roster Starter Kit is now ready to use.

## Compatibility

The steps described above and the application itself have been tested in:

* Windows 10
* Windows Server 2019
* Windows Server 2016
* Ubuntu 20

:::info Source Code Availability

Source code for the Ed-Fi Roster C# Application is available on GitHub:
[https://github.com/Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors](https://github.com/Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors)

:::
