---
sidebar_position: 3
---

# XML Schema - Ed-Fi Descriptors

Ed-Fi Descriptors provide a malleable alternative to structured value lists that are typically expressed via enumerations in XSD. Descriptors are an expanded feature — first introduced in Ed-Fi Data Standard v1.1 — that are vital to accommodate the ways in which users of the Ed-Fi Data Standard need to refer to enumerated collections of values.

Descriptors are enumeration vocabularies that are not "fixed" within the XML schema, but are defined in XML files and linked to their source. Descriptors provide implementers with the flexibility to define their own enumerations. Please note that some downstream Ed-Fi XML standards may require the use of particular enumeration sets in order to guarantee interoperability, so the use of the flexibility in this pattern needs to be exercised with caution.

Key features of the Descriptor Pattern are:

* Descriptors minimally have a ShortDescription and CodeValue, and may also have a LongDescription. Descriptors allow states and other implementers to continue to use the codes associated with their enumerations.
* To support changing enumerations or code sets, Descriptors have an EffectiveBeginDate and EffectiveEndDate that are typically aligned to school years.
* To provide support for longitudinal analysis, Descriptors may capture a PriorDescriptor, as appropriate, when codes may change for the same concept or category.
* For example, the AttendanceEventCategoryDescriptor allows states and other implementers to define their own attendance codes.
* Descriptors are linked to a "namespace" that defines its scope of use. Ideally, a state will publish an enumeration vocabulary or code list at a specific URL. The Namespace element of the Descriptor will contain this URL.

All Descriptors are an extension of the type DescriptorType, shown below:

```xml
<xs:complexType name="DescriptorType" abstract="true">
    . . .
 <xs:complexContent>
  <xs:extension base="ComplexObjectType">
   <xs:sequence>
    <xs:element name="CodeValue" type="CodeValue">
                . . .
    <xs:element name="ShortDescription" type="ShortDescription">
                . . .
    <xs:element name="Description" type="Description" minOccurs="0">
                . . .
    <xs:element name="EffectiveBeginDate" type="xs:date" minOccurs="0">
                . . .
    <xs:element name="EffectiveEndDate" type="xs:date" minOccurs="0">
                . . .
    <xs:element name="PriorDescriptor" type="DescriptorReferenceType" minOccurs="0">
                . . .
    <xs:element name="Namespace" type="URI">
                . . .
   </xs:sequence>
  </xs:extension>
 </xs:complexContent>
</xs:complexType>
```

Consider the example of PerformanceLevel for an Assessment. The performance levels are custom to each assessment (e.g., Met Standard, Commended, College Ready) and cannot be standardized. The PerformanceLevelDescriptor is shown below.

```xml
<xs:complexType name="PerformanceLevelDescriptor">
    . . .
 <xs:complexContent>
  <xs:extension base="DescriptorType" />
 </xs:complexContent>
</xs:complexType>
```

The entity PerformanceLevelDescriptor holds the CodeValue, ShortDescription, and Description for each of the performance level enumerations specific to an assessment, as well as other important attributes defined in the base DescriptorType.

All Descriptor references are an extension of DescriptorReferenceType, shown below.

```xml
<xs:simpleType name="DescriptorReferenceType">
    . . .
 <xs:restriction base="xs:string">
  <xs:minLength value="1" />
  <xs:maxLength value="255" />
 </xs:restriction>
</xs:simpleType>
```

As an example, the Ed-Fi GraduationPlanType Descriptor definition is constructed in an XML file as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<InterchangeDescriptors xmlns="http://ed-fi.org/0310" xmlns:ann="http://ed-fi.org/annotation" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ed-fi.org/0310 ../Schemas/Bulk/Interchange-Descriptors.xsd">
 <GraduationPlanTypeDescriptor>
  <CodeValue>Career and Technical Education</CodeValue>
  <ShortDescription>Career and Technical Education</ShortDescription>
  <Description>Career and Technical Education</Description>
  <Namespace>uri://ed-fi.org/GraduationPlanTypeDescriptor</Namespace>
 </GraduationPlanTypeDescriptor>
 <GraduationPlanTypeDescriptor>
  <CodeValue>Distinguished</CodeValue>
  <ShortDescription>Distinguished</ShortDescription>
  <Description>Distinguished</Description>
  <Namespace>uri://ed-fi.org/GraduationPlanTypeDescriptor</Namespace>
 </GraduationPlanTypeDescriptor>
 <GraduationPlanTypeDescriptor>
  <CodeValue>Minimum</CodeValue>
  <ShortDescription>Minimum</ShortDescription>
  <Description>Minimum</Description>
  <Namespace>uri://ed-fi.org/GraduationPlanTypeDescriptor</Namespace>
 </GraduationPlanTypeDescriptor>
 <GraduationPlanTypeDescriptor>
  <CodeValue>Recommended</CodeValue>
  <ShortDescription>Recommended</ShortDescription>
  <Description>Recommended</Description>
  <Namespace>uri://ed-fi.org/GraduationPlanTypeDescriptor</Namespace>
 </GraduationPlanTypeDescriptor>
 <GraduationPlanTypeDescriptor>
  <CodeValue>Standard</CodeValue>
  <ShortDescription>Standard</ShortDescription>
  <Description>Standard</Description>
  <Namespace>uri://ed-fi.org/GraduationPlanTypeDescriptor</Namespace>
 </GraduationPlanTypeDescriptor>
</InterchangeDescriptors>
```

Note that for Descriptors, the namespace is required so the source for the Descriptor definition can be uniquely determined. An optional AsOfDate may be supplied to give temporal context to the Descriptor value reference.

Because each value/code for a Descriptor is defined with a namespace, the controlled vocabulary may be defined combining values from more than one namespace. This allows a state to add codes to a federally defined set or to combine two vocabularies from different contexts. For example, two code lists might be combined for the DisabilityDescriptor, the Individuals with Disabilities Education Act (IDEA) set of disabilities, and the Section 504 set of disabilities, with each set referencing a different namespace.
