# Cross-Version Template Sharing

> [!INFO]
> The feature in this article was added in Data Import 1.1.2 and applies forward. See [Template Sharing Service Import Restriction Workaround (Data Import 1.0-1.1.1)](../data-import-article-archive/template-sharing-service-import-restriction-workaround-data-import-10-111) for a workaround when using earlier versions of Data Import.

# Overview

There are two ways to share templates in Data Import:

1. The Template Sharing Service allows you to share templates with the Ed-Fi community through a central repository of templates.
2. Users can use the Export / Import feature to export templates to a simple text file to be manually shared and then imported into another Data Import installation.

Prior to Data Import 1.1.2, both of these systems enforced a restrictive ODS / API version number check when bringing a shared template into your Data Import installation: if the template was originally created for a different version than your target ODS, the template could not be imported. This restriction was _safe_, but excessive. Typically, templates defined against some version of the ODS / API logically still apply to subsequent versions of the ODS / API.

Beginning with Data Import 1.1.2, importing templates is still _safe_ in the face of Ed-Fi Standard changes over time, but is more permissive when the ODS / API version used to create the template differs from your target ODS / API version. In short, **if the field mappings in the template all still match up with corresponding fields in your target ODS / API, then the import is allowed to proceed**. If there are any discrepancies, such as a map that uses a ODS / API 5.2 field that simply does not exist in your target ODS / API 3.4.0 system, you will still be protected from import and will instead receive diagnostic information about the discrepancy.

Below, we see the Import Template confirmation screen for an example Student Assessments template. See the blue notice as well as the "Ed-Fi ODS / API Version" drop down list:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/Cross-Version%20Template%20Sharing.PNG)

The incoming template was originally defined against an ODS / API 3.4.0 system, and the installation of Data Import we wish to bring this template into has its own connections to ODS / API systems on versions 3.4.0 and 5.2. The user has the option of bringing in the template for use against either version, and is free to choose either one.

Naturally, since the original template is in terms of 3.4.0 fields, if the user selects version 3.4.0 there is no risk of a logical conflict and the import will proceed for use with the user's ODS / API 3.4.0 systems.

More interestingly, if the user selects 5.2 here, the system will begin by comparing the entire incoming template against the actual fields available in ODS / API 5.2. Because the incoming template refers only to fields that also exist in 5.2, the import will proceed and the user will be able to use the map unaltered against their own 5.2 installations.
