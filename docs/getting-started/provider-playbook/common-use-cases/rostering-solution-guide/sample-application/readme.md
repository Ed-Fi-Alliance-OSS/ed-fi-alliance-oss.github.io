# Ed-Fi Roster Sample Application

The Rostering Solution Guide Sample application shows how to access roster
information using two strategies: enrollment composites and change queries.
This documentation contains instructions on how to download and install the
application, plus several examples of how to use the application to obtain
roster information from Ed-Fi APIs.

## Solution Overview

This section contains a setup guide that provides a general understanding of the
Ed-Fi Roster sample application.

At the end of this setup guide, you will have a C# sample application available
to execute and view API transactions, view sample roster data in different
formats, and see some UI components that are expected for basic usability.

### Sample Application Notes

The sample application was developed using C# in Visual Studio 2019 Community.
The Web project uses .NET Core 3.1, but the SDK was generated in .NET Framework
4.6.1 following the instructions.

The application does not implement security measures necessary to work with real
student data. For example:

* No logins or other security access controls have been implemented.
* The is no masking of the key and secret or bearer tokens.

Additionally, no Inversion of Control, Dependency Injection, or
Object-Relational Mapping techniques were used in the sample application, in
order to reduce complexity and reduce the number of architectural artifacts that
would need to be removed or replaced. A production implementation would, of
course, need to implement security measures and best-practices development
techniques.

## Contents

* [Ed-Fi Roster Sample Application Setup
    Guide](./setup-guide.md)
* [Ed-Fi Roster Sample Application - Enrollment
    API](./enrollment-api.md)
* [Ed-Fi Roster Sample Application - Change
    Queries](./change-queries.md)
