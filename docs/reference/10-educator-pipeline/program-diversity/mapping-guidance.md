---
sidebar_position: 2
---

# Mapping Guidance

This developer guide describes the processes for a System Integrator to provide data to the Diversity and Persistence Dashboard. In the [Program Diversity and Persistence Setup Guide](./setup-guide.md) we explain how to setup the Ed-Fi solution including a high-level description of how to use Data Import to read and map a CSV. In this document, we we dive a bit deeper into how to work  with the Educator Preparation Provider (in mapping session with their data expert) to understand the data needs of the Dashboard and how that data will map into Ed-Fi to produce a report valuable to the EPP.

The Diversity and Persistence Dashboard requires data from a number of different sources:

* Candidates
* Credentials
* Financial Aid
* Programs
* Program Enrollment (what candidates are in what program)

This data may all be stored in the Student Information System (SIS), but may also be in different source systems.

## How to get Data into the Ed-Fi API

### Procure the Data (or Sample Data)

Having the data in hand is generally the best way to get a feel for the type of mapping and manipulation work that needs to be completed to load the data into Ed-Fi. Since sharing agreements can slow this process, having a set of de-identified sample data that matches the structure of the final output works just as well. Knowing what data will be in what files and the names of fields allow for mapping to begin even if real data is not available.

### Map Fields

