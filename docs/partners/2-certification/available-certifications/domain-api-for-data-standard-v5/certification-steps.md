# Domain API Certification for Data Standard v5 - Steps

There are 13 steps to completing certification: 8 documentation steps (completed
prior to certification) and 6 tests that MUST be completed.

Note that not all steps are required for all products, as some tests are
optional or only apply to products with certain features. Please consult the
details below each step below for details.

## I. Pre-Certification Documentation

The following documentation must be received by the Ed-Fi Alliance prior to
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
The usage narrative is a short narrative text account of how the data
exchange functionality is made available to product users. This information will
be part of the certification registry entry. This SHOULD be fewer than 1000
words and can be provided in any common text format (MS Word, .txt file, etc.).
</details>

### 5\. Domain Report Template(s)

<details>
<summary>View detail...</summary>
One or more report templates that are currently used by the Ed-Fi API host to
provide that domain information to end users of the certifying system.

The domain specific report template(s):

* MUST cover all of the elements listed in step 2 above
* MUST be in wide use by the vendor currently _–_ the vendor MAY choose which to
  use if there are different options or variations
* MUST be clearly marked to show elements that are not included in the Ed-Fi
  based API integration (e.g., elements not included in a visual picture could
  be surrounded by a red box and marked "not included")
* Per certification processes generally, these report templates MUST NOT contain
  any real student data

* MUST be provided as PDF files

The domain templates are used to validate that data semantics are preserved and
report elements are mapped to the proper Ed-Fi domain counterparts.

</details>

### 6\. Fictitious Test Data for 100 to 500 Students

<details>
<summary>View detail...</summary>

Test data is a spreadsheet of the exact sample data that will be used in the
certification process. The spreadsheet:

* MUST include all data fields from the domain report template(s) submitted as
  part of item 5, above
* MUST include all data fields from the data mapping submitted as part of item
  3, above
* MUST include records for a minimum of 100 students and a maximum of 500
  students
* MUST be 100% fictitious and MUST NOT be obfuscated data or derived from actual
  school data in any way

</details>

### 7\. Custom Enumerations Used by the Vendor in Integrations

<details>
<summary>View detail...</summary>

If present, vendor-specific enumerations MUST be provided in Ed-Fi JSON or XML
format and will be published as part of the certification record. Note that only
certain enumerations are permitted to be
vendor-specific: [Ed-Fi Domain API for Data Standard v5 Certification](../../available-certifications/domain-api-for-data-standard-v5/readme.md)

The JSON MUST follow this format, which can be used to import the values into an
Ed-Fi API:

#### Descriptors JSON

```json
{
  "namespace": "[a namespace for your product, generally in URL or URI format]",
  "codeValue": "[your code value]",
  "description": "[description]",
  "shortDescription": "[short description; e.g for inclusion in a dropdown list]"
}
```

#### Types JSON

```json
{
  "codeValue": "[your code value]",
  "description": "[description]",
  "shortDescription": "[short description; e.g for inclusion in a dropdown list]"
}
```

</details>

## II. Certification Tests

Certification tests test conformance of the product to API specifications and
other normative requirements of the API standard. It also validates the
submitted documentation.

### **9\. User Interaction and Availability Test**

<details>
<summary>View details</summary>

The certifying product will show via screen sharing the methods by which
exchanges are triggered (and those MUST follow the requirements under
[Certification Requirements for Data Providers](../../certification-for-data-providers/readme.md)
and be consistent with the Usage Narrative submitted in step 4, above).

</details>

### 10\. Student Roster Configurability Test

<details>
<summary>View details</summary>

If using a formal, shared rostering specification (e.g., Clever, OneRoster,
Ed-Fi Enrollment API) that allows for multiple student identifiers, the provider
MUST **either**:

a) Demonstrate that the product allows for configuration of which student ID
(from the roster specification) is used when communicating with the Domain's API
implementation. This is REQUIRED even if the student identifiers are optional in
the roster specification, and MUST be done for all roster specifications. The
student ID configuration is limited to the district/SIS student ID and the state
student ID _–_ other IDs are exempt (e.g., a student lunchroom code, a student
Google ID).

b) Demonstrate the ability to roster students via the Ed-Fi Enrollment API or
the Ed-Fi Core Student Data API.

The vendor will show via screen sharing or screen shots evidence of proof that
this is configurable.

:::note

This configuration is **only** REQUIRED for those systems that use a
standardized roster specification where individual students may have multiple
identifiers.

:::

</details>

### **11\. Batch Transmission Test**

<details>
<summary>View detail...</summary>

Using the sample data from step 6, the certifying system will transmit an entire
set of domain metadata and domain sample data.

#### Detailed Steps

1. The vendor will transmit the entire set of metadata and domain sample data to
   the sandbox.

2. The submitted domain report(s) will be used to check for completeness and for
   valid semantics.
   1. All fields from 1.1. that are map-able to the Ed-Fi model must be
      included.
   2. Field meanings must be accurately represented according to the Ed-Fi
      definitions.
3. Ed-Fi will confirm the data landed and matched expectations from the Sample
   Data Spreadsheet provided by the vendor.
4. A full and more detailed analysis of the data will be conducted
   asynchronously after the certification session by the Alliance.

Any deviations from the expected data from the sample data spreadsheet or the
vendor-provided domain report(s) will be documented. Ed-Fi will notify the
vendor of these deviations and request either updates to or additional
clarification of the submitted documentation.

Note that in this step, Ed-Fi is also verifying that data definition semantics
are reasonably preserved in the mapping from provider formats to Ed-Fi formats.

</details>

### 12\. Synchronization Recovery Test

<details>
<summary>View detail...</summary>

To simulate the need to re-sync data in the event of an indeterminate error,
several domain results will be deleted from the previously transmitted results.
The product will be asked to re-submit the same records to ensure that those
records appear.

</details>

#### Detailed Steps

1. Ed-Fi Alliance will delete several records randomly.
2. The certifying product will re-submit the same metadata and sample data to
   the sandbox.
3. Ed-Fi Alliance will confirm the deleted records have reappeared in the
   sandbox.

### **13\. Provider Data Update Test**

<details>
<summary>View detail...</summary>

A change will be made to a set of records on the certifying product side and the
product must show the capability to re-send the data so as to update the values
of the API resources.

</details>

#### Detailed Steps

1. Certifying product will be asked to update several sample data records.
2. Ed-Fi Alliance will confirm the updated record in the sandbox.

### 14\. Error Handling Verification Test

<details>
<summary>View detail...</summary>

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

#### Detailed Steps

1. Create an error in the domain's sample data.
2. Attempt to POST or PUT the updated value to the sandbox.
3. Provide a quick overview of how the error is surfaced to the user.
4. Correct the error and re-submit.
5. Data submission is confirmed by the Ed-Fi Alliance.

## III. Certification Completion

Upon completion, the Alliance will record the certification in
the [Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx).
The certification record will contain all documentation submitted from 1.1 to
1.6 above. This data is intended to allow potential users of the certified
functionality to understand the important features of the integration that are
available.

Certifications are valid for one year. Please review the
[Requirements for Recertification](https://edfi.atlassian.net/wiki/spaces/EDFICERT/pages/23695777/Requirements+-+Recertification).
