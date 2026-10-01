# EPP_FinancialAidFact

## Purpose

Used to look up financial aid data for a candidate

## SQL Object Name

`analytics.EPP_FinancialAidFact`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| CandidateAidKey | nvarchar​ | Candidate.CandidateIdentifier<br/><br/>FinancialAid.AidDescriptor<br/><br/>FinancialAid.BeginDate | The unique key that describes the aid a candidate has received |
| CandidateKey | nvarchar | Candidate | The unique key that describes a candidate |
| BeginDate | date | FinancialAid | The date the financial aid award was designated, generally for a term or year |
| EndDate | date | FinancialAid | The date the financial aid was removed |
| AidConditionDescription | nvarchar | FinancialAid | The description of the conditions under which the aid was given |
| AidType | nvarchar | FinancialAid | The type of the aid that was awarded (i.e. Scollarship, Grant, Loan) |
| AidAmount | decimal(19,4) | Financial Aid | The amount of the award |
| PellGrantRecipient | bit | FinancialAid | Flag for identifying a candidate as a Pell Grant recipient |