Now that the data (or sample data) has been provided, you can start the mapping process. There are a number of tools for mapping data, including a [Google Sheets workbook](https://docs.google.com/spreadsheets/d/1eAb3-XQgIrNkyEsSHYik8HNDvv85MRdq66CY7Cu27uw/edit#gid=1865042024) specifically tailored to work with the Starter Kits. We will be using the workbook for examples and descriptions below.

### Map Descriptor Values

Many Ed-Fi entities use enumeration values called descriptors. These descriptors are used to categorize data and help provide useful reporting. Descriptor values will need to be mapped from the source data into values in Ed-Fi. In most cases new descriptor values can be added if the default ones provided by Ed-Fi are not sufficient. In cases where the EPP doesn't have data for a descriptor value, it can be statically set on import of the data. The mapping workbook offers descriptor values for any given entity. General guidance for descriptors can be found [here](/reference/data-exchange/technical-articles/descriptor-guidance).

### Determine Mapping Logic

There may be cases where a direct field mapping from source data into Ed-Fi is not possible. A single field might require the concatenation of two fields, or maybe reading data from a second file.

A good example of this is with the cohort year data for candidates. Currently, cohort year is a part of the candidate entity, but we have found the cohort year data generally lives with the enrollment data (CandidateEducatorPreparationProgramAssociations). If the EPP can not provide this data with the candidate data, then data will have to be read from the enrollment file and added to the candidate file before import.

In the above example, pre-processing either within the [Data Import tool](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24117496/Preprocessing+CSV+Files) or using a python or PowerShell script before the file is ingested via Data Import.

### Set up the ODS/API and Admin App

Installation Instructions can be found in the [Program Diversity and Persistence Setup Guide](./setup-guide.md)

### Create Education Organizations

Instructions for adding education organizations in Admin App can be found in the Dashboard setup guide [here](./setup-guide.md#add-your-education-organizations-in-the-admin-app).

### Set up Data Import

Installation Instructions for Data Import can be found [here](../../6-data-import/readme.md).

Once you've installed Data Import, initial setup and post installation steps are [here](./setup-guide.md#configure-data-import-for-first-time-use).

### Create Import Maps and Agents

Data Import requires a map for each piece of CSV data that will loaded into the ODS. Basic information on creating maps and agents for the Diversity and Persistence Dashboard can be found [here](./setup-guide.md#create-or-import-a-mapping-template).

More in-depth documentation on Import Maps and Agents can be found in the Data Import [documentation](../../6-data-import/readme.md).

### Upload File to Agent

The final step before loading data with Data Import is to upload a file for the agent to process.

Instructions for uploading files to agents can be found in the [Diversity and Persistence Setup Guide](./setup-guide.md#upload-a-file).

### Load Data

Execute Data Import Agents.  Details can be found in the [Diversity and Persistence Setup Guide](./setup-guide.md#execute-data-import).

## How the Provided Mapping Workbook Works

Ed-Fi provides a [workbook](https://docs.google.com/spreadsheets/d/1eAb3-XQgIrNkyEsSHYik8HNDvv85MRdq66CY7Cu27uw/edit#gid=1865042024) that has been used successfully in past projects to help System Integrators (SI's) and EPP's provide the appropriate data and also map that data into the ODS. The examples in this page will use that workbook, but any mapping tool can be used and the concepts should remain the same.

To use the workbook for your Starter Kit mapping:

1. Click on the workbook link above
2. If you are logged into your Google account, you can either:
    1. Download - click the "File" menu then hover your mouse over the download option and choose your preferred format (e.g., Excel, Open Office, etc).
    2. Copy to your Google Drive - click the "File" menu and select "Make a Copy". This will present a dialog that will allow you to choose a name and the Google Drive where you'd like to save your workbook.

Here is an example of a simple mapping from the workbook, EducatorPreparationProgram. Within the workbook, the rows for each entity can be broken down into two distinct sections:

* Field information - Provides contextual information to help understand the data and types required to load the data.
* Mapping (or EPP provided) information - This area is meant to be provided by the EPP, or determined by the SI.

Each section is designated by a different color for better visual representation what data needs to be filled out when mapping.

![Mapping workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-workbook.png)

### Field Information

* **API Resource / Entity Name** - The entity within the model that will be mapped.
* **Ed-Fi Field Name** - The name of the field within the entity. Only required fields are shown, for a list all fields within an entity, see the [Data Handbook - Ed-Fi + EPDM](https://edfidocs.blob.core.windows.net/$web/handbook/tpdm-v1.0/Index.html).
* **Ed-Fi Description** - What this field represents.
* **Ed-Fi  Data Type** - The type of data expected for that field, including the length of the field if appropriate. Reference types refer to other Ed-Fi entities that would need to be created prior to loading this data. Descriptor data types are similar to enumerations and the default values provided by Ed-Fi are listed below the data mapping rows.
* **Other comment** - A space for more description of the field. This is also used to signal the key of a reference type if not clear.

### Mapping Information

* **CSV File.** The name of the file provided from the EPP that will contain this data.
* **CSV File / Field Mapping.** The field with the CSV that will map to this field.
* **Sample.** A sample output from the field.
* **Mapping Logic.** Any logic needed to get the data from source to destination (e.g., if two fields need to be concatenated).
* **Actual Static Values.** In some cases, the EPP might not have the data to represent the field. In these cases, the field can be defaulted to a static value.
* **Descriptor Mapping.** How to map EPP values into provided descriptors. If the default descriptor values are not sufficient, descriptors within Ed-Fi can be added.

## EducatorPreparationPrograms

![Mapping workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-workbook.png)

Educator Preparation Program represents a state-approved course of study, completion of which signifies a candidate will have met all requirements necessary to obtain a certification or licensure to teach within K-12 schools. Most educator preparation providers will offer multiple programs, each aligned with a certification offered by the state. Program data needs to be loaded after Education Organizations (completed through Admin App, see [Program Diversity and Persistence Setup Guide](./setup-guide.md)) but should be loaded before any other data. To load Programs you need the following data:

* The id of the school created with Admin App,
* The name of the program, this generally correlates to the degree being offered by the program such as 'All Level EC-12+Art' or 'High School 7 - 12+Science',
* The program type. In many cases this will be a traditional program, but Post-Baccalaureate is also quite common.

Within the Diversity and Persistence Dashboard there is one visual that makes use of programs, 'Number of Candidates by Program'. This visual uses  the concept of groups within Power BI to collect programs that provide similar degree levels into the same value (i.e. Elementary vs. High School). For more on how to set up the groups in Power Bi, see the [Program Diversity and Persistence Setup Guide](./setup-guide.md).

![Number of candidates by program graph](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/number-of-candidates-by-program.png)

Programs are also provided as a filter value on the left hand side of the report, allowing the user to see values for either a single program or multiple programs using multi-select.

## Candidates and Persons

![Candidates and Persons workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-candidates-persons.png)

Candidate represents a student accepted at an EPP and working their way toward licensure or certification. The values needed for the Diversity and Persistence Dashboard are basic identification and demographic information, including: First and Last name, Sex, Race, and Birthdate.

CandidateIdentifier is the key field for Candidate. It is a string field and is generally mapped to the student or person ID supplied by the EPP, University or State.

Person is an entity meant to represent the actual person within Ed-Fi. A person can have many roles (e.x. Candidate is a role a person can have). Many entities within Ed-Fi use person (rather than the specific role that the person is playing) to associate other entities. In the Diversity and Persistence Dashboard, credentials are associated via the person reference.

Person has two fields, the PersonId, a string similar to CandidateIdentifier.  The second field is a descriptor for the source system.  Unless the University or EPP is using a Person Identification System it is recommended that the PersonId be the same as the CandidateIdentifier and the SourceSystemDescriptor be defaulted to 'school' for simplicity.

## CandidateEducatorPreparationProgramAssociations

![Candidate Education Prep Program Associations workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/candidate-epp-associations.png)

This association table will link candidates with their appropriate program. This also counts as candidate 'enrollment' into the program.

Candidate - a reference to a candidate enrolled in a program.

EducatorPreparationProgram - The program the candidate is or was enrolled in.

BeginDate - When the enrollment first occurred, generally the start of the term the candidate commences activities for the program.

ReasonExitedDescriptor - This value is set to 'Received certificate of completion or equivalent' when a candidate has completed all work and has been recommended for licensure. It should be left empty for candidates still enrolled in the program.

CandidateCohortYear is the year that the candidate belongs to. CandidateCohortYear has two fields:

* SchoolYear - A 4 digit year.
* Term - The term associated with the school, this is generally the entry term for the student
* CohortYearType - A descriptor that represents the type of cohort. CohortYearType is usually determined by the EPP, with the most common being 'Entry' into the program.

## Credentials

![Credentials workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/credentials-workbook.png)

Credential represents the attainment of a certification or license that authorizes or enables teaching assignment services. This data is generally provided two ways:

* From the State of Issuance - EPP's can generally request from the state a list of their candidates that have been credentialed.
* From post completion surveys - When an EPP can not receive the data from the state, they will send out surveys to their completers and determine licensed candidates from the responses.

For the Diversity and Persistence Dashboard to function properly, we're looking for a credential record to exist for a given candidate. The data of the credential is irrelevant. Credential however, does require a number of fields to be loaded into the ODS:

* CredentialIdentifier - A unique identifier for the credential, generally the credential id from the state.
* CredentialField - What the credential allows the recipient to teach (i.e. Art, Computer Science, English, etc.)
* IssuanceDate - The date the credential was issued.
* CredentialType - What is the type of the credential, most common would be Certification or Licensure depending of the terminology of the state or EPP.
* GradeLevel - What grade level(s) the credential allows the recipient to teach, this field is collection and allows for multiple values,
* StateAbreviation - The state of issuance for the credential.
* TeachingCredential - An indication of the category of a legal document giving authorization to perform teaching assignment services. Most common value is 'Regular/Standard'.
* Namespace - A value representing the source of the data, this will generally take the form of 'uri://www.INSTITUTION\_WEBSITE.edu' and will be the same for all credential data.
* Person - A reference to the person attached to this credential.

## FinancialAid

![Financial Aid workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/financial-aid-workbook.png)

Financial Aid represents an award of aid that a candidate has received. For the Diversity and Persistence Dashboard, this is generally accepted to be grants that a candidate may have received.

The values required for the Diversity and Persistence Dashboard include:

BeginDate - The date the aid was awarded or designated

AidType - The type of aid received. By default Ed-Fi provides ~20 different categories of aid from various types of grants, federal loans, private loans, and assistantships. The provided values can be found on the last tab of the mapping workbook. The Diversity and Persistence Dashboard looks for any grant type descriptor to power the 'Percentage of Grant Recipients" visual. As with any Ed-Fi descriptor, you can customize the types of aid (this can also be updated in the Dashboard if you want to provide a different lens on the aid received)

Student - A reference to the student attached to the credential. This will most likely be the same id as your candidate.
