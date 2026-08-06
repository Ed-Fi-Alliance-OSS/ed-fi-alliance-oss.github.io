# Domain Certification API v5 - Finance

The Finance domain represents financial information captured in accounts
(both budgeted and actual amounts) that link programs, staff, or classes for
funding purposes. Core to the Finance model is the `ChartOfAccount` entity,
which represents an organization's chart of accounts, built from a set of
NCES accounting dimensions.

Certifying against this domain requires successfully exercising CRUD
operations on the core Finance resources. Before those resources can be
created, the API data store must already contain the descriptor values and
reference entities they depend on. The steps below are grouped into phases so
that each phase only depends on data created in an earlier phase — following
them in order will satisfy every dependency the core Finance resources
require.

:::tip
See the Data Standard's [Finance Domain -
Overview](/reference/data-exchange/data-standard/5/model-reference/finance-domain/overview),
[Finance Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/finance-domain/entities-references-and-descriptors),
and [Finance Domain - Best
Practices](/reference/data-exchange/data-standard/5/model-reference/finance-domain/best-practices)
for the conceptual model behind these steps.
:::

## Dependency Order

| Phase | Entity / Descriptor | Resource Endpoint | Depends On |
| --- | --- | --- | --- |
| 1 | EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | None |
| 1 | LocalEducationAgencyCategoryDescriptor | `/localEducationAgencyCategoryDescriptors` | None |
| 1 | AccountTypeDescriptor | `/accountTypeDescriptors` | None |
| 1 | ReportingTagDescriptor | `/reportingTagDescriptors` | None |
| 1 | FinancialCollectionDescriptor | `/financialCollectionDescriptors` | None |
| 2 | LocalEducationAgency | `/localEducationAgencies` | Phase 1 |
| 2 | Staff | `/staffs` | None |
| 3 | Accounting Dimensions (8 resources) | `/fundDimensions`, `/programDimensions`, `/functionDimensions`, `/objectDimensions`, `/projectDimensions`, `/operationalUnitDimensions`, `/sourceDimensions`, `/balanceSheetDimensions` | Phase 1 (ReportingTagDescriptor, optional) |
| 4 | ChartOfAccount | `/chartOfAccounts` | Phases 1-3 |
| 5 | LocalAccount | `/localAccounts` | Phases 2, 4 |
| 6 | LocalBudget, LocalActual, LocalEncumbrance | `/localBudgets`, `/localActuals`, `/localEncumbrances` | Phase 5 |
| 6 | LocalContractedStaff, LocalPayroll | `/localContractedStaffs`, `/localPayrolls` | Phases 2, 5 |

## Phase 1: Descriptors

Five descriptors are needed before the core Finance entities can be created.
Each descriptor resource shares the same required-field shape.

### Required Fields (all descriptors below)

| Field | Type | Description |
| --- | --- | --- |
| `codeValue` | string | A code or abbreviation that is used to refer to the descriptor. |
| `namespace` | string | A globally unique namespace that identifies this descriptor set. |
| `shortDescription` | string | A shortened description for the descriptor. |

| Descriptor | Resource Endpoint | Used By |
| --- | --- | --- |
| EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | `LocalEducationAgency.categories` |
| LocalEducationAgencyCategoryDescriptor | `/localEducationAgencyCategoryDescriptors` | `LocalEducationAgency.localEducationAgencyCategoryDescriptor` |
| AccountTypeDescriptor | `/accountTypeDescriptors` | `ChartOfAccount.accountTypeDescriptor` |
| ReportingTagDescriptor | `/reportingTagDescriptors` | Optional `reportingTags[]` on dimensions, `ChartOfAccount`, and `LocalAccount` |
| FinancialCollectionDescriptor | `/financialCollectionDescriptors` | Optional `financialCollectionDescriptor` on `LocalBudget`, `LocalActual`, `LocalEncumbrance`, `LocalContractedStaff`, `LocalPayroll` |

Each descriptor resource also supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Example: AccountTypeDescriptor

```json
{
  "codeValue": "Expense",
  "namespace": "uri://ed-fi.org/AccountTypeDescriptor",
  "shortDescription": "Expense"
}
```

## Phase 2: LocalEducationAgency and Staff

`ChartOfAccount` and `LocalAccount` both require an `educationOrganizationReference`.
`EducationOrganization` is an abstract type with no CRUD endpoint of its own,
so a concrete education organization must be created — `LocalEducationAgency`
is the natural fit for Finance, since the domain's primary use case is SEA-to-LEA
financial reporting. `Staff` is only required later, for `LocalContractedStaff`
and `LocalPayroll`.

### LocalEducationAgency

Resource: `localEducationAgencies`

- `POST /localEducationAgencies`
- `GET /localEducationAgencies`
- `GET /localEducationAgencies/{id}`
- `PUT /localEducationAgencies/{id}`
- `DELETE /localEducationAgencies/{id}`
- `GET /localEducationAgencies/deletes`
- `GET /localEducationAgencies/keyChanges`
- `GET /localEducationAgencies/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `localEducationAgencyId` | integer | The identifier assigned to a local education agency. |
| `nameOfInstitution` | string | The full, legally accepted name of the institution. |
| `localEducationAgencyCategoryDescriptor` | string | Reference to a `LocalEducationAgencyCategoryDescriptor` created in Phase 1. |
| `categories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

