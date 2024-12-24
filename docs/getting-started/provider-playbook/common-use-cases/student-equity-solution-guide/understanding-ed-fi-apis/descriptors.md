# Descriptors

Controlled vocabularies are common in data modeling and provide a useful way of
classifying data elements. In K–12: states, local education agencies, and other
organizations define standard code sets for concepts such as academic subjects,
languages, behaviors, absence categories, and so on.

In the Ed-Fi Data Model, these enumerations are called **Ed-Fi descriptors**.
Below we describe how descriptors work in Ed-Fi APIs.

## Format and Parts of a Descriptor

The descriptor references are formatted as follows:

```text
uri://[namespace]/[name of descriptor]#[descriptor value]
```

* Valid namespaces can only contain alphanumeric characters and $-\_.+!\*'(),
* Valid descriptor names can only contain alphanumeric characters
* Valid code values can contain any character except '#'

The API provides validation errors for descriptor references that are not in the
correct format.

Namespaces are assigned by platform hosts. Generally speaking, namespaces
identify the originating entity or organization that governs and defines this
particular value. The typical pattern for the namespace is to base it on a
domain name controlled by the organization.

The following are examples from the Ed-Fi Alliance namespace, which includes the
default values in the as-shipped ODS / API:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```

## Descriptors in Transit

In transit, values MUST be sent as-is and MUST NOT be URI or otherwise
encoded. For example, a descriptor whose codeValue has spaces MUST be sent thus:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```

   ...and MUST NOT be sent as:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#English%20Language%20Arts
```

## Descriptor API Resources

Many APIs (including that on the Ed-Fi ODS / API) provide lookup features for
descriptors (see the section on "API Routes"). This allows an API to load and
inspect all possible values for a particular enumeration. The API resource
format for a descriptor has this format:

```json
  {
    "id": "47721c744e566176ad035dc8e119a2fb",
    "codeValue": "English Language Arts",
    "description": "English Language Arts",
    "namespace": "uri://ed-fi.org/AcademicSubjectDescriptor",
    "shortDescription": "English Language Arts"
  }
```

Note that a Resource ID ("id") is provided here, consistent with other Ed-Fi
REST API resources. This lookup also provides the data definition for the
descriptor, via the **description** and **shortDescription** fields.
