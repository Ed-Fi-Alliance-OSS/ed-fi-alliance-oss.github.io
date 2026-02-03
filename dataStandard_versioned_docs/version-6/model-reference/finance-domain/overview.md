---
sidebar_position: 1
---


# Finance Domain - Overview

## Key Entities

This domain contains:

* A LocalAccount entity that contains a set of account codes defined by an
    education organization for a fiscal year. Provides a formal record of the
    debits and credits relating to the specific account.
* A LocalBudget entity that contains the set of local education agency or
    charter management organization budget amounts.
* A LocalActual entity that contains the set of local education agency or
    charter management organization actual financial result amounts, typically
    based on the accrual basis of accounting.
* A LocalEncumbrance entity that contains the set of local education agency or
    charter management organization encumbrance amounts.
* A Local Payroll entity to model personnel compensation.
* A Staff and a LocalContractedStaff entities to model local personnel.
* A ChartOfAccounts that contains a valid combination of account dimensions
    under which financials are reported. This financial entity represents a
    funding category combined with its purpose and type of transaction. It
    provides a formal way to categorize the debits and credits relating to a
    specific account.
* A FundDimension that is an NCES fund accounting dimension. A fund is defined
    by the NCES as "a fiscal and accounting entity with a self-balancing set of
    accounts recording cash and other financial resources. It also contains all
    related liabilities and residual equities or balances, or changes therein."
* A ProgramDimension that is an NCES program accounting dimension. A program
    is defined by NCES as "a plan of activities and procedures designed to
    accomplish a predetermined objective or set of objectives." These are often
    categorized into broad program areas such as regular education, special
    education, vocational education, other PK-12 instructional, nonpublic
    school, adult and continuing education, community and junior college
    education, community services, and co-curricular or extracurricular
    activities.
* A FunctionDimension that is an NCES function accounting dimension. A
    function is defined by the NCES as describing "the activity for which a
    service or material object is acquired."  The functions of a school district
    are generally classified into five broad areas, including instruction,
    support services, operation of non-instructional services, facilities
    acquisition and construction, and debt service. Functions are typically
    further classified into sub-functions.
* An ObjectDimension that is an NCES object accounting dimension representing
    an expenditure. An object is defined by NCES as  the service or commodity
    obtained as the result of a specific expenditure, such as salaries,
    benefits, tuition reimbursement, and so forth.
* A ProjectDimension that is an NCES project accounting dimension. A project
    dimension reporting code, as per the NCES,  permits school districts to
    accumulate expenditures to meet a variety of specialized reporting
    requirements at the local, state, and federal levels. In the NCES reporting
    scheme, this is typically a three-digit code with the format 00X. The first
    two digits identify the particular funding source, authority, or expenditure
    purpose for which a special record or report is required. The third digit is
    available to identify particular projects and the fiscal year of the
    appropriation within that funding source.
* An OperationalUnitDimension that is an NCES operational unit accounting
    dimension. An operational unit dimension, as per the NCES,  is used to
    segregate costs by school and operational unit such as physical location,
    department, or other method.
* A SourceDimension that is an NCES source dimension. A source dimension, as
    per the NCES, is used to classify revenue, receivables, and other sources of
    income based on their origins such as taxes, tuition, fees, and so forth.
    Revenue increases both the assets and the equity of a local education agency
    or charter management organization as a whole.
* A BalanceSheetDimension that is an NCES balance sheet accounting dimension.
    The NCES definition states that the balance sheet accounts and statement of
    net position accounts are used to track financial transactions for each
    fund. Such financial statements only report assets, deferred outflows of
    resources, liabilities, deferred inflows of resources, and equity accounts.
    The statements are considered "snapshots" of how these accounts stand as of
    a certain point in time.

## Key Concepts

The key concepts include the following:

* The ChartOfAccounts entity forms the backbone for classifying expenditures
    of all types. Each AccountIdentifier element is comprised of a compound
    structure of multiple types of classifications, or dimensions, each with a
    hierarchical code structure. Example dimensions include:
  * The Fund from which monies are being expended
  * The Program that is spending the funds
  * The Function for which the funds are being spent
* The ChartOfAccounts entity holds the set of valid compound account codes,
    each linked to their requisite dimensions' code. The dimension entities
    provide a convenient mechanism for query, reporting, and roll-ups along
    dimensional lines.
* This domain is suitable for SEA use cases that centers on data exchange with
    LEAs related to state and federal finance reporting requirements.
* For CMO, the same general use cases are applicable for charter management
    organizations to receive financial budgets and actuals from the schools in
    their network.
* An LEA without a FinanceAPI at the state level may find the Finance API
    useful for its own purposes. For example, an LEA can load the SEA-defined
    COA into a backing datastore, map its own local account codes, and directly
    generate reports for the SEA. The data exchanged via a Finance API also
    supports an LEA’s analytics and reporting (e.g., to link financial data with
    student outcomes and school operations information).
* This domain is suitable for tracking staff and contracted staff actuals.
