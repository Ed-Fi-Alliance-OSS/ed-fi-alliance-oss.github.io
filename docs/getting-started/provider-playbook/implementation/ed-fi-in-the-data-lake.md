# Ed-Fi in the Data Lake

_Considerations for Integration of the Ed-Fi Ecosystem into Data Lake and Next Generation Data Warehouse Architectures_

:::warning

This article was written in 2022 and is based on the state of the Ed-Fi Technology Suite at that time. While the basic points are sound, please note that the Analytics Middle Tier, Starter Kits, and Data Import mentioned below have been deprecated.

:::

## Executive Summary

There is no silver bullet for building interoperable systems and delivering actionable insights from educational data. The Ed-Fi Technology Suite helps solve these problems by providing an extensive and well-defined Data Standard; the ODS/API for exchange and storage of operational data; and analytics starter kits that make the operational data more accessible to analysts and end-users alike. But it is not a perfect or complete system. There is a long lead time to access data from new sources and/or new domains, and the analytics starter kits only scratch the surface of what is possible.

Data lakes are intended to deliver short lead times for use of new data with a philosophy of getting the raw data into an analyst's hands as quickly as possible, and many people have asked "why not just use a data lake?" to solve educational data interoperability and delivery problems. This paper makes the case that a pure data lake, without something like the Ed-Fi Data Standard and the Ed-Fi API, could present more problems than it would solve.

Indeed, the tech industry has been maturing away from data lakes as an end in themselves. Instead, there is growing emphasis on combining data lakes with newer generation enterprise data warehouses, thus capturing the best of both worlds: storage of large volumes of structured and unstructured data in the lake, which are accessible to engineers and scientists with a variety of tools, and storage of curated data sets in warehouses, which are more accessible for and trusted by scientists and analysts. This is sometimes referred to as the "lakehouse."

We believe that a hybrid platform combining the Ed-Fi Technology Suite with data lake, enterprise data warehouse, and Cloud managed services could benefit education organizations by

- facilitating data exchange through the Ed-Fi ODS/API,
- using the Ed-Fi Data Standard as a schema for data storage,
- providing a landing zone and pipeline for data that are not integrated into the Ed-Fi Data Standard,
- and allowing data analysts to combine data from new and unstandardized sources with the validated / standardized data from the Ed-Fi ODS/API.

## Background

### Motivating Questions

Where does the Ed-Fi Data Standard fit in a data lake world? Do data lake, cloud-based enterprise data warehouses, and next-generation data integration tools make the Data Standard, and/or the Ed-Fi Technology Suite, obsolete? And if there is a role, what architectural patterns might support integration of the Ed-Fi Data Standard and Technology Suite into a next generation data platform?

### Two Core Problems to Solve

Ed-Fi's mission statement[^1] contains two core technology problems:

1. System interoperability: "helping every school district and state achieve data interoperability"
2. Serving data to end users: "empower educators with comprehensive, real-time[^2] insights into their students’ performance and needs"

The diagrams below illustrate these two problems and will serve as a foundation for the many architectural diagrams that follow.

![Two diagrams: left side shows systems directly connected to each other; the right shows disconnected systems for serving end users](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/core-problem.webp)

### Understanding _Interoperability_

