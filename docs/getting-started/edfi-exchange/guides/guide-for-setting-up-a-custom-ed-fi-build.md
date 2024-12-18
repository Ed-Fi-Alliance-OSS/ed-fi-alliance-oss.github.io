# Guide for setting up a custom Ed-Fi build

EdFi implementations fall into two categories, ‘vanilla’ implementations that do not have any extensions and can be deployed from the binaries that are supplied by EdFi, and ‘custom’ implementations that have extensions and seed data are require that Ed-Fi be built from source. This document describes one common approach for setting up your source code control for these custom implementations. These recommendations are applicable for all versions of Ed-Fi from 3.2 – 6.1.
The method described here is not necessarily the official recommendation of the Ed-Fi alliance, it is just a common approach that has been used on several implementations.

## Setting up the Repositories

The source code for Ed-Fi is currently split between two repositories, Ed-Fi-Ods and Ed-Fi-Ods-Implementation. Both of these repositories are needed for Ed-Fi to build.

### Prerequisites

* Account on a git repository service (github, bitbucket, azure dev ops, team foundation server, etc.)
* Local git command line client.

### Steps to clone and customize a repository

* From your git client, clone the most recent Ed-Fi-Ods-Implementation from [https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/) .
* Go into that folder and switch to the branch of your choice.
* Create a new branch that will be unique to your customization
* Add your destination git account as a new remote server and push this new branch up to that server.
* Optionally, on that server make this new branch the default branch
* Repeat all of the above steps for the Ed-Fi-Ods repository ([https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/)) .

## Extensions

The documentation for creating extensions is found elsewhere on techdocs. What is important for your repository is that the metaed files are stored in the Ed-Fi-Ods-Implementation repository under the /Extensions folder. It is possible to have multiple extensions, so each extension should get a folder that is named the same as that extension. Underneath that will be the project.json file that names the extensions and the appropriate folder structure for organizing the metaed files. It is also where the metaedOutput artifacts will go during the metaed build processes.

## Applications

The step of creating a new Visual Studio project as described in the extension documentation will create a new folder under the /Applications. This is where all of the artifacts that are specific to your extension will go. This is a great place to put any seed scripts that are specific to your application.

### Seed scripts

Often times, as part of an Ed-Fi build we want to have reference data prepopulated in the database. If we are building from source, we can have scripts that prepopulate this reference data during the build process. Common reference data that is seeded at build time includes descriptors (both for extension descriptors and Ed-Fi descriptors), Education Organizations (including the state education agency, local education agency(s), and schools), course catalogs, and programs.

To have this data be included in the build process, write an INSERT script for the data. Include the name of the schema (for example ‘edfi.’) but do not include the name of the database, as this will get implemented potentially on multiple ODS. The following guidelines are recommended for these scripts in a Microsoft SQL environment (some changes will be needed for postgres):

* The scripts will be saved in the folder Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.`<extension name>/Artifacts/MsSql/Data`
* The scripts should start with a 0-padded for digit number, starting at ‘0001-‘ and continuing in order. The scripts will be run in this order at build time.
* The scripts should have a ‘.sql’ file prefix.
* Each script should have explicit transaction control, so if they error out in the build process the entire script will fail.

Sample seed script:

#### Sample Seed script content

```sql
SET XACT_ABORT ON
begin transaction;

INSERT INTO edfi.Descriptor (Namespace, CodeValue, ShortDescription,Description) values ('uri://<myURL>/AttendanceEventCategoryDescriptor','AU','Absent-Unexcused','Student was absent without excuse');
INSERT INTO edfi.Descriptor (Namespace, CodeValue, ShortDescription,Description) values ('uri://<myURL>/AttendanceEventCategoryDescriptor','AE','Absent-Excused','Student was absent with excuse');

INSERT INTO edfi.AttendanceEventDescriptor(AttendanceEventDescriptorId)
SELECT descriptorId FROM edfi.descriptor
where namespace = 'uri://<myURL>/AttendanceEventCategoryDescriptor';

COMMIT;
```

#### Seeding descriptors

Descriptors are the most common thing that gets added to custom builds. In the database, the actual code value, short description, description, and namespace all go in the edfi.descriptor table, and a reference back to the primary key of that table goes in a table that is specific for that descriptor. The specific descriptor table will be in the ed-fi schema if it is part of the ed-fi model, or it will be in a schema that is named the same as the extension if it is an extension descriptor.

This excel spreadsheet will use a formula to build the INSERT statements for the edfi.descriptor table. Use at your own risk...
[DescriptorBuilder.xlsx](./attachments/DescriptorBuilder.xlsx)

#### Deletes

Deleting data, such as Ed-Fi descriptors, can cause build errors when the default populated template is used as part of the build process.

#### Metaed configuration

In both the new Visual Studio Code metaed or the old Atom metaed, the default behavior of the ‘Deploy’ action is to completely replace the artifact directory in the extension project. This means if you have scripts saved here, and you do a metaed deploy, they will be erased. In both versions of Metaed there is an option to ‘suppress deletion of artifact folder’, and by clicking this option the seed scripts will not be erased.

#### Other approaches for seed data

Including SQL scripts in the repository is not the only way of getting your initial reference data in Ed-Fi. Other options (that are not documented here) include:

* Set up your own minimal and populated ODS templates (this works well if you are wanting to delete Ed-Fi descriptors)
* Include in your build process additional scripts to push the reference data in with the bulk load utility
* Include in your build process additional scripts to push the reference data in with custom API calls
