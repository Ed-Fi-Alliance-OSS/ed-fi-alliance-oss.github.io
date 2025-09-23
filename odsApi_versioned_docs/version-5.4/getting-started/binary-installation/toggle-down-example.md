# Toggle-Down Markdown Example

This file demonstrates how to use toggle-down (details/summary) sections in Markdown for configuration samples.

---

<details>
  <summary>SQL Server</summary>

  ```json
  "ConnectionStrings": {
    "EdFi_Ods": "server=(local);trusted_connection=True;database=EdFi_{0};Application Name=EdFi.Ods.WebApi",
    "EdFi_Security": "server=(local);trusted_connection=True;database=EdFi_Security;persist security info=True;Application Name=EdFi.Ods.WebApi",
    "EdFi_Admin": "server=(local);trusted_connection=True;database=EdFi_Admin;Application Name=EdFi.Ods.WebApi",
    "EdFi_Master": "server=(local);trusted_connection=True;database=master;Application Name=EdFi.Ods.WebApi"
  },
  "ApiSettings": {
    "Mode": "YearSpecific",
    "OdsTokens": [2021],
    "Engine": "SQLServer",
    "MinimalTemplateScript": "TPDMCoreMinimalTemplate",
    "PopulatedTemplateScript": "TPDMCorePopulatedTemplate"
  }
  ```
</details>

<details>
  <summary>PostgreSQL</summary>

  ```json
  "ConnectionStrings": {
    "EdFi_Ods": "host=localhost;port=5432;username=postgres;database=EdFi_{0};Application Name=EdFi.Ods.WebApi",
    "EdFi_Security": "host=localhost;port=5432;username=postgres;database=EdFi_Security;Application Name=EdFi.Ods.WebApi",
    "EdFi_Admin": "host=localhost;port=5432;username=postgres;database=EdFi_Admin;Application Name=EdFi.Ods.WebApi",
    "EdFi_Master": "host=localhost;port=5432;username=postgres;database=postgres;Application Name=EdFi.Ods.WebApi"
  },
  "ApiSettings": {
    "Mode": "YearSpecific",
    "OdsTokens": [2021],
    "Engine": "PostgreSQL",
    "MinimalTemplateScript": "TPDMCorePostgreSqlMinimalTemplate",
    "PopulatedTemplateScript": "TPDMCorePostgreSqlPopulatedTemplate"
  }
  ```
</details>

---

You can copy and reuse these toggle-down sections in your own documentation files.