#### Example

```json
{
  "localEducationAgencyId": 255901,
  "nameOfInstitution": "Grand Bend School District",
  "localEducationAgencyCategoryDescriptor": "uri://ed-fi.org/LocalEducationAgencyCategoryDescriptor#Independent",
  "categories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#Local Education Agency" }
  ]
}
```

### Staff

Resource: `staffs`

- `POST /staffs`
- `GET /staffs`
- `GET /staffs/{id}`
- `PUT /staffs/{id}`
- `DELETE /staffs/{id}`
- `GET /staffs/deletes`
- `GET /staffs/keyChanges`
- `GET /staffs/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `staffUniqueId` | string | A unique alphanumeric code assigned to a staff member. |
| `firstName` | string | The staff member's first name. |
| `lastSurname` | string | The staff member's last name. |

#### Example

```json
{
  "staffUniqueId": "603201",
  "firstName": "Jane",
  "lastSurname": "Doe"
}
```

## Phase 3: Accounting Dimensions

`ChartOfAccount` links to up to eight NCES accounting dimension entities.
None of the dimension entities are required by the `ChartOfAccount` schema
itself, but a Chart of Accounts is not meaningful without them, and every
dimension entity shares the identical required-field shape.

| Dimension | Resource Endpoint |
| --- | --- |
| FundDimension | `/fundDimensions` |
| ProgramDimension | `/programDimensions` |
| FunctionDimension | `/functionDimensions` |
| ObjectDimension | `/objectDimensions` |
| ProjectDimension | `/projectDimensions` |
| OperationalUnitDimension | `/operationalUnitDimensions` |
| SourceDimension | `/sourceDimensions` |
| BalanceSheetDimension | `/balanceSheetDimensions` |

Each of the above resources supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Required Fields (all dimensions above)

| Field | Type | Description |
| --- | --- | --- |
| `code` | string | The code representation of the dimension (e.g., `10` for a Fund, `120000` for a Function). |
| `fiscalYear` | integer (2020-2040) | The fiscal year for which the dimension code is valid. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `codeName` | string | A description of the dimension code. |
| `reportingTags[].reportingTagDescriptor` | string | Reference to a `ReportingTagDescriptor` created in Phase 1. |

### Example: FundDimension

```json
{
  "code": "10",
  "fiscalYear": 2020,
  "codeName": "Instructional Fund"
}
```

### Example: FunctionDimension

```json
{
  "code": "120000",
  "fiscalYear": 2020,
  "codeName": "Regular Curriculum"
}
```

## Phase 4: ChartOfAccount

`ChartOfAccount` ties an account identifier to the `LocalEducationAgency`
from Phase 2, an `AccountTypeDescriptor` from Phase 1, and (optionally) the
dimension entities from Phase 3.

Resource: `chartOfAccounts`

- `POST /chartOfAccounts`
- `GET /chartOfAccounts`
- `GET /chartOfAccounts/{id}`
- `PUT /chartOfAccounts/{id}`
- `DELETE /chartOfAccounts/{id}`
- `GET /chartOfAccounts/deletes`
- `GET /chartOfAccounts/keyChanges`
- `GET /chartOfAccounts/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountIdentifier` | string | Code value for the valid combination of account dimensions under which financials are reported. |
| `fiscalYear` | integer (2020-2040) | The fiscal year for the account. |
| `accountTypeDescriptor` | string | Reference to an `AccountTypeDescriptor` created in Phase 1. |
| `educationOrganizationReference.educationOrganizationId` | integer | Reference to the `LocalEducationAgency` created in Phase 2. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountName` | string | A descriptive name for the account. |
| `fundDimensionReference` | object | Reference to a `FundDimension` created in Phase 3 (`code` + `fiscalYear`). |
| `functionDimensionReference` | object | Reference to a `FunctionDimension` created in Phase 3. |
| `objectDimensionReference` | object | Reference to an `ObjectDimension` created in Phase 3. |
| `programDimensionReference` | object | Reference to a `ProgramDimension` created in Phase 3. |
| `projectDimensionReference` | object | Reference to a `ProjectDimension` created in Phase 3. |
| `operationalUnitDimensionReference` | object | Reference to an `OperationalUnitDimension` created in Phase 3. |
| `sourceDimensionReference` | object | Reference to a `SourceDimension` created in Phase 3. |
| `balanceSheetDimensionReference` | object | Reference to a `BalanceSheetDimension` created in Phase 3. |
| `reportingTags[].reportingTagDescriptor` | string | Reference to a `ReportingTagDescriptor` created in Phase 1. |

### Example

```json
{
  "accountIdentifier": "10-100-120000",
  "fiscalYear": 2020,
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "accountTypeDescriptor": "uri://ed-fi.org/AccountTypeDescriptor#Expense",
  "accountName": "Salaries",
  "fundDimensionReference": { "code": "10", "fiscalYear": 2020 },
  "objectDimensionReference": { "code": "100", "fiscalYear": 2020 },
  "functionDimensionReference": { "code": "120000", "fiscalYear": 2020 }
}
```

