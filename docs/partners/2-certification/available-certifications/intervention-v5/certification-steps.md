# Intervention API Certification for Data Standard v5 - Steps

:::info

This certification is a draft and is under community review. Requirements may
change before the certification takes effect. Send feedback to
[certification@ed-fi.org](mailto:certification@ed-fi.org).

:::

There are 15 steps to completing certification: 7 documentation steps
(completed prior to certification) and 8 tests that MUST be completed.

Note that not all steps are required for all products, as some tests are
optional or only apply to products with certain features. Please consult the
details below each step for details.

See [Ed-Fi Intervention API for Data Standard v5 Certification](./readme.md) for
the scope of the certification, the required resources, and the required
fields.

## I. Pre-Certification Documentation

The following documentation must be received by the Ed-Fi Alliance prior to
certification. Ed-Fi may ask for clarifications or changes in order to ensure
clarity and uniformity.

### 1. Product Availability & Pricing Information

See [Requirements - Product Availability Information](../../certification-for-data-providers/product-availability-information.md)\
See [Requirements - Pricing Statement](../../certification-for-data-providers/pricing-statement.md)\
See [Optional - Security Validations](../../certification-for-data-providers/security-validations.md)

### 2. Initial Implementation Verification Information

See [Requirements - Implementation Verification](../../certification-for-data-providers/implementation-verification.md)

### 3. Data Mapping

See [Requirements - Data Mapping](../../certification-for-data-providers/data-mapping.md)

### 4. Usage Narrative

<details>
<summary>View detail...</summary>

The usage narrative is a short narrative text account of how the data exchange
functionality is made available to product users. This information will be part
of the certification registry entry. This SHOULD be fewer than 1000 words and
can be provided in any common text format (MS Word, .txt file, etc.).

</details>

### 5. Intervention Report Template(s)

<details>
<summary>View detail...</summary>

One or more report templates that are currently used by the vendor to provide
intervention information to end users of the certifying system, such as a report
showing the interventions a student is assigned to, the sessions attended, and
the minutes delivered.

The intervention report template(s):

- MUST cover all of the elements listed in step 3 above
- MUST be in wide use by the vendor currently _–_ the vendor MAY choose which to
  use if there are different options or variations
- MUST be clearly marked to show elements that are not included in the Ed-Fi
  based API integration (e.g., elements not included in a visual picture could
  be surrounded by a red box and marked "not included")
- Per certification processes generally, these report templates MUST NOT contain
  any real student data
- MUST be provided as PDF files

The report templates are used to validate that data semantics are preserved and
report elements are mapped to the proper Ed-Fi Intervention domain counterparts.

</details>

### 6. Fictitious Test Data for 100 to 500 Students

<details>
<summary>View detail...</summary>

Test data is a spreadsheet of the exact sample data that will be used in the
certification process. The spreadsheet:

- MUST include all data fields from the report template(s) submitted as part of
  step 5, above
- MUST include all data fields from the data mapping submitted as part of step
  3, above
- MUST include intervention, student intervention assignment, and student
  intervention attendance records sufficient to exercise every scenario in the
  [Test Scenarios](./test-scenarios/readme.md)
- MUST include records for a minimum of 100 students and a maximum of 500
  students
- MUST be 100% fictitious and MUST NOT be obfuscated data or derived from actual
  school data in any way

</details>

### 7. Custom Enumerations Used by the Vendor in Integrations

<details>
<summary>View detail...</summary>

