# General Formatting

This section describes general formatting rules and norms in the MetaEd
language.

## White Space

White space, indents, and line breaks are not important in the overall language.
However, any line breaks or other white space nested within documentation double
quotes is preserved.

## Recommended Formatting

While white space is not required, line breaks and indents are recommended to
promote readability of MetaEd files. Note the recommended formatting in the
sample below.

:::note

```metaed

Association ExampleName
     documentation "This is documentation."
     domain entity FirstEntityName
          documentation "This is documentation."
     domain entity SecondEntityName
          documentation "This is documentation."
     ...
     bool PropertyName
          documentation "This is documentation."
          is part of identity
     ...

```

:::
