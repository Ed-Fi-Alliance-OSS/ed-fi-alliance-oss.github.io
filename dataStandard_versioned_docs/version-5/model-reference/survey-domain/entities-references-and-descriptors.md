---
hide_table_of_contents: true
---

# Survey Domain - Entities, References, and Descriptors

## Survey Domain Entities

| Name | Description |
| --- | --- |
| Survey | A survey to identified or anonymous respondents. |
| SurveySection | The section of questions for the survey. |
| SurveyQuestion | The questions for the survey. |
| SurveyResponse | Responses to a Survey for named or anonymous persons. |
| SurveySectionResponse | Optional information about the responses provided for a section of a survey. |
| SurveyQuestionResponse | The response to a survey question. |
| SurveyCourseAssociation | The course associated with the survey. |
| SurveySectionAssociation | The section associated with the survey. |
| SurveyProgramAssociation | The program associated with the survey. |
| SurveyResponseEducationOrganizationTargetAssociation | This association provides information about the survey being taken and the education organization the survey is about. |
| SurveyResponseStaffTargetAssociation | The association provides information about the survey being taken and who the survey is about. |
| SurveySectionResponseEducationOrganizationTargetAssociation | This association provides information about the survey section and the Education Organization the survey section is about. |
| SurveySectionResponseStaffTargetAssociation | This association provides information about the survey section and the staff the survey section is about. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An ""employee"" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A ""contractor"" or ""consultant"" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A ""volunteer"" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Contact | This entity represents a parent or guardian of a student, such as mother, father, or caretaker. |
| Course | This educational entity represents the organization of subject matter and related learning experiences provided for the instruction of students on a regular or systematic basis. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |

## Survey Domain Descriptors

| Entity | Descriptor | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Survey | SurveyCategory | The descriptor holds the category or type of survey. | Local |     |     |     |
| SurveyQuestion | QuestionForm | The form or type of question. | Local |     |     |     |
| SurveyResponse | SurveyLevel | Provides information about the respondents of a survey and how they can be grouped together. | Local |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/udm/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
