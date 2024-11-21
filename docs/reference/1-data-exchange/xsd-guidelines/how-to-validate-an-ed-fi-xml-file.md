# How To: Validate an Ed-Fi XML File

## Introduction

### Audience

This document is for technical professionals who work with educational data, and
in particular, the creation of XML data files that conform to the Ed-Fi Data
Standard. These XML data files are often exported from source data systems such
as student information systems and assessment systems into Ed-Fi Standard
Interchange Schema.

### Prerequisites

To gain the most benefit from this information, the reader should already be
familiar with the following knowledge areas:

* The Ed-Fi solution, see [www.ed-fi.org](http://www.ed-fi.org/)

* Extensible Markup Language (XML),
    see [www.w3.org/XML](http://www.w3.org/XML)

* XML Schema (XSD),
    see [en.wikipedia.org/wiki/XML\_Schema\_(W3C)](http://en.wikipedia.org/wiki/XML_Schema_(W3C))

## Overview

Ed-Fi adopters may need to run validation checks against Ed-Fi data exchange XML
files that have been created according to the Ed-Fi Data Standard and Ed-Fi
Standard Interchange Schemas.

The following documentation describes how to run validation using Notepad++.
This requires local copies of the Ed-Fi XML Core and Interchange Schema which
can be downloaded from the [Ed-Fi Alliance GitHub
Ed-Fi-Standard](https://github.com/Ed-Fi-Alliance/Ed-Fi-Standard) repository.

For more information about the Ed-Fi data model and Ed-Fi Standard Interchange
Schemas, see the Ed-Fi [Unifying Data
Model](https://edfi.atlassian.net/wiki/display/EFDS20/Unifying+Data+Model+v2.0) and
Ed-Fi [Interchange Schema
Documentation](https://edfi.atlassian.net/wiki/display/EFDS20/Interchange+Schema+Documentation) available
online at [http://www.ed-fi.org/tech-docs](http://www.ed-fi.org/tech-docs).

## Validate XML Using Notepad++

This section provides a step-by-step guide to validating Ed-Fi XML using
Notepad++

### Step 1: Install the Notepad++ XML Tools Plugin

Install Notepad++ using instructions available
from : [https://notepad-plus-plus.org/](https://notepad-plus-plus.org/) The
version you install must have the Plugins Admin feature (the most recent version
has this feature).

In Notepad++ go to the Plugins menu and select Plugins Admin. Find XML Tools in
the list, check the box, and click the Install button.

<!-- ![Notepad++ Plugins Admin](../img/01%20Notepad++%20Plugins%20Admin.PNG) -->

### Step 2: Download XML Schema Files

In the Ed-Fi Standard GitHub repo
([https://github.com/Ed-Fi-Alliance/Ed-Fi-Standard](https://github.com/Ed-Fi-Alliance/Ed-Fi-Standard))
locate the version of the standard you want to validate against. Within that
folder, locate the Interchange XSD and Ed-Fi-Core.xsd field.

* Download **Ed-Fi-Core.xsd**
* Download the interchange XSD files you will need. For example, if you are
    validating a student enrollment XML, you will
    need **Interchange-StudentEnrollment.xsd**

Put these files into your working folder.

### Step 3: Update the XML File Schema Location Path

Open the Ed-Fi XML file to validate in Notepad++. Before validating, you will
need to update the schemaLocation path to match where you stored the Ed-Fi
Interchange schema locally.

Replace the '../../../../XSLT2/References/Ed-Fi-Standard/Schemas/' portion of
the schemaLocation with your local file path, leaving both the
'[http://ed-fi.org/0320](http://ed-fi.org/0320) ' and interchange file name
unchanged.

For example, if you saved the Ed-Fi schemas to your C drive and were validating
an AssessmentMetadata XML file, your schemaLocation would appear as follows:

```
xsi:schemaLocation="http://ed-fi.org/0320 C:/Ed-Fi-Standard/v3.2/Schemas/Bulk/Interchange-AssessmentMetadata.xsd"
```

### Step 4: Validate the XML File

Go to the Plugins menu → XML Tools → Validate Now. If validation is successful,
you will see the following:

<!-- ![Notepad++ Validation](../img/03%20Notepad++%20Valid.PNG) -->

Otherwise, an Information window will appear with validation error messages.
