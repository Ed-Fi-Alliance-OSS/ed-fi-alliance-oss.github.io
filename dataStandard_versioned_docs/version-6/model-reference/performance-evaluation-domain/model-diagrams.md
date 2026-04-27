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
    PerformanceEvaluation ||--o{ EducationOrganization : "has associated"
    PerformanceEvaluation ||--o{ Evaluation : "has associated"
    PerformanceEvaluationRating ||--o{ PerformanceEvaluation : "has associated"
    PerformanceEvaluationRating ||--o{ EvaluationRating : "has associated"
    PerformanceEvaluationRating ||--o{ Person : "has associated"
    EvaluationRating ||--o{ Evaluation : "has associated"
    EvaluationRating ||--o{ EvaluationObjectiveRating : "has associated"
    Evaluation ||--o{ EvaluationObjective : "has associated"
    EvaluationObjective ||--o{ EvaluationElement : "has associated"
    EvaluationObjectiveRating ||--o{ EvaluationObjective : "has associated"
    EvaluationObjectiveRating ||--o{ EvaluationElementRating : "has associated"
    EvaluationElementRating ||--o{ EvaluationElement : "has associated"
    EvaluationElementRating ||--o{ QuantitativeMeasureScore : "has associated"
    EvaluationElement ||--o{ QuantitativeMeasure : "has associated"
    QuantitativeMeasureScore ||--o{ QuantitativeMeasure : "has associated"
    Goal ||--o{ Person : "has associated"
    Goal ||--o{ EvaluationObjective : "has associated"
    Goal ||--o{ EvaluationElement : "has associated"
    Goal ||--o{ Goal : "has associated"
    Section ||--o{ EvaluationRating : "has associated"
    SurveySectionAggregateResponse ||--o{ EvaluationElementRating : "has associated"
```
