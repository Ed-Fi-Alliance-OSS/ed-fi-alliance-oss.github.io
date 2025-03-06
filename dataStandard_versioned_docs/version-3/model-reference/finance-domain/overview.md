---
sidebar_position: 1
---


# Finance Domain - Overview

## Key Entities

This domain contains:

* An Account entity to represent funding sources and purposes.
* An AccountCode entity to represent the set of account codes that may be used
    to define an account.
* A Budget entity to represent financial allocations and an Actual entity to
    represent transactions.
* A Payroll entity to model personnel compensation.
* Staff and ContractedStaff entities to model personnel.

## Key Concepts

The key concepts include the following:

* Codes of various classifications (e.g., Object, Function, Fund) specific to
    the EducationOrganization entity for a fiscal year are represented by the
    AccountCode entity.
* This domain is suitable for tracking federal fund allocations and expenses.
* This domain is suitable for tracking staff and contracted staff actuals.
* There are no entities or elements that model ledger information.
