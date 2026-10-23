# Student360

![San Marcos CISD](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/smisd.png)

**Student360**

The Student360 application is designed to provide an overview of timely information about a student in an easy to read and logical layout.  Student360 saves valuable administrator time by providing a single interface into the most requested and most impactful information needed on a regular basis.  Prior to the introduction of Student360, much of the information was only available by navigating through multiple screens in several applications. the application contains modules for attendance notifications, attendance letters (truancy), attendance google maps that display students by the severity of the absences, an ADA chart and a powerful report viewer to display ad-hoc SSRS custom reports based on the ODS.

Student360 comprises the following screens:

1. Login: Authenticates against Google using the employee’s district email address and password.
2. Home:  Filter a list of active students by campus, grade, cohort, absences, and a number of other criteria.  Search by Student ID, name, or partial name.
3. Student Detail:  Displays the student’s current class schedule, 9-week, semester, and final grades, and year-to-date absences per class.  Special programs in which the student participates are displayed as tags along with the student’s ID photo.  Also displayed are the entry date, GPA, accrued make-up hours, and a link to an attendance summary graph which shows absence totals by period and absence code.  A link to an attendance pop-up shows absence detail by date and period.

4. Attendance Actions:  Lists students who have accrued attendance makeup hours and the total of their hours, as well as students who have had attendance interventions assigned.  Click on a student name to display each date, the intervention or makeup hours activity assigned, the number of hours (if applicable), and the staff member who input the record.  Hours and interventions may be added/edited directly to the student’s record from this screen, or via a spreadsheet upload. A spreadsheet template is available to download from the screen.

1. Attendance Letters:  Does calculations each night to find students who are eligible for a 3-, 5-, or 10-day attendance warning letter according to TEA guidance.  The resulting letters may be saved in PDF format for printing and mailing, or “archived” (recorded, but removed from view) if it is decided to not send the letter to a student. In either case, a record of the action is made a part of the Attendance Actions associated with each student.  Although all class attendance is recalculated nightly, the letters may be generated for any given date in the past. A dashboard view displays the total number of each type of eligible letter, the age of the oldest unsent letter, and the average age of all the letters of that type, based on the search criteria specified.
2. Charts:  An Enrollment vs Absence ADA sample chart exists here. Other charts can be added here.

1. Reports:  Ad-hoc Reports can be easily created using SQL Server Reporting Services and attach to the web application using the licensed Bold Reports\* viewer that has been incorporated into the app.

1. Student with excessive absences Map. This feature allows users view student locations with excessive absences and check a detailed overview of the absences All within the familiar Google Maps component embedded in the application.

**Technical Requirements:**

Student360 encompasses of 1 web application and 2 console apps that can a be scheduled to run separately o daily basis for attendance letters and notifications:

1. Web application for the UI -built with .NET  Core, Angular, HTML5, Bootstrap, C# and SQL Server and third party components such as Google OAuth and Maps & Bolds Report Viewer for SSRS Reporting.
2. Attendance Notification Notification. C# Console application using .NET Core.
3. Attendance Letter Routine . C# Console  application using .NET Core.

The 3 modules connect to SQL Server with the ODS 3.2.

_About the Software Development tools and platform_:

The application was built for ODS Ed-Fi 3.2

The application uses Google OAuth 2.0 and Google Maps. At the time of this posting this was still free to School Districts (LEA’s)

The application was developed using Visual Studio 2019 Community Edition but Visual Code can be used as well . C# as the middle tier and Angular, NPM, HTML and bootstrap within ASP.NET core 2+ . All these components are open source and free. The application also uses a low cost report viewer for SQL Reporting Services (SSRS) for custom reports than can be tested under a free trial version and purchased directly from Bold Reports ([BI Report Management System & Reporting Tools | Bold Reports](https://www.boldreports.com/)) . In lieu of Bold-Reports a free open source Report Viewer equivalent can be used (possible reduced performance).

It uses SQL Server Standard Edition 2016+ for the backend.

_Install/Setup_

This Application can be installed and supported with the following minimum configuration:

1. Web server (Windows  server or Linux) on-premises or in Azure/AWS
2. SQL Server 2016+ and SSMS 16+ with ODS 3.1,3.2
3. It can be setup to run under IIS unmanaged as it was developed with .NET core and open source components
4. An inexpensive license of Bold report Viewer (2020 it was $600) in order to display LEA custom SSRS reports
5. A subscription to Google Administration Console for the maps and authorization/authentication. For Public LEA’s this is free too.

_Additional ODS -Student 360 interop SQL Server  tables: we added a folder SMCISD.Student360.SQLScriptsExtra , so  tables can  recreated for the application to handle security, display ADA Chart (data populates from SSIS) , attendance codes and other important configuration values for the application to run correctly._

_Please contact the San Marcos CISD Technology Department, for more specific information and questions._

* **Documentation:** [Student360 Description](https://www.smcisd.net/cms/lib/TX02215324/Centricity/Domain/22/Student360%20Description.pdf)
* **Code:** [https://github.com/Ed-Fi-Exchange-OSS/Student360](https://github.com/Ed-Fi-Exchange-OSS/Student360)

**Details**

* **By:** [San Marcos Consolidated ISD](https://www.smcisd.net/)
* **License Terms:** Apache 2.0
* **Released:** April 2021

## **At a Glance**

**Generation:** Tech Suite 3
**For:** Ed-Fi ODS / API 3.1, 3.2
