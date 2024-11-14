# 4 - Create a New Association Subclass

## Problem

The design of a MetaEd model requires the subclassing of an association.  

## Solution

Create a new association subclass in the MetaEd source files and reference it
where necessary. Build MetaEd. All technical artifacts related to the new
association subclass will be updated.

:::info

GeneralStudentProgramAssociation is the only Association that can be subclassed.
MetaEd provides validation warnings if subclassing of other Associations is
attempted.

:::

When an existing association needs additional data to support a specialization
of the model, it should be subclassed. The naming convention should follow the
naming convention for associations with a semantic discriminator indicating what
the specialization of data is for this new type. The base association name is
the original association to build on. No property in this type can be marked as
is part of primary key. Creating a subclass does not affect the original
association. Instead it creates a new type that uses the original association as
a base and adds new data.

Consider the following declarations:

```metaed
Association GeneralStudentProgramAssociation
    documentation "This association represents the Program(s) that a student participates in or is served by."
    domain entity Student
        documentation "The Student associated with the Program."
    domain entity Program
        documentation "The Program associated with the Student."
    ...
    reference EducationOrganization
        documentation "The EducationOrganization where the Student is participating in or receiving the Program services."
        is part of identity
    ...
```

```metaed
Association StudentXYZProgramAssociation based on EdFi.GeneralStudentProgramAssociation
 documentation "This association represents the XYZ program."
 string XYZProgramCode
            documentation "The program code representing this XYZ."
        is required
            max length 10
```

StudentXYZProgramAssociation is a new Association Subclass which is based on
GeneralStudentProgramAssociation. Like its parent, the subclass associates
Student and Program and has a reference to EducationOrganization.
StudentXYZProgramAssociation modifies GeneralStudentProgramAssociation with the
addition of an XYZProgramCode.
