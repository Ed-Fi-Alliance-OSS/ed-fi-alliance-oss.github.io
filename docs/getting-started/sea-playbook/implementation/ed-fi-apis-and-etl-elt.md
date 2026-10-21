# Ed-Fi APIs and ETL/ELT: When to Use Each

## Does the Ed-Fi API replace ETL or ELT?

No. The Ed-Fi API and ETL/ELT do different jobs, and most Ed-Fi implementations use both.

- **Use the Ed-Fi API for interoperability:** exchanging operational data between source systems, such as student information and assessment systems, and an education agency, in the shape defined by the Ed-Fi Data Standard.
- **Use ETL or ELT for downstream data engineering:** loading data from the Ed-Fi API into a data warehouse, data lake, or reporting store, and reshaping it there for analytics and reporting.

Extract-transform-load (ETL) and extract-load-transform (ELT) are common industry practices for moving data between IT systems, and robust ETL tooling has been available for several decades. The question is not whether to use ETL/ELT, but where.

## Where the boundary is

In a typical state Ed-Fi implementation:

1. **Source systems to the agency: the Ed-Fi API.** Each vendor's API client creates, updates, and deletes data on the agency's Ed-Fi API as it changes in the source system. This is the interoperability layer.
2. **The Ed-Fi API to analytical storage: ETL or ELT.** Downstream processes extract data from the Ed-Fi API and load it into a warehouse, lake, or reporting store.
3. **Inside analytical storage: transformation.** Data is reshaped into analytical models, such as the [CEDS](/community/involved/ceds) reporting data model, for dashboards, research, and state and federal reporting.

## Why the API, not ETL/ELT, for exchange between organizations

ETL/ELT connections can deliver results quickly, but used as the interface between separate organizations' systems they tend to be harder to secure and maintain over time. An agency that relies on many ETL/ELT connections for data collection takes on a large maintenance overhead.

### Security

ETL/ELT often involves moving data into intermediate locations that themselves need to be secured. Sometimes, these processes are run from other servers or even from staff laptops. The movement through or storage of data on multiple systems increases the risks of data compromise. In a system-to-system API-based approach, data does not move into intermediate locations and is not stored elsewhere, which minimizes the surface that is open to attack or accidental exposure.

ETL/ELT approaches can also involve "tunnelling" or bypassing standardized security firewalls and interfaces, such as VPN setups that let more systems join a protected network. REST API connections instead use the protocols of the web itself, such as HTTPS and OAuth, which were built to handle connections between disparate systems across different organizations.

### Stability across product releases

ETL/ELT approaches are often based on connections at the database or data storage level. Database tables are often unclearly named, undocumented, and subject to change: the database is not intended as a standardized interface to the product, so using it as an interface results in frequent issues, especially across software releases for the product. An API integrates at the application layer, where data entities represent real-world concepts.

### Vendor responsibility

Integration at the database layer frees the product vendor of responsibility for ensuring that data that leaves their product is correct. In an API-based approach, the API is a first-class product feature owned by the vendor. The vendor maintains it across new product releases and reflects it in documentation, training, and support.

## Where ETL/ELT fits: downstream of the Ed-Fi API

The Ed-Fi API is a transactional system, optimized for exchanging operational data. It is poorly suited to analytics workloads, so read-heavy analytical queries should be served from a dedicated data store that is populated by reading from the Ed-Fi API. ETL and ELT are the usual ways to build that store.

- **Extract from the API with changed record queries.** An API-based ETL process can use [changed record queries](/reference/ed-fi-api/client-developers-guide/using-the-changed-record-queries) to retrieve only the records that changed since the last extraction. The data keeps the shapes defined by the Data Standard, because it consists of standard API payloads.
- **Extracting directly from the ODS database is possible, with a trade-off.** The data will be close to, but not compliant with, the Data Standard, because the ODS database uses some normalization and table inheritance. Downstream users then have to reshape the data or treat the ODS as the de facto standard.
- **Transform in the warehouse or lake.** Reshaping data into an analytical model can be done with either ETL or ELT tools. In an ELT scenario, the extract-and-load step is routine and transformation logic is handled in the warehouse.

For more detail, see [The Ed-Fi Data Standard in the Age of AI](/getting-started/provider-playbook/implementation/ed-fi-data-standard-in-the-age-of-ai) and [Ed-Fi in the Data Lake](/getting-started/provider-playbook/implementation/ed-fi-in-the-data-lake). The data lake paper was written in 2022, and some tools it mentions are now deprecated.
