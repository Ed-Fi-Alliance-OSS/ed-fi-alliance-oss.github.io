# Advisory: Swagger UI XSS Vulnerability

11 August 2022

Online documentation for the Ed-Fi ODS / API is provided through Swagger UI,
which is a visual and interactive documentation application providing detailed
descriptions for each resource as well as a simple way to test calls to the API
in sandbox environments. Ed-Fi has recommended not using swagger documentation
in production.

## Vulnerability

Some versions of Swagger UI (< 3.38.0) used by released versions of Ed-Fi
ODS/API are vulnerable to cross-site scripting (XSS). The vulnerability comes
from an outdated library (DOMPurify, used by swagger UI for input
sanitization)combined with features of swagger UI that allows a URL parameter
for displaying remote OpenAPI specifications.

This vulnerability could allow a remote attacker to execute malicious JavaScript
on a user’s Web browser and could open a vector for general XSS attacks that
could possibly expose sensitive information such as API key/secret or change the
appearance or behavior of the hosted Swagger UI deployment. This vulnerability
comes from specific versions of a very common open source application for API
documentation that it is used by many organizations outside of K12 and the Ed-Fi
community.

To successfully exploit this vulnerability, the user must be tricked into
following a specially crafted link that executes arbitrary HTML / script in
user's browser in the context of Swagger UI. Hence, an attack requires a “phish”
and corresponding social engineering to be successful (i.e., the email or other
communication which bears the link likely needs to look credible). If your
organization follows standard security practices, exploiting this vulnerability
will likely be difficult. Nevertheless, the Alliance recommends strongly that
organizations take action to address this issue.

## Affected Ed-Fi Release Versions

All release versions Swagger UI in suite 3 before August 2022.

## Available Fixes

* [Ed-Fi-ODS-Implementation/v5.3-patch3](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/releases/tag/v5.3-patch3)
* [Ed-Fi-ODS-Implementation/v5.2-patch1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/releases/tag/v5.2-patch1)
* [Ed-Fi-ODS-Implementation/v5.1.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/releases/tag/v5.1.1)
* “[cherry
  pick](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/481/commits/6e6dfad3ad8183a6fde9d1dea49c03234f27e694)”
  of the changes

## Remediation  

* If a fix is available for your deployment version, apply the provided fixes.
* If a fix is not available, swagger documentation deployed in production
  environment should be disabled/uninstalled. Other alternatives to providing
  documentation include using the Ed-Fi sandbox, SDK generated from API
  metadata, or use of static documentation.
* Refresh key/secrets if swagger documentation was deployed in production or if
  you suspect swagger was deployed in staging and staging databases were then
  promoted to production.  

### **Resources**

* [Hacking Swagger-UI - from XSS to account
  takeovers](https://www.vidocsecurity.com/blog/hacking-swagger-ui-from-xss-to-account-takeovers/)  
* [SwaggerUI url parameter
  advisory](https://github.com/swagger-api/swagger-ui/security/advisories/GHSA-qrmm-w75w-3wpx)
