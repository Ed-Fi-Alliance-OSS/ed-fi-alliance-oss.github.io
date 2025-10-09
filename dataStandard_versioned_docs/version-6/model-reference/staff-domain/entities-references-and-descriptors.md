---
sidebar_position: 3
hide_table_of_contents: true
---

# Staff Domain - Entities, References, and Descriptors

## Staff Domain Entities

| Name | Description |
| --- | --- |
| Credential | The legal document giving authorization to perform teaching assignment services. |
| OpenStaffPosition | This entity represents an open staff position that the education organization is seeking to fill. |
| OpenStaffPositionEvent| Represents significant milestones related to an open staff position. |
| Person | This entity represents a human being. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffAbsenceEvent | This event entity represents the recording of the dates of staff absence. |
| StaffDemographic | The demographic information associated to a Staff member |
| StaffDirectory | The contact information associated to a staff member. |
| StaffEducationOrganizationAssignmentAssociation | This association indicates the education organization to which a staff member provides services; also known as school of service. |
| StaffEducationOrganizationEmploymentAssociation | This association indicates the EducationOrganization an employee, contractor, volunteer, or other service provider is formally associated with typically indicated by which organization the staff member has a services contract with or receives compensation from. |
| StaffIdentificationCode | This entity holds different identity codes for staff member. |
| StaffLeave | This entity represents the recording of the dates of staff leave (e.g., sick leave, personal time, vacation). |
| StaffSchoolAssociation | This association indicates the School(s) at which a staff member provides instructional services. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| EducationServiceCenter | This entity represents a regional, multi-services public agency authorized by state law to develop, manage and provide services, programs, or other support options (e.g., construction, food services, and technology services) to LEAs. |
| LocalEducationAgency | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| StateEducationAgency | This entity represents the agency of the state charged with the primary responsibility for coordinating and supervising public instruction, including the setting of standards for elementary and secondary instructional programs. |

## Staff Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StaffAbsenceEvent | AbsenceEventCategory | The code describing the type of absence. |      |     |     |     |
| Credential <br /> OpenStaffPosition <br /> Staff <br /> StaffSchoolAssociation | AcademicSubject | "what goes here?" | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
