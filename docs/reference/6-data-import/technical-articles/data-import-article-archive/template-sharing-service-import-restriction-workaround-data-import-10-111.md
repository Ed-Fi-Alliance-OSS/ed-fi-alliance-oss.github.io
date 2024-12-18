# Template Sharing Service Import Restriction Workaround (Data Import 1.0-1.1.1)

## Overview

The Template Sharing Service within Data Import is a way to help share value
between users with similar needs by sharing the import mapping of data transform
processes, without having to share data or implementation details.  On its
initial implementation through Data Import 1.x versions, the Template Sharing
Service allowed sharing of of data mappings of the same version of ODS / API.
Data Import 1.2, scheduled for April 2021 delivery, will improve upon this by
allowing importation for the same major version of data standard such as 2.x and
3.x.

Below is a temporary workaround to allow the importing Data Import maps within
the same data standard version until Data Import 1.2 allows this within the
tool.

## Import Steps

1) Download
   [Import-Template.json](https://edfi.atlassian.net/wiki/download/attachments/24117886/Import-Template.json?version=1&modificationDate=1613149851183&cacheVersion=1&api=v2),
   save locally and open this JSON file in your system.  This can be done from
   any test editor but it's recommended to use one that checks if the JSON file
   is valid before adding it into the system.  Below is a preview of this
   template JSON file.

![Import template](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-14-5.png)

2) Select the desired template and click on "View":

![Template Sharing](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_9-18-26.png)

3) Copy the information from the **Template Information** section and paste it
   into the **Title** and **Description** fields, as shown below:

![Template](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-15-11.png)

![Template Information](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-16-35.png)

4) Specify the desired ODS / API version in the **APIVersion** field:

![Import Template](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-18-10.png)

5) Copy the information from the **Submitted Information** section and paste it
   into the **Name**, **Email** and **Organization** fields, as shown below:

![Submitter Information](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-19-39.png)

![Template Populated](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-20-33.png)

6) Copy the content of the template preview and paste it in the **Template**
   field replacing the empty brackets {}, as shown below:

![Template Preview](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-23-7.png)

![Template Populated](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_11-24-8.png)

7) Save the file and remember it's location.

8) Go to the **Import / Export** section:

![Import Export](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_10-9-54.png)

9) Choose the file created and click **Import**:

![Import Template](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_10-10-31.png)

10) If the version is valid, and the data does not exist in the system, the data
    will be correctly imported.

![Import Success](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2021-2-12_9-40-55.png)
