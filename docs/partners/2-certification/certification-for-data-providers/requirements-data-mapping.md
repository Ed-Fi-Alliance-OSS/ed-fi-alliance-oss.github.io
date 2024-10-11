# Requirements - Data Mapping

Products MUST submit a data mapping as part of their certification. The data
mapping MUST show the mapping between data elements from the certifying system
to Ed-Fi data elements. This information may be published as part of the
certification record.

## Format

Please submit a spreadsheet that follows these usage norms:

- Each row MUST identify the Ed-Fi API resource, property name, and where
  applicable, the aggregate resource.
  - For **SIS certifications**, these values SHOULD match what is listed in the
    first three columns of the certification test scenarios (Aggregate Resource,
    Resource, and Property Name).
  - For **Assessment certifications**, these values SHOULD be defined according
    to the provided
    [Assessment Certification Mapping Template](https://edfi.atlassian.net/wiki/download/attachments/23695793/Data%20Mapping%20Template.xlsx?version=1&modificationDate=1568305681130&cacheVersion=1&api=v2).
- All properties identified as "REQUIRED" for certification MUST be included.
  When present in the provider application, all "CONDITIONAL" properties MUST be
  included. "OPTIONAL" properties can be included at the vendor's discretion,
  but are RECOMMENDED.
- Please submit to **[certification@ed-fi.org](mailto:certification@ed-fi.org)**

### Additional Guidelines

- The goal is for the mapping to be both accurate and usable by your product
  users. As you produce the mapping, we advise you to keep this in mind.
- Element names used on the certifying system side do not have to be database
  tables names, but can be any identifier recognizable or accessible to product
  users.
- Mappings do not have to show business logic transformations; rather, these
  mappings should be a "best effort" attempt to clarify data relationships to
  Ed-Fi data elements.
  - This includes allowed discrepancies between the certification requirements
    and actual mappings (e.g., default values, duplication for multiple fields).
  - Where business logic is important to the mapping, the Alliance encourages
    providers to provide additional commentary helpful to users of the mapping.
