# Education Agency Business Process Security Considerations

No connected technology solution is without risk. This article provides
essential information for state education agencies and other platform hosts to
understand where risks exist and how to mitigate risks appropriately for their
organization's needs. The target audience is solution architects, developers,
DevOps personnel, and other technical professionals who deploy and host an
instance of the Ed-Fi ODS / API.

## Introduction

In order to support education agencies and other platform hosts in their goal of
data collection and management, the Ed-Fi ODS / API technology has aligned with
a set of core business processes. Some of these processes have been identified
by the Alliance and the security experts with which the Alliance consults as
posing a security concern. In security audit terms, the concerns discussed
herein are classified as posing a moderate or lower level of risk.

The Ed-Fi Alliance takes a security-first approach to design. And, when security
risks are identified, the Alliance addresses them in its technology design and
code. However, in certain, select cases discussed below, the risks are a direct
result of the features that support core business processes. As such, addressing
the risk directly in code or architecture would in turn require fundamental
business process changes by platform hosts.

As such, we present this information with two purposes:

* To ensure platform hosts using the Ed-Fi ODS / API are aware of
  security concerns and to provide information on how to mitigate associated
  risk.
* To invite community discussion of potential improvements to Ed-Fi technology,
  plus the associated systems and business processes in place at education
  agencies and platform hosts.

## District-Declared Student Enrollment

In the as-shipped Ed-Fi ODS / API, any API client (e.g., a district student
information system) with permissions to write to student enrollment records (API
resource `/studentSchoolAssociation`) can claim enrollment of a student. Once a
district client system claims this enrollment, it can read the core student
record, which can include a variety of demographic and contact data.

Note that the capability to read data does not include most data linked to a
student's identity, as most data is scoped to BOTH the student AND the education
organization (generally the district or school). In other words, default
authorization claims will not permit the reading of grade, attendance,
discipline, or similar data because that data would be scoped to a different
education organization.

To exploit this feature, a malicious API client would still need to gain API
credentials from the state or from a district. The most likely scenario is that
a district SIS system exposes its credentials to another system.

In terms of business process, the ODS / API aligns with standard field
practice. Standard practice generally allows districts to authorize client
systems to declare that a given student is registered. So, this concern is not
new to the community or unique to the ODS / API. The ODS / API technology has
rather adapted to this existing business process. It is possible to imagine
business process changes to address this weakness — such as states approving of
enrollments before they occur, or of new enrollments not being allowed for
previously enrolled students — but those options do not seem feasible given the
limited ability of the state to validate the accuracy of district claims.

:::tip

A recommended mitigation is to use standard IP monitoring technologies to look
for connections originating from outside the state or outside of known provider
(e.g., SIS vendor cloud hosting) systems.

:::

## State-Issued Sequential Student IDs

A core principle of the Ed-Fi standards is to support the natural keys to data
records, such as using state-provided student IDs to uniquely identify students,
rather than requiring the use of API-assigned surrogate keys. This practice
enables disparate systems to more easily coordinate, because such keys are
"natural" — that is, they already available in the ecosystem. For example, if
Ed-Fi were to provide a new student ID for each student registered, that new ID
would have to be propagated to all systems with which the API coordinates on a
business process. If every system behaved like this, there would be massive
problems mapping keys and would pose a fundamental obstacle to interoperability.

By itself, the support for natural keys is not a problem. But, security experts
have noted that in many states, student IDs are assigned via sequential
numbering. Because that is the case, it becomes easier for a malicious user or
system to guess new IDs. The ability to guess at identifiers for records
increases risks.

:::tip

The remediation for states or platform hosts would be to use non-sequential IDs.
Such a change would require no changes to Ed-Fi technology to enhance security.

:::

## Data Sanitization

The ODS / API is designed to protect itself from attack. Since it is primarily a
recipient of data from disparate source systems, full data integrity — both in
terms of business rule validation and security — is really in the hands of the
upstream systems. Thus, some data strings that could be malicious in the wrong
context are accepted by the ODS / API platform in the knowledge that the
platform will not itself exploit them. Rather, the solution relies on a trust
that both upstream and downstream systems are also employing best practices when
accepting, rendering, and executing user input.

Having said that, the ODS / API is built with secure coding techniques that
reject many malicious input strings and prevent their execution. But, since ODS
/ API instances are collection-oriented (i.e., they are filled with the
reporting data that districts choose to enter, as with current education agency
"spreadsheet-collection" processes) and since the number of downstream processes
and technologies that data will flow into is almost never clear and also subject
to change, how to remove potentially harmful content such as cross-site
scripting data is not clear.

Attempts to insert such detection into the core technology have — in the
Alliance’s experience — generated large numbers of false positives that cause
problems to collection efforts. These false positives can cause significant
friction to business processes and the stakeholders involved, including SIS
systems, district staff, and state education agency staff.

The appropriate use and implementation of data validation is a core question in
the community today, and this topic will be considered in light of that
discussion.

:::tip

A best practice is for downstream systems and clients to sanitize the data
before displaying or otherwise using it. Further, since those downstream
applications have detailed knowledge of their environments, sanitization can be
applied that considers the best possible exploit options. For example, PHP
applications can sanitize for injection of PHP-based language elements, Web
applications can sanitize for cross-site-scripting, and so forth.

:::

## Lockout Mechanisms

Attackers or a malicious client application may attempt repeatedly to guess at
ODS / API authentication credentials using a brute-force approach. The
as-shipped Ed-Fi ODS / API does not lock out client applications after a number
of failed authentication attempts. This detection is not built into the ODS /
API itself for a few reasons:

* Such detection would have to be highly configurable to be able to
    accommodate local business requirements, and therefore complex to implement
    well.
* Such functionality is available on the market from specialized vendors, and
    is often built into existing cloud-based infrastructure.

:::tip

The Alliance recommends that API deployments configure deployment security
(using firewalls or other security tools) to detect brute-force login attempts.

This recommendation does not preclude also including security against other
types of brute-force attacks such as denial-of-service attacks, brute-force SQL
or SSH attacks, and similar exploits. These concerns are not discussed in detail
here as this documentation is focused on the Ed-Fi ODS / API, but the
remediation for those issues are often related to the authentication lockout
concern noted here.

:::
