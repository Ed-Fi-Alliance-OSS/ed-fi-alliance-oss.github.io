# 13 - Add Reference with Role Name

## Problem

One entity references another, but the reference has a special meaning (as
opposed to a general use of a shared entity).

## Solution

Use the keywords `role name` to provide additional context for the reference.

## Discussion

Sometimes, additional context may be required as part of a reference to another
object.

For example, the domain entity below references the same inline common type
twice — each time for a different reason. A role name must be supplied to
differentiate the references.

### Example Domain Entity

```metaed
Domain Entity StudentAcademicRecord
 documentation "This is an example of the use of the ""role name"" keywords."
 inline common Credits
  documentation "The cumulative number of credits an individual earns by completing courses or examinations during his or her enrollment."
        is optional
        role name CumulativeEarned
 inline common Credits
  documentation "The cumulative number of credits an individual attempts to earn by taking courses during his or her enrollment."
        is optional
        role name CumulativeAttempted
 ...
```

The generated artifacts will then add a prefix to the reference with the role
name provided, as shown in the example XSD snippet below.

### Sample Build Artifact

```xml
  <xs:complexType name="StudentAcademicRecord">
    <xs:annotation>
      <xs:documentation>This educational entity represents the cumulative record of academic achievement for a student.</xs:documentation>
      <xs:appinfo>
        <ann:TypeGroup>Domain Entity</ann:TypeGroup>
      </xs:appinfo>
    </xs:annotation>
    <xs:complexContent>
      <xs:extension base="ComplexObjectType">
        <xs:sequence>
          <xs:element name="CumulativeEarnedCredits" type="Credits" minOccurs="0">
            <xs:annotation>
              <xs:documentation>The cumulative number of credits an individual earns by completing courses or examinations during his or her enrollment in the current school as well as those credits transferred from schools in which the individual had been previously enrolled.</xs:documentation>
            </xs:annotation>
          </xs:element>
          <xs:element name="CumulativeAttemptedCredits" type="Credits" minOccurs="0">
            <xs:annotation>
              <xs:documentation>The cumulative number of credits an individual attempts to earn by taking courses during his or her enrollment in the current school as well as those credits transferred from schools in which the individual had been previously enrolled.</xs:documentation>
            </xs:annotation>
          </xs:element>
 ...
```

:::info

Unlike shared types, top-level entities may not be completely renamed. The
keyword "named" does not apply to them. Context may be added using `role
name` in order to make a reference to an existing entity more specific. If a
reference requires a completely different name, consider defining a new entity
with the desired name instead.

:::