## Phase 5: LocalAccount

`LocalAccount` maps a local (LEA-level) account to the `ChartOfAccount`
entry created in Phase 4. `LocalBudget`, `LocalActual`, `LocalEncumbrance`,
`LocalContractedStaff`, and `LocalPayroll` all post their amounts against a
`LocalAccount`, not directly against a `ChartOfAccount`.

Resource: `localAccounts`

- `POST /localAccounts`
- `GET /localAccounts`
- `GET /localAccounts/{id}`
- `PUT /localAccounts/{id}`
- `DELETE /localAccounts/{id}`
- `GET /localAccounts/deletes`
- `GET /localAccounts/keyChanges`
- `GET /localAccounts/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountIdentifier` | string | Code value for the valid combination of account dimensions by LEA under which financials are reported. |
| `fiscalYear` | integer (2020-2040) | The fiscal year for the account. |
| `chartOfAccountReference` | object | Reference to the `ChartOfAccount` created in Phase 4 (`accountIdentifier` + `educationOrganizationId` + `fiscalYear`). |
| `educationOrganizationReference.educationOrganizationId` | integer | Reference to the `LocalEducationAgency` created in Phase 2. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountName` | string | A descriptive name for the account. |
| `reportingTags[].reportingTagDescriptor` | string | Reference to a `ReportingTagDescriptor` created in Phase 1. |

### Example

```json
{
  "accountIdentifier": "LEA16-10-100-122300",
  "fiscalYear": 2020,
  "chartOfAccountReference": {
    "accountIdentifier": "10-100-120000",
    "educationOrganizationId": 255901,
    "fiscalYear": 2020
  },
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "accountName": "Regular Curriculum - Language Arts - Literature"
}
```

## Phase 6: Financial Transactions

With a `LocalAccount` in place, the five transaction-level resources can be
created. `LocalBudget`, `LocalActual`, and `LocalEncumbrance` share an
identical shape. `LocalContractedStaff` and `LocalPayroll` add a required
`staffReference` to the `Staff` entity created in Phase 2.

| Entity | Resource Endpoint | Additional Dependency |
| --- | --- | --- |
| LocalBudget | `/localBudgets` | None beyond `LocalAccount` |
| LocalActual | `/localActuals` | None beyond `LocalAccount` |
| LocalEncumbrance | `/localEncumbrances` | None beyond `LocalAccount` |
| LocalContractedStaff | `/localContractedStaffs` | `Staff` (Phase 2) |
| LocalPayroll | `/localPayrolls` | `Staff` (Phase 2) |

Each of the above resources supports the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

### Required Fields (LocalBudget, LocalActual, LocalEncumbrance)

| Field | Type | Description |
| --- | --- | --- |
| `asOfDate` | string (date) | The date of the reported amount for the account. |
| `amount` | number | Current balance for the account. |
| `localAccountReference` | object | Reference to the `LocalAccount` created in Phase 5 (`accountIdentifier` + `educationOrganizationId` + `fiscalYear`). |

### Required Fields (LocalContractedStaff, LocalPayroll)

| Field | Type | Description |
| --- | --- | --- |
| `asOfDate` | string (date) | The date of the reported amount for the account. |
| `amount` | number | Current balance for the account. |
| `localAccountReference` | object | Reference to the `LocalAccount` created in Phase 5. |
| `staffReference.staffUniqueId` | string | Reference to the `Staff` created in Phase 2. |

### Commonly Used Optional Fields (all five resources)

| Field | Type | Description |
| --- | --- | --- |
| `financialCollectionDescriptor` | string | Reference to a `FinancialCollectionDescriptor` created in Phase 1; the accounting period or grouping for which the amount is collected. |

### Example: LocalBudget

```json
{
  "asOfDate": "2020-07-01",
  "amount": 250000.00,
  "localAccountReference": {
    "accountIdentifier": "LEA16-10-100-122300",
    "educationOrganizationId": 255901,
    "fiscalYear": 2020
  },
  "financialCollectionDescriptor": "uri://ed-fi.org/FinancialCollectionDescriptor#Annual"
}
```

### Example: LocalPayroll

```json
{
  "asOfDate": "2020-09-30",
  "amount": 4200.00,
  "localAccountReference": {
    "accountIdentifier": "LEA16-10-100-122300",
    "educationOrganizationId": 255901,
    "fiscalYear": 2020
  },
  "staffReference": {
    "staffUniqueId": "603201"
  },
  "financialCollectionDescriptor": "uri://ed-fi.org/FinancialCollectionDescriptor#Monthly"
}
```

## Related Entities (Not Required for Finance CRUD)

The Data Standard's [Finance Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/finance-domain/entities-references-and-descriptors)
page lists `EducationOrganization` as an extended reference, which is
satisfied above via the concrete `LocalEducationAgency` type. `Staff` is
listed as an extended reference but is a genuine, schema-required dependency
for `LocalContractedStaff` and `LocalPayroll`, so it is included as a full
step (Phase 2) above rather than called out as unused.
