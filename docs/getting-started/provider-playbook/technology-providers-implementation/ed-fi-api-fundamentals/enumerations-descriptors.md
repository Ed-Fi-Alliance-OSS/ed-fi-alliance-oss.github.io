# Enumerations (Descriptors)

Controlled vocabularies are common in data modeling and provide a useful way of classifying data elements. These "code sets" are often distributed and managed by state education agencies or local education agencies, and some technology providers have developed highly elaborate sets also in wide use. As such, these classifications often carry deep semantics that are important to those who use the data.

In the Ed-Fi Data Model, enumerations are called **Ed-Fi Descriptors**. Below we describe how they work in Ed-Fi API standards.

## Parts of an Ed-Fi Descriptor

Descriptors have a few different elements that compose them. These parts are:

* **codeValue**: this is the actual enumeration value, and is often the value persisted in a database (but it isn't required to be that).  It is preferred that this be one or more words rather then a numeric code or random string.
* **namespace**: this provides a scope for the value, and refers to the organization who defines the values; best practice is to use a URI-format
* **description**: the full definition for the value
* **shortDescription**: a shorter version of the description, if needed. This is sometimes used to populate a drop-down lists in user-facing interfaces.
* **effectiveBeginDate:** this is the date that the descriptor was first available
* **effectiveEndDate:** this is the date that the descriptor value is retired, if a value has been retired, the client must look for a new value that looks appropriate or communicate with the hosting agency/organization for guidance

## Descriptor References

In transit, when submitted or retrieved as part of an Ed-Fi API resource transaction, only the **codeValue** and the **namespace** are returned. A Descriptor looks like this in the API JSON

```text
uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry
```

Values _must_ be sent as-is and _must not_ be URI or otherwise encoded. For example, a Descriptor whose codeValue has spaces _must_ be sent thus:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```

   ...and _must not_ be sent as

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English%20Language%20Arts
```

## Descriptor API Resources

Many APIs (including that on the Ed-Fi ODS/API) provide lookup features for Descriptors. This allows an API to load and inspect all possible values for a particular enumeration. The API resource format for a Descriptor has this format:

```json
  {
    "id": "47721c744e566176ad035dc8e119a2fb",
    "codeValue": "English Language Arts",
    "description": "English Language Arts",
    "namespace": "uri://ed-fi.org/AcademicSubjectDescriptor",
    "shortDescription": "English Language Arts"
  }
```

Note that a Resource ID ("id") is provided here, consistent with other Ed-Fi REST API resources.

## Ed-Fi, Provider, and Agency Values: What to Expect and What to Use

Interoperability is complex, and enumeration values are part of this complexity. While it seems like the goal should be to coordinate the whole K-12 ecosystem to employ use a single set of values for each core K-12 concept, the reality is that education agencies and technology providers must adapt values to local needs and conditions.

For agencies, such adaptation often reflects important local programs and priorities. Further, use of some sets of values might be mandated by (or reflect) state or local policy. These make adoption of a global set problematic.

For their part, technology providers often have highly refined sets of values that reflect years worth of process and analytic investment.

As a result, users of Ed-Fi APIs should expect to see enumeration sets with mixed namespaces.

### Use Case-Specific Information

Ed-Fi API specifications and certifications capture current community expectations as to what enumeration sets to use. Specifications in use can be found here:

[Ed-Fi Data Exchange Standards Home](https://edfi.atlassian.net/wiki/spaces/EFDS/overview)

Specifications in a "Draft" Request for Comment (RFC) state (which are also commonly found) can be found here:

[Ed-Fi RFC Home](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/overview)

Certifications for these specifications and others are listed here:

[Available Certifications](https://edfi.atlassian.net/wiki/spaces/EDFICERT/pages/23692586/Available+Certifications)

### Example: Assessment Outcomes API

As an example, let's look at the Assessment Outcomes API.

In this API (which is defined in [ED-FI RFC 15 - ASSESSMENT OUTCOMES API](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25362990/ED-FI+RFC+15+-+ASSESSMENT+OUTCOMES+API)), there are no requirements as to what enumeration sets are required. However, in the certification for this API, only certain enumerations are permitted to be tech-provider-supplied and others must be Ed-Fi-governed values.  There are currently three major versions of the Data Standard available so look at these locations for examples:

* [Ed-Fi Assessment Outcomes API for Suite 3 Certification - Ed-Fi Certification - Ed-Fi TechDocs (atlassian.net)](https://edfi.atlassian.net/wiki/spaces/EDFICERT/pages/23697946/Ed-Fi+Assessment+Outcomes+API+for+Suite+3+Certification)
* [Ed-Fi Assessment Outcomes API for Data Standard v4 Certification - Ed-Fi Certification - Ed-Fi TechDocs (atlassian.net)](https://edfi.atlassian.net/wiki/spaces/EDFICERT/pages/23701219/Ed-Fi+Assessment+Outcomes+API+for+Data+Standard+v4+Certification)
* [Ed-Fi Assessment Outcomes API for Data Standard v5 Certification - Ed-Fi Certification - Ed-Fi TechDocs (atlassian.net)](https://edfi.atlassian.net/wiki/spaces/EDFICERT/pages/23702691/Ed-Fi+Assessment+Outcomes+API+for+Data+Standard+v5+Certification)

**This requirement to handle both tech-provider-supplied and Ed-Fi-governed values applies only to products seeking Ed-Fi Certification.** You can implement the specification without this guidance, but a product that does so will not be eligible for Ed-Fi Certification.
