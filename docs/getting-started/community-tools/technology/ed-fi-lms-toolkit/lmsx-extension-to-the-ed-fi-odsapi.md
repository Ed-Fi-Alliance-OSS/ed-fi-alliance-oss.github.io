# LMSX Extension to the Ed-Fi ODS/API

In an ideal situation, a Learning Management System (LMS) provider would integrate directly with an installed Ed-Fi ODS/API system to **push** new data directly from the source system to the education agency. The Python-based components in the [LMS Toolkit](./readme.md) exist as a workaround to this ideal case: they allow the education agency to **pull** data from the LMS source system and then synchronize it with the Ed-Fi ODS/API.

While the Ed-Fi Alliance is pleased to offer the full toolkit, we believe direct integration remains the best option. To this end, the Alliance has created a [draft RFC](https://edfi.atlassian.net/wiki/spaces/rc/pages/22774016/LEARNING+MANAGEMENT+SYSTEMS+API), and has published an extension plugin for enabling this LMS API directly inside of the Ed-Fi ODS/API Suite 3, version 5.2 or version 5.3. For extension installation instructions, please see the [LMS Toolkit User Guide](./lms-toolkit-user-guide/readme.md).

![LMS Extensions Diagram](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-lms-toolkit/LMSX%20Extension.png)

[LMSX Extension.drawio](https://edfi.atlassian.net/wiki/download/attachments/22500277/LMSX%20Extension?version=1&modificationDate=1673031243807&cacheVersion=1&api=v2)
