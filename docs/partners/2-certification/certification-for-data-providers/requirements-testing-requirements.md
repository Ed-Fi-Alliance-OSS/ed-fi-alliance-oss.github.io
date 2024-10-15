# Requirements - Testing Requirements

The Ed-Fi standards have as their goal the capture and exchange of deep
semantics in K–12 data via efficient processes that do not overburden K–12
teachers, staff, or other stakeholders, nor lead to overly complex school IT
systems. These factors place a high bar on acceptable product behavior. The
following criteria are used to determine if a test case passes.

## I. Process

### a. No Use of Real Student or User Data

Data submitted in testing MUST be entirely fictional, and there MUST be no risk
at all of exposure of real student data during certification. Anonymized or
obfuscated personal data is also not permitted. Publicly available data sets —
such as course catalogs, lists of standard code values, published learning
standards, and so forth — are permitted.

As part of the certification test suite, the Ed-Fi Alliance may provide sample
data. However it is not a requirement that the exact sample data provided is
used, as sometimes the sample data won't work in a particular system. It is
RECOMMENDED that sample data be used when it is provided, as that helps ensure
no use of real student data and it can also assist in efficient verification of
results.

* _Example: sample test data for a test has for a "title" field of 50
  characters, but the source system only allows 25 characters max. In this case,
  an alternate shorter title MAY be used._

### b. Policy Exceptions

If a product is prevented by government policy from transmitting or otherwise
making available a data element or set of data elements and that policy covers
all of the jurisdictions in which the product is offered, the Alliance may at
its discretion waive a testing requirement. The applying product must provide
documentation evidence of these restrictions.

In the event that the number of limitations or exclusions is large enough or of
such a nature to result in the inability of the applying product to meet the
core use cases covered under the certification, the Alliance may at its
discretion determine that the product is not a candidate for the certification.

## II. Data Semantics

### a. Semantics Must be Preserved in the Serialization to Ed-Fi Formats

Among other factors involved in data exchange, Ed-Fi certifications test that
systems can correctly represent their data in Ed-Fi format, and in so doing
accurately translate local semantics into Ed-Fi data semantics. If semantics are
not preserved, the test is not considered to have passed.

* Datatype transitions are fine as long as the values map according to customary
  mapping logic (e.g., the number 101 becomes represented as the string "101").
* In rare circumstances, a mapping may not be easy due to datatype difference, a
  field length difference, or other issue (e.g., a "description" field with a 2K
  character limit maps to an Ed-Fi field of 256 characters). In such cases if
  the product can demonstrate a reasonable approach, the serialization will be
  accepted.

### b. Available Semantics Must be Provided During Serialization

Serialization to Ed-Fi formats MUST NOT omit or reduce the semantics of the API
resource if those semantics are available in the source system.

* _Example: a SIS system submitting a course transcript data would not be
  allowed to submit all course transcript records as year-long courses, if the
  actual records in the SIS were based on either a term or year-long basis.
  However, if the SIS happened to record all course transcript records as being
  for year-long courses, then this would be acceptable. (This is unlikely of
  course, but it illustrates the principle.)_

### c. Allowed Use of Default Values

In some cases, a particular field required for an Ed-Fi API resource might not
be available in the source system. In such cases, if:

1. There is a default value that accurately preserves the semantics of the
   source systems use case and that maps logically to the Ed-Fi definition, and
2. The source system does not have the full semantics of the Ed-Fi model
   available

Then a default value may be supplied instead.

* _Example: a student information system does not track a staff phone number
  classification (i.e., if a number is a "work" or "home" phone number) but
  Ed-Fi requires this. In this case, it would be acceptable for a system to mark
  that all numbers are "work" numbers if the system regards them as such. Note
  in this example that if the phone number classification is available in the
  source system, it is not acceptable to ignore its type and send a default (see
  rules "discarding semantics")._

### d. Allowed Use of Duplication of Data for Multiple Fields

In some cases, a system may be able to use the same data from one field (or set
of fields) in the source system to supply two or more fields in an Ed-Fi API
resources. This is allowed if the mapping to both values reasonably preserves
the semantics of the Ed-Fi field definition.

