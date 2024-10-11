# v5 Education Organization > Location Scenarios

This entity represents the physical space where students gather for a particular
class/section. The Location may be an indoor or outdoor area designated for the
purpose of meeting the educational needs of students.

## Prerequisites

- None

## Scenarios

1. Create a classroom Location for Grand Bend Elementary School
2. Create a classroom Location for Grand Bend High School
3. Update the maximumNumberOfSeats on the newly added Grand Bend Elementary
   School location
4. Update the maximumNumberOfSeats on the newly added Grand Bend High
   School location

| Resource        | Property Name               | Is Collection | Data Type       | Required / Optional | Scenario 1 <br/>POST                       | Scenario 2 <br/>POST                       | Scenario 3 <br/>PUT                        | Scenario 4 <br/>PUT                        |
| --------------- | --------------------------- | ------------- | --------------- | ------------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| Locations       | classroomIdentificationCode | FALSE         | string          | REQUIRED            | \["501" if possible <br/>\| system value\] | \["901" if possible <br/>\| system value\] | \["501" if possible <br/>\| system value\] | \["901" if possible <br/>\| system value\] |
| Locations       | schoolReference             | FALSE         | schoolReference | REQUIRED            |                                            |                                            |                                            |                                            |
| schoolReference | schoolId                    | FALSE         | integer         | REQUIRED            | 255901107                                  | 255901001                                  | 255901107                                  | 255901001                                  |
| Locations       | maximumNumberOfSeats        | FALSE         | integer         | REQUIRED            | 22                                         | 22                                         | **20**                                     | **18**                                     |
