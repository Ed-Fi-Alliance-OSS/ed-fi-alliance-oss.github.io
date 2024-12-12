# Error Handling

Automated data exchange can go wrong for a number of reasons. Some common reasons include:

* Systems or networks are down or unavailable
* An authorization credential was revoked or has gone stale
* A SSL certificate has expired, so a secure/encrypted transaction is unavailable
* Data quality - users have input bad data that doesn't meet the API's requirements
* There is a bug ... somewhere!

...and the list goes on. The point is that things **will** go wrong. How your product handles API conditions is critical.  Check the [Error Handling & Best Practices](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493711) page to learn more about best practices for error handling.
