# Descriptor References

The Ed-Fi Descriptor pattern allows controlled vocabularies to be customized for
the needs of a particular context. Many commonly used option lists such as
Academic Subject, Grading Period, Language, Term, and so forth are defined by
Descriptors.

All Descriptor references require namespaces to ensure that the semantics of
data messages are clear, even in transit. This also communicates information
about who governs the values being sent for the controlled vocabularies that
make up a particular Descriptor.

The Descriptor references must be formatted as follows:

```text
uri://[namespace]/[name of descriptor]#[descriptor value]
```

* Valid namespaces can only contain alphanumeric characters and `$-\_.+!\*'()`,
* Valid Descriptor names can only contain alphanumeric characters
* Valid code values can contain any character except '#'

The API provides validation errors for Descriptor references that are not in the
correct format.

Namespaces are assigned by platform hosts. Generally speaking, namespaces
identify the originating entity. The following are examples from the Ed-Fi
Alliance namespace, which includes the default values in the as-shipped ODS /
API:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```
