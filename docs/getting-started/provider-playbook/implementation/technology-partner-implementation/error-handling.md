# Error Handling

Automated data exchange can go wrong for a number of reasons. Some common reasons include:

* Systems or networks are down or unavailable
* An authorization credential was revoked or has gone stale
* A SSL certificate has expired, so a secure/encrypted transaction is unavailable
* Data quality - users have input bad data that doesn't meet the API's requirements
* There is a bug ... somewhere!

...and the list goes on. The point is that things **will** go wrong. How your product handles API conditions is critical. 

## Common Errors

* Especially in year start scenarios, there can be a high volume of errors in certain categories. Consider grouping and or limiting the number of errors visible to the end user. As an example, you may attempt to send records that you are not yet authorized to send, resulting in many thousands of errors during a large batch scenario.
* Make sure errors are logged for data stewards troubleshooting and that they do not get deleted from the logs after the errors are cleared. Allow manual or scheduled log clearing later. Make sure logs do not contain PII as they may be forwarded to an MSP or technical staff for troubleshooting.
* Many errors happen because a relationship between the resource and the education organization has not been formed. As an example, it is common to try and update the student record before the studentSchoolAssociation (or studentEducationOrganizationResponsibilityAssociation) is submitted. Use the dependency order guide (linked above) to determine at what point each CRUD operation is allowed.

Check the [Error Handling & Best Practices](/reference/ods-api/client-developers-guide/error-handling-best-practices) page to learn more about best practices for error handling.
