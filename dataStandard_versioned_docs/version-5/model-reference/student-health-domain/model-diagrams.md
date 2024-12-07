# Student Health Domain - Model Diagrams

## Student Health Model UML Diagram

The Student Health data model provides for recording the immunization history of
students.  It does not include information about the specific requirements for
immunization since this information likely lives outside the likely source of
student immunization systems. Analysis and reporting of whether students satisfy
the immunization requirements will need to access the definition of requirements
outside the ODS.

A new entity StudentHealth is defined to enable separate access control in the
Ed-Fi API claimsets and in the ODS tables suitable for health data according to
policy.  The StudentHealth entity has the following key:

* Student reference
* EducationOrganization reference *

The referenced EducationOrganization should reflect the level (i.e., SEA, LEA,
School) of organization that is responsible for maintaining the student health
data in the ODS.

Because the content of the StudentHealth entity is cumulatively historical, the
required AsOfDate is not a key, but is used to reflect the date the record was
last updated.

The data model UML diagram is shown below.

![Student health domain
UML](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/StudentHealth-UML.webp)

_[Large
version](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/StudentHealth-UML-large.png)_
