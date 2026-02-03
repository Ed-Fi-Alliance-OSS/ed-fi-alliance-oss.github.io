# Core Concepts

This section outlines core concepts related to MetaEd.

## Before You Begin

The MetaEd IDE provides implementers with a quick and painless means of
extending various Ed-Fi Technology Suite components. All extensions to Ed-Fi technical
products must adhere to the [Ed-Fi Extension
Framework](../../1-data-exchange/extensions-framework/readme.md). The MetaEd IDE
generates extended technical artifacts aligned with the guidance and principles
in the Extension Framework.  

If you don't have an Ed-Fi ODS / API, or you don't use the Ed-Fi Data Standard,
then the MetaEd IDE can be a pleasant diversion from the workaday world, but
won't really do anything for you.

However, if you are looking to implement and extend Ed-Fi Technology Suite, then the
MetaEd IDE is for you.

## What Is MetaEd? And What Is the MetaEd IDE?

The term MetaEd is a general term encompassing a few related things.

### MetaEd Language

The MetaEd Language is a lightweight domain-specific language that describes
Ed-Fi data elements, their properties, and their organization into entities. The
language is meant to be easily readable by developers and business analysts.
Here's an example snippet for the first name of a student:

```metaed
Shared String FirstName [49]
 documentation "A name given to an individual at birth, baptism, or during another naming ceremony, or through legal change."
 min length 1
 max length 75
```

If you look at the Ed-Fi technical artifacts, you'll find that
Student.Name.FirstName in the Ed-Fi Core XSD is a string with a minLength of 1
and maxLength of 75 characters. Similarly, the Student.FirstName field in the
ODS / API database is an NVARCHAR with a length of 75. The simple statement
above in the MetaEd Language is what drives those definitions in the Ed-Fi
technical artifacts.

MetaEd language files must always have a .metaed extension.

### MetaEd Generator

The MetaEd Generator is a command-line software component that compiles MetaEd
language files into technical artifacts. Since the MetaEd Generator is an
executable, it can be run independently from the MetaEd IDE. For example, some
advanced users may find it useful to invoke the Generator in a continuous
integration environment. Most users, however, will simply work with the
Generator through the IDE.

### MetaEd IDE

The MetaEd IDE provides an integrated development environment experience for the
Language and the Generator.

## What Does MetaEd Output?

The MetaEd IDE outputs several technical and documentation artifacts, including:

* SQL scripts to extend an Ed-Fi ODS / API
* XSD schema definitions to extend the Ed-Fi Data Standard
* Excel data dictionaries for XSD and SQL that combine both core and extended
    definitions

## How Does MetaEd Work?

It's not necessary to understand the MetaEd architecture in order to use the
system, but it may be of interest to advanced users.

**The User Interface (UI) is a Visual Studio Code Extension.** The MetaEd IDE is
a plug-in to the open-source Visual Studio Code (VS Code) text editor. The IDE
uses VS Code to handle traditional user-facing features such as syntax
highlighting and semantic validation for source files. It also provides a
structured wrapper for the setting of configuration values, invoking the build
system, and so forth.

**Compiling is in Code.** MetaEd leverages a command-line application that
"compiles" the source MetaEd language files into Ed-Fi-aligned artifacts. The
application contains the parsing/lexing code that reads the source files, the
code that turns your source into an abstract model, and the generator code that
turns the abstract model into concrete artifacts. If you have the IDE, you also
have a copy of the command-line application on your local machine. As the name
implies, the command-line application can be used independent of the MetaEd IDE
via the command line — but this documentation focuses on the IDE because that's
how most users will interact with the language.

**The MetaEd Language is Customized for Ed-Fi Technology.** The heart of MetaEd
is the MetaEd language, which is a domain-specific language written for the
Ed-Fi Alliance. The language works because it contains all the core concepts
around modeling and data typing that are relevant to Ed-Fi Technology Suite — and the
language interpreters and generators know how to turn those concepts into
concrete technology artifacts. The language was written using the popular [ANTLR
framework](http://www.antlr.org).

## That Sounds Awesome. Does MetaEd Do Everything Needed to Extend an Ed-Fi Implementation?

In a word, no. Depending on your development process and your implementation
environment, you may have additional work to do — and, of course, you'll need to
validate and test any code thoroughly. But, with that disclaimer aside, field
testing has shown that the MetaEd IDE can drastically reduce both the initial
development and the revision cycle time on extension projects.
