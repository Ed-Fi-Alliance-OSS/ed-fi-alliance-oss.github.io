# Namespace References

In an extension project, when adding or referencing any objects defined outside
of the extension project, a namespace reference must be included before the name
of the object. The namespace can be for the core Ed-Fi model or another
extension project. Namespace references are not required when working with
objects defined within the current extension project. Namespace references are
case sensitive.

```metaed

<Domain Entity> ::=
     Domain Entity [ namespace_reference. ]domain_entity_name additions [ meta_ed_id ]
          <property>+

```

To add or reference an object defined in an extension project outside of the
current extension project, the namespace reference is the name of the extension
project as defined in the package.json file. For example, extending a domain
entity defined in an extension project named "SampleExtensionProject" would look
like the following:

```metaed

<Domain Entity> ::=
     Domain Entity SampleExtensionProject._domain_entity_name_ additions [ meta_ed_id ]
          <property>+

```

For objects in an extension project that reference a core Ed-Fi model entity,
the namespace reference is "EdFi" followed by a period and then the core object
name.

```metaed

<Domain Entity> ::=
     Domain Entity EdFi._domain_entity_name_ additions [ meta_ed_id ]
          <property>+

```

The same method applies when adding or referencing a property defined outside of
the extension project, as shown in this example of a reference to a core Ed-Fi
model boolean property in an extension project file.

```metaed

<boolean_property> ::=
     bool EdFi._property_name_ [ meta_ed_id ]
          _documentation_
          <cardinality>
          [ <queryable> ]

```

To create a subclass of an object defined outside of the extension project, the
namespace reference is included before the base object name, as shown in this
example of a reference to a core Ed-Fi model association in an extension project
file.

```metaed

<Association Subclass> ::=
     Association entity_name_ based on
          EdFi._base_association_name_ [ meta_ed_id ]
          documentation
          <property>+

```
