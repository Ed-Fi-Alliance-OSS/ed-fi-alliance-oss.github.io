# Student Information Systems API for Data Standard v5 Certification - Steps

## I. Pre-Certification Documentation

The following documentation MUST be received by the Ed-Fi Alliance prior to
certification. Ed-Fi may ask for clarifications or changes in order to ensure
clarity and uniformity.

### 1\. Product Availability Information

See [Requirements - Product Availability Information](../../certification-for-data-providers/requirements-product-availability-information.md)

### **2\. Initial Implementation Verification Information**

See [Requirements - Implementation Verification](../../certification-for-data-providers/requirements-implementation-verification.md)

### **3\. Data Mapping**

See [Requirements - Data Mapping](../../certification-for-data-providers/requirements-data-mapping.md)

### 4\. Usage Narrative

<details>
<summary>View detail...</summary>

The usage narrative is a short narrative text account of how the data exchange
functionality is made available to product users. This information will be part
of the certification registry entry. This SHOULD be fewer than 1000 words and
can be provided in any common text format (MS Word, .txt file, etc.).

</details>

## II. Certification Tests

Certification tests test conformance of the product to API specifications and
other normative requirements of the API standard. It also validates the
submitted documentation.

### **5\. Transactional Test Cases**

<details>
<summary>View details</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, the ability to perform the transactional tests listed in
[Student Information Systems API v5 Certification - Test Scenarios#TestScenarios-TransactionalTestCases](./test-scenarios/readme.md)
This includes exercising the individual API resources.

Note that there are often some questions as to what outcome qualifies as
"passing" a test, when there are significant data model differences, slight
differences in data semantics between systems, use of default values, or other
situations. In such cases, the
[Requirements - Testing Requirements](../../certification-for-data-providers/requirements-testing-requirements.md)
document is used to determine the outcome.

Please be aware that actual student data _—_ including anonymized or obfuscated
data derived from real data _—_ MUST NOT be used in certification testing.

</details>

### 6\. Batch Test Cases

<details>
<summary>View details</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, the ability to perform batch updates. See
[Student Information Systems API v5 Certification - Test Scenarios#TestScenarios-BatchTestCases](./test-scenarios/readme.md)
for details.

</details>

### 7\. Error Handling Verification Test

<details>
<summary>View details</summary>

The provider / API client MUST be able to perform the following actions:

* Capture and log transport errors, including all HTTP errors.
* Re-attempt delivery of API resources updates following failed transmissions.
* In the event that repeated delivery fails for the same resource update,
  surface the error to a system user.

Field work within the Ed-Fi community has revealed that this application
behavior is a necessary condition of system interoperability. Accordingly, the
test scenarios may include situations in which an API resource (or resources)
will be made unavailable to the client, or in which the API reports other errors
due to resource availability (e.g., HTTP 500 error). The client is expected to
be able to successfully handle such situations.

</details>

### 8\. Descriptor Configuration Test

<details>
<summary>View details</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, the ability to allow enumeration configuration. See
[Student Information Systems API v5 Certification - Test Scenarios#TestScenarios-EnumerationConfiguration](./test-scenarios/readme.md)
for details.

</details>

## III. Certification Completion

Upon completion, the Alliance will record the certification in
the [Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx)
The certification record will contain all documentation submitted above.

Certifications are valid for one year. Please review the
[Requirements for Recertification](../../certification-for-data-providers/requirements-recertification.md).

Please note that
remaining [Requirements - Implementation Verification](../../certification-for-data-providers/requirements-implementation-verification.md) documents
must be submitted within the time period described in that document, in order to
retain the certification.
