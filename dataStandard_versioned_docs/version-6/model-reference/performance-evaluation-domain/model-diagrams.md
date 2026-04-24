---
sidebar_position: 2
hide_table_of_contents: true
---

# Performance Evaluation Data Model Domain - Model Diagrams

## Performance Evaluation UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    PerformanceEvaluation {
    }
    PerformanceEvaluationRating["PerformanceEvaluation<br/>Rating"] {
    }
    Evaluation {
    }
    EvaluationRating {
    }
    EvaluationObjective {
    }
    EvaluationObjectiveRating {
    }
    EvaluationElement {
    }
    EvaluationElementRating {
    }
    QuantitativeMeasure {
    }
    QuantitativeMeasureScore {
    }
    Goal {
    }
    Person {
    }
    Section {
    }
    SurveySectionAggregateResponse["SurveySection<br/>AggregateResponse"] {
    }
    EducationOrganization {
    }
    PerformanceEvaluation ||--o{ EducationOrganization : "relates to"
    PerformanceEvaluation ||--o{ Evaluation : "relates to"
    PerformanceEvaluationRating ||--o{ PerformanceEvaluation : "relates to"
    PerformanceEvaluationRating ||--o{ EvaluationRating : "relates to"
    PerformanceEvaluationRating ||--o{ Person : "relates to"
    EvaluationRating ||--o{ Evaluation : "relates to"
    EvaluationRating ||--o{ EvaluationObjectiveRating : "relates to"
    Evaluation ||--o{ EvaluationObjective : "relates to"
    EvaluationObjective ||--o{ EvaluationElement : "relates to"
    EvaluationObjectiveRating ||--o{ EvaluationObjective : "relates to"
    EvaluationObjectiveRating ||--o{ EvaluationElementRating : "relates to"
    EvaluationElementRating ||--o{ EvaluationElement : "relates to"
    EvaluationElementRating ||--o{ QuantitativeMeasureScore : "relates to"
    EvaluationElement ||--o{ QuantitativeMeasure : "relates to"
    QuantitativeMeasureScore ||--o{ QuantitativeMeasure : "relates to"
    Goal ||--o{ Person : "relates to"
    Goal ||--o{ EvaluationObjective : "relates to"
    Goal ||--o{ EvaluationElement : "relates to"
    Goal ||--o{ Goal : "relates to"
    Section ||--o{ EvaluationRating : "relates to"
    SurveySectionAggregateResponse ||--o{ EvaluationElementRating : "relates to"
    style PerformanceEvaluation color:#000000
    style PerformanceEvaluationRating color:#000000
    style Evaluation color:#000000
    style EvaluationRating color:#000000
    style EvaluationObjective color:#000000
    style EvaluationObjectiveRating color:#000000
    style EvaluationElement color:#000000
    style EvaluationElementRating color:#000000
    style QuantitativeMeasure color:#000000
    style QuantitativeMeasureScore color:#000000
    style Goal color:#000000
    style Person color:#000000
    style Section color:#000000
    style SurveySectionAggregateResponse color:#000000
    style EducationOrganization color:#000000
```