* _Example: a student information system only has a single value for a school
  name. That single value is mapped to Ed-Fi API resource
  school.nameOfInsitution and schoolsShortNameOfInstitution._

Similarly, it is also acceptable to infer values from other entities if there is
a logical reason for doing so.

* _Example: a SIS does not track addresses for a student, but derives that data
  from an associated parent record. That address record can serve for both
  parent and student._

### e. Use of Ed-Fi Governed Enumerations

The Alliance recommendation is to source descriptor values from the list
governed by the project’s reporting context and place them in a namespace that
accurately captures that governing organization. Descriptor values shown in the
certification’s test scenarios use the Ed-Fi namespace for informational
purposes. Descriptor namespace should clearly indicate the organization that
governs the value.

## III. API and Transport

### a. POST or PUT are Both Permitted for API Resource Updates

Unless a specification or the certification states otherwise, API tests are
ambivalent if updates to API resources occur through HTTP POST or PUT
operations. In addition, unless the specific certification requirements states
otherwise, there is no requirement that PUT be implemented for API clients if
POST is employed for that purpose.

### b. Source System Updates Must Result in Update Operations to API Resources

For API clients, an update to a field that maps to an Ed-Fi API resource —
whether it maps 1:1 or as part of an aggregate via business logic (e.g., a
"course credit" field that becomes part of a GPA calculation) — MUST trigger an
API resource update. Said differently, the source system MUST maintain an
accurate mapping of all semantics on the target system.

* It is permitted for systems to wait to update the resource (i.e., the update
  does not have to occur immediately, so as to allow for batching or similar
  strategies), but the system MUST demonstrate that the update will occur
  without further user intervention.

### c. Update of Fixed Fields or Entities

In some cases, certification tests might call for updates to fields that are
"fixed" _–_ they can't be updated in the source system due to a system
constraint (e.g., the field is a calculated value in that system, or the field
is a surrogate key). In such cases, an alternative test that updates other
fields can be provided. Systems MUST in any case demonstrate the ability to
update the API resource.

* Non-update-able resources. In rare cases, there may be no possible updates to
  a resource if all fields in the resource are fixed. In such cases, if the
  entity is truly non-editable in the source system, the entity is considered to
  pass the update test. Note that calculated values are not considered "fixed."
* Calculated fields are acceptable: test cases should not be seen as implying
  that calculated fields in source systems be directly editable. In such cases,
  the testee will be asked to make a change that updates the calculation, and
  that update MUST trigger an API resource update as well.

## IV. System Provision of Data Exchange Functionality

---

### a. Approach to Configurable System Behavior

To the extent possible, certification MUST test the "out of the box" system
functionality. However, many products introduce configuration options. If there
is no "out of the box" default configuration, the certification will test the
most common configuration options (those opted for by 80% of the market) opted
for by product customers and as reported by the product vendor.

* If there are too many configuration options for such testing to be efficient,
  the Alliance may use a sampling strategy.
* If configuration is optional and/or involves non-routine operations (generally
  operations not available to product users, as code customization) such
  configuration is outside the scope of certification testing and will not be
  tested.

### b. Data Exchange Functionality Must be Available to Normal Product Users via Routine Functions

It is not permitted to force product users to engage in non-routine actions,
such as direct database editing, running of external scripts or binaries, or
leaving the product in order for API activity to take place.

* Products MAY have built special non-routine-use tools to accelerate synching
  for development or other user purposes (e.g., a "sync now" button). Such tools
  are acceptable to use during certification as long as prior tests establish
  that routine operations also work.
* It is acceptable for elements that are part of a system setup operations to
  require some kind of non-routine operation or configuration for initial
  creation. However, once created, such elements MUST be updated via routine
  processes.
* _Example: adding a StateEducationAgency or LocalEducationAgency in a SIS
  requires modifying a configuration file for initial setup, and therefore for
  data synchronization via API. However, updates to these entities, once
  created, happen transactionally._

Please note that this does not include installation of data exchange
functionality: such a process may require interventions of information
technology staff or others.
