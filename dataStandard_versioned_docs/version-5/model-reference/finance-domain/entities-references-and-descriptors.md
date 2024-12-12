---
hide_table_of_contents: true
---

# Finance Domain - Entities, References, and Descriptors

## Finance Domain Entities

| Name | Description |
| --- | --- |
| LocalAccount | This financial entity represents the set of account codes defined by an education organization for a fiscal year. It provides a formal record of the debits and credits relating to the specific account. |
| LocalActual | This financial entity represents the set of local education agency or charter management organization expense or revenue amounts. |
| LocalBudget | This financial entity represents the amount of monies allocated to be spent or received by a local education agency or a charter management organization as related to a specific account. |
| LocalEncumbrance | This financial entity represents the amount of monies that are already committed to be spent or received by a local education agency or a charter management organization as related to a specific account. |
| LocalContractedStaff | This financial entity represents the sum of the financial transactions to date for contracted staff. ContractedStaff includes "contractors" or "consultants" who perform services for an agreed upon fee, or an employee of a management service contracted to work on site. |
| LocalPayroll | This financial entity represents the sum of the financial transactions to date for employee compensation. An "employee" who performs services under the direction of the employing institution or agency, is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings. |
| ChartOfAccounts | This financial entity represents a funding category combined with its purpose and type of transaction. It provides a formal way to categorize the debits and credits relating to a specific account. |
| FundDimension | This financial entity is an NCES fund accounting dimension. As per the NCES, a fund represents "a fiscal and accounting entity with a self-balancing set of accounts recording cash and other financial resources." |
| ProgramDimension | This financial entity is an NCES program accounting dimension. As per the NCES, a program is "a plan of activities and procedures designed to accomplish a predetermined objective or set of objectives." |
| FunctionDimension | This financial entity is an NCES function accounting dimension. As per the NCES, a function describes the activity for which a service or material object is acquired. |
| ObjectDimension | This financial entity is an NCES object accounting dimension. As per the NCES, an object is the service or commodity obtained as the result of a specific expenditure, such as salaries, benefits, tuition reimbursement, and so forth. |
| ProjectDimension | This financial entity is an NCES project accounting dimension. As per the NCES, a project dimension reporting code permits school districts to accumulate expenditures to meet a variety of specialized reporting requirements at the local, state, and federal levels. |
| OperationalUnitDimension | This financial entity is an NCES operational unit accounting dimension. As per the NCES, an operational unit dimension is used to segregate costs by school and operational unit such as physical location, department, or other method. |
| SourceDimension | This financial entity is an NCES source dimension. As per the NCES, a source dimension is used to classify revenue, receivables, and other sources of income based on their origins such as taxes, tuition, fees, and so forth. |
| BalanceSheetDimension | This financial entity is an NCES balance sheet accounting dimension. As per the NCES, balance sheet accounts and statement of net position accounts are used to track financial transactions for each fund. |

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