Project Unicorn [defines interoperability](https://www.projectunicorn.org/what-is-interoperability) as "the seamless, secure, and controlled exchange of data between applications." They also publish a [rubric for judging interoperability](https://www.projectunicorn.org/project-unicorn-rubric), which lists eleven different attributes of student data, each with possible technical solutions that are rated on a scale from least to most interoperable. Among their requirements for high marks is the use of a well-defined Data Standard and real-time exchange of data via an web-based Application Programming Interface (API).

### *Serving Data*with Data Governance

When serving data to educators it is essential that the data are not only relevant, but also validated, complete, and trustworthy ("clean", "quality assurance"). An educational agency's data analysts will also want to understand the sources of data, their granularity, and where and how different data sets are compatible (e.g. do different data sets use the same unique identifier for students?). These topics fall under the general heading of "data governance".

### Ed-Fi Solution

The Ed-Fi Data Standard ("the Data Standard") creates a common language for storing and exchanging a broad range of educational data. An Ed-Fi-compatible API ("Ed-Fi API") supports the Data Standard by serving as a hub for both data exchange and downstream uses. The [Data Standard](/reference/data-exchange/data-standards) and the [Ed-Fi API specifications](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications) are available for anyone to implement. In addition to these standards, the Ed-Fi Alliance produces a Technology Suite of software that includes:

- **Ed-Fi ODS/API**, a reference implementation of the Core Student Data API and the Ed-Fi Enrollment API, backed by a relational database (the Operational Data Store, or ODS);
- **Analytics Middle Tier**, a set of database views for simplifying data access; and
- **Starter Kit** visualizations in Power BI.

![A diagram of the components of the Ed-Fi Technology Suite](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/basic-edfi-platform.png)

With the help of an API client software development kit (SDK), client systems can easily write applications that interact with the API, thus achieving the front-end interoperability goal. On the downstream side, the Analytics Middle Tier is flexible enough to support serving many new data needs that go beyond the dashboards provided by the Starter Kits. And thanks to enforcement of globally unique student identifiers, referential integrity, and basic data validation rules, the data can be trusted to be clean and usable.

The Ed-Fi Technology Suite also includes several add-on products, which will be described below. Before doing so, it will be helpful to step back from this platform and ask: _**how quickly can it support new data requirements?**_

### Time to Value

Many IT departments and software development groups struggle to keep up with business demand for new systems, features, and fixes. A key question about any technology platform is how well does it enable rapid development and deployment of new business requirements? Put another way: _**what is the time to value**_?

Every software system will have its *speedbumps*when it comes to addressing these new requirements, which can at times feel more like _roadblocks_. In the Ed-Fi Technical Suite 3, these include:

- **New source systems:** An education agency may have trouble convincing one of their source system vendors to integrate their system with the agency's ODS/API installation, or may have trouble on-boarding that source system because of the need to standardize on unique identifiers for things like students, sections, etc.
- **Configuration:** Enterprise source systems, such as a Student Information System (SIS), are often configured to meet a particular education agency's needs, both at the state and local levels. This can make it difficult to translate one integration experience to another agency ("Data Analyst: why isn't my data here? Source vendor: because you _store_ it in different place in our system").
- **New data domains:** New _types_ of data might be requested, which do not fit cleanly into the current Ed-Fi Data Standard.
- **Data Constraints:** The Ed-Fi provides quality assurance through referential integrity. For example, it will reject an attempt to save an Assessment record for a student when the record cannot be matched to a known student identifier. While this is generally a desired quality for data cleanliness, it can prevent analysts from being able to use the Ed-Fi system as a source for answering questions that might not depend on knowing who the student is.
- **Data out scenarios**: The platform may be very inefficient for some use cases. For example, some use cases may require long-running data transfer jobs that are more prone to failures, whether using the API or direct database access with the Analytics Middle Tier.

Taken all together, one can summarize the "speedbumps" in the way of faster time to value by describing them as _data access problems_: an organization wants access to their data and can't get to them as quickly as they want.

- New source systems
- Configuration
- New domains
- New data outputs

### Ed-Fi Technology Suite, Expanded

Many Ed-Fi implementations will include additional tools that help improve the time to value. The next diagram introduces these new components:

- **Ed-Fi Data Import**, which reads CSV files to push data into the API. Useful when the source system will not or cannot interact directly with the API.
- **Ed-Fi LMS Toolkit**, an experimental approach for extracting data from API's provided by leading Learning Management Systems.
- **A reporting data store** for higher-performance analytics and reporting.

  - Such a data store might synchronize directly from the ODS database, or from the API, optionally using the Change Record Queries feature.
  - ⚠️ Note: the Ed-Fi Alliance does not provide an out-of-the-box "Ed-Fi Reporting Data Store" due to the wide divergence in requirements from one implementation to the next.

![An expanded diagram of the Ed-Fi Technology Suite, with additional tools](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/data-estate.png)

Setting up the data exchanges between these three tools and the Ed-Fi ODS/API requires additional _data engineering_ effort to create tasks that orchestrate execution of the Data Import and LMS Toolkit programs, and possibly additional work to map data from the source system to the Ed-Fi ODS/API.

Additionally, education agencies can customize the platform through:

- **Data Model Extensions**that support exchange storage of new data elements and domains that are not otherwise covered by the Data Standard;
- **API Composites** that denormalize data, so that data can be extracted from the API with fewer calls; and
- **Custom Analytics Middle Tier (AMT) views**that denormalize more of the ODS tables, compared to what is available out of the box.

## The Data Lake Hypothesis

[Amazon](https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/) defines a data lake as

> "... a centralized repository that allows you to store all your structured and unstructured data at any scale. You can store your data as-is, without having to first structure the data, and run different types of analytics—from dashboards and visualizations to big data processing, real-time analytics, and machine learning to guide better decisions."

A central premise of the data lake concept is to get the data into the hands of analysts as quickly as possible and let them sort out the details. That brings us to the question, "_**why not put it in a data lake?**_"

Put another way, this hypothesis supposes that a data lake will provide a faster road to discovery of new data insights thanks to the ease of access to all of the organization's data. No more waiting for resolution of complex integration challenges: the data team can figure it out once the raw data are made available to them.

![Source systems pushing to a data lake, service layer pulling from it](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/data-lake-architecture.png)

- **New source system**: They probably have some export facility already. Just deliver the CSV / XML / etc. files into the lake.
- **Configuration**: No longer an immediate concern since all data will be arriving in the lake.
- **New data domain:** The Data Lake emphasizes the idea of storing what you get and interpreting it as you read it. No need to figure out a single Data Standard up front.
- **Overly principled**: No data are rejected; all are available to the data team.
- **Data out scenarios**: The Analyst can use federated query tools to build reporting, analytics, or machine learning data models from any source data, in any format.

### An Aside: Enterprise Data Warehouses

While this paper primarily concerns itself with data lakes, many of the issues covered here also apply to the use of enterprise data warehouses, especially cloud-based systems such as Snowflake, Google BigQuery, Azure Synapse Analytics, and AWS Redshift. These systems fit into the "Reporting Data Store" box in the architecture diagrams. Because the motivating questions for this paper include explicit data lake features, it will focus on the lake itself. Nonetheless, many of the points raised are equally applicable to any hybrid solution that employs an enterprise data warehouse.

### Data Lake Architecture

In reality, the simple diagram above is a sky-high perspective, hiding considerable detail.

Raw data might arrive in the form of files delivered by a source system in formats such as CSV or XML. Or, they may be sourced from a vendor's upstream API. Someone will be responsible for setting up these _ingest_ steps, just as in the Ed-Fi solution when using Data Import or the LMS Toolkit.

Going from raw data to serving it in the form of dashboards, analytics, etc. is not a simple task. Some sort of *standardization*will be necessary in order to help data/business analysts make sense of the raw data. Without a pre-determined data standard, the data team will need to come up with their own models (more on this below).

Are the data to be trusted? A _cleaning_ or _validation_ process will be needed to ensure that the data will tell an accurate story.

Finally, many data and business analysts will want to use SQL to access the data and will prefer that the data be _stored_ or _organized_ in a familiar and efficient format with high performance. This favors storage in a relational database, preferably tuned for analytics workloads (e.g., using columnar instead of row-oriented storage). This database fits the same Reporting Data Store role mentioned in the expanded Ed-Fi platform section above.

Data analysts and scientists likely want to focus their efforts on end-user tools and results, not on these _data preparation_ tasks. A whole new profession has emerged around these tasks: the data engineer.

The following diagram depicts one of many ways that a data lake platform could be engineered to deliver timely insights. The data engineering role would oversee the _ingest_, _clean_, and *organize*stages, while a data scientist and/or a data analyst role would be responsible for the _serving_ stage.

![Data lake architecture with data preparation steps](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/data-lake-architecture-detailed.png)

:::info

This diagram shows only one "cleaning" job, where in reality there would be separate jobs for each data source and type. Similarly there may be many small, stand-alone ELT processes for populating the reporting data store.

Please see the [Appendix](#appendix-translating-the-diagrams-into-product-components) for explanations of the icons and how they apply to on-premises and cloud-based development.

:::

#### Standardization

Even when there is a common concept, such as "student", across differing data domains, the raw data exported by a source system vendor may be difficult to reconcile. For example, does each source system hold the same uniquely-identifying information on a student, making it possible to know with certainty that two records describe the same person? And how easy is it for the data analyst or data scientist to _recognize_ these unifying attributes when they are named differently?

Amazon's suggestion that the data lake will allow running analytics processes "without first having to structure the data" is not wrong. Each Cloud provider has tools to support this. Nevertheless, at some point the people developing those dashboards and reports are likely to want to stop re-discovering and re-inventing data models.

The _organize_ stage described above attempts to bring a degree of standardization that will hide the messy details, allowing the data scientist or data analyst to quickly and easily find the data required for their task. Even with this, the data platform team (engineers + scientists + analysts) must agree on the data model(s). This could mean adopting one or more existing data standards or developing their own.

#### Data Lake Time to Value

What do we get with a move to a data lake-first approach that does not include something like the Ed-Fi ODS/API? On the positive side, data analysts and/or data scientists _may_ have more rapid access to novel data, thus shortening the time-to-value for rough analyses on "unverified data."

On the flip side, data preparation will require significantly more effort. With an inbound data standard and API that enforce basic data integrity constraints, the primary burden for data preparation is on the _source systems vendors_. These vendors have dedicated programming staff who well understand their own data models, and thus are well positioned for taking ownership of the process of mapping from their source system into the Data Standard. But with the approach of accepting "anything" into the data lake, the preparation work shifts to the _data lake owner_: that is, the education agency or their data platform provider. Time-to-value will likely *increase*for use cases that must rely on clean and verified data, as opposed to raw data.

Furthermore, gold-standard interoperability will only be achieved with additional programming effort that will adapt the internal representation of data in the lake to an external form and present it via an API.

Thus, the data lake has its own speedbumps in time to value:

- **Low score for interoperability**: all we have are raw files with no standards
- **Assembly required**: new skills, and many different components to stitch together for processing all of the different files
- **Data preparation**: the data need to be cleaned, validated, reshaped. Enter the Data Engineer.
- **No standard**: the Data Engineers and Data Analysts will have to agree on their own standard(s) for how to represent the data.

## Proposal: Hybrid Solution

We believe a hub-model RESTful API that enforces a strict Data Standard continues to offer, on average, the best time-to-value for achieving interoperability and delivering meaningful reports and novel data-driven insights.

The Alliance also believes that data lakes and second-generation data warehouses can solve more data challenges than the Ed-Fi Data Standard and ODS/API alone can handle.

In a hybrid scenario, the Ed-Fi ODS/API would serve as an upstream source for the _ingest_ step of a data lake or data warehouse process. The data landing in the lake would, by definition, be well structured according to the Ed-Fi Data Standard. Analysts and Scientist would be able to use the Data Standard documentation, including its Data Handbook, to build a rich understanding of the available data. Because of the strong referential integrity and basic data type validation, there would be little to no need for data engineers to write separate _cleaning_ and *validation*steps. An exception might be for engineers to add second level business rule validation, as is already done by some statewide implementations of the Ed-Fi ODS/API.

Novel data that do not fit into the current Data Standard could land directly in the lake, where data engineers would continue with their preparation steps. Engineering tasks to clean and organize the data will empower analysts to combine the standardized data received from the Ed-Fi ODS/API with the novel data received directly in the lake.

The data lake storage also serves as an enabler for change auditing and for creation of [longitudinal data systems](https://nces.ed.gov/programs/slds/). Whereas relational database systems typically overwrite existing data when updates are received, data in a lake are typically immutable: new records are added without changing the existing records. This makes it possible to track the history of changes to the data, and to build complex multi-year histories for students and staff alike.

The diagram below shows a merger of an Ed-Fi ODS/API Platform with a data lake system. Note the three areas highlighted in yellow:

1. Acknowledgement that some system is needed to move the "Ed-Fi data" into the data lake's file storage.
2. Presence of jobs for retrieving non-standard data files - for example an XML file with Special Education data - and storing them in the same data lake.
3. The Clean step(s) for the data from the Ed-Fi ODS should be far simpler than in the pure data lake, because of the integrity restrictions of the Ed-Fi API.

![Diagram of a hybrid solution combining the Ed-Fi ODS/API with a data lake](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/hybrid-architecture.png)

There are several gaps that need to be filled in order to have an optimal hybrid Ed-Fi-data lake solution, including:

- Moving data into the lake,
- Data governance, namely, _lineage_, and
- Organizing for easier downstream use.

These are discussed in more detail below.

### Gap: Getting Data from Ed-Fi into the Lake

What options are available for getting data from the Ed-Fi Platform out to a Data Lake?

#### Option 1: Read from the Database

Write and schedule a standard ETL process to move data from the ODS to a data lake, using direct queries against the tables. Better yet, utilize the database's transaction log for faster reads that do not compete with the the API's use of the ODS database[^3].

This approach has a significant weakness: the retrieved data will be close, but not compliant, with the Data Standard. This is because the ODS database contains some normalization and table inheritance. Downstream use cases would have to reshape the data or accept the ODS as the _de-facto_ standard, instead of the actual Ed-Fi Data Standard.

![Diagram showing the ODS database as the source for the data lake, with a note about the data not being in the Data Standard schema](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/ods-to-lake.png)

#### Option 2: Read from the API

Build and schedule an **API-based ETL process**, using the [Changed Record Queries](/reference/ods-api/client-developers-guide/using-the-changed-record-queries) functionality in the ODS/API. The Changed Record Queries feature shortens the data load time by helping the API client retrieve only the records changed since the last extraction. The retrieved data have shapes defined by the Data Standard, since they are standard API payloads. This batch-based process fits well with many systems, though some implementations might prefer a more real-time approach.

![Diagram showing the API as the source for the data lake, with a note about the data being in the Data Standard schema](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/api-to-lake.png)

#### Option 3: ODS/API Modification for Streaming

Modify the ODS/API to write API requests to a stream so that they can be saved to the lake in real-time while keeping them in the original Data Standard schema. To preserve the validation and integrity checking provided by the relational ODS database, this modification needs to be introduced into the code *after*a database operation executes successfully.

While the real-time nature of this event streaming obviates the need for scheduling batch tasks, it does introduce a new set of technologies that are likely to be unfamiliar to most users in the Ed-Fi ecosystem. Furthermore, it would only work with a hypothetical future release (or backport to forked old releases), whereas the Changed Record Queries approach would work with any release of Tech Suite 3 from late 2018 (version 3.1+).

![Diagram showing the ODS/API with an added component for streaming data to the lake](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/streaming-ods-api.png)

### Gap: Supporting Lineage for Data Governance

To be secure and trusted as a data source, a data lake strategy needs to have robust governance practices. Downstream users will have greater confidence in the data when they know that they have already been validated through the Ed-Fi ODS/API. But that is only part of the trust equation. It is also important to know the provenance and lineage: _where the data came from_ (provenance) and _what has been done to them_ (lineage). When confidence / trust is low, the data lake will be under-utilized. In industry parlance, an under-utilized *lake*becomes a _swamp_.

An analyst's trust level may differ based on the provenance. "Trust" in this sense could refer to either verifiability, or to setting appropriate expectations. Perhaps some source systems writes student records without having any knowledge of student demographics. If the analyst knows the source system, then she will better know how to react to missing demographic information. Alternately, if she sees that demographics have been added where not expected, she will wish to know the lineage: what intermediate steps were taken to enrich the original data with the missing information?

Today's Ed-Fi Data Standard does not record which source system vendor submitted the data, and it may be worthwhile to modify the Data Standard to support provenance. Unfortunately, this will not help existing Ed-Fi implementations where knowledge of the source system of record has already been lost. In that case, "Ed-Fi ODS/API" may have to be used as the source system of record when extracting data out to a lake or warehouse. Lineage information should then be added when extracting and transforming the data. The lineage might belong to an Analytics schema or standard, rather than to the operational Ed-Fi Data Standard.

This information would also be critical when using the data lake for auditing purposes.

### Gap: Simplifying the Data Model

The Ed-Fi Data Standard is designed to optimize the process of _writing interoperable data_. The Data Standard's _Unifying Data Model_ (UDM) is not an ideal data model for analytics, dashboards, etc.

The Analytics Middle Tier product described earlier in this paper improves data discovery by simplifying the data model into denormalized star schemas. This tool is not applicable _per se_ in a hybrid solution, where the data are stored outside of a relational database. However, the concept will find new life in the "organize" step of data preparation.

Some denormalization can be standardized, for example by reshaping the data to match the [CEDS reporting data model](https://ceds.ed.gov/datamodel.aspx) or another model. The reshaping process can be componentized into either extract-transform-load (ETL) or extract-load-transform (ELT) tools. A tool such [dbt](https://www.getdbt.com/) might be very attractive in an ELT scenario; the work to extract and load the initial data into the warehouse ("staging") is routine and can be a black box, with transformation logic handled in the powerful modeling approach offered by dbt. This raises exciting and open questions:

- With significant variation in analytical needs, does it make sense for the Ed-Fi community to try to adopt a shared Analytical schema?
- If so, how far should it go? For example, perhaps the community only agrees on a light level of baseline denormalization while leaving open what the schema should look like to handle detailed use cases.
- Is it better to talk about multiple Analytical schemas, which are fit-to-purpose?

### An Opportunity for Platform Providers

Most data lakes are operated on a cloud platform, utilizing the cloud provider's managed services to the extent possible for cost optimization. Learning how to operate such a platform cost-efficiently, securely, and with appropriate response times would be a significant burden for any small IT operation who tries to migrate to such a platform.

In an ideal hybrid solution, managed service providers and/or the cloud providers themselves would create re-usable templates for deploying an ODS/API instance along with relevant Ed-Fi management tools. Such a template would initialize the data extract or data streaming capabilities and configure the ODS/API's access credentials.

The template would also handle setup of default downstream serverless functions for further data preparation and organization, including pushing refined data into an enterprise data warehouse for high-performance analytics. These functions would generally be relatively simple, since they are purpose-built, and would operate on data that already have a well-defined schema - the Ed-Fi Data Standard. This drives down the cost for an education organization to customize the solution if needed, for example by adding additional data validation rules or adding new warehousing requirements.

## Acknowledgments

In addition to innumerable blog posts and internal Ed-Fi conversations, this paper benefited greatly from direct conversations on the topic with Gene Garcia of Microsoft, Linda Feng of Unicon, Erik Joranlien and Jordan Mader of Education Analytics, and Marcos Alcozer from K-12 Analytics Engineering. Thank you!

All architectural icons used in this document are courtesy of [diagrams.net](https://www.diagrams.net/).

## Appendix: Translating the Diagrams into Product Components

In the diagrams above, the orange blocks represent small, independent software programs (typically _serverless functions_); the green boxes are for file storage, analogous to traditional file folders; the blue box is most likely an enterprise data warehouse; purple boxes are custom applications or managed services; and the machine learning box is a dedicated machine learning software package.

The following sections list _some_ representative technologies available for the "big three" cloud providers and on-premises:

### Function

![Lambda icon](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/lambda-icon.png)

- **On-premises:** Custom applications
- **Amazon Web Services:** AWS Lambda
- **Google Cloud:** Google Cloud Functions
- **Microsoft Azure:** Azure Functions

### File Storage

![File storage icon](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/file-storage-icon.png)

- **On-premises:** NTFS, NFS, HDFS
- **Amazon Web Services:** Amazon S3
- **Google Cloud:** Google Cloud Storage
- **Microsoft Azure:** Azure Storage

### Reporting Data Store

![Reporting data store icon](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/reporting-data-store-icon.png)

- **On-premises:** SQL Analysis Services, Oracle, Greenplum
- **Amazon Web Services:** Amazon Redshift, Snowflake
- **Google Cloud:** Google BigQuery, Snowflake
- **Microsoft Azure:** Synapse Analytics, Azure SQL Data Warehouse, Snowflake

### Reports and Dashboards

![Reports and dashboards icon](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/reports-and-dashboards-icon.png)

- **On-premises:** Tableau, Power BI, and many others; Custom applications
- **Amazon Web Services:** Amazon QuickSight, Custom applications
- **Google Cloud:** Google Data Studio, Custom applications
- **Microsoft Azure:** Power BI, Custom applications

### Machine Learning

![Machine learning icon](https://edfidocs.blob.core.windows.net/$web/assets/getting-started/sea-playbook/data-lake/machine-learning-icon.png)

- **On-premises:** TensorFlow, PyTorch
- **Amazon Web Services:** Amazon SageMaker
- **Google Cloud:** Google Vertex
- **Microsoft Azure:** Azure Machine Learning

[^1]: Ed-Fi mission statement:

      > "The Ed-Fi Alliance is a nonprofit devoted to helping every school district and state achieve data interoperability. By connecting educational data systems, we empower educators with comprehensive, real-time insights into their students’ performance and needs."

      :::info

      This is an earlier version of the mission statement, which was current at the time of writing. The statement still holds true, though you will no longer find it on the Ed-Fi Alliance website in this form.

      :::

[^2]: Anecdotally, "real-time" in educational data is not meant literally, as in some other industries. In educational settings, there is more concern that the data are up-to-date within a day or two. A counter-example might be literal real-time notifications on classroom attendance. On the other hand, manually-entered attendance data may be prone to errors or recording delays, unless the school is using automated proximity detection (e.g. RFID). In the manual case, actual real-time may not be desirable, and in the latter case, the proximity system itself likely takes responsibility for notifications.

[^3]: Colloquially, following the Microsoft terminology, known as Change Data Capture or CDC. Examples: [CDC on Microsoft SQL Server and Azure SQL](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-ver15); roll your own with PostgreSQL ([1](https://datacater.io/blog/2021-09-02/postgresql-cdc-complete-guide.html)) ([2](https://dev.to/thiagosilvaf/how-to-use-change-database-capture-cdc-in-postgres-37b8)) or use an add-on such as [Materialize](https://materialize.com/docs/guides/cdc-postgres/), [Hevo](https://hevodata.com/integrations/), [Aiven](https://aiven.io/blog/introducing-aiven-for-postgresql-change-data-capture), etc.
