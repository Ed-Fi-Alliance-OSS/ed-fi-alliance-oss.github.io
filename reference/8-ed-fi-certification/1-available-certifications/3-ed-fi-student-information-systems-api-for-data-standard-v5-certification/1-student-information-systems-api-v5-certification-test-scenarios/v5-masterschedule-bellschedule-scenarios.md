# v5 MasterSchedule > BellSchedule Scenarios

This entity represents the schedule of class period meeting times.

### Prerequisites

* ClassPeriods
  *  Prior to completing this scenario please ensure you have set up at
         least 6 class periods.
* Schools

### Scenarios

1. Create a Normal Schedule A Day Bell Schedule
2. Create a Normal Schedule B Day Bell Schedule
3. Create an Early Release  A Day Bell Schedule
4. Create an Early Release B Day Bell Schedule

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>POST | Scenario 4  <br/>POST |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BellSchedule | bellScheduleName | FALSE | string | REQUIRED | Normal Schedule A | Normal Schedule B | Early Release A | Early Release B |
| BellSchedule | schoolReference | FALSE | schoolReference | REQUIRED |     |     |     |     |
| schoolReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901107 | 255901107 | 255901107 |
| BellSchedule | classPeriodReference | TRUE | classPeriodReference | REQUIRED |     |     |     |     |
| classPeriodReference | classPeriodName | FALSE | string | REQUIRED | Class Period 1 | Class Period 4 | Class Period 1 | Class Period 4 |
| classPeriodReference | classPeriodName | FALSE | string | REQUIRED | Class Period 2 | Class Period 5 | Class Period 2 | Class Period 5 |
| classPeriodReference | classPeriodName | FALSE | string | REQUIRED | Class Period 3 | Class Period 6 |     |     |
| BellSchedule | alternateDayName | FALSE | boolean | REQUIRED | A   | B   | A   | B   |