If present, vendor-specific enumerations MUST be provided in Ed-Fi JSON format
and will be published as part of the certification record. Note that only
certain enumerations are permitted to be vendor-specific; see
[Enumerations](./readme.md#enumerations).

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

</details>

## II. Certification Tests

Certification tests test conformance of the product to API specifications and
other normative requirements of the API standard. They also validate the
submitted documentation.

### Sandbox Data

The certification tests are run against an Ed-Fi API sandbox. The Student,
Staff, and EducationOrganization records that the tests reference must exist in
the sandbox, and the vendor has two options for providing them:

- Use the prepopulated sandbox, which already contains Student, Staff, and
  EducationOrganization records. The sample data in step 6 then MUST reference
  those records.
- Push Student, Staff, and EducationOrganization records into the sandbox as
  part of the test. These records MUST be included in the sample data in step 6.

### 8. User Interaction and Availability Test

<details>
<summary>View detail...</summary>

The certifying product will show via screen sharing the methods by which
exchanges are triggered (and those MUST follow the requirements under
[Certification Requirements for Data Providers](../../certification-for-data-providers/readme.md)
and be consistent with the Usage Narrative submitted in step 4, above).

</details>

### 9. Student Roster Configurability Test

<details>
<summary>View detail...</summary>

If using a formal, shared rostering specification (e.g., Clever, OneRoster,
Ed-Fi Enrollment API) that allows for multiple student identifiers, the provider
MUST **either**:

1. Demonstrate that the product allows for configuration of which student ID
   (from the roster specification) is used when communicating with the Ed-Fi API
   implementation. This is REQUIRED even if the student identifiers are optional
   in the roster specification, and MUST be done for all roster specifications.
   The student ID configuration is limited to the district/SIS student ID and
   the state student ID – other IDs are exempt (e.g., a student lunchroom code,
   a student Google ID).
2. Demonstrate the ability to roster students via the Ed-Fi Enrollment API or
   the Ed-Fi Core Student Data API.

The vendor will show via screen sharing or screen shots evidence of proof that
this is configurable.

:::note

This configuration is **only** REQUIRED for those systems that use a
standardized roster specification where individual students may have multiple
identifiers.

:::

</details>

### 10. Transactional Test Cases

<details>
<summary>View detail...</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, the ability to perform the transactional test scenarios listed in
[Intervention API for Data Standard v5 Certification - Test Scenarios](./test-scenarios/readme.md).
This includes creating, updating, and deleting each of the required API
resources.

"Transactionally" means that API resource transactions MUST occur as changes are
made during normal product usage. It is acceptable for a product to batch
updates, but such batches MUST occur such that changes are near-real time.

Note that there are often some questions as to what outcome qualifies as
"passing" a test, when there are significant data model differences, slight
differences in data semantics between systems, use of default values, or other
situations. In such cases, the
[Requirements - Testing Requirements](../../certification-for-data-providers/testing-requirements.md)
document is used to determine the outcome.

Please be aware that actual student data _—_ including anonymized or obfuscated
data derived from real data _—_ MUST NOT be used in certification testing.

</details>

### 11. Batch Transmission Test

<details>
<summary>View detail...</summary>

Batch testing is intended to validate the ability of a system to perform an
initial synchronization with the API, rather than perform transactional
management. In field work, it is common for an agency or vendor to implement an
API surface during the school year when a lot of data already exists in the
system, and the product must then synchronize existing data.

Using the sample data from step 6, the certifying system will transmit an entire
set of intervention definitions, student intervention assignments, and student
intervention attendance events. The batch test only tests the creation of API
resources, and does not include update or delete operations.

Detailed Steps:

1. The vendor will transmit the entire set of intervention data to the sandbox.
2. The submitted intervention report(s) will be used to check for completeness
   and for valid semantics.
   1. All fields from step 3 that are map-able to the Ed-Fi model must be
      included.
   2. Field meanings must be accurately represented according to the Ed-Fi
      definitions.
3. Ed-Fi will confirm the data landed and matched expectations from the Sample
   Data Spreadsheet provided by the vendor.
4. A full and more detailed analysis of the data will be conducted
   asynchronously after the certification session by the Alliance.

Any deviations from the expected data from the sample data spreadsheet or the
vendor-provided intervention report(s) will be documented. Ed-Fi will notify the
vendor of these deviations and request either updates to or additional
clarification of the submitted documentation.

Note that in this step, Ed-Fi is also verifying that data definition semantics
are reasonably preserved in the mapping from provider formats to Ed-Fi formats.

</details>

### 12. Synchronization Recovery Test

<details>
<summary>View detail...</summary>

To simulate the need to re-sync data in the event of an indeterminate error,
several records will be deleted from the previously transmitted results. The
product will be asked to re-submit the same records to ensure that those records
appear.

Detailed Steps:

1. Ed-Fi Alliance will delete a subset of the previously published Intervention,
   StudentInterventionAssociation, and StudentInterventionAttendanceEvent
   records from the sandbox.
2. The certifying product will re-submit the same data to the sandbox, using the
   same identifiers.
3. Ed-Fi Alliance will confirm that the missing records are recreated, that
   relationships remain intact, and that the data remains consistent after
   recovery.

The product passes if it restores the missing intervention data through its
normal synchronization processes. See Scenario 6 in the
[Test Scenarios](./test-scenarios/readme.md).

</details>

### 13. Error Handling Verification Test

<details>
<summary>View detail...</summary>

The provider / API client MUST be able to perform the following actions:

- Capture and log transport errors, including all HTTP errors.
- Re-attempt delivery of API resource updates following failed transmissions.
- In the event that repeated delivery fails for the same resource update,
  surface the error to a system user.

Field work within the Ed-Fi community has revealed that this application
behavior is a necessary condition of system interoperability. Accordingly, the
test scenarios may include situations in which an API resource (or resources)
will be made unavailable to the client, or in which the API reports other errors
due to resource availability (e.g., HTTP 500 error). The client is expected to
be able to successfully handle such situations.

Detailed Steps:

1. Create an error in the intervention sample data.
2. Attempt to POST or PUT the updated value to the sandbox.
3. Provide a quick overview of how the error is surfaced to the user.
4. Correct the error and re-submit.
5. Data submission is confirmed by the Ed-Fi Alliance.

</details>

### 14. Descriptor Configuration Test

<details>
<summary>View detail...</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, that the API client can download descriptors from the API and allow
mapping of local enumeration values (code sets) to those descriptors. This
capability MUST exist in order to allow an API host to customize code
sets/values, and it MUST exist for all descriptors included across all resources
in the API.

</details>

### 15. API Integration Test

<details>
<summary>View detail...</summary>

The provider will show evidence, via a live, synchronous meeting and screen
sharing, how the product integration follows these
[API Integration Best Practices](../../certification-for-data-providers/api-integration-best-practices.md).

</details>

## III. Certification Completion

Upon completion, the Alliance will record the certification in the
[Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx).
The certification record will contain all documentation submitted in steps 1
through 7 above. This data is intended to allow potential users of the certified
functionality to understand the important features of the integration that are
available.

Certifications are valid for one year. Please review the
[Requirements for Recertification](../../certification-for-data-providers/recertification.md).

Please note that remaining
[Requirements - Implementation Verification](../../certification-for-data-providers/implementation-verification.md)
documents must be submitted within the time period described in that document,
in order to retain the certification.
