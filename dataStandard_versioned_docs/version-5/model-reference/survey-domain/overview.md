---
sidebar_position: 1
---

# Survey Domain - Overview

## Key Entities

This domain contains:

* A Survey entity that describes surveys along with associated metadata.
* A SurveyResponse entity that holds survey results and administration
    metadata for an overall survey, survey section, and individual survey
    questions.

## Key Concepts

The key concepts include the following:

* The Survey domain is composed of two sections, the inquiry side (Survey,
    SurveySection, SurveyQuestion) and the response side (SurveyResponse,
    SurveySectionResponse, SurveyQuestionResponse).
* On the inquiry side, the primary entity is the Survey entity. The Survey
    entity acts to create a template for questions to be presented to a survey
    taker. The Survey can optionally be attached to an Education Organization,
    School Year, or Term. Surveys can also be categorized via the
    SurveyCategoryDescriptor.
* Adding an optional SurveySection to a survey allows for further grouping of
    questions within a survey. This enables the survey designer to create a
    survey with multiple topics but still organized in a way that makes sense to
    the survey taker. SurveySection also enables a more complete analysis of the
    completed survey.
* The SurveyQuestion entity is the heart of the survey domain. These are the
    questions that make up the survey. Each SurveyQuestion has a field for the
    text of the question being asked. Each question can expect the answer in a
    number of different forms.
* The SurveyResponse entity is a response to a survey, and holds information
    about the respondent such as full name, e-mail address, date survey was
    taken, and the amount of time it took to complete the survey. The
    SurveyResponse entity also has holds a link to the person-type entity that
    took this survey (Student, Staff, or Parent). Survey responses can also
    target a person type (Student, Staff) as well as an Education Organization.
* The SurveySectionResponse entity brings together a survey response with a
    survey section, again allowing for a specific grouping of survey question
    answers. The SurveyResponse entity also adds a rating field, so that that
    section of the survey can be rated against other SurveySectionResponses for
    that survey. Like the SurveyResponse entity above, the SurveySection entity
    can also target a person type (Student, Staff) as well as an Education
    Organization.
* The SurveyQuestionResponse entity contains the response to an individual
    SurveyQuestion as well as a link back to the original SurveyQuestion asked
    (this way, the text of the question being answered is always available). The
    responses can take many forms, including free text, numeric responses, and
    matrix responses.
