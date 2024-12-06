# Teaching and Learning Domain - Best Practices

CourseLevelCharacteristics can be defined in the Course, Course Offering, and
Section entities and are important to categorizing these entities for
operational and analytical purposes (e.g., if a offering is "Dual Credit", "AP",
"IB", "remedial" or similar). As noted above, these entities form a hierarchy:

* Course ← Course Offering ← Section

One issue is that allowing for each level of this hierarchy to be independently
categorized opens the possibility of conflicting categorizations (e.g., a
CourseOffering is categorized as "Dual Credit" but a Section of that
CourseOffering is not – is the Section assumed to be dual credit or not?).

As a result it is _recommended_ that implementers set CourseLevelCharacteristics
at the highest level at which it can be assumed that ALL children in the
hierarchy also have that characteristic. For example, if a Course is generally
considered an "Dual Credit" Course, and yet sometimes it is not offered for dual
credit, implementers are recommended to categorize the CourseOffering or
Sections (whichever apply) as "Dual Credit" rather than apply this to the
Course.

If necessary, it is _possible_ to override a characteristic set at a higher
level, but note that doing so it is _recommended_ to use a negative
characteristic (e.g., "Non Dual Credit") as the absence of a value should not be
used to signal the negative (this is a unwelcome practice especially in API
bindings, and leads to ambiguity that can be misinterpreted).

## Define When Different

By default, all CourseLevelCharacteristics defined at the Course-level are
assumed accurate at the Course Offering-level. If this is not the case, then the
CourseLevelCharacteristics need to be re-defined at the Course Offering-level.
The same logic applies between CourseLevelCharacteristics going another step
down from Course Offering to Section. The main idea is to allow
CourseLevelCharacteristics defined at a lower level to overwrite those defined
at the upper levels.

### Use Cases

#### This section is offered for dual credit (i.e., may be taken for dual credit, but doing so might require some additional work, etc.)

The Section will have a CourseLevelCharacteristic = "Dual Credit" (or the
referenced Course Offering or Course, if these are the same). Student
achievement of the dual credit is reported in a Course Transcript record with
Additional Earned Credits and an Additional Earned Credit Type = "Dual Credit".

#### This is an AP course (i.e., everyone in it is taking it with the plans to take the AP exam)

The Course will have a CourseLevelCharacteristic = "AP". Course Offerings and
Sections created from this Course will not have any CourseLevelCharacteristics
defined. Student results for the AP exam are reported in Student Assessment
records.

#### Student X is taking Section X as a means of satisfying a CTE concentration (i.e., but other students are not necessarily doing that)

Section X will have a CourseLevelCharacteristic = "Career Technical Education"
(or the referenced Course Offering or Course, if these are the same). The
student will have an active Student CTE Program Association record and the CTE
credits reported in a Course Transcript record with Additional Earned Credits
and Additional Earned Credit Type = "Career and Technical Education".

#### This course is for gifted and talented students (only)

The Course will have a CourseLevelCharacteristic = "Gifted and Talented". Course
Offerings and Sections created from this Course will not have any CLC's defined.

#### This section is being offered as a remedial course (i.e., all students in it are there for remedial purposes)

The Section will have a CourseLevelCharacteristic = "Remedial" (or the
referenced Course Offering or Course, if these are the same).
