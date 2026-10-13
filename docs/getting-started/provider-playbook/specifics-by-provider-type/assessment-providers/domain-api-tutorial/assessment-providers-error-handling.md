# Assessment Providers - Error Handling

A specific error condition that is seen by Assessment Providers is around rostering. What happens is the Assessment Provider pulls the roster from the SIS and then when adding Assessment data to the students pushes the data into Ed-Fi ODS. If the students already exist in the ODS they can have a different identifier then they had in the SIS and errors will occur.  
  
The best practice here is to pull the rostering information from the Ed-Fi ODS to begin with, that way you know the identifiers will match when pushing assessment data back.
