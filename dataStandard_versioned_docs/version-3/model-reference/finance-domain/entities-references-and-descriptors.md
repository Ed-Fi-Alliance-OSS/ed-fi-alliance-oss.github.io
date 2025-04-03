---
sidebar_position: 3
hide_table_of_contents: true
---

# Finance Domain - Entities, References, and Descriptors

## Finance Domain Entities

| Name | Description |
| --- | --- |
| Account | This financial entity represents a funding source combined with its purpose and type of transaction. It provides a formal record of the debits and credits relating to the specific account. |
| AccountCode | This financial entity represents a set of account codes that may be used to define an account. |
| Actual | This financial entity represents the sum of the financial transactions to date relating to a specific account. |
| Budget | This financial entity represents the amount of monies allocated to be spent or received by an education organization as related to a specific account. |
| ContractedStaff | This financial entity represents the sum of the financial transactions to date for contracted staff. ContractedStaff includes "contractors" or "consultants" who perform services for an agreed upon fee, or an employee of a management service contracted to work on site. |
| Payroll | This financial entity represents the sum of the financial transactions to date for employee compensation. An "employee" who performs services under the direction of the employing institution or agency, is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |

## Finance Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| LocalAccount,<br/><br/>ChartOfAccount,<br/><br/>FundDimension,<br/><br/>ProgramDimension,<br/><br/>FunctionDimension,<br/><br/>ObejctDimension,<br/><br/>ProjectDimension,<br/><br/>OperationalUnitDimension,<br/><br/>SourceDimension,<br/><br/>BalanceSheetDimension | ReportingTag | A descriptor used to demote specific state needs for reporting. | Orthodox |     |     |     |
| LocalBudget,<br/><br/>LocalActual,<br/><br/>LocalContractedStaff,<br/><br/>LocalEncumbrance,<br/><br/>LocalPayroll | FinancialCollection | The accounting period or grouping for which the amount is collected. | Flexible |     |     |     |
| ChartOfAccount | AccountType | The type of account used in accounting such as revenue, expenditure, or balance sheet. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
