# Finance Domain - Best Practices

## Summary

With the Data Standard v4.0-a release, a number of changes were introduced to
the Finance Domain. The new Finance API is aligned with common accounting
standards and reporting standards in the K–12 education space. The primary
sources include:

* The U.S. DoE Institute of Education Sciences publication [Financial
    Accounting for Local and State School
    Systems](https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2015347). Many
    definitions of the reporting dimensions in the model derive from the
    guidance in this publication.
* The accounting and reporting guidance published by SEAs, including those
    represented at the Finance Work Group. A survey of many states was
    conducted. Of particular note,
    the [WUFAR](https://dpi.wi.gov/sfs/finances/wufar/overview) requirements
    published by Wisconsin helped shape the particulars of the model, and
    extended the dimensions as defined by U.S. DoE publications.

The sources above build upon the Generally Accepted Accounting Principles (GAAP)
as established by the Governmental Accounting Standards Board (GASB).

### Chart Of Accounts and Dimensions Entities

The Chart of Accounts entity forms the backbone for classifying expenditures of
all types. Each Account Identifier element is comprised of a compound structure
of multiple types of classifications, or _dimensions_, each with a hierarchical
code structure. Example dimensions include:

* The Fund from which monies are being expended
* The Program that is spending the funds
* The Function for which the funds are being spent

While different states use different sets of dimensions, many are standardized
in the financial accounting standards published by the NCES. By convention, each
dimension of an Account Identifier has a dimension code reflecting a
hierarchical organization. For example, a dimension Code of 100 is typically a
roll-up of 110, 120, 130, …, and a dimension Code of 120 is a roll-up of 121,
122, 123, …, and so forth.

In the data model, there are entities for each dimension whose values define the
set of allowable numbers within the dimension. The Chart of Accounts entity
holds the set of valid compound account codes, each linked to their requisite
dimensions' code. While this may seem duplicative, each aspect has a specific
purpose in that the dimension entities enumerated in the model reflect the
national standards. The dimension entities provide a convenient mechanism for
query, reporting, and roll-ups along dimensional lines.

Though not part of this specification, API platform hosts could define
additional dimensions by repeating this convention.

Because all combinations of dimension code values are not valid, the Chart of
Accounts entity delineates the set of valid compound account codes. The mapping
(i.e., the association) of Local Accounts (including the Budget and Actual
entities) to the Chart of Accounts will allow the API to ensure that only valid
Chart of Account entities are referenced. This validation is typically performed
by referential integrity checks in an underlying platform's datastore. This
approach obviates the need for dozens of business rules to check for valid
combinations had a dimension-only model has been used. The Chart of Accounts
entity provides the definitive list of account codes used to derive accounting
statements and to produce budget versus actual reports.

## Use Cases

The architecture covered by this model of data exchange is intended to serve the
following SEA, LEA, and CMO use cases.

### SEA Use Cases

The SEA use cases center on data exchange with LEAs related to state and federal
finance reporting requirements. These use cases include:

* SEA publishes yearly a Chart of Accounts (COA) for LEA reporting purposes
    and loads the COA into a datastore such as the Ed-Fi ODS / API. The COA can
    be read by LEA financial system vendors via the Finance API. This eliminates
    the need for the SEA to publish spreadsheets, and enhances reliability.
* LEAs develop their local accounts for the new fiscal year and map their
    local accounts to the state-level COA. An LEA vendor can use the Finance API
    to validate new local accounts as they are created.
* LEAs develop budgets for a new fiscal year and assign a budget to each local
    account. The Finance API ensures that invalid account dimension combinations
    cannot be loaded by enforcing referential integrity of the local-to-SEA COA
    mappings.
* SEAs may update the SEA COA during a given year either via bulk update (XML)
    into a backing datastore or directly to the Finance API. LEA financial
    system vendors can read the updated COA information from the SEA via the
    Finance API.
* LEAs may amend their budget throughout the year by updating local codes.
    These amendments can be posted in their entirety or by updating changed
    accounts into the Finance API hosted by an SEA.
* SEAs may take snapshots of data for loading into a data warehouse or for
    other date-based LEA reporting.
* LEAs may submit actual financial information to an SEA, typically at the end
    of a fiscal year. These are collected in an LEA financial system throughout
    the year with validation, reasonability checks, and audits to ensure
    accuracy of the data. The LEA can provide their reviewed actual information
    to an SEA via the Finance API.

ESSA (or other) financial reporting by a district can be generated by an SEA.
The SEA maps the state-level COA to the various categories used for ESSA
reporting, identifying the various dimensions and/or granular COA accounts for
each ESSA category. The SEA and LEAs review the data for correctness and approve
the data. The SEA publishes the ESSA reports to the public.

### CMP Use Cases

The same general use cases are applicable for charter management organizations
to receive financial budgets and actuals from the schools in their network.

### LEA Use Cases

In regions where there is no Finance API at the state level, an LEA may find the
Finance API useful for its own purposes. For example, an LEA can load the
SEA-defined COA into a backing datastore, map its own local account codes, and
directly generate reports for the SEA. The data exchanged via a Finance API also
supports an LEA’s analytics and reporting (e.g., to link financial data with
student outcomes and school operations information).

## Example Usage

This section provides a few example usage patterns for the Finance API.

### Building the SEA Chart of Accounts for a Fiscal Year

SEA client systems will create a chart of accounts through
the /chartOfAccounts endpoint. Each POST to `/chartOfAccount` is analogous to
creating a row in a typical chart of accounts spreadsheet, and contains similar
information: a name and code for the account, plus accounting dimension
information such as the type of account (e.g., expense), the fund type (e.g.,
general fund, capital project fund), the object of the account (e.g., salaries,
technical services, utility services), and so forth.

The example listing below illustrates the information sent for a hypothetical
instructional fund expense (10 in the fundDimensionReference) related to teacher
salaries (100 in the objectDimensionReference) in the regular curriculum (120000
in the functionDimensionReference):

```json
{
  "id": "58aa05e44e4e4d709d3d491241f30386",
  "accountIdentifier": "10-100-120000",
  "fiscalYear": 2020,
  "educationOrganizationReference": {
    "educationOrganizationId": 1
  },
  "functionDimensionReference": {
    "code": "120000",
    "fiscalYear": 2020
  },
  "fundDimensionReference": {
    "code": "10",
    "fiscalYear": 2020
  },
  "objectDimensionReference": {
    "code": "100",
    "fiscalYear": 2020
  },
  "accountName": "Salaries",
  "accountTypeDescriptor": "uri://state-agency-example.edu#Expense",
  "reportingTags": [
    { "reportingTagDescriptor": "uri://state-agency-example.edu#ESSA" },
    { "reportingTagDescriptor": "uri://state-agency-example.edu#Statewide-Report-Fall-2020" }
  ]
}
```

In this example, the SEA has reflected the dimensions in
the `accountIdentifier` (10-100-120000). But, the API doesn't require or enforce
that pattern, so SEAs may use any identification scheme that works for their
environment.

### Mapping Local Accounts to SEA Chart of Account Entries

In most state education systems, the SEA will issue an authoritative chart of
accounts. Local education agencies and charter management organizations are
required to map their local accounts to the SEA chart of accounts. Local
accounts are often finer-grained classifications within the SEA accounts, but
may also be additive. In addition, the SEA often has accounts that are not used
at the local level. The LEAs and CMOs are typically responsible for mapping
local accounts to the authoritative SEA chart of accounts. In the Finance API,
this is done through the `/localAccount` endpoint.

Building on the example above, the following listing shows a hypothetical school
district's mapping to an SEA's account for teacher salaries. In this example,
the LEA is mapping its fine-grained account for Language Arts - Literature
teacher salaries to the SEA's more general account for regular curriculum
teacher salaries.

```json
{
  "id": "336108d6468f43408388221bde5c639c",
  "accountIdentifier": "LEA16-10-100-122300",
  "chartOfAccountReference": {
    "accountIdentifier": "10-100-120000",
    "educationOrganizationId": 1,
    "fiscalYear": 2020
  },
  "educationOrganizationReference": {
    "educationOrganizationId": 16
  },
  "accountName": "Regular Curriculum - Language Arts - Literature",
  "reportingTags": [
    { "reportingTagDescriptor": "uri://state-agency-example.edu#LEA-Superintendent-Report" }
  ]
}
```

Items of note from this example:

* Similar to the SEA example, this LEA has reflected its account dimensions in
    the `accountIdentifier`, prefixed by an identifier for the district
    (LEA16-10-100-122300). Same deal as the SEA: the API doesn't require or
    enforce any particular pattern, it's up to the SEA and its LEAs to define a
    convention that works best for their environment.
* Platforms implementing this API (including the Ed-Fi ODS / API) will require
    a valid chartOfAccountReference from the LEA. This ensures every LEA account
    maps to exactly one SEA account.
