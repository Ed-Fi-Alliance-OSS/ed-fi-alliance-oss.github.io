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

A Descriptor value must exist in the API before a resource can reference it.
When a resource references a Descriptor, the API looks up the value, ignoring
case. If the value does not match an existing Descriptor, including a
value that is not in the format above, the API returns `400 Bad Request` with a
validation error such as:

```text
AcademicSubjectDescriptor value 'uri://ed-fi.org/academicsubjectdescriptor#unknown' does not exist.
```

Namespaces are assigned by platform hosts. Generally speaking, namespaces
identify the originating entity. The following are examples from the Ed-Fi
Alliance namespace, which includes the default values in the as-shipped Ed-Fi
API:

```text
uri://ed-fi.org/AcademicSubjectDescriptor#Chemistry
uri://ed-fi.org/AcademicSubjectDescriptor#English Language Arts
```
