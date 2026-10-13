# Assessment Providers: Data PULL Model

For assessment vendors, implementing the standard PUSH API model can present challenges. Scalability across a large base of implementations and users, fault detection and resolution, and sustaining business processes related to managing security and user interfaces can seem insurmountable given the variability of technical capabilities and staff turnover common at LEAs and SEAs.  
  
The Ed-Fi Alliance, in collaboration with community members (such as ACT, EdGraph, WI DPI, Texas Education Exchange, Nebraska NDE, ClassLink, Curriculum Associates (iReady), and a growing number of LEAs) have designed and successfully implemented an alternative approach that resolves many of these issues. In the bidirectional PULL model, the assessment vendor stands up an ODS/API instance that empowers the customer (agency implementation) to:

* Push a limited set of data to the assessment vendor API (called “roster for reporting”) to create initial “shell” records

* Pull newly available (“fresh”) assessment results data on demand as soon as they’re ready, incorporated into those previously created shell records

* The combination of the roster for reporting “push” of data linked with the scores/results “pull” of data makes for improved data quality, lowered rates of error conditions, and reduced student matching challenges.

The flexibility and timeliness of the data (from the agency perspective) as well as the reduced management load to the assessment vendor, make this an important  
pattern that the Alliance recommends.  
  
Reach out to the [Ed-Fi Solutions team](mailto:Jeff.Putnam@ed-fi.org) for more information
