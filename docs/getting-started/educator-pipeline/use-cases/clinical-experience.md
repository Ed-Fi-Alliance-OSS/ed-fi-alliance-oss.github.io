# Clinical Experience and Performance Use Case / Dashboard

Educator Preparation Programs (EPPs) gain valuable insights into candidate readiness through clinical evaluations and end-of-program surveys. By analyzing this data across programs, cohorts, and demographic groups, EPPs can pinpoint areas of strength and identify where additional support is needed. These findings guide targeted improvements, helping ensure candidates are well-prepared for the classroom and that programs evolve to meet the diverse needs of future educators. Access the [Educator Preparation Ed-Fi Backed Tools: Clinical Experience and Performance Use Case Resource](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/epp/use-cases/clinical-experience/Ed-Fi%20Alliance%20_Clinical%20Experience%20and%20Performance%20Use%20Case%20Resource.pdf), to learn more about this use case and the related essential questions.

Paragraph locked by Lindsey Judd
In supporting the EPP Community to access these insights, Ed-Fi has developed a field-informed solution backed by the Educator Preparator Data Model (EPDM) with a [sample PowerBI dashboard](https://github.com/Ed-Fi-Exchange-OSS/Educator-Pipeline-Dashboards)
providing three visualizations: Evaluation, Evaluation Detail, and Survey.

:::note

The sample dashboards in the source code repository above were built for Ed-Fi
Data Standard 4.0 and may require additional modification for newer versions of
the Data Standard.

:::

## Evaluation

### Evaluation User Story

As a user in a program administration personnel role, I want to view a summary
of candidate ratings for the Teacher Work Sample evaluation by objective. The
possible ratings that candidates can receive on this evaluation are Improvement
Needed, Developing, and Proficient. I would like to see the percentage for each
rating type by evaluation. I would also like to see a detailed view of the
demographic distribution of candidates that were evaluated using the Teacher
Work Sample evaluation.

#### Evaluation Report View

The **Evaluation** page includes 5 visuals. The 3 visuals on the left look at
the number of evaluated candidates by race, sex, and certification status.

![Sample Evaluation charts](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/visuals-evaluated-candidates-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/visuals-evaluated-candidates.png)_

These 3 visuals also serve as filters for the entire Evaluation page. For
example, clicking on Certified in the Number of Candidates by Certification
Status highlights all of the other visuals on the page by showing the details of
candidates that are certified.

![Teacher work sample summary view](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/teacher-work-sample-summary-view-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/teacher-work-sample-summary-view.png)_

The visual on the top right (Rating by Objective) of the Evaluation page, shows
the percentage of candidate evaluation ratings by objective. This visual can
also be used as a filter for other visuals on the page. For example, clicking on
the Improvement Needed rating within the visual, filters all visuals for this
Rating.

![Rating by objective chart](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/rating-by-objective-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/rating-by-objective.png)_

Finally, the table visual on the bottom right of the Evaluation page, shows the
average of Rating by Objective then by Element.

![Rating by objective table](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/rating-by-objective-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/rating-by-objective.png)_

## Evaluation Detail

### Evaluation Detail User Story

As a program administrator, I want to see a summarized evaluation rating for all
candidates as well as each candidate's rating by evaluation objectives and
elements.

### Evaluation Detail Report View

The **Evaluation Detail** page includes 2 visuals.

The visual on the left (Average of Rating by Objective) of the Evaluation Detail
page, provides a summarized view of the average or Rating broken down by Rating
description.

![Average of Rating by Objective chart](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/average-of-rating-by-objective-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/average-of-rating-by-objective.png)_

The visual on the right of the Evaluation Detail page provides a more detailed
view of each candidate rating by Objective, then by Element. If there is more
than one evaluation for that candidate, the average rating will be provided.
Additionally, the Evaluation Date filter allows for viewing only those
evaluations completed within a given timeframe. The Evaluation Detail page also
includes a candidate filter that allows filtering for a specific candidate.

![Rating by Objective Detail table](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/detail-view-rating-by-objective-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/detail-view-rating-by-objective.png)_

## Survey

### Survey User Story

As a user in a program administration personnel role, I want to be able to view
the summary of responses by candidates who completed a self-report survey (i.e.,
Completer/Exit Survey) to better understand their perceptions of the program
experience. I also would like to be able to drill down by cohort, program, and
demographic information.

### Survey Report View

The **Survey** page includes 1 visual.

Unique filtering capabilities for this visual include section (portions within a
survey or related survey questions) and response date (survey completion).

![Survey Response visual](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/survey-response-small.png)

_[larger version](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/survey-response.png)_

:::tip

For implementation guidance, see the [Clinical Experience and Performance Dashboard](/reference/educator-pipeline/clinical-experience/) reference documentation.

:::
