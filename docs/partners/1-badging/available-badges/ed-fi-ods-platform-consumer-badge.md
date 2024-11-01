# Ed-Fi ODS Platform Consumer Badge

![Ed-Fi ODS Platform Consumer Badge](/img/partners/badging/ed-fi-ods-platform-badge.png)

This badge is for products that interact or use the data from the Ed-Fi ODS
platform, but access is not via API. Products using an Ed-Fi API to source data
should apply for the [Ed-Fi API Consumer
Badge](./ed-fi-api-consumer-badge.md)

## Requirements

To be awarded this badge, a product must be able to consume data from the Ed-Fi
ODS platform via standard platform access points.

The integration of the data must be such that it clearly provides significant
additional value to the product end users, and the implementation verification
submitted by the badge applicant must validate this utility.

Standard access points include direct database access only if the product offers
an on-premise or other install that can be run within the local IT context of
the organization (e.g. Docker). "Local IT context" in this case means on-premise
systems or systems entirely under the contract and control of the agency;
Software-as-a-service offerings would not qualify. The implementation
verifications showing direct database access must be from field work that all
occurs within this local IT context.

These safeguards are there to clarify that the Alliance and its community
strongly discourage the practice of direct database between systems via
"tunneling" through IT firewalls across organizational boundaries in order to
share data. Student data requires greater safeguards than is commonly in use in
these situations. Software-as-a-service and similar providers are encouraged to
look at API -based exchange as a safer way to exchange data, and consider the
Ed-Fi API Consumer Badge or an applicable Ed-Fi certification.
