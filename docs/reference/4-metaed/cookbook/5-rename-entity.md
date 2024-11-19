---
description: The design of a MetaEd model requires the renaming of an entity.
---

# 5 - Rename Entity

## Problem

The design of a MetaEd model requires the renaming of an entity. Examples of
entities include Domain Entities, Associations, Commons, Enumerations and
Descriptors.  

## Solution

Change the name of the entity. Build MetaEd. Any property references to the old
name will result in MetaEd build errors. Update those property references to the
new name and rebuild MetaEd. All technical artifacts related to the renamed
entity will be updated.

## Discussion

Entity names are trivially changed in MetaEd, but any references to the old name
must be updated for the model to be consistent. The "Find in Files" feature of
the editor can be used to locate old name references, but can result in false
positives. It is usually easier to just make the name change on the entity and
let the error reporting of the build process list the references that need
updating.

Consider the following declarations:

```metaed
Common Behaviors
    documentation "Describes behavior by category and provides a detailed description."
    ... 
```

```metaed
Domain Entity DisciplineIncident
 documentation "This event entity represents an occurrence of an infraction."
    ...
    common Behaviors
        documentation "Describes behavior by category and provides a detailed description."
        is optional collection
    ...
```

Here, the domain entity DisciplineIncident has a reference to the common
Behaviors. Other entities may have a reference to Behaviors as well. Imagine now
that there is a new naming guideline where all commons must be in singular form.
Simply change the common name from "Behaviors" to "Behavior" and build MetaEd.
The error list will show all of the properties that need updating because they
reference the old name "Behaviors". This will include the property
on DisciplineIncident.

Note that renames of entities usually require updates to the documentation for
both property references and the entity itself.
