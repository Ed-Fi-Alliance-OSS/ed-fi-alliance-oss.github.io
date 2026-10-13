# The North Allegheny Ed-Fi Survey Data Loader

![NA School Logo](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/naSchoolLogo_107x106.png)

## Description

The Survey Data Loader tool is a lightweight web application enabling end users to easily map and upload survey data flat files to an Ed-Fi ODS. Supported use cases include any surveys administered at the district, school, or classroom level that leverage Google Forms, Microsoft forms, Typeform, or other survey platforms that output response results in a standard, tidy (each row represents one survey response; each column represents one item response or survey response property (e.g. completion time)) spreadsheet format. Within the application, users load survey metadata and question metadata to their Ed-Fi ODS before uploading survey responses. Surveys can be loaded without manual field mapping or bootstrap configuration outside of simple user prompts within the UI. An admin module allows data/IT admins to pre-configure secure ODS connections, enabling business users to engage with the application without deep technical knowledge or familiarity with the Ed-Fi data model.

A preview of the application can be accessed here ([https://r.northallegheny.org/surveyLoaderDemo/](https://r.northallegheny.org/surveyLoaderDemo/)). Preview users are welcome to try uploading their own sample data to their own sample ODS (e.g. Populated Template/Grand Bend dataset); for obvious reasons, do not send actual student data through the demo application.

**Contact name/email:** Sean Hoover (shoover1@[northallegheny.org](http://northallegheny.org)); Dr. Katherine Curran (kcurran@[northallegheny.org](http://northallegheny.org));  Yuko Wong (ywong@[northallegheny.org](http://northallegheny.org))

**Ed-Fi version supports (if applicable):** >= v3.2 (ODS must include Survey Domain)

**License terms:** Apache License

## Git Repository

[https://github.com/Ed-Fi-Exchange-OSS/North-Allegheny-Ed-Fi-Survey-Data-Loader](https://github.com/Ed-Fi-Exchange-OSS/North-Allegheny-Ed-Fi-Survey-Data-Loader)

## Details

* **By:** [N](https://www.msdf.org)orth Allegheny
* **Released:** July 27, 2022

## At a Glance

**Version:** Tech Suite 3
**For:** ODS/API v3.x
