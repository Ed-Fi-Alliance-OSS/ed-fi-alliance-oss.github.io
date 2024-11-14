# 12 - Create a New Shared Type

## Problem

A field with the same properties is frequently included in multiple MetaEd files
(sometimes with different field names) and the field properties must be defined
each time.

## Solution

Define a shared type. Instead of defining field properties each time the field
is included, reference the shared type, renaming it as appropriate for each
reference.

## Discussion

A shared type is a field with a predefined set of properties that can be
referenced in multiple MetaEd files.

MetaEd allows for three types of fields to be predefined as shared types:

* Shared decimals
* Shared integers
* Shared strings

Consider these two MetaEd files, both referencing a decimal field with 18 total
digits, 4 decimal places, and a minimum value of 0.

### Domain Entities without Shared Simple Types

```metaed
Domain Entity ReportCard
 documentation "This is an example of a domain entity that would benefit from referencing a shared type."
 decimal GPAGivenGradingPeriod
  documentation "A measure of average performance in all courses taken by an individual for the current grading period."
  is optional
  total digits 18
     decimal places 4
     min value 0
 decimal GPACumulative
  documentation "A measure of cumulative average performance in all courses taken by an individual from the beginning of the school year through the current grading period."
  is optional
  total digits 18
     decimal places 4
     min value 0
 ...
 
 
 
Domain Entity StudentAcademicRecord
 documentation "This is another example of a domain entity that would benefit from referencing a shared type."
 decimal CumulativeGradePointsEarned
  documentation "The cumulative number of grade points an individual earns by successfully completing courses or examinations during his or her enrollment."
  total digits 18
     decimal places 4
     min value 0
 decimal CumulativeGradePointAverage
  documentation "A measure of average performance in all courses taken by an individual during his or her school career as determined for record-keeping purposes."
  total digits 18
     decimal places 4
     min value 0
 ...
```

Instead, create a shared type to define the properties of this particular shared
decimal.

### Shared Decimal - GPA

```metaed
Shared Decimal GPA
    documentation "Grade Point Average computed for a grading period or cumulatively."
    total digits 18
    decimal places 4
    min value 0
```

Then, reference the shared decimal in the MetaEd files, renaming each instance
with the keyword "named" followed by the desired name of the reference. The
documentation may also be specific to each reference.

### Domain Entities with Shared Simple Types

```metaed
Domain Entity ReportCard
 documentation "This is an example of a domain entity that would benefit from referencing a shared type."
 shared decimal GPA named GPAGivenGradingPeriod
  documentation "A measure of average performance in all courses taken by an individual for the current grading period."
  is optional
 shared decimal GPA named GPACumulative
  documentation "A measure of cumulative average performance in all courses taken by an individual from the beginning of the school year through the current grading period."
  is optional
 ...
 
 
 
Domain Entity StudentAcademicRecord
 documentation "This is another example of a domain entity that would benefit from referencing a shared type."
 shared decimal GPA named CumulativeGradePointsEarned
  documentation "The cumulative number of grade points an individual earns by successfully completing courses or examinations during his or her enrollment."
  is optional
 shared decimal GPA named CumulativeGradePointAverage
  documentation "A measure of average performance in all courses taken by an individual during his or her school career as determined for record-keeping purposes."
  is optional
 ...
```

:::info

Though shared types are sometimes renamed when referenced in a MetaEd file,
renaming is not required as long as there is only one reference to the shared
type within each file.

:::
